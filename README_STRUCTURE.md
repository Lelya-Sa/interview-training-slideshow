# Repository Structure (Vercel + Railway)

This repository is organized as a monorepo with clear deployment boundaries:

- `apps/web` -> frontend + Vercel serverless API
- `services/backend` -> Railway backend service
- repo root -> orchestration scripts and shared learning content

## Final structure

```text
intreview_training/
  apps/
    web/
      api/                  # Vercel serverless functions
      client/               # React app
      build-direct.js       # Build/copy script for web app
      package.json
      vercel.json
  services/
    backend/
      src/
        server.js           # Railway service entrypoint
      package.json
  content/                 # canonical learning/content source
    ai/
      LEARNING_PLAN.md
      SIDE_QUEST_CHECKLIST.md
    daily-schedule/
    algorithms/
    apis/
    architecture/
    backend/
    databases/
    devops/
    security/
    design-patterns/
    logic-building-101/
    qa/
    documentation/
    oop/
    advanced-patterns/
  package.json              # root orchestrator scripts
  DEPLOYMENT_VERCEL_RAILWAY.md
  CURSOR_PROMPT.md
```

## Deployment mapping

- Vercel root directory: `apps/web`
- Railway root directory: `services/backend`

Required Vercel env var:

- `RAILWAY_API_BASE_URL=https://interview-training-slideshow-production.up.railway.app`

## Root scripts

From repo root `package.json`:

- `npm run install-all` -> installs web and backend dependencies
- `npm run content:sync` -> syncs canonical `content/` into `apps/web/api`
- `npm run content:validate` -> validates canonical/runtime content presence
- `npm run content:check` -> sync + validate
- `npm run build:web` -> builds web app in `apps/web`
- `npm run start:web` -> starts frontend dev server
- `npm run start:backend` -> starts Railway backend service locally

## CI/CD

- GitHub Actions workflow: `.github/workflows/ci-cd.yml`
- CI checks:
  - canonical content sync + validate
  - web build
  - backend startup smoke test
- CD verification on `main` push:
  - Vercel roadmap endpoint
  - Railway health endpoint
  - Vercel -> Railway proxy health endpoint

## Notes on legacy folders

- `slideshow-app/` is intentionally not part of active deployment.
- It is treated as a learner side quest (legacy comparison/refactor practice).
