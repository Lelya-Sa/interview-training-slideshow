# Failover & Load Balancing - Interview Questions

## Questions (1-10)

### 1. What is load balancing?
**Answer:** Distributing incoming requests across multiple servers. Improves availability, performance, handles traffic spikes.

### 2. What are load balancing algorithms?
**Answer:** Round robin (equal distribution), least connections, IP hash (sticky sessions), weighted (assign weights), geographic.

### 3. What is failover?
**Answer:** Automatic switching to backup system when primary fails. High availability, redundancy, automatic detection and switch.

### 4. What is health checking in load balancing?
**Answer:** Monitoring server health. Ping endpoints, check response codes, remove unhealthy servers, add back when healthy.

### 5. What is session persistence (sticky sessions)?
**Answer:** Route same user to same server. Maintains session state, use cookies or IP hash, trade-off with load distribution.

### 6. What are types of load balancers?
**Answer:** Application (Layer 7), Network (Layer 4), Global load balancers (DNS-based), hardware vs software load balancers.

### 7. How does active-passive failover work?
**Answer:** Primary handles traffic, standby waits. On failure, standby activates. Simple but resource waste on standby.

### 8. How does active-active failover work?
**Answer:** Multiple active servers share load. If one fails, others continue. Better resource utilization, more complex.

### 9. What is geographic load balancing?
**Answer:** Route traffic to nearest data center. Reduces latency, improves performance, DNS-based routing, health-aware.

### 10. How do you implement high availability?
**Answer:** Load balancers, multiple servers, health checks, failover mechanisms, redundancy, monitoring, automated recovery.

