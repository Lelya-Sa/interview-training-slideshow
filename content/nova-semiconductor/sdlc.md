### 67) SDLC Phases Overview
**Theory:** SDLC organizes delivery into requirements, design, implementation, testing, release, and maintenance.
**Answer:** Use defined phase gates with clear artifacts and acceptance criteria.
**Explanation:** Structured phases reduce ambiguity and improve predictability.
```csharp
// Pseudo-flow: Requirements -> Design -> Build -> Test -> Release -> Operate
// Exit each phase only when quality gate passes.
```

### 68) Agile vs Waterfall Selection
**Theory:** Waterfall optimizes stable requirements; Agile optimizes learning and change response.
**Answer:** Choose based on requirement volatility, risk profile, and stakeholder cadence.
**Explanation:** Hybrid models often work in hardware-adjacent software like semiconductor tooling.
```csharp
string model = requirementsStable ? "Waterfall" : "Agile";
```

### 69) Scrum Ceremonies Purpose
**Theory:** Scrum ceremonies create inspect-and-adapt loops: planning, daily scrum, review, retrospective.
**Answer:** Keep ceremonies time-boxed and outcome-focused.
**Explanation:** Ceremony quality strongly affects sprint execution and team alignment.
```csharp
// Sprint Plan => define sprint goal and backlog
// Daily => inspect progress, expose blockers
```

### 70) Writing Effective User Stories
**Theory:** User stories capture user value and intent, not technical tasks.
**Answer:** Use format "As a..., I want..., so that..." with acceptance criteria.
**Explanation:** Good stories align product, QA, and engineering expectations.
```csharp
// As a test engineer, I want lot-level traceability so that I can audit failures quickly.
```

### 71) Definition of Done (DoD)
**Theory:** DoD is a shared quality contract required before work is considered complete.
**Answer:** Include coding, tests, review, docs, and deployment readiness checks.
**Explanation:** DoD prevents partially finished features from being marked done.
```csharp
bool done = codeMerged && testsPassed && docsUpdated && monitoringReady;
```

### 72) Code Review Best Practices
**Theory:** Reviews should prioritize correctness, security, maintainability, and design clarity.
**Answer:** Keep PRs small, explain intent, and provide actionable reviewer comments.
**Explanation:** Fast feedback cycles improve quality and team knowledge sharing.
```csharp
// Reviewer checklist: behavior, edge cases, tests, readability, backward compatibility.
```

### 73) CI Pipeline Essentials
**Theory:** Continuous Integration validates every change through automated build and test stages.
**Answer:** Run lint, unit tests, static analysis, and packaging on each PR.
**Explanation:** Early failure detection minimizes integration risk.
```csharp
// CI stages: restore -> build -> test -> quality scan -> artifact publish
```

### 74) CD and Deployment Strategies
**Theory:** Continuous Delivery automates release readiness; deployment strategies reduce blast radius.
**Answer:** Use blue-green or canary deployments with quick rollback paths.
**Explanation:** Progressive exposure lowers risk for production changes.
```csharp
// Deploy canary to 10% traffic, monitor error rate, then ramp to 100%.
```

### 75) Test Pyramid in Practice
**Theory:** Healthy test suites emphasize many unit tests, fewer integration tests, and minimal E2E.
**Answer:** Place logic checks low in pyramid and reserve E2E for critical flows.
**Explanation:** This balances speed, confidence, and maintenance cost.
```csharp
// Unit: fast and numerous
// Integration: moderate count
// E2E: targeted critical journeys only
```

### 76) Git Branching Workflow
**Theory:** Branching strategy should match team size and release cadence.
**Answer:** For most teams, trunk-based with short-lived feature branches works well.
**Explanation:** Frequent integration reduces merge conflicts and drift.
```csharp
// main <- feature/* via PR, protected by required checks
```

### 77) Requirements Traceability Matrix
**Theory:** Traceability links requirements to design, implementation, and verification evidence.
**Answer:** Maintain requirement IDs across stories, commits, tests, and release notes.
**Explanation:** Critical in regulated or high-reliability domains such as semiconductor workflows.
```csharp
// Req R-102 -> Story ST-58 -> Test TC-211 -> Build 2026.06.14
```

### 78) Change Control Process
**Theory:** Formal change control evaluates impact, risk, and approval before implementation.
**Answer:** Classify change severity, estimate scope, and record approvals in workflow tool.
**Explanation:** Controlled changes reduce production instability and audit gaps.
```csharp
// Change request states: Draft -> Review -> Approved -> Implemented -> Verified
```

### 79) Defect Lifecycle Management
**Theory:** Defects move through lifecycle states from discovery to verified closure.
**Answer:** Track severity, priority, owner, root cause, and verification status.
**Explanation:** Clear states prevent silent backlog accumulation.
```csharp
enum DefectState { New, Triaged, InProgress, Fixed, Verified, Closed }
```

### 80) Release Management Checklist
**Theory:** Releases require technical and operational readiness, not just completed code.
**Answer:** Verify dependency versions, migration plans, runbooks, and rollback strategy.
**Explanation:** Checklist-driven releases reduce late surprises.
```csharp
bool releaseReady = testsGreen && docsReady && rollbackTested && approvalsComplete;
```

### 81) Documentation in Engineering Lifecycle
**Theory:** Documentation preserves intent, decisions, and operational knowledge.
**Answer:** Maintain architecture notes, API contracts, and troubleshooting runbooks.
**Explanation:** Good docs shorten onboarding and incident recovery time.
```csharp
// Keep ADRs for major decisions and update after significant architecture changes.
```

### 82) Quality in Semiconductor Software Context
**Theory:** Semiconductor software often interacts with expensive equipment and strict process controls.
**Answer:** Emphasize reliability, traceability, calibration checks, and deterministic behavior.
**Explanation:** A minor software defect can create costly yield loss in production lines.
```csharp
// Example guard: reject recipe execution when calibration timestamp is stale.
```

### 83) Retrospective Actionability
**Theory:** Retrospectives should produce measurable improvements, not only discussion.
**Answer:** Convert lessons into owners, due dates, and follow-up verification.
**Explanation:** Without action tracking, the same problems repeat each sprint.
```csharp
// Retro item: "Reduce flaky tests by 50% in 2 sprints" -> owner + due date.
```

### 84) Estimation Techniques
**Theory:** Relative estimation (story points) captures complexity and uncertainty better than hour guesses.
**Answer:** Use planning poker and historical velocity for forecast ranges.
**Explanation:** Estimates are planning tools, not performance targets.
```csharp
// Forecast = average velocity over last N sprints +/- uncertainty buffer
```

### 85) User Acceptance Testing (UAT)
**Theory:** UAT validates business fit with real user scenarios before release.
**Answer:** Define UAT scripts with pass/fail criteria and stakeholder sign-off.
**Explanation:** Technical correctness alone does not guarantee user value.
```csharp
// UAT scenario: upload wafer report, verify KPI dashboard and export output.
```

### 86) Risk Identification and Mitigation
**Theory:** Risk management requires probability-impact scoring and mitigation planning.
**Answer:** Maintain a risk register with owners and trigger conditions.
**Explanation:** Proactive mitigation is cheaper than reactive incident handling.
```csharp
// Risk score = probability * impact; mitigate high-score items first.
```

### 87) Requirements Elicitation and Validation
**Theory:** Requirements quality improves through interviews, workshops, prototypes, and review loops.
**Answer:** Validate requirements with stakeholders using examples and edge-case walkthroughs.
**Explanation:** Early validation reduces expensive rework downstream.
```csharp
// Validate: ambiguity check, testability check, dependency check, stakeholder approval.
```

### 88) Managing Scope and Priorities
**Theory:** Scope management balances delivery capacity with business value.
**Answer:** Prioritize backlog by impact, urgency, risk reduction, and effort.
**Explanation:** Explicit prioritization avoids overload and deadline drift.
```csharp
// Priority score = (businessValue + riskReduction + urgency) / effort
```
