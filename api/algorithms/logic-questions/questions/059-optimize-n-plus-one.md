# Optimize N+1 Query Problem

## Problem
This code makes 1 query for users, then N queries for each user's orders. How do you optimize it?
```javascript
const users = await db.query('SELECT * FROM users');
for (const user of users) {
    user.orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [user.id]);
}
```

## Approach
Use eager loading: JOIN query, batch loading, or data loader pattern.

## Solution
**Problem:**
- 1 query for users
- N queries for orders (N+1 problem)
- Total: 1 + N queries

**Solutions:**

1. **Single JOIN Query**
   ```javascript
   const results = await db.query(`
       SELECT u.*, o.id as order_id, o.total, o.created_at
       FROM users u
       LEFT JOIN orders o ON u.id = o.user_id
   `);
   
   // Group by user
   const usersMap = new Map();
   for (const row of results) {
       if (!usersMap.has(row.id)) {
           usersMap.set(row.id, {
               id: row.id,
               name: row.name,
               orders: []
           });
       }
       if (row.order_id) {
           usersMap.get(row.id).orders.push({
               id: row.order_id,
               total: row.total,
               createdAt: row.created_at
           });
       }
   }
   ```

2. **Batch Loading (IN Query)**
   ```javascript
   const users = await db.query('SELECT * FROM users');
   const userIds = users.map(u => u.id);
   
   // Single query for all orders
   const orders = await db.query(
       'SELECT * FROM orders WHERE user_id IN (?)',
       [userIds]
   );
   
   // Group orders by user_id
   const ordersByUser = new Map();
   for (const order of orders) {
       if (!ordersByUser.has(order.user_id)) {
           ordersByUser.set(order.user_id, []);
       }
       ordersByUser.get(order.user_id).push(order);
   }
   
   // Attach to users
   for (const user of users) {
       user.orders = ordersByUser.get(user.id) || [];
   }
   ```

3. **DataLoader Pattern (GraphQL style)**
   ```javascript
   class DataLoader {
       constructor(batchFn) {
           this.batchFn = batchFn;
           this.cache = new Map();
           this.queue = [];
       }
       
       async load(key) {
           if (this.cache.has(key)) {
               return this.cache.get(key);
           }
           
           return new Promise((resolve) => {
               this.queue.push({ key, resolve });
               if (this.queue.length === 1) {
                   process.nextTick(() => this.dispatch());
               }
           });
       }
       
       async dispatch() {
           const batch = this.queue.splice(0);
           const keys = batch.map(b => b.key);
           const results = await this.batchFn(keys);
           
           for (let i = 0; i < batch.length; i++) {
               batch[i].resolve(results[i]);
               this.cache.set(batch[i].key, results[i]);
           }
       }
   }
   ```

**Answer:** Use batch loading with IN query or JOIN. Reduces from 1+N queries to 2 queries total.

## Complexity
- **Before (N+1):** O(N) queries, O(N) time
- **After (Batch):** O(1) queries, O(N) time for processing
- **Space**: O(N) - storing all orders in memory for grouping
- **Improvement**: Reduces database round trips from N+1 to 2, significantly faster

## Follow-up
- How to handle pagination?
- What about nested relationships?
- How to implement in ORM?

