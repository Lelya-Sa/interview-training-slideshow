# LRU Cache - LeetCode 146

## Problem Description

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the `LRUCache` class:
- `LRUCache(int capacity)` Initialize the LRU cache with **any positive size** `capacity`. The implementation works with any capacity value (not limited to 2).
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

The functions `get` and `put` must each run in O(1) average time complexity.

**Note:** The implementation is fully general and works with any capacity value. The examples below use capacity 2 for demonstration, but the cache works with capacity 1, 3, 10, 100, or any positive integer.

## Examples

### Example 1: Capacity 2
```
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

### Example 2: Capacity 3
```
LRUCache lRUCache = new LRUCache(3);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.put(3, 3); // cache is {1=1, 2=2, 3=3}
lRUCache.get(1);    // return 1, cache is {2=2, 3=3, 1=1}
lRUCache.put(4, 4); // LRU key was 2, evicts key 2, cache is {3=3, 1=1, 4=4}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(1);    // return 1
lRUCache.get(4);    // return 4
```

### Example 3: Capacity 1
```
LRUCache lRUCache = new LRUCache(1);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // evicts key 1, cache is {2=2}
lRUCache.get(1);    // returns -1 (not found)
lRUCache.get(2);    // return 2
```

## Approach

### Data Structures:
- **Doubly Linked List**: For O(1) insertion/deletion
- **HashMap**: For O(1) key lookup

### Why Dummy Nodes (Sentinel Nodes)?
The implementation uses dummy head and tail nodes (placeholders that don't contain data) to simplify operations:

1. **Eliminates Null Checks**: `head` and `tail` always exist, so we never need to check for null
2. **Unified Logic**: Same code works for adding/removing any node (first, middle, last)
3. **No Edge Cases**: Empty list is handled the same way as non-empty list
4. **Cleaner Code**: No special cases needed

**Structure**: `[dummy head] <-> [node1] <-> [node2] <-> [dummy tail]`

- Most recent node: `head.next`
- Least recent node: `tail.prev`

### Key Insight:
- Use doubly linked list to maintain order (most recent at head, least recent at tail)
- Use HashMap to map keys to nodes for O(1) access
- When accessing a node, move it to head (most recent)
- When capacity exceeded, remove tail node (least recent)

### Operations:
1. **get(key)**: 
   - Find node in HashMap → O(1)
   - Move to head → O(1)
   - Return value

2. **put(key, value)**:
   - If exists: update value and move to head → O(1)
   - If new: add to head, if capacity exceeded remove tail → O(1)

### Capacity Handling:
- The implementation dynamically handles any capacity value
- When `cache.size > capacity`, the least recently used item (tail) is automatically evicted
- Works efficiently with capacity 1, 2, 10, 100, or any positive integer

## Time Complexity
- `get()`: O(1)
- `put()`: O(1)

## Space Complexity
- O(capacity)

## How to Use

### JavaScript
```bash
node js/solution.js
```

### Python
```bash
python python/solution.py
```

### Java
```bash
javac java/Solution.java
java Solution
```

