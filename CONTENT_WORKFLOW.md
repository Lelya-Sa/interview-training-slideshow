# Content Workflow (Best Practice)

## Canonical source

- Edit learning content only under `content/`.
- Treat `apps/web/api/**` markdown content as generated runtime copy.

## Commands

- `npm run content:sync` -> copies canonical content to runtime API paths.
- `npm run content:validate` -> validates expected source/runtime files.
- `npm run content:check` -> runs sync then validation.

## Rules for contributors

1. Do not manually edit generated content in `apps/web/api/**`.
2. Make edits in `content/**`, then run `npm run content:check`.
3. Before opening a PR, verify:
   - roadmap endpoints still work,
   - question files resolve correctly,
   - no missing `topics.md` / `questions.md` paths.

## Why this exists

- Prevents source/runtime drift.
- Keeps Vercel serverless runtime files consistent.
- Makes content migrations safer and reviewable.
