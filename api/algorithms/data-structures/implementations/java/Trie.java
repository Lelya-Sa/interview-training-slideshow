/**
 * Trie (Prefix Tree) Implementation in Java
 * Tree for storing strings
 * Time Complexity: O(m) where m is string length
 */
import java.util.*;

public class Trie {
    private TrieNode root;
    private int size;

    private static class TrieNode {
        Map<Character, TrieNode> children;
        boolean isEndOfWord;

        TrieNode() {
            this.children = new HashMap<>();
            this.isEndOfWord = false;
        }
    }

    public Trie() {
        this.root = new TrieNode();
        this.size = 0;
    }

    public Trie insert(String word) {
        TrieNode current = root;

        for (char c : word.toCharArray()) {
            current.children.putIfAbsent(c, new TrieNode());
            current = current.children.get(c);
        }

        if (!current.isEndOfWord) {
            current.isEndOfWord = true;
            size++;
        }

        return this;
    }

    public boolean search(String word) {
        TrieNode current = root;

        for (char c : word.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return false;
            }
            current = current.children.get(c);
        }

        return current.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode current = root;

        for (char c : prefix.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return false;
            }
            current = current.children.get(c);
        }

        return true;
    }

    public List<String> getAllWordsWithPrefix(String prefix) {
        TrieNode current = root;

        // Navigate to prefix
        for (char c : prefix.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return new ArrayList<>();
            }
            current = current.children.get(c);
        }

        // Collect all words from this node
        List<String> words = new ArrayList<>();
        collectWords(current, prefix, words);
        return words;
    }

    private void collectWords(TrieNode node, String prefix, List<String> words) {
        if (node.isEndOfWord) {
            words.add(prefix);
        }

        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            collectWords(entry.getValue(), prefix + entry.getKey(), words);
        }
    }

    public List<String> getAllWords() {
        List<String> words = new ArrayList<>();
        collectWords(root, "", words);
        return words;
    }

    public int getSize() {
        return size;
    }

    public boolean isEmpty() {
        return root.children.isEmpty();
    }

    public void clear() {
        root = new TrieNode();
        size = 0;
    }

    // Usage Example
    public static void main(String[] args) {
        Trie trie = new Trie();

        trie.insert("apple");
        trie.insert("app");
        trie.insert("application");
        trie.insert("apply");
        trie.insert("banana");

        System.out.println("Search 'app': " + trie.search("app"));
        System.out.println("Starts with 'app': " + trie.startsWith("app"));
        System.out.println("Words with prefix 'app': " + trie.getAllWordsWithPrefix("app"));
        System.out.println("All words: " + trie.getAllWords());
        System.out.println("Size: " + trie.getSize());
    }
}

