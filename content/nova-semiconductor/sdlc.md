# Nova Semiconductor — SDLC & Engineering Process

### 67) What are the **SDLC phases** and what does each produce?
**Theory:** The Software Development Life Cycle is how teams move from idea to running software with reviewable artifacts at each step—not a bureaucracy exercise, but a way to catch mistakes early when they are cheap to fix.
**Answer:** Common phases: **(1) Requirements** — what/why (user stories, acceptance criteria); **(2) Design** — how (architecture, APIs, data models); **(3) Implementation** — code + unit tests; **(4) Testing** — integration, system, regression; **(5) Deployment/Release** — packaging, migration, rollout; **(6) Maintenance/Operations** — monitoring, fixes, enhancements. Each phase should have a **quality gate** (review, sign-off, or automated checks) before the next.
**Explanation:** In interviews, name phases **and** one deliverable per phase. In semiconductor-adjacent software, emphasize that “test” often includes equipment validation and traceability evidence—not only unit tests.
```txt
Requirements → Design → Build → Verify → Release → Operate
Gate example: no merge to release branch until tests + traceability links exist
```

### 68) **Agile vs Waterfall** — how do you choose fairly?
**Theory:** Waterfall assumes requirements are stable up front; Agile assumes learning and change are normal. Interviewers want trade-offs, not “Agile is always better.”
**Answer:** **Waterfall** fits regulated baselines, fixed contracts, or hardware-dependent milestones where rework is expensive. **Agile/Scrum** fits evolving product needs, frequent feedback, and cross-functional teams. **Hybrid** is common: fixed milestones (tape-out, tool qualification) with iterative sprints inside each milestone.
**Explanation:** For Nova-style contexts, mention **frozen interfaces** for equipment integration while allowing iterative UI and reporting improvements. Wrong answer: dogmatic one-size-fits-all.
```csharp
// Decision sketch — explain verbally, don't treat as production code
bool useAgile = requirementsVolatile || needFrequentStakeholderFeedback;
bool useWaterfall = fixedRegulatoryBaseline || externalMilestoneLocked;
```

### 69) What is the purpose of each **Scrum ceremony**?
**Theory:** Scrum creates regular inspect-and-adapt loops so the team corrects course before the sprint ends.
**Answer:** **Sprint Planning** — define sprint goal, select backlog items, clarify scope. **Daily Scrum** — 15 min: what I did, what I’ll do, blockers (not a status meeting to management). **Sprint Review** — demo working software to stakeholders, collect feedback. **Sprint Retrospective** — improve process: what worked, what didn’t, one or two actionable improvements with owners.
**Explanation:** Time-boxing matters. Tie Review to **Definition of Done**—only demo items that meet DoD. Retro without action items is a complaint session, not SDLC value.
```txt
Plan (start) → Daily (inspect) → Review (product) → Retro (process) → repeat
```

### 70) How do you write an **effective user story**?
**Theory:** A user story expresses **user value**, not a technical task list. It aligns product, dev, and QA on “done.”
**Answer:** Template: **As a** [role], **I want** [capability], **so that** [benefit]. Add **acceptance criteria** (Given/When/Then or bullet checklist) that are **testable**. Split stories that are too large (no clear demo in one sprint).
**Explanation:** Bad story: “Refactor database layer.” Good story: “As a yield engineer, I want lot-level failure export so that I can correlate defects with equipment ID in our audit system.” INVEST helps: Independent, Negotiable, Valuable, Estimable, Small, Testable.
```csharp
// Story record for tooling / backlogs (illustrative)
public record UserStory(
    string Id,
    string Role,
    string Want,
    string SoThat,
    IReadOnlyList<string> AcceptanceCriteria);
```

### 71) What is **Definition of Done (DoD)** and why does it matter?
**Theory:** DoD is the team’s shared contract for “complete”—without it, “done” means different things to dev, QA, and product.
**Answer:** Typical DoD items: code reviewed and merged; **unit tests** pass; **integration/smoke** pass; docs/README updated; no known **sev-1/2** bugs; logging/monitoring hooks for new paths; security scan clean; traceability link (req → story → test) for regulated work.
**Explanation:** DoD is **not** “developer thinks it works.” Partial work should stay **In Progress**. In semiconductor tooling, DoD may include calibration checks or operator-run validation scripts.
```csharp
public sealed class DefinitionOfDoneChecklist {
    public bool CodeReviewed { get; init; }
    public bool CiGreen { get; init; }
    public bool TestsAdded { get; init; }
    public bool DocsUpdated { get; init; }
    public bool TraceabilityLinked { get; init; }
    public bool IsDone => CodeReviewed && CiGreen && TestsAdded && DocsUpdated;
}
```

### 72) What makes a **code review** valuable?
**Theory:** Reviews spread knowledge, catch defects early, and enforce standards—not perform gatekeeping or style wars.
**Answer:** Author: small PRs, clear description (why + what + how to test), self-review first. Reviewer: check **correctness**, **edge cases**, **tests**, **security**, **readability**, **backward compatibility**. Comment on code, not people; approve when risks are acceptable or tracked.
**Explanation:** Review latency kills flow—aim for same-day feedback. In interviews, mention **checklist** mindset and that reviews are part of SDLC quality gates, especially before release branches.
```txt
PR description: Problem → Approach → Test plan → Rollback/risk
Reviewer: behavior > naming nitpicks; request tests for risky paths
```

### 73) What belongs in a **CI pipeline** for a C# service?
**Theory:** Continuous Integration means every change is built and tested automatically—fail fast before merge.
**Answer:** Stages: restore packages → **build** (Release) → **unit tests** → **static analysis** (nullable, analyzers, Sonar) → optional integration tests → **artifact** (NuGet/Docker). Run on every PR; block merge if red. Cache dependencies; keep feedback under ~10–15 minutes for PR checks where possible.
**Explanation:** CI is not CD—CI proves integrability; CD adds deployment automation. Mention **deterministic builds** and version pinning for reproducibility in regulated environments.
```csharp
// Typical pipeline steps (YAML pseudocode as comments)
// dotnet restore
// dotnet build -c Release --no-restore
// dotnet test --no-build -c Release --logger trx
// dotnet publish -c Release -o ./out
```

### 74) **Continuous Delivery** vs deployment strategies — what reduces risk?
**Theory:** CD means the main branch is always releasable; deployment strategy controls **how** new bits reach users.
**Answer:** **Blue-green:** two environments; switch traffic atomically; fast rollback = switch back. **Canary:** route small % of traffic, watch metrics, ramp up. **Rolling:** replace instances gradually. Always define **rollback** (previous artifact, DB migration reversibility).
**Explanation:** Semiconductor fabs often prefer **controlled release windows** and feature flags for non-critical UI while core recipe execution paths are tightly validated.
```txt
Canary: 5% → monitor error rate/latency → 25% → 100% or rollback
Rollback: redeploy N-1 artifact + runbook, not panic hotfix without tests
```

### 75) Explain the **test pyramid** and how you apply it.
**Theory:** The pyramid balances **speed**, **confidence**, and **maintenance cost**—too many slow E2E tests create flaky, expensive pipelines.
**Answer:** **Base — many fast unit tests** (pure logic, parsers, state machines). **Middle — fewer integration tests** (DB, HTTP, message bus with test containers). **Top — minimal E2E/UI** for critical user journeys only. Invert the pyramid (ice cream cone) and CI becomes slow and brittle.
**Explanation:** Interview tip: name what you test at each layer for a feature (e.g. recipe validator = unit; API + DB = integration; operator workflow = one E2E).
```csharp
// Layer mapping example
// Unit: RecipeValidatorTests — no I/O
// Integration: RecipeRepositoryTests — Testcontainers SQL
// E2E: OperatorUploadsLotReport_Smoke — staging only, few cases
```

### 76) What **Git branching** strategy do you recommend for most teams?
**Theory:** Branching should minimize long-lived divergence and merge pain while protecting production.
**Answer:** **Trunk-based development** with **short-lived feature branches** + PR + required CI is the default junior-safe answer. **GitFlow** (develop/release branches) adds overhead—justify only for scheduled releases. Protect `main`: PR reviews, CI green, no direct pushes.
**Explanation:** Mention **rebase vs merge** team convention; never force-push shared branches. Release branches may tag `v1.2.0` from a known commit with changelog.
```txt
feature/NS-142-recipe-export → PR → main (protected)
hotfix/NS-999 → PR → main + cherry-pick to release if needed
```

### 77) What is a **requirements traceability matrix (RTM)**?
**Theory:** Traceability proves each requirement was implemented and verified—auditors and quality teams ask for this in regulated or high-reliability domains.
**Answer:** Link **Requirement ID** → **Design/Story** → **Code/Commit** → **Test case** → **Test result** → **Release**. When a requirement changes, you know which tests and docs to update. Tools: Jira links, Azure DevOps, Polarion, or spreadsheets for small teams.
**Explanation:** Semiconductor software often ties software behavior to **equipment qualification** evidence—traceability is how you show “we tested what we promised.”
```csharp
public record TraceLink(
    string RequirementId,
    string StoryId,
    string TestCaseId,
    string BuildId,
    bool Passed);
```

### 78) How does **change control** work in a mature team?
**Theory:** Change control evaluates **impact, risk, and approval** before work hits production—especially when downtime or yield is costly.
**Answer:** Steps: **request** (what/why) → **impact analysis** (systems, data, rollback) → **classification** (standard/normal/emergency) → **approval** (tech lead, QA, change board if needed) → **implement** → **verify** → **close** with evidence. Emergency changes still get post-implementation review.
**Explanation:** Junior answer: “We don’t skip change control for ‘small’ fixes in prod”—link to incident prevention. Pair with CAB (Change Advisory Board) vocabulary if asked.
```csharp
public enum ChangeSeverity { Standard, Normal, Emergency }
public enum ChangeState { Draft, UnderReview, Approved, Implemented, Verified, Closed }
```

### 79) Walk through the **defect lifecycle**.
**Theory:** Defects need visible states so nothing falls through the cracks between QA, dev, and release.
**Answer:** Typical flow: **New** (reported) → **Triaged** (severity/priority, owner) → **In Progress** → **Fixed** (in branch) → **Verified** (QA on build) → **Closed**. Reopen if regression. Capture **steps to reproduce**, **expected vs actual**, **environment/build**, **logs**.
**Explanation:** Severity (impact) vs priority (order)—a cosmetic bug can be low severity but high priority if it blocks a demo. Root-cause field supports **CAPA** (corrective action) in quality-minded orgs.
```csharp
public enum DefectState { New, Triaged, InProgress, Fixed, Verified, Closed, Reopened }
public record Defect(string Id, DefectState State, string Severity, string Owner);
```

### 80) What is on a **release management checklist**?
**Theory:** Shipping is more than merging code—operations, data, and stakeholders must be ready.
**Answer:** Pre-release: CI green on release commit; **changelog**; version bump; **DB migration** tested; feature flags set; **rollback** tested; on-call aware. Post-release: smoke test in prod; monitor error rate/latency; confirm **metrics/alarms**; stakeholder comms; tag release in Git.
**Explanation:** In interviews, show you think about **blast radius** and **communication**, not only “deploy button.”
```csharp
public record ReleaseReadiness(
    bool TestsGreen,
    bool MigrationsAppliedInStaging,
    bool RollbackTested,
    bool RunbookUpdated,
    bool ApprovalsRecorded) {
    public bool CanRelease => TestsGreen && MigrationsAppliedInStaging
        && RollbackTested && ApprovalsRecorded;
}
```

### 81) What **documentation** should exist across the SDLC?
**Theory:** Docs preserve intent for future you, auditors, and on-call engineers—code alone rarely explains *why*.
**Answer:** **Requirements/user stories**; **architecture** (C4, diagrams); **API contracts** (OpenAPI); **ADRs** (Architecture Decision Records) for major choices; **runbooks** for deploy/incident; **README** for build/run/test; **release notes** for customers/operators.
**Explanation:** ADR format: Context → Decision → Consequences. Update docs in the same PR as behavior changes when possible—stale docs are a quality defect.
```txt
# ADR 004: Use PostgreSQL for recipe store
Status: Accepted
Consequences: ops owns backups; team standardizes on SQL tooling
```

### 82) How does **quality** differ in semiconductor / equipment-adjacent software?
**Theory:** Software may control or monitor high-value manufacturing steps—failures can mean scrap, rework, or line downtime, not just a 404 page.
**Answer:** Emphasize **reliability**, **determinism**, **traceability**, **calibration/version checks**, **graceful degradation**, and **audit logs**. Validate inputs from equipment; fail safe (stop recipe rather than apply bad parameters). Regression suites before tool qualification releases.
**Explanation:** Tie to SDLC gates: qualification builds, signed releases, change control. Show you understand software is part of a **larger validated system**.
```csharp
public bool CanRunRecipe(Recipe r, CalibrationStatus cal) =>
    cal.IsValid && cal.EquipmentId == r.EquipmentId && r.VersionApproved;
```

### 83) How do you run a **retrospective** that actually improves things?
**Theory:** Retros inspect the **process**, not blame individuals. Output must be actionable or it wastes time.
**Answer:** Format: What went well / what didn’t / what to try next. Pick **1–3 improvements** max; assign **owner** and **due date**; verify in next retro. Use data (cycle time, escaped defects, flaky tests) not only opinions.
**Explanation:** Anti-pattern: same complaints every sprint with no owners. Good retro item: “Add smoke test for export API—owner: Alex—due: sprint 12.”
```csharp
public record RetroAction(string Title, string Owner, DateOnly Due, bool Done);
```

### 84) How do you **estimate** work without false precision?
**Theory:** Estimates support planning; they are not commitments or performance weapons.
**Answer:** **Story points** for relative complexity (planning poker); track **velocity** over sprints for forecast ranges. Break down epics; spike unknowns. Give **ranges** with assumptions (“3–5 points if API stable; +2 if schema changes”). Re-estimate when learning happens.
**Explanation:** Hours estimates are OK for small tasks but suffer from optimism bias. In hardware-coupled projects, call out **external dependencies** (lab time, vendor SDK) explicitly.
```csharp
// Forecast (illustrative): avg velocity 24 pts/sprint → 48 pts ≈ 2 sprints ± risk buffer
int forecastSprints = (int)Math.Ceiling(totalPoints / averageVelocity);
```

### 85) What is **UAT (User Acceptance Testing)** and who owns it?
**Theory:** UAT confirms the system meets **business needs** in realistic scenarios—distinct from developer unit/integration tests.
**Answer:** Business users or customer reps execute **scripted scenarios** with pass/fail criteria; sign-off before production promotion. Environment should mirror prod closely (data masks OK). Defects found go through defect lifecycle; scope creep triggers change request.
**Explanation:** “All tests green in CI” ≠ UAT pass. Interview: mention **stakeholder sign-off** as a release gate.
```txt
UAT script: Given lot file X uploaded, When operator runs report Y, Then KPI Z matches golden sample
Sign-off: Product owner name + date + build ID
```

### 86) How do you identify and manage **project risks**?
**Theory:** Risk management is proactive—surface unknowns before they become incidents or missed milestones.
**Answer:** Maintain a **risk register**: description, probability, impact, score, **mitigation**, owner, review date. Examples: vendor API slip, skill gap on WPF, test lab availability. Escalate high scores; mitigate (prototype, training, schedule buffer) or accept explicitly.
**Explanation:** Connect to SDLC: spikes in design phase reduce implementation risk. Semiconductor context: equipment access windows are a common schedule risk.
```csharp
public record Risk(string Id, int Probability, int Impact, string Mitigation, string Owner) {
    public int Score => Probability * Impact;
}
```

### 87) How do you **elicit and validate requirements**?
**Theory:** Bad requirements cause expensive rework; validation is cheaper in workshops than after implementation.
**Answer:** Techniques: interviews, job shadowing, workshops, prototypes/wireframes, reviewing existing workflows. Validation checks: **unambiguous?** **testable?** **feasible?** **dependencies identified?** **stakeholder sign-off?** Use examples and edge cases (“what if file is empty?”).
**Explanation:** MoSCoW prioritization (Must/Should/Could/Won’t) helps when time is fixed. Ambiguous “fast” or “user-friendly” needs measurable criteria.
```txt
Checklist: clear actor, clear outcome, testable AC, NFRs (perf, security), out-of-scope stated
```

### 88) How do you manage **scope and priorities** under pressure?
**Theory:** Unlimited scope with fixed time fails—explicit prioritization protects quality and predictability.
**Answer:** Stack-rank by **business value**, **risk reduction**, **urgency**, and **effort**. Protect the **MVP**; defer “nice-to-have.” Say no with data (“that adds ~5 points and risks milestone M”). Use change control for scope additions after baseline freeze.
**Explanation:** Interview story: “We cut feature X, kept compliance traceability and smoke path, shipped on date.” Shows maturity vs heroics and crunch.
```csharp
public record BacklogItem(string Id, int BusinessValue, int Effort, int RiskReduction) {
    public double Score => (BusinessValue + RiskReduction) / (double)Math.Max(1, Effort);
}
// Sort descending by Score for planning conversation
```
