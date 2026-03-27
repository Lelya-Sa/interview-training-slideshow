# Full-Stack Interview Questions & Answers (React & Node.js)

---

## React – Basics

### 1. What is the difference between props and state?

**Props (Properties):**
- Props are **read-only** data passed from parent to child components
- Props are **immutable** - a component cannot change its own props
- Used for passing data down the component tree
- Props flow **unidirectionally** (top to bottom)

**State:**
- State is **mutable** data managed within a component
- State can be changed using `setState` (class components) or `useState` hook (functional components)
- State changes trigger component re-renders
- State is **local** to the component that owns it

**Key Difference:** Props are passed in, state is managed internally.

**Complete Example:**
```javascript
// Parent Component
function App() {
  const [count, setCount] = useState(0); // State in parent
  
  return (
    <div>
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
      {/* count and onIncrement are PROPS passed to child */}
    </div>
  );
}

// Child Component
function Counter({ count, onIncrement }) {
  // count and onIncrement are PROPS (read-only, from parent)
  const [localCount, setLocalCount] = useState(0); // STATE (local to this component)
  
  return (
    <div>
      <p>Parent count (prop): {count}</p>
      <p>Local count (state): {localCount}</p>
      <button onClick={onIncrement}>Increment Parent</button>
      <button onClick={() => setLocalCount(localCount + 1)}>Increment Local</button>
    </div>
  );
}
```

---

### 2. What is the Virtual DOM and why is it efficient?

**Virtual DOM:**
- A lightweight JavaScript representation of the real DOM
- React creates a virtual tree of React elements in memory
- When state changes, React creates a new virtual DOM tree
- React then compares (diffs) the new virtual DOM with the previous one
- Only the **differences** are updated in the real DOM (reconciliation)

**Why it's efficient:**
- **Batching updates:** Multiple state changes are batched into a single DOM update
- **Minimal DOM manipulation:** Only changed elements are updated, not entire pages
- **Faster comparisons:** Comparing JavaScript objects is faster than DOM operations
- **Optimized diffing algorithm:** React uses efficient algorithms to find minimal changes

**Example:**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  const handleClick = () => {
    setCount(count + 1);  // State change 1
    setName('Jane');      // State change 2
    // React batches these into ONE DOM update!
  };
  
  return (
    <div>
      <h1>{name}</h1>  {/* Only this updates if name changes */}
      <p>{count}</p>    {/* Only this updates if count changes */}
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

// What happens:
// 1. User clicks button
// 2. React creates new Virtual DOM tree
// 3. Compares with previous Virtual DOM
// 4. Finds only <h1> and <p> changed
// 5. Updates ONLY those elements in real DOM
// 6. Rest of page unchanged (fast!)
```

---

### 3. What is JSX? Is it mandatory?

**JSX (JavaScript XML):**
- A syntax extension that allows writing HTML-like code in JavaScript
- JSX is **transpiled** to `React.createElement()` calls by Babel
- Makes React code more readable and intuitive

**Is it mandatory?**
- **No**, JSX is not mandatory. You can write React without JSX:
  ```javascript
  // With JSX
  const element = <h1>Hello</h1>;
  
  // Without JSX (equivalent)
  const element = React.createElement('h1', null, 'Hello');
  ```
- However, JSX is the **recommended** and most common way to write React code

---

### 4. Why do we need keys in lists?

**Keys:**
- Special string attributes used to identify which items have changed, been added, or removed
- Keys help React efficiently update the DOM during reconciliation

**Why they're important:**
- **Performance:** React can quickly identify which items changed without re-rendering everything
- **State preservation:** Keys help React maintain component state correctly when list order changes
- **Avoiding bugs:** Without keys, React may incorrectly reuse components, causing state issues

**Best practices:**
- Use **unique, stable** identifiers (IDs from data, not array indices)
- Keys should be unique among siblings
- Don't use array index as key if list order can change

```javascript
// Good
{items.map(item => <Item key={item.id} data={item} />)}

// Bad (if items can be reordered)
{items.map((item, index) => <Item key={index} data={item} />)}
```

**Complete Project Example: Todo List App**

```javascript
// ✅ Project Example: Todo List with Proper Keys
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(), // Unique ID (or use UUID in production)
        text: newTodo,
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Reorder todos (drag and drop simulation)
  const moveUp = (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
      setTodos(newTodos);
    }
  };

  return (
    <div>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {/* ✅ GOOD: Using unique ID as key */}
        {todos.map(todo => (
          <TodoItem
            key={todo.id}  // Stable, unique identifier
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onMoveUp={moveUp}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDelete, onToggle, onMoveUp }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // State is preserved correctly because of proper key
  // Even when todos are reordered, React knows which component is which

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              // Update todo text
            }}
          />
        </>
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
      <button onClick={() => onMoveUp(todo.id)}>↑</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// ❌ BAD Example: Using index as key
function BadTodoApp() {
  const [todos, setTodos] = useState([
    { text: 'Learn React', completed: false },
    { text: 'Build Todo App', completed: false },
    { text: 'Deploy to production', completed: false }
  ]);

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {/* ❌ BAD: Using index as key */}
      {todos.map((todo, index) => (
        <TodoItem
          key={index}  // ❌ Problem: Index changes when items are deleted/reordered!
          todo={todo}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </ul>
  );
}

// Problems with index as key:
// 1. If you delete the first item, all remaining items get new keys
// 2. React thinks all items changed and re-renders everything
// 3. Component state (like isEditing) gets mixed up between items
// 4. Performance issues - unnecessary re-renders
// 5. Input values can jump to wrong items when list changes

// Real-world scenario:
// - User is editing "Build Todo App" (index 1)
// - User deletes "Learn React" (index 0)
// - Now "Build Todo App" becomes index 0
// - React thinks it's a new item (key changed from 1 to 0)
// - Editing state is lost or moved to wrong item!
```

**Key Takeaways:**
- ✅ **Always use unique IDs** from your data (e.g., `todo.id`, `user.id`, `product.id`)
- ✅ **Keys should be stable** - don't generate random keys on each render
- ✅ **Keys help React track** which items changed, were added, or removed
- ❌ **Never use index as key** if list can be reordered, filtered, or items deleted
- ❌ **Index as key causes bugs** with component state, form inputs, and performance issues

---

### 5. When does a React component re-render?

A React component re-renders when:

1. **State changes:** When `setState` is called (class) or state setter from `useState` (hooks)
2. **Props change:** When parent component passes new props
3. **Parent re-renders:** Child components re-render when parent re-renders (unless optimized)
4. **Context value changes:** When a consumed context value changes
5. **Force update:** When `forceUpdate()` is called (class components, rarely used)

**Note:** Re-rendering doesn't always mean the DOM is updated - React's reconciliation process determines what actually changes.

**Complete Example:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Name: {name}</button>
      <Child name={name} /> {/* Re-renders when name changes */}
    </div>
  );
}

function Child({ name }) {
  console.log('Child rendered'); // Logs when component re-renders
  
  // This component re-renders when:
  // 1. Parent re-renders (because parent state changed)
  // 2. name prop changes
  // 3. But NOT when count changes (if optimized with React.memo)
  
  return <p>Hello, {name}!</p>;
}

// Example with Context
const ThemeContext = createContext();

// 📚 EXPLANATION: createContext()
// 
// createContext() is NOT a hook - it's a React function that creates a Context object.
// 
// What it does:
// 1. Creates a "channel" for sharing data between components without prop drilling
// 2. Returns a Context object with two components: Provider and Consumer
// 3. Allows any component in the tree to access the shared data
//
// How it works:
// Step 1: Create the context (usually outside component)
//   const ThemeContext = createContext('light'); // Optional: default value
//
// Step 2: Provide the value (wrap components with Provider)
//   <ThemeContext.Provider value={theme}>
//     <YourComponents />
//   </ThemeContext.Provider>
//
// Step 3: Consume the value (use useContext hook)
//   const theme = useContext(ThemeContext);
//
// Key Points:
// - createContext() is called ONCE (usually at module level, outside components)
// - The Context object itself doesn't hold data - it's just a "channel"
// - The Provider component actually provides the data
// - Multiple components can consume the same context
// - Context value can be any type: string, number, object, function, etc.
//
// When to use:
// - When data needs to be shared by many components at different levels
// - To avoid "prop drilling" (passing props through many levels)
// - For app-wide data: theme, user authentication, language, etc.
//
// Example breakdown:
const ThemeContext = createContext('light'); // Creates context with default value 'light'
// This creates:
// - ThemeContext.Provider (component to provide value)
// - ThemeContext.Consumer (component to consume value - old way)
// - ThemeContext (the context object itself)

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent /> {/* Re-renders when theme changes */}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext); // Re-renders when context value changes
  return <div className={theme}>Content</div>;
}

// 🎯 COMPLETE EXAMPLE: Understanding createContext Step-by-Step

// Step 1: CREATE the context (outside component, at module level)
const UserContext = createContext(null); // null is default value if no Provider found

// Step 2: CREATE a Provider component (optional but recommended)
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching user
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);
  
  // Provide both user data AND setter function
  const value = {
    user,
    setUser,
    loading
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Step 3: USE the context in any component (no prop drilling needed!)
function Header() {
  const { user, loading } = useContext(UserContext); // Access user directly!
  
  if (loading) return <div>Loading...</div>;
  return <header>Welcome, {user?.name}!</header>;
}

function Sidebar() {
  const { user } = useContext(UserContext); // Same context, different component!
  return <aside>User ID: {user?.id}</aside>;
}

function Profile() {
  const { user, setUser } = useContext(UserContext); // Can also update!
  
  const updateName = () => {
    setUser({ ...user, name: 'New Name' });
  };
  
  return (
    <div>
      <p>Name: {user?.name}</p>
      <button onClick={updateName}>Update Name</button>
    </div>
  );
}

// Step 4: Wrap your app with Provider
function App() {
  return (
    <UserProvider> {/* Provides context to all children */}
      <Header />      {/* Can access user */}
      <Sidebar />     {/* Can access user */}
      <Profile />     {/* Can access and update user */}
    </UserProvider>
  );
}

// 🔍 What createContext() Actually Returns:
const MyContext = createContext('default');
console.log(MyContext);
// Returns an object with:
// {
//   Provider: Component,  // Used to provide value
//   Consumer: Component,  // Old way to consume (use useContext instead)
//   _currentValue: 'default',  // Internal React property
//   displayName: undefined  // For React DevTools
// }

// 💡 Key Concepts:
// 1. createContext() is called ONCE (not inside components)
// 2. It creates a "channel" but doesn't store data
// 3. Provider actually provides the data
// 4. useContext() reads the data from nearest Provider
// 5. If no Provider found, uses default value (or undefined)
// 6. Multiple components can use same context
// 7. Context value can be anything: string, object, function, etc.
```

---

## React – Hooks

### 6. What does useState do?

`useState` is a Hook that lets you add state to functional components.

```javascript
const [state, setState] = useState(initialValue);
```

- Returns an array with two elements: current state value and a function to update it
- The initial value is only used on the first render
- State updates trigger re-renders
- Multiple `useState` calls can be used for different state variables

**Complete Example:**
```javascript
function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0); // Initial value: 0
  const [name, setName] = useState('');  // Initial value: empty string
  const [user, setUser] = useState({ name: 'John', age: 25 }); // Object
  
  const increment = () => {
    setCount(count + 1); // Update count
  };
  
  const updateName = () => {
    setName('Jane'); // Update name
  };
  
  const updateUser = () => {
    // For objects, need to create new object (immutability)
    setUser({ ...user, age: 26 }); // Update age, keep name
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>User: {user.name}, Age: {user.age}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={updateName}>Change Name</button>
      <button onClick={updateUser}>Update Age</button>
    </div>
  );
}
```

---

### 7. When do you use useEffect?

`useEffect` is used for **side effects** in functional components - operations that affect something outside the component's render.

**Common use cases:**
- **API calls:** Fetching data when component mounts
- **Subscriptions:** Setting up event listeners, WebSocket connections
- **DOM manipulation:** Direct DOM updates (though usually avoidable)
- **Timers:** Setting up intervals or timeouts
- **Cleanup:** Cleaning up resources when component unmounts

**Complete Examples:**

```javascript
// Example 1: Fetch data on mount
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // This runs after component mounts
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [userId]); // Runs when userId changes
  
  return <div>{user?.name}</div>;
}

// Example 2: Set up subscription
function ChatRoom({ roomId }) {
  useEffect(() => {
    // Set up WebSocket connection
    const socket = new WebSocket(`ws://localhost:3000/room/${roomId}`);
    
    socket.onmessage = (event) => {
      console.log('Message:', event.data);
    };
    
    // Cleanup: Close connection when component unmounts
    return () => {
      socket.close();
    };
  }, [roomId]);
  
  return <div>Chat Room {roomId}</div>;
}

// Example 3: Update document title
function Page({ title }) {
  useEffect(() => {
    // Side effect: Change browser tab title
    document.title = title;
    
    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = 'My App';
    };
  }, [title]); // Runs when title changes
  
  return <h1>{title}</h1>;
}
```

---

### 8. What is the difference between:
   - `useEffect(() => {}, [])`
   - `useEffect(() => {})`

**`useEffect(() => {}, [])` - Empty dependency array:**
- Runs **once** after the initial render
- Equivalent to `componentDidMount` in class components
- Use for one-time setup (API calls on mount, subscriptions)

**`useEffect(() => {})` - No dependency array:**
- Runs **after every render** (initial + all updates)
- Equivalent to `componentDidMount` + `componentDidUpdate`
- Usually **not recommended** - can cause infinite loops if state is updated inside
- Use only when you need the effect to run on every render (rare)

**Complete Examples:**

```javascript
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // ✅ Runs ONCE after initial render (like componentDidMount)
  useEffect(() => {
    console.log('Component mounted - fetching data');
    fetch('/api/data').then(res => res.json());
  }, []); // Empty array = run once
  
  // ⚠️ Runs on EVERY render (usually bad!)
  useEffect(() => {
    console.log('Rendered!'); // Logs on every state change
    // WARNING: If you update state here, you'll get infinite loop!
  }); // No array = run every render
  
  // ✅ Runs when count changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Only runs when count changes
  
  // ✅ Runs when count OR name changes
  useEffect(() => {
    console.log('Count or name changed');
  }, [count, name]); // Runs when either changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Change Name</button>
    </div>
  );
}
```

---

### 9. What is cleanup in useEffect?

**Cleanup function:**
- An optional function returned from `useEffect`
- Runs when the component unmounts OR before the effect runs again (if dependencies change)
- Used to clean up resources to prevent memory leaks

**Common cleanup scenarios:**
- **Cancel API requests:** Abort fetch requests
- **Remove event listeners:** Prevent memory leaks
- **Clear timers:** Stop intervals/timeouts
- **Close connections:** WebSocket, database connections

**Complete Examples:**

```javascript
// Example 1: Timer cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup: Clear timer when component unmounts
    return () => {
      clearInterval(timer); // Prevents memory leak!
    };
  }, []); // Empty deps = runs once on mount
  
  return <div>Timer: {seconds}s</div>;
}

// Example 2: API request cleanup
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }
    
    fetchUser();
    
    // Cleanup: Cancel request if component unmounts
    return () => {
      abortController.abort(); // Cancels ongoing request
    };
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// Example 3: Event listener cleanup
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div>Window width: {width}px</div>;
}
```

---

### 10. What is the dependency array and why is it important?

**Dependency array:**
- The second parameter to `useEffect` - an array of values the effect depends on
- Controls **when** the effect runs

**Why it's important:**
- **Performance:** Prevents unnecessary effect executions
- **Correctness:** Ensures effect has access to latest values
- **Prevents bugs:** Avoids stale closures and infinite loops

**Rules:**
- **Empty array `[]`:** Effect runs once on mount
- **No array:** Effect runs on every render (usually bad)
- **With dependencies `[a, b]`:** Effect runs when `a` or `b` changes

**Complete Examples:**

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // ✅ Correct: userId in dependency array
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Runs when userId changes
  
  // ❌ Wrong: Missing userId dependency
  useEffect(() => {
    fetch(`/api/users/${userId}`) // Using userId but not in deps!
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // ESLint warning: missing 'userId' in dependencies
  
  // ✅ Correct: Multiple dependencies
  useEffect(() => {
    if (user) {
      fetch(`/api/posts?userId=${userId}&name=${user.name}`)
        .then(res => res.json())
        .then(data => setPosts(data));
    }
  }, [userId, user]); // Runs when userId OR user changes
  
  // ✅ Correct: Empty array (runs once)
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Runs only on mount
  
  // ⚠️ No array (runs every render - usually bad)
  useEffect(() => {
    console.log('Rendered');
  }); // Runs on every render - can cause performance issues
  
  return <div>{user?.name}</div>;
}
```

---

### 11. When should you use useContext?

`useContext` is used when you need to access context values without prop drilling.

**Use cases:**
- **Theme:** Dark/light mode across app
- **Authentication:** User data, login status
- **Language:** i18n translations
- **Global state:** Shared state across many components
- **Avoiding prop drilling:** Passing data through many component levels

**When NOT to use:**
- For data used by only a few closely related components (use props)
- For frequently changing data (can cause performance issues)

**Complete Example:**

```javascript
// Step 1: Create context
const ThemeContext = createContext();
const UserContext = createContext();

// Step 2: Create provider component
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John', role: 'user' });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={user}>
        <Header />
        <MainContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Step 3: Use context in any child component (no prop drilling!)
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <header className={theme}>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useContext(ThemeContext);
  // Can access theme without props!
  
  return <main className={theme}>Content</main>;
}

// Without Context (prop drilling - bad):
function AppWithoutContext() {
  const [theme, setTheme] = useState('light');
  
  return (
    <Header theme={theme} setTheme={setTheme} /> {/* Passing through */}
  );
}

function Header({ theme, setTheme }) {
  return (
    <Navbar theme={theme} setTheme={setTheme} /> {/* Passing through again */}
  );
}

function Navbar({ theme, setTheme }) {
  return <nav className={theme}>Nav</nav>; // Finally using it!
}
```

---

### 12. What is the difference between useRef and useState?

**`useState`:**
- Creates **reactive** state - changes trigger re-renders
- Value persists across renders
- Used for data that affects UI

**`useRef`:**
- Creates a **mutable** reference that doesn't trigger re-renders
- Value persists across renders (within the same component instance)
- Used for:
  - Accessing DOM elements directly
  - Storing mutable values that don't need to trigger renders
  - Keeping previous values

**Key difference:** `useState` causes re-renders, `useRef` does not.

**🎯 When to Use useState vs useRef - Decision Guide:**

| Scenario | Use | Why |
|----------|-----|-----|
| **Data that affects UI/display** | `useState` | UI needs to update when value changes |
| **Form inputs (controlled)** | `useState` | Need to track and display input value |
| **Counters, toggles, flags** | `useState` | UI shows current value |
| **API data to display** | `useState` | Need to render fetched data |
| **Accessing DOM elements** | `useRef` | Direct DOM manipulation, no UI update needed |
| **Focusing inputs** | `useRef` | Imperative DOM operation |
| **Storing previous values** | `useRef` | Don't want to trigger re-render |
| **Timer IDs, interval references** | `useRef` | Need to clear later, no UI impact |
| **Tracking render count** | `useRef` | Debugging, no UI update needed |
| **Previous props/state** | `useRef` | Compare with current, no re-render |
| **Mutable values that don't affect UI** | `useRef` | Performance - avoid unnecessary renders |
| **Third-party library instances** | `useRef` | Store library objects, no React state needed |

**Quick Decision Tree:**

```
Do you need the UI to update when this value changes?
├─ YES → Use useState
│   ├─ Form inputs? → useState
│   ├─ Display data? → useState
│   ├─ Toggle/switch? → useState
│   └─ Counter? → useState
│
└─ NO → Use useRef
    ├─ DOM element access? → useRef
    ├─ Previous value storage? → useRef
    ├─ Timer/interval ID? → useRef
    └─ Mutable value (no UI)? → useRef
```

**Complete Examples:**

```javascript
// ✅ USE useState - Data affects UI
function Counter() {
  const [count, setCount] = useState(0); // ✅ UI shows count
  
  return (
    <div>
      <p>Count: {count}</p> {/* UI updates when count changes */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ✅ USE useState - Form input (controlled)
function LoginForm() {
  const [email, setEmail] = useState(''); // ✅ UI shows input value
  const [password, setPassword] = useState(''); // ✅ UI shows input value
  
  return (
    <form>
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
    </form>
  );
}

// ✅ USE useRef - DOM access (no UI update needed)
function FocusInput() {
  const inputRef = useRef(null); // ✅ No UI update, just DOM access
  
  const handleClick = () => {
    inputRef.current.focus(); // Direct DOM operation
    // No need to re-render component
  };
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// ✅ USE useRef - Store previous value (no re-render needed)
function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(); // ✅ Store previous, no UI update
  
  useEffect(() => {
    prevCountRef.current = count; // Update ref without re-render
  });
  
  return (
    <div>
      <p>Previous: {prevCountRef.current}</p>
      <p>Current: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ✅ USE useRef - Timer ID (no UI update)
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); // ✅ Store interval ID
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current); // Clear using ref
  };
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// ✅ USE useRef - Render count (debugging, no UI)
function Component() {
  const renderCount = useRef(0); // ✅ Track renders, no UI update
  renderCount.current += 1;
  
  console.log('Rendered', renderCount.current, 'times');
  // No need to show this in UI, just for debugging
}

// ❌ WRONG - Using useState when you don't need UI update
function BadExample() {
  const [inputRef, setInputRef] = useState(null); // ❌ Wrong!
  
  // This causes unnecessary re-renders
  // Use useRef instead
}

// ✅ CORRECT - Using useRef for DOM reference
function GoodExample() {
  const inputRef = useRef(null); // ✅ Correct!
  
  // No re-renders when ref changes
}
```

**Common Mistakes:**

```javascript
// ❌ MISTAKE 1: Using useState for DOM references
const [inputElement, setInputElement] = useState(null);
// Problem: Causes re-render when ref is set
// Fix: Use useRef instead

// ✅ CORRECT
const inputRef = useRef(null);

// ❌ MISTAKE 2: Using useRef for data that should update UI
const [count, setCount] = useRef(0); // ❌ Wrong syntax and wrong hook!
// Problem: UI won't update when count changes
// Fix: Use useState

// ✅ CORRECT
const [count, setCount] = useState(0);

// ❌ MISTAKE 3: Using useRef for form inputs (uncontrolled)
function Form() {
  const emailRef = useRef(null);
  return <input ref={emailRef} />; // Uncontrolled input
  // Problem: Can't easily validate, reset, or control input
  // Fix: Use useState for controlled inputs (unless you have a good reason)
}

// ✅ CORRECT (for most cases)
function Form() {
  const [email, setEmail] = useState('');
  return <input value={email} onChange={e => setEmail(e.target.value)} />;
}
```

**Summary Rules:**
- ✅ **useState:** When value changes should update the UI
- ✅ **useRef:** When you need to store a value that doesn't affect rendering
- ✅ **useState:** For controlled inputs, display data, toggles
- ✅ **useRef:** For DOM access, previous values, timer IDs, mutable values without UI impact

**Important: Unmount/Remount Behavior:**
- When a component **unmounts**, all hooks (including `useRef`) are destroyed
- When the component **remounts**, it's a completely **new instance**
- `useRef` returns to its **initial value** (the default you passed)
- The changed reference value is **lost** - it doesn't persist across unmount/remount
- This is different from `localStorage` or external storage which persists

**React.memo and Unmount/Remount:**
- **React.memo does NOT prevent unmounting/remounting** - it only prevents re-renders
- **Re-rendering vs Unmounting:**
  - **Re-render:** Component stays mounted, just updates (hooks persist)
  - **Unmount:** Component is removed from DOM (hooks destroyed)
  - **Remount:** Component is added back (new instance, fresh hooks)
- **React.memo** prevents re-renders when props haven't changed, but:
  - If parent conditionally renders the component (`{show && <MemoizedChild />}`), it will still unmount/remount
  - If the component is removed from the tree, React.memo doesn't help - it still unmounts
  - When it remounts, `useRef` still resets to initial value (React.memo doesn't preserve it)

**📚 Detailed Explanation of Conditional Rendering and React.memo:**

**What React.memo does:**
- React.memo is a **performance optimization** that prevents re-renders
- It compares props and skips re-rendering if props haven't changed
- It only works when the component **stays in the DOM tree**

**What React.memo does NOT do:**
- React.memo **cannot prevent unmounting** when a component is removed from the tree
- React.memo **cannot preserve state/refs** across unmount/remount cycles
- React.memo only works for **re-renders**, not for **mount/unmount**

**Example: Conditional Rendering (Component Removed from Tree)**

```javascript
// Parent component
function Parent() {
  const [showChild, setShowChild] = useState(true);
  const [parentState, setParentState] = useState(0);
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? 'Hide' : 'Show'} Child
      </button>
      <button onClick={() => setParentState(parentState + 1)}>
        Parent State: {parentState}
      </button>
      
      {/* Conditional rendering - component is added/removed from tree */}
      {showChild && <MemoizedChild />}
    </div>
  );
}

// Memoized child component
const MemoizedChild = React.memo(function Child() {
  const [count, setCount] = useState(0);
  const refValue = useRef(0);
  
  useEffect(() => {
    console.log('Child mounted');
    return () => {
      console.log('Child unmounted - ref value:', refValue.current);
    };
  }, []);
  
  const updateRef = () => {
    refValue.current = 100;
    console.log('Ref updated to:', refValue.current);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Ref: {refValue.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={updateRef}>Set Ref to 100</button>
    </div>
  );
});

// What happens:
//
// SCENARIO 1: Component is shown (showChild = true)
// 1. Component mounts → refValue.current = 0
// 2. User clicks "Set Ref to 100" → refValue.current = 100
// 3. User clicks "Parent State" → Parent re-renders
//    - React.memo checks: Child has no props, props didn't change
//    - Child does NOT re-render ✅ (React.memo works!)
//    - refValue.current = 100 (preserved because component stayed mounted)
//
// SCENARIO 2: Component is hidden (showChild = false)
// 1. User clicks "Hide Child"
// 2. {showChild && <MemoizedChild />} evaluates to false
// 3. Component is REMOVED from the tree
// 4. Component UNMOUNTS ❌ (React.memo cannot prevent this!)
// 5. useEffect cleanup runs → logs "Child unmounted - ref value: 100"
// 6. All hooks are destroyed, refValue.current = 100 is LOST
//
// SCENARIO 3: Component is shown again (showChild = true)
// 1. User clicks "Show Child"
// 2. {showChild && <MemoizedChild />} evaluates to <MemoizedChild />
// 3. Component is ADDED to the tree
// 4. Component REMOUNTS (completely new instance)
// 5. useEffect runs → logs "Child mounted"
// 6. refValue.current = 0 (back to initial value) ❌
// 7. React.memo didn't help - it's a new component instance!

// Key Points:
// ✅ React.memo prevents re-renders when component STAYS in tree
// ❌ React.memo CANNOT prevent unmounting when component is REMOVED from tree
// ❌ React.memo CANNOT preserve refs/state across unmount/remount
// 
// The conditional rendering ({show && <Component />}) controls whether
// the component exists in the tree at all, which is different from
// re-rendering (component stays, just updates).
```

**Visual Comparison:**

```
RE-RENDER (React.memo helps):
Parent re-renders → Component stays in tree → React.memo checks props → 
  Props same? → Skip re-render ✅ → Refs preserved ✅

UNMOUNT/REMOUNT (React.memo doesn't help):
Parent changes showChild to false → Component removed from tree → 
  Component unmounts ❌ → Refs destroyed ❌ → 
Parent changes showChild to true → Component added to tree → 
  Component remounts (new instance) ❌ → Refs reset to initial ❌
```
- **React.memo preserves ref values during re-renders** (when component stays mounted), but **NOT across unmount/remount**

**🔍 Can You Preserve Component Instance After Unmounting?**

**Short Answer: No, React does NOT preserve component instances after unmounting.**

When a component unmounts:
- The component instance is **completely destroyed**
- All hooks are **reset**
- All state is **lost**
- All refs are **lost**
- This is by design - React cleans up everything

**However, there are workarounds to preserve STATE (not the instance itself):**

**✅ Workaround 1: Keep Component Mounted but Hidden (CSS)**
```javascript
function Parent() {
  const [showChild, setShowChild] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? 'Hide' : 'Show'} Child
      </button>
      
      {/* Component stays mounted, just hidden */}
      <div style={{ display: showChild ? 'block' : 'none' }}>
        <Child />
      </div>
      
      {/* OR using visibility */}
      <div style={{ visibility: showChild ? 'visible' : 'hidden' }}>
        <Child />
      </div>
    </div>
  );
}

function Child() {
  const [count, setCount] = useState(0);
  const refValue = useRef(0);
  
  // Component never unmounts, so state/refs are preserved!
  // ✅ This works - component stays in tree, just hidden
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Ref: {refValue.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 📚 EXPLANATION: Why This Component Never Unmounts
//
// The component never unmounts NOT because it lacks a return statement
// (it has one - shown above). It never unmounts because of HOW THE PARENT RENDERS IT.
//
// KEY DIFFERENCE:
//
// ❌ CONDITIONAL RENDERING (Component DOES unmount):
//   {showChild && <Child />}
//   When showChild = false, React removes <Child /> from the tree
//   → Component UNMOUNTS → State/refs are LOST
//
// ✅ ALWAYS RENDERED, JUST HIDDEN (Component NEVER unmounts):
//   <div style={{ display: showChild ? 'block' : 'none' }}>
//     <Child />
//   </div>
//   <Child /> is ALWAYS in the tree (always rendered)
//   → Component stays MOUNTED → State/refs are PRESERVED
//   → Only the CSS changes (hidden vs visible)
//
// VISUAL COMPARISON:
//
// Conditional Rendering:
//   showChild = true  → <Child /> exists in tree → MOUNTED
//   showChild = false → <Child /> removed from tree → UNMOUNTED ❌
//   showChild = true  → <Child /> added to tree → REMOUNTED (new instance)
//
// CSS Hiding:
//   showChild = true  → <Child /> in tree, display: block → MOUNTED
//   showChild = false → <Child /> in tree, display: none → STILL MOUNTED ✅
//   showChild = true  → <Child /> in tree, display: block → STILL MOUNTED ✅
//
// The component has a return statement - that's not the issue.
// The issue is whether the component is REMOVED from the React tree or just HIDDEN with CSS.

// SIDE-BY-SIDE COMPARISON:
function ParentComparison() {
  const [showChild, setShowChild] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>Toggle</button>
      
      {/* ❌ METHOD 1: Conditional Rendering - Component UNMOUNTS */}
      <div>
        <h3>Method 1: Conditional Rendering</h3>
        {showChild && <Child />}
        {/* 
          When showChild = false:
          - <Child /> is REMOVED from React tree
          - Component UNMOUNTS
          - useEffect cleanup runs
          - State/refs are DESTROYED
        */}
      </div>
      
      {/* ✅ METHOD 2: CSS Hiding - Component STAYS MOUNTED */}
      <div>
        <h3>Method 2: CSS Hiding</h3>
        <div style={{ display: showChild ? 'block' : 'none' }}>
          <Child />
        </div>
        {/* 
          When showChild = false:
          - <Child /> STAYS in React tree
          - Component stays MOUNTED
          - Only CSS changes (display: none)
          - State/refs are PRESERVED
        */}
      </div>
    </div>
  );
}

function Child() {
  const [count, setCount] = useState(0);
  const refValue = useRef(0);
  
  useEffect(() => {
    console.log('Child mounted');
    return () => {
      console.log('Child unmounted'); // Only logs with Method 1
    };
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Ref: {refValue.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => refValue.current = 100}>Set Ref to 100</button>
    </div>
  );
}

// Test it:
// Method 1: Click "Set Ref to 100", then toggle off/on
//   → Ref resets to 0 (component unmounted/remounted)
// Method 2: Click "Set Ref to 100", then toggle off/on  
//   → Ref stays at 100 (component never unmounted)
```

**✅ Workaround 2: Lift State to Parent (Never Unmounts)**
```javascript
function Parent() {
  const [showChild, setShowChild] = useState(true);
  const [childState, setChildState] = useState(0); // State in parent
  const childRef = useRef(0); // Ref in parent
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? 'Hide' : 'Show'} Child
      </button>
      
      {/* State preserved in parent - never unmounts */}
      {showChild && (
        <Child 
          state={childState} 
          setState={setChildState}
          refValue={childRef}
        />
      )}
    </div>
  );
}

function Child({ state, setState, refValue }) {
  // State lives in parent, so it's preserved even when child unmounts
  // ✅ This works - state persists in parent
}
```

**✅ Workaround 3: External State Management (Redux, Context, etc.)**
```javascript
// Using Context (never unmounts)
const AppContext = createContext();

function App() {
  const [globalState, setGlobalState] = useState({ count: 0, refValue: 0 });
  
  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <Parent />
    </AppContext.Provider>
  );
}

function Parent() {
  const [showChild, setShowChild] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>Toggle</button>
      {showChild && <Child />}
    </div>
  );
}

function Child() {
  const { globalState, setGlobalState } = useContext(AppContext);
  
  // State in Context - preserved even when component unmounts
  // ✅ This works - state lives outside component
}
```

**✅ Workaround 4: localStorage/sessionStorage**
```javascript
function Child() {
  // Save to localStorage before unmount
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem('childCount')) || 0;
  });
  
  useEffect(() => {
    localStorage.setItem('childCount', count.toString());
  }, [count]);
  
  useEffect(() => {
    return () => {
      // Cleanup: save final state
      localStorage.setItem('childCount', count.toString());
    };
  }, [count]);
  
  // On remount, reads from localStorage
  // ✅ This works - persists across unmount/remount
}
```

**✅ Workaround 5: Custom Hook with External Storage**
```javascript
// Custom hook that persists state
function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState];
}

function Child() {
  const [count, setCount] = usePersistedState('childCount', 0);
  // ✅ State persists across unmount/remount via localStorage
}
```

**❌ What Does NOT Work:**
```javascript
// ❌ React.memo - doesn't preserve instance
const MemoizedChild = React.memo(Child); // Still unmounts/remounts

// ❌ useRef - resets on remount
const ref = useRef(0); // Lost on unmount

// ❌ useState - resets on remount
const [state, setState] = useState(0); // Lost on unmount

// ❌ Component instance - cannot be preserved
// React destroys it completely
```

**Summary:**
- ❌ **Component instances cannot be preserved** after unmounting
- ✅ **State can be preserved** using external storage (parent state, Context, Redux, localStorage)
- ✅ **Component can stay mounted** but hidden (CSS display/visibility)
- ✅ **Best practice:** Lift state up or use external state management if you need persistence

**Complete Examples:**

```javascript
// Example 1: Accessing DOM elements
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access DOM directly without re-render
    console.log('Email:', emailRef.current.value);
    console.log('Password:', passwordRef.current.value);
  };
  
  const focusEmail = () => {
    emailRef.current.focus(); // Focus input without state change
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" />
      <input ref={passwordRef} type="password" />
      <button type="button" onClick={focusEmail}>Focus Email</button>
      <button type="submit">Submit</button>
    </form>
  );
}

// Example 2: Storing previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count; // Store previous value
  });
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>Previous: {prevCount}</p>
      <p>Current: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Example 3: useRef vs useState
function Comparison() {
  const [count, setCount] = useState(0); // ✅ Triggers re-render
  const renderCount = useRef(0); // ❌ Doesn't trigger re-render
  
  renderCount.current += 1; // Update without re-render
  
  return (
    <div>
      <p>Count (state): {count}</p>
      <p>Renders (ref): {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment (causes re-render)
      </button>
    </div>
  );
}

// Example 4: useRef behavior on unmount/remount
function Parent() {
  const [showChild, setShowChild] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? 'Unmount' : 'Mount'} Child
      </button>
      {showChild && <Child />}
    </div>
  );
}

function Child() {
  const [count, setCount] = useState(0);
  const refValue = useRef(0); // Initial value: 0
  
  // Change ref value
  const updateRef = () => {
    refValue.current = 100; // Change ref to 100
    console.log('Ref updated to:', refValue.current);
  };
  
  // Log on mount
  useEffect(() => {
    console.log('Component mounted - ref value:', refValue.current);
    // On FIRST mount: refValue.current = 0 (initial value)
    // On REMOUNT: refValue.current = 0 (back to initial, NOT 100!)
    
    return () => {
      console.log('Component unmounting - ref value:', refValue.current);
      // When unmounting, ref might be 100, but this value is LOST
    };
  }, []);
  
  return (
    <div>
      <p>Count (state): {count}</p>
      <p>Ref value: {refValue.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={updateRef}>Set Ref to 100</button>
      <p style={{ color: 'red' }}>
        ⚠️ When you unmount and remount, ref resets to 0!
      </p>
    </div>
  );
}

// What happens:
// 1. Component mounts → refValue.current = 0 (initial)
// 2. User clicks "Set Ref to 100" → refValue.current = 100
// 3. User clicks "Unmount Child" → Component unmounts, ref is destroyed
// 4. User clicks "Mount Child" → Component remounts
// 5. refValue.current = 0 again (NOT 100!) - back to initial value
// 
// This is because:
// - Unmount = component instance is destroyed
// - Remount = completely new component instance
// - useRef initializes with the default value you provide

// ✅ If you need persistence across unmount/remount, use:
// - localStorage
// - sessionStorage
// - External state management (Redux, Context)
// - Parent component state

// Example 5: React.memo and unmount/remount behavior
function ParentWithMemo() {
  const [showChild, setShowChild] = useState(true);
  const [parentCount, setParentCount] = useState(0);
  const [childProp, setChildProp] = useState('initial');
  
  return (
    <div>
      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? 'Unmount' : 'Mount'} Child
      </button>
      <button onClick={() => setParentCount(parentCount + 1)}>
        Parent Count: {parentCount} (causes parent re-render)
      </button>
      <button onClick={() => setChildProp('changed')}>
        Change Child Prop
      </button>
      {showChild && <MemoizedChild prop={childProp} />}
    </div>
  );
}

// Memoized component
const MemoizedChild = React.memo(function Child({ prop }) {
  const [count, setCount] = useState(0);
  const refValue = useRef(0);
  
  useEffect(() => {
    console.log('Child rendered or mounted');
    // This logs:
    // - On mount
    // - When prop changes (React.memo allows re-render because prop changed)
    // - NOT when parentCount changes (React.memo prevents re-render)
    
    return () => {
      console.log('Child unmounting - ref value:', refValue.current);
    };
  }, [prop]); // Only re-run when prop changes
  
  const updateRef = () => {
    refValue.current = 100;
    console.log('Ref updated to:', refValue.current);
  };
  
  return (
    <div>
      <p>Prop: {prop}</p>
      <p>Count: {count}</p>
      <p>Ref value: {refValue.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={updateRef}>Set Ref to 100</button>
    </div>
  );
});

// What happens with React.memo:
//
// SCENARIO 1: Re-rendering (component stays mounted)
// 1. Parent re-renders (parentCount changes)
// 2. React.memo checks: prop hasn't changed
// 3. Child does NOT re-render ✅ (React.memo prevents it)
// 4. refValue.current = 100 (preserved! component didn't unmount)
//
// SCENARIO 2: Unmounting/Remounting
// 1. User clicks "Unmount Child"
// 2. Component unmounts (removed from tree)
// 3. refValue.current = 100 is LOST ❌ (component destroyed)
// 4. User clicks "Mount Child"
// 5. Component remounts (new instance)
// 6. refValue.current = 0 (back to initial) ❌
// 7. React.memo doesn't help here - it only prevents re-renders, not unmounts!
//
// SCENARIO 3: Prop changes (component stays mounted)
// 1. User clicks "Change Child Prop"
// 2. React.memo checks: prop changed
// 3. Child re-renders ✅ (React.memo allows it because prop changed)
// 4. refValue.current = 100 (preserved! component didn't unmount)

// Key Takeaways:
// ✅ React.memo preserves ref values during RE-RENDERS (when component stays mounted)
// ❌ React.memo does NOT preserve ref values across UNMOUNT/REMOUNT
// ✅ React.memo prevents re-renders when props don't change
// ❌ React.memo does NOT prevent unmounting when component is removed from tree
```

---

### 13. When do you use useMemo?

`useMemo` memoizes (caches) expensive computations to avoid recalculating on every render.

**Use when:**
- **Expensive calculations:** Complex computations, filtering large arrays
- **Referential equality:** Preventing unnecessary re-renders of child components
- **Derived state:** Computing values from props/state

**Don't use for:**
- Simple calculations (overhead isn't worth it)
- Every computation (only optimize when needed)

**Complete Examples:**

```javascript
// Example 1: Expensive calculation
function ProductList({ products, filter }) {
  // ❌ Without useMemo: Recalculates on every render
  const filteredProducts = products.filter(p => p.category === filter);
  
  // ✅ With useMemo: Only recalculates when products or filter change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...'); // Only logs when dependencies change
    return products.filter(p => p.category === filter);
  }, [products, filter]);
  
  return (
    <div>
      {filteredProducts.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

// Example 2: Preventing unnecessary re-renders
function ExpensiveComponent({ data }) {
  // Expensive computation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);
  
  return <div>{/* render processedData */}</div>;
}

// Example 3: When NOT to use useMemo
function SimpleComponent({ a, b }) {
  // ❌ Don't use for simple calculations
  const sum = useMemo(() => a + b, [a, b]); // Overhead not worth it
  
  // ✅ Just calculate directly
  const sum = a + b; // Simple enough, no need for memoization
}
```

---

### 14. When do you use useCallback?

`useCallback` memoizes a function to prevent it from being recreated on every render.

**Use when:**
- **Passing functions to memoized children:** `React.memo` components
- **Dependencies in other hooks:** Functions used in `useEffect`, `useMemo` dependencies
- **Event handlers:** Preventing unnecessary re-renders

**Complete Examples:**

```javascript
// Example 1: Preventing unnecessary re-renders
const ExpensiveChild = React.memo(({ onClick, data }) => {
  console.log('Child rendered'); // Only logs when props actually change
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // ❌ Without useCallback: New function on every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // ✅ With useCallback: Same function reference (unless dependencies change)
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Name: {name}</button>
      {/* Child won't re-render when count/name changes because handleClick is stable */}
      <ExpensiveChild onClick={handleClick} data="static" />
    </div>
  );
}

// Example 2: useCallback with dependencies
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Function recreated only when userId changes
  const fetchUser = useCallback(async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  }, [userId]);
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser is stable (only changes when userId changes)
  
  return <div>{user?.name}</div>;
}
```

---

### 15. Why does useEffect run twice in React 18 (Strict Mode)?

**React 18 Strict Mode:**
- In development, React 18 intentionally **double-invokes** effects, state updaters, and constructors
- This helps identify side effects and ensure components are resilient

**Why:**
- **Detect side effects:** Find effects that aren't properly cleaned up
- **Ensure idempotency:** Verify effects can run multiple times safely
- **Prepare for future features:** Like automatic batching, concurrent features

**Solutions:**
- **Proper cleanup:** Always return cleanup functions
- **Idempotent effects:** Design effects to be safe when run multiple times
- **Note:** This only happens in **development**, not production

**Complete Example:**

```javascript
function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log('Effect running...'); // Logs TWICE in dev (React 18 Strict Mode)
    
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        const res = await fetch('/api/data', {
          signal: abortController.signal
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }
    
    fetchData();
    
    // Cleanup runs between the two calls in dev
    return () => {
      console.log('Cleanup running...'); // Logs between the two effect calls
      abortController.abort();
    };
  }, []);
  
  // In development with Strict Mode:
  // 1. Effect runs
  // 2. Cleanup runs
  // 3. Effect runs again
  // This helps catch bugs!
  
  // In production:
  // 1. Effect runs once
  // (No double invocation)
  
  return <div>{data && <p>Data loaded</p>}</div>;
}
```

---

## React – Hooks Comparison (Most Asked in Interviews)

### Quick Reference: Hooks Comparison Table

| Comparison | Hook A | Hook B | Key Difference | When to Use A | When to Use B |
|------------|--------|--------|----------------|---------------|---------------|
| **State Management** | `useState` | `useReducer` | Simple vs Complex | Single values, simple updates | Multiple related values, complex logic |
| **Effect Timing** | `useEffect` | `useLayoutEffect` | After paint vs Before paint | Data fetching, subscriptions (most cases) | DOM measurements, prevent flicker (rare) |
| **Memoization** | `useMemo` | `useCallback` | Caches value vs Caches function | Expensive calculations, derived data | Functions passed as props, event handlers |
| **State vs Reference** | `useState` | `useRef` | Triggers re-render vs No re-render | Data that affects UI | DOM access, previous values, mutable refs |
| **Data Passing** | Props | `useContext` | Explicit vs Implicit | Data used by few components | Data needed by many components |
| **Function Creation** | Regular function | `useCallback` | New function each render vs Stable reference | Simple cases | Passing to `React.memo` components |
| **Hook vs Function** | Custom Hook | Regular Function | Can use hooks vs Can't use hooks | Reusable component logic | Utility functions, helpers |
| **Effect Dependencies** | `useEffect(() => {}, [])` | `useEffect(() => {})` | Runs once vs Runs every render | One-time setup, initial fetch | Rarely needed (logging, analytics) |
| **Ref Creation** | `useRef` | `createRef` | Same ref across renders vs New ref each render | Functional components | Class components |
| **State Complexity** | `useState` (simple) | `useReducer` (complex) | Direct updates vs Action-based | Counters, toggles, form inputs | Forms with many fields, state machines |
| **Cleanup** | `useEffect` cleanup | `componentWillUnmount` | Runs on unmount + deps change vs Only unmount | Functional components | Class components |
| **Calculation** | Direct calculation | `useMemo` | Every render vs Only when deps change | Simple calculations | Expensive operations, large arrays |

---

### Complete Hooks Reference: When to Use Each Hook

| Hook | Purpose | When to Use | When NOT to Use | Example Use Cases |
|------|---------|-------------|-----------------|------------------|
| **`useState`** | Manage component state | • Data that affects UI<br>• Form inputs (controlled)<br>• Counters, toggles, flags<br>• API data to display<br>• Any value that should trigger re-render | • DOM element references<br>• Previous values (use useRef)<br>• Timer IDs<br>• Mutable values that don't affect UI | Counters, form inputs, toggles, display data |
| **`useEffect`** | Handle side effects | • API calls/data fetching<br>• Setting up subscriptions<br>• Event listeners<br>• Timers/intervals<br>• DOM manipulation (when needed)<br>• Cleanup operations | • Synchronous DOM measurements (use useLayoutEffect)<br>• Event handlers (use callbacks)<br>• Computations (use useMemo) | Fetch data, subscriptions, timers, cleanup |
| **`useLayoutEffect`** | Synchronous side effects | • DOM measurements before paint<br>• Preventing visual flicker<br>• Tooltip positioning<br>• Scroll position | • Most side effects (use useEffect)<br>• Data fetching<br>• Non-DOM operations | DOM measurements, prevent flicker |
| **`useRef`** | Mutable reference | • DOM element access<br>• Storing previous values<br>• Timer/interval IDs<br>• Mutable values that don't trigger renders<br>• Third-party library instances | • Data that affects UI (use useState)<br>• Form inputs (usually use useState)<br>• Values that should trigger re-renders | DOM focus, previous values, timer IDs |
| **`useMemo`** | Memoize expensive calculations | • Expensive computations<br>• Filtering/sorting large arrays<br>• Derived state calculations<br>• Preventing unnecessary re-renders<br>• Complex object transformations | • Simple calculations (overhead not worth it)<br>• Every computation (only when needed)<br>• Primitive values (usually not needed) | Filter products, sort data, expensive calculations |
| **`useCallback`** | Memoize functions | • Functions passed to `React.memo` components<br>• Functions in dependency arrays<br>• Event handlers for memoized children<br>• Preventing function recreation | • Simple cases (overhead not worth it)<br>• Functions not passed as props<br>• Functions without dependencies | Memoized child props, dependency arrays |
| **`useContext`** | Access context values | • App-wide data (theme, auth, language)<br>• Avoiding prop drilling<br>• Data needed by many components<br>• Global state (simple cases) | • Data used by few components (use props)<br>• Frequently changing data (performance)<br>• Simple parent-child communication | Theme, authentication, language settings |
| **`useReducer`** | Complex state management | • Multiple related state values<br>• Complex state logic<br>• Forms with many fields<br>• State machines<br>• When next state depends on previous | • Simple state (use useState)<br>• Single values<br>• Simple updates | Complex forms, state machines, todo lists |
| **`useImperativeHandle`** | Customize ref exposure | • Exposing specific methods to parent<br>• Wrapping third-party components<br>• Limiting parent access to child | • Most cases (avoid if possible)<br>• Simple parent-child communication<br>• When refs aren't needed | Custom input components, library wrappers |
| **`useDebugValue`** | Display custom hook label | • Custom hooks for DevTools<br>• Debugging hook values<br>• Development only | • Production code (removed in prod)<br>• Regular components | Custom hooks debugging |
| **`useId`** | Generate unique IDs | • Form labels and inputs<br>• ARIA attributes<br>• Unique keys (when needed)<br>• Server-side rendering | • Array keys (use item.id)<br>• When you have stable IDs | Form labels, ARIA attributes |
| **`useTransition`** | Mark updates as non-urgent | • Large list updates<br>• Non-critical UI updates<br>• Keeping UI responsive<br>• Deferring expensive updates | • Critical updates (use regular state)<br>• Simple state changes | Large list filtering, search results |
| **`useDeferredValue`** | Defer value updates | • Deferring expensive computations<br>• Search input debouncing<br>• Large data filtering | • Critical updates<br>• Simple values | Search inputs, large data filtering |
| **`useSyncExternalStore`** | Subscribe to external store | • Integrating with external state libraries<br>• Browser APIs (localStorage, etc.)<br>• Third-party state management | • React state (use useState/Context)<br>• Simple state management | External stores, browser APIs |
| **`useInsertionEffect`** | CSS-in-JS library optimization | • CSS-in-JS libraries (styled-components, etc.)<br>• Injecting styles before layout | • Regular components<br>• Most use cases | CSS-in-JS libraries (internal use) |
| **Custom Hooks** | Reusable component logic | • Sharing logic between components<br>• Extracting complex logic<br>• Reusable stateful logic<br>• API calls, form handling | • Simple one-time logic<br>• When logic is component-specific | useFetch, useLocalStorage, useAuth |

---

### 16. What is the difference between useState and useReducer?

**`useState`:**
- Simple state management
- Best for: Single values, simple state updates
- Returns: `[state, setState]`
- Updates: Direct value updates

**`useReducer`:**
- Complex state management
- Best for: Multiple related values, complex state logic
- Returns: `[state, dispatch]`
- Updates: Action-based updates via reducer function

**When to use:**
- **useState:** Simple state (counters, form inputs, toggles)
- **useReducer:** Complex state (forms with multiple fields, state machines, complex logic)

**Complete Example:**
```javascript
// ✅ useState - Simple state
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ✅ useReducer - Complex state
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return initialState;
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function AdvancedCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input 
        type="number" 
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
    </div>
  );
}
```

---

### 17. What is the difference between useEffect and useLayoutEffect?

**`useEffect`:**
- Runs **after** render and paint
- Asynchronous - doesn't block browser painting
- Best for: Data fetching, subscriptions, DOM updates that don't need to be synchronous
- Use in: Most cases

**`useLayoutEffect`:**
- Runs **synchronously** after DOM mutations but before paint
- Blocks browser painting until it completes
- Best for: DOM measurements, preventing visual flicker
- Use in: Rare cases when you need synchronous DOM access

**Key Difference:** Timing - `useLayoutEffect` runs before browser paints, `useEffect` runs after.

**Complete Example:**
```javascript
// useEffect - Runs after paint (most common)
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Runs AFTER browser paints
    // User might see flicker if width changes
    const element = document.getElementById('myElement');
    setWidth(element.offsetWidth);
  }, []);
  
  return <div id="myElement" style={{ width: width }}>Content</div>;
}

// useLayoutEffect - Runs before paint (prevents flicker)
function Component() {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    // Runs BEFORE browser paints
    // No flicker - width set before user sees it
    const element = document.getElementById('myElement');
    setWidth(element.offsetWidth);
  }, []);
  
  return <div id="myElement" style={{ width: width }}>Content</div>;
}

// Real-world: Tooltip positioning
function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  
  useLayoutEffect(() => {
    // Measure before paint to prevent flicker
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left });
    }
  }, []);
  
  return (
    <div ref={tooltipRef} style={{ position: 'absolute', ...position }}>
      {text}
    </div>
  );
}
```

---

### 18. What is the difference between useMemo and useCallback?

**`useMemo`:**
- Memoizes a **value** (result of computation)
- Returns: Memoized value
- Use for: Expensive calculations, derived data
- Recalculates: When dependencies change

**`useCallback`:**
- Memoizes a **function**
- Returns: Memoized function reference
- Use for: Functions passed as props, event handlers
- Recreates: When dependencies change

**Key Difference:** `useMemo` caches values, `useCallback` caches functions.

**Complete Example:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  
  // ✅ useMemo: Memoize computed value
  const expensiveSum = useMemo(() => {
    console.log('Calculating sum...');
    return items.reduce((sum, item) => sum + item, 0);
  }, [items]); // Only recalculates when items change
  
  // ✅ useCallback: Memoize function
  const handleClick = useCallback(() => {
    console.log('Button clicked');
    setCount(count + 1);
  }, [count]); // Function only recreated when count changes
  
  // ❌ Without useCallback: New function on every render
  const handleClickBad = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Sum: {expensiveSum}</p>
      <p>Count: {count}</p>
      <ExpensiveChild onClick={handleClick} />
      {/* handleClick is stable, child won't re-render unnecessarily */}
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});

// When to use each:
// useMemo: const sorted = useMemo(() => items.sort(), [items]);
// useCallback: const handler = useCallback(() => {}, [deps]);
```

---

### 19. What is the difference between useRef and useState?

**`useState`:**
- Creates **reactive** state
- Changes trigger **re-renders**
- Used for: Data that affects UI
- Value: Can be accessed via state variable

**`useRef`:**
- Creates **mutable** reference
- Changes **don't trigger** re-renders
- Used for: DOM access, storing previous values, mutable values
- Value: Accessed via `.current` property

**Key Difference:** `useState` causes re-renders, `useRef` does not.

**Complete Example:**
```javascript
function Comparison() {
  const [count, setCount] = useState(0); // Triggers re-render
  const renderCount = useRef(0); // Doesn't trigger re-render
  const inputRef = useRef(null); // For DOM access
  
  renderCount.current += 1; // Update without re-render
  
  const focusInput = () => {
    inputRef.current.focus(); // Direct DOM access
  };
  
  return (
    <div>
      <p>Count (state): {count}</p>
      <p>Renders (ref): {renderCount.current}</p>
      <input ref={inputRef} />
      <button onClick={() => setCount(count + 1)}>Increment (re-renders)</button>
      <button onClick={focusInput}>Focus Input (no re-render)</button>
    </div>
  );
}

// Storing previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count; // Store previous value
  });
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>Previous: {prevCount}</p>
      <p>Current: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### 20. What is the difference between useContext and props?

**Props:**
- Pass data **explicitly** through component tree
- Must pass through every level (prop drilling)
- Clear data flow (easy to trace)
- Best for: Data used by few components

**`useContext`:**
- Access data **implicitly** from context
- Skip intermediate components
- Less explicit (harder to trace)
- Best for: Data needed by many components

**When to use:**
- **Props:** Data used by 1-2 levels of children
- **Context:** Data needed by many unrelated components, avoiding prop drilling

**Complete Example:**
```javascript
// ❌ Prop Drilling (bad for many levels)
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Header user={user} />; // Passing through
}

function Header({ user }) {
  return <Navbar user={user} />; // Passing through again
}

function Navbar({ user }) {
  return <UserMenu user={user} />; // Passing through again
}

function UserMenu({ user }) {
  return <div>{user.name}</div>; // Finally using it!
}

// ✅ Context (good for many components)
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John' });
  return (
    <UserContext.Provider value={user}>
      <Header /> {/* No props needed */}
    </UserContext.Provider>
  );
}

function Header() {
  return <Navbar />; // No props
}

function Navbar() {
  return <UserMenu />; // No props
}

function UserMenu() {
  const user = useContext(UserContext); // Direct access!
  return <div>{user.name}</div>;
}

// When to use each:
// Props: <Button onClick={handleClick} label="Click" />
// Context: Theme, Auth, Language (app-wide data)
```

---

### 21. What is the difference between useCallback and regular functions?

**Regular Function:**
- Created **new** on every render
- New function reference each time
- Can cause unnecessary re-renders of memoized children
- Simple and straightforward

**`useCallback`:**
- **Same** function reference across renders (if deps unchanged)
- Prevents unnecessary re-renders
- Slight performance overhead
- Use when passing to `React.memo` components

**Complete Example:**
```javascript
const ExpensiveChild = React.memo(({ onClick, name }) => {
  console.log('Child rendered'); // Only logs when props change
  return <button onClick={onClick}>{name}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // ❌ Regular function: New function on every render
  const handleClick = () => {
    console.log('Clicked');
  };
  // Child re-renders every time because handleClick is new reference
  
  // ✅ useCallback: Same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes
  // Child doesn't re-render when count/name changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Name: {name}</button>
      <ExpensiveChild onClick={handleClick} name={name} />
      {/* With useCallback: Only re-renders when name changes */}
      {/* Without useCallback: Re-renders on every parent render */}
    </div>
  );
}

// When to use useCallback:
// ✅ Passing to React.memo components
// ✅ Function in dependency array of other hooks
// ❌ Don't use for every function (overhead not worth it)
```

---

### 22. What is the difference between useMemo and useCallback? (Detailed)

**`useMemo`:**
- **Purpose:** Cache expensive computations
- **Returns:** Memoized **value**
- **Syntax:** `useMemo(() => value, [deps])`
- **Use for:** Calculations, filtering, sorting, derived state
- **Example:** `const sum = useMemo(() => items.reduce(...), [items])`

**`useCallback`:**
- **Purpose:** Cache function references
- **Returns:** Memoized **function**
- **Syntax:** `useCallback(() => {}, [deps])`
- **Use for:** Event handlers, functions passed as props
- **Example:** `const handler = useCallback(() => {}, [deps])`

**Key Insight:** `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`

**Complete Example:**
```javascript
function ProductList({ products, filter }) {
  const [sortOrder, setSortOrder] = useState('asc');
  
  // ✅ useMemo: Memoize computed value (array)
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p => p.category === filter);
  }, [products, filter]);
  
  // ✅ useMemo: Memoize sorted array
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return [...filteredProducts].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }, [filteredProducts, sortOrder]);
  
  // ✅ useCallback: Memoize function
  const handleSort = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []); // Function never changes
  
  // ✅ useCallback: Memoize function with dependencies
  const handleFilter = useCallback((category) => {
    // Filter logic
  }, []); // Stable function
  
  return (
    <div>
      <button onClick={handleSort}>Sort: {sortOrder}</button>
      {sortedProducts.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

// Equivalent:
const fn1 = useCallback(() => {}, [deps]);
const fn2 = useMemo(() => () => {}, [deps]); // Same thing!
```

---

### 23. What is the difference between custom hooks and regular functions?

**Regular Function:**
- Can't use React hooks inside
- Just JavaScript function
- No access to React features
- Use for: Utility functions, helpers

**Custom Hook:**
- Can use React hooks inside
- Must start with "use" (convention)
- Shares stateful logic between components
- Use for: Reusable component logic

**Complete Example:**
```javascript
// ❌ Regular function (can't use hooks)
function fetchUserData(userId) {
  // Can't use useState, useEffect here!
  return fetch(`/api/users/${userId}`).then(res => res.json());
}

// ✅ Custom hook (can use hooks)
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchUserData(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);
  
  return { user, loading, error };
}

// Usage:
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId); // Reusable!
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
}

// More custom hooks examples:
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

---

### 24. What is the difference between useEffect with empty deps vs no deps?

**`useEffect(() => {}, [])` - Empty dependency array:**
- Runs **once** after initial render
- Equivalent to `componentDidMount`
- Use for: One-time setup, initial data fetching

**`useEffect(() => {})` - No dependency array:**
- Runs **after every render**
- Equivalent to `componentDidMount` + `componentDidUpdate`
- Usually **dangerous** - can cause infinite loops
- Use rarely: When you need effect on every render

**Complete Example:**
```javascript
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // ✅ Empty array: Runs once on mount
  useEffect(() => {
    console.log('Component mounted - fetching initial data');
    fetch('/api/data').then(/* ... */);
  }, []); // Runs once
  
  // ⚠️ No array: Runs on EVERY render (dangerous!)
  useEffect(() => {
    console.log('Rendered!'); // Logs on every state change
    // WARNING: If you update state here, infinite loop!
    // setCount(count + 1); // ❌ DON'T DO THIS!
  }); // Runs every render
  
  // ✅ With dependencies: Runs when deps change
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]); // Only runs when count changes
  
  // ✅ Multiple dependencies
  useEffect(() => {
    console.log('Count or name changed');
  }, [count, name]); // Runs when count OR name changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Name: {name}</button>
    </div>
  );
}

// When to use each:
// [] - Initial setup, subscriptions, timers
// [deps] - Effect depends on specific values
// No array - Rarely needed (logging, analytics)
```

---

### 25. What is the difference between useRef and createRef?

**`useRef`:**
- Hook (can only use in functional components)
- Returns **same ref object** across renders
- Value persists across re-renders
- Use in: Functional components

**`createRef`:**
- Regular function (can use anywhere)
- Returns **new ref object** on every render
- Not suitable for functional components
- Use in: Class components

**Complete Example:**
```javascript
// ✅ useRef in functional component
function FunctionalComponent() {
  const inputRef = useRef(null); // Same ref across renders
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} />;
}

// ✅ createRef in class component
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef(); // Create ref in constructor
  }
  
  componentDidMount() {
    this.inputRef.current.focus();
  }
  
  render() {
    return <input ref={this.inputRef} />;
  }
}

// ❌ createRef in functional component (wrong!)
function WrongComponent() {
  const inputRef = createRef(); // New ref on every render!
  // This won't work correctly - ref is recreated each render
  
  return <input ref={inputRef} />;
}

// ✅ useRef is the correct choice for functional components
```

---

### 26. What is the difference between useState and useReducer for complex state?

**`useState`:**
- Simple state updates
- Direct value assignment
- Best for: Single values, simple updates
- Can become messy with complex state

**`useReducer`:**
- Complex state logic
- Action-based updates
- Best for: Multiple related values, complex logic
- Cleaner for complex state

**Complete Example:**
```javascript
// ❌ useState for complex state (gets messy)
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleSubmit = () => {
    // Complex validation logic...
    if (!name) setErrors(prev => ({ ...prev, name: 'Required' }));
    if (!email) setErrors(prev => ({ ...prev, email: 'Required' }));
    // Gets complicated with many fields
  };
  
  // ... many handlers
}

// ✅ useReducer for complex state (cleaner)
const initialState = {
  name: '',
  email: '',
  age: '',
  errors: {},
  touched: {}
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };
  
  const handleSubmit = () => {
    // Validation logic
    if (!state.name) {
      dispatch({ type: 'SET_ERROR', field: 'name', error: 'Required' });
    }
  };
  
  return (
    <form>
      <input 
        value={state.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      {/* ... */}
    </form>
  );
}
```

---

### 27. What is the difference between useEffect cleanup and componentWillUnmount?

**`componentWillUnmount` (Class Components):**
- Runs **once** when component unmounts
- Only cleanup on unmount
- Can't access latest props/state easily

**`useEffect` Cleanup (Functional Components):**
- Runs on **unmount AND before effect runs again**
- More flexible - cleanup when dependencies change
- Has access to latest values via closure

**Complete Example:**
```javascript
// Class Component (old way)
class Timer extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer); // Only runs on unmount
  }
  
  render() {
    return <div>Timer</div>;
  }
}

// Functional Component (modern way)
function Timer() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    // Cleanup runs:
    // 1. When component unmounts
    // 2. Before effect runs again (if deps change)
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty deps = cleanup only on unmount
  
  return <div>Timer</div>;
}

// Cleanup with dependencies
function UserProfile({ userId }) {
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(/* ... */);
    
    // Cleanup runs:
    // 1. When userId changes (cancels old request)
    // 2. When component unmounts
    return () => {
      controller.abort(); // Cancel request
    };
  }, [userId]); // Cleanup when userId changes
}
```

---

### 28. What is the difference between useMemo and direct calculation?

**Direct Calculation:**
- Calculates on **every render**
- Simple and straightforward
- No overhead
- Use for: Simple calculations

**`useMemo`:**
- Calculates **only when dependencies change**
- Slight overhead (checking dependencies)
- Use for: Expensive calculations

**Complete Example:**
```javascript
function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  
  // ❌ Direct calculation: Runs on every render
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  // Even if products and filter don't change, this runs every render
  
  // ✅ useMemo: Only recalculates when products or filter change
  const filteredProducts = useMemo(() => {
    console.log('Filtering...'); // Only logs when deps change
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);
  
  // When to use useMemo:
  // ✅ Expensive operations (large arrays, complex calculations)
  // ✅ Preventing unnecessary re-renders
  // ❌ Simple calculations (a + b, string concatenation)
  
  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredProducts.map(p => <Product key={p.id} product={p} />)}
    </div>
  );
}

// Simple calculation - don't use useMemo
function SimpleComponent({ a, b }) {
  const sum = a + b; // ✅ Simple, no need for useMemo
  // const sum = useMemo(() => a + b, [a, b]); // ❌ Overhead not worth it
}
```

---

## React – State Management

### 16. When should state be local vs global?

**Local State (useState in component):**
- **UI state:** Form inputs, modals, dropdowns
- **Component-specific:** Data only used within that component
- **Temporary:** Data that doesn't need to persist
- **Simple cases:** When prop drilling isn't a problem

**Global State (Context, Redux, Zustand):**
- **Shared data:** User info, theme, language
- **Cross-component:** Data needed by many unrelated components
- **Persistent:** Data that should survive component unmounts
- **Complex state:** When prop drilling becomes unwieldy

**Rule of thumb:** Start local, lift up when needed, go global only when necessary.

**Complete Examples:**

```javascript
// ✅ Local State: Form input (only used in this component)
function LoginForm() {
  const [email, setEmail] = useState(''); // Local - only this form needs it
  const [password, setPassword] = useState(''); // Local
  
  return (
    <form>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
    </form>
  );
}

// ✅ Lifted State: Shared between siblings
function TodoApp() {
  const [todos, setTodos] = useState([]); // Lifted to parent
  
  return (
    <div>
      <TodoInput onAdd={todo => setTodos([...todos, todo])} />
      <TodoList todos={todos} />
    </div>
  );
}

// ✅ Global State: User authentication (needed everywhere)
const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null); // Global - many components need this
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Header /> {/* Needs user */}
      <Profile /> {/* Needs user */}
      <Settings /> {/* Needs user */}
    </AuthContext.Provider>
  );
}
```

---

### 17. What is lifting state up?

**Lifting state up:**
- Moving state from a child component to a common parent
- Allows sharing state between sibling components
- Parent manages state and passes it down as props

**When to use:**
- Multiple components need the same data
- Sibling components need to communicate
- State needs to be synchronized

**Complete Example:**

```javascript
// ❌ Before: State in child (can't share with sibling)
function Counter1() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}

function Counter2() {
  // Can't see count from Counter1!
  return <p>I don't know the count</p>;
}

// ✅ After: State lifted to parent (can share with siblings)
function App() {
  const [count, setCount] = useState(0); // State in parent
  
  return (
    <div>
      <CounterDisplay count={count} /> {/* Shows count */}
      <CounterButton count={count} setCount={setCount} /> {/* Updates count */}
      <CounterInfo count={count} /> {/* Also shows count */}
    </div>
  );
}

function CounterDisplay({ count }) {
  return <h1>Count: {count}</h1>; // Receives count as prop
}

function CounterButton({ count, setCount }) {
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment (Current: {count})
    </button>
  );
}

function CounterInfo({ count }) {
  return <p>You've clicked {count} times</p>; // Also receives count
}
```

---

### 18. How do you share data between unrelated components?

**Options:**

1. **Context API:**
   - Best for app-wide data (theme, auth, language)
   - Built into React
   - Good for moderate complexity

2. **State management library:**
   - **Redux:** Complex state, time-travel debugging
   - **Zustand:** Simpler, lightweight
   - **Recoil:** Facebook's atomic state management

3. **Lift state up:**
   - Move to common ancestor
   - Works if components share a parent

4. **Event system:**
   - Custom event emitters
   - Usually not recommended (hard to track)

**Complete Examples:**

```javascript
// Example 1: Context API (for app-wide data)
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />      {/* Unrelated to Sidebar */}
      <MainContent /> {/* Unrelated to Header */}
      <Sidebar />     {/* Unrelated to MainContent */}
    </UserContext.Provider>
  );
}

function Header() {
  const { user } = useContext(UserContext);
  return <header>Welcome, {user.name}!</header>;
}

function Sidebar() {
  const { user } = useContext(UserContext);
  return <aside>Role: {user.role}</aside>;
}

// Example 2: Redux (for complex state management)
import { createStore } from 'redux';

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

// Example 3: Lift state up (when components share parent)
function Parent() {
  const [sharedData, setSharedData] = useState('Hello');
  
  return (
    <div>
      <ChildA data={sharedData} setData={setSharedData} />
      <ChildB data={sharedData} />
    </div>
  );
}
```

---

### 19. What is Redux and how does it work?

**Redux** is a predictable state management library for JavaScript applications, commonly used with React.

**Core Concepts:**
1. **Single Source of Truth:** All app state stored in one object (store)
2. **State is Read-Only:** Can't modify state directly
3. **Changes via Pure Functions:** Reducers handle state updates
4. **Unidirectional Data Flow:** Predictable state updates

**Redux Architecture:**
```
Component → Action → Reducer → Store → Component (re-renders)
```

**Key Parts:**
- **Store:** Single object holding entire app state
- **Actions:** Plain objects describing what happened
- **Reducers:** Pure functions that update state
- **Dispatch:** Function to send actions to store

**When to use Redux:**
- ✅ Complex state logic
- ✅ State needed by many components
- ✅ Time-travel debugging needed
- ✅ Large applications
- ❌ Simple apps (use Context API instead)
- ❌ Small state (use useState instead)

**Complete Example (Redux Toolkit - Modern Way):**

```javascript
// Step 1: Install Redux Toolkit
// npm install @reduxjs/toolkit react-redux

// Step 2: Create a slice (reducer + actions)
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Redux Toolkit uses Immer (can mutate)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// Export actions (automatically generated)
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;

// Step 3: Create store
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add more reducers here
  }
});

export default store;

// Step 4: Provide store to app
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}

// Step 5: Use Redux in components
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

function Counter() {
  // Get state from store
  const count = useSelector((state) => state.counter.value);
  
  // Get dispatch function
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

**Complete Example (Traditional Redux - Understanding the Basics):**

```javascript
// Step 1: Define Action Types (constants)
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Step 2: Create Action Creators (functions that return actions)
function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: { id: Date.now(), text, completed: false }
  };
}

function toggleTodo(id) {
  return { type: TOGGLE_TODO, payload: id };
}

// Step 3: Create Reducer (pure function)
const initialState = {
  count: 0,
  todos: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    default:
      return state; // Always return state if action doesn't match
  }
}

// Step 4: Create Store
import { createStore } from 'redux';
const store = createStore(rootReducer);

// Step 5: Use in React
import { Provider, useSelector, useDispatch } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <TodoList />
    </Provider>
  );
}

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(addTodo('Learn Redux'))}>
        Add Todo
      </button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Redux Flow Explained:**

```
1. User clicks button
   ↓
2. Component calls dispatch(action)
   ↓
3. Action sent to store
   ↓
4. Store calls reducer with (currentState, action)
   ↓
5. Reducer returns new state (immutable update)
   ↓
6. Store updates with new state
   ↓
7. Components subscribed to store re-render
   ↓
8. UI updates with new state
```

**Key Redux Rules:**
1. **State is Immutable:** Never mutate state directly
   ```javascript
   // ❌ Wrong
   state.count += 1;
   
   // ✅ Right
   return { ...state, count: state.count + 1 };
   ```

2. **Reducers are Pure Functions:**
   - No side effects (API calls, etc.)
   - Same input = same output
   - Don't mutate arguments

3. **Actions are Plain Objects:**
   ```javascript
   { type: 'INCREMENT' }
   { type: 'ADD_TODO', payload: { text: 'Learn Redux' } }
   ```

**Redux vs Context API:**

| Feature | Redux | Context API |
|---------|-------|-------------|
| **Complexity** | More boilerplate | Simpler |
| **Performance** | Optimized subscriptions | Can cause unnecessary re-renders |
| **DevTools** | Excellent (time-travel) | Basic |
| **Learning Curve** | Steeper | Easier |
| **Use Case** | Large apps, complex state | Small-medium apps |
| **Middleware** | Yes (thunk, saga) | No |

**When to Choose Redux:**
- ✅ Large application with complex state
- ✅ Need time-travel debugging
- ✅ Multiple developers working on state
- ✅ Need middleware (API calls, logging)
- ✅ State logic is complex

**When NOT to Use Redux:**
- ❌ Small applications
- ❌ Simple state management
- ❌ Learning React (start with useState/Context)
- ❌ Over-engineering simple problems

**Redux Middleware Example (Redux Thunk for Async):**

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async action with Redux Toolkit
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

// In slice
const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Use in component
function UserProfile({ userId }) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user?.name}</div>;
}
```

**Summary:**
- Redux = Predictable state container
- Store = Single source of truth
- Actions = What happened
- Reducers = How state updates
- Dispatch = Send actions
- Use for complex state, avoid for simple apps

---

## React – Performance

### 19. How can you prevent unnecessary re-renders?

**Strategies:**

1. **React.memo:**
   - Memoize functional components
   - Prevents re-render if props haven't changed

2. **useMemo:**
   - Memoize expensive computations
   - Cache derived values

3. **useCallback:**
   - Memoize functions
   - Prevent function recreation

4. **Split components:**
   - Isolate frequently changing state
   - Keep stable parts separate

5. **Code splitting:**
   - Lazy load components
   - Reduce initial bundle size

**Complete Examples:**

```javascript
// Example 1: React.memo
const ExpensiveChild = React.memo(({ name, count }) => {
  console.log('Child rendered'); // Only logs when props change
  return (
    <div>
      <p>Name: {name}</p>
      <p>Count: {count}</p>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const [other, setOther] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Change Name</button>
      <button onClick={() => setOther(other + 1)}>Other: {other}</button>
      
      {/* Child only re-renders when name or count changes, not when other changes */}
      <ExpensiveChild name={name} count={count} />
    </div>
  );
}

// Example 2: useMemo + useCallback together
function ProductList({ products, filter }) {
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === filter);
  }, [products, filter]);
  
  // Memoize sort function
  const handleSort = useCallback(() => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }, [sortOrder]);
  
  return (
    <div>
      <button onClick={handleSort}>Sort: {sortOrder}</button>
      {filteredProducts.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

### 20. What happens if keys are not unique?

**Problems:**

1. **Incorrect updates:**
   - React may update wrong components
   - State can be mixed between components

2. **Performance issues:**
   - React can't efficiently track changes
   - May re-render more than necessary

3. **Bugs:**
   - Form inputs may retain wrong values
   - Component state may persist incorrectly

4. **Console warnings:**
   - React warns about duplicate keys

**Complete Examples:**

```javascript
// ❌ Bad: Duplicate keys
function BadList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key="same-key"> {/* All items have same key! */}
          {item.name}
        </li>
      ))}
    </ul>
  );
  // React warning: "Encountered two children with the same key"
  // Problems:
  // - React can't track which item changed
  // - State may be mixed between items
  // - Performance issues
}

// ✅ Good: Unique keys from data
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}> {/* Unique ID from data */}
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ⚠️ Sometimes OK: Index as key (only if list never reorders)
function StaticList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}> {/* OK if list is static */}
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ❌ Bad: Index as key with reordering
function SortableList({ items }) {
  const [sorted, setSorted] = useState(items);
  
  return (
    <ul>
      {sorted.map((item, index) => (
        <li key={index}> {/* BAD! Keys change when list reorders */}
          <input defaultValue={item.name} /> {/* Input values get mixed up! */}
        </li>
      ))}
    </ul>
  );
}
```

---

### 21. How does React know what to update?

**Reconciliation process:**

1. **Virtual DOM diffing:**
   - React compares new virtual DOM tree with previous one
   - Uses efficient diffing algorithm

2. **Key-based reconciliation:**
   - Keys help identify which items changed
   - React matches elements by key

3. **Component type comparison:**
   - If component type changes, React unmounts old and mounts new
   - If same type, React updates props and re-renders

4. **Batching:**
   - Multiple state updates are batched
   - Single DOM update for multiple changes

5. **Fiber architecture:**
   - React Fiber allows incremental rendering
   - Can pause, abort, or prioritize work

**Result:** Only changed parts of the DOM are updated, not the entire tree.

**Complete Example:**

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  return (
    <div>
      <Header name={name} />
      <Counter count={count} />
      <Footer />
    </div>
  );
}

// When count changes:
// 1. React creates new Virtual DOM tree
// 2. Compares with previous Virtual DOM
// 3. Finds: Only <Counter> component changed
// 4. Updates: Only Counter component in real DOM
// 5. Header and Footer stay unchanged (no re-render needed)

// Example with keys:
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
        // Key helps React identify which item changed
        // If todo with id=3 changes, React knows to update only that item
      ))}
    </ul>
  );
}

// Batching example:
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  const handleClick = () => {
    setA(1); // State update 1
    setB(2); // State update 2
    // React batches these into ONE re-render!
    // Virtual DOM updated once, real DOM updated once
  };
}
```

---

## React – Working with Backend

### 22. How do you make an API call in React?

**Methods:**

1. **Fetch API:**
   ```javascript
   useEffect(() => {
     fetch('/api/data')
       .then(res => res.json())
       .then(data => setData(data));
   }, []);
   ```

2. **Axios:**
   ```javascript
   useEffect(() => {
     axios.get('/api/data')
       .then(res => setData(res.data));
   }, []);
   ```

3. **Async/await:**
   ```javascript
   useEffect(() => {
     async function fetchData() {
       const res = await fetch('/api/data');
       const data = await res.json();
       setData(data);
     }
     fetchData();
   }, []);
   ```

4. **Libraries:**
   - **React Query:** Caching, refetching, mutations
   - **SWR:** Data fetching with caching
   - **Apollo Client:** For GraphQL

**Complete Examples:**

```javascript
// Example 1: Fetch API with useEffect
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Example 2: Axios with async/await
import axios from 'axios';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Error:', err);
      }
    }
    fetchUser();
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

// Example 3: React Query (recommended for production)
import { useQuery } from 'react-query';

function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useQuery(
    ['user', userId],
    () => fetch(`/api/users/${userId}`).then(res => res.json())
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
}
```

---

### 23. Where should fetch / axios calls be placed?

**Best practices:**

1. **useEffect hook:**
   - For data fetching on component mount
   - Most common approach

2. **Event handlers:**
   - For user-triggered API calls (form submit, button click)

3. **Custom hooks:**
   - Extract API logic into reusable hooks
   - Better organization and reusability

4. **Service layer:**
   - Separate API functions in service files
   - Keep components clean

**Complete Examples:**

```javascript
// ✅ Best Practice: Custom hook + Service layer

// 1. Service file (api/userService.js)
export async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function createUser(userData) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

// 2. Custom hook (hooks/useUser.js)
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const data = await fetchUser(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);
  
  return { user, loading, error };
}

// 3. Component (clean and simple)
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
}

// ✅ Event handler (user-triggered)
function CreateUserForm() {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name });
      alert('User created!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Create User</button>
    </form>
  );
}
```

---

### 24. How do you handle loading and error states?

**Pattern:**

```javascript
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <DataDisplay data={data} />;
}
```

**Libraries:**
- **React Query:** Built-in loading/error states
- **SWR:** Automatic error handling

**Complete Example with React Query:**

```javascript
import { useQuery } from 'react-query';

function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useQuery(
    ['user', userId],
    () => fetch(`/api/users/${userId}`).then(res => res.json()),
    {
      retry: 3, // Retry 3 times on failure
      staleTime: 5000 // Consider data fresh for 5 seconds
    }
  );
  
  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
}
```

---

### 25. Where should authentication tokens be stored?

**Options:**

1. **httpOnly cookies (Recommended for web):**
   - Most secure, not accessible to JavaScript
   - Protected from XSS attacks
   - Sent automatically with requests

2. **localStorage:**
   - Accessible to JavaScript
   - Vulnerable to XSS
   - Persists across sessions
   - **Not recommended for sensitive tokens**

3. **sessionStorage:**
   - Similar to localStorage
   - Cleared when tab closes
   - Still vulnerable to XSS

4. **Memory (state):**
   - Most secure (not persisted)
   - Lost on refresh
   - Good for temporary tokens

**Best practice:** Use httpOnly cookies for refresh tokens, memory for access tokens (short-lived).

**Complete Examples:**

```javascript
// ✅ Option 1: httpOnly Cookie (Most Secure)
// Backend sets cookie
app.post('/api/login', async (req, res) => {
  const token = jwt.sign({ userId: user.id }, secret);
  res.cookie('token', token, {
    httpOnly: true, // Not accessible via JavaScript
    secure: true,   // HTTPS only
    sameSite: 'strict'
  });
  res.json({ success: true });
});

// Frontend: Cookie sent automatically with requests
fetch('/api/protected', {
  credentials: 'include' // Include cookies
});

// ✅ Option 2: Memory (State) - Good for access tokens
function App() {
  const [token, setToken] = useState(null); // In memory
  
  const login = async (email, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const { token } = await res.json();
    setToken(token); // Stored in memory
  };
  
  // Token lost on refresh, but more secure
}

// ❌ Option 3: localStorage (NOT Recommended)
localStorage.setItem('token', token); // Vulnerable to XSS!
```

---

## Node.js – Basics

### 26. What is Node.js?

**Node.js:**
- A JavaScript **runtime** built on Chrome's V8 engine
- Allows running JavaScript on the **server-side** (not just browser)
- **Event-driven, non-blocking I/O** model
- Built on Google's V8 JavaScript engine

**Key features:**
- Single-threaded event loop
- Asynchronous I/O
- NPM (Node Package Manager) ecosystem
- Can build web servers, APIs, CLI tools, desktop apps

**Use cases:**
- Backend APIs and web servers
- Real-time applications (chat, gaming)
- Microservices
- Build tools and automation

**Complete Example:**

```javascript
// Simple Node.js server
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Run with: node server.js
```

---

### 27. Why is Node.js single-threaded but still efficient?

**Single-threaded:**
- Node.js uses a single main thread for JavaScript execution
- No thread management overhead
- Simpler programming model (no race conditions in JS code)

**Still efficient because:**

1. **Non-blocking I/O:**
   - I/O operations don't block the thread
   - Uses OS-level threads for I/O (via libuv)
   - While waiting for I/O, thread handles other requests

2. **Event loop:**
   - Efficiently manages asynchronous operations
   - Queues callbacks and executes them when ready

3. **Worker threads (for CPU-intensive tasks):**
   - Can spawn worker threads for heavy computations
   - Main thread stays free for I/O

**Best for:** I/O-intensive applications (APIs, databases, file operations)
**Not ideal for:** CPU-intensive tasks (image processing, heavy calculations)

**Complete Example:**

```javascript
// ✅ Good: I/O-intensive (Node.js excels here)
app.get('/api/users', async (req, res) => {
  // Database query (I/O) - doesn't block!
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// Multiple requests can be handled concurrently:
// Request 1: Waiting for DB → Request 2 handled → Request 3 handled
// Request 1: DB responds → Request 1 continues

// ❌ Bad: CPU-intensive (blocks event loop)
app.get('/api/process', (req, res) => {
  // Heavy calculation blocks everything!
  let result = 0;
  for (let i = 0; i < 10000000000; i++) {
    result += i; // Blocks event loop, can't handle other requests
  }
  res.json({ result });
});

// ✅ Solution: Use Worker Threads for CPU-intensive tasks
const { Worker } = require('worker_threads');

app.get('/api/process', (req, res) => {
  const worker = new Worker('./heavy-calculation.js');
  worker.on('message', (result) => {
    res.json({ result });
  });
});
```

---

### 28. What is the event loop?

**Event loop:**
- The mechanism that allows Node.js to perform non-blocking I/O operations
- Continuously checks for completed async operations and executes their callbacks

**Phases:**

1. **Timers:** Execute `setTimeout` and `setInterval` callbacks
2. **Pending callbacks:** Execute I/O callbacks deferred to next iteration
3. **Idle, prepare:** Internal use
4. **Poll:** Fetch new I/O events, execute I/O callbacks
5. **Check:** Execute `setImmediate` callbacks
6. **Close callbacks:** Execute close event callbacks (sockets, etc.)

**How it works:**
```
1. Execute synchronous code
2. Process microtasks (Promises)
3. Process next event loop phase
4. Repeat
```

**Key point:** The event loop allows Node.js to handle many concurrent operations with a single thread.

**Complete Example:**

```javascript
console.log('1. Start');

// Timer phase
setTimeout(() => {
  console.log('4. setTimeout (timers phase)');
}, 0);

// Microtask (Promise) - runs before next phase
Promise.resolve().then(() => {
  console.log('3. Promise (microtask)');
});

// Immediate - check phase
setImmediate(() => {
  console.log('5. setImmediate (check phase)');
});

console.log('2. End');

// Output order:
// 1. Start
// 2. End
// 3. Promise (microtask - highest priority)
// 4. setTimeout (timers phase)
// 5. setImmediate (check phase)

// Real-world example:
app.get('/api/data', async (req, res) => {
  console.log('Request received'); // 1. Synchronous code
  
  // 2. I/O operation (non-blocking)
  const data = await db.query('SELECT * FROM users');
  // While waiting for DB, event loop handles other requests!
  
  // 3. I/O completes, callback queued
  res.json(data); // 4. Response sent
});
```

---

### 29. What is the difference between Node.js and JavaScript in the browser?

| Aspect | Browser JavaScript | Node.js |
|--------|-------------------|---------|
| **Global object** | `window` | `global` |
| **DOM access** | Yes (document, elements) | No DOM |
| **File system** | No access | Full access (`fs` module) |
| **Network requests** | `fetch`, `XMLHttpRequest` | `http`, `https` modules |
| **Modules** | ES6 modules, script tags | CommonJS, ES6 modules |
| **Purpose** | Client-side interactivity | Server-side applications |
| **APIs** | Browser APIs (localStorage, etc.) | Node APIs (process, buffer, etc.) |

**Similarities:**
- Same JavaScript language
- Same V8 engine (Chrome)
- Can use same libraries (if compatible)

**Complete Examples:**

```javascript
// Browser JavaScript
// ✅ Available
window.localStorage.setItem('key', 'value');
document.getElementById('myDiv');
window.location.href = 'https://example.com';

// ❌ Not available
// require('fs'); // Error: fs is not defined
// process.env.NODE_ENV; // Error: process is not defined

// Node.js
// ✅ Available
const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});
console.log(process.env.NODE_ENV);

// ❌ Not available
// document.getElementById('myDiv'); // Error: document is not defined
// window.localStorage; // Error: window is not defined

// ✅ Works in both
const arr = [1, 2, 3];
arr.map(x => x * 2); // Same JavaScript!
```

---

## Express.js

### 30. What is middleware?

**Middleware:**
- Functions that execute during the request-response cycle
- Have access to `req`, `res`, and `next`
- Can modify request/response, end the cycle, or call `next()`

**Types:**

1. **Application-level:** `app.use()`
2. **Router-level:** `router.use()`
3. **Error-handling:** 4 parameters `(err, req, res, next)`
4. **Built-in:** `express.json()`, `express.static()`
5. **Third-party:** `cors`, `helmet`, `morgan`

**Complete Examples:**

```javascript
// Example 1: Custom logging middleware
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next(); // Must call next() to continue
}

app.use(logger); // Runs for all routes

// Example 2: Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Verify token...
  req.user = decodedUser; // Add user to request
  next();
}

app.get('/api/profile', authenticate, (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});

// Example 3: Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files
app.use(cors()); // Enable CORS

// Example 4: Error-handling middleware (4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

---

### 31. In what order do middlewares run?

**Order matters!** Middlewares execute in the order they are defined.

**Flow:**
1. Middlewares defined with `app.use()` run first
2. Then route-specific middlewares
3. Finally, route handler

**Complete Example:**

```javascript
// Middleware execution order matters!

app.use((req, res, next) => {
  console.log('1. Global middleware - runs first');
  next();
});

app.use('/api', (req, res, next) => {
  console.log('2. /api middleware - runs for /api/* routes');
  next();
});

app.get('/api/users', 
  (req, res, next) => {
    console.log('3. Route-specific middleware');
    next();
  },
  (req, res) => {
    console.log('4. Route handler - runs last');
    res.json({ users: [] });
  }
);

// Request to GET /api/users:
// Output:
// 1. Global middleware - runs first
// 2. /api middleware - runs for /api/* routes
// 3. Route-specific middleware
// 4. Route handler - runs last

// ⚠️ If middleware doesn't call next(), chain stops:
app.use((req, res, next) => {
  res.send('Stopped here'); // Doesn't call next()
  // No further middleware or routes execute!
});
```

---

### 32. How do you handle errors in Express?

**Methods:**

1. **Try-catch in async handlers:**
   ```javascript
   app.get('/api/data', async (req, res, next) => {
     try {
       const data = await fetchData();
       res.json(data);
     } catch (err) {
       next(err); // Pass to error handler
     }
   });
   ```

2. **Error-handling middleware:**
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
   });
   ```

3. **Async error wrapper:**
   ```javascript
   const asyncHandler = (fn) => (req, res, next) => {
     Promise.resolve(fn(req, res, next)).catch(next);
   };
   
   app.get('/api/data', asyncHandler(async (req, res) => {
     const data = await fetchData();
     res.json(data);
   }));
   ```

**Note:** Error middleware must have 4 parameters `(err, req, res, next)`.

**Complete Example:**

```javascript
// ✅ Method 1: Try-catch in async handlers
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    next(err); // Pass error to error handler
  }
});

// ✅ Method 2: Error-handling middleware (must be last!)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// ✅ Method 3: Async error wrapper (reusable)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Use it:
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
  // Errors automatically caught and passed to error handler!
}));

// ✅ Method 4: Express 5+ (automatic async error handling)
// In Express 5, async errors are automatically caught
```

---

### 33. What is the difference between app.use() and app.get()?

**`app.use()`:**
- Matches **all HTTP methods** (GET, POST, PUT, etc.)
- Can match **prefixes** of paths
- Used for middleware, not route handlers
- Executes for matching paths and all sub-paths

**`app.get()`:**
- Matches **only GET** requests
- Matches **exact** paths (unless using patterns)
- Used for route handlers
- More specific

**Complete Examples:**

```javascript
// app.use() - matches all methods and path prefixes
app.use('/api', (req, res, next) => {
  console.log('Runs for:');
  console.log('  GET /api');
  console.log('  POST /api');
  console.log('  GET /api/users');
  console.log('  POST /api/users');
  console.log('  GET /api/posts/123');
  // All /api/* routes!
  next();
});

// app.get() - matches only GET and exact path
app.get('/api/users', (req, res) => {
  // Only runs for: GET /api/users
  // Does NOT run for: POST /api/users
  // Does NOT run for: GET /api/users/123
  res.json({ users: [] });
});

// Practical example:
app.use(express.json()); // Middleware for all routes
app.use('/api', authenticate); // Auth for all /api routes
app.get('/api/users', getUsers); // Handler for GET /api/users
app.post('/api/users', createUser); // Handler for POST /api/users
app.get('/api/posts', getPosts); // Handler for GET /api/posts
```

---

### 34. How do you validate incoming requests?

**Methods:**

1. **Manual validation:**
   ```javascript
   app.post('/api/users', (req, res) => {
     const { email, password } = req.body;
     if (!email || !password) {
       return res.status(400).json({ error: 'Missing fields' });
     }
     // ...
   });
   ```

2. **Validation libraries:**
   - **Joi:** Schema-based validation
   - **express-validator:** Middleware for validation
   - **yup:** Schema validation

**Complete Examples:**

```javascript
// ✅ Method 1: Manual validation
app.post('/api/users', (req, res) => {
  const { email, password, age } = req.body;
  
  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  
  // Validate age
  if (age && (age < 0 || age > 120)) {
    return res.status(400).json({ error: 'Invalid age' });
  }
  
  // All valid, create user
  // ...
});

// ✅ Method 2: express-validator (recommended)
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  body('email').isEmail().withMessage('Must be valid email'),
  body('password').isLength({ min: 8 }).withMessage('Must be at least 8 characters'),
  body('age').optional().isInt({ min: 0, max: 120 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // All valid, create user
    createUser(req.body);
    res.status(201).json({ message: 'User created' });
  }
);

// ✅ Method 3: Joi (schema validation)
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(0).max(120).optional()
});

app.post('/api/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // value is validated and sanitized
  createUser(value);
  res.status(201).json({ message: 'User created' });
});
```

---

## REST API

### 35. What is REST?

**REST (Representational State Transfer):**
- An architectural style for designing web services
- Uses standard HTTP methods (GET, POST, PUT, DELETE, etc.)
- Stateless communication
- Resources identified by URLs

**RESTful principles:**

1. **Stateless:** Each request contains all information needed
2. **Resource-based:** URLs represent resources (`/api/users/123`)
3. **HTTP methods:** GET (read), POST (create), PUT (update), DELETE (remove)
4. **Representations:** JSON, XML, etc.
5. **Uniform interface:** Consistent API design

**Complete Example:**

```javascript
// RESTful API design
const express = require('express');
const app = express();
app.use(express.json());

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

// GET /api/users/123 - Get specific user
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user); // 201 Created
});

// PUT /api/users/123 - Update entire user
app.put('/api/users/:id', (req, res) => {
  const user = updateUser(req.params.id, req.body);
  res.json(user);
});

// DELETE /api/users/123 - Delete user
app.delete('/api/users/:id', (req, res) => {
  deleteUser(req.params.id);
  res.status(204).send(); // 204 No Content
});

// RESTful principles:
// ✅ Resource-based URLs: /api/users, /api/posts
// ✅ HTTP methods: GET, POST, PUT, DELETE
// ✅ Stateless: Each request contains all info needed
// ✅ JSON responses
```

---

### 36. What is the difference between PUT and PATCH?

**PUT:**
- **Full update:** Replaces entire resource
- Must send all fields (even unchanged ones)
- Idempotent (same request = same result)
- If field missing, it may be set to null/undefined

**PATCH:**
- **Partial update:** Updates only specified fields
- Send only fields to change
- Idempotent
- Other fields remain unchanged

**Complete Examples:**

```javascript
// PUT - Full update (replace entire resource)
app.put('/api/users/:id', (req, res) => {
  const { name, email, age } = req.body;
  
  // Must provide ALL fields (replaces entire user)
  const user = {
    id: req.params.id,
    name,      // Required
    email,     // Required
    age        // Required
  };
  
  updateUser(req.params.id, user);
  res.json(user);
});

// Request:
// PUT /api/users/123
// Body: { "name": "John", "email": "john@example.com", "age": 30 }
// Result: Entire user replaced

// PATCH - Partial update (update only specified fields)
app.patch('/api/users/:id', (req, res) => {
  // Only update fields provided in request
  const updates = req.body; // { name: "Jane" } or { age: 31 } or both
  
  const user = updateUserPartial(req.params.id, updates);
  res.json(user);
});

// Request:
// PATCH /api/users/123
// Body: { "name": "Jane" }
// Result: Only name updated, email and age unchanged

// Real-world example:
// PUT /api/users/123
// { "name": "John", "email": "john@example.com", "age": 30 }
// → All fields updated

// PATCH /api/users/123
// { "age": 31 }
// → Only age updated, name and email stay the same
```

---

### 37. What are common HTTP status codes?

**2xx Success:**
- `200 OK` - Request succeeded
- `201 Created` - Resource created
- `204 No Content` - Success, no response body

**3xx Redirection:**
- `301 Moved Permanently`
- `304 Not Modified` - Cached version valid

**4xx Client Error:**
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Not allowed
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource conflict
- `422 Unprocessable Entity` - Validation error

**5xx Server Error:**
- `500 Internal Server Error` - Server error
- `502 Bad Gateway` - Invalid response from upstream
- `503 Service Unavailable` - Service down

**Complete Examples:**

```javascript
// Success responses
app.get('/api/users', (req, res) => {
  res.status(200).json({ users: [] }); // 200 OK
});

app.post('/api/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user); // 201 Created
});

app.delete('/api/users/:id', (req, res) => {
  deleteUser(req.params.id);
  res.status(204).send(); // 204 No Content
});

// Client error responses
app.post('/api/users', (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email required' }); // 400 Bad Request
  }
  // ...
});

app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' }); // 404 Not Found
  }
  res.json(user);
});

app.post('/api/login', (req, res) => {
  if (!isValidUser(req.body)) {
    return res.status(401).json({ error: 'Invalid credentials' }); // 401 Unauthorized
  }
  // ...
});

app.delete('/api/users/:id', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' }); // 403 Forbidden
  }
  // ...
});

// Server error responses
app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' }); // 500 Server Error
  }
});
```

---

### 38. What is the request flow from frontend to database?

**Typical flow:**

1. **Frontend:** User action triggers API call
   ```javascript
   fetch('/api/users', { method: 'POST', body: JSON.stringify(data) })
   ```

2. **Network:** HTTP request sent to server

3. **Express Server:**
   - Middleware processes request (CORS, body parser, auth)
   - Route handler receives request
   - Business logic executed

4. **Database:**
   - Query executed (SQL/NoSQL)
   - Data retrieved/modified
   - Response returned to server

5. **Server Response:**
   - Data formatted (JSON)
   - HTTP response sent

6. **Frontend:**
   - Response received
   - UI updated

**Example:**
```
Browser → Express → Controller → Service → Database
         ←        ←            ←         ←
```

---

## Authentication & Security

### 39. What is JWT?

**JWT (JSON Web Token):**
- A compact, URL-safe token format for securely transmitting information
- Contains claims (user info, permissions)
- Signed with secret/key to prevent tampering

**Structure:**
```
header.payload.signature
```

- **Header:** Algorithm and token type
- **Payload:** Claims (user data, expiration)
- **Signature:** Verifies token hasn't been tampered with

**Use cases:**
- Authentication (user login)
- Authorization (permissions)
- Stateless sessions

**Example:**
```javascript
// Create token
const token = jwt.sign({ userId: 123 }, secret, { expiresIn: '1h' });

// Verify token
const decoded = jwt.verify(token, secret);
```

---

### 40. Where should JWT be stored?

**Options:**

1. **httpOnly cookies (Recommended):**
   - Most secure
   - Not accessible to JavaScript (XSS protection)
   - Sent automatically with requests

2. **Memory (state):**
   - Secure, not persisted
   - Lost on refresh
   - Good for access tokens

3. **localStorage:**
   - Accessible to JavaScript
   - Vulnerable to XSS
   - **Not recommended**

4. **sessionStorage:**
   - Similar to localStorage
   - Cleared on tab close
   - Still vulnerable to XSS

**Best practice:**
- **Refresh token:** httpOnly cookie
- **Access token:** Memory or httpOnly cookie
- **Never:** localStorage for sensitive tokens

---

### 41. What is the difference between authentication and authorization?

**Authentication:**
- **"Who are you?"** - Verifying user identity
- Login process - confirming user is who they claim to be
- Examples: Username/password, OAuth, biometrics

**Authorization:**
- **"What can you do?"** - Determining user permissions
- What resources/actions user can access
- Examples: Admin vs user, role-based access

**Analogy:**
- **Authentication:** Showing ID to enter building
- **Authorization:** Having key to specific rooms

**Example:**
```javascript
// Authentication
if (!user) return res.status(401).json({ error: 'Not authenticated' });

// Authorization
if (user.role !== 'admin') {
  return res.status(403).json({ error: 'Not authorized' });
}
```

---

### 42. How do you protect against:

**SQL Injection:**
- **Use parameterized queries:** Never concatenate user input into SQL
- **ORM/Query builders:** Use Sequelize, TypeORM, Prisma
- **Input validation:** Validate and sanitize inputs
- **Least privilege:** Database user with minimal permissions

```javascript
// Bad
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Good
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

**XSS (Cross-Site Scripting):**
- **Escape output:** Encode user input before displaying
- **Content Security Policy (CSP):** Restrict script sources
- **Sanitize input:** Remove/escape HTML/JavaScript
- **httpOnly cookies:** Prevent JavaScript access to cookies

```javascript
// Escape user input
const safe = escapeHtml(userInput);
```

**CSRF (Cross-Site Request Forgery):**
- **CSRF tokens:** Unique token per session
- **SameSite cookies:** `SameSite=Strict` attribute
- **Referer header:** Check request origin
- **Double-submit cookies:** Token in cookie and form

```javascript
// CSRF token middleware
app.use(csrf({ cookie: true }));
```

---

### 43. Why should passwords not be stored as plain text?

**Security risks:**

1. **Database breach:** If database is compromised, all passwords exposed
2. **Insider threat:** Anyone with DB access sees passwords
3. **Password reuse:** Users reuse passwords across sites
4. **Compliance:** Violates security standards (PCI-DSS, GDPR)

**Solution: Hashing**
- Use **bcrypt**, **argon2**, or **scrypt**
- One-way function (can't reverse)
- Add **salt** (random data) to prevent rainbow table attacks
- **Never** use MD5, SHA1 (too fast, vulnerable)

**Example:**
```javascript
// Hash password
const hashed = await bcrypt.hash(password, 10);

// Verify password
const isValid = await bcrypt.compare(password, hashed);
```

---

## Databases

### 44. When would you choose SQL over NoSQL?

**Choose SQL when:**
- **Structured data:** Well-defined schema
- **Relationships:** Complex relationships between data
- **ACID transactions:** Need strong consistency
- **Complex queries:** JOINs, aggregations, reporting
- **Data integrity:** Foreign keys, constraints important

**Choose NoSQL when:**
- **Flexible schema:** Structure changes frequently
- **Scalability:** Need horizontal scaling
- **High write volume:** Fast writes (logs, analytics)
- **Simple queries:** Key-value lookups, simple reads
- **Large datasets:** Big data, unstructured data

**Examples:**
- **SQL:** E-commerce, banking, CRM systems
- **NoSQL:** Social media, IoT, real-time analytics

---

### 45. What is an index and why is it important?

**Index:**
- A data structure that improves query performance
- Like an index in a book - helps find data quickly
- Stored separately from table data

**Why important:**
- **Faster queries:** Especially on large tables
- **Faster JOINs:** Speeds up relationship queries
- **Faster sorting:** Helps ORDER BY operations
- **Unique constraints:** Enforces uniqueness

**Trade-offs:**
- **Storage:** Takes additional space
- **Write performance:** Slower INSERT/UPDATE (index must update)

**Example:**
```sql
-- Create index
CREATE INDEX idx_email ON users(email);

-- Query uses index automatically
SELECT * FROM users WHERE email = 'user@example.com';
```

---

### 46. What is a JOIN?

**JOIN:**
- Combines rows from two or more tables based on related columns
- Used to query data from multiple tables

**Types:**

1. **INNER JOIN:** Returns matching rows from both tables
2. **LEFT JOIN:** Returns all rows from left table + matching right
3. **RIGHT JOIN:** Returns all rows from right table + matching left
4. **FULL OUTER JOIN:** Returns all rows from both tables

**Example:**
```sql
-- Get users with their orders
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

---

### 47. How do you model a one-to-many relationship?

**One-to-many:**
- One record in table A relates to many records in table B
- Example: One user has many orders

**Implementation:**
- Add **foreign key** in the "many" table
- Foreign key references primary key of "one" table

**Example:**
```sql
-- Users table (one)
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

-- Orders table (many)
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,  -- Foreign key
  total DECIMAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**In ORM:**
```javascript
// Sequelize example
User.hasMany(Order);
Order.belongsTo(User);
```

---

### 48. What is a transaction?

**Transaction:**
- A sequence of database operations that execute as a single unit
- **ACID properties:**
  - **Atomicity:** All or nothing
  - **Consistency:** Database remains valid
  - **Isolation:** Concurrent transactions don't interfere
  - **Durability:** Committed changes persist

**Use cases:**
- Money transfers (debit one account, credit another)
- Order creation (create order, update inventory, charge payment)
- Any operation requiring multiple steps to succeed together

**Example:**
```javascript
// Transaction ensures both succeed or both fail
await db.transaction(async (t) => {
  await Account.decrement({ balance: 100 }, { where: { id: 1 }, transaction: t });
  await Account.increment({ balance: 100 }, { where: { id: 2 }, transaction: t });
});
```

---

## Performance & Scalability

### 49. What happens when many requests hit the server at the same time?

**Node.js handling:**

1. **Event loop:**
   - Requests are queued in the event loop
   - Non-blocking I/O allows handling many concurrent requests
   - Single thread processes requests asynchronously

2. **Concurrency:**
   - Node.js can handle thousands of concurrent connections
   - Limited by available memory and CPU
   - I/O operations don't block the thread

3. **Bottlenecks:**
   - **CPU-intensive tasks:** Block the event loop
   - **Memory:** Too many requests can exhaust memory
   - **Database:** Database becomes bottleneck

4. **Solutions:**
   - **Load balancing:** Distribute requests across servers
   - **Clustering:** Multiple Node.js processes
   - **Caching:** Reduce database load
   - **Database connection pooling:** Reuse connections

**Example with clustering:**
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker process
  app.listen(3000);
}
```

---

### 50. How does Node.js handle I/O operations?

**Non-blocking I/O:**

1. **Asynchronous operations:**
   - I/O operations (file, network, database) are asynchronous
   - Don't block the main thread
   - Use callbacks, promises, or async/await

2. **Event loop:**
   - Manages I/O operations
   - When I/O completes, callback is queued
   - Main thread continues processing other requests

3. **libuv:**
   - C++ library that handles I/O
   - Uses OS-level threads for I/O operations
   - Main JavaScript thread stays free

**Example:**
```javascript
// Non-blocking file read
fs.readFile('file.txt', (err, data) => {
  // Callback executes when I/O completes
  console.log(data);
});
// Code here executes immediately, doesn't wait for file read
```

---

### 51. How would you improve a slow API?

**Strategies:**

1. **Database optimization:**
   - Add indexes on frequently queried columns
   - Optimize queries (avoid N+1 queries)
   - Use connection pooling
   - Consider read replicas

2. **Caching:**
   - Cache frequently accessed data (Redis, Memcached)
   - Cache API responses
   - Use CDN for static assets

3. **Code optimization:**
   - Avoid blocking operations
   - Use async/await properly
   - Optimize algorithms
   - Remove unnecessary computations

4. **Infrastructure:**
   - Load balancing
   - Horizontal scaling (more servers)
   - Database sharding
   - Use faster hardware

5. **API design:**
   - Pagination for large datasets
   - Field selection (only return needed data)
   - Compression (gzip)
   - HTTP/2

**Example:**
```javascript
// Add caching
const cache = require('redis');
app.get('/api/data', async (req, res) => {
  const cached = await cache.get('data');
  if (cached) return res.json(JSON.parse(cached));
  
  const data = await fetchFromDB();
  await cache.set('data', JSON.stringify(data), 'EX', 3600);
  res.json(data);
});
```

---

## Full-Stack Questions

### 52. How does React communicate with Node.js?

**Communication flow:**

1. **HTTP requests:**
   - React makes HTTP requests (fetch, axios) to Node.js API
   - Node.js Express server handles requests
   - Returns JSON responses

2. **REST API:**
   - Standard REST endpoints
   - GET, POST, PUT, DELETE methods
   - JSON request/response format

3. **WebSockets (real-time):**
   - For bidirectional communication
   - Chat, notifications, live updates
   - Socket.io library

**Example:**
```javascript
// React (frontend)
const response = await fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
});

// Node.js (backend)
app.post('/api/users', (req, res) => {
  const user = createUser(req.body);
  res.json(user);
});
```

---

### 53. Describe a full login flow from frontend to backend.

**Complete flow:**

1. **Frontend:**
   ```javascript
   // User submits login form
   const response = await fetch('/api/login', {
     method: 'POST',
     body: JSON.stringify({ email, password })
   });
   const { token, user } = await response.json();
   localStorage.setItem('token', token);
   ```

2. **Backend receives request:**
   ```javascript
   app.post('/api/login', async (req, res) => {
     const { email, password } = req.body;
   ```

3. **Validate credentials:**
   ```javascript
     const user = await User.findOne({ email });
     if (!user) return res.status(401).json({ error: 'Invalid credentials' });
     
     const isValid = await bcrypt.compare(password, user.password);
     if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
   ```

4. **Generate token:**
   ```javascript
     const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
   ```

5. **Send response:**
   ```javascript
     res.json({ token, user: { id: user.id, email: user.email } });
   });
   ```

6. **Frontend stores token:**
   - Token stored (httpOnly cookie or memory)
   - Used for subsequent authenticated requests

7. **Protected routes:**
   ```javascript
   // Backend middleware
   function authenticate(req, res, next) {
     const token = req.headers.authorization?.split(' ')[1];
     const decoded = jwt.verify(token, secret);
     req.userId = decoded.userId;
     next();
   }
   ```

---

### 54. How do you handle errors on frontend and backend?

**Backend error handling:**

```javascript
// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Don't leak error details in production
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

**Frontend error handling:**

```javascript
// Try-catch in components
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError(error.message);
  // Show user-friendly error message
}

// Global error boundary (React)
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**Best practices:**
- **Backend:** Log errors, return appropriate status codes, don't expose internals
- **Frontend:** Show user-friendly messages, handle network errors, use error boundaries

---

### 55. How would you split a system into microservices?

**Microservices architecture:**
- Split monolithic application into small, independent services
- Each service handles a specific business domain

**Splitting strategy:**

1. **Domain-driven design:**
   - Identify bounded contexts (User, Order, Payment, Inventory)
   - Each context becomes a service

2. **Service boundaries:**
   - **User service:** Authentication, user management
   - **Order service:** Order processing
   - **Payment service:** Payment processing
   - **Product service:** Product catalog

3. **Communication:**
   - **REST APIs:** HTTP requests between services
   - **Message queues:** RabbitMQ, Kafka for async communication
   - **Service mesh:** For complex inter-service communication

4. **Data management:**
   - Each service has its own database
   - Avoid shared databases
   - Use API for data access

5. **Deployment:**
   - Independent deployment
   - Containerization (Docker)
   - Orchestration (Kubernetes)

**Example structure:**
```
Monolith → Microservices
├── User Service (port 3001)
├── Order Service (port 3002)
├── Payment Service (port 3003)
└── Product Service (port 3004)
```

**Benefits:**
- Independent scaling
- Technology diversity
- Fault isolation
- Team autonomy

**Challenges:**
- Network latency
- Data consistency
- Distributed transactions
- Increased complexity

---

## Summary

This document covers essential full-stack interview topics for React and Node.js developers. Key areas include:

- **React fundamentals:** Components, hooks, state management, performance
- **Node.js basics:** Event loop, async I/O, Express.js
- **Backend:** REST APIs, authentication, security, databases
- **Full-stack:** Communication patterns, error handling, architecture

Remember to practice implementing these concepts, not just memorizing answers. Good luck with your interviews!

