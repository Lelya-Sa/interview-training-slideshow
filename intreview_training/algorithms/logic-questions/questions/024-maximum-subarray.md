# Maximum Subarray (Kadane's Algorithm)

## Problem
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

## Examples
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6 (subarray [4,-1,2,1])

Input: nums = [1]
Output: 1

Input: nums = [5,4,-1,7,8]
Output: 23
```

## Approach
1. **Kadane's Algorithm**: Track maximum sum ending at current position
2. **Divide and Conquer**: Split array, find max in left, right, and crossing
3. **Dynamic Programming**: dp[i] = max(nums[i], dp[i-1] + nums[i])

## Solution

### JavaScript
```javascript
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Return subarray indices
function maxSubArrayWithIndices(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (maxEndingHere < 0) {
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            maxEndingHere += nums[i];
        }
        
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return { sum: maxSoFar, start, end };
}
```

### Python
```python
def max_sub_array(nums):
    max_so_far = max_ending_here = nums[0]
    
    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far
```

## Complexity
- **Time**: O(n)
- **Space**: O(1)

## Follow-up
- Maximum product subarray?
- Maximum sum circular subarray?
- Maximum sum of k non-overlapping subarrays?

