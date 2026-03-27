# Cognyte React Day 2 Supplement (Q249-Q263)

Source rationale:
- Added from common junior React interview fundamentals frequently emphasized in official docs and interview prep material:
  - effects correctness and cleanup,
  - stale closures and dependency arrays,
  - controlled forms, refs, reducer/custom hooks,
  - race condition handling with AbortController.

These IDs are **249-263** so they load in Cognyte Mode alongside Phase 2 **Q151-Q165** (different prompts; no ID collision).

---

### 249) When should you NOT use `useEffect`?
**Theory:** Effects are for syncing with external systems, not for pure calculations.
**Answer:** Do not use `useEffect` for values that can be directly derived from props/state during render.
**Explanation:** Derived values belong in render or `useMemo`; unnecessary effects add complexity and rerenders.
```jsx
function Price({ items }) {
  const total = items.reduce((sum, i) => sum + i.price, 0); // no effect needed
  return <p>Total: {total}</p>;
}
```

### 250) How do you prevent fetch race conditions in React?
**Theory:** Older request can finish after newer one and overwrite state.
**Answer:** Use `AbortController` and abort previous request in cleanup.
**Explanation:** Keeps only latest request active.
```jsx
React.useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setResults)
    .catch(e => { if (e.name !== 'AbortError') setError(e.message); });
  return () => controller.abort();
}, [query]);
```

### 251) How do you track previous prop/state value?
**Theory:** `useRef` persists across renders without rerendering.
**Answer:** Store current value in ref inside effect, read old value before update.
**Explanation:** Useful for comparing transitions.
```jsx
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}
```

### 252) What is a custom Hook and why use it?
**Theory:** Repeated stateful logic should be extracted.
**Answer:** Custom Hook is a function starting with `use` that reuses hook logic across components.
**Explanation:** Keeps components focused and testable.
```jsx
function useToggle(initial = false) {
  const [on, setOn] = React.useState(initial);
  const toggle = React.useCallback(() => setOn(v => !v), []);
  return [on, toggle];
}
```

### 253) When prefer `useReducer` over `useState`?
**Theory:** Complex state transitions benefit from explicit action-driven logic.
**Answer:** Prefer `useReducer` when state has multiple related fields and update paths.
**Explanation:** Improves predictability and testability.
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'setName': return { ...state, name: action.payload };
    case 'setEmail': return { ...state, email: action.payload };
    default: return state;
  }
}
```

### 254) What is prop drilling alternative besides Context?
**Theory:** Composition can reduce coupling without global context.
**Answer:** Use component composition (children/render props) to pass capabilities, not raw data through many layers.
**Explanation:** Often simpler than introducing global state too early.
```jsx
function Layout({ header, content }) {
  return <>{header}{content}</>;
}
```

### 255) How to avoid rerenders caused by unstable object props?
**Theory:** New object/function references break memoization.
**Answer:** Memoize objects/functions with `useMemo`/`useCallback`.
**Explanation:** Keeps child props referentially stable.
```jsx
const options = React.useMemo(() => ({ pageSize: 20, sort }), [sort]);
```

### 256) Controlled form best practice for multiple inputs?
**Theory:** Single source of truth keeps forms predictable.
**Answer:** Store form object in state and update by input name.
**Explanation:** Scales well for junior-to-mid forms.
```jsx
const [form, setForm] = React.useState({ email: '', password: '' });
const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
```

### 257) Why is key placement important with extracted components?
**Theory:** Keys are used by parent array mapping.
**Answer:** Put `key` where you map list items, not inside child component internals.
**Explanation:** React needs keys in list creation context.
```jsx
items.map(item => <Row key={item.id} item={item} />);
```

### 258) What is lazy state initialization in `useState`?
**Theory:** Expensive init should run once.
**Answer:** Pass function to `useState` so initial computation runs only on first render.
**Explanation:** Avoids repeated heavy work.
```jsx
const [data] = React.useState(() => heavyParse(initialJson));
```

### 259) How do you reset component state intentionally?
**Theory:** Changing key forces remount.
**Answer:** Use a changing `key` to remount component when you need full state reset.
**Explanation:** Useful for form/session restart.
```jsx
<Quiz key={sessionId} />
```

### 260) What is batching in React updates?
**Theory:** React groups updates for performance.
**Answer:** Multiple state updates in the same event are batched into one render cycle.
**Explanation:** Improves performance and consistency.
```jsx
function handleClick() {
  setA(v => v + 1);
  setB(v => v + 1); // usually one render in same event
}
```

### 261) How to safely update state from async callback?
**Theory:** Component may unmount before callback resolves.
**Answer:** Use cleanup guard or abort pattern before setting state.
**Explanation:** Prevents setState-on-unmounted patterns.
```jsx
React.useEffect(() => {
  let active = true;
  fetch('/api/user').then(r => r.json()).then(d => { if (active) setUser(d); });
  return () => { active = false; };
}, []);
```

### 262) What is the difference between `useEffect` and `useLayoutEffect`?
**Theory:** They run at different times relative to paint.
**Answer:** `useEffect` runs after paint; `useLayoutEffect` runs synchronously after DOM mutations before paint.
**Explanation:** Use layout effect only when DOM measurement/mutation before paint is required.
```jsx
React.useLayoutEffect(() => {
  const width = ref.current?.getBoundingClientRect().width;
  setWidth(width || 0);
}, []);
```

### 263) How would you explain React rendering to an interviewer?
**Theory:** Interviewers test conceptual clarity, not buzzwords.
**Answer:** Render is a pure calculation from state/props to UI description; commit applies actual DOM changes.
**Explanation:** State/props changes schedule render, reconciliation computes diff, then commit updates DOM.
```jsx
function Counter() {
  const [n, setN] = React.useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
```
