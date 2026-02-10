/**
 * Heap Implementation in Java
 * Complete binary tree with heap property
 * Time Complexity: O(log n) for insert/extract
 */
import java.util.ArrayList;
import java.util.List;

public class Heap {
    private List<Integer> heap;
    private boolean isMinHeap;

    public Heap(boolean isMinHeap) {
        this.heap = new ArrayList<>();
        this.isMinHeap = isMinHeap;
    }

    public Heap() {
        this(true); // Default to min heap
    }

    private int parent(int index) {
        return (index - 1) / 2;
    }

    private int leftChild(int index) {
        return 2 * index + 1;
    }

    private int rightChild(int index) {
        return 2 * index + 2;
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public Heap insert(int value) {
        heap.add(value);
        heapifyUp();
        return this;
    }

    private void heapifyUp() {
        int index = heap.size() - 1;

        while (index > 0) {
            int parentIndex = parent(index);
            
            if (isMinHeap) {
                if (heap.get(parentIndex) <= heap.get(index)) {
                    break;
                }
            } else {
                if (heap.get(parentIndex) >= heap.get(index)) {
                    break;
                }
            }

            swap(parentIndex, index);
            index = parentIndex;
        }
    }

    public int extract() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        if (heap.size() == 1) {
            return heap.remove(0);
        }

        int value = heap.get(0);
        heap.set(0, heap.remove(heap.size() - 1));
        heapifyDown();

        return value;
    }

    private void heapifyDown() {
        int index = 0;

        while (leftChild(index) < heap.size()) {
            int childIndex = leftChild(index);

            if (rightChild(index) < heap.size()) {
                if (isMinHeap) {
                    if (heap.get(rightChild(index)) < heap.get(childIndex)) {
                        childIndex = rightChild(index);
                    }
                } else {
                    if (heap.get(rightChild(index)) > heap.get(childIndex)) {
                        childIndex = rightChild(index);
                    }
                }
            }

            if (isMinHeap) {
                if (heap.get(index) <= heap.get(childIndex)) {
                    break;
                }
            } else {
                if (heap.get(index) >= heap.get(childIndex)) {
                    break;
                }
            }

            swap(index, childIndex);
            index = childIndex;
        }
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        return heap.get(0);
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public int size() {
        return heap.size();
    }

    public List<Integer> toList() {
        return new ArrayList<>(heap);
    }

    // Usage Example
    public static void main(String[] args) {
        Heap minHeap = new Heap(true);
        minHeap.insert(10);
        minHeap.insert(5);
        minHeap.insert(15);
        minHeap.insert(3);
        minHeap.insert(7);

        System.out.println("Min heap: " + minHeap.toList());
        System.out.println("Peek: " + minHeap.peek());
        System.out.println("Extract: " + minHeap.extract());
        System.out.println("After extract: " + minHeap.toList());

        Heap maxHeap = new Heap(false);
        maxHeap.insert(10);
        maxHeap.insert(5);
        maxHeap.insert(15);
        System.out.println("Max heap: " + maxHeap.toList());
    }
}

