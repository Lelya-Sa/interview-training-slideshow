# Design Idempotent API

## Problem
Your payment API is called twice due to network retry. How do you ensure the payment is only processed once?

## Approach
Use idempotency keys: client sends unique key, server processes once and caches result.

## Solution
**Idempotency Key Pattern:**

1. **Client Side**
   ```javascript
   const idempotencyKey = generateUUID();
   await fetch('/api/payment', {
       method: 'POST',
       headers: {
           'Idempotency-Key': idempotencyKey
       },
       body: { amount: 100, account: '123' }
   });
   ```

2. **Server Side**
   ```javascript
   async function processPayment(req, res) {
       const idempotencyKey = req.headers['idempotency-key'];
       
       // Check if already processed
       const cached = await cache.get(`idempotency:${idempotencyKey}`);
       if (cached) {
           return res.json(cached); // Return cached result
       }
       
       // Process payment
       const result = await chargeCard(req.body);
       
       // Cache result
       await cache.set(
           `idempotency:${idempotencyKey}`,
           result,
           24 * 60 * 60 // 24 hours
       );
       
       return res.json(result);
   }
   ```

**Key Points:**
- Client generates unique key per operation
- Server checks cache before processing
- Cache result for retries
- Use same key for same operation
- Different keys for different operations

**Storage:**
- Redis for fast lookups
- TTL: 24-48 hours (long enough for retries)
- Can also store in database for audit

**Answer:** Use idempotency keys. Client sends unique key, server processes once and returns cached result for duplicate requests.

## Complexity
- **Time**: 
  - Check cache: O(1) with hash table
  - Process: O(1) for actual operation
  - Store result: O(1)
- **Space**: O(n) where n is number of unique idempotency keys (typically bounded by TTL)
- **Note**: Prevents duplicate processing. Cache lookup is O(1), making retries very fast.

## Follow-up
- How to handle partial failures?
- What about distributed systems?
- How to ensure key uniqueness?

