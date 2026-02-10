# Counting Bits

## Problem
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

## Examples
```
Input: n = 2
Output: [0,1,1]
0 --> 0 (0 ones)
1 --> 1 (1 one)
2 --> 10 (1 one)

Input: n = 5
Output: [0,1,1,2,1,2]
```

## Approach
1. **DP with Last Set Bit**: ans[i] = ans[i & (i-1)] + 1
2. **DP with Right Shift**: ans[i] = ans[i >> 1] + (i & 1)
3. **Brute Force**: Count bits for each number individually

## Solution

### JavaScript
```javascript
// DP approach
function countBits(n) {
    const ans = [0];
    
    for (let i = 1; i <= n; i++) {
        // Remove rightmost set bit, add 1
        ans[i] = ans[i & (i - 1)] + 1;
    }
    
    return ans;
}

// Alternative: Right shift
function countBitsShift(n) {
    const ans = [0];
    
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    
    return ans;
}
```

### Python
```python
def count_bits(n):
    ans = [0]
    for i in range(1, n + 1):
        ans.append(ans[i & (i - 1)] + 1)
    return ans

def count_bits_shift(n):
    ans = [0]
    for i in range(1, n + 1):
        ans.append(ans[i >> 1] + (i & 1))
    return ans
```

## Complexity
- **Time**: O(n)
- **Space**: O(n)

## Follow-up
- Count bits for specific range [a, b]?
- Count bits in 2D array?
- Optimize for sparse ranges?

