# Cache Stampede Problem

## Problem
Your cache expires for a popular item. Suddenly 1000 requests try to refresh it simultaneously, overwhelming your database. How do you prevent this?

## Approach
Prevent thundering herd: use locks, staggered expiration, or background refresh.

## Solution
**Cache Stampede Scenario:**
- Popular item cache expires
- 1000 requests hit database simultaneously
- Database overloaded

**Solutions:**

1. **Distributed Lock**
   ```javascript
   async function getItem(id) {
       let item = await cache.get(`item:${id}`);
       if (item) return item;
       
       // Try to acquire lock
       const lock = await acquireLock(`lock:${id}`, 5); // 5 second timeout
       if (!lock) {
           // Another process is fetching, wait and retry
           await sleep(100);
           return getItem(id);
       }
       
       try {
           // Double-check cache (might have been set by lock holder)
           item = await cache.get(`item:${id}`);
           if (item) return item;
           
           // Fetch from database
           item = await db.getItem(id);
           await cache.set(`item:${id}`, item, 3600);
           return item;
       } finally {
           await releaseLock(`lock:${id}`);
       }
   }
   ```

2. **Staggered Expiration**
   - Add random jitter to TTL
   - `TTL = baseTTL + random(0, 300)` seconds
   - Prevents all caches expiring simultaneously

3. **Background Refresh**
   - Refresh cache before expiration
   - Use separate worker to refresh popular items
   - Always serve stale data if refresh fails

4. **Probabilistic Early Expiration**
   - Randomly refresh before expiration
   - Probability increases as expiration approaches
   - Spreads refresh load over time

**Recommended:**
- Combine distributed lock + staggered expiration
- Use background refresh for very popular items

## Complexity
- **Time**: 
  - Lock acquisition: O(1) average, may need retries
  - Cache lookup: O(1)
  - Database fetch: O(1) or O(log n) depending on DB
- **Space**: O(1) for lock, O(n) for cache where n is cached items
- **Note**: Distributed lock prevents thundering herd. Staggered expiration spreads load over time.

## Follow-up
- How to implement distributed lock?
- What about lock timeout?
- How to handle lock holder crash?

