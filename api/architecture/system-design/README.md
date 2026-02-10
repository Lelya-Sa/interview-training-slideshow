# System Design - Interview Material

## Definition
System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It involves designing scalable, reliable, and efficient systems.

## Core Concepts

### 1. Scalability
- **Horizontal Scaling**: Adding more machines (scale out)
- **Vertical Scaling**: Adding more power to existing machines (scale up)
- **Load Balancing**: Distributing traffic across servers
- **Database Scaling**: Read replicas, sharding, partitioning

### 2. Reliability and Availability
- **High Availability**: System remains operational
- **Fault Tolerance**: System continues operating despite failures
- **Redundancy**: Duplicate components for backup
- **Failover**: Automatic switching to backup systems
- **SLA**: Service Level Agreement (99.9%, 99.99%, etc.)

### 3. Performance
- **Latency**: Time to process request
- **Throughput**: Requests processed per second
- **Caching**: Storing frequently accessed data
- **CDN**: Content Delivery Network for static assets
- **Database Indexing**: Faster data retrieval

### 4. Consistency Models
- **Strong Consistency**: All nodes see same data simultaneously
- **Eventual Consistency**: Data becomes consistent over time
- **CAP Theorem**: Consistency, Availability, Partition tolerance
- **ACID**: Atomicity, Consistency, Isolation, Durability
- **BASE**: Basically Available, Soft state, Eventual consistency

### 5. Database Design
- **SQL vs NoSQL**: When to use each
- **Normalization**: Reducing data redundancy
- **Denormalization**: Optimizing for reads
- **Indexing**: Improving query performance
- **Partitioning/Sharding**: Splitting data across servers
- **Replication**: Copying data to multiple servers

### 6. Caching Strategies
- **Cache-Aside**: Application manages cache
- **Write-Through**: Write to cache and DB simultaneously
- **Write-Back**: Write to cache, later to DB
- **Cache Eviction**: LRU, LFU, TTL
- **Distributed Caching**: Redis, Memcached

### 7. Load Balancing
- **Round Robin**: Equal distribution
- **Least Connections**: Route to server with fewest connections
- **IP Hash**: Route based on client IP
- **Geographic**: Route based on location
- **Health Checks**: Monitor server health

### 8. Message Queues
- **Pub/Sub**: Publish-subscribe pattern
- **Message Brokers**: RabbitMQ, Kafka, SQS
- **Asynchronous Processing**: Decouple components
- **Ordering**: Maintain message order
- **Durability**: Persist messages

### 9. API Design
- **REST**: Representational State Transfer
- **GraphQL**: Query language for APIs
- **gRPC**: High-performance RPC framework
- **Rate Limiting**: Control request rate
- **Versioning**: API version management
- **Documentation**: OpenAPI, Swagger

### 10. Security
- **Authentication**: Verify user identity
- **Authorization**: Control access to resources
- **Encryption**: Protect data in transit and at rest
- **HTTPS/TLS**: Secure communication
- **OAuth**: Third-party authentication
- **JWT**: Token-based authentication

### 11. Microservices Architecture
- **Service Decomposition**: Breaking monolith into services
- **Service Communication**: REST, gRPC, message queues
- **Service Discovery**: Finding available services
- **API Gateway**: Single entry point
- **Circuit Breaker**: Prevent cascade failures

### 12. Data Storage
- **Relational Databases**: PostgreSQL, MySQL
- **NoSQL Databases**: MongoDB, Cassandra, DynamoDB
- **Object Storage**: S3, Azure Blob
- **Time-Series DB**: InfluxDB, TimescaleDB
- **Search Engines**: Elasticsearch, Solr

### 13. Monitoring and Observability
- **Metrics**: Quantitative measurements
- **Logging**: Event records
- **Tracing**: Request flow across services
- **Alerting**: Notifications for issues
- **Dashboards**: Visual representation

### 14. Design Patterns
- **Singleton**: Single instance
- **Factory**: Object creation
- **Observer**: Event-driven updates
- **Strategy**: Algorithm selection
- **Adapter**: Interface compatibility

### 15. System Components
- **Web Servers**: Nginx, Apache
- **Application Servers**: Node.js, Java, Python
- **Databases**: PostgreSQL, MongoDB, Redis
- **Caches**: Redis, Memcached
- **Message Queues**: RabbitMQ, Kafka
- **CDN**: CloudFlare, AWS CloudFront

## Design Process

### Step 1: Requirements Clarification
- Functional requirements
- Non-functional requirements
- Scale estimates (users, data, traffic)
- Constraints

### Step 2: High-Level Design
- Draw major components
- Show interactions
- Identify APIs
- Database schema

### Step 3: Detailed Design
- Deep dive into components
- Algorithms and data structures
- Scalability considerations
- Trade-offs

### Step 4: Identify Bottlenecks
- Single points of failure
- Scalability issues
- Performance bottlenecks
- Security concerns

### Step 5: Scale the Design
- Load balancing
- Caching
- Database optimization
- Horizontal scaling

## Common System Design Questions
- Design a URL shortener (bit.ly)
- Design a chat system (WhatsApp)
- Design a social network (Twitter)
- Design a video streaming service (YouTube)
- Design a search engine (Google)
- Design a ride-sharing service (Uber)
- Design a file storage system (Dropbox)
- Design a recommendation system
- Design a distributed cache
- Design a notification system

## Best Practices
- Start with requirements
- Think about scale
- Consider trade-offs
- Discuss bottlenecks
- Propose solutions
- Estimate capacity
- Consider failure scenarios
- Discuss monitoring
- Security considerations
- Cost optimization

