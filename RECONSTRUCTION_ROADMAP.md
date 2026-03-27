# Reconstruction Roadmap: Effects, Validation, and Fixes

This roadmap explains what changed during repository reconstruction, why it matters, and what to validate next.

## 1) Reconstruction goals

- Separate deploy targets cleanly:
  - web app for Vercel
  - backend service for Railway
- Reduce confusion from mixed/legacy layout.
- Keep interview-learning content and side quests intact.

## 2) What changed

### Phase A - Structural split

- Moved Vercel web application from root into `apps/web`:
  - React client moved to `apps/web/client`
  - serverless API moved to `apps/web/api`
  - Vercel config moved to `apps/web/vercel.json`
- Created Railway backend service in `services/backend`:
  - `services/backend/src/server.js`
  - `services/backend/package.json`

### Phase B - Script and docs alignment

- Updated root `package.json` to orchestrate web + backend commands.
- Updated deployment docs and prompt/rules to reference monorepo paths.
- Added side-quest docs for legacy `slideshow-app/` analysis.

### Phase C - Home UX improvement

- Added Side Quest button and panel to homepage.
- Linked side-quest workflow with learner checklist.

## 3) Expected effects

### Positive effects

- Clear ownership of runtime boundaries:
  - Vercel scope is now `apps/web`
  - Railway scope is now `services/backend`
- Easier onboarding and maintenance for new contributors.
- Better interview realism: monorepo + deployment split mirrors production patterns.

### Trade-offs / risks

- Root still contains historical content folders, which can cause uncertainty.
- `slideshow-app/` remains legacy and untracked locally (intentional for side quest).
- Platform dashboards must use the correct root directory after reconstruction.

## 4) Validation performed

- Syntax checks passed:
  - `apps/web/build-direct.js`
  - `apps/web/api/questions.js`
  - `apps/web/api/roadmap/summary.js`
  - `apps/web/api/roadmap/days.js`
  - `services/backend/src/server.js`
- Critical path existence checks passed:
  - `apps/web/client/src/App.js`
  - `apps/web/client/src/components/QuestionsView.js`
  - `apps/web/api/questions.js`
  - `apps/web/api/roadmap/summary.js`
  - `apps/web/vercel.json`
  - `services/backend/src/server.js`
  - `services/backend/package.json`

## 5) Manual validation checklist (next)

Run these after deploy settings are updated:

1. Vercel root directory is set to `apps/web`.
2. Railway root directory is set to `services/backend`.
3. Vercel env var is set:
   - `RAILWAY_API_BASE_URL=https://interview-training-slideshow-production.up.railway.app`
4. Verify endpoints:
   - `/api/roadmap/summary`
   - `/api/roadmap/days?dayNumber=1`
   - `/api/railway/health`
5. Open homepage and confirm Side Quest button renders and navigates correctly.

## 6) Fix roadmap (recommended)

### Fix 1 - Platform consistency (highest priority)

- Confirm Vercel and Railway dashboard root directories and env vars.
- Redeploy both services.

### Fix 2 - Content source policy

- Decide canonical content source:
  - keep root content as source and copy to web API, or
  - move to a dedicated `content/` folder in a future migration.

### Fix 3 - Legacy containment

- Keep `slideshow-app/` as side quest only.
- Optionally add a dedicated note in docs that it is excluded from active deploy.

### Fix 4 - CI checks

- Add a simple CI workflow to validate:
  - key file paths
  - web build command
  - backend start command

---

This reconstruction is functionally aligned with a real project setup; remaining work is mostly deployment configuration validation and optional cleanup hardening.
