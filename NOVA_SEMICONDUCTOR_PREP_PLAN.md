# Nova Semiconductor — Interview Prep (Tomorrow)

**Format:** LeetCode · Logic · Code (C#) · SDLC — all in **C#** where code applies.

## Tonight roadmap (recommended order)

| Block | Time | Topic | Web action | Done |
|-------|------|-------|------------|------|
| 1 | 45–60m | **LeetCode (C#)** | Open **Nova Prep → LeetCode** — 22 Q; interview mode on | [ ] |
| 2 | 30–40m | **Logic** | Open **Nova Prep → Logic** — 22 Q | [ ] |
| 3 | 45–60m | **Code (C#)** | Open **Nova Prep → Code** — 22 Q; re-type 5 snippets | [ ] |
| 4 | 30–40m | **SDLC** | Open **Nova Prep → SDLC** — 22 Q | [ ] |
| 5 | 20m | **Mixed drill** | Shuffle one topic; 3 timed answers out loud | [ ] |
| 6 | 10m | **Cheat sheet** | One page: Big O patterns, `async` rules, SDLC phases, your STAR story | [ ] |

## Best practices (C# interview)

### LeetCode / live coding
- Clarify input size, duplicates, negatives, and expected complexity before coding.
- State **pattern** (hash map, two pointers, BFS, DP) then write **happy path** first.
- Use **`List<T>`**, **`Dictionary<TKey,TValue>`**, **`HashSet<T>`** — know amortized costs.
- Prefer **iterative** solutions unless recursion is clearly cleaner; mention stack depth.
- After coding: walk **one edge case** and state **time/space** complexity.

### Logic
- Think aloud: restate problem → brute force → optimize → verify with a tiny example.
- Watch **off-by-one**, **integer overflow** (`checked` / `long`), and **empty input**.
- For puzzles: list **invariants** and **contradictions** before guessing.

### Code (C#)
- Know **`async`/`await`**, **`IDisposable`**, **`IEnumerable` vs `IQueryable`**, **LINQ deferred execution**.
- **`string` vs `StringBuilder`**, **value vs reference types**, **nullable reference types**.
- **DI**, **interfaces vs abstract classes**, **exceptions** (when to catch vs let bubble).
- Mention **unit tests** (xUnit/NUnit), **logging** (`ILogger`), **configuration** (`IOptions`).

### SDLC
- Know phases: **requirements → design → implementation → test → deploy → maintain**.
- **Agile/Scrum** ceremonies, **Definition of Done**, **code review**, **CI/CD**, **defect lifecycle**.
- In hardware/semiconductor contexts: **traceability**, **change control**, **quality gates**, **regression** — tie answers to reliability and documentation.

## Implementation validation (for this repo)

Run before deploy:

```bash
node scripts/validate-nova-pack.js
```

Expects **≥20 questions per topic** (`leetcode`, `logic`, `code`, `sdlc`), each with **Theory**, **Answer**, **Explanation**, and **C#** code where applicable.

## Final verification (before interview)

- [ ] Explained **5 LeetCode** solutions without reading answers.
- [ ] Solved **3 logic** problems on paper with complexity stated.
- [ ] Wrote **2 C#** snippets from memory (`async` method + LINQ + `IDisposable`).
- [ ] Named **all SDLC phases** and one **Agile ceremony** each with purpose.
- [ ] One **90-second** “tell me about a bug you fixed” story ready.
