# Interview Training Platform

Interactive full-stack interview preparation project with:
- A web app for day-by-day question practice
- API endpoints that load questions from markdown content
- Structured topic coverage across frontend, backend, architecture, algorithms, APIs, and more

## What This Repo Is For

This repository is designed to help learners prepare for technical interviews using:
- Progressive daily study plans
- Topic-based question banks (`questions.md`)
- Q&A format content that can be rendered in the app

It can be used by:
- Individual learners following a 14-day / multi-week prep plan
- Mentors sharing curated interview practice content
- Contributors expanding and maintaining interview question sets

## Repository Structure

- `apps/web` - Frontend + serverless API used by the interview training web experience
  - `apps/web/client` - React client
  - `apps/web/api` - API handlers (questions, roadmap, proxy)
- `services/backend` - Minimal backend service (health/status endpoint scaffold)
- `content` - Canonical interview content (markdown question banks, schedule, topic folders)
- `daily-schedule` - Day-by-day roadmap content used for guided practice
- `scripts` - Content sync/validation utilities

## Core Features

- Daily roadmap with topics per day
- Topic-aware question loading
- Markdown-driven question and answer content
- Multi-domain interview coverage:
  - Algorithms / LeetCode / Logic
  - Frontend (JavaScript, React, CSS, HTML)
  - Backend (Node.js, services, storage, queues)
  - APIs, Architecture, Databases, DevOps, Security, Patterns

## Local Development

### Requirements

- Node.js 18+ (recommended)
- npm

### Install dependencies

```bash
npm run install-all
```

### Run web client

```bash
npm run start:web
```

### Run backend service

```bash
npm run start:backend
```

## Content Format

Question files should follow a consistent markdown structure so the API parser can read them:

- Question header: `### N. Question text`
- Answer block starts with: `**Answer:**`

This format is used in topic files like:
- `content/algorithms/logic-questions/questions.md`
- `content/frontend/react/questions.md`

## Deployment Notes

- `apps/web` is intended for Vercel-style serverless deployment
- `services/backend` can run separately (e.g., Railway) for persistent backend APIs
- CI/CD workflows are defined under `.github/workflows`

## Contribution

When contributing:
- Keep markdown question format consistent
- Prefer small, focused commits
- Validate content paths after moving files/folders
- Test question loading in the app after content updates

---

If you are opening this repository for the first time, start with:
1. `README_STRUCTURE.md`
2. `apps/web`
3. `content/daily-schedule`
