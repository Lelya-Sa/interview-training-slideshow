# Estimate Server Capacity

## Problem
You need to estimate how many servers are needed to handle 1 million requests per day. Each request takes 200ms to process. What's your calculation?

## Approach
Break down: requests per second, server capacity, overhead, redundancy.

## Solution
**Calculation:**

1. **Requests per Second**
   - 1M requests/day = 1,000,000 / 86400 ≈ 11.6 requests/sec
   - Peak (assuming 3x average) = ~35 requests/sec

2. **Server Capacity**
   - Each request: 200ms
   - Requests per server per second: 1000ms / 200ms = 5 requests/sec
   - With 70% utilization: 5 × 0.7 = 3.5 requests/sec per server

3. **Number of Servers**
   - Peak capacity needed: 35 requests/sec
   - Servers needed: 35 / 3.5 = 10 servers

4. **Redundancy & Overhead**
   - Add 20% for redundancy: 10 × 1.2 = 12 servers
   - Load balancer overhead: +1 = 13 servers

**Answer:** Approximately 10-15 servers depending on redundancy requirements and traffic distribution.

**Considerations:**
- Traffic spikes (e.g., 10x during peak hours)
- Database load
- Caching effectiveness
- Auto-scaling capabilities

## Complexity
- **Time**: O(1) - Mathematical calculation/estimation
- **Space**: O(1) - No data structures needed
- **Note**: This is a capacity planning estimation problem. Actual system complexity depends on implementation (load balancing, auto-scaling, etc.)

## Follow-up
- What if requests are bursty?
- How to handle traffic spikes?
- What about database capacity?

