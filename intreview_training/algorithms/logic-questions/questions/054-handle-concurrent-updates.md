# Handle Concurrent Updates

## Problem
Two users try to update the same document simultaneously. User A changes the title, User B changes the description. How do you handle this to avoid losing data?

## Approach
Consider: optimistic locking, last-write-wins, operational transforms, or conflict resolution strategies.

## Solution
**Strategies:**

1. **Optimistic Locking (Version Field)**
   ```javascript
   // Check version before update
   const doc = await db.getDocument(id);
   if (doc.version !== expectedVersion) {
       throw new Error('Document was modified');
   }
   await db.updateDocument(id, { ...data, version: doc.version + 1 });
   ```
   - **Pros:** Prevents lost updates
   - **Cons:** User must retry on conflict

2. **Last-Write-Wins (LWW)**
   - Use timestamp, accept last write
   - **Pros:** Simple, no conflicts
   - **Cons:** Can lose updates

3. **Field-Level Updates**
   ```javascript
   // Update only changed fields
   await db.updateDocument(id, {
       title: newTitle,  // Only if changed
   });
   ```
   - **Pros:** Allows concurrent field updates
   - **Cons:** More complex, need to track changes

4. **Operational Transform (OT)**
   - Transform operations to resolve conflicts
   - Used in collaborative editors
   - **Pros:** Handles complex conflicts
   - **Cons:** Very complex

5. **Conflict Resolution UI**
   - Show both versions, let user choose
   - **Pros:** User decides
   - **Cons:** Requires user interaction

**Recommended for Most Cases:**
- Use optimistic locking with version field
- Show conflict message, let user refresh and retry
- For collaborative editing, use operational transforms

## Complexity
- **Time**: 
  - Optimistic locking: O(1) read + O(1) write, may need retries
  - Field-level: O(1) per field update
  - OT: O(m) where m is number of operations to transform
- **Space**: O(1) for version field, O(m) for OT operation history
- **Note**: Optimistic locking is O(1) but may require multiple attempts on conflicts

## Follow-up
- How to handle in distributed system?
- What about real-time collaboration?
- How to implement operational transforms?

