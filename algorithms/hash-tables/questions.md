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

