# Backend Workspace (Spring Boot)

This folder contains the Spring Boot API for AttendAI.

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Tech Stack
- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA
- MySQL

## Main Package
- `com.attendai`

## Current Modules
- `controller/` REST endpoints
- `service/` business logic
- `repository/` JPA repositories
- `entity/` domain models
- `dto/` request/response models
- `security/` JWT and security config

## Run Backend
```bash
cd backend
mvn spring-boot:run
```

## Build Backend
```bash
cd backend
mvn clean package
```

## Required Local Services
- MySQL running with database `attendai_db`
- matching credentials in `src/main/resources/application.properties`

## Important Auth Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
