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

### 51. What is the difference between scalability and performance?
**Answer:** Performance is how fast a single request is handled (latency, throughput per node). Scalability is how well the system handles more load by adding resources (horizontal/vertical). A system can be fast but not scalable, or scalable but need tuning for performance.

### 52. Explain the difference between latency and throughput.
**Answer:** Latency is time per request (e.g. 50ms). Throughput is requests per second (e.g. 1000 RPS). High throughput with low latency is ideal. Often trade-off: batching increases throughput but can increase latency.

### 53. What is a circuit breaker? When would you use it?
**Answer:** A pattern that stops calling a failing service after a threshold and fails fast. Prevents cascading failures and gives the failing service time to recover. Use when calling external or unreliable services.

### 54. What is idempotency? Why does it matter in APIs?
**Answer:** An operation is idempotent if doing it multiple times has the same effect as once (e.g. PUT with same body). Matters for retries and duplicate requests: clients can safely retry without creating duplicate side effects.

### 55. Explain the difference between polling and webhooks.
**Answer:** Polling: client repeatedly asks the server for updates. Webhooks: server pushes updates to a client URL when events occur. Polling is simpler but wasteful; webhooks are efficient but need a public endpoint and retry logic.

### 56. What is a reverse proxy? How does it differ from a load balancer?
**Answer:** Reverse proxy sits in front of servers and forwards client requests; can do SSL termination, caching, compression. Load balancer distributes traffic across servers. Often the same tool (e.g. nginx) does both.

### 57. What is the difference between stateful and stateless services?
**Answer:** Stateless: no stored client state; each request is independent; easy to scale horizontally. Stateful: server stores session or state; harder to scale; need sticky sessions or shared store. Prefer stateless for scalability.

### 58. Explain blue-green deployment vs canary deployment.
**Answer:** Blue-green: two identical environments; switch traffic from one to the other at once; instant rollback. Canary: gradually shift traffic to new version (e.g. 5% then 50% then 100%); limits blast radius; more complex.

### 59. What is a deadlock? How can you avoid it in distributed systems?
**Answer:** Deadlock: two or more processes wait for each other. Avoid: timeouts, ordered locking (always acquire locks in same order), avoid holding multiple locks, use distributed locks with TTL (e.g. Redis).

### 60. What is the difference between SQL JOIN and application-level joins?
**Answer:** SQL JOIN: database combines tables; single round-trip; optimized by DB. Application join: app fetches from multiple tables/services and joins in code; more round-trips; use when data is in different services (microservices).

### 61. Explain the difference between authentication and authorization.
**Answer:** Authentication: verifying who you are (login, tokens). Authorization: what you are allowed to do (roles, permissions). Authn first, then authz. Example: JWT for authn, claims/roles for authz.

### 62. What is rate limiting? Name common strategies.
**Answer:** Limiting how many requests a client can make. Strategies: fixed window, sliding window, token bucket, leaky bucket. Used to prevent abuse, ensure fairness, protect backends.

### 63. What is a health check? Why are liveness and readiness different?
**Answer:** Health check: endpoint that reports if the service is healthy. Liveness: is the process running? (restart if not). Readiness: can it accept traffic? (e.g. DB connected). Kubernetes uses both for pods.

### 64. Explain the difference between monolith and microservices.
**Answer:** Monolith: one codebase and deployment; simpler ops, harder to scale per component. Microservices: many small services; independent scaling and deployment, but complexity in networking, consistency, and ops.

### 65. What is API versioning? What are common approaches?
**Answer:** Managing breaking changes in APIs. Approaches: URL path (/v1/users), query param (?version=1), header (Accept-Version: 1), content negotiation. URL path is common and clear.

### 66. What is eventual consistency? When is it acceptable?
**Answer:** Replicas may temporarily disagree; they converge over time. Acceptable when: strict real-time consistency isn't needed (e.g. social feed, counters), or when availability matters more than immediate consistency.

### 67. What is a message broker? How does it differ from a message queue?
**Answer:** Message broker: middleware that routes messages (pub/sub, queues, topics). Message queue: FIFO queue for point-to-point. Brokers (e.g. RabbitMQ, Kafka) often support both queue and pub/sub patterns.

### 68. Explain the difference between TCP and HTTP.
**Answer:** TCP: transport layer, reliable byte stream, connection-oriented. HTTP: application layer, request-response over TCP (or other). HTTP/1.1 can reuse TCP connection; HTTP/2 multiplexes streams over one connection.

### 69. What is database connection pooling? Why use it?
**Answer:** Reusing a fixed set of DB connections instead of opening one per request. Reduces connection overhead and avoids exhausting DB connection limits. Application or proxy (e.g. PgBouncer) can pool.

### 70. What is the difference between horizontal and vertical partitioning?
**Answer:** Horizontal partitioning (sharding): split rows across tables/servers. Vertical partitioning: split columns (e.g. hot columns in one table, cold in another). Both reduce per-table size and can improve performance.

### 71. What is a CDN and when would you use one?
**Answer:** Content Delivery Network: edge servers cache and serve static (or dynamic) content close to users. Use for: static assets, images, video, global low latency, reducing load on origin.

### 72. Explain the difference between synchronous and asynchronous APIs.
**Answer:** Synchronous: client waits for response (e.g. REST request-response). Asynchronous: client gets immediate acknowledgment and result later (e.g. job id, webhook, or polling). Use async for long-running or batch work.

### 73. What is idempotency key? How do you use it?
**Answer:** Client sends a unique key (e.g. UUID) with a request. Server stores processed keys and returns the same response for duplicate keys. Ensures retries don't duplicate payments or orders.

### 74. What is the difference between SLA, SLO, and SLI?
**Answer:** SLI: metric (e.g. availability, latency). SLO: target for SLI (e.g. 99.9% availability). SLA: contract with users including consequences if SLO is missed. SLOs drive reliability work; SLAs are business commitments.

### 75. What is a distributed transaction? What are the challenges?
**Answer:** Transaction spanning multiple services or databases. Challenges: two-phase commit is blocking and complex; saga pattern uses local transactions and compensation; eventual consistency is common.

### 76. Explain the difference between cache invalidation and cache expiration.
**Answer:** Invalidation: explicitly remove or update cache when data changes (e.g. on write). Expiration: cache entry is removed after TTL. Often use both: TTL as safety net, invalidation for correctness.

### 77. What is the difference between read replica and write replica?
**Answer:** Read replica: copy of data for read-only queries; reduces load on primary; eventual consistency. Write replica: in multi-master, multiple nodes accept writes; need conflict resolution and replication.

### 78. What is an API Gateway? What are its main responsibilities?
**Answer:** Single entry point for clients. Responsibilities: routing, auth, rate limiting, SSL termination, request/response transformation, caching. Can also do protocol translation (REST to gRPC).

### 79. What is the difference between stateless and stateful authentication?
**Answer:** Stateless: server doesn't store session; JWT or signed token carries identity; scalable. Stateful: server stores session (e.g. in memory or Redis); need sticky session or shared store; easier to revoke.

### 80. What is backpressure? How do you handle it?
**Answer:** When a fast producer overwhelms a slow consumer. Handle: slow down producer, buffer (with limits), drop or reject, use backpressure protocol (e.g. Reactive Streams). Prefer backpressure over unbounded queues.

### 81. Explain the difference between leader election and leader lease.
**Answer:** Leader election: nodes pick one leader (e.g. via etcd, ZooKeeper). Leader lease: leader holds a time-limited lease; must renew; if it fails, lease expires and another can become leader. Lease avoids split-brain with stale leaders.

### 82. What is the difference between scalability and elasticity?
**Answer:** Scalability: system can handle more load by adding resources. Elasticity: system automatically adds/removes resources based on load (e.g. auto-scaling). Elasticity implies scalability plus automation.

### 83. What is a sidecar pattern? When would you use it?
**Answer:** Deploy a helper container next to the app (e.g. in same pod) for cross-cutting concerns: proxy, logging, metrics, auth. Use when you don't want to bake these into every app; common in service mesh.

### 84. What is the difference between availability and reliability?
**Answer:** Availability: % of time the system is up (e.g. 99.9%). Reliability: system behaves correctly (no data loss, correct results). A system can be available but unreliable (e.g. returning wrong data).

### 85. Explain the difference between push and pull model for metrics/logs.
**Answer:** Push: agents send metrics/logs to a central server (e.g. Prometheus pushgateway, log shipper). Pull: server scrapes agents (e.g. Prometheus scraping). Pull simplifies discovery and avoids fan-in; push suits ephemeral jobs.

### 86. What is the difference between scaling in and scaling out?
**Answer:** Scale out (horizontal): add more nodes; scale in: remove nodes. Scale up (vertical): add CPU/RAM to a node; scale down: remove. Auto-scaling often scales out under load and in when idle.

### 87. What is a bulkhead pattern? When would you use it?
**Answer:** Isolate resources (e.g. thread pools, connections) per component or tenant so one failing part doesn't starve others. Use in microservices to prevent one slow dependency from exhausting shared resources.

### 88. What is the difference between strong consistency and eventual consistency?
**Answer:** Strong: every read sees the latest write; linearizable or serializable. Eventual: replicas converge over time; reads may be stale. Choose based on use case: payments need strong; feeds can be eventual.

### 89. What is a saga pattern? How does it handle failures?
**Answer:** Saga coordinates multiple local transactions without a global lock. Each step has a compensating action. On failure, run compensations in reverse order. Challenges: partial rollback, visibility of saga state.

### 90. What is the difference between latency and response time?
**Answer:** Often used interchangeably. Strictly: latency is time until first byte or until work starts; response time is time until complete response. For APIs, "latency" usually means full request-response time.

### 91. What is a feature flag? Why use it?
**Answer:** Config that turns features on/off without deploy. Use for: gradual rollouts, A/B tests, killing switches, enabling for specific users. Stored in config service or DB; app checks at runtime.

### 92. Explain the difference between synchronous and asynchronous replication.
**Answer:** Synchronous: primary waits for replica(s) to confirm write before acknowledging; strong consistency, higher latency. Asynchronous: primary acknowledges before replicas apply; lower latency, risk of data loss if primary fails.

### 93. What is the difference between scalability and high availability?
**Answer:** Scalability: handling more load (performance under growth). High availability (HA): minimizing downtime (redundancy, failover). A system can scale but not be HA (single point of failure) or be HA but not scale.

### 94. What is a service mesh? What problems does it solve?
**Answer:** Infrastructure layer for service-to-service communication (e.g. Istio, Linkerd). Solves: mTLS, retries, timeouts, observability, traffic splitting—without changing application code. Sidecar proxies handle traffic.

### 95. What is the difference between throughput and bandwidth?
**Answer:** Throughput: useful work per second (e.g. requests/sec, records/sec). Bandwidth: data rate (e.g. bits/sec). A link can have high bandwidth but low throughput if processing is slow.

### 96. What is circuit breaker state machine? Name the states.
**Answer:** Closed: requests pass. Open: requests fail fast (no call to dependency). Half-Open: after timeout, allow a test request; if success go Closed, if failure go Open. Prevents cascading failures.

### 97. What is the difference between scaling to zero and scale to one?
**Answer:** Scale to zero: no instances when idle; save cost; cold start when traffic arrives. Scale to one: always at least one instance; no cold start; higher baseline cost. Serverless often scales to zero.

### 98. Explain the difference between active-active and active-passive.
**Answer:** Active-active: multiple nodes serve traffic; load shared; need to handle split-brain and data consistency. Active-passive: one primary serves traffic; standby takes over on failover; simpler, standby often underused.

### 99. What is a bulkhead in microservices? Give an example.
**Answer:** Isolate resources so one failing service doesn't affect others. Example: separate connection pool or thread pool per downstream service; limit max connections per service so one can't exhaust all.

### 100. What is the difference between disaster recovery (DR) and high availability (HA)?
**Answer:** HA: minimize downtime (redundancy, failover, same region often). DR: recover after a major failure (e.g. region down); backup site, RTO/RPO, runbooks. HA is daily; DR is for rare disasters.

### 101. What is eventual consistency in databases? Give an example.
**Answer:** Replicas may be temporarily out of sync; they converge. Example: read replica lags a few seconds behind primary; or multi-region writes that sync asynchronously. Acceptable for feeds, counts, non-critical reads.

### 102. What is the difference between scaling up and scaling out?
**Answer:** Scale up (vertical): add CPU, RAM, or disk to existing machine; simpler but limited. Scale out (horizontal): add more machines; better long-term, need stateless design and load balancing.

### 103. What is a dead letter queue (DLQ)? When do you use it?
**Answer:** Queue for messages that failed processing after retries. Use to: avoid blocking main queue, inspect failures, replay or discard. Set max receive count; move to DLQ on exceed.

### 104. What is the difference between consistency and coherence?
**Answer:** Consistency (in CAP): all nodes see same data. Coherence (in caches): cache and backing store agree. Often used similarly; coherence can mean "reads see latest writes" in a single system.

### 105. What is a canary release? How do you roll it back?
**Answer:** Canary: deploy new version to a small subset (e.g. 5% traffic); monitor; gradually increase. Rollback: route traffic back to old version (e.g. change load balancer or feature flag). Keep old version running until canary is fully promoted.

### 106. What is the difference between latency p50, p95, p99?
**Answer:** Percentiles: p50 (median), p95, p99 are the latency below which 50%, 95%, 99% of requests fall. p99 captures tail latency; important for user experience and SLA. p50 alone can hide bad tail.

### 107. What is database connection pooling? What are the trade-offs?
**Answer:** Reuse a fixed set of connections. Trade-offs: fewer connections to DB (good), but limit concurrent requests per process; need to size pool and handle timeouts. Stale connections must be refreshed.

### 108. What is the difference between hot and cold data?
**Answer:** Hot: frequently accessed; keep in fast storage (SSD, cache). Cold: rarely accessed; move to cheap/slow storage (archive, S3 Glacier). Tiering saves cost and keeps performance for hot data.

### 109. What is a retry with exponential backoff? Why use it?
**Answer:** Retry failed requests with increasing delay (e.g. 1s, 2s, 4s). Reduces thundering herd on failing service and gives it time to recover. Use for transient failures; add jitter and max retries.

### 110. What is the difference between synchronous and asynchronous messaging?
**Answer:** Synchronous: sender waits for response (e.g. HTTP). Asynchronous: sender sends and doesn't wait (e.g. message queue); receiver processes later. Async decouples and improves availability; need to handle ordering and retries.

### 111. What is a health endpoint? What should it check?
**Answer:** Endpoint (e.g. /health) that returns OK if the service is healthy. Liveness: minimal check (process up). Readiness: DB, cache, dependencies. Don't check optional dependencies in readiness or liveness may flap.

### 112. What is the difference between cache-aside and read-through cache?
**Answer:** Cache-aside: app manages cache; on miss, app loads from DB and populates cache. Read-through: cache layer loads from DB on miss; app only talks to cache. Write-through: write to cache and cache writes to DB.

### 113. What is a bulkhead in resilience? Give an example.
**Answer:** Isolate failures. Example: limit concurrent calls to a single downstream service (e.g. max 10 connections); if that service is slow, only 10 threads are blocked; rest of app keeps working.

### 114. What is the difference between RTO and RPO?
**Answer:** RTO (Recovery Time Objective): max acceptable downtime. RPO (Recovery Point Objective): max acceptable data loss (e.g. 1 hour of data). DR plan should meet both; they drive backup and replication strategy.

### 115. What is an API contract? Why is it important?
**Answer:** Agreement on request/response format (schema, status codes). Important for: compatibility between client and server, versioning, documentation. Tools: OpenAPI, gRPC protobuf, consumer-driven contracts.

### 116. What is the difference between horizontal sharding and vertical sharding?
**Answer:** Horizontal sharding: split rows across shards (e.g. by user_id). Vertical sharding: split columns or tables (e.g. user table vs orders table on different DBs). Horizontal is common for scale.

### 117. What is a circuit breaker? When does it open?
**Answer:** Stops calling a failing dependency after a threshold. Opens when failure rate or consecutive failures exceed limit. After a timeout, goes to half-open to test; closes if success, reopens if failure.

### 118. What is the difference between scaling in and scaling down?
**Answer:** Scale in: remove instances (horizontal). Scale down: reduce resources per instance (vertical). Auto-scaling "scale in" usually means removing nodes when load drops.

### 119. What is idempotency in messaging? How do you achieve it?
**Answer:** Processing the same message multiple times has the same effect as once. Achieve: dedupe by message id in DB, or make operation idempotent (e.g. set field to value, not increment). Critical for at-least-once delivery.

### 120. What is the difference between availability and durability?
**Answer:** Availability: service is up and responding. Durability: data is not lost (survives crashes, disk failure). Replication and backups improve both but are different: availability (serve traffic) vs durability (persist data).

### 121. What is a load balancer? Name two algorithms.
**Answer:** Distributes traffic across servers. Algorithms: Round Robin (rotate), Least Connections (busy servers get fewer new connections), IP Hash (same client to same server for stickiness).

### 122. What is the difference between scaling out and scaling up?
**Answer:** Scale out: add more nodes (horizontal). Scale up: add more CPU/RAM to a node (vertical). Scale out is preferred for stateless services; scale up has a ceiling.

### 123. What is a saga in distributed systems? How do you implement it?
**Answer:** Sequence of local transactions with compensating actions. Implement: choreography (each service emits events and reacts) or orchestration (central coordinator calls services and runs compensations on failure).

### 124. What is the difference between cache hit and cache miss?
**Answer:** Hit: requested data found in cache; fast. Miss: not in cache; load from source (e.g. DB) and optionally populate cache. Hit ratio (hit / (hit+miss)) measures cache effectiveness.

### 125. What is backpressure in streams? Why does it matter?
**Answer:** Downstream signals "slow down" to upstream when it can't keep up. Prevents memory blow-up and ensures stable throughput. Matters in stream processing (Kafka, Reactive); without it, fast producers overwhelm slow consumers.

### 126. What is the difference between blue-green and rolling deployment?
**Answer:** Blue-green: two full environments; switch traffic at once; instant rollback. Rolling: replace instances gradually (one or few at a time); no second full environment; rollback by rolling back to previous version.

### 127. What is a feature flag? How do you implement it?
**Answer:** Runtime toggle for features. Implement: config service or DB stores flag; app checks on request or startup; can be per user, % rollout, or global. Use for gradual release and kill switch.

### 128. What is the difference between strong and eventual consistency?
**Answer:** Strong: every read sees latest write (linearizable). Eventual: replicas converge; reads may be stale temporarily. Choose strong for money, inventory; eventual for social feed, view counts.

### 129. What is a reverse proxy? What are its benefits?
**Answer:** Sits in front of servers; forwards client requests. Benefits: SSL termination, caching, compression, single entry point, hide backend. Examples: nginx, HAProxy, Caddy.

### 130. What is the difference between SLA and SLO?
**Answer:** SLO: internal target (e.g. 99.9% uptime). SLA: contract with users including penalties or credits if SLO is not met. SLOs are what you engineer for; SLAs are what you promise customers.

### 131. What is an SLI? How does it relate to SLO?
**Answer:** SLI (Service Level Indicator) is a measurable metric (e.g. error rate, latency). SLO is a target on an SLI (e.g. 99.9% success rate). You measure SLIs and alert when SLO is at risk.

### 132. What is the difference between consistency and availability in CAP?
**Answer:** Consistency: every read sees the latest write. Availability: every request gets a response (no timeout). Under partition you often choose CP (consistent but may refuse) or AP (available but may return stale).

### 133. What is a leader election? When is it used?
**Answer:** Process to choose one node as leader in a distributed system. Used for: single writer (e.g. primary in primary-replica), distributed lock, coordination. Algorithms: Raft, Paxos, ZooKeeper.

### 134. What is the difference between replication and sharding?
**Answer:** Replication: same data on multiple nodes (redundancy, read scaling). Sharding: data split across nodes by key (write scaling, larger dataset). Often used together: shard + replicate each shard.

### 135. What is a message queue? Name two examples.
**Answer:** Queue holds messages between producers and consumers; decouples and buffers. Examples: RabbitMQ, Kafka, SQS. Use for async processing, load leveling, and reliability.

### 136. What is the difference between fan-out and fan-in in data flow?
**Answer:** Fan-out: one input to many consumers (e.g. event to multiple services). Fan-in: many producers to one consumer (e.g. aggregator). Design for both in event-driven systems.

### 137. What is idempotency in APIs? Why does it matter?
**Answer:** Same request applied once or many times has same effect. Matters for retries and at-least-once delivery. Use idempotency keys for POST; design PUT/DELETE to be idempotent.

### 138. What is the difference between polling and long polling?
**Answer:** Polling: client asks repeatedly at intervals. Long polling: client asks once; server holds until data or timeout, then responds. Long polling reduces empty responses; use WebSocket or SSE for true push.

### 139. What is a database index? What are the trade-offs?
**Answer:** Index speeds up lookups by key; B-tree or similar. Trade-offs: faster reads, slower writes (index update), extra storage. Use for columns in WHERE, JOIN, ORDER BY; avoid over-indexing.

### 140. What is the difference between cache-through and write-behind?
**Answer:** Write-through: write to cache and DB together; read from cache. Write-behind: write to cache, later flush to DB; faster writes, risk of loss on crash. Use write-through for consistency; write-behind for write throughput.

### 141. What is a circuit breaker? Name the states.
**Answer:** Stops calling a failing dependency to avoid cascade. States: closed (normal), open (fail fast), half-open (test recovery). Open after threshold failures; half-open after timeout to retry.

### 142. What is the difference between latency and throughput?
**Answer:** Latency: time per request (e.g. ms). Throughput: requests per second (e.g. QPS). Improve latency with caching, closer data; improve throughput with more instances, async.

### 143. What is database connection pooling? Why use it?
**Answer:** Reuse a fixed set of DB connections instead of opening per request. Reduces connection overhead and DB load. Use in app servers; size pool to DB max connections and concurrency.

### 144. What is the difference between horizontal and vertical partitioning?
**Answer:** Horizontal: split rows across tables/servers (sharding). Vertical: split columns (e.g. hot vs cold columns). Use horizontal for scale; vertical for schema or access pattern separation.

### 145. What is an API Gateway? What does it do?
**Answer:** Single entry point for clients; routes, auth, rate limit, logging, SSL. Offloads cross-cutting concerns from services. Examples: Kong, AWS API Gateway, nginx.

### 146. What is the difference between sync and async APIs?
**Answer:** Sync: client waits for response (request-response). Async: client gets accepted (202) and result later (polling, webhook, or event). Use async for long-running or batch jobs.

### 147. What is backpressure? How do you handle it?
**Answer:** Downstream cannot keep up; need to slow or buffer. Handle: limit producer rate, buffer (with limit), drop or reject, backpressure protocol (e.g. reactive streams). Prevents overload and OOM.

### 148. What is the difference between leader election and leader lease?
**Answer:** Election: choose leader (e.g. Raft). Lease: leader holds a time-limited lease; others do not take over until lease expires. Lease is simpler; election handles failure detection.

### 149. What is a sidecar? When would you use it?
**Answer:** Sidecar: helper process next to app (e.g. proxy, logging, metrics). Use for cross-cutting concerns without changing app code. Common in Kubernetes (Envoy, service mesh).

### 150. What is the difference between availability and reliability?
**Answer:** Availability: fraction of time system is up (e.g. 99.9%). Reliability: system behaves correctly (no bugs, data loss). You can have high availability but low reliability (often up but wrong).

### 151. What is push vs pull for metrics?
**Answer:** Push: agents send metrics to collector (e.g. StatsD, Prometheus pushgateway). Pull: collector scrapes targets (e.g. Prometheus). Pull gives control and discovery; push for ephemeral or firewall constraints.

### 152. What is the difference between scale in and scale out?
**Answer:** Scale out: add more nodes (horizontal). Scale in: remove nodes (shrink). Scale in is harder (drain traffic, migrate state). Use auto-scale policies for both.

### 153. What is a bulkhead pattern? Give an example.
**Answer:** Isolate resources so one failure does not exhaust all (e.g. thread pools per dependency, connection limits). Example: separate connection pool for payment service so its failure does not block others.

### 154. What is the difference between strong and eventual consistency?
**Answer:** Strong: every read sees latest write (linearizable). Eventual: replicas converge; reads may be stale. Choose strong for critical data; eventual for scale and availability.

### 155. What is a saga? How do you handle failures?
**Answer:** Saga: distributed transaction as sequence of local steps with compensations. On failure run compensating actions (reverse or cancel). Choreography (events) or orchestration (coordinator). Use for cross-service transactions.

### 156. What is the difference between latency and response time?
**Answer:** Often used interchangeably. Strictly: latency = network + queue time; response time = full time including server processing. For SLOs define which you measure (e.g. p99 response time).

### 157. What is a feature flag? Why use it?
**Answer:** Toggle feature on/off without deploy. Use for: gradual rollout, A/B test, kill switch, branch by environment. Store in config or feature-flag service; evaluate at runtime.

### 158. What is the difference between sync and async replication?
**Answer:** Sync: replica acknowledges after write; strong consistency, higher latency. Async: primary acknowledges before replica; lower latency, risk of lag or loss on failover. Choose by consistency vs latency.

### 159. What is the difference between scalability and high availability?
**Answer:** Scalability: handle more load (more users, QPS). HA: minimize downtime (redundancy, failover). You can scale without HA (single big box) or have HA without scale (two small boxes).

### 160. What is a service mesh? What does it do?
**Answer:** Dedicated infrastructure layer for service-to-service traffic (mTLS, retries, observability). Sidecar proxies (e.g. Envoy) next to each service. Offloads cross-cutting concerns from app code.

### 161. What is the difference between throughput and bandwidth?
**Answer:** Throughput: useful work per second (e.g. requests/sec). Bandwidth: data rate (e.g. bits/sec). A link can have high bandwidth but low throughput if processing is slow.

### 162. What are the circuit breaker states? When does it open?
**Answer:** Closed (normal), open (fail fast), half-open (probe). Opens after N failures or failure rate threshold. Half-open after timeout; one success closes it; failure re-opens.

### 163. What is the difference between scale to zero and scale to one?
**Answer:** Scale to zero: no instances when idle (save cost; cold start). Scale to one: at least one instance (no cold start; always paying). Use scale to zero for batch or low traffic.

### 164. What is active-active vs active-passive?
**Answer:** Active-active: all nodes serve traffic; load shared. Active-passive: primary serves; standby takes over on failover. Active-active uses resources fully; active-passive simpler but standby idle.

### 165. What is a dead letter queue (DLQ)? When use it?
**Answer:** Queue for messages that failed processing after retries. Use to isolate bad messages, inspect failures, and avoid blocking main queue. Replay or discard after fix.

### 166. What is the difference between consistency and coherence?
**Answer:** Consistency: global truth (e.g. linearizable). Coherence: observers agree on order (e.g. cache coherence). In distributed systems we usually talk about consistency; coherence in multicore.

### 167. What is a canary release? How do you roll back?
**Answer:** Deploy new version to small subset (canary); compare metrics; full rollout or rollback. Rollback: route traffic back to old version; redeploy old if needed. Use feature flags or traffic split.

### 168. What is the difference between p50, p95, p99 latency?
**Answer:** Percentiles: p50 median, p95 95% of requests faster, p99 tail. p99 matters for user experience (tail latencies). Use p99 for SLOs; monitor p50/p95 for trends.

### 169. What is connection pooling? What are trade-offs?
**Answer:** Reuse connections (DB, HTTP) instead of creating per request. Trade-offs: lower latency and load, but limited concurrency (pool size). Size pool to backend limits and app concurrency.

### 170. What is the difference between hot and cold data?
**Answer:** Hot: frequently accessed; keep in fast storage (cache, SSD). Cold: rarely accessed; move to cheap storage (archive, S3). Tier by access pattern and age for cost and performance.

### 171. What is retry with exponential backoff? Why use it?
**Answer:** Retry failed request with increasing delay (e.g. 1s, 2s, 4s). Reduces thundering herd and gives failing service time to recover. Use for transient failures; cap delay and max retries.

### 172. What is the difference between sync and async messaging?
**Answer:** Sync: sender waits for receiver (request-response). Async: sender sends; receiver processes later (queue, event). Use async for decoupling, buffering, and reliability.

### 173. What should a health endpoint check?
**Answer:** Liveness: am I running (minimal check). Readiness: can I serve (DB, cache, dependencies). Return 200 if ready; 503 if not. K8s uses liveness vs readiness probes.

### 174. What is the difference between cache-aside and read-through?
**Answer:** Cache-aside: app manages cache (read from cache, on miss read DB and populate cache). Read-through: cache layer loads from DB on miss (app only talks to cache). Read-through is simpler for app.

### 175. What is RTO vs RPO?
**Answer:** RTO (Recovery Time Objective): max acceptable downtime. RPO (Recovery Point Objective): max acceptable data loss (e.g. last 1 hour). Drive backup and replication strategy from RTO/RPO.

### 176. What is an API contract? Why important?
**Answer:** Contract: agreed request/response shape (schema, errors). Important for compatibility, docs, and testing. Use OpenAPI, GraphQL schema, or shared types; version and evolve carefully.

### 177. What is the difference between horizontal and vertical sharding?
**Answer:** Horizontal sharding: split rows by shard key (e.g. user_id). Vertical sharding: split tables/columns across DBs (e.g. users DB, orders DB). Use horizontal for scale; vertical for separation.

### 178. When does a circuit breaker open?
**Answer:** Opens after threshold: N consecutive failures or failure rate over window. Stops calling dependency; returns error or fallback. Prevents cascade and gives dependency time to recover.

### 179. What is the difference between scale in and scale down?
**Answer:** Often used interchangeably (reduce capacity). Scale in: remove instances (horizontal). Scale down: reduce resource per instance (vertical). Both reduce cost; scale in is more common in cloud.

### 180. How do you achieve idempotency in messaging?
**Answer:** Consumer tracks processed message IDs (e.g. in DB); skip duplicate IDs. Or use deduplication window (e.g. SQS). Producer sends idempotency key; consumer deduplicates. Critical for at-least-once delivery.

### 181. What is the difference between availability and durability?
**Answer:** Availability: service is up and responding. Durability: data is not lost (persisted, replicated). You can have high availability with low durability (e.g. in-memory only) or vice versa.

### 182. What is a load balancer? Name two algorithms.
**Answer:** Distributes traffic across servers. Algorithms: round robin, least connections, IP hash, weighted. Use for high availability and utilization. Layer 4 (TCP) or Layer 7 (HTTP).

### 183. What is the difference between scale out and scale up?
**Answer:** Scale out: add more nodes (horizontal). Scale up: add CPU/RAM to existing node (vertical). Scale out is preferred for cloud and limits; scale up for simple growth.

### 184. What is a saga? How do you implement it?
**Answer:** Distributed transaction as local steps + compensations. Implement: choreography (each service emits events and reacts) or orchestration (central coordinator calls services and runs compensations). Use for cross-service workflows.

### 185. What is the difference between cache hit and cache miss?
**Answer:** Hit: data found in cache; fast. Miss: not in cache; fetch from source and optionally populate cache. Monitor hit rate; optimize with TTL, warming, and eviction policy.

### 186. What is the difference between blue-green and rolling deployment?
**Answer:** Blue-green: two full environments; switch traffic at once. Rolling: replace instances gradually (new mixed with old). Blue-green is fast rollback; rolling uses less capacity.

### 187. How do you implement a feature flag?
**Answer:** Store flag name and value (and rules) in config or feature-flag service. App evaluates at runtime (user, segment, percentage). Use SDK or API; cache locally with TTL. Support override for testing.

### 188. What is the difference between strong and eventual consistency?
**Answer:** Strong: every read sees latest write. Eventual: replicas converge; may read stale. Choose strong for correctness-critical data; eventual for scale and availability (feeds, counts).

### 189. What is a reverse proxy? What are benefits?
**Answer:** Sits in front of servers; forwards requests. Benefits: SSL termination, caching, compression, single entry point, hide backend. Examples: nginx, Caddy, HAProxy.

### 190. What is the difference between SLA and SLO?
**Answer:** SLO: internal target (e.g. 99.9% uptime). SLA: contract with customers including penalties. Engineer to SLOs; promise SLAs. Multiple SLOs can back one SLA.

### 191. What is eventual consistency? Give an example.
**Answer:** Replicas converge over time; reads may be stale. Example: social feed (see friend's post after few seconds), view count (approximate), session data replicated across regions.

### 192. What is the difference between scale up and scale out?
**Answer:** Scale up: more resources per node (vertical). Scale out: more nodes (horizontal). Scale out is preferred for elasticity and fault isolation; scale up has a ceiling.

### 193. What is a DLQ? When do you use it?
**Answer:** Dead letter queue: queue for failed messages after retries. Use when message cannot be processed (bad format, dependency down) to avoid blocking main queue and to inspect/replay later.

### 194. What is the difference between consistency and coherence in systems?
**Answer:** Consistency: correctness of shared state (e.g. linearizable). Coherence: order visible to observers (e.g. cache coherence in CPU). In distributed systems we mean consistency.

### 195. What is a canary release? How do you roll back?
**Answer:** Deploy new version to small subset; monitor; full rollout or rollback. Rollback: route traffic to old version (config or deploy revert). Use feature flags or ingress rules.

### 196. What is p50 vs p95 vs p99?
**Answer:** Latency percentiles: p50 median, p95 95th percentile, p99 99th. p99 captures tail latency; use for SLOs. p50/p95 for typical and high-percentile behavior.

### 197. What is database connection pooling? Trade-offs?
**Answer:** Reuse DB connections; limit total open. Trade-offs: lower latency and DB load vs limited concurrency (pool size). Size pool to DB max connections and app threads.

### 198. What is hot vs cold data? How do you tier?
**Answer:** Hot: frequently accessed; fast storage. Cold: rarely accessed; cheap storage. Tier by access pattern (e.g. last 7 days hot, older cold) and move with lifecycle policies.

### 199. What is exponential backoff? Why use it?
**Answer:** Retry with increasing delay (e.g. 2^n seconds). Reduces load on failing service and improves success on retry. Use for transient failures; add jitter and cap max delay.

### 200. What is sync vs async messaging?
**Answer:** Sync: sender waits for response (RPC). Async: sender sends; receiver processes later (queue). Use async for decoupling, reliability, and load leveling.

### 201. What should a health check endpoint return?
**Answer:** 200 if service is ready (dependencies OK); 503 if not. Optionally JSON with status per dependency. Liveness: minimal (am I up). Readiness: can I serve traffic.

### 202. What is cache-aside vs read-through cache?
**Answer:** Cache-aside: app reads cache, on miss reads DB and populates cache. Read-through: cache layer loads from DB on miss; app only talks to cache. Read-through is simpler; cache-aside gives app control.

### 203. What is RTO and RPO?
**Answer:** RTO: max acceptable downtime (how long to recover). RPO: max acceptable data loss (how far back to recover). Drive replication and backup strategy from these.

### 204. Why is an API contract important?
**Answer:** Defines request/response shape; enables compatibility, docs, codegen, and testing. Version contract; avoid breaking changes or provide migration path.

### 205. What is horizontal vs vertical sharding?
**Answer:** Horizontal: split rows by shard key across nodes. Vertical: split tables/columns across DBs. Horizontal for scale; vertical for schema or service separation.

### 206. What is a circuit breaker? When does it open?
**Answer:** Stops calling failing dependency. Opens after N failures or failure rate; then fail fast or fallback. Half-open after timeout to retry. Prevents cascade failure.

### 207. What is scale in vs scale down?
**Answer:** Scale in: remove instances (horizontal shrink). Scale down: reduce resources per instance (vertical shrink). Both reduce capacity and cost.

### 208. How do you make messaging idempotent?
**Answer:** Consumer deduplicates by message ID or idempotency key (store processed IDs; skip duplicates). Or use exactly-once semantics if supported (e.g. Kafka transactions). Critical for at-least-once delivery.

### 209. What is availability vs durability?
**Answer:** Availability: service is up (uptime). Durability: data is not lost (persistence, replication). Design for both: redundancy for availability; replication and backups for durability.

### 210. Name two load balancer algorithms.
**Answer:** Round robin: rotate through servers. Least connections: route to server with fewest active connections. Others: IP hash (sticky), weighted (capacity).

### 211. What is scale out vs scale up?
**Answer:** Scale out: add more nodes (horizontal). Scale up: add CPU/RAM to node (vertical). Prefer scale out for cloud and fault isolation.

### 212. How do you implement a saga?
**Answer:** Define steps and compensating actions. Choreography: each service emits events and reacts. Orchestration: coordinator calls services and runs compensations on failure. Use for cross-service transactions.

### 213. What is cache hit vs cache miss?
**Answer:** Hit: data in cache; fast response. Miss: not in cache; fetch from source. Optimize hit rate with TTL, eviction, and warming; monitor miss rate.

### 214. What is blue-green vs rolling deployment?
**Answer:** Blue-green: two environments; switch all traffic at once; instant rollback. Rolling: replace instances gradually; less capacity; slower rollback. Choose by risk and capacity.

### 215. What is a feature flag? How implement?
**Answer:** Toggle feature without deploy. Implement: config or feature service (e.g. LaunchDarkly); app evaluates at runtime by user/segment/%. Use for rollout, A/B, kill switch.

### 216. Strong vs eventual consistency?
**Answer:** Strong: every read sees latest write. Eventual: replicas converge; may read stale. Use strong for critical data; eventual for scale and availability.

### 217. What is a reverse proxy? Benefits?
**Answer:** Forwards client requests to backend. Benefits: SSL offload, cache, compress, single entry, hide backend. nginx, HAProxy, Caddy.

### 218. What is SLA vs SLO?
**Answer:** SLO: internal target (e.g. 99.9% uptime). SLA: customer-facing contract with penalties. Engineer to SLOs; publish SLAs.

### 219. What is eventual consistency? Example.
**Answer:** Replicas eventually agree; reads may be stale temporarily. Example: social feed, view counts, cross-region session.

### 220. Scale up vs scale out?
**Answer:** Scale up: bigger machine (vertical). Scale out: more machines (horizontal). Prefer scale out for elasticity.

### 221. What is a dead letter queue? When use?
**Answer:** Queue for messages that failed after retries. Use to isolate failures and avoid blocking; replay or discard after fix.

### 222. Consistency vs coherence?
**Answer:** Consistency: correctness of shared state (e.g. linearizable). Coherence: order observed (e.g. cache coherence). In distributed systems we mean consistency.

### 223. What is canary release? Rollback?
**Answer:** Deploy to small subset; compare metrics; full rollout or rollback. Rollback: route traffic back to old version.

### 224. What is p50, p95, p99?
**Answer:** Latency percentiles: median, 95th, 99th. Use p99 for SLOs (tail latency); p50/p95 for trends.

### 225. Connection pooling? Trade-offs?
**Answer:** Reuse DB/HTTP connections. Trade-offs: lower latency vs limited concurrency (pool size). Size to backend limits.

### 226. Hot vs cold data? Tiering?
**Answer:** Hot: frequent access; fast storage. Cold: rare; cheap storage. Tier by access pattern and age; move with policies.

### 227. Exponential backoff? Why?
**Answer:** Retry with increasing delay. Reduces thundering herd and gives failing service time to recover. Use for transient failures.

### 228. Sync vs async messaging?
**Answer:** Sync: request-response; sender waits. Async: send and forget; process later (queue). Use async for decoupling and reliability.

### 229. What should health endpoint check?
**Answer:** Liveness: am I running. Readiness: can I serve (DB, cache OK). Return 200 or 503; optional per-dependency status.

### 230. Cache-aside vs read-through?
**Answer:** Cache-aside: app manages cache and DB. Read-through: cache layer loads from DB on miss; app only talks to cache. Read-through simpler for app.

### 231. Write-through vs write-behind cache?
**Answer:** Write-through: write to cache and DB together; read miss rare. Write-behind: write to cache, async to DB; faster write, risk of loss. Use write-through for consistency.

### 232. What is eventual consistency?
**Answer:** Replicas converge over time; no guarantee all see same data at once. Use for availability and partition tolerance. Acceptable for many use cases (social, feeds).

### 233. How do you design a rate limiter?
**Answer:** Token bucket or sliding window; store per user/IP in Redis; reject when over limit. Use for API protection. Distribute with Redis or similar.

### 234. What is a message queue? When to use?
**Answer:** Async buffer between producers and consumers. Use for decoupling, reliability, load leveling. Examples: RabbitMQ, Kafka, SQS.

### 235. What is idempotency? Why important?
**Answer:** Same request multiple times = same effect. Use for retries and at-least-once delivery. Store result by idempotency key; return same on replay.

### 236. How do you design a URL shortener?
**Answer:** Store long URL; generate short code (hash or base62 id); redirect GET to long URL. Use DB or key-value store; cache hot links. Consider collision and analytics.

### 237. What is database indexing? Trade-offs?
**Answer:** Index speeds read by key/column; slows write (maintain index). Use for query columns; avoid too many indexes. B-tree, hash, composite.

### 238. What is sharding? How to choose key?
**Answer:** Partition data across DBs by shard key. Choose key for even distribution and query pattern (avoid cross-shard). Use user_id, tenant_id, or hash.

### 239. What is replication? Primary-replica?
**Answer:** Copy data to replicas; read from replica, write to primary. Use for read scale and availability. Async or sync; eventual consistency if async.

### 240. How do you design a chat system?
**Answer:** Clients connect via WebSocket or long poll; message service stores and fans out; presence via heartbeat. Use queue for delivery; store history in DB. Scale with sharding and message routing.

### 241. What is circuit breaker?
**Answer:** Stop calling failing service after threshold; fail fast; periodically try again. Use for resilience. Prevents cascade failure. Open, half-open, closed states.

### 242. What is API gateway?
**Answer:** Single entry for clients; routes, auth, rate limit, transform. Use for central cross-cutting. Backend services behind gateway. Kong, AWS API GW.

### 243. How do you design a news feed?
**Answer:** Fan-out: push to followers' feeds (write-heavy) or pull on read (read-heavy). Hybrid: push for celebrities, pull for normal. Store feeds in cache/DB; rank by time or algo.

### 244. What is CQRS?
**Answer:** Command Query Responsibility Segregation: separate write and read models. Write to command side; read from read model (maybe eventually consistent). Use for scale and different read shapes.

### 245. What is event sourcing?
**Answer:** Store events (state changes) instead of current state; state = replay of events. Use for audit, replay, and flexible read models. Append-only store.

### 246. How do you design a search system?
**Answer:** Inverted index (term -> doc ids); full-text engine (Elasticsearch, etc.). Index documents; query parses and searches index. Use for fuzzy and ranking. Scale with sharding.

### 247. What is microservices vs monolith?
**Answer:** Monolith: one deployable unit. Microservices: many small services, own data. Use microservices for scale and team autonomy; monolith for simplicity. Trade-off: complexity vs flexibility.

### 248. What is service discovery?
**Answer:** Clients find service instances (IP/port) dynamically. Use DNS, Consul, or platform (k8s). Enables scaling and failover. Health checks remove bad instances.

### 249. How do you design a video streaming system?
**Answer:** Store video in object storage; CDN for delivery; adaptive bitrate (HLS/DASH); transcoding pipeline. Use chunks and range requests. Scale CDN and storage.

### 250. What is bulkhead pattern?
**Answer:** Isolate resources (thread pools, connections) per dependency. Failure in one doesn't exhaust all. Use for resilience. Like ship bulkheads.

### 251. What is saga pattern?
**Answer:** Distributed transaction as sequence of local steps with compensating actions on failure. Use for cross-service transactions. Choreography or orchestrator.

### 252. How do you design a recommendation system?
**Answer:** Collaborative filtering, content-based, or hybrid; store user-item matrix or embeddings; serve from cache. Use for personalization. Scale with batch and real-time pipeline.

### 253. What is blue-green deployment?
**Answer:** Two environments (blue, green); traffic switches from one to other. Zero-downtime deploy. Use for releases. Rollback by switching back.

### 254. What is canary deployment?
**Answer:** New version to small % of traffic; monitor; then full rollout. Use for risk reduction. Feature flags or routing by %.

### 255. How do you design a distributed cache?
**Answer:** Partition data across nodes (consistent hash or sharding); replication for availability; client or proxy routing. Use Redis Cluster, Memcached. Invalidate with TTL or events.

### 256. What is leader election?
**Answer:** One node is leader (e.g. for writes); others replicate. Use consensus (Raft, Paxos) or external store (ZooKeeper). Enables single-writer and coordination.

### 257. What is consistent hashing?
**Answer:** Keys and nodes on ring; key maps to next node. Add/remove node affects only neighbors. Use for cache and sharding. Reduces rebalance cost.

### 258. How do you design a file storage system?
**Answer:** Object storage (S3-style); partition by key; replicate for durability. Use for large files. CDN for hot content. Scale with sharding and multipart upload.

### 259. What is database connection pooling?
**Answer:** Reuse connections; limit open connections. Use for efficiency. Size to DB limit. PgBouncer, HikariCP. Reduces connection overhead.

### 260. What is dead letter queue?
**Answer:** Queue for messages that failed after retries. Use for debugging and manual replay. Don't lose failed messages. Monitor DLQ.

### 261. How do you design a notification system?
**Answer:** Event triggers; queue to workers; workers send (email, push, SMS) via providers. Use for async and retry. Template and user preferences. Scale workers.

### 262. What is backpressure?
**Answer:** Slow consumer signals producer to slow down. Use for streaming and queues. Prevents overload. TCP and reactive streams have backpressure.

### 263. What is idempotency key?
**Answer:** Client sends unique key with request; server stores result; same key returns same result. Use for POST and retries. TTL for key storage.

### 264. How do you design a ride-sharing system?
**Answer:** Match riders and drivers (geo index); track location; pricing and ETA service; payments. Use real-time and queue. Scale with sharding by region.

### 265. What is database connection limit?
**Answer:** DB has max connections; exceed causes failure. Use pooling and limit per app. Monitor and size. Connection pool per instance.

### 266. What is message ordering?
**Answer:** Messages in same stream/partition processed in order. Use Kafka partition key or single consumer per partition. Trade-off with parallelism.

### 267. How do you design a payment system?
**Answer:** Idempotent charges; store state; integrate with processor (Stripe); webhooks for async; reconcile. Use for reliability and compliance. Never double-charge.

### 268. What is eventual consistency boundary?
**Answer:** Define where consistency is strong vs eventual. E.g. account balance strong; feed eventual. Use for design clarity. Document for team.

### 269. What is database read replica lag?
**Answer:** Replica behind primary (async replication). Read your writes: read from primary after write. Use for scaling reads; accept lag for non-critical reads.

### 270. How do you design a social graph?
**Answer:** Store follow/friend edges; graph DB or adjacency list; fan-out for feed. Use for recommendations and feed. Scale with sharding by user.

### 271. What is partition in Kafka?
**Answer:** Topic split into partitions; order within partition; parallel consumers. Use partition key for ordering. More partitions = more parallelism.

### 272. What is consumer group?
**Answer:** Consumers in group share partitions; each partition one consumer. Use for scale and ordering. Rebalance when members change.

### 273. How do you design a metrics system?
**Answer:** Collect metrics (counters, gauges); store in TSDB (Prometheus, InfluxDB); query and alert. Use for observability. Scrape or push. Retention and aggregation.

### 274. What is tracing? Why?
**Answer:** Trace request across services; span per service; trace id links. Use for debugging and latency. OpenTelemetry, Jaeger. See full path.

### 275. What is log aggregation?
**Answer:** Centralize logs from services; search and analyze. Use ELK, Loki, or cloud. Structured logs and correlation id. Retention and cost.

### 276. How do you design a leaderboard?
**Answer:** Sorted set (Redis) by score; range query for rank. Update on score change. Use for real-time. Shard by game or time window if huge.

### 277. What is database transaction?
**Answer:** ACID: atomicity, consistency, isolation, durability. Use for multi-step writes. Distributed tx is hard; prefer saga or local tx.

### 278. What is two-phase commit?
**Answer:** Coordinator asks prepare; all vote; then commit or abort. Use for distributed ACID. Blocks on failure; rarely used. Prefer saga.

### 279. How do you design a job scheduler?
**Answer:** Store jobs (cron or one-off); workers poll or get triggered; retry and DLQ. Use for async tasks. Scale workers. Idempotent jobs.

### 280. What is event-driven architecture?
**Answer:** Services emit events; others subscribe. Decoupled. Use for async and scalability. Event bus or message queue. Eventual consistency.

### 281. What is API versioning?
**Answer:** Support multiple versions (URL or header); deprecate old. Use for breaking changes. Document and sunset. v1, v2 in path or Accept.

### 282. How do you design a real-time dashboard?
**Answer:** Data pipeline to store; API or WebSocket for client; aggregate in real-time or pre-compute. Use for low latency. Cache and push updates.

### 283. What is health check?
**Answer:** Endpoint returns 200 if OK; 503 if not. Use for load balancer and k8s. Liveness vs readiness. Check dependencies in readiness.

### 284. What is graceful shutdown?
**Answer:** Stop accepting new requests; finish in-flight; then exit. Use for zero-downtime deploy. Drain period and timeout.

### 285. How do you design a coupon/discount system?
**Answer:** Store rules (amount, product, user); validate at checkout; idempotent apply. Use for consistency. Limit use and expiry. Audit.

### 286. What is feature flag?
**Answer:** Toggle feature without deploy. Use for rollout and A/B test. Store in config or DB; evaluate at runtime. Remove when stable.

### 287. What is A/B testing?
**Answer:** Split traffic by variant; measure metric. Use for experimentation. Assign user to variant; track and analyze. Statistical significance.

### 288. How do you design a document store?
**Answer:** Store docs (JSON/BSON); index fields; query by field. Use MongoDB, CouchDB. Scale with sharding. Schema flexible.

### 289. What is blob storage?
**Answer:** Store large binary objects (files, backups). Use S3, GCS. Key-value; versioning and lifecycle. Cheap and durable.

### 290. What is CDN?
**Answer:** Edge caches for static and dynamic content. Use for low latency and offload origin. Invalidate on update. Geographic distribution.

### 291. How do you design a multiplayer game backend?
**Answer:** Real-time state sync (WebSocket or UDP); authoritative server or P2P; matchmaking and rooms. Use for low latency. Scale with regions and sharding.

### 292. What is database migration?
**Answer:** Versioned schema changes; apply in order. Use for safe rollout. Backward compatible when possible. Rollback plan.

### 293. What is schema evolution?
**Answer:** Change schema with backward compatibility. Add optional fields; deprecate gradually. Use for evolving systems. Avro, Protobuf support.

### 294. How do you design an ad server?
**Answer:** Match ad to request (user, context); rank and filter; track impression/click. Use for low latency. Budget and frequency cap. Scale with cache.

### 295. What is eventual consistency model?
**Answer:** Replicas converge; no global order. Use read repair or anti-entropy. Accept stale read for availability. Document guarantees.

### 296. What is strong consistency?
**Answer:** Read sees latest write. Use single leader or consensus. Trade-off: availability and latency. Required for money, inventory.

### 297. How do you design a queue system?
**Answer:** Producers push; consumers pull; at-least-once or exactly-once with idempotency. Use for async and decoupling. Scale consumers. Visibility timeout (SQS).

### 298. What is message retention?
**Answer:** How long messages kept. Use for replay and audit. Kafka: retention by time/size. Balance storage and need.

### 299. What is consumer offset?
**Answer:** Position in partition (Kafka). Consumer commits offset after process. Use for resume and at-least-once. Manage commit policy.

### 300. How do you design a reservation system?
**Answer:** Lock inventory for period; confirm or release. Use DB transaction or optimistic lock. Idempotent reserve. Handle timeout and overbooking.

### 301. What is database partitioning?
**Answer:** Split table by key (range or hash). Use for large tables. Partition pruning for query. Same DB, logical split. Different from sharding (separate DBs).

### 302. What is read-your-writes consistency?
**Answer:** After write, read sees it. Use primary for read after write or session stickiness. Important for UX. Replicas may lag.

### 303. How do you design a like/favorite system?
**Answer:** Store user-item pairs; count in cache or DB; denormalize count on item. Use for scale. Idempotent like/unlike. High write for viral content.

### 304. What is cache invalidation?
**Answer:** Remove or update cache when data changes. Invalidate on write; TTL as backup. Use for consistency. Hard problem; patterns: invalidate key, version key, TTL.

### 305. What is cache stampede?
**Answer:** Many requests miss cache and hit DB at once. Use lock (single flight) or probabilistic early expiry. Prevent thundering herd.

### 306. How do you design a timeline/activity feed?
**Answer:** Store events; aggregate by user (pull) or push to feed (fan-out). Use hybrid for scale. Rank by time or score. Paginate with cursor.

### 307. What is database lock?
**Answer:** Pessimistic: lock row/table. Optimistic: version check on update. Use for consistency. Avoid long locks; prefer optimistic for contention.

### 308. What is deadlock?
**Answer:** Two transactions wait for each other. Prevent: lock order, timeout, deadlock detection. Use for DB and distributed. Avoid with design.

### 309. How do you design a review/rating system?
**Answer:** Store review and rating; aggregate (avg) in cache or materialized view. Use for display. Update aggregate on write. Handle spam and fraud.

### 310. What is eventual consistency vs strong?
**Answer:** Eventual: replicas converge later. Strong: read sees latest. Trade-off: availability and latency vs consistency. Choose by use case.

### 311. What is monotonic read?
**Answer:** User sees non-decreasing sequence of reads (no time travel). Use session or sticky replica. Weaker than strong; stronger than eventual for one user.

### 312. How do you design a follow/follower system?
**Answer:** Store edges (follower, followee); graph or table; fan-out for feed. Use for social. Scale with sharding. Denormalize count.

### 313. What is database vacuum/compaction?
**Answer:** Reclaim space and reorder (e.g. PostgreSQL VACUUM). Use for maintenance. Run during low load. Important for bloat.

### 314. What is write amplification?
**Answer:** One logical write causes many physical writes (e.g. LSM tree, replication). Use for durability; minimize for performance. SSD wear.

### 315. How do you design a ticket system?
**Answer:** Create ticket; assign; state machine; comments and history. Use queue for assignment. Notify and SLA. Scale with sharding by org.

### 316. What is database backup?
**Answer:** Full and incremental; point-in-time recovery. Use for disaster recovery. Test restore. Offsite and encrypted.

### 317. What is point-in-time recovery?
**Answer:** Restore to any moment using backup + WAL. Use for recovery. Retention and storage cost. Critical for compliance.

### 318. How do you design a geo/location service?
**Answer:** Store points; geo index (R-tree, Geohash); query nearby. Use for search and ads. Scale with sharding by region. Redis Geo, PostGIS.

### 319. What is database connection string?
**Answer:** URL with host, port, DB, user, password. Use for config. Rotate credentials. Don't commit. Use secret manager.

### 320. What is connection timeout?
**Answer:** Fail if connection not established in time. Use for resilience. Set per client. Retry with backoff. Different from query timeout.

### 321. How do you design a subscription/billing system?
**Answer:** Plans and usage; meter events; bill periodically; integrate payment. Use for SaaS. Idempotent usage. Proration and trials.

### 322. What is idempotent consumer?
**Answer:** Process message multiple times; same effect. Use dedup (store processed id) or natural idempotency. Required for at-least-once.

### 323. What is at-least-once delivery?
**Answer:** Message may be delivered more than once. Use idempotent consumer. Commit after process. Trade-off with exactly-once.

### 324. How do you design a config service?
**Answer:** Store config; version and env; serve to clients; refresh on change. Use for feature flags and settings. Cache in client. Audit changes.

### 325. What is exactly-once delivery?
**Answer:** Message delivered and processed once. Use transactional outbox or dedup. Hard in distributed. Kafka exactly-once with transactions.

### 326. What is transactional outbox?
**Answer:** Write message to outbox in same tx as business data; separate process publishes. Use for reliable messaging. No lost messages.

### 327. How do you design a fraud detection system?
**Answer:** Rules and ML; real-time and batch; store signals; score and block. Use for payments. Low latency for block. Feedback loop.

### 328. What is database connection pool size?
**Answer:** Tune to DB limit and concurrency. Too small: queue. Too large: DB overload. Rule of thumb: connections = threads or workers. Monitor.

### 329. What is query timeout?
**Answer:** Abort query after time. Use for preventing long queries. Set per query or default. Cancel on client disconnect. Protect DB.

### 330. How do you design a session store?
**Answer:** Store session id -> data in cache (Redis); TTL; sticky or no. Use for web. Scale with cache cluster. Secure cookie.

### 331. What is sticky session?
**Answer:** Same client to same server (by cookie or IP). Use for stateful app. Trade-off: imbalance. Prefer stateless and shared store.

### 332. What is stateless service?
**Answer:** No in-memory state; state in DB or cache. Use for scale and deploy. Any instance can serve any request. Preferred for cloud.

### 333. How do you design a workflow engine?
**Answer:** Define steps and transitions; store state; workers execute steps; retry and compensate. Use for long-running. Saga or state machine. Idempotent steps.

### 334. What is database connection leak?
**Answer:** Connection not closed; pool exhausted. Use try/finally or borrow pattern. Monitor pool. Fix with proper close.

### 335. What is connection pool exhaustion?
**Answer:** All connections in use; new requests wait or fail. Use sizing, timeout, and monitoring. Scale or optimize queries. Circuit breaker for DB.

### 336. How do you design a referral system?
**Answer:** Store referral code and link to user; on signup attribute; track and reward. Use for growth. Idempotent attribution. Fraud check.

### 337. What is database connection retry?
**Answer:** Retry connect with backoff on failure. Use for resilience. Limit retries. Different from query retry. Startup and transient failures.

### 338. What is connection pool per service?
**Answer:** Each service instance has own pool. Total connections = instances × pool size. Size DB for total. Consider serverless (no pool).

### 339. How do you design a waitlist/queue system?
**Answer:** Add to list; notify when spot; fair ordering. Use for launches. Store in queue or DB. Idempotent join. Prevent gaming.

### 340. What is database read preference?
**Answer:** Read from primary or replica. Primary for consistency; replica for scale. Use tag for geo. Trade-off: consistency vs load.

### 341. How do you design a marketplace (buyer-seller)?
**Answer:** Listings, search, cart, checkout, payments (escrow), reviews. Use for two-sided. Match and ranking. Fees and disputes. Scale with sharding.

### 342. What is database write concern?
**Answer:** How many replicas must ack write (e.g. majority). Use for durability vs latency. Stronger = slower. Trade-off for MongoDB-style.

### 343. What is quorum read/write?
**Answer:** Read/write from majority of replicas. Use for consistency in distributed DB. W + R > N for strong. Prevents stale read.

### 344. How do you design a content moderation system?
**Answer:** Queue for review; ML or human; approve/reject; appeal. Use for UGC. Async pipeline. Scale with workers. Audit and policy.

### 345. What is database snapshot?
**Answer:** Point-in-time copy of DB. Use for backup and clone. Consistent read. Storage cost. Restore from snapshot.

### 346. What is logical vs physical replication?
**Answer:** Logical: replicate SQL or changes. Physical: replicate blocks. Logical allows filtering; physical is exact. Use for replica and CDC.

### 347. How do you design a notification preference center?
**Answer:** Store user preferences (channel, frequency); check before send; respect opt-out. Use for compliance. Per channel and type. Update in real-time.

### 348. What is CDC (Change Data Capture)?
**Answer:** Capture DB changes (insert, update, delete) and stream. Use for sync and event sourcing. Debezium, Kafka Connect. Ordering and exactly-once.

### 349. What is database trigger?
**Answer:** Code run on insert/update/delete. Use for denormalization and audit. Avoid heavy logic; prefer app or async. Consistency and performance.

### 350. How do you design a live streaming system?
**Answer:** Ingest (RTMP/WebRTC); transcode; distribute via CDN (HLS/DASH); low latency option. Use for scale. Buffering and quality. Scale ingest and CDN.

### 351. What is database view?
**Answer:** Virtual table (query). Use for abstraction and security. Materialized view for performance (pre-compute). Update on schedule or trigger.

### 352. What is materialized view?
**Answer:** Stored result of query; refreshed periodically or on change. Use for aggregation and join. Trade-off: freshness vs performance. Maintain cost.

### 353. How do you design a collaboration (Google Docs style)?
**Answer:** OT or CRDT for concurrent edit; sync to server; broadcast to clients. Use for real-time. Conflict resolution. Scale with presence and version.

### 354. What is database constraint?
**Answer:** Rule on data (unique, foreign key, check). Use for integrity. Enforce in DB. Index for FK. Cascade or restrict on delete.

### 355. What is foreign key?
**Answer:** Reference to primary key in other table. Use for integrity. Index for join. Consider cascade. Can skip for scale (app-level).

### 356. How do you design a badge/achievement system?
**Answer:** Define rules; evaluate on events; grant badge; store user-badge. Use for gamification. Idempotent grant. Cache and denormalize.

### 357. What is database normalization?
**Answer:** Structure to reduce redundancy (1NF, 2NF, 3NF). Use for integrity. Denormalize for read performance. Trade-off: write vs read.

### 358. What is denormalization?
**Answer:** Add redundant data for read performance. Use for hot path. Trade-off: consistency and storage. Update on write or async.

### 359. How do you design a reporting/analytics system?
**Answer:** ETL to warehouse; aggregate and cube; serve via API or BI tool. Use for dashboards. Batch and real-time. Scale with partitioning.

### 360. What is OLTP vs OLAP?
**Answer:** OLTP: transactional, row-based, low latency. OLAP: analytical, column-based, aggregate. Use right DB for workload. Separate systems common.

### 361. What is data warehouse?
**Answer:** Central store for analytics; ETL from sources; star/snowflake schema. Use for reporting. Batch load. Redshift, BigQuery, Snowflake.

### 362. What is data lake?
**Answer:** Raw data in object storage; schema on read. Use for flexibility and ML. Cost-effective. Process with Spark, etc. Governance important.

### 363. How do you design a A/B test platform?
**Answer:** Assign user to experiment and variant; track events; analyze by variant. Use for product. Random assignment; statistical rigor. Scale with events.

### 364. What is ETL?
**Answer:** Extract from sources; Transform (clean, aggregate); Load to destination. Use for data pipeline. Batch or streaming. Idempotent and incremental.

### 365. What is data pipeline?
**Answer:** Flow of data from source to sink; may transform. Use for analytics and sync. Reliable and ordered. Kafka, Airflow, etc.

### 366. How do you design a recommendation engine (simple)?
**Answer:** Collaborative or content-based; compute similarity; store and serve top-k. Use for personalization. Batch update; cache results. Scale with approximate (ANN).

### 367. What is database connection SSL?
**Answer:** Encrypt connection to DB. Use for security. Required in cloud. Verify certificate. No plaintext credentials.

### 368. What is connection string rotation?
**Answer:** Change DB credentials periodically. Use for security. Zero-downtime: dual credential during rotation. Secret manager.

### 369. How do you design a inventory system?
**Answer:** Stock per SKU; reserve on order; deduct on fulfill; alert on low. Use for e-commerce. Optimistic lock or transaction. Prevent oversell.

### 370. What is database connection from serverless?
**Answer:** No persistent connection; connect per request or use proxy (RDS Proxy). Use connection pool proxy. Cold start and limit. Consider serverless DB.

### 371. What is RDS Proxy?
**Answer:** Connection pool in front of RDS; multiplex; reduce connections. Use for serverless and many instances. Auth and failover. AWS offering.

### 372. How do you design a loyalty/rewards system?
**Answer:** Points on action; redeem for reward; tiers and expiry. Use for retention. Idempotent credit. Fraud and abuse. Scale with cache.

### 373. What is database failover?
**Answer:** Switch to replica when primary fails. Use for HA. Automatic or manual. RTO and RPO. Replication lag and data loss window.

### 374. What is RTO and RPO?
**Answer:** RTO: recovery time objective (max downtime). RPO: recovery point objective (max data loss). Use for DR planning. Backup and replica design.

### 375. How do you design a support ticket system?
**Answer:** Create ticket; route; assign; state; comments; SLA. Use for customer support. Queue and prioritization. Scale with sharding by org.

### 376. What is multi-tenant database?
**Answer:** One DB; tenant_id in tables; row-level security or schema per tenant. Use for SaaS. Isolation and cost. Shard when large tenant.

### 377. What is tenant isolation?
**Answer:** One tenant cannot see other's data. Use for SaaS. Implement with tenant_id filter or separate DB/schema. Security critical.

### 378. How do you design a audit log system?
**Answer:** Append-only log of who did what when; immutable. Use for compliance. Store in DB or event store. Query and retain. Tamper-proof.

### 379. What is database encryption at rest?
**Answer:** Encrypt storage. Use for security. Transparent in most clouds. Key management. Protects against disk theft.

### 380. What is database encryption in transit?
**Answer:** TLS for connection. Use for security. Required in production. Client and server. No plaintext.

### 381. How do you design a webhook system?
**Answer:** Register URL; on event POST to URL; retry with backoff; verify signature. Use for integration. Idempotent and timeout. Scale with queue.

### 382. What is database read replica lag monitoring?
**Answer:** Track replica delay vs primary. Use for routing (don't read if lag high). Alert on lag. Cause: load, network, replication.

### 383. What is connection pool monitoring?
**Answer:** Track active, idle, wait. Use for sizing and leak detection. Alert on exhaustion. Metrics and dashboard.

### 384. How do you design a API key management system?
**Answer:** Generate key; store hash; validate on request; rate limit and scope. Use for API access. Rotate and revoke. Audit usage.

### 385. What is database connection from container?
**Answer:** Same as server; use env for connection string. Use pool per pod. Consider proxy for many pods. Limit total connections.

### 386. What is connection pool in Kubernetes?
**Answer:** Each pod has pool; total = pods × pool size. Use RDS Proxy or PgBouncer to reduce total. HPA and connection limit.

### 387. How do you design a feature flag system?
**Answer:** Store flags; evaluate by user/context; serve to clients; audit. Use for rollout. Cache and low latency. Remove when stable.

### 388. What is database read scaling?
**Answer:** Add read replicas; route reads to replicas. Use for read-heavy. Application or proxy routing. Eventually consistent reads.

### 389. What is write scaling?
**Answer:** Shard writes; single writer per shard or distributed consensus. Use for write-heavy. Harder than read scaling. Partition by key.

### 390. How do you design a cron/job system?
**Answer:** Schedule definition; workers poll or triggered; execute job; retry and DLQ. Use for batch. Idempotent. Scale workers. Avoid overlap.

### 391. What is database connection from server?
**Answer:** App server opens pool to DB; config from env. Use pool; size correctly. Monitor. Same as standard deployment.

### 392. What is connection pool size formula?
**Answer:** Rough: num_threads or 2-4 × cores. Don't exceed DB max / num_instances. Benchmark. Consider async (fewer connections).

### 393. How do you design a search autocomplete?
**Answer:** Trie or prefix index; typeahead from index; rank by popularity. Use for UX. Update index on change. Scale with caching.

### 394. What is database connection timeout vs query timeout?
**Answer:** Connection: time to establish. Query: time for query to run. Both important. Set both. Retry connection; cancel query.

### 395. What is connection pool validation?
**Answer:** Test connection before use (or on borrow). Use for detecting dead connections. Validation query (e.g. SELECT 1). Overhead vs reliability.

### 396. How do you design a versioned API?
**Answer:** URL or header version; maintain old version during deprecation; document and sunset. Use for breaking changes. Backward compat when possible.

### 397. What is database connection from lambda?
**Answer:** New connection per invocation or reuse (warm). Use RDS Proxy to pool. Limit concurrent executions × connections. Consider serverless DB.

### 398. What is serverless database?
**Answer:** Auto-scale, no connection management (HTTP or few connections). Aurora Serverless, PlanetScale. Use for serverless app. Cost model.

### 399. How do you design a rate limit per user?
**Answer:** Counter per user (Redis); window (fixed or sliding); reject when over. Use for fairness. Distribute with Redis. Return 429 and Retry-After.

### 400. What is database connection from queue worker?
**Answer:** Worker holds pool; process message; use connection. Use pool per worker. Limit workers to DB limit. Reuse across messages.

### 401. How do you design a comment system?
**Answer:** Store comment (user, content, parent for thread); paginate; moderate. Use for UGC. Nested or flat. Scale with sharding and cache.

### 402. What is database index type?
**Answer:** B-tree (default), hash (equality), GIN/GiST (full-text, array). Use right type for query. Composite for multiple columns. Covering index.

### 403. What is composite index?
**Answer:** Index on multiple columns; order matters. Use for query that filters/sorts by those columns. Left-prefix rule. (a, b) helps a and (a,b).

### 404. How do you design a like/upvote system at scale?
**Answer:** Write to queue; async aggregate count; cache count; read from cache. Use for high write. Idempotent. Denormalize. Consider eventual consistency.

### 405. What is database index cost?
**Answer:** Space and write cost (maintain index). Use for read-heavy; avoid too many indexes. Monitor slow queries. Explain plan.

### 406. What is covering index?
**Answer:** Index includes all columns needed by query; no table lookup. Use for performance. Trade-off: index size. Include columns in index.

### 407. How do you design a real-time leaderboard?
**Answer:** Sorted set (Redis) or materialized view; update on score change; range query. Use for games. Shard by game/period. TTL for temporary.

### 408. What is database full-text index?
**Answer:** Index for text search (words, stemming). Use for search. Ranking and relevance. Elasticsearch or DB built-in. Update on write.

### 409. What is database explain plan?
**Answer:** Query execution plan; indexes used, cost. Use for optimization. Avoid full scan. Tune with index. Understand before optimize.

### 410. How do you design a notification system (push)?
**Answer:** Store device token; on event send via FCM/APNs; queue and retry. Use for mobile. Batch and priority. Handle token refresh.

### 411. What is database slow query log?
**Answer:** Log queries over threshold. Use for finding slow queries. Analyze and add index. Monitor in production. Sampling if high volume.

### 412. What is query optimization?
**Answer:** Add index, rewrite query, avoid N+1, use batch. Use explain; measure. Trade-off: read vs write. Denormalize if needed.

### 413. How do you design a email sending system?
**Answer:** Queue for emails; workers send via SMTP or API (SendGrid); retry and bounce handling. Use for async. Template and tracking. Rate limit by provider.

### 414. What is database N+1 query?
**Answer:** One query + N queries in loop. Fix: eager load, batch, or join. Use for ORM. Detect with logging. Common performance bug.

### 415. What is connection pool leak?
**Answer:** Connection not returned to pool. Use borrow/return; finally close. Monitor active connections. Same as connection leak.

### 416. How do you design a SMS sending system?
**Answer:** Queue; worker calls provider (Twilio); retry and status callback. Use for async. Rate limit and cost. Idempotent and track delivery.

### 417. What is database connection from API server?
**Answer:** Pool per server instance; size to concurrency. Use for REST/GraphQL. Stateless server; pool is only state. Monitor and limit.

### 418. What is connection pool in serverless?
**Answer:** Use proxy (RDS Proxy) or external pool; serverless doesn't hold connection. Cold start and connection limit. Consider HTTP DB API.

### 419. How do you design a OAuth provider?
**Answer:** Issue token; validate; scope and client. Use for delegation. Authorization code flow; refresh token. Secure storage. Revocation.

### 420. What is database shard key choice?
**Answer:** Choose for even distribution and query pattern. Avoid hot shard. User_id, tenant_id, or hash. Consider range vs hash. Cross-shard expensive.

### 421. What is cross-shard query?
**Answer:** Query spanning shards; expensive. Avoid or use scatter-gather. Denormalize or aggregate. Trade-off: consistency vs performance.

### 422. How do you design a file upload system?
**Answer:** Multipart upload; store in object storage; optional processing queue; metadata in DB. Use for large file. Resume and progress. Virus scan.

### 423. What is database rebalancing?
**Answer:** Move data when adding/removing shards. Use for scaling. Minimize disruption; consistent hash reduces move. Background process.

### 424. What is hot shard?
**Answer:** Shard with disproportionate load. Fix: split shard, change key, or cache. Monitor per-shard metrics. Design key for even distribution.

### 425. How do you design a image/video processing pipeline?
**Answer:** Upload to queue; workers transcode/resize; store result; notify. Use for async. Scale workers. Retry and DLQ. Multiple formats.

### 426. What is database consistency level?
**Answer:** Strong, eventual, or in-between (e.g. read-your-writes). Use for trade-off. Document guarantee. Choose per use case.

### 427. What is causal consistency?
**Answer:** Preserve cause-effect order across replicas. Use for social and feed. Weaker than strong; stronger than eventual. Track version or vector.

### 428. How do you design a blog/CMS?
**Answer:** Content in DB; version and draft; publish; cache for read; search index. Use for authoring. Roles and workflow. Scale with cache and CDN.

### 429. What is database replication lag?
**Answer:** Replica behind primary. Use for read scaling; accept lag. Monitor lag. Read from primary when need fresh. Cause: write load, network.

### 430. What is read-after-write consistency?
**Answer:** After write, read sees it. Use primary for read after write or session consistency. Important for forms and profile. Replica may lag.

### 431. How do you design a calendar/event system?
**Answer:** Store events; query by time range and user; handle recurrence; conflict check. Use for scheduling. Timezone and recurrence rules. Scale with indexing.

### 432. What is database primary key?
**Answer:** Unique identifier for row; index by default. Use for identity. Auto-increment or UUID. Choose for distribution (UUID) or simplicity (serial).

### 433. What is UUID for primary key?
**Answer:** Globally unique; no central generator; good for distributed. Use for sharding and merge. Larger than int; random insert (B-tree). UUIDv7 for time-order.

### 434. How do you design a booking system?
**Answer:** Availability; reserve with lock; confirm or release; idempotent. Use for appointments. Overbooking policy. Notify and remind.

### 435. What is database secondary index?
**Answer:** Index on non-primary key. Use for query by other columns. One per query pattern. Trade-off: write cost. Covering for read-only.

### 436. What is database unique constraint?
**Answer:** No duplicate values in column(s). Use for integrity. Creates index. Fail on duplicate. Use for email, username.

### 437. How do you design a polling system?
**Answer:** Store poll and options; vote (idempotent); aggregate count; prevent double vote. Use for surveys. Anonymous or auth. Real-time update optional.

### 438. What is database check constraint?
**Answer:** Condition on column (e.g. age > 0). Use for integrity. Validate at write. Simple rules. Application can duplicate.

### 439. What is database default value?
**Answer:** Value when not specified on insert. Use for convenience and consistency. Now(), uuid_generate(). Can override.

### 440. How do you design a forum/community?
**Answer:** Topics, posts, threads; nested or flat; moderate; rank and search. Use for discussion. Scale with sharding and cache. Notifications.

### 441. What is database sequence?
**Answer:** Auto-increment generator. Use for ID. Next value. Gap possible (rollback, crash). Use for single writer. Distributed: UUID or Snowflake.

### 442. What is Snowflake ID?
**Answer:** Distributed unique ID: timestamp, machine, sequence. Use for distributed. Time-ordered. No central. Twitter Snowflake.

### 443. How do you design a wiki?
**Answer:** Pages and versions; diff and history; search; links. Use for knowledge. Conflict on edit. Scale with full-text and cache.

### 444. What is database transaction isolation?
**Answer:** Read uncommitted, committed, repeatable read, serializable. Use for consistency vs concurrency. Default often read committed. Serializable for strict.

### 445. What is dirty read?
**Answer:** Read uncommitted data; may rollback. Avoid with read committed. Use for low isolation when acceptable. Rarely desired.

### 446. How do you design a Q&A site (Stack Overflow style)?
**Answer:** Questions, answers, votes; rank by score and time; reputation; close and moderate. Use for community. Scale with caching and search.

### 447. What is database phantom read?
**Answer:** New rows appear in range in same transaction. Avoid with serializable or next-key lock. Use for consistency. Repeatable read may not prevent.

### 448. What is database deadlock detection?
**Answer:** Detect cycle in lock wait; abort one transaction. Use for recovery. Timeout as backup. Prevent with lock order. Enable in DB.

### 449. How do you design a job board?
**Answer:** Jobs and applications; search and filter; match; notify. Use for recruitment. Scale with search index. Resume parse and ranking.

### 450. What is database lock timeout?
**Answer:** Abort if lock not acquired in time. Use for preventing indefinite wait. Set per transaction. Retry with backoff. Avoid deadlock.

### 451. How do you design a e-commerce product catalog?
**Answer:** Products, variants, categories; search and filter; facets; inventory link. Use for storefront. Scale with search engine. Cache hot products.

### 452. What is database row-level lock?
**Answer:** Lock specific row(s). Use for concurrent update. SELECT FOR UPDATE. Release on commit. Prefer over table lock.

### 453. What is database table lock?
**Answer:** Lock entire table. Use for bulk operation. Avoid in OLTP. Prefer row lock. Maintenance and migration.

### 454. How do you design a shopping cart?
**Answer:** Store cart (user, items); merge on login; expire; checkout to order. Use for e-commerce. Idempotent add. Scale with cache. Guest cart.

### 455. What is database optimistic lock?
**Answer:** Version column; update only if version matches. Use for concurrent edit. Retry on conflict. No lock; compare-and-swap.

### 456. What is database pessimistic lock?
**Answer:** Lock row on read (SELECT FOR UPDATE). Use for critical section. Hold until commit. Risk of deadlock. Use when necessary.

### 457. How do you design a checkout flow?
**Answer:** Validate cart; reserve inventory; create order; payment (idempotent); fulfill. Use for e-commerce. Saga for distributed. Rollback on failure.

### 458. What is database WAL (Write-Ahead Log)?
**Answer:** Log changes before applying to data. Use for durability and recovery. Replay on restart. Enables replication. Critical for ACID.

### 459. What is database checkpoint?
**Answer:** Flush dirty pages to disk; advance WAL. Use for recovery. Reduce replay time. Periodic or on WAL size.

### 460. How do you design a subscription management?
**Answer:** Plan, billing cycle, upgrade/downgrade, cancel; prorate; invoice. Use for SaaS. Idempotent. Webhook for payment. Grace period.

### 461. What is database LSM tree?
**Answer:** Log-Structured Merge tree; append writes; compact in background. Use for write-heavy (e.g. Cassandra, RocksDB). Trade-off: read amplification.

### 462. What is database B-tree?
**Answer:** Balanced tree; sorted; log(n) read/write. Use for index. Standard for relational. Good for range query.

### 463. How do you design a usage metering system?
**Answer:** Emit usage events; aggregate (count, sum); store and report; bill or limit. Use for SaaS. Idempotent events. Real-time and batch.

### 464. What is database compaction?
**Answer:** Merge and rewrite data (LSM). Use for space and read. Background process. Leveled or size-tiered. Trade-off: write amplification.

### 465. What is database bloom filter?
**Answer:** Probabilistic structure; no false negative; possible false positive. Use for "might exist" before expensive read. Saves I/O. Can't delete (standard).

### 466. How do you design a API gateway (detailed)?
**Answer:** Route, auth, rate limit, transform, cache; backend discovery; circuit breaker. Use for single entry. Plugins and policies. Scale horizontally.

### 467. What is database SST (Sorted String Table)?
**Answer:** Immutable sorted file (LSM). Use for storage layer. Merge on compact. Read by binary search or index.

### 468. What is database memtable?
**Answer:** In-memory buffer before flush to SST. Use for LSM. Sorted or skip list. Flush when full. Recover from WAL.

### 469. How do you design a multi-region deployment?
**Answer:** Deploy in regions; global LB; data replicate or partition; failover. Use for latency and DR. Consistency vs availability. Cross-region latency.

### 470. What is database write path?
**Answer:** How write flows (WAL, memtable, flush, compact). Use for understanding. Varies by engine. Critical for tuning.

### 471. What is database read path?
**Answer:** How read flows (cache, index, data). Use for understanding. Hit cache or disk. Optimize with index and cache.

### 472. How do you design a disaster recovery plan?
**Answer:** RPO/RTO; backup and replica; runbook; test restore. Use for resilience. Multi-region optional. Document and practice.

### 473. What is database backup strategy?
**Answer:** Full, incremental, point-in-time. Use for recovery. Offsite and encrypted. Test restore. Automate. Retention policy.

### 474. What is database restore?
**Answer:** Recover from backup; replay WAL to point. Use for disaster. Test regularly. RTO depends on size and method.

### 475. How do you design a secret management system?
**Answer:** Store secrets (encrypted); rotate; inject to app (env or API). Use Vault, AWS Secrets Manager. Audit access. Never log.

### 476. What is database replication topology?
**Answer:** Primary-replica, chain, star. Use for scaling and HA. Choose for latency and load. Failover and promotion.

### 477. What is database failover automatic?
**Answer:** Detect failure; promote replica; update DNS or config. Use for HA. RTO minutes. Test. Split-brain risk; use quorum.

### 478. How do you design a config management system?
**Answer:** Versioned config; env and app; refresh; audit. Use for deployment. Feature flags and secrets. Rollback. GitOps optional.

### 479. What is database split brain?
**Answer:** Two primaries after partition. Use quorum and fencing to prevent. Dangerous: both accept writes. Avoid with proper failover.

### 480. What is database quorum?
**Answer:** Majority of nodes must agree. Use for leader election and write. Prevents split brain. 2f+1 for f failures.

### 481. How do you design a feature store (ML)?
**Answer:** Store and serve features for model; version; offline and online. Use for ML pipeline. Low latency serve. Consistency for training and serve.

### 482. What is database consensus?
**Answer:** Agreement among nodes (Raft, Paxos). Use for replication and leader. Strong consistency. Log replication. etcd, ZooKeeper.

### 483. What is Raft?
**Answer:** Consensus algorithm; leader, log replication, election. Use for distributed consistency. Understandable. Used in etcd, Consul.

### 484. How do you design a model serving system?
**Answer:** Load model; serve via API; version and A/B; monitor. Use for ML. Scale with replica. Batch and real-time. GPU optional.

### 485. What is database Paxos?
**Answer:** Consensus algorithm; proposer, acceptor, learner. Use for distributed agreement. Complex. Foundation for many. Multi-Paxos for log.

### 486. What is database two-phase commit (2PC)?
**Answer:** Coordinator: prepare then commit. Use for distributed transaction. Blocks on failure. Rarely used. Prefer saga.

### 487. How do you design a data lake architecture?
**Answer:** Ingest to raw zone; process to refined; serve or analyze. Use for analytics. Schema on read. Partition and catalog. Governance.

### 488. What is database three-phase commit?
**Answer:** 2PC with pre-commit phase; reduces block. Use for distributed tx. Still blocking. Rare. Theoretical.

### 489. What is database saga pattern?
**Answer:** Sequence of local tx with compensations. Use for distributed workflow. No global lock. Eventually consistent. Choreography or orchestrator.

### 490. How do you design a data mesh?
**Answer:** Domain-owned data products; self-serve platform; federated governance. Use for scale and ownership. Decentralize. Standards and discoverability.

### 491. What is database outbox pattern?
**Answer:** Write event to outbox in same tx as business data; separate process publishes. Use for reliable event. No lost message. Poll or CDC.

### 492. What is database inbox pattern?
**Answer:** Consumer writes to inbox first; process; mark done. Use for idempotent consumer. Dedup by message id. At-least-once safe.

### 493. How do you design a real-time analytics system?
**Answer:** Stream ingest (Kafka); process (Flink, Spark); store (TSDB or OLAP); serve. Use for dashboards. Low latency. Scale with partitions.

### 494. What is database event store?
**Answer:** Append-only log of events. Use for event sourcing. By aggregate or global. Replay and project. Immutable. Version and schema.

### 495. What is database CQRS read model?
**Answer:** Projection from events; optimized for query. Use for CQRS. Eventually consistent. Multiple read models. Update on event.

### 496. How do you design a stream processing system?
**Answer:** Ingest stream; process (window, aggregate); sink. Use for real-time. Exactly-once or at-least-once. Scale with partitions. Checkpoint.

### 497. What is database snapshot isolation?
**Answer:** Transaction sees snapshot of DB; no dirty read. Use for consistency. Write conflict detection. Common isolation level. MVCC.

### 498. What is MVCC?
**Answer:** Multi-Version Concurrency Control; read doesn't block write. Use for snapshot isolation. Version per row. Garbage collect old versions.

### 499. How do you design a change data capture pipeline?
**Answer:** Capture DB changes (Debezium, etc.); stream to Kafka; consumers update. Use for sync and event. Ordering and exactly-once. Schema evolution.

### 500. What is database connection from batch job?
**Answer:** Batch opens connection(s); process; close. Use for ETL. Size to parallelism. No long-held connection. Consider connection limit.

### 501. How do you design a recommendation ranking system?
**Answer:** Generate candidates (CF, content); rank with model; diversify and filter; serve. Use for personalization. Latency budget. A/B test. Scale with cache.

### 502. What is database read replica promotion?
**Answer:** Make replica primary on failover. Use for HA. Replication stop; promote; reconfigure. Data loss window (async). Automated or manual.

### 503. What is database connection from worker?
**Answer:** Worker process has pool; use for job. Same as queue worker. Limit total workers × pool. Reuse. Monitor.

### 504. How do you design a personalization system?
**Answer:** Collect signals; model or rules; serve personalized content/order. Use for engagement. Real-time and batch. Privacy. Scale with cache.

### 505. What is database connection limit per user?
**Answer:** Some DBs limit connections per user. Use for multi-tenant. Pool and share. Monitor. Size user pools.

### 506. What is database connection from proxy?
**Answer:** Proxy (PgBouncer) holds pool; app connects to proxy. Use for many app instances. Multiplex. Transaction or session mode.

### 507. How do you design a content delivery system?
**Answer:** Origin; CDN for cache; invalidate on update; edge logic. Use for static and dynamic. Scale with CDN. TTL and purge.

### 508. What is database PgBouncer?
**Answer:** Connection pooler for PostgreSQL. Use for connection multiplexing. Transaction pooling: many clients, few connections. Reduces connections to DB.

### 509. What is database connection multiplexing?
**Answer:** Many client connections over few DB connections. Use proxy. Transaction pooling. Reduces DB connection count. App sees normal connection.

### 510. How do you design a logging pipeline?
**Answer:** App logs; collect (agent or sidecar); ship to central (Kafka or HTTP); store and index; search and alert. Use for observability. Structured and correlation id.

### 511. What is database read scaling with replica?
**Answer:** Add replicas; route reads to replica. Use for read-heavy. Application or proxy. Eventually consistent. Monitor lag.

### 512. What is database write scaling with sharding?
**Answer:** Partition writes across shards. Use for write-heavy. Choose key. No cross-shard transaction. Rebalance when add shard.

### 513. How do you design a alerting system?
**Answer:** Rules on metrics/logs; evaluate; notify (PagerDuty, Slack); escalate. Use for on-call. Dedup and silence. Runbook and feedback.

### 514. What is database connection from serverless function?
**Answer:** Each invocation may connect; use proxy or limit concurrency. Cold start and connection. Prefer RDS Proxy. Pool not possible in function.

### 515. What is serverless connection limit?
**Answer:** Many concurrent functions × 1 connection = many connections. Use proxy to pool. Limit concurrency. Or use serverless DB (HTTP).

### 516. How do you design a SLA monitoring system?
**Answer:** Define SLA (availability, latency); measure; report and alert. Use for SLO. Error budget. Dashboard and escalation.

### 517. What is database connection in serverless best practice?
**Answer:** Use RDS Proxy or external pool; keep connection short; or use HTTP API DB. Minimize connections. Consider Aurora Serverless.

### 518. What is database serverless (Aurora Serverless)?
**Answer:** Auto-scale compute; pay per use; no connection management like traditional. Use for variable load. Cold start. Connection via proxy.

### 519. How do you design a cost allocation system?
**Answer:** Tag resources; aggregate by tag (team, project); report and chargeback. Use for cloud cost. Showback or chargeback. Budget and alert.

### 520. What is database connection from mobile app?
**Answer:** App doesn't connect to DB directly (security). App -> API -> DB. API has pool. Use for all client apps. Never expose DB.

### 521. What is API backend connection pool?
**Answer:** API server has pool to DB. Same as standard. Size to request concurrency. Stateless API; pool is per instance. Monitor.

### 522. How do you design a experiment platform?
**Answer:** Define experiment; assign users; track events; analyze. Use for product. Statistical rigor. Feature flags. Scale with events.

### 523. What is database connection from microservice?
**Answer:** Each service has own DB and pool. Use for isolation. Size per service. Many services = many pools. Consider shared DB for small team (anti-pattern for strict microservices).

### 524. What is database per service?
**Answer:** Each microservice owns its DB; no shared DB. Use for autonomy and isolation. Saga for cross-service tx. Data duplication acceptable.

### 525. How do you design a data governance system?
**Answer:** Catalog; lineage; quality; policy; access. Use for compliance. Discover and classify. Audit. Tooling: Collibra, Atlas.

### 526. What is database shared vs dedicated?
**Answer:** Shared: multi-tenant DB. Dedicated: DB per tenant. Use shared for cost; dedicated for isolation. Trade-off: cost vs isolation and customization.

### 527. What is database schema migration tool?
**Answer:** Versioned migrations (Flyway, Liquibase, Alembic). Use for safe change. Up and down. Test. Automate in CI/CD.

### 528. How do you design a data quality system?
**Answer:** Rules and checks; monitor; alert; score. Use for trust. Validation and freshness. Pipeline integration. Fix at source.

### 529. What is database migration backward compatible?
**Answer:** Add column (nullable); deploy app; backfill; add constraint. Use for zero-downtime. Multiple deploys. Avoid breaking change in one deploy.

### 530. What is database migration rollback?
**Answer:** Down migration to revert. Use when deploy fails. Plan rollback. Not always possible (data change). Test rollback.

### 531. How do you design a data lineage system?
**Answer:** Track data flow (source -> transform -> sink). Use for impact and trust. Metadata and graph. Instrument pipeline. Tools: OpenLineage.

### 532. What is database blue-green migration?
**Answer:** Two DB (or schema); switch app from one to other. Use for major upgrade. Sync data. Switch and rollback option. Complex.

### 533. What is database expand contract?
**Answer:** Expand: add new schema (column, table); both old and new supported. Contract: remove old. Use for zero-downtime change. Multiple phases.

### 534. How do you design a metadata management system?
**Answer:** Catalog (schema, lineage, tags); search; governance. Use for discovery. Integrate with pipeline. API and UI. Collibra, DataHub.

### 535. What is database zero-downtime migration?
**Answer:** Migrate without outage. Use expand-contract, dual-write, or logical replica. Plan and test. Rollback plan. Often multi-step.

### 536. What is database dual write?
**Answer:** Write to old and new system during migration. Use for migration. Switch read; then stop old write. Consistency and order.

### 537. How do you design a data catalog?
**Answer:** Ingest metadata; index; search and browse; lineage and quality. Use for discovery. Tag and classify. Access and governance.

### 538. What is database logical replication?
**Answer:** Replicate logical changes (row, statement). Use for CDC and replica. Filter and transform. Cross-version. PostgreSQL, etc.

### 539. What is database physical replication?
**Answer:** Replicate block-level changes. Use for standby. Exact copy. Same version. Fast. No filter.

### 540. How do you design a data discovery system?
**Answer:** Catalog and search; rank by relevance; preview and profile. Use for self-serve. Integrate sources. Access request. Usage tracking.

### 541. What is database replica lag acceptable?
**Answer:** Depends on use case. Sub-second for most; minutes for analytics OK. Use for routing decision. Monitor and alert. Document SLA.

### 542. What is database replication conflict?
**Answer:** Concurrent writes to same row on different nodes. Use conflict resolution (last-write-wins, merge). Avoid with single writer or partition.

### 543. How do you design a data access policy system?
**Answer:** Define policy (who, what, condition); enforce at query or API; audit. Use for governance. Attribute-based. Integrate with catalog.

### 544. What is database conflict resolution?
**Answer:** How to merge concurrent updates. LWW, merge, or custom. Use for multi-master. Vector clock or version. Application or DB.

### 545. What is database multi-master?
**Answer:** Multiple nodes accept writes; replicate between. Use for geo and availability. Conflict resolution. Complex. Consider single-master with replica.

### 546. How do you design a PII handling system?
**Answer:** Identify PII; mask or encrypt; access control; audit. Use for compliance. Tokenize or encrypt at rest. Minimize exposure. Retention.

### 547. What is database single-master?
**Answer:** One primary; replicas read-only. Use for simplicity and strong consistency. Primary is bottleneck. Failover to replica.

### 548. What is database leader election?
**Answer:** Choose one node as leader (e.g. primary). Use consensus (Raft). For failover. Lease and heartbeat. ZooKeeper, etcd.

### 549. How do you design a consent management system?
**Answer:** Store consent (user, purpose, granted); check before use; withdraw; audit. Use for GDPR. Version and proof. Integrate with data use.

### 550. What is database lease?
**Answer:** Time-limited lock; renew or release. Use for leader election and distributed lock. Expire for failover. Avoid long lease.

### 551. What is database distributed lock?
**Answer:** Lock across nodes (Redis, ZooKeeper). Use for critical section. Lease and heartbeat. Avoid if possible; prefer partition.

### 552. How do you design a data retention system?
**Answer:** Policy (how long per type); schedule delete or archive; comply. Use for compliance. Tier to cheap storage. Audit and legal hold.

### 553. What is database heartbeat?
**Answer:** Periodic message to show liveness. Use for leader and lock. Timeout = dead. Tune interval and timeout. Network partition consideration.

### 554. What is database fencing?
**Answer:** Prevent stale leader from acting (token or epoch). Use for split brain. Storage fencing: reject old token. Critical for HA.

### 555. How do you design a data deletion system (GDPR)?
**Answer:** Request; find all data; delete or anonymize; confirm. Use for right to erasure. Cascade and audit. Retention exception.

### 556. What is database epoch?
**Answer:** Monotonically increasing generation. Use for leader and fencing. Reject old epoch. Prevents stale leader. Part of consensus.

### 557. What is database vector clock?
**Answer:** Version vector per node; compare for ordering. Use for conflict detection. Partial order. Not total order. Eventual consistency.

### 558. How do you design a data portability system?
**Answer:** Export user data (format standard); deliver. Use for GDPR. Full export. Format: JSON, CSV. Secure transfer. Schedule and async.

### 559. What is database CRDT?
**Answer:** Conflict-free Replicated Data Type; merge without coordination. Use for collaborative and eventual consistency. Grow-only or last-write-wins. Complex types.

### 560. What is database operational transform?
**Answer:** Transform concurrent edits for consistency. Use for collaborative editing. Merge operations. Complex. Alternative: CRDT.

### 561. How do you design a data export system?
**Answer:** Request export; query and generate (async); store in object storage; notify and download. Use for user and compliance. Large export: chunk and stream. Expire link.

### 562. What is database eventual consistency guarantee?
**Answer:** Replicas converge if no new writes. Use for availability. No bound on time. Read repair or anti-entropy. Document for users.

### 563. What is database strong consistency guarantee?
**Answer:** Read sees latest write. Use for critical data. Single leader or consensus. Trade-off: latency and availability. Linearizability.

### 564. How do you design a data import system?
**Answer:** Upload or stream; validate; transform; load (batch or stream); report errors. Use for onboarding. Idempotent and resume. Validation and schema.

### 565. What is database linearizability?
**Answer:** Strong consistency; total order of operations. Use for register and lock. Single leader. Not composable (CAP). Critical for coordination.

### 566. What is database sequential consistency?
**Answer:** All see same order of operations; order respects program order per process. Use for shared memory. Weaker than linearizability. Multi-core model.

### 567. How do you design a backup verification system?
**Answer:** Periodically restore backup; verify integrity and consistency; report. Use for confidence. Automated. Test recovery procedure. RTO/RPO validation.

### 568. What is database causal consistency?
**Answer:** Preserve cause-effect; if A caused B, all see A before B. Use for social. Weaker than strong. Track dependency. Vector clock.

### 569. What is database session consistency?
**Answer:** Single session sees monotonic reads and read-your-writes. Use for user session. Sticky or version. Good UX. Implement with session store.

### 570. How do you design a failover testing system?
**Answer:** Periodically trigger failover (chaos); verify recovery; measure RTO. Use for resilience. Automated or game day. Document and improve.

### 571. What is database monotonic read?
**Answer:** User never sees older data after seeing newer. Use for session. Sticky replica or version. Prevent time-travel read. Per user.

### 572. What is database monotonic write?
**Answer:** Writes from same process seen in order. Use for consistency. Single writer or sequence. Prevent reorder. Often implicit.

### 573. How do you design a chaos engineering system?
**Answer:** Inject failure (kill, latency, partition); observe; learn. Use for resilience. Start small. Automated or manual. Game day. Measure impact.

### 574. What is database read-your-writes?
**Answer:** After write, read sees it. Use for UX. Read from primary after write or session sticky. Critical for form and profile. Replica lag breaks without care.

### 575. What is database prefix consistency?
**Answer:** All see prefix of global order. Use for feed. Weaker than strong. Good for timeline. Implement with version or sequence.

### 576. How do you design a load testing system?
**Answer:** Generate load (users, RPS); measure latency and error; report. Use for capacity. Realistic scenario. Ramp and sustain. Identify bottleneck.

### 577. What is database tunable consistency?
**Answer:** Client chooses consistency per request (e.g. strong vs eventual). Use for trade-off. Dynamo-style. Per-operation. Document levels.

### 578. What is database quorum read?
**Answer:** Read from R replicas; R > N - Q for quorum. Use for consistency. Prevent stale. Trade-off: latency and availability. W + R > N for strong.

### 579. How do you design a performance testing system?
**Answer:** Define scenario and SLO; run test; measure; compare. Use for regression. Baseline and trend. Load and stress. Identify degradation.

### 580. What is database quorum write?
**Answer:** Write to W replicas; W > N/2 for quorum. Use for durability. Ack when W written. Trade-off: latency. W + R > N for strong read.

### 581. What is database sloppy quorum?
**Answer:** Write to first W available (may include hint handoff). Use for availability. Eventually consistent. Read repair. Dynamo-style.

### 582. How do you design a capacity planning system?
**Answer:** Forecast growth; model resource need; plan scale. Use for budget and readiness. Trend and seasonality. Buffer. Review regularly.

### 583. What is database hinted handoff?
**Answer:** When replica down, write to other node with hint; later transfer. Use for availability. Eventually consistent. Recover when node up.

### 584. What is database read repair?
**Answer:** On read, if replicas disagree, update stale. Use for eventual consistency. Background or on read. Reduces inconsistency window.

### 585. How do you design a resource forecasting system?
**Answer:** Historical usage; trend and seasonality; forecast; alert on threshold. Use for capacity. ML or simple. Plan purchase. Cloud: reserved vs on-demand.

### 586. What is database anti-entropy?
**Answer:** Background process to sync replicas (e.g. Merkle tree). Use for eventual consistency. Repair drift. Slower than read repair. Full sync.

### 587. What is database Merkle tree?
**Answer:** Tree of hashes; compare to find diff. Use for anti-entropy. Efficient sync. Level by level. Cassandra, etc.

### 588. How do you design a cost optimization system?
**Answer:** Monitor usage; right-size; reserved vs spot; cleanup. Use for cloud cost. Recommendations. Automate. Tag and allocate. Review regularly.

### 589. What is database gossip protocol?
**Answer:** Nodes exchange state with peers; eventually all know. Use for membership and metadata. Epidemic. Cassandra, etc. No central.

### 590. What is database membership?
**Answer:** Which nodes are in cluster. Use for routing and replication. Gossip or consensus. Handle join and leave. Failure detection.

### 591. How do you design a sustainability (carbon) tracking system?
**Answer:** Measure resource (compute, storage); map to carbon; report and optimize. Use for ESG. Cloud providers have data. Reduce and offset.

### 592. What is database failure detection?
**Answer:** Heartbeat; timeout = suspect; consensus or quorum to declare dead. Use for failover. Avoid false positive. Tune timeout. Network partition.

### 593. What is database split brain prevention?
**Answer:** Quorum, fencing, single leader. Use for correctness. Never two primaries. Witness or arbiter. Critical for HA.

### 594. How do you design a incident management system?
**Answer:** Detect; page; runbook; communicate; postmortem. Use for reliability. Integrate alert and chat. Timeline and action. Blameless review.

### 595. What is database witness node?
**Answer:** Node that doesn't store data but votes in quorum. Use for split-brain prevention. Odd number with witness. Tie-breaker. Lightweight.

### 596. What is database arbiter?
**Answer:** Same as witness. Vote only. Use for MongoDB replica set. Reduces cost. Odd total nodes for quorum.

### 597. How do you design a postmortem system?
**Answer:** Template; timeline; root cause; action items; share. Use for learning. Blameless. Follow-up. Integrate with incident.

### 598. What is database replication factor?
**Answer:** How many copies of data. Use for durability and availability. RF=3 common. Trade-off: storage and consistency. Quorum = RF/2 + 1.

### 599. What is database consistency level (Cassandra)?
**Answer:** ONE, QUORUM, ALL per read/write. Use for trade-off. QUORUM for strong. Tunable. Document per use case.

### 600. How do you design a runbook system?
**Answer:** Document procedure for incident; link from alert; version and test. Use for on-call. Step-by-step. Update after incident. Automate when possible.

### 601. What is database replication topology choice?
**Answer:** Primary-replica for simple; chain for many; star for low latency. Use for scale and failover. Consider network and geography.

### 602. What is database synchronous replication?
**Answer:** Primary waits for replica ack before commit. Use for strong consistency. Higher latency. No data loss on primary fail. Limited by slowest replica.

### 603. How do you design a SRE dashboard?
**Answer:** SLO, error budget, latency, availability; trend and alert. Use for reliability. Key metrics. Link to runbook. Real-time and historical.

### 604. What is database asynchronous replication?
**Answer:** Primary doesn't wait for replica. Use for performance. Replica lag. Risk of data loss on failover. Eventual consistency.

### 605. What is database semi-synchronous replication?
**Answer:** Primary waits for at least one replica. Use for balance. Less lag than async; faster than full sync. MySQL option.

### 606. How do you design a error budget policy?
**Answer:** Define SLO and budget; consume on error; when exhausted: freeze release or focus on reliability. Use for balance. Policy and review.

### 607. What is database replication lag monitoring?
**Answer:** Track replica delay; alert on threshold. Use for routing and SLA. Cause: write volume, network. Mitigate: scale replica, tune.

### 608. What is database replication lag cause?
**Answer:** Write volume, network latency, single-threaded apply (MySQL), disk. Use for troubleshooting. Parallel apply and tuning. Monitor.

### 609. How do you design a SLO system?
**Answer:** Define SLO (availability, latency); measure; error budget; alert on burn rate. Use for reliability. Document and review. Tie to user impact.

### 610. What is database parallel replication?
**Answer:** Apply replica changes in parallel (by schema or group). Use for reducing lag. MySQL parallel replica. Ordering constraint. Faster apply.

### 611. What is database binlog?
**Answer:** Log of writes (MySQL). Use for replication and recovery. Row or statement. Consume for CDC. Retention and size.

### 612. How do you design a latency SLO?
**Answer:** Define percentile (p99, p95); measure; alert on breach. Use for performance. Target and window. Per service and endpoint. User-facing.

### 613. What is database WAL shipping?
**Answer:** Ship WAL segments to replica; replay. Use for physical replication. Low overhead. Same version. Restore and standby.

### 614. What is database logical decoding?
**Answer:** Decode WAL to logical changes (row). Use for CDC. PostgreSQL. Stream to Kafka. Schema and ordering.

### 615. How do you design a availability SLO?
**Answer:** Define target (e.g. 99.9%); measure uptime; error budget. Use for reliability. Exclude planned downtime. Per service. Report and alert.

### 616. What is database CDC source?
**Answer:** DB as source of change stream. Use for sync and event. Debezium, Kafka Connect. Schema registry. Exactly-once and order.

### 617. What is database CDC sink?
**Answer:** Destination for change stream (warehouse, search). Use for ETL and sync. Idempotent write. Handle schema change. Batch or stream.

### 618. How do you design a multi-SLO system?
**Answer:** Multiple SLOs per service (latency, availability, quality); track each; aggregate error budget. Use for comprehensive. Priority and trade-off.

### 619. What is database change stream?
**Answer:** Ordered stream of changes (insert, update, delete). Use for CDC. Consume by offset. Retention. Schema evolution.

### 620. What is database schema registry?
**Answer:** Store and version schemas for events. Use for compatibility. Producer and consumer check. Evolve with compatibility rules. Avro, Protobuf.

### 621. How do you design a dependency SLO?
**Answer:** SLO of dependency (DB, API); factor into system SLO. Use for capacity and vendor. Contract and monitor. Fallback and degrade.

### 622. What is database event schema evolution?
**Answer:** Add optional field; deprecate; backward and forward compat. Use for long-lived stream. Schema registry. Never remove required. Avro compat.

### 623. What is database backward compatibility?
**Answer:** New reader reads old writer. Use for evolution. Optional field; don't remove. Test. Critical for stream and API.

### 624. How do you design a user-facing SLO?
**Answer:** SLO that maps to user experience (e.g. page load, success rate). Use for product. Measure from client. Synthetic and real user.

### 625. What is database forward compatibility?
**Answer:** Old reader reads new writer. Use for evolution. Don't add required; ignore unknown. Deploy order: writer first. Stream and API.

### 626. What is database schema compatibility mode?
**Answer:** BACKWARD, FORWARD, FULL. Use for evolution. FULL: both. Registry enforces. Choose per use case. Document.

### 627. How do you design a synthetic monitoring system?
**Answer:** Scripts simulate user; run periodically; measure and alert. Use for availability and latency. Global points. Key flows. Complement RUM.

### 628. What is database Avro?
**Answer:** Serialization with schema; compact; evolution. Use for event. Schema in header or registry. Row format. Kafka common.

### 629. What is database Protobuf?
**Answer:** Binary serialization; schema; evolution. Use for event and RPC. Compact and fast. Optional field for compat. gRPC.

### 630. How do you design a RUM (Real User Monitoring) system?
**Answer:** Instrument client; collect metrics (load, error, action); aggregate and analyze. Use for user experience. Sample and privacy. Latency and funnel.

### 631. What is database message format?
**Answer:** JSON, Avro, Protobuf for event. Use for compatibility and size. Schema for strong typing. Evolution. Choose per ecosystem.

### 632. What is database event ordering?
**Answer:** Order within partition or key. Use for consistency. Kafka partition key. Global order hard; per-key sufficient for many cases.

### 633. How do you design a distributed tracing system?
**Answer:** Instrument with trace id; propagate; collect spans; store and query. Use for debugging. OpenTelemetry, Jaeger. Sample for cost. Trace id in log.

### 634. What is database exactly-once semantics?
**Answer:** Process message exactly once. Use idempotent consumer and transactional outbox or dedup. Kafka transactions. Hard in distributed.

### 635. What is database at-least-once semantics?
**Answer:** Message may be delivered more than once. Use idempotent consumer. Commit after process. Simpler than exactly-once. Common.

### 636. How do you design a span and trace model?
**Answer:** Trace = tree of spans; span = operation with timing and tags. Use for tracing. Parent-child. Service and operation name. Log correlation.

### 637. What is database at-most-once semantics?
**Answer:** Message delivered at most once; may lose. Use when loss OK. No retry. Rare. Fire-and-forget.

### 638. What is database consumer offset commit?
**Answer:** Consumer commits position after process. Use for resume and at-least-once. Commit frequency: every message or batch. Trade-off: duplicate vs reprocess.

### 639. How do you design a trace sampling strategy?
**Answer:** Sample % of traces; head-based or tail-based. Use for cost. Sample error and slow more. Adaptive. Balance insight and cost.

### 640. What is database consumer group rebalance?
**Answer:** When member joins/leaves, reassign partitions. Use for scale. Pause during rebalance. Minimize. Kafka consumer group.

### 641. What is database partition assignment?
**Answer:** Which consumer gets which partition. Use for scale and order. Round-robin or sticky. Rebalance on change. One consumer per partition for order.

### 642. How do you design a log correlation system?
**Answer:** Trace id (and span id) in every log; aggregate by trace. Use for debugging. Inject in framework. Search by trace id. Link log and trace.

### 643. What is database consumer lag?
**Answer:** How far behind consumer is from producer. Use for monitoring. Alert on high lag. Cause: slow consumer or burst. Scale consumer.

### 644. What is database consumer lag monitoring?
**Answer:** Track lag per partition and group; alert on threshold. Use for health. Dashboard. Cause analysis. Scale or optimize consumer.

### 645. How do you design a metric aggregation system?
**Answer:** Collect metrics; aggregate (sum, avg, percentile); store in TSDB; query and alert. Use for observability. Scrape or push. Retention and downsampling.

### 646. What is database backpressure in consumer?
**Answer:** Slow consumer; pause fetch; don't overwhelm. Use for stability. Kafka: fetch less. Reactive: request(n). Prevent OOM.

### 647. What is database consumer prefetch?
**Answer:** Fetch ahead of process. Use for throughput. Tune fetch size. Trade-off: latency vs throughput. Buffer in consumer.

### 648. How do you design a metric retention system?
**Answer:** Store raw for short term; downsample for long term; delete by policy. Use for cost. TSDB retention. Archive to cold storage. Query across tiers.

### 649. What is database batch processing in consumer?
**Answer:** Process messages in batch. Use for efficiency. Commit after batch. Trade-off: latency vs throughput. Idempotent batch.

### 650. What is database stream processing?
**Answer:** Process stream (window, aggregate, join). Use for real-time. Flink, Kafka Streams. State and checkpoint. Exactly-once possible.

### 651. How do you design a alert routing system?
**Answer:** Route alert by label or rule to team/channel; escalate; acknowledge. Use for on-call. PagerDuty, Opsgenie. Dedup and silence. Runbook link.

### 652. What is database stream window?
**Answer:** Tumbling, sliding, or session window for aggregation. Use for stream processing. Time or count. Emit result. Late data handling.

### 653. What is database stream join?
**Answer:** Join two streams (window or lookup). Use for enrichment. Stream-stream or stream-table. State and retention. Latency.

### 654. How do you design a on-call rotation system?
**Answer:** Define rotation (schedule); assign; notify; escalate. Use for coverage. Fair and sustainable. Override and backup. Integration with alert.

### 655. What is database stream state?
**Answer:** State for aggregation and join (in memory or store). Use for stream processing. Checkpoint for recovery. Scale with partition. RocksDB, etc.

### 656. What is database stream checkpoint?
**Answer:** Periodically save state; recover from checkpoint on failure. Use for exactly-once and recovery. Flink, Kafka Streams. Trade-off: overhead vs recovery time.

### 657. How do you design a escalation policy system?
**Answer:** Levels (e.g. L1, L2); timeout per level; notify next. Use for incident. Configurable. Escalate until ack. Integrate with rotation.

### 658. What is database stream exactly-once?
**Answer:** Process each record exactly once. Use idempotent sink and transactional source/sink. Kafka + Flink. Complex. Worth for critical.

### 659. What is database stream at-least-once?
**Answer:** May process more than once; idempotent sink. Use for simplicity. Replay on failure. Common. Good enough for many.

### 660. How do you design a service dependency map?
**Answer:** Discover dependencies (code, runtime); visualize graph; impact analysis. Use for change and incident. Tool: service mesh, APM. Update automatically.

### 661. What is database stream late data?
**Answer:** Data arriving after window closed. Use side output or allow lateness. Policy: drop or process. Watermark for time. Handle in stream processing.

### 662. What is database watermark?
**Answer:** Notion of "no more data before time T". Use for event time window. Heuristic. Late data before watermark processed. Tune for latency vs completeness.

### 663. How do you design a deployment pipeline?
**Answer:** Build -> test -> stage -> prod; automated; approval gate; rollback. Use for release. CI/CD. Canary or blue-green. Measure and verify.

### 664. What is database event time vs processing time?
**Answer:** Event time: when it happened. Processing time: when processed. Use event time for correctness; processing for latency. Watermark for event time.

### 665. What is database stream backpressure?
**Answer:** Slow sink; slow source. Use for stability. Kafka: consumer lag. Reactive: request(n). Prevent overload. Monitor and scale.

### 666. How do you design a rollback system?
**Answer:** Keep previous version; rollback on failure or manual; verify. Use for safety. Automated or one-click. Database migration rollback. Test rollback.

### 667. What is database stream partition?
**Answer:** Split stream for parallelism. Use for scale. Order within partition. Key by partition key. More partition = more consumer. Balance.

### 668. What is database stream rebalance?
**Answer:** Redistribute partition when consumer count changes. Use for scale. Pause processing. Short rebalance. Kafka consumer group.

### 669. How do you design a feature rollout system?
**Answer:** Feature flag; rollout by % or cohort; monitor; full rollout or rollback. Use for safety. Gradual. A/B optional. Remove flag when stable.

### 670. What is database stream compaction?
**Answer:** Keep latest per key; remove old. Use for changelog and table. Kafka log compacted. Reduce storage. Good for state.

### 671. What is database stream retention?
**Answer:** How long to keep events. Use for replay and storage. Time or size. Compacted: by key. Balance cost and need.

### 672. How do you design a canary analysis system?
**Answer:** Compare canary vs baseline (latency, error); auto promote or rollback. Use for deploy. Metric and duration. Statistical. Integrate with pipeline.

### 673. What is database stream replay?
**Answer:** Reset offset and reprocess. Use for fix and backfill. Exactly-once needs idempotent. Retention enables. Test before prod.

### 674. What is database offset?
**Answer:** Position in partition. Use for consumer. Commit for resume. Per partition. Kafka: offset. Ordering guarantee within partition.

### 675. How do you design a blue-green cutover?
**Answer:** Deploy to green; test; switch traffic (LB); monitor; keep blue for rollback. Use for zero-downtime. Instant switch. Database and state consideration.

### 676. What is database consumer offset reset?
**Answer:** Start from earliest or latest when no offset. Use for new consumer. earliest: replay all. latest: skip old. Configure per use case.

### 677. What is database consumer manual commit?
**Answer:** Consumer commits offset explicitly (after process). Use for at-least-once. Control when commit. Batch commit for throughput. Risk: duplicate if crash before commit.

### 678. How do you design a traffic shifting system?
**Answer:** Gradually shift % traffic from old to new (weighted LB). Use for canary. 1% -> 10% -> 50% -> 100%. Monitor and rollback. Feature flag alternative.

### 679. What is database producer idempotence?
**Answer:** Producer retries; broker deduplicates by PID and sequence. Use for exactly-once. Enable in producer. Prevents duplicate on retry.

### 680. What is database transactional producer?
**Answer:** Send to multiple partitions atomically. Use for exactly-once. Begin tx; send; commit. Consumer read committed. Kafka only.

### 681. How do you design a database migration in deploy?
**Answer:** Run migration before or after app deploy; backward compatible migration first. Use for zero-downtime. Order: expand -> deploy -> contract. Rollback plan.

### 682. What is database producer batch?
**Answer:** Send multiple messages in one request. Use for throughput. Lingering and size. Trade-off: latency vs throughput. Tune for use case.

### 683. What is database producer compression?
**Answer:** Compress batch (gzip, snappy, lz4). Use for bandwidth. Broker stores compressed. Trade-off: CPU vs network. Often worth it.

### 684. How do you design a secret rotation system?
**Answer:** New secret; dual-write; switch; old secret expiry; remove. Use for security. Zero-downtime. Automate. DB, API key, cert. Audit.

### 685. What is database broker?
**Answer:** Message broker (Kafka broker). Store and serve messages. Use for decoupling. Cluster of brokers. Partition distributed. Replication.

### 686. What is database broker replication?
**Answer:** Replicate partition across brokers. Use for durability and availability. In-sync replica. Ack when replicated. Leader and follower.

### 687. How do you design a certificate management system?
**Answer:** Issue (Let's Encrypt, internal CA); deploy to service; renew before expiry; revoke. Use for TLS. Automate. Store and rotate. Monitor expiry.

### 688. What is database in-sync replica?
**Answer:** Replica that is caught up with leader. Use for ack. Producer acks when in-sync replicas ack. Min in-sync = 2 for durability.

### 689. What is database leader and follower?
**Answer:** Leader: serve partition. Follower: replicate. Use for Kafka. Leader election on failure. Client talks to leader. Rebalance on broker loss.

### 690. How do you design a config rollout system?
**Answer:** Change config; version; deploy to subset; validate; full rollout. Use for safe change. Feature flag for config. Rollback. Audit.

### 691. What is database controller (Kafka)?
**Answer:** Broker that manages partition assignment and leader election. Use for cluster metadata. Single active. Failover. Internal.

### 692. What is database ZooKeeper (Kafka)?
**Answer:** Store cluster metadata (brokers, topics). Use for coordination. Kafka moving to KRaft (no ZooKeeper). Consensus. Critical for cluster.

### 693. How do you design a multi-cluster replication?
**Answer:** Replicate between clusters (mirror maker, Confluent replicator). Use for DR and geo. Async. Ordering and exactly-once complex. Failover.

### 694. What is database topic?
**Answer:** Category of messages (Kafka). Use for organization. Partitioned. Retention. Producer to topic; consumer from topic. Named.

### 695. What is database topic partition?
**Answer:** Topic split into partitions. Use for parallelism and order. Order within partition. Key hashes to partition. Scale by adding partition (careful).

### 696. How do you design a DR (disaster recovery) drill?
**Answer:** Periodically failover to DR; verify; fail back. Use for confidence. Documented. Measure RTO/RPO. Improve from drill.

### 697. What is database topic retention?
**Answer:** How long to keep messages (time or size). Use for replay and storage. Compacted: by key. Policy per topic. Balance cost.

### 698. What is database topic compaction?
**Answer:** Log compacted: keep latest per key. Use for changelog. Delete old. Good for state. Compaction runs periodically. Key required.

### 699. How do you design a RTO/RPO validation?
**Answer:** Measure actual recovery time and data loss in drill. Use for DR. Compare to target. Improve process. Document and test.

### 700. What is database schema evolution in stream?
**Answer:** Add optional field; deprecate; compat mode. Use for long-lived topic. Registry. Test. Never break compat in one change.

### 701. What is database dead letter in stream?
**Answer:** Topic for failed messages. Use for error handling. Consumer sends to DLQ after retries. Replay or analyze. Monitor DLQ.

### 702. How do you design a business continuity plan?
**Answer:** Identify critical systems; RTO/RPO; backup and DR; runbook; test. Use for resilience. Document. Review. Multi-region and backup.

### 703. What is database stream consumer lag alert?
**Answer:** Alert when lag > threshold. Use for health. Cause: slow consumer or burst. Scale consumer or optimize. Per partition and group.

### 704. What is database stream consumer scaling?
**Answer:** Add consumers up to partition count. Use for throughput. One consumer per partition max for order. Rebalance. Monitor lag.

### 705. How do you design a security incident response?
**Answer:** Detect; contain; eradicate; recover; postmortem. Use for security. Runbook. Legal and comms. Improve detection and response.

### 706. What is database stream ordering guarantee?
**Answer:** Order within partition (by key). Use for consistency. Same key -> same partition. No global order. Sufficient for many cases.

### 707. What is database stream exactly-once sink?
**Answer:** Idempotent write to sink (e.g. DB with dedup). Use for exactly-once. Transactional outbox or unique key. Kafka Connect with exactly-once.

### 708. How do you design a vulnerability management system?
**Answer:** Scan (code, deps, infra); prioritize; remediate; verify. Use for security. Automate. Patch and upgrade. SLA for critical.

### 709. What is database stream connector?
**Answer:** Source or sink (Kafka Connect). Use for integration. DB, S3, etc. Offload from app. Scale and manage. Exactly-once support.

### 710. What is database stream single message transform?
**Answer:** Transform in connector (filter, map). Use for light ETL. Before sink. Stateless. Connector feature. Simple logic.

### 711. How do you design a compliance audit system?
**Answer:** Log access and change; retain; query for audit. Use for compliance. Immutable. Tamper-proof. Report. Retention policy.

### 712. What is database stream dead letter queue?
**Answer:** Topic for failed messages. Use for error. Retry then DLQ. Replay or analyze. Alert on DLQ size. Don't lose message.

### 713. What is database stream replay from DLQ?
**Answer:** Consume from DLQ; fix and republish or fix consumer and reset offset. Use for recovery. Manual or automated. Understand cause first.

### 714. How do you design a access control system?
**Answer:** Auth (who); authz (what); RBAC or ABAC; audit. Use for security. Principle of least privilege. Centralize. Integrate with identity.

### 715. What is database stream backpressure handling?
**Answer:** Slow consumer; don't fetch more; process; then fetch. Use for stability. Kafka: max poll records. Reactive: request(n). Monitor lag.

### 716. What is database stream consumer heartbeat?
**Answer:** Consumer sends heartbeat to stay in group. Use for liveness. Timeout = leave group; rebalance. Tune session timeout. Process and heartbeat in same thread.

### 717. How do you design a RBAC system?
**Answer:** Roles and permissions; assign role to user; check permission on access. Use for authz. Role hierarchy optional. Audit. Store in DB or policy engine.

### 718. What is database stream consumer session timeout?
**Answer:** No heartbeat for this time = dead. Use for rebalance. Tune for process time. Long = slow rebalance. Short = false positive.

### 719. What is database stream consumer max poll interval?
**Answer:** Max time between polls. Use for liveness. Exceed = leave group. Tune for process time. Long for batch process.

### 720. How do you design a ABAC system?
**Answer:** Policy with attributes (user, resource, action, context); evaluate on access. Use for fine-grained. Flexible. Policy engine. Performance consideration.

### 721. What is database stream consumer cooperative rebalance?
**Answer:** Rebalance without revoking all; only rebalance needed. Use for less disruption. Incremental. Kafka 2.4+. Faster rebalance.

### 722. What is database stream consumer eager rebalance?
**Answer:** Revoke all partitions; reassign. Use for simple. Full rebalance. Pause all consumption. Legacy. Prefer cooperative.

### 723. How do you design a policy engine?
**Answer:** Store policy (rules); evaluate on request; return allow/deny. Use for authz. OPA, Casbin. Decouple policy from code. Audit and test.

### 724. What is database stream consumer static membership?
**Answer:** Consumer keeps same id; reduce unnecessary rebalance. Use for scale. Group instance id. Leave explicitly. Kafka 2.3+.

### 725. What is database stream consumer group protocol?
**Answer:** How group coordinates (e.g. range, sticky). Use for partition assignment. Rebalance protocol. Tune for fairness and stickiness.

### 726. How do you design a audit log for access?
**Answer:** Log every access (who, what, when, result); immutable; retain. Use for compliance and security. Query and alert. Tamper-proof. Privacy consideration.

### 727. What is database stream partition count choice?
**Answer:** More = more parallelism; max = consumer count for order. Use for throughput. Consider key distribution. Add partition: order per key may change. Plan for growth.

### 728. What is database stream partition key?
**Answer:** Key for routing to partition. Use for order. Same key -> same partition. Null key: round-robin. Choose for even distribution and order need.

### 729. How do you design a encryption at rest system?
**Answer:** Encrypt storage (DB, object storage); key management (KMS); rotate key. Use for security. Transparent in cloud. Key access audit.

### 730. What is database stream partition strategy?
**Answer:** Default: hash key. Custom: range or sticky. Use for control. Even distribution. Avoid hot partition. Java Kafka: Partitioner interface.

### 731. What is database stream batching in producer?
**Answer:** Accumulate messages; send batch. Use for throughput. linger.ms and batch.size. Trade-off: latency vs throughput. Tune per use case.

### 732. How do you design a encryption in transit system?
**Answer:** TLS everywhere (client, service, DB). Use for security. Certificate management. Mutual TLS optional. No plaintext. Enforce in policy.

### 733. What is database stream idempotent producer?
**Answer:** Producer retries; broker dedup by PID and sequence. Use for exactly-once. Enable idempotence. No duplicate on retry. Kafka 3.0+.

### 734. What is database stream producer transaction?
**Answer:** Send to multiple partitions atomically. Use for exactly-once. Begin; send; commit. Consumer read_committed. All or nothing.

### 735. How do you design a key management system?
**Answer:** Generate, store, rotate, revoke keys; access control; audit. Use for encryption. HSM or KMS. Never expose. Integrate with app.

### 736. What is database stream read committed?
**Answer:** Consumer only reads committed messages. Use with transactional producer. No aborted messages. Isolation. Kafka consumer config.

### 737. What is database stream read uncommitted?
**Answer:** Consumer reads all (including aborted). Use for low latency. Default. No transaction isolation. May see duplicate or partial.

### 738. How do you design a token-based auth system?
**Answer:** Issue token (JWT or opaque); validate on request; scope and expiry. Use for API. Stateless or store. Refresh and revoke. Secure storage.

### 739. What is database stream transaction coordinator?
**Answer:** Manages producer transactions. Use for exactly-once. One per producer. Internal. Commit or abort. Kafka internal.

### 740. What is database stream transactional id?
**Answer:** Producer PID for transaction. Use for exactly-once. One per producer instance. Fence old producer. Enable idempotence and transaction.

### 741. How do you design a OAuth2 system?
**Answer:** Auth code flow; token endpoint; refresh; scope; client registry. Use for delegation. Secure redirect and client secret. PKCE for public client.

### 742. What is database stream producer acknowledgment?
**Answer:** acks=0, 1, all. 0: fire and forget. 1: leader ack. all: in-sync replica ack. Use for durability. all for critical. Trade-off: latency vs durability.

### 743. What is database stream producer retry?
**Answer:** Retry on failure (transient). Use for reliability. Backoff. Max retries. Idempotent producer for no duplicate. Configurable.

### 744. How do you design a SSO system?
**Answer:** Central IdP; SAML or OIDC; federate to apps. Use for enterprise. One login. Session and token. Integrate with directory.

### 745. What is database stream producer buffer?
**Answer:** Buffer in producer before send. Use for batching. Size limit. Block when full (backpressure). Memory. Tune buffer.memory.

### 746. What is database stream producer flush?
**Answer:** Send buffered messages immediately. Use for low latency. Call flush() or linger=0. Trade-off: throughput. Per batch.

### 747. How do you design a MFA system?
**Answer:** Second factor (TOTP, SMS, hardware); enforce for sensitive; backup codes. Use for security. Integrate with login. Rate limit and lockout.

### 748. What is database stream broker storage?
**Answer:** Append-only log on disk. Use for durability. Segment and index. Retention and compaction. SSD or HDD. Replication for durability.

### 749. What is database stream segment?
**Answer:** Log split into segments (files). Use for retention and compaction. Roll by size or time. Delete or compact old. Index for offset.

### 750. How do you design a password policy system?
**Answer:** Rules (length, complexity, history); enforce on set; rate limit and lockout on login. Use for security. Don't store plaintext. Hash and salt.

### 751. What is database stream segment index?
**Answer:** Index offset/position to file position. Use for fast seek. Sparse index. Lookup then scan. Kafka. Efficient for consumer.

### 752. What is database stream log directory?
**Answer:** Directory per topic partition; segments inside. Use for storage. Configurable path. Disk layout. Multiple disks for throughput.

### 753. How do you design a account lockout system?
**Answer:** Track failed attempts; lock after threshold; unlock after time or admin. Use for security. Prevent brute force. Alert on lockout. Reset option.

### 754. What is database stream replication factor?
**Answer:** How many copies of partition. Use for durability. RF=2 or 3. In-sync replica for ack. Survive broker failure. Trade-off: storage.

### 755. What is database stream under-replicated partition?
**Answer:** Partition with fewer in-sync replicas than RF. Use for alert. Risk of data loss. Cause: broker down, slow replica. Fix: restore broker or reassign.

### 756. How do you design a session management system?
**Answer:** Create session on login; store (cache/DB); validate on request; expire and renew. Use for web. Secure cookie. Revoke on logout. Concurrent session policy.

### 757. What is database stream preferred replica?
**Answer:** Leader on "preferred" broker (e.g. same rack as producer). Use for locality. Rebalance leadership. Kafka. Reduce cross-rack traffic.

### 758. What is database stream unclean leader election?
**Answer:** Allow non-in-sync replica to become leader. Use for availability. Risk: data loss. Default false. Enable only when availability > consistency.

### 759. How do you design a token revocation system?
**Answer:** Store revoked tokens (blacklist) or short expiry + refresh; check on request. Use for logout and compromise. Redis or DB. Token version optional.

### 760. What is database stream min in-sync replicas?
**Answer:** Producer fails if in-sync replicas below this. Use for durability. min.insync.replicas=2. Trade-off: availability vs durability. Prevent data loss.

### 761. What is database stream producer timeout?
**Answer:** Time to wait for ack. Use for failure detection. request.timeout.ms. Retry on timeout. Tune for network. Too short: false failure.

### 762. How do you design a API auth (key, JWT) system?
**Answer:** API key or JWT in header; validate; scope and rate limit. Use for API. Key: simple. JWT: stateless, claim. Store hash of key. Rotate.

### 763. What is database stream consumer poll timeout?
**Answer:** Max time to wait in poll() for data. Use for responsiveness. Return when data or timeout. Short for quick shutdown. Balance with throughput.

### 764. What is database stream consumer max poll records?
**Answer:** Max records per poll. Use for batch size. Large = more throughput, more lag if slow. Small = less memory. Tune for process time.

### 765. How do you design a rate limit per API key?
**Answer:** Counter per key (Redis); window (fixed or sliding); reject when over. Use for fairness. Return 429 and Retry-After. Document limit. Tier by plan.

### 766. What is database stream consumer fetch min bytes?
**Answer:** Wait for this many bytes before return. Use for batching. Trade-off: latency vs throughput. 0 = return immediately. Tune with fetch max wait.

### 767. What is database stream consumer fetch max wait?
**Answer:** Max time to wait for min bytes. Use for latency bound. Return when min bytes or timeout. Balance with min bytes.

### 768. How do you design a CORS and security header system?
**Answer:** CORS: Allow-Origin etc.; security headers (CSP, HSTS, X-Frame). Use for browser security. Configure per env. Audit with scanner.

### 769. What is database stream consumer isolation level?
**Answer:** read_committed: only committed. read_uncommitted: all. Use for transaction. read_committed with producer transaction. Consistency.

### 770. What is database stream consumer auto offset reset?
**Answer:** earliest or latest when no offset. Use for new group or offset invalid. earliest: replay. latest: skip old. Configure. Document for team.

### 771. How do you design a DDoS protection system?
**Answer:** Rate limit; CAPTCHA; absorb (scale); upstream (Cloudflare, AWS Shield). Use for availability. Layer 3/4 and 7. Monitor and alert.

### 772. What is database stream consumer enable auto commit?
**Answer:** Commit offset automatically (periodic). Use for simplicity. Trade-off: at-least-once with possible duplicate. Disable for manual commit (more control).

### 773. What is database stream consumer auto commit interval?
**Answer:** How often to commit when auto commit. Use for balance. Frequent = less duplicate, more overhead. Rare = more duplicate on crash. Tune.

### 774. How do you design a WAF (Web Application Firewall)?
**Answer:** Filter requests (SQLi, XSS, rule); block or challenge. Use for security. ModSecurity, cloud WAF. Tune rules. False positive handling.

### 775. What is database stream consumer group id?
**Answer:** Identity of consumer group. Use for coordination and offset. Same id = share partitions. Unique per application. Namespace.

### 776. What is database stream consumer group coordinator?
**Answer:** Broker that coordinates group. Use for partition assign and rebalance. One coordinator per group. Heartbeat to coordinator.

### 777. How do you design a input validation system?
**Answer:** Validate all input (schema, length, type); sanitize; reject invalid. Use for security. Layer: API, service, DB. Whitelist. Log and block.

### 778. What is database stream consumer group leader?
**Answer:** Consumer that runs partition assignment. Use for rebalance. Elected. Sends assignment to coordinator. Transparent to user.

### 779. What is database stream consumer group rebalance trigger?
**Answer:** Member join, leave, or timeout. Use for rebalance. Reassign partitions. Pause consumption. Minimize trigger (tune timeout).

### 780. How do you design a output encoding system?
**Answer:** Encode output for context (HTML, URL, JS). Use for XSS prevention. Never inject user input raw. Library per context. CSP as defense in depth.





