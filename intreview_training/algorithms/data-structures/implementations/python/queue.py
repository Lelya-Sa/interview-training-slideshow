"""
Queue Implementation in Python
FIFO (First In First Out) data structure
Time Complexity: O(1) for enqueue/dequeue
"""

from collections import deque

class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = 0

    def enqueue(self, value):
        """Enqueue (add to rear) - O(1)"""
        self.items.append(value)
        self.rear += 1
        return self

    def dequeue(self):
        """Dequeue (remove from front) - O(1)"""
        if self.is_empty():
            raise IndexError('Queue is empty')
        value = self.items[self.front]
        self.front += 1
        return value

    def peek(self):
        """Peek at front element - O(1)"""
        if self.is_empty():
            raise IndexError('Queue is empty')
        return self.items[self.front]

    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return self.rear == self.front

    def size(self):
        """Get queue size - O(1)"""
        return self.rear - self.front

    def clear(self):
        """Clear queue - O(1)"""
        self.items = []
        self.front = 0
        self.rear = 0

    def to_list(self):
        """Convert to list - O(n)"""
        return self.items[self.front:self.rear]


class CircularQueue:
    def __init__(self, capacity):
        self.items = [None] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.length = 0

    def enqueue(self, value):
        if self.is_full():
            raise IndexError('Queue is full')
        self.rear = (self.rear + 1) % self.capacity
        self.items[self.rear] = value
        self.length += 1
        return self

    def dequeue(self):
        if self.is_empty():
            raise IndexError('Queue is empty')
        value = self.items[self.front]
        self.items[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.length -= 1
        return value

    def peek(self):
        if self.is_empty():
            raise IndexError('Queue is empty')
        return self.items[self.front]

    def is_empty(self):
        return self.length == 0

    def is_full(self):
        return self.length == self.capacity

    def size(self):
        return self.length


class PriorityQueue:
    def __init__(self, compare_fn=None):
        self.items = []
        if compare_fn is None:
            self.compare = lambda a, b: a[1] - b[1]  # Compare by priority
        else:
            self.compare = compare_fn

    def enqueue(self, value, priority=0):
        """Enqueue with priority - O(n) for insertion sort"""
        element = (value, priority)
        
        if self.is_empty():
            self.items.append(element)
        else:
            added = False
            for i in range(len(self.items)):
                if self.compare(element, self.items[i]) < 0:
                    self.items.insert(i, element)
                    added = True
                    break
            if not added:
                self.items.append(element)
        return self

    def dequeue(self):
        """Dequeue - O(1)"""
        if self.is_empty():
            raise IndexError('Priority queue is empty')
        return self.items.pop(0)[0]

    def peek(self):
        """Peek - O(1)"""
        if self.is_empty():
            raise IndexError('Priority queue is empty')
        return self.items[0][0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

    def to_list(self):
        return [item[0] for item in self.items]


class Deque:
    def __init__(self):
        self.items = deque()

    def add_front(self, value):
        """Add to front - O(1)"""
        self.items.appendleft(value)
        return self

    def add_rear(self, value):
        """Add to rear - O(1)"""
        self.items.append(value)
        return self

    def remove_front(self):
        """Remove from front - O(1)"""
        if self.is_empty():
            raise IndexError('Deque is empty')
        return self.items.popleft()

    def remove_rear(self):
        """Remove from rear - O(1)"""
        if self.is_empty():
            raise IndexError('Deque is empty')
        return self.items.pop()

    def peek_front(self):
        """Peek front - O(1)"""
        if self.is_empty():
            raise IndexError('Deque is empty')
        return self.items[0]

    def peek_rear(self):
        """Peek rear - O(1)"""
        if self.is_empty():
            raise IndexError('Deque is empty')
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

    def to_list(self):
        return list(self.items)


# Usage Example
if __name__ == "__main__":
    # Basic Queue
    queue = Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    print('Queue:', queue.to_list())  # [1, 2, 3]
    print('Peek:', queue.peek())  # 1
    print('Dequeue:', queue.dequeue())  # 1
    print('Queue after dequeue:', queue.to_list())  # [2, 3]

    # Priority Queue
    priority_queue = PriorityQueue()
    priority_queue.enqueue('Low priority', 3)
    priority_queue.enqueue('High priority', 1)
    priority_queue.enqueue('Medium priority', 2)
    print('Priority queue:', priority_queue.to_list())
    print('Dequeue:', priority_queue.dequeue())  # 'High priority'

    # Deque
    deque_obj = Deque()
    deque_obj.add_front(1)
    deque_obj.add_rear(2)
    deque_obj.add_front(0)
    print('Deque:', deque_obj.to_list())  # [0, 1, 2]
    print('Remove front:', deque_obj.remove_front())  # 0
    print('Remove rear:', deque_obj.remove_rear())  # 2

