# Render Backend Deployment

This guide deploys the Spring Boot backend from `backend/` to Render.

## Important constraint
Render does not provide a managed MySQL database in the same way as Railway.
Use an external MySQL database and supply its JDBC URL and credentials as environment variables.

## 1. Prepare the repository
- Confirm the latest backend changes are pushed to `main`.
- Confirm the backend uses env-driven config in `backend/src/main/resources/application.properties`.

## 2. Create the Render service
- Open Render and create a new **Web Service**.
- Connect the GitHub repo `arshsnaz/AttendAI`.
- Choose the branch you want to deploy, usually `main`.

## 3. Set the root directory
- Set the root directory to `backend`.
- Render should build using `backend/Dockerfile`.

## 4. Configure the runtime
- Environment: `Docker`
- Start command is handled by the Dockerfile.
- Service port is provided by Render through `PORT`.

## 5. Add environment variables
Set these values on the Render service:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `SPRING_JPA_HIBERNATE_DDL_AUTO` = `update`
- `DATASET_DIRECTORY`
- `STUDENT_IMAGE_DIR`

If you are keeping the old variable style, the backend still supports:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLDATABASE`
- `MYSQLUSER`
- `MYSQLPASSWORD`

## 6. Handle file uploads
- Render free instances use ephemeral disks.
- If you need uploaded student images to persist, use an external storage service or a paid persistent disk solution.
- For simple API testing, the default local upload path is enough.

## 7. Deploy
- Click **Create Web Service** or **Deploy**.
- Wait for the build to complete.
- Copy the public URL Render gives you.

## 8. Test the backend
- `GET /api/auth/login` is not used; use `POST /api/auth/login`.
- Test `POST /api/auth/register`.
- Test `POST /api/students/upload` with a bearer token.

## Frontend update
- Set the frontend `VITE_API_URL` to the Render backend URL ending in `/api`.
- Rebuild and redeploy the GitHub Pages frontend after changing the API base.