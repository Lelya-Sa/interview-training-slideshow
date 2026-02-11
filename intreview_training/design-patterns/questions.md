# Design Patterns - Interview Questions Index

## General Questions

### 1. What are design patterns?
**Answer:** Design patterns are reusable solutions to common problems in software design. They are templates for solving problems that occur repeatedly in software development.

**Benefits:**
- Proven solutions to common problems
- Better code organization and structure
- Easier maintenance and modification
- Improved communication (shared vocabulary)
- Faster development

### 2. What are the three main categories of design patterns?
**Answer:**
1. **Creational**: Focus on object creation (Singleton, Factory, Builder)
2. **Structural**: Focus on object composition (Adapter, Decorator, Facade)
3. **Behavioral**: Focus on object interaction (Observer, Strategy, Command)

### 3. When should you use design patterns?
**Answer:**
- When you recognize a recurring problem
- When the pattern fits the problem naturally
- When it improves code quality and maintainability
- When team members understand the pattern

**When NOT to use:**
- Don't force a pattern where it doesn't fit
- Don't over-engineer simple problems
- Don't use patterns just to show knowledge

### 4. What's the difference between design patterns and algorithms?
**Answer:**
- **Algorithms**: Step-by-step procedures to solve computational problems (e.g., sorting, searching)
- **Design Patterns**: Structural solutions to design problems (e.g., how to organize code, manage dependencies)

### 5. Can you explain the difference between a design pattern and an anti-pattern?
**Answer:**
- **Design Pattern**: Proven solution to a common problem
- **Anti-pattern**: Common solution that appears helpful but is counterproductive (e.g., God Object, Spaghetti Code)

## Creational Patterns Questions

### 6. Explain the Singleton pattern. When would you use it?
**Answer:** Ensures only one instance of a class exists throughout the application.

**Use cases:**
- Database connections
- Logger instances
- Configuration managers
- Cache managers

**Pros:**
- Controlled access to single instance
- Lazy initialization possible
- Global access point

**Cons:**
- Difficult to test (global state)
- Violates Single Responsibility Principle
- Can hide dependencies
- Thread-safety concerns in multi-threaded environments

### 7. What are the different ways to implement Singleton?
**Answer:**
1. **Eager initialization** - Create instance at class loading
2. **Lazy initialization** - Create instance on first access
3. **Thread-safe with synchronized** - Use synchronization
4. **Double-checked locking** - Check twice before locking
5. **Bill Pugh solution** - Use static inner class
6. **Enum Singleton** - Use enum (best for Java)

### 8. Explain the Factory pattern. What problem does it solve?
**Answer:** Creates objects without specifying the exact class. Encapsulates object creation logic.

**Problem it solves:**
- Decouples object creation from usage
- Centralizes creation logic
- Makes code more maintainable

**Example:** Creating different types of database connections (MySQL, PostgreSQL, MongoDB)

### 9. What's the difference between Factory and Abstract Factory?
**Answer:**
- **Factory**: Creates objects of a single type (one product family)
- **Abstract Factory**: Creates families of related objects (multiple product families)

**Example:**
- Factory: Create different types of buttons
- Abstract Factory: Create UI components for different themes (Windows, Mac, Linux)

### 10. Explain the Builder pattern. When is it better than constructors?
**Answer:** Constructs complex objects step by step.

**Better than constructors when:**
- Object has many optional parameters
- Need to validate parameters before construction
- Want immutable objects
- Need to support different representations

**Example:** Building SQL queries, HTTP requests, configuration objects

### 11. What is the Prototype pattern?
**Answer:** Create objects by cloning existing instances rather than creating new ones from scratch.

**Use cases:**
- When object creation is expensive
- When you want to avoid subclassing
- When objects have many similar configurations

## Structural Patterns Questions

### 12. Explain the Adapter pattern. Give a real-world example.
**Answer:** Allows incompatible interfaces to work together by wrapping an object.

**Real-world example:**
- Power adapter (converts one plug type to another)
- API adapter (converts old API to new interface)
- Database adapter (converts one DB interface to another)

### 13. What's the difference between Adapter and Decorator?
**Answer:**
- **Adapter**: Changes interface to make incompatible classes work together
- **Decorator**: Adds new behavior without changing interface

**Key difference:**
- Adapter = "I need this to work with that"
- Decorator = "I want to add features to this"

### 14. Explain the Facade pattern. What problem does it solve?
**Answer:** Provides simplified interface to complex subsystem.

**Problem it solves:**
- Hides complexity of subsystem
- Provides single entry point
- Reduces dependencies between client and subsystem

**Example:** API gateway that simplifies multiple microservices

### 15. What is the Proxy pattern? Give examples.
**Answer:** Provides placeholder for another object to control access.

**Types:**
- **Virtual Proxy**: Lazy loading (load expensive object on demand)
- **Protection Proxy**: Access control (check permissions)
- **Remote Proxy**: Network communication (represent remote object)
- **Caching Proxy**: Cache results (store expensive computations)

### 16. Explain the Decorator pattern. How is it different from inheritance?
**Answer:** Adds behavior to objects dynamically by wrapping them.

**vs Inheritance:**
- **Inheritance**: Static, compile-time behavior addition
- **Decorator**: Dynamic, runtime behavior addition
- **Inheritance**: Can lead to class explosion
- **Decorator**: More flexible, can combine behaviors

**Example:** Adding features to coffee (milk, sugar, whipped cream) - can combine any combination

## Behavioral Patterns Questions

### 17. Explain the Observer pattern. Where is it commonly used?
**Answer:** One-to-many dependency where multiple observers are notified of state changes.

**Common uses:**
- Event handling systems
- MVC architecture (Model notifies Views)
- React's state management
- Pub/Sub systems
- Model-View binding

### 18. What's the difference between Observer and Pub/Sub?
**Answer:**
- **Observer**: Direct communication, subject knows observers
- **Pub/Sub**: Indirect communication through message broker, decoupled

**Observer**: Subject → Observer (direct)
**Pub/Sub**: Publisher → Broker → Subscriber (indirect)

### 19. Explain the Strategy pattern. When would you use it?
**Answer:** Defines family of algorithms, makes them interchangeable at runtime.

**Use cases:**
- Different sorting algorithms
- Payment methods (Credit Card, PayPal, Bitcoin)
- Compression algorithms
- Validation strategies

**Benefits:**
- Eliminates conditional statements
- Easy to add new strategies
- Each strategy can be tested independently

### 20. What's the difference between Strategy and State patterns?
**Answer:**
- **Strategy**: Algorithm is chosen by client, behavior changes based on external choice
- **State**: Behavior changes based on internal state, state transitions are automatic

**Example:**
- Strategy: Choose payment method (user decides)
- State: Vending machine (automatically transitions between states)

### 21. Explain the Command pattern. What are its benefits?
**Answer:** Encapsulates request as object, allowing parameterization, queuing, logging, and undo.

**Benefits:**
- Decouple invoker from receiver
- Support undo/redo operations
- Queue requests
- Log requests
- Support transactions

**Example:** Text editor (copy, paste, undo, redo)

### 22. What is the Chain of Responsibility pattern?
**Answer:** Passes requests along chain of handlers until one handles it.

**Use cases:**
- Middleware in web frameworks
- Exception handling
- Event bubbling
- Approval workflows

**Example:** Express.js middleware chain

### 23. Explain the Iterator pattern. Why is it useful?
**Answer:** Provides way to access elements of aggregate sequentially without exposing internal structure.

**Benefits:**
- Uniform interface for different collections
- Supports multiple traversal algorithms
- Simplifies collection classes

**Example:** JavaScript's `for...of` loop, Java's `Iterator` interface

### 24. What is the Mediator pattern?
**Answer:** Defines how objects interact with each other through a mediator object.

**Problem it solves:**
- Reduces coupling between objects
- Centralizes communication logic
- Makes system easier to understand

**Example:** Chat room (users don't communicate directly, through chat room mediator)

### 25. Explain the Template Method pattern.
**Answer:** Defines skeleton of algorithm in base class, letting subclasses override specific steps.

**Use cases:**
- Framework design
- Algorithm with variable steps
- Code reuse

**Example:** Data processing pipeline (read, process, write - subclasses define processing)

## Pattern Comparison Questions

### 26. Singleton vs Static Class
**Answer:**
- **Singleton**: Can implement interfaces, can be passed as parameter, supports inheritance
- **Static Class**: Cannot implement interfaces, cannot be instantiated, no inheritance

### 27. Factory vs Abstract Factory
**Answer:**
- **Factory**: One factory creates one type of product
- **Abstract Factory**: One factory creates multiple related products (product family)

### 28. Adapter vs Bridge
**Answer:**
- **Adapter**: Makes incompatible interfaces work together (retrofit)
- **Bridge**: Separates abstraction from implementation (design-time decision)

### 29. Decorator vs Inheritance
**Answer:**
- **Decorator**: Runtime behavior addition, more flexible, can combine behaviors
- **Inheritance**: Compile-time behavior addition, less flexible, single inheritance

### 30. Strategy vs Command
**Answer:**
- **Strategy**: Algorithm selection, stateless
- **Command**: Request encapsulation, can have state, supports undo

## Real-World Application Questions

### 31. How would you implement a logger using Singleton?
**Answer:** Create single logger instance shared across application, with thread-safe initialization.

### 32. How would you use Factory pattern for database connections?
**Answer:** Factory creates appropriate connection based on database type (MySQL, PostgreSQL, MongoDB).

### 33. How is Observer pattern used in React?
**Answer:** React's state management - when state changes, components (observers) re-render automatically.

### 34. How would you implement undo/redo using Command pattern?
**Answer:** Each action is a command object stored in history stack, undo pops and reverses command.

### 35. How is Middleware pattern used in Express.js?
**Answer:** Request passes through chain of middleware functions, each can process and pass to next.

## Best Practices

### 36. When should you avoid using Singleton?
**Answer:**
- When you need multiple instances
- When testing is important (hard to mock)
- When you need inheritance
- When global state causes problems

### 37. How do you test Singleton pattern?
**Answer:**
- Use dependency injection
- Create test-friendly version
- Use factory method for instance creation
- Consider using service locator pattern

### 38. What are common mistakes when implementing design patterns?
**Answer:**
- Over-engineering simple problems
- Forcing patterns where they don't fit
- Not understanding the problem pattern solves
- Copying code without understanding
- Using patterns just to show knowledge

### 39. How do design patterns relate to SOLID principles?
**Answer:**
- **S**ingle Responsibility: Each pattern has specific purpose
- **O**pen/Closed: Patterns allow extension without modification
- **L**iskov Substitution: Patterns maintain substitutability
- **I**nterface Segregation: Patterns define clear interfaces
- **D**ependency Inversion: Patterns depend on abstractions

### 40. How would you choose between similar patterns?
**Answer:**
- Understand the specific problem
- Consider future requirements
- Evaluate trade-offs
- Consider team familiarity
- Think about testability
- Consider performance implications
