# JavaScript - Mini Projects & Examples

## Project 1: Event Manager System

### Description
Build an event management system with class-based architecture, event listeners, and DOM manipulation.

### Implementation

```javascript
// EventManager.js
class EventManager {
  constructor() {
    this.events = [];
    this.listeners = new Map();
  }

  // Add event
  addEvent(event) {
    if (!this.validateEvent(event)) {
      throw new Error('Invalid event data');
    }
    
    const newEvent = {
      id: Date.now(),
      ...event,
      createdAt: new Date().toISOString(),
      attendees: event.attendees || []
    };
    
    this.events.push(newEvent);
    this.emit('event-added', newEvent);
    return newEvent;
  }

  // Remove event
  removeEvent(eventId) {
    const index = this.events.findIndex(e => e.id === eventId);
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    const removed = this.events.splice(index, 1)[0];
    this.emit('event-removed', removed);
    return removed;
  }

  // Register attendee
  registerAttendee(eventId, attendee) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.attendees.some(a => a.email === attendee.email)) {
      throw new Error('Attendee already registered');
    }

    event.attendees.push({
      ...attendee,
      registeredAt: new Date().toISOString()
    });

    this.emit('attendee-registered', { eventId, attendee });
    return event;
  }

  // Get events by date range
  getEventsByDateRange(startDate, endDate) {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  // Subscribe to events
  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  // Emit event
  emit(eventName, data) {
    const callbacks = this.listeners.get(eventName) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Validate event
  validateEvent(event) {
    return event.title && 
           event.date && 
           event.location &&
           new Date(event.date) >= new Date();
  }

  // Get statistics
  getStats() {
    return {
      totalEvents: this.events.length,
      totalAttendees: this.events.reduce((sum, e) => sum + e.attendees.length, 0),
      upcomingEvents: this.events.filter(e => new Date(e.date) >= new Date()).length
    };
  }
}

// Usage
const eventManager = new EventManager();

// Subscribe to events
eventManager.on('event-added', (event) => {
  console.log('New event added:', event.title);
});

eventManager.on('attendee-registered', ({ eventId, attendee }) => {
  console.log(`${attendee.name} registered for event ${eventId}`);
});

// Add events
const event1 = eventManager.addEvent({
  title: 'JavaScript Conference',
  date: '2024-06-15',
  location: 'San Francisco',
  description: 'Annual JS conference'
});

eventManager.registerAttendee(event1.id, {
  name: 'John Doe',
  email: 'john@example.com'
});

console.log(eventManager.getStats());
```

### Questions
1. How would you add persistence (save to localStorage or API)?
2. How would you implement event search and filtering?
3. How would you add event capacity limits?
4. How would you implement event reminders/notifications?

---

## Project 2: Debounce and Throttle Implementation

### Description
Implement debounce and throttle functions from scratch for performance optimization.

### Implementation

```javascript
// Debounce: Wait until function hasn't been called for delay period
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Throttle: Execute at most once per delay period
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Advanced throttle with leading and trailing options
function advancedThrottle(func, limit, options = {}) {
  let timeoutId;
  let lastExecTime = 0;
  const { leading = true, trailing = true } = options;
  
  return function(...args) {
    const context = this;
    const currentTime = Date.now();
    
    // Reset if enough time has passed
    if (currentTime - lastExecTime > limit) {
      lastExecTime = currentTime;
    }
    
    const remainingTime = limit - (currentTime - lastExecTime);
    
    if (remainingTime <= 0 || remainingTime > limit) {
      if (leading) {
        lastExecTime = currentTime;
        func.apply(context, args);
      }
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      if (trailing) {
        timeoutId = setTimeout(() => {
          lastExecTime = Date.now();
          func.apply(context, args);
        }, remainingTime);
      }
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();
        func.apply(context, args);
      }, remainingTime);
    }
  };
}

// Usage Examples

// Search input with debounce
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // Perform API call
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Scroll handler with throttle
const throttledScroll = throttle(() => {
  console.log('Scrolled');
  // Update scroll position
}, 100);

window.addEventListener('scroll', throttledScroll);

// Resize handler
const throttledResize = advancedThrottle(() => {
  console.log('Window resized');
  // Handle resize
}, 250, { leading: true, trailing: true });

window.addEventListener('resize', throttledResize);
```

### Questions
1. How would you add cancellation to debounce/throttle?
2. How would you implement a flush method to execute immediately?
3. How would you handle edge cases (very fast calls, zero delay)?
4. How would you add a max wait option to debounce?

---

## Project 3: Promise-based HTTP Client

### Description
Build a fetch wrapper with retry logic, timeout, and request interceptors.

### Implementation

```javascript
// HTTPClient.js
class HTTPClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
    this.defaultConfig = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000
    };
  }

  // Add request interceptor
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // Apply request interceptors
  async applyRequestInterceptors(config) {
    let modifiedConfig = config;
    for (const interceptor of this.interceptors.request) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  // Apply response interceptors
  async applyResponseInterceptors(response) {
    let modifiedResponse = response;
    for (const interceptor of this.interceptors.response) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  // Create timeout promise
  createTimeoutPromise(timeout) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  // Retry with exponential backoff
  async requestWithRetry(url, config, retries) {
    let lastError;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          const delay = config.retryDelay * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const response = await this.makeRequest(url, config);
        return response;
      } catch (error) {
        lastError = error;
        // Don't retry on 4xx errors (except 429)
        if (error.status >= 400 && error.status < 500 && error.status !== 429) {
          throw error;
        }
      }
    }
    
    throw lastError;
  }

  // Make actual request
  async makeRequest(url, config) {
    const timeout = config.timeout || this.defaultConfig.timeout;
    
    // Apply request interceptors
    const finalConfig = await this.applyRequestInterceptors({
      ...this.defaultConfig,
      ...config
    });

    try {
      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(`${this.baseURL}${url}`, {
          method: finalConfig.method || 'GET',
          headers: finalConfig.headers || {},
          body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
          ...finalConfig.options
        }),
        this.createTimeoutPromise(timeout)
      ]);

      let data = response;
      
      // Parse JSON if content-type is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      // Create response object
      const responseObj = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        ok: response.ok
      };

      // Apply response interceptors
      const finalResponse = await this.applyResponseInterceptors(responseObj);

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return finalResponse;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error');
      }
      throw error;
    }
  }

  // GET request
  async get(url, config = {}) {
    return this.request(url, { ...config, method: 'GET' });
  }

  // POST request
  async post(url, data, config = {}) {
    return this.request(url, {
      ...config,
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });
  }

  // PUT request
  async put(url, data, config = {}) {
    return this.request(url, {
      ...config,
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });
  }

  // DELETE request
  async delete(url, config = {}) {
    return this.request(url, { ...config, method: 'DELETE' });
  }

  // Generic request method
  async request(url, config = {}) {
    const retries = config.retries ?? this.defaultConfig.retries;
    return this.requestWithRetry(url, config, retries);
  }
}

// Usage
const client = new HTTPClient('https://api.example.com');

// Add authentication interceptor
client.addRequestInterceptor(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    };
  }
  return config;
});

// Add error handling interceptor
client.addResponseInterceptor(async (response) => {
  if (response.status === 401) {
    // Handle unauthorized
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return response;
});

// Make requests
try {
  const users = await client.get('/users');
  console.log(users.data);

  const newUser = await client.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });
  console.log(newUser.data);
} catch (error) {
  console.error('Request failed:', error);
}
```

### Questions
1. How would you add request cancellation (AbortController)?
2. How would you implement request/response caching?
3. How would you add progress tracking for uploads?
4. How would you implement request queuing?

---

## Project 4: State Management System

### Description
Build a simple state management system similar to Redux.

### Implementation

```javascript
// SimpleStore.js
class SimpleStore {
  constructor(reducer, initialState = {}) {
    this.state = initialState;
    this.reducer = reducer;
    this.listeners = [];
    this.middlewares = [];
  }

  // Get current state
  getState() {
    return this.state;
  }

  // Dispatch action
  dispatch(action) {
    // Apply middleware
    let enhancedDispatch = this.dispatch;
    
    this.middlewares.forEach(middleware => {
      enhancedDispatch = middleware(this)(enhancedDispatch);
    });

    // Update state with reducer
    this.state = this.reducer(this.state, action);

    // Notify listeners
    this.listeners.forEach(listener => listener());
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Add middleware
  applyMiddleware(...middlewares) {
    this.middlewares = middlewares;
  }
}

// Usage Example: Todo Store
const todoReducer = (state = { todos: [], filter: 'all' }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

// Create store
const store = new SimpleStore(todoReducer);

// Logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('New state:', store.getState());
  return result;
};

// Apply middleware
store.applyMiddleware(loggerMiddleware);

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'ADD_TODO', payload: 'Learn Redux' });
store.dispatch({ type: 'ADD_TODO', payload: 'Build app' });
store.dispatch({ type: 'TOGGLE_TODO', payload: 1 });
store.dispatch({ type: 'SET_FILTER', payload: 'completed' });

// Unsubscribe
unsubscribe();
```

### Questions
1. How would you add async action support (thunks)?
2. How would you implement time-travel debugging?
3. How would you add middleware for API calls?
4. How would you implement selector functions for derived state?

