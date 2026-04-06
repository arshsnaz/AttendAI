# AttendAI

AttendAI is an AI-powered attendance management platform with face recognition, role-based access, reporting, and export support.

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Stack
- Frontend: React, TypeScript, Vite, Tailwind, shadcn/ui
- Backend: Spring Boot, Spring Security, JWT, MySQL
- Database: MySQL schema + seed scripts

## Project Organization
- Frontend app source: `src/` and `public/`
- Backend service: `backend/`
- Database artifacts: `database/`
- Architecture notes: `docs/PROJECT_STRUCTURE.md`

Additional organization docs:
- `frontend/README.md`
- `backend/README.md`
- `database/README.md`

## Local Setup

### 1. Start backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Start frontend
```bash
npm install
npm run dev
```

Frontend uses `VITE_API_URL` if provided, otherwise defaults to:
`http://localhost:8082/api`

## Authentication Endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`

## Default Admin (seeded)
- Email: `admin@attendai.com`
- Password: `admin123`

## Database
- Schema file: `database/schema.sql`
- Seed file: `database/seed.sql`

## Build and Tests
```bash
npm run lint
npm run test
npm run build
```
