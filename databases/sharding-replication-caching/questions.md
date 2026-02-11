# Sharding, Replication, Caching - Interview Questions

## Questions (1-15)

### 1. What is database sharding?
**Answer:** Partitioning database into smaller pieces (shards) across multiple servers. Horizontal scaling technique.

### 2. How does sharding work?
**Answer:** Split data based on shard key (user ID, hash, range). Each shard stores subset of data. Route queries to appropriate shard.

### 3. What are sharding strategies?
**Answer:** Range-based (ranges of keys), Hash-based (hash function), Directory-based (lookup table), Geographic.

### 4. What are the challenges of sharding?
**Answer:** Cross-shard queries, data distribution, rebalancing, joins across shards, transaction complexity.

### 5. What is database replication?
**Answer:** Copying data to multiple servers. Provides redundancy, improves availability, enables read scaling.

### 6. What are replication types?
**Answer:** Master-Slave (one master, read replicas), Master-Master (bidirectional), Multi-Master (multiple masters).

### 7. What is the difference between synchronous and asynchronous replication?
**Answer:** Synchronous: wait for all replicas before commit (consistent, slower). Asynchronous: don't wait (faster, eventual consistency).

### 8. What is caching? Why use it?
**Answer:** Storing frequently accessed data in fast storage (memory). Reduces database load, improves response time.

### 9. What are caching strategies?
**Answer:** Cache-Aside (check cache first), Write-Through (write cache and DB), Write-Back (write cache, later DB).

### 10. What is cache invalidation?
**Answer:** Removing or updating cached data when source data changes. Methods: TTL, event-based, manual invalidation.

### 11. How do you handle cache misses?
**Answer:** Check cache, if miss query database, store result in cache, return data. Implement cache warming for hot data.

### 12. What is read-through caching?
**Answer:** Cache automatically loads from database on miss. Application always queries cache, cache handles DB lookup.

### 13. What is the difference between replication and sharding?
**Answer:** Replication: same data on multiple servers (availability, read scaling). Sharding: different data on servers (scalability).

### 14. How do you implement distributed caching?
**Answer:** Use Redis cluster, Memcached, or distributed cache. Consistent hashing for key distribution, replication for availability.

### 15. What are the trade-offs of caching?
**Answer:** Faster access vs memory usage, consistency challenges, cache invalidation complexity, potential stale data.

