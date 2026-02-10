/**
 * Heap Implementation
 * Complete binary tree with heap property
 * Time Complexity: O(log n) for insert/extract
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Get parent index
  _parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Get left child index
  _leftChild(index) {
    return 2 * index + 1;
  }

  // Get right child index
  _rightChild(index) {
    return 2 * index + 2;
  }

  // Swap two elements
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert value - O(log n)
  insert(value) {
    this.heap.push(value);
    this._heapifyUp();
    return this;
  }

  // Heapify up (bubble up) - O(log n)
  _heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = this._parent(index);
      
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }

      this._swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Extract minimum - O(log n)
  extractMin() {
    if (this.isEmpty()) {
      throw new Error('Heap is empty');
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();

    return min;
  }

  // Heapify down (bubble down) - O(log n)
  _heapifyDown() {
    let index = 0;

    while (this._leftChild(index) < this.heap.length) {
      let smallerChildIndex = this._leftChild(index);

      if (
        this._rightChild(index) < this.heap.length &&
        this.heap[this._rightChild(index)] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = this._rightChild(index);
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      }

      this._swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  // Peek at minimum - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error('Heap is empty');
    }
    return this.heap[0];
  }

  // Check if empty - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // Get size - O(1)
  size() {
    return this.heap.length;
  }

  // Build heap from array - O(n)
  buildHeap(array) {
    this.heap = [...array];
    
    // Start from last non-leaf node
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this._heapifyDownFromIndex(i);
    }
    
    return this;
  }

  _heapifyDownFromIndex(index) {
    while (this._leftChild(index) < this.heap.length) {
      let smallerChildIndex = this._leftChild(index);

      if (
        this._rightChild(index) < this.heap.length &&
        this.heap[this._rightChild(index)] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = this._rightChild(index);
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      }

      this._swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  // Convert to array - O(1)
  toArray() {
    return [...this.heap];
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  _parent(index) {
    return Math.floor((index - 1) / 2);
  }

  _leftChild(index) {
    return 2 * index + 1;
  }

  _rightChild(index) {
    return 2 * index + 2;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this._heapifyUp();
    return this;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = this._parent(index);
      
      if (this.heap[parentIndex] >= this.heap[index]) {
        break;
      }

      this._swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.isEmpty()) {
      throw new Error('Heap is empty');
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();

    return max;
  }

  _heapifyDown() {
    let index = 0;

    while (this._leftChild(index) < this.heap.length) {
      let largerChildIndex = this._leftChild(index);

      if (
        this._rightChild(index) < this.heap.length &&
        this.heap[this._rightChild(index)] > this.heap[largerChildIndex]
      ) {
        largerChildIndex = this._rightChild(index);
      }

      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }

      this._swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Heap is empty');
    }
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return [...this.heap];
  }
}

// Usage Examples

// Min Heap
const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(15);
minHeap.insert(3);
minHeap.insert(7);

console.log('Min heap:', minHeap.toArray()); // [3, 5, 15, 10, 7]
console.log('Peek:', minHeap.peek()); // 3
console.log('Extract min:', minHeap.extractMin()); // 3
console.log('After extract:', minHeap.toArray()); // [5, 7, 15, 10]

// Build heap from array
const heap = new MinHeap();
heap.buildHeap([9, 5, 7, 2, 1, 8, 3]);
console.log('Built heap:', heap.toArray());

// Max Heap
const maxHeap = new MaxHeap();
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(15);
maxHeap.insert(3);
maxHeap.insert(7);

console.log('Max heap:', maxHeap.toArray()); // [15, 10, 5, 3, 7]
console.log('Peek:', maxHeap.peek()); // 15
console.log('Extract max:', maxHeap.extractMax()); // 15
console.log('After extract:', maxHeap.toArray()); // [10, 7, 5, 3]

module.exports = { MinHeap, MaxHeap };

