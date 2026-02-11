const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'data-structures', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING DATA STRUCTURES QUESTIONS - BATCH 2 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 more Data Structures questions
const newQuestions = [
  {
    title: "What is a Priority Queue?",
    answer: "A Priority Queue is a data structure where elements are served based on priority rather than insertion order. Higher priority elements are served before lower priority ones. Can be implemented using heap (binary heap, Fibonacci heap) for efficient O(log n) insertions and O(1) max/min retrieval.",
    js: `class PriorityQueue {
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
// Time: O(log n) for enqueue/dequeue, O(1) for peek, Space: O(n)`,
    python: `import heapq

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
        return len(self.heap) == 0`
  },
  {
    title: "What is a Deque (Double-Ended Queue)?",
    answer: "A Deque allows insertion and deletion from both ends (front and rear). Combines features of stack and queue. Operations: addFront, addRear, removeFront, removeRear, peekFront, peekRear. Can be implemented using doubly linked list or circular array.",
    js: `class Deque {
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
// Time: O(1) for addRear/removeRear, O(n) for addFront/removeFront, Space: O(n)`,
    python: `from collections import deque

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
        return len(self.items)`
  },
  {
    title: "What is a Disjoint Set (Union-Find)?",
    answer: "A Disjoint Set data structure tracks a set of elements partitioned into disjoint subsets. Operations: find (find root of element's set), union (merge two sets). Uses path compression and union by rank optimizations. Applications: Kruskal's algorithm, network connectivity, image processing.",
    js: `class UnionFind {
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
// Time: O(α(n)) amortized (inverse Ackermann), Space: O(n)`,
    python: `class UnionFind:
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
        return self.find(x) == self.find(y)`
  },
  {
    title: "What is a Segment Tree?",
    answer: "A Segment Tree is a binary tree data structure used for range queries and range updates. Each node represents a segment/interval. Supports: range sum, range minimum/maximum, range update. Build: O(n), Query: O(log n), Update: O(log n). Useful for problems involving range queries on arrays.",
    js: `class SegmentTree {
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
// Time: O(n) build, O(log n) query/update, Space: O(n)`,
    python: `class SegmentTree:
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
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]`
  },
  {
    title: "What is a Fenwick Tree (Binary Indexed Tree)?",
    answer: "A Fenwick Tree is a data structure that supports prefix sum queries and point updates efficiently. More memory efficient than Segment Tree. Operations: update (add value at index), query (get prefix sum from 0 to index). Build: O(n log n), Query: O(log n), Update: O(log n). Uses bit manipulation for efficiency.",
    js: `class FenwickTree {
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
// Time: O(n log n) build, O(log n) query/update, Space: O(n)`,
    python: `class FenwickTree:
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
        return self.query(r) - self.query(l - 1)`
  },
  {
    title: "What is a Suffix Tree?",
    answer: "A Suffix Tree is a compressed trie containing all suffixes of a string. Each edge represents a substring. Supports: pattern matching in O(m) where m is pattern length, longest common substring, longest repeated substring. Build: O(n) using Ukkonen's algorithm, Space: O(n).",
    js: `// Simplified Suffix Tree implementation
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
// Time: O(n²) simplified, O(n) with Ukkonen's, Space: O(n)`,
    python: `# Simplified Suffix Tree implementation
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
        return True`
  },
  {
    title: "What is a B-Tree?",
    answer: "A B-Tree is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. Each node can have multiple keys and children (more than 2). Used in databases and file systems for efficient disk I/O. Properties: All leaves at same level, minimum degree t (each node has at least t-1 and at most 2t-1 keys).",
    js: `class BTreeNode {
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
// Time: O(log n) for all operations, Space: O(n)`,
    python: `class BTreeNode:
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
            self.insert_non_full(node.children[i], key)`
  },
  {
    title: "What is a Bloom Filter?",
    answer: "A Bloom Filter is a probabilistic data structure that tests whether an element is a member of a set. Returns: definitely not in set (no false negatives), possibly in set (may have false positives). Uses multiple hash functions and a bit array. Space efficient but cannot delete elements. Applications: cache filtering, database query optimization, network routing.",
    js: `class BloomFilter {
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
// Time: O(k) where k is number of hash functions, Space: O(m)`,
    python: `import hashlib

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
        return True  # Possibly in set (may be false positive)`
  },
  {
    title: "What is a Skip List?",
    answer: "A Skip List is a probabilistic data structure that allows O(log n) search, insertion, and deletion. Consists of multiple sorted linked lists at different levels. Lower levels contain all elements, higher levels contain fewer elements. Uses randomization to maintain balance. Alternative to balanced trees with simpler implementation.",
    js: `class SkipListNode {
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
// Time: O(log n) average, Space: O(n)`,
    python: `import random

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
                update[i].forward[i] = new_node`
  },
  {
    title: "What is a Sparse Table?",
    answer: "A Sparse Table is a data structure that supports range queries (min, max, gcd) in O(1) time after O(n log n) preprocessing. Uses dynamic programming and binary lifting. Each query [l, r] is answered by combining two precomputed intervals. Cannot handle updates efficiently.",
    js: `class SparseTable {
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
// Time: O(n log n) build, O(1) query, Space: O(n log n)`,
    python: `import math

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
        )`
  },
  {
    title: "What is a Cartesian Tree?",
    answer: "A Cartesian Tree is a binary tree derived from a sequence of numbers. Root is the minimum (or maximum) element. Left subtree contains elements before root in sequence, right subtree contains elements after. Property: In-order traversal gives original sequence. Used in range minimum queries and Treap data structure.",
    js: `class CartesianTreeNode {
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
// Time: O(n²) naive, O(n) with stack, Space: O(n)`,
    python: `class CartesianTreeNode:
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
    return result`
  },
  {
    title: "What is a Treap?",
    answer: "A Treap (Tree + Heap) is a binary search tree where each node has a key (BST property) and a priority (heap property). Keys follow BST ordering, priorities follow heap ordering (usually max-heap). Combines benefits of BST and heap. Maintains balance through rotations. Average O(log n) for all operations.",
    js: `class TreapNode {
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
// Time: O(log n) average, Space: O(n)`,
    python: `import random

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
        return self.search(node.right, key)`
  },
  {
    title: "What is a Splay Tree?",
    answer: "A Splay Tree is a self-adjusting binary search tree. Recently accessed elements are moved to root through splaying operations (zig, zig-zig, zig-zag). No explicit balance condition. Amortized O(log n) for all operations. Access pattern matters - frequently accessed elements stay near root. Good for caching and temporal locality.",
    js: `class SplayNode {
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
// Time: O(log n) amortized, Space: O(n)`,
    python: `class SplayNode:
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
        node.parent = right`
  },
  {
    title: "What is a Rope data structure?",
    answer: "A Rope is a binary tree data structure used to efficiently store and manipulate very long strings. Each leaf contains a substring and its length. Internal nodes store the total length of their left subtree. Supports: split, concatenate, insert, delete in O(log n) time. Better than strings for large text editing operations.",
    js: `class RopeNode {
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
// Time: O(log n) for operations, Space: O(n)`,
    python: `class RopeNode:
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
        return self.char_at(index - node.weight, node.right)`
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
console.log('✅ QUESTIONS ADDED - BATCH 2');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Still need: ${Math.max(0, 375 - finalCount)} more questions\n`);
console.log(`✅ Batch 2 complete! Continue with batch 3 in next chat.\n`);
