# ADRs (Architecture Decision Records) - Interview Questions

## Basics

### 1. What is an ADR?
**Answer:** Architecture Decision Record – a short document that captures an important architectural decision, its context, and consequences.

### 2. Why use ADRs?
**Answer:** To document why decisions were made, so future readers and new team members understand the reasoning and constraints.

### 3. What should an ADR include?
**Answer:** Title, status, context, decision, consequences (positive and negative). Optionally: alternatives considered, date, authors.

### 4. When should you write an ADR?
**Answer:** When you make a significant architectural choice (tech stack, pattern, integration approach) that affects the system long term.

### 5. What is the typical status lifecycle of an ADR?
**Answer:** Proposed → Accepted (or Deprecated/Superseded). Some use Draft, Accepted, Deprecated, Superseded by [link].

### 6. How do ADRs relate to code?
**Answer:** They live in the repo (e.g. docs/adr/) and are versioned with the code. They explain the “why” behind the “what” in the code.

### 7. Who should write ADRs?
**Answer:** Anyone making or influencing the decision – often tech leads or senior devs, but the whole team can contribute.

### 8. What is the difference between ADR and design doc?
**Answer:** ADR is short and decision-focused (one decision per record). Design doc can cover a whole feature or system with many decisions.

### 9. How do you handle changing a decision later?
**Answer:** Don’t delete the old ADR. Mark it Deprecated or Superseded and add a new ADR that references the old one and explains the change.

### 10. Where do you store ADRs in a repo?
**Answer:** Commonly in docs/adr/ or doc/architecture/decisions/, with names like 0001-use-postgres.md or 0012-event-sourcing.md.
