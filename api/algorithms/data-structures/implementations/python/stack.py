"""
Stack Implementation in Python
LIFO (Last In First Out) data structure
Time Complexity: O(1) for all operations
"""

class Stack:
    def __init__(self):
        self.items = []
        self.length = 0

    def push(self, value):
        """Push element onto stack - O(1)"""
        self.items.append(value)
        self.length += 1
        return self

    def pop(self):
        """Pop element from stack - O(1)"""
        if self.is_empty():
            raise IndexError('Stack is empty')
        self.length -= 1
        return self.items.pop()

    def peek(self):
        """Peek at top element - O(1)"""
        if self.is_empty():
            raise IndexError('Stack is empty')
        return self.items[self.length - 1]

    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return self.length == 0

    def size(self):
        """Get stack size - O(1)"""
        return self.length

    def clear(self):
        """Clear stack - O(1)"""
        self.items = []
        self.length = 0

    def to_list(self):
        """Convert to list - O(n)"""
        return self.items.copy()

    def search(self, value):
        """Search for value - O(n)"""
        try:
            index = len(self.items) - 1 - self.items[::-1].index(value)
            return self.length - index
        except ValueError:
            return -1


def is_valid_parentheses(s):
    """Valid Parentheses using Stack"""
    stack = Stack()
    pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    }

    for char in s:
        if char in pairs:
            stack.push(char)
        else:
            if stack.is_empty() or pairs[stack.pop()] != char:
                return False

    return stack.is_empty()


def reverse_string(s):
    """Reverse string using stack"""
    stack = Stack()
    for char in s:
        stack.push(char)
    
    reversed_str = ''
    while not stack.is_empty():
        reversed_str += stack.pop()
    return reversed_str


# Usage Example
if __name__ == "__main__":
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print('Stack:', stack.to_list())  # [1, 2, 3]
    print('Peek:', stack.peek())  # 3
    print('Pop:', stack.pop())  # 3
    print('Stack after pop:', stack.to_list())  # [1, 2]

    print('Valid parentheses "()[]{}":', is_valid_parentheses('()[]{}'))  # True
    print('Valid parentheses "([)]":', is_valid_parentheses('([)]'))  # False
    print('Reverse "hello":', reverse_string('hello'))  # "olleh"

