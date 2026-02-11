# Palindrome Number

## Problem
Given an integer x, return true if x is a palindrome integer. An integer is a palindrome when it reads the same backward as forward.

## Examples
```
Input: x = 121
Output: true

Input: x = -121
Output: false (reads 121- from right to left)

Input: x = 10
Output: false

Input: x = -101
Output: false
```

## Approach
1. **String Conversion**: Convert to string, compare with reverse
2. **Reverse Number**: Reverse half the number, compare with other half
3. **Extract Digits**: Compare digits from both ends

## Solution

### JavaScript
```javascript
// Without converting to string
function isPalindrome(x) {
    if (x < 0 || (x !== 0 && x % 10 === 0)) {
        return false;
    }
    
    let reversed = 0;
    let original = x;
    
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // For even digits: x === reversed
    // For odd digits: x === Math.floor(reversed / 10)
    return x === reversed || x === Math.floor(reversed / 10);
}
```

### Python
```python
def is_palindrome(x):
    if x < 0 or (x != 0 and x % 10 == 0):
        return False
    
    reversed_num = 0
    original = x
    
    while x > reversed_num:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    
    return x == reversed_num or x == reversed_num // 10
```

## Complexity
- **Time**: O(log₁₀(x))
- **Space**: O(1)

## Follow-up
- Check if string is palindrome?
- Find longest palindromic substring?
- Count palindromic substrings?

