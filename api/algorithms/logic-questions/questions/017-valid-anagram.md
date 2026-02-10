# Valid Anagram

## Problem
Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples
```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false

Input: s = "listen", t = "silent"
Output: true
```

## Approach
1. **Sorting**: Sort both strings, compare
2. **HashMap**: Count character frequencies
3. **Array Counter**: Use array of size 26 for lowercase letters

## Solution

### JavaScript
```javascript
// Sorting approach
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}

// HashMap approach
function isAnagramHashMap(s, t) {
    if (s.length !== t.length) return false;
    
    const map = new Map();
    
    // Count characters in s
    for (const char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    
    // Decrement for characters in t
    for (const char of t) {
        if (!map.has(char) || map.get(char) === 0) {
            return false;
        }
        map.set(char, map.get(char) - 1);
    }
    
    return true;
}

// Array counter (for lowercase only)
function isAnagramArray(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    
    return count.every(c => c === 0);
}
```

### Python
```python
from collections import Counter

def is_anagram(s, t):
    return sorted(s) == sorted(t)

def is_anagram_counter(s, t):
    return Counter(s) == Counter(t)

def is_anagram_array(s, t):
    if len(s) != len(t):
        return False
    
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    
    return all(c == 0 for c in count)
```

## Complexity
- **Time**: O(n log n) for sorting, O(n) for HashMap/Array
- **Space**: O(1) for sorting (if in-place), O(n) for HashMap, O(1) for array

## Follow-up
- Group anagrams together?
- Find all anagram pairs?
- Valid anagram with Unicode characters?

