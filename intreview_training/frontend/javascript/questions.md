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

### 71. What is the difference between `typeof` and `instanceof`?
**Answer:** `typeof` returns a string indicating the type of a value (e.g. "string", "number", "object", "function"). `instanceof` checks whether an object is an instance of a constructor (prototype chain). Use `typeof` for primitives; use `instanceof` for object types and classes.

### 72. What is the difference between `undefined` and "not defined"?
**Answer:** A variable that is "not defined" has never been declared; referencing it throws ReferenceError. `undefined` is the value of a declared variable that has not been assigned, or an explicit assignment.

### 73. Explain `Array.prototype.find()` and `findIndex()`.
**Answer:** `find()` returns the first element that satisfies the predicate, or `undefined`. `findIndex()` returns the index of that element, or -1. Both stop iterating once a match is found.

### 74. What is the purpose of `use strict`?
**Answer:** Strict mode disallows some unsafe or deprecated behavior: undeclared variables, deleting variables, duplicate parameters, and assigns `this` as `undefined` in plain function calls. Enable with `"use strict"` at the top of a file or function.

### 75. How do you clone an object in JavaScript? What are the pitfalls?
**Answer:** Shallow: spread `{...obj}`, `Object.assign({}, obj)`. Deep: `JSON.parse(JSON.stringify(obj))` (no functions/dates/symbols), or a recursive clone or library like Lodash. Pitfalls: nested references, non-JSON-serializable values, circular references.

### 76. What is the difference between `encodeURI` and `encodeURIComponent`?
**Answer:** `encodeURI` is for full URLs and leaves `; , / ? : @ & = + $` intact. `encodeURIComponent` encodes everything except `- _ . ! ~ * ' ( )` and is for query string values or path segments.

### 77. Explain `Array.prototype.flatMap()`.
**Answer:** `flatMap()` runs a mapping function on each element and then flattens the result by one level. Equivalent to `map().flat()` but more efficient. Useful for mapping each item to an array and concatenating.

### 78. What is the difference between `sessionStorage` and `localStorage`?
**Answer:** Both are key-value stores in the browser. `localStorage` persists until explicitly cleared and is shared across tabs. `sessionStorage` is cleared when the tab/window closes and is per-tab.

### 79. How do you detect if a value is an array?
**Answer:** `Array.isArray(value)` is the reliable way. Avoid `typeof value === "object"` (objects are also objects) and `value instanceof Array` (fails across iframes).

### 80. What is the optional chaining operator (`?.`)?
**Answer:** `obj?.prop` returns `undefined` if `obj` is `null` or `undefined` instead of throwing. `obj?.method?.()` safely calls a method. Reduces boilerplate null checks.

### 81. What is the nullish coalescing operator (`??`)?
**Answer:** `a ?? b` returns `b` only when `a` is `null` or `undefined`. Unlike `||`, it does not treat `0`, `""`, or `false` as "falsy" and replace them. Useful for default values.

### 82. Explain the difference between `break` and `continue` in loops.
**Answer:** `break` exits the loop entirely. `continue` skips the rest of the current iteration and moves to the next. Both can be used with a label for nested loops.

### 83. What is a tagged template literal?
**Answer:** A function that receives the template literal parts and interpolated values. Example: `tag` in `` tag`Hello ${name}` `` gets `["Hello ", ""]` and `[name]`. Used for sanitization, i18n, styled-components.

### 84. How does `JSON.stringify` handle circular references?
**Answer:** It throws a TypeError. To serialize objects with cycles, pass a replacer that tracks seen objects and returns a placeholder or omits the key for already-seen references.

### 85. What is the difference between `getAttribute()` and direct property access?
**Answer:** `element.getAttribute("href")` returns the attribute value as a string from the HTML. `element.href` returns the resolved URL (property). Attributes are strings; some DOM properties are typed or normalized.

### 86. Explain event bubbling and capturing.
**Answer:** In the capture phase, the event goes from window down to the target. In the bubbling phase, it goes from the target up. `addEventListener` third parameter: `true` for capture, `false` (default) for bubbling. `stopPropagation()` stops further propagation.

### 87. What is the difference between `preventDefault()` and `stopPropagation()`?
**Answer:** `preventDefault()` cancels the default browser action (e.g. link navigation, form submit). `stopPropagation()` stops the event from bubbling or capturing further. They are independent.

### 88. How do you remove duplicates from an array?
**Answer:** `[...new Set(arr)]` for primitives. For objects, use a Map keyed by a unique property or `JSON.stringify`, or filter with `findIndex` comparing by id. For primitives, Set is the simplest.

### 89. What is the difference between `substring()`, `substr()`, and `slice()` on strings?
**Answer:** `substring(start, end)` uses start/end indices; negative indices treated as 0. `substr(start, length)` is deprecated. `slice(start, end)` allows negative indices (from end). Prefer `slice()` for strings and arrays.

### 90. Explain the difference between `push()`/`pop()` and `unshift()`/`shift()`.
**Answer:** `push` adds to the end; `pop` removes from the end. `unshift` adds to the beginning; `shift` removes from the beginning. All modify the array. `shift`/`unshift` are O(n) because they reindex.

### 91. What is the difference between `in` operator and `hasOwnProperty()`?
**Answer:** `"key" in obj` is true if the property exists on the object or its prototype chain. `obj.hasOwnProperty("key")` is true only if the property is on the object itself. Use `Object.hasOwn(obj, "key")` to avoid prototype issues.

### 92. How do you merge two objects deeply?
**Answer:** Shallow: `{...a, ...b}` or `Object.assign({}, a, b)`. Deep: write a recursive merge (handle arrays and dates), or use a library like Lodash `merge`. Be aware of circular references and array merge strategy.

### 93. What is the difference between `Error` and custom errors?
**Answer:** Built-in `Error` has `message` and `name`. You can extend it with `class MyError extends Error` and set `this.name` in the constructor. Custom errors allow `instanceof` checks and attaching extra properties for handling.

### 94. Explain `try/catch/finally`. When does `finally` run?
**Answer:** `try` runs; if an exception is thrown, `catch` runs with the error. `finally` always runs after `try`/`catch` (even on return or throw). Use `finally` for cleanup (e.g. closing resources).

### 95. What is the difference between `throw` and `reject` in async code?
**Answer:** `throw` in an `async` function is equivalent to `return Promise.reject(...)`. In a `.then()` callback, `throw` rejects the promise. `reject()` is the explicit way to reject inside a Promise constructor.

### 96. How do you convert a callback-based API to a Promise?
**Answer:** Wrap in `new Promise((resolve, reject) => { ... })` and call `resolve(value)` on success or `reject(err)` on error. Or use `util.promisify` (Node.js) for (err, result) style callbacks.

### 97. What is the difference between `String.trim()` and `trimStart()`/`trimEnd()`?
**Answer:** `trim()` removes whitespace from both ends. `trimStart()` (or `trimLeft()`) trims the start only; `trimEnd()` (or `trimRight()`) trims the end only. Useful when you need to preserve one side.

### 98. Explain `Array.prototype.sort()` default behavior.
**Answer:** Without a compare function, `sort()` coerces elements to strings and sorts lexicographically. So `[10, 2, 1].sort()` becomes `[1, 10, 2]`. For numbers use `(a, b) => a - b`.

### 99. What is the difference between `Object.create(null)` and `{}`?
**Answer:** `{}` creates an object whose prototype is `Object.prototype` (has `toString`, `hasOwnProperty`, etc.). `Object.create(null)` creates an object with no prototype, useful as a pure key-value map with no inherited keys.

### 100. How do you check if a string contains a substring?
**Answer:** `str.includes(sub)` (returns boolean), `str.indexOf(sub) !== -1`, or `str.startsWith(sub)` / `str.endsWith(sub)` for position-specific checks. For patterns use `regex.test(str)`.

### 101. What is the difference between `for...in` and `for...of`?
**Answer:** `for...in` iterates over enumerable property keys (including inherited); use for objects. `for...of` iterates over iterable values (arrays, strings, Map values); use for collections. Prefer `for...of` for arrays.

### 102. Explain the difference between `getElementsByClassName` and `querySelectorAll`.
**Answer:** `getElementsByClassName` returns a live HTMLCollection (updates when DOM changes). `querySelectorAll` returns a static NodeList. Both accept a selector string; `querySelectorAll` supports full CSS selectors.

### 103. What is the purpose of `documentFragment`?
**Answer:** A lightweight container for DOM nodes that is not part of the document tree. You append nodes to it, then append the fragment to the DOM once—triggering a single reflow. Improves performance when adding many nodes.

### 104. How do you add and remove CSS classes in the DOM?
**Answer:** `element.classList.add("class")`, `classList.remove("class")`, `classList.toggle("class")`, `classList.contains("class")`. Avoid setting `className` string when you only need to add/remove one class.

### 105. What is the difference between `window.onload` and `DOMContentLoaded`?
**Answer:** `DOMContentLoaded` fires when the HTML is parsed and DOM is ready (no styles/images required). `load` fires when the full page (including images, styles) has loaded. Use `DOMContentLoaded` for script that only needs the DOM.

### 106. Explain `requestAnimationFrame`. When would you use it?
**Answer:** Schedules a callback before the next repaint; synced to display refresh rate. Use for animations and smooth updates. Browser can pause callbacks when tab is hidden. Prefer over `setTimeout` for visual updates.

### 107. What is the difference between `innerHTML` and `textContent`?
**Answer:** `innerHTML` gets/sets HTML as a string; can introduce XSS if used with user input. `textContent` gets/sets plain text and escapes HTML. Use `textContent` for user-visible text unless you intentionally need HTML.

### 108. How do you create and dispatch a custom event?
**Answer:** `const event = new CustomEvent("myevent", { detail: { data: 1 }, bubbles: true }); element.dispatchEvent(event);`. Listen with `element.addEventListener("myevent", (e) => console.log(e.detail))`.

### 109. What is the difference between `setTimeout(fn, 0)` and `queueMicrotask(fn)`?
**Answer:** `setTimeout(fn, 0)` schedules a macrotask (runs after current call stack and microtasks). `queueMicrotask(fn)` schedules a microtask (runs before the next macrotask). Microtasks run in the same "tick" after sync code.

### 110. Explain `Array.from()` and when to use it.
**Answer:** Creates a new array from an array-like or iterable (e.g. NodeList, arguments, Map). Second argument is an optional map function. Use for converting iterables to arrays or building arrays with a length and mapping function.

### 111. What is the difference between `Object.keys()` and `Object.getOwnPropertyNames()`?
**Answer:** `Object.keys()` returns only enumerable own property names. `Object.getOwnPropertyNames()` returns all own property names (including non-enumerable). Use the latter when you need to see non-enumerable properties.

### 112. How do you make a property non-enumerable?
**Answer:** `Object.defineProperty(obj, "key", { value: 42, enumerable: false })`. The property exists and can be read/written but won't show in `for...in` or `Object.keys()`. Default for properties defined this way is `enumerable: false`.

### 113. What is the difference between `Number.isNaN()` and `isNaN()`?
**Answer:** `isNaN(x)` coerces `x` to a number first; `isNaN("hello")` is true. `Number.isNaN(x)` is true only if `x` is exactly the value `NaN`. Prefer `Number.isNaN()` for strict NaN checks.

### 114. Explain `Array.prototype.fill()`.
**Answer:** `arr.fill(value, start?, end?)` fills elements from start to end (default whole array) with the given value. Mutates the array. Useful for initializing arrays; be careful with reference types (same reference for every slot).

### 115. What is the difference between `parseInt` and `Number()`?
**Answer:** `Number("123")` converts the whole string to a number; invalid input gives `NaN`. `parseInt("123px", 10)` parses from the start until an invalid character; second argument is radix. Use `parseInt` for strings with trailing non-numeric characters.

### 116. How do you safely access nested object properties?
**Answer:** Optional chaining: `obj?.a?.b?.c`. Returns `undefined` if any part is null/undefined. Alternative: defensive checks (`obj && obj.a && obj.a.b`) or a utility like Lodash `get`. Prefer optional chaining in modern code.

### 117. What is the difference between `slice()` and `substring()` for strings?
**Answer:** Both take start and optional end. `slice()` allows negative indices (count from end). `substring()` treats negative as 0 and swaps start/end if start > end. Prefer `slice()` for consistency with arrays.

### 118. Explain the difference between `concat()` and spread for arrays.
**Answer:** `arr1.concat(arr2)` and `[...arr1, ...arr2]` both concatenate; spread is more readable for multiple arrays. `concat()` can add non-array values as single elements; spread expands iterables. Both create a new array.

### 119. What is a Symbol and when would you use it?
**Answer:** Symbol is a unique primitive; `Symbol()` never equals another. Use for object property keys to avoid name clashes, for well-known symbols (e.g. `Symbol.iterator`), or to hide "internal" properties from casual iteration.

### 120. How do you iterate over object entries in a predictable order?
**Answer:** Keys order: integer keys (ascending), then string keys (insertion order), then symbols (insertion order). For a fixed order, use `Object.keys(obj).sort()` or a Map (insertion order). Or keep an array of keys and iterate that.

### 121. What is the difference between `Array.prototype.every()` and `some()`?
**Answer:** `every()` returns true only if the predicate is true for every element; stops on first false. `some()` returns true if the predicate is true for at least one element; stops on first true. Empty array: `every` returns true, `some` returns false.

### 122. Explain `Object.freeze()` vs `Object.seal()` vs preventing extension.
**Answer:** `Object.preventExtensions(obj)`: no new properties. `Object.seal(obj)`: same plus cannot delete existing properties; can still change values. `Object.freeze(obj)`: same plus existing properties are read-only (shallow). All use strict mode for violations.

### 123. How do you copy an array?
**Answer:** Shallow: `[...arr]`, `arr.slice()`, `Array.from(arr)`. Deep: `JSON.parse(JSON.stringify(arr))` (JSON-safe only), or recursive clone or library. Spread and `slice()` are the usual shallow copy.

### 124. What is the difference between `addEventListener` and assigning to `onclick`?
**Answer:** Assigning `element.onclick = fn` replaces any previous handler and only one handler per event. `addEventListener` allows multiple handlers, can use capture, and is the preferred modern approach. Use `addEventListener` for flexibility.

### 125. Explain the same-origin policy and CORS.
**Answer:** Same-origin: protocol, host, and port must match. Scripts can freely access same-origin resources. Cross-origin requests (e.g. fetch to another domain) are restricted; the server must send CORS headers (e.g. `Access-Control-Allow-Origin`) to allow the browser to expose the response.

### 126. What is the difference between `const` and `Object.freeze()`?
**Answer:** `const` means the binding cannot be reassigned; the referenced object can still be mutated (properties added/changed). `Object.freeze()` makes the object itself immutable (no add/delete/change of properties). Use both for a constant, immutable object.

### 127. How do you implement a simple pub/sub or event emitter?
**Answer:** Keep an object mapping event names to arrays of listeners. `on(event, fn)` pushes `fn` to the array. `emit(event, ...args)` calls each listener with `args`. `off(event, fn)` removes the listener. Use a Map or object for the map.

### 128. What is the difference between `Array.prototype.reverse()` and `toReversed()`?
**Answer:** `reverse()` mutates the array in place and returns it. `toReversed()` (ES2023) returns a new reversed array without mutating. Prefer `toReversed()` when you need to keep the original order.

### 129. Explain `String.prototype.padStart()` and `padEnd()`.
**Answer:** `str.padStart(targetLength, padString)` pads the start until the string reaches target length; `padEnd` pads the end. Default pad is space. Useful for aligning strings or fixed-width numbers (e.g. "7".padStart(3, "0") → "007").

### 130. What is the difference between `Error` and `AggregateError`?
**Answer:** `Error` represents a single error. `AggregateError` (ES2021) wraps multiple errors (e.g. from `Promise.allSettled` failures). It has an `errors` array and is useful when reporting several failures at once.

### 131. How do you round a number to N decimal places?
**Answer:** `Math.round(num * 10**n) / 10**n`. Or `Number(num.toFixed(n))` (toFixed returns a string; be aware of floating-point). For currency, consider a decimal library or storing cents.

### 132. What is the difference between `Array.prototype.at()` and bracket notation?
**Answer:** `arr.at(-1)` returns the last element; `arr[arr.length - 1]` is the classic way. `at()` accepts negative indices (from end). Bracket notation only accepts non-negative indices. Use `at()` for cleaner "from end" access.

### 133. Explain `Object.groupBy()` (or grouping by key).
**Answer:** ES2024 adds `Object.groupBy(items, keyFn)` returning an object with keys from `keyFn` and values as arrays of items. Polyfill: reduce into an object, `key = keyFn(item)`, push to `result[key]`.

### 134. What is the difference between `globalThis` and `window`/`global`?
**Answer:** `globalThis` is the standard way (ES2020) to get the global object in any environment (browser, Node, workers). `window` is browser; `global` is Node. Use `globalThis` for portable code.

### 135. How do you detect if code is running in the browser vs Node?
**Answer:** Check for `typeof window !== "undefined"` (browser) or `typeof process !== "undefined" && process.versions?.node` (Node). Alternatively use a bundler or build-time constants so the right branch is included per environment.

### 136. What is the difference between `Array.prototype.with()` and bracket assignment?
**Answer:** `arr.with(index, value)` (ES2023) returns a new array with the element at index replaced; does not mutate. `arr[i] = value` mutates. Use `with()` when you need immutability.

### 137. Explain `Promise.any()` and how it differs from `Promise.race()`.
**Answer:** `Promise.race()` settles (fulfill or reject) when the first promise settles. `Promise.any()` fulfills when the first promise fulfills; it rejects only if all reject (with an AggregateError). Use `any()` when you need one success.

### 138. What is the difference between `String.prototype.replace()` and `replaceAll()`?
**Answer:** `replace(regex|string, newVal)` replaces the first match (or all if regex has `g` flag). `replaceAll(string, newVal)` replaces all occurrences of the string. For global replace with a string, `replaceAll` is clearer.

### 139. How do you implement a simple debounce from scratch?
**Answer:** Return a function that clears a timer and sets a new one calling the original function after delay. On each call, reset the timer; when the timer fires, call the wrapped function. Store the timer id in closure.

### 140. What is the difference between `Array.prototype.includes()` and `indexOf()`?
**Answer:** `includes(value)` returns a boolean; works with NaN (`[NaN].includes(NaN)` is true). `indexOf(value)` returns the index or -1; NaN is not found. Use `includes()` for existence checks; use `indexOf()` when you need the index.

### 141. Explain `Intl` for number and date formatting.
**Answer:** `Intl.NumberFormat(locale, options)` and `Intl.DateTimeFormat(locale, options)` provide locale-aware formatting without extra libraries. Use for currency, percentages, dates, and times in the user's locale.

### 142. What is the difference between `Map` and a plain object for key-value storage?
**Answer:** Map: any value as key (including objects), insertion order, `.size`, no prototype keys. Object: string/symbol keys only, no guaranteed order, no `.size`. Use Map for general key-value data; use object for record-like data.

### 143. How do you handle unhandled promise rejections?
**Answer:** In browsers: `window.onunhandledrejection = (e) => { ... }`. In Node: `process.on("unhandledRejection", (reason, promise) => { ... })`. Always attach `.catch()` or try/catch in async functions so rejections are handled and logged.

### 144. What is the difference between `Array.prototype.splice()` and `toSpliced()`?
**Answer:** `splice(start, deleteCount, ...items)` mutates the array and returns removed elements. `toSpliced()` (ES2023) returns a new array with the splice applied without mutating. Use `toSpliced()` when you need immutability.

### 145. Explain the difference between `WeakSet` and `Set`.
**Answer:** WeakSet holds only objects; references are weak (no prevent GC). No iteration, no `.size`. Use for tracking objects without preventing garbage collection (e.g. "already processed" tags). Set holds any values and supports iteration.

### 146. How do you merge two arrays and remove duplicates?
**Answer:** `[...new Set([...arr1, ...arr2])]` for primitives. For objects by id: use a Map keyed by id and spread values, or filter with a Set of seen ids. Sort after merge if needed.

### 147. What is the difference between `async` function and a function returning a Promise?
**Answer:** An async function always returns a Promise; thrown errors become rejected promises. A regular function can return a Promise manually. Behavior is similar; async/await is syntactic sugar for writing and consuming promises.

### 148. Explain `Array.prototype.toSorted()` and `toReversed()`.
**Answer:** ES2023: `toSorted()` returns a new sorted array (like `sort()` but non-mutating). `toReversed()` returns a new reversed array (like `reverse()` but non-mutating). Use when you must not mutate the original array.

### 149. What is the difference between `fetch` and `XMLHttpRequest`?
**Answer:** `fetch` is Promise-based, uses a simpler API and streams; CORS and cookies differ from XHR. XHR is older, supports progress events and abort via `AbortController`-like patterns. Prefer `fetch` for new code; use polyfills or XHR where fetch is insufficient.

### 150. How do you deep-freeze an object (recursive freeze)?
**Answer:** Call `Object.freeze(obj)`, then for each own property, if the value is an object and not frozen, recursively deep-freeze it. Avoid infinite recursion by checking for cycles (e.g. with a Set of seen objects).

### 151. What is the difference between `Array.prototype.sort()` and `toSorted()`?
**Answer:** `sort()` mutates the array in place; `toSorted()` (ES2023) returns a new sorted array without mutating. Use `toSorted()` when you must keep the original array unchanged.

### 152. Explain `Array.prototype.findLast()` and `findLastIndex()`.
**Answer:** ES2023: `findLast(cb)` returns the last element that satisfies the predicate; `findLastIndex(cb)` returns its index. Use when you need the last match instead of the first.

### 153. What is the difference between `Object.hasOwn()` and `Object.prototype.hasOwnProperty()`?
**Answer:** `Object.hasOwn(obj, key)` (ES2022) is the preferred way to check own property; safe when `obj` has no prototype (e.g. `Object.create(null)`). `hasOwnProperty` can be overridden or missing on such objects.

### 154. How do you implement a simple throttle from scratch?
**Answer:** Track last run time; if enough time has passed, run the function and update last run; otherwise ignore (or schedule for later). Return a function that wraps the original. Used for scroll/resize handlers.

### 155. What is the difference between `String.prototype.match()` and `matchAll()`?
**Answer:** `match()` returns first match or all matches (with `g` flag) as array of strings. `matchAll()` (ES2020) returns an iterator of match objects with groups; use for regex with capturing groups.

### 156. Explain `Array.prototype.toSpliced()`, `toSorted()`, and `with()`.
**Answer:** ES2023: non-mutating variants. `toSpliced(start, deleteCount, ...items)` returns new array with splice applied. `with(index, value)` returns new array with one element replaced. Use for immutable updates.

### 157. What is the difference between `Promise.finally()` and `try/finally`?
**Answer:** `Promise.finally(cb)` runs when the promise settles (fulfilled or rejected); does not receive a value. `try/finally` runs after try/catch in sync code. Both run regardless of outcome; use for cleanup.

### 158. How do you convert an async generator to an array?
**Answer:** Use `for await...of` and push to array, or use a library that consumes async iterables. There is no built-in `Array.fromAsync` in older JS; ES2024 adds `Array.fromAsync()` for this.

### 159. What is the difference between `import` and `require()`?
**Answer:** `import` is ES module syntax; static, hoisted, can be tree-shaken. `require()` is CommonJS; dynamic, runs at runtime. Use `import` in ES modules; `require()` in Node CommonJS (unless `"type": "module"`).

### 160. Explain `Symbol.iterator` and iterable protocol.
**Answer:** An object is iterable if it has a method keyed by `Symbol.iterator` that returns an iterator (object with `next()` returning `{ value, done }`). Used by `for...of`, spread, `Array.from()`.

### 161. What is the difference between `Array.prototype.flat()` and `flatMap()`?
**Answer:** `flat(depth)` flattens nested arrays by depth. `flatMap(fn)` maps each element with `fn` then flattens by one level. `flatMap` is equivalent to `map(fn).flat(1)` but more efficient.

### 162. How do you detect if a value is a Promise?
**Answer:** Check `typeof value.then === 'function'` (duck typing). Or use `value instanceof Promise` (fails for cross-realm or polyfills). Duck typing is more reliable across environments.

### 163. What is the difference between `Error.cause` and chaining errors?
**Answer:** ES2022: `new Error('msg', { cause: err })` attaches the original error. Access via `error.cause`. Use for wrapping errors while preserving the chain for debugging.

### 164. Explain `Object.fromEntries()` and when to use it.
**Answer:** `Object.fromEntries(iterable)` creates an object from key-value pairs (e.g. from `Map`, or array of `[key, value]`). Use to convert Map to object or rebuild object from entries.

### 165. What is the difference between `String.prototype.repeat()` and padding?
**Answer:** `repeat(n)` returns the string repeated n times. `padStart(len, str)`/`padEnd(len, str)` pad to a length (ES2017). Use `repeat` for building repeated patterns; pad for alignment.

### 166. How do you implement a simple event emitter with once?
**Answer:** Store listeners in array (or Map by event name). `on` pushes listener; `once` pushes a wrapper that removes itself after first call; `emit` calls all listeners. Remove listener in wrapper for `once`.

### 167. What is the difference between `ArrayBuffer` and `TypedArray`?
**Answer:** `ArrayBuffer` is raw binary data (fixed length); you cannot read/write directly. `TypedArray` (e.g. `Uint8Array`) is a view over an ArrayBuffer with typed access. Use for binary data and Web APIs.

### 168. Explain `queueMicrotask()` and when to use it.
**Answer:** `queueMicrotask(fn)` schedules `fn` to run after current sync code and before next task (same as Promise.then). Use when you need to defer work without delaying to next macrotask (e.g. after DOM update).

### 169. What is the difference between `Reflect` and direct operations?
**Answer:** `Reflect` provides methods that mirror language operations (get, set, apply, etc.). Same behavior as direct ops but as functions; useful for proxies and for consistent apply/construct. Use in proxies to forward operations.

### 170. How do you merge two objects without mutating?
**Answer:** `Object.assign({}, a, b)` or spread `{ ...a, ...b }`. For deep merge, use a recursive function or library (e.g. lodash merge). Spread is shallow; nested objects are still referenced.

### 171. What is the difference between `Array.prototype.copyWithin()` and slice?
**Answer:** `copyWithin(target, start, end)` copies elements within the same array (mutates). `slice(start, end)` returns a new array. Use `copyWithin` for in-place shift; `slice` for copying.

### 172. Explain `Proxy` for validation or default values.
**Answer:** Create `new Proxy(target, { get, set })`; in `set` validate and return true/false; in `get` return default if property missing. Use for validation, logging, or default values without changing target object.

### 173. What is the difference between `async` generator and regular async function?
**Answer:** Async generator `async function* gen()` yields values; use `for await...of` to consume. Regular async function returns one Promise. Use async generator for streaming or sequence of async values.

### 174. How do you implement a simple cache (memoize) with TTL?
**Answer:** Store results in Map (or object); key = serialized arguments; value = { result, expiry }. On get, if expired delete and return undefined (recompute). Use for expensive functions with expiry.

### 175. What is the difference between `String.prototype.trim()` and `trimStart()`/`trimEnd()`?
**Answer:** `trim()` removes whitespace from both ends. `trimStart()`/`trimEnd()` (ES2019) remove from start or end only. Use when you need one-sided trim (e.g. preserve leading spaces).

### 176. Explain `Array.prototype.reduceRight()`.
**Answer:** Same as `reduce()` but processes array from right to left. Use when order of combination matters (e.g. composing functions from right to left).

### 177. What is the difference between `Object.getOwnPropertySymbols()` and `Object.getOwnPropertyNames()`?
**Answer:** `getOwnPropertyNames` returns string keys only; `getOwnPropertySymbols` returns symbol keys only. Use both to iterate all own properties (including symbols). `Reflect.ownKeys()` returns both.

### 178. How do you serialize an object with circular references?
**Answer:** Use a custom replacer that tracks seen objects (e.g. WeakSet) and replaces duplicates with a placeholder or path. Or use a library (e.g. flatted). `JSON.stringify` throws on circular refs.

### 179. What is the difference between `Map` and `Object` for keys?
**Answer:** Map allows any value as key (object, function); preserves insertion order; has size; no prototype keys. Object keys are strings or symbols; has prototype; no guaranteed order. Use Map for arbitrary keys and order.

### 180. Explain `Function.prototype.length` and `name` property.
**Answer:** `length` is the number of declared parameters (excluding rest). `name` is the function name (or inferred for anonymous functions in ES2015+). Use for introspection and debugging.

### 181. What is the difference between `throw` in sync and async code?
**Answer:** In sync code `throw` propagates up the call stack. In async code, throwing in async function rejects the returned promise; uncaught rejection becomes unhandled rejection. Always catch in async or use global handler.

### 182. How do you implement a lazy evaluation helper?
**Answer:** Return a function or getter that computes value on first access; cache result. Or use a generator that yields computed values on demand. Use for expensive computation that may not be needed.

### 183. What is the difference between `Array.prototype.includes()` and `indexOf()` for NaN?
**Answer:** `includes()` correctly finds NaN (`[NaN].includes(NaN)` is true). `indexOf()` uses strict equality and does not find NaN. Use `includes()` when NaN might be present.

### 184. Explain `Object.defineProperty()` for getters and setters.
**Answer:** `Object.defineProperty(obj, key, { get, set, enumerable, configurable })` defines a property with getter/setter. Use for computed properties, validation, or reactivity. Prefer class get/set in modern code when possible.

### 185. What is the difference between `String.prototype.split()` and `Array.prototype.join()`?
**Answer:** `split(sep)` splits string into array of substrings. `join(sep)` joins array elements into string. They are inverse operations (str.split(sep).join(sep) equals str for simple cases).

### 186. How do you implement a retry wrapper for a Promise-returning function?
**Answer:** Call the function; on reject, if retries left, wait (setTimeout) and call again; otherwise reject. Use exponential backoff and max retries. Return a Promise that resolves when one attempt succeeds.

### 187. What is the difference between `globalThis` and `window`?
**Answer:** `globalThis` (ES2020) is the standard way to get the global object in any environment (browser, Node, worker). `window` is browser-only. Use `globalThis` for portable code.

### 188. Explain `Array.prototype.some()` and `every()` short-circuit behavior.
**Answer:** `some()` stops at first true; `every()` stops at first false. Use when you only need to know existence (some) or universal (every) and want to avoid scanning the whole array.

### 189. What is the difference between `Object.create(null)` and `{}`?
**Answer:** `Object.create(null)` has no prototype (no `toString`, `hasOwnProperty`, etc.). `{}` has `Object.prototype`. Use create(null) for pure key-value maps to avoid prototype pollution.

### 190. How do you implement a timeout for a Promise?
**Answer:** `Promise.race([userPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))])`. Or use AbortController with fetch. Reject or abort when time exceeds limit.

### 191. What is the difference between `RegExp.exec()` and `String.match()`?
**Answer:** `exec()` returns one match at a time; call repeatedly with global regex for all matches; returns groups. `match()` with global flag returns all matches as strings (no groups). Use exec for capturing groups in loop.

### 192. Explain `Symbol.asyncIterator` and async iterables.
**Answer:** An object is async iterable if it has `Symbol.asyncIterator` returning an iterator whose `next()` returns a Promise of `{ value, done }`. Used by `for await...of`. Use for streaming async data.

### 193. What is the difference between `parseFloat` and `Number()`?
**Answer:** Both parse strings to number. `Number()` is stricter (empty string → 0, whitespace-only → 0). `parseFloat` parses until first invalid character. Use Number() for strict conversion; parseFloat for leading number in string.

### 194. How do you implement a simple pub/sub with topics?
**Answer:** Store subscribers per topic (Map or object: topic → array of callbacks). Subscribe adds callback to topic; publish calls all callbacks for topic with payload. Unsubscribe removes callback from array.

### 195. What is the difference between `Array.prototype.fill()` and spread for init?
**Answer:** `fill(value)` fills existing array with value (mutates). Spread `[...Array(n)]` or `Array(n).fill(0)` creates array of n elements. Use fill for same value; use map for computed initial values.

### 196. Explain `Error` subclasses and when to use them.
**Answer:** Extend `Error` for custom errors (e.g. `ValidationError`). Set `this.name` and call `super(message)`; optionally set `this.cause`. Use for typed errors and better stack traces. Check with `instanceof`.

### 197. What is the difference between `WeakRef` and strong reference?
**Answer:** `WeakRef` (ES2021) holds a weak reference; object can be GC'd if no other strong reference. Use for caches that should not prevent GC. Must check `deref()` for null before use.

### 198. How do you implement a simple scheduler (run N tasks at a time)?
**Answer:** Maintain queue of tasks; pool of N workers; when worker free, take next task and run (async); when done, mark free and take next. Use Promise or callback to signal completion. Limit concurrency.

### 199. What is the difference between `Object.is()` and `===`?
**Answer:** `Object.is(a, b)` is like `===` but `Object.is(NaN, NaN)` is true and `Object.is(0, -0)` is false. Use Object.is when you need consistent behavior for NaN and -0.

### 200. Explain `Array.prototype.groupBy()` (or reduce for grouping).
**Answer:** ES2024 adds `Object.groupBy(items, keyFn)` (or Map variant). Or use reduce: accumulate object/map where key is group and value is array of items. Use for grouping by category or key.

### 201. What is the difference between `setTimeout` and `requestAnimationFrame`?
**Answer:** `setTimeout` runs after a delay (ms); not tied to display. `requestAnimationFrame` runs before next repaint; use for animations. Prefer rAF for visual updates; setTimeout for non-visual delay.

### 202. How do you implement a simple rate limiter?
**Answer:** Track timestamps of requests (e.g. array or sliding window); if count in window exceeds limit, reject or delay; otherwise allow and record. Use for API or UI rate limiting. Can use token bucket or sliding window.

### 203. What is the difference between `Object.assign()` and spread for merging?
**Answer:** Both are shallow merge. `Object.assign` mutates first argument (if not empty object); spread creates new object. Prefer spread for immutability: `{ ...a, ...b }`.

### 204. Explain `String.prototype.localeCompare()`.
**Answer:** Compares strings according to locale (sort order). Returns negative, zero, or positive. Use for sorting strings in user's language: `arr.sort((a, b) => a.localeCompare(b))`.

### 205. What is the difference between `Array.prototype.flat(Infinity)` and recursive flatten?
**Answer:** `flat(Infinity)` flattens to any depth (ES2019). Recursive flatten is equivalent but you implement it. Use flat(Infinity) when supported; otherwise recursive or iterative with stack.

### 206. How do you implement a simple state machine?
**Answer:** Store current state; define transitions (fromState, event → toState); on event, if transition allowed, update state and run side effects. Use object or Map for transition table. Good for UI or workflow.

### 207. What is the difference between `JSON.parse()` and `eval()` for data?
**Answer:** Never use `eval()` for data; security risk (code execution). `JSON.parse()` parses JSON only; safe. Use JSON.parse for JSON strings; use other parsers for other formats.

### 208. Explain `Intl.Collator` for sorting.
**Answer:** `Intl.Collator(locale, options)` creates a collator; use `.compare(a, b)` in sort. Handles locale-specific order (e.g. accents, case). Use for correct alphabetical sort: `arr.sort(collator.compare)`.

### 209. What is the difference between `Array.prototype.splice()` and `toSpliced()`?
**Answer:** `splice()` mutates the array. `toSpliced()` (ES2023) returns a new array with splice applied without mutating. Use toSpliced when you need immutability.

### 210. How do you implement a simple retry with exponential backoff?
**Answer:** Loop or recursive: attempt; on failure wait delay (e.g. 2^attempt * baseMs); retry until success or max attempts. Cap delay to avoid huge waits. Use for transient failures (network, rate limit).

### 211. What is the difference between `Symbol.toStringTag` and `Object.prototype.toString`?
**Answer:** `Symbol.toStringTag` (ES6) customizes result of `Object.prototype.toString.call(obj)` (e.g. "[object MyClass]"). Use for branded type checks and debugging.

### 212. Explain `Array.prototype.with()` for immutable update.
**Answer:** ES2023: `arr.with(index, value)` returns new array with element at index replaced. Non-mutating. Use for immutable updates without full copy (e.g. in Redux reducers).

### 213. What is the difference between `fetch` and `axios`?
**Answer:** `fetch` is built-in; returns Response; no throw on 4xx/5xx by default. Axios is library; throws on error status; interceptors; request/response transform; older browsers. Use fetch with wrapper or axios for convenience.

### 214. How do you implement a simple compose (function composition)?
**Answer:** `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);` Or reduce left for pipe. Use for chaining pure functions without nesting.

### 215. What is the difference between `Object.getOwnPropertyDescriptor()` and `in`?
**Answer:** `getOwnPropertyDescriptor` returns property descriptor (configurable, enumerable, value, etc.) or undefined. `in` returns boolean (own or inherited). Use descriptor when you need to know property attributes.

### 216. Explain `String.prototype.normalize()`.
**Answer:** Unicode normalization (NFC, NFD, etc.); different sequences can represent same character. Use for comparison and storage (e.g. NFC for display). Important for i18n and search.

### 217. What is the difference between `Array.prototype.at()` and bracket notation?
**Answer:** `at(index)` (ES2022) accepts negative index (e.g. -1 for last element). Bracket notation does not. Use at() for from-end indexing without computing length.

### 218. How do you implement a simple pipe (left-to-right composition)?
**Answer:** `const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);` First function receives input; each result passed to next. Use for readable left-to-right data flow.

### 219. What is the difference between `RegExp` sticky flag `y` and global `g`?
**Answer:** `g` finds all matches; `y` (sticky) matches only at lastIndex (contiguous). Use `y` for parsing when matches must be adjacent. Both advance lastIndex.

### 220. Explain `Object.entries()` and iteration.
**Answer:** `Object.entries(obj)` returns array of [key, value] pairs. Use with for...of, destructuring, or Map constructor. Use when you need both key and value in loop (instead of keys + obj[key]).

### 221. What is the difference between `Array.prototype.filter()` and `flatMap()` for filtering?
**Answer:** `filter(cb)` keeps elements where cb returns true. `flatMap(cb)` can map and flatten; return empty array to exclude, single-element array to include. flatMap can filter and transform in one pass.

### 222. How do you implement a simple curry function?
**Answer:** Return function that collects arguments; when args.length >= fn.length, call fn with args; otherwise return another function that collects more. Use for partial application and composition.

### 223. What is the difference between `String.prototype.replace()` with function and string?
**Answer:** Replace with string: `$&` is match, `$1` is group. Replace with function: (match, ...groups) => replacement; full control. Use function for dynamic replacement (e.g. capitalize, transform).

### 224. Explain `Array.prototype.reduce()` for building objects.
**Answer:** Use reduce with initial value {}; in callback set key and value from current element; return accumulator. Use for grouping, indexing by id, or building lookup maps from arrays.

### 225. What is the difference between `Promise.all()` and `Promise.allSettled()`?
**Answer:** `Promise.all()` rejects on first rejection; `allSettled()` waits for all and returns status per promise (fulfilled/rejected). Use allSettled when you need outcome of all promises (e.g. batch report).

### 226. How do you implement a simple observer (reactive value)?
**Answer:** Store value and list of subscribers. set(value) updates and notifies all; get() returns value; subscribe(cb) adds callback. Use for simple reactive state without full framework.

### 227. What is the difference between `Number.isFinite()` and `isFinite()`?
**Answer:** `Number.isFinite(x)` does not coerce; only true for actual numbers (not NaN, not Infinity). `isFinite(x)` coerces (e.g. isFinite("1") is true). Use Number.isFinite for strict check.

### 228. Explain `Array.prototype.reduceRight()` for composition.
**Answer:** Same as reduce but right-to-left. Useful for function composition: [f, g, h].reduceRight((acc, fn) => fn(acc), x) applies h then g then f. Or for building right-associated structures.

### 229. What is the difference between `Object.keys()` and `Reflect.ownKeys()`?
**Answer:** `Object.keys` returns enumerable own string keys. `Reflect.ownKeys` returns all own keys (string + symbol), including non-enumerable. Use Reflect.ownKeys when you need symbols or full list.

### 230. How do you implement a simple promise pool (limit concurrency)?
**Answer:** Same as scheduler: queue of tasks; run up to N; when one completes, start next. Use Promise: wrap each task; track in-flight count; when < N, push next from queue and run. Return when queue empty and all done.

### 231. What is the difference between `String.prototype.search()` and `indexOf()`?
**Answer:** `search(regex)` returns index of first match (or -1); takes regex. `indexOf(substr)` takes string. Use search when you need regex (e.g. pattern); indexOf for literal string.

### 232. Explain `Array.prototype.copyWithin()` use cases.
**Answer:** Copies a slice of the array to another position in the same array (mutates). Use for shifting elements (e.g. ring buffer), or in-place duplication of a range. Rare; slice + splice more readable for most cases.

### 233. What is the difference between `async` function and generator for async flow?
**Answer:** Async function returns Promise; one value at a time. Async generator yields multiple values over time; use for await...of for streaming. Use async function for single result; async generator for sequence.

### 234. How do you implement a simple deep equal?
**Answer:** Compare primitives with ===; for objects compare keys length and recursively compare values; handle null, arrays, dates; use Set to detect cycles. Or use library (lodash isEqual).

### 235. What is the difference between `Array.prototype.reverse()` and `toReversed()`?
**Answer:** `reverse()` mutates the array. `toReversed()` (ES2023) returns a new reversed array without mutating. Use toReversed when you need immutability.

### 236. Explain `Intl.NumberFormat` for number formatting.
**Answer:** `Intl.NumberFormat(locale, options)` formats numbers (currency, percent, decimals). Use .format(n) for display. Handles locale (e.g. 1,000.00 vs 1.000,00). Use for user-facing numbers.

### 237. What is the difference between `Object.seal()` and `Object.freeze()`?
**Answer:** `seal()` prevents adding/removing properties; existing properties can be changed. `freeze()` also prevents changing values. Use seal for "shape fixed"; freeze for full immutability.

### 238. How do you implement a simple LRU cache?
**Answer:** Use Map (insertion order); on get move to end (delete + set); on set if over capacity remove first (oldest). Or use two structures (key→value, key→timestamp). Evict least recently used when full.

### 239. What is the difference between `Array.prototype.indexOf()` and `findIndex()`?
**Answer:** `indexOf(value)` finds first strict equality. `findIndex(cb)` finds first element where callback returns true. Use findIndex when you need predicate (e.g. find by id); indexOf for value match.

### 240. Explain `String.prototype.replaceAll()`.
**Answer:** ES2021: replaces all occurrences (like replace with global flag). Takes string or regex (must have g). Use for replacing every occurrence without manual loop or global regex.

### 241. What is the difference between `WeakSet` and `Set`?
**Answer:** WeakSet holds weak references; only objects; no iteration; no size. Set holds strong references; any value; iterable. Use WeakSet for tracking objects without preventing GC (e.g. seen objects).

### 242. How do you implement a simple debounce that fires on leading edge?
**Answer:** Same as debounce but call immediately on first invoke; then ignore until wait period passes. Or use option { leading: true }. Use for "first click now, then debounce" (e.g. submit button).

### 243. What is the difference between `JSON.stringify` replacer and space?
**Answer:** Replacer: function or array to filter/transform values. Space: number or string for indentation (pretty print). Use replacer to exclude or transform; space for readable output.

### 244. Explain `Array.prototype.toSorted()` with compare function.
**Answer:** ES2023: `toSorted(compareFn)` returns new sorted array (same compare contract as sort). Use when you need sorted copy without mutating (e.g. display sorted view of immutable list).

### 245. What is the difference between `document.createElement` and `innerHTML`?
**Answer:** createElement is safe (no script execution); innerHTML parses HTML and can run scripts (XSS if unsanitized). Use createElement or template for user/source-controlled content; sanitize if using innerHTML.

### 246. How do you implement a simple throttle that fires on trailing edge?
**Answer:** Throttle: run at most once per period. Trailing: if call happens in cooldown, run once at end of period. Track last run and pending; on invoke either run now or schedule for end. Use for scroll/resize.

### 247. What is the difference between `Array.prototype.forEach()` and `for...of`?
**Answer:** forEach cannot be broken (no break); takes callback. for...of can use break/continue; iterates values. Use for...of when you might break; forEach for side effects only. for...of is often faster.

### 248. Explain `Object.fromEntries()` with Map.
**Answer:** `Object.fromEntries(map)` converts Map (or array of [key, value]) to plain object. Use when you need to pass object to API that expects plain object, or for Map → object serialization.

### 249. What is the difference between `AbortController` and manual cancellation?
**Answer:** AbortController (and signal) is standard way to cancel fetch and other APIs. Pass signal to fetch; call abort() to cancel. Manual: track cancelled flag in closure. Use AbortController for fetch and composable cancellation.

### 250. How do you implement a simple compose with async functions?
**Answer:** Compose that returns async function: each fn returns Promise; use await in reduce/reduceRight. Or use promise chain: fns.reduce((p, fn) => p.then(fn), Promise.resolve(x)). Use for async middleware or pipelines.

