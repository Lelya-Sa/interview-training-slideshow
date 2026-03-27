# QA & Testing - Interview Questions

## Testing Basics

### 1. What is unit testing?
**Answer:** Testing individual units (functions, methods) in isolation, usually with mocks for dependencies. Fast, focused.

### 2. What is integration testing?
**Answer:** Testing how multiple units work together (e.g. API + DB). Verifies interfaces and data flow between components.

### 3. What is end-to-end (E2E) testing?
**Answer:** Testing the full user flow in a real or near-real environment (e.g. browser, real API). Covers critical user journeys.

### 4. What is the testing pyramid?
**Answer:** Many unit tests (fast, cheap), fewer integration tests, few E2E tests (slow, expensive). Focus automation at the base.

### 5. What is a mock vs stub vs spy?
**Answer:** Mock: verifies interactions. Stub: returns canned responses. Spy: records calls for later assertion.

### 6. What is TDD?
**Answer:** Test-Driven Development: write failing test first, then minimal code to pass, then refactor. Red–green–refactor.

### 7. What is code coverage and when is it useful?
**Answer:** Metric of which lines/branches are executed by tests. Useful to find gaps; high coverage alone doesn’t mean good tests.

### 8. What is regression testing?
**Answer:** Re-running tests to ensure new changes didn’t break existing behavior. Often automated in CI.

### 9. What is manual vs automated testing?
**Answer:** Manual: human executes steps. Automated: scripts/tools run tests. Use both; automate repetitive and critical paths.

### 10. How do you test async code?
**Answer:** Use test runner support for async (e.g. Jest async/await, done(), or promises). Mock timers and external calls when needed.
