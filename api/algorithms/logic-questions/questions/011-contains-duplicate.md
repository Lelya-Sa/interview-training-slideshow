# Contains Duplicate

## Problem
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

## Examples
```
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## Approach
1. **HashSet**: Add to set, check if already exists
2. **Sorting**: Sort array, check adjacent elements
3. **Set Size**: Compare set size with array length

## Solution

### JavaScript
```javascript
function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}

// Alternative: Compare sizes
function containsDuplicateSize(nums) {
    return new Set(nums).size !== nums.length;
}

// Sorting approach
function containsDuplicateSort(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return true;
        }
    }
    return false;
}
```

### Python
```python
def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

def contains_duplicate_size(nums):
    return len(set(nums)) != len(nums)
```

## Complexity
- **Time**: O(n) for HashSet, O(n log n) for sorting
- **Space**: O(n) for HashSet, O(1) for sorting (if in-place)

## Follow-up
- Find all duplicates?
- Find duplicate within k distance?
- Find duplicate number (array has n+1 elements, range 1 to n)?

