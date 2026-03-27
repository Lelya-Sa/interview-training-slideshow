# Vercel + Railway Setup

This project uses Vercel for frontend/serverless routes and can use Railway for persistent backend services.

## Your Domains

- Vercel app: `https://interview-training-slideshow.vercel.app`
- Railway backend: `https://interview-training-slideshow-production.up.railway.app`

## Architecture

- Vercel: React app and lightweight API routes under `api/`
- Railway: long-running services, workers, and databases
- Vercel proxy route added in code:
  - Public path: `/api/railway/:path*`
  - Internal function: `api/railway-proxy.js`
  - Rewrite: `/api/railway/:path* -> /api/railway-proxy?path=:path*`

## Environment Variables

Set these in Vercel project settings:

- `RAILWAY_API_BASE_URL=https://interview-training-slideshow-production.up.railway.app`

Set service-specific secrets in Railway (database URLs, API keys, etc.).

## Suggested Flow

1. Push code to GitHub `main`.
2. Connect GitHub repo to Vercel and deploy.
3. Create Railway service(s) for persistent backend needs.
4. Add Railway URL to Vercel env vars.
5. Validate:
   - `/api/roadmap/summary` works on Vercel
   - `/api/railway/health` succeeds (if Railway has `/health`)
   - any other Vercel to Railway calls succeed (example: `/api/railway/api/users`)
   - CORS/auth rules are correct

## Notes

- Keep user-facing routes on Vercel.
- Keep stateful infra on Railway.
- Do not store secrets in code; use platform env vars.
- Use Railway domain without adding `:4000` in public URLs.
