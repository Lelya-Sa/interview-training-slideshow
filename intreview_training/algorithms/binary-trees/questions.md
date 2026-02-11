# Binary Trees - Interview Questions

## Questions (1-15)

### 1. What is a binary tree?
**Answer:** Tree data structure where each node has at most two children (left and right).

### 2. What is the difference between binary tree and binary search tree?
**Answer:** Binary tree has no ordering. BST has ordering property: left < node < right.

### 3. Explain tree traversal methods.
**Answer:**
- **Inorder**: Left, Root, Right (gives sorted order for BST)
- **Preorder**: Root, Left, Right
- **Postorder**: Left, Right, Root
- **Level-order**: Level by level (BFS)

### 4. What is the time complexity of tree traversal?
**Answer:** O(n) where n is number of nodes - must visit each node once.

### 5. How do you find the maximum depth of a binary tree?
**Answer:** Recursively calculate max depth of left and right subtrees, return 1 + max of both.

### 6. How do you check if two trees are identical?
**Answer:** Recursively check if roots are equal and subtrees are identical.

### 7. What is a balanced binary tree?
**Answer:** Tree where height difference between left and right subtrees is at most 1 for all nodes.

### 8. What is the difference between complete and full binary tree?
**Answer:** Complete: all levels filled except last, filled left to right. Full: every node has 0 or 2 children.

### 9. How do you invert a binary tree?
**Answer:** Swap left and right children recursively for each node.

### 10. What is a binary search tree? What are its properties?
**Answer:** BST has ordering: left subtree < root < right subtree. Enables O(log n) search.

### 11. What is the time complexity of search in BST?
**Answer:** O(log n) average, O(n) worst case (unbalanced tree).

### 12. How do you validate if a binary tree is a BST?
**Answer:** Check if each node is within valid range. Left child must be < node < right child.

### 13. What is tree serialization?
**Answer:** Converting tree structure to string/array format for storage or transmission.

### 14. How do you find the lowest common ancestor (LCA)?
**Answer:** If both nodes on same side, recurse. If on different sides, current node is LCA.

### 15. What is the difference between DFS and BFS for trees?
**Answer:** DFS uses recursion/stack, goes deep first. BFS uses queue, goes level by level.

