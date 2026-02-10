/**
 * Maximum Depth of Binary Tree - LeetCode 104
 *
 * Given the root of a binary tree, return its maximum depth.
 */

// Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Recursive Approach (DFS)
 * Time: O(n)
 * Space: O(h) where h is height
 */
function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Iterative Approach (BFS)
 * Time: O(n)
 * Space: O(n) for queue
 */
function maxDepthBFS(root) {
  if (root === null) {
    return 0;
  }

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}

// Helper to create tree from array
function createTree(arr, index = 0) {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const root = new TreeNode(arr[index]);
  root.left = createTree(arr, 2 * index + 1);
  root.right = createTree(arr, 2 * index + 2);
  return root;
}

// Test cases
console.log('=== Test Cases ===');
const tree1 = createTree([3, 9, 20, null, null, 15, 7]);
console.log('Input: [3,9,20,null,null,15,7]');
console.log('Output:', maxDepth(tree1));
console.log('Expected: 3\n');

const tree2 = createTree([1, null, 2]);
console.log('Input: [1,null,2]');
console.log('Output:', maxDepth(tree2));
console.log('Expected: 2\n');

module.exports = { maxDepth, maxDepthBFS, TreeNode };

