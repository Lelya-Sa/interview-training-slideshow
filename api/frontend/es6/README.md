# ES6+ - Interview Material

## Definition
ES6 (ECMAScript 2015) and later versions introduced modern JavaScript features that make code more concise and powerful.

## Key Features

### 1. Let and Const
- **let**: Block-scoped variable, can be reassigned
- **const**: Block-scoped constant, cannot be reassigned
- Replaces `var` for better scoping

### 2. Arrow Functions
```javascript
// Traditional
function add(a, b) { return a + b; }

// Arrow
const add = (a, b) => a + b;
```
- Shorter syntax
- Lexical `this` binding
- Implicit return for single expressions

### 3. Template Literals
```javascript
const name = 'John';
const message = `Hello, ${name}!`;
```
- Multi-line strings
- String interpolation
- Tagged templates

### 4. Destructuring
```javascript
// Array
const [a, b] = [1, 2];

// Object
const {name, age} = user;
```
- Extract values from arrays/objects
- Default values
- Nested destructuring

### 5. Spread and Rest Operators
```javascript
// Spread
const arr = [...arr1, ...arr2];
const obj = {...obj1, ...obj2};

// Rest
function sum(...numbers) { }
```
- Copy arrays/objects
- Merge arrays/objects
- Collect arguments

### 6. Default Parameters
```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}
```

### 7. Promises
```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- Better async handling than callbacks
- Chainable
- Error handling

### 8. Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```
- Syntactic sugar for promises
- Synchronous-looking async code
- Better error handling

### 9. Classes
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, ${this.name}`;
  }
}
```
- Syntactic sugar for prototypes
- Inheritance with `extends`
- Static methods

### 10. Modules
```javascript
// Export
export const name = 'John';
export function greet() { }

// Import
import { name, greet } from './module';
import defaultExport from './module';
```
- ES6 module system
- `export` and `import`
- Default and named exports

### 11. Map and Set
```javascript
// Map
const map = new Map();
map.set('key', 'value');

// Set
const set = new Set([1, 2, 3]);
```
- Better than objects for key-value pairs
- Unique values
- Better performance for frequent additions/deletions

### 12. Symbols
```javascript
const sym = Symbol('description');
```
- Unique identifiers
- Private properties
- Well-known symbols

### 13. Iterators and Generators
```javascript
function* generator() {
  yield 1;
  yield 2;
}
```
- Custom iteration
- Lazy evaluation
- Memory efficient

### 14. Optional Chaining (?.)
```javascript
const name = user?.profile?.name;
```
- Safe property access
- Prevents errors

### 15. Nullish Coalescing (??)
```javascript
const value = input ?? 'default';
```
- Default value only for null/undefined
- Better than `||` for falsy values

## ES7+ Features

- **Array.includes()**: Check if array contains value
- **Exponentiation operator**: `2 ** 3` (8)
- **Object.entries()**: Array of [key, value] pairs
- **Object.values()**: Array of values
- **String.padStart/padEnd()**: Padding strings
- **Async generators**: `async function*`
- **BigInt**: Large integers
- **Dynamic imports**: `import()`

