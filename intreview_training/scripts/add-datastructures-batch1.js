const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'data-structures', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING DATA STRUCTURES QUESTIONS - BATCH 1 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 Data Structures questions with both JS and Python
const newQuestions = [
  {
    title: "What is a Stack and what are its operations?",
    answer: "A Stack is a linear data structure that follows LIFO (Last In First Out) principle. Main operations: push (add to top), pop (remove from top), peek/top (view top element), isEmpty (check if empty), size (get count).",
    js: `class Stack {
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
// Time: O(1) for all operations, Space: O(n)`,
    python: `class Stack:
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
        return len(self.items)`
  },
  {
    title: "What is a Queue and what are its operations?",
    answer: "A Queue is a linear data structure that follows FIFO (First In First Out) principle. Main operations: enqueue (add to rear), dequeue (remove from front), front/peek (view front element), isEmpty (check if empty), size (get count).",
    js: `class Queue {
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
// Time: O(1) for enqueue, O(n) for dequeue, Space: O(n)`,
    python: `from collections import deque

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
        return len(self.items)`
  },
  {
    title: "What is a Binary Tree?",
    answer: "A Binary Tree is a tree data structure where each node has at most two children, referred to as left child and right child. Properties: Root node (topmost), Leaf nodes (nodes with no children), Height (longest path from root to leaf), Depth (distance from root to node).",
    js: `class TreeNode {
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
// Time: O(1) for creation, Space: O(n)`,
    python: `class TreeNode:
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
root.left.right = TreeNode(5)`
  },
  {
    title: "What is a Binary Search Tree (BST)?",
    answer: "A Binary Search Tree is a binary tree where for each node: all values in left subtree are less than node value, all values in right subtree are greater than node value. This property enables efficient search, insert, and delete operations.",
    js: `class BSTNode {
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
// Time: O(log n) average, O(n) worst, Space: O(h)`,
    python: `class BSTNode:
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
        return self._search(node.right, val)`
  },
  {
    title: "What is a Hash Table?",
    answer: "A Hash Table (Hash Map) is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array of buckets. Provides average O(1) time complexity for insert, delete, and search operations.",
    js: `class HashTable {
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
// Time: O(1) average, O(n) worst, Space: O(n)`,
    python: `class HashTable:
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
        return None`
  },
  {
    title: "What is a Heap?",
    answer: "A Heap is a complete binary tree that satisfies the heap property: In a Max Heap, parent nodes are greater than or equal to children. In a Min Heap, parent nodes are less than or equal to children. Used for priority queues and efficient min/max operations.",
    js: `class MinHeap {
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
// Time: O(log n) for insert/extract, Space: O(n)`,
    python: `import heapq

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
            self.heap[i], self.heap[self.parent(i)] = \
                self.heap[self.parent(i)], self.heap[i]
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
            self._heapify_down(smallest)`
  },
  {
    title: "What is a Graph?",
    answer: "A Graph is a collection of nodes (vertices) connected by edges. Types: Directed (edges have direction), Undirected (edges are bidirectional), Weighted (edges have weights), Unweighted. Can be represented as adjacency list or adjacency matrix.",
    js: `// Adjacency List Representation
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
// Time: O(1) for add, O(V+E) for remove, Space: O(V+E)`,
    python: `class Graph:
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
            del self.adjacency_list[vertex]`
  },
  {
    title: "What is a Trie (Prefix Tree)?",
    answer: "A Trie is a tree-like data structure used to store strings. Each node represents a character, and paths from root to leaf represent words. Useful for prefix matching, autocomplete, and dictionary lookups. Provides O(m) time complexity for search/insert where m is word length.",
    js: `class TrieNode {
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
// Time: O(m) for insert/search, Space: O(ALPHABET_SIZE * N * M)`,
    python: `class TrieNode:
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
        return True`
  },
  {
    title: "What is the difference between Array and ArrayList?",
    answer: "Array: Fixed size, contiguous memory, direct index access. ArrayList/Dynamic Array: Resizable, automatically grows/shrinks, provides add/remove operations. JavaScript arrays are dynamic by default. Python lists are dynamic arrays.",
    js: `// JavaScript arrays are dynamic by default
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
// Time: O(1) for access, Space: O(n)`,
    python: `# Python lists are dynamic arrays
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
        return self.data[index]`
  },
  {
    title: "What is a Doubly Linked List?",
    answer: "A Doubly Linked List is a linked list where each node contains data and two pointers: next (points to next node) and prev (points to previous node). Allows traversal in both directions. Operations: insert/delete at any position in O(1) if node is known, but O(n) to find the node.",
    js: `class DoublyListNode {
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
// Time: O(1) for append/prepend/delete, Space: O(n)`,
    python: `class DoublyListNode:
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
        
        self.length -= 1`
  },
  {
    title: "What is a Circular Linked List?",
    answer: "A Circular Linked List is a linked list where the last node points back to the first node (or head), forming a circle. Can be singly or doubly linked. Useful for round-robin scheduling, implementing queues, and problems requiring circular traversal.",
    js: `class CircularListNode {
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
// Time: O(n) for append, O(n) for display, Space: O(n)`,
    python: `class CircularListNode:
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
        return result`
  },
  {
    title: "What is the difference between Depth-First Search (DFS) and Breadth-First Search (BFS)?",
    answer: "DFS: Explores as far as possible along each branch before backtracking. Uses stack (recursion or explicit stack). BFS: Explores all nodes at current depth before moving to next level. Uses queue. DFS: O(V+E) time, O(h) space. BFS: O(V+E) time, O(w) space where w is max width.",
    js: `// DFS - Recursive
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
// Time: O(V+E), Space: O(V)`,
    python: `# DFS - Recursive
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
                queue.append(neighbor)`
  },
  {
    title: "What is an AVL Tree?",
    answer: "An AVL Tree is a self-balancing Binary Search Tree where the difference between heights of left and right subtrees (balance factor) is at most 1. Maintains O(log n) time complexity for all operations through rotations (left, right, left-right, right-left) when balance is violated.",
    js: `class AVLNode {
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
// Time: O(log n) for all operations, Space: O(n)`,
    python: `class AVLNode:
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
        
        return node`
  },
  {
    title: "What is a Red-Black Tree?",
    answer: "A Red-Black Tree is a self-balancing Binary Search Tree with color properties: Each node is red or black, root is black, all leaves are black, red nodes have black children, all paths from node to leaves have same number of black nodes. Ensures O(log n) height and operations.",
    js: `class RBNode {
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
// Time: O(log n) for all operations, Space: O(n)`,
    python: `class RBNode:
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
        self.root.color = 'BLACK'`
  },
  {
    title: "What is a Set data structure?",
    answer: "A Set is a collection of unique elements with no duplicates. Operations: add (insert element), remove/delete (remove element), contains/has (check membership), union, intersection, difference. Implementations: Hash Set (O(1) average), Tree Set (O(log n)).",
    js: `// JavaScript Set (built-in)
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
// Time: O(1) average for add/has/delete, Space: O(n)`,
    python: `# Python set (built-in)
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
        return list(self.items.keys())`
  },
  {
    title: "What is a Map/Dictionary data structure?",
    answer: "A Map (Dictionary) stores key-value pairs. Each key maps to exactly one value. Operations: put/set (insert/update), get (retrieve), remove/delete (remove), containsKey/has (check key existence), size. Implementations: Hash Map (O(1) average), Tree Map (O(log n)).",
    js: `// JavaScript Map (built-in)
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
// Time: O(1) average for all operations, Space: O(n)`,
    python: `# Python dict (built-in)
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
        return len(self.items)`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n`;
  newContent += `**Answer:** ${q.answer}\n\n`;
  newContent += `### JavaScript\n\`\`\`javascript\n${q.js}\n\`\`\`\n\n`;
  newContent += `### Python\n\`\`\`python\n${q.python}\n\`\`\`\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### \d+\./gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED - BATCH 1');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Still need: ${Math.max(0, 375 - finalCount)} more questions\n`);
console.log(`✅ Batch 1 complete! Continue with batch 2 in next chat.\n`);
