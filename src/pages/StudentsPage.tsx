import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MOCK_DEPARTMENTS, type Student } from "@/data/mockData";
import { Plus, Search, Pencil, Trash2, Camera } from "lucide-react";
import { fetchApi } from "@/lib/api";

type BackendStudent = {
  id: string | number;
  name: string;
  department: string;
  year: number;
  studentId: string;
  datasetPath?: string;
};

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({ name: "", department: "", year: "1", email: "", enrollmentId: "" });

  const loadStudents = async () => {
    try {
      const res = await fetchApi("/students");
      if (res.success) {
        const backendStudents = (res.data as BackendStudent[]).map((s) => ({
          id: s.id.toString(),
          name: s.name,
          department: s.department,
          year: s.year,
          email: "student@univ.edu", // fallback
          enrollmentId: s.studentId,
          faceDatasetCount: s.datasetPath ? 20 : 0
        }));
        setStudents(backendStudents);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.enrollmentId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => {
    setEditingStudent(null);
    setForm({ name: "", department: "", year: "1", email: "", enrollmentId: "" });
    setDialogOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditingStudent(s);
    setForm({ name: s.name, department: s.department, year: String(s.year), email: s.email, enrollmentId: s.enrollmentId });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        department: form.department,
        year: parseInt(form.year),
        studentId: form.enrollmentId
      };
      
      if (editingStudent) {
        await fetchApi(`/students/${editingStudent.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        alert("Student updated successfully!");
      } else {
        await fetchApi("/students", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        alert("Student added! Next Step: Please go to 'Face Registration' page to register the face for this student so they can be recognized by the camera.");
      }
      await loadStudents();
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : "Unknown error";
      alert("Error saving student: " + message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/students/${id}`, { method: "DELETE" });
      await loadStudents();
    } catch (e) {
      console.error(e);
      alert("Error deleting student");
    }
  };

  return (
    <div className="space-y-6 animate-rise">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-rise-delay-1">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Students</h1>
          <p className="text-sm text-muted-foreground">Manage student records and face datasets</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add Student
        </Button>
      </div>

      <Card className="shadow-card bg-white/70 border-[#d2e1e5] animate-rise-delay-2">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {MOCK_DEPARTMENTS.map(d => (
                  <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto animate-rise-delay-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enrollment ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden sm:table-cell">Year</TableHead>
                  <TableHead>Face Data</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.enrollmentId}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{s.department}</TableCell>
                    <TableCell className="hidden sm:table-cell">Year {s.year}</TableCell>
                    <TableCell>
                      {s.faceDatasetCount > 0 ? (
                        <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs">
                          {s.faceDatasetCount} images
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-warning/10 text-warning border-0 text-xs">
                          No data
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(s.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit Student" : "Add Student"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Enrollment ID</Label>
                <Input value={form.enrollmentId} onChange={e => setForm(f => ({ ...f, enrollmentId: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={form.department} onValueChange={v => setForm(f => ({ ...f, department: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {MOCK_DEPARTMENTS.map(d => (
                      <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={form.year} onValueChange={v => setForm(f => ({ ...f, year: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(y => (
                      <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingStudent ? "Update" : "Add"} Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
