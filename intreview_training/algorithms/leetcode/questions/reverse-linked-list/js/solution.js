/**
 * Reverse Linked List - LeetCode 206
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

// Definition for singly-linked list
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Iterative Approach
 * Time: O(n)
 * Space: O(1)
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;  // Store next node
    current.next = prev;       // Reverse link
    prev = current;            // Move prev forward
    current = next;            // Move current forward
  }

  return prev; // prev is new head
}

/**
 * Recursive Approach
 * Time: O(n)
 * Space: O(n) due to recursion stack
 */
function reverseListRecursive(head) {
  // Base case
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse rest of list
  const reversed = reverseListRecursive(head.next);

  // Reverse current node's link
  head.next.next = head;
  head.next = null;

  return reversed;
}

// Helper function to create linked list from array
function createList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert linked list to array
function listToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test cases
console.log('=== Test Cases ===');
const test1 = createList([1, 2, 3, 4, 5]);
console.log('Input: [1,2,3,4,5]');
console.log('Output:', listToArray(reverseList(test1)));
console.log('Expected: [5,4,3,2,1]\n');

const test2 = createList([1, 2]);
console.log('Input: [1,2]');
console.log('Output:', listToArray(reverseList(test2)));
console.log('Expected: [2,1]\n');

const test3 = createList([]);
console.log('Input: []');
console.log('Output:', listToArray(reverseList(test3)));
console.log('Expected: []\n');

module.exports = { reverseList, reverseListRecursive, ListNode };

