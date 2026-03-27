# Content Migration Roadmap (Best-Practice Baseline)

Purpose: migrate to a single canonical content workflow and validate each phase safely.

## Target state

- Canonical authoring source: `content/`
- Runtime copy for Vercel API: `apps/web/api/...` (generated/synced, not manually edited)
- One sync pipeline used by build and validation
- Clear contributor rules + automated checks

## Status (current)

- Phase 1: In progress (canonical `content/` established).
- Phase 2: In progress (sync pipeline implemented in scripts + build integration).
- Phase 3: Started (`CONTENT_WORKFLOW.md` and npm commands added).
- Phase 4: Implemented (GitHub Actions CI/CD workflow added).
- Phase 5: Pending.

---

## Phase 0 - Baseline and safety

### Actions

1. Freeze content structure decisions (no ad-hoc folder edits during migration).
2. Record current paths that contain interview markdown.
3. Create migration branch checkpoint.

### Validation gate

- Project builds before migration.
- Existing endpoints return data:
  - `/api/roadmap/summary`
  - `/api/roadmap/days?dayNumber=1`
  - `/api/questions?path=frontend/javascript/questions.md&topicName=Javascript&dayNumber=1`

### Exit criteria

- Baseline behavior is documented and reproducible.

---

## Phase 1 - Create canonical source

### Actions

1. Add top-level `content/` directory.
2. Move canonical topic folders into `content/`:
   - `daily-schedule/`
   - `algorithms/`, `apis/`, `architecture/`, `backend/`, `databases/`, `devops/`, `security/`, `design-patterns/`, `logic-building-101/`, `ai/`
   - `qa/`, `documentation/`, `oop/`, `advanced-patterns/`
3. Keep `apps/web/api/...` unchanged for now (runtime continuity).

### Validation gate

- Files exist in `content/` with expected markdown counts.
- No runtime path breakage yet.

### Exit criteria

- Canonical source lives in `content/` with complete copy of required files.

---

## Phase 2 - Sync pipeline implementation

### Actions

1. Add dedicated sync script (e.g. `scripts/sync-content.js`).
2. Update `apps/web/build-direct.js` to sync from `content/` only.
3. Ensure sync rules are deterministic:
   - copy `questions.md`, `README.md`, and roadmap markdown used at runtime
   - remove stale generated folders before copy

### Validation gate

- Running sync twice gives same output (idempotent).
- Generated runtime files under `apps/web/api` match canonical source.

### Exit criteria

- Runtime content is fully generated from `content/`.

---

## Phase 3 - Guardrails and policy

### Actions

1. Add `CONTENT_WORKFLOW.md` with editing rules:
   - edit only `content/`
   - treat `apps/web/api` content as generated
2. Add validation script to detect direct edits in generated paths.
3. Add npm scripts:
   - `content:sync`
   - `content:validate`
   - `content:check` (sync + validate)

### Validation gate

- `content:validate` fails on intentional bad edit in generated folder.
- `content:check` passes on clean repo.

### Exit criteria

- Contributors have explicit rules and automation enforces them.

---

## Phase 4 - CI enforcement

### Actions

1. Add CI workflow for:
   - web build
   - backend start smoke check
   - content validation script
2. Make CI block merges on failed content integrity.

### Validation gate

- CI passes on migration branch.
- CI fails when generated/runtime content is manually changed.

### Exit criteria

- Workflow is self-policing and repeatable.

---

## Phase 5 - Cleanup and de-risking

### Actions

1. Remove or archive obsolete duplicate source paths (after confirmation).
2. Keep `slideshow-app/` only as optional learning side-quest, not deploy input.
3. Update deployment docs with final canonical content flow.

### Validation gate

- Vercel + Railway deploys green.
- Side quest remains documented but isolated from runtime.

### Exit criteria

- Final structure is clean, documented, and stable.

---

## Validator checklist (use during execution)

- [ ] Canonical source is only `content/`
- [ ] Sync script runs successfully
- [ ] Generated runtime content is refreshed from source
- [ ] API endpoints still return expected payloads
- [ ] Build succeeds in `apps/web`
- [ ] Backend starts in `services/backend`
- [ ] CI validates content workflow
- [ ] Docs updated and consistent

---

## Rollback strategy

- Keep phase-by-phase commits.
- If a phase fails validation, revert only that phase commit.
- Never combine structure move + script refactor + cleanup in one commit.

---

## Recommended commit plan

1. `chore(content): add content/ canonical source scaffold`
2. `chore(content): add sync pipeline and build integration`
3. `chore(content): add validation guards and workflow docs`
4. `ci(content): enforce content checks in pipeline`
5. `chore(cleanup): remove obsolete content duplicates`
