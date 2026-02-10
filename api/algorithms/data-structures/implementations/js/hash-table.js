/**
 * Hash Table Implementation
 * Key-value pairs with hash function
 * Time Complexity: O(1) average, O(n) worst
 */

class HashTable {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  // Hash function - converts key to index
  _hash(key) {
    let hash = 0;
    const keyString = String(key);
    
    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash % this.capacity);
  }

  // Insert key-value pair - O(1) average
  set(key, value) {
    const index = this._hash(key);
    
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    // Check if key already exists
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update existing
        return this;
      }
    }

    // Add new key-value pair
    bucket.push([key, value]);
    this.size++;

    // Resize if load factor exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }

    return this;
  }

  // Get value by key - O(1) average
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return undefined;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return undefined;
  }

  // Delete key-value pair - O(1) average
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        
        if (bucket.length === 0) {
          this.buckets[index] = undefined;
        }
        
        return true;
      }
    }

    return false;
  }

  // Check if key exists - O(1) average
  has(key) {
    return this.get(key) !== undefined;
  }

  // Get all keys - O(n)
  keys() {
    const keys = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          keys.push(this.buckets[i][j][0]);
        }
      }
    }
    return keys;
  }

  // Get all values - O(n)
  values() {
    const values = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          values.push(this.buckets[i][j][1]);
        }
      }
    }
    return values;
  }

  // Get all entries - O(n)
  entries() {
    const entries = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          entries.push([this.buckets[i][j][0], this.buckets[i][j][1]]);
        }
      }
    }
    return entries;
  }

  // Clear hash table - O(n)
  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  // Resize hash table when load factor exceeded
  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Rehash all entries
    for (let i = 0; i < oldBuckets.length; i++) {
      if (oldBuckets[i]) {
        for (let j = 0; j < oldBuckets[i].length; j++) {
          this.set(oldBuckets[i][j][0], oldBuckets[i][j][1]);
        }
      }
    }
  }

  // Get size - O(1)
  getSize() {
    return this.size;
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.size === 0;
  }
}

// Usage Example
const hashTable = new HashTable();

hashTable.set('name', 'John');
hashTable.set('age', 30);
hashTable.set('city', 'New York');
hashTable.set('email', 'john@example.com');

console.log('Get name:', hashTable.get('name')); // 'John'
console.log('Has age:', hashTable.has('age')); // true
console.log('Keys:', hashTable.keys()); // ['name', 'age', 'city', 'email']
console.log('Values:', hashTable.values()); // ['John', 30, 'New York', 'john@example.com']

hashTable.delete('age');
console.log('After delete age:', hashTable.has('age')); // false
console.log('Size:', hashTable.getSize()); // 3

// Collision handling example
hashTable.set('abc', 1);
hashTable.set('cba', 2); // May collide with 'abc'
console.log('Get abc:', hashTable.get('abc')); // 1
console.log('Get cba:', hashTable.get('cba')); // 2

module.exports = HashTable;

