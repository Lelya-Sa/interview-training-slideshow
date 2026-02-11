/**
 * Stack Implementation
 * LIFO (Last In First Out) data structure
 * Time Complexity: O(1) for all operations
 */

class Stack {
  constructor() {
    this.items = [];
    this.length = 0;
  }

  // Push element onto stack - O(1)
  push(value) {
    this.items.push(value);
    this.length++;
    return this;
  }

  // Pop element from stack - O(1)
  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    this.length--;
    return this.items.pop();
  }

  // Peek at top element - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.length - 1];
  }

  // Check if stack is empty - O(1)
  isEmpty() {
    return this.length === 0;
  }

  // Get stack size - O(1)
  size() {
    return this.length;
  }

  // Clear stack - O(1)
  clear() {
    this.items = [];
    this.length = 0;
  }

  // Convert to array - O(n)
  toArray() {
    return [...this.items];
  }

  // Search for value - O(n)
  search(value) {
    const index = this.items.lastIndexOf(value);
    return index === -1 ? -1 : this.length - index;
  }
}

// Stack using Linked List
class StackLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value) {
    const newNode = { value, next: this.head };
    this.head = newNode;
    this.length++;
    return this;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.head.value;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }
}

// Usage Examples

// Array-based Stack
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('Stack:', stack.toArray()); // [1, 2, 3]
console.log('Peek:', stack.peek()); // 3
console.log('Pop:', stack.pop()); // 3
console.log('Stack after pop:', stack.toArray()); // [1, 2]

// Valid Parentheses using Stack
function isValidParentheses(s) {
  const stack = new Stack();
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      if (stack.isEmpty() || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log('Valid parentheses "()[]{}":', isValidParentheses('()[]{}')); // true
console.log('Valid parentheses "([)]":', isValidParentheses('([)]')); // false

// Reverse string using stack
function reverseString(str) {
  const stack = new Stack();
  for (let char of str) {
    stack.push(char);
  }
  
  let reversed = '';
  while (!stack.isEmpty()) {
    reversed += stack.pop();
  }
  return reversed;
}

console.log('Reverse "hello":', reverseString('hello')); // "olleh"

module.exports = { Stack, StackLinkedList };

