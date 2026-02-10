# Number of 1 Bits

## Problem
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

## Examples
```
Input: n = 11 (binary: 1011)
Output: 3

Input: n = 128 (binary: 10000000)
Output: 1

Input: n = 4294967293 (binary: 11111111111111111111111111111101)
Output: 31
```

## Approach
1. **n & (n-1)**: Removes rightmost set bit
2. **Right Shift**: Check each bit
3. **Built-in**: Use language's popcount

## Solution

### JavaScript
```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1); // Remove rightmost set bit
        count++;
    }
    return count;
}

// Right shift approach
function hammingWeightShift(n) {
    let count = 0;
    while (n !== 0) {
        if (n & 1) count++;
        n = n >>> 1; // Unsigned right shift
    }
    return count;
}
```

### Python
```python
def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count

def hamming_weight_builtin(n):
    return bin(n).count('1')
```

## Complexity
- **Time**: O(k) where k is number of set bits
- **Space**: O(1)

## Follow-up
- Count set bits for all numbers 0 to n?
- Find position of rightmost set bit?
- Count total set bits in range?

