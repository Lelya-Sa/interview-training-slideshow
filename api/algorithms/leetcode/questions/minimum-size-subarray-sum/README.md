# Minimum Size Subarray Sum - LeetCode 209

## Problem Statement
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. If there is no such subarray, return 0.

## Examples

**Example 1:**
```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

**Example 2:**
```
Input: target = 4, nums = [1,4,4]
Output: 1
```

**Example 3:**
```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

## Approach
Use sliding window technique:
1. Expand window by moving right pointer
2. When sum >= target, try to shrink window from left
3. Track minimum window size

## Complexity
- **Time Complexity**: O(n) - each element visited at most twice
- **Space Complexity**: O(1) - constant extra space

## Key Points
- Sliding window with variable size
- Expand and shrink window dynamically
- Track minimum valid window size
