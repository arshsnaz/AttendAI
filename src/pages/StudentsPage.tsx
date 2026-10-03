import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MOCK_DEPARTMENTS } from "@/data/mockData";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Camera,
  GraduationCap,
  Users,
  ShieldCheck,
  AlertTriangle,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Filter
} from "lucide-react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  type StudentRecord
} from "@/services/attendanceService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [faceDataFilter, setFaceDataFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [form, setForm] = useState({ name: "", department: "", year: "1", email: "", enrollmentId: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase()) ||
        (s.email && s.email.toLowerCase().includes(search.toLowerCase()));
      const matchDept = deptFilter === "all" || s.department === deptFilter;
      const matchYear = yearFilter === "all" || String(s.year) === yearFilter;
      const matchFace =
        faceDataFilter === "all" ||
        (faceDataFilter === "registered" && s.faceDatasetCount > 0) ||
        (faceDataFilter === "missing" && s.faceDatasetCount === 0);
      return matchSearch && matchDept && matchYear && matchFace;
    });
  }, [students, search, deptFilter, yearFilter, faceDataFilter]);

  // Statistics calculation
  const totalCount = students.length;
  const registeredFaceCount = students.filter(s => s.faceDatasetCount > 0).length;
  const pendingFaceCount = totalCount - registeredFaceCount;
  const departmentsCount = new Set(students.map(s => s.department)).size;

  const openAdd = () => {
    setEditingStudent(null);
    setForm({
      name: "",
      department: MOCK_DEPARTMENTS[0]?.name || "Computer Science",
      year: "1",
      email: "",
      enrollmentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setDialogOpen(true);
  };

  const openEdit = (s: StudentRecord) => {
    setEditingStudent(s);
    setForm({
      name: s.name,
      department: s.department,
      year: String(s.year),
      email: s.email || "",
      enrollmentId: s.studentId,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.department || !form.enrollmentId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, {
          name: form.name,
          studentId: form.enrollmentId,
          department: form.department,
          year: parseInt(form.year),
          email: form.email,
        });
        toast.success("Student profile updated successfully in Supabase!");
      } else {
        await createStudent({
          name: form.name,
          studentId: form.enrollmentId,
          department: form.department,
          year: parseInt(form.year),
          email: form.email,
        });
        toast.success("Student enrolled in Supabase! Proceed to Face Studio to register biometrics.");
      }
      await loadStudents();
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : "Failed to save student";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete student "${name}"?`)) return;
    try {
      await deleteStudent(id);
      toast.success("Student removed successfully.");
      await loadStudents();
    } catch (e) {
      console.error(e);
      toast.error("Error deleting student.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const getAvatarGradient = (id: string) => {
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-teal-400 to-emerald-600",
      "from-indigo-500 to-cyan-500",
      "from-sky-400 to-indigo-600",
      "from-blue-500 to-teal-500"
    ];
    const index = Math.abs(id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="space-y-8 animate-rise">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B2E45] to-[#124968] text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#2B9FB1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold mb-2 backdrop-blur-sm border border-white/10">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">Student Directory</h1>
          <p className="text-cyan-100/80 text-sm mt-1 max-w-xl">
            Manage student enrollment profiles, assign departments, and track AI facial recognition biometric registration.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <Button
            onClick={openAdd}
            className="bg-[#2B9FB1] hover:bg-[#23899B] text-white shadow-[0_4px_16px_rgba(43,159,177,0.4)] rounded-xl gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Student
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-[#d2e1e5] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#2B9FB1]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Enrolled</p>
              <h3 className="text-2xl font-bold text-[#0D2237] mt-0.5">{totalCount}</h3>
              <p className="text-[11px] text-[#2B9FB1] font-medium mt-0.5">Active Campus Roster</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#d2e1e5] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Face ID Enrolled</p>
              <h3 className="text-2xl font-bold text-[#0D2237] mt-0.5">{registeredFaceCount}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                {totalCount > 0 ? `${Math.round((registeredFaceCount / totalCount) * 100)}% biometric coverage` : "0%"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#d2e1e5] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pending Biometrics</p>
              <h3 className="text-2xl font-bold text-[#0D2237] mt-0.5">{pendingFaceCount}</h3>
              <p className="text-[11px] text-amber-600 font-medium mt-0.5">Requires Face Capture</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#d2e1e5] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Departments</p>
              <h3 className="text-2xl font-bold text-[#0D2237] mt-0.5">{departmentsCount}</h3>
              <p className="text-[11px] text-blue-600 font-medium mt-0.5">Active Academic Units</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Control Bar */}
      <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search name, ID, or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-10 bg-slate-50 border-[#d2e1e5] focus:bg-white rounded-xl text-sm"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold uppercase tracking-wider mr-1">
                <Filter className="w-3.5 h-3.5 text-[#2B9FB1]" /> Filters:
              </div>

              {/* Department */}
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="h-10 text-xs w-[160px] bg-slate-50 border-[#d2e1e5] rounded-xl">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {MOCK_DEPARTMENTS.map(d => (
                    <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year */}
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="h-10 text-xs w-[110px] bg-slate-50 border-[#d2e1e5] rounded-xl">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {[1, 2, 3, 4].map(y => (
                    <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Biometrics Status */}
              <Select value={faceDataFilter} onValueChange={setFaceDataFilter}>
                <SelectTrigger className="h-10 text-xs w-[140px] bg-slate-50 border-[#d2e1e5] rounded-xl">
                  <SelectValue placeholder="Face Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="missing">No Biometrics</SelectItem>
                </SelectContent>
              </Select>

              {/* View Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 ml-auto lg:ml-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-[#2B9FB1] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "table" ? "bg-white text-[#2B9FB1] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid or Table Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(s => {
            const hasFace = s.faceDatasetCount > 0;
            return (
              <Card
                key={s.id}
                className="border border-[#d2e1e5] bg-white hover:border-[#2B9FB1]/50 hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarGradient(s.id)} flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                        {getInitials(s.name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0D2237] text-base leading-tight group-hover:text-[#2B9FB1] transition-colors">
                          {s.name}
                        </h4>
                        <p className="font-mono text-xs text-muted-foreground mt-0.5">{s.studentId}</p>
                      </div>
                    </div>
                    {hasFace ? (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold gap-1 py-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Face ID Ready
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold gap-1 py-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Pending Face
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Department</span>
                      <span className="font-medium text-slate-700 truncate block mt-0.5">{s.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Year</span>
                      <span className="font-medium text-slate-700 block mt-0.5">Year {s.year}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {!hasFace ? (
                      <Button
                        size="sm"
                        onClick={() => navigate(`/face-registration?studentId=${s.id}`)}
                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-8 rounded-lg gap-1.5 font-medium shadow-sm flex-1"
                      >
                        <Camera className="w-3.5 h-3.5" /> Register Face
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/face-registration?studentId=${s.id}`)}
                        className="text-xs h-8 rounded-lg gap-1.5 text-slate-600 border-slate-200 hover:bg-slate-50 flex-1"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#2B9FB1]" /> Update ({s.faceDatasetCount})
                      </Button>
                    )}

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-[#2B9FB1] hover:bg-cyan-50 rounded-lg"
                        onClick={() => openEdit(s)}
                        title="Edit Student"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        onClick={() => handleDelete(s.id, s.name)}
                        title="Delete Student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Card className="border border-[#d2e1e5] bg-white/90 shadow-sm overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                  <TableRow>
                    <TableHead className="w-[120px] font-semibold text-slate-700">Enrollment ID</TableHead>
                    <TableHead className="font-semibold text-slate-700">Student</TableHead>
                    <TableHead className="font-semibold text-slate-700">Department</TableHead>
                    <TableHead className="font-semibold text-slate-700">Year</TableHead>
                    <TableHead className="font-semibold text-slate-700">Biometric Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-mono text-xs font-semibold text-slate-600">{s.studentId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getAvatarGradient(s.id)} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                            {getInitials(s.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#0D2237]">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-700">{s.department}</TableCell>
                      <TableCell className="text-sm text-slate-600">Year {s.year}</TableCell>
                      <TableCell>
                        {s.faceDatasetCount > 0 ? (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {s.faceDatasetCount} samples
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600" /> No Biometrics
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {s.faceDatasetCount === 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs border-amber-300 text-amber-700 hover:bg-amber-50 gap-1 rounded-lg"
                              onClick={() => navigate(`/face-registration?studentId=${s.id}`)}
                            >
                              <Camera className="w-3 h-3" /> Enroll Face
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-[#2B9FB1] rounded-lg"
                            onClick={() => openEdit(s)}
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 rounded-lg"
                            onClick={() => handleDelete(s.id, s.name)}
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <Card className="border border-dashed border-[#d2e1e5] bg-white/60 p-12 text-center rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#2B9FB1] mx-auto mb-4">
            <Users className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-[#0D2237]">No students match your criteria</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, department filters, or add a new student to your campus registry.
          </p>
          <Button onClick={openAdd} className="mt-4 bg-[#2B9FB1] hover:bg-[#23899B] text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1" /> Add New Student
          </Button>
        </Card>
      )}

      {/* Add / Edit Student Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg rounded-2xl border-[#d2e1e5] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display text-[#0D2237] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#2B9FB1]" />
              {editingStudent ? "Edit Student Profile" : "Enroll New Student"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
                <Input
                  placeholder="e.g. Sarah Connor"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="rounded-xl border-[#d2e1e5] focus:border-[#2B9FB1]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Enrollment ID *</Label>
                <Input
                  placeholder="e.g. STU-2024-001"
                  value={form.enrollmentId}
                  onChange={e => setForm(f => ({ ...f, enrollmentId: e.target.value }))}
                  className="rounded-xl font-mono text-sm border-[#d2e1e5] focus:border-[#2B9FB1]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Department *</Label>
                <Select value={form.department} onValueChange={v => setForm(f => ({ ...f, department: v }))}>
                  <SelectTrigger className="rounded-xl border-[#d2e1e5]">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_DEPARTMENTS.map(d => (
                      <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Academic Year *</Label>
                <Select value={form.year} onValueChange={v => setForm(f => ({ ...f, year: v }))}>
                  <SelectTrigger className="rounded-xl border-[#d2e1e5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(y => (
                      <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
              <Input
                type="email"
                placeholder="student@university.edu"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="rounded-xl border-[#d2e1e5] focus:border-[#2B9FB1]"
              />
            </div>

            <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs text-cyan-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#2B9FB1] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Next Step: Biometric Registration</span>
                <p className="text-[11px] text-cyan-800 mt-0.5">
                  After saving this profile, head over to <strong>Face Registration</strong> to capture 25 sample frames for real-time camera AI recognition.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#2B9FB1] hover:bg-[#23899B] text-white rounded-xl"
              disabled={submitting}
            >
              {submitting ? "Saving..." : editingStudent ? "Save Changes" : "Create Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
