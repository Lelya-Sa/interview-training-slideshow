# Behavioral Design Patterns

## Purpose

Behavioral patterns deal with **communication between objects** and **assignment of responsibilities**. They describe how objects collaborate, how control flows, and how behavior can vary or be reused without tangled conditionals.

Use this category when:

- Many objects must stay **in sync** when one changes (events, pub/sub).
- You need to **swap algorithms** or policies at runtime.
- Requests should be **encapsulated**, queued, logged, or undone.
- Object behavior depends on **state** and big `switch` statements are growing.
- You want to define a **skeleton algorithm** with customizable steps.

**Interview one-liner:** Behavioral patterns answer *“Who does what, how do objects talk, and how do we change behavior cleanly?”*

---

## Pros

- **Reduces coupling** — Observer and Mediator limit direct references between collaborators.
- **Eliminates sprawling conditionals** — Strategy, State, and Command replace `if/else` chains with polymorphism.
- **Extensibility** — add new strategies, commands, or handlers without editing core logic (Open/Closed).
- **Clear responsibility chains** — Chain of Responsibility models pipelines (auth → validation → handler).
- **Undo / audit / queue** — Command captures requests as objects with history stacks.
- **Reusable algorithms** — Template Method and Strategy share behavior patterns across types.

## Cons

- **More classes** — many small strategy/command/handler types can feel heavy for simple apps.
- **Indirection** — harder to trace flow than one linear method; needs good naming and docs.
- **Observer leaks** — forgotten unsubscribe causes memory leaks and ghost updates.
- **Over-abstraction** — Strategy for two cases that will never change adds noise.
- **Chain of Responsibility** — request may never be handled; must define default/fallback.
- **Visitor rigidity** — adding new element types breaks all visitors (trade-off vs double dispatch).

## Best practices

1. **Name behaviors after domain** — `StandardShippingStrategy`, not `StrategyA`.
2. **Inject strategies** — constructor or options object; avoid `new ConcreteStrategy()` inside business logic.
3. **Unsubscribe observers** — `IDisposable`, weak events, or scoped subscriptions in UI/frameworks.
4. **Keep commands small** — one command = one user action; compose macros from smaller commands.
5. **State pattern vs enum** — use State when transitions have rules and side effects; enum is fine for simple flags.
6. **Document chain order** — middleware, filters, and handlers need explicit ordering.
7. **Prefer composition over inheritance** for Strategy; Template Method is the intentional inheritance exception.
8. **Mediator for many-to-many** — when everyone talks to everyone, introduce a coordinator (chat room, dialog).

---

## Patterns in this category (GoF + commonly used)

| Pattern | One-line purpose | Typical use |
|--------|-------------------|-------------|
| **Observer** | One-to-many notification on state change | UI binding, domain events, `IObservable` / event buses |
| **Strategy** | Interchangeable algorithms behind one interface | Pricing, sorting, compression, payment methods |
| **Command** | Request as object; execute, queue, undo | Undo/redo, job queues, CQRS commands, transaction logs |
| **State** | Behavior changes with internal state object | Order workflow, TCP connection, document draft/published |
| **Template Method** | Base class defines steps; subclasses override hooks | Framework lifecycle (`OnStartup`), ETL pipelines |
| **Chain of Responsibility** | Pass request along handler chain until handled | Middleware, approval workflows, exception filters |
| **Iterator** | Sequential access without exposing internals | `IEnumerable`, collections, custom graph traversal |
| **Mediator** | Central hub coordinates colleagues | Chat room, air traffic control, dialog between forms |
| **Memento** | Snapshot and restore object state | Undo stacks, game saves, editor checkpoints |
| **Visitor** | Add operations across a type hierarchy | AST walkers, export/report on document tree |
| **Interpreter** | Grammar as classes for simple languages | Rule engines, regex-like DSLs (niche) |
| **Null Object** | No-op implementation instead of null checks | `NullLogger`, empty collections |
| **Specification** | Encapsulate business rules as composable objects | Validation, query predicates |
| **Publish-Subscribe** | Decoupled event channel (Observer variant) | Message brokers, domain events, SignalR |
| **Saga** | Long-running transaction as sequence of steps | Microservices compensation flows |
| **Event Sourcing** | State as append-only events (behavioral + architectural) | Audit, replay, CQRS read models |

### Patterns covered in this repo

| Pattern | Study path |
|---------|------------|
| Observer | [`observer/README.md`](./observer/README.md) · [`observer/questions.md`](./observer/questions.md) |
| Strategy | [`strategy/README.md`](./strategy/README.md) · [`strategy/questions.md`](./strategy/questions.md) |

### Related patterns worth knowing (not yet a dedicated folder)

- **Command** — `ICommand` in WPF, MediatR `IRequest` in .NET, Redux actions.
- **State** — workflow engines, `HttpClient` handler pipeline states.
- **Chain of Responsibility** — ASP.NET Core middleware, servlet filters.
- **Template Method** — abstract `Controller` hooks, `DbContext` lifecycle overrides.
- **Iterator** — LINQ, `foreach`, lazy sequences.

---

## When to choose which

| Situation | Prefer |
|-----------|--------|
| Notify many listeners of changes | **Observer** / pub-sub |
| Swap algorithm at runtime | **Strategy** |
| Undo, queue, or log operations | **Command** |
| Behavior driven by mode/status | **State** |
| Fixed steps, variable details | **Template Method** |
| Pipeline of handlers | **Chain of Responsibility** |
| Traverse without exposing structure | **Iterator** |
| Many objects talk to many objects | **Mediator** |
| Save/restore snapshots | **Memento** |
| New operations on stable hierarchy | **Visitor** |

---

## Strategy vs State vs Template Method (interview classic)

| | **Strategy** | **State** | **Template Method** |
|---|--------------|-----------|---------------------|
| **What varies** | Algorithm | Behavior per state | Steps in a fixed workflow |
| **Who switches** | Client or context delegates | Context transitions states | Subclass overrides hooks |
| **Composition** | Usually has-a strategy | Has-a state object | Is-a base class |
| **Example** | Tax calculation by country | Order: New → Paid → Shipped | `Process()` calls `Validate()` then `Save()` |

---

## Common interview mistakes

- Using Observer when a simple callback or async message queue is enough.
- Strategy interface with one method but only one implementation ever — YAGNI.
- Command without defining **idempotency** and failure handling in distributed systems.
- Confusing **Mediator** with **Facade** — Mediator coordinates peers; Facade simplifies a subsystem for outsiders.

---

## Quick comparison

```
Observer              → "Tell everyone when I change"
Strategy              → "Plug in a different algorithm"
Command               → "Do this later / undo this / log this"
State                 → "I'm in mode X, so I behave like X"
Template Method       → "Same recipe, different ingredients"
Chain of Responsibility → "Try handler A, then B, then C"
Iterator              → "Walk the collection my way"
Mediator              → "Talk through the coordinator"
Memento               → "Save game / restore game"
Visitor               → "Run this operation on every node type"
```
