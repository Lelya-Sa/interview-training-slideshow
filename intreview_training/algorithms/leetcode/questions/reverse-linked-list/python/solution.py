"""
Reverse Linked List - LeetCode 206

Given the head of a singly linked list, reverse the list, and return the reversed list.
"""


# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverse_list(head):
    """
    Iterative Approach
    Time: O(n)
    Space: O(1)
    """
    prev = None
    current = head

    while current is not None:
        next_node = current.next  # Store next node
        current.next = prev       # Reverse link
        prev = current           # Move prev forward
        current = next_node      # Move current forward

    return prev  # prev is new head


def reverse_list_recursive(head):
    """
    Recursive Approach
    Time: O(n)
    Space: O(n) due to recursion stack
    """
    # Base case
    if head is None or head.next is None:
        return head

    # Recursively reverse rest of list
    reversed_head = reverse_list_recursive(head.next)

    # Reverse current node's link
    head.next.next = head
    head.next = None

    return reversed_head


# Helper function to create linked list from list
def create_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head


# Helper function to convert linked list to list
def list_to_array(head):
    result = []
    current = head
    while current is not None:
        result.append(current.val)
        current = current.next
    return result


# Test cases
if __name__ == "__main__":
    print("=== Test Cases ===")
    test1 = create_list([1, 2, 3, 4, 5])
    print("Input: [1,2,3,4,5]")
    print(f"Output: {list_to_array(reverse_list(test1))}")
    print("Expected: [5,4,3,2,1]\n")

    test2 = create_list([1, 2])
    print("Input: [1,2]")
    print(f"Output: {list_to_array(reverse_list(test2))}")
    print("Expected: [2,1]\n")

    test3 = create_list([])
    print("Input: []")
    print(f"Output: {list_to_array(reverse_list(test3))}")
    print("Expected: []\n")

