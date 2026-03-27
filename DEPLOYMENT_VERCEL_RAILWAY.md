# Vercel + Railway Setup

This project uses Vercel for frontend/serverless routes and can use Railway for persistent backend services.

## Architecture

- Vercel: React app and lightweight API routes under `api/`
- Railway: long-running services, workers, and databases

## Environment Variables

Set these in Vercel project settings:

- `RAILWAY_API_BASE_URL` - base URL of your Railway service (for proxy/integration routes)

Set service-specific secrets in Railway (database URLs, API keys, etc.).

## Suggested Flow

1. Push code to GitHub `main`.
2. Connect GitHub repo to Vercel and deploy.
3. Create Railway service(s) for persistent backend needs.
4. Add Railway URL to Vercel env vars.
5. Validate:
   - `/api/roadmap/summary` works on Vercel
   - any Vercel to Railway calls succeed
   - CORS/auth rules are correct

## Notes

- Keep user-facing routes on Vercel.
- Keep stateful infra on Railway.
- Do not store secrets in code; use platform env vars.
