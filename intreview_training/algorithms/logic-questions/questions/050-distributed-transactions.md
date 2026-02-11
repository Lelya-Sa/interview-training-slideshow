# Distributed Transactions Problem

## Problem
You need to transfer money from Account A (in Database 1) to Account B (in Database 2). How do you ensure both operations succeed or both fail? What are the challenges?

## Approach
Traditional ACID transactions don't work across databases. Consider: two-phase commit, saga pattern, or eventual consistency.

## Solution
**Challenge:** No single transaction can span multiple databases.

**Approaches:**

1. **Two-Phase Commit (2PC)**
   - Coordinator asks all participants to prepare
   - If all agree, coordinator commits
   - If any fails, coordinator aborts all
   - **Pros:** Strong consistency
   - **Cons:** Blocking, coordinator failure is critical, slow

2. **Saga Pattern**
   - Break into local transactions
   - Each has compensating action
   - Execute sequentially, rollback on failure
   - **Pros:** Non-blocking, more resilient
   - **Cons:** Eventual consistency, complex

3. **Event Sourcing + CQRS**
   - Emit events for each operation
   - Process events asynchronously
   - Compensate on failure
   - **Pros:** Audit trail, scalable
   - **Cons:** Complex, eventual consistency

**Saga Example:**
```javascript
async function transferMoney(fromAccount, toAccount, amount) {
    try {
        // Step 1: Debit from Account A
        await db1.debit(fromAccount, amount);
        
        // Step 2: Credit to Account B
        await db2.credit(toAccount, amount);
        
        return { success: true };
    } catch (error) {
        // Compensate: Credit back to Account A
        await db1.credit(fromAccount, amount);
        throw error;
    }
}
```

**Better: Event-Driven**
```javascript
// Emit events
await eventBus.emit('money.debited', { account: fromAccount, amount });
await eventBus.emit('money.credited', { account: toAccount, amount });

// Compensate on failure
await eventBus.emit('money.credit.rollback', { account: fromAccount, amount });
```

**Answer:** Use Saga pattern or event-driven architecture. Accept eventual consistency for better availability and performance.

## Complexity
- **Time**: 
  - Saga: O(k) where k is number of steps, each step O(1) local transaction
  - 2PC: O(k) but blocking, can be slow due to coordination
  - Event-driven: O(1) per event, asynchronous processing
- **Space**: O(k) for storing saga state or event log
- **Note**: 2PC has high latency due to blocking. Saga is non-blocking but requires compensation logic.

## Follow-up
- How to handle partial failures?
- What about network partitions?
- How to ensure idempotency?

