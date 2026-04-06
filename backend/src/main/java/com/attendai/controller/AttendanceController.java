package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Attendance;
import com.attendai.repository.AttendanceRepository;
import com.attendai.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private StudentRepository studentRepository;

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<Attendance>>> getAllAttendance() {
        return ResponseEntity.ok(ApiResponse.success(attendanceRepository.findAll(), "All attendance fetched"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @GetMapping("/daily")
    public ResponseEntity<ApiResponse<List<Attendance>>> getDailyAttendance() {
        return ResponseEntity.ok(ApiResponse.success(attendanceRepository.findByDate(LocalDate.now()), "Daily attendance fetched"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<Attendance>>> getStudentAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(ApiResponse.success(attendanceRepository.findByStudentId(studentId), "Student attendance fetched"));
    }
    
    @PreAuthorize("hasRole('FACULTY')")
    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<Attendance>> markAttendanceManually(@RequestBody Attendance attendance) {
        attendance.setDate(LocalDate.now());
        attendance.setTime(java.time.LocalTime.now());
        return ResponseEntity.ok(ApiResponse.success(attendanceRepository.save(attendance), "Attendance marked"));
    }

    @Autowired
    private com.attendai.repository.SubjectRepository subjectRepository;

    @PreAuthorize("hasRole('FACULTY')")
    @PostMapping("/recognize")
    public ResponseEntity<ApiResponse<Attendance>> recognizeFace(@RequestParam(required = false) Long subjectId) {
        // Mocking AI Recognition by returning a random student from DB (if any)
        List<com.attendai.entity.Student> students = studentRepository.findAll();
        if (students.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("No students registered for recognition"));
        }
        
        com.attendai.entity.Student detected = students.get(new java.util.Random().nextInt(students.size()));
        
        Attendance attendance = new Attendance();
        attendance.setStudent(detected);
        if (subjectId != null) {
            subjectRepository.findById(subjectId).ifPresent(attendance::setSubject);
        }
        attendance.setDate(LocalDate.now());
        attendance.setTime(java.time.LocalTime.now());
        attendance.setStatus("Present");
        attendance.setConfidenceScore(85.0 + new java.util.Random().nextDouble() * 14.9);
        
        return ResponseEntity.ok(ApiResponse.success(attendanceRepository.save(attendance), "Face Recognized Successfully: " + detected.getName()));
    }
}