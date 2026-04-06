# AttendAI Project Documentation

## Overview
AttendAI is an AI-powered attendance system with face recognition, RBAC, reporting, and export features.

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Features
- Face registration and recognition (OpenCV, Bytedeco)
- Automated attendance marking
- Role-based access control (admin, faculty, student)
- Attendance reports (daily, monthly, department)
- Export to PDF/CSV
- Modern React frontend (Vite, TypeScript)
- RESTful Spring Boot backend

## Setup
1. Clone the repository from https://github.com/arshsnaz/AttendAI.
2. Configure `application.properties` for database and dataset directory.
3. Run backend: `cd backend && mvn spring-boot:run`
4. Run frontend: `npm install && npm run dev`

## Testing
- Frontend: `npm run test` (Vitest)
- Backend: Use Postman or integration tests for API endpoints.

## Deployment
- Build frontend: `npm run build`
- Package backend: `mvn package`
- Deploy to server or cloud (see deployment guide).

## API Endpoints
- `/api/dataset/upload/{studentId}`: Upload face images
- `/api/attendance/recognize-image`: Recognize face and mark attendance
- `/api/attendance/export/pdf`: Export attendance report as PDF
- `/api/auth/login`: User authentication

## Notes
- Ensure OpenCV native libraries are available for backend.
- RBAC restricts access based on user role.
- All features are tested and validated.

## Contact
For support, contact the developer or refer to the README.
