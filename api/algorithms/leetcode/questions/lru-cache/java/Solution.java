import java.util.*;

/**
 * LRU Cache - LeetCode 146
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 */

// Doubly Linked List Node
class Node {
    int key;
    int val;
    Node prev;
    Node next;

    Node(int key, int val) {
        this.key = key;
        this.val = val;
    }
}

class LRUCache {
    private int capacity;
    private Map<Integer, Node> cache; // key -> node
    private Node head; // dummy head
    private Node tail; // dummy tail

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        // Use dummy nodes (sentinel nodes) to simplify operations:
        // - Eliminates null checks (head and tail always exist)
        // - Same logic for all nodes (no special cases for first/last)
        // - Prevents edge cases when list is empty
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Add node right after head (most recent)
    private void addNode(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    // Remove node from list
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Move node to head (mark as most recently used)
    private void moveToHead(Node node) {
        removeNode(node);
        addNode(node);
    }

    // Remove tail node (least recently used)
    private Node popTail() {
        // Note: tail is a dummy node, so the actual last node is tail.prev
        Node lastNode = tail.prev;
        removeNode(lastNode);
        return lastNode;
    }

    /**
     * Get value by key
     * Time: O(1)
     */
    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }

        // Move to head (most recently used)
        moveToHead(node);
        return node.val;
    }

    /**
     * Put key-value pair
     * Time: O(1)
     */
    public void put(int key, int value) {
        Node node = cache.get(key);

        if (node == null) {
            // New node
            Node newNode = new Node(key, value);

            // Add to head
            addNode(newNode);
            cache.put(key, newNode);

            // If capacity exceeded, remove tail
            if (cache.size() > capacity) {
                Node tail = popTail();
                cache.remove(tail.key);
            }
        } else {
            // Update existing node
            node.val = value;
            moveToHead(node);
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        System.out.println("=== Test Case 1: Capacity 2 ===");
        LRUCache lru1 = new LRUCache(2);
        lru1.put(1, 1);
        lru1.put(2, 2);
        System.out.println("get(1): " + lru1.get(1)); // returns 1
        lru1.put(3, 3); // evicts key 2
        System.out.println("get(2): " + lru1.get(2)); // returns -1 (not found)
        lru1.put(4, 4); // evicts key 1
        System.out.println("get(1): " + lru1.get(1)); // returns -1 (not found)
        System.out.println("get(3): " + lru1.get(3)); // returns 3
        System.out.println("get(4): " + lru1.get(4)); // returns 4

        System.out.println("\n=== Test Case 2: Capacity 3 ===");
        LRUCache lru2 = new LRUCache(3);
        lru2.put(1, 1);
        lru2.put(2, 2);
        lru2.put(3, 3);
        System.out.println("get(1): " + lru2.get(1)); // returns 1
        lru2.put(4, 4); // evicts key 2
        System.out.println("get(2): " + lru2.get(2)); // returns -1 (not found)
        System.out.println("get(3): " + lru2.get(3)); // returns 3
        System.out.println("get(1): " + lru2.get(1)); // returns 1
        System.out.println("get(4): " + lru2.get(4)); // returns 4

        System.out.println("\n=== Test Case 3: Capacity 1 ===");
        LRUCache lru3 = new LRUCache(1);
        lru3.put(1, 1);
        lru3.put(2, 2); // evicts key 1
        System.out.println("get(1): " + lru3.get(1)); // returns -1 (not found)
        System.out.println("get(2): " + lru3.get(2)); // returns 2
    }
}

