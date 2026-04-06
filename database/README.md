# Database Workspace

This folder centralizes database artifacts for AttendAI.

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Files
- `schema.sql`: MySQL schema definition
- `seed.sql`: seed data used for local setup

## Apply locally
```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```

## Related backend config
See `backend/src/main/resources/application.properties`.
