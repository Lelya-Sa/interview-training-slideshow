# Time Complexity - Interview Material

## Definition
Time complexity describes the amount of time an algorithm takes to run as a function of input size, using Big O notation.

## Big O Notation

### O(1) - Constant Time
- Accessing array element by index
- Hash table lookup
- Example: `arr[0]`, `map.get(key)`

### O(log n) - Logarithmic Time
- Binary search
- Balanced tree operations
- Example: Finding element in sorted array

### O(n) - Linear Time
- Iterating through array
- Finding max in array
- Example: `for (let i = 0; i < n; i++)`

### O(n log n) - Linearithmic Time
- Efficient sorting algorithms
- Merge sort, Quick sort (average)
- Example: Sorting array

### O(n²) - Quadratic Time
- Nested loops
- Bubble sort, Selection sort
- Example: `for (i) { for (j) { } }`

### O(n³) - Cubic Time
- Triple nested loops
- Example: Matrix multiplication (naive)

### O(2ⁿ) - Exponential Time
- Recursive Fibonacci (naive)
- Generating all subsets
- Example: `fib(n) = fib(n-1) + fib(n-2)`

### O(n!) - Factorial Time
- Generating all permutations
- Traveling salesman (brute force)
- Example: All permutations of array

## Space Complexity

- **O(1)**: Constant space
- **O(n)**: Linear space (array, hash table)
- **O(log n)**: Recursive call stack
- **O(n²)**: 2D array

## Common Patterns

### Array Operations
- Access by index: O(1)
- Search: O(n)
- Insert at end: O(1)
- Insert at beginning: O(n)
- Delete: O(n)

### Hash Table Operations
- Insert: O(1) average
- Search: O(1) average
- Delete: O(1) average
- Worst case: O(n)

### Binary Search Tree
- Search: O(log n) average, O(n) worst
- Insert: O(log n) average, O(n) worst
- Delete: O(log n) average, O(n) worst

## Best Practices

- Analyze worst-case scenario
- Consider average case
- Ignore constants and lower-order terms
- Focus on dominant term
- Consider space complexity too

## Examples

```javascript
// O(1)
function getFirst(arr) {
  return arr[0];
}

// O(n)
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
```

