# First Unique Character in String

## Problem
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

## Examples
```
Input: s = "leetcode"
Output: 0 (character 'l')

Input: s = "loveleetcode"
Output: 2 (character 'v')

Input: s = "aabb"
Output: -1
```

## Approach
1. **Two Passes**: First pass count frequencies, second pass find first with count 1
2. **HashMap + Set**: Track seen and repeated characters
3. **Array Counter**: Use array for lowercase letters

## Solution

### JavaScript
```javascript
function firstUniqChar(s) {
    const count = new Map();
    
    // Count frequencies
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    // Find first unique
    for (let i = 0; i < s.length; i++) {
        if (count.get(s[i]) === 1) {
            return i;
        }
    }
    
    return -1;
}

// Array approach (lowercase only)
function firstUniqCharArray(s) {
    const count = new Array(26).fill(0);
    
    for (const char of s) {
        count[char.charCodeAt(0) - 97]++;
    }
    
    for (let i = 0; i < s.length; i++) {
        if (count[s[i].charCodeAt(0) - 97] === 1) {
            return i;
        }
    }
    
    return -1;
}
```

### Python
```python
from collections import Counter

def first_uniq_char(s):
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1

def first_uniq_char_dict(s):
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) - at most 26 characters for lowercase

## Follow-up
- Find first unique character in stream?
- Find all unique characters?
- First unique character ignoring case?

