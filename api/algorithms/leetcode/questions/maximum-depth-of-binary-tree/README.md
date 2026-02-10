# Maximum Depth of Binary Tree - LeetCode 104

## Problem Description

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Example

```
Input: root = [3,9,20,null,null,15,7]
Output: 3

Input: root = [1,null,2]
Output: 2
```

## Approach

### Recursive Approach (DFS):
1. Base case: if root is null, return 0
2. Recursively find depth of left subtree
3. Recursively find depth of right subtree
4. Return 1 + max(leftDepth, rightDepth)

### Iterative Approach (BFS):
1. Use queue for level-order traversal
2. Count levels as we traverse
3. Return level count

### Key Insight:
- Maximum depth = longest path from root to leaf
- Can be solved recursively or iteratively

## Time Complexity
- O(n) where n is number of nodes

## Space Complexity
- **Recursive**: O(h) where h is height (recursion stack)
- **Iterative**: O(n) for queue in worst case

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

