import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList, Calendar, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchApi } from "@/lib/api";

type SubjectItem = {
  id: string | number;
  subjectName: string;
};

type AttendanceApiItem = {
  id: string | number;
  student?: { name?: string };
  subject?: { subjectName?: string };
  date: string;
  time: string;
  status: string;
  confidenceScore?: number;
};

type AttendanceRecordView = {
  id: string | number;
  studentName: string;
  subject: string;
  date: string;
  time: string;
  status: string;
  confidence?: number;
};

const RecordsPage = () => {
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [records, setRecords] = useState<AttendanceRecordView[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await fetchApi("/subjects");
        if (res.success) setSubjects(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadSubjects();
  }, []);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await fetchApi("/attendance");
        if (res.success) {
          setRecords((res.data as AttendanceApiItem[]).map((r) => ({
            id: r.id,
            studentName: r.student?.name || "Unknown",
            subject: r.subject?.subjectName || "Unknown Subject",
            date: r.date,
            time: r.time,
            status: r.status.toLowerCase(),
            confidence: r.confidenceScore
          })));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadRecords();
  }, []);

  const filtered = records.filter(a => {
    const matchDate = !dateFilter || a.date === dateFilter;
    const matchSubject = subjectFilter === "all" || a.subject === subjects.find(s => s.id.toString() === subjectFilter)?.subjectName;
    return matchDate && matchSubject;
  });

  const statusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-success/10 text-success border-0";
      case "late": return "bg-warning/10 text-warning border-0";
      case "absent": return "bg-destructive/10 text-destructive border-0";
      default: return "";
    }
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 animate-rise-delay-1">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Attendance Records</h1>
          <p className="text-sm text-muted-foreground">View and filter attendance history</p>
        </div>
        <Button onClick={exportPDF} className="gap-2 print:hidden w-full sm:w-auto">
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </div>

      <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-2">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="w-full sm:max-w-[200px]" />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(s => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.subjectName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.studentName}</TableCell>
                    <TableCell className="text-muted-foreground">{a.subject}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{a.date}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{a.time}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs capitalize ${statusColor(a.status)}`}>
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {a.confidence ? `${a.confidence.toFixed(1)}%` : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No records found for this filter
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

export default RecordsPage;
