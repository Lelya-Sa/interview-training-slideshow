# Longest Substring Without Repeating Characters - LeetCode 3

## Problem Description

Given a string `s`, find the length of the longest substring without repeating characters.

## Example

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

## Approach

### Sliding Window Technique:
1. Use two pointers (left and right) to maintain a window
2. Use a HashMap/Set to track characters in current window
3. Expand window by moving right pointer
4. When duplicate found, shrink window from left until duplicate is removed
5. Track maximum window size

### Key Insight:
- Sliding window ensures we check all possible substrings efficiently
- HashMap provides O(1) lookup for character existence
- Two pointers maintain the valid window boundaries

## Time Complexity
- O(n) where n is the length of string
- Each character is visited at most twice (once by right pointer, once by left pointer)

## Space Complexity
- O(min(m, n)) where m is the size of the charset
- In worst case, all characters are unique

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
const lengthOfLongestSubstring = (s) => {
  // Implementation
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));   // 1
console.log(lengthOfLongestSubstring("pwwkew"));  // 3
```

