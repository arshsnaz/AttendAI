cd backend
mvn clean install
mvn spring-boot:run-- MySQL Database Schema Definition

CREATE DATABASE IF NOT EXISTS attendai_db;
USE attendai_db;

-- 1. Users Table (Admin & Faculty)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL -- 'ADMIN' or 'FACULTY'
);

-- 2. Students Table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    dataset_path VARCHAR(500)
);
CREATE INDEX idx_student_id ON students(student_id);

-- 3. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    faculty_id BIGINT,
    FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50), -- 'PRESENT', 'ABSENT', 'LATE'
    confidence_score DOUBLE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance_per_day (student_id, subject_id, date) 
    -- To prevent duplicate attendance for the same subject explicitly per day
);

CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_student ON attendance(student_id);

-- Insert Default Admin 
-- password is 'admin123' via BCrypt
INSERT IGNORE INTO users (name, email, password, role)
VALUES ('System Admin', 'admin@attendai.com', '$2a$10$vY35Uu7Q.Lh/uN8tP/N14O.8V0n3H1fO70.K6w48v5H.g.zV54/5q', 'ADMIN');