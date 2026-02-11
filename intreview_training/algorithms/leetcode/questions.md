# LeetCode Style Questions

This file contains 22 LeetCode problems with JavaScript and Python implementations.

## Questions

### 1. 3Sum

**Problem:**
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

**Answer:**

### JavaScript
```javascript
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b); // Sort array

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
```

### Python
```python
def three_sum(nums):
    """
    Two Pointers Approach
    Time: O(n²)
    Space: O(1) excluding output
    """
    result = []
    nums.sort()
```

---

### 2. Best Time to Buy and Sell Stock

**Problem:**
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Answer:**

### JavaScript
```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
```

### Python
```python
def max_profit(prices):
    """
    Solution - Track minimum price and maximum profit
    Time: O(n)
    Space: O(1)
    """
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit
```

---

### 3. Container With Most Water

**Problem:**
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

**Answer:**

### JavaScript
```javascript
function maxArea(height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;
    maxWater = Math.max(maxWater, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    }
```

### Python
```python
def max_area(height):
    """
    Two Pointers Approach
    Time: O(n)
    Space: O(1)
    """
    max_water = 0
    left = 0
    right = len(height) - 1

    while left < right:
```

---

### 4. Contains Duplicate

**Problem:**
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

**Answer:**

### JavaScript
```javascript
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
```

### Python
```python
def contains_duplicate(nums):
    """
    Solution using Set
    Time: O(n)
    Space: O(n)
    """
    return len(set(nums)) != len(nums)


def contains_duplicate_map(nums):
    """
    Solution using Set (manual)
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False
```

---

### 5. Group Anagrams

**Problem:**
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Answer:**

### JavaScript
```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sort string to get canonical form
    const sorted = str.split('').sort().join('');
    
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
```

### Python
```python
def group_anagrams(strs):
    """
    Method 1: Sorting as Key
    Time: O(n * k log k) where n is number of strings, k is average length
    Space: O(n * k)
    """
    map_dict = defaultdict(list)

    for s in strs:
```

---

### 6. Insert Delete GetRandom O(1)

**Problem:**
Design a data structure that supports all following operations in average O(1) time.

1. `insert(val)`: Inserts an item val to the set if not already present.
2. `remove(val)`: Removes an item val from the set if present.
3. `getRandom()`: Returns a random element from current set of elements. Each element must have the same probability of being returned.

**Answer:**

### JavaScript
```javascript
constructor() {
    this.map = new Map(); // value -> index
    this.array = [];      // actual values
  }
```

### Python
```python
def __init__(self):
        self.map = {}
```

---

### 7. Longest Substring Without Repeating Characters

**Problem:**
Given a string `s`, find the length of the longest substring without repeating characters.

**Answer:**

### JavaScript
```javascript
function lengthOfLongestSubstring(s) {
  if (!s || s.length === 0) return 0;

  const charMap = new Map(); // character -> index
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character exists in current window, move left pointer
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }
```

### Python
```python
def length_of_longest_substring(s: str) -> int:
    """
    Sliding Window Approach
    Time: O(n)
    Space: O(min(m, n)) where m is charset size
    """
    if not s:
        return 0

    char_map = {}
```

---

### 8. LRU Cache

**Problem:**
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the `LRUCache` class:
- `LRUCache(int capacity)` Initialize the LRU cache with **any positive size** `capacity`. The implementation works with any capacity value (not limited to 2).
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

The functions `get` and `put` must each run in O(1) average time complexity.

**Note:** The implementation is fully general and works with any capacity value. The examples below use capacity 2 for demonstration, but the cache works with capacity 1, 3, 10, 100, or any positive integer.

**Answer:**

### JavaScript
```javascript
constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
```

### Python
```python
def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
```

---

### 9. Maximum Depth of Binary Tree

**Problem:**
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Answer:**

### JavaScript
```javascript
function maxDepth(root) {
  if (root === null) {
    return 0;
  }
```

### Python
```python
def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def max_depth(root):
    """
    Recursive Approach (DFS)
    Time: O(n)
    Space: O(h) where h is height
    """
    if root is None:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)


def max_depth_bfs(root):
    """
    Iterative Approach (BFS)
    Time: O(n)
    Space: O(n) for queue
    """
    if root is None:
        return 0

    queue = deque([root])
    depth = 0

    while queue:
        level_size = len(queue)
        depth += 1

        for _ in range(level_size):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth
```

---

### 10. Maximum Subarray (Kadane's Algorithm)

**Problem:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

**Answer:**

### JavaScript
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
```

### Python
```python
def max_sub_array(nums):
    """
    Kadane's Algorithm
    Time: O(n)
    Space: O(1)
    """
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

---

### 11. Maximum Sum Subarray of Size K

**Problem:**
LeetCode problem: Maximum Sum Subarray of Size K

**Answer:**

### JavaScript
```javascript
function maxSumSubarray(nums, k) {
  if (nums.length < k) return 0;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
```

### Python
```python
def max_sum_subarray(nums: List[int], k: int) -> int:
    if len(nums) < k:
        return 0
```

---

### 12. Minimum Size Subarray Sum

**Problem:**
LeetCode problem: Minimum Size Subarray Sum

**Answer:**

### JavaScript
```javascript
function minSubArrayLen(target, nums) {
  let minLen = Infinity;
  let windowSum = 0;
  let left = 0;
  
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    
    // Shrink window while sum >= target
    while (windowSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      windowSum -= nums[left];
      left++;
    }
```

### Python
```python
def min_sub_array_len(target: int, nums: List[int]) -> int:
    min_len = float('inf')
    window_sum = 0
    left = 0
    
    for right in range(len(nums)):
        window_sum += nums[right]
```

---

### 13. Minimum Window Substring

**Problem:**
Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

The testcases will be generated such that the answer is unique.

**Answer:**

### JavaScript
```javascript
function minWindow(s, t) {
  if (s.length < t.length) return '';

  // Count characters in t
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
```

### Python
```python
def min_window(s: str, t: str) -> str:
    """
    Sliding Window Approach
    Time: O(|s| + |t|)
    Space: O(|s| + |t|)
    """
    if len(s) < len(t):
        return ''
```

---

### 14. Move Zeroes

**Problem:**
LeetCode problem: Move Zeroes

**Answer:**

### JavaScript
```javascript
function moveZeroes(nums) {
  let insertPos = 0;
  
  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
```

### Python
```python
def move_zeroes(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    insert_pos = 0
```

---

### 15. Next Permutation

**Problem:**
LeetCode problem: Next Permutation

**Answer:**

### JavaScript
```javascript
function nextPermutation(nums) {
  // Step 1: Find the largest index i where nums[i] < nums[i+1]
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
```

### Python
```python
def next_permutation(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
```

---

### 16. Product of Array Except Self

**Problem:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operator.

**Answer:**

### JavaScript
```javascript
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
  
  // First pass: left products
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }
```

### Python
```python
def product_except_self(nums):
    """
    Two-pass solution
    Time: O(n)
    Space: O(1) excluding output array
    """
    result = [1] * len(nums)
```

---

### 17. Reverse Linked List

**Problem:**
Given the head of a singly linked list, reverse the list, and return the reversed list.

**Answer:**

### JavaScript
```javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;  // Store next node
    current.next = prev;       // Reverse link
    prev = current;            // Move prev forward
    current = next;            // Move current forward
  }
```

### Python
```python
def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverse_list(head):
    """
    Iterative Approach
    Time: O(n)
    Space: O(1)
    """
    prev = None
    current = head

    while current is not None:
        next_node = current.next
```

---

### 18. Squares of a Sorted Array

**Problem:**
LeetCode problem: Squares of a Sorted Array

**Answer:**

### JavaScript
```javascript
function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let idx = nums.length - 1;
  
  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    
    if (leftSquare > rightSquare) {
      result[idx--] = leftSquare;
      left++;
    }
```

### Python
```python
def sorted_squares(nums: List[int]) -> List[int]:
    result = [0] * len(nums)
    left = 0
    right = len(nums) - 1
    idx = len(nums) - 1
    
    while left <= right:
        left_square = nums[left] * nums[left]
        right_square = nums[right] * nums[right]
        
        if left_square > right_square:
            result[idx] = left_square
            left += 1
        else:
            result[idx] = right_square
            right -= 1
        idx -= 1
    
    return result
```

---

### 19. Subarray Sum Equals K

**Problem:**
LeetCode problem: Subarray Sum Equals K

**Answer:**

### JavaScript
```javascript
function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1); // Initialize with sum 0 having count 1
  let sum = 0;
  let count = 0;
  
  for (let num of nums) {
    sum += num;
    
    // Check if (sum - k) exists, meaning we found a subarray
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
```

### Python
```python
def subarray_sum(nums: List[int], k: int) -> int:
    prefix_sum = defaultdict(int)
    prefix_sum[0] = 1
```

---

### 20. Two Sum

**Problem:**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Answer:**

### JavaScript
```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
```

### Python
```python
def two_sum(nums, target):
    """
    Solution using HashMap
    Time: O(n)
    Space: O(n)
    """
    map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in map:
            return [map[complement], i]
        
        map[num] = i
    
    return []


def two_sum_brute_force(nums, target):
    """
    Brute Force Solution
    Time: O(n²)
    Space: O(1)
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

---

### 21. Valid Anagram

**Problem:**
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Answer:**

### JavaScript
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCount = new Array(26).fill(0);

  // Count characters in s
  for (let i = 0; i < s.length; i++) {
    charCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }
```

### Python
```python
def is_anagram(s: str, t: str) -> bool:
    """
    Method 1: Character Frequency Count
    Time: O(n)
    Space: O(1) - fixed size for 26 letters
    """
    if len(s) != len(t):
        return False

    char_count = [0] * 26
```

---

### 22. Valid Parentheses

**Problem:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Answer:**

### JavaScript
```javascript
function isValid(s) {
  const stack = [];
  const pairs = {
    '(': ')',
    '{': '}
```

### Python
```python
def is_valid(s):
    """
    Solution using Stack
    Time: O(n)
    Space: O(n)
    """
    stack = []
    pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    
    for char in s:
        if char in pairs:
```

---


### 23. Binary Search

**Problem:**
Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

**Answer:**

### JavaScript
```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def search(nums, target):
    """
    Binary Search
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

---

### 24. Find First and Last Position of Element in Sorted Array

**Problem:**
Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If `target` is not found in the array, return `[-1, -1]`.

**Answer:**

### JavaScript
```javascript
function searchRange(nums, target) {
  function findFirst(nums, target) {
    let left = 0, right = nums.length - 1;
    let first = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        first = mid;
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return first;
  }
  
  function findLast(nums, target) {
    let left = 0, right = nums.length - 1;
    let last = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        last = mid;
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return last;
  }
  
  return [findFirst(nums, target), findLast(nums, target)];
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def search_range(nums, target):
    """
    Binary Search for first and last position
    Time: O(log n)
    Space: O(1)
    """
    def find_first(nums, target):
        left, right = 0, len(nums) - 1
        first = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                first = mid
                right = mid - 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return first
    
    def find_last(nums, target):
        left, right = 0, len(nums) - 1
        last = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                last = mid
                left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return last
    
    return [find_first(nums, target), find_last(nums, target)]
```

---

### 25. Search in Rotated Sorted Array

**Problem:**
There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index. Given the array `nums` after the rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

**Answer:**

### JavaScript
```javascript
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def search(nums, target):
    """
    Binary Search in Rotated Array
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

---

### 26. Find Minimum in Rotated Sorted Array

**Problem:**
Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.

**Answer:**

### JavaScript
```javascript
function findMin(nums) {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def find_min(nums):
    """
    Binary Search for minimum
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    
    return nums[left]
```

---

### 27. Search Insert Position

**Problem:**
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

**Answer:**

### JavaScript
```javascript
function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def search_insert(nums, target):
    """
    Binary Search for insert position
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left
```

---

### 28. Find Peak Element

**Problem:**
A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

**Answer:**

### JavaScript
```javascript
function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def find_peak_element(nums):
    """
    Binary Search for peak
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    
    return left
```

---

### 29. Rotate Array

**Problem:**
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

**Answer:**

### JavaScript
```javascript
function rotate(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}
// Time: O(n), Space: O(1)
```

### Python
```python
def rotate(nums, k):
    """
    Reverse approach
    Time: O(n)
    Space: O(1)
    """
    k = k % len(nums)
    
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    reverse(0, len(nums) - 1)
    reverse(0, k - 1)
    reverse(k, len(nums) - 1)
```

---

### 30. Remove Duplicates from Sorted Array

**Problem:**
Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in `nums`.

**Answer:**

### JavaScript
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let writeIndex = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  return writeIndex;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def remove_duplicates(nums):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    
    write_index = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[write_index] = nums[i]
            write_index += 1
    
    return write_index
```

---

### 31. Remove Element

**Problem:**
Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.

**Answer:**

### JavaScript
```javascript
function removeElement(nums, val) {
  let writeIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  return writeIndex;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def remove_element(nums, val):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    write_index = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[write_index] = nums[i]
            write_index += 1
    
    return write_index
```

---

### 32. Plus One

**Problem:**
You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zeros. Increment the large integer by one and return the resulting array of digits.

**Answer:**

### JavaScript
```javascript
function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}
// Time: O(n), Space: O(1)
```

### Python
```python
def plus_one(digits):
    """
    Increment from right to left
    Time: O(n)
    Space: O(1)
    """
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    
    return [1] + digits
```

---

### 33. Single Number

**Problem:**
Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

**Answer:**

### JavaScript
```javascript
function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def single_number(nums):
    """
    XOR approach
    Time: O(n)
    Space: O(1)
    """
    result = 0
    for num in nums:
        result ^= num
    return result
```

---

### 34. Majority Element

**Problem:**
Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Answer:**

### JavaScript
```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;
  
  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}
// Time: O(n), Space: O(1) - Boyer-Moore Voting Algorithm
```

### Python
```python
def majority_element(nums):
    """
    Boyer-Moore Voting Algorithm
    Time: O(n)
    Space: O(1)
    """
    candidate = None
    count = 0
    
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    
    return candidate
```

---

### 35. Missing Number

**Problem:**
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

**Answer:**

### JavaScript
```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def missing_number(nums):
    """
    Sum formula approach
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
```

---

### 36. Find All Numbers Disappeared in an Array

**Problem:**
Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all the integers in the range `[1, n]` that do not appear in `nums`.

**Answer:**

### JavaScript
```javascript
function findDisappearedNumbers(nums) {
  // Mark numbers as negative
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }
  
  // Find positive indices
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }
  return result;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def find_disappeared_numbers(nums):
    """
    Mark indices as negative
    Time: O(n)
    Space: O(1)
    """
    # Mark numbers as negative
    for i in range(len(nums)):
        index = abs(nums[i]) - 1
        if nums[index] > 0:
            nums[index] = -nums[index]
    
    # Find positive indices
    result = []
    for i in range(len(nums)):
        if nums[i] > 0:
            result.append(i + 1)
    
    return result
```

---

### 37. Intersection of Two Arrays

**Problem:**
Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

**Answer:**

### JavaScript
```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const result = [];
  
  for (let num of set1) {
    if (set2.has(num)) {
      result.push(num);
    }
  }
  return result;
}
// Time: O(n + m), Space: O(n + m)
```

### Python
```python
def intersection(nums1, nums2):
    """
    Set intersection
    Time: O(n + m)
    Space: O(n + m)
    """
    set1 = set(nums1)
    set2 = set(nums2)
    return list(set1 & set2)
```

---


### 38. Intersection of Two Arrays II

**Problem:**
Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

**Answer:**

### JavaScript
```javascript
function intersect(nums1, nums2) {
  const map = new Map();
  const result = [];
  
  // Count frequencies in nums1
  for (let num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  // Check nums2 and add to result
  for (let num of nums2) {
    if (map.get(num) > 0) {
      result.push(num);
      map.set(num, map.get(num) - 1);
    }
  }
  
  return result;
}
// Time: O(n + m), Space: O(min(n, m))
```

### Python
```python
def intersect(nums1, nums2):
    """
    Hash map approach
    Time: O(n + m)
    Space: O(min(n, m))
    """
    from collections import Counter
    
    count1 = Counter(nums1)
    result = []
    
    for num in nums2:
        if count1[num] > 0:
            result.append(num)
            count1[num] -= 1
    
    return result
```

---

### 39. First Unique Character in a String

**Problem:**
Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.

**Answer:**

### JavaScript
```javascript
function firstUniqChar(s) {
  const map = new Map();
  
  // Count character frequencies
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Find first unique
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}
// Time: O(n), Space: O(1) - limited characters
```

### Python
```python
def first_uniq_char(s):
    """
    Hash map approach
    Time: O(n)
    Space: O(1) - limited characters
    """
    from collections import Counter
    
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1
```

---

### 40. Ransom Note

**Problem:**
Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise. Each letter in `magazine` can only be used once in `ransomNote`.

**Answer:**

### JavaScript
```javascript
function canConstruct(ransomNote, magazine) {
  const map = new Map();
  
  // Count magazine characters
  for (let char of magazine) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Check ransom note
  for (let char of ransomNote) {
    if (!map.has(char) || map.get(char) === 0) {
      return false;
    }
    map.set(char, map.get(char) - 1);
  }
  
  return true;
}
// Time: O(n + m), Space: O(1) - limited characters
```

### Python
```python
def can_construct(ransom_note, magazine):
    """
    Hash map approach
    Time: O(n + m)
    Space: O(1) - limited characters
    """
    from collections import Counter
    
    magazine_count = Counter(magazine)
    
    for char in ransom_note:
        if magazine_count[char] <= 0:
            return False
        magazine_count[char] -= 1
    
    return True
```

---

### 41. Valid Palindrome

**Problem:**
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Answer:**

### JavaScript
```javascript
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
// Time: O(n), Space: O(n)
```

### Python
```python
def is_palindrome(s):
    """
    Two pointers approach
    Time: O(n)
    Space: O(n)
    """
    s = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    
    return True
```

---

### 42. Reverse Words in a String

**Problem:**
Given an input string `s`, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.

**Answer:**

### JavaScript
```javascript
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}
// Time: O(n), Space: O(n)
```

### Python
```python
def reverse_words(s):
    """
    Split and reverse
    Time: O(n)
    Space: O(n)
    """
    return ' '.join(s.split()[::-1])
```

---

### 43. Implement strStr()

**Problem:**
Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Answer:**

### JavaScript
```javascript
function strStr(haystack, needle) {
  if (needle === '') return 0;
  
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
}
// Time: O(n * m), Space: O(1)
```

### Python
```python
def str_str(haystack, needle):
    """
    Sliding window approach
    Time: O(n * m)
    Space: O(1)
    """
    if not needle:
        return 0
    
    for i in range(len(haystack) - len(needle) + 1):
        if haystack[i:i + len(needle)] == needle:
            return i
    
    return -1
```

---

### 44. Longest Common Prefix

**Problem:**
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.

**Answer:**

### JavaScript
```javascript
function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}
// Time: O(S) where S is sum of all characters, Space: O(1)
```

### Python
```python
def longest_common_prefix(strs):
    """
    Horizontal scanning
    Time: O(S) where S is sum of all characters
    Space: O(1)
    """
    if not strs:
        return ''
    
    prefix = strs[0]
    for i in range(1, len(strs)):
        while strs[i].find(prefix) != 0:
            prefix = prefix[:-1]
            if not prefix:
                return ''
    
    return prefix
```

---

### 45. Add Binary

**Problem:**
Given two binary strings `a` and `b`, return their sum as a binary string.

**Answer:**

### JavaScript
```javascript
function addBinary(a, b) {
  let result = '';
  let carry = 0;
  let i = a.length - 1;
  let j = b.length - 1;
  
  while (i >= 0 || j >= 0 || carry > 0) {
    const sum = (i >= 0 ? parseInt(a[i]) : 0) + 
                (j >= 0 ? parseInt(b[j]) : 0) + 
                carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
    i--;
    j--;
  }
  
  return result;
}
// Time: O(max(n, m)), Space: O(max(n, m))
```

### Python
```python
def add_binary(a, b):
    """
    Binary addition with carry
    Time: O(max(n, m))
    Space: O(max(n, m))
    """
    result = []
    carry = 0
    i, j = len(a) - 1, len(b) - 1
    
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(a[i])
            i -= 1
        if j >= 0:
            total += int(b[j])
            j -= 1
        result.append(str(total % 2))
        carry = total // 2
    
    return ''.join(reversed(result))
```

---

### 46. Implement Queue using Stacks

**Problem:**
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

**Answer:**

### JavaScript
```javascript
class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  push(x) {
    this.stack1.push(x);
  }
  
  pop() {
    this.peek();
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
// Time: O(1) amortized, Space: O(n)
```

### Python
```python
class MyQueue:
    """
    Queue using two stacks
    Time: O(1) amortized
    Space: O(n)
    """
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    
    def push(self, x):
        self.stack1.append(x)
    
    def pop(self):
        self.peek()
        return self.stack2.pop()
    
    def peek(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]
    
    def empty(self):
        return not self.stack1 and not self.stack2
```

---

### 47. Implement Stack using Queues

**Problem:**
Implement a last in first out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

**Answer:**

### JavaScript
```javascript
class MyStack {
  constructor() {
    this.queue = [];
  }
  
  push(x) {
    this.queue.push(x);
    // Rotate queue to make new element at front
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }
  
  pop() {
    return this.queue.shift();
  }
  
  top() {
    return this.queue[0];
  }
  
  empty() {
    return this.queue.length === 0;
  }
}
// Time: O(n) for push, O(1) for others, Space: O(n)
```

### Python
```python
from collections import deque

class MyStack:
    """
    Stack using queue
    Time: O(n) for push, O(1) for others
    Space: O(n)
    """
    def __init__(self):
        self.queue = deque()
    
    def push(self, x):
        self.queue.append(x)
        # Rotate to make new element at front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())
    
    def pop(self):
        return self.queue.popleft()
    
    def top(self):
        return self.queue[0]
    
    def empty(self):
        return len(self.queue) == 0
```

---

### 48. Design HashMap

**Problem:**
Design a HashMap without using any built-in hash table libraries. Implement the `MyHashMap` class with `put(key, value)`, `get(key)`, and `remove(key)` methods.

**Answer:**

### JavaScript
```javascript
class MyHashMap {
  constructor() {
    this.map = new Array(1000001).fill(-1);
  }
  
  put(key, value) {
    this.map[key] = value;
  }
  
  get(key) {
    return this.map[key];
  }
  
  remove(key) {
    this.map[key] = -1;
  }
}
// Time: O(1), Space: O(n)
```

### Python
```python
class MyHashMap:
    """
    Simple array-based HashMap
    Time: O(1)
    Space: O(n)
    """
    def __init__(self):
        self.map = [-1] * 1000001
    
    def put(self, key, value):
        self.map[key] = value
    
    def get(self, key):
        return self.map[key]
    
    def remove(self, key):
        self.map[key] = -1
```

---

### 49. Design HashSet

**Problem:**
Design a HashSet without using any built-in hash set libraries. Implement `MyHashSet` class with `add(key)`, `remove(key)`, and `contains(key)` methods.

**Answer:**

### JavaScript
```javascript
class MyHashSet {
  constructor() {
    this.set = new Array(1000001).fill(false);
  }
  
  add(key) {
    this.set[key] = true;
  }
  
  remove(key) {
    this.set[key] = false;
  }
  
  contains(key) {
    return this.set[key];
  }
}
// Time: O(1), Space: O(n)
```

### Python
```python
class MyHashSet:
    """
    Simple array-based HashSet
    Time: O(1)
    Space: O(n)
    """
    def __init__(self):
        self.set = [False] * 1000001
    
    def add(self, key):
        self.set[key] = True
    
    def remove(self, key):
        self.set[key] = False
    
    def contains(self, key):
        return self.set[key]
```

---

### 50. Isomorphic Strings

**Problem:**
Given two strings `s` and `t`, determine if they are isomorphic. Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

**Answer:**

### JavaScript
```javascript
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  
  const map1 = new Map();
  const map2 = new Map();
  
  for (let i = 0; i < s.length; i++) {
    if (map1.has(s[i]) && map1.get(s[i]) !== t[i]) return false;
    if (map2.has(t[i]) && map2.get(t[i]) !== s[i]) return false;
    map1.set(s[i], t[i]);
    map2.set(t[i], s[i]);
  }
  
  return true;
}
// Time: O(n), Space: O(1) - limited characters
```

### Python
```python
def is_isomorphic(s, t):
    """
    Two-way mapping check
    Time: O(n)
    Space: O(1) - limited characters
    """
    if len(s) != len(t):
        return False
    
    map1 = {}
    map2 = {}
    
    for i in range(len(s)):
        if s[i] in map1 and map1[s[i]] != t[i]:
            return False
        if t[i] in map2 and map2[t[i]] != s[i]:
            return False
        map1[s[i]] = t[i]
        map2[t[i]] = s[i]
    
    return True
```

---

### 51. Word Pattern

**Problem:**
Given a `pattern` and a string `s`, find if `s` follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.

**Answer:**

### JavaScript
```javascript
function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  
  const map1 = new Map();
  const map2 = new Map();
  
  for (let i = 0; i < pattern.length; i++) {
    if (map1.has(pattern[i]) && map1.get(pattern[i]) !== words[i]) return false;
    if (map2.has(words[i]) && map2.get(words[i]) !== pattern[i]) return false;
    map1.set(pattern[i], words[i]);
    map2.set(words[i], pattern[i]);
  }
  
  return true;
}
// Time: O(n), Space: O(n)
```

### Python
```python
def word_pattern(pattern, s):
    """
    Two-way mapping check
    Time: O(n)
    Space: O(n)
    """
    words = s.split()
    if len(pattern) != len(words):
        return False
    
    map1 = {}
    map2 = {}
    
    for i in range(len(pattern)):
        if pattern[i] in map1 and map1[pattern[i]] != words[i]:
            return False
        if words[i] in map2 and map2[words[i]] != pattern[i]:
            return False
        map1[pattern[i]] = words[i]
        map2[words[i]] = pattern[i]
    
    return True
```

---

### 52. Power of Three

**Problem:**
Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`. An integer `n` is a power of three, if there exists an integer `x` such that `n == 3^x`.

**Answer:**

### JavaScript
```javascript
function isPowerOfThree(n) {
  if (n <= 0) return false;
  while (n % 3 === 0) {
    n /= 3;
  }
  return n === 1;
}
// Time: O(log n), Space: O(1)
```

### Python
```python
def is_power_of_three(n):
    """
    Division approach
    Time: O(log n)
    Space: O(1)
    """
    if n <= 0:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1
```

---


### 53. Power of Two

**Problem:**
Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Answer:**

### JavaScript
```javascript
function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}
// Time: O(1), Space: O(1)
```

### Python
```python
def is_power_of_two(n):
    """
    Bit manipulation
    Time: O(1)
    Space: O(1)
    """
    if n <= 0:
        return False
    return (n & (n - 1)) == 0
```

---

### 54. Number of 1 Bits

**Problem:**
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Answer:**

### JavaScript
```javascript
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Removes rightmost 1-bit
    count++;
  }
  return count;
}
// Time: O(1) - at most 32 iterations, Space: O(1)
```

### Python
```python
def hamming_weight(n):
    """
    Brian Kernighan's algorithm
    Time: O(1) - at most 32 iterations
    Space: O(1)
    """
    count = 0
    while n:
        n = n & (n - 1)  # Removes rightmost 1-bit
        count += 1
    return count
```

---

### 55. Reverse Bits

**Problem:**
Reverse bits of a given 32 bits unsigned integer.

**Answer:**

### JavaScript
```javascript
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;
  }
  return result >>> 0; // Convert to unsigned
}
// Time: O(1), Space: O(1)
```

### Python
```python
def reverse_bits(n):
    """
    Bit manipulation
    Time: O(1)
    Space: O(1)
    """
    result = 0
    for i in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
```

---

### 56. Counting Bits

**Problem:**
Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of `1`'s in the binary representation of `i`.

**Answer:**

### JavaScript
```javascript
function countBits(n) {
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i & (i - 1)] + 1;
  }
  return result;
}
// Time: O(n), Space: O(n)
```

### Python
```python
def count_bits(n):
    """
    Dynamic programming approach
    Time: O(n)
    Space: O(n)
    """
    result = [0] * (n + 1)
    for i in range(1, n + 1):
        result[i] = result[i & (i - 1)] + 1
    return result
```

---

### 57. Missing Number

**Problem:**
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

**Answer:**

### JavaScript
```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def missing_number(nums):
    """
    Sum formula approach
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
```

---

### 58. Find the Duplicate Number

**Problem:**
Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is only one repeated number in `nums`, return this repeated number.

**Answer:**

### JavaScript
```javascript
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  
  // Find intersection point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  
  // Find entrance to cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  
  return slow;
}
// Time: O(n), Space: O(1) - Floyd's Cycle Detection
```

### Python
```python
def find_duplicate(nums):
    """
    Floyd's Cycle Detection
    Time: O(n)
    Space: O(1)
    """
    slow = fast = nums[0]
    
    # Find intersection point
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    
    # Find entrance to cycle
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow
```

---

### 59. Find All Duplicates in an Array

**Problem:**
Given an integer array `nums` of length `n` where all the integers of `nums` are in the range `[1, n]` and each integer appears once or twice, return an array of all the integers that appears twice.

**Answer:**

### JavaScript
```javascript
function findDuplicates(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) {
      result.push(Math.abs(nums[i]));
    } else {
      nums[index] = -nums[index];
    }
  }
  return result;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def find_duplicates(nums):
    """
    Mark indices as negative
    Time: O(n)
    Space: O(1)
    """
    result = []
    for i in range(len(nums)):
        index = abs(nums[i]) - 1
        if nums[index] < 0:
            result.append(abs(nums[i]))
        else:
            nums[index] = -nums[index]
    return result
```

---

### 60. Set Matrix Zeroes

**Problem:**
Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s. You must do it in place.

**Answer:**

### JavaScript
```javascript
function setZeroes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowZero = false;
  let firstColZero = false;
  
  // Check if first row has zero
  for (let j = 0; j < cols; j++) {
    if (matrix[0][j] === 0) {
      firstRowZero = true;
      break;
    }
  }
  
  // Check if first column has zero
  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }
  
  // Mark zeros in first row and column
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }
  
  // Set zeros based on marks
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }
  
  // Set first row
  if (firstRowZero) {
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
    }
  }
  
  // Set first column
  if (firstColZero) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
    }
  }
}
// Time: O(m * n), Space: O(1)
```

### Python
```python
def set_zeroes(matrix):
    """
    Use first row and column as markers
    Time: O(m * n)
    Space: O(1)
    """
    rows, cols = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(cols))
    first_col_zero = any(matrix[i][0] == 0 for i in range(rows))
    
    # Mark zeros in first row and column
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # Set zeros based on marks
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # Set first row and column
    if first_row_zero:
        for j in range(cols):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(rows):
            matrix[i][0] = 0
```

---

### 61. Spiral Matrix

**Problem:**
Given an `m x n` matrix, return all elements of the matrix in spiral order.

**Answer:**

### JavaScript
```javascript
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // Top row
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
    }
    top++;
    
    // Right column
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    if (top <= bottom) {
      // Bottom row
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
      }
      bottom--;
    }
    
    if (left <= right) {
      // Left column
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
}
// Time: O(m * n), Space: O(1)
```

### Python
```python
def spiral_order(matrix):
    """
    Spiral traversal
    Time: O(m * n)
    Space: O(1)
    """
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Top row
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1
        
        # Right column
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Bottom row
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1
        
        if left <= right:
            # Left column
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
    
    return result
```

---

### 62. Rotate Image

**Problem:**
You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.

**Answer:**

### JavaScript
```javascript
function rotate(matrix) {
  const n = matrix.length;
  
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
// Time: O(n²), Space: O(1)
```

### Python
```python
def rotate(matrix):
    """
    Transpose then reverse rows
    Time: O(n²)
    Space: O(1)
    """
    n = len(matrix)
    
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse each row
    for i in range(n):
        matrix[i].reverse()
```

---

### 63. Valid Sudoku

**Problem:**
Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the rules: Each row must contain digits 1-9 without repetition. Each column must contain digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes must contain digits 1-9 without repetition.

**Answer:**

### JavaScript
```javascript
function isValidSudoku(board) {
  const rows = Array(9).fill(0).map(() => new Set());
  const cols = Array(9).fill(0).map(() => new Set());
  const boxes = Array(9).fill(0).map(() => new Set());
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === '.') continue;
      
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }
      
      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }
  
  return true;
}
// Time: O(1) - fixed 9x9, Space: O(1)
```

### Python
```python
def is_valid_sudoku(board):
    """
    Use sets to track rows, columns, and boxes
    Time: O(1) - fixed 9x9
    Space: O(1)
    """
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for i in range(9):
        for j in range(9):
            num = board[i][j]
            if num == '.':
                continue
            
            box_index = (i // 3) * 3 + (j // 3)
            
            if num in rows[i] or num in cols[j] or num in boxes[box_index]:
                return False
            
            rows[i].add(num)
            cols[j].add(num)
            boxes[box_index].add(num)
    
    return True
```

---

### 64. Game of Life

**Problem:**
According to Wikipedia's article: 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.' Given the current state of the `m x n` grid `board`, return the next state.

**Answer:**

### JavaScript
```javascript
function gameOfLife(board) {
  const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const rows = board.length;
  const cols = board[0].length;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let liveNeighbors = 0;
      
      for (let [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy;
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
          if (Math.abs(board[x][y]) === 1) liveNeighbors++;
        }
      }
      
      // Apply rules
      if (board[i][j] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[i][j] = -1; // Mark as dead
      }
      if (board[i][j] === 0 && liveNeighbors === 3) {
        board[i][j] = 2; // Mark as alive
      }
    }
  }
  
  // Update board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] > 0) {
        board[i][j] = 1;
      } else {
        board[i][j] = 0;
      }
    }
  }
}
// Time: O(m * n), Space: O(1)
```

### Python
```python
def game_of_life(board):
    """
    In-place with state encoding
    Time: O(m * n)
    Space: O(1)
    """
    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    rows, cols = len(board), len(board[0])
    
    for i in range(rows):
        for j in range(cols):
            live_neighbors = 0
            for dx, dy in directions:
                x, y = i + dx, j + dy
                if 0 <= x < rows and 0 <= y < cols:
                    if abs(board[x][y]) == 1:
                        live_neighbors += 1
            
            # Apply rules
            if board[i][j] == 1 and (live_neighbors < 2 or live_neighbors > 3):
                board[i][j] = -1  # Mark as dead
            if board[i][j] == 0 and live_neighbors == 3:
                board[i][j] = 2  # Mark as alive
    
    # Update board
    for i in range(rows):
        for j in range(cols):
            board[i][j] = 1 if board[i][j] > 0 else 0
```

---

### 65. Pascal's Triangle

**Problem:**
Given an integer `numRows`, return the first `numRows` of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it.

**Answer:**

### JavaScript
```javascript
function generate(numRows) {
  const triangle = [];
  
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  
  return triangle;
}
// Time: O(numRows²), Space: O(numRows²)
```

### Python
```python
def generate(num_rows):
    """
    Build triangle row by row
    Time: O(num_rows²)
    Space: O(num_rows²)
    """
    triangle = []
    
    for i in range(num_rows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)
    
    return triangle
```

---

### 66. Pascal's Triangle II

**Problem:**
Given an integer `rowIndex`, return the `rowIndex`th (0-indexed) row of the Pascal's triangle.

**Answer:**

### JavaScript
```javascript
function getRow(rowIndex) {
  const row = [1];
  
  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i - 1; j > 0; j--) {
      row[j] = row[j] + row[j - 1];
    }
    row.push(1);
  }
  
  return row;
}
// Time: O(rowIndex²), Space: O(rowIndex)
```

### Python
```python
def get_row(row_index):
    """
    Build row in-place
    Time: O(row_index²)
    Space: O(row_index)
    """
    row = [1]
    
    for i in range(1, row_index + 1):
        for j in range(i - 1, 0, -1):
            row[j] = row[j] + row[j - 1]
        row.append(1)
    
    return row
```

---

### 67. Best Time to Buy and Sell Stock II

**Problem:**
You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`th day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.

**Answer:**

### JavaScript
```javascript
function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def max_profit(prices):
    """
    Greedy approach - capture all increases
    Time: O(n)
    Space: O(1)
    """
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit
```

---


### 68. Best Time to Buy and Sell Stock with Cooldown

**Problem:**
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Answer:**

### JavaScript
```javascript
function maxProfit(prices) {
  let sold = 0;
  let hold = -Infinity;
  let rest = 0;
  
  for (let price of prices) {
    const prevSold = sold;
    sold = hold + price;
    hold = Math.max(hold, rest - price);
    rest = Math.max(rest, prevSold);
  }
  
  return Math.max(sold, rest);
}
// Time: O(n), Space: O(1)
```

### Python
```python
def max_profit(prices):
    """
    State machine approach
    Time: O(n)
    Space: O(1)
    """
    sold = 0
    hold = float('-inf')
    rest = 0
    
    for price in prices:
        prev_sold = sold
        sold = hold + price
        hold = max(hold, rest - price)
        rest = max(rest, prev_sold)
    
    return max(sold, rest)
```

---

### 69. Coin Change

**Problem:**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

**Answer:**

### JavaScript
```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// Time: O(amount * coins.length), Space: O(amount)
```

### Python
```python
def coin_change(coins, amount):
    """
    Dynamic programming
    Time: O(amount * len(coins))
    Space: O(amount)
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

---

### 70. Longest Increasing Subsequence

**Problem:**
Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

**Answer:**

### JavaScript
```javascript
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  
  return maxLen;
}
// Time: O(n²), Space: O(n)
```

### Python
```python
def length_of_lis(nums):
    """
    Dynamic programming
    Time: O(n²)
    Space: O(n)
    """
    dp = [1] * len(nums)
    max_len = 1
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
        max_len = max(max_len, dp[i])
    
    return max_len
```

---

### 71. Partition Equal Subset Sum

**Problem:**
Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

**Answer:**

### JavaScript
```javascript
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (let num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  
  return dp[target];
}
// Time: O(n * sum), Space: O(sum)
```

### Python
```python
def can_partition(nums):
    """
    Dynamic programming - subset sum
    Time: O(n * sum)
    Space: O(sum)
    """
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    
    return dp[target]
```

---

### 72. Word Break

**Problem:**
Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Answer:**

### JavaScript
```javascript
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
}
// Time: O(n² * m), Space: O(n)
```

### Python
```python
def word_break(s, word_dict):
    """
    Dynamic programming
    Time: O(n² * m)
    Space: O(n)
    """
    word_set = set(word_dict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]
```

---

### 73. Combination Sum

**Problem:**
Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order. The same number may be chosen from `candidates` an unlimited number of times.

**Answer:**

### JavaScript
```javascript
function combinationSum(candidates, target) {
  const result = [];
  
  function backtrack(remaining, combo, start) {
    if (remaining === 0) {
      result.push([...combo]);
      return;
    }
    if (remaining < 0) return;
    
    for (let i = start; i < candidates.length; i++) {
      combo.push(candidates[i]);
      backtrack(remaining - candidates[i], combo, i);
      combo.pop();
    }
  }
  
  backtrack(target, [], 0);
  return result;
}
// Time: O(2^target), Space: O(target)
```

### Python
```python
def combination_sum(candidates, target):
    """
    Backtracking
    Time: O(2^target)
    Space: O(target)
    """
    result = []
    
    def backtrack(remaining, combo, start):
        if remaining == 0:
            result.append(combo[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            combo.append(candidates[i])
            backtrack(remaining - candidates[i], combo, i)
            combo.pop()
    
    backtrack(target, [], 0)
    return result
```

---

### 74. Permutations

**Problem:**
Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Answer:**

### JavaScript
```javascript
function permute(nums) {
  const result = [];
  
  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let num of nums) {
      if (!current.includes(num)) {
        current.push(num);
        backtrack(current);
        current.pop();
      }
    }
  }
  
  backtrack([]);
  return result;
}
// Time: O(n! * n), Space: O(n! * n)
```

### Python
```python
def permute(nums):
    """
    Backtracking
    Time: O(n! * n)
    Space: O(n! * n)
    """
    result = []
    
    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for num in nums:
            if num not in current:
                current.append(num)
                backtrack(current)
                current.pop()
    
    backtrack([])
    return result
```

---

### 75. Subsets

**Problem:**
Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Answer:**

### JavaScript
```javascript
function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}
// Time: O(2^n * n), Space: O(2^n * n)
```

### Python
```python
def subsets(nums):
    """
    Backtracking
    Time: O(2^n * n)
    Space: O(2^n * n)
    """
    result = []
    
    def backtrack(start, current):
        result.append(current[:])
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(0, [])
    return result
```

---

### 76. Letter Combinations of a Phone Number

**Problem:**
Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

**Answer:**

### JavaScript
```javascript
function letterCombinations(digits) {
  if (digits.length === 0) return [];
  
  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  
  const result = [];
  
  function backtrack(index, current) {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    
    const letters = map[digits[index]];
    for (let letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }
  
  backtrack(0, '');
  return result;
}
// Time: O(4^n * n), Space: O(4^n * n)
```

### Python
```python
def letter_combinations(digits):
    """
    Backtracking
    Time: O(4^n * n)
    Space: O(4^n * n)
    """
    if not digits:
        return []
    
    map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    
    result = []
    
    def backtrack(index, current):
        if index == len(digits):
            result.append(current)
            return
        
        letters = map[digits[index]]
        for letter in letters:
            backtrack(index + 1, current + letter)
    
    backtrack(0, '')
    return result
```

---

### 77. Generate Parentheses

**Problem:**
Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Answer:**

### JavaScript
```javascript
function generateParenthesis(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }
  
  backtrack('', 0, 0);
  return result;
}
// Time: O(4^n / √n), Space: O(4^n / √n)
```

### Python
```python
def generate_parenthesis(n):
    """
    Backtracking
    Time: O(4^n / √n)
    Space: O(4^n / √n)
    """
    result = []
    
    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append(current)
            return
        
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result
```

---

### 78. N-Queens

**Problem:**
The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return all distinct solutions to the n-queens puzzle.

**Answer:**

### JavaScript
```javascript
function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // Check diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Check anti-diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return result;
}
// Time: O(n!), Space: O(n²)
```

### Python
```python
def solve_n_queens(n):
    """
    Backtracking
    Time: O(n!)
    Space: O(n²)
    """
    result = []
    board = [['.'] * n for _ in range(n)]
    
    def is_valid(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        # Check diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        # Check anti-diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return
        
        for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result
```

---

### 79. Sudoku Solver

**Problem:**
Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

**Answer:**

### JavaScript
```javascript
function solveSudoku(board) {
  function isValid(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
      const boxCol = Math.floor(col / 3) * 3 + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }
  
  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let num = '1'; num <= '9'; num++) {
            if (isValid(i, j, num)) {
              board[i][j] = num;
              if (solve()) return true;
              board[i][j] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  solve();
}
// Time: O(9^m), Space: O(1)
```

### Python
```python
def solve_sudoku(board):
    """
    Backtracking
    Time: O(9^m) where m is number of empty cells
    Space: O(1)
    """
    def is_valid(row, col, num):
        for i in range(9):
            if board[row][i] == num or board[i][col] == num:
                return False
            box_row = (row // 3) * 3 + i // 3
            box_col = (col // 3) * 3 + i % 3
            if board[box_row][box_col] == num:
                return False
        return True
    
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in '123456789':
                        if is_valid(i, j, num):
                            board[i][j] = num
                            if solve():
                                return True
                            board[i][j] = '.'
                    return False
        return True
    
    solve()
```

---

### 80. Combination Sum II

**Problem:**
Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination.

**Answer:**

### JavaScript
```javascript
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  
  function backtrack(remaining, combo, start) {
    if (remaining === 0) {
      result.push([...combo]);
      return;
    }
    if (remaining < 0) return;
    
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      combo.push(candidates[i]);
      backtrack(remaining - candidates[i], combo, i + 1);
      combo.pop();
    }
  }
  
  backtrack(target, [], 0);
  return result;
}
// Time: O(2^n), Space: O(target)
```

### Python
```python
def combination_sum2(candidates, target):
    """
    Backtracking with duplicates handling
    Time: O(2^n)
    Space: O(target)
    """
    candidates.sort()
    result = []
    
    def backtrack(remaining, combo, start):
        if remaining == 0:
            result.append(combo[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            combo.append(candidates[i])
            backtrack(remaining - candidates[i], combo, i + 1)
            combo.pop()
    
    backtrack(target, [], 0)
    return result
```

---

### 81. Permutations II

**Problem:**
Given a collection of numbers, `nums`, that might contain duplicates, return all the unique permutations in any order.

**Answer:**

### JavaScript
```javascript
function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const used = new Array(nums.length).fill(false);
  
  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      
      used[i] = true;
      current.push(nums[i]);
      backtrack(current);
      current.pop();
      used[i] = false;
    }
  }
  
  backtrack([]);
  return result;
}
// Time: O(n! * n), Space: O(n! * n)
```

### Python
```python
def permute_unique(nums):
    """
    Backtracking with duplicates handling
    Time: O(n! * n)
    Space: O(n! * n)
    """
    nums.sort()
    result = []
    used = [False] * len(nums)
    
    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for i in range(len(nums)):
            if used[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue
            
            used[i] = True
            current.append(nums[i])
            backtrack(current)
            current.pop()
            used[i] = False
    
    backtrack([])
    return result
```

---


### 82. Path Sum

**Problem:**
Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.

**Answer:**

### JavaScript
```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  return hasPathSum(root.left, targetSum - root.val) || 
         hasPathSum(root.right, targetSum - root.val);
}
// Time: O(n), Space: O(h)
```

### Python
```python
def has_path_sum(root, target_sum):
    """
    Recursive DFS
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return False
    if not root.left and not root.right:
        return root.val == target_sum
    return (has_path_sum(root.left, target_sum - root.val) or
            has_path_sum(root.right, target_sum - root.val))
```

---

### 83. Symmetric Tree

**Problem:**
Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

**Answer:**

### JavaScript
```javascript
function isSymmetric(root) {
  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return left.val === right.val &&
           isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  }
  
  return isMirror(root, root);
}
// Time: O(n), Space: O(h)
```

### Python
```python
def is_symmetric(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    def is_mirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        return (left.val == right.val and
                is_mirror(left.left, right.right) and
                is_mirror(left.right, right.left))
    
    return is_mirror(root, root)
```

---

### 84. Binary Tree Level Order Traversal

**Problem:**
Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Answer:**

### JavaScript
```javascript
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}
// Time: O(n), Space: O(n)
```

### Python
```python
def level_order(root):
    """
    BFS approach
    Time: O(n)
    Space: O(n)
    """
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        level = []
        size = len(queue)
        
        for _ in range(size):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

---

### 85. Maximum Depth of Binary Tree

**Problem:**
Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Answer:**

### JavaScript
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(n), Space: O(h)
```

### Python
```python
def max_depth(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
```

---

### 86. Binary Tree Inorder Traversal

**Problem:**
Given the `root` of a binary tree, return the inorder traversal of its nodes' values.

**Answer:**

### JavaScript
```javascript
function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def inorder_traversal(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    
    traverse(root)
    return result
```

---

### 87. Validate Binary Search Tree

**Problem:**
Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

**Answer:**

### JavaScript
```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}
// Time: O(n), Space: O(h)
```

### Python
```python
def is_valid_bst(root):
    """
    Recursive with bounds
    Time: O(n)
    Space: O(h)
    """
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))
```

---

### 88. Kth Smallest Element in a BST

**Problem:**
Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.

**Answer:**

### JavaScript
```javascript
function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    count++;
    if (count === k) return current.val;
    current = current.right;
  }
}
// Time: O(h + k), Space: O(h)
```

### Python
```python
def kth_smallest(root, k):
    """
    Inorder traversal with early termination
    Time: O(h + k)
    Space: O(h)
    """
    stack = []
    current = root
    count = 0
    
    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        current = current.right
```

---

### 89. Lowest Common Ancestor of a Binary Search Tree

**Problem:**
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

**Answer:**

### JavaScript
```javascript
function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
}
// Time: O(h), Space: O(1)
```

### Python
```python
def lowest_common_ancestor(root, p, q):
    """
    Iterative approach
    Time: O(h)
    Space: O(1)
    """
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
```

---

### 90. Construct Binary Tree from Preorder and Inorder Traversal

**Problem:**
Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Answer:**

### JavaScript
```javascript
function buildTree(preorder, inorder) {
  if (preorder.length === 0) return null;
  
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const rootIndex = inorder.indexOf(rootVal);
  
  root.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  root.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  
  return root;
}
// Time: O(n²), Space: O(n)
```

### Python
```python
def build_tree(preorder, inorder):
    """
    Recursive construction
    Time: O(n²)
    Space: O(n)
    """
    if not preorder:
        return None
    
    root_val = preorder[0]
    root = TreeNode(root_val)
    root_index = inorder.index(root_val)
    
    root.left = build_tree(
        preorder[1:root_index + 1],
        inorder[:root_index]
    )
    root.right = build_tree(
        preorder[root_index + 1:],
        inorder[root_index + 1:]
    )
    
    return root
```

---

### 91. Flatten Binary Tree to Linked List

**Problem:**
Given the `root` of a binary tree, flatten the tree into a 'linked list' using the same `TreeNode` class. The 'linked list' should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.

**Answer:**

### JavaScript
```javascript
function flatten(root) {
  if (!root) return;
  
  flatten(root.left);
  flatten(root.right);
  
  const right = root.right;
  root.right = root.left;
  root.left = null;
  
  while (root.right) {
    root = root.right;
  }
  root.right = right;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def flatten(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return
    
    flatten(root.left)
    flatten(root.right)
    
    right = root.right
    root.right = root.left
    root.left = None
    
    while root.right:
        root = root.right
    root.right = right
```

---

### 92. Diameter of Binary Tree

**Problem:**
Given the `root` of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

**Answer:**

### JavaScript
```javascript
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;
  
  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return Math.max(left, right) + 1;
  }
  
  depth(root);
  return maxDiameter;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def diameter_of_binary_tree(root):
    """
    DFS approach
    Time: O(n)
    Space: O(h)
    """
    max_diameter = 0
    
    def depth(node):
        nonlocal max_diameter
        if not node:
            return 0
        left = depth(node.left)
        right = depth(node.right)
        max_diameter = max(max_diameter, left + right)
        return max(left, right) + 1
    
    depth(root)
    return max_diameter
```

---

### 93. Binary Tree Maximum Path Sum

**Problem:**
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the `root` of a binary tree, return the maximum path sum of any non-empty path.

**Answer:**

### JavaScript
```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;
  
  function gainFromSubtree(node) {
    if (!node) return 0;
    
    const leftGain = Math.max(gainFromSubtree(node.left), 0);
    const rightGain = Math.max(gainFromSubtree(node.right), 0);
    
    maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
    
    return node.val + Math.max(leftGain, rightGain);
  }
  
  gainFromSubtree(root);
  return maxSum;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def max_path_sum(root):
    """
    DFS approach
    Time: O(n)
    Space: O(h)
    """
    max_sum = float('-inf')
    
    def gain_from_subtree(node):
        nonlocal max_sum
        if not node:
            return 0
        
        left_gain = max(gain_from_subtree(node.left), 0)
        right_gain = max(gain_from_subtree(node.right), 0)
        
        max_sum = max(max_sum, node.val + left_gain + right_gain)
        
        return node.val + max(left_gain, right_gain)
    
    gain_from_subtree(root)
    return max_sum
```

---

### 94. Serialize and Deserialize Binary Tree

**Problem:**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer. Design an algorithm to serialize and deserialize a binary tree.

**Answer:**

### JavaScript
```javascript
function serialize(root) {
  const result = [];
  
  function dfs(node) {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }
  
  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;
  
  function dfs() {
    if (values[index] === 'null') {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(values[index]));
    index++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  
  return dfs();
}
// Time: O(n), Space: O(n)
```

### Python
```python
def serialize(root):
    """
    Preorder traversal
    Time: O(n)
    Space: O(n)
    """
    result = []
    
    def dfs(node):
        if not node:
            result.append('null')
            return
        result.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    
    dfs(root)
    return ','.join(result)

def deserialize(data):
    """
    Reconstruct from preorder
    Time: O(n)
    Space: O(n)
    """
    values = data.split(',')
    index = 0
    
    def dfs():
        nonlocal index
        if values[index] == 'null':
            index += 1
            return None
        node = TreeNode(int(values[index]))
        index += 1
        node.left = dfs()
        node.right = dfs()
        return node
    
    return dfs()
```

---

### 95. Merge k Sorted Lists

**Problem:**
You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Answer:**

### JavaScript
```javascript
function mergeKLists(lists) {
  if (lists.length === 0) return null;
  
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }
  
  return lists[0];
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}
// Time: O(n * log k), Space: O(1)
```

### Python
```python
def merge_k_lists(lists):
    """
    Divide and conquer merge
    Time: O(n * log k)
    Space: O(1)
    """
    if not lists:
        return None
    
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge_two_lists(l1, l2))
        lists = merged
    
    return lists[0]

def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next
```

---

### 96. Remove Nth Node From End of List

**Problem:**
Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.

**Answer:**

### JavaScript
```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  
  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both pointers until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  second.next = second.next.next;
  return dummy.next;
}
// Time: O(L), Space: O(1)
```

### Python
```python
def remove_nth_from_end(head, n):
    """
    Two pointers approach
    Time: O(L)
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    first = second = dummy
    
    # Move first pointer n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches end
    while first:
        first = first.next
        second = second.next
    
    second.next = second.next.next
    return dummy.next
```

---


### 97. Add Two Numbers

**Problem:**
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

**Answer:**

### JavaScript
```javascript
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;
  
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  return dummy.next;
}
// Time: O(max(m, n)), Space: O(max(m, n))
```

### Python
```python
def add_two_numbers(l1, l2):
    """
    Linked list addition with carry
    Time: O(max(m, n))
    Space: O(max(m, n))
    """
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        total = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
        carry = total // 10
        current.next = ListNode(total % 10)
        current = current.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next
```

---

### 98. Swap Nodes in Pairs

**Problem:**
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

**Answer:**

### JavaScript
```javascript
function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;
    
    prev.next = second;
    first.next = second.next;
    second.next = first;
    
    prev = first;
  }
  
  return dummy.next;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def swap_pairs(head):
    """
    Iterative approach
    Time: O(n)
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    while prev.next and prev.next.next:
        first = prev.next
        second = prev.next.next
        
        prev.next = second
        first.next = second.next
        second.next = first
        
        prev = first
    
    return dummy.next
```

---

### 99. Reverse Nodes in k-Group

**Problem:**
Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list. `k` is a positive integer and is less than or equal to the length of the linked list.

**Answer:**

### JavaScript
```javascript
function reverseKGroup(head, k) {
  let current = head;
  let count = 0;
  
  // Check if there are k nodes
  while (current && count < k) {
    current = current.next;
    count++;
  }
  
  if (count === k) {
    current = reverseKGroup(current, k);
    
    // Reverse k nodes
    while (count > 0) {
      const temp = head.next;
      head.next = current;
      current = head;
      head = temp;
      count--;
    }
    head = current;
  }
  
  return head;
}
// Time: O(n), Space: O(n/k)
```

### Python
```python
def reverse_k_group(head, k):
    """
    Recursive approach
    Time: O(n)
    Space: O(n/k)
    """
    current = head
    count = 0
    
    # Check if there are k nodes
    while current and count < k:
        current = current.next
        count += 1
    
    if count == k:
        current = reverse_k_group(current, k)
        
        # Reverse k nodes
        while count > 0:
            temp = head.next
            head.next = current
            current = head
            head = temp
            count -= 1
        head = current
    
    return head
```

---

### 100. Copy List with Random Pointer

**Problem:**
A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`. Construct a deep copy of the list.

**Answer:**

### JavaScript
```javascript
function copyRandomList(head) {
  if (!head) return null;
  
  const map = new Map();
  let current = head;
  
  // First pass: create all nodes
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }
  
  // Second pass: set next and random pointers
  current = head;
  while (current) {
    map.get(current).next = current.next ? map.get(current.next) : null;
    map.get(current).random = current.random ? map.get(current.random) : null;
    current = current.next;
  }
  
  return map.get(head);
}
// Time: O(n), Space: O(n)
```

### Python
```python
def copy_random_list(head):
    """
    Hash map approach
    Time: O(n)
    Space: O(n)
    """
    if not head:
        return None
    
    map = {}
    current = head
    
    # First pass: create all nodes
    while current:
        map[current] = Node(current.val)
        current = current.next
    
    # Second pass: set next and random pointers
    current = head
    while current:
        map[current].next = map.get(current.next)
        map[current].random = map.get(current.random)
        current = current.next
    
    return map[head]
```

---

### 101. LRU Cache

**Problem:**
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get(key)` and `put(key, value)` methods.

**Answer:**

### JavaScript
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }
}
// Time: O(1), Space: O(capacity)
```

### Python
```python
from collections import OrderedDict

class LRUCache:
    """
    OrderedDict implementation
    Time: O(1)
    Space: O(capacity)
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        elif len(self.cache) >= self.capacity:
            self.cache.popitem(last=False)
        self.cache[key] = value
```

---

### 102. Merge Intervals

**Problem:**
Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Answer:**

### JavaScript
```javascript
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  
  return merged;
}
// Time: O(n log n), Space: O(n)
```

### Python
```python
def merge(intervals):
    """
    Sort and merge
    Time: O(n log n)
    Space: O(n)
    """
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for i in range(1, len(intervals)):
        last = merged[-1]
        if intervals[i][0] <= last[1]:
            last[1] = max(last[1], intervals[i][1])
        else:
            merged.append(intervals[i])
    
    return merged
```

---

### 103. Non-overlapping Intervals

**Problem:**
Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

**Answer:**

### JavaScript
```javascript
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      count++;
    } else {
      end = intervals[i][1];
    }
  }
  
  return count;
}
// Time: O(n log n), Space: O(1)
```

### Python
```python
def erase_overlap_intervals(intervals):
    """
    Greedy approach - sort by end time
    Time: O(n log n)
    Space: O(1)
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1
        else:
            end = intervals[i][1]
    
    return count
```

---

### 104. Meeting Rooms

**Problem:**
Given an array of meeting time `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.

**Answer:**

### JavaScript
```javascript
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  
  return true;
}
// Time: O(n log n), Space: O(1)
```

### Python
```python
def can_attend_meetings(intervals):
    """
    Sort and check overlaps
    Time: O(n log n)
    Space: O(1)
    """
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    
    return True
```

---

### 105. Meeting Rooms II

**Problem:**
Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.

**Answer:**

### JavaScript
```javascript
function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  
  let rooms = 0;
  let endIndex = 0;
  
  for (let start of starts) {
    if (start >= ends[endIndex]) {
      endIndex++;
    } else {
      rooms++;
    }
  }
  
  return rooms;
}
// Time: O(n log n), Space: O(n)
```

### Python
```python
def min_meeting_rooms(intervals):
    """
    Two pointers approach
    Time: O(n log n)
    Space: O(n)
    """
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    
    rooms = 0
    end_index = 0
    
    for start in starts:
        if start >= ends[end_index]:
            end_index += 1
        else:
            rooms += 1
    
    return rooms
```

---

### 106. Insert Interval

**Problem:**
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `i`th interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval. Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

**Answer:**

### JavaScript
```javascript
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  
  // Add all intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }
  
  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  
  // Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }
  
  return result;
}
// Time: O(n), Space: O(n)
```

### Python
```python
def insert(intervals, new_interval):
    """
    Three phases: before, merge, after
    Time: O(n)
    Space: O(n)
    """
    result = []
    i = 0
    
    # Add all intervals before new_interval
    while i < len(intervals) and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    
    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1
    
    return result
```

---

### 107. Jump Game

**Problem:**
You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.

**Answer:**

### JavaScript
```javascript
function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  
  return true;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def can_jump(nums):
    """
    Greedy approach
    Time: O(n)
    Space: O(1)
    """
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= len(nums) - 1:
            return True
    
    return True
```

---

### 108. Jump Game II

**Problem:**
You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`. Each element `nums[i]` represents the maximum length of a forward jump from index `i`. Return the minimum number of jumps to reach `nums[n - 1]`.

**Answer:**

### JavaScript
```javascript
function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  
  return jumps;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def jump(nums):
    """
    Greedy BFS approach
    Time: O(n)
    Space: O(1)
    """
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps
```

---

### 109. Gas Station

**Problem:**
There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`. You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i`th station to its next `(i + 1)`th station. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`.

**Answer:**

### JavaScript
```javascript
function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;
  
  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currentTank += gas[i] - cost[i];
    
    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }
  
  return totalTank >= 0 ? startStation : -1;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def can_complete_circuit(gas, cost):
    """
    Greedy approach
    Time: O(n)
    Space: O(1)
    """
    total_tank = 0
    current_tank = 0
    start_station = 0
    
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]
        
        if current_tank < 0:
            start_station = i + 1
            current_tank = 0
    
    return start_station if total_tank >= 0 else -1
```

---

### 110. Candy

**Problem:**
There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`. You are giving candies to these children subjected to the following requirements: Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.

**Answer:**

### JavaScript
```javascript
function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  
  // Left to right
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  
  // Right to left
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }
  
  return candies.reduce((a, b) => a + b, 0);
}
// Time: O(n), Space: O(n)
```

### Python
```python
def candy(ratings):
    """
    Two passes
    Time: O(n)
    Space: O(n)
    """
    n = len(ratings)
    candies = [1] * n
    
    # Left to right
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    
    # Right to left
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    
    return sum(candies)
```

---

### 111. Trapping Rain Water

**Problem:**
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Answer:**

### JavaScript
```javascript
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def trap(height):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water
```

---


### 112. Container With Most Water

**Problem:**
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water.

**Answer:**

### JavaScript
```javascript
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * minHeight);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxWater;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def max_area(height):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        min_height = min(height[left], height[right])
        max_water = max(max_water, width * min_height)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
```

---

### 113. Longest Substring Without Repeating Characters

**Problem:**
Given a string `s`, find the length of the longest substring without repeating characters.

**Answer:**

### JavaScript
```javascript
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0;
  let start = 0;
  
  for (let end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      start = Math.max(start, map.get(s[end]) + 1);
    }
    map.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  
  return maxLen;
}
// Time: O(n), Space: O(min(m, n)))
```

### Python
```python
def length_of_longest_substring(s):
    """
    Sliding window with hash map
    Time: O(n)
    Space: O(min(m, n))
    """
    map = {}
    max_len = 0
    start = 0
    
    for end in range(len(s)):
        if s[end] in map:
            start = max(start, map[s[end]] + 1)
        map[s[end]] = end
        max_len = max(max_len, end - start + 1)
    
    return max_len
```

---

### 114. Minimum Window Substring

**Problem:**
Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

**Answer:**

### JavaScript
```javascript
function minWindow(s, t) {
  const need = {};
  for (let char of t) {
    need[char] = (need[char] || 0) + 1;
  }
  
  let left = 0, right = 0;
  let valid = 0;
  const window = {};
  let start = 0, len = Infinity;
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) valid++;
    }
    
    while (valid === Object.keys(need).length) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      
      const d = s[left];
      left++;
      
      if (need[d]) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }
  
  return len === Infinity ? '' : s.substring(start, start + len);
}
// Time: O(|s| + |t|), Space: O(|s| + |t|)
```

### Python
```python
def min_window(s, t):
    """
    Sliding window approach
    Time: O(|s| + |t|)
    Space: O(|s| + |t|)
    """
    need = {}
    for char in t:
        need[char] = need.get(char, 0) + 1
    
    left = right = 0
    valid = 0
    window = {}
    start = 0
    min_len = float('inf')
    
    while right < len(s):
        c = s[right]
        right += 1
        
        if c in need:
            window[c] = window.get(c, 0) + 1
            if window[c] == need[c]:
                valid += 1
        
        while valid == len(need):
            if right - left < min_len:
                start = left
                min_len = right - left
            
            d = s[left]
            left += 1
            
            if d in need:
                if window[d] == need[d]:
                    valid -= 1
                window[d] -= 1
    
    return '' if min_len == float('inf') else s[start:start + min_len]
```

---

### 115. Sliding Window Maximum

**Problem:**
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the maximum sliding window.

**Answer:**

### JavaScript
```javascript
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = [];
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Remove indices with smaller values
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add max to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
}
// Time: O(n), Space: O(k)
```

### Python
```python
def max_sliding_window(nums, k):
    """
    Monotonic deque approach
    Time: O(n)
    Space: O(k)
    """
    from collections import deque
    
    result = []
    dq = deque()
    
    for i in range(len(nums)):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove indices with smaller values
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add max to result when window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result
```

---

### 116. Longest Palindromic Substring

**Problem:**
Given a string `s`, return the longest palindromic substring in `s`.

**Answer:**

### JavaScript
```javascript
function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
  
  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1);
    const len = Math.max(len1, len2);
    
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }
  
  return s.substring(start, start + maxLen);
}
// Time: O(n²), Space: O(1)
```

### Python
```python
def longest_palindrome(s):
    """
    Expand around center
    Time: O(n²)
    Space: O(1)
    """
    start = 0
    max_len = 0
    
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    for i in range(len(s)):
        len1 = expand_around_center(i, i)
        len2 = expand_around_center(i, i + 1)
        length = max(len1, len2)
        
        if length > max_len:
            max_len = length
            start = i - (length - 1) // 2
    
    return s[start:start + max_len]
```

---

### 117. Palindromic Substrings

**Problem:**
Given a string `s`, return the number of palindromic substrings in it.

**Answer:**

### JavaScript
```javascript
function countSubstrings(s) {
  let count = 0;
  
  function expandAroundCenter(left, right) {
    let localCount = 0;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      localCount++;
      left--;
      right++;
    }
    return localCount;
  }
  
  for (let i = 0; i < s.length; i++) {
    count += expandAroundCenter(i, i);
    count += expandAroundCenter(i, i + 1);
  }
  
  return count;
}
// Time: O(n²), Space: O(1)
```

### Python
```python
def count_substrings(s):
    """
    Expand around center
    Time: O(n²)
    Space: O(1)
    """
    count = 0
    
    def expand_around_center(left, right):
        local_count = 0
        while left >= 0 and right < len(s) and s[left] == s[right]:
            local_count += 1
            left -= 1
            right += 1
        return local_count
    
    for i in range(len(s)):
        count += expand_around_center(i, i)
        count += expand_around_center(i, i + 1)
    
    return count
```

---

### 118. Edit Distance

**Problem:**
Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.

**Answer:**

### JavaScript
```javascript
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }
  
  return dp[m][n];
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def min_distance(word1, word2):
    """
    Dynamic programming
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete
                    dp[i][j - 1],      # insert
                    dp[i - 1][j - 1]   # replace
                )
    
    return dp[m][n]
```

---

### 119. Longest Common Subsequence

**Problem:**
Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.

**Answer:**

### JavaScript
```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def longest_common_subsequence(text1, text2):
    """
    Dynamic programming
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]
```

---

### 120. Maximum Product Subarray

**Problem:**
Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

**Answer:**

### JavaScript
```javascript
function maxProduct(nums) {
  let maxProd = nums[0];
  let minProd = nums[0];
  let result = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }
    
    maxProd = Math.max(nums[i], maxProd * nums[i]);
    minProd = Math.min(nums[i], minProd * nums[i]);
    
    result = Math.max(result, maxProd);
  }
  
  return result;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def max_product(nums):
    """
    Track both max and min products
    Time: O(n)
    Space: O(1)
    """
    max_prod = min_prod = result = nums[0]
    
    for i in range(1, len(nums)):
        if nums[i] < 0:
            max_prod, min_prod = min_prod, max_prod
        
        max_prod = max(nums[i], max_prod * nums[i])
        min_prod = min(nums[i], min_prod * nums[i])
        
        result = max(result, max_prod)
    
    return result
```

---

### 121. House Robber

**Problem:**
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Answer:**

### JavaScript
```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def rob(nums):
    """
    Dynamic programming
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2 = nums[0]
    prev1 = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = current
    
    return prev1
```

---

### 122. House Robber II

**Problem:**
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Answer:**

### JavaScript
```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  
  function robLinear(houses) {
    let prev2 = houses[0];
    let prev1 = Math.max(houses[0], houses[1]);
    
    for (let i = 2; i < houses.length; i++) {
      const current = Math.max(prev1, prev2 + houses[i]);
      prev2 = prev1;
      prev1 = current;
    }
    
    return prev1;
  }
  
  return Math.max(
    robLinear(nums.slice(0, nums.length - 1)),
    robLinear(nums.slice(1))
  );
}
// Time: O(n), Space: O(1)
```

### Python
```python
def rob(nums):
    """
    Two cases: exclude first or exclude last
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    if len(nums) == 2:
        return max(nums[0], nums[1])
    
    def rob_linear(houses):
        prev2 = houses[0]
        prev1 = max(houses[0], houses[1])
        
        for i in range(2, len(houses)):
            current = max(prev1, prev2 + houses[i])
            prev2 = prev1
            prev1 = current
        
        return prev1
    
    return max(
        rob_linear(nums[:-1]),
        rob_linear(nums[1:])
    )
```

---

### 123. Decode Ways

**Problem:**
A message containing letters from `A-Z` can be encoded into numbers using the following mapping: 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above. Given a string `s` containing only digits, return the number of ways to decode it.

**Answer:**

### JavaScript
```javascript
function numDecodings(s) {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] === '0' ? 0 : 1;
  
  for (let i = 2; i <= n; i++) {
    const oneDigit = parseInt(s[i - 1]);
    const twoDigits = parseInt(s.substring(i - 2, i));
    
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  
  return dp[n];
}
// Time: O(n), Space: O(n)
```

### Python
```python
def num_decodings(s):
    """
    Dynamic programming
    Time: O(n)
    Space: O(n)
    """
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 0 if s[0] == '0' else 1
    
    for i in range(2, n + 1):
        one_digit = int(s[i - 1])
        two_digits = int(s[i - 2:i])
        
        if 1 <= one_digit <= 9:
            dp[i] += dp[i - 1]
        if 10 <= two_digits <= 26:
            dp[i] += dp[i - 2]
    
    return dp[n]
```

---

### 124. Unique Paths

**Problem:**
There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

**Answer:**

### JavaScript
```javascript
function uniquePaths(m, n) {
  const dp = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def unique_paths(m, n):
    """
    Dynamic programming
    Time: O(m * n)
    Space: O(m * n)
    """
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]
```

---

### 125. Climbing Stairs

**Problem:**
You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Answer:**

### JavaScript
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def climb_stairs(n):
    """
    Fibonacci-like sequence
    Time: O(n)
    Space: O(1)
    """
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1
```

---

### 126. Coin Change II

**Problem:**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.

**Answer:**

### JavaScript
```javascript
function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}
// Time: O(amount * coins.length), Space: O(amount)
```

### Python
```python
def change(amount, coins):
    """
    Dynamic programming
    Time: O(amount * len(coins))
    Space: O(amount)
    """
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]
```

---


### 127. Unique Paths II

**Problem:**
You are given an `m x n` integer array `grid`. There is a robot initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. An obstacle and space are marked as `1` and `0` respectively in `grid`. Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

**Answer:**

### JavaScript
```javascript
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  
  if (obstacleGrid[0][0] === 1) return 0;
  
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  dp[0][0] = 1;
  
  for (let i = 1; i < m; i++) {
    dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i - 1][0];
  }
  
  for (let j = 1; j < n; j++) {
    dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j - 1];
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  
  return dp[m - 1][n - 1];
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def unique_paths_with_obstacles(obstacle_grid):
    """
    Dynamic programming with obstacles
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(obstacle_grid), len(obstacle_grid[0])
    
    if obstacle_grid[0][0] == 1:
        return 0
    
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1
    
    for i in range(1, m):
        dp[i][0] = 0 if obstacle_grid[i][0] == 1 else dp[i - 1][0]
    
    for j in range(1, n):
        dp[0][j] = 0 if obstacle_grid[0][j] == 1 else dp[0][j - 1]
    
    for i in range(1, m):
        for j in range(1, n):
            if obstacle_grid[i][j] == 1:
                dp[i][j] = 0
            else:
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]
```

---

### 128. Minimum Path Sum

**Problem:**
Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Answer:**

### JavaScript
```javascript
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;
  
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }
  
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1];
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }
  
  return grid[m - 1][n - 1];
}
// Time: O(m * n), Space: O(1)
```

### Python
```python
def min_path_sum(grid):
    """
    Dynamic programming in-place
    Time: O(m * n)
    Space: O(1)
    """
    m, n = len(grid), len(grid[0])
    
    for i in range(1, m):
        grid[i][0] += grid[i - 1][0]
    
    for j in range(1, n):
        grid[0][j] += grid[0][j - 1]
    
    for i in range(1, m):
        for j in range(1, n):
            grid[i][j] += min(grid[i - 1][j], grid[i][j - 1])
    
    return grid[m - 1][n - 1]
```

---

### 129. Triangle

**Problem:**
Given a `triangle` array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below.

**Answer:**

### JavaScript
```javascript
function minimumTotal(triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.min(
        triangle[i + 1][j],
        triangle[i + 1][j + 1]
      );
    }
  }
  return triangle[0][0];
}
// Time: O(n²), Space: O(1)
```

### Python
```python
def minimum_total(triangle):
    """
    Bottom-up dynamic programming
    Time: O(n²)
    Space: O(1)
    """
    for i in range(len(triangle) - 2, -1, -1):
        for j in range(len(triangle[i])):
            triangle[i][j] += min(
                triangle[i + 1][j],
                triangle[i + 1][j + 1]
            )
    return triangle[0][0]
```

---

### 130. Maximum Subarray

**Problem:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Answer:**

### JavaScript
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
// Time: O(n), Space: O(1) - Kadane's Algorithm
```

### Python
```python
def max_subarray(nums):
    """
    Kadane's Algorithm
    Time: O(n)
    Space: O(1)
    """
    max_sum = current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

---

### 131. Best Time to Buy and Sell Stock with Transaction Fee

**Problem:**
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day, and an integer `fee` representing a transaction fee. Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Answer:**

### JavaScript
```javascript
function maxProfit(prices, fee) {
  let cash = 0;
  let hold = -prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  
  return cash;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def max_profit(prices, fee):
    """
    State machine approach
    Time: O(n)
    Space: O(1)
    """
    cash = 0
    hold = -prices[0]
    
    for i in range(1, len(prices)):
        cash = max(cash, hold + prices[i] - fee)
        hold = max(hold, cash - prices[i])
    
    return cash
```

---

### 132. Longest Increasing Path in a Matrix

**Problem:**
Given an `m x n` integers `matrix`, return the length of the longest increasing path in `matrix`. From each cell, you can either move in four directions: left, right, up, or down.

**Answer:**

### JavaScript
```javascript
function longestIncreasingPath(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const memo = Array(m).fill(null).map(() => Array(n).fill(0));
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  function dfs(i, j) {
    if (memo[i][j] > 0) return memo[i][j];
    
    let maxPath = 1;
    for (let [dx, dy] of directions) {
      const x = i + dx;
      const y = j + dy;
      if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
        maxPath = Math.max(maxPath, 1 + dfs(x, y));
      }
    }
    
    memo[i][j] = maxPath;
    return maxPath;
  }
  
  let result = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }
  
  return result;
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def longest_increasing_path(matrix):
    """
    DFS with memoization
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(matrix), len(matrix[0])
    memo = [[0] * n for _ in range(m)]
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    
    def dfs(i, j):
        if memo[i][j] > 0:
            return memo[i][j]
        
        max_path = 1
        for dx, dy in directions:
            x, y = i + dx, j + dy
            if 0 <= x < m and 0 <= y < n and matrix[x][y] > matrix[i][j]:
                max_path = max(max_path, 1 + dfs(x, y))
        
        memo[i][j] = max_path
        return max_path
    
    result = 0
    for i in range(m):
        for j in range(n):
            result = max(result, dfs(i, j))
    
    return result
```

---

### 133. Number of Islands

**Problem:**
Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

**Answer:**

### JavaScript
```javascript
function numIslands(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
      return;
    }
    
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def num_islands(grid):
    """
    DFS approach
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(grid), len(grid[0])
    count = 0
    
    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == '0':
            return
        
        grid[i][j] = '0'
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    
    return count
```

---

### 134. Max Area of Island

**Problem:**
You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected 4-directionally (horizontal or vertical). The area of an island is the number of cells with a value `1` in the island. Return the maximum area of an island in `grid`.

**Answer:**

### JavaScript
```javascript
function maxAreaOfIsland(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let maxArea = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0;
    }
    
    grid[i][j] = 0;
    return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1);
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(i, j));
      }
    }
  }
  
  return maxArea;
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def max_area_of_island(grid):
    """
    DFS approach
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(grid), len(grid[0])
    max_area = 0
    
    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
            return 0
        
        grid[i][j] = 0
        return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
    
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                max_area = max(max_area, dfs(i, j))
    
    return max_area
```

---

### 135. Surrounded Regions

**Problem:**
Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`. A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

**Answer:**

### JavaScript
```javascript
function solve(board) {
  const m = board.length;
  const n = board[0].length;
  
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
      return;
    }
    
    board[i][j] = '#';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  // Mark border O's
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }
  
  // Flip remaining O's to X's and #'s back to O's
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      } else if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def solve(board):
    """
    DFS from borders
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(board), len(board[0])
    
    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
            return
        
        board[i][j] = '#'
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    
    # Mark border O's
    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)
    
    # Flip remaining O's to X's and #'s back to O's
    for i in range(m):
        for j in range(n):
            if board[i][j] == 'O':
                board[i][j] = 'X'
            elif board[i][j] == '#':
                board[i][j] = 'O'
```

---

### 136. Walls and Gates

**Problem:**
You are given an `m x n` grid `rooms` initialized with these three possible values: `-1` represents a wall or an obstacle, `0` represents a gate, `INF` represents an empty room. Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should remain `INF`.

**Answer:**

### JavaScript
```javascript
function wallsAndGates(rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const queue = [];
  
  // Find all gates
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }
  
  // BFS from all gates
  while (queue.length > 0) {
    const [i, j] = queue.shift();
    
    for (let [dx, dy] of directions) {
      const x = i + dx;
      const y = j + dy;
      
      if (x >= 0 && x < m && y >= 0 && y < n && rooms[x][y] === 2147483647) {
        rooms[x][y] = rooms[i][j] + 1;
        queue.push([x, y]);
      }
    }
  }
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def walls_and_gates(rooms):
    """
    BFS from all gates
    Time: O(m * n)
    Space: O(m * n)
    """
    from collections import deque
    
    m, n = len(rooms), len(rooms[0])
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    queue = deque()
    
    # Find all gates
    for i in range(m):
        for j in range(n):
            if rooms[i][j] == 0:
                queue.append((i, j))
    
    # BFS from all gates
    while queue:
        i, j = queue.popleft()
        
        for dx, dy in directions:
            x, y = i + dx, j + dy
            if 0 <= x < m and 0 <= y < n and rooms[x][y] == 2147483647:
                rooms[x][y] = rooms[i][j] + 1
                queue.append((x, y))
```

---

### 137. Course Schedule

**Problem:**
There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return `true` if you can finish all courses. Otherwise, return `false`.

**Answer:**

### JavaScript
```javascript
function canFinish(numCourses, prerequisites) {
  const graph = Array(numCourses).fill(null).map(() => []);
  const inDegree = Array(numCourses).fill(0);
  
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  
  let count = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    count++;
    
    for (let next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
  
  return count === numCourses;
}
// Time: O(V + E), Space: O(V + E)
```

### Python
```python
def can_finish(num_courses, prerequisites):
    """
    Topological sort (Kahn's algorithm)
    Time: O(V + E)
    Space: O(V + E)
    """
    from collections import deque
    
    graph = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    count = 0
    
    while queue:
        course = queue.popleft()
        count += 1
        
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return count == num_courses
```

---

### 138. Course Schedule II

**Problem:**
There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return the ordering of courses you should take to finish all courses.

**Answer:**

### JavaScript
```javascript
function findOrder(numCourses, prerequisites) {
  const graph = Array(numCourses).fill(null).map(() => []);
  const inDegree = Array(numCourses).fill(0);
  
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  
  const result = [];
  while (queue.length > 0) {
    const course = queue.shift();
    result.push(course);
    
    for (let next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
  
  return result.length === numCourses ? result : [];
}
// Time: O(V + E), Space: O(V + E)
```

### Python
```python
def find_order(num_courses, prerequisites):
    """
    Topological sort (Kahn's algorithm)
    Time: O(V + E)
    Space: O(V + E)
    """
    from collections import deque
    
    graph = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    result = []
    
    while queue:
        course = queue.popleft()
        result.append(course)
        
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return result if len(result) == num_courses else []
```

---

### 139. Alien Dictionary

**Problem:**
There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings `words` from the alien language's dictionary. Derive the order of letters in this language.

**Answer:**

### JavaScript
```javascript
function alienOrder(words) {
  const graph = {};
  const inDegree = {};
  
  // Initialize
  for (let word of words) {
    for (let char of word) {
      graph[char] = [];
      inDegree[char] = 0;
    }
  }
  
  // Build graph
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return '';
    }
    
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        graph[word1[j]].push(word2[j]);
        inDegree[word2[j]]++;
        break;
      }
    }
  }
  
  // Topological sort
  const queue = [];
  for (let char in inDegree) {
    if (inDegree[char] === 0) {
      queue.push(char);
    }
  }
  
  const result = [];
  while (queue.length > 0) {
    const char = queue.shift();
    result.push(char);
    
    for (let next of graph[char]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
  
  return result.length === Object.keys(inDegree).length ? result.join('') : '';
}
// Time: O(C) where C is total characters, Space: O(1)
```

### Python
```python
def alien_order(words):
    """
    Topological sort
    Time: O(C) where C is total characters
    Space: O(1)
    """
    from collections import deque
    
    graph = {}
    in_degree = {}
    
    # Initialize
    for word in words:
        for char in word:
            graph[char] = []
            in_degree[char] = 0
    
    # Build graph
    for i in range(len(words) - 1):
        word1, word2 = words[i], words[i + 1]
        
        if len(word1) > len(word2) and word1.startswith(word2):
            return ''
        
        for j in range(min(len(word1), len(word2))):
            if word1[j] != word2[j]:
                graph[word1[j]].append(word2[j])
                in_degree[word2[j]] += 1
                break
    
    # Topological sort
    queue = deque([char for char in in_degree if in_degree[char] == 0])
    result = []
    
    while queue:
        char = queue.popleft()
        result.append(char)
        
        for next_char in graph[char]:
            in_degree[next_char] -= 1
            if in_degree[next_char] == 0:
                queue.append(next_char)
    
    return ''.join(result) if len(result) == len(in_degree) else ''
```

---

### 140. Clone Graph

**Problem:**
Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.

**Answer:**

### JavaScript
```javascript
function cloneGraph(node) {
  if (!node) return null;
  
  const map = new Map();
  
  function clone(n) {
    if (map.has(n)) {
      return map.get(n);
    }
    
    const copy = new Node(n.val);
    map.set(n, copy);
    
    for (let neighbor of n.neighbors) {
      copy.neighbors.push(clone(neighbor));
    }
    
    return copy;
  }
  
  return clone(node);
}
// Time: O(V + E), Space: O(V)
```

### Python
```python
def clone_graph(node):
    """
    DFS with hash map
    Time: O(V + E)
    Space: O(V)
    """
    if not node:
        return None
    
    map = {}
    
    def clone(n):
        if n in map:
            return map[n]
        
        copy = Node(n.val)
        map[n] = copy
        
        for neighbor in n.neighbors:
            copy.neighbors.append(clone(neighbor))
        
        return copy
    
    return clone(node)
```

---

### 141. Pacific Atlantic Water Flow

**Problem:**
There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. Water can only flow in four directions. Return a 2D list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from cell `(ri, ci)` to both the Pacific and Atlantic oceans.

**Answer:**

### JavaScript
```javascript
function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array(m).fill(null).map(() => Array(n).fill(false));
  const atlantic = Array(m).fill(null).map(() => Array(n).fill(false));
  
  function dfs(i, j, ocean) {
    ocean[i][j] = true;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (let [dx, dy] of directions) {
      const x = i + dx;
      const y = j + dy;
      if (x >= 0 && x < m && y >= 0 && y < n && 
          !ocean[x][y] && heights[x][y] >= heights[i][j]) {
        dfs(x, y, ocean);
      }
    }
  }
  
  // Pacific (top and left)
  for (let i = 0; i < m; i++) dfs(i, 0, pacific);
  for (let j = 0; j < n; j++) dfs(0, j, pacific);
  
  // Atlantic (bottom and right)
  for (let i = 0; i < m; i++) dfs(i, n - 1, atlantic);
  for (let j = 0; j < n; j++) dfs(m - 1, j, atlantic);
  
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }
  
  return result;
}
// Time: O(m * n), Space: O(m * n)
```

### Python
```python
def pacific_atlantic(heights):
    """
    DFS from both oceans
    Time: O(m * n)
    Space: O(m * n)
    """
    m, n = len(heights), len(heights[0])
    pacific = [[False] * n for _ in range(m)]
    atlantic = [[False] * n for _ in range(m)]
    
    def dfs(i, j, ocean):
        ocean[i][j] = True
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        
        for dx, dy in directions:
            x, y = i + dx, j + dy
            if (0 <= x < m and 0 <= y < n and 
                not ocean[x][y] and heights[x][y] >= heights[i][j]):
                dfs(x, y, ocean)
    
    # Pacific (top and left)
    for i in range(m):
        dfs(i, 0, pacific)
    for j in range(n):
        dfs(0, j, pacific)
    
    # Atlantic (bottom and right)
    for i in range(m):
        dfs(i, n - 1, atlantic)
    for j in range(n):
        dfs(m - 1, j, atlantic)
    
    result = []
    for i in range(m):
        for j in range(n):
            if pacific[i][j] and atlantic[i][j]:
                result.append([i, j])
    
    return result
```

---


### 142. Word Search

**Problem:**
Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.

**Answer:**

### JavaScript
```javascript
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;
  
  function dfs(i, j, index) {
    if (index === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[index]) {
      return false;
    }
    
    const temp = board[i][j];
    board[i][j] = '#';
    
    const found = dfs(i + 1, j, index + 1) ||
                  dfs(i - 1, j, index + 1) ||
                  dfs(i, j + 1, index + 1) ||
                  dfs(i, j - 1, index + 1);
    
    board[i][j] = temp;
    return found;
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  
  return false;
}
// Time: O(m * n * 4^L), Space: O(L)
```

### Python
```python
def exist(board, word):
    """
    Backtracking DFS
    Time: O(m * n * 4^L)
    Space: O(L)
    """
    m, n = len(board), len(board[0])
    
    def dfs(i, j, index):
        if index == len(word):
            return True
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[index]:
            return False
        
        temp = board[i][j]
        board[i][j] = '#'
        
        found = (dfs(i + 1, j, index + 1) or
                 dfs(i - 1, j, index + 1) or
                 dfs(i, j + 1, index + 1) or
                 dfs(i, j - 1, index + 1))
        
        board[i][j] = temp
        return found
    
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True
    
    return False
```

---

### 143. Word Search II

**Problem:**
Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.

**Answer:**

### JavaScript
```javascript
function findWords(board, words) {
  const result = [];
  const trie = new Trie();
  
  for (let word of words) {
    trie.insert(word);
  }
  
  const m = board.length;
  const n = board[0].length;
  
  function dfs(i, j, node, path) {
    if (node.word) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }
    
    if (i < 0 || i >= m || j < 0 || j >= n || !node.children[board[i][j]]) {
      return;
    }
    
    const char = board[i][j];
    const nextNode = node.children[char];
    board[i][j] = '#';
    
    dfs(i + 1, j, nextNode, path + char);
    dfs(i - 1, j, nextNode, path + char);
    dfs(i, j + 1, nextNode, path + char);
    dfs(i, j - 1, nextNode, path + char);
    
    board[i][j] = char;
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, trie.root, '');
    }
  }
  
  return result;
}

class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.word = word;
  }
}
// Time: O(m * n * 4^L), Space: O(ALPHABET_SIZE * N * M)
```

### Python
```python
def find_words(board, words):
    """
    Trie + Backtracking
    Time: O(m * n * 4^L)
    Space: O(ALPHABET_SIZE * N * M)
    """
    class TrieNode:
        def __init__(self):
            self.children = {}
            self.word = None
    
    class Trie:
        def __init__(self):
            self.root = TrieNode()
        
        def insert(self, word):
            node = self.root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word
    
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    result = []
    m, n = len(board), len(board[0])
    
    def dfs(i, j, node):
        if node.word:
            result.append(node.word)
            node.word = None  # Avoid duplicates
        
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] not in node.children:
            return
        
        char = board[i][j]
        next_node = node.children[char]
        board[i][j] = '#'
        
        dfs(i + 1, j, next_node)
        dfs(i - 1, j, next_node)
        dfs(i, j + 1, next_node)
        dfs(i, j - 1, next_node)
        
        board[i][j] = char
    
    for i in range(m):
        for j in range(n):
            dfs(i, j, trie.root)
    
    return result
```

---

### 144. Design Add and Search Words Data Structure

**Problem:**
Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the `WordDictionary` class with `addWord(word)` and `search(word)` methods. `search(word)` can search a literal word or a regular expression string containing only letters `a-z` or `.`. A `.` means it can represent any one letter.

**Answer:**

### JavaScript
```javascript
class WordDictionary {
  constructor() {
    this.trie = {};
  }
  
  addWord(word) {
    let node = this.trie;
    for (let char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEnd = true;
  }
  
  search(word) {
    function dfs(node, index) {
      if (index === word.length) {
        return node.isEnd === true;
      }
      
      const char = word[index];
      if (char === '.') {
        for (let key in node) {
          if (key !== 'isEnd' && dfs(node[key], index + 1)) {
            return true;
          }
        }
        return false;
      } else {
        if (!node[char]) return false;
        return dfs(node[char], index + 1);
      }
    }
    
    return dfs(this.trie, 0);
  }
}
// Time: O(M) for addWord, O(N * 26^M) for search, Space: O(ALPHABET_SIZE * N * M)
```

### Python
```python
class WordDictionary:
    """
    Trie with wildcard support
    Time: O(M) for addWord, O(N * 26^M) for search
    Space: O(ALPHABET_SIZE * N * M)
    """
    def __init__(self):
        self.trie = {}
    
    def add_word(self, word):
        node = self.trie
        for char in word:
            if char not in node:
                node[char] = {}
            node = node[char]
        node['is_end'] = True
    
    def search(self, word):
        def dfs(node, index):
            if index == len(word):
                return node.get('is_end', False)
            
            char = word[index]
            if char == '.':
                for key in node:
                    if key != 'is_end' and dfs(node[key], index + 1):
                        return True
                return False
            else:
                if char not in node:
                    return False
                return dfs(node[char], index + 1)
        
        return dfs(self.trie, 0)
```

---

### 145. Implement Trie (Prefix Tree)

**Problem:**
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the `Trie` class with `insert(word)`, `search(word)`, and `startsWith(prefix)` methods.

**Answer:**

### JavaScript
```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEnd;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}
// Time: O(M) for each operation, Space: O(ALPHABET_SIZE * N * M)
```

### Python
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    """
    Prefix tree implementation
    Time: O(M) for each operation
    Space: O(ALPHABET_SIZE * N * M)
    """
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

---

### 146. Design Twitter

**Problem:**
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

**Answer:**

### JavaScript
```javascript
class Twitter {
  constructor() {
    this.tweets = [];
    this.follows = new Map();
  }
  
  postTweet(userId, tweetId) {
    this.tweets.push({ userId, tweetId, time: Date.now() });
  }
  
  getNewsFeed(userId) {
    const followees = this.follows.get(userId) || new Set();
    followees.add(userId); // Include own tweets
    
    const feed = this.tweets
      .filter(tweet => followees.has(tweet.userId))
      .sort((a, b) => b.time - a.time)
      .slice(0, 10)
      .map(tweet => tweet.tweetId);
    
    return feed;
  }
  
  follow(followerId, followeeId) {
    if (!this.follows.has(followerId)) {
      this.follows.set(followerId, new Set());
    }
    this.follows.get(followerId).add(followeeId);
  }
  
  unfollow(followerId, followeeId) {
    if (this.follows.has(followerId)) {
      this.follows.get(followerId).delete(followeeId);
    }
  }
}
// Time: O(n log n) for getNewsFeed, Space: O(n)
```

### Python
```python
class Twitter:
    """
    Simplified Twitter design
    Time: O(n log n) for get_news_feed
    Space: O(n)
    """
    def __init__(self):
        self.tweets = []
        self.follows = {}
    
    def post_tweet(self, userId, tweetId):
        import time
        self.tweets.append({'userId': userId, 'tweetId': tweetId, 'time': time.time()})
    
    def get_news_feed(self, userId):
        followees = self.follows.get(userId, set())
        followees.add(userId)  # Include own tweets
        
        feed = [tweet for tweet in self.tweets if tweet['userId'] in followees]
        feed.sort(key=lambda x: x['time'], reverse=True)
        return [tweet['tweetId'] for tweet in feed[:10]]
    
    def follow(self, followerId, followeeId):
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)
    
    def unfollow(self, followerId, followeeId):
        if followerId in self.follows:
            self.follows[followerId].discard(followeeId)
```

---

### 147. Time Based Key-Value Store

**Problem:**
Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

**Answer:**

### JavaScript
```javascript
class TimeMap {
  constructor() {
    this.map = new Map();
  }
  
  set(key, value, timestamp) {
    if (!this.map.has(key)) {
      this.map.set(key, []);
    }
    this.map.get(key).push({ value, timestamp });
  }
  
  get(key, timestamp) {
    if (!this.map.has(key)) return '';
    
    const arr = this.map.get(key);
    let left = 0, right = arr.length - 1;
    let result = '';
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid].timestamp <= timestamp) {
        result = arr[mid].value;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  }
}
// Time: O(1) for set, O(log n) for get, Space: O(n)
```

### Python
```python
class TimeMap:
    """
    Binary search for timestamp
    Time: O(1) for set, O(log n) for get
    Space: O(n)
    """
    def __init__(self):
        self.map = {}
    
    def set(self, key, value, timestamp):
        if key not in self.map:
            self.map[key] = []
        self.map[key].append({'value': value, 'timestamp': timestamp})
    
    def get(self, key, timestamp):
        if key not in self.map:
            return ''
        
        arr = self.map[key]
        left, right = 0, len(arr) - 1
        result = ''
        
        while left <= right:
            mid = (left + right) // 2
            if arr[mid]['timestamp'] <= timestamp:
                result = arr[mid]['value']
                left = mid + 1
            else:
                right = mid - 1
        
        return result
```

---

### 148. Insert Delete GetRandom O(1)

**Problem:**
Implement the `RandomizedSet` class with `insert(val)`, `remove(val)`, and `getRandom()` methods. Each method should work in average O(1) time complexity.

**Answer:**

### JavaScript
```javascript
class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }
  
  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }
  
  remove(val) {
    if (!this.map.has(val)) return false;
    const index = this.map.get(val);
    const lastVal = this.list[this.list.length - 1];
    
    this.list[index] = lastVal;
    this.map.set(lastVal, index);
    this.list.pop();
    this.map.delete(val);
    return true;
  }
  
  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
}
// Time: O(1) average, Space: O(n)
```

### Python
```python
import random

class RandomizedSet:
    """
    Hash map + array for O(1) operations
    Time: O(1) average
    Space: O(n)
    """
    def __init__(self):
        self.map = {}
        self.list = []
    
    def insert(self, val):
        if val in self.map:
            return False
        self.map[val] = len(self.list)
        self.list.append(val)
        return True
    
    def remove(self, val):
        if val not in self.map:
            return False
        index = self.map[val]
        last_val = self.list[-1]
        
        self.list[index] = last_val
        self.map[last_val] = index
        self.list.pop()
        del self.map[val]
        return True
    
    def get_random(self):
        return random.choice(self.list)
```

---

### 149. Design Underground System

**Problem:**
An underground railway system is keeping track of customer travel times between different stations. Implement the `UndergroundSystem` class with `checkIn(id, stationName, t)`, `checkOut(id, stationName, t)`, and `getAverageTime(startStation, endStation)` methods.

**Answer:**

### JavaScript
```javascript
class UndergroundSystem {
  constructor() {
    this.checkIns = new Map();
    this.times = new Map();
  }
  
  checkIn(id, stationName, t) {
    this.checkIns.set(id, { stationName, t });
  }
  
  checkOut(id, stationName, t) {
    const checkIn = this.checkIns.get(id);
    const route = checkIn.stationName + ',' + stationName;
    const duration = t - checkIn.t;
    
    if (!this.times.has(route)) {
      this.times.set(route, { total: 0, count: 0 });
    }
    
    const routeData = this.times.get(route);
    routeData.total += duration;
    routeData.count++;
    
    this.checkIns.delete(id);
  }
  
  getAverageTime(startStation, endStation) {
    const route = startStation + ',' + endStation;
    const routeData = this.times.get(route);
    return routeData.total / routeData.count;
  }
}
// Time: O(1) for all operations, Space: O(n)
```

### Python
```python
class UndergroundSystem:
    """
    Track check-ins and route times
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.check_ins = {}
        self.times = {}
    
    def check_in(self, id, stationName, t):
        self.check_ins[id] = {'stationName': stationName, 't': t}
    
    def check_out(self, id, stationName, t):
        check_in = self.check_ins[id]
        route = check_in['stationName'] + ',' + stationName
        duration = t - check_in['t']
        
        if route not in self.times:
            self.times[route] = {'total': 0, 'count': 0}
        
        self.times[route]['total'] += duration
        self.times[route]['count'] += 1
        
        del self.check_ins[id]
    
    def get_average_time(self, startStation, endStation):
        route = startStation + ',' + endStation
        route_data = self.times[route]
        return route_data['total'] / route_data['count']
```

---

### 150. Design Hit Counter

**Problem:**
Design a hit counter which counts the number of hits received in the past 5 minutes. Implement the `HitCounter` class with `hit(timestamp)` and `getHits(timestamp)` methods.

**Answer:**

### JavaScript
```javascript
class HitCounter {
  constructor() {
    this.hits = [];
  }
  
  hit(timestamp) {
    this.hits.push(timestamp);
  }
  
  getHits(timestamp) {
    const fiveMinutesAgo = timestamp - 300;
    this.hits = this.hits.filter(hit => hit > fiveMinutesAgo);
    return this.hits.length;
  }
}
// Time: O(n) for getHits, Space: O(n)
```

### Python
```python
class HitCounter:
    """
    Simple list-based counter
    Time: O(n) for get_hits
    Space: O(n)
    """
    def __init__(self):
        self.hits = []
    
    def hit(self, timestamp):
        self.hits.append(timestamp)
    
    def get_hits(self, timestamp):
        five_minutes_ago = timestamp - 300
        self.hits = [hit for hit in self.hits if hit > five_minutes_ago]
        return len(self.hits)
```

---

