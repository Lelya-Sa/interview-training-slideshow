# Cache Invalidation Strategy

## Problem
You have a user profile cache. When a user updates their profile, how do you ensure the cache is updated correctly? What are the trade-offs?

## Approach
Consider different cache invalidation strategies: write-through, write-behind, cache-aside, and their trade-offs.

## Solution
**Strategies:**

1. **Cache-Aside (Lazy Loading)**
   - On update: Write to DB, invalidate cache
   - On read: Check cache, if miss, read from DB and populate cache
   - **Pros:** Simple, cache only what's needed
   - **Cons:** Cache miss on every update

2. **Write-Through**
   - On update: Write to both cache and DB simultaneously
   - **Pros:** Cache always consistent
   - **Cons:** Slower writes, cache may have unused data

3. **Write-Behind (Write-Back)**
   - On update: Write to cache immediately, queue DB write
   - **Pros:** Fast writes
   - **Cons:** Risk of data loss, eventual consistency

4. **Refresh-Ahead**
   - Proactively refresh cache before expiration
   - **Pros:** Reduces cache misses
   - **Cons:** More complex, may refresh unused data

**Recommended for User Profiles:**
- Use **Cache-Aside** with TTL
- On update: Invalidate cache key
- Consider **Write-Through** if reads are much more frequent than writes

**Implementation:**
```javascript
async function updateProfile(userId, data) {
    await db.update(userId, data);
    await cache.delete(`user:${userId}`); // Invalidate
}
```

## Complexity
- **Time**: 
  - Cache-Aside: O(1) invalidate, O(1) read (cache hit) or O(1) DB read (cache miss)
  - Write-Through: O(1) write to cache + O(1) write to DB = O(1)
- **Space**: O(n) where n is number of cached items
- **Note**: Cache operations are typically O(1) with hash table. DB operations depend on implementation.

## Follow-up
- How to handle cache stampede?
- What about distributed cache?
- How to handle partial updates?

