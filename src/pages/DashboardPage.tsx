import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ScanFace, Clock, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { fetchApi } from "@/lib/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["hsl(189 61% 43%)", "hsl(194 49% 61%)", "hsl(201 48% 34%)", "hsl(174 39% 63%)"];

type WeeklyAttendance = {
  day: string;
  present: number;
  absent: number;
};

type DepartmentAttendance = {
  name: string;
  rate: number;
};

type MonthlyTrend = {
  month: string;
  rate: number;
};

const StatCard = ({ title, value, subtitle, icon: Icon, color }: {
  title: string; value: string | number; subtitle: string;
  icon: React.ElementType; color: string;
}) => (
  <Card className="shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-[#d2e1e5] animate-rise">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    attendancePercentage: 0,
    lateToday: 0
  });
  
  const [weeklyData, setWeeklyData] = useState<WeeklyAttendance[]>([]);
  const [deptData, setDeptData] = useState<DepartmentAttendance[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyTrend[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchApi("/dashboard/stats");
        if (res.success) {
          setStats({
            totalStudents: res.data.totalStudents || 0,
            presentToday: res.data.presentToday || 0,
            attendancePercentage: res.data.attendancePercentage || 0,
            lateToday: 0 
          });
          setWeeklyData(res.data.weeklyAttendance || []);
          setDeptData(res.data.departmentAttendance || []);
          setMonthlyData(res.data.monthlyTrend || []);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadStats();
  }, []);

  const deptPieData = deptData.map(d => ({ name: d.name, value: d.rate }));

  return (
    <div className="space-y-6 animate-rise">
      <div className="animate-rise-delay-1">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
          Welcome back, {user?.name?.split(" ")[0] || 'User'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's your attendance overview for today
        </p>
      </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Across all departments"
          icon={Users}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          subtitle={`${Math.round(stats.attendancePercentage)}% attendance rate`}
          icon={CheckCircle2}
          color="bg-info/10 text-info"
        />
        <StatCard
          title="Late Today"
          value={stats.lateToday}
          subtitle="Arrived after cutoff"
          icon={Clock}
          color="bg-secondary/30 text-primary"
        />
        <StatCard
          title="Recognition Rate"
          value="96.8%"
          subtitle="Avg confidence score"
          icon={ScanFace}
          color="bg-primary/20 text-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card bg-white/70 backdrop-blur-sm border-[#d2e1e5] animate-rise-delay-1">
          <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215,14%,46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,14%,46%)" />
                <Tooltip />
                <Bar dataKey="present" fill="hsl(189 61% 43%)" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent" fill="hsl(194 22% 84%)" radius={[4, 4, 0, 0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-white/70 backdrop-blur-sm border-[#d2e1e5] animate-rise-delay-2">
          <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">By Department</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={deptPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {deptPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {deptData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="font-medium text-foreground ml-auto">{d.rate}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="shadow-card bg-white/70 backdrop-blur-sm border-[#d2e1e5] animate-rise-delay-3">
        <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,14%,46%)" />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} stroke="hsl(215,14%,46%)" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="hsl(189 61% 43%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(189 61% 43%)" }} name="Attendance %" />
            </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
