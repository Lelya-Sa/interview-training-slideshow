# Maximum Product of Two Numbers

## Problem
Given an integer array nums, find the maximum product of two distinct numbers in the array.

## Examples
```
Input: nums = [3, 4, 5, 2]
Output: 20 (4 * 5)

Input: nums = [-10, -3, 5, 6, -2]
Output: 30 (-10 * -3)

Input: nums = [1, 5, 4, 5]
Output: 25 (5 * 5)
```

## Approach
1. **Sort**: Sort array, compare product of two largest vs two smallest
2. **Single Pass**: Track two largest and two smallest numbers
3. **Brute Force**: Check all pairs

## Solution

### JavaScript
```javascript
function maxProduct(nums) {
    // Find two largest and two smallest
    let max1 = -Infinity, max2 = -Infinity;
    let min1 = Infinity, min2 = Infinity;
    
    for (const num of nums) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
        
        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }
    }
    
    return Math.max(max1 * max2, min1 * min2);
}

// Sorting approach
function maxProductSort(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    return Math.max(
        nums[0] * nums[1],      // Two smallest (if negative)
        nums[n-1] * nums[n-2]   // Two largest
    );
}
```

### Python
```python
def max_product(nums):
    max1 = max2 = float('-inf')
    min1 = min2 = float('inf')
    
    for num in nums:
        if num > max1:
            max2, max1 = max1, num
        elif num > max2:
            max2 = num
        
        if num < min1:
            min2, min1 = min1, num
        elif num < min2:
            min2 = num
    
    return max(max1 * max2, min1 * min2)
```

## Complexity
- **Time**: O(n) for single pass, O(n log n) for sorting
- **Space**: O(1)

## Follow-up
- Maximum product of three numbers?
- Maximum product subarray?
- Count pairs with product > target?

