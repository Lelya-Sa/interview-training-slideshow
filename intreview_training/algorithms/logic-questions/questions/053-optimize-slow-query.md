# Optimize Slow Database Query

## Problem
This query takes 10 seconds to run. How would you optimize it?
```sql
SELECT * FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total DESC
LIMIT 100;
```

## Approach
Analyze: indexes, query structure, joins, filtering, sorting, and data access patterns.

## Solution
**Optimization Steps:**

1. **Add Indexes**
   ```sql
   -- Index on filter column
   CREATE INDEX idx_orders_created_at ON orders(created_at);
   
   -- Composite index for filter + sort
   CREATE INDEX idx_orders_created_total ON orders(created_at, total DESC);
   
   -- Index on join column (if not exists)
   CREATE INDEX idx_orders_user_id ON orders(user_id);
   ```

2. **Optimize Query**
   ```sql
   -- Select only needed columns
   SELECT o.id, o.total, o.created_at, u.name, u.email
   FROM orders o
   INNER JOIN users u ON o.user_id = u.id
   WHERE o.created_at > '2024-01-01'
   ORDER BY o.total DESC
   LIMIT 100;
   ```

3. **Check Execution Plan**
   - Use EXPLAIN to see query plan
   - Look for full table scans
   - Check if indexes are used

4. **Consider Alternatives**
   - Materialized views for frequent queries
   - Denormalize if joins are expensive
   - Cache results if data doesn't change often
   - Partition large tables by date

5. **Database Tuning**
   - Increase buffer pool size
   - Optimize join algorithms
   - Update table statistics

**Expected Improvement:** From 10s to <100ms with proper indexes.

## Complexity
- **Before**: O(n) full table scan where n is number of rows
- **After**: O(log n) with B-tree index for filter, O(k) for sorting where k is result size
- **Space**: O(n) for index storage, but enables fast lookups
- **Note**: Index creation: O(n log n) one-time cost. Query performance improves from O(n) to O(log n + k)

## Follow-up
- How to identify slow queries?
- What about N+1 query problems?
- How to optimize joins?

