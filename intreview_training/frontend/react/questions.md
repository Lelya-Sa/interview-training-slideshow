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

