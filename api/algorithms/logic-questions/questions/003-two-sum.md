# Two Sum

## Problem
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.

## Examples
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Input: nums = [3, 3], target = 6
Output: [0, 1]
```

## Approach
1. **Brute Force**: Check all pairs - O(n²)
2. **HashMap**: Store complement (target - num) as we iterate - O(n)
3. **Two Pointers**: Sort array, use two pointers (if indices not needed)

## Solution

### JavaScript
```javascript
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
```

### Python
```python
def two_sum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i
```

## Complexity
- **Time**: O(n)
- **Space**: O(n)

## Follow-up
- What if array is sorted?
- What if we need to return all pairs?
- What if we need to return values instead of indices?

