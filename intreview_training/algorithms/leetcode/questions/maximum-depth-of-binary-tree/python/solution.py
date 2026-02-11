"""
Maximum Depth of Binary Tree - LeetCode 104

Given the root of a binary tree, return its maximum depth.
"""

from collections import deque


# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def max_depth(root):
    """
    Recursive Approach (DFS)
    Time: O(n)
    Space: O(h) where h is height
    """
    if root is None:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)


def max_depth_bfs(root):
    """
    Iterative Approach (BFS)
    Time: O(n)
    Space: O(n) for queue
    """
    if root is None:
        return 0

    queue = deque([root])
    depth = 0

    while queue:
        level_size = len(queue)
        depth += 1

        for _ in range(level_size):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth


# Helper to create tree from list
def create_tree(arr, index=0):
    if index >= len(arr) or arr[index] is None:
        return None

    root = TreeNode(arr[index])
    root.left = create_tree(arr, 2 * index + 1)
    root.right = create_tree(arr, 2 * index + 2)
    return root


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    tree1 = create_tree([3, 9, 20, None, None, 15, 7])
    print("Input: [3,9,20,None,None,15,7]")
    print(f"Output: {max_depth(tree1)}")
    print("Expected: 3\n")

    tree2 = create_tree([1, None, 2])
    print("Input: [1,None,2]")
    print(f"Output: {max_depth(tree2)}")
    print("Expected: 2\n")

