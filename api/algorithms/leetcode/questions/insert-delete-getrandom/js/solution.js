/**
 * Insert Delete GetRandom O(1) - LeetCode 380
 * 
 * Design a data structure that supports all following operations in average O(1) time.
 * - insert(val): Inserts an item val to the set if not already present.
 * - remove(val): Removes an item val from the set if present.
 * - getRandom(): Returns a random element from current set of elements.
 */

class RandomizedSet {
  constructor() {
    this.map = new Map(); // value -> index
    this.array = [];      // actual values
  }

  /**
   * Inserts a value to the set. Returns true if the set did not already contain the specified element.
   * Time: O(1) average
   */
  insert(val) {
    if (this.map.has(val)) {
      return false;
    }

    // Add to array and store index in map
    this.array.push(val);
    this.map.set(val, this.array.length - 1);
    return true;
  }

  /**
   * Removes a value from the set. Returns true if the set contained the specified element.
   * Time: O(1) average
   */
  remove(val) {
    if (!this.map.has(val)) {
      return false;
    }

    const indexToRemove = this.map.get(val);
    const lastElement = this.array[this.array.length - 1];

    // Swap element to remove with last element
    this.array[indexToRemove] = lastElement;
    this.map.set(lastElement, indexToRemove);

    // Remove last element (which is now the element we wanted to remove)
    this.array.pop();
    this.map.delete(val);

    return true;
  }

  /**
   * Get a random element from the set.
   * Time: O(1)
   */
  getRandom() {
    const randomIndex = Math.floor(Math.random() * this.array.length);
    return this.array[randomIndex];
  }

  /**
   * Get size of set
   */
  size() {
    return this.array.length;
  }
}

// Usage Example
const randomSet = new RandomizedSet();

console.log('Insert 1:', randomSet.insert(1)); // true
console.log('Insert 2:', randomSet.insert(2)); // true
console.log('Insert 3:', randomSet.insert(3)); // true
console.log('Size:', randomSet.size()); // 3

console.log('Remove 2:', randomSet.remove(2)); // true
console.log('Size after remove:', randomSet.size()); // 2

console.log('Get random (multiple times):');
for (let i = 0; i < 5; i++) {
  console.log(`  Random ${i + 1}:`, randomSet.getRandom());
}

console.log('Insert 2 again:', randomSet.insert(2)); // true
console.log('Remove 1:', randomSet.remove(1)); // true
console.log('Get random:', randomSet.getRandom()); // Should be 2 or 3

module.exports = RandomizedSet;

