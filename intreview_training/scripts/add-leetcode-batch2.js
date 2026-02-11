const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 2 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 more LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Intersection of Two Arrays II",
    problem: "Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.",
    js: `function intersect(nums1, nums2) {
  const map = new Map();
  const result = [];
  
  // Count frequencies in nums1
  for (let num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  // Check nums2 and add to result
  for (let num of nums2) {
    if (map.get(num) > 0) {
      result.push(num);
      map.set(num, map.get(num) - 1);
    }
  }
  
  return result;
}
// Time: O(n + m), Space: O(min(n, m))`,
    python: `def intersect(nums1, nums2):
    """
    Hash map approach
    Time: O(n + m)
    Space: O(min(n, m))
    """
    from collections import Counter
    
    count1 = Counter(nums1)
    result = []
    
    for num in nums2:
        if count1[num] > 0:
            result.append(num)
            count1[num] -= 1
    
    return result`
  },
  {
    title: "First Unique Character in a String",
    problem: "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.",
    js: `function firstUniqChar(s) {
  const map = new Map();
  
  // Count character frequencies
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Find first unique
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }
  
  return -1;
}
// Time: O(n), Space: O(1) - limited characters`,
    python: `def first_uniq_char(s):
    """
    Hash map approach
    Time: O(n)
    Space: O(1) - limited characters
    """
    from collections import Counter
    
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1`
  },
  {
    title: "Ransom Note",
    problem: "Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise. Each letter in `magazine` can only be used once in `ransomNote`.",
    js: `function canConstruct(ransomNote, magazine) {
  const map = new Map();
  
  // Count magazine characters
  for (let char of magazine) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Check ransom note
  for (let char of ransomNote) {
    if (!map.has(char) || map.get(char) === 0) {
      return false;
    }
    map.set(char, map.get(char) - 1);
  }
  
  return true;
}
// Time: O(n + m), Space: O(1) - limited characters`,
    python: `def can_construct(ransom_note, magazine):
    """
    Hash map approach
    Time: O(n + m)
    Space: O(1) - limited characters
    """
    from collections import Counter
    
    magazine_count = Counter(magazine)
    
    for char in ransom_note:
        if magazine_count[char] <= 0:
            return False
        magazine_count[char] -= 1
    
    return True`
  },
  {
    title: "Valid Palindrome",
    problem: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    js: `function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
// Time: O(n), Space: O(n)`,
    python: `def is_palindrome(s):
    """
    Two pointers approach
    Time: O(n)
    Space: O(n)
    """
    s = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    
    return True`
  },
  {
    title: "Reverse Words in a String",
    problem: "Given an input string `s`, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.",
    js: `function reverseWords(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}
// Time: O(n), Space: O(n)`,
    python: `def reverse_words(s):
    """
    Split and reverse
    Time: O(n)
    Space: O(n)
    """
    return ' '.join(s.split()[::-1])`
  },
  {
    title: "Implement strStr()",
    problem: "Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.",
    js: `function strStr(haystack, needle) {
  if (needle === '') return 0;
  
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
}
// Time: O(n * m), Space: O(1)`,
    python: `def str_str(haystack, needle):
    """
    Sliding window approach
    Time: O(n * m)
    Space: O(1)
    """
    if not needle:
        return 0
    
    for i in range(len(haystack) - len(needle) + 1):
        if haystack[i:i + len(needle)] == needle:
            return i
    
    return -1`
  },
  {
    title: "Longest Common Prefix",
    problem: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `\"\"`.",
    js: `function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}
// Time: O(S) where S is sum of all characters, Space: O(1)`,
    python: `def longest_common_prefix(strs):
    """
    Horizontal scanning
    Time: O(S) where S is sum of all characters
    Space: O(1)
    """
    if not strs:
        return ''
    
    prefix = strs[0]
    for i in range(1, len(strs)):
        while strs[i].find(prefix) != 0:
            prefix = prefix[:-1]
            if not prefix:
                return ''
    
    return prefix`
  },
  {
    title: "Add Binary",
    problem: "Given two binary strings `a` and `b`, return their sum as a binary string.",
    js: `function addBinary(a, b) {
  let result = '';
  let carry = 0;
  let i = a.length - 1;
  let j = b.length - 1;
  
  while (i >= 0 || j >= 0 || carry > 0) {
    const sum = (i >= 0 ? parseInt(a[i]) : 0) + 
                (j >= 0 ? parseInt(b[j]) : 0) + 
                carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
    i--;
    j--;
  }
  
  return result;
}
// Time: O(max(n, m)), Space: O(max(n, m))`,
    python: `def add_binary(a, b):
    """
    Binary addition with carry
    Time: O(max(n, m))
    Space: O(max(n, m))
    """
    result = []
    carry = 0
    i, j = len(a) - 1, len(b) - 1
    
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(a[i])
            i -= 1
        if j >= 0:
            total += int(b[j])
            j -= 1
        result.append(str(total % 2))
        carry = total // 2
    
    return ''.join(reversed(result))`
  },
  {
    title: "Implement Queue using Stacks",
    problem: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).",
    js: `class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  push(x) {
    this.stack1.push(x);
  }
  
  pop() {
    this.peek();
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
  
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
// Time: O(1) amortized, Space: O(n)`,
    python: `class MyQueue:
    """
    Queue using two stacks
    Time: O(1) amortized
    Space: O(n)
    """
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    
    def push(self, x):
        self.stack1.append(x)
    
    def pop(self):
        self.peek()
        return self.stack2.pop()
    
    def peek(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]
    
    def empty(self):
        return not self.stack1 and not self.stack2`
  },
  {
    title: "Implement Stack using Queues",
    problem: "Implement a last in first out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).",
    js: `class MyStack {
  constructor() {
    this.queue = [];
  }
  
  push(x) {
    this.queue.push(x);
    // Rotate queue to make new element at front
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }
  
  pop() {
    return this.queue.shift();
  }
  
  top() {
    return this.queue[0];
  }
  
  empty() {
    return this.queue.length === 0;
  }
}
// Time: O(n) for push, O(1) for others, Space: O(n)`,
    python: `from collections import deque

class MyStack:
    """
    Stack using queue
    Time: O(n) for push, O(1) for others
    Space: O(n)
    """
    def __init__(self):
        self.queue = deque()
    
    def push(self, x):
        self.queue.append(x)
        # Rotate to make new element at front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())
    
    def pop(self):
        return self.queue.popleft()
    
    def top(self):
        return self.queue[0]
    
    def empty(self):
        return len(self.queue) == 0`
  },
  {
    title: "Design HashMap",
    problem: "Design a HashMap without using any built-in hash table libraries. Implement the `MyHashMap` class with `put(key, value)`, `get(key)`, and `remove(key)` methods.",
    js: `class MyHashMap {
  constructor() {
    this.map = new Array(1000001).fill(-1);
  }
  
  put(key, value) {
    this.map[key] = value;
  }
  
  get(key) {
    return this.map[key];
  }
  
  remove(key) {
    this.map[key] = -1;
  }
}
// Time: O(1), Space: O(n)`,
    python: `class MyHashMap:
    """
    Simple array-based HashMap
    Time: O(1)
    Space: O(n)
    """
    def __init__(self):
        self.map = [-1] * 1000001
    
    def put(self, key, value):
        self.map[key] = value
    
    def get(self, key):
        return self.map[key]
    
    def remove(self, key):
        self.map[key] = -1`
  },
  {
    title: "Design HashSet",
    problem: "Design a HashSet without using any built-in hash set libraries. Implement `MyHashSet` class with `add(key)`, `remove(key)`, and `contains(key)` methods.",
    js: `class MyHashSet {
  constructor() {
    this.set = new Array(1000001).fill(false);
  }
  
  add(key) {
    this.set[key] = true;
  }
  
  remove(key) {
    this.set[key] = false;
  }
  
  contains(key) {
    return this.set[key];
  }
}
// Time: O(1), Space: O(n)`,
    python: `class MyHashSet:
    """
    Simple array-based HashSet
    Time: O(1)
    Space: O(n)
    """
    def __init__(self):
        self.set = [False] * 1000001
    
    def add(self, key):
        self.set[key] = True
    
    def remove(self, key):
        self.set[key] = False
    
    def contains(self, key):
        return self.set[key]`
  },
  {
    title: "Isomorphic Strings",
    problem: "Given two strings `s` and `t`, determine if they are isomorphic. Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.",
    js: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  
  const map1 = new Map();
  const map2 = new Map();
  
  for (let i = 0; i < s.length; i++) {
    if (map1.has(s[i]) && map1.get(s[i]) !== t[i]) return false;
    if (map2.has(t[i]) && map2.get(t[i]) !== s[i]) return false;
    map1.set(s[i], t[i]);
    map2.set(t[i], s[i]);
  }
  
  return true;
}
// Time: O(n), Space: O(1) - limited characters`,
    python: `def is_isomorphic(s, t):
    """
    Two-way mapping check
    Time: O(n)
    Space: O(1) - limited characters
    """
    if len(s) != len(t):
        return False
    
    map1 = {}
    map2 = {}
    
    for i in range(len(s)):
        if s[i] in map1 and map1[s[i]] != t[i]:
            return False
        if t[i] in map2 and map2[t[i]] != s[i]:
            return False
        map1[s[i]] = t[i]
        map2[t[i]] = s[i]
    
    return True`
  },
  {
    title: "Word Pattern",
    problem: "Given a `pattern` and a string `s`, find if `s` follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.",
    js: `function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  
  const map1 = new Map();
  const map2 = new Map();
  
  for (let i = 0; i < pattern.length; i++) {
    if (map1.has(pattern[i]) && map1.get(pattern[i]) !== words[i]) return false;
    if (map2.has(words[i]) && map2.get(words[i]) !== pattern[i]) return false;
    map1.set(pattern[i], words[i]);
    map2.set(words[i], pattern[i]);
  }
  
  return true;
}
// Time: O(n), Space: O(n)`,
    python: `def word_pattern(pattern, s):
    """
    Two-way mapping check
    Time: O(n)
    Space: O(n)
    """
    words = s.split()
    if len(pattern) != len(words):
        return False
    
    map1 = {}
    map2 = {}
    
    for i in range(len(pattern)):
        if pattern[i] in map1 and map1[pattern[i]] != words[i]:
            return False
        if words[i] in map2 and map2[words[i]] != pattern[i]:
            return False
        map1[pattern[i]] = words[i]
        map2[words[i]] = pattern[i]
    
    return True`
  },
  {
    title: "Power of Three",
    problem: "Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`. An integer `n` is a power of three, if there exists an integer `x` such that `n == 3^x`.",
    js: `function isPowerOfThree(n) {
  if (n <= 0) return false;
  while (n % 3 === 0) {
    n /= 3;
  }
  return n === 1;
}
// Time: O(log n), Space: O(1)`,
    python: `def is_power_of_three(n):
    """
    Division approach
    Time: O(log n)
    Space: O(1)
    """
    if n <= 0:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n\n`;
  newContent += `**Problem:**\n${q.problem}\n\n`;
  newContent += `**Answer:**\n\n`;
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
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 2 complete! Continue with batch 3 in next chat.\n`);
