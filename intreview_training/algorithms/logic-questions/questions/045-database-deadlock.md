# Database Deadlock Scenario

## Problem
Two transactions are deadlocked. Transaction A holds lock on row 1 and waits for row 2. Transaction B holds lock on row 2 and waits for row 1. How do you prevent and handle this?

## Approach
Understand deadlock causes and prevention strategies: lock ordering, timeouts, deadlock detection.

## Solution
**Deadlock Example:**
```
Transaction A: UPDATE users SET ... WHERE id = 1;
               UPDATE users SET ... WHERE id = 2;  -- Waits for B

Transaction B: UPDATE users SET ... WHERE id = 2;
               UPDATE users SET ... WHERE id = 1;  -- Waits for A
```

**Prevention Strategies:**

1. **Lock Ordering**
   - Always acquire locks in same order (e.g., by ID)
   - Transaction A and B both lock 1 then 2

2. **Lock Timeout**
   - Set maximum wait time for locks
   - Abort transaction if timeout exceeded

3. **Deadlock Detection**
   - Database detects cycles in wait-for graph
   - Automatically aborts one transaction

4. **Reduce Lock Scope**
   - Hold locks for minimum time
   - Use row-level locks instead of table locks
   - Batch operations to reduce lock time

5. **Optimistic Locking**
   - Use version fields instead of pessimistic locks
   - Retry on conflict

**Database Handling:**
- Most databases detect and abort one transaction
- Application should retry aborted transaction
- Use exponential backoff for retries

**Answer:** Use consistent lock ordering, set timeouts, and implement retry logic for deadlock victims.

## Complexity
- **Time**: O(1) per transaction with proper ordering - deadlocks prevented
- **Space**: O(1) - Locking doesn't require additional space
- **Note**: Deadlock detection: O(V+E) where V=transactions, E=wait-for edges. Prevention avoids this cost.

## Follow-up
- How to detect deadlocks in application?
- What's the performance impact?
- How to handle in distributed systems?

