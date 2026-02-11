# Climbing Stairs

## Problem
You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples
```
Input: n = 2
Output: 2 (1+1 or 2)

Input: n = 3
Output: 3 (1+1+1, 1+2, 2+1)

Input: n = 4
Output: 5
```

## Approach
1. **Dynamic Programming**: dp[i] = dp[i-1] + dp[i-2] (Fibonacci)
2. **Memoization**: Recursive with memo
3. **Space Optimized**: Use two variables instead of array

## Solution

### JavaScript
```javascript
// DP approach
function climbStairs(n) {
    if (n <= 2) return n;
    
    const dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// Space optimized
function climbStairsOptimized(n) {
    if (n <= 2) return n;
    
    let first = 1;
    let second = 2;
    
    for (let i = 3; i <= n; i++) {
        const third = first + second;
        first = second;
        second = third;
    }
    
    return second;
}

// Memoization
function climbStairsMemo(n, memo = {}) {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = climbStairsMemo(n-1, memo) + climbStairsMemo(n-2, memo);
    return memo[n];
}
```

### Python
```python
def climb_stairs(n):
    if n <= 2:
        return n
    
    first, second = 1, 2
    for i in range(3, n + 1):
        third = first + second
        first, second = second, third
    
    return second

def climb_stairs_dp(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for optimized, O(n) for DP array

## Follow-up
- Climb stairs with k steps allowed (1, 2, ..., k)?
- Climb stairs with cost per step?
- Climb stairs with obstacles?

