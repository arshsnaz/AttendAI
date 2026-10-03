import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  FileSpreadsheet,
  Printer,
  Calendar,
  CheckCircle2,
  Clock3,
  XCircle,
  Sparkles,
  Download,
  Filter,
  BarChart3,
  Layers,
  BookOpen
} from "lucide-react";
import { getStudents, getAttendanceLogs, type StudentRecord, type AttendanceLog } from "@/services/attendanceService";
import { toast } from "sonner";

const ReportsPage = () => {
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0]);
  const [reportType, setReportType] = useState("daily");
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [stuList, logList] = await Promise.all([
        getStudents(),
        getAttendanceLogs(dateFilter),
      ]);
      setStudents(stuList);
      setLogs(logList);
    } catch (e) {
      console.error("Reports load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateFilter]);

  // Dynamic Metrics Calculation from DB
  const totalStudents = students.length;
  const presentLogs = logs.filter(l => l.status === "PRESENT");
  const lateLogs = logs.filter(l => l.status === "LATE");
  const absentLogs = logs.filter(l => l.status === "ABSENT");

  const presentCount = presentLogs.length;
  const lateCount = lateLogs.length;
  const loggedCount = presentCount + lateCount;
  const unmarkedAbsentCount = Math.max(0, totalStudents - loggedCount);

  // CSV Export
  const exportCSV = () => {
    if (logs.length === 0) {
      toast.error("No verified logs to export for this date.");
      return;
    }
    const headers = ["Student Name", "Enrollment ID", "Department", "Subject", "Date", "Timestamp", "Status", "Confidence %"];
    const rows = logs.map(l => [
      `"${l.studentName}"`,
      l.studentEnrollmentId,
      `"${l.department}"`,
      `"${l.subjectName}"`,
      l.date,
      l.time,
      l.status,
      `${l.confidenceScore}%`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AttendAI_Compliance_Report_${dateFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Official attendance report downloaded as CSV.");
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-rise">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white/90 border border-[#d2e1e5] shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#2B9FB1] text-xs font-semibold mb-2 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5" /> Exportable Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#0D2237]">
            Attendance Reports & Audits
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Generate, filter, and export verified biometric logs for institutional compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <Button
            onClick={exportCSV}
            variant="outline"
            className="rounded-xl border-[#d2e1e5] text-xs h-10 px-4 gap-1.5 hover:bg-slate-50"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export CSV
          </Button>
          <Button
            onClick={exportPDF}
            className="bg-[#2B9FB1] hover:bg-[#23899B] text-white rounded-xl text-xs h-10 px-4 gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" /> Download Official PDF
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm print:hidden">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-full sm:w-56 h-10 text-xs rounded-xl bg-slate-50 border-[#d2e1e5]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily Attendance Log</SelectItem>
              <SelectItem value="department">Department Audit</SelectItem>
              <SelectItem value="semester">Semester Overview</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-[#d2e1e5] rounded-xl px-3 h-10">
            <Calendar className="w-4 h-4 text-[#2B9FB1]" />
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* KPI Stats Calculated Live from Database */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl p-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">Marked Present</span>
              <h3 className="text-2xl font-extrabold text-[#0D2237] mt-0.5">{presentCount}</h3>
            </div>
          </div>
        </Card>

        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl p-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Clock3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">Late Arrivals</span>
              <h3 className="text-2xl font-extrabold text-[#0D2237] mt-0.5">{lateCount}</h3>
            </div>
          </div>
        </Card>

        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl p-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">Absent / Unmarked</span>
              <h3 className="text-2xl font-extrabold text-[#0D2237] mt-0.5">{unmarkedAbsentCount}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Verified Biometric Log Entries Table */}
      <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-[#0D2237]">Verified Biometric Log Entries</CardTitle>
            <CardDescription className="text-xs">Showing verified entries for date: {dateFilter}</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs text-[#2B9FB1] border-cyan-200 bg-cyan-50 font-semibold">
            {logs.length} Records
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Student</TableHead>
                  <TableHead className="font-semibold text-slate-700">Subject / Module</TableHead>
                  <TableHead className="font-semibold text-slate-700">Timestamp</TableHead>
                  <TableHead className="font-semibold text-slate-700">Attendance Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(log => (
                  <TableRow key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#2B9FB1] font-bold text-xs">
                          {log.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#0D2237]">{log.studentName}</p>
                          <p className="font-mono text-xs text-muted-foreground">{log.studentEnrollmentId} • {log.department}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs font-medium text-slate-700">
                      {log.subjectName}
                    </TableCell>

                    <TableCell className="text-xs text-slate-600 font-mono">
                      {log.time}
                    </TableCell>

                    <TableCell>
                      {log.status === "PRESENT" && (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold gap-1 py-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Present
                        </Badge>
                      )}
                      {log.status === "LATE" && (
                        <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold gap-1 py-1">
                          <Clock3 className="w-3 h-3 text-amber-600" /> Late
                        </Badge>
                      )}
                      {log.status === "ABSENT" && (
                        <Badge variant="secondary" className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold gap-1 py-1">
                          <XCircle className="w-3 h-3 text-rose-600" /> Absent
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <span className="font-mono text-xs font-bold text-emerald-600">
                        {log.confidenceScore}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}

                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-xs">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#2B9FB1]" />
                      <p className="font-semibold text-slate-700 text-sm">No verified entries for {dateFilter}</p>
                      <p className="mt-1">Perform live camera scanning or pick a different date to inspect audit logs.</p>
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
