# Valid Palindrome

## Problem
Given a string s, return true if it is a palindrome, or false otherwise. A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

## Examples
```
Input: s = "A man, a plan, a canal: Panama"
Output: true

Input: s = "race a car"
Output: false

Input: s = " "
Output: true
```

## Approach
1. **Two Pointers**: Compare characters from both ends
2. **Reverse and Compare**: Clean string, reverse, compare
3. **Stack**: Push first half, pop and compare with second half

## Solution

### JavaScript
```javascript
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Skip non-alphanumeric from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

// Alternative: Clean and reverse
function isPalindromeClean(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
```

### Python
```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for two pointers, O(n) for reverse method

## Follow-up
- Longest palindromic substring?
- Valid palindrome II (can delete at most one char)?
- Palindrome partitioning?

