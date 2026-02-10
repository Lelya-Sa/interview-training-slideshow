# Debug Slow API Endpoint

## Problem
Your API endpoint that returns user data is suddenly very slow. How do you debug and identify the issue?

## Approach
Systematically check different layers: application, database, network, infrastructure.

## Solution
**Debugging Steps:**

1. **Check Application Logs**
   - Look for errors, warnings, stack traces
   - Check response times in logs

2. **Database Performance**
   - Check slow query logs
   - Verify indexes are being used
   - Check for N+1 queries
   - Monitor connection pool

3. **Code Analysis**
   - Review recent changes
   - Check for inefficient algorithms
   - Look for blocking operations
   - Check for memory leaks

4. **Infrastructure**
   - CPU/Memory usage
   - Network latency
   - Disk I/O
   - Check if server is overloaded

5. **External Dependencies**
   - Third-party API calls
   - Cache performance
   - Message queue delays

**Tools:** APM (Application Performance Monitoring), profilers, database query analyzers, log aggregation

## Complexity
- **Time**: Varies by issue - systematic debugging process, not a single algorithm
- **Space**: O(1) - Debugging process doesn't require additional data structures
- **Note**: This is a troubleshooting methodology. Time depends on root cause (could be O(1) fix or require code changes)

## Follow-up
- How do you prevent this in the future?
- What metrics would you monitor?
- How do you optimize the slow query?

