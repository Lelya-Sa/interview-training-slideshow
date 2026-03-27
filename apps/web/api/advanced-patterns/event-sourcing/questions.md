# Event Sourcing - Interview Questions

## Concepts

### 1. What is event sourcing?
**Answer:** Store the sequence of events that happened (state changes) instead of only the current state. State is derived by replaying events.

### 2. What is an event in event sourcing?
**Answer:** An immutable record of something that happened (e.g. OrderPlaced, PaymentReceived). Usually has id, type, timestamp, payload.

### 3. Why use event sourcing?
**Answer:** Full audit trail, time travel, replay for new projections, debugging, and support for complex domains where history matters.

### 4. What is an event store?
**Answer:** Append-only storage for events, usually ordered by time or stream id. Optimized for appends and reads by stream/aggregate.

### 5. What is a projection (read model)?
**Answer:** A derived view built by applying events. E.g. “orders list” or “customer balance” built by replaying relevant events. Can be rebuilt from events.

### 6. What is CQRS and how does it relate to event sourcing?
**Answer:** CQRS separates read and write models. Event sourcing is a way to implement the write side (store events); read side is often projections.

### 7. What are the main challenges of event sourcing?
**Answer:** Schema evolution of events, storage growth, replay performance, eventual consistency of projections, and complexity of reasoning.

### 8. How do you handle updates or “corrections” in event sourcing?
**Answer:** Prefer new events (e.g. OrderCorrected) rather than editing old ones. If you must fix data, use new events or a separate correction stream and document policy.

### 9. What is snapshotting in event sourcing?
**Answer:** Periodically store the current state (or state at event N) so you don’t have to replay from the beginning. Replay from snapshot + later events.

### 10. When is event sourcing a good fit?
**Answer:** When you need full history, audit, or multiple read models from the same event log (e.g. finance, compliance, complex domains). Overkill for simple CRUD.
