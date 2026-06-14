# Nova Semiconductor — Interview Prep (Tomorrow)

**Format:** LeetCode · Logic · Code (C#) · SDLC · Threading & Processes — all in **C#** where code applies.

## Tonight roadmap (recommended order)

| Block | Time | Topic | Web action | Done |
|-------|------|-------|------------|------|
| 1 | 45–60m | **LeetCode (C#)** | Open **Nova Prep → LeetCode** — 22 Q; interview mode on | [ ] |
| 2 | 30–40m | **Logic** | Open **Nova Prep → Logic** — 22 Q | [ ] |
| 3 | 45–60m | **Code (C#)** | Open **Nova Prep → Code** — 22 Q; re-type 5 snippets | [ ] |
| 4 | 30–40m | **SDLC** | Open **Nova Prep → SDLC** — 22 Q | [ ] |
| 5 | 35–45m | **Threading & Processes (C#)** | Open **Nova Prep → Threading** — 22 Q; lock, Task, deadlock | [ ] |
| 6 | 20m | **Mixed drill** | Shuffle one topic; 3 timed answers out loud | [ ] |
| 7 | 10m | **Cheat sheet** | Big O, `async`/threading rules, SDLC phases, STAR story | [ ] |

## Best practices (C# interview)

### LeetCode / live coding
- Clarify input size, duplicates, negatives, and expected complexity before coding.
- State **pattern** (hash map, two pointers, BFS, DP) then write **happy path** first.
- Use **`List<T>`**, **`Dictionary<TKey,TValue>`**, **`HashSet<T>`** — know amortized costs.
- Prefer **iterative** solutions unless recursion is clearly cleaner; mention stack depth.
- After coding: walk **one edge case** and state **time/space** complexity.

### Logic
- Think aloud: restate → brute force → optimize → verify with tiny example; state **time/space** complexity.
- Types covered: **FizzBuzz/state machine**, **XOR/bit tricks**, **primes/sieve/GCD**, **palindrome/Fibonacci**, **hash set**, **Boyer-Moore**, **rotation**, **grid DP**, **prefix sum**, **binary search**, **two pointers/merge**, **stack brackets**, **sliding window & token bucket** rate limits.
- Watch **off-by-one**, **overflow** (`long`/`checked`), and **empty input**.

### Code (C#)
- Know **`async`/`await`**, **`IDisposable`**, **`IEnumerable` vs `IQueryable`**, **LINQ deferred execution**.
- **`string` vs `StringBuilder`**, **value vs reference types**, **nullable reference types**.
- **DI**, **interfaces vs abstract classes**, **exceptions** (when to catch vs let bubble).
- Mention **unit tests** (xUnit/NUnit), **logging** (`ILogger`), **configuration** (`IOptions`).

### Threading & Processes (C#)
- **Process** = isolated address space; **thread** = shared-memory execution unit inside a process.
- **`lock`** / **`Monitor`**, **`SemaphoreSlim`**, **`Interlocked`**, **`ConcurrentDictionary`**, **`BlockingCollection`**, **`Channel<T>`**.
- **`async`** for I/O scalability; **`Task.Run`** / **`Parallel.For`** for CPU parallelism — avoid **`.Result`** deadlocks.
- Know **race conditions**, **deadlock** (lock ordering), and **cooperative cancellation** (`CancellationToken`).

### SDLC
- Know phases: **requirements → design → implementation → test → deploy → maintain**.
- **Agile/Scrum** ceremonies, **Definition of Done**, **code review**, **CI/CD**, **defect lifecycle**.
- In hardware/semiconductor contexts: **traceability**, **change control**, **quality gates**, **regression** — tie answers to reliability and documentation.

## Implementation validation (for this repo)

Run before deploy:

```bash
node scripts/validate-nova-pack.js
```

Expects **≥20 questions per topic** (`leetcode`, `logic`, `code`, `sdlc`, `threading`), each with **Theory**, **Answer**, **Explanation**, and **C#** code where applicable.

## Final verification (before interview)

- [ ] Explained **5 LeetCode** solutions without reading answers.
- [ ] Solved **3 logic** problems on paper with complexity stated.
- [ ] Wrote **2 C#** snippets from memory (`async` method + LINQ + `IDisposable`).
- [ ] Named **all SDLC phases** and one **Agile ceremony** each with purpose.
- [ ] Explained **process vs thread**, **lock vs Interlocked**, and one **deadlock** fix.
- [ ] One **90-second** “tell me about a bug you fixed” story ready.
