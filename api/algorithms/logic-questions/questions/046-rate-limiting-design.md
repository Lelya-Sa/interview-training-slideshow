# Rate Limiting Design

## Problem
How would you implement rate limiting to prevent API abuse? A user should be limited to 100 requests per minute. What are different approaches and trade-offs?

## Approach
Consider: token bucket, sliding window, fixed window, and distributed rate limiting.

## Solution
**Approaches:**

1. **Token Bucket**
   - Bucket has capacity (100 tokens)
   - Refill at fixed rate (1 token/second)
   - Request consumes 1 token
   - **Pros:** Allows bursts, smooth rate
   - **Cons:** More complex

2. **Sliding Window Log**
   - Store timestamp of each request
   - Count requests in last 60 seconds
   - **Pros:** Accurate
   - **Cons:** Memory intensive, O(n) cleanup

3. **Sliding Window Counter**
   - Divide window into sub-windows
   - Count requests in current + previous sub-window
   - **Pros:** Memory efficient, good approximation
   - **Cons:** Slightly less accurate

4. **Fixed Window**
   - Reset counter every minute
   - **Pros:** Simple, memory efficient
   - **Cons:** Allows bursts at window boundary

**Implementation (Redis):**
```javascript
// Sliding window with Redis
async function rateLimit(userId) {
    const key = `rate:${userId}`;
    const now = Date.now();
    const window = 60000; // 1 minute
    
    // Remove old entries
    await redis.zremrangebyscore(key, 0, now - window);
    
    // Count current requests
    const count = await redis.zcard(key);
    
    if (count >= 100) {
        return false; // Rate limited
    }
    
    // Add current request
    await redis.zadd(key, now, `${now}-${Math.random()}`);
    await redis.expire(key, 60);
    return true;
}
```

**Distributed Rate Limiting:**
- Use Redis for shared state
- Consider consistent hashing for sharding
- Use distributed locks if needed

## Complexity
- **Time**: 
  - Fixed Window: O(1) check and increment
  - Sliding Window: O(1) average with hash table, O(k) cleanup where k is requests in window
  - Token Bucket: O(1) check and refill
- **Space**: O(n) where n is number of unique users/IPs being rate limited
- **Note**: Sliding window log can be O(n) space if storing all timestamps, but counter approach is O(1) per user

## Follow-up
- How to handle different limits per user?
- What about rate limiting by IP?
- How to implement sliding window efficiently?

