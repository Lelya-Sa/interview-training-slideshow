# Cognyte Day-by-Day Question Plan (14 Days)

This is your exact daily question queue for interview preparation.
Use it together with:
- `COGNYTE_150_QUESTION_PACK_PHASE_2.md`
- `COGNYTE_150_QUESTION_PACK_PHASE_3.md`
- `COGNYTE_150_QUESTION_PACK_PHASE_4.md`
- Day 2 interview supplement (loaded in-app as **Q249–Q263**): `COGNYTE_REACT_DAY2_SUPPLEMENT.md`

How to run each day:
1. Answer each question aloud before reading.
2. Read theory -> answer -> explanation -> code.
3. Re-type at least 3 code snippets from the day.
4. Mark each question: `Strong / Partial / Weak`.
5. Revisit all `Weak` items next morning.

---

## Day 1 - JS + TS core
- Questions: Q26-Q50, Q76-Q92, Q97-Q100
- Focus: full junior JS/TS fundamentals (scope, closures, event loop, async, typing, modules, promises, complexity)

## Day 2 - React fundamentals (full core + Phase 2 extension + interview supplement)
- Questions: Q1-Q25, Q151-Q165, Q249-Q263
- Focus: core React Q&A from the main pack, Phase 2 extension topics (JSX, lists, hooks, patterns), plus supplemental interview-deep prompts (effects, races, batching, `useLayoutEffect`, etc.) via Q249-Q263

## Day 3 - Angular fundamentals (full core + extension)
- Questions: Q51-Q75, Q166-Q180
- Focus: complete Angular junior fundamentals (components, DI, lifecycle, routing, RxJS, forms, interceptors, parent-child communication, validators, resolver, trackBy)

## Day 4 - API + async + REST/CORS/auth (React, Angular, fullstack junior)
- Questions: Q67-Q73, Q75, Q136-Q147, Q181-Q200
- Focus: HttpClient/fetch patterns, loading/errors, guards/forms, retries/cloning, plus REST verbs, status codes, CORS/preflight, JWT vs cookies, race conditions, pagination, rate limits, and API client design

## Day 5 - State management (React + Angular)
- Questions: Q10, Q12, Q13, Q15, Q19, Q21, Q157, Q160, Q163, Q61, Q62, Q171, Q201-Q212, Q213-Q224
- Focus: Context vs local state, prop drilling, useReducer, custom hooks, batching; Angular DI services, `BehaviorSubject` stores, `async` pipe, OnPush + immutability, reactive forms as state, NgRx awareness, testing stateful services

## Day 6 - Testing fundamentals (React + Angular)
- Questions: Q148, Q225-Q248
- Focus: RTL/Jest patterns (queries, async, mocks, userEvent, hooks, MSW) + Angular TestBed, `HttpClientTestingModule`, `fakeAsync`, spies; also how E2E vs unit tests fit in CI

## Day 7 - Angular + HTTP + RxJS (core + interview deep dive)
- Questions: Q67-Q77, Q264-Q307
- Focus: HttpClient and `HttpErrorResponse`, interceptors/immutability, XSRF and `withCredentials`, resolvers/guards/UrlTree; RxJS flattening (`switchMap`, `mergeMap`, `concatMap`, `exhaustMap`), `combineLatest`/`forkJoin` pitfalls, `timeout`, `firstValueFrom`, multicasting; template `async` + `*ngIf as`. Q76-Q77 TypeScript bridge—pair with mock #1 per `COGNYTE_14_DAY_PREP_PLAN.md`

## Day 8 - TypeScript essentials + React intermediate (perf & forms)
- Questions: Q78-Q88, Q308-Q332
- Focus: TS unions, generics, narrowing, utilities (`Pick`, `Partial`, `Record`, `readonly`); React `memo` / `useMemo` / `useCallback`, stale closures, list keys, controlled forms, validation UX, refs, `startTransition`, lazy/Suspense, error boundaries—aligned with Phase 3 Day 8 in `COGNYTE_14_DAY_PREP_PLAN.md`

## Day 9 - JS/TS depth + Angular intermediate
- Questions: Q89-Q99, Q333-Q357
- Focus: ES modules, promises (`all` / `allSettled`), Big-O and memory basics; lazy routes, `canMatch`/`canLoad`, guards (`canDeactivate`), OnPush vs default CD, `markForCheck`/`detectChanges`, `NgZone`, `trackBy`, encapsulation, host bindings, projection, CVA/validators, `routerLinkActive`, `APP_INITIALIZER`, `inject()`, `takeUntilDestroyed`, standalone bootstrap—see `COGNYTE_14_DAY_PREP_PLAN.md` Day 9

## Day 10 - Logic start + frontend architecture & clean code
- Questions: Q100-Q110, Q358-Q385
- Focus: Q100 behavioral STAR + Q101-Q110 starter LeetCode; **Q358-Q385** architecture & clean code (feature-first vs type-first, colocation, smart/dumb UI, API layer, DRY, barrels, tokens, resilient UI states, i18n/env, feature flags, dependency cycles, a11y in review, bundles, **TanStack Query** vs ad hoc fetch, facades, design systems, testability, monorepos, **RSC** vs client boundaries, micro-frontends, ADRs)—grounded in current interview prep (system-design style axes, FSD/colocation ideas, React 18/19 server–client split)

## Day 11 - Logic set 1 + performance & security
- Questions: Q111-Q120, Q386-Q421
- Focus: **Q111-Q120** DP/sliding window/maps/stack-queue patterns; **Q386-Q421** rendering + **Core Web Vitals (LCP, INP, CLS)**, debounce/throttle, rAF, bundles/leaks; **XSS/CSRF**, cookies, CORS, **CSP**, **Trusted Types**, nonces/hashes, **HSTS**, **Permissions-Policy**, **COOP**, open redirects, server-side validation, prototype pollution, **`wss://`**; SRI & npm hygiene—matches roadmap **Day 11 – Performance + Security** and Checkpoint C in `COGNYTE_14_DAY_PREP_PLAN.md`

## Day 12 - Logic/LeetCode pattern set 2
- Questions: Q121-Q130
- Focus: linked list, tree traversal, frequency/top-k, prefix/product

## Day 13 - Logic + mixed frontend scenarios
- Questions: Q131-Q140
- Focus: coin change, debounce/throttle, React/Angular practical scenarios

## Day 14 - Final mixed interview prep
- Questions: Q141-Q150
- Focus: reliability, forms, communication, testing, performance, live coding flow

---

## Daily Verification Checklist

- [ ] Completed all question IDs for the day
- [ ] Re-coded 3+ snippets without copy-paste
- [ ] Logged weak topics and mistakes
- [ ] Repeated weak questions from previous day
- [ ] Can explain at least 70% of today's questions without notes

---

## End-of-Week Milestones

### End of Day 7
- [ ] Day 1-7 mapped queue completed (including JS/TS-focused Day 1 set)
- [ ] React + Angular core concepts stable
- [ ] First mock interview ready

### End of Day 14
- [ ] Q1-Q150 covered
- [ ] At least 2 full mock interviews completed
- [ ] Can explain architecture + code + trade-offs confidently
- [ ] Ready for junior fullstack frontend interview loop
