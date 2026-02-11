const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 4 (15 questions)');
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
    title: "Best Time to Buy and Sell Stock with Cooldown",
    problem: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
    js: `function maxProfit(prices) {
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
// Time: O(n), Space: O(1)`,
    python: `def max_profit(prices):
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
    
    return max(sold, rest)`
  },
  {
    title: "Coin Change",
    problem: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.",
    js: `function coinChange(coins, amount) {
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
// Time: O(amount * coins.length), Space: O(amount)`,
    python: `def coin_change(coins, amount):
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
    
    return dp[amount] if dp[amount] != float('inf') else -1`
  },
  {
    title: "Longest Increasing Subsequence",
    problem: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    js: `function lengthOfLIS(nums) {
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
// Time: O(n²), Space: O(n)`,
    python: `def length_of_lis(nums):
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
    
    return max_len`
  },
  {
    title: "Partition Equal Subset Sum",
    problem: "Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
    js: `function canPartition(nums) {
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
// Time: O(n * sum), Space: O(sum)`,
    python: `def can_partition(nums):
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
    
    return dp[target]`
  },
  {
    title: "Word Break",
    problem: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    js: `function wordBreak(s, wordDict) {
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
// Time: O(n² * m), Space: O(n)`,
    python: `def word_break(s, word_dict):
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
    
    return dp[len(s)]`
  },
  {
    title: "Combination Sum",
    problem: "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order. The same number may be chosen from `candidates` an unlimited number of times.",
    js: `function combinationSum(candidates, target) {
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
// Time: O(2^target), Space: O(target)`,
    python: `def combination_sum(candidates, target):
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
    return result`
  },
  {
    title: "Permutations",
    problem: "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    js: `function permute(nums) {
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
// Time: O(n! * n), Space: O(n! * n)`,
    python: `def permute(nums):
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
    return result`
  },
  {
    title: "Subsets",
    problem: "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    js: `function subsets(nums) {
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
// Time: O(2^n * n), Space: O(2^n * n)`,
    python: `def subsets(nums):
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
    return result`
  },
  {
    title: "Letter Combinations of a Phone Number",
    problem: "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.",
    js: `function letterCombinations(digits) {
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
// Time: O(4^n * n), Space: O(4^n * n)`,
    python: `def letter_combinations(digits):
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
    return result`
  },
  {
    title: "Generate Parentheses",
    problem: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    js: `function generateParenthesis(n) {
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
// Time: O(4^n / √n), Space: O(4^n / √n)`,
    python: `def generate_parenthesis(n):
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
    return result`
  },
  {
    title: "N-Queens",
    problem: "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return all distinct solutions to the n-queens puzzle.",
    js: `function solveNQueens(n) {
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
// Time: O(n!), Space: O(n²)`,
    python: `def solve_n_queens(n):
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
    return result`
  },
  {
    title: "Sudoku Solver",
    problem: "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.",
    js: `function solveSudoku(board) {
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
// Time: O(9^m), Space: O(1)`,
    python: `def solve_sudoku(board):
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
    
    solve()`
  },
  {
    title: "Combination Sum II",
    problem: "Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination.",
    js: `function combinationSum2(candidates, target) {
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
// Time: O(2^n), Space: O(target)`,
    python: `def combination_sum2(candidates, target):
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
    return result`
  },
  {
    title: "Permutations II",
    problem: "Given a collection of numbers, `nums`, that might contain duplicates, return all the unique permutations in any order.",
    js: `function permuteUnique(nums) {
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
// Time: O(n! * n), Space: O(n! * n)`,
    python: `def permute_unique(nums):
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
    return result`
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
console.log('✅ QUESTIONS ADDED - BATCH 4');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 4 complete! Continue with batch 5 in next chat.\n`);
