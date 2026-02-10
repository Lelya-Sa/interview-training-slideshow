# Implement Stack Using Queues

## Problem
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

## Examples
```
MyStack stack = new MyStack();
stack.push(1);
stack.push(2);
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false
```

## Approach
1. **Two Queues (Push O(1), Pop O(n))**: Use q1 for storage, q2 for temporary
2. **Two Queues (Push O(n), Pop O(1))**: Keep queue in stack order, reverse on push
3. **Single Queue**: Rotate queue to maintain stack order

## Solution

### JavaScript
```javascript
class MyStack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }
    
    // Push O(1), Pop O(n) approach
    push(x) {
        this.queue1.push(x);
    }
    
    pop() {
        // Move all but last from q1 to q2
        while (this.queue1.length > 1) {
            this.queue2.push(this.queue1.shift());
        }
        const top = this.queue1.shift();
        // Swap queues
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
        return top;
    }
    
    top() {
        const top = this.pop();
        this.push(top);
        return top;
    }
    
    empty() {
        return this.queue1.length === 0;
    }
}

// Single queue approach
class MyStackSingleQueue {
    constructor() {
        this.queue = [];
    }
    
    push(x) {
        this.queue.push(x);
        // Rotate to maintain stack order
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    
    pop() {
        return this.queue.shift();
    }
    
    top() {
        return this.queue[0];
    }
    
    empty() {
        return this.queue.length === 0;
    }
}
```

### Python
```python
from collections import deque

class MyStack:
    def __init__(self):
        self.queue1 = deque()
        self.queue2 = deque()
    
    def push(self, x):
        self.queue1.append(x)
    
    def pop(self):
        while len(self.queue1) > 1:
            self.queue2.append(self.queue1.popleft())
        top = self.queue1.popleft()
        self.queue1, self.queue2 = self.queue2, self.queue1
        return top
    
    def top(self):
        top = self.pop()
        self.push(top)
        return top
    
    def empty(self):
        return len(self.queue1) == 0
```

## Complexity
- **Time**: Push O(1), Pop O(n) for two queues; Push O(n), Pop O(1) for single queue
- **Space**: O(n)

## Follow-up
- Implement queue using stacks?
- Implement stack using single queue more efficiently?
- Thread-safe stack implementation?

