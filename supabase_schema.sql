-- ====================================================================
-- AttendAI - Production Supabase PostgreSQL Schema
-- Run this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if recreating (safe idempotent setup)
-- DROP TABLE IF EXISTS attendance CASCADE;
-- DROP TABLE IF EXISTS students CASCADE;
-- DROP TABLE IF EXISTS subjects CASCADE;
-- DROP TABLE IF EXISTS app_users CASCADE;

-- 3. App Users / Faculty Table
CREATE TABLE IF NOT EXISTS app_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'FACULTY', -- 'ADMIN', 'FACULTY'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_name VARCHAR(255) NOT NULL,
    subject_code VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'STU-1001'
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    department VARCHAR(100) NOT NULL,
    year INTEGER DEFAULT 1,
    face_dataset_count INTEGER DEFAULT 0,
    dataset_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Attendance Log Table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    time VARCHAR(50) NOT NULL, -- e.g. '09:15 AM'
    status VARCHAR(20) DEFAULT 'PRESENT' NOT NULL, -- 'PRESENT', 'LATE', 'ABSENT'
    confidence_score NUMERIC(5, 2) DEFAULT 98.50,
    verification_method VARCHAR(50) DEFAULT 'AI Biometric Scan',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status);
CREATE INDEX IF NOT EXISTS idx_students_dept ON students(department);
CREATE INDEX IF NOT EXISTS idx_students_id ON students(student_id);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- 9. Create Open Access Policies for AttendAI Client
CREATE POLICY "Allow public read access on app_users" ON app_users FOR SELECT USING (true);
CREATE POLICY "Allow public write access on app_users" ON app_users FOR ALL USING (true);

CREATE POLICY "Allow public read access on subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Allow public write access on subjects" ON subjects FOR ALL USING (true);

CREATE POLICY "Allow public read access on students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public write access on students" ON students FOR ALL USING (true);

CREATE POLICY "Allow public read access on attendance" ON attendance FOR SELECT USING (true);
CREATE POLICY "Allow public write access on attendance" ON attendance FOR ALL USING (true);

-- 10. Enable Supabase Realtime on Attendance table
ALTER PUBLICATION supabase_realtime ADD TABLE attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE students;

-- 11. Initial Starter Seed Data (Real starting records)
INSERT INTO subjects (subject_name, subject_code, department) VALUES
('Data Structures & Algorithms', 'CS-201', 'Computer Science'),
('Artificial Intelligence & ML', 'AI-301', 'AI & Data Science'),
('Cloud Computing & DevOps', 'IT-401', 'Information Tech'),
('VLSI Circuit Design', 'EC-302', 'Electronics Eng')
ON CONFLICT (subject_code) DO NOTHING;

INSERT INTO app_users (email, name, role) VALUES
('admin@attendai.com', 'System Administrator', 'ADMIN'),
('faculty@attendai.com', 'Prof. Alan Turing', 'FACULTY')
ON CONFLICT (email) DO NOTHING;

INSERT INTO students (student_id, name, email, department, year, face_dataset_count) VALUES
('STU-1001', 'Aarav Sharma', 'aarav.sharma@univ.edu', 'Computer Science', 2, 25),
('STU-1002', 'Priya Patel', 'priya.patel@univ.edu', 'Computer Science', 3, 25),
('STU-1003', 'Rohan Kulkarni', 'rohan.k@univ.edu', 'Information Tech', 2, 25),
('STU-1004', 'Ananya Deshmukh', 'ananya.d@univ.edu', 'AI & Data Science', 1, 0),
('STU-1005', 'Vikram Mehta', 'vikram.m@univ.edu', 'Electronics Eng', 4, 0)
ON CONFLICT (student_id) DO NOTHING;
