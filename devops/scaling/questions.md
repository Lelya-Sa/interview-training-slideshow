# Scaling - Interview Questions

## Questions (1-10)

### 1. What is the difference between horizontal and vertical scaling?
**Answer:** Horizontal: add more machines (scale out). Vertical: add more power to existing machine (scale up).

### 2. When would you use horizontal vs vertical scaling?
**Answer:** Horizontal: distributed systems, high availability, cloud environments. Vertical: simple apps, single server, quick fix.

### 3. How do you scale a database?
**Answer:** Read replicas (scale reads), sharding (scale writes), caching, connection pooling, optimize queries, indexing.

### 4. What is auto-scaling?
**Answer:** Automatically adjust resources based on demand. Scale up when load increases, scale down when load decreases.

### 5. How do you implement load balancing for scaling?
**Answer:** Distribute traffic across multiple servers. Round robin, least connections, geographic, health checks, session persistence.

### 6. What are scaling strategies?
**Answer:** Manual scaling, scheduled scaling, predictive scaling, reactive scaling (based on metrics), step scaling.

### 7. How do you scale stateless vs stateful services?
**Answer:** Stateless: easy horizontal scaling, any instance can handle request. Stateful: requires session affinity, shared state, more complex.

### 8. What are scaling bottlenecks?
**Answer:** Database, shared resources, synchronous operations, single points of failure, network bandwidth, CPU/memory limits.

### 9. How do you test scaling?
**Answer:** Load testing, stress testing, capacity planning, monitor metrics, test failover, measure performance under load.

### 10. What is scalability vs performance?
**Answer:** Performance: how fast system responds. Scalability: ability to handle increased load by adding resources. Related but different.

