# Database Replication Lag

## Problem
You have a master-slave database setup. A user updates their profile, then immediately views it, but sees the old data. What's happening and how do you fix it?

## Approach
This is read-after-write inconsistency due to replication lag. Consider: read from master, session stickiness, or accept eventual consistency.

## Solution
**Problem:**
- Write goes to master
- Read goes to slave (for load balancing)
- Slave hasn't replicated yet (lag: 100-500ms)
- User sees stale data

**Solutions:**

1. **Read from Master After Write**
   - Route reads to master for short time after write
   - Use session stickiness or cookie
   - **Pros:** Simple, guarantees consistency
   - **Cons:** Increases master load

2. **Read Your Writes**
   - Track last write timestamp per user
   - Route to master if read within X seconds of write
   - **Pros:** Only affects users who just wrote
   - **Cons:** More complex

3. **Accept Eventual Consistency**
   - Accept that reads may be slightly stale
   - Use for non-critical data
   - **Pros:** Simple, scalable
   - **Cons:** User experience issue

4. **Synchronous Replication**
   - Wait for slave confirmation before returning
   - **Pros:** Strong consistency
   - **Cons:** Slower writes, not truly synchronous in practice

**Recommended:**
```javascript
// Read from master after write
async function updateProfile(userId, data) {
    await masterDB.update(userId, data);
    // Mark user to read from master for next 5 seconds
    await cache.set(`read-master:${userId}`, true, 5);
}

async function getProfile(userId) {
    if (await cache.get(`read-master:${userId}`)) {
        return await masterDB.get(userId);
    }
    return await slaveDB.get(userId);
}
```

## Complexity
- **Time**: 
  - Read from master: O(1) DB query
  - Read from slave: O(1) DB query
  - Cache check: O(1)
- **Space**: O(n) where n is number of users with active read-master flags
- **Note**: Replication lag is typically 100-500ms. Solution adds minimal overhead (cache lookup) to ensure consistency.

## Follow-up
- How to minimize replication lag?
- What about multi-region replication?
- How to handle critical reads?

