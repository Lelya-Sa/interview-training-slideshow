# Topic-by-topic: In schedule? In program?

Run: `node scripts/check-topics-schedule-and-program.js` (from intreview_training)

## What is checked

- **In schedule**: Topic path appears in at least one day's `topics.md` (days 1–75).
- **In program**: File `questions.md` exists at that path under project root (intreview_training).  
  The app (Questions API) reads these files from the project root; `slideshow-app` and `daily-schedule` are excluded from “program” paths.

## Result (last run)

| Metric | Count |
|--------|--------|
| Total topic paths (union) | 66 |
| In both schedule and program | 65 |
| In schedule but NOT in program (missing file) | 0 |
| In program but NOT in schedule (unused) | 1 |

### Unused in schedule (file exists only)

- `design-patterns/questions.md` – exists in the repo but is never referenced in any day’s `topics.md`. The schedule uses the sub-topics (e.g. `design-patterns/creational/singleton/questions.md`, `design-patterns/behavioral/observer/questions.md`) instead.

You can either add this topic to specific days in the schedule or leave it as extra content; the app will not load it unless a day references it.

## Full table

The script prints a table with columns:

- **Topic path** – relative to intreview_training
- **In schedule** – Yes/No
- **In program** – Yes/No  
- **Days (if in schedule)** – comma-separated day numbers where the topic appears

Re-run the script to see the current full table.
