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

### 43. Binary Search
Find target in sorted array; return index or -1.

**Answer:** Left/right pointers; mid = (l+r)>>1; if nums[mid] < target l = mid+1 else r = mid (or mid-1). Time O(log n), Space O(1).

### 44. Search in Rotated Sorted Array
Search in array rotated at unknown pivot.

**Answer:** Binary search; compare mid with left to know which half is sorted; move l/r accordingly. Time O(log n), Space O(1).

### 45. Find Minimum in Rotated Sorted Array
Find minimum in rotated sorted array.

**Answer:** Binary search; compare mid with right; if nums[mid] > nums[r] min is in right half else left. Time O(log n), Space O(1).

### 46. Search Insert Position
Find index where target would be inserted in sorted array.

**Answer:** Binary search; return left when loop ends (insertion point). Time O(log n), Space O(1).

### 47. First and Last Position in Sorted Array
Find first and last index of target in sorted array.

**Answer:** Two binary searches: one for first (when equal move right), one for last (when equal move left). Time O(log n), Space O(1).

### 48. Valid Sudoku
Check if 9x9 board is valid (rows, cols, 3x3 boxes).

**Answer:** Three passes or one: use sets for each row, col, box (box index = (r/3)*3 + c/3). Time O(1) board size, Space O(1).

### 49. Combination Sum
Find all combinations of candidates that sum to target; reuse allowed.

**Answer:** Backtrack: choose candidate, recurse with same index (reuse), backtrack; base case sum == target or > target. Time O(2^target), Space O(target).

### 50. Permutations
Return all permutations of array.

**Answer:** Backtrack: swap current with each following, recurse, swap back. Or build path with used set. Time O(n!), Space O(n).

### 51. Merge Two Sorted Lists
Merge two sorted linked lists.

**Answer:** Dummy node; while both, attach smaller; attach rest. Time O(m+n), Space O(1).

### 52. Remove Nth Node From End
Remove nth node from end of list (one pass).

**Answer:** Two pointers: advance first n+1 steps, then move both until first is null; second.next = second.next.next. Time O(n), Space O(1).

### 53. Reorder List
L0 -> Ln -> L1 -> Ln-1 -> ...

**Answer:** Find mid (slow/fast), reverse second half, merge two halves. Time O(n), Space O(1).

### 54. Copy List with Random Pointer
Deep copy list with random pointer.

**Answer:** Map old node -> new node; two passes: create nodes, then set next and random. Or interleave copy then split. Time O(n), Space O(n).

### 55. Linked List Cycle II
Return node where cycle starts.

**Answer:** Slow/fast; when meet, reset slow to head; move both one step until meet; that node is start. Time O(n), Space O(1).

### 56. Binary Tree Level Order Traversal
Return BFS levels.

**Answer:** Queue; while queue not empty, process level (size of queue), push children. Time O(n), Space O(w).

### 57. Validate Binary Search Tree
Check if tree is valid BST.

**Answer:** Inorder gives sorted; or recurse with (min, max) and check node in range. Time O(n), Space O(h).

### 58. Lowest Common Ancestor of BST
LCA of two nodes in BST.

**Answer:** If both < root go left; if both > root go right; else root is LCA. Time O(h), Space O(1) iterative.

### 59. Binary Tree Maximum Path Sum
Max path sum (any node to any node).

**Answer:** Postorder: for each node max path through node = node + leftGain + rightGain (gain = max(0, single side)); update global max. Time O(n), Space O(h).

### 60. Serialize and Deserialize Binary Tree
Encode/decode tree to string.

**Answer:** Preorder with "null" for null; split by comma; build tree from iterator. Time O(n), Space O(n).

### 61. Implement Trie (Prefix Tree)
Insert, search, startsWith for words.

**Answer:** Node with children map and isEnd; insert: traverse/create; search: traverse and check isEnd; startsWith: traverse only. Time O(m) per op, Space O(total chars).

### 62. Word Search (Backtrack in Grid)
Find word in 2D grid (adjacent cells).

**Answer:** Backtrack: for each cell start DFS; mark visited; recurse 4 dirs; unmark. Time O(m*n*4^len), Space O(len).

### 63. Number of Islands
Count connected 1's (4-direction).

**Answer:** DFS or BFS from each unvisited 1; mark visited (flip to 0 or set). Time O(m*n), Space O(m*n) or O(min(m,n)) recursion.

### 64. Clone Graph
Deep copy graph (node with neighbors).

**Answer:** Map old -> new; BFS/DFS, for each node create copy and copy neighbors (create if not in map). Time O(V+E), Space O(V).

### 65. Course Schedule (Cycle in Directed Graph)
Can finish all courses (no cycle)?

**Answer:** Build graph; DFS with state (white/gray/black) or indegree + BFS; if cycle return false. Time O(V+E), Space O(V+E).

### 66. Pacific Atlantic Water Flow
Cells that can flow to both oceans.

**Answer:** Two DFS from Pacific border and Atlantic border; cells reachable from both are result. Time O(m*n), Space O(m*n).

### 67. Longest Consecutive Sequence (Unsorted)
Longest consecutive integers in unsorted array.

**Answer:** Put in set; for each num, if num-1 not in set expand right (num+1, num+2...) and update max. Time O(n), Space O(n).

### 68. Two Sum II (Sorted Array)
Two indices that sum to target; 1-indexed.

**Answer:** Two pointers left/right; if sum < target left++; if sum > target right--. Time O(n), Space O(1).

### 69. 3Sum Closest
Three numbers with sum closest to target.

**Answer:** Sort; for each i, two pointers on i+1..n-1; update best; move left or right by comparison with target. Time O(n^2), Space O(1).

### 70. Container With Most Water
Max area between two lines (height and distance).

**Answer:** Two pointers left/right; area = min(h[l],h[r]) * (r-l); move pointer at smaller height. Time O(n), Space O(1).

### 71. Trapping Rain Water
Total water trapped between bars.

**Answer:** Two pointers or prefix max left/right; water at i = min(maxLeft, maxRight) - height[i]. Time O(n), Space O(1) with two pointers.

### 72. Remove Duplicates from Sorted Array
In-place; return new length.

**Answer:** Two pointers: write index and read; if nums[read] != nums[write-1] then nums[write++] = nums[read]. Time O(n), Space O(1).

### 73. Rotate Array
Rotate right by k (in-place).

**Answer:** Reverse whole, reverse [0..k-1], reverse [k..n-1]. Or cyclic replacement. Time O(n), Space O(1).

### 74. Majority Element
Element appearing more than n/2 times.

**Answer:** Boyer-Moore: candidate and count; if same count++, else count--; if count 0 new candidate. Time O(n), Space O(1).

### 75. Reverse Words in String
Reverse order of words; trim spaces.

**Answer:** Split by spaces, filter empty, reverse, join. Or reverse whole then reverse each word. Time O(n), Space O(n).

### 76. Longest Palindromic Substring
Longest palindrome substring.

**Answer:** Expand around center (each index and between); odd and even length. Time O(n^2), Space O(1).

### 77. Palindromic Substrings
Count all palindrome substrings.

**Answer:** For each center expand and count while palindrome. Time O(n^2), Space O(1).

### 78. Maximum Product Subarray
Max product of contiguous subarray.

**Answer:** Track max and min (negative can become max); at each num update max = max(num, max*num, min*num), min = min(num, ...). Time O(n), Space O(1).

### 79. Find Minimum in Rotated Sorted Array (with duplicates)
Same with duplicates.

**Answer:** Binary search; when nums[mid] == nums[r] decrement r (or l) to break tie. Time O(n) worst, Space O(1).

### 80. Search a 2D Matrix
Sorted matrix; search target.

**Answer:** Treat as sorted 1D; mid = (l+r)>>1; row = mid/n, col = mid%n. Time O(log(m*n)), Space O(1).

### 81. Set Matrix Zeroes
If element 0, set entire row and column to 0 (in-place).

**Answer:** Use first row and first col as flags; then set zeros; handle first row/col separately. Time O(m*n), Space O(1).

### 82. Spiral Matrix
Return elements in spiral order.

**Answer:** Four boundaries top/bottom/left/right; while top <= bottom and left <= right, traverse and shrink. Time O(m*n), Space O(1).

### 83. Subsets
All subsets of array (no duplicates).

**Answer:** Backtrack: at each index choose include or exclude; recurse. Time O(2^n), Space O(n).

### 84. Word Break
Can string be segmented into dictionary words?

**Answer:** DP: dp[i] = true if s[0..i-1] can be segmented; for each i try all prefixes that are words. Time O(n^2 * dict), Space O(n).

### 85. Longest Increasing Subsequence
Length of longest strictly increasing subsequence.

**Answer:** DP O(n^2): dp[i] = 1 + max(dp[j]) for j < i and nums[j] < nums[i]. Or patience sort O(n log n). Time O(n^2) or O(n log n), Space O(n).

### 86. Coin Change
Min coins to make amount.

**Answer:** DP: dp[a] = 1 + min(dp[a-c]) for each coin c; dp[0]=0. Time O(amount * coins), Space O(amount).

### 87. Maximum Product of Three Numbers
Max product of three numbers in array.

**Answer:** Either three largest (positive) or one largest and two smallest (negative). Track max3 and min2. Time O(n), Space O(1).

### 88. Kth Largest Element in Array
Find kth largest (not sort).

**Answer:** Quickselect: partition; if pivot index == n-k return; else recurse left or right. Time O(n) average, Space O(1).

### 89. Top K Frequent Elements
Return k most frequent elements.

**Answer:** Count freq; bucket sort (array of lists by freq) or heap of size k. Time O(n) bucket, Space O(n).

### 90. Merge K Sorted Lists
Merge k linked lists.

**Answer:** Min-heap of (val, node); pop min, push next; or divide and merge (merge pairs). Time O(N log k), Space O(k).

### 91. K Closest Points to Origin
K points closest to origin.

**Answer:** Quickselect by distance or max-heap of size k (pop when size > k). Time O(n) quickselect, Space O(1).

### 92. Sort Colors (Dutch Flag)
Sort 0, 1, 2 in-place one pass.

**Answer:** Three pointers: low, mid, high; mid iterates; swap with low if 0, with high if 2; else mid++. Time O(n), Space O(1).

### 93. Add Two Numbers (Linked List)
Two numbers as linked lists; return sum as list.

**Answer:** Dummy head; add digit by digit with carry; create nodes. Time O(max(m,n)), Space O(1) excluding result.

### 94. Remove Duplicates from Sorted List
Delete duplicates so each value appears once.

**Answer:** While current and current.next, if same value skip next; else advance. Time O(n), Space O(1).

### 95. Partition List
Partition so all nodes < x come before nodes >= x.

**Answer:** Two dummy lists (less, ge); traverse and append to either; connect less tail to ge head. Time O(n), Space O(1).

### 96. Sort List (O(n log n) in-place)
Sort linked list.

**Answer:** Merge sort: find mid (slow/fast), sort left and right, merge. Time O(n log n), Space O(log n) recursion.

### 97. Reverse Nodes in K-Group
Reverse every k nodes.

**Answer:** Count length; for each group of k reverse (standard reverse subroutine), connect. Time O(n), Space O(1).

### 98. Flatten Binary Tree to Linked List
In-place flatten to right-skewed list (preorder).

**Answer:** Recursive: flatten left and right; set root.right = left, find tail of left, tail.right = right, root.left = null. Time O(n), Space O(h).

### 99. Construct Binary Tree from Preorder and Inorder
Build tree from preorder and inorder.

**Answer:** First of preorder is root; find root in inorder; left part is left subtree, right part is right; recurse with indices. Time O(n), Space O(n) map.

### 100. Validate Binary Search Tree (Iterative)
Same with stack/inorder.

**Answer:** Inorder traversal; check each value > previous. Time O(n), Space O(h).

### 101. Kth Smallest in BST
Kth smallest element in BST.

**Answer:** Inorder (iterative or recursive); return kth. Or augment with rank. Time O(h+k), Space O(h).

### 102. Codec: Serialize Deserialize BST
Encode BST (compact using BST property).

**Answer:** Preorder; decode with range (min, max); if val in range create node and recurse. Time O(n), Space O(h).

### 103. Lowest Common Ancestor of Binary Tree
LCA (not BST).

**Answer:** Recurse: if root is p or q return root; left = LCA(left), right = LCA(right); if both non-null return root; else return non-null. Time O(n), Space O(h).

### 104. Binary Tree Right Side View
Nodes visible from right (top to bottom).

**Answer:** BFS; add last node of each level. Or DFS right first with depth; add when depth == size of result. Time O(n), Space O(w) or O(h).

### 105. Count Good Nodes in Binary Tree
Node is good if path from root has no value greater than it.

**Answer:** DFS passing maxSoFar; if node.val >= maxSoFar count++; recurse with max(maxSoFar, node.val). Time O(n), Space O(h).

### 106. Binary Tree Path Sum
Has root-to-leaf path with sum = target?

**Answer:** DFS: if leaf and sum == target return true; recurse left/right with target - root.val. Time O(n), Space O(h).

### 107. Implement Queue using Stacks
Queue with push, pop, peek using only stacks.

**Answer:** Two stacks: push to in; pop from out (if out empty, pour in into out). Amortized O(1) per op.

### 108. Min Stack
Stack with getMin in O(1).

**Answer:** Second stack storing min at each level; or single stack with pairs (val, min). Time O(1) all ops, Space O(n).

### 109. Evaluate Reverse Polish Notation
Evaluate postfix expression.

**Answer:** Stack; for token if number push else pop two, compute, push. Time O(n), Space O(n).

### 110. Daily Temperatures
For each day days until warmer.

**Answer:** Monotonic stack (indices); while stack and current > T[stack.top] pop and set result[pop] = i - pop. Time O(n), Space O(n).

### 111. Car Fleet
Count fleets (cars reach target in order of position).

**Answer:** Sort by position; for each car from end compute time to target; if time > prev time then new fleet. Time O(n log n), Space O(n).

### 112. Largest Rectangle in Histogram
Max area rectangle in histogram.

**Answer:** Monotonic stack (indices); when pop, width = current - stack.top - 1, height = h[pop]. Time O(n), Space O(n).

### 113. Valid Parentheses (Alternate)
Same as classic; stack.

**Answer:** Stack; for each char if open push; if close pop and match. Time O(n), Space O(n).

### 114. Min Cost Climbing Stairs
Min cost to reach top (from index 0 or 1; can step 1 or 2).

**Answer:** DP: dp[i] = cost[i] + min(dp[i-1], dp[i-2]); return min(dp[n-1], dp[n-2]). Time O(n), Space O(1).

### 115. House Robber II
Houses in circle (first and last adjacent).

**Answer:** Two passes: rob 0..n-2 and 1..n-1; return max. Reuse House Robber logic. Time O(n), Space O(1).

### 116. Longest Common Subsequence
Length of LCS of two strings.

**Answer:** DP: dp[i][j] = 1+dp[i-1][j-1] if same else max(dp[i-1][j], dp[i][j-1]). Time O(m*n), Space O(min(m,n)).

### 117. Word Break II
Return all sentences (word break).

**Answer:** Backtrack + memo: at index i try each word match, recurse from i+len(word), combine. Time O(n^2 * dict), Space O(n).

### 118. Combination Sum II
Combinations that sum to target; each candidate once; no duplicate combinations.

**Answer:** Sort; backtrack; skip duplicate candidates in same level; don't reuse (index+1). Time O(2^n), Space O(n).

### 119. Permutations II
Permutations with duplicate elements.

**Answer:** Sort; backtrack with used; skip if same as prev and prev not used. Time O(n!), Space O(n).

### 120. N-Queens
Place n queens; return all distinct solutions.

**Answer:** Backtrack by row; for each row try each col; check no conflict (cols, diag); recurse. Time O(n!), Space O(n).

### 121. Sudoku Solver
Solve 9x9 Sudoku in-place.

**Answer:** Backtrack: find empty cell; try 1-9; if valid recurse; if solution return; else backtrack. Time O(9^m), Space O(1) board.

### 122. Reverse Linked List (Iterative)
Reverse list iteratively.

**Answer:** prev = null; while curr, next = curr.next, curr.next = prev, prev = curr, curr = next; return prev. Time O(n), Space O(1).

### 123. Palindrome Linked List
Check if list is palindrome.

**Answer:** Find mid (slow/fast), reverse second half, compare first half and reversed second. Time O(n), Space O(1).

### 124. Odd Even Linked List
Group odd then even nodes by index.

**Answer:** Two lists odd and even; connect odd tail to even head. Time O(n), Space O(1).

### 125. Maximum Depth of Binary Tree (Iterative)
BFS or DFS with stack.

**Answer:** BFS: level count. DFS: stack with (node, depth); max depth. Time O(n), Space O(w) or O(h).

### 126. Same Tree (Iterative)
Check same tree with stack/queue.

**Answer:** Queue of (p, q); enqueue children if both non-null and equal; if structure or value diff return false. Time O(n), Space O(n).

### 127. Symmetric Tree
Mirror of self.

**Answer:** Recurse (left, right): both null true; one null false; values equal and recurse(left.left, right.right) and recurse(left.right, right.left). Time O(n), Space O(h).

### 128. Path Sum II
All root-to-leaf paths with sum = target.

**Answer:** DFS with path list; at leaf if sum == target push path to result; backtrack. Time O(n), Space O(h).

### 129. Populating Next Right Pointers
Connect each node to next right (perfect tree).

**Answer:** Level order; set next; or use existing next: node.left.next = node.right; node.right.next = node.next?.left. Time O(n), Space O(1).

### 130. Binary Tree Inorder Traversal (Iterative)
Inorder with stack.

**Answer:** Stack; go left until null, pop, visit, go right. Time O(n), Space O(h).

### 131. Kth Largest in Stream
Design: add(val) and return kth largest.

**Answer:** Min-heap of size k; if size > k pop; return heap top. Time O(log k) add, Space O(k).

### 132. Merge Two Binary Trees
Merge (sum overlapping nodes).

**Answer:** If one null return other; else new node = sum, left = merge(t1.left, t2.left), right = merge(t1.right, t2.right). Time O(n), Space O(h).

### 133. Maximum Binary Tree
Build tree: max of array is root; left/right from left/right subarrays.

**Answer:** Recurse: find max index, root = nums[max], left = recurse(left part), right = recurse(right part). Time O(n^2), Space O(n).

### 134. Search in BST
Find node with value in BST.

**Answer:** While root and root.val != target, root = target < root.val ? root.left : root.right; return root. Time O(h), Space O(1).

### 135. Insert into BST
Insert value into BST.

**Answer:** Find null position (traverse by comparison); create node. Time O(h), Space O(1). Recursive or iterative.

### 136. Delete Node in BST
Remove node; preserve BST.

**Answer:** If one child replace with child; if two children replace with inorder successor (leftmost of right), then delete successor. Time O(h), Space O(h).

### 137. Validate BST (Range)
Recurse with (min, max).

**Answer:** If null true; if root.val <= min or >= max false; return validate(left, min, root.val) and validate(right, root.val, max). Time O(n), Space O(h).

### 138. Balanced Binary Tree
Check if tree height-balanced (abs(lh-rh) <= 1).

**Answer:** Recurse: return height; if abs(left - right) > 1 return -1 (invalid); else return 1 + max(left, right). Time O(n), Space O(h).

### 139. Diameter of Binary Tree
Longest path between any two nodes (may not pass root).

**Answer:** Postorder: diameter through node = 1 + leftDepth + rightDepth; return max of that and max of left/right diameter. Time O(n), Space O(h).

### 140. Subtree of Another Tree
Check if sub is subtree of root.

**Answer:** For each node check sameTree(node, sub); recurse left and right. SameTree: both null or (val equal and sameTree(left, right)). Time O(m*n), Space O(h).

### 141. Shortest Path in Binary Matrix
(0,0) to (n-1,n-1) with 0 cells only; 8 directions.

**Answer:** BFS; mark visited; return depth when reach bottom-right. Time O(n^2), Space O(n^2).

### 142. Number of Connected Components (Undirected)
Count components in graph (edges given).

**Answer:** Union-Find or DFS from each unvisited node; count DFS starts. Time O(V+E), Space O(V).

### 143. Graph Valid Tree
n nodes, edges; is it a valid tree? (connected, no cycle)

**Answer:** Union-Find: if edge connects same component then cycle; at end exactly one component. Or DFS and check no cycle and all visited. Time O(V+E), Space O(V).

### 144. Number of Islands II (Dynamic)
Add land one by one; return count after each add.

**Answer:** Union-Find; for each add, union with neighbors (if land); count = number of roots. Time O(k * alpha(n)), Space O(m*n).

### 145. Redundant Connection
Remove one edge to make tree; return edge to remove.

**Answer:** Union-Find; first edge that connects already connected nodes is answer. Time O(n), Space O(n).

### 146. Topological Sort (Course Schedule II)
Return valid order (or empty if cycle).

**Answer:** Build graph and indegree; BFS: enqueue nodes with indegree 0; decrement neighbors; repeat. Time O(V+E), Space O(V+E).

### 147. Alien Dictionary
Order of letters from sorted dictionary of alien words.

**Answer:** Build graph from adjacent word pairs (first diff char); topological sort; if cycle return "". Time O(total chars), Space O(1) alphabet.

### 148. Cheapest Flights Within K Stops
Min cost from src to dst with at most k stops.

**Answer:** Bellman-Ford K+1 iterations or BFS/Dijkstra with (node, stops); relax edges. Time O(E * K) or O((V+E) log V), Space O(V).

### 149. Network Delay Time
Time for signal to reach all nodes from source.

**Answer:** Dijkstra from source; return max of distances (or -1 if unreachable). Time O((V+E) log V), Space O(V).

### 150. Swim in Rising Water
Min max elevation to go from (0,0) to (n-1,n-1).

**Answer:** Dijkstra on grid; cost = max(current, next); or binary search on time + BFS/DFS. Time O(n^2 log n), Space O(n^2).

### 151. Decode Ways
Number of ways to decode string (1->A, ..., 26->Z).

**Answer:** DP: dp[i] = dp[i-1] (if valid 1-digit) + dp[i-2] (if valid 2-digit). Time O(n), Space O(n) or O(1).

### 152. Unique Paths
Paths from top-left to bottom-right (right/down only).

**Answer:** DP: dp[i][j] = dp[i-1][j] + dp[i][j-1]; or combinatorial C(m+n-2, n-1). Time O(m*n), Space O(n).

### 153. Jump Game
Can reach last index? (nums[i] = max jump from i).

**Answer:** Track maxReach; for each i if i > maxReach return false; maxReach = max(maxReach, i + nums[i]). Time O(n), Space O(1).

### 154. Jump Game II
Min jumps to reach last index.

**Answer:** BFS levels or greedy: at each step extend to farthest; when reach current end, step++, end = farthest. Time O(n), Space O(1).

### 155. Maximum Subarray Sum (Circular)
Max sum in circular array (wrap allowed).

**Answer:** Either max subarray (no wrap) or total - min subarray (wrap). Return max of both. Time O(n), Space O(1).

### 156. Product of Array Except Self (Space O(1))
Same with output not counting as extra space.

**Answer:** Output array: left pass (products from left), then right pass (multiply by right product). Time O(n), Space O(1) excluding output.

### 157. Maximum Product Subarray (Alternate)
Kadane-style for product.

**Answer:** Track max and min (negative flips); at each num max = max(num, max*num, min*num), min = min(num, ...). Time O(n), Space O(1).

### 158. Find Peak Element
Any peak (nums[i] > neighbors); log time.

**Answer:** Binary search: if nums[mid] < nums[mid+1] peak in right half else left. Time O(log n), Space O(1).

### 159. Search for Range (Alternate)
First and last position; binary search.

**Answer:** Lower_bound and upper_bound (or two binary searches). Time O(log n), Space O(1).

### 160. Merge Sorted Array
Merge nums2 into nums1 (nums1 has space); in-place.

**Answer:** Three pointers from end: write at end of nums1 the larger of nums1[i] and nums2[j]. Time O(m+n), Space O(1).

### 161. Remove Element
Remove all instances of val in-place; return new length.

**Answer:** Two pointers: write index; if nums[i] != val then nums[write++] = nums[i]. Time O(n), Space O(1).

### 162. Remove Duplicates from Sorted Array II
At most 2 duplicates; in-place.

**Answer:** Two pointers: write and count; if same as prev count++; if count <= 2 write. Time O(n), Space O(1).

### 163. Rotate List
Rotate linked list right by k.

**Answer:** Find length; k %= len; two pointers offset by k; when second at end, first is new tail; reconnect. Time O(n), Space O(1).

