# Message Queues - Interview Questions

## Questions (1-10)

### 1. What is a message queue?
**Answer:** Asynchronous communication mechanism. Producers send messages, consumers process them. Decouples services.

### 2. Why use message queues?
**Answer:** Decoupling, reliability, scalability, buffering, async processing, load leveling, fault tolerance.

### 3. What are common message queue systems?
**Answer:** RabbitMQ, Apache Kafka, AWS SQS, Redis, Amazon SNS, Azure Service Bus, Google Pub/Sub.

### 4. What is the difference between queue and pub/sub?
**Answer:** Queue: one consumer per message (work distribution). Pub/Sub: broadcast to all subscribers (event distribution).

### 5. What is message ordering?
**Answer:** Guaranteeing messages processed in order. Important for sequential operations, challenges in distributed systems.

### 6. How do you handle message failures?
**Answer:** Retry with exponential backoff, dead letter queue, idempotent processing, error logging, monitoring alerts.

### 7. What is idempotency in message processing?
**Answer:** Processing same message multiple times has same effect. Use unique message IDs, check if already processed.

### 8. What is the difference between RabbitMQ and Kafka?
**Answer:** RabbitMQ: traditional message broker, queue-based, good for task distribution. Kafka: event streaming, log-based, high throughput.

### 9. How do you ensure message delivery?
**Answer:** Acknowledgments, persistence, replication, retries, dead letter queues, monitoring, at-least-once or exactly-once semantics.

### 10. When would you use queues vs direct API calls?
**Answer:** Queues: async processing, decoupling, buffering, reliability needed. Direct: synchronous, immediate response, simple flow.

