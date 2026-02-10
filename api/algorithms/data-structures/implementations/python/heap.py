"""
Heap Implementation in Python
Complete binary tree with heap property
Time Complexity: O(log n) for insert/extract
"""

class MinHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, index):
        return (index - 1) // 2

    def _left_child(self, index):
        return 2 * index + 1

    def _right_child(self, index):
        return 2 * index + 2

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def insert(self, value):
        """Insert value - O(log n)"""
        self.heap.append(value)
        self._heapify_up()
        return self

    def _heapify_up(self):
        index = len(self.heap) - 1

        while index > 0:
            parent_index = self._parent(index)
            
            if self.heap[parent_index] <= self.heap[index]:
                break

            self._swap(parent_index, index)
            index = parent_index

    def extract_min(self):
        """Extract minimum - O(log n)"""
        if self.is_empty():
            raise IndexError('Heap is empty')

        if len(self.heap) == 1:
            return self.heap.pop()

        min_value = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down()

        return min_value

    def _heapify_down(self):
        index = 0

        while self._left_child(index) < len(self.heap):
            smaller_child_index = self._left_child(index)

            if (self._right_child(index) < len(self.heap) and
                self.heap[self._right_child(index)] < self.heap[smaller_child_index]):
                smaller_child_index = self._right_child(index)

            if self.heap[index] <= self.heap[smaller_child_index]:
                break

            self._swap(index, smaller_child_index)
            index = smaller_child_index

    def peek(self):
        """Peek at minimum - O(1)"""
        if self.is_empty():
            raise IndexError('Heap is empty')
        return self.heap[0]

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

    def build_heap(self, array):
        """Build heap from array - O(n)"""
        self.heap = array.copy()
        
        # Start from last non-leaf node
        for i in range(len(self.heap) // 2 - 1, -1, -1):
            self._heapify_down_from_index(i)
        
        return self

    def _heapify_down_from_index(self, index):
        while self._left_child(index) < len(self.heap):
            smaller_child_index = self._left_child(index)

            if (self._right_child(index) < len(self.heap) and
                self.heap[self._right_child(index)] < self.heap[smaller_child_index]):
                smaller_child_index = self._right_child(index)

            if self.heap[index] <= self.heap[smaller_child_index]:
                break

            self._swap(index, smaller_child_index)
            index = smaller_child_index

    def to_list(self):
        return self.heap.copy()


class MaxHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, index):
        return (index - 1) // 2

    def _left_child(self, index):
        return 2 * index + 1

    def _right_child(self, index):
        return 2 * index + 2

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def insert(self, value):
        self.heap.append(value)
        self._heapify_up()
        return self

    def _heapify_up(self):
        index = len(self.heap) - 1

        while index > 0:
            parent_index = self._parent(index)
            
            if self.heap[parent_index] >= self.heap[index]:
                break

            self._swap(parent_index, index)
            index = parent_index

    def extract_max(self):
        if self.is_empty():
            raise IndexError('Heap is empty')

        if len(self.heap) == 1:
            return self.heap.pop()

        max_value = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down()

        return max_value

    def _heapify_down(self):
        index = 0

        while self._left_child(index) < len(self.heap):
            larger_child_index = self._left_child(index)

            if (self._right_child(index) < len(self.heap) and
                self.heap[self._right_child(index)] > self.heap[larger_child_index]):
                larger_child_index = self._right_child(index)

            if self.heap[index] >= self.heap[larger_child_index]:
                break

            self._swap(index, larger_child_index)
            index = larger_child_index

    def peek(self):
        if self.is_empty():
            raise IndexError('Heap is empty')
        return self.heap[0]

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

    def to_list(self):
        return self.heap.copy()


# Usage Example
if __name__ == "__main__":
    # Min Heap
    min_heap = MinHeap()
    min_heap.insert(10)
    min_heap.insert(5)
    min_heap.insert(15)
    min_heap.insert(3)
    min_heap.insert(7)

    print('Min heap:', min_heap.to_list())
    print('Peek:', min_heap.peek())
    print('Extract min:', min_heap.extract_min())
    print('After extract:', min_heap.to_list())

    # Max Heap
    max_heap = MaxHeap()
    max_heap.insert(10)
    max_heap.insert(5)
    max_heap.insert(15)
    max_heap.insert(3)
    max_heap.insert(7)

    print('Max heap:', max_heap.to_list())
    print('Peek:', max_heap.peek())
    print('Extract max:', max_heap.extract_max())
    print('After extract:', max_heap.to_list())

