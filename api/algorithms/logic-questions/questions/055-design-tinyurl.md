# Design TinyURL System

## Problem
Design a system like TinyURL that can shorten and redirect URLs. Handle 100M URLs per day with 100:1 read:write ratio. What are the key design decisions?

## Approach
Consider: encoding, storage, scalability, caching, and reliability.

## Solution
**Key Components:**

1. **URL Encoding**
   - Base62: [a-z, A-Z, 0-9] = 62 characters
   - 6 chars = 62⁶ ≈ 56 billion URLs
   - 7 chars = 62⁷ ≈ 3.5 trillion URLs
   - Use 7 characters for safety

2. **ID Generation**
   - Database auto-increment (simple but bottleneck)
   - Snowflake ID (distributed, scalable)
   - UUID (unique but longer)

3. **Storage**
   - ShortURL → LongURL mapping
   - Database: id, shortCode, longURL, createdAt, expiresAt, userId
   - Cache: Redis for hot URLs (80% of traffic)

4. **API Design**
   ```
   POST /api/v1/shorten
   GET /{shortCode} → 301 redirect
   GET /api/v1/analytics/{shortCode}
   ```

5. **Scalability**
   - **Writes:** 100M/day = ~1,200/sec
   - **Reads:** 100:1 = 120,000/sec
   - Database sharding by shortCode hash
   - Load balancer + multiple app servers
   - CDN for redirect service

6. **Caching Strategy**
   - Cache 20% most popular URLs (80/20 rule)
   - Redis with 24h TTL
   - Cache-aside pattern

7. **Additional Features**
   - Custom short codes
   - Expiration dates
   - Analytics (clicks, geolocation, referrer)
   - Rate limiting (prevent abuse)

**Estimated Infrastructure:**
- 10-20 app servers
- 3-5 database servers (sharded)
- Redis cluster for caching
- CDN for redirects

## Complexity
- **Time**: 
  - Shorten: O(1) with hash table, O(log n) with database
  - Redirect: O(1) with cache hit, O(log n) with database
- **Space**: O(n) where n is number of URLs stored
- **Note**: System design question. Actual complexity depends on implementation (caching, sharding, load balancing)

## Follow-up
- How to handle duplicate long URLs?
- What if short code already exists?
- How to scale to 1 billion URLs/day?

