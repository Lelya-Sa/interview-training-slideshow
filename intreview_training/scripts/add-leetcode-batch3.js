const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 3 (15 questions)');
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
    title: "Power of Two",
    problem: "Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.",
    js: `function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}
// Time: O(1), Space: O(1)`,
    python: `def is_power_of_two(n):
    """
    Bit manipulation
    Time: O(1)
    Space: O(1)
    """
    if n <= 0:
        return False
    return (n & (n - 1)) == 0`
  },
  {
    title: "Number of 1 Bits",
    problem: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    js: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Removes rightmost 1-bit
    count++;
  }
  return count;
}
// Time: O(1) - at most 32 iterations, Space: O(1)`,
    python: `def hamming_weight(n):
    """
    Brian Kernighan's algorithm
    Time: O(1) - at most 32 iterations
    Space: O(1)
    """
    count = 0
    while n:
        n = n & (n - 1)  # Removes rightmost 1-bit
        count += 1
    return count`
  },
  {
    title: "Reverse Bits",
    problem: "Reverse bits of a given 32 bits unsigned integer.",
    js: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;
  }
  return result >>> 0; // Convert to unsigned
}
// Time: O(1), Space: O(1)`,
    python: `def reverse_bits(n):
    """
    Bit manipulation
    Time: O(1)
    Space: O(1)
    """
    result = 0
    for i in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`
  },
  {
    title: "Counting Bits",
    problem: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of `1`'s in the binary representation of `i`.",
    js: `function countBits(n) {
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i & (i - 1)] + 1;
  }
  return result;
}
// Time: O(n), Space: O(n)`,
    python: `def count_bits(n):
    """
    Dynamic programming approach
    Time: O(n)
    Space: O(n)
    """
    result = [0] * (n + 1)
    for i in range(1, n + 1):
        result[i] = result[i & (i - 1)] + 1
    return result`
  },
  {
    title: "Missing Number",
    problem: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    js: `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// Time: O(n), Space: O(1)`,
    python: `def missing_number(nums):
    """
    Sum formula approach
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`
  },
  {
    title: "Find the Duplicate Number",
    problem: "Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is only one repeated number in `nums`, return this repeated number.",
    js: `function findDuplicate(nums) {
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
// Time: O(n), Space: O(1) - Floyd's Cycle Detection`,
    python: `def find_duplicate(nums):
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
    
    return slow`
  },
  {
    title: "Find All Duplicates in an Array",
    problem: "Given an integer array `nums` of length `n` where all the integers of `nums` are in the range `[1, n]` and each integer appears once or twice, return an array of all the integers that appears twice.",
    js: `function findDuplicates(nums) {
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
// Time: O(n), Space: O(1)`,
    python: `def find_duplicates(nums):
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
    return result`
  },
  {
    title: "Set Matrix Zeroes",
    problem: "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s. You must do it in place.",
    js: `function setZeroes(matrix) {
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
// Time: O(m * n), Space: O(1)`,
    python: `def set_zeroes(matrix):
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
            matrix[i][0] = 0`
  },
  {
    title: "Spiral Matrix",
    problem: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
    js: `function spiralOrder(matrix) {
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
// Time: O(m * n), Space: O(1)`,
    python: `def spiral_order(matrix):
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
    
    return result`
  },
  {
    title: "Rotate Image",
    problem: "You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.",
    js: `function rotate(matrix) {
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
// Time: O(n²), Space: O(1)`,
    python: `def rotate(matrix):
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
        matrix[i].reverse()`
  },
  {
    title: "Valid Sudoku",
    problem: "Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the rules: Each row must contain digits 1-9 without repetition. Each column must contain digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes must contain digits 1-9 without repetition.",
    js: `function isValidSudoku(board) {
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
// Time: O(1) - fixed 9x9, Space: O(1)`,
    python: `def is_valid_sudoku(board):
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
    
    return True`
  },
  {
    title: "Game of Life",
    problem: "According to Wikipedia's article: 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.' Given the current state of the `m x n` grid `board`, return the next state.",
    js: `function gameOfLife(board) {
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
// Time: O(m * n), Space: O(1)`,
    python: `def game_of_life(board):
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
            board[i][j] = 1 if board[i][j] > 0 else 0`
  },
  {
    title: "Pascal's Triangle",
    problem: "Given an integer `numRows`, return the first `numRows` of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it.",
    js: `function generate(numRows) {
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
// Time: O(numRows²), Space: O(numRows²)`,
    python: `def generate(num_rows):
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
    
    return triangle`
  },
  {
    title: "Pascal's Triangle II",
    problem: "Given an integer `rowIndex`, return the `rowIndex`th (0-indexed) row of the Pascal's triangle.",
    js: `function getRow(rowIndex) {
  const row = [1];
  
  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i - 1; j > 0; j--) {
      row[j] = row[j] + row[j - 1];
    }
    row.push(1);
  }
  
  return row;
}
// Time: O(rowIndex²), Space: O(rowIndex)`,
    python: `def get_row(row_index):
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
    
    return row`
  },
  {
    title: "Best Time to Buy and Sell Stock II",
    problem: "You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`th day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.",
    js: `function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}
// Time: O(n), Space: O(1)`,
    python: `def max_profit(prices):
    """
    Greedy approach - capture all increases
    Time: O(n)
    Space: O(1)
    """
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit`
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
console.log('✅ QUESTIONS ADDED - BATCH 3');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 3 complete! Continue with batch 4 in next chat.\n`);
