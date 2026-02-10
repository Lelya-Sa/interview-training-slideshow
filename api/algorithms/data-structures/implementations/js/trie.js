/**
 * Trie (Prefix Tree) Implementation
 * Tree for storing strings
 * Time Complexity: O(m) where m is string length
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  // Insert word - O(m) where m is word length
  insert(word) {
    let current = this.root;

    for (let char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.size++;
    }

    return this;
  }

  // Search for word - O(m)
  search(word) {
    let current = this.root;

    for (let char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return current.isEndOfWord;
  }

  // Check if prefix exists - O(m)
  startsWith(prefix) {
    let current = this.root;

    for (let char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char);
    }

    return true;
  }

  // Delete word - O(m)
  delete(word) {
    return this._delete(this.root, word, 0);
  }

  _delete(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      node.isEndOfWord = false;
      this.size--;
      return node.children.size === 0; // Return true if node has no children
    }

    const char = word[index];
    const childNode = node.children.get(char);

    if (!childNode) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this._delete(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }

  // Get all words with prefix - O(m + n) where n is number of words
  getAllWordsWithPrefix(prefix) {
    let current = this.root;

    // Navigate to prefix
    for (let char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }

    // Collect all words from this node
    const words = [];
    this._collectWords(current, prefix, words);
    return words;
  }

  _collectWords(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (let [char, childNode] of node.children) {
      this._collectWords(childNode, prefix + char, words);
    }
  }

  // Get all words - O(n * m)
  getAllWords() {
    const words = [];
    this._collectWords(this.root, '', words);
    return words;
  }

  // Count words with prefix - O(m + n)
  countWordsWithPrefix(prefix) {
    return this.getAllWordsWithPrefix(prefix).length;
  }

  // Longest common prefix - O(m * n)
  longestCommonPrefix() {
    let current = this.root;
    let prefix = '';

    while (current.children.size === 1 && !current.isEndOfWord) {
      const [char, childNode] = current.children.entries().next().value;
      prefix += char;
      current = childNode;
    }

    return prefix;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.root.children.size === 0;
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }

  // Clear trie - O(1)
  clear() {
    this.root = new TrieNode();
    this.size = 0;
  }
}

// Usage Example
const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('apply');
trie.insert('banana');
trie.insert('band');

console.log('Search "app":', trie.search('app')); // true
console.log('Search "appl":', trie.search('appl')); // false
console.log('Starts with "app":', trie.startsWith('app')); // true
console.log('Words with prefix "app":', trie.getAllWordsWithPrefix('app')); // ['app', 'apple', 'application', 'apply']
console.log('All words:', trie.getAllWords()); // ['app', 'apple', 'application', 'apply', 'banana', 'band']
console.log('Count words with "app":', trie.countWordsWithPrefix('app')); // 4

trie.delete('app');
console.log('After delete "app":', trie.search('app')); // false
console.log('Words with prefix "app":', trie.getAllWordsWithPrefix('app')); // ['apple', 'application', 'apply']

// Autocomplete example
function autocomplete(trie, prefix) {
  return trie.getAllWordsWithPrefix(prefix);
}

const searchTrie = new Trie();
searchTrie.insert('javascript');
searchTrie.insert('java');
searchTrie.insert('python');
searchTrie.insert('php');
searchTrie.insert('perl');

console.log('Autocomplete for "ja":', autocomplete(searchTrie, 'ja')); // ['java', 'javascript']

module.exports = { Trie, TrieNode };

