# Backend Dockerfile for AttendAI
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/backend-1.0.0.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
