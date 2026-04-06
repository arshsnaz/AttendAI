package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Student;
import com.attendai.repository.StudentRepository;
import com.attendai.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FileStorageService fileStorageService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents() {
        return ResponseEntity.ok(ApiResponse.success(studentRepository.findAll(), "Students fetched successfully"));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success(student.get(), "Student fetched"));
        }
        return ResponseEntity.status(404).body(ApiResponse.error("Student not found"));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<Student>> addStudent(@RequestBody Student student) {
        if (studentRepository.existsByStudentId(student.getStudentId())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Student ID already exists"));
        }
        return ResponseEntity.ok(ApiResponse.success(studentRepository.save(student), "Student added successfully"));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Student>> addStudentWithImage(
            @RequestParam("studentId") String studentId,
            @RequestParam("name") String name,
            @RequestParam("department") String department,
            @RequestParam("year") Integer year,
            @RequestParam("image") MultipartFile image
    ) {
        if (!StringUtils.hasText(studentId) || !StringUtils.hasText(name) || !StringUtils.hasText(department) || year == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("studentId, name, department and year are required"));
        }

        if (studentRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Student ID already exists"));
        }

        String imagePath = fileStorageService.storeStudentImage(image);

        Student student = new Student();
        student.setStudentId(studentId.trim());
        student.setName(name.trim());
        student.setDepartment(department.trim());
        student.setYear(year);
        student.setImagePath(imagePath);

        Student saved = studentRepository.save(student);
        return ResponseEntity.ok(ApiResponse.success(saved, "Student created with image"));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return studentRepository.findById(id).map(student -> {
            student.setName(studentDetails.getName());
            student.setDepartment(studentDetails.getDepartment());
            student.setYear(studentDetails.getYear());
            student.setDatasetPath(studentDetails.getDatasetPath());
            student.setImagePath(studentDetails.getImagePath());
            return ResponseEntity.ok(ApiResponse.success(studentRepository.save(student), "Student updated"));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Student not found")));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success(null, "Student deleted"));
        }
        return ResponseEntity.status(404).body(ApiResponse.error("Student not found"));
    }
}