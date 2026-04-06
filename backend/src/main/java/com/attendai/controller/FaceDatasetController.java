package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Student;
import com.attendai.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/dataset")
public class FaceDatasetController {

    @Autowired
    private StudentRepository studentRepository;

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @PostMapping("/register/{studentId}")
    public ResponseEntity<ApiResponse<String>> registerFaceDataset(@PathVariable Long studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            // Simulate dataset saving by incrementing the count by 25
            student.setFaceDatasetCount((student.getFaceDatasetCount() == null ? 0 : student.getFaceDatasetCount()) + 25);
            student.setDatasetPath("/dataset/" + student.getStudentId());
            studentRepository.save(student);
            return ResponseEntity.ok(ApiResponse.success("Dataset for " + student.getName() + " updated.", "Face dataset capture complete"));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Student not found"));
        }
    }
}