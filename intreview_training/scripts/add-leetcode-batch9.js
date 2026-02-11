const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 9 (FINAL - 9 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Adding: 9 questions (final batch)\n`);

// Final 9 LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Word Search",
    problem: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    js: `function exist(board, word) {
  const m = board.length;
  const n = board[0].length;
  
  function dfs(i, j, index) {
    if (index === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[index]) {
      return false;
    }
    
    const temp = board[i][j];
    board[i][j] = '#';
    
    const found = dfs(i + 1, j, index + 1) ||
                  dfs(i - 1, j, index + 1) ||
                  dfs(i, j + 1, index + 1) ||
                  dfs(i, j - 1, index + 1);
    
    board[i][j] = temp;
    return found;
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  
  return false;
}
// Time: O(m * n * 4^L), Space: O(L)`,
    python: `def exist(board, word):
    """
    Backtracking DFS
    Time: O(m * n * 4^L)
    Space: O(L)
    """
    m, n = len(board), len(board[0])
    
    def dfs(i, j, index):
        if index == len(word):
            return True
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[index]:
            return False
        
        temp = board[i][j]
        board[i][j] = '#'
        
        found = (dfs(i + 1, j, index + 1) or
                 dfs(i - 1, j, index + 1) or
                 dfs(i, j + 1, index + 1) or
                 dfs(i, j - 1, index + 1))
        
        board[i][j] = temp
        return found
    
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True
    
    return False`
  },
  {
    title: "Word Search II",
    problem: "Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    js: `function findWords(board, words) {
  const result = [];
  const trie = new Trie();
  
  for (let word of words) {
    trie.insert(word);
  }
  
  const m = board.length;
  const n = board[0].length;
  
  function dfs(i, j, node, path) {
    if (node.word) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }
    
    if (i < 0 || i >= m || j < 0 || j >= n || !node.children[board[i][j]]) {
      return;
    }
    
    const char = board[i][j];
    const nextNode = node.children[char];
    board[i][j] = '#';
    
    dfs(i + 1, j, nextNode, path + char);
    dfs(i - 1, j, nextNode, path + char);
    dfs(i, j + 1, nextNode, path + char);
    dfs(i, j - 1, nextNode, path + char);
    
    board[i][j] = char;
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, trie.root, '');
    }
  }
  
  return result;
}

class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
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
    node.word = word;
  }
}
// Time: O(m * n * 4^L), Space: O(ALPHABET_SIZE * N * M)`,
    python: `def find_words(board, words):
    """
    Trie + Backtracking
    Time: O(m * n * 4^L)
    Space: O(ALPHABET_SIZE * N * M)
    """
    class TrieNode:
        def __init__(self):
            self.children = {}
            self.word = None
    
    class Trie:
        def __init__(self):
            self.root = TrieNode()
        
        def insert(self, word):
            node = self.root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word
    
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    result = []
    m, n = len(board), len(board[0])
    
    def dfs(i, j, node):
        if node.word:
            result.append(node.word)
            node.word = None  # Avoid duplicates
        
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] not in node.children:
            return
        
        char = board[i][j]
        next_node = node.children[char]
        board[i][j] = '#'
        
        dfs(i + 1, j, next_node)
        dfs(i - 1, j, next_node)
        dfs(i, j + 1, next_node)
        dfs(i, j - 1, next_node)
        
        board[i][j] = char
    
    for i in range(m):
        for j in range(n):
            dfs(i, j, trie.root)
    
    return result`
  },
  {
    title: "Design Add and Search Words Data Structure",
    problem: "Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the `WordDictionary` class with `addWord(word)` and `search(word)` methods. `search(word)` can search a literal word or a regular expression string containing only letters `a-z` or `.`. A `.` means it can represent any one letter.",
    js: `class WordDictionary {
  constructor() {
    this.trie = {};
  }
  
  addWord(word) {
    let node = this.trie;
    for (let char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEnd = true;
  }
  
  search(word) {
    function dfs(node, index) {
      if (index === word.length) {
        return node.isEnd === true;
      }
      
      const char = word[index];
      if (char === '.') {
        for (let key in node) {
          if (key !== 'isEnd' && dfs(node[key], index + 1)) {
            return true;
          }
        }
        return false;
      } else {
        if (!node[char]) return false;
        return dfs(node[char], index + 1);
      }
    }
    
    return dfs(this.trie, 0);
  }
}
// Time: O(M) for addWord, O(N * 26^M) for search, Space: O(ALPHABET_SIZE * N * M)`,
    python: `class WordDictionary:
    """
    Trie with wildcard support
    Time: O(M) for addWord, O(N * 26^M) for search
    Space: O(ALPHABET_SIZE * N * M)
    """
    def __init__(self):
        self.trie = {}
    
    def add_word(self, word):
        node = self.trie
        for char in word:
            if char not in node:
                node[char] = {}
            node = node[char]
        node['is_end'] = True
    
    def search(self, word):
        def dfs(node, index):
            if index == len(word):
                return node.get('is_end', False)
            
            char = word[index]
            if char == '.':
                for key in node:
                    if key != 'is_end' and dfs(node[key], index + 1):
                        return True
                return False
            else:
                if char not in node:
                    return False
                return dfs(node[char], index + 1)
        
        return dfs(self.trie, 0)`
  },
  {
    title: "Implement Trie (Prefix Tree)",
    problem: "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the `Trie` class with `insert(word)`, `search(word)`, and `startsWith(prefix)` methods.",
    js: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
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
    node.isEnd = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEnd;
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
// Time: O(M) for each operation, Space: O(ALPHABET_SIZE * N * M)`,
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    """
    Prefix tree implementation
    Time: O(M) for each operation
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
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`
  },
  {
    title: "Design Twitter",
    problem: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.",
    js: `class Twitter {
  constructor() {
    this.tweets = [];
    this.follows = new Map();
  }
  
  postTweet(userId, tweetId) {
    this.tweets.push({ userId, tweetId, time: Date.now() });
  }
  
  getNewsFeed(userId) {
    const followees = this.follows.get(userId) || new Set();
    followees.add(userId); // Include own tweets
    
    const feed = this.tweets
      .filter(tweet => followees.has(tweet.userId))
      .sort((a, b) => b.time - a.time)
      .slice(0, 10)
      .map(tweet => tweet.tweetId);
    
    return feed;
  }
  
  follow(followerId, followeeId) {
    if (!this.follows.has(followerId)) {
      this.follows.set(followerId, new Set());
    }
    this.follows.get(followerId).add(followeeId);
  }
  
  unfollow(followerId, followeeId) {
    if (this.follows.has(followerId)) {
      this.follows.get(followerId).delete(followeeId);
    }
  }
}
// Time: O(n log n) for getNewsFeed, Space: O(n)`,
    python: `class Twitter:
    """
    Simplified Twitter design
    Time: O(n log n) for get_news_feed
    Space: O(n)
    """
    def __init__(self):
        self.tweets = []
        self.follows = {}
    
    def post_tweet(self, userId, tweetId):
        import time
        self.tweets.append({'userId': userId, 'tweetId': tweetId, 'time': time.time()})
    
    def get_news_feed(self, userId):
        followees = self.follows.get(userId, set())
        followees.add(userId)  # Include own tweets
        
        feed = [tweet for tweet in self.tweets if tweet['userId'] in followees]
        feed.sort(key=lambda x: x['time'], reverse=True)
        return [tweet['tweetId'] for tweet in feed[:10]]
    
    def follow(self, followerId, followeeId):
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)
    
    def unfollow(self, followerId, followeeId):
        if followerId in self.follows:
            self.follows[followerId].discard(followeeId)`
  },
  {
    title: "Time Based Key-Value Store",
    problem: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
    js: `class TimeMap {
  constructor() {
    this.map = new Map();
  }
  
  set(key, value, timestamp) {
    if (!this.map.has(key)) {
      this.map.set(key, []);
    }
    this.map.get(key).push({ value, timestamp });
  }
  
  get(key, timestamp) {
    if (!this.map.has(key)) return '';
    
    const arr = this.map.get(key);
    let left = 0, right = arr.length - 1;
    let result = '';
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid].timestamp <= timestamp) {
        result = arr[mid].value;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  }
}
// Time: O(1) for set, O(log n) for get, Space: O(n)`,
    python: `class TimeMap:
    """
    Binary search for timestamp
    Time: O(1) for set, O(log n) for get
    Space: O(n)
    """
    def __init__(self):
        self.map = {}
    
    def set(self, key, value, timestamp):
        if key not in self.map:
            self.map[key] = []
        self.map[key].append({'value': value, 'timestamp': timestamp})
    
    def get(self, key, timestamp):
        if key not in self.map:
            return ''
        
        arr = self.map[key]
        left, right = 0, len(arr) - 1
        result = ''
        
        while left <= right:
            mid = (left + right) // 2
            if arr[mid]['timestamp'] <= timestamp:
                result = arr[mid]['value']
                left = mid + 1
            else:
                right = mid - 1
        
        return result`
  },
  {
    title: "Insert Delete GetRandom O(1)",
    problem: "Implement the `RandomizedSet` class with `insert(val)`, `remove(val)`, and `getRandom()` methods. Each method should work in average O(1) time complexity.",
    js: `class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }
  
  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }
  
  remove(val) {
    if (!this.map.has(val)) return false;
    const index = this.map.get(val);
    const lastVal = this.list[this.list.length - 1];
    
    this.list[index] = lastVal;
    this.map.set(lastVal, index);
    this.list.pop();
    this.map.delete(val);
    return true;
  }
  
  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
}
// Time: O(1) average, Space: O(n)`,
    python: `import random

class RandomizedSet:
    """
    Hash map + array for O(1) operations
    Time: O(1) average
    Space: O(n)
    """
    def __init__(self):
        self.map = {}
        self.list = []
    
    def insert(self, val):
        if val in self.map:
            return False
        self.map[val] = len(self.list)
        self.list.append(val)
        return True
    
    def remove(self, val):
        if val not in self.map:
            return False
        index = self.map[val]
        last_val = self.list[-1]
        
        self.list[index] = last_val
        self.map[last_val] = index
        self.list.pop()
        del self.map[val]
        return True
    
    def get_random(self):
        return random.choice(self.list)`
  },
  {
    title: "Design Underground System",
    problem: "An underground railway system is keeping track of customer travel times between different stations. Implement the `UndergroundSystem` class with `checkIn(id, stationName, t)`, `checkOut(id, stationName, t)`, and `getAverageTime(startStation, endStation)` methods.",
    js: `class UndergroundSystem {
  constructor() {
    this.checkIns = new Map();
    this.times = new Map();
  }
  
  checkIn(id, stationName, t) {
    this.checkIns.set(id, { stationName, t });
  }
  
  checkOut(id, stationName, t) {
    const checkIn = this.checkIns.get(id);
    const route = checkIn.stationName + ',' + stationName;
    const duration = t - checkIn.t;
    
    if (!this.times.has(route)) {
      this.times.set(route, { total: 0, count: 0 });
    }
    
    const routeData = this.times.get(route);
    routeData.total += duration;
    routeData.count++;
    
    this.checkIns.delete(id);
  }
  
  getAverageTime(startStation, endStation) {
    const route = startStation + ',' + endStation;
    const routeData = this.times.get(route);
    return routeData.total / routeData.count;
  }
}
// Time: O(1) for all operations, Space: O(n)`,
    python: `class UndergroundSystem:
    """
    Track check-ins and route times
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.check_ins = {}
        self.times = {}
    
    def check_in(self, id, stationName, t):
        self.check_ins[id] = {'stationName': stationName, 't': t}
    
    def check_out(self, id, stationName, t):
        check_in = self.check_ins[id]
        route = check_in['stationName'] + ',' + stationName
        duration = t - check_in['t']
        
        if route not in self.times:
            self.times[route] = {'total': 0, 'count': 0}
        
        self.times[route]['total'] += duration
        self.times[route]['count'] += 1
        
        del self.check_ins[id]
    
    def get_average_time(self, startStation, endStation):
        route = startStation + ',' + endStation
        route_data = self.times[route]
        return route_data['total'] / route_data['count']`
  },
  {
    title: "Design Hit Counter",
    problem: "Design a hit counter which counts the number of hits received in the past 5 minutes. Implement the `HitCounter` class with `hit(timestamp)` and `getHits(timestamp)` methods.",
    js: `class HitCounter {
  constructor() {
    this.hits = [];
  }
  
  hit(timestamp) {
    this.hits.push(timestamp);
  }
  
  getHits(timestamp) {
    const fiveMinutesAgo = timestamp - 300;
    this.hits = this.hits.filter(hit => hit > fiveMinutesAgo);
    return this.hits.length;
  }
}
// Time: O(n) for getHits, Space: O(n)`,
    python: `class HitCounter:
    """
    Simple list-based counter
    Time: O(n) for get_hits
    Space: O(n)
    """
    def __init__(self):
        self.hits = []
    
    def hit(self, timestamp):
        self.hits.append(timestamp)
    
    def get_hits(self, timestamp):
        five_minutes_ago = timestamp - 300
        self.hits = [hit for hit in self.hits if hit > five_minutes_ago]
        return len(self.hits)`
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
console.log('✅ QUESTIONS ADDED - BATCH 9 (FINAL)');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Status: ${finalCount >= 150 ? '✅ TARGET REACHED!' : `Still need: ${150 - finalCount} more questions`}\n`);
console.log(`🎉 ALL BATCHES COMPLETE! 🎉\n`);
