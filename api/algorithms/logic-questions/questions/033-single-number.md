# Single Number

## Problem
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

## Examples
```
Input: nums = [2,2,1]
Output: 1

Input: nums = [4,1,2,1,2]
Output: 4

Input: nums = [1]
Output: 1
```

## Approach
1. **XOR**: XOR all numbers, duplicates cancel out
2. **HashMap**: Count frequencies
3. **Math**: 2 * (sum of unique) - sum of all

## Solution

### JavaScript
```javascript
// XOR approach (O(1) space)
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}

// HashMap approach
function singleNumberHashMap(nums) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    for (const [num, count] of map) {
        if (count === 1) return num;
    }
}
```

### Python
```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for XOR, O(n) for HashMap

## Follow-up
- Single Number II (every element appears 3 times)?
- Single Number III (two unique numbers)?
- Single number in stream?

