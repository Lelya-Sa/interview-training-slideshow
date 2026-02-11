# Move Zeroes - LeetCode 283

## Problem Statement
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note**: You must do this in-place without making a copy of the array.

## Examples

**Example 1:**
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Example 2:**
```
Input: nums = [0]
Output: [0]
```

## Approach
Use two pointers technique:
1. Use `insertPos` to track where to insert non-zero elements
2. Iterate through array, when we find non-zero element, place it at `insertPos`
3. Fill remaining positions with zeros

## Complexity
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(1) - in-place modification

## Key Points
- Two pointers pattern
- In-place array modification
- Maintains relative order
