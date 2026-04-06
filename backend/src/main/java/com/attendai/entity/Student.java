package com.attendai.entity;

import jakarta.persistence.*;
// Removed Lombok @Data

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false, unique = true)
    private String studentId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private Integer year;

    @Column(name = "dataset_path")
    private String datasetPath;

    @Column(name = "image_path", length = 500)
    private String imagePath;

    @Column(name = "face_dataset_count")
    private Integer faceDatasetCount = 0;
    
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getStudentId() { return studentId; }
        public void setStudentId(String studentId) { this.studentId = studentId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        public String getDatasetPath() { return datasetPath; }
        public void setDatasetPath(String datasetPath) { this.datasetPath = datasetPath; }
        public String getImagePath() { return imagePath; }
        public void setImagePath(String imagePath) { this.imagePath = imagePath; }
        public Integer getFaceDatasetCount() { return faceDatasetCount; }
        public void setFaceDatasetCount(Integer faceDatasetCount) { this.faceDatasetCount = faceDatasetCount; }
}