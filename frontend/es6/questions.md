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

### 16. What is the rest parameter? How is it used?
**Answer:** `...param` in function collects remaining arguments into array. Use for variadic functions. Must be last parameter.

### 17. Explain Symbol. What is it used for?
**Answer:** Unique primitive; use as object key for private or well-known (Symbol.iterator). Prevents key collision.

### 18. What is the difference between for...of and for...in?
**Answer:** for...of iterates values (iterables); for...in iterates enumerable keys (objects). Use for...of for arrays; for...in for object keys (with hasOwnProperty).

### 19. What are default parameters?
**Answer:** Function param with = value; used when arg is undefined. Use for optional args. Evaluated at call time.

### 20. Explain Object.assign. When to use it?
**Answer:** Copies own enumerable properties from sources to target. Use for shallow merge. Mutates first argument. Prefer spread for new object.

### 21. What is Array.from? How does it differ from spread?
**Answer:** Array.from(iterable, mapFn?) creates array from iterable or array-like. Spread only works for iterables. Use for NodeList, arguments.

### 22. What are WeakMap and WeakSet?
**Answer:** WeakMap: keys are objects only; weak refs (GC can collect). WeakSet: objects only, weak refs. Use when key shouldn't prevent GC.

### 23. Explain Array.prototype.find and findIndex.
**Answer:** find returns first element matching predicate; findIndex returns index. Use when you need first match. Stops when found.

### 24. What is the difference between String.includes and indexOf?
**Answer:** includes returns boolean; indexOf returns index or -1. Use includes for existence check. Both support second param (start).

### 25. What are computed property names?
**Answer:** Object key from expression: { [key]: value }. Use for dynamic keys. Works in class and object literals.

### 26. Explain Array.prototype.includes.
**Answer:** Returns true if array contains value (SameValueZero). Use for membership. Prefer over indexOf for boolean. Supports fromIndex.

### 27. What is Object.entries? When to use it?
**Answer:** Returns [key, value] pairs. Use with for...of, Map, or destructuring. Inverse of Object.fromEntries.

### 28. What is the difference between Promise.all and Promise.race?
**Answer:** all waits for all; rejects on first rejection. race settles when first settles. Use all for parallel; race for timeout.

### 29. Explain Array.prototype.flat and flatMap.
**Answer:** flat(depth) flattens nested arrays. flatMap maps then flattens one level. Use for nested arrays and map+flatten.

### 30. What is globalThis?
**Answer:** Standard way to get global object (window, global, self). Use for cross-environment code. ES2020.

### 31. What are tagged template literals?
**Answer:** Function called with template literal: tag`str ${expr}`. Receives strings and values. Use for DSL, i18n, SQL.

### 32. Explain Object.getOwnPropertySymbols.
**Answer:** Returns array of own symbol keys. Use with Object.getOwnPropertyNames for all own keys. Reflect.ownKeys includes both.

### 33. What is the difference between Object.freeze and Object.seal?
**Answer:** freeze: no add, delete, or change. seal: no add or delete; can change values. Use freeze for immutability.

### 34. What is Array.prototype.fill?
**Answer:** fill(value, start?, end?) fills range with value. Mutates array. Use for init. Careful with objects (same reference).

### 35. Explain exponentiation operator (**).
**Answer:** a ** b is Math.pow(a, b). Right-associative. Use for powers. Same as pow.

### 36. What is String.prototype.padStart/padEnd?
**Answer:** padStart(length, padStr) pads to length from start; padEnd from end. Use for alignment. Default pad is space.

### 37. What is Object.getOwnPropertyDescriptors?
**Answer:** Returns all own property descriptors. Use for copying properties with attributes. Object.assign doesn't copy getters/setters.

### 38. Explain async generators.
**Answer:** async function* yields promises; use for await...of. Use for streaming async data. next() returns Promise.

### 39. What is the difference between export default and named export?
**Answer:** default: one per module; import without braces. Named: multiple; import { x }. Use default for main export; named for several.

### 40. What is String.prototype.trimStart/trimEnd?
**Answer:** trimStart() and trimEnd() remove whitespace from one side. trim() does both. Use when you need one-sided trim.

### 41. What is Promise.allSettled?
**Answer:** Waits for all; returns array of { status, value?/reason? }. Use when you need outcome of all. Doesn't reject.

### 42. Explain Array.prototype.copyWithin.
**Answer:** copyWithin(target, start, end?) copies slice to target position. Mutates. Use for in-place shift. Rare.

### 43. What is the difference between class and function constructor?
**Answer:** class is syntax; same prototype behavior. class has static, super, private (#). Use class for OOP. Hoisting differs (TDZ).

### 44. What is Array.prototype.at?
**Answer:** at(index) supports negative index (-1 is last). Use for from-end access. ES2022.

### 45. Explain super in classes.
**Answer:** super calls parent method or constructor. In constructor must call super before this. Use for inheritance.

### 46. What is Object.fromEntries?
**Answer:** Creates object from [key, value] pairs. Inverse of Object.entries. Use for Map to object, building from pairs.

### 47. What is the difference between static and instance method?
**Answer:** static is on class; called as Class.method(). Instance is on prototype. Use static for utilities; instance for per-object.

### 48. Explain Array.prototype.sort stability.
**Answer:** ES2019: sort is stable (equal elements keep order). Use for multi-key sort. Important for consistency.

### 49. What is optional catch binding?
**Answer:** catch without binding: catch { }. Use when you don't need error value. ES2019. Reduces noise.

### 50. What is String.prototype.replaceAll?
**Answer:** replaceAll(search, replace) replaces all occurrences. Use for global replace. ES2021. Same as replace with g.

### 51. Explain private class fields (#).
**Answer:** #field is private; only accessible inside class. Use for encapsulation. ES2022. Not in prototype.

### 52. What is Logical AND assignment (&&=)?
**Answer:** x &&= y means x = x && y. Use for conditional assign. Same for ||= and ??.= ES2021.

### 53. What is Numeric separators?
**Answer:** 1_000_000 for readability. Underscore in number literal. Ignored by parser. ES2021.

### 54. Explain Array.prototype.toSorted and toReversed.
**Answer:** ES2023: toSorted(), toReversed() return new array; don't mutate. Use when you need copy. Same as slice then sort/reverse.

### 55. What is Object.hasOwn?
**Answer:** Object.hasOwn(obj, key) replaces obj.hasOwnProperty. Safer when obj has no prototype. ES2022.

### 56. What is the difference between import() and import?
**Answer:** import() is dynamic; returns Promise. import is static (top-level). Use import() for code split or conditional load.

### 57. Explain Array.prototype.with.
**Answer:** arr.with(index, value) returns new array with element replaced. Non-mutating. ES2023.

### 58. What is Array.prototype.findLast and findLastIndex?
**Answer:** ES2023: findLast returns last match; findLastIndex returns its index. Use when you need last instead of first.

### 59. What is Symbol.asyncIterator?
**Answer:** Method for async iterables; used by for await...of. Return object with next() returning Promise of { value, done }.

### 60. Explain Array.prototype.toSpliced.
**Answer:** ES2023: toSpliced(start, deleteCount, ...items) returns new array (splice without mutating). Use for immutable splice.

### 61. What is the difference between Promise.finally and then/catch?
**Answer:** finally runs when promise settles (fulfilled or rejected); no argument. Use for cleanup. Then/catch receive value/error.

### 62. Explain Reflect and Proxy.
**Answer:** Reflect has methods for default object operations (get, set, etc.). Proxy traps operations. Use Proxy for validation, logging; Reflect to forward.

### 63. What is String.prototype.repeat?
**Answer:** repeat(count) returns string repeated count times. Use for padding or patterns. Throws if count negative or infinity.

### 64. What is the difference between Set and Array for uniqueness?
**Answer:** Set guarantees uniqueness; O(1) add/has. Array needs manual check or filter. Use Set for dedup and membership.

### 65. Explain Array.prototype.keys, values, entries.
**Answer:** Return iterators for indices, values, [index, value]. Use for...of with them. entries for index and value together.

### 66. What is Number.isFinite vs global isFinite?
**Answer:** Number.isFinite doesn't coerce; only true for numbers. isFinite("1") is true. Use Number.isFinite for strict check.

### 67. What is ArrayBuffer and TypedArray?
**Answer:** ArrayBuffer is raw bytes; TypedArray (Uint8Array, etc.) is view. Use for binary data, canvas, WebSocket. SharedArrayBuffer for workers.

### 68. Explain destructuring with default values.
**Answer:** const { a = 1 } = {}; or const [x = 0] = []. Use when value may be undefined. Default only when undefined.

### 69. What is the difference between Map and WeakMap keys?
**Answer:** Map: any value. WeakMap: only objects; keys are weak refs. Use WeakMap when key shouldn't prevent GC (e.g. cache).

### 70. What is String.raw?
**Answer:** Tag for template literal; returns string with backslashes unchanged. Use for regex or paths. String.raw`\n` is backslash-n.

### 71. Explain iterator protocol.
**Answer:** Object with next() returning { value, done }. Use for custom iteration. for...of and spread use it. Symbol.iterator.

### 72. What is the difference between const and Object.freeze?
**Answer:** const prevents reassignment of binding. freeze prevents mutation of object. Use both for constant object. const obj = Object.freeze({}).

### 73. What is RegExp flags (sticky, unicode)?
**Answer:** y (sticky): match at lastIndex only. u (unicode): proper Unicode. Use y for parsing; u for Unicode strings.

### 74. Explain Array.prototype.reduceRight.
**Answer:** Same as reduce but right-to-left. Use for right-associative operations or composition. Same signature as reduce.

### 75. What is Function.prototype.name?
**Answer:** name property gives function name (from declaration or inferred). Use for debugging. Arrow and anonymous have name when inferred.

### 76. What is the difference between class expression and declaration?
**Answer:** class Foo {} is declaration; const Foo = class {} is expression. Expression can be anonymous. Same behavior. Declaration hoisted (TDZ).

### 77. Explain Object.is.
**Answer:** Object.is(a, b) like === but Object.is(NaN, NaN) true and Object.is(0, -0) false. Use when NaN or -0 matters.

### 78. What is Array.prototype.some and every?
**Answer:** some: true if any element passes. every: true if all pass. Both short-circuit. Use for existence or universal check.

### 79. What is the difference between export and export default?
**Answer:** export { x } or export const x; named. export default x; one default. Import: import x from (default); import { x } (named).

### 80. Explain block scope with let and const.
**Answer:** let and const are block-scoped (if, for, {}). var is function-scoped. Use let/const for predictable scope. TDZ until declaration.

### 81. What is Intl object?
**Answer:** Internationalization: Intl.Collator, NumberFormat, DateTimeFormat. Use for locale-aware sort, number, date. Pass locale string.

### 82. What is the difference between async and sync generator?
**Answer:** async function* yields promises; for await...of. function* yields values; for...of. Use async for async sequence.

### 83. Explain Array.prototype.groupBy (ES2024).
**Answer:** groupBy(callback) returns object with keys and arrays. Use for grouping. Check support. Or use reduce.

### 84. What is Error cause (ES2022)?
**Answer:** new Error(msg, { cause: err }) chains errors. error.cause for original. Use for wrapping errors. Better than custom property.

### 85. What is at() for String and Array?
**Answer:** at(index) supports negative index (-1 is last). Use for from-end access. String and Array. ES2022.

### 86. Explain Array.prototype.toReversed.
**Answer:** ES2023: toReversed() returns new reversed array. Non-mutating. Use when you need reversed copy.

### 87. What is the difference between new Map() and Object.create(null)?
**Answer:** Map has size, iteration order, any keys. Object.create(null) has no prototype; string keys. Use Map for key-value; null object for simple map.

### 88. What is Promise.withResolvers (ES2024)?
**Answer:** Returns { promise, resolve, reject }. Use when you need to expose resolve/reject outside executor. Check support.

### 89. Explain Object.groupBy and Map.groupBy (ES2024).
**Answer:** Object.groupBy(items, fn) returns object; Map.groupBy returns Map. Use for grouping. Check support.

### 90. What is the difference between ?? and ||?
**Answer:** ?? only for null/undefined; || for any falsy. Use ?? when 0 or "" are valid. ?? is nullish coalescing.

### 91. What is Array.prototype.toSorted with compare?
**Answer:** toSorted(compareFn) returns new sorted array. Same as sort but non-mutating. ES2023.

### 92. Explain Symbol.iterator.
**Answer:** Method that returns iterator (object with next()). Makes object iterable for for...of and spread. Use for custom collections.

### 93. What is the difference between rest and arguments?
**Answer:** Rest is real array; arguments is array-like. Rest is preferred. arguments exists in non-arrow functions. Use ...args.

### 94. What is Object.fromEntries use case?
**Answer:** Map to object; rebuild from entries; transform key-value. Use after Object.entries or Map.entries.

### 95. Explain optional chaining with nullish coalescing.
**Answer:** obj?.prop ?? default. Safe access and default when null/undefined. Use for nested optional and fallback.

### 96. What is the difference between static and prototype?
**Answer:** static is on constructor; prototype is on instances. static Class.method(); instance gets from prototype. Use static for shared utility.

### 97. What is Array.prototype.includes with NaN?
**Answer:** includes uses SameValueZero; [NaN].includes(NaN) is true. indexOf(NaN) is -1. Use includes for NaN check.

### 98. Explain destructuring rest in objects.
**Answer:** const { a, ...rest } = obj; rest has remaining keys. Use for omitting keys. Rest must be last. Shallow copy.

### 99. What is the difference between export * and export { x }?
**Answer:** export * re-exports all from module (no default). export { x } re-exports named. Use export * for barrel file.

### 100. What is String.prototype.trim?
**Answer:** trim() removes whitespace from both ends. Use for user input. trimStart/trimEnd for one side. Returns new string.

### 101. Explain Array.prototype.flatMap.
**Answer:** flatMap(fn) is map then flat(1). Use when callback returns array and you want one level flatten. Slightly more efficient than map+flat.

### 102. What is the difference between getter and method in class?
**Answer:** getter: get name() {}; no parens when access. Method: name() {}. Use getter for computed property; method for action.

### 103. What is Symbol.for and Symbol.keyFor?
**Answer:** Symbol.for(key) returns global symbol; same key same symbol. keyFor(sym) returns key or undefined. Use for shared symbols.

### 104. Explain BigInt.
**Answer:** BigInt for integers beyond Number range. Literal 1n; BigInt(x). Use for large integers. Can't mix with Number without conversion.

### 105. What is the difference between Array.from and spread?
**Answer:** Array.from works on array-like (length); spread only iterable. Use Array.from for arguments, NodeList. Both create new array.

### 106. What is globalThis use case?
**Answer:** Cross-platform global (browser, Node, worker). Use when you need global object. window in browser; global in Node.

### 107. Explain Array.prototype.with for immutable update.
**Answer:** arr.with(i, val) returns new array with element at i replaced. Use for immutable update. ES2023.

### 108. What is the difference between private field and private method?
**Answer:** #field stores data; #method() is function. Both only in class. Use for encapsulation. ES2022. Not on prototype.
