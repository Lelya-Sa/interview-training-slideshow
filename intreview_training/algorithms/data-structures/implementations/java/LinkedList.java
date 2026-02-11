/**
 * Linked List Implementation in Java
 * Nodes connected by pointers
 * Time Complexity:
 * - Access: O(n)
 * - Search: O(n)
 * - Insert/Delete: O(1) if position known
 */
public class LinkedList {
    private ListNode head;
    private int length;

    public LinkedList() {
        this.head = null;
        this.length = 0;
    }

    private static class ListNode {
        int value;
        ListNode next;

        ListNode(int value) {
            this.value = value;
            this.next = null;
        }
    }

    public LinkedList prepend(int value) {
        ListNode newNode = new ListNode(value);
        newNode.next = head;
        head = newNode;
        length++;
        return this;
    }

    public LinkedList append(int value) {
        ListNode newNode = new ListNode(value);
        
        if (head == null) {
            head = newNode;
        } else {
            ListNode current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        length++;
        return this;
    }

    public LinkedList insertAt(int index, int value) {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }

        if (index == 0) {
            return prepend(value);
        }

        ListNode newNode = new ListNode(value);
        ListNode current = head;
        
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        length++;
        
        return this;
    }

    public int deleteFirst() {
        if (head == null) {
            throw new IllegalStateException("List is empty");
        }
        
        int value = head.value;
        head = head.next;
        length--;
        
        return value;
    }

    public int deleteLast() {
        if (head == null) {
            throw new IllegalStateException("List is empty");
        }

        if (head.next == null) {
            int value = head.value;
            head = null;
            length--;
            return value;
        }

        ListNode current = head;
        while (current.next.next != null) {
            current = current.next;
        }
        
        int value = current.next.value;
        current.next = null;
        length--;
        
        return value;
    }

    public int deleteAt(int index) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }

        if (index == 0) {
            return deleteFirst();
        }

        ListNode current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }

        int value = current.next.value;
        current.next = current.next.next;
        length--;
        
        return value;
    }

    public int get(int index) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }

        ListNode current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }

        return current.value;
    }

    public int indexOf(int value) {
        ListNode current = head;
        int index = 0;

        while (current != null) {
            if (current.value == value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    public boolean contains(int value) {
        return indexOf(value) != -1;
    }

    public LinkedList reverse() {
        ListNode prev = null;
        ListNode current = head;
        ListNode next = null;

        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        head = prev;
        return this;
    }

    public int[] toArray() {
        int[] result = new int[length];
        ListNode current = head;
        int index = 0;
        
        while (current != null) {
            result[index++] = current.value;
            current = current.next;
        }
        
        return result;
    }

    public int size() {
        return length;
    }

    public boolean isEmpty() {
        return length == 0;
    }

    public void clear() {
        head = null;
        length = 0;
    }

    public int findMiddle() {
        if (head == null) {
            return -1;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow.value;
    }

    public boolean hasCycle() {
        if (head == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                return true;
            }
        }

        return false;
    }

    // Usage Example
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.append(1);
        list.append(2);
        list.append(3);
        list.append(4);
        list.prepend(0);
        System.out.println("List size: " + list.size());
        System.out.println("Get index 2: " + list.get(2));
        list.insertAt(2, 10);
        System.out.println("After insert, size: " + list.size());
        list.deleteAt(2);
        System.out.println("After delete, size: " + list.size());
        System.out.println("Index of 3: " + list.indexOf(3));
        list.reverse();
        System.out.println("Reversed list size: " + list.size());
        System.out.println("Middle: " + list.findMiddle());
    }
}

