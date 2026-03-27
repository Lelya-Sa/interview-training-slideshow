# Cursor AI – Interview Training Project Prompt

**Use this prompt when you want Cursor to help you improve or extend this project. Paste it at the start of a new chat so the AI reads the project first and asks what you want to add.**

---

## Instructions for the AI

You are helping with an **interview preparation project** for **junior developer** roles. Your job is to:

1. **Initialize Git context first**:
   - Treat `C:/Users/lelya/Desktop/intreview_training` as the **VCS root** for all Git operations.
   - Use this remote as `origin`: `https://github.com/Lelya-Sa/interview-training-slideshow.git`.
   - Verify Git connection at the start by running: `git rev-parse --show-toplevel` and `git status`.
   - Verify or set remote safely:
     - Check: `git remote -v`
     - If missing or wrong URL, run: `git remote remove origin` (only if needed) then `git remote add origin https://github.com/Lelya-Sa/interview-training-slideshow.git`
   - If current working directory is not this repo root, switch to it before doing anything else.
   - Never run destructive Git commands (`reset --hard`, force-push, or checkout that discards local changes) unless explicitly requested.

2. **Read the project carefully** before making any changes:
   - **Monorepo root**: `package.json` orchestrates commands.
   - **Web app (Vercel)**: `apps/web` (`apps/web/vercel.json`, `apps/web/build-direct.js`) — React app + Vercel serverless, build outputs to `apps/web/build/`.
   - **Client**: `apps/web/client/` — React app (`apps/web/client/src/App.js`, `apps/web/client/src/components/QuestionsView.js`). Uses `/api/roadmap/summary`, `/api/roadmap/days/:dayNumber`, `/api/questions?path=...&dayNumber=...&topicName=...`.
   - **API**: `apps/web/api/` — Vercel serverless:
     - `apps/web/api/roadmap/summary.js` — GET, returns all days (1–34) with topic names from `apps/web/api/daily-schedule/day-NN/topics.md`.
     - `apps/web/api/roadmap/days.js` — GET `?dayNumber=N`, returns day N with topics (name + path) parsed from `apps/web/api/daily-schedule/day-NN/topics.md`.
     - `apps/web/api/questions.js` — GET `?path=...&dayNumber=...&topicName=...&count=...`, serves questions from markdown under `apps/web/api/` (e.g. `frontend/javascript/questions.md`). Parses `### N. Question` / `### Question` and `**Answer:**` blocks.
   - **Railway backend**: `services/backend/src/server.js`, deployed from `services/backend`.
   - **Build**: `apps/web/build-direct.js` copies content folders into `apps/web/api/` then builds React to `apps/web/build/`.

3. **Ask the user what they want** before implementing:
   - "What would you like to add or improve? For example: new day/topic, new question bank, new UI feature, new API, or fix/refactor."
   - If they say "add questions" or "add a topic", ask: "Which topic or day should this go under, and do you have the exact questions/answers or should I suggest a structure?"
   - If they say "improve", ask: "Which part: roadmap UI, question view, API, content structure, or something else?"
   - If prompt is just initialized or user names a topic, create a **3-month (12-week) job-ready schedule** for that topic before coding changes.
   - The schedule must include:
     - weekly goals (Week 1-12),
     - daily practice split (theory, coding, interview Q&A, revision),
     - milestones every 2 weeks,
     - mini-project tasks,
     - mock interview checkpoints,
     - measurable validation criteria (what "done" means each week).
   - Ask follow-ups needed to personalize schedule: current level, available hours/day, target role (frontend/backend/fullstack), and deadline date.

4. **Apply changes with validation**:
   - **New or edited `topics.md`**: Use exact format — `### Topic Name` then a line with `**Path**: \`../../relative/path/to/questions.md\`` (path from day folder up to `api/` then down, e.g. `../../frontend/javascript/questions.md`). No stray characters; paths must match existing or new files under `api/`.
   - **New or edited `questions.md`**: Use format `### N. Question text` or `### Question text`, then `**Answer:**` and the answer. Keep numbering consistent if you add to an existing file.
   - **New API**: Follow existing style (GET, `req.query`, JSON `{ success, ... }`), validate inputs (e.g. `dayNumber` 1–34 for roadmap days), return 400/404/405 where appropriate.
   - **Client**: Match existing patterns (axios, `res.data.success`, state for loading/error). Don’t break existing props or API contracts (e.g. `QuestionsView` expects `dayNumber`, `onClose`).
   - **Constants**: If you add a new day range (e.g. 35+), update both `api/roadmap/summary.js` (loop over days) and `api/roadmap/days.js` (dayNumber validation) and client `TOTAL_DAYS` / roadmap copy if shown.
   - After edits: suggest running the app (`npm run install-all` then `npm run build` or client `npm start` with a local API) and optionally checking that `/api/roadmap/summary`, `/api/roadmap/days?dayNumber=1`, and `/api/questions?path=frontend/javascript/questions.md&topicName=Javascript&dayNumber=1` return valid JSON.

5. **Deployment collaboration (Vercel + Railway)**:
   - Treat Vercel as the frontend/static + serverless edge entrypoint for this repo.
   - Use Railway for long-running backend services, jobs, workers, or databases when needed.
   - When adding backend-heavy features, design for this split:
     - Vercel: UI + lightweight API routes + proxy layer.
     - Railway: persistent services (e.g., Express/Nest/Fastify API, DB, Redis, background jobs).
   - Keep environment variables documented and separated by platform (`VERCEL_*`, app public vars, Railway service vars).
   - Validate integration by checking:
     - frontend calls to Vercel API/proxy,
     - Vercel route to Railway service URL,
     - CORS/auth and error handling.

6. **3-month job-ready objective**:
   - The primary objective is to make the user job-ready in 3 months.
   - Prefer actions that improve structured progression, interview readiness, and measurable skill growth.

7. **Stay on purpose**: Every change should support **junior developer interview prep** — clearer questions, better coverage, easier navigation, or more reliable behavior. Don’t add unrelated features.

---

## Short version (paste this into Cursor)

```
This repo is a junior developer interview prep app in a monorepo: Vercel web app under apps/web (React + serverless API) and Railway backend under services/backend. It has a roadmap in apps/web/api/daily-schedule/day-NN/topics.md, API routes /api/roadmap/summary, /api/roadmap/days?dayNumber=N, and /api/questions?path=... which serve questions from markdown files under apps/web/api/ (format: ### Question then **Answer:**).

Git/VCS rules first:
1. Use C:/Users/lelya/Desktop/intreview_training as the VCS root.
2. Use this remote URL as origin: https://github.com/Lelya-Sa/interview-training-slideshow.git
3. At chat start run git rev-parse --show-toplevel, git status, and git remote -v to confirm context.
4. If not in that root, switch to it before any edits or commands.
5. Do not run destructive git commands unless I explicitly ask.

Deployment architecture:
- Prefer Vercel for frontend and lightweight serverless routes.
- Prefer Railway for persistent backend services/databases/workers.
- If I ask for deployment improvements, propose and implement Vercel+Railway integration with env vars, proxying, and validation steps.

Before changing anything:
1. Read the project: apps/web/client (App.js, QuestionsView), apps/web/api (roadmap/summary.js, roadmap/days.js, questions.js), services/backend, and the structure of roadmap/question markdown.
2. Ask me what I want to add or improve (e.g. new day/topic, new questions, UI feature, fix).
3. If I give a topic, first generate a 12-week job-ready schedule for that topic with weekly goals, daily practice plan, milestones, projects, mock interviews, and validation criteria.
4. Implement it following existing conventions: topics.md format (### Name, **Path**: `...`), questions.md format (### N. Question, **Answer:**), API response shape { success, ... }, and update any day ranges or constants if we add days.

After implementing, suggest how I can validate (build, run, hit the APIs).
```

---

You can save the short version in `.cursor/rules` or in a rule file so Cursor applies this context automatically in this project.
