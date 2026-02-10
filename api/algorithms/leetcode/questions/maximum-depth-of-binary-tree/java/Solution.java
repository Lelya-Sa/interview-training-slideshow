import java.util.*;

/**
 * Maximum Depth of Binary Tree - LeetCode 104
 *
 * Given the root of a binary tree, return its maximum depth.
 */

// Definition for a binary tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    /**
     * Recursive Approach (DFS)
     * Time: O(n)
     * Space: O(h) where h is height
     */
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }

    /**
     * Iterative Approach (BFS)
     * Time: O(n)
     * Space: O(n) for queue
     */
    public int maxDepthBFS(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            depth++;

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }

        return depth;
    }

    // Helper to create tree from array
    public TreeNode createTree(Integer[] arr, int index) {
        if (index >= arr.length || arr[index] == null) {
            return null;
        }

        TreeNode root = new TreeNode(arr[index]);
        root.left = createTree(arr, 2 * index + 1);
        root.right = createTree(arr, 2 * index + 2);
        return root;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        Integer[] arr1 = {3, 9, 20, null, null, 15, 7};
        TreeNode tree1 = solution.createTree(arr1, 0);
        System.out.println("Input: [3,9,20,null,null,15,7]");
        System.out.println("Output: " + solution.maxDepth(tree1));
        System.out.println("Expected: 3\n");

        Integer[] arr2 = {1, null, 2};
        TreeNode tree2 = solution.createTree(arr2, 0);
        System.out.println("Input: [1,null,2]");
        System.out.println("Output: " + solution.maxDepth(tree2));
        System.out.println("Expected: 2\n");
    }
}

