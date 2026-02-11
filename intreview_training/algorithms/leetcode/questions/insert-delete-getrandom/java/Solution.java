/**
 * Insert Delete GetRandom O(1) - LeetCode 380
 * 
 * Design a data structure that supports all following operations in average O(1) time.
 * - insert(val): Inserts an item val to the set if not already present.
 * - remove(val): Removes an item val from the set if present.
 * - getRandom(): Returns a random element from current set of elements.
 */
import java.util.*;

public class RandomizedSet {
    private Map<Integer, Integer> map;  // value -> index
    private List<Integer> array;         // actual values
    private Random random;

    public RandomizedSet() {
        this.map = new HashMap<>();
        this.array = new ArrayList<>();
        this.random = new Random();
    }

    /**
     * Inserts a value to the set. Returns true if the set did not already contain the specified element.
     * Time: O(1) average
     */
    public boolean insert(int val) {
        if (map.containsKey(val)) {
            return false;
        }

        // Add to array and store index in map
        array.add(val);
        map.put(val, array.size() - 1);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if the set contained the specified element.
     * Time: O(1) average
     */
    public boolean remove(int val) {
        if (!map.containsKey(val)) {
            return false;
        }

        int indexToRemove = map.get(val);
        int lastElement = array.get(array.size() - 1);

        // Swap element to remove with last element
        array.set(indexToRemove, lastElement);
        map.put(lastElement, indexToRemove);

        // Remove last element (which is now the element we wanted to remove)
        array.remove(array.size() - 1);
        map.remove(val);

        return true;
    }

    /**
     * Get a random element from the set.
     * Time: O(1)
     */
    public int getRandom() {
        int randomIndex = random.nextInt(array.size());
        return array.get(randomIndex);
    }

    /**
     * Get size of set
     */
    public int size() {
        return array.size();
    }

    // Usage Example
    public static void main(String[] args) {
        RandomizedSet randomSet = new RandomizedSet();

        System.out.println("Insert 1: " + randomSet.insert(1)); // true
        System.out.println("Insert 2: " + randomSet.insert(2)); // true
        System.out.println("Insert 3: " + randomSet.insert(3)); // true
        System.out.println("Size: " + randomSet.size()); // 3

        System.out.println("Remove 2: " + randomSet.remove(2)); // true
        System.out.println("Size after remove: " + randomSet.size()); // 2

        System.out.println("Get random (multiple times):");
        for (int i = 0; i < 5; i++) {
            System.out.println("  Random " + (i + 1) + ": " + randomSet.getRandom());
        }

        System.out.println("Insert 2 again: " + randomSet.insert(2)); // true
        System.out.println("Remove 1: " + randomSet.remove(1)); // true
        System.out.println("Get random: " + randomSet.getRandom()); // Should be 2 or 3
    }
}

