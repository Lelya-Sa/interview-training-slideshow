# Valid Anagram - LeetCode 242

## Problem Description

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Example

```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
```

## Approach

### Method 1: Character Frequency Count
1. If lengths differ, return false
2. Count character frequencies in both strings
3. Compare frequency maps

### Method 2: Sorting
1. Sort both strings
2. Compare sorted strings

### Key Insight:
- Anagrams have same character frequencies
- Sorting approach is simpler but O(n log n)
- Frequency count is O(n) time and space

## Time Complexity
- **Frequency Count**: O(n) where n is string length
- **Sorting**: O(n log n)

## Space Complexity
- **Frequency Count**: O(1) - fixed size array for 26 letters, or O(k) for HashMap where k is unique chars
- **Sorting**: O(1) if in-place, O(n) if creating new strings

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

