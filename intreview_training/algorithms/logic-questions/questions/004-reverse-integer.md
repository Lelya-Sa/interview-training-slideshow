# Reverse Integer

## Problem
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

## Examples
```
Input: x = 123
Output: 321

Input: x = -123
Output: -321

Input: x = 120
Output: 21

Input: x = 0
Output: 0
```

## Approach
1. Extract last digit using modulo 10
2. Add to result (multiply result by 10 first)
3. Divide number by 10
4. Check for overflow before adding next digit

## Solution

### JavaScript
```javascript
function reverse(x) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    let reversed = 0;
    
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        
        // Check overflow before multiplying
        if (reversed > INT_MAX / 10 || 
            (reversed === Math.floor(INT_MAX / 10) && digit > 7)) {
            return 0;
        }
        if (reversed < INT_MIN / 10 || 
            (reversed === Math.ceil(INT_MIN / 10) && digit < -8)) {
            return 0;
        }
        
        reversed = reversed * 10 + digit;
    }
    
    return reversed;
}
```

### Python
```python
def reverse(x):
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    
    reversed_num = 0
    sign = 1 if x >= 0 else -1
    x = abs(x)
    
    while x != 0:
        digit = x % 10
        x //= 10
        
        # Check overflow
        if reversed_num > INT_MAX // 10:
            return 0
        
        reversed_num = reversed_num * 10 + digit
    
    return sign * reversed_num
```

## Complexity
- **Time**: O(log₁₀(x)) - number of digits
- **Space**: O(1)

## Follow-up
- Reverse a string instead?
- Reverse only part of the number?
- Handle floating point numbers?

