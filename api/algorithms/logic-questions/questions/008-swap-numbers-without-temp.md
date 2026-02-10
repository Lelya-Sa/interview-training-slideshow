# Swap Two Numbers Without Temporary Variable

## Problem
Swap two numbers without using a temporary variable.

## Examples
```
Input: a = 5, b = 10
Output: a = 10, b = 5

Input: a = -3, b = 7
Output: a = 7, b = -3
```

## Approach
1. **Arithmetic**: a = a + b; b = a - b; a = a - b
2. **XOR**: a = a ^ b; b = a ^ b; a = a ^ b
3. **Multiplication/Division**: a = a * b; b = a / b; a = a / b (risky with overflow/zero)

## Solution

### JavaScript
```javascript
// Arithmetic method
function swapArithmetic(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b];
}

// XOR method (works with integers)
function swapXOR(a, b) {
    a = a ^ b;
    b = a ^ b; // b = (a ^ b) ^ b = a
    a = a ^ b; // a = (a ^ b) ^ a = b
    return [a, b];
}

// ES6 destructuring (uses temp internally)
function swapDestructure(a, b) {
    [a, b] = [b, a];
    return [a, b];
}
```

### Python
```python
# Arithmetic
def swap_arithmetic(a, b):
    a = a + b
    b = a - b
    a = a - b
    return a, b

# XOR
def swap_xor(a, b):
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b

# Python tuple swap
def swap_python(a, b):
    a, b = b, a
    return a, b
```

## Complexity
- **Time**: O(1)
- **Space**: O(1)

## Follow-up
- Swap elements in array at indices i and j?
- Swap nodes in linked list?
- When would XOR method fail?

