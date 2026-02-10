"""
Linked List Implementation in Python
Nodes connected by pointers
Time Complexity:
- Access: O(n)
- Search: O(n)
- Insert/Delete: O(1) if position known
"""

class ListNode:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def prepend(self, value):
        """Insert at beginning - O(1)"""
        new_node = ListNode(value, self.head)
        self.head = new_node
        self.length += 1
        return self

    def append(self, value):
        """Insert at end - O(n)"""
        new_node = ListNode(value)
        
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        
        self.length += 1
        return self

    def insert_at(self, index, value):
        """Insert at specific index - O(n)"""
        if index < 0 or index > self.length:
            raise IndexError('Index out of bounds')

        if index == 0:
            return self.prepend(value)

        new_node = ListNode(value)
        current = self.head
        
        for i in range(index - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.length += 1
        
        return self

    def delete_first(self):
        """Delete at beginning - O(1)"""
        if not self.head:
            raise ValueError('List is empty')
        
        value = self.head.value
        self.head = self.head.next
        self.length -= 1
        
        return value

    def delete_last(self):
        """Delete at end - O(n)"""
        if not self.head:
            raise ValueError('List is empty')

        if not self.head.next:
            value = self.head.value
            self.head = None
            self.length -= 1
            return value

        current = self.head
        while current.next.next:
            current = current.next
        
        value = current.next.value
        current.next = None
        self.length -= 1
        
        return value

    def delete_at(self, index):
        """Delete at specific index - O(n)"""
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')

        if index == 0:
            return self.delete_first()

        current = self.head
        for i in range(index - 1):
            current = current.next

        value = current.next.value
        current.next = current.next.next
        self.length -= 1
        
        return value

    def delete_value(self, value):
        """Delete by value - O(n)"""
        if not self.head:
            raise ValueError('List is empty')

        if self.head.value == value:
            return self.delete_first()

        current = self.head
        while current.next and current.next.value != value:
            current = current.next

        if current.next:
            current.next = current.next.next
            self.length -= 1
            return value

        raise ValueError('Value not found')

    def get(self, index):
        """Get value at index - O(n)"""
        if index < 0 or index >= self.length:
            raise IndexError('Index out of bounds')

        current = self.head
        for i in range(index):
            current = current.next

        return current.value

    def index_of(self, value):
        """Find index of value - O(n)"""
        current = self.head
        index = 0

        while current:
            if current.value == value:
                return index
            current = current.next
            index += 1

        return -1

    def contains(self, value):
        """Check if contains value - O(n)"""
        return self.index_of(value) != -1

    def reverse(self):
        """Reverse linked list - O(n)"""
        prev = None
        current = self.head

        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node

        self.head = prev
        return self

    def to_list(self):
        """Convert to list - O(n)"""
        result = []
        current = self.head
        
        while current:
            result.append(current.value)
            current = current.next
        
        return result

    def size(self):
        """Get size - O(1)"""
        return self.length

    def is_empty(self):
        """Check if empty - O(1)"""
        return self.length == 0

    def clear(self):
        """Clear list - O(1)"""
        self.head = None
        self.length = 0

    def find_middle(self):
        """Find middle node - O(n)"""
        if not self.head:
            return None

        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow.value

    def has_cycle(self):
        """Detect cycle - O(n)"""
        if not self.head:
            return False

        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
            if slow == fast:
                return True

        return False

    def traverse_forward(self, callback):
        """Traverse forward (iterative) - O(n)"""
        current = self.head
        index = 0
        
        while current:
            callback(current.value, index, current)
            current = current.next
            index += 1

    def traverse_forward_recursive(self, callback, node=None, index=0):
        """Traverse forward (recursive) - O(n)"""
        if node is None:
            node = self.head
        
        if not node:
            return
        
        callback(node.value, index, node)
        self.traverse_forward_recursive(callback, node.next, index + 1)


# Usage Example
if __name__ == "__main__":
    list = LinkedList()
    list.append(1)
    list.append(2)
    list.append(3)
    list.append(4)
    list.prepend(0)
    print('List:', list.to_list())  # [0, 1, 2, 3, 4]
    print('Get index 2:', list.get(2))  # 2
    list.insert_at(2, 10)
    print('After insert:', list.to_list())  # [0, 1, 10, 2, 3, 4]
    list.delete_at(2)
    print('After delete:', list.to_list())  # [0, 1, 2, 3, 4]
    print('Index of 3:', list.index_of(3))  # 3
    list.reverse()
    print('Reversed:', list.to_list())  # [4, 3, 2, 1, 0]
    print('Middle:', list.find_middle())  # 2

