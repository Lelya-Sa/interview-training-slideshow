# Side Quest Checklist - Repository Archaeology

Use this checklist to practice real-world refactoring and migration planning.

Goal: analyze legacy `slideshow-app/` vs current `apps/web/` without breaking production.

---

## 1) Baseline and context

- [ ] Confirm current deploy roots:
  - Vercel -> `apps/web`
  - Railway -> `services/backend`
- [ ] Confirm `slideshow-app/` is not part of active deployment.
- [ ] Write a short note: "What problem this side quest solves."

Output:
- 3-5 sentence context summary.

---

## 2) Structure comparison

- [ ] Compare folder trees:
  - `slideshow-app/client` vs `apps/web/client`
  - `slideshow-app/api` (if exists) vs `apps/web/api`
- [ ] List duplicated top-level files (e.g. `package.json`, `vercel.json`, build scripts).
- [ ] Mark each duplicate as:
  - Keep in active app
  - Legacy only
  - Needs manual review

Output:
- A table with columns: `Path`, `Duplicate of`, `Decision`, `Reason`.

---

## 3) Risk review

- [ ] Identify risky removals (config files, build scripts, API handlers).
- [ ] Identify low-risk removals (obsolete docs, duplicate static files, unused scripts).
- [ ] Define rollback strategy:
  - commit boundary
  - restore command/path

Output:
- Risk list with `Low/Medium/High` labels.

---

## 4) Cleanup proposal (no deletion yet)

- [ ] Propose Phase 1 (low-risk) cleanup list.
- [ ] Propose Phase 2 (medium-risk) cleanup list.
- [ ] Define success criteria:
  - web build passes
  - `/api/roadmap/summary` works
  - `/api/railway/health` works

Output:
- Draft PR plan with phased tasks.

---

## 5) Interview-ready reflection

- [ ] Write one STAR-style story from this exercise:
  - Situation
  - Task
  - Action
  - Result
- [ ] Add 3 lessons learned:
  - migration safety
  - deployment boundaries
  - rollback planning

Output:
- 1 interview story + 3 bullet lessons.

---

## Done definition

You are done when:

- [ ] You can clearly explain why `apps/web` is canonical and `slideshow-app/` is legacy.
- [ ] You have a staged cleanup plan with rollback.
- [ ] You can present this as a junior-level refactor case study.
