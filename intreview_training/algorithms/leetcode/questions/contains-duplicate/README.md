# Contains Duplicate - LeetCode 217

## Problem Description

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Example

```
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## Approach

Use a HashSet to track seen numbers:
- If number already in set, return true
- Otherwise, add to set
- If loop completes, return false

## Time Complexity
- O(n) - single pass

## Space Complexity
- O(n) - HashSet storage

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
containsDuplicate([1, 2, 3, 1]);  // true
containsDuplicate([1, 2, 3, 4]); // false
```
