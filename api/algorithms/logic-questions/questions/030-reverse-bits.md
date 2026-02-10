# Reverse Bits

## Problem
Reverse bits of a given 32 bits unsigned integer.

## Examples
```
Input: n = 00000010100101000001111010011100
Output: 964176192 (00111001011110000010100101000000)

Input: n = 11111111111111111111111111111101
Output: 3221225471
```

## Approach
1. **Bit Manipulation**: Extract bits one by one, build reversed
2. **Divide and Conquer**: Swap halves recursively
3. **Lookup Table**: Precompute reversed bytes

## Solution

### JavaScript
```javascript
function reverseBits(n) {
    let result = 0;
    
    for (let i = 0; i < 32; i++) {
        // Extract bit from right
        const bit = (n >> i) & 1;
        // Place bit at reversed position
        result |= (bit << (31 - i));
    }
    
    return result >>> 0; // Convert to unsigned 32-bit
}

// Alternative: Build from left
function reverseBitsAlt(n) {
    let result = 0;
    
    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result |= n & 1;
        n >>= 1;
    }
    
    return result >>> 0;
}
```

### Python
```python
def reverse_bits(n):
    result = 0
    for i in range(32):
        bit = (n >> i) & 1
        result |= (bit << (31 - i))
    return result

def reverse_bits_alt(n):
    result = 0
    for i in range(32):
        result <<= 1
        result |= n & 1
        n >>= 1
    return result
```

## Complexity
- **Time**: O(1) - always 32 iterations
- **Space**: O(1)

## Follow-up
- Reverse bits of 64-bit integer?
- Reverse bytes in integer?
- Count bits to reverse?

