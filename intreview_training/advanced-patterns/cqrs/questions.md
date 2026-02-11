# CQRS - Interview Questions

## Questions (1-10)

### 1. What is CQRS?
**Answer:** Command Query Responsibility Segregation. Separate read and write models. Different models for commands and queries.

### 2. How does CQRS work?
**Answer:** Commands (writes) use write model, Queries (reads) use read model. Separate databases, optimized for each operation.

### 3. What are the benefits of CQRS?
**Answer:** Independent scaling, optimized models, complex queries, simpler models, better performance, flexibility.

### 4. What are the challenges of CQRS?
**Answer:** Complexity, eventual consistency, synchronization, two models to maintain, over-engineering for simple cases.

### 5. When would you use CQRS?
**Answer:** Different read/write patterns, complex queries, high read/write ratio, need for optimization, event sourcing.

### 6. How do you synchronize read and write models in CQRS?
**Answer:** Event-driven updates, write model publishes events, read model subscribes and updates, eventual consistency.

### 7. What is the difference between CQRS and traditional CRUD?
**Answer:** CRUD: same model for read/write. CQRS: separate models, can have different structures, optimized separately.

### 8. How does CQRS relate to event sourcing?
**Answer:** Often used together. Event sourcing for write side (events), CQRS separates read/write, read models from events.

### 9. What is eventual consistency in CQRS?
**Answer:** Read model may be slightly behind write model. Acceptable trade-off for performance, use when acceptable.

### 10. How do you implement CQRS?
**Answer:** Separate command and query handlers, different data models, event bus for synchronization, read model updates async.

