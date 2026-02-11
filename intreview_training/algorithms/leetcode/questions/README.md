# LeetCode Questions - Organized by Problem

This directory contains LeetCode problems organized by question, with solutions in JavaScript, Python, and Java.

## Structure

Each problem has its own folder with:
- `README.md` - Problem description, examples, approach, complexity
- `js/solution.js` - JavaScript solution
- `python/solution.py` - Python solution
- `java/Solution.java` - Java solution

## Available Problems

### 1. Insert Delete GetRandom O(1) - LeetCode 380 ⭐
- **Folder**: `insert-delete-getrandom/`
- **Difficulty**: Medium
- **Key Concepts**: HashMap, Array, O(1) operations, Uniform Distribution
- **Functions**: 
  - `insert(val)` - Insert sample with O(1) time
  - `remove(val)` - Remove sample with O(1) time
  - `getRandom()` - Get random sample with **uniform distribution** (equal probability for all elements)
- **Special Feature**: Implements uniform random sampling in O(1) time

### 2. Two Sum - LeetCode 1
- **Folder**: `two-sum/`
- **Difficulty**: Easy
- **Key Concepts**: HashMap, Two pointers
- **Functions**: `twoSum(nums, target)`

### 3. Best Time to Buy and Sell Stock - LeetCode 121
- **Folder**: `best-time-to-buy-sell-stock/`
- **Difficulty**: Easy
- **Key Concepts**: Dynamic Programming, Greedy
- **Functions**: `maxProfit(prices)`

### 4. Contains Duplicate - LeetCode 217
- **Folder**: `contains-duplicate/`
- **Difficulty**: Easy
- **Key Concepts**: HashSet
- **Functions**: `containsDuplicate(nums)`

### 5. Valid Parentheses - LeetCode 20
- **Folder**: `valid-parentheses/`
- **Difficulty**: Easy
- **Key Concepts**: Stack
- **Functions**: `isValid(s)`

### 6. Maximum Subarray - LeetCode 53
- **Folder**: `maximum-subarray/`
- **Difficulty**: Medium
- **Key Concepts**: Kadane's Algorithm, Dynamic Programming
- **Functions**: `maxSubArray(nums)`

### 7. Product of Array Except Self - LeetCode 238
- **Folder**: `product-of-array-except-self/`
- **Difficulty**: Medium
- **Key Concepts**: Two-pass algorithm, Prefix/Suffix products
- **Functions**: `productExceptSelf(nums)`

### 8. Longest Substring Without Repeating Characters - LeetCode 3
- **Folder**: `longest-substring-without-repeating-characters/`
- **Difficulty**: Medium
- **Key Concepts**: Sliding Window, HashMap, Two Pointers
- **Functions**: `lengthOfLongestSubstring(s)`

### 9. Valid Anagram - LeetCode 242
- **Folder**: `valid-anagram/`
- **Difficulty**: Easy
- **Key Concepts**: HashMap, Character Frequency, Sorting
- **Functions**: `isAnagram(s, t)`

### 10. Group Anagrams - LeetCode 49
- **Folder**: `group-anagrams/`
- **Difficulty**: Medium
- **Key Concepts**: HashMap, Sorting, Character Counting
- **Functions**: `groupAnagrams(strs)`

### 11. Reverse Linked List - LeetCode 206
- **Folder**: `reverse-linked-list/`
- **Difficulty**: Easy
- **Key Concepts**: Linked List, Two Pointers, Recursion
- **Functions**: `reverseList(head)`

### 12. LRU Cache - LeetCode 146 ⭐
- **Folder**: `lru-cache/`
- **Difficulty**: Medium
- **Key Concepts**: Doubly Linked List, HashMap, Design
- **Functions**: 
  - `get(key)` - O(1) time
  - `put(key, value)` - O(1) time
- **Special Feature**: Classic design problem for fullstack interviews

### 13. 3Sum - LeetCode 15
- **Folder**: `3sum/`
- **Difficulty**: Medium
- **Key Concepts**: Two Pointers, Sorting, Array
- **Functions**: `threeSum(nums)`

### 14. Container With Most Water - LeetCode 11
- **Folder**: `container-with-most-water/`
- **Difficulty**: Medium
- **Key Concepts**: Two Pointers, Greedy
- **Functions**: `maxArea(height)`

### 15. Maximum Depth of Binary Tree - LeetCode 104
- **Folder**: `maximum-depth-of-binary-tree/`
- **Difficulty**: Easy
- **Key Concepts**: Binary Tree, DFS, BFS, Recursion
- **Functions**: `maxDepth(root)`

### 16. Minimum Window Substring - LeetCode 76
- **Folder**: `minimum-window-substring/`
- **Difficulty**: Hard
- **Key Concepts**: Sliding Window, HashMap, Two Pointers
- **Functions**: `minWindow(s, t)`

### 17. Move Zeroes - LeetCode 283
- **Folder**: `move-zeroes/`
- **Difficulty**: Easy
- **Key Concepts**: Two Pointers, Array Manipulation
- **Functions**: `moveZeroes(nums)`

### 18. Squares of a Sorted Array - LeetCode 977
- **Folder**: `squares-of-sorted-array/`
- **Difficulty**: Easy
- **Key Concepts**: Two Pointers, Array
- **Functions**: `sortedSquares(nums)`

### 19. Subarray Sum Equals K - LeetCode 560
- **Folder**: `subarray-sum-equals-k/`
- **Difficulty**: Medium
- **Key Concepts**: Prefix Sum, HashMap
- **Functions**: `subarraySum(nums, k)`

### 20. Next Permutation - LeetCode 31
- **Folder**: `next-permutation/`
- **Difficulty**: Medium
- **Key Concepts**: Array, Two Pointers, Math
- **Functions**: `nextPermutation(nums)`

### 21. Maximum Sum Subarray of Size K
- **Folder**: `maximum-sum-subarray-size-k/`
- **Difficulty**: Easy
- **Key Concepts**: Sliding Window
- **Functions**: `maxSumSubarray(nums, k)`

### 22. Minimum Size Subarray Sum - LeetCode 209
- **Folder**: `minimum-size-subarray-sum/`
- **Difficulty**: Medium
- **Key Concepts**: Sliding Window, Two Pointers
- **Functions**: `minSubArrayLen(target, nums)`

## How to Use

### Run JavaScript Solutions
```bash
node insert-delete-getrandom/js/solution.js
node two-sum/js/solution.js
```

### Run Python Solutions
```bash
python insert-delete-getrandom/python/solution.py
python two-sum/python/solution.py
```

### Compile and Run Java Solutions
```bash
javac insert-delete-getrandom/java/Solution.java
java Solution

javac two-sum/java/Solution.java
java Solution
```

## Problem Categories

- **Arrays & Hashing**: Two Sum, Contains Duplicate, Product of Array Except Self, Valid Anagram, Group Anagrams, Move Zeroes, Squares of a Sorted Array, Subarray Sum Equals K
- **String**: Longest Substring Without Repeating Characters, Minimum Window Substring
- **Stack**: Valid Parentheses
- **Linked List**: Reverse Linked List
- **Binary Tree**: Maximum Depth of Binary Tree
- **Two Pointers**: 3Sum, Container With Most Water, Move Zeroes, Squares of a Sorted Array, Next Permutation
- **Sliding Window**: Longest Substring Without Repeating Characters, Minimum Window Substring, Maximum Sum Subarray of Size K, Minimum Size Subarray Sum
- **Prefix Sum**: Subarray Sum Equals K
- **Dynamic Programming**: Best Time to Buy and Sell Stock, Maximum Subarray
- **Design**: Insert Delete GetRandom O(1), LRU Cache
- **Array Manipulation**: Next Permutation

## Study Tips

1. Read the problem description carefully
2. Understand the examples
3. Study the approach in README
4. Try implementing without looking at solution
5. Compare solutions across languages
6. Practice variations of the problem

