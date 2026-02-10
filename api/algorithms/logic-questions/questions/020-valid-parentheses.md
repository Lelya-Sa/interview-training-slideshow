# Valid Parentheses

## Problem
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples
```
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Input: s = "([)]"
Output: false
```

## Approach
1. **Stack**: Push opening brackets, pop when matching closing bracket
2. **Counter**: Count each type (only works for single type)
3. **Replace**: Repeatedly remove valid pairs (less efficient)

## Solution

### JavaScript
```javascript
function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char in map) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}
```

### Python
```python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0
```

## Complexity
- **Time**: O(n)
- **Space**: O(n)

## Follow-up
- Generate all valid parentheses combinations?
- Remove invalid parentheses?
- Longest valid parentheses substring?

