const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'data-structures', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING DATA STRUCTURES QUESTIONS - BATCH 3 (15 questions)');
console.log('📌 JUNIOR FULLSTACK INTERVIEW LEVEL');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Adding: 15 questions (Junior Fullstack Level)\n`);

// 15 Junior Fullstack-appropriate Data Structures questions
const newQuestions = [
  {
    title: "When would you use an array vs a linked list?",
    answer: "Use Array when: need random access by index, know size beforehand, memory efficiency matters, frequent access operations. Use Linked List when: size is unknown/dynamic, frequent insertions/deletions at beginning/middle, don't need random access, implementing stack/queue.",
    js: `// Array - Best for random access
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
// Linked List: Good for adding/removing pages frequently`,
    python: `# Array - Best for random access
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
# Linked List: Good for adding/removing pages frequently`
  },
  {
    title: "How do you implement a queue using two stacks?",
    answer: "Use two stacks: stack1 for enqueue, stack2 for dequeue. Enqueue: push to stack1. Dequeue: if stack2 is empty, pop all from stack1 and push to stack2, then pop from stack2. This reverses the order, achieving FIFO behavior.",
    js: `class QueueUsingStacks {
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
// Time: O(1) amortized for enqueue, O(1) amortized for dequeue, Space: O(n)`,
    python: `class QueueUsingStacks:
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
        return not self.stack1 and not self.stack2`
  },
  {
    title: "How do you check if a string has balanced parentheses?",
    answer: "Use a stack. Iterate through string: if opening bracket, push to stack; if closing bracket, check if stack is empty or top doesn't match - return false; else pop. After iteration, stack should be empty. Time: O(n), Space: O(n).",
    js: `function isBalanced(str) {
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
// Time: O(n), Space: O(n)`,
    python: `def is_balanced(s):
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
print(is_balanced('((('))       # False`
  },
  {
    title: "How do you find the first non-repeating character in a string?",
    answer: "Use a hash map to count character frequencies, then iterate string again to find first character with count 1. Alternative: use hash map to store first occurrence index, then find minimum index with count 1.",
    js: `function firstNonRepeating(str) {
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
// Time: O(n), Space: O(1) - limited characters`,
    python: `def first_non_repeating(s):
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
print(first_non_repeating('aabb'))         # None`
  },
  {
    title: "How do you reverse a linked list?",
    answer: "Iterative: use three pointers (prev, current, next). Set current.next = prev, move all pointers forward. Recursive: reverse rest of list, then set current.next.next = current, current.next = null. Return new head.",
    js: `// Iterative approach
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
// Time: O(n), Space: O(1) iterative, O(n) recursive`,
    python: `# Iterative approach
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
    
    return new_head`
  },
  {
    title: "How do you detect a cycle in a linked list?",
    answer: "Floyd's Cycle Detection (Tortoise and Hare): use two pointers - slow (moves 1 step) and fast (moves 2 steps). If there's a cycle, they will meet. If fast reaches null, no cycle. Time: O(n), Space: O(1).",
    js: `function hasCycle(head) {
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
// Time: O(n), Space: O(1) Floyd's, O(n) Set approach`,
    python: `def has_cycle(head):
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
    
    return False`
  },
  {
    title: "How do you find the middle element of a linked list?",
    answer: "Use two pointers: slow (moves 1 step) and fast (moves 2 steps). When fast reaches end, slow is at middle. For even length, slow points to second middle. Time: O(n), Space: O(1).",
    js: `function findMiddle(head) {
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
// Time: O(n), Space: O(1)`,
    python: `def find_middle(head):
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
# Example: [1,2,3,4] -> returns node with value 3 (second middle)`
  },
  {
    title: "How do you merge two sorted linked lists?",
    answer: "Use two pointers, one for each list. Compare values, add smaller to result, move that pointer. Continue until one list is exhausted, then append remaining. Can be done iteratively or recursively.",
    js: `function mergeTwoLists(l1, l2) {
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
// Time: O(n + m), Space: O(1) iterative, O(n + m) recursive`,
    python: `def merge_two_lists(l1, l2):
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
        return l2`
  },
  {
    title: "How do you implement a stack using a linked list?",
    answer: "Use a linked list with head pointer. Push: create new node, set new node.next = head, update head. Pop: save head value, update head = head.next, return saved value. Peek: return head.value. All operations O(1).",
    js: `class StackNode {
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
// Time: O(1) for all operations, Space: O(n)`,
    python: `class StackNode:
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
        return self.size`
  },
  {
    title: "What is the time complexity of common array operations?",
    answer: "Access by index: O(1). Search by value: O(n). Insert at end: O(1). Insert at beginning: O(n). Insert at middle: O(n). Delete at end: O(1). Delete at beginning: O(n). Delete at middle: O(n). Update by index: O(1).",
    js: `const arr = [1, 2, 3, 4, 5];

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
arr[0] = 10;  // Direct memory access`,
    python: `arr = [1, 2, 3, 4, 5]

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
arr[0] = 10  # Direct memory access`
  },
  {
    title: "How do you find duplicates in an array?",
    answer: "Multiple approaches: 1) Use Set - iterate array, if element in set return true, else add to set. O(n) time, O(n) space. 2) Sort then check adjacent - O(n log n) time, O(1) space. 3) Use hash map to count - O(n) time, O(n) space.",
    js: `// Approach 1: Using Set
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
// Time: O(n) Set, O(n log n) Sort, Space: O(n)`,
    python: `# Approach 1: Using Set
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
    
    return duplicates`
  },
  {
    title: "How do you implement a hash table with collision handling?",
    answer: "Use array of buckets. Hash function maps key to index. Handle collisions with: 1) Chaining - each bucket is a linked list. 2) Open addressing - find next available slot (linear probing, quadratic probing). Load factor should be < 0.75 for good performance.",
    js: `// Chaining approach
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
// Time: O(1) average, O(n) worst, Space: O(n)`,
    python: `class HashTable:
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
        
        return False`
  },
  {
    title: "What is the difference between a stack and a queue? Give real-world examples.",
    answer: "Stack: LIFO (Last In First Out) - like a stack of plates, browser back button, undo operations, function call stack. Queue: FIFO (First In First Out) - like a line at store, print queue, task scheduling, message queues. Stack: add/remove from same end. Queue: add at rear, remove from front.",
    js: `// Stack - Browser history (back button)
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
// Real-world: Stack for undo/redo, Queue for task scheduling`,
    python: `# Stack - Browser history (back button)
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

# Real-world: Stack for undo/redo, Queue for task scheduling`
  },
  {
    title: "How do you traverse a binary tree?",
    answer: "Three main traversals: 1) In-order (Left, Root, Right) - gives sorted order for BST. 2) Pre-order (Root, Left, Right) - used for copying tree. 3) Post-order (Left, Right, Root) - used for deleting tree. Can be done recursively or iteratively using stack.",
    js: `class TreeNode {
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
// Time: O(n), Space: O(h) where h is height`,
    python: `class TreeNode:
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
    return result`
  },
  {
    title: "What is the difference between a min-heap and max-heap?",
    answer: "Min-heap: parent node is always less than or equal to children. Root is minimum element. Max-heap: parent node is always greater than or equal to children. Root is maximum element. Both maintain complete binary tree structure. Used for priority queues, heap sort, finding kth largest/smallest.",
    js: `// Min-heap: Parent <= Children
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
// Max-heap: Just change > to < in comparisons`,
    python: `# Min-heap: Parent <= Children
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
            self.heap[i], self.heap[self.parent(i)] = \
                self.heap[self.parent(i)], self.heap[i]
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
            self._heapify_down(smallest)`
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
console.log('✅ QUESTIONS ADDED - BATCH 3');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 375 questions (75 days × 5 per day)`);
console.log(`📊 Still need: ${Math.max(0, 375 - finalCount)} more questions\n`);
console.log(`✅ Batch 3 complete! All questions are JUNIOR FULLSTACK level.\n`);
