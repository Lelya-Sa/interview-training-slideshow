/**
 * Expandable roadmap blurbs for Cognyte Mode (aligns with COGNYTE_14_DAY_PREP_PLAN.md cards).
 * Shown in QuestionsView as <details>; not loaded from API.
 */
const DAYS = {
  1: {
    headline: 'Day 1 · JS + TS Core',
    intro: 'Foundation: scope, closures, event loop, async, TypeScript basics.',
    tracks: [
      { label: 'Roadmap', items: ['4 logic tasks', '15 rapid Q&A', 'Mistake log'] },
      { label: 'Verify', items: ['Can explain closure and event loop clearly.'] }
    ]
  },
  2: {
    headline: 'Day 2 · React Fundamentals',
    intro: 'Props, state, hooks, effects; build a small feature.',
    tracks: [
      { label: 'Roadmap', items: ['TODO / filter / search mini feature', '3 logic tasks', 'Component flow explanation'] },
      { label: 'Verify', items: ['Can build a basic React feature without a tutorial.'] }
    ]
  },
  3: {
    headline: 'Day 3 · Angular Fundamentals',
    intro: 'Components, DI, lifecycle, routing.',
    tracks: [
      { label: 'Roadmap', items: ['Rebuild mini feature in Angular', '3 logic tasks', 'React vs Angular compare'] },
      { label: 'Verify', items: ['Can explain Angular lifecycle and DI.'] }
    ]
  },
  4: {
    headline: 'Day 4 · API + Async (both frameworks)',
    intro: 'Loading, error, empty states; retries.',
    tracks: [
      { label: 'Roadmap', items: ['Wire one API in React + Angular', '3 logic tasks', 'Async checklist'] },
      { label: 'Verify', items: ['Robust API flow in both.'] }
    ]
  },
  5: {
    headline: 'Day 5 · State Management',
    intro: 'Context/reducer vs Angular services / streams.',
    tracks: [
      { label: 'Roadmap', items: ['Shared-state use case in both', '3 logic tasks', 'Trade-off Q&A'] },
      { label: 'Verify', items: ['Can justify local vs global state.'] }
    ]
  },
  6: {
    headline: 'Day 6 · Testing Essentials',
    intro: 'RTL + Angular TestBed patterns.',
    tracks: [
      { label: 'Roadmap', items: ['Write 8 tests', '3 logic tasks', 'Test strategy drill'] },
      { label: 'Verify', items: ['Can write unit tests and explain what to test.'] }
    ]
  },
  7: {
    headline: 'Day 7 · HTTP, RxJS & Mock #1',
    intro: 'Angular integration depth, then full mock loop.',
    tracks: [
      { label: 'Question sprint', items: ['Q67–Q77, Q264–Q307'] },
      { label: 'Mock', items: ['45m technical', '30m coding', '15m behavioral'] },
      { label: 'Verify', items: ['Weakness backlog with next-step fixes.'] }
    ]
  },
  8: {
    headline: 'Day 8 · React Intermediate',
    intro: 'memo, useMemo, useCallback, forms.',
    tracks: [
      { label: 'Question sprint', items: ['Q78–Q88, Q308–Q332'] },
      { label: 'Roadmap', items: ['Optimize one component', '3 logic tasks', 'Rendering Q&A'] }
    ]
  },
  9: {
    headline: 'Day 9 · Angular Intermediate',
    intro: 'Guards, lazy loading, OnPush, RxJS in features.',
    tracks: [
      { label: 'Question sprint', items: ['Q89–Q99, Q333–Q357'] },
      { label: 'Roadmap', items: ['Observable flow practice', '3 logic tasks', 'Routing/security Q&A'] }
    ]
  },
  10: {
    headline: 'Day 10 · Architecture + Refactor',
    intro: 'Feature structure, clean code, trade-offs.',
    tracks: [
      { label: 'Question sprint', items: ['Q100–Q110, Q358–Q385'] },
      { label: 'Roadmap', items: ['Refactor one feature', '3 logic tasks', 'Trade-offs explanation'] }
    ]
  },
  11: {
    headline: 'Day 11 · Performance + Security (Checkpoint C)',
    intro:
      'Matches the Cognyte roadmap: rendering and Core Web Vitals (LCP, INP, CLS), bundles, then browser security—XSS, CSRF, cookies, CORS, CSP, Trusted Types, HSTS, Permissions-Policy, COOP, validation, and modern hardening (see questions Q386–Q421).',
    tracks: [
      {
        label: 'Question tracks',
        items: ['Logic / LeetCode: Q111–Q120', 'Performance & security: Q386–Q421 (incl. CSP, Trusted Types, HSTS, COOP)']
      },
      {
        label: 'Prep plan checklist',
        items: [
          'Rendering basics: reflow/repaint, debounce/throttle',
          'Security: XSS, token handling, validation, CSP & Trusted Types awareness',
          'Ship one perf improvement + one reliability/security improvement',
          'Timed logic set (~60m)',
          'Drill out loud: “How would you secure and optimize this app?”'
        ]
      },
      {
        label: 'Checkpoint C',
        items: [
          'Intermediate React + Angular topics feel reachable',
          'Can reason about perf/security at junior level',
          '35+ logic tasks cumulative (across days)',
          'One architecture refactor story with before/after'
        ]
      }
    ]
  },
  12: {
    headline: 'Day 12 · Fullstack Frontend Integration',
    intro:
      'Phase 4 sprint: Q121–Q130 (linked lists, trees, frequency / top-k, prefix and product patterns) plus Q422–Q457—contract-first APIs (OpenAPI), ETag / 304, Cache-Control, Idempotency-Key, Problem Details, BFF, GraphQL vs REST, webhooks, multipart, versioning, pagination (cursor vs offset), 429 / Retry-After, optimistic concurrency, SSE / streaming, structured errors, public env pitfalls, tracing, AbortController, and CI smoke checks.',
    tracks: [
      {
        label: 'Question tracks',
        items: ['Logic / LeetCode: Q121–Q130', 'Fullstack & API integration: Q422–Q457']
      },
      {
        label: 'Prep plan checklist',
        items: [
          'REST contracts, status codes, validation, error shapes (Problem Details / stable codes)',
          'Explain frontend ↔ backend from one UI event through API response to UI state',
          'OA-style timed set (3 tasks)',
          'Interview drill: debug-through—how you tell client bug vs server bug vs network'
        ]
      },
      {
        label: 'Verify',
        items: [
          'Can walk an integration path without hand-waving auth, caching, or errors',
          'Named at least one contract artifact (e.g. OpenAPI) and one failure signal (status, problem body, trace id)'
        ]
      }
    ]
  },
  13: {
    headline: 'Day 13 · Mock Interview #2',
    intro: 'Full loop under pressure.',
    tracks: [
      { label: 'Roadmap', items: ['60m technical', '40m live coding', '20m behavioral'] },
      { label: 'Verify', items: ['Score improved vs mock #1.'] }
    ]
  },
  14: {
    headline: 'Day 14 · Final Polish',
    intro: 'Weak topics, rehearsal, storytelling.',
    tracks: [
      { label: 'Roadmap', items: ['4 tasks in 90m', 'Project storytelling', 'Interview opening'] },
      { label: 'Verify', items: ['~80% core questions without notes.'] }
    ]
  }
};

export function getCognyteDayRoadmap(dayNumber) {
  const n = Number(dayNumber);
  if (!n || n < 1 || n > 14) {
    return {
      headline: `Day ${dayNumber}`,
      intro: 'See COGNYTE_DAY_BY_DAY_QUESTION_PLAN.md and the home roadmap.',
      tracks: []
    };
  }
  return DAYS[n];
}
