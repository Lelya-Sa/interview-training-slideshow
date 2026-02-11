# SQL vs NoSQL - Interview Questions

## Questions (1-15)

### 1. What is the main difference between SQL and NoSQL databases?
**Answer:** SQL is relational with fixed schema, ACID properties. NoSQL is non-relational with flexible schema, horizontal scaling.

### 2. When would you choose SQL over NoSQL?
**Answer:** Complex queries, ACID compliance needed, structured data, transactions, reporting, established applications.

### 3. When would you choose NoSQL over SQL?
**Answer:** Large scale, rapid development, unstructured data, horizontal scaling, high write throughput, simple queries.

### 4. Explain ACID properties.
**Answer:** Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (persists).

### 5. Explain BASE properties.
**Answer:** Basically Available, Soft state, Eventual consistency. Used by NoSQL for distributed systems.

### 6. What are the types of NoSQL databases?
**Answer:** Document (MongoDB), Key-Value (Redis), Column (Cassandra), Graph (Neo4j).

### 7. What is the difference between SQL joins and NoSQL?
**Answer:** SQL uses JOINs for relationships. NoSQL embeds data or uses application-level joins.

### 8. How does scaling differ between SQL and NoSQL?
**Answer:** SQL scales vertically (bigger server). NoSQL scales horizontally (more servers).

### 9. What is schema migration in SQL vs NoSQL?
**Answer:** SQL: explicit migrations, alter tables. NoSQL: flexible schema, add fields without migration, backward compatible.

### 10. How do you handle relationships in NoSQL?
**Answer:** Embed documents (one-to-few), reference documents (one-to-many), denormalize (improve reads).

### 11. What are the trade-offs of SQL and NoSQL?
**Answer:** SQL: consistency vs scalability. NoSQL: flexibility vs structure, performance vs consistency.

### 12. Can you use both SQL and NoSQL together?
**Answer:** Yes, polyglot persistence. SQL for structured data, NoSQL for specific use cases (cache, logs, analytics).

### 13. What is eventual consistency?
**Answer:** Data becomes consistent over time. Acceptable for distributed systems where immediate consistency not critical.

### 14. How do transactions work in NoSQL?
**Answer:** Limited transaction support. Some support multi-document transactions (MongoDB), others single-document only.

### 15. What is database normalization? How does it apply to SQL vs NoSQL?
**Answer:** Organizing data to reduce redundancy. SQL uses normalization. NoSQL often denormalizes for performance.

