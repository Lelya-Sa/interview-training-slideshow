# Maximum Subarray (Kadane's Algorithm) - LeetCode 53

## Problem Description

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

## Example

```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Input: nums = [1]
Output: 1

Input: nums = [5,4,-1,7,8]
Output: 23
```

## Approach

Kadane's Algorithm:
- Track maximum sum ending at current position
- If current sum becomes negative, reset to 0
- Update global maximum at each step

## Time Complexity
- O(n) - single pass

## Space Complexity
- O(1) - constant space

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
maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);  // 6
maxSubArray([1]);                               // 1
maxSubArray([5, 4, -1, 7, 8]);                  // 23
```
