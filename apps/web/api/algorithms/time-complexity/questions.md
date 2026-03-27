# Time Complexity - Interview Questions

## Questions (1-15)

### 1. What is Big O notation?
**Answer:** Mathematical notation describing algorithm's time/space complexity as input size grows.

### 2. Explain O(1), O(n), O(log n), O(n²).
**Answer:**
- O(1): Constant time
- O(n): Linear time
- O(log n): Logarithmic time
- O(n²): Quadratic time

### 3. What is the time complexity of array access by index?
**Answer:** O(1) - constant time, direct memory access.

### 4. What is the time complexity of linear search?
**Answer:** O(n) - must check each element in worst case.

### 5. What is the time complexity of binary search?
**Answer:** O(log n) - eliminates half of elements each iteration.

### 6. What is the time complexity of bubble sort?
**Answer:** O(n²) - nested loops comparing all pairs.

### 7. What is the time complexity of merge sort?
**Answer:** O(n log n) - divide and conquer, log n levels, n work per level.

### 8. What is the time complexity of hash table lookup?
**Answer:** O(1) average case, O(n) worst case (all collisions).

### 9. What is the difference between time and space complexity?
**Answer:** Time complexity measures runtime, space complexity measures memory usage.

### 10. What is the time complexity of finding an element in a sorted array?
**Answer:** O(log n) using binary search, O(n) using linear search.

### 11. What is the time complexity of inserting at the beginning of an array?
**Answer:** O(n) - must shift all elements.

### 12. What is the time complexity of inserting at the end of an array?
**Answer:** O(1) amortized - direct insertion, O(n) if array needs resizing.

### 13. Explain amortized time complexity.
**Answer:** Average time over sequence of operations. Some operations may be expensive but average is good.

### 14. What is the time complexity of recursive Fibonacci (naive)?
**Answer:** O(2ⁿ) - exponential, recalculates same values.

### 15. How do you optimize time complexity?
**Answer:** Use better data structures, algorithms, caching, memoization, avoid nested loops when possible.

