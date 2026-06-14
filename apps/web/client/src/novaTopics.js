/**
 * Nova Semiconductor interview topics — aligns with NOVA_SEMICONDUCTOR_PREP_PLAN.md
 */
export const NOVA_TOPICS = [
  {
    slug: 'leetcode',
    title: 'LeetCode (C#)',
    headline: 'LeetCode · C# patterns',
    intro:
      'Hash maps, two pointers, trees, graphs, and DP — with C# solutions. Clarify constraints, state pattern, code happy path, then edge cases and Big O.',
    bestPractices: [
      'Ask about input size, duplicates, and negative numbers before coding.',
      'Prefer Dictionary, HashSet, List — know amortized O(1) vs O(n).',
      'Say pattern name aloud (e.g. “two pointers”) then implement.',
      'Walk one edge case and state time/space complexity at the end.'
    ],
    verify: 'Explain 5 solutions without reading answers; code Two Sum and Valid Parentheses from memory.'
  },
  {
    slug: 'logic',
    title: 'Logic',
    headline: 'Logic · puzzles & reasoning',
    intro:
      'Bit tricks, invariants, counting, and classic puzzles. Think aloud: brute force → optimize → verify with a tiny example.',
    bestPractices: [
      'Restate the problem and list constraints before guessing.',
      'Watch off-by-one, overflow (use long/checked), empty input.',
      'For puzzles, name invariants or use contradiction.',
      'State complexity even for non-leetcode logic.'
    ],
    verify: 'Solve 3 problems on paper with reasoning written out.'
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
  }
];

export function getNovaTopic(slug) {
  return NOVA_TOPICS.find((t) => t.slug === slug) || null;
}
