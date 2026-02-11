# Design a URL Shortener

## Problem
How would you design a URL shortener like bit.ly? What are the key components and considerations?

## Approach
Think about: storage, encoding, scalability, reliability, features.

## Solution
**Key Components:**

1. **URL Encoding**
   - Base62 encoding (a-z, A-Z, 0-9) for short URLs
   - 6 characters = 62⁶ ≈ 56 billion URLs
   - Generate unique IDs (snowflake, UUID, database sequence)

2. **Storage**
   - Key-value store: shortURL → longURL
   - Database: id, shortURL, longURL, createdAt, clicks
   - Cache frequently accessed URLs (Redis)

3. **API Design**
   - POST /shorten: Create short URL
   - GET /{shortCode}: Redirect to long URL
   - GET /stats/{shortCode}: Get analytics

4. **Scalability**
   - Horizontal scaling with load balancer
   - Database sharding by shortCode
   - CDN for redirect service
   - Caching layer

5. **Additional Features**
   - Custom short codes
   - Expiration dates
   - Analytics (clicks, geolocation)
   - Rate limiting

**Estimated Scale:**
- 100M URLs/day = ~1,200 writes/sec
- 100:1 read:write ratio = 120K reads/sec

## Complexity
- **Time**: 
  - Shorten: O(1) average with hash table, O(log n) with database
  - Redirect: O(1) with cache, O(log n) with database lookup
- **Space**: O(n) where n is number of URLs stored
- **Note**: System design question - complexity depends on implementation choices (cache, database, sharding)

## Follow-up
- How to handle duplicate URLs?
- What if short code already exists?
- How to handle expiration?

