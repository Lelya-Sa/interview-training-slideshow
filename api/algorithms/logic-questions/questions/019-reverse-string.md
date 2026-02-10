# Reverse String

## Problem
Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.

## Examples
```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```

## Approach
1. **Two Pointers**: Swap characters from both ends
2. **Recursion**: Recursively swap first and last
3. **Built-in**: Use language's reverse function (if allowed)

## Solution

### JavaScript
```javascript
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Recursive approach
function reverseStringRecursive(s, left = 0, right = s.length - 1) {
    if (left >= right) return;
    
    [s[left], s[right]] = [s[right], s[left]];
    reverseStringRecursive(s, left + 1, right - 1);
}
```

### Python
```python
def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

def reverse_string_recursive(s, left=0, right=None):
    if right is None:
        right = len(s) - 1
    if left >= right:
        return
    s[left], s[right] = s[right], s[left]
    reverse_string_recursive(s, left + 1, right - 1)
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for iterative, O(n) for recursive (call stack)

## Follow-up
- Reverse words in a string?
- Reverse only vowels?
- Reverse string with special characters?

