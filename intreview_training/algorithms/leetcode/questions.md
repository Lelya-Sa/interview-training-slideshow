# LeetCode Style Questions

> **Note**: For organized problem solutions with implementations in JavaScript, Python, and Java, see the [questions/](./questions/) directory. Each problem has its own folder with complete solutions.

## Array Questions (1-10)

### 1. Two Sum
Given array of integers and target, return indices of two numbers that add up to target.

**Solution:**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)
```

### 2. Best Time to Buy and Sell Stock
Find maximum profit from buying and selling stock once.

**Solution:**
```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
// Time: O(n), Space: O(1)
```

### 3. Contains Duplicate
Check if array contains duplicates.

**Solution:**
```javascript
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
// Time: O(n), Space: O(n)
```

### 4. Product of Array Except Self
Return array where each element is product of all other elements.

**Solution:**
```javascript
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }
  return result;
}
// Time: O(n), Space: O(1)
```

### 5. Maximum Subarray (Kadane's Algorithm)
Find contiguous subarray with largest sum.

**Solution:**
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
// Time: O(n), Space: O(1)
```

### 6. Merge Intervals
Merge overlapping intervals.

**Solution:**
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

### 7. 3Sum
Find all unique triplets that sum to zero.

**Solution:**
```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}
// Time: O(n²), Space: O(1)
```

### 8. Container With Most Water
Find two lines that form container with most water.

**Solution:**
```javascript
function maxArea(height) {
  let max = 0;
  let left = 0, right = height.length - 1;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
}
// Time: O(n), Space: O(1)
```

### 9. Group Anagrams
Group strings that are anagrams.

**Solution:**
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(str);
  }
  return Array.from(map.values());
}
// Time: O(n * k log k), Space: O(n)
```

### 10. Longest Consecutive Sequence
Find length of longest consecutive sequence.

**Solution:**
```javascript
function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (let num of set) {
    if (!set.has(num - 1)) {
      let length = 1;
      while (set.has(num + length)) {
        length++;
      }
      longest = Math.max(longest, length);
    }
  }
  return longest;
}
// Time: O(n), Space: O(n)
```

### 11. Move Zeroes
Move all zeros to end while maintaining relative order of non-zero elements.

**Solution:**
```javascript
function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
}
// Time: O(n), Space: O(1)
```

### 12. Squares of a Sorted Array
Return array of squares of each number sorted in non-decreasing order.

**Solution:**
```javascript
function sortedSquares(nums) {
  const result = [];
  let left = 0, right = nums.length - 1;
  let idx = nums.length - 1;
  
  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    
    if (leftSquare > rightSquare) {
      result[idx--] = leftSquare;
      left++;
    } else {
      result[idx--] = rightSquare;
      right--;
    }
  }
  return result;
}
// Time: O(n), Space: O(n)
```

### 13. Subarray Sum Equals K
Count number of subarrays with sum equal to k.

**Solution:**
```javascript
function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0;
  let count = 0;
  
  for (let num of nums) {
    sum += num;
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}
// Time: O(n), Space: O(n)
```

### 14. Next Permutation
Find next lexicographically greater permutation.

**Solution:**
```javascript
function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  
  reverse(nums, i + 1);
}

function reverse(nums, start) {
  let end = nums.length - 1;
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}
// Time: O(n), Space: O(1)
```

### 15. Maximum Sum Subarray of Size K (Sliding Window)
Find maximum sum of subarray of size k.

**Solution:**
```javascript
function maxSumSubarray(nums, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
// Time: O(n), Space: O(1)
```

### 16. Minimum Size Subarray Sum (Sliding Window)
Find minimal length of contiguous subarray with sum >= target.

**Solution:**
```javascript
function minSubArrayLen(target, nums) {
  let minLen = Infinity;
  let windowSum = 0;
  let left = 0;
  
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    
    while (windowSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      windowSum -= nums[left];
      left++;
    }
  }
  
  return minLen === Infinity ? 0 : minLen;
}
// Time: O(n), Space: O(1)
```

## String Questions (17-26)

### 11. Valid Parentheses
Check if parentheses are valid.

**Solution:**
```javascript
function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  return stack.length === 0;
}
// Time: O(n), Space: O(n)
```

### 12. Longest Substring Without Repeating Characters
Find length of longest substring without repeating characters.

**Solution:**
```javascript
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let max = 0;
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      start = Math.max(start, map.get(s[end]) + 1);
    }
    map.set(s[end], end);
    max = Math.max(max, end - start + 1);
  }
  return max;
}
// Time: O(n), Space: O(min(n, m))
```

### 13. Longest Palindromic Substring
Find longest palindromic substring.

**Solution:**
```javascript
function longestPalindrome(s) {
  let longest = '';
  for (let i = 0; i < s.length; i++) {
    const odd = expandAroundCenter(s, i, i);
    const even = expandAroundCenter(s, i, i + 1);
    const current = odd.length > even.length ? odd : even;
    if (current.length > longest.length) {
      longest = current;
    }
  }
  return longest;
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return s.substring(left + 1, right);
}
// Time: O(n²), Space: O(1)
```

### 14. Valid Anagram
Check if two strings are anagrams.

**Solution:**
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  for (let char of t) {
    if (!map.has(char) || map.get(char) === 0) return false;
    map.set(char, map.get(char) - 1);
  }
  return true;
}
// Time: O(n), Space: O(1) - limited characters
```

### 15. Reverse String
Reverse string in-place.

**Solution:**
```javascript
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}
// Time: O(n), Space: O(1)
```

## Linked List Questions (21-30)

### 21. Reverse Linked List
Reverse a linked list.

**Solution:**
```javascript
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
// Time: O(n), Space: O(1)
```

### 22. Merge Two Sorted Lists
Merge two sorted linked lists.

**Solution:**
```javascript
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
// Time: O(n + m), Space: O(1)
```

### 23. Linked List Cycle
Detect if linked list has cycle.

**Solution:**
```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
// Time: O(n), Space: O(1)
```

## Tree Questions (31-40)

### 31. Maximum Depth of Binary Tree
Find maximum depth of binary tree.

**Solution:**
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(n), Space: O(h)
```

### 32. Same Tree
Check if two trees are identical.

**Solution:**
```javascript
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
// Time: O(n), Space: O(h)
```

### 33. Invert Binary Tree
Invert a binary tree.

**Solution:**
```javascript
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}
// Time: O(n), Space: O(h)
```

## Dynamic Programming (41-50)

### 41. Climbing Stairs
Count ways to climb n stairs (1 or 2 steps at a time).

**Solution:**
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1, second = 2;
  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }
  return second;
}
// Time: O(n), Space: O(1)
```

### 42. House Robber
Maximum money that can be robbed from houses.

**Solution:**
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

