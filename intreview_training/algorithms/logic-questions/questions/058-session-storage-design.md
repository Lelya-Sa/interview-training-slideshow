# Session Storage Design

## Problem
You need to store user sessions for a web application. Sessions should persist across server restarts and work in a distributed system. What are your options and trade-offs?

## Approach
Consider: in-memory, database, Redis, cookies, and their trade-offs for scalability and reliability.

## Solution
**Options:**

1. **In-Memory (Server Memory)**
   - Store in application memory
   - **Pros:** Fast, simple
   - **Cons:** Lost on restart, doesn't work with load balancer, not scalable

2. **Database (SQL/NoSQL)**
   - Store sessions in database table
   - **Pros:** Persistent, works across servers
   - **Cons:** Slower, database load, needs cleanup job

3. **Redis/Memcached**
   - Store in distributed cache
   - **Pros:** Fast, persistent, scalable, TTL support
   - **Cons:** Additional infrastructure, memory cost

4. **JWT in Cookies**
   - Stateless, store data in token
   - **Pros:** No server storage, scalable
   - **Cons:** Can't revoke easily, size limit, security concerns

5. **Hybrid (JWT + Redis)**
   - JWT for basic info, Redis for sensitive data
   - **Pros:** Best of both worlds
   - **Cons:** More complex

**Recommended: Redis**

```javascript
// Redis session storage
async function createSession(userId) {
    const sessionId = generateUUID();
    const sessionData = {
        userId,
        createdAt: Date.now(),
        lastAccess: Date.now()
    };
    
    await redis.setex(
        `session:${sessionId}`,
        3600 * 24 * 7, // 7 days
        JSON.stringify(sessionData)
    );
    
    return sessionId;
}

async function getSession(sessionId) {
    const data = await redis.get(`session:${sessionId}`);
    if (!data) return null;
    
    const session = JSON.parse(data);
    // Update last access
    await redis.expire(`session:${sessionId}`, 3600 * 24 * 7);
    return session;
}
```

**Considerations:**
- TTL for automatic expiration
- Cleanup job for abandoned sessions
- Replication for high availability
- Encryption for sensitive data

## Complexity
- **Time**: 
  - Create/Read session: O(1) with Redis hash table
  - Update: O(1)
  - Delete: O(1)
- **Space**: O(n) where n is number of active sessions
- **Note**: Redis provides O(1) operations. TTL automatically expires sessions, no manual cleanup needed.

## Follow-up
- How to handle session hijacking?
- What about session sharing across domains?
- How to implement "remember me"?

