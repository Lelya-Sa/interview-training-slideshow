/**
 * Queue Implementation in Java
 * FIFO (First In First Out) data structure
 * Time Complexity: O(1) for enqueue/dequeue
 */
import java.util.ArrayList;
import java.util.List;

public class Queue {
    private List<Integer> items;
    private int front;
    private int rear;

    public Queue() {
        this.items = new ArrayList<>();
        this.front = 0;
        this.rear = 0;
    }

    public Queue enqueue(int value) {
        items.add(value);
        rear++;
        return this;
    }

    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        int value = items.get(front);
        front++;
        return value;
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return items.get(front);
    }

    public boolean isEmpty() {
        return rear == front;
    }

    public int size() {
        return rear - front;
    }

    public void clear() {
        items.clear();
        front = 0;
        rear = 0;
    }

    public List<Integer> toList() {
        return new ArrayList<>(items.subList(front, rear));
    }

    // Usage Example
    public static void main(String[] args) {
        Queue queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        System.out.println("Queue size: " + queue.size());
        System.out.println("Peek: " + queue.peek());
        System.out.println("Dequeue: " + queue.dequeue());
        System.out.println("Queue size after dequeue: " + queue.size());
    }
}

