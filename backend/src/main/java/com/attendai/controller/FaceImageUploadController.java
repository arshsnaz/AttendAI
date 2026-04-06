package com.attendai.controller;

import com.attendai.dto.ApiResponse;
import com.attendai.entity.Student;
import com.attendai.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/dataset")
public class FaceImageUploadController {

    @Autowired
    private StudentRepository studentRepository;

    @Value("${dataset.directory}")
    private String datasetDirectory;

    @PostMapping("/upload/{studentId}")
    public ResponseEntity<ApiResponse<String>> uploadFaceImages(@PathVariable Long studentId, @RequestParam("images") MultipartFile[] images) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Student not found"));
        }
        Student student = studentOpt.get();
        String datasetDir = datasetDirectory + "/" + student.getStudentId();
        File dir = new File(datasetDir);
        System.out.println("Saving images to: " + dir.getAbsolutePath()); // Log absolute path
        if (!dir.exists()) dir.mkdirs();
        int saved = 0;
        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                String filename = StringUtils.cleanPath(image.getOriginalFilename());
                Path filePath = Paths.get(datasetDir, filename);
                try {
                    Files.write(filePath, image.getBytes());
                    System.out.println("Saved image: " + filePath.toAbsolutePath()); // Log each saved image
                    saved++;
                } catch (IOException e) {
                    System.err.println("Failed to save image: " + filename + " Error: " + e.getMessage()); // Log error
                    return ResponseEntity.status(500).body(ApiResponse.error("Failed to save image: " + filename));
                }
            }
        }
        student.setFaceDatasetCount((student.getFaceDatasetCount() == null ? 0 : student.getFaceDatasetCount()) + saved);
        student.setDatasetPath(datasetDir);
        studentRepository.save(student);
        return ResponseEntity.ok(ApiResponse.success("Uploaded " + saved + " images.", "Images uploaded successfully"));
    }
}
