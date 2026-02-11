# Power of Three

## Problem
Given an integer n, return true if it is a power of three. Otherwise, return false. An integer n is a power of three if there exists an integer x such that n == 3ˣ.

## Examples
```
Input: n = 27
Output: true (3³ = 27)

Input: n = 0
Output: false

Input: n = 9
Output: true (3² = 9)
```

## Approach
1. **Division**: Keep dividing by 3 until 1 or not divisible
2. **Logarithm**: Check if log₃(n) is integer
3. **Modulo**: For 32-bit integers, check if 3¹⁹ % n == 0
4. **Recursion**: Recursively divide by 3

## Solution

### JavaScript
```javascript
function isPowerOfThree(n) {
    if (n <= 0) return false;
    
    while (n % 3 === 0) {
        n /= 3;
    }
    
    return n === 1;
}

// Logarithm approach
function isPowerOfThreeLog(n) {
    if (n <= 0) return false;
    const log = Math.log(n) / Math.log(3);
    return Math.abs(log - Math.round(log)) < 1e-10;
}

// Modulo approach (for 32-bit integers)
function isPowerOfThreeMod(n) {
    return n > 0 && Math.pow(3, 19) % n === 0;
}
```

### Python
```python
def is_power_of_three(n):
    if n <= 0:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1

def is_power_of_three_log(n):
    if n <= 0:
        return False
    import math
    log = math.log(n, 3)
    return abs(log - round(log)) < 1e-10
```

## Complexity
- **Time**: O(log₃(n))
- **Space**: O(1)

## Follow-up
- Power of four?
- Power of any number k?
- Count powers of three in range?

