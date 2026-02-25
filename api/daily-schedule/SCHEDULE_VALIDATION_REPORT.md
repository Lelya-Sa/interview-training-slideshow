# Schedule Validation Report

Run from repo root: `node scripts/validate-schedule.js`

## What is validated

1. **All days have required topics** – Each day (1–75) has a `topics.md` listing topics with paths. Every day has at least 4 topics.
2. **All topic paths exist** – Every path (e.g. `algorithms/logic-questions/questions.md`) points to an existing file under the project root. Missing topic folders (oop, qa, documentation, advanced-patterns) have been added with stub questions.
3. **Progressive, different questions each day** – The Questions API uses `startIndex = (dayNumber - 1) × count` so:
   - Day 1 gets questions 0..count−1
   - Day 2 gets questions count..2×count−1
   - etc., wrapping when the topic has fewer questions than needed.

So questions **change every day** until the pool is exhausted; then the app wraps. More questions in a topic = less repetition over 75 days.

## Question counts (recommended minimum)

- **Logic**: 3/day × 75 days → **225** questions recommended.
- **LeetCode**: 2/day × 75 days → **150** questions recommended.
- **Data Structures**: 5/day × 75 days → **375** questions (currently met).
- **Other topics**: 12/day × (number of days the topic appears). Example: MVC on 19 days → 19×12 = **228** recommended.

Topics with fewer questions than recommended will wrap earlier (you’ll see repeated questions on later days). The app still works; add more questions to a topic file to reduce repetition.

## Current status

- **Missing files**: 0 (all topic paths exist).
- **Days with &lt; 4 topics**: 0.
- **Data Structures**: 375 questions → OK for 75 days × 5/day.
- Other topics: see script output for which have “LOW” count vs “OK”. Expand any topic’s `questions.md` (using `### 1. Question` … `**Answer:**` … format) to improve coverage.

## Format for topic questions

For the Questions API to parse a topic file correctly, use:

```markdown
### 1. Your question text here?
**Answer:** Your answer here. Can be multiple lines.

### 2. Next question?
**Answer:** Next answer.
```

Use `### N. Question` or `### Question`. Section headers (`##`) or `---` end the current question block.
