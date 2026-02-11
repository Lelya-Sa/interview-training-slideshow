# Event Sourcing - Interview Questions

## Questions (1-10)

### 1. What is event sourcing?
**Answer:** Store all changes as sequence of events. Rebuild state by replaying events. Immutable event log as source of truth.

### 2. How does event sourcing work?
**Answer:** Instead of updating state, append events to log. Reconstruct current state by applying all events. Events are immutable.

### 3. What are the benefits of event sourcing?
**Answer:** Complete audit trail, time travel, replay events, event replay, natural fit for event-driven architecture.

### 4. What are the challenges of event sourcing?
**Answer:** Complexity, event schema evolution, storage size, performance (replaying many events), eventual consistency.

### 5. What is an event store?
**Answer:** Database optimized for storing events. Append-only, versioned, supports replay, querying events.

### 6. How do you query events in event sourcing?
**Answer:** Rebuild state, use read models (projections), CQRS pattern, materialized views, separate read/write models.

### 7. What is the relationship between event sourcing and CQRS?
**Answer:** Often used together. Event sourcing for write side, read models for query side. Natural fit.

### 8. How do you handle event schema changes?
**Answer:** Version events, support multiple versions, migration strategies, backward compatibility, event upcasting.

### 9. When would you use event sourcing?
**Answer:** Audit requirements, complex business logic, event-driven systems, need for replay, financial systems.

### 10. How do you implement event sourcing?
**Answer:** Event store, event types, command handlers create events, event handlers update state, replay mechanism, snapshots.

