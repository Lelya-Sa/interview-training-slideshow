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


### 16. What is a Stack and what are its operations?
**Answer:** A Stack is a linear data structure that follows LIFO (Last In First Out) principle. Main operations: push (add to top), pop (remove from top), peek/top (view top element), isEmpty (check if empty), size (get count).

### JavaScript
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
// Time: O(1) for all operations, Space: O(n)
```

### Python
```python
class Stack:
    """
    Stack implementation using list
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = []
    
    def push(self, element):
        self.items.append(element)
    
    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()
    
    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

---

### 17. What is a Queue and what are its operations?
**Answer:** A Queue is a linear data structure that follows FIFO (First In First Out) principle. Main operations: enqueue (add to rear), dequeue (remove from front), front/peek (view front element), isEmpty (check if empty), size (get count).

### JavaScript
```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
// Time: O(1) for enqueue, O(n) for dequeue, Space: O(n)
```

### Python
```python
from collections import deque

class Queue:
    """
    Queue implementation using deque for O(1) operations
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, element):
        self.items.append(element)
    
    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.popleft()
    
    def front(self):
        if self.is_empty():
            return None
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

---

### 18. What is a Binary Tree?
**Answer:** A Binary Tree is a tree data structure where each node has at most two children, referred to as left child and right child. Properties: Root node (topmost), Leaf nodes (nodes with no children), Height (longest path from root to leaf), Depth (distance from root to node).

### JavaScript
```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Example: Creating a binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
// Time: O(1) for creation, Space: O(n)
```

### Python
```python
class TreeNode:
    """
    Binary Tree Node
    Time: O(1) for creation
    Space: O(n)
    """
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Example: Creating a binary tree
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
```

---

### 19. What is a Binary Search Tree (BST)?
**Answer:** A Binary Search Tree is a binary tree where for each node: all values in left subtree are less than node value, all values in right subtree are greater than node value. This property enables efficient search, insert, and delete operations.

### JavaScript
```javascript
class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    this.root = this._insert(this.root, val);
  }
  
  _insert(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) {
      node.left = this._insert(node.left, val);
    } else {
      node.right = this._insert(node.right, val);
    }
    return node;
  }
  
  search(val) {
    return this._search(this.root, val);
  }
  
  _search(node, val) {
    if (!node || node.val === val) return node;
    if (val < node.val) return this._search(node.left, val);
    return this._search(node.right, val);
  }
}
// Time: O(log n) average, O(n) worst, Space: O(h)
```

### Python
```python
class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    """
    Binary Search Tree
    Time: O(log n) average, O(n) worst
    Space: O(h) where h is height
    """
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return BSTNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
```

---

### 20. What is a Hash Table?
**Answer:** A Hash Table (Hash Map) is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array of buckets. Provides average O(1) time complexity for insert, delete, and search operations.

### JavaScript
```javascript
class HashTable {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
  }
  
  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash = (hash + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const existing = bucket.find(item => item[0] === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }
  
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find(item => item[0] === key);
    return item ? item[1] : undefined;
  }
}
// Time: O(1) average, O(n) worst, Space: O(n)
```

### Python
```python
class HashTable:
    """
    Hash Table implementation
    Time: O(1) average, O(n) worst
    Space: O(n)
    """
    def __init__(self, size=16):
        self.buckets = [[] for _ in range(size)]
        self.size = size
    
    def _hash(self, key):
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value + ord(char)) % self.size
        return hash_value
    
    def set(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        for item in bucket:
            if item[0] == key:
                item[1] = value
                return
        bucket.append([key, value])
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        for item in bucket:
            if item[0] == key:
                return item[1]
        return None
```

---

### 21. What is a Heap?
**Answer:** A Heap is a complete binary tree that satisfies the heap property: In a Max Heap, parent nodes are greater than or equal to children. In a Min Heap, parent nodes are less than or equal to children. Used for priority queues and efficient min/max operations.

### JavaScript
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  
  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }
  
  heapifyUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      [this.heap[i], this.heap[this.parent(i)]] = 
      [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  
  heapifyDown(i) {
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);
    
    if (l < this.heap.length && this.heap[l] < this.heap[smallest]) {
      smallest = l;
    }
    if (r < this.heap.length && this.heap[r] < this.heap[smallest]) {
      smallest = r;
    }
    
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
}
// Time: O(log n) for insert/extract, Space: O(n)
```

### Python
```python
import heapq

class MinHeap:
    """
    Min Heap using heapq module
    Time: O(log n) for insert/extract
    Space: O(n)
    """
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        heapq.heappush(self.heap, val)
    
    def extract_min(self):
        if not self.heap:
            return None
        return heapq.heappop(self.heap)
    
    def peek(self):
        return self.heap[0] if self.heap else None

# Manual implementation
class MinHeapManual:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left(self, i):
        return 2 * i + 1
    
    def right(self, i):
        return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] =                 self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)
    
    def extract_min(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()
        
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        return min_val
    
    def _heapify_down(self, i):
        smallest = i
        l = self.left(i)
        r = self.right(i)
        
        if l < len(self.heap) and self.heap[l] < self.heap[smallest]:
            smallest = l
        if r < len(self.heap) and self.heap[r] < self.heap[smallest]:
            smallest = r
        
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._heapify_down(smallest)
```

---

### 22. What is a Graph?
**Answer:** A Graph is a collection of nodes (vertices) connected by edges. Types: Directed (edges have direction), Undirected (edges are bidirectional), Weighted (edges have weights), Unweighted. Can be represented as adjacency list or adjacency matrix.

### JavaScript
```javascript
// Adjacency List Representation
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // For undirected graph
  }
  
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }
  
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}
// Time: O(1) for add, O(V+E) for remove, Space: O(V+E)
```

### Python
```python
class Graph:
    """
    Graph using adjacency list
    Time: O(1) for add, O(V+E) for remove
    Space: O(V+E)
    """
    def __init__(self):
        self.adjacency_list = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
    
    def add_edge(self, v1, v2):
        if v1 in self.adjacency_list and v2 in self.adjacency_list:
            self.adjacency_list[v1].append(v2)
            self.adjacency_list[v2].append(v1)  # For undirected graph
    
    def remove_edge(self, v1, v2):
        if v1 in self.adjacency_list and v2 in self.adjacency_list:
            self.adjacency_list[v1] = [v for v in self.adjacency_list[v1] if v != v2]
            self.adjacency_list[v2] = [v for v in self.adjacency_list[v2] if v != v1]
    
    def remove_vertex(self, vertex):
        if vertex in self.adjacency_list:
            while self.adjacency_list[vertex]:
                adjacent = self.adjacency_list[vertex].pop()
                self.remove_edge(vertex, adjacent)
            del self.adjacency_list[vertex]
```

---

### 23. What is a Trie (Prefix Tree)?
**Answer:** A Trie is a tree-like data structure used to store strings. Each node represents a character, and paths from root to leaf represent words. Useful for prefix matching, autocomplete, and dictionary lookups. Provides O(m) time complexity for search/insert where m is word length.

### JavaScript
```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}
// Time: O(m) for insert/search, Space: O(ALPHABET_SIZE * N * M)
```

### Python
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    """
    Trie (Prefix Tree)
    Time: O(m) for insert/search where m is word length
    Space: O(ALPHABET_SIZE * N * M)
    """
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

---

### 24. What is the difference between Array and ArrayList?
**Answer:** Array: Fixed size, contiguous memory, direct index access. ArrayList/Dynamic Array: Resizable, automatically grows/shrinks, provides add/remove operations. JavaScript arrays are dynamic by default. Python lists are dynamic arrays.

### JavaScript
```javascript
// JavaScript arrays are dynamic by default
const arr = [1, 2, 3];

// Fixed-size array simulation
class FixedArray {
  constructor(size) {
    this.data = new Array(size);
    this.length = 0;
  }
  
  insert(index, value) {
    if (index < 0 || index >= this.data.length) {
      throw new Error('Index out of bounds');
    }
    this.data[index] = value;
    if (index >= this.length) this.length = index + 1;
  }
  
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    return this.data[index];
  }
}
// Time: O(1) for access, Space: O(n)
```

### Python
```python
# Python lists are dynamic arrays
arr = [1, 2, 3]
arr.append(4)  # O(1) amortized
arr.insert(0, 0)  # O(n)

# Fixed-size array using list
class FixedArray:
    """
    Fixed-size array simulation
    Time: O(1) for access
    Space: O(n)
    """
    def __init__(self, size):
        self.data = [None] * size
        self.length = 0
    
    def insert(self, index, value):
        if index < 0 or index >= len(self.data):
            raise IndexError('Index out of bounds')
        self.data[index] = value
        if index >= self.length:
            self.length = index + 1
    
    def get(self, index):
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        return self.data[index]
```

---

### 25. What is a Doubly Linked List?
**Answer:** A Doubly Linked List is a linked list where each node contains data and two pointers: next (points to next node) and prev (points to previous node). Allows traversal in both directions. Operations: insert/delete at any position in O(1) if node is known, but O(n) to find the node.

### JavaScript
```javascript
class DoublyListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  append(val) {
    const newNode = new DoublyListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }
  
  prepend(val) {
    const newNode = new DoublyListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }
  
  delete(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
    
    this.length--;
  }
}
// Time: O(1) for append/prepend/delete, Space: O(n)
```

### Python
```python
class DoublyListNode:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None

class DoublyLinkedList:
    """
    Doubly Linked List
    Time: O(1) for append/prepend/delete
    Space: O(n)
    """
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
    
    def append(self, val):
        new_node = DoublyListNode(val)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
        self.length += 1
    
    def prepend(self, val):
        new_node = DoublyListNode(val)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.length += 1
    
    def delete(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev
        
        self.length -= 1
```

---

### 26. What is a Circular Linked List?
**Answer:** A Circular Linked List is a linked list where the last node points back to the first node (or head), forming a circle. Can be singly or doubly linked. Useful for round-robin scheduling, implementing queues, and problems requiring circular traversal.

### JavaScript
```javascript
class CircularListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  
  append(val) {
    const newNode = new CircularListNode(val);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; // Point to itself
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
    this.length++;
  }
  
  display() {
    if (!this.head) return [];
    const result = [];
    let current = this.head;
    do {
      result.push(current.val);
      current = current.next;
    } while (current !== this.head);
    return result;
  }
}
// Time: O(n) for append, O(n) for display, Space: O(n)
```

### Python
```python
class CircularListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class CircularLinkedList:
    """
    Circular Linked List
    Time: O(n) for append
    Space: O(n)
    """
    def __init__(self):
        self.head = None
        self.length = 0
    
    def append(self, val):
        new_node = CircularListNode(val)
        if not self.head:
            self.head = new_node
            new_node.next = self.head  # Point to itself
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head
        self.length += 1
    
    def display(self):
        if not self.head:
            return []
        result = []
        current = self.head
        while True:
            result.append(current.val)
            current = current.next
            if current == self.head:
                break
        return result
```

---

### 27. What is the difference between Depth-First Search (DFS) and Breadth-First Search (BFS)?
**Answer:** DFS: Explores as far as possible along each branch before backtracking. Uses stack (recursion or explicit stack). BFS: Explores all nodes at current depth before moving to next level. Uses queue. DFS: O(V+E) time, O(h) space. BFS: O(V+E) time, O(w) space where w is max width.

### JavaScript
```javascript
// DFS - Recursive
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (let neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// DFS - Iterative
function dfsIterative(graph, start) {
  const stack = [start];
  const visited = new Set();
  
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      for (let neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}

// BFS - Iterative
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
// Time: O(V+E), Space: O(V)
```

### Python
```python
# DFS - Recursive
def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)

# DFS - Iterative
def dfs_iterative(graph, start):
    stack = [start]
    visited = set()
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)
            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    stack.append(neighbor)

# BFS - Iterative
def bfs(graph, start):
    from collections import deque
    queue = deque([start])
    visited = {start}
    
    while queue:
        node = queue.popleft()
        print(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

---

### 28. What is an AVL Tree?
**Answer:** An AVL Tree is a self-balancing Binary Search Tree where the difference between heights of left and right subtrees (balance factor) is at most 1. Maintains O(log n) time complexity for all operations through rotations (left, right, left-right, right-left) when balance is violated.

### JavaScript
```javascript
class AVLNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }
  
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }
  
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    
    x.right = y;
    y.left = T2;
    
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    
    return x;
  }
  
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    
    y.left = x;
    x.right = T2;
    
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    
    return y;
  }
  
  insert(node, val) {
    if (!node) return new AVLNode(val);
    
    if (val < node.val) {
      node.left = this.insert(node.left, val);
    } else {
      node.right = this.insert(node.right, val);
    }
    
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    const balance = this.getBalance(node);
    
    // Left Left Case
    if (balance > 1 && val < node.left.val) {
      return this.rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && val > node.right.val) {
      return this.leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && val > node.left.val) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && val < node.right.val) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    
    return node;
  }
}
// Time: O(log n) for all operations, Space: O(n)
```

### Python
```python
class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    """
    AVL Tree (Self-balancing BST)
    Time: O(log n) for all operations
    Space: O(n)
    """
    def get_height(self, node):
        return node.height if node else 0
    
    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0
    
    def right_rotate(self, y):
        x = y.left
        T2 = x.right
        
        x.right = y
        y.left = T2
        
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        
        return x
    
    def left_rotate(self, x):
        y = x.right
        T2 = y.left
        
        y.left = x
        x.right = T2
        
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        
        return y
    
    def insert(self, node, val):
        if not node:
            return AVLNode(val)
        
        if val < node.val:
            node.left = self.insert(node.left, val)
        else:
            node.right = self.insert(node.right, val)
        
        node.height = max(self.get_height(node.left), self.get_height(node.right)) + 1
        balance = self.get_balance(node)
        
        # Left Left Case
        if balance > 1 and val < node.left.val:
            return self.right_rotate(node)
        
        # Right Right Case
        if balance < -1 and val > node.right.val:
            return self.left_rotate(node)
        
        # Left Right Case
        if balance > 1 and val > node.left.val:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)
        
        # Right Left Case
        if balance < -1 and val < node.right.val:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)
        
        return node
```

---

### 29. What is a Red-Black Tree?
**Answer:** A Red-Black Tree is a self-balancing Binary Search Tree with color properties: Each node is red or black, root is black, all leaves are black, red nodes have black children, all paths from node to leaves have same number of black nodes. Ensures O(log n) height and operations.

### JavaScript
```javascript
class RBNode {
  constructor(val, color = 'RED') {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = color; // 'RED' or 'BLACK'
  }
}

class RedBlackTree {
  constructor() {
    this.NIL = new RBNode(null, 'BLACK');
    this.root = this.NIL;
  }
  
  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.NIL) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === this.NIL) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }
  
  rightRotate(y) {
    const x = y.left;
    y.left = x.right;
    if (x.right !== this.NIL) {
      x.right.parent = y;
    }
    x.parent = y.parent;
    if (y.parent === this.NIL) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
    x.right = y;
    y.parent = x;
  }
  
  insertFixup(z) {
    while (z.parent.color === 'RED') {
      if (z.parent === z.parent.parent.left) {
        const y = z.parent.parent.right;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.rightRotate(z.parent.parent);
        }
      } else {
        // Symmetric case
        const y = z.parent.parent.left;
        if (y.color === 'RED') {
          z.parent.color = 'BLACK';
          y.color = 'BLACK';
          z.parent.parent.color = 'RED';
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = 'BLACK';
          z.parent.parent.color = 'RED';
          this.leftRotate(z.parent.parent);
        }
      }
    }
    this.root.color = 'BLACK';
  }
}
// Time: O(log n) for all operations, Space: O(n)
```

### Python
```python
class RBNode:
    def __init__(self, val, color='RED'):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None
        self.color = color  # 'RED' or 'BLACK'

class RedBlackTree:
    """
    Red-Black Tree (Self-balancing BST)
    Time: O(log n) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.NIL = RBNode(None, 'BLACK')
        self.root = self.NIL
    
    def left_rotate(self, x):
        y = x.right
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x
        y.parent = x.parent
        if x.parent == self.NIL:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y
    
    def right_rotate(self, y):
        x = y.left
        y.left = x.right
        if x.right != self.NIL:
            x.right.parent = y
        x.parent = y.parent
        if y.parent == self.NIL:
            self.root = x
        elif y == y.parent.left:
            y.parent.left = x
        else:
            y.parent.right = x
        x.right = y
        y.parent = x
    
    def insert_fixup(self, z):
        while z.parent.color == 'RED':
            if z.parent == z.parent.parent.left:
                y = z.parent.parent.right
                if y.color == 'RED':
                    z.parent.color = 'BLACK'
                    y.color = 'BLACK'
                    z.parent.parent.color = 'RED'
                    z = z.parent.parent
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self.left_rotate(z)
                    z.parent.color = 'BLACK'
                    z.parent.parent.color = 'RED'
                    self.right_rotate(z.parent.parent)
            else:
                # Symmetric case
                y = z.parent.parent.left
                if y.color == 'RED':
                    z.parent.color = 'BLACK'
                    y.color = 'BLACK'
                    z.parent.parent.color = 'RED'
                    z = z.parent.parent
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self.right_rotate(z)
                    z.parent.color = 'BLACK'
                    z.parent.parent.color = 'RED'
                    self.left_rotate(z.parent.parent)
        self.root.color = 'BLACK'
```

---

### 30. What is a Set data structure?
**Answer:** A Set is a collection of unique elements with no duplicates. Operations: add (insert element), remove/delete (remove element), contains/has (check membership), union, intersection, difference. Implementations: Hash Set (O(1) average), Tree Set (O(log n)).

### JavaScript
```javascript
// JavaScript Set (built-in)
const set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(2); // Duplicate, ignored
console.log(set.size); // 3
console.log(set.has(2)); // true
set.delete(2);
console.log(set.has(2)); // false

// Custom Set implementation
class CustomSet {
  constructor() {
    this.items = {};
  }
  
  add(value) {
    this.items[value] = true;
  }
  
  has(value) {
    return value in this.items;
  }
  
  delete(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }
  
  size() {
    return Object.keys(this.items).length;
  }
  
  values() {
    return Object.keys(this.items);
  }
}
// Time: O(1) average for add/has/delete, Space: O(n)
```

### Python
```python
# Python set (built-in)
s = set()
s.add(1)
s.add(2)
s.add(3)
s.add(2)  # Duplicate, ignored
print(len(s))  # 3
print(2 in s)  # True
s.remove(2)
print(2 in s)  # False

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
union = set1 | set2  # {1, 2, 3, 4, 5}
intersection = set1 & set2  # {3}
difference = set1 - set2  # {1, 2}

# Custom Set implementation
class CustomSet:
    """
    Custom Set using dictionary
    Time: O(1) average for add/has/delete
    Space: O(n)
    """
    def __init__(self):
        self.items = {}
    
    def add(self, value):
        self.items[value] = True
    
    def has(self, value):
        return value in self.items
    
    def remove(self, value):
        if self.has(value):
            del self.items[value]
            return True
        return False
    
    def size(self):
        return len(self.items)
    
    def values(self):
        return list(self.items.keys())
```

---

### 31. What is a Map/Dictionary data structure?
**Answer:** A Map (Dictionary) stores key-value pairs. Each key maps to exactly one value. Operations: put/set (insert/update), get (retrieve), remove/delete (remove), containsKey/has (check key existence), size. Implementations: Hash Map (O(1) average), Tree Map (O(log n)).

### JavaScript
```javascript
// JavaScript Map (built-in)
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
map.set('city', 'NYC');
console.log(map.get('name')); // 'John'
console.log(map.has('age')); // true
map.delete('city');
console.log(map.size); // 2

// Iteration
for (let [key, value] of map) {
  console.log(key, value);
}

// Custom Map implementation
class CustomMap {
  constructor() {
    this.items = {};
  }
  
  set(key, value) {
    this.items[key] = value;
  }
  
  get(key) {
    return this.items[key];
  }
  
  has(key) {
    return key in this.items;
  }
  
  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }
  
  size() {
    return Object.keys(this.items).length;
  }
}
// Time: O(1) average for all operations, Space: O(n)
```

### Python
```python
# Python dict (built-in)
d = {}
d['name'] = 'John'
d['age'] = 30
d['city'] = 'NYC'
print(d['name'])  # 'John'
print('age' in d)  # True
del d['city']
print(len(d))  # 2

# Iteration
for key, value in d.items():
    print(key, value)

# Custom Map implementation
class CustomMap:
    """
    Custom Map using dictionary
    Time: O(1) average for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = {}
    
    def set(self, key, value):
        self.items[key] = value
    
    def get(self, key):
        return self.items.get(key)
    
    def has(self, key):
        return key in self.items
    
    def delete(self, key):
        if self.has(key):
            del self.items[key]
            return True
        return False
    
    def size(self):
        return len(self.items)
```

---


### 32. What is a Priority Queue?
**Answer:** A Priority Queue is a data structure where elements are served based on priority rather than insertion order. Higher priority elements are served before lower priority ones. Can be implemented using heap (binary heap, Fibonacci heap) for efficient O(log n) insertions and O(1) max/min retrieval.

### JavaScript
```javascript
class PriorityQueue {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn;
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  
  enqueue(item, priority) {
    this.heap.push({ item, priority });
    this.heapifyUp(this.heap.length - 1);
  }
  
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop().item;
    
    const top = this.heap[0].item;
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return top;
  }
  
  heapifyUp(i) {
    while (i > 0 && this.compare(this.heap[this.parent(i)].priority, this.heap[i].priority) > 0) {
      [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
  
  heapifyDown(i) {
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);
    
    if (l < this.heap.length && this.compare(this.heap[l].priority, this.heap[smallest].priority) < 0) {
      smallest = l;
    }
    if (r < this.heap.length && this.compare(this.heap[r].priority, this.heap[smallest].priority) < 0) {
      smallest = r;
    }
    
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
  
  peek() {
    return this.heap.length > 0 ? this.heap[0].item : null;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}
// Time: O(log n) for enqueue/dequeue, O(1) for peek, Space: O(n)
```

### Python
```python
import heapq

class PriorityQueue:
    """
    Priority Queue using heapq
    Time: O(log n) for enqueue/dequeue, O(1) for peek
    Space: O(n)
    """
    def __init__(self):
        self.heap = []
    
    def enqueue(self, item, priority):
        heapq.heappush(self.heap, (priority, item))
    
    def dequeue(self):
        if not self.heap:
            return None
        return heapq.heappop(self.heap)[1]
    
    def peek(self):
        return self.heap[0][1] if self.heap else None
    
    def is_empty(self):
        return len(self.heap) == 0
```

---

### 33. What is a Deque (Double-Ended Queue)?
**Answer:** A Deque allows insertion and deletion from both ends (front and rear). Combines features of stack and queue. Operations: addFront, addRear, removeFront, removeRear, peekFront, peekRear. Can be implemented using doubly linked list or circular array.

### JavaScript
```javascript
class Deque {
  constructor() {
    this.items = [];
  }
  
  addFront(element) {
    this.items.unshift(element);
  }
  
  addRear(element) {
    this.items.push(element);
  }
  
  removeFront() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  removeRear() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peekFront() {
    return this.isEmpty() ? null : this.items[0];
  }
  
  peekRear() {
    return this.isEmpty() ? null : this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
// Time: O(1) for addRear/removeRear, O(n) for addFront/removeFront, Space: O(n)
```

### Python
```python
from collections import deque

class Deque:
    """
    Deque using collections.deque for O(1) operations
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = deque()
    
    def add_front(self, element):
        self.items.appendleft(element)
    
    def add_rear(self, element):
        self.items.append(element)
    
    def remove_front(self):
        return self.items.popleft() if self.items else None
    
    def remove_rear(self):
        return self.items.pop() if self.items else None
    
    def peek_front(self):
        return self.items[0] if self.items else None
    
    def peek_rear(self):
        return self.items[-1] if self.items else None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

---

### 34. What is a Disjoint Set (Union-Find)?
**Answer:** A Disjoint Set data structure tracks a set of elements partitioned into disjoint subsets. Operations: find (find root of element's set), union (merge two sets). Uses path compression and union by rank optimizations. Applications: Kruskal's algorithm, network connectivity, image processing.

### JavaScript
```javascript
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return;
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
  
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
// Time: O(α(n)) amortized (inverse Ackermann), Space: O(n)
```

### Python
```python
class UnionFind:
    """
    Disjoint Set (Union-Find) with path compression and union by rank
    Time: O(α(n)) amortized (inverse Ackermann)
    Space: O(n)
    """
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

---

### 35. What is a Segment Tree?
**Answer:** A Segment Tree is a binary tree data structure used for range queries and range updates. Each node represents a segment/interval. Supports: range sum, range minimum/maximum, range update. Build: O(n), Query: O(log n), Update: O(log n). Useful for problems involving range queries on arrays.

### JavaScript
```javascript
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.size = 2 * Math.pow(2, Math.ceil(Math.log2(this.n))) - 1;
    this.tree = new Array(this.size).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }
  
  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }
  
  query(node, start, end, l, r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    
    const mid = Math.floor((start + end) / 2);
    return this.query(2 * node + 1, start, mid, l, r) +
           this.query(2 * node + 2, mid + 1, end, l, r);
  }
  
  update(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
    } else {
      const mid = Math.floor((start + end) / 2);
      if (idx <= mid) {
        this.update(2 * node + 1, start, mid, idx, val);
      } else {
        this.update(2 * node + 2, mid + 1, end, idx, val);
      }
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }
}
// Time: O(n) build, O(log n) query/update, Space: O(n)
```

### Python
```python
class SegmentTree:
    """
    Segment Tree for range sum queries
    Time: O(n) build, O(log n) query/update
    Space: O(n)
    """
    def __init__(self, arr):
        self.n = len(arr)
        self.size = 2 * (2 ** (self.n - 1).bit_length()) - 1
        self.tree = [0] * self.size
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2 * node + 1, start, mid)
            self.build(arr, 2 * node + 2, mid + 1, end)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]
    
    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        
        mid = (start + end) // 2
        return (self.query(2 * node + 1, start, mid, l, r) +
                self.query(2 * node + 2, mid + 1, end, l, r))
    
    def update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(2 * node + 1, start, mid, idx, val)
            else:
                self.update(2 * node + 2, mid + 1, end, idx, val)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]
```

---

### 36. What is a Fenwick Tree (Binary Indexed Tree)?
**Answer:** A Fenwick Tree is a data structure that supports prefix sum queries and point updates efficiently. More memory efficient than Segment Tree. Operations: update (add value at index), query (get prefix sum from 0 to index). Build: O(n log n), Query: O(log n), Update: O(log n). Uses bit manipulation for efficiency.

### JavaScript
```javascript
class FenwickTree {
  constructor(size) {
    this.n = size;
    this.tree = new Array(size + 1).fill(0);
  }
  
  update(index, delta) {
    index++;
    while (index <= this.n) {
      this.tree[index] += delta;
      index += index & -index; // Add least significant bit
    }
  }
  
  query(index) {
    index++;
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index; // Remove least significant bit
    }
    return sum;
  }
  
  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}
// Time: O(n log n) build, O(log n) query/update, Space: O(n)
```

### Python
```python
class FenwickTree:
    """
    Fenwick Tree (Binary Indexed Tree)
    Time: O(n log n) build, O(log n) query/update
    Space: O(n)
    """
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (size + 1)
    
    def update(self, index, delta):
        index += 1
        while index <= self.n:
            self.tree[index] += delta
            index += index & -index  # Add least significant bit
    
    def query(self, index):
        index += 1
        sum_val = 0
        while index > 0:
            sum_val += self.tree[index]
            index -= index & -index  # Remove least significant bit
        return sum_val
    
    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)
```

---

### 37. What is a Suffix Tree?
**Answer:** A Suffix Tree is a compressed trie containing all suffixes of a string. Each edge represents a substring. Supports: pattern matching in O(m) where m is pattern length, longest common substring, longest repeated substring. Build: O(n) using Ukkonen's algorithm, Space: O(n).

### JavaScript
```javascript
// Simplified Suffix Tree implementation
class SuffixTreeNode {
  constructor() {
    this.children = {};
    this.start = -1;
    this.end = -1;
    this.suffixLink = null;
  }
}

class SuffixTree {
  constructor(text) {
    this.text = text + '$';
    this.root = new SuffixTreeNode();
    this.build();
  }
  
  build() {
    // Simplified build - full implementation uses Ukkonen's algorithm
    for (let i = 0; i < this.text.length; i++) {
      this.insertSuffix(i);
    }
  }
  
  insertSuffix(start) {
    let node = this.root;
    for (let i = start; i < this.text.length; i++) {
      const char = this.text[i];
      if (!node.children[char]) {
        node.children[char] = new SuffixTreeNode();
        node.children[char].start = i;
        node.children[char].end = this.text.length - 1;
      }
      node = node.children[char];
    }
  }
  
  search(pattern) {
    let node = this.root;
    for (let char of pattern) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}
// Time: O(n²) simplified, O(n) with Ukkonen's, Space: O(n)
```

### Python
```python
# Simplified Suffix Tree implementation
class SuffixTreeNode:
    def __init__(self):
        self.children = {}
        self.start = -1
        self.end = -1
        self.suffix_link = None

class SuffixTree:
    """
    Suffix Tree (simplified implementation)
    Full implementation uses Ukkonen's algorithm for O(n) construction
    Time: O(n²) simplified, O(n) with Ukkonen's
    Space: O(n)
    """
    def __init__(self, text):
        self.text = text + '$'
        self.root = SuffixTreeNode()
        self.build()
    
    def build(self):
        # Simplified build - full implementation uses Ukkonen's algorithm
        for i in range(len(self.text)):
            self.insert_suffix(i)
    
    def insert_suffix(self, start):
        node = self.root
        for i in range(start, len(self.text)):
            char = self.text[i]
            if char not in node.children:
                node.children[char] = SuffixTreeNode()
                node.children[char].start = i
                node.children[char].end = len(self.text) - 1
            node = node.children[char]
    
    def search(self, pattern):
        node = self.root
        for char in pattern:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

---

### 38. What is a B-Tree?
**Answer:** A B-Tree is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. Each node can have multiple keys and children (more than 2). Used in databases and file systems for efficient disk I/O. Properties: All leaves at same level, minimum degree t (each node has at least t-1 and at most 2t-1 keys).

### JavaScript
```javascript
class BTreeNode {
  constructor(leaf = false) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }
}

class BTree {
  constructor(minDegree) {
    this.root = new BTreeNode(true);
    this.t = minDegree; // Minimum degree
  }
  
  search(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }
    if (i < node.keys.length && node.keys[i] === key) {
      return node;
    }
    if (node.leaf) {
      return null;
    }
    return this.search(node.children[i], key);
  }
  
  splitChild(parent, index) {
    const fullChild = parent.children[index];
    const newChild = new BTreeNode(fullChild.leaf);
    
    // Move keys
    for (let i = 0; i < this.t - 1; i++) {
      newChild.keys[i] = fullChild.keys[i + this.t];
    }
    
    // Move children if not leaf
    if (!fullChild.leaf) {
      for (let i = 0; i < this.t; i++) {
        newChild.children[i] = fullChild.children[i + this.t];
      }
    }
    
    fullChild.keys.length = this.t - 1;
    
    // Insert middle key to parent
    parent.children.splice(index + 1, 0, newChild);
    parent.keys.splice(index, 0, fullChild.keys[this.t - 1]);
  }
  
  insert(key) {
    const root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      const newRoot = new BTreeNode(false);
      newRoot.children[0] = root;
      this.root = newRoot;
      this.splitChild(newRoot, 0);
    }
    this.insertNonFull(this.root, key);
  }
  
  insertNonFull(node, key) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      while (i >= 0 && key < node.keys[i]) {
        node.keys[i + 1] = node.keys[i];
        i--;
      }
      node.keys[i + 1] = key;
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this.insertNonFull(node.children[i], key);
    }
  }
}
// Time: O(log n) for all operations, Space: O(n)
```

### Python
```python
class BTreeNode:
    def __init__(self, leaf=False):
        self.keys = []
        self.children = []
        self.leaf = leaf

class BTree:
    """
    B-Tree implementation
    Time: O(log n) for all operations
    Space: O(n)
    """
    def __init__(self, min_degree):
        self.root = BTreeNode(True)
        self.t = min_degree  # Minimum degree
    
    def search(self, node, key):
        i = 0
        while i < len(node.keys) and key > node.keys[i]:
            i += 1
        if i < len(node.keys) and node.keys[i] == key:
            return node
        if node.leaf:
            return None
        return self.search(node.children[i], key)
    
    def split_child(self, parent, index):
        full_child = parent.children[index]
        new_child = BTreeNode(full_child.leaf)
        
        # Move keys
        new_child.keys = full_child.keys[self.t:]
        full_child.keys = full_child.keys[:self.t - 1]
        
        # Move children if not leaf
        if not full_child.leaf:
            new_child.children = full_child.children[self.t:]
            full_child.children = full_child.children[:self.t]
        
        # Insert middle key to parent
        parent.children.insert(index + 1, new_child)
        parent.keys.insert(index, full_child.keys[self.t - 1])
    
    def insert(self, key):
        root = self.root
        if len(root.keys) == 2 * self.t - 1:
            new_root = BTreeNode(False)
            new_root.children.append(root)
            self.root = new_root
            self.split_child(new_root, 0)
        self.insert_non_full(self.root, key)
    
    def insert_non_full(self, node, key):
        i = len(node.keys) - 1
        if node.leaf:
            while i >= 0 and key < node.keys[i]:
                i -= 1
            node.keys.insert(i + 1, key)
        else:
            while i >= 0 and key < node.keys[i]:
                i -= 1
            i += 1
            if len(node.children[i].keys) == 2 * self.t - 1:
                self.split_child(node, i)
                if key > node.keys[i]:
                    i += 1
            self.insert_non_full(node.children[i], key)
```

---

### 39. What is a Bloom Filter?
**Answer:** A Bloom Filter is a probabilistic data structure that tests whether an element is a member of a set. Returns: definitely not in set (no false negatives), possibly in set (may have false positives). Uses multiple hash functions and a bit array. Space efficient but cannot delete elements. Applications: cache filtering, database query optimization, network routing.

### JavaScript
```javascript
class BloomFilter {
  constructor(size, hashFunctions) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);
    this.hashFunctions = hashFunctions;
  }
  
  add(item) {
    for (let hashFn of this.hashFunctions) {
      const index = hashFn(item) % this.size;
      this.bitArray[index] = 1;
    }
  }
  
  mightContain(item) {
    for (let hashFn of this.hashFunctions) {
      const index = hashFn(item) % this.size;
      if (this.bitArray[index] === 0) {
        return false; // Definitely not in set
      }
    }
    return true; // Possibly in set (may be false positive)
  }
}

// Example hash functions
function hash1(str) {
  let hash = 0;
  for (let char of str) {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function hash2(str) {
  let hash = 5381;
  for (let char of str) {
    hash = ((hash << 5) + hash) + char.charCodeAt(0);
  }
  return Math.abs(hash);
}
// Time: O(k) where k is number of hash functions, Space: O(m)
```

### Python
```python
import hashlib

class BloomFilter:
    """
    Bloom Filter - probabilistic data structure
    Time: O(k) where k is number of hash functions
    Space: O(m) where m is bit array size
    """
    def __init__(self, size, num_hash_functions):
        self.size = size
        self.bit_array = [0] * size
        self.num_hash_functions = num_hash_functions
    
    def _hash(self, item, seed):
        hash_obj = hashlib.md5(f"{item}{seed}".encode())
        return int(hash_obj.hexdigest(), 16) % self.size
    
    def add(self, item):
        for i in range(self.num_hash_functions):
            index = self._hash(item, i)
            self.bit_array[index] = 1
    
    def might_contain(self, item):
        for i in range(self.num_hash_functions):
            index = self._hash(item, i)
            if self.bit_array[index] == 0:
                return False  # Definitely not in set
        return True  # Possibly in set (may be false positive)
```

---

### 40. What is a Skip List?
**Answer:** A Skip List is a probabilistic data structure that allows O(log n) search, insertion, and deletion. Consists of multiple sorted linked lists at different levels. Lower levels contain all elements, higher levels contain fewer elements. Uses randomization to maintain balance. Alternative to balanced trees with simpler implementation.

### JavaScript
```javascript
class SkipListNode {
  constructor(value, level) {
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

class SkipList {
  constructor(maxLevel = 16, probability = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.level = 0;
    this.header = new SkipListNode(null, maxLevel);
  }
  
  randomLevel() {
    let level = 0;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }
  
  search(target) {
    let current = this.header;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < target) {
        current = current.forward[i];
      }
    }
    current = current.forward[0];
    return current && current.value === target ? current : null;
  }
  
  insert(value) {
    const update = new Array(this.maxLevel + 1).fill(null);
    let current = this.header;
    
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }
    
    current = current.forward[0];
    if (!current || current.value !== value) {
      const newLevel = this.randomLevel();
      if (newLevel > this.level) {
        for (let i = this.level + 1; i <= newLevel; i++) {
          update[i] = this.header;
        }
        this.level = newLevel;
      }
      
      const newNode = new SkipListNode(value, newLevel);
      for (let i = 0; i <= newLevel; i++) {
        newNode.forward[i] = update[i].forward[i];
        update[i].forward[i] = newNode;
      }
    }
  }
}
// Time: O(log n) average, Space: O(n)
```

### Python
```python
import random

class SkipListNode:
    def __init__(self, value, level):
        self.value = value
        self.forward = [None] * (level + 1)

class SkipList:
    """
    Skip List - probabilistic data structure
    Time: O(log n) average
    Space: O(n)
    """
    def __init__(self, max_level=16, probability=0.5):
        self.max_level = max_level
        self.probability = probability
        self.level = 0
        self.header = SkipListNode(None, max_level)
    
    def random_level(self):
        level = 0
        while random.random() < self.probability and level < self.max_level:
            level += 1
        return level
    
    def search(self, target):
        current = self.header
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].value < target:
                current = current.forward[i]
        current = current.forward[0]
        return current if current and current.value == target else None
    
    def insert(self, value):
        update = [None] * (self.max_level + 1)
        current = self.header
        
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].value < value:
                current = current.forward[i]
            update[i] = current
        
        current = current.forward[0]
        if not current or current.value != value:
            new_level = self.random_level()
            if new_level > self.level:
                for i in range(self.level + 1, new_level + 1):
                    update[i] = self.header
                self.level = new_level
            
            new_node = SkipListNode(value, new_level)
            for i in range(new_level + 1):
                new_node.forward[i] = update[i].forward[i]
                update[i].forward[i] = new_node
```

---

### 41. What is a Sparse Table?
**Answer:** A Sparse Table is a data structure that supports range queries (min, max, gcd) in O(1) time after O(n log n) preprocessing. Uses dynamic programming and binary lifting. Each query [l, r] is answered by combining two precomputed intervals. Cannot handle updates efficiently.

### JavaScript
```javascript
class SparseTable {
  constructor(arr, operation = Math.min) {
    this.n = arr.length;
    this.log = Math.floor(Math.log2(this.n)) + 1;
    this.table = Array(this.n).fill(null).map(() => new Array(this.log).fill(0));
    this.operation = operation;
    
    // Initialize first column
    for (let i = 0; i < this.n; i++) {
      this.table[i][0] = arr[i];
    }
    
    // Build table
    for (let j = 1; j < this.log; j++) {
      for (let i = 0; i + (1 << j) <= this.n; i++) {
        this.table[i][j] = this.operation(
          this.table[i][j - 1],
          this.table[i + (1 << (j - 1))][j - 1]
        );
      }
    }
  }
  
  query(l, r) {
    const length = r - l + 1;
    const k = Math.floor(Math.log2(length));
    return this.operation(
      this.table[l][k],
      this.table[r - (1 << k) + 1][k]
    );
  }
}
// Time: O(n log n) build, O(1) query, Space: O(n log n)
```

### Python
```python
import math

class SparseTable:
    """
    Sparse Table for range queries
    Time: O(n log n) build, O(1) query
    Space: O(n log n)
    """
    def __init__(self, arr, operation=min):
        self.n = len(arr)
        self.log = int(math.log2(self.n)) + 1
        self.table = [[0] * self.log for _ in range(self.n)]
        self.operation = operation
        
        # Initialize first column
        for i in range(self.n):
            self.table[i][0] = arr[i]
        
        # Build table
        for j in range(1, self.log):
            for i in range(self.n - (1 << j) + 1):
                self.table[i][j] = self.operation(
                    self.table[i][j - 1],
                    self.table[i + (1 << (j - 1))][j - 1]
                )
    
    def query(self, l, r):
        length = r - l + 1
        k = int(math.log2(length))
        return self.operation(
            self.table[l][k],
            self.table[r - (1 << k) + 1][k]
        )
```

---

### 42. What is a Cartesian Tree?
**Answer:** A Cartesian Tree is a binary tree derived from a sequence of numbers. Root is the minimum (or maximum) element. Left subtree contains elements before root in sequence, right subtree contains elements after. Property: In-order traversal gives original sequence. Used in range minimum queries and Treap data structure.

### JavaScript
```javascript
class CartesianTreeNode {
  constructor(value, index) {
    this.value = value;
    this.index = index;
    this.left = null;
    this.right = null;
  }
}

function buildCartesianTree(arr) {
  if (arr.length === 0) return null;
  
  // Find minimum element
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minIndex]) {
      minIndex = i;
    }
  }
  
  const root = new CartesianTreeNode(arr[minIndex], minIndex);
  root.left = buildCartesianTree(arr.slice(0, minIndex));
  root.right = buildCartesianTree(arr.slice(minIndex + 1));
  
  return root;
}

function inOrderTraversal(node, result = []) {
  if (!node) return result;
  inOrderTraversal(node.left, result);
  result.push(node.value);
  inOrderTraversal(node.right, result);
  return result;
}
// Time: O(n²) naive, O(n) with stack, Space: O(n)
```

### Python
```python
class CartesianTreeNode:
    def __init__(self, value, index):
        self.value = value
        self.index = index
        self.left = None
        self.right = None

def build_cartesian_tree(arr):
    """
    Build Cartesian Tree from array
    Time: O(n²) naive, O(n) with stack
    Space: O(n)
    """
    if not arr:
        return None
    
    # Find minimum element
    min_index = 0
    for i in range(1, len(arr)):
        if arr[i] < arr[min_index]:
            min_index = i
    
    root = CartesianTreeNode(arr[min_index], min_index)
    root.left = build_cartesian_tree(arr[:min_index])
    root.right = build_cartesian_tree(arr[min_index + 1:])
    
    return root

def in_order_traversal(node, result=None):
    if result is None:
        result = []
    if not node:
        return result
    in_order_traversal(node.left, result)
    result.append(node.value)
    in_order_traversal(node.right, result)
    return result
```

---

### 43. What is a Treap?
**Answer:** A Treap (Tree + Heap) is a binary search tree where each node has a key (BST property) and a priority (heap property). Keys follow BST ordering, priorities follow heap ordering (usually max-heap). Combines benefits of BST and heap. Maintains balance through rotations. Average O(log n) for all operations.

### JavaScript
```javascript
class TreapNode {
  constructor(key, priority) {
    this.key = key;
    this.priority = priority;
    this.left = null;
    this.right = null;
  }
}

class Treap {
  constructor() {
    this.root = null;
  }
  
  rightRotate(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    return x;
  }
  
  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }
  
  insert(node, key, priority) {
    if (!node) {
      return new TreapNode(key, priority);
    }
    
    if (key < node.key) {
      node.left = this.insert(node.left, key, priority);
      if (node.left.priority > node.priority) {
        node = this.rightRotate(node);
      }
    } else {
      node.right = this.insert(node.right, key, priority);
      if (node.right.priority > node.priority) {
        node = this.leftRotate(node);
      }
    }
    
    return node;
  }
  
  search(node, key) {
    if (!node || node.key === key) {
      return node;
    }
    if (key < node.key) {
      return this.search(node.left, key);
    }
    return this.search(node.right, key);
  }
}
// Time: O(log n) average, Space: O(n)
```

### Python
```python
import random

class TreapNode:
    def __init__(self, key, priority):
        self.key = key
        self.priority = priority
        self.left = None
        self.right = None

class Treap:
    """
    Treap (Tree + Heap)
    Time: O(log n) average
    Space: O(n)
    """
    def __init__(self):
        self.root = None
    
    def right_rotate(self, y):
        x = y.left
        y.left = x.right
        x.right = y
        return x
    
    def left_rotate(self, x):
        y = x.right
        x.right = y.left
        y.left = x
        return y
    
    def insert(self, node, key, priority=None):
        if priority is None:
            priority = random.randint(0, 1000000)
        
        if not node:
            return TreapNode(key, priority)
        
        if key < node.key:
            node.left = self.insert(node.left, key, priority)
            if node.left.priority > node.priority:
                node = self.right_rotate(node)
        else:
            node.right = self.insert(node.right, key, priority)
            if node.right.priority > node.priority:
                node = self.left_rotate(node)
        
        return node
    
    def search(self, node, key):
        if not node or node.key == key:
            return node
        if key < node.key:
            return self.search(node.left, key)
        return self.search(node.right, key)
```

---

### 44. What is a Splay Tree?
**Answer:** A Splay Tree is a self-adjusting binary search tree. Recently accessed elements are moved to root through splaying operations (zig, zig-zig, zig-zag). No explicit balance condition. Amortized O(log n) for all operations. Access pattern matters - frequently accessed elements stay near root. Good for caching and temporal locality.

### JavaScript
```javascript
class SplayNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class SplayTree {
  constructor() {
    this.root = null;
  }
  
  splay(node) {
    while (node.parent) {
      const parent = node.parent;
      const grandparent = parent.parent;
      
      if (!grandparent) {
        // Zig
        if (node === parent.left) {
          this.rightRotate(parent);
        } else {
          this.leftRotate(parent);
        }
      } else if (node === parent.left && parent === grandparent.left) {
        // Zig-zig (right-right)
        this.rightRotate(grandparent);
        this.rightRotate(parent);
      } else if (node === parent.right && parent === grandparent.right) {
        // Zig-zig (left-left)
        this.leftRotate(grandparent);
        this.leftRotate(parent);
      } else if (node === parent.right && parent === grandparent.left) {
        // Zig-zag (left-right)
        this.leftRotate(parent);
        this.rightRotate(grandparent);
      } else {
        // Zig-zag (right-left)
        this.rightRotate(parent);
        this.leftRotate(grandparent);
      }
    }
    this.root = node;
  }
  
  rightRotate(node) {
    const left = node.left;
    node.left = left.right;
    if (left.right) left.right.parent = node;
    left.parent = node.parent;
    if (!node.parent) {
      this.root = left;
    } else if (node === node.parent.right) {
      node.parent.right = left;
    } else {
      node.parent.left = left;
    }
    left.right = node;
    node.parent = left;
  }
  
  leftRotate(node) {
    const right = node.right;
    node.right = right.left;
    if (right.left) right.left.parent = node;
    right.parent = node.parent;
    if (!node.parent) {
      this.root = right;
    } else if (node === node.parent.left) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }
    right.left = node;
    node.parent = right;
  }
}
// Time: O(log n) amortized, Space: O(n)
```

### Python
```python
class SplayNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.parent = None

class SplayTree:
    """
    Splay Tree - self-adjusting BST
    Time: O(log n) amortized
    Space: O(n)
    """
    def __init__(self):
        self.root = None
    
    def splay(self, node):
        while node.parent:
            parent = node.parent
            grandparent = parent.parent
            
            if not grandparent:
                # Zig
                if node == parent.left:
                    self.right_rotate(parent)
                else:
                    self.left_rotate(parent)
            elif node == parent.left and parent == grandparent.left:
                # Zig-zig (right-right)
                self.right_rotate(grandparent)
                self.right_rotate(parent)
            elif node == parent.right and parent == grandparent.right:
                # Zig-zig (left-left)
                self.left_rotate(grandparent)
                self.left_rotate(parent)
            elif node == parent.right and parent == grandparent.left:
                # Zig-zag (left-right)
                self.left_rotate(parent)
                self.right_rotate(grandparent)
            else:
                # Zig-zag (right-left)
                self.right_rotate(parent)
                self.left_rotate(grandparent)
        self.root = node
    
    def right_rotate(self, node):
        left = node.left
        node.left = left.right
        if left.right:
            left.right.parent = node
        left.parent = node.parent
        if not node.parent:
            self.root = left
        elif node == node.parent.right:
            node.parent.right = left
        else:
            node.parent.left = left
        left.right = node
        node.parent = left
    
    def left_rotate(self, node):
        right = node.right
        node.right = right.left
        if right.left:
            right.left.parent = node
        right.parent = node.parent
        if not node.parent:
            self.root = right
        elif node == node.parent.left:
            node.parent.left = right
        else:
            node.parent.right = right
        right.left = node
        node.parent = right
```

---

### 45. What is a Rope data structure?
**Answer:** A Rope is a binary tree data structure used to efficiently store and manipulate very long strings. Each leaf contains a substring and its length. Internal nodes store the total length of their left subtree. Supports: split, concatenate, insert, delete in O(log n) time. Better than strings for large text editing operations.

### JavaScript
```javascript
class RopeNode {
  constructor(data = '', weight = 0) {
    this.data = data;
    this.weight = weight;
    this.left = null;
    this.right = null;
  }
}

class Rope {
  constructor(str = '') {
    this.root = this.buildRope(str);
  }
  
  buildRope(str, leafSize = 10) {
    if (str.length <= leafSize) {
      return new RopeNode(str, str.length);
    }
    
    const mid = Math.floor(str.length / 2);
    const node = new RopeNode();
    node.left = this.buildRope(str.substring(0, mid), leafSize);
    node.right = this.buildRope(str.substring(mid), leafSize);
    node.weight = node.left.weight + (node.left.data ? node.left.data.length : 0);
    
    return node;
  }
  
  getWeight(node) {
    if (!node) return 0;
    return node.weight + (node.data ? node.data.length : 0);
  }
  
  toString(node = this.root) {
    if (!node) return '';
    if (node.data) return node.data;
    return this.toString(node.left) + this.toString(node.right);
  }
  
  charAt(index, node = this.root) {
    if (!node) return null;
    if (node.data) {
      return node.data[index] || null;
    }
    if (index < node.weight) {
      return this.charAt(index, node.left);
    }
    return this.charAt(index - node.weight, node.right);
  }
}
// Time: O(log n) for operations, Space: O(n)
```

### Python
```python
class RopeNode:
    def __init__(self, data='', weight=0):
        self.data = data
        self.weight = weight
        self.left = None
        self.right = None

class Rope:
    """
    Rope data structure for efficient string operations
    Time: O(log n) for operations
    Space: O(n)
    """
    def __init__(self, s=''):
        self.root = self.build_rope(s)
    
    def build_rope(self, s, leaf_size=10):
        if len(s) <= leaf_size:
            return RopeNode(s, len(s))
        
        mid = len(s) // 2
        node = RopeNode()
        node.left = self.build_rope(s[:mid], leaf_size)
        node.right = self.build_rope(s[mid:], leaf_size)
        node.weight = node.left.weight + (len(node.left.data) if node.left.data else 0)
        
        return node
    
    def get_weight(self, node):
        if not node:
            return 0
        return node.weight + (len(node.data) if node.data else 0)
    
    def to_string(self, node=None):
        if node is None:
            node = self.root
        if not node:
            return ''
        if node.data:
            return node.data
        return self.to_string(node.left) + self.to_string(node.right)
    
    def char_at(self, index, node=None):
        if node is None:
            node = self.root
        if not node:
            return None
        if node.data:
            return node.data[index] if index < len(node.data) else None
        if index < node.weight:
            return self.char_at(index, node.left)
        return self.char_at(index - node.weight, node.right)
```

---


### 46. How do you reverse an array in-place?
**Answer:** Swap elements from both ends moving towards center. Use two pointers: one at start, one at end. Swap and move pointers until they meet. Time: O(n), Space: O(1).

### JavaScript
```javascript
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

// Example
const arr = [1, 2, 3, 4, 5];
reverseArray(arr);
console.log(arr); // [5, 4, 3, 2, 1]
// Time: O(n), Space: O(1)
```

### Python
```python
def reverse_array(arr):
    """
    Reverse array in-place using two pointers
    Time: O(n)
    Space: O(1)
    """
    left = 0
    right = len(arr) - 1
    
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# Example
arr = [1, 2, 3, 4, 5]
reverse_array(arr)
print(arr)  # [5, 4, 3, 2, 1]
```

---

### 47. How do you find the maximum element in an array?
**Answer:** Iterate through array, keep track of maximum seen so far. Initialize max with first element, compare with each subsequent element. Time: O(n), Space: O(1).

### JavaScript
```javascript
function findMax(arr) {
  if (arr.length === 0) return null;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Using reduce
function findMaxReduce(arr) {
  return arr.reduce((max, current) => current > max ? current : max, arr[0]);
}

// Example
console.log(findMax([3, 7, 2, 9, 1])); // 9
// Time: O(n), Space: O(1)
```

### Python
```python
def find_max(arr):
    """
    Find maximum element in array
    Time: O(n)
    Space: O(1)
    """
    if not arr:
        return None
    
    max_val = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val

# Using built-in
def find_max_builtin(arr):
    return max(arr) if arr else None

# Example
print(find_max([3, 7, 2, 9, 1]))  # 9
```

---

### 48. How do you check if an array contains duplicates?
**Answer:** Use a Set to track seen elements. Iterate through array, if element already in set, return true. Otherwise add to set. Time: O(n), Space: O(n). Alternative: Sort array and check adjacent elements - Time: O(n log n), Space: O(1).

### JavaScript
```javascript
function hasDuplicates(arr) {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

// Alternative: Sort and check adjacent
function hasDuplicatesSort(arr) {
  arr.sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      return true;
    }
  }
  return false;
}

// Example
console.log(hasDuplicates([1, 2, 3, 2])); // true
console.log(hasDuplicates([1, 2, 3, 4])); // false
// Time: O(n) with Set, O(n log n) with sort, Space: O(n) or O(1)
```

### Python
```python
def has_duplicates(arr):
    """
    Check if array contains duplicates using set
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# Alternative: Sort and check adjacent
def has_duplicates_sort(arr):
    arr.sort()
    for i in range(1, len(arr)):
        if arr[i] == arr[i - 1]:
            return True
    return False

# Example
print(has_duplicates([1, 2, 3, 2]))  # True
print(has_duplicates([1, 2, 3, 4]))  # False
```

---

### 49. How do you implement a stack using an array?
**Answer:** Use array with pointer to top. Push: add to end, increment pointer. Pop: remove from end, decrement pointer. Peek: return last element. Time: O(1) for all operations, Space: O(n).

### JavaScript
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Example: Check balanced parentheses
function isBalanced(str) {
  const stack = new Stack();
  const pairs = { '(': ')', '[': ']', '{': '}' };
  
  for (let char of str) {
    if (char in pairs) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.isEmpty() || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}
// Time: O(1) for stack operations, Space: O(n)
```

### Python
```python
class Stack:
    """
    Stack implementation using list
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = []
    
    def push(self, element):
        self.items.append(element)
    
    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()
    
    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Example: Check balanced parentheses
def is_balanced(s):
    stack = Stack()
    pairs = {'(': ')', '[': ']', '{': '}'}
    
    for char in s:
        if char in pairs:
            stack.push(char)
        elif char in pairs.values():
            if stack.is_empty() or pairs[stack.pop()] != char:
                return False
    return stack.is_empty()
```

---

### 50. How do you implement a queue using an array?
**Answer:** Use array with front and rear pointers. Enqueue: add to rear, increment rear. Dequeue: remove from front, increment front. Can use circular array to reuse space. Time: O(1) amortized, Space: O(n).

### JavaScript
```javascript
class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }
  
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.items[this.front];
    this.front++;
    return element;
  }
  
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.front === this.rear;
  }
  
  size() {
    return this.rear - this.front;
  }
}

// Example: BFS level-order traversal
function levelOrder(root) {
  if (!root) return [];
  const queue = new Queue();
  const result = [];
  queue.enqueue(root);
  
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    result.push(node.val);
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }
  return result;
}
// Time: O(1) amortized, Space: O(n)
```

### Python
```python
from collections import deque

class Queue:
    """
    Queue implementation using deque for O(1) operations
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, element):
        self.items.append(element)
    
    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.popleft()
    
    def peek(self):
        if self.is_empty():
            return None
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Example: BFS level-order traversal
def level_order(root):
    if not root:
        return []
    queue = Queue()
    result = []
    queue.enqueue(root)
    
    while not queue.is_empty():
        node = queue.dequeue()
        result.append(node.val)
        if node.left:
            queue.enqueue(node.left)
        if node.right:
            queue.enqueue(node.right)
    return result
```

---

### 51. How do you find the middle element of a linked list?
**Answer:** Use two pointers: slow and fast. Slow moves one step, fast moves two steps. When fast reaches end, slow is at middle. Time: O(n), Space: O(1).

### JavaScript
```javascript
function findMiddle(head) {
  if (!head) return null;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}

// Example
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

console.log(findMiddle(head).val); // 3
// Time: O(n), Space: O(1)
```

### Python
```python
def find_middle(head):
    """
    Find middle element using two pointers
    Time: O(n)
    Space: O(1)
    """
    if not head:
        return None
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow

# Example
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)

print(find_middle(head).val)  # 3
```

---

### 52. How do you detect a cycle in a linked list?
**Answer:** Use Floyd's Cycle Detection (tortoise and hare). Two pointers: slow moves one step, fast moves two steps. If they meet, cycle exists. Time: O(n), Space: O(1).

### JavaScript
```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head.next;
  
  while (fast && fast.next) {
    if (slow === fast) {
      return true;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return false;
}

// Find cycle start
function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  
  // Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  
  if (!fast || !fast.next) return null;
  
  // Find cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  
  return slow;
}
// Time: O(n), Space: O(1)
```

### Python
```python
def has_cycle(head):
    """
    Detect cycle using Floyd's algorithm
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while fast and fast.next:
        if slow == fast:
            return True
        slow = slow.next
        fast = fast.next.next
    
    return False

# Find cycle start
def detect_cycle_start(head):
    slow = fast = head
    
    # Find meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    
    if not fast or not fast.next:
        return None
    
    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow
```

---

### 53. How do you reverse a linked list?
**Answer:** Use three pointers: prev, current, next. Iterate through list, reverse each link. Time: O(n), Space: O(1) iterative, O(n) recursive.

### JavaScript
```javascript
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}

// Recursive approach
function reverseListRecursive(head) {
  if (!head || !head.next) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Example
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
const reversed = reverseList(head);
// Time: O(n), Space: O(1) iterative, O(n) recursive
```

### Python
```python
def reverse_list(head):
    """
    Reverse linked list iteratively
    Time: O(n)
    Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev

# Recursive approach
def reverse_list_recursive(head):
    if not head or not head.next:
        return head
    
    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

---

### 54. How do you merge two sorted arrays?
**Answer:** Use two pointers, one for each array. Compare elements, add smaller to result, advance pointer. Time: O(m + n), Space: O(m + n) for new array, O(1) if merging in-place.

### JavaScript
```javascript
function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  
  return result;
}

// Example
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
// Time: O(m + n), Space: O(m + n)
```

### Python
```python
def merge_sorted_arrays(arr1, arr2):
    """
    Merge two sorted arrays
    Time: O(m + n)
    Space: O(m + n)
    """
    result = []
    i = j = 0
    
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Add remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result

# Example
print(merge_sorted_arrays([1, 3, 5], [2, 4, 6]))  # [1, 2, 3, 4, 5, 6]
```

---

### 55. How do you find two numbers that sum to a target?
**Answer:** Use hash map to store complements. For each number, check if complement (target - number) exists in map. If yes, return indices. Time: O(n), Space: O(n).

### JavaScript
```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}

// Example
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// Time: O(n), Space: O(n)
```

### Python
```python
def two_sum(nums, target):
    """
    Find two numbers that sum to target
    Time: O(n)
    Space: O(n)
    """
    map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map:
            return [map[complement], i]
        map[num] = i
    
    return []

# Example
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
```

---

### 56. How do you implement a hash table with collision handling?
**Answer:** Use array of buckets. Hash function maps key to bucket index. Handle collisions with chaining (linked list at each bucket) or open addressing (find next available slot). Time: O(1) average, O(n) worst, Space: O(n).

### JavaScript
```javascript
class HashTable {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
  }
  
  hash(key) {
    let hash = 0;
    for (let char of String(key)) {
      hash = (hash + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push([key, value]);
  }
  
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }
    
    return undefined;
  }
  
  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
}
// Time: O(1) average, O(n) worst, Space: O(n)
```

### Python
```python
class HashTable:
    """
    Hash Table with chaining for collision handling
    Time: O(1) average, O(n) worst
    Space: O(n)
    """
    def __init__(self, size=16):
        self.buckets = [[] for _ in range(size)]
        self.size = size
    
    def hash(self, key):
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value + ord(char)) % self.size
        return hash_value
    
    def set(self, key, value):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        # Check if key already exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
    
    def get(self, key):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                return True
        return False
```

---

### 57. How do you traverse a binary tree in-order?
**Answer:** Visit left subtree, then root, then right subtree. Recursive: traverse left, visit root, traverse right. Iterative: use stack to simulate recursion. Time: O(n), Space: O(h) where h is height.

### JavaScript
```javascript
// Recursive
function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// Iterative
function inorderTraversalIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  
  return result;
}
// Time: O(n), Space: O(h)
```

### Python
```python
# Recursive
def inorder_traversal(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    
    traverse(root)
    return result

# Iterative
def inorder_traversal_iterative(root):
    result = []
    stack = []
    current = root
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result
```

---

### 58. How do you find the height of a binary tree?
**Answer:** Recursively find height of left and right subtrees, return maximum plus 1. Base case: null node returns -1 or 0. Time: O(n), Space: O(h) where h is height.

### JavaScript
```javascript
function treeHeight(root) {
  if (!root) {
    return -1; // or 0 if counting nodes
  }
  
  const leftHeight = treeHeight(root.left);
  const rightHeight = treeHeight(root.right);
  
  return Math.max(leftHeight, rightHeight) + 1;
}

// Alternative: Count nodes instead of edges
function treeHeightNodes(root) {
  if (!root) {
    return 0;
  }
  
  return Math.max(
    treeHeightNodes(root.left),
    treeHeightNodes(root.right)
  ) + 1;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def tree_height(root):
    """
    Find height of binary tree (counting edges)
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return -1  # or 0 if counting nodes
    
    left_height = tree_height(root.left)
    right_height = tree_height(root.right)
    
    return max(left_height, right_height) + 1

# Alternative: Count nodes
def tree_height_nodes(root):
    if not root:
        return 0
    
    return max(
        tree_height_nodes(root.left),
        tree_height_nodes(root.right)
    ) + 1
```

---

### 59. How do you check if a binary tree is balanced?
**Answer:** A tree is balanced if height difference between left and right subtrees is at most 1 for every node. Recursively check heights and balance at each node. Time: O(n), Space: O(h).

### JavaScript
```javascript
function isBalanced(root) {
  function checkBalance(node) {
    if (!node) {
      return { balanced: true, height: -1 };
    }
    
    const left = checkBalance(node.left);
    const right = checkBalance(node.right);
    
    const balanced = left.balanced && right.balanced &&
                     Math.abs(left.height - right.height) <= 1;
    const height = Math.max(left.height, right.height) + 1;
    
    return { balanced, height };
  }
  
  return checkBalance(root).balanced;
}

// Optimized: return -1 if unbalanced
function isBalancedOptimized(root) {
  function height(node) {
    if (!node) return 0;
    
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    
    if (leftHeight === -1 || rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
  
  return height(root) !== -1;
}
// Time: O(n), Space: O(h)
```

### Python
```python
def is_balanced(root):
    """
    Check if binary tree is balanced
    Time: O(n)
    Space: O(h)
    """
    def check_balance(node):
        if not node:
            return {'balanced': True, 'height': -1}
        
        left = check_balance(node.left)
        right = check_balance(node.right)
        
        balanced = (left['balanced'] and right['balanced'] and
                   abs(left['height'] - right['height']) <= 1)
        height = max(left['height'], right['height']) + 1
        
        return {'balanced': balanced, 'height': height}
    
    return check_balance(root)['balanced']

# Optimized
def is_balanced_optimized(root):
    def height(node):
        if not node:
            return 0
        
        left_height = height(node.left)
        right_height = height(node.right)
        
        if (left_height == -1 or right_height == -1 or
            abs(left_height - right_height) > 1):
            return -1
        
        return max(left_height, right_height) + 1
    
    return height(root) != -1
```

---

### 60. How do you implement a binary search in a sorted array?
**Answer:** Use two pointers: left and right. Calculate middle index. If target equals middle, return. If target less, search left half. If target greater, search right half. Time: O(log n), Space: O(1).

### JavaScript
```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Recursive
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Example
console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
// Time: O(log n), Space: O(1) iterative, O(log n) recursive
```

### Python
```python
def binary_search(arr, target):
    """
    Binary search in sorted array
    Time: O(log n)
    Space: O(1)
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Recursive
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example
print(binary_search([1, 2, 3, 4, 5], 3))  # 2
```

---


### 61. When would you use an array vs a linked list?
**Answer:** Use Array when: need random access by index, know size beforehand, memory efficiency matters, frequent access operations. Use Linked List when: size is unknown/dynamic, frequent insertions/deletions at beginning/middle, don't need random access, implementing stack/queue.

### JavaScript
```javascript
// Array - Best for random access
const users = ['Alice', 'Bob', 'Charlie'];
console.log(users[1]); // O(1) - Direct access

// Linked List - Best for frequent insertions/deletions
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertAtHead(val) {
    const newNode = { val, next: this.head };
    this.head = newNode; // O(1) - Much faster than array.unshift()
  }
}

// Real-world example: Browser history
// Array: Good for accessing specific page
// Linked List: Good for adding/removing pages frequently
```

### Python
```python
# Array - Best for random access
users = ['Alice', 'Bob', 'Charlie']
print(users[1])  # O(1) - Direct access

# Linked List - Best for frequent insertions/deletions
class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_head(self, val):
        new_node = {'val': val, 'next': self.head}
        self.head = new_node  # O(1) - Much faster than list.insert(0, val)

# Real-world example: Browser history
# Array: Good for accessing specific page
# Linked List: Good for adding/removing pages frequently
```

---

### 62. How do you implement a queue using two stacks?
**Answer:** Use two stacks: stack1 for enqueue, stack2 for dequeue. Enqueue: push to stack1. Dequeue: if stack2 is empty, pop all from stack1 and push to stack2, then pop from stack2. This reverses the order, achieving FIFO behavior.

### JavaScript
```javascript
class QueueUsingStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  enqueue(item) {
    this.stack1.push(item);
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
// Time: O(1) amortized for enqueue, O(1) amortized for dequeue, Space: O(n)
```

### Python
```python
class QueueUsingStacks:
    """
    Queue implemented using two stacks
    Time: O(1) amortized for enqueue/dequeue
    Space: O(n)
    """
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    
    def enqueue(self, item):
        self.stack1.append(item)
    
    def dequeue(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop() if self.stack2 else None
    
    def peek(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1] if self.stack2 else None
    
    def is_empty(self):
        return not self.stack1 and not self.stack2
```

---

### 63. How do you check if a string has balanced parentheses?
**Answer:** Use a stack. Iterate through string: if opening bracket, push to stack; if closing bracket, check if stack is empty or top doesn't match - return false; else pop. After iteration, stack should be empty. Time: O(n), Space: O(n).

### JavaScript
```javascript
function isBalanced(str) {
  const stack = [];
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (let char of str) {
    if (char in pairs) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.length === 0 || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Examples
console.log(isBalanced('()'));      // true
console.log(isBalanced('()[]{}'));  // true
console.log(isBalanced('([{}])'));  // true
console.log(isBalanced('([)]'));    // false
console.log(isBalanced('((('));     // false
// Time: O(n), Space: O(n)
```

### Python
```python
def is_balanced(s):
    """
    Check if parentheses are balanced using stack
    Time: O(n)
    Space: O(n)
    """
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}
    
    for char in s:
        if char in pairs:
            stack.append(char)
        elif char in pairs.values():
            if not stack or pairs[stack.pop()] != char:
                return False
    
    return len(stack) == 0

# Examples
print(is_balanced('()'))        # True
print(is_balanced('()[]{}'))    # True
print(is_balanced('([{}])'))    # True
print(is_balanced('([)]'))      # False
print(is_balanced('((('))       # False
```

---

### 64. How do you find the first non-repeating character in a string?
**Answer:** Use a hash map to count character frequencies, then iterate string again to find first character with count 1. Alternative: use hash map to store first occurrence index, then find minimum index with count 1.

### JavaScript
```javascript
function firstNonRepeating(str) {
  const charCount = {};
  
  // Count frequencies
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first character with count 1
  for (let char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }
  
  return null;
}

// Example
console.log(firstNonRepeating('leetcode'));  // 'l'
console.log(firstNonRepeating('loveleetcode')); // 'v'
console.log(firstNonRepeating('aabb'));     // null
// Time: O(n), Space: O(1) - limited characters
```

### Python
```python
def first_non_repeating(s):
    """
    Find first non-repeating character
    Time: O(n)
    Space: O(1) - limited characters
    """
    char_count = {}
    
    # Count frequencies
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Find first character with count 1
    for char in s:
        if char_count[char] == 1:
            return char
    
    return None

# Example
print(first_non_repeating('leetcode'))      # 'l'
print(first_non_repeating('loveleetcode'))  # 'v'
print(first_non_repeating('aabb'))         # None
```

---

### 65. How do you reverse a linked list?
**Answer:** Iterative: use three pointers (prev, current, next). Set current.next = prev, move all pointers forward. Recursive: reverse rest of list, then set current.next.next = current, current.next = null. Return new head.

### JavaScript
```javascript
// Iterative approach
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}

// Recursive approach
function reverseListRecursive(head) {
  if (!head || !head.next) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
// Time: O(n), Space: O(1) iterative, O(n) recursive
```

### Python
```python
# Iterative approach
def reverse_list(head):
    """
    Reverse linked list iteratively
    Time: O(n)
    Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev

# Recursive approach
def reverse_list_recursive(head):
    """
    Reverse linked list recursively
    Time: O(n)
    Space: O(n) - recursion stack
    """
    if not head or not head.next:
        return head
    
    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

---

### 66. How do you detect a cycle in a linked list?
**Answer:** Floyd's Cycle Detection (Tortoise and Hare): use two pointers - slow (moves 1 step) and fast (moves 2 steps). If there's a cycle, they will meet. If fast reaches null, no cycle. Time: O(n), Space: O(1).

### JavaScript
```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head.next;
  
  while (fast && fast.next) {
    if (slow === fast) {
      return true; // Cycle detected
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return false;
}

// Alternative: Using Set (O(n) space)
function hasCycleSet(head) {
  const visited = new Set();
  let current = head;
  
  while (current) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }
  
  return false;
}
// Time: O(n), Space: O(1) Floyd's, O(n) Set approach
```

### Python
```python
def has_cycle(head):
    """
    Detect cycle using Floyd's algorithm
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while fast and fast.next:
        if slow == fast:
            return True  # Cycle detected
        slow = slow.next
        fast = fast.next.next
    
    return False

# Alternative: Using Set (O(n) space)
def has_cycle_set(head):
    visited = set()
    current = head
    
    while current:
        if current in visited:
            return True
        visited.add(current)
        current = current.next
    
    return False
```

---

### 67. How do you find the middle element of a linked list?
**Answer:** Use two pointers: slow (moves 1 step) and fast (moves 2 steps). When fast reaches end, slow is at middle. For even length, slow points to second middle. Time: O(n), Space: O(1).

### JavaScript
```javascript
function findMiddle(head) {
  if (!head) return null;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}

// Example: [1,2,3,4,5] -> returns node with value 3
// Example: [1,2,3,4] -> returns node with value 3 (second middle)
// Time: O(n), Space: O(1)
```

### Python
```python
def find_middle(head):
    """
    Find middle element using two pointers
    Time: O(n)
    Space: O(1)
    """
    if not head:
        return None
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow

# Example: [1,2,3,4,5] -> returns node with value 3
# Example: [1,2,3,4] -> returns node with value 3 (second middle)
```

---

### 68. How do you merge two sorted linked lists?
**Answer:** Use two pointers, one for each list. Compare values, add smaller to result, move that pointer. Continue until one list is exhausted, then append remaining. Can be done iteratively or recursively.

### JavaScript
```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}

// Recursive approach
function mergeTwoListsRecursive(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  
  if (l1.val < l2.val) {
    l1.next = mergeTwoListsRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoListsRecursive(l1, l2.next);
    return l2;
  }
}
// Time: O(n + m), Space: O(1) iterative, O(n + m) recursive
```

### Python
```python
def merge_two_lists(l1, l2):
    """
    Merge two sorted linked lists
    Time: O(n + m)
    Space: O(1)
    """
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next

# Recursive approach
def merge_two_lists_recursive(l1, l2):
    if not l1:
        return l2
    if not l2:
        return l1
    
    if l1.val < l2.val:
        l1.next = merge_two_lists_recursive(l1.next, l2)
        return l1
    else:
        l2.next = merge_two_lists_recursive(l1, l2.next)
        return l2
```

---

### 69. How do you implement a stack using a linked list?
**Answer:** Use a linked list with head pointer. Push: create new node, set new node.next = head, update head. Pop: save head value, update head = head.next, return saved value. Peek: return head.value. All operations O(1).

### JavaScript
```javascript
class StackNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  push(val) {
    const newNode = new StackNode(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  pop() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    this.size--;
    return val;
  }
  
  peek() {
    return this.head ? this.head.val : null;
  }
  
  isEmpty() {
    return this.head === null;
  }
  
  getSize() {
    return this.size;
  }
}
// Time: O(1) for all operations, Space: O(n)
```

### Python
```python
class StackNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class Stack:
    """
    Stack using linked list
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.head = None
        self.size = 0
    
    def push(self, val):
        new_node = StackNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def pop(self):
        if not self.head:
            return None
        val = self.head.val
        self.head = self.head.next
        self.size -= 1
        return val
    
    def peek(self):
        return self.head.val if self.head else None
    
    def is_empty(self):
        return self.head is None
    
    def get_size(self):
        return self.size
```

---

### 70. What is the time complexity of common array operations?
**Answer:** Access by index: O(1). Search by value: O(n). Insert at end: O(1). Insert at beginning: O(n). Insert at middle: O(n). Delete at end: O(1). Delete at beginning: O(n). Delete at middle: O(n). Update by index: O(1).

### JavaScript
```javascript
const arr = [1, 2, 3, 4, 5];

// O(1) - Access by index
arr[2];  // Direct memory access

// O(n) - Search by value
arr.indexOf(3);  // Must check each element

// O(1) - Insert at end
arr.push(6);

// O(n) - Insert at beginning
arr.unshift(0);  // Must shift all elements

// O(n) - Insert at middle
arr.splice(2, 0, 2.5);  // Must shift elements

// O(1) - Delete at end
arr.pop();

// O(n) - Delete at beginning
arr.shift();  // Must shift all elements

// O(1) - Update by index
arr[0] = 10;  // Direct memory access
```

### Python
```python
arr = [1, 2, 3, 4, 5]

# O(1) - Access by index
arr[2]  # Direct memory access

# O(n) - Search by value
arr.index(3)  # Must check each element

# O(1) - Insert at end
arr.append(6)

# O(n) - Insert at beginning
arr.insert(0, 0)  # Must shift all elements

# O(n) - Insert at middle
arr.insert(2, 2.5)  # Must shift elements

# O(1) - Delete at end
arr.pop()

# O(n) - Delete at beginning
arr.pop(0)  # Must shift all elements

# O(1) - Update by index
arr[0] = 10  # Direct memory access
```

---

### 71. How do you find duplicates in an array?
**Answer:** Multiple approaches: 1) Use Set - iterate array, if element in set return true, else add to set. O(n) time, O(n) space. 2) Sort then check adjacent - O(n log n) time, O(1) space. 3) Use hash map to count - O(n) time, O(n) space.

### JavaScript
```javascript
// Approach 1: Using Set
function hasDuplicate(nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

// Approach 2: Sort then check
function hasDuplicateSort(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }
  return false;
}

// Approach 3: Find all duplicates
function findDuplicates(nums) {
  const count = {};
  const duplicates = [];
  
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
    if (count[num] === 2) {
      duplicates.push(num);
    }
  }
  
  return duplicates;
}
// Time: O(n) Set, O(n log n) Sort, Space: O(n)
```

### Python
```python
# Approach 1: Using Set
def has_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Approach 2: Sort then check
def has_duplicate_sort(nums):
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False

# Approach 3: Find all duplicates
def find_duplicates(nums):
    count = {}
    duplicates = []
    
    for num in nums:
        count[num] = count.get(num, 0) + 1
        if count[num] == 2:
            duplicates.append(num)
    
    return duplicates
```

---

### 72. How do you implement a hash table with collision handling?
**Answer:** Use array of buckets. Hash function maps key to index. Handle collisions with: 1) Chaining - each bucket is a linked list. 2) Open addressing - find next available slot (linear probing, quadratic probing). Load factor should be < 0.75 for good performance.

### JavaScript
```javascript
// Chaining approach
class HashTable {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null).map(() => []);
    this.size = size;
  }
  
  hash(key) {
    let hash = 0;
    for (let char of String(key)) {
      hash = (hash + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push([key, value]);
  }
  
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    
    return undefined;
  }
  
  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
}
// Time: O(1) average, O(n) worst, Space: O(n)
```

### Python
```python
class HashTable:
    """
    Hash Table with chaining for collision handling
    Time: O(1) average, O(n) worst
    Space: O(n)
    """
    def __init__(self, size=16):
        self.buckets = [[] for _ in range(size)]
        self.size = size
    
    def hash(self, key):
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value + ord(char)) % self.size
        return hash_value
    
    def set(self, key, value):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        # Check if key exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
    
    def get(self, key):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        return None
    
    def delete(self, key):
        index = self.hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                return True
        
        return False
```

---

### 73. What is the difference between a stack and a queue? Give real-world examples.
**Answer:** Stack: LIFO (Last In First Out) - like a stack of plates, browser back button, undo operations, function call stack. Queue: FIFO (First In First Out) - like a line at store, print queue, task scheduling, message queues. Stack: add/remove from same end. Queue: add at rear, remove from front.

### JavaScript
```javascript
// Stack - Browser history (back button)
class BrowserHistory {
  constructor() {
    this.backStack = [];
    this.forwardStack = [];
  }
  
  visit(url) {
    this.backStack.push(url);
    this.forwardStack = []; // Clear forward history
  }
  
  back() {
    if (this.backStack.length > 1) {
      this.forwardStack.push(this.backStack.pop());
      return this.backStack[this.backStack.length - 1];
    }
    return null;
  }
}

// Queue - Print queue
class PrintQueue {
  constructor() {
    this.queue = [];
  }
  
  addJob(document) {
    this.queue.push(document);
  }
  
  printNext() {
    return this.queue.shift(); // Process first in line
  }
}
// Real-world: Stack for undo/redo, Queue for task scheduling
```

### Python
```python
# Stack - Browser history (back button)
class BrowserHistory:
    def __init__(self):
        self.back_stack = []
        self.forward_stack = []
    
    def visit(self, url):
        self.back_stack.append(url)
        self.forward_stack = []  # Clear forward history
    
    def back(self):
        if len(self.back_stack) > 1:
            self.forward_stack.append(self.back_stack.pop())
            return self.back_stack[-1]
        return None

# Queue - Print queue
class PrintQueue:
    def __init__(self):
        self.queue = []
    
    def add_job(self, document):
        self.queue.append(document)
    
    def print_next(self):
        return self.queue.pop(0) if self.queue else None  # Process first in line

# Real-world: Stack for undo/redo, Queue for task scheduling
```

---

### 74. How do you traverse a binary tree?
**Answer:** Three main traversals: 1) In-order (Left, Root, Right) - gives sorted order for BST. 2) Pre-order (Root, Left, Right) - used for copying tree. 3) Post-order (Left, Right, Root) - used for deleting tree. Can be done recursively or iteratively using stack.

### JavaScript
```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// In-order: Left, Root, Right
function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// Pre-order: Root, Left, Right
function preorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// Post-order: Left, Right, Root
function postorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  
  traverse(root);
  return result;
}
// Time: O(n), Space: O(h) where h is height
```

### Python
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# In-order: Left, Root, Right
def inorder_traversal(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    
    traverse(root)
    return result

# Pre-order: Root, Left, Right
def preorder_traversal(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        result.append(node.val)
        traverse(node.left)
        traverse(node.right)
    
    traverse(root)
    return result

# Post-order: Left, Right, Root
def postorder_traversal(root):
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.val)
    
    traverse(root)
    return result
```

---

### 75. What is the difference between a min-heap and max-heap?
**Answer:** Min-heap: parent node is always less than or equal to children. Root is minimum element. Max-heap: parent node is always greater than or equal to children. Root is maximum element. Both maintain complete binary tree structure. Used for priority queues, heap sort, finding kth largest/smallest.

### JavaScript
```javascript
// Min-heap: Parent <= Children
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  
  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }
  
  heapifyUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      [this.heap[i], this.heap[this.parent(i)]] = 
      [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  
  heapifyDown(i) {
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);
    
    if (l < this.heap.length && this.heap[l] < this.heap[smallest]) {
      smallest = l;
    }
    if (r < this.heap.length && this.heap[r] < this.heap[smallest]) {
      smallest = r;
    }
    
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest);
    }
  }
}
// Max-heap: Just change > to < in comparisons
```

### Python
```python
# Min-heap: Parent <= Children
import heapq

# Python has built-in heapq (min-heap)
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 2)
heapq.heappush(min_heap, 8)
print(heapq.heappop(min_heap))  # 2 (minimum)

# Max-heap: Use negative values
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -2)
heapq.heappush(max_heap, -8)
print(-heapq.heappop(max_heap))  # 8 (maximum)

# Manual Min-heap implementation
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left(self, i):
        return 2 * i + 1
    
    def right(self, i):
        return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] =                 self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)
    
    def extract_min(self):
        if not self.heap:
            return None
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        return min_val
    
    def _heapify_down(self, i):
        smallest = i
        l = self.left(i)
        r = self.right(i)
        
        if l < len(self.heap) and self.heap[l] < self.heap[smallest]:
            smallest = l
        if r < len(self.heap) and self.heap[r] < self.heap[smallest]:
            smallest = r
        
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._heapify_down(smallest)
```

---

