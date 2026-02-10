# System Design - Interview Questions

## Fundamental Questions (1-20)

### 1. What is system design? Why is it important?
**Answer:** System design is process of defining architecture, components, and data flow for a system. Important for building scalable, reliable, and maintainable systems that meet requirements.

### 2. Explain the difference between horizontal and vertical scaling.
**Answer:**
- **Horizontal**: Add more machines (scale out), better for distributed systems
- **Vertical**: Add more power to existing machine (scale up), simpler but limited

### 3. What is the CAP theorem? Explain each component.
**Answer:** CAP theorem states you can only guarantee 2 of 3:
- **Consistency**: All nodes see same data
- **Availability**: System remains operational
- **Partition Tolerance**: System works despite network failures

### 4. What is load balancing? Why is it important?
**Answer:** Load balancing distributes incoming requests across multiple servers. Important for:
- High availability
- Better performance
- Handling traffic spikes
- Fault tolerance

### 5. Explain different load balancing algorithms.
**Answer:**
- **Round Robin**: Equal distribution in rotation
- **Least Connections**: Route to server with fewest active connections
- **IP Hash**: Route based on client IP (sticky sessions)
- **Weighted**: Assign weights to servers
- **Geographic**: Route based on location

### 6. What is caching? What are different caching strategies?
**Answer:** Caching stores frequently accessed data in fast storage. Strategies:
- **Cache-Aside**: App checks cache, fetches from DB if miss
- **Write-Through**: Write to cache and DB simultaneously
- **Write-Back**: Write to cache, later to DB
- **Refresh-Ahead**: Proactively refresh cache

### 7. Explain the difference between SQL and NoSQL databases.
**Answer:**
- **SQL**: Structured, ACID compliance, relational, fixed schema
- **NoSQL**: Flexible schema, horizontal scaling, various models (document, key-value, graph)

### 8. What is database sharding? When would you use it?
**Answer:** Sharding splits database into smaller pieces (shards) across servers. Use when:
- Database too large for single server
- Need horizontal scaling
- Geographic distribution needed

### 9. Explain database replication. What are the types?
**Answer:** Replication copies data to multiple servers. Types:
- **Master-Slave**: One master, multiple read replicas
- **Master-Master**: Multiple masters, bidirectional replication
- **Multi-Master**: Multiple write nodes

### 10. What is a CDN? How does it work?
**Answer:** CDN (Content Delivery Network) is distributed network of servers. Works by:
- Caching content at edge locations
- Serving from nearest location
- Reducing latency
- Offloading origin server

### 11. Explain the difference between REST and GraphQL.
**Answer:**
- **REST**: Multiple endpoints, fixed response structure, over-fetching/under-fetching
- **GraphQL**: Single endpoint, client specifies needed data, flexible queries

### 12. What is a message queue? Why use it?
**Answer:** Message queue stores messages for asynchronous processing. Use for:
- Decoupling services
- Asynchronous processing
- Rate limiting
- Reliability

### 13. Explain microservices architecture. What are the benefits and challenges?
**Answer:** Microservices break application into small, independent services. Benefits:
- Independent deployment
- Technology diversity
- Scalability
- Fault isolation

Challenges:
- Complexity
- Network latency
- Data consistency
- Testing

### 14. What is an API Gateway? What are its responsibilities?
**Answer:** API Gateway is single entry point for clients. Responsibilities:
- Request routing
- Authentication/authorization
- Rate limiting
- Load balancing
- Protocol translation

### 15. Explain the difference between synchronous and asynchronous communication.
**Answer:**
- **Synchronous**: Sender waits for response (REST, gRPC)
- **Asynchronous**: Sender doesn't wait (message queues, events)

### 16. What is database indexing? How does it work?
**Answer:** Indexing creates data structure (B-tree) for faster lookups. Works by:
- Creating sorted structure
- Pointing to data location
- Speeding up SELECT queries
- Slowing down INSERT/UPDATE

### 17. Explain ACID properties in databases.
**Answer:**
- **Atomicity**: All or nothing
- **Consistency**: Valid state transitions
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data persists

### 18. What is eventual consistency? When is it acceptable?
**Answer:** Eventual consistency means data becomes consistent over time. Acceptable when:
- High availability needed
- Network partitions possible
- Slight inconsistency tolerable
- Distributed systems

### 19. Explain the difference between SQL and NoSQL in terms of consistency.
**Answer:**
- **SQL**: Strong consistency, ACID guarantees
- **NoSQL**: Often eventual consistency, BASE model, better for distributed systems

### 20. What is a distributed system? What are the challenges?
**Answer:** Distributed system spans multiple machines. Challenges:
- Network failures
- Partial failures
- Consistency
- Coordination
- Security

## Design Questions (21-40)

### 21. Design a URL shortener (like bit.ly).
**Answer:**
- **Requirements**: Shorten URLs, redirect, analytics
- **Scale**: 100M URLs/day, 10:1 read/write ratio
- **Components**: 
  - Web servers
  - Application servers
  - Database (SQL for metadata, NoSQL for mappings)
  - Cache (Redis for hot URLs)
- **Algorithm**: Base62 encoding, hash + collision handling
- **Database**: Shard by hash, use consistent hashing
- **Cache**: LRU eviction, 20% of traffic

### 22. Design a chat system (like WhatsApp).
**Answer:**
- **Requirements**: 1-on-1 and group chats, real-time delivery
- **Scale**: 500M users, 50B messages/day
- **Components**:
  - WebSocket servers for real-time
  - Message queue (Kafka) for persistence
  - Database (Cassandra for messages)
  - Cache (Redis for online status)
- **Delivery**: Online users via WebSocket, offline via push notifications
- **Storage**: Message ID, sender, receiver, timestamp, content

### 23. Design a social network feed (like Twitter).
**Answer:**
- **Requirements**: Post tweets, follow users, view timeline
- **Scale**: 200M users, 600M tweets/day
- **Components**:
  - Write path: API servers, database (sharded by user)
  - Read path: Fan-out to followers
  - Cache: Redis for timelines
- **Approaches**:
  - **Push**: Pre-compute timelines (write-heavy)
  - **Pull**: Fetch on read (read-heavy)
  - **Hybrid**: Push for celebrities, pull for others

### 24. Design a video streaming service (like YouTube).
**Answer:**
- **Requirements**: Upload, transcode, stream videos
- **Scale**: 1B users, 500 hours/minute upload
- **Components**:
  - CDN for video delivery
  - Transcoding service (convert formats)
  - Storage (object storage like S3)
  - Database (metadata)
  - Cache (popular videos)
- **Optimization**: Adaptive bitrate streaming, edge caching

### 25. Design a search engine (like Google).
**Answer:**
- **Requirements**: Index web pages, search, rank results
- **Scale**: 100B pages, 5B queries/day
- **Components**:
  - Web crawlers
  - Indexer (inverted index)
  - Query processor
  - Ranking algorithm (PageRank)
  - Distributed storage
- **Storage**: Sharded by document ID, replicated

### 26. Design a ride-sharing service (like Uber).
**Answer:**
- **Requirements**: Match riders with drivers, track location, process payments
- **Scale**: 100M users, 1M rides/day
- **Components**:
  - Location service (track drivers)
  - Matching service (find nearby drivers)
  - Payment service
  - Notification service
- **Storage**: 
  - User data (SQL)
  - Location data (NoSQL, time-series)
  - Trip data (SQL)

### 27. Design a file storage system (like Dropbox).
**Answer:**
- **Requirements**: Upload, download, sync files
- **Scale**: 500M users, 1PB storage
- **Components**:
  - Object storage (S3-like)
  - Metadata database (SQL)
  - Sync service
  - CDN for downloads
- **Optimization**: Chunking large files, deduplication

### 28. Design a notification system.
**Answer:**
- **Requirements**: Send notifications via email, SMS, push
- **Scale**: 1B notifications/day
- **Components**:
  - Notification service
  - Queue (RabbitMQ/Kafka)
  - Workers (email, SMS, push)
  - Templates service
- **Optimization**: Batching, rate limiting, priority queues

### 29. Design a recommendation system.
**Answer:**
- **Requirements**: Recommend items to users
- **Scale**: 100M users, 10M items
- **Components**:
  - Feature store
  - ML models
  - Ranking service
  - A/B testing framework
- **Approaches**: Collaborative filtering, content-based, hybrid

### 30. Design a distributed cache.
**Answer:**
- **Requirements**: Fast key-value storage, distributed
- **Scale**: 1M requests/sec, 100GB data
- **Components**:
  - Consistent hashing for sharding
  - Replication for availability
  - Eviction policies (LRU)
  - Cache invalidation
- **Storage**: In-memory, distributed across nodes

### 31. Design a rate limiting system.
**Answer:**
- **Requirements**: Limit requests per user/IP
- **Scale**: 1M requests/sec
- **Approaches**:
  - **Token bucket**: Tokens added at rate, consumed per request
  - **Sliding window**: Track requests in time window
  - **Fixed window**: Count requests per time period
- **Storage**: Redis for distributed rate limiting

### 32. Design a distributed lock service.
**Answer:**
- **Requirements**: Acquire/release locks across distributed system
- **Components**:
  - Lock service (Redis, ZooKeeper)
  - Lease mechanism (TTL)
  - Heartbeat for renewal
- **Challenges**: Deadlocks, network partitions

### 33. Design a metrics and monitoring system.
**Answer:**
- **Requirements**: Collect, store, query metrics
- **Scale**: 1M metrics/sec
- **Components**:
  - Collectors (agents)
  - Time-series database (InfluxDB)
  - Query engine
  - Visualization (Grafana)
  - Alerting

### 34. Design a distributed logging system.
**Answer:**
- **Requirements**: Collect, store, search logs
- **Scale**: 10B log entries/day
- **Components**:
  - Log collectors
  - Message queue (Kafka)
  - Storage (Elasticsearch)
  - Search interface
- **Optimization**: Indexing, compression, retention policies

### 35. Design a content delivery network (CDN).
**Answer:**
- **Requirements**: Serve content from edge locations
- **Components**:
  - Edge servers (geographically distributed)
  - Origin server
  - DNS for routing
  - Cache management
- **Optimization**: Cache hit ratio, TTL, invalidation

### 36. Design a distributed database.
**Answer:**
- **Requirements**: Store data across multiple nodes
- **Components**:
  - Sharding strategy
  - Replication mechanism
  - Consistency protocol
  - Transaction coordinator
- **Challenges**: Consistency, partitioning, coordination

### 37. Design a real-time analytics system.
**Answer:**
- **Requirements**: Process and analyze data in real-time
- **Scale**: 1M events/sec
- **Components**:
  - Stream processing (Kafka Streams, Flink)
  - Aggregation engine
  - Storage (time-series DB)
  - Dashboard
- **Processing**: Windowing, aggregations, joins

### 38. Design a distributed task scheduler.
**Answer:**
- **Requirements**: Schedule and execute tasks across cluster
- **Components**:
  - Scheduler (leader election)
  - Workers (execute tasks)
  - Queue (task storage)
  - Monitoring
- **Features**: Priority, retries, dependencies

### 39. Design a service discovery system.
**Answer:**
- **Requirements**: Services register and discover each other
- **Components**:
  - Registry (ZooKeeper, etcd, Consul)
  - Health checks
  - Load balancing
- **Patterns**: Client-side, server-side discovery

### 40. Design a distributed configuration management system.
**Answer:**
- **Requirements**: Store and distribute configuration
- **Components**:
  - Configuration store
  - Version control
  - Change notifications
  - Access control
- **Features**: Rollback, validation, encryption

## Advanced Questions (41-50)

### 41. How would you design a system to handle 1 billion requests per day?
**Answer:**
- Calculate: ~11,500 requests/sec average, ~100K peak
- Load balancers (multiple layers)
- Horizontal scaling (auto-scaling)
- Caching (Redis, CDN)
- Database optimization (read replicas, sharding)
- Async processing (queues)
- Monitoring and alerting

### 42. Design a system with 99.99% availability.
**Answer:**
- Redundancy at all levels
- Multi-region deployment
- Automatic failover
- Health checks
- Circuit breakers
- Graceful degradation
- Disaster recovery plan
- SLA monitoring

### 43. How would you handle a database that's too large for a single server?
**Answer:**
- **Sharding**: Split by key (user ID, hash)
- **Read replicas**: Distribute reads
- **Partitioning**: Split tables
- **Archiving**: Move old data
- **Caching**: Reduce DB load
- **Denormalization**: Optimize for reads

### 44. Design a system that processes 1TB of data per day.
**Answer:**
- **Batch processing**: Hadoop, Spark
- **Stream processing**: Kafka, Flink
- **Storage**: Distributed file system (HDFS, S3)
- **Compute**: Distributed processing
- **Optimization**: Compression, partitioning, indexing

### 45. How would you design a system to handle traffic spikes (10x normal)?
**Answer:**
- **Auto-scaling**: Add servers automatically
- **Caching**: Serve from cache
- **CDN**: Offload static content
- **Queue**: Buffer requests
- **Rate limiting**: Protect backend
- **Graceful degradation**: Reduce features
- **Load testing**: Prepare for spikes

### 46. Design a multi-tenant SaaS system.
**Answer:**
- **Tenant isolation**: Database per tenant vs shared
- **Data segregation**: Row-level security
- **Resource allocation**: Fair sharing
- **Billing**: Usage tracking
- **Customization**: Per-tenant configs
- **Security**: Access control

### 47. How would you design a system with global users?
**Answer:**
- **Multi-region deployment**: Deploy in regions
- **CDN**: Edge caching
- **Database replication**: Regional replicas
- **DNS**: Route to nearest region
- **Data locality**: Store data close to users
- **Consistency**: Eventual consistency acceptable

### 48. Design a system that needs to process payments.
**Answer:**
- **Security**: Encryption, PCI compliance
- **Idempotency**: Prevent duplicate charges
- **Transactions**: ACID guarantees
- **Audit trail**: Log all transactions
- **Fraud detection**: ML models
- **Retry logic**: Handle failures
- **Reconciliation**: Match transactions

### 49. How would you design a system with real-time requirements (<100ms latency)?
**Answer:**
- **In-memory processing**: Avoid disk I/O
- **Edge computing**: Process close to users
- **Optimized algorithms**: Fast data structures
- **Connection pooling**: Reuse connections
- **Caching**: Pre-compute results
- **Protocol**: WebSockets, gRPC
- **Monitoring**: Track latency

### 50. Design a system that needs to handle both batch and real-time processing.
**Answer:**
- **Lambda architecture**: Batch + stream layers
- **Kappa architecture**: Unified stream processing
- **Storage**: Separate for batch and stream
- **Processing**: Spark (batch), Flink (stream)
- **Unification**: Merge results
- **Trade-offs**: Consistency, latency, complexity

