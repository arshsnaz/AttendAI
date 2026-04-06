# Project Structure Plan

This repository uses a domain-based split:

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Current Effective Structure
- Frontend app: root `src/`, `public/`, Vite/Tailwind configs at root
- Backend app: `backend/` (Spring Boot)
- Database assets: `database/`

## Why frontend stays at root currently
The frontend is intentionally left at root to avoid breaking existing:
- import aliases
- Vite/Tailwind/TS config paths
- deployment scripts

## Safe next migration (optional)
When ready, move frontend physically into `frontend/` in one planned step and update:
- `vite.config.ts` root
- `tsconfig*.json` include paths
- CI/CD and Docker context paths
- npm scripts

## Recommended backend expansion
For a production-grade Spring Boot backend, continue inside `backend/` and add:
- request validation (`jakarta.validation`)
- service interfaces + implementations
- migration strategy (Flyway/Liquibase, single dialect)
- profile-based configs (`application-dev.properties`, `application-prod.properties`)
- integration tests for auth and attendance flows
