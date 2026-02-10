/**
 * Stack Implementation in Java
 * LIFO (Last In First Out) data structure
 * Time Complexity: O(1) for all operations
 */
import java.util.ArrayList;
import java.util.List;

public class Stack {
    private List<Integer> items;
    private int length;

    public Stack() {
        this.items = new ArrayList<>();
        this.length = 0;
    }

    public Stack push(int value) {
        items.add(value);
        length++;
        return this;
    }

    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        length--;
        return items.remove(length);
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return items.get(length - 1);
    }

    public boolean isEmpty() {
        return length == 0;
    }

    public int size() {
        return length;
    }

    public void clear() {
        items.clear();
        length = 0;
    }

    public List<Integer> toList() {
        return new ArrayList<>(items);
    }

    public int search(int value) {
        int index = items.lastIndexOf(value);
        return index == -1 ? -1 : length - index;
    }

    // Usage Example
    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println("Stack size: " + stack.size());
        System.out.println("Peek: " + stack.peek());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Stack size after pop: " + stack.size());
    }
}

