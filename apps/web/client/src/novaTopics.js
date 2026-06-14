/**
 * Nova Semiconductor interview topics — aligns with NOVA_SEMICONDUCTOR_PREP_PLAN.md
 */
export const NOVA_TOPICS = [
  {
    slug: 'leetcode',
    title: 'LeetCode (C#)',
    headline: 'LeetCode · C# patterns',
    intro:
      'Hash map, stack, linked list, binary search, two pointers, sliding window, greedy, 1D DP, heap, tree DFS/BFS, backtracking, grid DFS, and intervals — 22 patterns with C# solutions, complexity, edge cases, and follow-ups.',
    bestPractices: [
      'Ask about input size, duplicates, and negative numbers before coding.',
      'Prefer Dictionary, HashSet, List — know amortized O(1) vs O(n).',
      'Say pattern name aloud (e.g. “two pointers”) then implement.',
      'Walk one edge case and state time/space complexity at the end.'
    ],
    verify: 'Explain 5 patterns without notes; code Two Sum, Valid Parentheses, and one tree or grid DFS from memory.'
  },
  {
    slug: 'logic',
    title: 'Logic',
    headline: 'Logic · puzzles & reasoning',
    intro:
      'Control flow, bit tricks, number theory, two pointers, binary search, prefix sums, stack, sliding window, greedy (Kadane, jump game), string anagrams, peak-finding, puzzles, and rate limits — 30 questions with complexity and edge cases.',
    bestPractices: [
      'Restate the problem and list constraints before guessing.',
      'Watch off-by-one, overflow (use long/checked), empty input.',
      'For puzzles, name invariants or use contradiction.',
      'State complexity even for non-leetcode logic.'
    ],
    verify: 'Solve 3 problems on paper with reasoning written out; explain Kadane and one binary-search variant without notes.'
  },
  {
    slug: 'code',
    title: 'Code (C#)',
    headline: 'Code · C# language & .NET',
    intro:
      'async/await, IDisposable, LINQ, generics, DI, testing, and idiomatic C#. Expect language depth and “how would you structure this in production?”',
    bestPractices: [
      'Know async vs sync, ConfigureAwait, and when not to block on .Result.',
      'Explain IEnumerable deferred execution vs materialized lists.',
      'Mention IDisposable, using declarations, and nullable reference types.',
      'Tie answers to testability (xUnit) and logging (ILogger).'
    ],
    verify: 'Write async fetch + parse, a LINQ pipeline, and IDisposable pattern from memory.'
  },
  {
    slug: 'sdlc',
    title: 'SDLC',
    headline: 'SDLC · process & quality',
    intro:
      'Phases, Agile/Scrum, testing pyramid, CI/CD, defects, and quality/traceability — especially relevant in semiconductor and regulated environments.',
    bestPractices: [
      'Name SDLC phases and what deliverable each produces.',
      'Contrast Agile vs Waterfall with trade-offs, not dogma.',
      'Know Definition of Done, code review purpose, and defect lifecycle.',
      'Mention traceability, change control, and regression for hardware-adjacent software.'
    ],
    verify: 'Recite phases + 3 Scrum ceremonies; one story about quality or traceability.'
  },
  {
    slug: 'threading',
    title: 'Threading & Processes (C#)',
    headline: 'Threading & processes · concurrency in .NET',
    intro:
      'Process vs thread, thread pool, lock/Monitor, SemaphoreSlim, Mutex, concurrent collections, Parallel.For, Task vs Thread, CancellationToken, deadlocks, race conditions, and producer-consumer — with C# examples.',
    bestPractices: [
      'Prefer async/await for I/O; Task.Run or Parallel.For for CPU-bound parallelism.',
      'Never block on .Result/.Wait() on async code — classic deadlock on sync context.',
      'Use private lock objects, Interlocked for counters, Concurrent* for shared structures.',
      'Always pass CancellationToken into long-running work for clean shutdown.'
    ],
    verify: 'Explain process vs thread, fix a race with lock, and describe deadlock prevention without reading notes.'
  }
];

export function getNovaTopic(slug) {
  return NOVA_TOPICS.find((t) => t.slug === slug) || null;
}
