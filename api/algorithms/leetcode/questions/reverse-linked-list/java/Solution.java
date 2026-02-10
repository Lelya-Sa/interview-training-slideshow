/**
 * Reverse Linked List - LeetCode 206
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

// Definition for singly-linked list
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class Solution {
    /**
     * Iterative Approach
     * Time: O(n)
     * Space: O(1)
     */
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;  // Store next node
            current.next = prev;           // Reverse link
            prev = current;                // Move prev forward
            current = next;                // Move current forward
        }

        return prev; // prev is new head
    }

    /**
     * Recursive Approach
     * Time: O(n)
     * Space: O(n) due to recursion stack
     */
    public ListNode reverseListRecursive(ListNode head) {
        // Base case
        if (head == null || head.next == null) {
            return head;
        }

        // Recursively reverse rest of list
        ListNode reversed = reverseListRecursive(head.next);

        // Reverse current node's link
        head.next.next = head;
        head.next = null;

        return reversed;
    }

    // Helper function to create linked list from array
    public ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    // Helper function to convert linked list to array
    public int[] listToArray(ListNode head) {
        java.util.List<Integer> result = new java.util.ArrayList<>();
        ListNode current = head;
        while (current != null) {
            result.add(current.val);
            current = current.next;
        }
        return result.stream().mapToInt(i -> i).toArray();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        ListNode test1 = solution.createList(new int[]{1, 2, 3, 4, 5});
        System.out.println("Input: [1,2,3,4,5]");
        System.out.println("Output: " + java.util.Arrays.toString(solution.listToArray(solution.reverseList(test1))));
        System.out.println("Expected: [5,4,3,2,1]\n");

        ListNode test2 = solution.createList(new int[]{1, 2});
        System.out.println("Input: [1,2]");
        System.out.println("Output: " + java.util.Arrays.toString(solution.listToArray(solution.reverseList(test2))));
        System.out.println("Expected: [2,1]\n");

        ListNode test3 = solution.createList(new int[]{});
        System.out.println("Input: []");
        System.out.println("Output: " + java.util.Arrays.toString(solution.listToArray(solution.reverseList(test3))));
        System.out.println("Expected: []\n");
    }
}

