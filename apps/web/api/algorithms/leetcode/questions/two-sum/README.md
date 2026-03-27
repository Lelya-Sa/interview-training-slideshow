# Two Sum - LeetCode Problem 1

## Problem Description

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Example

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Input: nums = [3,2,4], target = 6
Output: [1,2]

Input: nums = [3,3], target = 6
Output: [0,1]
```

## Approach

Use a HashMap to store each number and its index as we iterate:
- For each number, check if `target - number` exists in the map
- If found, return the indices
- Otherwise, add current number to map

## Time Complexity
- O(n) - single pass through array

## Space Complexity
- O(n) - HashMap storage

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
twoSum([2, 7, 11, 15], 9);  // [0, 1]
twoSum([3, 2, 4], 6);       // [1, 2]
twoSum([3, 3], 6);          // [0, 1]
```
