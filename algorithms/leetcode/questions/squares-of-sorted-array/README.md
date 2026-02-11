# Squares of a Sorted Array - LeetCode 977

## Problem Statement
Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

## Examples

**Example 1:**
```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
```

**Example 2:**
```
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
```

## Approach
Use two pointers technique:
1. Compare absolute values from both ends
2. Square the larger absolute value and place it at the end
3. Move pointer inward and repeat

## Complexity
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(n) - result array

## Key Points
- Two pointers from both ends
- Compare absolute values
- Handle negative numbers properly
