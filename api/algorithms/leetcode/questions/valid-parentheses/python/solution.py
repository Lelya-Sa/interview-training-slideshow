"""
Valid Parentheses - LeetCode 20

Check if parentheses are valid.
"""

def is_valid(s):
    """
    Solution using Stack
    Time: O(n)
    Space: O(n)
    """
    stack = []
    pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    
    for char in s:
        if char in pairs:
            # Opening bracket
            stack.append(char)
        else:
            # Closing bracket
            if not stack:
                return False
            last = stack.pop()
            if pairs[last] != char:
                return False
    
    return len(stack) == 0


# Usage Examples
if __name__ == "__main__":
    print('Valid "()":', is_valid('()'))  # True
    print('Valid "()[]{}":', is_valid('()[]{}'))  # True
    print('Valid "(]":', is_valid('(]'))  # False
    print('Valid "([)]":', is_valid('([)]'))  # False

