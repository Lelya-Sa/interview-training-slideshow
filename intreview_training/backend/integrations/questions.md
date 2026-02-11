# Integrations - Interview Questions

## Questions (1-10)

### 1. What are backend integrations?
**Answer:** Connecting backend with external services, APIs, third-party systems. Payment gateways, email services, analytics, etc.

### 2. How do you integrate with third-party APIs?
**Answer:** HTTP clients, SDKs, authentication (API keys, OAuth), error handling, retries, rate limiting, monitoring.

### 3. What is webhook integration?
**Answer:** Server-to-server communication. External service sends HTTP POST when event occurs, backend processes webhook.

### 4. How do you handle integration failures?
**Answer:** Retries with exponential backoff, circuit breakers, fallback mechanisms, error logging, alerts, graceful degradation.

### 5. What is API rate limiting in integrations?
**Answer:** Third-party APIs limit requests. Implement queuing, caching, batching, respect rate limits, handle 429 responses.

### 6. How do you test integrations?
**Answer:** Mock external services, use sandbox environments, integration tests, contract testing, test error scenarios.

### 7. What is idempotency in integrations?
**Answer:** Making same request multiple times has same effect. Use unique request IDs, check if already processed.

### 8. How do you secure integrations?
**Answer:** Use HTTPS, API keys/authentication, store secrets securely, validate webhook signatures, implement rate limiting.

### 9. What are common integration patterns?
**Answer:** Request/Response, Pub/Sub, Webhooks, Polling, Batch processing, Event-driven integration.

### 10. How do you monitor integrations?
**Answer:** Track API calls, response times, error rates, latency, set up alerts, log interactions, dashboard monitoring.

