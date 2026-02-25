# Maximum Sum Subarray of Size K - Sliding Window

## Problem Statement
Given an array of integers `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.

## Examples

**Example 1:**
```
Input: nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
Explanation: Subarray [5, 1, 3] has the maximum sum of 9.
```

**Example 2:**
```
Input: nums = [2, 3, 4, 1, 5], k = 2
Output: 7
Explanation: Subarray [3, 4] has the maximum sum of 7.
```

## Approach
Use sliding window technique:
1. Calculate sum of first window of size k
2. Slide window by one element at a time
3. Remove leftmost element and add rightmost element
4. Track maximum sum seen so far

## Complexity
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(1) - constant extra space

## Key Points
- Sliding window pattern
- Fixed window size
- Efficient O(n) solution
