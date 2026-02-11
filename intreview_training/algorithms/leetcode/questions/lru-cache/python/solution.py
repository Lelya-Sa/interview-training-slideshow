"""
LRU Cache - LeetCode 146

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
"""


# Doubly Linked List Node
class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> node
        # Use dummy nodes (sentinel nodes) to simplify operations:
        # - Eliminates null checks (head and tail always exist)
        # - Same logic for all nodes (no special cases for first/last)
        # - Prevents edge cases when list is empty
        self.head = Node(0, 0)  # dummy head
        self.tail = Node(0, 0)  # dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head

    # Add node right after head (most recent)
    def _add_node(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    # Remove node from list
    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    # Move node to head (mark as most recently used)
    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_node(node)

    # Remove tail node (least recently used)
    def _pop_tail(self):
        # Note: self.tail is a dummy node, so the actual last node is self.tail.prev
        last_node = self.tail.prev
        self._remove_node(last_node)
        return last_node

    def get(self, key: int) -> int:
        """
        Get value by key
        Time: O(1)
        """
        node = self.cache.get(key)
        if not node:
            return -1

        # Move to head (most recently used)
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        """
        Put key-value pair
        Time: O(1)
        """
        node = self.cache.get(key)

        if not node:
            # New node
            new_node = Node(key, value)

            # Add to head
            self._add_node(new_node)
            self.cache[key] = new_node

            # If capacity exceeded, remove tail
            if len(self.cache) > self.capacity:
                tail = self._pop_tail()
                del self.cache[tail.key]
        else:
            # Update existing node
            node.val = value
            self._move_to_head(node)


# Test cases
if __name__ == "__main__":
    print("=== Test Case 1: Capacity 2 ===")
    lru1 = LRUCache(2)
    lru1.put(1, 1)
    lru1.put(2, 2)
    print(f"get(1): {lru1.get(1)}")  # returns 1
    lru1.put(3, 3)  # evicts key 2
    print(f"get(2): {lru1.get(2)}")  # returns -1 (not found)
    lru1.put(4, 4)  # evicts key 1
    print(f"get(1): {lru1.get(1)}")  # returns -1 (not found)
    print(f"get(3): {lru1.get(3)}")  # returns 3
    print(f"get(4): {lru1.get(4)}")  # returns 4

    print("\n=== Test Case 2: Capacity 3 ===")
    lru2 = LRUCache(3)
    lru2.put(1, 1)
    lru2.put(2, 2)
    lru2.put(3, 3)
    print(f"get(1): {lru2.get(1)}")  # returns 1
    lru2.put(4, 4)  # evicts key 2
    print(f"get(2): {lru2.get(2)}")  # returns -1 (not found)
    print(f"get(3): {lru2.get(3)}")  # returns 3
    print(f"get(1): {lru2.get(1)}")  # returns 1
    print(f"get(4): {lru2.get(4)}")  # returns 4

    print("\n=== Test Case 3: Capacity 1 ===")
    lru3 = LRUCache(1)
    lru3.put(1, 1)
    lru3.put(2, 2)  # evicts key 1
    print(f"get(1): {lru3.get(1)}")  # returns -1 (not found)
    print(f"get(2): {lru3.get(2)}")  # returns 2

