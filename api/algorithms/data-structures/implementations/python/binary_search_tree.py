"""
Binary Search Tree Implementation in Python
Binary tree with ordering property: left < node < right
Time Complexity: O(log n) average, O(n) worst
"""

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None
        self.size = 0

    def insert(self, value):
        """Insert value - O(log n) average"""
        new_node = TreeNode(value)
        
        if not self.root:
            self.root = new_node
            self.size += 1
            return self

        current = self.root
        while True:
            if value < current.value:
                if not current.left:
                    current.left = new_node
                    self.size += 1
                    return self
                current = current.left
            elif value > current.value:
                if not current.right:
                    current.right = new_node
                    self.size += 1
                    return self
                current = current.right
            else:
                # Value already exists
                return self

    def search(self, value):
        """Search for value - O(log n) average"""
        current = self.root

        while current:
            if value == current.value:
                return current
            elif value < current.value:
                current = current.left
            else:
                current = current.right

        return None

    def contains(self, value):
        """Check if contains value - O(log n) average"""
        return self.search(value) is not None

    def delete(self, value):
        """Delete value - O(log n) average"""
        self.root = self._delete_node(self.root, value)
        return self

    def _delete_node(self, node, value):
        if not node:
            return None

        if value < node.value:
            node.left = self._delete_node(node.left, value)
        elif value > node.value:
            node.right = self._delete_node(node.right, value)
        else:
            # Node to delete found
            self.size -= 1

            # Case 1: No children
            if not node.left and not node.right:
                return None

            # Case 2: One child
            if not node.left:
                return node.right
            if not node.right:
                return node.left

            # Case 3: Two children
            # Find in-order successor (smallest in right subtree)
            successor = self._find_min(node.right)
            node.value = successor.value
            node.right = self._delete_node(node.right, successor.value)

        return node

    def find_min(self, node=None):
        """Find minimum value - O(log n)"""
        if node is None:
            node = self.root
        if not node:
            return None
        while node.left:
            node = node.left
        return node

    def _find_min(self, node):
        while node.left:
            node = node.left
        return node

    def find_max(self, node=None):
        """Find maximum value - O(log n)"""
        if node is None:
            node = self.root
        if not node:
            return None
        while node.right:
            node = node.right
        return node

    def in_order(self, node=None, result=None):
        """In-order traversal (Left, Root, Right) - O(n)"""
        if node is None:
            node = self.root
        if result is None:
            result = []
        if node:
            self.in_order(node.left, result)
            result.append(node.value)
            self.in_order(node.right, result)
        return result

    def pre_order(self, node=None, result=None):
        """Pre-order traversal (Root, Left, Right) - O(n)"""
        if node is None:
            node = self.root
        if result is None:
            result = []
        if node:
            result.append(node.value)
            self.pre_order(node.left, result)
            self.pre_order(node.right, result)
        return result

    def post_order(self, node=None, result=None):
        """Post-order traversal (Left, Right, Root) - O(n)"""
        if node is None:
            node = self.root
        if result is None:
            result = []
        if node:
            self.post_order(node.left, result)
            self.post_order(node.right, result)
            result.append(node.value)
        return result

    def level_order(self):
        """Level-order traversal (BFS) - O(n)"""
        if not self.root:
            return []

        result = []
        queue = [self.root]

        while queue:
            node = queue.pop(0)
            result.append(node.value)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        return result

    def in_order_traverse(self, callback, node=None):
        """In-order traversal with callback - O(n)"""
        if node is None:
            node = self.root
        if node:
            self.in_order_traverse(callback, node.left)
            callback(node.value, node)
            self.in_order_traverse(callback, node.right)

    def height(self, node=None):
        """Get height of tree - O(n)"""
        if node is None:
            node = self.root
        if not node:
            return -1

        left_height = self.height(node.left)
        right_height = self.height(node.right)

        return max(left_height, right_height) + 1

    def get_size(self):
        """Get size - O(1)"""
        return self.size

    def is_empty(self):
        """Check if empty - O(1)"""
        return self.size == 0

    def clear(self):
        """Clear tree - O(1)"""
        self.root = None
        self.size = 0


# Usage Example
if __name__ == "__main__":
    bst = BinarySearchTree()

    bst.insert(50)
    bst.insert(30)
    bst.insert(70)
    bst.insert(20)
    bst.insert(40)
    bst.insert(60)
    bst.insert(80)

    print('In-order:', bst.in_order())
    print('Pre-order:', bst.pre_order())
    print('Post-order:', bst.post_order())
    print('Level-order:', bst.level_order())

    print('Search 40:', bst.search(40).value if bst.search(40) else None)
    print('Contains 100:', bst.contains(100))
    print('Min:', bst.find_min().value if bst.find_min() else None)
    print('Max:', bst.find_max().value if bst.find_max() else None)
    print('Height:', bst.height())

    bst.delete(30)
    print('After delete 30:', bst.in_order())

