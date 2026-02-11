/**
 * Linked List Implementation
 * Nodes connected by pointers
 * Time Complexity:
 * - Access: O(n)
 * - Search: O(n)
 * - Insert/Delete: O(1) if position known
 */

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Insert at beginning - O(1)
  prepend(value) {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    this.length++;
    return this;
  }

  // Insert at end - O(n)
  append(value) {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.length++;
    return this;
  }

  // Insert at specific index - O(n)
  insertAt(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      return this.prepend(value);
    }

    const newNode = new ListNode(value);
    let current = this.head;
    
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
    
    return this;
  }

  // Delete at beginning - O(1)
  deleteFirst() {
    if (!this.head) {
      throw new Error('List is empty');
    }
    
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    
    return value;
  }

  // Delete at end - O(n)
  deleteLast() {
    if (!this.head) {
      throw new Error('List is empty');
    }

    if (!this.head.next) {
      const value = this.head.value;
      this.head = null;
      this.length--;
      return value;
    }

    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    
    const value = current.next.value;
    current.next = null;
    this.length--;
    
    return value;
  }

  // Delete at specific index - O(n)
  deleteAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      return this.deleteFirst();
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const value = current.next.value;
    current.next = current.next.next;
    this.length--;
    
    return value;
  }

  // Delete by value - O(n)
  deleteValue(value) {
    if (!this.head) {
      throw new Error('List is empty');
    }

    if (this.head.value === value) {
      return this.deleteFirst();
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.length--;
      return value;
    }

    throw new Error('Value not found');
  }

  // Get value at index - O(n)
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.value;
  }

  // Find index of value - O(n)
  indexOf(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Check if contains value - O(n)
  contains(value) {
    return this.indexOf(value) !== -1;
  }

  // Reverse linked list - O(n)
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
    return this;
  }

  // Convert to array - O(n)
  toArray() {
    const result = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  // Get size - O(1)
  size() {
    return this.length;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.length === 0;
  }

  // Clear list - O(1)
  clear() {
    this.head = null;
    this.length = 0;
  }

  // Find middle node - O(n)
  findMiddle() {
    if (!this.head) {
      return null;
    }

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow.value;
  }

  // Detect cycle - O(n)
  hasCycle() {
    if (!this.head) {
      return false;
    }

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      
      if (slow === fast) {
        return true;
      }
    }

    return false;
  }

  // Traverse forward (iterative) - O(n)
  traverseForward(callback) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      callback(current.value, index, current);
      current = current.next;
      index++;
    }
  }

  // Traverse forward (recursive) - O(n)
  traverseForwardRecursive(callback, node = this.head, index = 0) {
    if (!node) {
      return;
    }
    
    callback(node.value, index, node);
    this.traverseForwardRecursive(callback, node.next, index + 1);
  }

  // Traverse backward (requires doubly linked list or reverse) - O(n)
  traverseBackward(callback) {
    const values = [];
    let current = this.head;
    
    // Collect all values
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    
    // Traverse in reverse
    for (let i = values.length - 1; i >= 0; i--) {
      callback(values[i], i);
    }
  }

  // Traverse with early exit - O(n)
  traverseUntil(callback, condition) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (condition(current.value, index, current)) {
        return callback(current.value, index, current);
      }
      callback(current.value, index, current);
      current = current.next;
      index++;
    }
  }
}

// Usage Example
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(0);
console.log('List:', list.toArray()); // [0, 1, 2, 3, 4]
console.log('Get index 2:', list.get(2)); // 2
list.insertAt(2, 10);
console.log('After insert:', list.toArray()); // [0, 1, 10, 2, 3, 4]
list.deleteAt(2);
console.log('After delete:', list.toArray()); // [0, 1, 2, 3, 4]
console.log('Index of 3:', list.indexOf(3)); // 3
list.reverse();
console.log('Reversed:', list.toArray()); // [4, 3, 2, 1, 0]
console.log('Middle:', list.findMiddle()); // 2

module.exports = { LinkedList, ListNode };

