"""
Trie (Prefix Tree) Implementation in Python
Tree for storing strings
Time Complexity: O(m) where m is string length
"""

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()
        self.size = 0

    def insert(self, word):
        """Insert word - O(m) where m is word length"""
        current = self.root

        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]

        if not current.is_end_of_word:
            current.is_end_of_word = True
            self.size += 1

        return self

    def search(self, word):
        """Search for word - O(m)"""
        current = self.root

        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]

        return current.is_end_of_word

    def starts_with(self, prefix):
        """Check if prefix exists - O(m)"""
        current = self.root

        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]

        return True

    def delete(self, word):
        """Delete word - O(m)"""
        return self._delete(self.root, word, 0)

    def _delete(self, node, word, index):
        if index == len(word):
            if not node.is_end_of_word:
                return False  # Word doesn't exist
            node.is_end_of_word = False
            self.size -= 1
            return len(node.children) == 0  # Return True if node has no children

        char = word[index]
        if char not in node.children:
            return False  # Word doesn't exist

        child_node = node.children[char]
        should_delete_child = self._delete(child_node, word, index + 1)

        if should_delete_child:
            del node.children[char]
            return len(node.children) == 0 and not node.is_end_of_word

        return False

    def get_all_words_with_prefix(self, prefix):
        """Get all words with prefix - O(m + n) where n is number of words"""
        current = self.root

        # Navigate to prefix
        for char in prefix:
            if char not in current.children:
                return []
            current = current.children[char]

        # Collect all words from this node
        words = []
        self._collect_words(current, prefix, words)
        return words

    def _collect_words(self, node, prefix, words):
        if node.is_end_of_word:
            words.append(prefix)

        for char, child_node in node.children.items():
            self._collect_words(child_node, prefix + char, words)

    def get_all_words(self):
        """Get all words - O(n * m)"""
        words = []
        self._collect_words(self.root, '', words)
        return words

    def count_words_with_prefix(self, prefix):
        """Count words with prefix - O(m + n)"""
        return len(self.get_all_words_with_prefix(prefix))

    def is_empty(self):
        """Check if empty - O(1)"""
        return len(self.root.children) == 0

    def get_size(self):
        """Get size - O(1)"""
        return self.size

    def clear(self):
        """Clear trie - O(1)"""
        self.root = TrieNode()
        self.size = 0


# Usage Example
if __name__ == "__main__":
    trie = Trie()

    trie.insert('apple')
    trie.insert('app')
    trie.insert('application')
    trie.insert('apply')
    trie.insert('banana')
    trie.insert('band')

    print('Search "app":', trie.search('app'))  # True
    print('Search "appl":', trie.search('appl'))  # False
    print('Starts with "app":', trie.starts_with('app'))  # True
    print('Words with prefix "app":', trie.get_all_words_with_prefix('app'))
    print('All words:', trie.get_all_words())

    trie.delete('app')
    print('After delete "app":', trie.search('app'))  # False
    print('Words with prefix "app":', trie.get_all_words_with_prefix('app'))

