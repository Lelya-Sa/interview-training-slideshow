# Webhooks - Interview Questions

## Questions (1-10)

### 1. What is a webhook?
**Answer:** HTTP callback - server sends HTTP POST to URL when event occurs. Reverse of API polling.

### 2. How do webhooks work?
**Answer:** Client registers URL with server. Server makes HTTP POST to URL when event happens. Client processes payload.

### 3. What is the difference between webhooks and polling?
**Answer:** Webhooks: server pushes events immediately. Polling: client repeatedly requests for updates. Webhooks more efficient.

### 4. What are common use cases for webhooks?
**Answer:** Payment notifications, CI/CD triggers, event notifications, data synchronization, real-time updates.

### 5. How do you secure webhooks?
**Answer:** Signature verification (HMAC), TLS/HTTPS, authentication tokens, IP whitelisting, validate payload.

### 6. How do you handle webhook failures?
**Answer:** Retry with exponential backoff, dead letter queue, idempotency keys, logging, monitoring.

### 7. What is idempotency in webhooks?
**Answer:** Processing same webhook multiple times has same effect. Use unique event IDs, check if already processed.

### 8. How do you test webhooks?
**Answer:** Use tools like ngrok for local testing, webhook.site, mock servers, unit tests with test payloads.

### 9. What is the difference between webhooks and WebSockets?
**Answer:** Webhooks: HTTP POST, server-initiated, event-driven. WebSockets: persistent connection, bidirectional, real-time.

### 10. How do you implement webhook delivery retries?
**Answer:** Exponential backoff, max retry attempts, dead letter queue for failed deliveries, track delivery status.

