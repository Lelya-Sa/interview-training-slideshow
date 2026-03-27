# CQRS - Interview Questions

## Basics

### 1. What does CQRS stand for?
**Answer:** Command Query Responsibility Segregation – separate models (and often code paths) for commands (writes) and queries (reads).

### 2. What is a command in CQRS?
**Answer:** An intent to change state (e.g. PlaceOrder, UpdateAddress). Usually one handler per command; may validate and then write to the write model or event store.

### 3. What is a query in CQRS?
**Answer:** A request for data with no side effects. Served from read models (views, caches, projections) optimized for how the data is consumed.

### 4. Why separate read and write models?
**Answer:** Reads and writes have different needs. Write model can be normalized and consistent; read models can be denormalized, cached, and shaped for UI or reports.

### 5. Does CQRS require event sourcing?
**Answer:** No. CQRS is about separating read/write; event sourcing is about storing events. You can use CQRS with a normal DB (different read/write models) or combine with event sourcing.

### 6. What is a read model?
**Answer:** A model optimized for queries (e.g. table, view, document, cache). Often denormalized and eventually consistent with the write side.

### 7. What is eventual consistency in CQRS?
**Answer:** After a command, read models may lag behind. UI might not show the update immediately. You handle this with polling, subscriptions, or optimistic updates.

### 8. When is CQRS useful?
**Answer:** When read and write patterns differ a lot (e.g. many different read views, complex writes, or when you want to scale reads and writes independently).

### 9. What are the downsides of CQRS?
**Answer:** More moving parts, eventual consistency complexity, possible duplication of logic, and need to keep read models in sync with writes.

### 10. How do you keep read models updated?
**Answer:** Handlers or subscribers react to writes (or events): update DB views, caches, or projections. Often async (message bus, change data capture, or event stream).
