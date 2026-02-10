/**
 * Binary Search Tree Implementation in Java
 * Binary tree with ordering property: left < node < right
 * Time Complexity: O(log n) average, O(n) worst
 */
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BinarySearchTree {
    private TreeNode root;
    private int size;

    private static class TreeNode {
        int value;
        TreeNode left;
        TreeNode right;

        TreeNode(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    public BinarySearchTree() {
        this.root = null;
        this.size = 0;
    }

    public BinarySearchTree insert(int value) {
        TreeNode newNode = new TreeNode(value);
        
        if (root == null) {
            root = newNode;
            size++;
            return this;
        }

        TreeNode current = root;
        while (true) {
            if (value < current.value) {
                if (current.left == null) {
                    current.left = newNode;
                    size++;
                    return this;
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.right == null) {
                    current.right = newNode;
                    size++;
                    return this;
                }
                current = current.right;
            } else {
                // Value already exists
                return this;
            }
        }
    }

    public TreeNode search(int value) {
        TreeNode current = root;

        while (current != null) {
            if (value == current.value) {
                return current;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    public boolean contains(int value) {
        return search(value) != null;
    }

    public List<Integer> inOrder() {
        List<Integer> result = new ArrayList<>();
        inOrder(root, result);
        return result;
    }

    private void inOrder(TreeNode node, List<Integer> result) {
        if (node != null) {
            inOrder(node.left, result);
            result.add(node.value);
            inOrder(node.right, result);
        }
    }

    public List<Integer> preOrder() {
        List<Integer> result = new ArrayList<>();
        preOrder(root, result);
        return result;
    }

    private void preOrder(TreeNode node, List<Integer> result) {
        if (node != null) {
            result.add(node.value);
            preOrder(node.left, result);
            preOrder(node.right, result);
        }
    }

    public List<Integer> postOrder() {
        List<Integer> result = new ArrayList<>();
        postOrder(root, result);
        return result;
    }

    private void postOrder(TreeNode node, List<Integer> result) {
        if (node != null) {
            postOrder(node.left, result);
            postOrder(node.right, result);
            result.add(node.value);
        }
    }

    public List<Integer> levelOrder() {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.value);

            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }

        return result;
    }

    public int getSize() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    // Usage Example
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();

        bst.insert(50);
        bst.insert(30);
        bst.insert(70);
        bst.insert(20);
        bst.insert(40);
        bst.insert(60);
        bst.insert(80);

        System.out.println("In-order: " + bst.inOrder());
        System.out.println("Pre-order: " + bst.preOrder());
        System.out.println("Post-order: " + bst.postOrder());
        System.out.println("Level-order: " + bst.levelOrder());
        System.out.println("Contains 40: " + bst.contains(40));
        System.out.println("Size: " + bst.getSize());
    }
}

