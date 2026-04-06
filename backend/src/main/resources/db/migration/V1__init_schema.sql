-- Flyway migration for AttendAI PostgreSQL schema

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id BIGSERIAL PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    dataset_path VARCHAR(500)
);
CREATE INDEX IF NOT EXISTS idx_student_id ON students(student_id);

CREATE TABLE IF NOT EXISTS subjects (
    id BIGSERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    faculty_id BIGINT,
    FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50),
    confidence_score DOUBLE PRECISION,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT unique_attendance_per_day UNIQUE (student_id, subject_id, date)
);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);

-- Insert Default Admin
INSERT INTO users (name, email, password, role)
VALUES ('System Admin', 'admin@attendai.com', '$2a$10$vY35Uu7Q.Lh/uN8tP/N14O.8V0n3H1fO70.K6w48v5H.g.zV54/5q', 'ADMIN')
ON CONFLICT (email) DO NOTHING;
