# Power of Two

## Problem
Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists an integer x such that n == 2ˣ.

## Examples
```
Input: n = 1
Output: true (2⁰ = 1)

Input: n = 16
Output: true (2⁴ = 16)

Input: n = 3
Output: false

Input: n = 0
Output: false
```

## Approach
1. **Bit Manipulation**: n & (n-1) == 0 (power of 2 has only one bit set)
2. **Division**: Keep dividing by 2 until 1 or odd number
3. **Logarithm**: Check if log₂(n) is integer

## Solution

### JavaScript
```javascript
function isPowerOfTwo(n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
}

// Alternative: Division approach
function isPowerOfTwoDivision(n) {
    if (n <= 0) return false;
    while (n % 2 === 0) {
        n /= 2;
    }
    return n === 1;
}
```

### Python
```python
def is_power_of_two(n):
    if n <= 0:
        return False
    return (n & (n - 1)) == 0

def is_power_of_two_division(n):
    if n <= 0:
        return False
    while n % 2 == 0:
        n //= 2
    return n == 1
```

## Complexity
- **Time**: O(1) for bit manipulation, O(log n) for division
- **Space**: O(1)

## Follow-up
- Check if power of three?
- Check if power of four?
- Find next power of two greater than n?

