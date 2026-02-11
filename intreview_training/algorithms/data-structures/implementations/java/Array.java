/**
 * Array Implementation in Java
 * Arrays are contiguous memory locations storing elements
 * Time Complexity:
 * - Access: O(1)
 * - Search: O(n)
 * - Insert/Delete: O(n)
 */
public class Array {
    private int[] data;
    private int length;
    private int capacity;

    public Array(int initialCapacity) {
        this.capacity = initialCapacity;
        this.data = new int[capacity];
        this.length = 0;
    }

    public Array() {
        this(10);
    }

    public int get(int index) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        return data[index];
    }

    public void set(int index, int value) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        data[index] = value;
    }

    public int push(int value) {
        if (length >= capacity) {
            resize();
        }
        data[length] = value;
        length++;
        return length;
    }

    public int pop() {
        if (length == 0) {
            throw new IllegalStateException("Array is empty");
        }
        int value = data[length - 1];
        data[length - 1] = 0;
        length--;
        return value;
    }

    public int unshift(int value) {
        if (length >= capacity) {
            resize();
        }
        // Shift all elements to the right
        for (int i = length; i > 0; i--) {
            data[i] = data[i - 1];
        }
        data[0] = value;
        length++;
        return length;
    }

    public int shift() {
        if (length == 0) {
            throw new IllegalStateException("Array is empty");
        }
        int value = data[0];
        // Shift all elements to the left
        for (int i = 0; i < length - 1; i++) {
            data[i] = data[i + 1];
        }
        data[length - 1] = 0;
        length--;
        return value;
    }

    public int insert(int index, int value) {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        if (length >= capacity) {
            resize();
        }
        // Shift elements to the right
        for (int i = length; i > index; i--) {
            data[i] = data[i - 1];
        }
        data[index] = value;
        length++;
        return length;
    }

    public int delete(int index) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        int value = data[index];
        // Shift elements to the left
        for (int i = index; i < length - 1; i++) {
            data[i] = data[i + 1];
        }
        data[length - 1] = 0;
        length--;
        return value;
    }

    public int indexOf(int value) {
        for (int i = 0; i < length; i++) {
            if (data[i] == value) {
                return i;
            }
        }
        return -1;
    }

    public boolean contains(int value) {
        return indexOf(value) != -1;
    }

    public void reverse() {
        int left = 0;
        int right = length - 1;
        while (left < right) {
            int temp = data[left];
            data[left] = data[right];
            data[right] = temp;
            left++;
            right--;
        }
    }

    private void resize() {
        int newCapacity = capacity * 2;
        int[] newData = new int[newCapacity];
        for (int i = 0; i < length; i++) {
            newData[i] = data[i];
        }
        data = newData;
        capacity = newCapacity;
    }

    public int[] toArray() {
        int[] result = new int[length];
        for (int i = 0; i < length; i++) {
            result[i] = data[i];
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
        data = new int[capacity];
        length = 0;
    }

    // Usage Example
    public static void main(String[] args) {
        Array arr = new Array(5);
        arr.push(1);
        arr.push(2);
        arr.push(3);
        arr.push(4);
        arr.push(5);
        System.out.println("Array size: " + arr.size());
        System.out.println("Get index 2: " + arr.get(2));
        arr.insert(2, 10);
        System.out.println("After insert, size: " + arr.size());
        arr.delete(2);
        System.out.println("After delete, size: " + arr.size());
        System.out.println("Index of 3: " + arr.indexOf(3));
        arr.reverse();
        System.out.println("Reversed array size: " + arr.size());
    }
}

