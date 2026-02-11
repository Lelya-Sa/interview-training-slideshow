/**
 * Array Implementation
 * Arrays are contiguous memory locations storing elements
 * Time Complexity:
 * - Access: O(1)
 * - Search: O(n)
 * - Insert/Delete: O(n)
 */

class CustomArray {
  constructor(initialCapacity = 10) {
    this.data = new Array(initialCapacity);
    this.length = 0;
    this.capacity = initialCapacity;
  }

  // Access element by index - O(1)
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    return this.data[index];
  }

  // Set element at index - O(1)
  set(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    this.data[index] = value;
  }

  // Insert at end - O(1) amortized
  push(value) {
    if (this.length >= this.capacity) {
      this._resize();
    }
    this.data[this.length] = value;
    this.length++;
    return this.length;
  }

  // Remove from end - O(1)
  pop() {
    if (this.length === 0) {
      throw new Error('Array is empty');
    }
    const value = this.data[this.length - 1];
    this.data[this.length - 1] = undefined;
    this.length--;
    return value;
  }

  // Insert at beginning - O(n)
  unshift(value) {
    if (this.length >= this.capacity) {
      this._resize();
    }
    // Shift all elements to the right
    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = value;
    this.length++;
    return this.length;
  }

  // Remove from beginning - O(n)
  shift() {
    if (this.length === 0) {
      throw new Error('Array is empty');
    }
    const value = this.data[0];
    // Shift all elements to the left
    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this.length - 1] = undefined;
    this.length--;
    return value;
  }

  // Insert at specific index - O(n)
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds');
    }
    if (this.length >= this.capacity) {
      this._resize();
    }
    // Shift elements to the right
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = value;
    this.length++;
    return this.length;
  }

  // Delete at specific index - O(n)
  delete(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    const value = this.data[index];
    // Shift elements to the left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this.length - 1] = undefined;
    this.length--;
    return value;
  }

  // Search for value - O(n)
  indexOf(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }

  // Check if contains value - O(n)
  contains(value) {
    return this.indexOf(value) !== -1;
  }

  // Reverse array - O(n)
  reverse() {
    let left = 0;
    let right = this.length - 1;
    while (left < right) {
      const temp = this.data[left];
      this.data[left] = this.data[right];
      this.data[right] = temp;
      left++;
      right--;
    }
  }

  // Resize array when capacity is reached
  _resize() {
    const newCapacity = this.capacity * 2;
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
  }

  // Convert to regular array
  toArray() {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.data[i]);
    }
    return result;
  }

  // Get size
  size() {
    return this.length;
  }

  // Check if empty
  isEmpty() {
    return this.length === 0;
  }

  // Clear array
  clear() {
    this.data = new Array(this.capacity);
    this.length = 0;
  }
}

// Usage Example
const arr = new CustomArray(5);
arr.push(1);
arr.push(2);
arr.push(3);
arr.push(4);
arr.push(5);
console.log('Array:', arr.toArray()); // [1, 2, 3, 4, 5]
console.log('Get index 2:', arr.get(2)); // 3
arr.insert(2, 10);
console.log('After insert:', arr.toArray()); // [1, 2, 10, 3, 4, 5]
arr.delete(2);
console.log('After delete:', arr.toArray()); // [1, 2, 3, 4, 5]
console.log('Index of 3:', arr.indexOf(3)); // 2
arr.reverse();
console.log('Reversed:', arr.toArray()); // [5, 4, 3, 2, 1]

module.exports = CustomArray;

