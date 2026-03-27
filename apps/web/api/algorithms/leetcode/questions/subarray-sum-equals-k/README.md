# Subarray Sum Equals K - LeetCode 560

## Problem Statement
Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.

## Examples

**Example 1:**
```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: The subarrays [1,1] and [1,1] sum to 2.
```

**Example 2:**
```
Input: nums = [1,2,3], k = 3
Output: 2
Explanation: The subarrays [1,2] and [3] sum to 3.
```

## Approach
Use prefix sum with hash map:
1. Keep track of cumulative sum and count occurrences
2. For each element, check if (sum - k) exists in map
3. If exists, add its count to result
4. Update map with current sum

## Complexity
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(n) - hash map

## Key Points
- Prefix sum technique
- Hash map for counting
- Handle edge case when sum equals k exactly
