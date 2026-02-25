# React - Interview Material

## Definition
React is a JavaScript library for building user interfaces, particularly web applications. It uses a component-based architecture and a virtual DOM for efficient rendering.

## Core Concepts

### 1. Components
- **Functional Components**: Modern approach using functions
- **Class Components**: Older approach using ES6 classes
- **Component Composition**: Building complex UIs from simple components
- **Component Reusability**: Writing components that can be used multiple times

### 2. JSX (JavaScript XML)
- **Syntax Extension**: JavaScript that looks like HTML
- **Expressions**: Embedding JavaScript expressions with `{}`
- **Attributes: `className` instead of `class`, `htmlFor` instead of `for`
- **Self-closing Tags**: Must be closed in JSX

### 3. Props (Properties)
- **Passing Data**: From parent to child components
- **Props are Read-only**: Cannot be modified by child
- **PropTypes**: Type checking for props (optional)
- **Default Props**: Default values for props
- **Children Prop**: Special prop for nested content

### 4. State
- **useState Hook**: Managing component state in functional components
- **State Updates**: Asynchronous and batched
- **State Immutability**: Never mutate state directly
- **Lifting State Up**: Moving state to common ancestor
- **State vs Props**: State is internal, props are external

### 5. Lifecycle Methods (Class Components)
- **componentDidMount**: After component mounts
- **componentDidUpdate**: After component updates
- **componentWillUnmount**: Before component unmounts
- **getDerivedStateFromProps**: Before render
- **shouldComponentUpdate**: Control re-rendering

### 6. Hooks
- **useState**: Manage component state
- **useEffect**: Handle side effects (mount, update, unmount)
- **useContext**: Access context values
- **useReducer**: Complex state management
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize callback functions
- **useRef**: Access DOM or persist values
- **useLayoutEffect**: Synchronous version of useEffect
- **Custom Hooks**: Reusable stateful logic

### 7. Virtual DOM
- **Concept**: JavaScript representation of real DOM
- **Reconciliation**: Process of updating DOM efficiently
- **Diffing Algorithm**: Comparing old and new virtual DOM trees
- **Keys**: Help React identify which items changed

### 8. Event Handling
- **Synthetic Events**: React's wrapper around native events
- **Event Pooling**: Events are reused for performance
- **Binding**: `this` binding in class components
- **Event Handlers**: Functions that handle user interactions

### 9. Conditional Rendering
- **if/else**: Standard JavaScript conditionals
- **Ternary Operator**: `condition ? true : false`
- **Logical &&**: `condition && <Component />`
- **Early Returns**: Return early to avoid rendering

### 10. Lists and Keys
- **map()**: Transform array to JSX elements
- **Keys**: Unique identifiers for list items
- **Key Best Practices**: Use stable, unique IDs

### 11. Forms and Controlled Components
- **Controlled Components**: Form data handled by React state
- **Uncontrolled Components**: Form data handled by DOM
- **Form Validation**: Client-side validation
- **Form Submission**: Handling form events

### 12. Context API
- **createContext**: Create context
- **Provider**: Provide context value
- **Consumer**: Consume context value
- **useContext Hook**: Modern way to consume context
- **When to Use**: Sharing data across component tree

### 13. Performance Optimization
- **React.memo**: Memoize functional components
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize callback functions
- **Code Splitting**: Lazy loading components
- **React.lazy**: Lazy load components
- **Suspense**: Handle loading states

### 14. Error Boundaries
- **componentDidCatch**: Catch errors in child components
- **Error Boundary Pattern**: Class component that catches errors
- **Fallback UI**: Display error UI instead of crashing

### 15. Routing (React Router)
- **BrowserRouter**: Router for web apps
- **Route**: Define routes
- **Link**: Navigate between routes
- **useNavigate**: Programmatic navigation
- **useParams**: Access route parameters
- **Nested Routes**: Routes within routes

### 16. State Management
- **Local State**: useState, useReducer
- **Context API**: Global state without libraries
- **Redux**: Predictable state container
- **Zustand**: Lightweight state management
- **Recoil**: Facebook's state management library

### 17. Testing
- **React Testing Library**: Testing user interactions
- **Jest**: Testing framework
- **Snapshot Testing**: Capture component output
- **Unit Testing**: Test individual components
- **Integration Testing**: Test component interactions

### 18. Advanced Patterns
- **Higher-Order Components (HOC)**: Functions that return components
- **Render Props**: Components that accept functions as children
- **Compound Components**: Components that work together
- **Controlled vs Uncontrolled**: Two approaches to form handling

### 19. React Patterns
- **Container/Presentational**: Separation of logic and presentation
- **Provider Pattern**: Context providers
- **Compound Components**: Related components working together
- **Render Props**: Sharing code between components

### 20. Best Practices
- Keep components small and focused
- Use functional components and hooks
- Extract reusable logic into custom hooks
- Use proper keys in lists
- Avoid unnecessary re-renders
- Use TypeScript for type safety
- Follow component naming conventions
- Keep state as low as possible in tree

## Mini Projects
See [projects.md](./projects.md) for complete implementation examples:
- Todo Application with Hooks
- Custom Hooks (useFetch)
- Form with Validation
- Context API - Theme Switcher
- Infinite Scroll with Intersection Observer

