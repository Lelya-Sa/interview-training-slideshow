# Cognyte Interview Question Pack - Phase 2 (Q1-Q50)

Scope for this phase:
- React interview questions
- JavaScript interview questions
- Each question includes theory, direct answer, and explanation

Recommended usage:
- Try to answer each question aloud first (60-90 seconds).
- Then compare with the provided answer.
- Mark each as: `Strong`, `Partial`, or `Weak`.

---

## React (Q1-Q25)

### 1) What is the Virtual DOM in React?
**Theory:** The browser DOM is expensive to update directly. React introduces an abstraction to optimize UI updates.
**Answer:** Virtual DOM is a lightweight JavaScript representation of the real DOM. React compares old and new Virtual DOM trees and updates only changed real DOM nodes.
**Explanation:** Instead of fully repainting a page, React computes a diff and performs minimal mutations, which improves performance and keeps UI updates predictable.

### 2) What is reconciliation in React?
**Theory:** Reconciliation is React's algorithm for determining what changed between renders.
**Answer:** Reconciliation is the process where React compares previous and next Virtual DOM trees to decide which components/nodes need updates.
**Explanation:** If a component type changes, React may remount; if only props/state changed, React updates selectively. Keys play a major role in list reconciliation.

### 3) What is the difference between props and state?
**Theory:** React data flow is primarily one-way from parent to child.
**Answer:** Props are external inputs passed to a component (read-only). State is internal mutable data managed by the component.
**Explanation:** Parent controls props; component controls state (or hooks). Changing state triggers rerender; props changes also rerender the component.

### 4) Why should props be treated as immutable?
**Theory:** Predictability is critical for declarative UI frameworks.
**Answer:** Props must be immutable because mutating them breaks one-way data flow and can cause unpredictable rendering behavior.
**Explanation:** If child mutates parent-owned data, debugging becomes hard. Instead, child emits callbacks and parent updates state.

### 5) What does `useState` do?
**Theory:** Function components need local reactive state.
**Answer:** `useState` adds state to function components and returns `[value, setValue]`.
**Explanation:** Calling `setValue` queues an update and rerender. For state based on previous value, use updater form: `setCount(c => c + 1)`.

### 6) What does `useEffect` do?
**Theory:** Components need side effects (API calls, subscriptions, timers) outside render.
**Answer:** `useEffect` runs side-effect logic after render and can optionally clean up resources.
**Explanation:** Dependency array controls when it runs: none (every render), `[]` (once on mount), `[x]` (when `x` changes).

### 7) Why is cleanup important in `useEffect`?
**Theory:** Side effects often allocate resources that must be released.
**Answer:** Cleanup prevents memory leaks and stale subscriptions/timers when component unmounts or dependencies change.
**Explanation:** Example: `clearInterval`, `unsubscribe`, or abort pending fetch requests in cleanup function.

### 8) What causes an infinite render loop with `useEffect`?
**Theory:** Effects rerun when dependencies change; incorrect dependencies can trigger cycles.
**Answer:** Updating state inside an effect that depends on that same state (without guard) can cause infinite rerenders.
**Explanation:** If effect runs on each render and sets state each time, render never stabilizes. Fix with proper dependencies/conditions.

### 9) Why are keys required in list rendering?
**Theory:** Reconciliation needs stable identity for list items.
**Answer:** Keys uniquely identify elements across renders so React can correctly reuse/update/remove list items.
**Explanation:** Using index as key can break state/ordering when list changes. Prefer stable IDs from data.

### 10) What is lifting state up?
**Theory:** Shared state between sibling components should have one source of truth.
**Answer:** Lifting state up means moving shared state to nearest common parent and passing data/callbacks via props.
**Explanation:** This keeps siblings synchronized and avoids duplicated inconsistent state.

### 11) Controlled vs uncontrolled components?
**Theory:** Form inputs can be managed by React state or by DOM itself.
**Answer:** Controlled components store input value in React state. Uncontrolled components rely on DOM refs/initial values.
**Explanation:** Controlled inputs are easier for validation/conditional UI; uncontrolled may be simpler for quick forms.

### 12) What is React Context API?
**Theory:** Prop drilling can become cumbersome in deep trees.
**Answer:** Context allows sharing data (theme/auth/locale) across many components without passing props manually at every level.
**Explanation:** Context is good for global-ish read-heavy data, but frequent updates can rerender many consumers.

### 13) When should you avoid overusing Context?
**Theory:** Every state tool has trade-offs.
**Answer:** Avoid Context for highly frequent granular updates across large trees; performance and coupling can suffer.
**Explanation:** For complex update-heavy apps, structured state management patterns may scale better.

### 14) What does `React.memo` do?
**Theory:** Rerenders can be reduced when props are unchanged.
**Answer:** `React.memo` memoizes a functional component, skipping rerender if props are shallowly equal.
**Explanation:** Useful for pure components with expensive renders; unnecessary usage can add complexity with minimal gain.

### 15) `useMemo` vs `useCallback`?
**Theory:** Memoization can target values or functions.
**Answer:** `useMemo` memoizes computed values; `useCallback` memoizes function references.
**Explanation:** `useCallback(fn, deps)` is conceptually `useMemo(() => fn, deps)`, often used to avoid child rerenders from new callback refs.

### 16) What are React Fragments?
**Theory:** Components must return a single parent wrapper.
**Answer:** Fragments group multiple children without adding extra DOM nodes.
**Explanation:** Use `<>...</>` or `<React.Fragment>...</React.Fragment>` to keep DOM cleaner.

### 17) What is an Error Boundary?
**Theory:** UI runtime errors should not crash the entire app silently.
**Answer:** Error Boundaries catch rendering/lifecycle errors in child tree and show fallback UI.
**Explanation:** Traditionally implemented via class components with `componentDidCatch` and `getDerivedStateFromError`.

### 18) Why does React state update appear async?
**Theory:** React batches updates for efficiency.
**Answer:** State setters schedule updates; value may not change immediately in same synchronous block.
**Explanation:** Reading state immediately after `setState` can show old value; use effect or updater pattern when needed.

### 19) What is prop drilling and how to reduce it?
**Theory:** Deep prop chains increase coupling.
**Answer:** Prop drilling is passing props through intermediate components that don't need them directly.
**Explanation:** Reduce via Context, composition, or better component boundaries.

### 20) Why should hooks be called at top level only?
**Theory:** React maps hook calls by call order.
**Answer:** Hooks must not be called conditionally/inside loops so React can preserve consistent hook order each render.
**Explanation:** Violating this rule misaligns internal hook state and causes bugs.

### 21) What is stale closure in React?
**Theory:** JS closures capture variables from creation scope.
**Answer:** Stale closure happens when callback/effect uses old state/props because dependencies were not updated correctly.
**Explanation:** Fix by adding correct dependencies or using functional updates/refs where appropriate.

### 22) What is the purpose of `useRef`?
**Theory:** Some values should persist across renders without triggering rerender.
**Answer:** `useRef` stores a mutable object (`current`) that survives rerenders and can reference DOM nodes.
**Explanation:** Common uses: focus input, keep timer ID, hold previous values.

### 23) What is conditional rendering?
**Theory:** UI should depend on state/props conditions.
**Answer:** Conditional rendering means showing different JSX based on conditions (`if`, ternary, `&&`).
**Explanation:** Example: show loading spinner while fetching, then show content or error block.

### 24) Why split components into smaller pieces?
**Theory:** Modularity improves maintainability and testability.
**Answer:** Smaller components are easier to understand, reuse, test, and optimize.
**Explanation:** Large "god components" are hard to reason about and increase bug risk during changes.

### 25) How would you optimize a slow React component?
**Theory:** Performance work should be evidence-driven.
**Answer:** First profile bottleneck, then optimize with memoization, reduced rerenders, list virtualization, and efficient state placement.
**Explanation:** Do not apply `useMemo` everywhere blindly; measure before/after to validate impact.

---

## JavaScript (Q26-Q50)

### 26) What is hoisting in JavaScript?
**Theory:** JS execution has creation and execution phases.
**Answer:** Hoisting is JS behavior where declarations are processed before code execution. `var` is hoisted as `undefined`; `let/const` are hoisted but in TDZ.
**Explanation:** Function declarations are fully hoisted, so they can be called before their definition line.

### 27) Difference between `var`, `let`, `const`?
**Theory:** Variable declaration mode affects scope/reassignment/temporal dead zone.
**Answer:** `var` is function-scoped and re-declarable; `let` is block-scoped and reassignable; `const` is block-scoped and not reassignable.
**Explanation:** Prefer `const` by default, `let` when reassignment needed, avoid `var` in modern code.

### 28) What is closure?
**Theory:** Functions keep access to outer lexical environment.
**Answer:** Closure is when inner function remembers variables from outer scope even after outer function returns.
**Explanation:** Useful for data privacy, factory functions, memoization, but can retain memory if misused.

### 29) What is lexical scope?
**Theory:** Scope is determined by where code is written, not where executed.
**Answer:** Lexical scope means function can access variables from its own scope and parent scopes based on code structure.
**Explanation:** This is why closures work: scope chain is fixed at definition time.

### 30) Explain `this` keyword in JS.
**Theory:** `this` depends on invocation context.
**Answer:** `this` refers to different objects depending on call style: method call object, standalone in strict mode `undefined`, arrow function inherits surrounding `this`.
**Explanation:** `bind`, `call`, `apply` explicitly control `this`.

### 31) `==` vs `===`?
**Theory:** Equality can involve coercion.
**Answer:** `==` performs type coercion before comparison; `===` checks type and value without coercion.
**Explanation:** Prefer `===` to avoid surprising conversions and bugs.

### 32) What is the event loop?
**Theory:** JS is single-threaded for call stack execution but handles async via runtime queues.
**Answer:** Event loop continuously checks call stack and pushes queued callbacks (microtasks/macrotasks) when stack is empty.
**Explanation:** Promise callbacks (microtasks) run before timer callbacks (macrotasks) after current stack clears.

### 33) Promises: `pending`, `fulfilled`, `rejected`?
**Theory:** Promise models eventual completion/failure of async operation.
**Answer:** `pending` means not settled yet, `fulfilled` means resolved with value, `rejected` means failed with reason.
**Explanation:** `then` handles fulfillment, `catch` handles rejection, `finally` runs either way.

### 34) `async/await` vs `.then()`?
**Theory:** Both are promise-based async styles.
**Answer:** `async/await` is syntactic sugar over promises and often improves readability for sequential async flows.
**Explanation:** Error handling typically uses `try/catch`; parallel operations still need `Promise.all`.

### 35) What is Temporal Dead Zone (TDZ)?
**Theory:** `let/const` are hoisted but not initialized immediately.
**Answer:** TDZ is the time between entering scope and variable initialization where accessing `let/const` throws reference error.
**Explanation:** This prevents accidental use before declaration.

### 36) What are higher-order functions?
**Theory:** Functions are first-class values in JS.
**Answer:** Higher-order function takes function as argument or returns function.
**Explanation:** Examples: `map`, `filter`, `reduce`, custom middleware wrappers.

### 37) What does `map` do?
**Theory:** Functional array transforms avoid manual mutation loops.
**Answer:** `map` returns a new array where each element is transformed by callback.
**Explanation:** Non-mutating and ideal for value transformation pipelines.

### 38) What does `filter` do?
**Theory:** Selecting subset from collection is common.
**Answer:** `filter` returns new array with elements for which callback returns truthy.
**Explanation:** Does not mutate original array; used for search and condition-based UI lists.

### 39) What does `reduce` do?
**Theory:** Aggregation often needs one pass over array.
**Answer:** `reduce` accumulates array items into one result (number/object/array/etc.) using accumulator callback.
**Explanation:** Used for sums, grouping, flattening, frequency maps.

### 40) What is immutability and why useful?
**Theory:** Predictable state transitions simplify debugging and change detection.
**Answer:** Immutability means not modifying original data; instead create new updated copies.
**Explanation:** Essential in React state patterns and improves traceability for bugs.

### 41) Shallow copy vs deep copy?
**Theory:** Copy depth affects nested references.
**Answer:** Shallow copy duplicates top-level fields only; nested objects remain shared references. Deep copy clones nested data too.
**Explanation:** Spread operator is shallow. Incorrect copy depth causes accidental mutation bugs.

### 42) What is debouncing?
**Theory:** Rapid events (typing/resize) can trigger expensive calls repeatedly.
**Answer:** Debouncing delays function execution until events stop for specified interval.
**Explanation:** Typical use: search input API calls after user stops typing.

### 43) What is throttling?
**Theory:** Some handlers should run at controlled rate, not for every event.
**Answer:** Throttling ensures function runs at most once per time interval.
**Explanation:** Typical use: scroll/resize handlers for performance.

### 44) Explain `call`, `apply`, and `bind`.
**Theory:** JS function context can be explicitly controlled.
**Answer:** `call` invokes immediately with args list; `apply` invokes immediately with args array; `bind` returns new function with bound context.
**Explanation:** Useful for method borrowing and callback context stability.

### 45) What is destructuring?
**Theory:** Cleaner syntax improves readability and reduces boilerplate.
**Answer:** Destructuring extracts values from arrays/objects into variables.
**Explanation:** Common in React props/state handling and function parameters.

### 46) What are rest and spread operators?
**Theory:** Modern JS uses flexible syntax for arrays/objects/functions.
**Answer:** Spread (`...`) expands iterable/object fields; rest (`...`) collects remaining items into array/object.
**Explanation:** Spread for copies/merging, rest for variable arguments and object field exclusion.

### 47) What is optional chaining and nullish coalescing?
**Theory:** Safe access patterns reduce runtime errors from null/undefined.
**Answer:** Optional chaining (`?.`) safely reads nested values; nullish coalescing (`??`) provides fallback only for `null`/`undefined`.
**Explanation:** Better than `||` when `0` or empty string are valid values.

### 48) What is a pure function?
**Theory:** Functional predictability reduces side-effect bugs.
**Answer:** Pure function returns same output for same input and has no side effects.
**Explanation:** Pure functions are easy to test and reason about, great for reducers and utilities.

### 49) What is memoization?
**Theory:** Repeated expensive computation can be cached.
**Answer:** Memoization stores results of function calls and reuses them for same inputs.
**Explanation:** Improves performance when inputs repeat; trade-off is extra memory usage.

### 50) How would you approach debugging a frontend bug?
**Theory:** Structured debugging is an interview signal, not just fixing quickly.
**Answer:** Reproduce reliably, isolate scope, inspect logs/state/network, form hypothesis, test fix, verify edge cases, prevent regression.
**Explanation:** Interviewers value methodical process and communication as much as final fix.

---

## Self-Verification for Phase 2

- [ ] Answer at least 35/50 questions without notes.
- [ ] Explain each "why", not only definitions.
- [ ] Solve 6 related coding tasks (arrays/strings/maps/effects bugs).
- [ ] Revisit all `Weak` questions within 48 hours.

---

## Code Examples (Q1-Q50)

### Q1
```jsx
function List({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.label}</li>)}</ul>;
}
```

### Q2
```jsx
function Button({ label }) {
  return <button>{label}</button>;
}

function Demo() {
  const [label, setLabel] = React.useState("Save");
  return (
    <>
      <Button label={label} />
      <button onClick={() => setLabel("Save now")}>Update label</button>
    </>
  );
}
```

### Q3
```jsx
function Child({ title }) { // props
  const [count, setCount] = React.useState(0); // state
  return <button onClick={() => setCount(count + 1)}>{title}: {count}</button>;
}
```

### Q4
```jsx
function Child({ user, onChangeName }) {
  // Bad: user.name = "X"
  return <button onClick={() => onChangeName("X")}>Rename</button>;
}
```

### Q5
```jsx
const [count, setCount] = React.useState(0);
setCount(c => c + 1);
```

### Q6
```jsx
React.useEffect(() => {
  document.title = "Dashboard";
}, []);
```

### Q7
```jsx
React.useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

### Q8
```jsx
const [n, setN] = React.useState(0);
React.useEffect(() => {
  setN(n + 1); // infinite loop pattern
}, [n]);
```

### Q9
```jsx
items.map(item => <Row key={item.id} item={item} />);
```

### Q10
```jsx
function Parent() {
  const [value, setValue] = React.useState("");
  return <>
    <Input value={value} onChange={setValue} />
    <Preview value={value} />
  </>;
}
```

### Q11
```jsx
// Controlled
<input value={name} onChange={e => setName(e.target.value)} />

// Uncontrolled
const ref = React.useRef(null);
<input ref={ref} defaultValue="John" />
```

### Q12
```jsx
const AuthContext = React.createContext(null);
function App() {
  return <AuthContext.Provider value={{ user: "Lelya" }}><Profile /></AuthContext.Provider>;
}
```

### Q13
```jsx
// Context for rare updates (theme)
const ThemeContext = React.createContext("light");
```

### Q14
```jsx
const Row = React.memo(function Row({ text }) {
  return <div>{text}</div>;
});
```

### Q15
```jsx
const total = React.useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);
const onClick = React.useCallback(() => save(total), [total]);
```

### Q16
```jsx
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

### Q17
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? <h1>Oops</h1> : this.props.children; }
}
```

### Q18
```jsx
setCount(count + 1);
console.log(count); // old value in same sync block
```

### Q19
```jsx
// prop drilling
<A user={user} />
// A -> B -> C pass user repeatedly
```

### Q20
```jsx
// Bad
if (flag) React.useEffect(() => {}, []);
// Good
React.useEffect(() => { if (flag) doSomething(); }, [flag]);
```

### Q21
```jsx
React.useEffect(() => {
  const id = setInterval(() => console.log(count), 1000); // stale if deps wrong
  return () => clearInterval(id);
}, []); // should include count or use ref
```

### Q22
```jsx
const inputRef = React.useRef(null);
React.useEffect(() => inputRef.current?.focus(), []);
```

### Q23
```jsx
if (loading) return <Spinner />;
if (error) return <ErrorBox />;
return <DataView />;
```

### Q24
```jsx
function UserHeader({ user }) {
  return <h2>{user.name}</h2>;
}

function UserStats({ user }) {
  return <p>Score: {user.score}</p>;
}

function UserPage({ user }) {
  return (
    <section>
      <UserHeader user={user} />
      <UserStats user={user} />
    </section>
  );
}
```

### Q25
```jsx
// Example optimization
const visible = React.useMemo(() => heavyFilter(items, query), [items, query]);
```

### Q26
```js
console.log(a); // undefined
var a = 5;
```

### Q27
```js
let x = 1; x = 2;
const y = 3; // y = 4 -> error
```

### Q28
```js
function outer() {
  let count = 0;
  return () => ++count;
}
```

### Q29
```js
const x = 1;
function f() {
  const y = 2;
  return x + y;
}
```

### Q30
```js
const obj = { n: 5, show() { return this.n; } };
const fn = obj.show;
fn(); // undefined in strict mode
```

### Q31
```js
0 == false;  // true
0 === false; // false
```

### Q32
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D"); // A D C B
```

### Q33
```js
new Promise((resolve) => resolve("ok"))
  .then(v => console.log(v))
  .catch(e => console.error(e))
  .finally(() => console.log("done"));
```

### Q34
```js
async function load() {
  try { const data = await fetch("/api"); }
  catch (e) { console.error(e); }
}
```

### Q35
```js
{
  // console.log(a); // TDZ error
  let a = 10;
}
```

### Q36
```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // map is higher-order
```

### Q37
```js
const out = [1, 2, 3].map(n => n + 1); // [2,3,4]
```

### Q38
```js
const out = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2,4]
```

### Q39
```js
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
```

### Q40
```js
const user = { name: "A", age: 20 };
const updated = { ...user, age: 21 }; // immutable update
```

### Q41
```js
const a = { nested: { n: 1 } };
const shallow = { ...a };
shallow.nested.n = 2; // affects a.nested.n too
```

### Q42
```js
function debounce(fn, ms) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
}
```

### Q43
```js
function throttle(fn, ms) {
  let last = 0;
  return (...args) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...args); } };
}
```

### Q44
```js
function hi(city) { return `${this.name} from ${city}`; }
const u = { name: "Lelya" };
hi.call(u, "TLV");
hi.apply(u, ["TLV"]);
const bound = hi.bind(u);
```

### Q45
```js
const user = { name: "Ann", age: 21 };
const { name } = user;
const [first] = [10, 20];
```

### Q46
```js
const arr = [1, 2];
const copy = [...arr, 3];
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
```

### Q47
```js
const city = user?.address?.city ?? "Unknown";
```

### Q48
```js
const add = (a, b) => a + b; // pure
```

### Q49
```js
function memoFib() {
  const cache = {};
  return function fib(n) {
    if (n <= 1) return n;
    if (cache[n]) return cache[n];
    return (cache[n] = fib(n - 1) + fib(n - 2));
  };
}
```

### Q50
```js
async function debugFetchUsers() {
  try {
    console.time("users-request");
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("users loaded", { count: data.length });
    console.timeEnd("users-request");
    return data;
  } catch (err) {
    console.error("users request failed", err);
    throw err;
  }
}
```
