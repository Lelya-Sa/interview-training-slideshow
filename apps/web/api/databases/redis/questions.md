# Redis - Interview Questions

## Questions (1-10)

### 1. What is Redis? What are its main features?
**Answer:** In-memory data store. Features: fast, various data types, persistence, replication, clustering.

### 2. What data types does Redis support?
**Answer:** Strings, Lists, Sets, Sorted Sets, Hashes, Bitmaps, HyperLogLog, Streams.

### 3. What are common use cases for Redis?
**Answer:** Caching, session storage, rate limiting, real-time analytics, message queues, distributed locks.

### 4. How does Redis persistence work?
**Answer:** RDB (snapshots) and AOF (append-only file). Can use both for durability.

### 5. Explain Redis replication.
**Answer:** Master-slave replication. Master handles writes, replicas handle reads. Automatic failover.

### 6. What is Redis clustering?
**Answer:** Horizontal scaling by sharding data across multiple nodes. Automatic partitioning.

### 7. How do you implement caching with Redis?
**Answer:** Store frequently accessed data with expiration. Check cache before database query.

### 8. How do you implement rate limiting with Redis?
**Answer:** Use INCR with key per user/IP, set expiration. Check count against limit.

### 9. What is the difference between Redis and Memcached?
**Answer:** Redis has more data types, persistence, replication. Memcached is simpler, multi-threaded.

### 10. How do you handle Redis failures?
**Answer:** Use replication, clustering, fallback to database, circuit breakers, monitoring.

