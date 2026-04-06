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

## Backend env file
- Copy `backend/.env.example` to `backend/.env`
- Set your MySQL and JWT values there for local runs

## Railway Deployment
1. Create a new Railway project and add a MySQL database plugin.
2. Deploy the `backend/` folder as a service.
3. Let Railway use the `backend/Dockerfile` or set the service root to `backend`.
4. Set environment variables from Railway MySQL and your app secrets:
	- `MYSQLHOST`
	- `MYSQLPORT`
	- `MYSQLDATABASE`
	- `MYSQLUSER`
	- `MYSQLPASSWORD`
	- `JWT_SECRET`
	- `STUDENT_IMAGE_DIR`
	- `DATASET_DIRECTORY`
	- optional `SPRING_JPA_HIBERNATE_DDL_AUTO`
5. Use the Railway generated public URL as the API base in the frontend.

## Notes for Railway
- `server.port` is mapped to the `PORT` env variable automatically.
- Student uploads need a persistent volume if you want images to survive restarts.
- Without a volume, uploaded files can be lost when Railway redeploys the service.

## Render Deployment
1. Create a new Render Web Service and connect this GitHub repo.
2. Set the root directory to `backend`.
3. Use the Docker environment and `backend/Dockerfile`.
4. Add `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` for your external MySQL database.
5. Add `JWT_SECRET`, `SPRING_JPA_HIBERNATE_DDL_AUTO`, `DATASET_DIRECTORY`, and `STUDENT_IMAGE_DIR`.
6. Remember that Render free instances are ephemeral, so uploaded images should use external storage if persistence matters.

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
