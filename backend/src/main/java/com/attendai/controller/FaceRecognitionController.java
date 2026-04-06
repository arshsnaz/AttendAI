package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Student;
import com.attendai.entity.Attendance;
import com.attendai.repository.StudentRepository;
import com.attendai.repository.AttendanceRepository;
import com.attendai.repository.SubjectRepository;
import com.attendai.service.FaceRecognitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
public class FaceRecognitionController {
    @Autowired
    private FaceRecognitionService faceRecognitionService;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    @PostMapping("/recognize-image")
    public ResponseEntity<ApiResponse<Attendance>> recognizeFaceFromImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "subjectId", required = false) Long subjectId) throws IOException {
        // Save uploaded image temporarily
        File tempFile = File.createTempFile("scan_", ".jpg");
        image.transferTo(tempFile);
        // Train model (in production, do this only when new data is added)
        String modelPath = "datasets/model.yml";
        faceRecognitionService.trainRecognizer(modelPath);
        // Recognize
        int label = faceRecognitionService.recognizeFace(modelPath, tempFile.getAbsolutePath());
        tempFile.delete();
        // Map label to student
        List<Student> students = studentRepository.findAll();
        if (label < 0 || label >= students.size()) {
            return ResponseEntity.ok(ApiResponse.error("No match found"));
        }
        Student detected = students.get(label);
        Attendance attendance = new Attendance();
        attendance.setStudent(detected);
        if (subjectId != null) {
            subjectRepository.findById(subjectId).ifPresent(attendance::setSubject);
        }
        attendance.setDate(LocalDate.now());
        attendance.setTime(java.time.LocalTime.now());
        attendance.setStatus("Present");
        attendance.setConfidenceScore(90.0); // Placeholder
        attendanceRepository.save(attendance);
        return ResponseEntity.ok(ApiResponse.success(attendance, "Face recognized and attendance marked"));
    }
}
