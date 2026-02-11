# Missing Number in Range

## Problem
Given an array containing n distinct numbers in the range [0, n], find the one number that is missing from the array.

## Examples
```
Input: nums = [3,0,1]
Output: 2

Input: nums = [0,1]
Output: 2

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
```

## Approach
1. **Sum Formula**: Expected sum - actual sum
2. **XOR**: XOR all numbers 0 to n with array elements
3. **Sorting**: Sort and find gap
4. **HashSet**: Store in set, find missing

## Solution

### JavaScript
```javascript
// Sum approach
function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}

// XOR approach
function missingNumberXOR(nums) {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
}
```

### Python
```python
def missing_number(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

def missing_number_xor(nums):
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing
```

## Complexity
- **Time**: O(n)
- **Space**: O(1)

## Follow-up
- Multiple missing numbers?
- Missing number in range [1, n]?
- Missing number in sorted array?

