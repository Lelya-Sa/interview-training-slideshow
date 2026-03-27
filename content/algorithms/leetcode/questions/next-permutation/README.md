# Next Permutation - LeetCode 31

## Problem Statement
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: [1,3,2]
```

**Example 2:**
```
Input: nums = [3,2,1]
Output: [1,2,3]
Explanation: No greater permutation, so rearrange as lowest.
```

**Example 3:**
```
Input: nums = [1,1,5]
Output: [1,5,1]
```

## Approach
1. Find the largest index i where nums[i] < nums[i+1]
2. Find the largest index j where j > i and nums[j] > nums[i]
3. Swap nums[i] and nums[j]
4. Reverse the suffix starting at i+1

## Complexity
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(1) - in-place modification

## Key Points
- Two-pass algorithm
- In-place modification
- Handle edge case when array is in descending order
