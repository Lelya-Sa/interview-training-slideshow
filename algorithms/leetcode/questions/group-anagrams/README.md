# Group Anagrams - LeetCode 49

## Problem Description

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Example

```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Input: strs = [""]
Output: [[""]]

Input: strs = ["a"]
Output: [["a"]]
```

## Approach

### Key Insight:
Anagrams have the same character frequency. We can use sorted string as a key.

### Method 1: Sorting as Key
1. Sort each string to get a canonical form
2. Use sorted string as key in HashMap
3. Group strings with same sorted key

### Method 2: Character Count as Key
1. Count character frequencies for each string
2. Use character count array as key
3. Group strings with same character counts

## Time Complexity
- **Sorting Method**: O(n * k log k) where n is number of strings, k is average length
- **Count Method**: O(n * k) - more efficient for longer strings

## Space Complexity
- O(n * k) - storing all strings

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

