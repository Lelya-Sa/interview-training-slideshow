# Find Missing Number in Array

## Problem
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

## Examples
```
Input: [3, 0, 1]
Output: 2

Input: [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8

Input: [0, 1]
Output: 2
```

```typescript
function findMissingNumber(number[] num_array){
    // validation if this is an array
    if(!Array.isArray(num_array)){
        threw new TypeError('it should be an array');
        }
    
    if(!num_array.every(n => typeof n === 'number' )){
    // if (!nums.every(n => typeof n === 'number')) {

    }

    }


```

## Approach
1. **Sum Formula**: Calculate expected sum (n*(n+1)/2) and subtract actual sum
2. **XOR Method**: XOR all numbers from 0 to n with all array elements
3. **HashSet**: Store all numbers in set, iterate 0 to n to find missing

## Solution

### JavaScript
```javascript
// Sum approach
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}

// XOR approach
function findMissingNumberXOR(nums) {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
}
```


### Python
```python
def find_missing_number(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

def find_missing_number_xor(nums):
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for sum/XOR, O(n) for HashSet approach

## Follow-up
- What if numbers are from 1 to n instead of 0 to n?
- What if multiple numbers are missing?
- What if array is sorted?

## Type Annotations in JavaScript

### Pure JavaScript (No Types)
JavaScript is **dynamically typed** - you don't declare types. Types are determined at runtime.

```javascript
// No type annotations needed
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

### TypeScript (With Types)
If using **TypeScript**, you can add explicit type annotations:

```typescript
function findMissingNumber(nums: number[]): number {
    const n: number = nums.length;
    const expectedSum: number = (n * (n + 1)) / 2;
    const actualSum: number = nums.reduce((a: number, b: number) => a + b, 0);
    return expectedSum - actualSum;
}
```

**TypeScript Types:**
- `nums: number[]` - Array of numbers
- `: number` - Return type is number
- `a: number, b: number` - Parameter types

### JSDoc Comments (Type Documentation)
You can document types using **JSDoc** comments (works in plain JavaScript):

```javascript
/**
 * Finds the missing number in an array containing n distinct numbers from 0 to n
 * @param {number[]} nums - Array of n distinct numbers from 0 to n
 * @returns {number} The missing number
 */
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

**JSDoc Type Annotations:**
- `@param {number[]} nums` - Parameter `nums` is array of numbers
- `@returns {number}` - Function returns a number
- Types in curly braces: `{number}`, `{string}`, `{boolean}`, `{Array<number>}`, etc.

### How to Decide Types

**For this problem:**
1. **Input**: `nums` is an array of numbers → `number[]` in TypeScript, `{number[]}` in JSDoc
2. **Output**: Function returns a single number → `number` in both
3. **Internal variables**: All are numbers

**Common JavaScript/TypeScript Types:**
- `number` - Numbers (integers and floats)
- `string` - Text
- `boolean` - true/false
- `number[]` - Array of numbers
- `Array<number>` - Alternative array syntax
- `object` - Any object
- `null` / `undefined` - Null and undefined values

### Type Checking at Runtime (JavaScript)

JavaScript doesn't enforce types, but you can check them:

```javascript
function findMissingNumber(nums) {
    // Runtime type checking (optional)
    if (!Array.isArray(nums)) {
        throw new TypeError('nums must be an array');
    }
    if (!nums.every(n => typeof n === 'number')) {
        throw new TypeError('nums must contain only numbers');
    }
    
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

### Recommended Approach

For interview/learning: **Use JSDoc** - it documents types without requiring TypeScript:

```javascript
/**
 * Finds missing number using sum formula approach
 * @param {number[]} nums - Array of n distinct numbers from 0 to n
 * @returns {number} The missing number
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 */
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```



```javascript
/**
 * @param {number} nums the array of numbers
 * @returns {number} the missing number 
 * 
 */
function findMissingNumberXOR(nums){

    //type checking
    if(!Array.isArray(nums)){
        throw new TypeError('must be array'); 
    }

    if(!nums.every(num => typeof nume === 'number')){
        threw new TypeError('must ber numbers');
    }

    let missing = nums.length; 
    nums.forEach((num, index) => missing ^= i ^ num)
}
```