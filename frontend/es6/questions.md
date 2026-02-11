# ES6+ - Interview Questions

## Questions (1-15)

### 1. What is the difference between let, const, and var?
**Answer:** `let` and `const` are block-scoped, `var` is function-scoped. `const` cannot be reassigned.

### 2. Explain arrow functions. What are their benefits?
**Answer:** Shorter syntax, lexical `this` binding, implicit return. Benefits: concise code, no `this` binding issues.

### 3. What are template literals?
**Answer:** String literals using backticks, support interpolation `${variable}` and multi-line strings.

### 4. Explain destructuring. Provide examples.
**Answer:** Extract values from arrays/objects. `const [a, b] = [1, 2]; const {name} = user;`

### 5. What is the spread operator? How is it used?
**Answer:** `...` expands iterables. Used for copying arrays/objects, merging, passing arguments.

### 6. What is the difference between spread and rest operators?
**Answer:** Spread expands, rest collects. `...arr` spreads array, `...args` collects arguments.

### 7. Explain promises. How do they work?
**Answer:** Objects representing async operation result. Have `.then()`, `.catch()`, `.finally()` methods.

### 8. What is async/await? How does it differ from promises?
**Answer:** Syntactic sugar for promises. Makes async code look synchronous. Uses `try/catch` for errors.

### 9. Explain ES6 classes. How do they relate to prototypes?
**Answer:** Syntactic sugar for constructor functions and prototypes. `class` keyword, `extends` for inheritance.

### 10. What are ES6 modules? How do they differ from CommonJS?
**Answer:** `import/export` syntax. Static analysis, tree-shaking. CommonJS uses `require/module.exports`.

### 11. What is the difference between Map and Object?
**Answer:** Map accepts any keys, has size property, better for frequent additions/deletions. Object has string keys.

### 12. What is a Set? When would you use it?
**Answer:** Collection of unique values. Use for removing duplicates, membership testing.

### 13. Explain optional chaining (?.).
**Answer:** Safe property access. Returns `undefined` if property doesn't exist instead of throwing error.

### 14. What is nullish coalescing (??)?
**Answer:** Returns right operand only if left is `null` or `undefined`. Better than `||` for falsy values.

### 15. What are generators? How do they work?
**Answer:** Functions that can be paused/resumed using `yield`. Return generator objects implementing iterator protocol.

