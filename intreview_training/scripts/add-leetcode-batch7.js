const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 7 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 more LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Container With Most Water",
    problem: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    js: `function maxArea(height) {
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
// Time: O(n), Space: O(1)`,
    python: `def max_area(height):
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
    
    return max_water`
  },
  {
    title: "Longest Substring Without Repeating Characters",
    problem: "Given a string `s`, find the length of the longest substring without repeating characters.",
    js: `function lengthOfLongestSubstring(s) {
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
// Time: O(n), Space: O(min(m, n)))`,
    python: `def length_of_longest_substring(s):
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
    
    return max_len`
  },
  {
    title: "Minimum Window Substring",
    problem: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.",
    js: `function minWindow(s, t) {
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
// Time: O(|s| + |t|), Space: O(|s| + |t|)`,
    python: `def min_window(s, t):
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
    
    return '' if min_len == float('inf') else s[start:start + min_len]`
  },
  {
    title: "Sliding Window Maximum",
    problem: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the maximum sliding window.",
    js: `function maxSlidingWindow(nums, k) {
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
// Time: O(n), Space: O(k)`,
    python: `def max_sliding_window(nums, k):
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
    
    return result`
  },
  {
    title: "Longest Palindromic Substring",
    problem: "Given a string `s`, return the longest palindromic substring in `s`.",
    js: `function longestPalindrome(s) {
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
// Time: O(n²), Space: O(1)`,
    python: `def longest_palindrome(s):
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
    
    return s[start:start + max_len]`
  },
  {
    title: "Palindromic Substrings",
    problem: "Given a string `s`, return the number of palindromic substrings in it.",
    js: `function countSubstrings(s) {
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
// Time: O(n²), Space: O(1)`,
    python: `def count_substrings(s):
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
    
    return count`
  },
  {
    title: "Edit Distance",
    problem: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    js: `function minDistance(word1, word2) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def min_distance(word1, word2):
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
    
    return dp[m][n]`
  },
  {
    title: "Longest Common Subsequence",
    problem: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.",
    js: `function longestCommonSubsequence(text1, text2) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def longest_common_subsequence(text1, text2):
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
    
    return dp[m][n]`
  },
  {
    title: "Maximum Product Subarray",
    problem: "Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
    js: `function maxProduct(nums) {
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
// Time: O(n), Space: O(1)`,
    python: `def max_product(nums):
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
    
    return result`
  },
  {
    title: "House Robber",
    problem: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    js: `function rob(nums) {
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
// Time: O(n), Space: O(1)`,
    python: `def rob(nums):
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
    
    return prev1`
  },
  {
    title: "House Robber II",
    problem: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    js: `function rob(nums) {
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
// Time: O(n), Space: O(1)`,
    python: `def rob(nums):
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
    )`
  },
  {
    title: "Decode Ways",
    problem: "A message containing letters from `A-Z` can be encoded into numbers using the following mapping: 'A' -> \"1\", 'B' -> \"2\", ..., 'Z' -> \"26\". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above. Given a string `s` containing only digits, return the number of ways to decode it.",
    js: `function numDecodings(s) {
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
// Time: O(n), Space: O(n)`,
    python: `def num_decodings(s):
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
    
    return dp[n]`
  },
  {
    title: "Unique Paths",
    problem: "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    js: `function uniquePaths(m, n) {
  const dp = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}
// Time: O(m * n), Space: O(m * n)`,
    python: `def unique_paths(m, n):
    """
    Dynamic programming
    Time: O(m * n)
    Space: O(m * n)
    """
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]`
  },
  {
    title: "Climbing Stairs",
    problem: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    js: `function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
// Time: O(n), Space: O(1)`,
    python: `def climb_stairs(n):
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
    
    return prev1`
  },
  {
    title: "Coin Change II",
    problem: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.",
    js: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}
// Time: O(amount * coins.length), Space: O(amount)`,
    python: `def change(amount, coins):
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
    
    return dp[amount]`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n\n`;
  newContent += `**Problem:**\n${q.problem}\n\n`;
  newContent += `**Answer:**\n\n`;
  newContent += `### JavaScript\n\`\`\`javascript\n${q.js}\n\`\`\`\n\n`;
  newContent += `### Python\n\`\`\`python\n${q.python}\n\`\`\`\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### \d+\./gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED - BATCH 7');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 7 complete! Continue with batch 8 in next chat.\n`);
