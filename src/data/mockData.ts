export interface Student {
  id: string;
  name: string;
  department: string;
  year: number;
  email: string;
  enrollmentId: string;
  photoUrl?: string;
  faceDatasetCount: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: "present" | "absent" | "late";
  confidence?: number;
}

export interface Department {
  id: string;
  name: string;
  studentCount: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
}

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "1", name: "Computer Science", studentCount: 120 },
  { id: "2", name: "Electronics", studentCount: 95 },
  { id: "3", name: "Mechanical", studentCount: 88 },
  { id: "4", name: "Civil", studentCount: 76 },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: "1", name: "Data Structures", code: "CS201", department: "Computer Science" },
  { id: "2", name: "Machine Learning", code: "CS401", department: "Computer Science" },
  { id: "3", name: "Digital Electronics", code: "EC301", department: "Electronics" },
  { id: "4", name: "Thermodynamics", code: "ME201", department: "Mechanical" },
];

export const MOCK_STUDENTS: Student[] = [
  { id: "1", name: "Arjun Patel", department: "Computer Science", year: 3, email: "arjun@university.edu", enrollmentId: "CS2023001", faceDatasetCount: 25 },
  { id: "2", name: "Priya Sharma", department: "Computer Science", year: 3, email: "priya@university.edu", enrollmentId: "CS2023002", faceDatasetCount: 30 },
  { id: "3", name: "Rahul Kumar", department: "Electronics", year: 2, email: "rahul@university.edu", enrollmentId: "EC2024001", faceDatasetCount: 0 },
  { id: "4", name: "Ananya Singh", department: "Computer Science", year: 4, email: "ananya@university.edu", enrollmentId: "CS2022001", faceDatasetCount: 28 },
  { id: "5", name: "Vikram Reddy", department: "Mechanical", year: 2, email: "vikram@university.edu", enrollmentId: "ME2024001", faceDatasetCount: 22 },
  { id: "6", name: "Sneha Gupta", department: "Electronics", year: 3, email: "sneha@university.edu", enrollmentId: "EC2023001", faceDatasetCount: 15 },
  { id: "7", name: "Karthik Nair", department: "Civil", year: 1, email: "karthik@university.edu", enrollmentId: "CE2025001", faceDatasetCount: 0 },
  { id: "8", name: "Meera Joshi", department: "Computer Science", year: 2, email: "meera@university.edu", enrollmentId: "CS2024001", faceDatasetCount: 20 },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: "1", studentId: "1", studentName: "Arjun Patel", date: "2026-03-11", time: "09:05", subject: "Data Structures", status: "present", confidence: 97.2 },
  { id: "2", studentId: "2", studentName: "Priya Sharma", date: "2026-03-11", time: "09:03", subject: "Data Structures", status: "present", confidence: 98.5 },
  { id: "3", studentId: "4", studentName: "Ananya Singh", date: "2026-03-11", time: "09:12", subject: "Data Structures", status: "late", confidence: 95.1 },
  { id: "4", studentId: "8", studentName: "Meera Joshi", date: "2026-03-11", time: "09:01", subject: "Data Structures", status: "present", confidence: 99.1 },
  { id: "5", studentId: "1", studentName: "Arjun Patel", date: "2026-03-10", time: "10:02", subject: "Machine Learning", status: "present", confidence: 96.8 },
  { id: "6", studentId: "2", studentName: "Priya Sharma", date: "2026-03-10", time: "10:05", subject: "Machine Learning", status: "present", confidence: 97.3 },
  { id: "7", studentId: "4", studentName: "Ananya Singh", date: "2026-03-10", time: "10:00", subject: "Machine Learning", status: "present", confidence: 98.0 },
  { id: "8", studentId: "3", studentName: "Rahul Kumar", date: "2026-03-11", time: "11:00", subject: "Digital Electronics", status: "present", confidence: 94.5 },
  { id: "9", studentId: "6", studentName: "Sneha Gupta", date: "2026-03-11", time: "11:03", subject: "Digital Electronics", status: "present", confidence: 96.0 },
  { id: "10", studentId: "5", studentName: "Vikram Reddy", date: "2026-03-11", time: "14:00", subject: "Thermodynamics", status: "absent" },
];

export const WEEKLY_ATTENDANCE_DATA = [
  { day: "Mon", present: 85, absent: 15 },
  { day: "Tue", present: 90, absent: 10 },
  { day: "Wed", present: 78, absent: 22 },
  { day: "Thu", present: 92, absent: 8 },
  { day: "Fri", present: 88, absent: 12 },
];

export const DEPARTMENT_ATTENDANCE = [
  { name: "Computer Science", rate: 91 },
  { name: "Electronics", rate: 85 },
  { name: "Mechanical", rate: 88 },
  { name: "Civil", rate: 82 },
];

export const MONTHLY_TREND = [
  { month: "Sep", rate: 82 },
  { month: "Oct", rate: 85 },
  { month: "Nov", rate: 79 },
  { month: "Dec", rate: 74 },
  { month: "Jan", rate: 88 },
  { month: "Feb", rate: 91 },
  { month: "Mar", rate: 89 },
];
