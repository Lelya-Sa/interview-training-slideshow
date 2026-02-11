# Rotate Array

## Problem
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

## Examples
```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]

Input: nums = [-1,-100,3,99], k = 3
Output: [3,99,-1,-100]
```

## Approach
1. **Reverse Method**: Reverse entire array, reverse first k, reverse rest
2. **Extra Array**: Copy to new array with shifted indices
3. **Cyclic Replacements**: Move elements in cycles

## Solution

### JavaScript
```javascript
// Reverse method (O(1) space)
function rotate(nums, k) {
    k = k % nums.length; // Handle k > array length
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

// Extra array approach
function rotateExtraArray(nums, k) {
    const n = nums.length;
    k = k % n;
    const rotated = new Array(n);
    
    for (let i = 0; i < n; i++) {
        rotated[(i + k) % n] = nums[i];
    }
    
    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}
```

### Python
```python
def rotate(nums, k):
    k = k % len(nums)
    
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    reverse(0, len(nums) - 1)
    reverse(0, k - 1)
    reverse(k, len(nums) - 1)
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for reverse method, O(n) for extra array

## Follow-up
- Rotate left instead of right?
- Rotate 2D matrix?
- Rotate linked list?

