# Consistent Hashing Problem

## Problem
You have a distributed cache with 3 servers. When you add or remove a server, how do you minimize the number of keys that need to be moved? Explain consistent hashing.

## Approach
Traditional hashing causes all keys to remap when servers change. Consistent hashing minimizes remapping.

## Solution
**Problem with Traditional Hashing:**
- hash(key) % num_servers
- Adding/removing server remaps ALL keys (100% remapping)

**Consistent Hashing:**
1. Map servers and keys to a circle (hash ring)
2. Each key maps to next server clockwise
3. Adding server: only keys between previous and new server remap
4. Removing server: only keys on that server remap

**Example:**
```
Hash Ring: 0 ---> 100 ---> 200 ---> 300 ---> 0
Servers:   S1(100), S2(200), S3(300)
Keys:      K1(50) -> S1, K2(150) -> S2, K3(250) -> S3

Add S4(150): Only K2 remaps to S4 (33% remapping)
Remove S2: Only K2 remaps to S3 (33% remapping)
```

**Virtual Nodes:**
- Each physical server has multiple virtual nodes on ring
- Improves load distribution
- Reduces impact of server addition/removal

**Answer:** Consistent hashing minimizes key remapping to ~1/n (where n = number of servers) instead of 100%.

## Complexity
- **Time**: 
  - Hash calculation: O(1)
  - Finding server: O(log n) with sorted ring, O(1) average with good hash
  - Adding/removing server: O(k/n) key remapping where k is total keys
- **Space**: O(n) where n is number of servers (or virtual nodes)
- **Note**: With virtual nodes, space is O(vn) where v is virtual nodes per server, but improves load distribution

## Follow-up
- How to handle uneven load distribution?
- What about server failures?
- How to implement in practice?

