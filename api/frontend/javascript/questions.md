# JavaScript - Interview Questions

> **Note**: For practical implementation examples, see [projects.md](./projects.md) which contains complete mini-projects including Event Manager, Debounce/Throttle, HTTP Client, and State Management.

## Basic Questions (1-20)

### 1. What is the difference between `var`, `let`, and `const`?
**Answer:**
- `var`: Function-scoped, hoisted, can be redeclared
- `let`: Block-scoped, hoisted but in TDZ, cannot be redeclared
- `const`: Block-scoped, must be initialized, cannot be reassigned

### 2. Explain hoisting in JavaScript.
**Answer:** Hoisting is JavaScript's behavior of moving declarations to the top of their scope. `var` declarations are hoisted and initialized with `undefined`, while `let` and `const` are hoisted but remain in the Temporal Dead Zone until declaration.

### 3. What is a closure? Provide an example.
**Answer:** A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

### 4. What is the difference between `==` and `===`?
**Answer:** `==` performs type coercion before comparison, while `===` checks both value and type without coercion.

### 5. Explain the `this` keyword in JavaScript.
**Answer:** `this` refers to the object that is executing the current function. Its value depends on how the function is called:
- Global context: `window` (browser) or `global` (Node.js)
- Method: the object that owns the method
- Arrow functions: lexically bound to enclosing scope

### 6. What are arrow functions? How do they differ from regular functions?
**Answer:** Arrow functions are a shorter syntax for writing functions. Differences:
- No `this` binding (lexical `this`)
- Cannot be used as constructors
- No `arguments` object
- Cannot be hoisted

### 7. What is a Promise? How do you handle errors in promises?
**Answer:** A Promise is an object representing the eventual completion or failure of an asynchronous operation. Errors are handled with `.catch()` or `try/catch` with `async/await`.

### 8. Explain the event loop in JavaScript.
**Answer:** The event loop is JavaScript's mechanism for handling asynchronous operations. It continuously checks the call stack and task queues, moving tasks from queues to the stack when the stack is empty.

### 9. What is the difference between `null` and `undefined`?
**Answer:** `undefined` means a variable has been declared but not assigned a value. `null` is an intentional absence of value, explicitly assigned.

### 10. What are the different ways to create objects in JavaScript?
**Answer:**
- Object literal: `const obj = {}`
- Constructor function: `new Object()`
- Object.create()
- Class syntax: `new ClassName()`

### 11. Explain prototypal inheritance.
**Answer:** JavaScript uses prototypal inheritance where objects can inherit properties and methods from other objects through the prototype chain. Each object has a `__proto__` property pointing to its prototype.

### 12. What is the difference between `call()`, `apply()`, and `bind()`?
**Answer:**
- `call()`: Invokes function with specified `this` and arguments passed individually
- `apply()`: Similar to `call()` but arguments passed as array
- `bind()`: Returns new function with bound `this` and optional arguments

### 13. What is destructuring? Provide examples.
**Answer:** Destructuring allows extracting values from arrays or properties from objects into distinct variables.

```javascript
// Array destructuring
const [a, b] = [1, 2];

// Object destructuring
const {name, age} = {name: 'John', age: 30};
```

### 14. What is the spread operator? How is it used?
**Answer:** The spread operator (`...`) allows expanding iterables (arrays, strings) into individual elements. Used for copying arrays, merging objects, passing arguments.

### 15. Explain async/await. How does it work?
**Answer:** `async/await` is syntactic sugar for promises that makes asynchronous code read like synchronous code. 

**Key points:**
- **`async`**: Placed before a function, makes it always return a Promise
- **`await`**: Pauses execution of the async function until a Promise settles (resolves or rejects)
- Can only use `await` inside `async` functions (except top-level await in modules)
- Use `try/catch` for error handling, just like synchronous code

**Example:**
```javascript
// Promise version
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await version (cleaner)
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

**Benefits:**
- Cleaner, more readable code
- Better error handling with try/catch
- Easier to debug
- Less callback nesting (avoids "callback hell")

**Important notes:**
- Async functions always return Promises, even if you return a regular value
- `await` only works inside `async` functions
- Multiple `await` statements run sequentially (one after another)
- Use `Promise.all()` to run multiple async operations in parallel

### 16. What is a generator function?
**Answer:** Generator functions can be paused and resumed using `yield`. They return generator objects that implement the iterator protocol.

### 17. What is the difference between `forEach` and `map`?
**Answer:** `forEach` executes a function for each element but doesn't return anything. `map` creates a new array with results of calling function on each element.

### 18. Explain the module system in JavaScript.
**Answer:** JavaScript has two module systems:
- CommonJS: `require()` and `module.exports` (Node.js)
- ES6 Modules: `import` and `export` (browsers and modern Node.js)

### 19. What is a WeakMap? When would you use it?
**Answer:** WeakMap is a collection where keys are objects and references are weak (garbage collected if no other references). Used for storing metadata about objects without preventing garbage collection.

### 20. What is the Temporal Dead Zone?
**Answer:** The TDZ is the period between entering scope and variable declaration where accessing `let` or `const` variables throws a ReferenceError.

## Intermediate Questions (21-40)

### 21. How does JavaScript handle memory management?
**Answer:** JavaScript uses automatic garbage collection. Objects are garbage collected when no references exist. Mark-and-sweep algorithm is commonly used.

### 22. What is currying? Provide an example.
**Answer:** Currying is converting a function with multiple arguments into a sequence of functions with single arguments.

```javascript
const add = (a) => (b) => (c) => a + b + c;
add(1)(2)(3); // 6
```

### 23. Explain the difference between shallow copy and deep copy.
**Answer:** Shallow copy copies references to nested objects. Deep copy creates new instances of nested objects. Use `JSON.parse(JSON.stringify())` or libraries like Lodash for deep copy.

### 24. What is memoization? Implement a memoization function.
**Answer:** Memoization is caching function results to avoid recomputation.

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}
```

### 25. Explain the difference between `setTimeout` and `setInterval`.
**Answer:** `setTimeout` executes function once after delay. `setInterval` repeatedly executes function at specified intervals.

### 26. What is a pure function? Why are they important?
**Answer:** Pure functions always return same output for same input and have no side effects. Important for predictability, testability, and functional programming.

### 27. Explain the difference between `slice()` and `splice()`.
**Answer:** `slice()` returns new array without modifying original. `splice()` modifies original array by removing/replacing elements.

### 28. What is the difference between `Object.freeze()` and `Object.seal()`?
**Answer:** `Object.freeze()` makes object immutable (can't add, modify, or delete properties). `Object.seal()` prevents adding/deleting but allows modifying existing properties.

### 29. Explain the concept of debouncing and throttling.
**Answer:**
- **Debouncing**: Delays function execution until after specified time since last call
- **Throttling**: Limits function execution to at most once per specified time period

### 30. What is the difference between `Array.map()` and `Array.forEach()`?
**Answer:** `map()` returns new array with transformed elements. `forEach()` executes function but returns `undefined`.

### 31. Explain event delegation.
**Answer:** Event delegation attaches event listener to parent element instead of individual children, using event bubbling to handle events.

### 32. What is the difference between `Promise.all()` and `Promise.allSettled()`?
**Answer:** `Promise.all()` rejects if any promise rejects. `Promise.allSettled()` waits for all promises to settle (resolve or reject).

### 33. Explain the difference between `Object.assign()` and spread operator.
**Answer:** Both copy properties, but spread operator is more concise and creates new object. `Object.assign()` mutates target object if provided.

### 34. What is a Proxy in JavaScript?
**Answer:** Proxy is an object that wraps another object and intercepts operations like property access, assignment, enumeration.

### 35. Explain the difference between `Array.reduce()` and `Array.reduceRight()`.
**Answer:** `reduce()` processes array left to right. `reduceRight()` processes right to left.

### 36. What is the difference between `String.slice()` and `String.substring()`?
**Answer:** Both extract substrings, but `substring()` swaps arguments if start > end, while `slice()` returns empty string.

### 37. Explain the concept of function composition.
**Answer:** Function composition combines multiple functions to create new function. Output of one function becomes input of next.

### 38. What is the difference between `Array.filter()` and `Array.find()`?
**Answer:** `filter()` returns array of all matching elements. `find()` returns first matching element or `undefined`.

### 39. Explain the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`.
**Answer:**
- `Object.keys()`: Returns array of property names
- `Object.values()`: Returns array of property values
- `Object.entries()`: Returns array of [key, value] pairs

### 40. What is the difference between `Array.some()` and `Array.every()`?
**Answer:** `some()` returns true if any element passes test. `every()` returns true only if all elements pass test.

## Advanced Questions (41-60)

### 41. Implement a debounce function.
**Answer:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

### 42. Implement a throttle function.
**Answer:**
```javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### 43. Explain how `new` keyword works.
**Answer:** `new` keyword:
1. Creates empty object
2. Sets object's prototype to constructor's prototype
3. Binds `this` to new object
4. Returns object (unless constructor returns object)

### 44. Implement `Promise.all()` from scratch.
**Answer:**
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) resolve(results);
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

### 45. Explain the difference between microtasks and macrotasks.
**Answer:** Microtasks (Promises, queueMicrotask) execute before macrotasks (setTimeout, setInterval). Event loop processes all microtasks before next macrotask.

### 46. Implement a deep clone function.
**Answer:**
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

### 47. Explain the difference between `Function.prototype.call()` and `Function.prototype.apply()`.
**Answer:** Both set `this` context, but `call()` takes arguments individually while `apply()` takes array of arguments.

### 48. Implement `Array.flat()` with depth parameter.
**Answer:**
```javascript
function flat(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val);
  }, []);
}
```

### 49. Explain the difference between `Object.create()` and `new` keyword.
**Answer:** `Object.create()` creates object with specified prototype. `new` invokes constructor function and sets up prototype chain automatically.

### 50. Implement `Array.reduce()` from scratch.
**Answer:**
```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
```

### 51. Explain how `bind()` works internally.
**Answer:** `bind()` creates new function with bound `this` and optional preset arguments. Returns function that when called, uses bound context.

### 52. Implement `Promise.race()` from scratch.
**Answer:**
```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}
```

### 53. Explain the difference between `Array.from()` and spread operator for arrays.
**Answer:** `Array.from()` can convert array-like objects and iterables, accepts mapping function. Spread operator only works with iterables.

### 54. Implement a function to check if two objects are deeply equal.
**Answer:**
```javascript
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
```

### 55. Explain the difference between `Symbol` and `Symbol.for()`.
**Answer:** `Symbol()` creates unique symbol each time. `Symbol.for()` creates or retrieves symbol from global symbol registry.

### 56. Implement `Array.map()` from scratch.
**Answer:**
```javascript
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

### 57. Explain the difference between `Object.getPrototypeOf()` and `Object.setPrototypeOf()`.
**Answer:** `getPrototypeOf()` returns prototype of object. `setPrototypeOf()` sets prototype of object (not recommended, use `Object.create()`).

### 58. Implement `Array.filter()` from scratch.
**Answer:**
```javascript
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

### 59. Explain the difference between `WeakMap` and `Map`.
**Answer:** `WeakMap` keys must be objects, has weak references (garbage collected), no iteration methods. `Map` can have any keys, strong references, has iteration methods.

### 60. Implement `Promise.allSettled()` from scratch.
**Answer:**
```javascript
function promiseAllSettled(promises) {
  return Promise.all(promises.map(promise =>
    Promise.resolve(promise)
      .then(value => ({ status: 'fulfilled', value }))
      .catch(reason => ({ status: 'rejected', reason }))
  ));
}
```

## LeetCode Style Questions (61-70)

### 61. Two Sum
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.

**Answer:**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

### 62. Reverse String
Write a function that reverses a string.

**Answer:**
```javascript
function reverseString(s) {
  return s.split('').reverse().join('');
}
// Or in-place:
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}
```

### 63. Valid Parentheses
Given a string containing just characters '(', ')', '{', '}', '[' and ']', determine if input string is valid.

**Answer:**
```javascript
function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  return stack.length === 0;
}
```

### 64. Merge Two Sorted Arrays
Merge two sorted arrays into one sorted array.

**Answer:**
```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
  while (j >= 0) nums1[k--] = nums2[j--];
}
```

### 65. Find Maximum in Array
Find the maximum element in an array.

**Answer:**
```javascript
function findMax(arr) {
  return Math.max(...arr);
  // Or:
  return arr.reduce((max, val) => val > max ? val : max, arr[0]);
}
```

### 66. Remove Duplicates from Array
Remove duplicates from sorted array in-place.

**Answer:**
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
```

### 67. Group Anagrams
Group strings that are anagrams of each other.

**Answer:**
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(str);
  }
  return Array.from(map.values());
}
```

### 68. Longest Common Prefix
Find the longest common prefix string amongst an array of strings.

**Answer:**
```javascript
function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}
```

### 69. Contains Duplicate
Given an array of integers, find if array contains any duplicates.

**Answer:**
```javascript
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
```

### 70. Best Time to Buy and Sell Stock
Find maximum profit from buying and selling stock once.

**Answer:**
```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
```

