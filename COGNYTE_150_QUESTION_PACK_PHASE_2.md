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

---

## React Fundamentals Extension (Q151-Q165)

### 151) What is JSX and why do we use it in React?
**Theory:** React UIs are declared with component trees, and JSX makes that tree readable.
**Answer:** JSX is a syntax extension that lets you write HTML-like markup inside JavaScript, which React compiles to `React.createElement` calls.
**Explanation:** JSX improves readability and keeps UI + logic close. It is not required, but it is the standard in React projects.
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

### 152) Why does React require a single root element in returned JSX?
**Theory:** Components return one JavaScript expression.
**Answer:** JSX return must be one parent node so React receives a single tree root for reconciliation.
**Explanation:** Use `Fragment` when you do not want extra DOM wrappers.
```jsx
function Card() {
  return (
    <>
      <h2>Title</h2>
      <p>Body</p>
    </>
  );
}
```

### 153) What is the difference between functional and class components today?
**Theory:** React evolved from class-based lifecycle APIs to hooks.
**Answer:** Functional components with hooks are now the default; class components still work but are less common in new code.
**Explanation:** Most modern codebases and interview tasks use functional components.
```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 154) How do you pass data from child to parent in React?
**Theory:** Data flow is top-down, so child notifies parent via callback.
**Answer:** Parent passes a function prop; child calls it with payload.
**Explanation:** This preserves one-way data flow while allowing upward events.
```jsx
function Parent() {
  const [value, setValue] = React.useState("");
  return <Child onSend={setValue} />;
}
function Child({ onSend }) {
  return <button onClick={() => onSend("from child")}>Send</button>;
}
```

### 155) How do you conditionally apply CSS classes in React?
**Theory:** UI state often controls styling.
**Answer:** Build className dynamically with ternary expressions or helper utilities.
**Explanation:** Keeps style behavior explicit and easy to test.
```jsx
function StatusBadge({ ok }) {
  const className = ok ? "badge badge-success" : "badge badge-error";
  return <span className={className}>{ok ? "OK" : "Error"}</span>;
}
```

### 156) Why should list keys be stable and unique?
**Theory:** Reconciliation uses keys to track identity across renders.
**Answer:** Stable keys help React preserve component state and avoid incorrect reordering effects.
**Explanation:** Index keys can cause bugs when list order changes.
```jsx
function TodoList({ todos }) {
  return <ul>{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}</ul>;
}
```

### 157) What is a custom hook and when should you create one?
**Theory:** Repeated stateful logic should be reusable.
**Answer:** A custom hook is a function starting with `use` that encapsulates reusable hook logic.
**Explanation:** It improves maintainability and keeps components focused.
```jsx
function useToggle(initial = false) {
  const [value, setValue] = React.useState(initial);
  const toggle = React.useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

### 158) How do you prevent unnecessary API calls in `useEffect`?
**Theory:** Effects rerun when dependencies change.
**Answer:** Keep dependency array accurate and guard conditions before fetching.
**Explanation:** Also abort in-flight requests on cleanup.
```jsx
React.useEffect(() => {
  if (!query) return;
  const controller = new AbortController();
  fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
  return () => controller.abort();
}, [query]);
```

### 159) What is the difference between `onChange` and `onSubmit` in forms?
**Theory:** Form UX needs real-time updates and final submission events.
**Answer:** `onChange` updates local state per input change; `onSubmit` handles final form submit.
**Explanation:** Typical pattern is controlled input + prevent default submit.
```jsx
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const handleSubmit = (e) => { e.preventDefault(); console.log(email); };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 160) How do you share state between sibling components?
**Theory:** Siblings should not own duplicate source-of-truth state.
**Answer:** Move shared state to common parent and pass via props.
**Explanation:** This is the "lift state up" pattern for consistent UI.
```jsx
function Dashboard() {
  const [filter, setFilter] = React.useState("all");
  return (
    <>
      <Filter value={filter} onChange={setFilter} />
      <Results filter={filter} />
    </>
  );
}
```

### 161) What is the purpose of `React.StrictMode` in development?
**Theory:** Dev mode should expose unsafe side-effects early.
**Answer:** `StrictMode` enables additional checks/warnings and may intentionally double-invoke some lifecycle paths in dev.
**Explanation:** It helps catch side-effect bugs before production.
```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 162) How do you handle empty, loading, and error UI states?
**Theory:** Good frontend UX requires explicit async state handling.
**Answer:** Model each state separately and render the correct fallback.
**Explanation:** Avoids ambiguous or blank screens.
```jsx
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
if (items.length === 0) return <p>No results found.</p>;
return <List items={items} />;
```

### 163) Why use `useReducer` instead of multiple `useState` calls?
**Theory:** Complex transitions are easier with explicit action-driven updates.
**Answer:** `useReducer` centralizes state transitions and makes updates predictable.
**Explanation:** Useful when multiple fields change together.
```jsx
function reducer(state, action) {
  switch (action.type) {
    case "inc": return { ...state, count: state.count + 1 };
    case "reset": return { count: 0 };
    default: return state;
  }
}
const [state, dispatch] = React.useReducer(reducer, { count: 0 });
```

### 164) How do you memoize derived values safely?
**Theory:** Derived calculations can be expensive on frequent renders.
**Answer:** Use `useMemo` and include all dependencies used in the calculation.
**Explanation:** Incorrect dependency arrays produce stale bugs.
```jsx
const filtered = React.useMemo(() => {
  return users.filter(u => u.name.toLowerCase().includes(term.toLowerCase()));
}, [users, term]);
```

### 165) How do you debug excessive re-renders in a React component?
**Theory:** Performance debugging starts with measurement and render tracing.
**Answer:** Use React DevTools Profiler, inspect props/state changes, and memoize only where it helps.
**Explanation:** Fix root cause first (state placement, unstable callbacks, object literals in props).
```jsx
const onSelect = React.useCallback((id) => {
  setSelectedId(id);
}, []);

const rows = React.useMemo(() => buildRows(data), [data]);
```

---

## React State Management Extension (Q201-Q212)

### 201) When do you choose `useReducer` over `useState` in an interview answer?
**Theory:** Interviewers want a decision rule, not a definition.
**Answer:** Prefer `useReducer` when multiple state fields update together from a small set of actions, or when next state depends on complex previous state.
**Explanation:** `useState` stays best for independent simple values.
```jsx
const [state, dispatch] = React.useReducer(reducer, { step: 1, error: null });
```

### 202) How do you avoid unnecessary Context re-renders?
**Theory:** Context updates re-render all consumers of that context.
**Answer:** Split contexts by concern, keep values stable (memoize object/function providers), or move state closer to leaves.
**Explanation:** Big single context objects cause broad rerenders.
```jsx
const ThemeCtx = React.createContext("light");
const UserCtx = React.createContext(null);
```

### 203) What is “prop drilling” and when is Context the right fix?
**Theory:** Passing props through many layers is verbose and couples intermediates.
**Answer:** Prop drilling is threading props through components that do not use them; Context helps for widely needed data (theme, auth snapshot) with few updates.
**Explanation:** Avoid Context for high-frequency granular updates across huge trees.
```jsx
// Drilling: A->B->C only C needs user
<C user={user} />
```

### 204) Why should you not put short-lived UI-only state in global Context?
**Theory:** Global state makes local concerns global.
**Answer:** Local modal open/expand flags should stay in the component that owns the UI to limit rerender scope and simplify reasoning.
**Explanation:** Context is for cross-cutting concerns, not every `useState`.
```jsx
const [open, setOpen] = React.useState(false); // local modal
```

### 205) How does React 18 automatic batching affect multiple `setState` calls?
**Theory:** Fewer intermediate renders improve performance; mental model matters in interviews.
**Answer:** React may batch multiple `setState` calls in the same event tick into one render (including async cases in many setups).
**Explanation:** Do not rely on seeing every intermediate render during async flows without understanding batching.
```jsx
function save() {
  setSaving(true);
  setError(null); // often batched with setSaving in React 18
}
```

### 206) Can you pass `setState` down as a prop and is that idiomatic?
**Theory:** Parent owns state and passes updater to child.
**Answer:** Yes, parent passes `setX` or more often a wrapper callback for clearer API.
**Explanation:** Idiomatic when child needs a narrow action (`onIncrement`) rather than raw `setState`.
```jsx
<Counter value={n} onChange={setN} />
```

### 207) What is “derived state” and a common mistake?
**Theory:** Duplicating props in state causes stale UI bugs.
**Answer:** Derived state can be computed during render from props/state; storing a copy in state often desyncs unless you truly need a fork.
**Explanation:** Interview classic: `useState(props.value)` without controlled pattern.
```jsx
// Prefer: const total = items.reduce((s,i)=>s+i.price,0)
```

### 208) How do custom hooks help reuse stateful logic?
**Theory:** Hooks compose logic across components.
**Answer:** Extract repeated state+effect patterns into `useSomething` functions and share them.
**Explanation:** Keeps components smaller and improves testability of logic in isolation.
```jsx
function useCounter(init = 0) {
  const [n, setN] = React.useState(init);
  const inc = () => setN(x => x + 1);
  return { n, inc };
}
```

### 209) When might a junior mention Redux (or similar) in an interview?
**Theory:** Interviewers probe when global store beats Context.
**Answer:** Mention for large apps needing predictable updates, devtools/time-travel, middleware for side effects, or many distant components reading/writing related slices.
**Explanation:** Junior answer stays honest: “team standard + middleware needs,” not buzzwords only.
```txt
Context for theme/auth snapshot; Redux-like stores when actions are complex and widespread.
```

### 210) What is a state “colocation” principle?
**Theory:** State should live as close as possible to where it is used.
**Answer:** Prefer lifting only as far as needed so fewer components subscribe to changes.
**Explanation:** Improves performance and simplicity versus premature global state.
```jsx
// Filter state lives in list feature component, not root App, when possible
```

### 211) How do you reset local state when a `key` changes?
**Theory:** Changing `key` remounts subtree—clears state intentionally.
**Answer:** Put `key={userId}` on a child to force remount when user changes.
**Explanation:** Useful instead of fragile `useEffect` resets.
```jsx
<Editor key={selectedId} />
```

### 212) Explain one-way data flow in React in one sentence for interviews.
**Theory:** Predictability for large teams.
**Answer:** Data flows down as props/state; user intent flows up via callbacks/events to owners who update state.
**Explanation:** Contrast briefly with two-way binding frameworks if asked.
```jsx
<Child value={v} onChange={setV} />
```

---

## React performance, rendering, and forms (Day 8 interview set, Q308-Q332)

### 308) When should you wrap a component with `React.memo`?
**Theory:** Re-rendering every parent update can waste work for expensive or wide pure subtrees.
**Answer:** Use `memo` when props are comparatively stable and render cost is meaningful; skip it when children always receive new object/function props unless parents stabilize them.
**Explanation:** `memo` is a shallow prop compare—it does not stop renders if you pass inline `{}` or lambdas each render.
```jsx
export const Row = React.memo(function Row({ title, onSelect }) {
  return <button type="button" onClick={() => onSelect(title)}>{title}</button>;
});
```

### 309) What problem does `useMemo` solve—and when is it overkill?
**Theory:** Referential identity and heavy pure calculations matter for `memo`/`useEffect` dependencies.
**Answer:** `useMemo` memoizes a computed value across renders when deps unchanged; skip for trivial math/strings—measure or wait for real hotspots.
**Explanation:** Interviewers want “don’t optimize by default.”
```jsx
const sorted = React.useMemo(() => items.slice().sort((a, b) => a.p - b.p), [items]);
```

### 310) When do you need `useCallback`?
**Theory:** Child components optimized with `memo` depend on stable function props.
**Answer:** Stabilize callbacks passed to memoized children or listed in other hooks’ dependency arrays when referential equality matters.
**Explanation:** Unnecessary `useCallback` everywhere adds noise without `memo` consumers.
```jsx
const onSave = React.useCallback(() => doSave(id), [id]);
return <MemoRow id={id} onSave={onSave} />;
```

### 311) How can `useCallback` still see a “stale” value?
**Theory:** Closures capture values from render when the callback was created.
**Answer:** If dependencies omit changing values, callback uses stale state; fix dependency list or functional updates (`setS(s => …)`).
**Explanation:** This ties directly to ESLint `react-hooks/exhaustive-deps` discussions.
```jsx
// Bug: missing count in deps
const inc = React.useCallback(() => setCount(count + 1), []);
```

### 312) What does `React.memo` compare, and what breaks it?
**Theory:** Shallow comparison only.
**Answer:** New array/object/function references each render always fail shallow compare—even if contents are “equal.”
**Explanation:** Fix upstream: stable props or lift derived data to parent with `useMemo`.
```jsx
<MemoList items={items} /> // ok if parent reuses same items ref when unchanged
<MemoList items={items.filter(x => x.ok)} /> // often new array each time
```

### 313) Why prefer computing Derived values during render instead of mirroring in state?
**Theory:** Duplicated state is a common junior bug.
**Answer:** If value can be computed from props/state without async lag, compute in render; store separately only when user edits a fork.
**Explanation:** Mention controlled “edit buffer” pattern vs pure derivation.
```jsx
const total = items.reduce((s, i) => s + i.price, 0);
```

### 314) How does `key` affect reconciliation for lists?
**Theory:** React matches fiber nodes across updates using keys.
**Answer:** Stable unique ids preserve state/DOM identity; index keys misbehave on reorder/filter causing lost focus/state bugs.
**Explanation:** Interview classic: “never key by array index for mutable lists.”
```jsx
{users.map(u => <Row key={u.id} user={u} />)}
```

### 315) What is the difference between controlled and uncontrolled inputs in React?
**Theory:** Source of truth placement.
**Answer:** Controlled: React state owns value; uncontrolled: DOM owns value, read via ref/events.
**Explanation:** Hybrid patterns exist but confuse debugging—pick one per field in interviews.
```jsx
<input value={email} onChange={e => setEmail(e.target.value)} />
```

### 316) How do you validate a controlled form at submit vs on change?
**Theory:** UX vs performance trade-off.
**Answer:** Validate on submit for short forms; on blur/on change with debounce for faster feedback; keep single validation function reused by both.
**Explanation:** Mention accessibility: tie errors to inputs with `aria-describedby`.
```jsx
const errs = validate(values);
if (Object.keys(errs).length) { setErrors(errs); return; }
```

### 317) What is a Field- vs Form-level error modeling approach?
**Theory:** Interviewers want structured error thinking.
**Answer:** Store errors keyed by field name (`Record<string,string>`) or array of issues; normalize server API errors into the same shape client-side.
**Explanation:** Mention mapping backend `400` validation payload to fields.
```jsx
setErrors({ email: "Invalid email" });
```

### 318) When should form state lift vs stay colocated?
**Theory:** Form ownership mirrors component ownership.
**Answer:** Lift when multiple siblings submit together or parent needs values; keep local when subtree is self-contained wizard step.
**Explanation:** Mention “single submit boundary” for clarity.
```jsx
<CheckoutPage email={email} setEmail={setEmail} />
```

### 319) What are two valid uses of `useRef` in forms and UI?
**Theory:** Refs escape React’s declarative render for stable mutable boxes or DOM.
**Answer:** Focus management (`inputRef.current?.focus()`), measuring DOM, storing timeout ids without rerender, or keeping latest value without triggering effect deps.
**Explanation:** Don’t store visual truth in ref alone when it should be in state for rendering.
```jsx
const inputRef = React.useRef(null);
React.useEffect(() => { inputRef.current?.focus(); }, []);
```

### 320) What does `flushSync` do (and why avoid it in most apps)?
**Theory:** React batches updates for performance.
**Answer:** `flushSync` forces synchronous DOM flush for rare measurement/integration cases; misuse hurts performance and can fight concurrent features.
**Explanation:** Junior answer: “know the name; use only with a measured reason.”
```jsx
import { flushSync } from 'react-dom';
flushSync(() => setFlag(true));
// read layout immediately after
```

### 321) What is `startTransition` used for in React 18+?
**Theory:** Keep UI responsive during heavy state updates.
**Answer:** Mark non-urgent state updates as transitions so React can keep the UI responsive and interruptible.
**Explanation:** Pair with deferred values when appropriate; don’t wrap truly urgent typing feedback.
```jsx
import { startTransition } from 'react';
startTransition(() => setFiltered(hugeFilter(query)));
```

### 322) When do you consider list virtualization?
**Theory:** Large DOM count hurts scroll/layout.
**Answer:** Thousands of rows/cards—virtualize so only visible window mounts (`react-window` / similar pattern).
**Explanation:** Mention “measure row height” complexity for variable-size lists.
```txt
Virtualize when rendering cost or DOM nodes dominate profiling.
```

### 323) When is `useLayoutEffect` appropriate in performance-sensitive UI?
**Theory:** It runs before browser paint after DOM mutations.
**Answer:** Measure layout or prevent visual flicker (sync scroll position); otherwise prefer `useEffect`.
**Explanation:** Overuse blocks paint—interviewers watch for abuse.
```jsx
React.useLayoutEffect(() => {
  const h = el.getBoundingClientRect().height;
  setHeight(h);
}, []);
```

### 324) How would you use React Profiler in an interview answer?
**Theory:** Prove optimization with data.
**Answer:** Profiler records commit cost per component; look for unexpected renders after interactions; combine with `why-did-you-render` mindset conceptually.
**Explanation:** Junior: “baseline commit time, change one thing, compare.”
```jsx
import { Profiler } from 'react';
<Profiler id="List" onRender={(id, phase,a,b,dur)=>console.log(dur)}><List /></Profiler>
```

### 325) What is automatic batching in React 18 and why care?
**Theory:** Fewer renders mean better performance.
**Answer:** Multiple `setState` calls in same event often batch to one render even in async handlers/timeouts in modern React.
**Explanation:** Affects expectations about intermediate UI states during debugging.
```jsx
function click() {
  setA(a=>a+1); setB(b=>b+1); // typically one render
}
```

### 326) Why can `children` props defeat `memo` on a wrapper?
**Theory:** Elements created in parent are new objects each render.
**Answer:** If parent passes `{children}` from inline JSX, wrapper may rerender whenever parent renders unless structure is stable—sometimes lift `memo` or stabilize composition.
**Explanation:** Mention explicit slot props vs raw `children` trade-offs.
```jsx
const Layout = React.memo(({ children }) => <div>{children}</div>);
// Parent still re-renders Layout when parent state changes; memo helps only if props shallow-equal
```

### 327) How do you reduce context-driven rerender noise?
**Theory:** Context updates rerender all consumers.
**Answer:** Split contexts by concern, pass memoized values, or use selector patterns/external stores for hot paths.
**Explanation:** Junior honest answer: “don’t put fast-changing data in mega-context.”
```jsx
const ThemeCtx = React.createContext('light');
const UserCtx = React.createContext(null);
```

### 328) How do `React.lazy` and `Suspense` fit a junior interview answer?
**Theory:** Code splitting improves initial load.
**Answer:** `lazy` loads component bundle on demand; `Suspense` fallback shows while loading; error boundaries cover lazy failures differently than suspense.
**Explanation:** Mention route-level split as common pattern.
```jsx
const Admin = React.lazy(() => import('./Admin'));
<Suspense fallback={<p>Loading…</p>}><Admin /></Suspense>
```

### 329) What do error boundaries catch—and what do they not catch?
**Theory:** Resilience boundaries.
**Answer:** Boundaries catch render/lifecycle errors in subtree—not async errors in event handlers unless rethrown to trigger render failure; not SSR-only nuances in depth for junior.
**Explanation:** Pair with `try/catch` in async code paths.
```jsx
class Boundary extends React.Component { /* getDerivedStateFromError */ }
```

### 330) Controlled file input caveats in React?
**Theory:** Security and DOM constraints.
**Answer:** File inputs are often read-only controlled for value; use refs or uncontrolled pattern to clear; rely on `onChange` for selection.
**Explanation:** Mention never uploading secrets to client logs.
```jsx
<input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
```

### 331) Why avoid passing inline style objects for rapidly updating lists?
**Theory:** Object identity and style recalculation.
**Answer:** Inline `style={{…}}` creates new object each render; for hot paths prefer classNames/CSS modules or memoized style reference.
**Explanation:** Practical interview: “profile first, then fix obvious churn.”
```jsx
<div className={flag ? 'active' : ''} />
```

### 332) What is the purpose of `displayName` on components?
**Theory:** Developer experience and debugging.
**Answer:** Sets readable name in React DevTools/stack traces for `memo`/anonymous HOC outputs.
**Explanation:** Especially for higher-order components and `forwardRef`.
```jsx
const Box = React.memo(function Box() { return null; });
Box.displayName = 'Box';
```
