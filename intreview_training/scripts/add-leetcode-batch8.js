const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 8 (15 questions)');
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
    title: "Unique Paths II",
    problem: "You are given an `m x n` integer array `grid`. There is a robot initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time. An obstacle and space are marked as `1` and `0` respectively in `grid`. Return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    js: `function uniquePathsWithObstacles(obstacleGrid) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def unique_paths_with_obstacles(obstacle_grid):
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
    
    return dp[m - 1][n - 1]`
  },
  {
    title: "Minimum Path Sum",
    problem: "Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.",
    js: `function minPathSum(grid) {
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
// Time: O(m * n), Space: O(1)`,
    python: `def min_path_sum(grid):
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
    
    return grid[m - 1][n - 1]`
  },
  {
    title: "Triangle",
    problem: "Given a `triangle` array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below.",
    js: `function minimumTotal(triangle) {
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
// Time: O(n²), Space: O(1)`,
    python: `def minimum_total(triangle):
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
    return triangle[0][0]`
  },
  {
    title: "Maximum Subarray",
    problem: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    js: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
// Time: O(n), Space: O(1) - Kadane's Algorithm`,
    python: `def max_subarray(nums):
    """
    Kadane's Algorithm
    Time: O(n)
    Space: O(1)
    """
    max_sum = current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`
  },
  {
    title: "Best Time to Buy and Sell Stock with Transaction Fee",
    problem: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day, and an integer `fee` representing a transaction fee. Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.",
    js: `function maxProfit(prices, fee) {
  let cash = 0;
  let hold = -prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  
  return cash;
}
// Time: O(n), Space: O(1)`,
    python: `def max_profit(prices, fee):
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
    
    return cash`
  },
  {
    title: "Longest Increasing Path in a Matrix",
    problem: "Given an `m x n` integers `matrix`, return the length of the longest increasing path in `matrix`. From each cell, you can either move in four directions: left, right, up, or down.",
    js: `function longestIncreasingPath(matrix) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def longest_increasing_path(matrix):
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
    
    return result`
  },
  {
    title: "Number of Islands",
    problem: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    js: `function numIslands(grid) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def num_islands(grid):
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
    
    return count`
  },
  {
    title: "Max Area of Island",
    problem: "You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected 4-directionally (horizontal or vertical). The area of an island is the number of cells with a value `1` in the island. Return the maximum area of an island in `grid`.",
    js: `function maxAreaOfIsland(grid) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def max_area_of_island(grid):
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
    
    return max_area`
  },
  {
    title: "Surrounded Regions",
    problem: "Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`. A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.",
    js: `function solve(board) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def solve(board):
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
                board[i][j] = 'O'`
  },
  {
    title: "Walls and Gates",
    problem: "You are given an `m x n` grid `rooms` initialized with these three possible values: `-1` represents a wall or an obstacle, `0` represents a gate, `INF` represents an empty room. Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should remain `INF`.",
    js: `function wallsAndGates(rooms) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def walls_and_gates(rooms):
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
                queue.append((x, y))`
  },
  {
    title: "Course Schedule",
    problem: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return `true` if you can finish all courses. Otherwise, return `false`.",
    js: `function canFinish(numCourses, prerequisites) {
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
// Time: O(V + E), Space: O(V + E)`,
    python: `def can_finish(num_courses, prerequisites):
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
    
    return count == num_courses`
  },
  {
    title: "Course Schedule II",
    problem: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return the ordering of courses you should take to finish all courses.",
    js: `function findOrder(numCourses, prerequisites) {
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
// Time: O(V + E), Space: O(V + E)`,
    python: `def find_order(num_courses, prerequisites):
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
    
    return result if len(result) == num_courses else []`
  },
  {
    title: "Alien Dictionary",
    problem: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings `words` from the alien language's dictionary. Derive the order of letters in this language.",
    js: `function alienOrder(words) {
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
// Time: O(C) where C is total characters, Space: O(1)`,
    python: `def alien_order(words):
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
    
    return ''.join(result) if len(result) == len(in_degree) else ''`
  },
  {
    title: "Clone Graph",
    problem: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.",
    js: `function cloneGraph(node) {
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
// Time: O(V + E), Space: O(V)`,
    python: `def clone_graph(node):
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
    
    return clone(node)`
  },
  {
    title: "Pacific Atlantic Water Flow",
    problem: "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. Water can only flow in four directions. Return a 2D list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from cell `(ri, ci)` to both the Pacific and Atlantic oceans.",
    js: `function pacificAtlantic(heights) {
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
// Time: O(m * n), Space: O(m * n)`,
    python: `def pacific_atlantic(heights):
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
console.log('✅ QUESTIONS ADDED - BATCH 8');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 8 complete! Continue with batch 9 (final batch) in next chat.\n`);
