# Valid Parentheses - LeetCode 20

## Problem Description

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Example

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

Use a stack:
- Push opening brackets onto stack
- When encountering closing bracket, check if it matches top of stack
- If stack is empty at end, string is valid

## Time Complexity
- O(n) - single pass

## Space Complexity
- O(n) - stack storage

## How to Use

### JavaScript
```bash
node js/solution.js
```

### Python
```bash
python python/solution.py
```

### Java
```bash
javac java/Solution.java
java Solution
```

## Code Example

```javascript
isValid("()");      // true
isValid("()[]{}");  // true
isValid("(]");      // false
isValid("([)]");    // false
```
