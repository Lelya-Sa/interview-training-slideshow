# React - Mini Projects & Examples

## Project 1: Todo Application with Hooks

### Description
Build a complete Todo app with add, delete, toggle, and filter functionality using React Hooks.

### Implementation

```jsx
// TodoApp.jsx
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit">Add Todo</button>
      </form>

      <div className="filters">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed ({todos.length - activeCount})
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      {todos.length > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      )}
    </div>
  );
};

// TodoItem Component
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        Delete
      </button>
    </li>
  );
};

export default TodoApp;
```

### Questions
1. How would you add edit functionality to todos?
2. How would you implement drag-and-drop reordering?
3. How would you add categories/tags to todos?
4. How would you sync todos with a backend API?

---

## Project 2: Custom Hooks - useFetch

### Description
Create a reusable custom hook for data fetching with loading and error states.

### Implementation

```jsx
// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [url]); // Only re-run if url changes

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
```

### Usage Example

```jsx
// UserProfile.jsx
import React from 'react';
import useFetch from './useFetch';

const UserProfile = ({ userId }) => {
  const { data: user, loading, error, refetch } = useFetch(
    `https://api.example.com/users/${userId}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};

export default UserProfile;
```

### Questions
1. How would you add caching to the useFetch hook?
2. How would you implement retry logic for failed requests?
3. How would you add request cancellation on component unmount?
4. How would you handle POST/PUT requests with the hook?

---

## Project 3: Form with Validation

### Description
Build a form component with real-time validation using custom hooks.

### Implementation

```jsx
// useForm.js - Custom hook for form handling
import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Validate on change if field was touched
    if (touched[name] && validate) {
      const fieldErrors = validate({ [name]: fieldValue }, values);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name] || ''
      }));
    }
  }, [touched, validate, values]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] }, values);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name] || ''
      }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Validate all fields
      if (validate) {
        const formErrors = validate(values, values);
        setErrors(formErrors);
        
        if (Object.keys(formErrors).length === 0) {
          onSubmit(values);
        }
      } else {
        onSubmit(values);
      }
    };
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
};

export default useForm;
```

### Form Component

```jsx
// SignupForm.jsx
import React from 'react';
import useForm from './useForm';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!values.terms) {
    errors.terms = 'You must accept the terms';
  }

  return errors;
};

const SignupForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validate
  );

  const onSubmit = (formValues) => {
    console.log('Form submitted:', formValues);
    // Handle form submission
    alert('Form submitted successfully!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <h2>Sign Up</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.name && errors.name ? 'error' : ''}
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.email && errors.email ? 'error' : ''}
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.password && errors.password ? 'error' : ''}
        />
        {touched.password && errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          I accept the terms and conditions
        </label>
        {touched.terms && errors.terms && (
          <span className="error-message">{errors.terms}</span>
        )}
      </div>

      <button type="submit">Sign Up</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
};

export default SignupForm;
```

### Questions
1. How would you add async validation (e.g., check if email exists)?
2. How would you implement field-level validation rules?
3. How would you add form state persistence (save draft)?
4. How would you handle file uploads in the form?

---

## Project 4: Context API - Theme Switcher

### Description
Implement a theme provider using Context API for dark/light mode.

### Implementation

```jsx
// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Usage

```jsx
// App.jsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import Content from './Content';

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <Content />
      </div>
    </ThemeProvider>
  );
};

export default App;

// ThemeToggle.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
    </button>
  );
};

export default ThemeToggle;

// Content.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

const Content = () => {
  const { theme, isDark } = useTheme();

  return (
    <div className={`content ${theme}`}>
      <h1>Theme: {theme}</h1>
      <p>This content adapts to the current theme.</p>
    </div>
  );
};

export default Content;
```

### Questions
1. How would you add more theme options (e.g., auto, high contrast)?
2. How would you implement per-component theme overrides?
3. How would you add theme transitions/animations?
4. How would you sync theme across multiple tabs/windows?

---

## Project 5: Infinite Scroll with Intersection Observer

### Description
Implement infinite scroll using Intersection Observer API.

### Implementation

```jsx
// useInfiniteScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (fetchMore, hasMore, loading) => {
  const [element, setElement] = useState(null);
  const observer = useRef(null);

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMore();
      }
    });
    
    if (node) observer.current.observe(node);
    setElement(node);
  }, [loading, hasMore, fetchMore]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return [lastElementRef, element];
};

export default useInfiniteScroll;
```

### Usage

```jsx
// InfiniteList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

const InfiniteList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch(`/api/items?page=${pageNum}&limit=20`);
      const data = await response.json();
      
      if (pageNum === 1) {
        setItems(data.items);
      } else {
        setItems(prev => [...prev, ...data.items]);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(1);
  }, [fetchItems]);

  const fetchMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchItems(nextPage);
    }
  }, [page, loading, hasMore, fetchItems]);

  const [lastElementRef] = useInfiniteScroll(fetchMore, hasMore, loading);

  return (
    <div className="infinite-list">
      <h2>Infinite Scroll List</h2>
      
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastElementRef : null}
            className="list-item"
          >
            {item.name}
          </li>
        ))}
      </ul>

      {loading && <div className="loading">Loading more items...</div>}
      {!hasMore && <div className="end-message">No more items to load</div>}
    </div>
  );
};

export default InfiniteList;
```

### Questions
1. How would you add pull-to-refresh functionality?
2. How would you implement virtual scrolling for better performance?
3. How would you handle scroll position restoration?
4. How would you add error handling and retry logic?

