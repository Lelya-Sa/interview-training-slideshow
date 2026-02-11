# Storage - Interview Questions

## Questions (1-10)

### 1. What are storage patterns in backend architecture?
**Answer:** Database per service, shared database, CQRS, event sourcing, caching strategies, file storage.

### 2. What is database per service pattern?
**Answer:** Each microservice has own database. Ensures loose coupling, independent scaling, technology choice flexibility.

### 3. What is shared database anti-pattern?
**Answer:** Multiple services share same database. Tight coupling, difficult to scale, violates microservices principles.

### 4. How do you handle cross-service data access?
**Answer:** API calls between services, event-driven updates, shared cache, eventual consistency, avoid shared database.

### 5. What is object storage?
**Answer:** Store files as objects. S3, Azure Blob, GCS. Scalable, cost-effective, good for media files, backups.

### 6. What are storage strategies for different data types?
**Answer:** SQL for structured/transactional, NoSQL for unstructured/scale, Cache for hot data, Object storage for files.

### 7. How do you implement file upload storage?
**Answer:** Accept file, validate, store in object storage or file system, save metadata in database, return URL.

### 8. What is data partitioning?
**Answer:** Split data across multiple storage units. Horizontal partitioning (sharding), vertical partitioning, improves performance.

### 9. How do you backup and restore data?
**Answer:** Regular backups (full, incremental), replication, point-in-time recovery, test restore procedures, offsite storage.

### 10. What are storage best practices?
**Answer:** Choose right storage type, implement caching, use CDN for static assets, encrypt sensitive data, monitor usage.

