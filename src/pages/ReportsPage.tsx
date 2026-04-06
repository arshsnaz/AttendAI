import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { FileText, Download, Calendar } from "lucide-react";
import axios from "axios";

type AttendanceItem = {
  id: string | number;
  date: string;
  time: string;
  status: string;
  confidenceScore?: number;
  confidence?: number;
  student?: { name?: string };
  subject?: { subjectName?: string };
  studentName?: string;
  subjectName?: string;
  subjectText?: string;
};

type StudentItem = {
  id: string | number;
};

type DepartmentStat = {
  name: string;
  rate: number;
};

const ReportsPage = () => {
  const [reportType, setReportType] = useState("daily");
  const [dateFilter, setDateFilter] = useState(() => new Date().toISOString().slice(0, 10));
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("/api/attendance").then(res => res.data.data),
      axios.get("/api/students").then(res => res.data.data),
      axios.get("/api/dashboard/stats").then(res => res.data.data.departmentAttendance),
    ]).then(([attendanceData, studentsData, deptStats]) => {
      setAttendance(attendanceData);
      setStudents(studentsData);
      setDepartmentStats(deptStats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const dailyRecords = attendance.filter((a) => a.date === dateFilter);
  const getSubjectLabel = (record: AttendanceItem) => record.subject?.subjectName || record.subjectName || record.subjectText || "";
  const presentCount = dailyRecords.filter(a => a.status && a.status.toLowerCase() === "present").length;
  const lateCount = dailyRecords.filter(a => a.status && a.status.toLowerCase() === "late").length;
  const absentCount = students.length - presentCount - lateCount;

  const handleExport = async (format: "csv" | "pdf") => {
    if (format === "csv") {
      const headers = "Student,Subject,Date,Time,Status,Confidence\n";
      const rows = dailyRecords.map(a =>
        `${a.student?.name || a.studentName || ""},${getSubjectLabel(a)},${a.date},${a.time},${a.status},${a.confidenceScore || a.confidence || ""}`
      ).join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance_${dateFilter}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // PDF export: call backend and download file
      try {
        const response = await fetch(`/api/attendance/export/pdf?date=${dateFilter}`);
        if (!response.ok) throw new Error("Failed to export PDF");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `attendance_${dateFilter}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        alert("PDF export failed: " + message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-rise-delay-1">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and export attendance reports</p>
        </div>
        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleExport("csv")}>
            <Download className="w-4 h-4 mr-1" /> Export CSV
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleExport("pdf")}>
            <FileText className="w-4 h-4 mr-1" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 animate-rise-delay-1">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily Report</SelectItem>
            <SelectItem value="monthly">Monthly Report</SelectItem>
            <SelectItem value="department">Department Report</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="w-full sm:max-w-[200px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-1">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Present</p>
            <p className="text-3xl font-display font-bold text-success mt-1">{presentCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-2">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Late</p>
            <p className="text-3xl font-display font-bold text-warning mt-1">{lateCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-3">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Absent</p>
            <p className="text-3xl font-display font-bold text-destructive mt-1">{absentCount}</p>
          </CardContent>
        </Card>
      </div>

      {reportType === "department" && (
        <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Department-wise Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(215,14%,46%)" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={130} stroke="hsl(215,14%,46%)" />
                <Tooltip />
                <Bar dataKey="rate" fill="hsl(189 61% 43%)" radius={[0, 4, 4, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Detailed Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyRecords.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.student?.name || a.studentName || ""}</TableCell>
                    <TableCell className="text-muted-foreground">{getSubjectLabel(a)}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{a.time}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs capitalize ${
                        a.status && a.status.toLowerCase() === "present" ? "bg-success/10 text-success border-0" :
                        a.status && a.status.toLowerCase() === "late" ? "bg-warning/10 text-warning border-0" :
                        "bg-destructive/10 text-destructive border-0"
                      }`}>
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {a.confidenceScore ? `${a.confidenceScore.toFixed(1)}%` : (a.confidence ? `${a.confidence.toFixed(1)}%` : "—")}
                    </TableCell>
                  </TableRow>
                ))}
                {dailyRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No records for this date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
