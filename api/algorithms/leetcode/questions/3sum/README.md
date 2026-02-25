# 3Sum - LeetCode 15

## Problem Description

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

## Example

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

## Approach

### Two Pointers Technique:
1. Sort the array
2. Fix first number with a loop
3. Use two pointers (left, right) for remaining two numbers
4. If sum < 0, move left pointer right
5. If sum > 0, move right pointer left
6. If sum == 0, add to result and skip duplicates
7. Skip duplicates for first number as well

### Key Insight:
- Sorting allows us to use two pointers
- Skip duplicates to avoid duplicate triplets
- Time complexity: O(n²) after sorting

## Time Complexity
- O(n²) where n is array length
- Sorting: O(n log n)
- Two pointers: O(n²)

## Space Complexity
- O(1) excluding output array
- O(n) for output array

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

