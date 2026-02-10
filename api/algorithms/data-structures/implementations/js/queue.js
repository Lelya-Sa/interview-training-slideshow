/**
 * Queue Implementation
 * FIFO (First In First Out) data structure
 * Time Complexity: O(1) for enqueue/dequeue
 */

class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }

  // Enqueue (add to rear) - O(1)
  enqueue(value) {
    this.items[this.rear] = value;
    this.rear++;
    return this;
  }

  // Dequeue (remove from front) - O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const value = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return value;
  }

  // Peek at front element - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.front];
  }

  // Check if queue is empty - O(1)
  isEmpty() {
    return this.rear === this.front;
  }

  // Get queue size - O(1)
  size() {
    return this.rear - this.front;
  }

  // Clear queue - O(1)
  clear() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }

  // Convert to array - O(n)
  toArray() {
    return this.items.slice(this.front, this.rear);
  }
}

// Circular Queue Implementation
class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.length = 0;
  }

  enqueue(value) {
    if (this.isFull()) {
      throw new Error('Queue is full');
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = value;
    this.length++;
    return this;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const value = this.items[this.front];
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.length--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.front];
  }

  isEmpty() {
    return this.length === 0;
  }

  isFull() {
    return this.length === this.capacity;
  }

  size() {
    return this.length;
  }
}

// Priority Queue Implementation
class PriorityQueue {
  constructor(compareFn = (a, b) => a - b) {
    this.items = [];
    this.compare = compareFn;
  }

  // Enqueue with priority - O(n) for insertion sort
  enqueue(value, priority = 0) {
    const element = { value, priority };
    
    if (this.isEmpty()) {
      this.items.push(element);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.compare(element.priority, this.items[i].priority) < 0) {
          this.items.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(element);
      }
    }
    return this;
  }

  // Dequeue - O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    return this.items.shift().value;
  }

  // Peek - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    return this.items[0].value;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return this.items.map(item => item.value);
  }
}

// Deque (Double-ended Queue) Implementation
class Deque {
  constructor() {
    this.items = [];
  }

  // Add to front - O(n)
  addFront(value) {
    this.items.unshift(value);
    return this;
  }

  // Add to rear - O(1)
  addRear(value) {
    this.items.push(value);
    return this;
  }

  // Remove from front - O(n)
  removeFront() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items.shift();
  }

  // Remove from rear - O(1)
  removeRear() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items.pop();
  }

  // Peek front - O(1)
  peekFront() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items[0];
  }

  // Peek rear - O(1)
  peekRear() {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}

// Usage Examples

// Basic Queue
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log('Queue:', queue.toArray()); // [1, 2, 3]
console.log('Peek:', queue.peek()); // 1
console.log('Dequeue:', queue.dequeue()); // 1
console.log('Queue after dequeue:', queue.toArray()); // [2, 3]

// Circular Queue
const circularQueue = new CircularQueue(3);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
console.log('Circular queue full:', circularQueue.isFull()); // true
console.log('Dequeue:', circularQueue.dequeue()); // 1
circularQueue.enqueue(4);
console.log('After wrap:', circularQueue.toArray());

// Priority Queue
const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('Low priority', 3);
priorityQueue.enqueue('High priority', 1);
priorityQueue.enqueue('Medium priority', 2);
console.log('Priority queue:', priorityQueue.toArray()); // ['High priority', 'Medium priority', 'Low priority']
console.log('Dequeue:', priorityQueue.dequeue()); // 'High priority'

// Deque
const deque = new Deque();
deque.addFront(1);
deque.addRear(2);
deque.addFront(0);
console.log('Deque:', deque.toArray()); // [0, 1, 2]
console.log('Remove front:', deque.removeFront()); // 0
console.log('Remove rear:', deque.removeRear()); // 2

module.exports = { Queue, CircularQueue, PriorityQueue, Deque };

