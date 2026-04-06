# Frontend Workspace

This folder documents the frontend application scope.

Repository: https://github.com/arshsnaz/AttendAI
Live demo: https://arshsnaz.github.io/AttendAI/

## Active frontend source
- Main app code: `src/`
- Public assets: `public/`
- Frontend config: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `postcss.config.js`
- Frontend entry routes: `src/App.tsx`

## Run frontend
```bash
npm install
npm run dev
```

## Frontend env file
- Copy `frontend/.env.example` to `frontend/.env`
- Set `VITE_API_URL` to your API base URL

## Notes
The project currently keeps frontend files at repository root for compatibility with existing scripts and deployment setup. This folder is added to provide clear separation by domain without breaking imports or tooling.
