# Observability - Interview Questions

## Questions (1-10)

### 1. What is observability?
**Answer:** Ability to understand system's internal state from external outputs. Three pillars: metrics, logs, traces.

### 2. What are the three pillars of observability?
**Answer:** Metrics (quantitative measurements), Logs (event records), Traces (request flow across services).

### 3. What are metrics?
**Answer:** Quantitative measurements over time. CPU usage, request rate, error rate, latency, business metrics.

### 4. What is distributed tracing?
**Answer:** Tracking request flow across multiple services. Shows path, latency, dependencies, helps debug distributed systems.

### 5. How do you implement logging?
**Answer:** Structured logging (JSON), log levels, centralized aggregation (ELK, Loki), correlation IDs, appropriate detail.

### 6. What is APM (Application Performance Monitoring)?
**Answer:** Monitoring application performance. Response times, throughput, error rates, resource usage, database queries.

### 7. What are SLI, SLO, and SLA?
**Answer:** SLI (Service Level Indicator): metric. SLO (Service Level Objective): target. SLA (Service Level Agreement): commitment.

### 8. How do you implement alerting?
**Answer:** Define thresholds, set up alerts on metrics, use alerting systems (Prometheus, Datadog), route to right channels.

### 9. What is the difference between monitoring and observability?
**Answer:** Monitoring: known issues, dashboards, alerts. Observability: unknown issues, exploration, understand system behavior.

### 10. How do you implement observability in microservices?
**Answer:** Distributed tracing, correlation IDs, centralized logging, metrics collection, service mesh, APM tools, dashboards.

