"""
Array Implementation in Python
Arrays are contiguous memory locations storing elements
Time Complexity:
- Access: O(1)
- Search: O(n)
- Insert/Delete: O(n)
"""

class CustomArray:
    def __init__(self, initial_capacity=10):
        self.data = [None] * initial_capacity
        self.length = 0
        self.capacity = initial_capacity

    def get(self, index):
        """Access element by index - O(1)"""
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        return self.data[index]

    def set(self, index, value):
        """Set element at index - O(1)"""
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        self.data[index] = value

    def push(self, value):
        """Insert at end - O(1) amortized"""
        if self.length >= self.capacity:
            self._resize()
        self.data[self.length] = value
        self.length += 1
        return self.length

    def pop(self):
        """Remove from end - O(1)"""
        if self.length == 0:
            raise IndexError('Array is empty')
        value = self.data[self.length - 1]
        self.data[self.length - 1] = None
        self.length -= 1
        return value

    def unshift(self, value):
        """Insert at beginning - O(n)"""
        if self.length >= self.capacity:
            self._resize()
        # Shift all elements to the right
        for i in range(self.length, 0, -1):
            self.data[i] = self.data[i - 1]
        self.data[0] = value
        self.length += 1
        return self.length

    def shift(self):
        """Remove from beginning - O(n)"""
        if self.length == 0:
            raise IndexError('Array is empty')
        value = self.data[0]
        # Shift all elements to the left
        for i in range(self.length - 1):
            self.data[i] = self.data[i + 1]
        self.data[self.length - 1] = None
        self.length -= 1
        return value

    def insert(self, index, value):
        """Insert at specific index - O(n)"""
        if index < 0 or index > self.length:
            raise IndexError('Index out of bounds')
        if self.length >= self.capacity:
            self._resize()
        # Shift elements to the right
        for i in range(self.length, index, -1):
            self.data[i] = self.data[i - 1]
        self.data[index] = value
        self.length += 1
        return self.length

    def delete(self, index):
        """Delete at specific index - O(n)"""
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')
        value = self.data[index]
        # Shift elements to the left
        for i in range(index, self.length - 1):
            self.data[i] = self.data[i + 1]
        self.data[self.length - 1] = None
        self.length -= 1
        return value

    def index_of(self, value):
        """Search for value - O(n)"""
        for i in range(self.length):
            if self.data[i] == value:
                return i
        return -1

    def contains(self, value):
        """Check if contains value - O(n)"""
        return self.index_of(value) != -1

    def reverse(self):
        """Reverse array - O(n)"""
        left = 0
        right = self.length - 1
        while left < right:
            self.data[left], self.data[right] = self.data[right], self.data[left]
            left += 1
            right -= 1

    def _resize(self):
        """Resize array when capacity is reached"""
        new_capacity = self.capacity * 2
        new_data = [None] * new_capacity
        for i in range(self.length):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def to_list(self):
        """Convert to regular list"""
        return [self.data[i] for i in range(self.length)]

    def size(self):
        """Get size"""
        return self.length

    def is_empty(self):
        """Check if empty"""
        return self.length == 0

    def clear(self):
        """Clear array"""
        self.data = [None] * self.capacity
        self.length = 0


# Usage Example
if __name__ == "__main__":
    arr = CustomArray(5)
    arr.push(1)
    arr.push(2)
    arr.push(3)
    arr.push(4)
    arr.push(5)
    print('Array:', arr.to_list())  # [1, 2, 3, 4, 5]
    print('Get index 2:', arr.get(2))  # 3
    arr.insert(2, 10)
    print('After insert:', arr.to_list())  # [1, 2, 10, 3, 4, 5]
    arr.delete(2)
    print('After delete:', arr.to_list())  # [1, 2, 3, 4, 5]
    print('Index of 3:', arr.index_of(3))  # 2
    arr.reverse()
    print('Reversed:', arr.to_list())  # [5, 4, 3, 2, 1]

