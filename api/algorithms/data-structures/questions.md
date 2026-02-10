# Data Structures - Interview Questions

## Questions (1-15)

### 1. What is a data structure?
**Answer:** Way of organizing and storing data in computer memory for efficient access and modification.

### 2. What is the difference between array and linked list?
**Answer:** Array: contiguous memory, O(1) access, fixed size (usually). Linked list: non-contiguous, O(n) access, dynamic size.

#### JavaScript Examples - Array vs Linked List Operations

**Array Operations (JavaScript):**

```javascript
// Create array
const arr = [10, 20, 30, 40];

// 1. Access (O(1))
console.log(arr[0]);        // 10 - direct index access
console.log(arr[2]);        // 30

// 2. Insertion
arr.push(50);               // Insert at end (O(1))
// [10, 20, 30, 40, 50]

arr.unshift(5);             // Insert at beginning (O(n))
// [5, 10, 20, 30, 40, 50]

arr.splice(2, 0, 15);       // Insert at index 2 (O(n))
// [5, 10, 15, 20, 30, 40, 50]

// 3. Deletion
arr.pop();                  // Remove from end (O(1))
// [5, 10, 15, 20, 30, 40]

arr.shift();                // Remove from beginning (O(n))
// [10, 15, 20, 30, 40]

arr.splice(1, 1);           // Remove at index 1 (O(n))
// [10, 20, 30, 40]

// 4. Search (O(n))
const index = arr.indexOf(30);  // Find index of value
console.log(index);         // 2

const found = arr.find(x => x > 25);  // Find first matching element
console.log(found);         // 30

// 5. Update (O(1))
arr[1] = 25;                // Update at index
// [10, 25, 30, 40]

// 6. Length (O(1))
console.log(arr.length);    // 4
```

**Linked List Operations (JavaScript):**

```javascript
// Node class
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Linked List class
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 1. Insert at beginning (O(1))
  insertAtHead(value) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return newNode;
  }

  // 2. Insert at end (O(n))
  insertAtTail(value) {
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
    return newNode;
  }

  // 3. Insert at index (O(n))
  insertAt(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds');
    }
    if (index === 0) {
      return this.insertAtHead(value);
    }

    const newNode = new ListNode(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
    return newNode;
  }

  // 4. Delete at beginning (O(1))
  deleteAtHead() {
    if (!this.head) {
      throw new Error('List is empty');
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    return value;
  }

  // 5. Delete at end (O(n))
  deleteAtTail() {
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

  // 6. Delete by value (O(n))
  deleteByValue(value) {
    if (!this.head) {
      throw new Error('List is empty');
    }
    if (this.head.value === value) {
      return this.deleteAtHead();
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (!current.next) {
      throw new Error('Value not found');
    }

    const deletedValue = current.next.value;
    current.next = current.next.next;
    this.length--;
    return deletedValue;
  }

  // 7. Access by index (O(n))
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

  // 8. Search (O(n))
  search(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;  // Not found
  }

  // 9. Display all values
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// Usage Examples
const list = new LinkedList();

// Insertion
list.insertAtHead(10);      // Insert at beginning (O(1))
list.insertAtTail(30);      // Insert at end (O(n))
list.insertAtTail(40);      // Insert at end (O(n))
list.insertAt(1, 20);       // Insert at index 1 (O(n))
console.log(list.toArray()); // [10, 20, 30, 40]

// Access
console.log(list.get(0));   // 10 (O(n))
console.log(list.get(2));   // 30 (O(n))

// Search
console.log(list.search(30)); // 2 (O(n))
console.log(list.search(50)); // -1 (not found)

// Deletion
list.deleteByValue(20);     // Delete by value (O(n))
console.log(list.toArray()); // [10, 30, 40]

list.deleteAtHead();        // Delete from beginning (O(1))
console.log(list.toArray()); // [30, 40]

list.deleteAtTail();        // Delete from end (O(n))
console.log(list.toArray()); // [30]
```

**Comparison Summary:**

| Operation | Array | Linked List |
|-----------|-------|-------------|
| **Access by index** | O(1) - `arr[0]` | O(n) - traverse from head |
| **Insert at beginning** | O(n) - `arr.unshift()` | O(1) - update head pointer |
| **Insert at end** | O(1) - `arr.push()` | O(n) - traverse to tail |
| **Insert at middle** | O(n) - `arr.splice()` | O(n) - traverse to position |
| **Delete from beginning** | O(n) - `arr.shift()` | O(1) - update head pointer |
| **Delete from end** | O(1) - `arr.pop()` | O(n) - traverse to tail |
| **Delete from middle** | O(n) - `arr.splice()` | O(n) - traverse to position |
| **Search** | O(n) - `arr.indexOf()` | O(n) - traverse list |
| **Update by index** | O(1) - `arr[0] = value` | O(n) - traverse to index |

### 3. When would you use array vs linked list?
**Answer:** Array: random access needed, known size, memory efficient. Linked list: frequent insertions/deletions, unknown size.

### 4. What is a stack? What operations does it support?
**Answer:** LIFO (Last In First Out) structure. Operations: push (add), pop (remove), peek (view top), isEmpty.

### 5. What is a queue? What operations does it support?
**Answer:** FIFO (First In First Out) structure. Operations: enqueue (add), dequeue (remove), front (view), isEmpty.

### 6. What is the difference between stack and queue?
**Answer:** Stack: LIFO, add/remove from same end. Queue: FIFO, add at rear, remove from front.

### 7. How do you implement a stack using arrays?
**Answer:** Use array, track top index. Push: increment top, add element. Pop: return element, decrement top.

### 8. What is a hash table? How does it achieve O(1) average access?
**Answer:** Key-value storage using hash function. Hash maps key to index, direct access to bucket, O(1) average if good distribution.

### 9. What is collision in hash tables? How do you handle it?
**Answer:** Two keys hash to same index. Handle with chaining (linked list at index) or open addressing (find next slot).

### 10. What is a binary tree? What are its properties?
**Answer:** Tree where each node has at most 2 children. Root, nodes, leaves, height, depth, levels.

### 11. What is a binary search tree (BST)?
**Answer:** Binary tree with ordering: left child < node < right child. Enables O(log n) search, insert, delete.

### 12. What is a heap? What are its types?
**Answer:** Complete binary tree with heap property. Min-heap: parent <= children. Max-heap: parent >= children.

### 13. What is a graph? How do you represent it?
**Answer:** Nodes (vertices) connected by edges. Represent with adjacency list (array of lists) or adjacency matrix.

### 14. What is the difference between BFS and DFS?
**Answer:** BFS: level-by-level, uses queue, finds shortest path. DFS: goes deep, uses stack/recursion, uses less memory.

### 15. When would you use each data structure?
**Answer:** Array: indexing, random access. Linked list: dynamic size, frequent insert/delete. Hash table: fast lookups. Tree: hierarchical data, searching. Graph: relationships, networks.

