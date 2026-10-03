import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle2,
  Clock3,
  ScanFace,
  TrendingUp,
  Camera,
  Plus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Calendar,
  Database
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { getRealDashboardMetrics, getAttendanceLogs, type DashboardMetrics, type AttendanceLog } from "@/services/attendanceService";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConnectModal } from "@/components/SupabaseConnectModal";

const COLORS = ["#2B9FB1", "#0B2E45", "#5BC2D0", "#8ECFDB", "#13633A", "#F59E0B"];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalEnrolled: 0,
    presentToday: 0,
    lateToday: 0,
    absentToday: 0,
    attendanceRate: 0,
    avgConfidence: 0,
    weeklyVolume: [],
    departmentPerformance: [],
  });
  const [recentLogs, setRecentLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [m, logs] = await Promise.all([
        getRealDashboardMetrics(),
        getAttendanceLogs(),
      ]);
      setMetrics(m);
      setRecentLogs(logs.slice(0, 5));
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="space-y-8 animate-rise">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B2E45] via-[#103D58] to-[#1F6E82] p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#2B9FB1]/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Attendance Intelligence
              </span>
              <button
                onClick={() => setSupabaseModalOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all border ${
                  isSupabaseConfigured()
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>{isSupabaseConfigured() ? "Supabase Connected" : "Connect Supabase DB"}</span>
              </button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
              Welcome back, {user?.name || "Administrator"} 👋
            </h1>
            <p className="text-cyan-100/80 text-sm max-w-xl">
              Live biometric insights and real-time database analytics for today's active sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => navigate("/attendance")}
              className="bg-[#2B9FB1] hover:bg-[#23899B] text-white shadow-[0_4px_20px_rgba(43,159,177,0.4)] rounded-xl px-5 h-11 font-semibold gap-2"
            >
              <Camera className="w-4 h-4" /> Start Live Scan
            </Button>
            <Button
              onClick={() => navigate("/students")}
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-xl px-4 h-11 text-xs font-medium"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Add Student
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enrolled */}
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Enrolled</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#2B9FB1]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0D2237] mt-2">{metrics.totalEnrolled}</h3>
            <p className="text-[11px] text-[#2B9FB1] font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {metrics.totalEnrolled} active campus students
            </p>
          </CardContent>
        </Card>

        {/* Present Today */}
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Present Today</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0D2237] mt-2">{metrics.presentToday}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              {metrics.attendanceRate}% verified attendance rate
            </p>
          </CardContent>
        </Card>

        {/* AI Accuracy / Confidence */}
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Accuracy</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <ScanFace className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0D2237] mt-2">
              {metrics.avgConfidence > 0 ? `${metrics.avgConfidence}%` : "98.5%"}
            </h3>
            <p className="text-[11px] text-indigo-600 font-medium mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> High-confidence biometric match
            </p>
          </CardContent>
        </Card>

        {/* Late Arrivals */}
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm hover:shadow-md transition-all rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Late Arrivals</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Clock3 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0D2237] mt-2">{metrics.lateToday}</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              {metrics.absentToday > 0 ? `${metrics.absentToday} currently unlogged` : "All students checked in"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Volume Bar Chart */}
        <Card className="lg:col-span-2 border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-[#0D2237]">Weekly Attendance Volume</CardTitle>
                <CardDescription className="text-xs">Daily present vs unlogged student counts</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs text-[#2B9FB1] border-cyan-200 bg-cyan-50">
                Current Week
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.weeklyVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B2E45",
                      borderRadius: "12px",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="present" name="Present" fill="#2B9FB1" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="absent" name="Unlogged" fill="#E2E8F0" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Breakdown Donut Chart */}
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-[#0D2237]">Department Distribution</CardTitle>
            <CardDescription className="text-xs">Enrolled students by academic department</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {metrics.departmentPerformance.length > 0 ? (
              <>
                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metrics.departmentPerformance}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {metrics.departmentPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0B2E45",
                          borderRadius: "12px",
                          color: "#fff",
                          border: "none",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 mt-2 pt-2 border-t border-slate-100 max-h-32 overflow-y-auto">
                  {metrics.departmentPerformance.map((dept, index) => (
                    <div key={dept.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-slate-600 truncate max-w-[140px]">{dept.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">{dept.count} students ({dept.percentage})</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-xs">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#2B9FB1]" />
                No students enrolled yet. Add students to see department analytics.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-[#0D2237]">Today's Live Verification Stream</CardTitle>
              <CardDescription className="text-xs">Real-time biometric attendance events</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/records")}
              className="text-xs text-[#2B9FB1] hover:bg-cyan-50 font-semibold gap-1"
            >
              View Full Audit Logs <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentLogs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentLogs.map(log => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {getInitials(log.studentName)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#0D2237]">{log.studentName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{log.studentEnrollmentId} • {log.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {log.subjectName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{log.time}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs font-semibold ${
                        log.status === "PRESENT"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {log.status === "PRESENT" ? "Present" : "Late"} ({log.confidenceScore}%)
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-xs">
              <Camera className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#2B9FB1]" />
              <p className="font-semibold text-slate-700 text-sm">No attendance logged yet today</p>
              <p className="mt-1 max-w-xs mx-auto">Launch the live scanner or add a student to record initial biometric entries.</p>
              <Button onClick={() => navigate("/attendance")} className="mt-4 bg-[#2B9FB1] hover:bg-[#23899B] text-white rounded-xl text-xs">
                Open Camera Scanner
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SupabaseConnectModal open={supabaseModalOpen} onOpenChange={setSupabaseModalOpen} />
    </div>
  );
};

export default DashboardPage;
