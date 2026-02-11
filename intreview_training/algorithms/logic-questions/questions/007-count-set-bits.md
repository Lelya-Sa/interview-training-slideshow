# Count Set Bits (Hamming Weight)

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
1. **n & (n-1)**: Removes rightmost set bit, count until n becomes 0
2. **Right Shift**: Check each bit by right shifting
3. **Built-in**: Use language's built-in popcount function

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

// Alternative: Right shift approach
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
        n &= n - 1  # Remove rightmost set bit
        count += 1
    return count

def hamming_weight_builtin(n):
    return bin(n).count('1')
```

## Complexity
- **Time**: O(k) where k is number of set bits (optimal), O(log n) for shift
- **Space**: O(1)

## Follow-up
- Count set bits for all numbers from 0 to n?
- Find position of rightmost set bit?
- Count total set bits in range [a, b]?

