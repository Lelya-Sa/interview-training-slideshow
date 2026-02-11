# House Robber

## Problem
You are a robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

## Examples
```
Input: nums = [2,7,9,3,1]
Output: 12 (rob houses 0, 2, 4: 2 + 9 + 1)

Input: nums = [1,2,3,1]
Output: 4 (rob houses 0, 2: 1 + 3)
```

## Approach
1. **Dynamic Programming**: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
2. **Space Optimized**: Use two variables instead of array
3. **Memoization**: Recursive with memo

## Solution

### JavaScript
```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

// Space optimized
function robOptimized(nums) {
    let prev2 = 0;  // dp[i-2]
    let prev1 = 0;  // dp[i-1]
    
    for (const num of nums) {
        const temp = prev1;
        prev1 = Math.max(prev1, prev2 + num);
        prev2 = temp;
    }
    
    return prev1;
}
```

### Python
```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
    
    return prev1
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for optimized, O(n) for DP array

## Follow-up
- House Robber II (circular street)?
- House Robber III (binary tree)?
- Maximum profit with k transactions?

