# Railway Backend Deployment

This guide deploys the Spring Boot backend from `backend/` to Railway.

## 1. Prepare the repository
- Make sure the latest backend changes are pushed to `main` on GitHub.
- Confirm the backend uses env-driven config in `backend/src/main/resources/application.properties`.

## 2. Create the Railway project
- Open Railway and create a new project.
- Choose **Deploy from GitHub repo**.
- Select `arshsnaz/AttendAI`.

## 3. Set the backend root
- Configure the service root directory as `backend`.
- Railway should use `backend/Dockerfile`.

## 4. Add MySQL
- Add a Railway MySQL plugin/service to the project.
- Copy the generated MySQL environment variables into the backend service.

## 5. Set environment variables
Add these on the Railway backend service:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLDATABASE`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `JWT_SECRET`
- `SPRING_JPA_HIBERNATE_DDL_AUTO` = `update`
- `STUDENT_IMAGE_DIR` = `/data/uploads/students` if you add a Railway volume
- `DATASET_DIRECTORY` = `/data/uploads/datasets` if you add a Railway volume

## 6. Add a persistent volume for uploads
- If you need uploaded student images to survive redeploys, add a Railway volume.
- Mount it at `/data/uploads`.
- Keep `STUDENT_IMAGE_DIR` and `DATASET_DIRECTORY` inside that mount.

## 7. Deploy
- Redeploy the backend service.
- Railway should build the Dockerfile and expose the app on the assigned `PORT`.

## 8. Test the backend
- Open the Railway service URL.
- Check `GET /api/actuator/health` if enabled.
- Test auth with `POST /api/auth/register` and `POST /api/auth/login`.
- Test student upload with `POST /api/students/upload`.

## Notes
- The backend is not suitable for Vercel because it is a full Spring Boot app.
- Railway is a better fit because it supports long-running containers and MySQL services.