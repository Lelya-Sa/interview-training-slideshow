# Debug Race Condition

## Problem
Users report that sometimes their balance decreases but the item isn't purchased. How do you identify and fix this race condition?

## Approach
Identify concurrent access to shared state without proper synchronization.

## Solution
**Identifying the Issue:**

1. **Symptoms**
   - Intermittent failures
   - Data inconsistency
   - Balance decreases but no purchase recorded

2. **Root Cause**
   ```javascript
   // Problematic code
   if (user.balance >= item.price) {
       user.balance -= item.price;  // Race condition here
       createPurchase(item);
   }
   ```
   Two requests can both pass the check before either updates balance.

3. **Solutions**

   **Database Transactions:**
   ```sql
   BEGIN TRANSACTION;
   SELECT balance FROM users WHERE id = ? FOR UPDATE;
   UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?;
   INSERT INTO purchases ...;
   COMMIT;
   ```

   **Optimistic Locking:**
   - Use version field
   - Check version before update
   - Retry on conflict

   **Pessimistic Locking:**
   - Lock row during transaction
   - Prevent concurrent modifications

   **Distributed Lock:**
   - Use Redis for distributed systems
   - Lock user ID during operation

**Answer:** Use database transactions with row-level locking or optimistic locking to ensure atomic operations.

## Complexity
- **Time**: O(1) per operation with proper locking - transactions ensure atomicity
- **Space**: O(1) - Locking doesn't require additional space proportional to data
- **Note**: Lock contention can cause delays. Optimistic locking: O(1) success, may need retries on conflict

## Follow-up
- How to handle in distributed system?
- What's the performance impact?
- How to test race conditions?

