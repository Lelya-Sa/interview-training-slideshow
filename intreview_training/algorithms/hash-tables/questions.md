# Hash Tables - Interview Questions

## Questions (1-15)

### 1. What is a hash table?
**Answer:** Data structure that stores key-value pairs using hash function to map keys to indices.

### 2. How does a hash table work?
**Answer:** Hash function converts key to index, store value at that index. Lookup uses same function.

### 3. What is a hash function?
**Answer:** Function that maps keys to array indices. Should be deterministic, uniform distribution, fast.

### 4. What is collision? How do you handle it?
**Answer:** When two keys hash to same index. Handle with chaining (linked list) or open addressing.

### 5. Explain chaining for collision resolution.
**Answer:** Store multiple key-value pairs at same index using linked list or array.

### 6. Explain open addressing for collision resolution.
**Answer:** Find next available slot when collision occurs. Methods: linear probing, quadratic probing, double hashing.

### 7. What is the time complexity of hash table operations?
**Answer:** O(1) average case for insert, delete, search. O(n) worst case if many collisions.

### 8. What is load factor?
**Answer:** Ratio of number of elements to number of buckets. High load factor increases collisions.

### 9. How do you resize a hash table?
**Answer:** Create larger array, rehash all elements. Typically double size when load factor > threshold.

### 10. What is the difference between HashMap and HashTable?
**Answer:** HashMap allows null keys/values, not synchronized. HashTable synchronized, no nulls.

### 11. What are the requirements for a good hash function?
**Answer:** Deterministic, uniform distribution, fast computation, minimize collisions.

### 12. How do hash tables compare to arrays?
**Answer:** Hash tables: O(1) average access, flexible keys. Arrays: O(1) direct access, integer indices only.

### 13. What is the space complexity of hash tables?
**Answer:** O(n) where n is number of key-value pairs stored.

### 14. When would you use a hash table?
**Answer:** Fast lookups, counting frequencies, caching, removing duplicates, quick membership testing.

### 15. How do you implement a hash table from scratch?
**Answer:** Array of buckets, hash function, collision resolution (chaining or open addressing), resize when needed.

### 16. What is linear probing?
**Answer:** On collision, check next slot (i+1, i+2, ...). Simple but causes clustering. Use when memory is concern. Wrap around at end.

### 17. What is quadratic probing?
**Answer:** On collision, try i + c1*j + c2*j^2. Reduces clustering vs linear. May not find slot if load factor high. Use for open addressing.

### 18. What is double hashing?
**Answer:** Second hash function for step size: h2(k). Probe at i + j*h2(k). Reduces clustering. Use when good hash available. Fewer collisions.

### 19. How do you choose hash table size?
**Answer:** Prime or power of 2; prime reduces clustering for modulo. Size > n for load factor. Resize when load factor > threshold (e.g. 0.75).

### 20. What is the difference between chaining and open addressing?
**Answer:** Chaining: store multiple at index (list). Open addressing: find next empty slot. Chaining handles more elements; open addressing less memory, no pointers.

### 21. When does hash table have O(n) worst case?
**Answer:** When all keys collide (same index) or bad hash. Use good hash and resize to keep load factor low. Denial of service if attacker knows hash.

### 22. What is a perfect hash function?
**Answer:** No collisions for given set of keys. Possible for static set. Use for known keys (e.g. keywords). Not for dynamic data.

### 23. How do you hash a string?
**Answer:** Polynomial rolling hash: sum of char * base^i mod prime. Or use built-in (e.g. Java hashCode). Use large prime to reduce collisions.

### 24. What is consistent hashing?
**Answer:** Keys and nodes on ring; key maps to next node clockwise. Add/remove node affects only neighbors. Use for distributed caches and DB sharding.

### 25. What is the difference between hash map and hash set?
**Answer:** Map stores key-value; Set stores keys only (no duplicates). Same underlying structure. Use Map for lookup by key; Set for membership.

### 26. How do you implement LRU cache with hash table?
**Answer:** Map for key -> node; doubly linked list for order. Get: move to front. Put: add to front; evict from back if over capacity. O(1) get/put.

### 27. What is rehashing?
**Answer:** When load factor exceeds threshold, create larger table, rehash all entries (new indices). Use to keep O(1) average. Typically double size.

### 28. What is the difference between Java HashMap and TreeMap?
**Answer:** HashMap: O(1) average; unordered. TreeMap: O(log n); sorted by key. Use HashMap for speed; TreeMap for order.

### 29. How do you count frequency with hash table?
**Answer:** Map key -> count; for each item map.set(key, (map.get(key)||0)+1). Use for histogram, mode, duplicate detection. O(n) time.

### 30. What is a bloom filter? How does it relate to hash?
**Answer:** Multiple hash functions; set bits in bit array. No false negatives; possible false positives. Use for set membership when space matters. Can't delete easily.

### 31. What is the difference between hash and cryptographic hash?
**Answer:** Hash: fast, for data structures; non-invertible. Cryptographic: slow, collision-resistant, avalanche. Use crypto for passwords; normal for hash table.

### 32. How do you handle hash for custom objects?
**Answer:** Implement hashCode (and equals). Combine hash of fields; use prime multiplier. Same fields => same hash. Use for key in map.

### 33. What is cuckoo hashing?
**Answer:** Two tables and two hash functions; on collision evict and re-insert evictee. May need rehash if cycle. Use for high load factor. O(1) lookup.

### 34. What is the load factor threshold for Java HashMap?
**Answer:** Default 0.75. When exceeded, table doubles and rehashes. Trade-off: lower = fewer collisions, more space. 0.75 is common default.

### 35. How do you find two numbers that sum to target using hash?
**Answer:** One pass: for each num check if (target - num) in set; add num to set. O(n) time and space. Same for indices: map value -> index.

### 36. What is the difference between unordered_map and map in C++?
**Answer:** unordered_map: hash, O(1) average. map: red-black tree, O(log n), ordered. Use unordered_map for speed; map for order.

### 37. How do you detect cycle in linked list with hash?
**Answer:** Store visited nodes in set; if node in set, cycle. O(n) time and space. Alternative: Floyd cycle (O(1) space).

### 38. What is the hash of an integer?
**Answer:** Often identity or modulo. Java: hashCode of Integer is value. Use modulo for index: k % m. m prime for better distribution.

### 39. How do you group anagrams with hash table?
**Answer:** Key = sorted string or character count; value = list of strings. Same key => anagrams. O(n * k log k) with sort; O(n*k) with count.

### 40. What is the difference between Python dict and set?
**Answer:** dict: key-value; set: keys only, unique. Both hash table. dict for lookup by key; set for membership and dedup.

### 41. How do you implement memoization with hash?
**Answer:** Cache: map args (or key) -> result. Before compute check cache; after compute store. Use for dynamic programming. Clear or limit size.

### 42. What is the avalanche effect in hash?
**Answer:** Small change in input causes large change in output. Desired for cryptographic hash. Reduces correlation. Not required for hash table.

### 43. How do you find first non-repeating character with hash?
**Answer:** One pass: count frequency in map. Second pass: first char with count 1. Or one pass with map char -> index, mark -1 if repeat. O(n).

### 44. What is the difference between hash table and trie?
**Answer:** Hash: O(1) average, exact key. Trie: O(k) for key length, prefix search. Use hash for exact; trie for prefixes and autocomplete.

### 45. How do you resize with minimal disruption?
**Answer:** Incremental rehashing: on each insert move one bucket from old to new. Or rehash in background. Use for real-time. Amortized O(1).

### 46. What is the birthday paradox in hashing?
**Answer:** With n slots, ~sqrt(n) items give 50% collision probability. Use to size table: want load factor well below 1. More slots than items.

### 47. How do you implement intersection of two sets with hash?
**Answer:** Put smaller set in hash set; iterate other, add to result if in set. O(n+m) time. Same for union (add all from both).

### 48. What is the difference between hash and B-tree?
**Answer:** Hash: O(1) average, no order. B-tree: O(log n), ordered, range queries. Use hash for point lookup; B-tree for range and order.

### 49. How do you find longest substring without repeat with hash?
**Answer:** Sliding window; map char -> index. When repeat, move left to max(left, map[char]+1). Update max length. O(n) time.

### 50. What is the FNV hash?
**Answer:** FNV-1a: multiply by prime, xor byte. Fast, good distribution. Use for non-crypto. Simple to implement.

### 51. How do you implement LFU cache with hash?
**Answer:** Map key -> (value, freq); map freq -> set of keys (or list); min freq. On get: increase freq, update min. On put: evict from min freq set. O(1) with careful structure.

### 52. What is the difference between hash and array for lookup?
**Answer:** Array: O(1) by integer index; dense. Hash: O(1) average by any key; sparse. Use array when key is small int; hash for arbitrary keys.

### 53. How do you count distinct elements with hash?
**Answer:** Add all to set; size is count. O(n) time. Or one pass with set. Use when you need count of unique.

### 54. What is the murmur hash?
**Answer:** Fast non-crypto hash; good distribution. Used in many libraries. Use for hash table. Not for security.

### 55. How do you find pair with given sum in unsorted array?
**Answer:** One pass: for each x check (sum - x) in set; add x to set. O(n) time. Return pair or indices. Same as two sum.

### 56. What is the difference between hash table and skip list?
**Answer:** Hash: O(1) average, no order. Skip list: O(log n), ordered. Use hash for lookup; skip list for ordered with simple implementation.

### 57. How do you implement hash with separate chaining?
**Answer:** Array of linked lists (or arrays). On insert: hash to index, append to list. On search: hash, linear search list. Resize when average chain length high.

### 58. What is the role of prime in hash function?
**Answer:** Using prime size or multiplier reduces clustering (modulo arithmetic). Better distribution. Use prime for table size and in polynomial hash.

### 59. How do you check if two arrays are equal (same elements)?
**Answer:** Count frequency in map for first; decrement for second. All counts zero => equal. O(n) time. Or sort and compare (O(n log n)).

### 60. What is the difference between hash set and bit set?
**Answer:** Hash set: any elements, O(1) average. Bit set: integers in range [0, N), one bit per value. Use bit set when keys are small integers.

### 61. How do you find subarray with zero sum?
**Answer:** Prefix sum in set; if prefix sum repeats, subarray between has sum 0. Include 0 for prefix from start. O(n) time.

### 62. What is the difference between hash and radix tree?
**Answer:** Hash: O(k) for key length, exact match. Radix: O(k), prefix and compact. Use hash for exact; radix for IP routing, prefixes.

### 63. How do you implement multiset (count) with hash?
**Answer:** Map key -> count. Add: increment. Remove: decrement (or remove if 0). Use for frequencies. Same as count map.

### 64. What is the difference between open addressing load factor and chaining?
**Answer:** Open addressing: load factor < 1 (can't exceed 1). Chaining: can exceed 1 (long chains). Resize when open addressing ~0.7; chaining when average chain > threshold.

### 65. How do you find longest consecutive sequence with hash?
**Answer:** Put all in set. For each num, if num-1 not in set expand (num+1, num+2...) and update max length. O(n) time.

### 66. What is the difference between hash and binary search tree?
**Answer:** Hash: O(1) average, no order. BST: O(log n), ordered. Use hash for lookup; BST for range queries and order.

### 67. How do you remove duplicates from array in-place with hash?
**Answer:** Set of seen; write index. For each element if not in set add to set and copy to write index, increment. O(n) time, O(n) space. In-place means O(1) extra? Then sort and dedup.

### 68. What is the difference between hash and array list?
**Answer:** Hash: key-value, O(1) access by key. ArrayList: index, O(1) by index, ordered. Use hash for key lookup; array for index and order.

### 69. How do you find all pairs with given sum?
**Answer:** One pass: map (sum - x) -> count or list of indices. For each x add count of (sum-x) to result; update map. Handle duplicate carefully. O(n).

### 70. What is the difference between hash and linked list?
**Answer:** Hash: O(1) lookup, no order. Linked list: O(n) search, order preserved. Use hash for lookup; list for order and insert order.

### 71. How do you implement cache with TTL using hash?
**Answer:** Map key -> { value, expiry }. On get check expiry; remove if expired. Or use dedicated cache (Redis). Cleanup expired periodically or lazy.

### 72. What is the difference between hash and stack?
**Answer:** Hash: key-value, random access. Stack: LIFO, no key access. Use hash for lookup; stack for undo, DFS. Different ADTs.

### 73. How do you find majority element with hash?
**Answer:** Count frequency; return key with count > n/2. O(n) time. Or Boyer-Moore O(1) space. Hash is straightforward.

### 74. What is the difference between hash and heap?
**Answer:** Hash: key-value, O(1) lookup. Heap: max/min at top, O(log n) insert/remove. Use hash for lookup; heap for priority, top-k.

### 75. How do you implement bidirectional map with two hash tables?
**Answer:** Map key -> value and value -> key. On insert/delete update both. Use when you need lookup both ways. O(1) each way.

### 76. What is the difference between hash and graph adjacency list?
**Answer:** Hash can store adjacency: node -> list of neighbors. Graph is structure; hash is implementation. Use hash for O(1) node lookup.

### 77. How do you find first repeating element with hash?
**Answer:** Map element -> first index (or count). Second pass or single pass: if seen and first repeat index not set, set. O(n) time.

### 78. What is the difference between hash and queue?
**Answer:** Hash: key-value. Queue: FIFO, no key. Use hash for lookup; queue for BFS, order. Different ADTs.

### 79. How do you implement union-find with path compression?
**Answer:** Parent array or map; find with path compression (point to root); union by rank. Not hash table per se; array or map for parent. O(α(n)).

### 80. What is the difference between hash and deque?
**Answer:** Hash: key-value. Deque: double-ended queue, no key. Use hash for lookup; deque for sliding window, BFS. Different ADTs.

### 81. How do you find two elements with minimum difference?
**Answer:** Sort then adjacent diff; or put in set, for each check neighbor. O(n log n) sort. Hash not directly; use for membership if needed.

### 82. What is the difference between hash and segment tree?
**Answer:** Hash: O(1) point lookup. Segment tree: O(log n) range query, updatable. Use hash for point; segment tree for range sum/min.

### 83. How do you count inversions with hash?
**Answer:** Not typical. Usually merge sort or BIT. Hash for index lookup: process from end, add to sorted structure, count smaller. Fenwick tree common.

### 84. What is the difference between hash and suffix array?
**Answer:** Hash: key-value. Suffix array: sorted suffixes, for string. Use hash for substring count; suffix array for pattern search in string.

### 85. How do you find k most frequent elements with hash?
**Answer:** Count frequency in map; bucket sort (freq -> list of elements); or heap of size k. O(n) with bucket; O(n log k) with heap.

### 86. What is the difference between hash and B+ tree?
**Answer:** Hash: O(1) point lookup. B+ tree: O(log n), range, disk-friendly. Use hash in memory; B+ tree for DB index.

### 87. How do you implement LRU with hash and doubly linked list?
**Answer:** Map key -> node; list for order (front = recent). Get: move to front. Put: add to front; if exists move to front; evict tail if over capacity. O(1).

### 88. What is the difference between hash and prefix sum?
**Answer:** Hash: key-value. Prefix sum: array of cumulative sum. Use hash for lookup; prefix sum for range sum in O(1) after preprocess.

### 89. How do you find if array has duplicate within k distance?
**Answer:** Sliding window of size k+1; set for window. For each new element if in set return true; add to set; remove element that left window. O(n).

### 90. What is the difference between hash and Fenwick tree?
**Answer:** Hash: O(1) point. Fenwick: O(log n) prefix sum and update. Use hash for lookup; Fenwick for prefix sum with updates.

### 91. How do you implement concurrent hash table?
**Answer:** Lock per bucket (striping) or lock-free with CAS. Reduce contention. Use for multi-threaded. Java ConcurrentHashMap.

### 92. What is the difference between hash and disjoint set?
**Answer:** Hash: key-value. Disjoint set: union-find, partitions. Use hash for general lookup; disjoint set for connectivity, components.

### 93. How do you find smallest window containing all chars of pattern?
**Answer:** Sliding window; map char -> count for pattern; match count. Expand right; when valid shrink left. Track min window. O(n) with hash for counts.

### 94. What is the difference between hash and trie for autocomplete?
**Answer:** Hash: exact key. Trie: prefix search, suggest. Use hash for exact; trie for prefix and autocomplete. Trie saves space for common prefix.

### 95. How do you implement hash with coalesced chaining?
**Answer:** Hybrid: open addressing but chain in overflow area. Combines benefits. Less common. Use when you want less clustering than linear.

### 96. What is the difference between hash and sorted array?
**Answer:** Hash: O(1) lookup, no order. Sorted array: O(log n) binary search, ordered. Use hash for lookup; sorted for range and order.

### 97. How do you find longest substring with at most k distinct chars?
**Answer:** Sliding window; map char -> count; when map size > k shrink from left. Track max length. O(n) with hash.

### 98. What is the difference between hash and priority queue?
**Answer:** Hash: O(1) lookup. PQ: O(log n) insert/extract-min. Use hash for lookup; PQ for Dijkstra, scheduling. Different operations.

### 99. How do you implement hash with robin hood hashing?
**Answer:** Open addressing; when probing if current element has traveled less than new, swap and continue. Reduces variance. Use for better worst case.

### 100. What is the difference between hash and suffix tree?
**Answer:** Hash: general key-value. Suffix tree: all suffixes of string, for pattern search. Use hash for substring count; suffix tree for complex string queries.

### 101. How do you find all anagrams in string?
**Answer:** Sliding window of pattern length; compare frequency map of window with pattern map. O(n) with fixed alphabet. Update map when sliding.

### 102. What is the difference between hash and AVL tree?
**Answer:** Hash: O(1) average. AVL: O(log n), balanced BST. Use hash for lookup; AVL for ordered with guaranteed height.

### 103. How do you implement hash that supports range query?
**Answer:** Hash alone doesn't; combine with sorted structure (e.g. skip list). Or use tree for range. Hash for point; tree for range.

### 104. What is the difference between hash and graph matrix?
**Answer:** Hash: adjacency as map. Matrix: n×n array. Use hash for sparse; matrix for dense, O(1) edge check. Different representations.

### 105. How do you find pair with sum closest to target?
**Answer:** Sort; two pointers. Or put in set; for each x binary search (target-x). Hash for membership in variant. O(n log n) with two pointers.

### 106. What is the difference between hash and red-black tree?
**Answer:** Hash: O(1) average. Red-black: O(log n), balanced BST. Use hash for lookup; red-black for ordered with guaranteed balance.

### 107. How do you implement hash with hopscotch hashing?
**Answer:** Open addressing; each bucket has neighborhood; on collision try to swap within neighborhood. Reduces clustering. Use for high load.

### 108. What is the difference between hash and counting sort?
**Answer:** Hash: key-value. Counting sort: use count array (like hash with integer key). Use counting sort when keys in small range; hash for arbitrary keys.

### 109. How do you find maximum subarray sum with hash?
**Answer:** Prefix sum; for each prefix find min prefix before it (in set or track min); max sum = current prefix - min prefix. Kadane is simpler; hash for variant.

### 110. What is the difference between hash and merge sort?
**Answer:** Hash: data structure. Merge sort: algorithm. Use hash for lookup; merge sort for sorting. Different purposes.

### 111. How do you implement hash with linear probing deletion?
**Answer:** Mark deleted (tombstone); on search skip tombstones; on insert reuse tombstone. Or rehash after delete. Tombstone avoids breaking probe chain.

### 112. What is the difference between hash and quick sort?
**Answer:** Hash: data structure. Quick sort: algorithm. Use hash for lookup; quick sort for in-place sort. Different purposes.

### 113. How do you find subarray with given sum?
**Answer:** Prefix sum in map (sum -> index). For each prefix if (prefix - target) in map, subarray exists. O(n). Handle prefix 0.

### 114. What is the difference between hash and insertion sort?
**Answer:** Hash: data structure. Insertion sort: algorithm. Use hash for lookup; insertion sort for small or nearly sorted. Different purposes.

### 115. How do you implement hash with quadratic probing deletion?
**Answer:** Same as linear: tombstone or rehash. Quadratic probing: harder to find element (probe sequence). Rehash on delete is simpler.

### 116. What is the difference between hash and selection sort?
**Answer:** Hash: data structure. Selection sort: algorithm. Use hash for lookup; selection for teaching or small n. Different purposes.

### 117. How do you find longest substring with no repeat?
**Answer:** Sliding window; map char -> index. When repeat, left = max(left, map[char]+1). Update max length. O(n). Same as Q49.

### 118. What is the difference between hash and heap sort?
**Answer:** Hash: data structure. Heap sort: algorithm. Use hash for lookup; heap sort for in-place O(n log n). Different purposes.

### 119. How do you implement hash with double hashing deletion?
**Answer:** Tombstone or rehash. Double hashing: two hash functions. On delete mark tombstone; on search continue probe; on insert use tombstone. Rehash avoids tombstones.

### 120. What is the difference between hash and radix sort?
**Answer:** Hash: data structure. Radix sort: algorithm (by digit). Use hash for lookup; radix sort for fixed-length keys (e.g. integers). Different purposes.
