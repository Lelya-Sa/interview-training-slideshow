# Sum Approach Explanation - Find Missing Number

## Overview
The sum approach finds the missing number by calculating the difference between what the sum **should be** (if all numbers were present) and what the sum **actually is** (from the array).

## The Function (Lines 31-32)

```javascript
const actualSum = nums.reduce((a, b) => a + b, 0);
return expectedSum - actualSum;
```

## Array.reduce() Documentation

### Syntax
```javascript
array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)
```

### Parameters

1. **`callback`** (required): Function to execute on each element
   - **`accumulator`**: Accumulated value from previous iterations (or `initialValue` on first call)
   - **`currentValue`**: Current element being processed
   - **`currentIndex`** (optional): Index of current element
   - **`array`** (optional): The array `reduce()` was called upon

2. **`initialValue`** (optional): Initial value for accumulator
   - If provided: accumulator starts with this value, iteration starts at index 0
   - If omitted: accumulator starts with first element, iteration starts at index 1

### Return Value
Returns the final accumulated value (single value, not an array)

### How It Works

`reduce()` executes the callback function once for each element in the array (except if `initialValue` is omitted and array is empty). The return value of the callback becomes the accumulator for the next iteration.

**Process:**
1. Start with `initialValue` (or first element if omitted)
2. For each element in array:
   - Call callback with (accumulator, currentValue)
   - Use return value as new accumulator
3. Return final accumulator value

### Examples

#### Example 1: Sum of Array (Our Use Case)
```javascript
const numbers = [3, 0, 1];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// Step 1: acc=0, curr=3 → return 0+3 = 3
// Step 2: acc=3, curr=0 → return 3+0 = 3
// Step 3: acc=3, curr=1 → return 3+1 = 4
// Result: sum = 4
```

#### Example 2: Without Initial Value
```javascript
const numbers = [3, 0, 1];
const sum = numbers.reduce((acc, curr) => acc + curr);
// Step 1: acc=3 (first element), curr=0 → return 3+0 = 3
// Step 2: acc=3, curr=1 → return 3+1 = 4
// Result: sum = 4
```

#### Example 3: Find Maximum
```javascript
const numbers = [5, 2, 8, 1];
const max = numbers.reduce((acc, curr) => curr > acc ? curr : acc);
// Step 1: acc=5, curr=2 → return 5 (2 < 5)
// Step 2: acc=5, curr=8 → return 8 (8 > 5)
// Step 3: acc=8, curr=1 → return 8 (1 < 8)
// Result: max = 8
```

#### Example 4: Count Occurrences
```javascript
const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
const count = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
}, {});
// Result: { apple: 3, banana: 2, cherry: 1 }
```

#### Example 5: Flatten Array
```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
// Step 1: acc=[], curr=[1,2] → return [1,2]
// Step 2: acc=[1,2], curr=[3,4] → return [1,2,3,4]
// Step 3: acc=[1,2,3,4], curr=[5,6] → return [1,2,3,4,5,6]
// Result: [1, 2, 3, 4, 5, 6]
```

### Visual Flow Diagram

```
Array: [3, 0, 1]
Initial: 0

Iteration 1:
  accumulator = 0 (initial)
  currentValue = 3
  callback(0, 3) → return 0 + 3 = 3
  new accumulator = 3

Iteration 2:
  accumulator = 3
  currentValue = 0
  callback(3, 0) → return 3 + 0 = 3
  new accumulator = 3

Iteration 3:
  accumulator = 3
  currentValue = 1
  callback(3, 1) → return 3 + 1 = 4
  new accumulator = 4

Final Result: 4
```

### Key Points

1. **Accumulator Pattern**: `reduce()` is perfect for accumulating values (sum, product, concatenation, etc.)
2. **Single Value Result**: Always returns one value (not an array)
3. **Left-to-Right**: Processes elements from left to right
4. **Initial Value**: Always provide initial value for clarity and to handle empty arrays
5. **Immutable**: Doesn't modify original array

### Common Use Cases

- **Sum/Product**: `reduce((a, b) => a + b, 0)`
- **Max/Min**: `reduce((a, b) => a > b ? a : b)`
- **Grouping**: `reduce((acc, item) => { acc[item.category] = [...]; return acc; }, {})`
- **Flattening**: `reduce((acc, arr) => acc.concat(arr), [])`
- **Counting**: `reduce((acc, item) => { acc[item] = (acc[item] || 0) + 1; return acc; }, {})`

### Comparison with Other Array Methods

| Method | Returns | Use Case |
|--------|---------|----------|
| `map()` | New array | Transform each element |
| `filter()` | New array | Select elements |
| `reduce()` | Single value | Accumulate/aggregate |
| `forEach()` | undefined | Side effects only |

### Time & Space Complexity

- **Time**: O(n) - Must visit each element once
- **Space**: O(1) - Only stores accumulator (constant space)

## Step-by-Step Explanation

### Line 31: Calculate Actual Sum
```javascript
const actualSum = nums.reduce((a, b) => a + b, 0);
```

**What it does:**
- `reduce()` iterates through the array and accumulates a value
- `(a, b) => a + b` is the accumulator function:
  - `a` = accumulated sum so far
  - `b` = current array element
  - Returns `a + b` (adds current element to running total)
- `0` is the initial value (starts sum at 0)

**Example with `[3, 0, 1]`:**
```
Step 1: a=0, b=3 → return 0+3 = 3
Step 2: a=3, b=0 → return 3+0 = 3
Step 3: a=3, b=1 → return 3+1 = 4
Result: actualSum = 4
```

### Line 32: Find the Difference
```javascript
return expectedSum - actualSum;
```

**What it does:**
- Subtracts the actual sum from the expected sum
- The difference is the missing number!

**Why this works:**
- If all numbers 0 to n were present, sum would be `expectedSum`
- Since one number is missing, sum is `actualSum` (smaller)
- Difference = `expectedSum - actualSum` = the missing number

## Complete Example Walkthrough

**Input:** `[3, 0, 1]` (n=3, so expected numbers: 0, 1, 2, 3)

**Step 1: Calculate Expected Sum**
```javascript
const n = nums.length;  // n = 3
const expectedSum = (n * (n + 1)) / 2;
// expectedSum = (3 * 4) / 2 = 12 / 2 = 6
```
Expected numbers: 0 + 1 + 2 + 3 = 6 ✅

**Step 2: Calculate Actual Sum (Line 31)**
```javascript
const actualSum = nums.reduce((a, b) => a + b, 0);
// actualSum = 3 + 0 + 1 = 4
```

**Step 3: Find Missing Number (Line 32)**
```javascript
return expectedSum - actualSum;
// return 6 - 4 = 2
```
Missing number is **2** ✅

## Why This Formula Works

**Sum of 0 to n:**
- 0 + 1 + 2 + ... + n = n(n+1)/2
- This is the formula for sum of first n+1 natural numbers (0 to n)

**Mathematical Proof:**
- Sum = 0 + 1 + 2 + ... + n
- Pair: (0+n) + (1+(n-1)) + (2+(n-2)) + ...
- Each pair sums to n
- Number of pairs = (n+1)/2
- Total = n × (n+1)/2

## Visual Representation

```
Expected: [0, 1, 2, 3] → Sum = 6
Actual:   [0, 1,    3] → Sum = 4  (missing 2)
                                    ↓
                            Difference = 6 - 4 = 2 ✅
```

## Key Insights

1. **Mathematical Property**: The sum of numbers 0 to n is always n(n+1)/2
2. **Missing Number = Gap**: The difference between expected and actual sum equals the missing number
3. **Single Pass**: `reduce()` calculates sum in one pass through the array

## Advantages

- ✅ **Simple**: Easy to understand and implement
- ✅ **Efficient**: O(n) time, O(1) space
- ✅ **No Extra Data Structures**: Doesn't need hash sets or sorting

## Edge Cases

**What if missing number is 0?**
- Array: `[1, 2, 3]` (n=3)
- Expected: 0+1+2+3 = 6
- Actual: 1+2+3 = 6
- Missing: 6-6 = 0 ✅

**What if missing number is n?**
- Array: `[0, 1, 2]` (n=3)
- Expected: 0+1+2+3 = 6
- Actual: 0+1+2 = 3
- Missing: 6-3 = 3 ✅

## General Pattern

This approach works for any arithmetic sequence:
- **0 to n**: Sum = n(n+1)/2
- **1 to n**: Sum = n(n+1)/2 (but adjust formula)
- **a to b**: Sum = (b-a+1)(a+b)/2

## Time & Space Complexity

- **Time**: O(n) - Single pass through array to calculate sum
- **Space**: O(1) - Only using a few variables (n, expectedSum, actualSum)