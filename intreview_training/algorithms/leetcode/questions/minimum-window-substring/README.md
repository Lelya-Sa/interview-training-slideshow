# Minimum Window Substring - LeetCode 76

## Problem Description

Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

The testcases will be generated such that the answer is unique.

## Example

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Input: s = "a", t = "a"
Output: "a"

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

## Approach

### Sliding Window Technique:
1. Use two pointers (left, right) to maintain a window
2. Expand window by moving right pointer
3. When all characters from `t` are found, try to shrink window from left
4. Track minimum window size and its boundaries
5. Use HashMap to track required characters and their counts

### Key Insight:
- Expand window until all required characters are found
- Then shrink from left while maintaining all required characters
- Track minimum valid window

## Time Complexity
- O(|s| + |t|) where |s| and |t| are lengths of strings

## Space Complexity
- O(|s| + |t|) for HashMaps

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

