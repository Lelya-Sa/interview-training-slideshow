# JavaScript - Interview Material

## Definition
JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. It enables interactive web pages and is an essential part of web applications.

## Key Concepts

### 1. Variables and Data Types
- **Primitive Types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- **Reference Types**: `object`, `array`, `function`
- **Variable Declarations**: `var`, `let`, `const`
- **Type Coercion**: Implicit and explicit type conversion

### 2. Functions
- **Function Declarations**: `function name() {}`
- **Function Expressions**: `const name = function() {}`
- **Arrow Functions**: `const name = () => {}`
- **Higher-Order Functions**: Functions that take other functions as arguments
- **Closures**: Functions that have access to variables in their outer scope
- **IIFE**: Immediately Invoked Function Expressions

### 3. Scope and Hoisting
- **Global Scope**: Variables accessible everywhere
- **Function Scope**: Variables accessible within function
- **Block Scope**: Variables accessible within `{}` blocks (let/const)
- **Hoisting**: Variable and function declarations moved to top
- **Temporal Dead Zone**: Period between entering scope and declaration

### 4. Objects and Arrays
- **Object Literals**: `{ key: value }`
- **Array Methods**: `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`
- **Destructuring**: Extracting values from objects/arrays
- **Spread Operator**: `...` for copying and merging
- **Object Methods**: `Object.keys()`, `Object.values()`, `Object.entries()`

### 5. Asynchronous JavaScript
- **Callbacks**: Functions passed as arguments
- **Promises**: Objects representing eventual completion/failure
- **Async/Await**: Syntactic sugar for promises
- **Event Loop**: Mechanism handling asynchronous operations
- **Microtasks vs Macrotasks**: Queue priority

### 6. `this` Keyword
- **Global Context**: `this` refers to global object
- **Function Context**: Depends on how function is called
- **Method Context**: `this` refers to object calling method
- **Arrow Functions**: `this` is lexically bound
- **Binding**: `call()`, `apply()`, `bind()`

### 7. Prototypes and Inheritance
- **Prototype Chain**: Mechanism for inheritance
- **Prototype Property**: Object that provides shared properties
- **Constructor Functions**: Functions used to create objects
- **Classes**: ES6 syntax for constructor functions
- **Inheritance**: `extends` keyword

### 8. Error Handling
- **try/catch/finally**: Error handling blocks
- **Error Types**: `Error`, `SyntaxError`, `TypeError`, `ReferenceError`
- **Custom Errors**: Creating error classes

### 9. Modules
- **CommonJS**: `require()` and `module.exports`
- **ES6 Modules**: `import` and `export`
- **Default vs Named Exports**

### 10. Advanced Topics
- **Generators**: Functions that can be paused and resumed
- **Iterators**: Objects that define iteration behavior
- **Proxy**: Object that wraps another object
- **Reflect**: Built-in object providing methods for interceptable operations
- **WeakMap/WeakSet**: Collections with weak references

## Common Patterns
- **IIFE**: Immediately Invoked Function Expression
- **Module Pattern**: Encapsulating code in modules
- **Revealing Module Pattern**: Exposing only necessary parts
- **Factory Pattern**: Creating objects without constructors
- **Singleton Pattern**: Single instance of object

## Best Practices
- Use `const` by default, `let` when reassignment needed
- Avoid `var` due to function scoping issues
- Use arrow functions for callbacks
- Prefer `async/await` over promise chains
- Use strict equality (`===`) over loose equality (`==`)
- Handle errors appropriately
- Write pure functions when possible
- Avoid global variables

## Mini Projects
See [projects.md](./projects.md) for complete implementation examples:
- Event Manager System
- Debounce and Throttle Implementation
- Promise-based HTTP Client
- State Management System

