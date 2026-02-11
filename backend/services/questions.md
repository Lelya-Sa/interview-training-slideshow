# Services - Interview Questions

## Questions (1-10)

### 1. What is a service in backend architecture?
**Answer:** Independent unit of functionality. Handles specific business capability, communicates via APIs, can be deployed independently.

### 2. What are microservices?
**Answer:** Small, independent services. Each service owns data, communicates via APIs, deployable independently, focused on business capability.

### 3. How do services communicate?
**Answer:** Synchronous (REST, gRPC) or asynchronous (message queues, events). API calls, pub/sub, event streaming.

### 4. What is service discovery?
**Answer:** Mechanism for services to find each other. Dynamic registry, enables service location without hardcoding URLs.

### 5. What is API Gateway?
**Answer:** Single entry point for clients. Routes requests, handles authentication, rate limiting, load balancing, protocol translation.

### 6. How do you handle data consistency across services?
**Answer:** Saga pattern, eventual consistency, distributed transactions, event sourcing, compensating transactions.

### 7. What is circuit breaker pattern?
**Answer:** Prevents cascade failures. Open circuit when service fails, fail fast, prevent overload, recover when service available.

### 8. How do you test microservices?
**Answer:** Unit tests, integration tests, contract testing, service virtualization, end-to-end tests, chaos engineering.

### 9. What is service mesh?
**Answer:** Infrastructure layer handling service communication. Manages load balancing, security, observability, routing between services.

### 10. How do you monitor microservices?
**Answer:** Distributed tracing, logging aggregation, metrics collection, health checks, alerting, service dashboards.

