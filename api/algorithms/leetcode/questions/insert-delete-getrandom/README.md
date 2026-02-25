# Insert Delete GetRandom O(1) - LeetCode Problem

## Problem Description

Design a data structure that supports all following operations in average O(1) time.

1. `insert(val)`: Inserts an item val to the set if not already present.
2. `remove(val)`: Removes an item val from the set if present.
3. `getRandom()`: Returns a random element from current set of elements. Each element must have the same probability of being returned.

## Example

```
// Init an empty set.
RandomizedSet randomSet = new RandomizedSet();

// Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomSet.insert(1);

// Returns false as 2 does not exist in the set.
randomSet.remove(2);

// Inserts 2 to the set, returns true. Set now contains [1,2].
randomSet.insert(2);

// getRandom should return either 1 or 2 randomly.
randomSet.getRandom();

// Removes 1 from the set, returns true. Set now contains [2].
randomSet.remove(1);

// 2 was already in the set, so return false.
randomSet.insert(2);

// Since 2 is the only number in the set, getRandom always return 2.
randomSet.getRandom();
```

## Approach

To achieve O(1) for all operations with uniform random distribution:

### Data Structures:
- **HashMap** (`value -> index`): O(1) lookup for insert/remove checks
- **Array**: O(1) random access for `getRandom()`

### Key Insight:
- `getRandom()` requires uniform distribution, so we need O(1) random access
- Array provides O(1) random access by index
- HashMap provides O(1) existence check and index lookup

### Insert Operation:
1. Check if value exists in HashMap → O(1)
2. If not, add to array and store index in HashMap → O(1)

### Remove Operation:
1. Find index of value to remove using HashMap → O(1)
2. Swap with last element in array → O(1)
3. Update HashMap with new index → O(1)
4. Remove last element from array → O(1)

### GetRandom Operation:
1. Generate random index from 0 to array.length-1 → O(1)
2. Return element at that index → O(1)
3. **Uniform distribution**: Each element has equal probability (1/n)

## Time Complexity
- `insert()`: O(1) average
- `remove()`: O(1) average
- `getRandom()`: O(1)

## Space Complexity
- O(n) where n is number of elements

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

## Code Example

```javascript
const randomSet = new RandomizedSet();

randomSet.insert(1);  // true
randomSet.insert(2);  // true
randomSet.insert(3);  // true

randomSet.getRandom();  // Returns 1, 2, or 3 with equal probability

randomSet.remove(2);  // true
randomSet.getRandom();  // Returns 1 or 3 with equal probability
```

## Testing Uniform Distribution

To verify uniform distribution, call `getRandom()` many times and count occurrences:

```javascript
const counts = {};
for (let i = 0; i < 10000; i++) {
  const val = randomSet.getRandom();
  counts[val] = (counts[val] || 0) + 1;
}
// Each value should appear approximately 1/n of the time
```
