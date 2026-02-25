# React - Interview Questions

> **Note**: For practical implementation examples, see [projects.md](./projects.md) which contains complete mini-projects including Todo App, Custom Hooks, Form Validation, Context API, and Infinite Scroll.

## Basic Questions (1-25)

### 1. What is React? What are its main features?
**Answer:** React is a JavaScript library for building user interfaces. Main features:
- Component-based architecture
- Virtual DOM for performance
- Unidirectional data flow
- JSX syntax
- Hooks for state management
- Large ecosystem

### 2. What is JSX? How is it different from HTML?
**Answer:** JSX is a syntax extension that allows writing HTML-like code in JavaScript. Differences:
- Must use `className` instead of `class`
- Must use `htmlFor` instead of `for`
- Self-closing tags must be closed
- Can embed JavaScript expressions with `{}`
- Must return single parent element (or Fragment)

### 3. Explain the difference between functional and class components.
**Answer:**
- **Functional Components**: Use functions, modern approach, use hooks for state
- **Class Components**: Use ES6 classes, older approach, use lifecycle methods

### 4. What are props? How do you pass data between components?
**Answer:** Props (properties) are read-only data passed from parent to child components. Passed as attributes: `<Child name="John" />`, accessed as `props.name` or destructured.

### 5. What is state in React? How do you update it?
**Answer:** State is component's internal data that can change over time. Updated using `setState()` in class components or `useState()` hook in functional components. State updates are asynchronous and batched.

### 6. Explain the difference between props and state.
**Answer:**
- **Props**: Passed from parent, read-only, external data
- **State**: Internal to component, can be modified, triggers re-renders

### 7. What are React Hooks? Name the most common ones.
**Answer:** Hooks are functions that let you use state and lifecycle features in functional components. Common hooks:
- `useState`: Manage state
- `useEffect`: Handle side effects
- `useContext`: Access context
- `useReducer`: Complex state
- `useMemo`: Memoize values
- `useCallback`: Memoize functions

### 8. Explain the useEffect hook. What are its dependencies?
**Answer:** `useEffect` handles side effects (API calls, subscriptions, DOM manipulation). Dependencies array controls when effect runs:
- Empty `[]`: Runs once on mount
- No array: Runs on every render
- `[dep1, dep2]`: Runs when dependencies change

### 9. What is the Virtual DOM? How does it work?
**Answer:** Virtual DOM is JavaScript representation of real DOM. React creates virtual DOM tree, compares with previous version (diffing), and updates only changed parts in real DOM (reconciliation).

### 10. What are keys in React? Why are they important?
**Answer:** Keys are unique identifiers for list items. They help React identify which items changed, were added, or removed, enabling efficient updates.

### 11. Explain React's component lifecycle (class components).
**Answer:**
- **Mounting**: `constructor` → `render` → `componentDidMount`
- **Updating**: `getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `componentDidUpdate`
- **Unmounting**: `componentWillUnmount`

### 12. What is conditional rendering? Show examples.
**Answer:** Rendering different UI based on conditions.

```javascript
// if/else
if (isLoggedIn) return <Dashboard />;
return <Login />;

// Ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical &&
{isLoggedIn && <Dashboard />}
```

### 13. How do you handle events in React?
**Answer:** Events are handled using camelCase props (onClick, onChange). In class components, need to bind `this` or use arrow functions. In functional components, just define handler function.

### 14. What are controlled and uncontrolled components?
**Answer:**
- **Controlled**: Form data handled by React state, value controlled by state
- **Uncontrolled**: Form data handled by DOM, use refs to access values

### 15. Explain the Context API. When would you use it?
**Answer:** Context API allows sharing data across component tree without prop drilling. Use when data needs to be accessed by many components at different nesting levels.

### 16. What is prop drilling? How do you avoid it?
**Answer:** Prop drilling is passing props through multiple component levels. Avoid using Context API, state management libraries (Redux), or component composition.

### 17. What is React.memo? When would you use it?
**Answer:** `React.memo` is a higher-order component that memoizes functional components, preventing re-renders if props haven't changed. Use for expensive components that receive same props frequently.

### 18. Explain useMemo and useCallback hooks.
**Answer:**
- **useMemo**: Memoizes expensive calculations, returns memoized value
- **useCallback**: Memoizes callback functions, returns memoized function

### 19. What are error boundaries? How do you implement them?
**Answer:** Error boundaries catch JavaScript errors in child components. Implemented as class components with `componentDidCatch` and `getDerivedStateFromError` methods.

### 20. What is code splitting? How do you implement it?
**Answer:** Code splitting splits code into smaller chunks loaded on demand. Implement using `React.lazy()` and `Suspense`:

```javascript
const LazyComponent = React.lazy(() => import('./Component'));
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### 21. Explain the difference between useState and useReducer.
**Answer:**
- **useState**: Simple state management, single value
- **useReducer**: Complex state management, multiple values, reducer pattern

### 22. What is a custom hook? How do you create one?
**Answer:** Custom hooks are functions that use other hooks to encapsulate reusable logic. Must start with "use" prefix:

```javascript
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  return [count, increment];
}
```

### 23. Explain React Router. How do you implement routing?
**Answer:** React Router enables navigation in React apps. Implement using `BrowserRouter`, `Routes`, `Route`, and `Link` components.

### 24. What is the difference between BrowserRouter and HashRouter?
**Answer:**
- **BrowserRouter**: Uses HTML5 history API, clean URLs
- **HashRouter**: Uses hash (#) in URL, works without server configuration

### 25. How do you optimize React performance?
**Answer:**
- Use React.memo for components
- Use useMemo and useCallback
- Code splitting and lazy loading
- Virtualize long lists
- Avoid unnecessary re-renders
- Use production build

## Intermediate Questions (26-50)

### 26. Explain the reconciliation algorithm in React.
**Answer:** Reconciliation is the process of updating DOM efficiently. React compares new virtual DOM tree with previous one, identifies differences (diffing), and updates only changed nodes.

### 27. What is the difference between useEffect and useLayoutEffect?
**Answer:**
- **useEffect**: Asynchronous, runs after paint, doesn't block
- **useLayoutEffect**: Synchronous, runs before paint, blocks visual updates

### 28. How do you handle forms in React?
**Answer:** Use controlled components with state, handle onChange events, validate input, and handle form submission with onSubmit.

### 29. Explain the difference between shallow and deep comparison in React.
**Answer:** React uses shallow comparison for props and state. Shallow comparison checks references, deep comparison checks values. Use deep comparison when needed with custom comparison functions.

### 30. What are Higher-Order Components (HOC)? Provide an example.
**Answer:** HOCs are functions that take a component and return a new component with additional functionality.

```javascript
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    if (!isAuthenticated) return <Login />;
    return <Component {...props} />;
  };
}
```

### 31. Explain the render props pattern.
**Answer:** Render props pattern passes a function as a prop that returns JSX. Component calls this function to render content.

### 32. What is the difference between React.PureComponent and React.Component?
**Answer:** `PureComponent` implements `shouldComponentUpdate` with shallow prop and state comparison, preventing unnecessary re-renders. `Component` always re-renders unless `shouldComponentUpdate` returns false.

### 33. How do you handle async operations in React?
**Answer:** Use `useEffect` hook with async functions, or use libraries like React Query, SWR for data fetching.

### 34. Explain React's unidirectional data flow.
**Answer:** Data flows down from parent to child via props. Events flow up from child to parent via callbacks. This makes data flow predictable and easier to debug.

### 35. What is the difference between useRef and useState?
**Answer:**
- **useRef**: Returns mutable object, doesn't trigger re-render, persists across renders
- **useState**: Returns state value and setter, triggers re-render on change

### 36. How do you test React components?
**Answer:** Use React Testing Library and Jest. Test user interactions, not implementation details. Use `render`, `screen`, and user events.

### 37. Explain React portals. When would you use them?
**Answer:** Portals render children into DOM node outside parent hierarchy. Used for modals, tooltips, dropdowns that need to escape parent overflow/z-index constraints.

### 38. What is the difference between React.createElement and JSX?
**Answer:** JSX is syntactic sugar for `React.createElement()`. JSX is transpiled to `React.createElement()` calls by Babel.

### 39. How do you handle side effects in React?
**Answer:** Use `useEffect` hook for side effects like API calls, subscriptions, DOM manipulation. Clean up side effects in return function.

### 40. Explain the difference between state and props in terms of immutability.
**Answer:** Both should be treated as immutable. Props are read-only. State should be updated immutably using setState or useState setter, never mutated directly.

### 41. What are React Fragments? Why use them?
**Answer:** Fragments let you group elements without adding extra DOM nodes. Use when you need to return multiple elements but don't want wrapper div.

### 42. How do you implement authentication in React?
**Answer:** Use Context API or state management for auth state, protect routes with HOC or components, store tokens securely, handle token refresh.

### 43. Explain the difference between componentDidMount and useEffect with empty dependencies.
**Answer:** Both run after component mounts. `componentDidMount` runs once in class components. `useEffect` with `[]` runs once in functional components.

### 44. What is the purpose of keys in React lists?
**Answer:** Keys help React identify which items changed, were added, or removed. They enable efficient updates and prevent bugs when list order changes.

### 45. How do you handle global state in React?
**Answer:** Use Context API for simple global state, or state management libraries (Redux, Zustand, Recoil) for complex state management.

### 46. Explain React's synthetic events.
**Answer:** Synthetic events are React's wrapper around native events. They provide consistent API across browsers and include event pooling for performance.

### 47. What is the difference between useCallback and useMemo?
**Answer:**
- **useCallback**: Returns memoized callback function
- **useMemo**: Returns memoized value from computation

### 48. How do you prevent unnecessary re-renders?
**Answer:**
- Use React.memo
- Use useMemo and useCallback
- Avoid creating objects/functions in render
- Use proper keys
- Optimize context usage

### 49. Explain React's batching mechanism.
**Answer:** React batches state updates for performance. Multiple setState calls in same event handler are batched into single update.

### 50. What are the rules of hooks?
**Answer:**
- Only call hooks at top level (not in loops, conditions, nested functions)
- Only call hooks from React functions (components or custom hooks)
- Hooks must be called in same order every render

## Advanced Questions (51-75)

### 51. Implement a custom useDebounce hook.
**Answer:**
```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
```

### 52. Implement a custom useFetch hook.
**Answer:**
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}
```

### 53. Implement a custom useLocalStorage hook.
**Answer:**
```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
```

### 54. Explain how React Fiber works.
**Answer:** React Fiber is reconciliation algorithm rewrite. It enables incremental rendering, prioritizes updates, and allows work to be split into chunks and paused/resumed.

### 55. Implement a Higher-Order Component for authentication.
**Answer:**
```javascript
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
}
```

### 56. Implement a custom useReducer hook for complex state.
**Answer:**
```javascript
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);
  
  const dispatch = (action) => {
    setState(prevState => reducer(prevState, action));
  };
  
  return [state, dispatch];
}
```

### 57. Explain React's concurrent features.
**Answer:** Concurrent features include Suspense, transitions, and automatic batching. They enable React to interrupt rendering for higher priority updates.

### 58. Implement a virtualized list component.
**Answer:** Use libraries like react-window or react-virtualized, or implement custom solution using windowing technique - only render visible items.

### 59. How do you implement server-side rendering with React?
**Answer:** Use Next.js or implement custom SSR with ReactDOMServer.renderToString(), handle hydration on client, manage state synchronization.

### 60. Explain React's error boundary implementation.
**Answer:**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 61. Implement a form validation hook.
**Answer:**
```javascript
function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (touched[name]) {
      setErrors({ ...errors, [name]: validate[name](value) });
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate[name](values[name]) });
  };
  
  return { values, errors, touched, handleChange, handleBlur };
}
```

### 62. Explain React's suspense and concurrent rendering.
**Answer:** Suspense lets components "wait" for something before rendering. Concurrent rendering allows React to interrupt work for higher priority updates.

### 63. Implement a context provider with reducer pattern.
**Answer:**
```javascript
const StateContext = createContext();
const DispatchContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
```

### 64. How do you optimize large React applications?
**Answer:**
- Code splitting and lazy loading
- Memoization (React.memo, useMemo, useCallback)
- Virtual scrolling for long lists
- Image optimization
- Bundle analysis and optimization
- Server-side rendering
- CDN for static assets

### 65. Explain React's reconciliation and diffing algorithm.
**Answer:** Reconciliation compares new virtual DOM with previous one. Diffing algorithm:
- Elements of different types: Replace old tree
- Same type: Update changed attributes
- Lists: Use keys to identify changes

### 66. Implement a custom hook for API calls with caching.
**Answer:**
```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cache = useRef({});
  
  useEffect(() => {
    if (cache.current[url]) {
      setData(cache.current[url]);
      setLoading(false);
      return;
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        cache.current[url] = data;
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}
```

### 67. Explain React's component composition patterns.
**Answer:**
- **Containment**: Using children prop
- **Specialization**: Components that specialize other components
- **HOCs**: Higher-order components
- **Render Props**: Functions as children
- **Hooks**: Custom hooks for logic sharing

### 68. How do you handle file uploads in React?
**Answer:** Use input type="file", handle onChange event, use FormData for multipart/form-data, show progress, validate file types and sizes.

### 69. Implement infinite scrolling with React.
**Answer:** Use Intersection Observer API or scroll events, detect when user reaches bottom, load more data, append to list.

### 70. Explain React's performance profiling tools.
**Answer:** React DevTools Profiler, React.memo, useMemo, useCallback, why-did-you-render library, Chrome DevTools Performance tab.

### 71. How do you implement drag and drop in React?
**Answer:** Use HTML5 drag and drop API or libraries like react-dnd, handle drag events, update state on drop.

### 72. Explain React's strict mode.
**Answer:** Strict mode enables additional checks and warnings. It identifies unsafe lifecycles, warns about legacy APIs, detects unexpected side effects.

### 73. Implement a custom hook for window size.
**Answer:**
```javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
```

### 74. How do you handle real-time updates in React?
**Answer:** Use WebSockets, Server-Sent Events, or polling. Manage connections in useEffect, update state on messages, clean up on unmount.

### 75. Explain React's new features (React 18+).
**Answer:**
- Automatic batching
- Concurrent features
- Transitions
- Suspense improvements
- New hooks (useId, useTransition, useDeferredValue)
- Server components

### 76. What is useId? When would you use it?
**Answer:** useId generates a unique ID stable across server and client (for SSR). Use for form labels (htmlFor/id), aria-describedby, or any DOM ID that must match between server and client to avoid hydration mismatch.

### 77. Explain useTransition and useDeferredValue.
**Answer:** useTransition marks state updates as non-urgent (transitions); UI stays responsive. useDeferredValue defers updating a value so you can show stale content while new content loads. Both help keep the UI responsive during heavy updates.

### 78. How do you implement React Server Components (RSC)?
**Answer:** In a framework that supports RSC (e.g. Next.js App Router): components are server by default; use "use client" for client components. Fetch data on server, pass as props; no useEffect for initial data in RSC.

### 79. What is the difference between createRoot and render in React 18?
**Answer:** createRoot is the new API (React 18); enables concurrent features. render (ReactDOM.render) is legacy and still works but does not use concurrent features. Prefer createRoot for new apps.

### 80. How do you handle loading and error states in React?
**Answer:** Use local state (useState) or status from data library (isLoading, error). Render loading UI (spinner/skeleton) when loading; error UI when error; data UI when success. Optional: Error Boundary for component tree errors.

### 81. What is the purpose of the key prop in list items?
**Answer:** Keys help React identify which items changed, were added, or removed. Use stable unique IDs (e.g. item.id), not array index (unless list is static). Prevents bugs and improves reconciliation performance.

### 82. Explain the difference between useEffect and componentDidMount.
**Answer:** useEffect with [] runs after paint (async); componentDidMount runs after first paint (sync). For layout measurement use useLayoutEffect. For cleanup, useEffect return function ≈ componentWillUnmount.

### 83. How do you share state between sibling components?
**Answer:** Lift state up to common parent and pass down as props. Or use Context for many consumers. Or global state (Redux, Zustand). Choose based on scope and how many components need the data.

### 84. What is the children prop? How do you use it?
**Answer:** children is the content between component tags: <Card>Hello</Card> → props.children is "Hello". Use for composition (layouts, wrappers). Can be single element, array, or render prop.

### 85. How do you avoid re-renders when passing callbacks to children?
**Answer:** Wrap callbacks in useCallback with correct dependencies. Or pass dispatch (stable) instead of inline handlers. React.memo on child prevents re-render when props are referentially equal.

### 86. What is the difference between defaultProps and default parameters?
**Answer:** defaultProps (class or function) set default for missing/undefined props. In function components you can use default parameters: function Comp({ name = 'Guest' }). Default params are preferred in modern React.

### 87. How do you implement a toggle (boolean) state?
**Answer:** const [on, setOn] = useState(false); setOn(prev => !prev); or setOn(!on). For toggling from events, use the functional update to avoid stale closure.

### 88. Explain the difference between ref and state.
**Answer:** ref: mutable object, changing it does not trigger re-render; use for DOM nodes, timers, previous value. state: changing it triggers re-render; use for data that affects UI.

### 89. How do you focus an input when a component mounts?
**Answer:** const inputRef = useRef(null); useEffect(() => { inputRef.current?.focus(); }, []); and ref={inputRef} on the input. useLayoutEffect if you need it before paint.

### 90. What is the purpose of React.StrictMode?
**Answer:** Highlights potential problems: double-invoking render and effects in dev, deprecated API usage, unsafe lifecycle. Use in development; no effect in production. Wrap app or part of tree.

### 91. How do you pass a ref to a custom component (forwardRef)?
**Answer:** const MyInput = forwardRef((props, ref) => <input ref={ref} {...props} />); Parent can pass a ref and control the inner input. useImperativeHandle to expose a custom handle instead of DOM node.

### 92. Explain useImperativeHandle. When would you use it?
**Answer:** Customize what ref.current is when using forwardRef. useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }), []); Use when parent needs to call methods on child (focus, scroll) rather than access DOM.

### 93. How do you handle form submission in React?
**Answer:** onSubmit on form; event.preventDefault(); read values from state (controlled) or refs (uncontrolled); validate; call API; update state or redirect. Optional: use a form library (React Hook Form, Formik).

### 94. What is the difference between createContext and useContext?
**Answer:** createContext(defaultValue) creates a context object. useContext(MyContext) reads the current value from the nearest Provider. Provider wraps tree and supplies value; consumers re-render when value changes.

### 95. How do you prevent form submission on Enter in a form?
**Answer:** In form onSubmit use e.preventDefault(). If you want Enter to do something else (e.g. submit only on button), handle onKeyDown and prevent default for Enter where needed.

### 96. Explain the difference between controlled and uncontrolled components.
**Answer:** Controlled: value and onChange from state; single source of truth. Uncontrolled: value from DOM (ref); use ref to read. Prefer controlled for validation and consistency; uncontrolled for simple or file input.

### 97. How do you implement a custom hook that subscribes to external data?
**Answer:** useEffect: subscribe in effect, return cleanup (unsubscribe). Store data in state and set in subscription callback. Handle loading/error. Example: useWindowSize, useOnlineStatus.

### 98. What is the purpose of the dependency array in useEffect?
**Answer:** It controls when the effect runs. []: once on mount. [a, b]: when a or b change. Omit: every render. Include every value from the effect that you use (exhaustive deps) to avoid stale closures.

### 99. How do you debug React re-renders?
**Answer:** React DevTools Profiler; log in render (or use why-did-you-render). Check unnecessary parent re-renders, missing memo/useCallback, or context value changing identity every render.

### 100. Explain the difference between useMemo and useCallback.
**Answer:** useMemo memoizes a computed value; useCallback memoizes a function. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use when passing to memoized children or as effect dependency.

### 101. How do you implement infinite scroll in React?
**Answer:** Use Intersection Observer (or scroll event) on a sentinel at the bottom. When visible, load next page and append to list. Use ref for sentinel; cleanup observer on unmount. Optional: virtual list for very long lists.

### 102. What is the difference between React.memo and useMemo?
**Answer:** React.memo wraps a component and skips re-render when props are shallowly equal. useMemo memoizes a value. Use memo for components; useMemo for expensive computations or stable references.

### 103. How do you handle file input in React?
**Answer:** Uncontrolled: <input type="file" ref={fileRef} />; read fileRef.current.files. Or controlled with state for file list. Validate type/size; use FormData to upload. Optional: drag-and-drop library.

### 104. Explain the difference between createPortal and rendering in place.
**Answer:** createPortal(component, container) renders component into a different DOM node (e.g. modal in document.body). Use for modals, tooltips. Same as "portals"; component still lives in React tree for context.

### 105. How do you use multiple contexts without nesting hell?
**Answer:** Compose providers: <AuthProvider><ThemeProvider><App /></ThemeProvider></AuthProvider>. Or create a single combined provider that wraps children with all contexts. Or use a state library (Zustand) that avoids context for some state.

### 106. What is the purpose of the key prop when switching component type?
**Answer:** Changing key unmounts the old component and mounts a new one. Use when you want to reset state (e.g. switching form tabs). Same key keeps component instance and state.

### 107. How do you implement a debounced search input in React?
**Answer:** Store input value in state; use useEffect with debounced function that runs when value changes; set debounced value in state or call API. Or use a useDebounce hook that returns debounced value.

### 108. Explain the difference between useState and useReducer.
**Answer:** useState: simple state, one value or object. useReducer: complex state, multiple sub-values, or when next state depends on previous. Same as Redux reducer pattern; dispatch actions.

### 109. How do you test a component that uses hooks?
**Answer:** Use React Testing Library; render component, query by role/label/text, fire events, assert on output. Mock hooks only if needed (e.g. useRouter). Test behavior, not implementation.

### 110. What is the purpose of the act() wrapper in React tests?
**Answer:** act() ensures all state updates and effects are flushed before assertions. React Testing Library wraps in act automatically. Use act when updating state or triggering effects manually in tests.

### 111. How do you implement optimistic updates in React?
**Answer:** Update UI immediately (set state) before API call; on success keep state; on error revert and show error. Or use a data library (React Query) that supports optimistic updates.

### 112. Explain the difference between server and client components in Next.js.
**Answer:** Server components run on server only; no JS sent for them; can fetch data and use server APIs. Client components have "use client"; run on client; can use state, effects, browser APIs. Use server by default; client when needed.

### 113. How do you handle deep linking with React Router?
**Answer:** Define routes that match URLs (e.g. /users/:id); use useParams to read id; load data for that id. Use Navigate or redirect for default route. Optional: loaders (React Router v6 data APIs) for data before render.

### 114. What is the difference between Link and useNavigate?
**Answer:** Link renders an anchor that navigates on click; good for declarative navigation. useNavigate() returns a function to navigate programmatically (after login, redirect). Both use the same router.

### 115. How do you implement protected routes in React?
**Answer:** Wrap route in a component that checks auth (e.g. user from context); if not authenticated redirect to login or render login; otherwise render children (Outlet or component). Use same check for role-based routes.

### 116. Explain the difference between React Query and SWR.
**Answer:** Both are data-fetching libraries (cache, refetch, loading/error). React Query has more features (mutations, devtools, invalidation). SWR is smaller and simpler. Choose by project needs.

### 117. How do you invalidate and refetch queries (e.g. React Query)?
**Answer:** queryClient.invalidateQueries(['key']) marks queries stale and refetches if mounted. After mutation call invalidateQueries so UI updates. Use exact key or partial match.

### 118. What is the purpose of the suspense boundary?
**Answer:** Suspense shows fallback while children are loading (lazy components or data). Catches thrown promise and re-renders when resolved. Use with React.lazy or data libraries that support Suspense.

### 119. How do you implement error boundaries with hooks?
**Answer:** Error boundaries are class components (getDerivedStateFromError, componentDidCatch). No hook equivalent. Wrap tree in boundary; use one boundary per feature or route. Log errors to service.

### 120. Explain the difference between React.lazy and dynamic import.
**Answer:** React.lazy(() => import('./Component')) returns a component that suspends until the chunk loads. Dynamic import() is JS; returns promise. Use lazy for code-splitting components; wrap in Suspense.

### 121. How do you style React components (CSS-in-JS vs CSS modules)?
**Answer:** CSS modules: import styles from './App.module.css'; className={styles.box}. CSS-in-JS: styled-components, Emotion (template literals). Or Tailwind utility classes. Choose by team and consistency.

### 122. What is the purpose of the data-* attributes in React?
**Answer:** data-* pass custom data to DOM for testing (data-testid), analytics, or CSS. React passes them through. Use data-testid for Testing Library queries when role/label are not enough.

### 123. How do you implement a modal that closes on overlay click?
**Answer:** Render modal in a portal; overlay div with onClick that calls onClose; stopPropagation on modal content so clicking inside does not close. Trap focus and handle Escape for a11y.

### 124. Explain the difference between getDerivedStateFromProps and useEffect for syncing props.
**Answer:** getDerivedStateFromProps (class) runs on every render; sync state from props when needed. In functions use useEffect with props as deps to sync; prefer deriving during render when possible to avoid extra state.

### 125. How do you handle large lists (virtualization)?
**Answer:** Use a virtual list library (react-window, react-virtualized): only render visible items; total height from item count × item height; scroll position drives which slice to render. Keeps DOM small.

### 126. What is the purpose of the useRef for previous value?
**Answer:** Store previous value: const prev = useRef(); useEffect(() => { prev.current = value; }); prev.current holds previous value. Use for comparing prev vs current (e.g. in useEffect) or animation frames.

### 127. How do you implement undo/redo in React?
**Answer:** Keep history of state in useReducer or separate state (array of states + index). Dispatch undo/redo to move index; current state = history[index]. Or use a library (use-undo).

### 128. Explain the difference between hydration and render.
**Answer:** Hydration: attaching React to server-rendered HTML; React "claims" DOM and attaches listeners. Render: building DOM from scratch on client. Hydration can mismatch if server and client output differ.

### 129. How do you avoid hydration mismatch errors?
**Answer:** Ensure server and client produce same output: no browser-only APIs in first render, no random/Date in initial render. Use useEffect for client-only content or suppress with suppressHydrationWarning where appropriate.

### 130. What is the purpose of the useSyncExternalStore hook?
**Answer:** Subscribe to external store (e.g. Redux, global store) in a way safe for SSR and concurrent rendering. useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot). Use for integrating external stores with React 18.

### 131. How do you implement a global store without Redux?
**Answer:** Context + useReducer (or useState) in a provider; dispatch and state in context. Or use Zustand, Jotai (atoms). Choose by complexity and need for devtools/middleware.

### 132. Explain the difference between useLayoutEffect and useEffect.
**Answer:** useLayoutEffect runs synchronously after DOM updates, before paint. useEffect runs after paint. Use useLayoutEffect for measurements or DOM mutations that must be visible immediately; otherwise useEffect.

### 133. How do you handle copy-paste in a contenteditable div in React?
**Answer:** Control value via state and onInput; or uncontrolled with ref. Handle onPaste to strip formatting if needed. Contenteditable is tricky; consider a rich-text library (Slate, TipTap) for complex editing.

### 134. What is the purpose of the React Compiler (experimental)?
**Answer:** Automatically memoizes components and values; can reduce need for useMemo/useCallback/memo. Experimental; enable in config. Aims to make React "just work" without manual optimization.

### 135. How do you implement a multi-step form in React?
**Answer:** Store step index in state; render current step component; next/prev update step. Store form data in state or form library; validate per step or on submit. Optional: use a wizard library.

### 136. Explain the difference between ref callback and useRef.
**Answer:** ref={node => { ... }} runs when node is attached/detached; can set multiple refs or run logic. useRef gives stable object; ref.current = node. Use callback when you need to react to ref changes.

### 137. How do you test components that use React Router?
**Answer:** Wrap component in MemoryRouter (or BrowserRouter) with initial route. Use renderWithRouter helper or wrap in Router in test. Navigate with userEvent.click(link) or navigate() in test.

### 138. What is the purpose of the useDeferredValue hook?
**Answer:** useDeferredValue(value) returns a version of value that may lag behind; React can show stale value while updating in background. Use for keeping input responsive when filtering or rendering heavy list.

### 139. How do you implement keyboard shortcuts in React?
**Answer:** useEffect that adds keydown listener; check event.key and modifiers; call handler; remove listener in cleanup. Or use a library (react-hotkeys-hook). Prevent default when handling.

### 140. Explain the difference between createRoot and hydrateRoot.
**Answer:** createRoot(container) for client-only render. hydrateRoot(container, element) for hydrating server-rendered HTML. Use hydrateRoot in SSR apps so React attaches to existing DOM.

### 141. How do you implement drag and drop without a library?
**Answer:** Use HTML5 drag-and-drop: draggable, onDragStart (setData), onDragOver (preventDefault), onDrop (getData). Or use pointer events (mousedown, mousemove, mouseup) for full control. Libraries (dnd-kit) simplify.

### 142. What is the purpose of the useInsertionEffect hook?
**Answer:** useInsertionEffect runs before layout effects; for CSS-in-JS libraries to inject styles before layout reads. Rarely used in app code; mainly for library authors.

### 143. How do you implement a tooltip that positions correctly?
**Answer:** Render tooltip in portal; compute position from trigger getBoundingClientRect and tooltip size; handle scroll/resize to update. Or use a library (Floating UI, Popper). Handle hover/focus for a11y.

### 144. Explain the difference between React 18 automatic batching and legacy behavior.
**Answer:** React 18 batches all state updates (including in setTimeout, promises, native events). Legacy React only batched inside React event handlers. Fewer re-renders and more predictable behavior.

### 145. How do you implement dark mode in React?
**Answer:** Store theme in state or context (or localStorage); apply class or CSS variables to root (e.g. data-theme="dark"); CSS uses var(--bg) etc. Toggle in UI; persist preference.

### 146. What is the purpose of the useReducer with context for global state?
**Answer:** Single useReducer in a provider; dispatch and state in context. Components use useContext to read and dispatch. Good for medium complexity; for large apps consider Redux or Zustand.

### 147. How do you handle responsive layout in React?
**Answer:** CSS media queries (no JS). Or useWindowSize hook and render different layout by breakpoint. Prefer CSS when possible; hook when you need different components or logic per breakpoint.

### 148. Explain the difference between React.memo and React.PureComponent.
**Answer:** React.memo is for function components; shallow compare props. PureComponent is for class components; shallow compare props and state. Same idea: skip re-render when props (and state) are equal.

### 149. How do you implement a select with search (combobox) in React?
**Answer:** Input + dropdown list; filter options by input value; keyboard nav (arrow, enter, escape); manage open/close and selected value. Or use a library (Downshift, React Select). Handle a11y (ARIA).

### 150. What is the purpose of the useTransition hook?
**Answer:** useTransition returns [isPending, startTransition]. startTransition(fn) marks state updates in fn as non-urgent; React can keep showing current UI. Use for heavy updates (filtering list) to keep UI responsive.

### 151. How do you implement a context that only re-renders consumers when its value changes?
**Answer:** Split context: one for value, one for dispatch (dispatch is stable). Or use useMemo for value object so identity does not change unless deps change. Or use a store (Zustand) that subscribes per selector.

### 152. Explain the difference between React.lazy and React.Suspense.
**Answer:** React.lazy defers loading a component (code-split). Suspense shows fallback while lazy (or data) is loading. Use together: <Suspense fallback={...}><LazyComponent /></Suspense>.

### 153. How do you implement a custom hook that uses another custom hook?
**Answer:** Call the other hook at top level (hooks rules); use its return value. Example: useAuth() uses useUser() and useLogin(). Compose small hooks into larger ones.

### 154. What is the purpose of the key when rendering an array of components?
**Answer:** Keys identify which item is which across renders. Use stable ID from data; avoid index when list can reorder or filter. Prevents wrong component reuse and state bugs.

### 155. How do you implement a sticky header in React?
**Answer:** CSS position: sticky; top: 0; on header. No React-specific logic. If you need to show/hide on scroll, use scroll listener and state or Intersection Observer.

### 156. Explain the difference between getSnapshot and getServerSnapshot in useSyncExternalStore.
**Answer:** getSnapshot returns current value (client). getServerSnapshot returns value for SSR (must match server); optional. Ensures no hydration mismatch when using external store.

### 157. How do you implement a form with dynamic fields (add/remove)?
**Answer:** Store fields in state (array of { id, value }); add pushes new item; remove filters by id. Map over array to render inputs; use field id for key. Optional: form library with field arrays.

### 158. What is the purpose of the useRef for storing interval/timer?
**Answer:** Store interval or timeout ID in ref so you can clear it in cleanup. useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, []); Ref keeps ID stable across renders.

### 159. How do you implement a controlled component that wraps a native input?
**Answer:** Accept value and onChange from props; pass to native input. value={value} onChange={e => onChange(e.target.value)}. Optional: forwardRef to expose ref to parent.

### 160. Explain the difference between React's concurrent rendering and synchronous rendering.
**Answer:** Concurrent: React can pause and resume work; interruptible. Synchronous: once started, run to completion. Concurrent enables transitions and Suspense; better perceived performance.

### 161. How do you implement a tab panel that preserves state when switching tabs?
**Answer:** Render all tab panels but hide with CSS (display/visibility) or conditionally render and keep state in parent. Or give each panel a key that is the tab id so React keeps separate instances.

### 162. What is the purpose of the useCallback when passing to child?
**Answer:** Keeps function reference stable so React.memo child does not re-render when parent re-renders but other props are equal. Include correct dependencies so callback is up to date.

### 163. How do you implement a dropdown that closes on outside click?
**Answer:** useRef for container; useEffect that adds mousedown listener to document; if event.target is not inside container, close dropdown. Cleanup listener on unmount. Or use a library (Floating UI).

### 164. Explain the difference between state and ref for value that does not affect UI.
**Answer:** If value does not affect render (e.g. previous value, timer ID), use ref. If it affects render, use state. Ref avoids unnecessary re-renders and is mutable.

### 165. How do you implement a skeleton loading state?
**Answer:** Show placeholder UI (skeleton) with same layout as content when loading. Use CSS animation (shimmer). Replace with real content when data loads. Improves perceived performance.

### 166. What is the purpose of the useMemo for expensive computation?
**Answer:** useMemo(compute, deps) caches result; recomputes only when deps change. Use for expensive derivations (filtering, sorting) to avoid recalculating every render. Profile first; don't overuse.

### 167. How do you implement a context with default value vs provider value?
**Answer:** createContext(defaultValue): default used when no Provider above. Provider value overrides. Use default for tests or optional context; always provide value in app to avoid undefined.

### 168. Explain the difference between React's synthetic events and native events.
**Answer:** Synthetic events are wrapped by React; same interface across browsers; pooled (nullified after handler). Native events are DOM events. Use synthetic in React; rarely need native (e.g. addEventListener in useEffect).

### 169. How do you implement a custom hook that fetches on mount and on param change?
**Answer:** useEffect with param in deps; fetch when param changes; set loading, data, error; cleanup abort controller on unmount or when param changes. Return { data, loading, error, refetch }.

### 170. What is the purpose of the StrictMode double-invoking of effects?
**Answer:** In dev, React runs effects twice to surface missing cleanup (e.g. subscriptions, timers). Ensures cleanup is correct. Does not run twice in production.

### 171. How do you implement a form that resets when modal closes?
**Answer:** When opening modal set a key that changes when modal opens (e.g. key={openCount}); React remounts form and state resets. Or call reset() from form library when modal closes.

### 172. Explain the difference between useRef and createRef.
**Answer:** useRef returns same object every render (stable). createRef (class) creates new ref each render. In function components always use useRef. createRef is for class components.

### 173. How do you implement a list that reorders (drag and drop)?
**Answer:** Store items in state; on drag end get source and destination index; reorder array (splice); set state. Use a library (dnd-kit, react-beautiful-dnd) for accessibility and edge cases. Key by item id.

### 174. What is the purpose of the useReducer for complex form state?
**Answer:** Single reducer handles multiple fields and actions (set field, set error, reset). Easier to test and reason about than many useStates. Dispatch({ type: 'SET_FIELD', name, value }).

### 175. How do you implement a component that only renders on client?
**Answer:** const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []); if (!mounted) return null or fallback; then render client-only content. Avoids hydration mismatch for browser-only code.

### 176. What is the difference between React 17 and React 18 event delegation?
**Answer:** React 17+ attaches listeners to root container instead of document. Enables multiple React roots and easier embedding. Event delegation still works; just different attach point.

### 177. How do you implement a custom hook for previous value?
**Answer:** const prev = useRef(); useEffect(() => { prev.current = value; }); return prev.current. Use for comparing prev vs current in useEffect or for animation frames.

### 178. What is the purpose of the key prop when reusing components?
**Answer:** Key tells React which instance is which across renders. Changing key unmounts old and mounts new (resets state). Use stable ID from data; avoid index when list changes.

### 179. How do you implement a custom hook for localStorage sync?
**Answer:** useState(initial); useEffect to read from localStorage on mount; useEffect to write when value changes. Handle SSR (no window); use try/catch for quota or private mode.

### 180. Explain the difference between React.memo and React.Component memo.
**Answer:** React.memo is a HOC for function components (shallow compare props). React.Component has no built-in memo; use PureComponent for class. Same idea: skip re-render when props equal.

### 181. How do you implement a custom hook for focus trap (modal)?
**Answer:** useRef for container; on mount query focusable elements, add keydown listener (Tab, Shift+Tab) to cycle focus within container; on unmount restore focus to trigger. Or use focus-trap-react.

### 182. What is the purpose of the displayName property on components?
**Answer:** displayName is used in DevTools and error messages. Set for HOCs and anonymous components: MyComponent.displayName = 'MyComponent'. Improves debugging.

### 183. How do you implement a custom hook for click outside?
**Answer:** useRef for element; useEffect adds mousedown/touchstart to document; if event.target not contained in ref.current, run callback. Cleanup on unmount. Use for dropdown, modal close.

### 184. Explain the difference between React.lazy and dynamic import in Next.js.
**Answer:** React.lazy is for code-splitting components (wrap in Suspense). Next.js dynamic() is for lazy load with options (ssr: false, loading). Use dynamic for Next.js; lazy for CRA or Vite.

### 185. How do you implement a custom hook for media query?
**Answer:** useState for match; useEffect that creates MediaQueryList, sets state from matches, adds listener, returns cleanup. Use for responsive logic (e.g. isMobile). Or use library (react-responsive).

### 186. What is the purpose of the Profiler API in React?
**Answer:** <Profiler id="..." onRender={callback}> measures render time of subtree. Use for identifying slow components. Dev only or with conditional; callback receives phase, actualDuration.

### 187. How do you implement a custom hook for document title?
**Answer:** useEffect(() => { document.title = title; return () => { document.title = previous; }; }, [title]); Set title per page or view; restore on unmount optional.

### 188. Explain the difference between key and ref in list items.
**Answer:** key is for React reconciliation (which item is which). ref would refer to DOM node; don't use ref in map (ref is one value). Use key for lists; ref for single element or callback ref for list.

### 189. How do you implement a custom hook for online status?
**Answer:** useState for online; useEffect adds online/offline listeners to window; set state; cleanup. Return online boolean. Use for showing "offline" banner or disabling actions.

### 190. What is the purpose of the React.isValidElement?
**Answer:** React.isValidElement(obj) returns true if obj is a valid React element. Use when cloning or filtering children to ensure they are elements. Rare in app code.

### 191. How do you implement a custom hook for geolocation?
**Answer:** useState for position and error; useEffect that calls navigator.geolocation.getCurrentPosition or watchPosition; set state in callbacks; cleanup clearWatch. Return position, error, loading.

### 192. Explain the difference between React.Children.map and array map.
**Answer:** React.Children.map(children, fn) handles single child, null, undefined; array map would fail. Use when children might be single or array. Pass key to each child.

### 193. How do you implement a custom hook for visibility (page visibility API)?
**Answer:** useState for visible; useEffect adds visibilitychange listener to document; set state from document.visibilityState. Use for pausing timers or refetch when tab visible.

### 194. What is the purpose of the React.cloneElement?
**Answer:** React.cloneElement(element, props, ...children) clones element with merged props and optional new children. Use for adding props to children (e.g. pass down callback or ref). Rare; prefer composition.

### 195. How do you implement a custom hook for interval?
**Answer:** useEffect(() => { const id = setInterval(callback, delay); return () => clearInterval(id); }, [delay, ...deps]); Use for polling or repeated updates. Include callback in deps or use ref for latest callback.

### 196. Explain the difference between defaultProps and default parameters in function components.
**Answer:** defaultProps (on component) set default for missing props. Default parameters in function (e.g. ({ x = 0 })) do the same. Prefer default parameters; defaultProps still work but default params are more common.

### 197. How do you implement a custom hook for timeout?
**Answer:** useEffect(() => { const id = setTimeout(callback, delay); return () => clearTimeout(id); }, [delay, ...deps]); Use for debounce or delayed action. Clear on unmount or when deps change.

### 198. What is the purpose of the React.Children.only?
**Answer:** React.Children.only(children) returns the single child or throws. Use when component expects exactly one child (e.g. cloneElement on single child). Throws if zero or multiple.

### 199. How do you implement a custom hook for previous render count?
**Answer:** const count = useRef(0); count.current++; return count.current. Or use for debugging re-renders. Not commonly needed; use DevTools Profiler instead.

### 200. Explain the difference between React.Children.toArray and spread.
**Answer:** React.Children.toArray(children) flattens and adds keys to each child (for reconciliation). Spread [...children] does not add keys. Use toArray when mapping over children and need stable keys.

### 201. How do you implement a custom hook for mounted state?
**Answer:** const [mounted, setMounted] = useState(false); useEffect(() => { setMounted(true); return () => setMounted(false); }, []); Return mounted. Use to avoid setState on unmounted component (check before setState).

### 202. What is the purpose of the React.Children.forEach?
**Answer:** React.Children.forEach(children, fn) iterates over children (handles single, null, array). Like map but no return value. Use when you need to traverse children without returning new array.

### 203. How do you implement a custom hook for force update?
**Answer:** const [, setTick] = useState(0); return () => setTick(t => t + 1); Use sparingly when you need to re-render from ref or external store. Prefer proper state or context.

### 204. Explain the difference between React.Fragment and array return.
**Answer:** React.Fragment (or <>) groups children without extra DOM node. Array return [a, b] also works but each item needs key. Use Fragment when you don't need keys; array when mapping.

### 205. How do you implement a custom hook for toggle with history?
**Answer:** Store array of booleans or useReducer with past states; toggle pushes new state; "undo" pops. Use for undo/redo of boolean or simple state. Limit history length.

### 206. What is the purpose of the React.version?
**Answer:** React.version is the React version string (e.g. "18.2.0"). Use for debugging or conditional logic by version. Rare in app code.

### 207. How do you implement a custom hook for async with abort?
**Answer:** useEffect with AbortController; pass signal to fetch; in cleanup call controller.abort(). Return { data, loading, error, abort }. Use for cancelable fetch on param change or unmount.

### 208. Explain the difference between controlled and uncontrolled in file input.
**Answer:** File input is typically uncontrolled (value is read-only in many browsers). Use ref to read files. Or controlled with state for file list (some browsers). Prefer ref for file input.

### 209. How do you implement a custom hook for scroll position?
**Answer:** useState for position; useEffect adds scroll listener to window or element; set state from scrollY/scrollTop; throttle or use passive. Cleanup on unmount. Use for scroll-based UI.

### 210. What is the purpose of the React.createRef (class components)?
**Answer:** React.createRef() creates ref object (current property). In class components assign in constructor or as class property. One ref per instance. In function components use useRef instead.

### 211. How do you implement a custom hook for form with validation?
**Answer:** Store values and errors in state or useReducer; validate on change or submit; return values, errors, handlers, validate, submit. Or use form library (React Hook Form, Formik).

### 212. Explain the difference between React.forwardRef and useImperativeHandle.
**Answer:** forwardRef forwards ref to child (usually DOM). useImperativeHandle customizes what ref.current is (e.g. { focus, scroll }). Use forwardRef for DOM access; useImperativeHandle for custom API.

### 213. How do you implement a custom hook for intersection observer?
**Answer:** useRef for element; useState for inView; useEffect creates IntersectionObserver, observes ref.current, sets state from entry.isIntersecting; cleanup disconnect. Use for lazy load or scroll animations.

### 214. What is the purpose of the React.createContext default value?
**Answer:** createContext(defaultValue): default is used when consumer has no Provider above. Use for tests (no provider) or optional context. In app usually wrap with Provider and real value.

### 215. How do you implement a custom hook for copy to clipboard?
**Answer:** Return copy(text) function that calls navigator.clipboard.writeText(text); set state for success/error. Use for "Copy" button. Handle unsupported (fallback execCommand) and permissions.

### 216. Explain the difference between React.PureComponent and shouldComponentUpdate.
**Answer:** PureComponent does shallow compare of props and state; skip render if equal. shouldComponentUpdate is manual: return true/false. Use PureComponent for simple case; shouldComponentUpdate for custom logic.

### 217. How do you implement a custom hook for animation frame?
**Answer:** useRef for id; useEffect that requests animation frame in loop, updates state or ref, returns cleanup cancelAnimationFrame(id). Use for smooth animations or per-frame updates.

### 218. What is the purpose of the React.createElement type argument?
**Answer:** First argument is type: string ('div'), component (function/class), or Fragment. Determines what gets rendered. JSX compiles to createElement(type, props, ...children).

### 219. How do you implement a custom hook for double click?
**Answer:** useRef for last click time; in click handler if delay since last < threshold treat as double click else single; update last time. Return { onClick, onDoubleClick } or callback. Use for double-click action.

### 220. Explain the difference between getDerivedStateFromProps and componentDidUpdate for props sync.
**Answer:** getDerivedStateFromProps (class) runs on every render; sync state from props. componentDidUpdate runs after render; can setState (causes extra render). Prefer getDerivedStateFromProps for derived state; or derive in render.

### 221. How do you implement a custom hook for long press?
**Answer:** useRef for timer; onMouseDown start timer (e.g. 500ms); onMouseUp/onMouseLeave clear timer; if timer fires trigger long press. Use for long-press action (e.g. delete). Clear on unmount.

### 222. What is the purpose of the React.Component displayName?
**Answer:** displayName on class or function component is used by DevTools and error messages. Set for better debugging: MyComponent.displayName = 'MyComponent'. Auto-set for named functions.

### 223. How do you implement a custom hook for network status (navigator.onLine)?
**Answer:** useState(navigator.onLine); useEffect adds online/offline to window; set state. Return isOnline. Use for offline UI or disabling submit when offline.

### 224. Explain the difference between React 18 createRoot and legacy render.
**Answer:** createRoot(container) is React 18 API; enables concurrent features (transitions, Suspense). render(element, container) is legacy; no concurrent. Use createRoot for new apps; legacy for gradual migration.

### 225. How do you implement a custom hook for storage event (cross-tab)?
**Answer:** useEffect adds storage event listener; when key matches, update state from event.newValue. Use for syncing state across tabs (e.g. logout in one tab updates other). Parse JSON if needed.

### 226. What is the purpose of the React.unstable_act?
**Answer:** act (or unstable_act) wraps updates and flushes effects (for testing). React Testing Library uses act internally. Use when testing state updates manually; prefer userEvent which wraps in act.

### 227. How do you implement a custom hook for focus within?
**Answer:** useRef for container; useEffect that adds focusin/focusout; track whether focus is inside; set state. Use for "focus within" styling or closing dropdown when focus leaves. Or use :focus-within in CSS.

### 228. Explain the difference between React.memo second argument and PureComponent.
**Answer:** React.memo(Comp, (prev, next) => true if equal) custom compare; return true to skip render. PureComponent uses shallow compare. Use second arg for custom comparison when shallow is not enough.

### 229. How do you implement a custom hook for idle callback (requestIdleCallback)?
**Answer:** useEffect that calls requestIdleCallback(callback, { timeout }); return cleanup cancelIdleCallback. Use for low-priority work (e.g. prefetch, analytics). Polyfill for Safari.

### 230. What is the purpose of the React.lazy preload?
**Answer:** React.lazy returns component with .preload() (if supported). Preload starts loading chunk before render. Use for prefetching route or component on hover. Not all bundlers support; check docs.

### 231. How do you implement a custom hook for resize observer?
**Answer:** useRef for element; useState for size; useEffect creates ResizeObserver, observes ref.current, sets state from entry.contentRect; cleanup disconnect. Use for responsive component size. Polyfill for old browsers.

### 232. Explain the difference between key on Fragment and key on array item.
**Answer:** Key on Fragment (e.g. <React.Fragment key={id}>) when mapping; key on array item when returning [<div key={id} />]. Both help reconciliation. Use key on outermost element in map.

### 233. How do you implement a custom hook for mutation observer?
**Answer:** useRef for element; useEffect creates MutationObserver, observes ref.current for config (childList, attributes); callback sets state or runs logic. Cleanup disconnect. Use for DOM change detection.

### 234. What is the purpose of the React.Suspense list (experimental)?
**Answer:** SuspenseList (order: 'forwards'|'backwards'|'together') controls order in which suspended children reveal. Experimental. Use for coordinating multiple Suspense boundaries.

### 235. How do you implement a custom hook for fullscreen?
**Answer:** Return { isFullscreen, enter, exit, toggle }; use document.documentElement.requestFullscreen() and exitFullscreen(); add fullscreenchange listener to set state. Use for fullscreen UI.

### 236. Explain the difference between React 18 useTransition and useDeferredValue.
**Answer:** useTransition marks state updates as non-urgent (startTransition). useDeferredValue defers a value (returns "lagging" version). Both keep UI responsive; useTransition for updates you control; useDeferredValue for prop from parent.

### 237. How do you implement a custom hook for speech recognition?
**Answer:** useState for transcript and listening; useEffect creates SpeechRecognition (if supported), sets callbacks; start/stop methods. Return { transcript, listening, start, stop }. Check browser support.

### 238. What is the purpose of the React.startTransition?
**Answer:** React.startTransition(fn) marks state updates inside fn as transitions (non-urgent). React can keep showing current UI. Use for heavy updates (filtering, tab switch). Same as useTransition's startTransition.

### 239. How do you implement a custom hook for battery status?
**Answer:** useState for level, charging; useEffect that navigator.getBattery().then(b => set state, add listeners). Return { level, charging }. Use for "low battery" UI. Check support.

### 240. Explain the difference between React 18 automatic batching in setTimeout.
**Answer:** In React 18, setState inside setTimeout (or promise, native event) is batched; one re-render. In React 17, setState in setTimeout caused immediate re-render. Fewer re-renders in 18.

### 241. How do you implement a custom hook for permission (e.g. notification)?
**Answer:** useState for status (granted, denied, prompt); useEffect that queries PermissionStatus or request permission; set state. Return { status, request }. Use for "Enable notifications" UI.

### 242. What is the purpose of the React.useSyncExternalStore getServerSnapshot?
**Answer:** getServerSnapshot returns value during SSR; must match what getSnapshot returns on first client render. Prevents hydration mismatch when using external store (e.g. Redux). Optional but required for SSR + store.

### 243. How do you implement a custom hook for reduced motion?
**Answer:** useState for prefersReducedMotion; useEffect that matches media query '(prefers-reduced-motion: reduce)'; set state. Return boolean. Use to disable or simplify animations for accessibility.

### 244. Explain the difference between React 18 useId and custom ID generator.
**Answer:** useId() is stable across server and client (SSR safe); no collision. Custom generator (e.g. counter) can collide in SSR or with multiple roots. Use useId for SSR and accessibility IDs.

### 245. How do you implement a custom hook for orientation?
**Answer:** useState for angle or type; useEffect that listens to orientationchange or match media; set state. Return orientation. Use for landscape/portrait UI. Mainly mobile.

### 246. What is the purpose of the React.useDeferredValue initial value?
**Answer:** useDeferredValue(value) returns value that may lag; React can show stale value first. Use for keeping input responsive when filtering large list (defer filtered list). No separate "initial" param; initial is value.

### 247. How do you implement a custom hook for hash (URL hash)?
**Answer:** useState for hash; useEffect that reads window.location.hash and adds hashchange listener; set state. Return hash and setHash (update location). Use for hash routing or tab state in URL.

### 248. Explain the difference between React 18 Suspense for data and for lazy.
**Answer:** Suspense for lazy (React.lazy) is stable; shows fallback until chunk loads. Suspense for data (e.g. Relay, React Query with Suspense) is still evolving; data library must support throwing promise. Same boundary; different source of suspension.

### 249. How do you implement a custom hook for before unload?
**Answer:** useEffect that adds beforeunload listener; set event.returnValue or return string to show browser dialog. Cleanup remove listener. Use for "Unsaved changes" warning. Modern browsers show generic message.

### 250. What is the purpose of the React.useTransition isPending?
**Answer:** isPending is true while transition (state updates from startTransition) is pending. Use to show loading indicator (e.g. spinner) without blocking UI. Keeps current UI visible until new one ready.

### 251. How do you implement a custom hook for print?
**Answer:** Return print() that calls window.print(). Optionally add useEffect to add print styles or beforeprint/afterprint. Use for "Print" button. Browser handles print dialog.

### 252. Explain the difference between React 18 useDeferredValue and debounce.
**Answer:** useDeferredValue is React-driven; defers re-render of deferred value (React may show stale). Debounce delays execution (e.g. API call). Use useDeferredValue for expensive render; debounce for async side effects.

### 253. How do you implement a custom hook for meta tags?
**Answer:** useEffect that creates/updates document head (title, meta description, etc.); cleanup restore or remove. Use for per-page SEO. Or use react-helmet or framework (Next.js Head).

### 254. What is the purpose of the React.useId in lists?
**Answer:** useId() generates unique ID; use for list item id (e.g. aria-describedby) or form label/input pair. Each component instance gets unique id; stable in SSR. Use for a11y and SSR-safe IDs.

### 255. How do you implement a custom hook for script load?
**Answer:** useState for loaded, error; useEffect that creates script element, sets src, onload/onerror set state, append to body; cleanup remove script. Return { loaded, error }. Use for third-party scripts.

### 256. Explain the difference between React 18 root render and legacy hydrate.
**Answer:** createRoot is for client-only render. hydrateRoot(container, element) is for hydrating server-rendered HTML. Use hydrateRoot in SSR apps; createRoot for client-only. Both in react-dom/client.

### 257. How do you implement a custom hook for image load?
**Answer:** useState for loaded, error; useRef for img; useEffect that creates Image, sets src, onload/onerror set state. Or use img ref and naturalWidth. Return { loaded, error } for placeholder or skeleton.

### 258. What is the purpose of the React.useCallback dependency array?
**Answer:** useCallback(fn, deps): fn is recreated only when deps change. Empty [] means fn never changes. Include every value from closure that fn uses. Same rules as useEffect deps.

### 259. How do you implement a custom hook for video ready?
**Answer:** useRef for video; useState for ready; useEffect that adds loadeddata or canplay listener; set state. Return { ready, ref }. Use for showing video when ready (e.g. hide poster).

### 260. Explain the difference between React 18 concurrent and blocking render.
**Answer:** Concurrent (createRoot): React can interrupt and resume; multiple versions of UI in flight. Blocking (legacy): render runs to completion. Concurrent enables transitions and better perceived performance.

### 261. How do you implement a custom hook for element size (getBoundingClientRect)?
**Answer:** useRef for element; useState for size; useEffect + ResizeObserver or measure in effect; set state from getBoundingClientRect(). Return { ref, size }. Use for layout-dependent UI.

### 262. What is the purpose of the React.useMemo dependency array?
**Answer:** useMemo(compute, deps): compute runs only when deps change. Empty [] means run once. Include every value used in compute. Same rules as useEffect; missing deps cause stale values.

### 263. How do you implement a custom hook for pointer lock?
**Answer:** Return { isLocked, request, exit }; use element.requestPointerLock() and document.exitPointerLock(); add pointerlockchange listener to set state. Use for games or 3D. Cleanup exit on unmount.

### 264. Explain the difference between React 18 Suspense and loading flag.
**Answer:** Suspense moves loading state to boundary (declarative); component doesn't handle loading. Loading flag is imperative (if loading return spinner). Suspense allows better UX (transitions, layout). Use Suspense when data/ lazy supports it.

### 265. How do you implement a custom hook for share (Web Share API)?
**Answer:** Check navigator.share; return share(data) that calls navigator.share(data). Handle unsupported (fallback copy link). Use for "Share" button. Request title, text, url.

### 266. What is the purpose of the React.useRef initial value?
**Answer:** useRef(initialValue): ref.current is initialValue until you set it. Use for DOM ref (initial null), mutable value (initial 0), or previous value (initial undefined). Same ref object every render.

### 267. How do you implement a custom hook for vibration?
**Answer:** Check navigator.vibrate; return vibrate(pattern). Use for haptic feedback (e.g. success). Mainly mobile. Pattern is ms or array of ms. No state needed for one-shot.

### 268. Explain the difference between React 18 useTransition and setTimeout for delay.
**Answer:** useTransition keeps current UI visible until new one ready (React schedules). setTimeout would delay your update; UI still blocks. Use useTransition for non-urgent state updates; setTimeout for actual delay (e.g. toast).

### 269. How do you implement a custom hook for wake lock?
**Answer:** useRef for wakeLock; useEffect optional; return { request, release }. request() calls navigator.wakeLock.request('screen'); release() on wakeLock.release(). Use to keep screen on. Cleanup release on unmount.

### 270. What is the purpose of the React.useEffect cleanup return?
**Answer:** Return function from useEffect runs on unmount or before re-run (when deps change). Use for clearing timer, unsubscribing, abort controller. Prevents leaks and stale updates.

### 271. How do you implement a custom hook for connection (NetworkInformation)?
**Answer:** Check navigator.connection; useState for effectiveType, downlink, etc.; add change listener. Return connection info. Use for "slow connection" UI or reducing quality. Support varies.

### 272. Explain the difference between React 18 flushSync and normal update.
**Answer:** flushSync(fn) runs fn and flushes React updates synchronously. Use sparingly (e.g. focus after render, measure DOM). Normal update is async (batched). flushSync can hurt performance.

### 273. How do you implement a custom hook for language (navigator.language)?
**Answer:** useState(navigator.language); useEffect adds languagechange listener; set state. Return language. Use for i18n or locale-dependent UI. Or use Intl or i18n library.

### 274. What is the purpose of the React.useLayoutEffect vs useEffect?
**Answer:** useLayoutEffect runs synchronously after DOM updates, before paint. useEffect runs after paint. Use useLayoutEffect for measurements or DOM mutations that must be visible immediately; else useEffect.

### 275. How do you implement a custom hook for safe area (env(safe-area-inset))?
**Answer:** useState for insets; useEffect that reads getComputedStyle or env() for safe-area-inset-*; set state. Or use CSS env() in styles. Use for notches and home indicator. Mainly mobile.

### 276. What is the difference between controlled and uncontrolled components?
**Answer:** Controlled: value and onChange from state; single source of truth. Uncontrolled: ref to DOM; read value when needed. Use controlled for validation and sync; uncontrolled for simple forms.

### 277. Explain React.memo and when to use it.
**Answer:** memo(Component) skips re-render if props are shallow-equal. Use for expensive children or when parent re-renders often. Don't overuse; measure first. Combine with useCallback/useMemo for props.

### 278. How do you handle forms with multiple inputs?
**Answer:** Single state object (e.g. { name, email }); one onChange that updates by name using event.target.name. Or useReducer for complex validation. Or form library (React Hook Form, Formik).

### 279. What is the purpose of key prop in lists?
**Answer:** key helps React identify which items changed/added/removed for efficient reconciliation. Use stable unique id (not index when list can reorder). Wrong key can cause bugs and wrong state.

### 280. Explain useCallback and when to use it.
**Answer:** useCallback(fn, deps) returns memoized function. Use when passing callback to memoized child to avoid unnecessary re-renders. Don't overuse; only when child is memo or callback is in deps.

### 281. How do you implement error boundaries in function components?
**Answer:** Error boundaries must be class components (getDerivedStateFromError, componentDidCatch). Wrap tree in class ErrorBoundary; use it from function components. React may add hook in future.

### 282. What is the difference between useEffect and useLayoutEffect?
**Answer:** useEffect runs after paint (async). useLayoutEffect runs after DOM update, before paint (sync). Use useLayoutEffect for measurements or DOM mutations that must be visible immediately.

### 283. Explain useMemo and when to use it.
**Answer:** useMemo(() => value, deps) returns memoized value. Use for expensive computation that depends on deps. Don't overuse; only when computation is costly. Not for every object/array.

### 284. How do you pass callback to child without causing re-renders?
**Answer:** useCallback for the callback; React.memo on child. Or pass dispatch if using useReducer (stable). Or context with stable value. Avoid inline functions as props when child is memoized.

### 285. What is React Strict Mode and what does it do?
**Answer:** StrictMode double-invokes render and effects in dev to surface side effects. Helps find impure code. No effect in production. Wrap app or subtree with <React.StrictMode>.

### 286. Explain the difference between createElement and JSX.
**Answer:** JSX compiles to React.createElement(type, props, ...children). Same result. JSX is syntactic sugar. Babel/TypeScript transform JSX to createElement calls.

### 287. How do you implement infinite scroll with Intersection Observer?
**Answer:** Ref on sentinel element; IntersectionObserver in useEffect; when visible load more (e.g. fetch next page); append to list. Cleanup observer on unmount. Use for feeds and long lists.

### 288. What is the purpose of React.Fragment?
**Answer:** Fragment groups children without adding DOM node. Use <>...</> or <Fragment>. Needed when returning multiple elements from component. Keyed Fragment <Fragment key={id}> when in list.

### 289. Explain useRef for storing mutable value (not DOM).
**Answer:** useRef(initial) returns { current }. Updating current does not trigger re-render. Use for previous value, timer id, or any mutable value that should not cause re-render.

### 290. How do you avoid prop drilling?
**Answer:** Context API (createContext, Provider, useContext); or state library (Redux, Zustand). Use Context for theme, auth, locale; avoid putting frequently changing data in Context (causes wide re-renders).

### 291. What is the difference between useState and useReducer?
**Answer:** useState for simple state; useReducer for complex state or when next state depends on previous. useReducer gives predictable updates and easier testing. Same as Redux pattern without middleware.

### 292. Explain React 18 automatic batching.
**Answer:** React 18 batches state updates in event handlers, promises, setTimeout, etc. Previously only React event handlers were batched. Fewer re-renders; more predictable. Use flushSync to opt out.

### 293. How do you implement optimistic UI updates?
**Answer:** Update UI immediately (setState); then send request; on failure revert state and show error. Use for likes, follow, etc. Improve perceived performance. Handle rollback and retry.

### 294. What is the purpose of defaultProps?
**Answer:** defaultProps set default values for props (class or function). For function components prefer default parameters: function Comp({ name = 'Guest' }). defaultProps still useful for legacy or type systems.

### 295. Explain useImperativeHandle and forwardRef.
**Answer:** forwardRef forwards ref to child. useImperativeHandle(ref, () => ({ focus, scroll }), deps) exposes custom methods to parent instead of DOM node. Use for encapsulating DOM or imperative API.

### 296. How do you test React components?
**Answer:** React Testing Library (render, screen, userEvent); test behavior not implementation. Jest for runner. Mock only when necessary (e.g. fetch). Prefer testing like user; avoid testing state directly.

### 297. What is the difference between client and server components (React Server Components)?
**Answer:** Server components run on server; no JS sent for them; can access DB directly. Client components run on client; interactive. Use server for static/data; client for hooks, events, browser APIs.

### 298. Explain React 18 useTransition.
**Answer:** useTransition() returns [isPending, startTransition]. Wrap non-urgent state updates in startTransition; React keeps UI responsive. Use for heavy updates (e.g. filtering list) without blocking input.

### 299. How do you implement virtual list (windowing)?
**Answer:** Render only visible items; track scroll position; compute which items to show; use fixed height container and placeholder for total height. Libraries: react-window, react-virtualized. Use for long lists.

### 300. What is the purpose of children prop?
**Answer:** children is the content between opening and closing tags. Passed as props.children. Use for composition (layout, wrapper). Can be single element, array, or nothing. React.Children utilities for iteration.

### 301. Explain useDeferredValue.
**Answer:** useDeferredValue(value) returns deferred version that may lag behind. Use for deferring non-urgent UI (e.g. search results) so urgent UI (input) stays responsive. React 18.

### 302. How do you handle file upload in React?
**Answer:** input type="file"; ref or onChange; FormData to append file; fetch with body FormData. Show progress via xhr.upload.onprogress. Validate type/size on client; validate on server.

### 303. What is the difference between createRoot and render (React 18)?
**Answer:** createRoot is new API; enables concurrent features (Suspense, transitions). Legacy render still works but no concurrent features. Use createRoot for new apps.

### 304. Explain React 18 Suspense for data fetching.
**Answer:** Suspense lets component "suspend" while loading; parent shows fallback. Still evolving for data; use with framework (e.g. Relay) or library. For now use loading state or React Query with Suspense.

### 305. How do you implement dark mode with Context?
**Answer:** ThemeContext (theme, setTheme); Provider wraps app; toggle in navbar; CSS variables or class on root (e.g. dark). Persist in localStorage. Use useContext(ThemeContext) in components.

### 306. What is the purpose of propTypes?
**Answer:** propTypes validate props at runtime (development). Use for documentation and catching bugs. TypeScript replaces for type checking. Still useful in plain JS projects.

### 307. Explain useSyncExternalStore (React 18).
**Answer:** useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) subscribes to external store (e.g. Redux, global). Use for integrating external stores with concurrent rendering. Replaces useSubscription pattern.

### 308. How do you implement drag and drop?
**Answer:** HTML5 drag API (draggable, onDragStart, onDrop) or library (react-dnd, dnd-kit). Handle drag state and drop target. Use for reorder, upload, kanban. Accessibility: keyboard and screen reader.

### 309. What is the difference between element and component?
**Answer:** Element is plain object describing what to render (type, props). Component is function or class that returns elements. "Component" often used for both; element is the result of calling component.

### 310. Explain React 18 useId.
**Answer:** useId() returns unique id stable across server and client. Use for aria-describedby, htmlFor, or any unique id. Avoids hydration mismatch. Don't use for list keys (use item id).

### 311. How do you implement accessibility (a11y) in React?
**Answer:** Semantic HTML; aria-* attributes; keyboard nav (onKeyDown); focus management (useRef, useEffect); skip links; label and id. Use eslint-plugin-jsx-a11y. Test with screen reader and keyboard.

### 312. What is the purpose of React.lazy and Suspense?
**Answer:** React.lazy(() => import('./Comp')) loads component on demand. Wrap in Suspense with fallback. Use for code splitting and smaller initial bundle. Fallback shows while loading.

### 313. Explain useInsertionEffect (React 18).
**Answer:** useInsertionEffect runs before DOM mutations; for CSS-in-JS libraries to inject styles. Rare; use only in libraries. Prefer useEffect or useLayoutEffect for app code.

### 314. How do you handle deep linking (URL and state)?
**Answer:** Router (React Router); URL params and search params; sync state to URL (e.g. filters in query). useSearchParams, useParams. Use for shareable links and back/forward.

### 315. What is the difference between mount and update?
**Answer:** Mount: component added to tree; useEffect runs (empty deps). Update: re-render due to state/props; useEffect runs when deps change. Unmount: removed; cleanup runs.

### 316. Explain React 18 startTransition for non-urgent updates.
**Answer:** startTransition(scope) marks updates inside scope as non-urgent. React can interrupt and show pending state. Use for filtering, tab switch. Keeps input responsive.

### 317. How do you implement undo/redo?
**Answer:** Store history array of states; current index; on action push new state (or replace future); undo = index--; redo = index++. Use useReducer or external store. Consider limit on history size.

### 318. What is the purpose of React DevTools?
**Answer:** Inspect component tree, props, state; profile re-renders and performance; trace updates. Use for debugging and optimization. Profiler shows why component re-rendered.

### 319. Explain compound components pattern.
**Answer:** Parent and children work together (e.g. Tabs, TabList, Tab, TabPanel). Context in parent; children use context. Flexible composition. Example: Select and Option.

### 320. How do you implement print-friendly view?
**Answer:** CSS @media print; hide nav/sidebar; show only content. Or route to /print with minimal layout. window.print(). Use print stylesheet or class toggles.

### 321. What is the difference between ref and state?
**Answer:** Changing ref (current) does not re-render; changing state does. Use ref for DOM, timer, previous value; use state for UI-driving data. Both persist across re-renders.

### 322. Explain render props pattern.
**Answer:** Component receives function as prop (e.g. render or children as function); calls it with data. Use for sharing logic (mouse position, data fetch). Replaced often by custom hooks.

### 323. How do you implement feature flags in React?
**Answer:** Context or config with flags; conditional render or logic. Load flags from API or env. Use for A/B test, gradual rollout. Consider useSyncExternalStore if flags change at runtime.

### 324. What is the purpose of React.cloneElement?
**Answer:** cloneElement(element, props, ...children) clones element and merges props. Use for adding props to children (e.g. inject onClick). Prefer composition over cloneElement when possible.

### 325. Explain headless component pattern.
**Answer:** Component handles logic only; no UI (or minimal). Consumer provides UI. Use for reuse (e.g. useCombobox logic, custom UI). Downshift, React Table are examples.

### 326. How do you handle multi-language (i18n)?
**Answer:** Library (react-i18next, react-intl); translation files per locale; switch language in context or store. Use key-based strings; handle plural and interpolation. Lazy load translations.

### 327. What is the difference between createContext and Redux?
**Answer:** Context: built-in, good for theme/auth, can cause re-renders when value changes. Redux: global store, middleware, devtools, predictable updates. Use Context for few values; Redux for complex app state.

### 328. Explain React 18 concurrent features summary.
**Answer:** useTransition, useDeferredValue, Suspense improvements, automatic batching. Goal: keep UI responsive during heavy updates. Opt-in per update (startTransition) or per value (useDeferredValue).

### 329. How do you implement skeleton loading?
**Answer:** Show placeholder (skeleton) with same layout as content; replace with real content when loaded. Use CSS animation (shimmer). Improves perceived performance. Match skeleton to content shape.

### 330. What is the purpose of React.Children utilities?
**Answer:** React.Children.map, count, forEach, only to work with children (opaque). Use when children can be single or array. Rare; prefer explicit props or composition.

### 331. Explain slot pattern (multiple named children).
**Answer:** Pass multiple "slots" as props (e.g. header, footer, children). Component composes them. Flexible layout. Like Vue slots or named children.

### 332. How do you implement real-time updates (WebSocket)?
**Answer:** useEffect: new WebSocket(url); onmessage setState; cleanup close. Or use library (socket.io-client). Handle reconnect and backoff. Consider stale-while-revalidate for UI.

### 333. What is the difference between hydration and render?
**Answer:** Hydration: React attaches to existing DOM from server; event listeners, interactivity. Render: React creates DOM. Use hydrateRoot (React 18) for SSR. Mismatch causes hydration error.

### 334. Explain provider pattern and nesting.
**Answer:** Multiple providers wrap app (theme, auth, router). Inner provider overrides outer for same context. Order matters. Use for layered configuration.

### 335. How do you implement analytics tracking?
**Answer:** Call analytics (e.g. gtag, segment) in useEffect or event handler; track page view on route change; track events on click/submit. Respect privacy; consider consent. Use wrapper hook.

### 336. What is the purpose of key when conditionally rendering?
**Answer:** Key on component when switching type (e.g. Login vs Signup) resets state. Use when you want fresh state on switch. Same key keeps state; different key resets.

### 337. Explain controlled vs uncontrolled for custom components.
**Answer:** Controlled: value + onChange from parent. Uncontrolled: defaultValue + ref. Support both for flexibility (like native input). Document which props are required for each mode.

### 338. How do you implement focus trap (modal)?
**Answer:** useRef for modal container; useEffect: query focusable elements; on Tab keep focus inside; on Esc close. Use focus-trap-react or similar. Restore focus on close (focus management).

### 339. What is the difference between React and Vue?
**Answer:** React: library, JSX, unidirectional, hooks. Vue: framework, templates, two-way binding option, composition API. Both component-based and reactive. Choose by team and ecosystem.

### 340. Explain React 18 useTransition and isPending.
**Answer:** startTransition(update); isPending true while transition is pending. Show spinner or disabled state. Use for non-urgent updates; keep UI responsive.

### 341. How do you implement route guards (auth)?
**Answer:** Wrapper component or route config; check auth (context or API); redirect to login if not authenticated. Use ProtectedRoute that renders children or Navigate. Load user before deciding.

### 342. What is the purpose of displayName?
**Answer:** displayName sets component name for DevTools and stack traces. Useful for HOC or anonymous components. Set MyComp.displayName = 'MyComp'.

### 343. Explain state colocation.
**Answer:** Keep state as close as possible to where it's used. Avoid lifting state too high. Improves performance and clarity. Lift only when multiple components need same state.

### 344. How do you implement Web Vitals reporting?
**Answer:** web-vitals library; report in useEffect or onCLS/onLCP/onFID callbacks; send to analytics. Use for monitoring real user performance.

### 345. What is the difference between useMemo and useCallback?
**Answer:** useMemo returns memoized value; useCallback returns memoized function. useCallback(fn, deps) is useMemo(() => fn, deps). Use useMemo for computed value; useCallback for stable function reference.

### 346. Explain React 18 root options (onRecoverableError).
**Answer:** createRoot(container, { onRecoverableError }) for logging hydration or render errors. Use for monitoring. Optional.

### 347. How do you implement responsive layout (breakpoints)?
**Answer:** CSS media queries; or hook useMediaQuery(breakpoint); conditional render or class. Use same breakpoints as design. Consider container queries for component-level responsive.

### 348. What is the purpose of React.PureComponent?
**Answer:** PureComponent does shallow compare of props and state; skips re-render if equal. Like React.memo for classes. Prefer function components with memo.

### 349. Explain render phase vs commit phase.
**Answer:** Render phase: React calls components, computes tree (can be async in concurrent). Commit phase: apply to DOM, run useLayoutEffect, then useEffect. Don't mutate in render; side effects in commit.

### 350. How do you implement pull-to-refresh?
**Answer:** Touch events or library; track pull distance; when over threshold trigger refresh (fetch); show loading. Mainly mobile. Use native overscroll or custom gesture.

### 351. What is the difference between SSR and CSR?
**Answer:** SSR: render on server; send HTML; faster first paint, SEO. CSR: render in browser; single fetch then JS. Use SSR for content pages; CSR for apps. Next.js supports both.

### 352. Explain React 18 useDeferredValue and stale UI.
**Answer:** useDeferredValue(value) returns value that may lag; show stale content until new value is ready. Use for search: input updates immediately, results defer. Reduces jank.

### 353. How do you implement code splitting by route?
**Answer:** React.lazy per route component; Suspense at route level. Load route chunk when user navigates. Use with React Router loadable or similar. Reduces initial bundle.

### 354. What is the purpose of getDerivedStateFromError?
**Answer:** Static lifecycle in Error Boundary; receives error; return state update (e.g. { hasError: true }). Renders fallback. Use with componentDidCatch for logging.

### 355. Explain portal and where it renders.
**Answer:** createPortal(children, container) renders children into different DOM node (e.g. document.body). Use for modals, tooltips. Events still bubble to React tree. Styling and a11y are your responsibility.

### 356. How do you implement sticky header?
**Answer:** position: sticky; top: 0; z-index. Or track scroll; add class when scrolled. Use for nav that stays visible. Watch for overflow and stacking context.

### 357. What is the difference between useRef and useState for form?
**Answer:** useRef: read value on submit; no re-render on type. useState: controlled; re-render each keystroke. Use ref for simple form; state for validation and controlled UX.

### 358. Explain React 18 Suspense and streaming SSR.
**Answer:** Server can stream HTML; Suspense boundary shows fallback first, then content when ready. Use for faster TTFB. Requires React 18 and server that supports streaming.

### 359. How do you implement keyboard shortcuts?
**Answer:** useEffect: add keydown listener; check key and modifier; dispatch action. Cleanup on unmount. Use library (react-hotkeys) for declarative. Prevent default when handling.

### 360. What is the purpose of componentDidCatch?
**Answer:** Lifecycle in Error Boundary; receives error and info; log or report. Use for error reporting. Does not prevent render of fallback (getDerivedStateFromError does that).

### 361. Explain useReducer with context (global state).
**Answer:** Context holds state and dispatch; Provider value={{ state, dispatch }}; useReducer in Provider. Consumers use useContext. Simple Redux-like pattern without middleware.

### 362. How do you implement copy to clipboard?
**Answer:** navigator.clipboard.writeText(text); handle async and errors. Fallback: execCommand('copy') with temporary input. Use for share or copy link. Request permission if needed.

### 363. What is the difference between React and Angular?
**Answer:** React: library, JSX, flexible. Angular: framework, TypeScript, RxJS, full stack. React has larger ecosystem; Angular has more built-in. Choose by team and scale.

### 364. Explain React 18 useId for accessibility.
**Answer:** useId() gives stable id for aria-describedby, htmlFor. Prevents duplicate id when component used multiple times. Use in form labels and error messages.

### 365. How do you implement tooltip?
**Answer:** State for visible; on mouse enter/leave set visible; position with getBoundingClientRect or Popper. Use title for simple; custom for rich. Consider floating-ui for placement. A11y: describe content.

### 366. What is the purpose of getSnapshotBeforeUpdate?
**Answer:** Lifecycle called before DOM update; return value passed to componentDidUpdate. Use for reading scroll position before update (e.g. preserve scroll in list). Rare.

### 367. Explain custom hook for previous value.
**Answer:** useRef to store current; useEffect to set ref to value after render; return ref.current (or previous state). Use for comparing prev and current (e.g. in useEffect).

### 368. How do you implement date picker?
**Answer:** input type="date" or library (react-datepicker); state for value; format for display. Consider locale and accessibility. Use native when sufficient; library for UX.

### 369. What is the difference between hydration and client-only render?
**Answer:** Hydration attaches to server-rendered DOM. Client-only: no server HTML; render from root in browser. Use hydration for SEO and first paint; client-only for app shell.

### 370. Explain React 18 useSyncExternalStore for Redux.
**Answer:** Redux React bindings use useSyncExternalStore (subscribe, getSnapshot). Ensures correct behavior with concurrent features. Use when integrating external store.

### 371. How do you implement tabs (accessible)?
**Answer:** role="tablist", tab, tabpanel; aria-selected, aria-controls; keyboard (Arrow, Home, End). State for active index. Use roving tabindex. Or use Radix, Reach.

### 372. What is the purpose of UNSAFE_ prefix in lifecycle?
**Answer:** UNSAFE_componentWillMount etc. are legacy; may be removed. Avoid in new code. Use equivalent (useEffect, getDerivedStateFromProps replacement). Migration path from class to hooks.

### 373. Explain useLayoutEffect for DOM measurement.
**Answer:** useLayoutEffect runs after DOM update, before paint. Use for reading layout (getBoundingClientRect) and then updating state (e.g. position tooltip). Prevents flash.

### 374. How do you implement accordion?
**Answer:** State for open index or Set of open ids; click toggles; aria-expanded, aria-controls. Single or multiple open. Use details/summary for simple; custom for styling.

### 375. What is the difference between React and Svelte?
**Answer:** React: runtime, virtual DOM. Svelte: compile-time, no virtual DOM, smaller bundle. Both reactive. Svelte is less popular but fast. Choose by preference and ecosystem.

### 376. Explain React 18 createRoot and hydrateRoot.
**Answer:** createRoot for client-only; hydrateRoot for SSR. Both enable concurrent features. Replace render and hydrate with these for new apps.

### 377. How do you implement dropdown (custom select)?
**Answer:** State for open; click outside to close; keyboard (Arrow, Enter, Escape); aria-expanded, listbox role. Use floating-ui for position. Or use Radix Select.

### 378. What is the purpose of React.isValidElement?
**Answer:** isValidElement(object) checks if object is React element. Use when iterating children and handling both elements and other values. Rare.

### 379. Explain useReducer for complex form state.
**Answer:** One reducer with actions (SET_FIELD, SET_ERROR, SUBMIT); state has fields and errors. Single dispatch; predictable. Use for multi-field form with validation.

### 380. How do you implement modal (accessible)?
**Answer:** role="dialog"; aria-modal; focus trap; Escape to close; restore focus on close; aria-labelledby. Use portal for DOM placement. Use Radix Dialog or similar.

### 381. What is the difference between context and Redux?
**Answer:** Context: simple, built-in, re-render when value changes. Redux: predictable, middleware, devtools, time travel. Use Context for theme/auth; Redux for complex global state.

### 382. Explain React 18 useDeferredValue for list filtering.
**Answer:** Keep input value immediate; deferred value for filter; render list with deferred value. Input stays responsive; list updates when transition completes.

### 383. How do you implement carousel?
**Answer:** State for index; prev/next buttons; track with overflow hidden; optional autoplay (setInterval). Use CSS scroll-snap or transform. Consider swipe and a11y.

### 384. What is the purpose of ReactDOM.flushSync?
**Answer:** flushSync(fn) flushes updates synchronously. Use for measuring DOM after update or focus. Avoid in general; can hurt performance. Prefer async updates.

### 385. Explain custom hook for window size.
**Answer:** useState for width/height; useEffect add resize listener; set state; cleanup. Return { width, height }. Use for responsive layout. Throttle resize for perf. Or use matchMedia for breakpoints.

### 386. How do you implement breadcrumbs?
**Answer:** Pass path (array of { label, href }); render links; current page without link. Use nav and aria-current="page". SEO and a11y. Generate from route config.

### 387. What is the difference between shallow and deep compare?
**Answer:** Shallow: compare by reference (object/array) or value (primitive). Deep: recurse into objects. React uses shallow for props/state. Use memo with custom compare for deep if needed (rare).

### 388. Explain React 18 Suspense for lazy.
**Answer:** React.lazy + Suspense: component loads async; fallback shows until then. Standard for code splitting. Works with transitions (show fallback during transition).

### 389. How do you implement progress indicator?
**Answer:** State for progress (0-100); update from fetch (xhr progress) or steps. Visual: div with width or SVG. Use for upload/download or multi-step form.

### 390. What is the purpose of findDOMNode?
**Answer:** findDOMNode(component) returns DOM node. Deprecated; avoid. Use ref instead. Only for legacy. Ref is the correct API.

### 391. Explain useCallback with empty deps.
**Answer:** useCallback(fn, []) returns same function reference forever. Use for callbacks that don't depend on props/state (e.g. event handler that only calls dispatch). Stable reference.

### 392. How do you implement notification toast?
**Answer:** Context or global state for toasts; addToast(message); render list in portal; auto-dismiss with setTimeout. Use for success/error feedback. Consider queue and position.

### 393. What is the difference between React and Next.js?
**Answer:** React is library; Next.js is framework (SSR, routing, API routes). Next.js uses React. Use Next.js for full-stack, SEO, and conventions. Use React for SPA or custom setup.

### 394. Explain React 18 useTransition for heavy list.
**Answer:** Filter list in startTransition; isPending shows loading. List update doesn't block input. Use for search/filter with large list.

### 395. How do you implement sidebar collapse?
**Answer:** State for collapsed; toggle button; CSS width or class; persist in localStorage. Use for nav. Consider responsive (drawer on mobile).

### 396. What is the purpose of React.version?
**Answer:** React.version is string (e.g. "18.2.0"). Use for debugging or conditional logic for version. Rare.

### 397. Explain custom hook for document title.
**Answer:** useEffect(() => { document.title = title; return () => { document.title = previous; }; }, [title]). Use for page title per route or dynamic title.

### 398. How do you implement sortable list?
**Answer:** Library (dnd-kit, react-beautiful-dnd); drag and drop; reorder state. Or keyboard (Arrow + Alt). Use for reorderable list. A11y: announce order change.

### 399. What is the difference between element type and component?
**Answer:** Element type can be string ('div') or component (function/class). React treats string as DOM element; function/class as component. Same as "element" vs "component" conceptually.

### 400. Explain React 18 useId and SSR.
**Answer:** useId() generates same id on server and client when tree order matches. Avoids hydration mismatch. Use for form fields and labels in SSR app.

### 401. How do you implement search with debounce?
**Answer:** useState for query; useCallback with debounce (or useDebouncedCallback); call API when debounced query changes; show results. Use for search-as-you-type. Cancel previous request.

### 402. What is the purpose of ReactDOM.createPortal?
**Answer:** createPortal(children, container) renders children into container (e.g. body). Use for modals, tooltips. Same as "portal". Events bubble to React tree.

### 403. Explain useMemo for derived state.
**Answer:** useMemo(() => compute(props), [props]) avoids recompute when props unchanged. Use when computation is expensive. Don't use for trivial computation; cost of useMemo itself.

### 404. How do you implement wizard (multi-step form)?
**Answer:** State for step; next/prev; validate per step; submit on last step. Use URL or state for step. Progress indicator. Save draft optional.

### 405. What is the difference between class and function component lifecycle?
**Answer:** Class: componentDidMount, Update, Unmount, etc. Function: useEffect with deps. useEffect(() => {}, []) = mount; effect with deps = update; cleanup = unmount. One mental model for both.

### 406. Explain React 18 concurrent rendering and interruptibility.
**Answer:** React can interrupt render to handle urgent update (e.g. input). Low-priority update (e.g. list) can be interrupted. startTransition marks low priority. Improves responsiveness.

### 407. How do you implement table with sorting and pagination?
**Answer:** State for sort key and order, page; compute sorted slice; render table; headers click to sort; pagination controls. Or use react-table. Server-side: pass params to API.

### 408. What is the purpose of contextType (class)?
**Answer:** contextType = MyContext lets class component use this.context. One context per class. Prefer useContext in function components.

### 409. Explain custom hook for localStorage.
**Answer:** useState(initial); read from localStorage in initializer or useEffect; useEffect to write when state changes. Sync across tabs via storage event. Use for persist state.

### 410. How do you implement tree view?
**Answer:** Recursive component; data with children; state for expanded nodes; render indent and toggle. Use for file tree, category tree. A11y: arrow keys, aria-expanded.

### 411. What is the difference between React and Preact?
**Answer:** Preact is smaller React alternative; same API mostly. Use Preact for bundle size; React for ecosystem. Preact/compat for React compatibility.

### 412. Explain React 18 useDeferredValue and transition.
**Answer:** useDeferredValue defers value; startTransition defers update. Both keep UI responsive. Use deferred value for derived data; transition for explicit update scope.

### 413. How do you implement rich text editor?
**Answer:** contentEditable or library (Slate, TipTap); state for content (e.g. JSON); toolbar for format. Complex; use library. Consider accessibility and paste handling.

### 414. What is the purpose of ReactDOM.unmountComponentAtNode?
**Answer:** Legacy API; unmounts component tree at node. With createRoot use root.unmount(). Prefer React 18 root.unmount().

### 415. Explain useReducer with immer.
**Answer:** Use immer in reducer: produce(state, draft => { draft.field = value }); simpler updates. Or use useImmer hook. Use for nested state without spread hell.

### 416. How do you implement stepper (progress steps)?
**Answer:** Data for steps; state for current; render steps with completed/active; optional validation per step. Use for checkout or onboarding.

### 417. What is the difference between defaultProps and default parameters?
**Answer:** defaultProps on component; default params in function. Both set default. Prefer default params for function components. defaultProps still used with TypeScript or legacy.

### 418. Explain React 18 useTransition and useDeferredValue together.
**Answer:** startTransition for update; useDeferredValue for value used in heavy component. Both defer non-urgent work. Use for search: input immediate, results deferred.

### 419. How do you implement avatar with fallback?
**Answer:** img with onError set fallback (initials or placeholder); or two elements and hide one. Use for user avatar. Consider lazy load image.

### 420. What is the purpose of React.current?
**Answer:** No React.current. You might mean ref.current (useRef) or React version. Clarify question.

### 421. Explain custom hook for online status.
**Answer:** useState(navigator.onLine); useEffect add online/offline listeners; set state. Return isOnline. Use for offline indicator or disable actions when offline.

### 422. How do you implement badge (notification count)?
**Answer:** Small overlay on icon; count or dot. Position absolute. Use for cart count, notifications. A11y: aria-label with count.

### 423. What is the difference between createRoot and hydrateRoot?
**Answer:** createRoot for client-only render. hydrateRoot for attaching to server-rendered DOM. Both return root with render and unmount. Use hydrateRoot for SSR.

### 424. Explain React 18 useSyncExternalStore getServerSnapshot.
**Answer:** getServerSnapshot for SSR; must return same value as getSnapshot on first client render to avoid hydration mismatch. Use when store has server value.

### 425. How do you implement pagination (client-side)?
**Answer:** State for page; slice array for current page; render page size items; prev/next or page numbers. Use for small list. Server-side for large data.

### 426. What is the purpose of React.Children.only?
**Answer:** React.Children.only(children) returns single child or throws. Use when component expects exactly one child. Rare.

### 427. Explain useLayoutEffect cleanup.
**Answer:** useLayoutEffect can return cleanup; runs synchronously before next layout effect or unmount. Use for removing listener or restoring DOM. Same timing as effect but before paint.

### 428. How do you implement tag input (multiple values)?
**Answer:** State for array of tags; input for new tag; Enter or comma to add; backspace to remove; render as chips. Use for keywords, recipients. Validate and limit.

### 429. What is the difference between React 17 and 18 events?
**Answer:** React 17: events on document. React 18: events on root. Delegation change. Usually no code change. New in 18: automatic batching, concurrent features, createRoot.

### 430. Explain custom hook for media query.
**Answer:** useState for match; useEffect with matchMedia(query).addListener; set state; cleanup. Return boolean. Use for responsive render. Or use library (usehooks-ts).

### 431. How do you implement rating (stars)?
**Answer:** State or controlled value (1-5); render stars; click sets value; hover for preview optional. Use aria-label and role for a11y. Half stars optional.

### 432. What is the purpose of StrictMode double invoke?
**Answer:** In dev StrictMode double-invokes render and effects to surface side effects and impure code. Ensures cleanup and re-setup work. No double invoke in production.

