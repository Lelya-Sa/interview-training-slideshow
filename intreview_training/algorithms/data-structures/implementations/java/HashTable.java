/**
 * Hash Table Implementation in Java
 * Key-value pairs with hash function
 * Time Complexity: O(1) average, O(n) worst
 */
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class HashTable {
    private List<List<Entry>> buckets;
    private int capacity;
    private int size;
    private double loadFactor;

    private static class Entry {
        String key;
        Integer value;

        Entry(String key, Integer value) {
            this.key = key;
            this.value = value;
        }
    }

    public HashTable(int initialCapacity, double loadFactor) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new ArrayList<>(capacity);
        for (int i = 0; i < capacity; i++) {
            buckets.add(new LinkedList<>());
        }
        this.size = 0;
    }

    public HashTable() {
        this(16, 0.75);
    }

    private int hash(String key) {
        int hash = 0;
        for (char c : key.toCharArray()) {
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash % capacity);
    }

    public HashTable set(String key, Integer value) {
        int index = hash(key);
        List<Entry> bucket = buckets.get(index);

        // Check if key already exists
        for (Entry entry : bucket) {
            if (entry.key.equals(key)) {
                entry.value = value; // Update existing
                return this;
            }
        }

        // Add new key-value pair
        bucket.add(new Entry(key, value));
        size++;

        // Resize if load factor exceeded
        if ((double) size / capacity > loadFactor) {
            resize();
        }

        return this;
    }

    public Integer get(String key) {
        int index = hash(key);
        List<Entry> bucket = buckets.get(index);

        for (Entry entry : bucket) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
        }

        return null;
    }

    public boolean delete(String key) {
        int index = hash(key);
        List<Entry> bucket = buckets.get(index);

        for (int i = 0; i < bucket.size(); i++) {
            if (bucket.get(i).key.equals(key)) {
                bucket.remove(i);
                size--;
                return true;
            }
        }

        return false;
    }

    public boolean has(String key) {
        return get(key) != null;
    }

    public List<String> keys() {
        List<String> keysList = new ArrayList<>();
        for (List<Entry> bucket : buckets) {
            for (Entry entry : bucket) {
                keysList.add(entry.key);
            }
        }
        return keysList;
    }

    public List<Integer> values() {
        List<Integer> valuesList = new ArrayList<>();
        for (List<Entry> bucket : buckets) {
            for (Entry entry : bucket) {
                valuesList.add(entry.value);
            }
        }
        return valuesList;
    }

    private void resize() {
        List<List<Entry>> oldBuckets = new ArrayList<>(buckets);
        capacity *= 2;
        buckets = new ArrayList<>(capacity);
        for (int i = 0; i < capacity; i++) {
            buckets.add(new LinkedList<>());
        }
        size = 0;

        // Rehash all entries
        for (List<Entry> bucket : oldBuckets) {
            for (Entry entry : bucket) {
                set(entry.key, entry.value);
            }
        }
    }

    public int getSize() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void clear() {
        for (List<Entry> bucket : buckets) {
            bucket.clear();
        }
        size = 0;
    }

    // Usage Example
    public static void main(String[] args) {
        HashTable hashTable = new HashTable();

        hashTable.set("name", 1);
        hashTable.set("age", 30);
        hashTable.set("city", 100);
        System.out.println("Get name: " + hashTable.get("name"));
        System.out.println("Has age: " + hashTable.has("age"));
        System.out.println("Keys: " + hashTable.keys());
        System.out.println("Size: " + hashTable.getSize());
    }
}

