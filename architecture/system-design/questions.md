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

