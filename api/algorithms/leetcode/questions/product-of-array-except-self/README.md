# Product of Array Except Self - LeetCode 238

## Problem Description

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operator.

## Example

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

## Approach

Two-pass approach:
- First pass: Calculate left products (product of all elements to the left)
- Second pass: Calculate right products and multiply with left products

## Time Complexity
- O(n) - two passes

## Space Complexity
- O(1) - output array doesn't count as extra space

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
productExceptSelf([1, 2, 3, 4]);        // [24, 12, 8, 6]
productExceptSelf([-1, 1, 0, -3, 3]);   // [0, 0, 9, 0, 0]
```
