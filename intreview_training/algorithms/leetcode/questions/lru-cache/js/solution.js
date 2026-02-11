/**
 * LRU Cache - LeetCode 146
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 */

// Doubly Linked List Node
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    // Use dummy nodes (sentinel nodes) to simplify operations:
    // - Eliminates null checks (head and tail always exist)
    // - Same logic for all nodes (no special cases for first/last)
    // - Prevents edge cases when list is empty
    this.head = new Node(0, 0); // dummy head
    this.tail = new Node(0, 0); // dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Add node right after head (most recent)
  addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // Remove node from list
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Move node to head (mark as most recently used)
  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  // Remove tail node (least recently used)
  popTail() {
    // Note: this.tail is a dummy node, so the actual last node is this.tail.prev
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }

  /**
   * Get value by key
   * Time: O(1)
   */
  get(key) {
    const node = this.cache.get(key);
    if (!node) {
      return -1;
    }

    // Move to head (most recently used)
    this.moveToHead(node);
    return node.val;
  }

  /**
   * Put key-value pair
   * Time: O(1)
   */
  put(key, value) {
    const node = this.cache.get(key);

    if (!node) {
      // New node
      const newNode = new Node(key, value);

      // Add to head
      this.addNode(newNode);
      this.cache.set(key, newNode);

      // If capacity exceeded, remove tail
      if (this.cache.size > this.capacity) {
        const tail = this.popTail();
        this.cache.delete(tail.key);
      }
    } else {
      // Update existing node
      node.val = value;
      this.moveToHead(node);
    }
  }
}

// Test cases
console.log('=== Test Case 1: Capacity 2 ===');
const lru1 = new LRUCache(2);
lru1.put(1, 1);
lru1.put(2, 2);
console.log('get(1):', lru1.get(1)); // returns 1
lru1.put(3, 3); // evicts key 2
console.log('get(2):', lru1.get(2)); // returns -1 (not found)
lru1.put(4, 4); // evicts key 1
console.log('get(1):', lru1.get(1)); // returns -1 (not found)
console.log('get(3):', lru1.get(3)); // returns 3
console.log('get(4):', lru1.get(4)); // returns 4

console.log('\n=== Test Case 2: Capacity 3 ===');
const lru2 = new LRUCache(3);
lru2.put(1, 1);
lru2.put(2, 2);
lru2.put(3, 3);
console.log('get(1):', lru2.get(1)); // returns 1
lru2.put(4, 4); // evicts key 2
console.log('get(2):', lru2.get(2)); // returns -1 (not found)
console.log('get(3):', lru2.get(3)); // returns 3
console.log('get(1):', lru2.get(1)); // returns 1
console.log('get(4):', lru2.get(4)); // returns 4

console.log('\n=== Test Case 3: Capacity 1 ===');
const lru3 = new LRUCache(1);
lru3.put(1, 1);
lru3.put(2, 2); // evicts key 1
console.log('get(1):', lru3.get(1)); // returns -1 (not found)
console.log('get(2):', lru3.get(2)); // returns 2

module.exports = { LRUCache, Node };

