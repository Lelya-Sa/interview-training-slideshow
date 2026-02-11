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

### 41. What is the Bridge pattern? When would you use it?
**Answer:** Decouples abstraction from implementation so both can vary independently. Use when you have multiple dimensions of variation (e.g. shape and color). Avoids explosion of subclasses.

### 42. Explain the Composite pattern. Give an example.
**Answer:** Composes objects into tree structures; treat individual and composite uniformly. Example: file system (file and folder both have size, list). Use for part-whole hierarchies.

### 43. What is the difference between Facade and Adapter?
**Answer:** Facade simplifies interface to a subsystem; single entry point. Adapter converts one interface to another (makes incompatible interfaces work). Facade for simplification; Adapter for compatibility.

### 44. Explain the Flyweight pattern. When use it?
**Answer:** Shares state between many objects to save memory (e.g. character glyphs in text editor). Use when many objects share same intrinsic state; extrinsic state passed at runtime.

### 45. What is the Memento pattern?
**Answer:** Captures and externalizes object state for later restore (undo). Originator creates memento; caretaker stores it. Use for undo/redo, snapshots, checkpoints.

### 46. Explain the State pattern. How does it differ from Strategy?
**Answer:** State: object behavior changes with internal state; state transitions. Strategy: interchangeable algorithms; no automatic transition. Use State for state machines; Strategy for pluggable algorithms.

### 47. What is the Visitor pattern? When would you use it?
**Answer:** Separates algorithm from object structure; add new operations without changing classes. Use when you have stable structure but varying operations (e.g. export, pretty-print). Double dispatch.

### 48. Explain the difference between Proxy and Decorator.
**Answer:** Proxy controls access (same interface; may lazy-init or protect). Decorator adds behavior (wraps; same interface). Proxy for access control; Decorator for augmentation.

### 49. What is the Template Method pattern? Give example.
**Answer:** Defines skeleton in base class; subclasses override steps. Example: data parser (open, read, parse, close); subclasses implement read/parse. Use when algorithm structure is fixed, steps vary.

### 50. Explain the Interpreter pattern. When use it?
**Answer:** Defines grammar and interpreter for language or expressions. Use for simple languages, expression trees, DSLs. Often replaced by parser generators or embedded scripting.

### 51. What is the difference between Creational and Structural patterns?
**Answer:** Creational: how objects are created (Singleton, Factory, Builder). Structural: how objects are composed (Adapter, Decorator, Composite). Creational for creation; Structural for composition.

### 52. Explain the Object Pool pattern. When use it?
**Answer:** Reuses expensive objects (e.g. DB connections, threads) from a pool instead of creating new. Use when creation cost is high and objects are short-lived. Reduces allocation and GC.

### 53. What is the Repository pattern? How does it relate to patterns?
**Answer:** Abstracts data access; domain uses repository interface, not DB directly. Relates to Facade (simplifies data layer) and Strategy (swap implementations). Use for testability and clean architecture.

### 54. Explain the Unit of Work pattern.
**Answer:** Groups one or more operations into a single transaction; commit or rollback together. Use with Repository; one UoW per request. Ensures consistency; reduces DB round-trips.

### 55. What is the Specification pattern?
**Answer:** Encapsulates business rules as reusable, composable objects (e.g. IsActive, HasMinimumBalance). Use for complex query or validation logic; combine with and/or/not.

### 56. Explain the CQRS pattern. How does it relate to Command?
**Answer:** CQRS separates read and write models; Command is write side. Command pattern is single request; CQRS is architectural. Use CQRS for different read/write scale or models.

### 57. What is the difference between Middleware and Chain of Responsibility?
**Answer:** Middleware (e.g. Express): pipeline of handlers; each can call next or end. Chain of Responsibility: pass request along chain until handled. Similar idea; middleware is more general (async, response).

### 58. Explain the Module pattern (JavaScript). Is it a design pattern?
**Answer:** Encapsulates code with closure; private state, public API. Not one of GoF patterns but common in JS. Use for namespacing and hiding implementation. IIFE or ES modules.

### 59. What is the Revealing Module pattern?
**Answer:** Module pattern variant; define all in private scope, return object of public methods. Clearer public API; same encapsulation. Use in JS for clean exports.

### 60. Explain the difference between Factory and Builder.
**Answer:** Factory creates object in one step (or few); Builder constructs step by step (fluent API). Use Factory when creation is simple; Builder when object has many optional parts or complex construction.

### 61. What is the Abstract Factory pattern? When use it?
**Answer:** Creates families of related objects without specifying concrete classes. Use when you have multiple product families and want to keep them consistent (e.g. UI themes: Win vs Mac widgets).

### 62. Explain the Prototype pattern. When use it?
**Answer:** Create new object by cloning existing (prototype). Use when creation is more expensive than copy (e.g. complex init) or when you want to avoid subclassing. Shallow vs deep copy.

### 63. What is the Service Locator pattern? Why is it often discouraged?
**Answer:** Global registry that returns services (e.g. getLogger()). Discouraged: hidden dependencies, hard to test, global state. Prefer Dependency Injection (explicit dependencies).

### 64. Explain the Dependency Injection pattern. How does it differ from Service Locator?
**Answer:** Dependencies are passed in (constructor, setter) rather than looked up. Explicit, testable, no global state. DI is preferred over Service Locator for testability and clarity.

### 65. What is the Registry pattern?
**Answer:** Stores objects by key (e.g. by id or name); global or scoped access. Use for lookup (plugins, strategies). Can be anti-pattern if overused (global mutable state).

### 66. Explain the Null Object pattern.
**Answer:** Provide null-like object that does nothing (no-op methods) instead of null. Avoids null checks; safe default. Use when optional dependency or empty collection behavior.

### 67. What is the difference between Observer and Mediator?
**Answer:** Observer: subjects notify many observers directly; loose coupling. Mediator: objects communicate through mediator; central hub. Use Observer for one-to-many; Mediator for many-to-many with coordination.

### 68. Explain the Event Aggregator pattern.
**Answer:** Central object that receives events and forwards to subscribers. Decouples publishers from subscribers. Similar to Pub/Sub or message bus. Use for application-level events.

### 69. What is the Circuit Breaker pattern? Is it a design pattern?
**Answer:** Stops calling failing dependency after threshold; fail fast, then retry. Resilience pattern (not GoF). Use for external services to prevent cascade. States: closed, open, half-open.

### 70. Explain the Retry pattern. When use it?
**Answer:** Retry failed operation (with backoff, max attempts). Use for transient failures (network, timeout). Combine with Circuit Breaker to avoid hammering failing service.

### 71. What is the Bulkhead pattern?
**Answer:** Isolates resources (e.g. thread pools per dependency) so one failure does not exhaust all. Use for resilience; failure in one area does not bring down whole system.

### 72. Explain the Saga pattern. How does it relate to Command?
**Answer:** Saga coordinates multiple local transactions with compensations (undo). Command is single action; Saga is distributed workflow. Use for cross-service transactions.

### 73. What is the difference between pattern and principle?
**Answer:** Pattern is concrete solution (e.g. Singleton). Principle is guideline (e.g. SOLID, DRY). Principles inform when to use patterns; patterns implement principles.

### 74. Explain the Front Controller pattern (web).
**Answer:** Single entry point for web requests; routes to handlers. Use in MVC web apps (e.g. index.php, Express app). Centralizes auth, routing, logging.

### 75. What is the Model-View-Controller (MVC) pattern?
**Answer:** Separates model (data), view (UI), controller (input, coordination). Model notifies view; controller updates model. Use for UI applications; many variants (MVP, MVVM).

### 76. Explain the difference between MVC and MVVM.
**Answer:** MVC: controller updates model and view. MVVM: view binds to ViewModel (data + logic); no controller; two-way binding. Use MVVM for data-binding frameworks (e.g. Vue, WPF).

### 77. What is the Model-View-Presenter (MVP) pattern?
**Answer:** View is passive; Presenter handles logic and updates view. View and Model do not communicate directly. Use for testable UI (presenter can be unit tested).

### 78. Explain the BFF (Backend for Frontend) pattern.
**Answer:** Separate backend per client type (e.g. mobile BFF, web BFF); aggregates and shapes data for that client. Use when clients need different data or protocols; reduces client complexity.

### 79. What is the Gateway pattern (API Gateway)?
**Answer:** Single entry point for clients; routes, auth, rate limit, aggregate. Use in microservices; clients talk to gateway, gateway to services. Cross-cutting concerns in one place.

### 80. Explain the Strangler Fig pattern.
**Answer:** Gradually replace legacy system by routing new features to new system; old system shrinks over time. Use for legacy migration without big-bang rewrite.

### 81. What is the difference between pattern and idiom?
**Answer:** Pattern is language-agnostic design solution (GoF). Idiom is language-specific convention (e.g. RAII in C++, callback in JS). Idioms are lower level; patterns are architectural.

### 82. Explain the Blackboard pattern.
**Answer:** Shared knowledge source; multiple specialists read/write; no direct coupling. Use for complex problem-solving (e.g. speech recognition). Rare; often replaced by pipelines or services.

### 83. What is the Active Record pattern?
**Answer:** Object wraps row; object has CRUD methods and domain logic. Simple; used in Rails, Laravel. Contrast with Repository + Domain Model (separate persistence).

### 84. Explain the Data Mapper pattern.
**Answer:** Separates domain model from persistence; mapper translates between. Domain objects are plain; no DB knowledge. Use for rich domain and testability; more complex than Active Record.

### 85. What is the Identity Map pattern?
**Answer:** Ensures each entity loaded once per scope (e.g. per request); same id returns same instance. Use with Unit of Work; avoids duplicate objects and inconsistent state.

### 86. Explain the Lazy Load pattern.
**Answer:** Defer loading of related data until accessed. Use to avoid loading entire graph; can cause N+1 if not careful. Implement with proxy or getter that loads on first access.

### 87. What is the Identity Field pattern?
**Answer:** Store primary key (id) in domain object so it can be tracked and updated. Essential for ORM; object knows its persistence identity.

### 88. Explain the Singleton in multi-threaded environment.
**Answer:** Need thread-safe creation: double-checked locking, static holder, or enum (Java). In Node.js single-threaded; module cache is natural singleton. In JS rarely need explicit sync.

### 89. What is the Monostate pattern?
**Answer:** All instances share same state (static fields); behavior is instance methods. Alternative to Singleton; same global state, different syntax. Same testing issues as Singleton.

### 90. Explain the Object Mother vs Builder for test data.
**Answer:** Object Mother: factory methods that return pre-built test objects. Builder: fluent API to build custom test data. Use Object Mother for few common cases; Builder for many variants.

### 91. What is the Disposable pattern (IDisposable)?
**Answer:** Object exposes dispose() or close() to release resources (file, connection). Use try/finally or using to ensure cleanup. Common in .NET, Java; in JS use try/finally and explicit close.

### 92. Explain the difference between Adapter and Wrapper.
**Answer:** Adapter changes interface (adapts one to another). Wrapper is generic term (decorator, adapter, proxy all "wrap"). Adapter is specific pattern; wrapper is informal.

### 93. What is the Decorator pattern in TypeScript/JavaScript?
**Answer:** Same idea: wrap object to add behavior; same interface. In JS/TS often implemented with composition and forwarding. Use for logging, caching, validation without subclassing.

### 94. Explain the Composite in UI (e.g. React components).
**Answer:** React tree of components is composite: each component can have children; same interface (render). Use for nested UI (layout, lists). Key and composition are central.

### 95. What is the HOC (Higher-Order Component) pattern in React?
**Answer:** Function that takes component and returns enhanced component (with props, logic). Use for cross-cutting concerns (auth, logging). Similar to decorator; React-specific.

### 96. Explain the Render Props pattern in React.
**Answer:** Component receives function as prop (or children as function); calls it with data. Use for sharing stateful logic without HOC. Replaced in many cases by custom hooks.

### 97. What is the Provider pattern (React Context)?
**Answer:** Provider supplies value to tree; consumers read via useContext. Use for theme, auth, locale. Decouples data from component tree; avoid prop drilling.

### 98. Explain the Compound Components pattern (React).
**Answer:** Parent and children work together (e.g. Tabs, TabList, Tab, TabPanel); state in parent, shared via context. Use for flexible, composable UI (e.g. Select + Option).

### 99. What is the Controlled vs Uncontrolled pattern in React?
**Answer:** Controlled: value and onChange from parent (single source of truth). Uncontrolled: value from DOM/ref. Use controlled for validation and consistency; uncontrolled for simple or file input.

### 100. Explain the Container/Presentational pattern.
**Answer:** Container: logic, data fetching, state. Presentational: pure UI, receives props. Use for separation of concerns and testability. Often combined with hooks (container uses hook, presents to dumb component).

### 101. What is the difference between pattern and architecture?
**Answer:** Pattern is recurring solution to a problem (local). Architecture is overall structure of system (e.g. layered, microservices). Architecture uses patterns; patterns are building blocks.

### 102. Explain the Layered Architecture pattern.
**Answer:** System divided into layers (e.g. presentation, business, data); upper layers use lower; no skip. Use for separation of concerns; clear dependencies. Common in enterprise apps.

### 103. What is the Hexagonal (Ports and Adapters) pattern?
**Answer:** Core (domain) in center; adapters for UI, DB, external APIs. Core does not depend on adapters; adapters depend on core. Use for testability and swapping implementations.

### 104. Explain the Clean Architecture layers.
**Answer:** Entities (center), Use Cases, Interface Adapters, Frameworks/Drivers (outer). Dependencies point inward. Use for long-lived, testable systems. Similar to Hexagonal.

### 105. What is the Onion Architecture?
**Answer:** Similar to Hexagonal; core (domain) in center; dependencies point inward. Domain has no external deps; infrastructure on outside. Use for domain-driven design.

### 106. Explain the difference between pattern and refactoring.
**Answer:** Pattern is target structure. Refactoring is step-by-step change (e.g. Extract Method). Refactoring can introduce pattern; pattern is the "what," refactoring is the "how."

### 107. What is the Plugin pattern?
**Answer:** System loads pluggable modules (plugins) that extend behavior. Use for extensibility (e.g. editors, build tools). Define plugin API; load dynamically or via config.

### 108. Explain the Pipeline pattern.
**Answer:** Data passes through sequence of stages (filters, transforms). Each stage does one thing. Use for ETL, middleware, processing. Can be linear or fan-out/fan-in.

### 109. What is the Fan-Out/Fan-In pattern?
**Answer:** Fan-out: one task spawns many parallel tasks. Fan-in: many results combined. Use for parallel processing (e.g. map-reduce, parallel API calls). Common in async systems.

### 110. Explain the Leader Election pattern.
**Answer:** In distributed system, one node is elected leader (e.g. for coordination, single writer). Use with ZooKeeper, etcd, or Raft. Ensures single leader; others follow or standby.

### 111. What is the Sharding pattern?
**Answer:** Partition data across nodes by key (e.g. user_id). Use when single node cannot hold or serve data. Pattern for horizontal scaling of data. Different from caching or replication.

### 112. Explain the Cache-Aside pattern.
**Answer:** App manages cache: on read, check cache; on miss load from DB and populate cache. On write, update DB and invalidate (or update) cache. Use for read-heavy, eventual consistency OK.

### 113. What is the CQRS pattern (Command Query Responsibility Segregation)?
**Answer:** Separate read and write models; commands change state, queries return data. Use when read and write have different scale or shape. Can use different storage for read (e.g. denormalized).

### 114. Explain the Event Sourcing pattern.
**Answer:** Store state as sequence of events; state is derived by replaying. Use for audit, time travel, complex domains. Add snapshots for performance. Often combined with CQRS.

### 115. What is the difference between pattern and best practice?
**Answer:** Pattern is named, documented solution with context and trade-offs. Best practice is general guideline (e.g. "use version control"). Best practices are broader; patterns are specific solutions.

### 116. Explain the Repository pattern in TypeScript/JavaScript.
**Answer:** Interface (e.g. UserRepository) with findById, save, etc.; implementation uses DB. Domain uses interface; test with mock. Use for clean architecture and testability.

### 117. What is the Unit of Work in Node.js/Express?
**Answer:** One unit of work per request; start transaction, run operations, commit or rollback. Use with Repository; inject UoW. Ensures consistency; can use connection from pool.

### 118. Explain the Specification pattern in TypeScript.
**Answer:** Class or function that encapsulates rule (e.g. isSatisfiedBy(entity)); compose with and, or, not. Use for validation or query (e.g. active users with balance). Type-safe in TS.

### 119. What is the Anti-Corruption Layer (ACL)?
**Answer:** Layer that translates between your domain and external system; prevents external model from polluting yours. Use when integrating legacy or third-party; adapter with translation.

### 120. Explain the Backend for Frontend (BFF) in practice.
**Answer:** One BFF per client (web, mobile); BFF aggregates backend services, shapes response. Use when clients need different data or protocols. Reduces round-trips and client complexity.

### 121. What is the API Gateway pattern in microservices?
**Answer:** Single entry for clients; routing, auth, rate limit, aggregation. Gateway calls services; clients do not call services directly. Use for security, simplicity, and cross-cutting concerns.

### 122. Explain the Service Mesh pattern.
**Answer:** Dedicated infrastructure for service-to-service communication (mTLS, retries, observability). Sidecar proxies (e.g. Envoy). Use in Kubernetes; offloads cross-cutting from app code.

### 123. What is the Sidecar pattern?
**Answer:** Helper process (sidecar) next to main app; shares lifecycle. Use for logging, metrics, proxy. Common in Kubernetes (e.g. Envoy sidecar for service mesh).

### 124. Explain the Ambassador pattern.
**Answer:** Sidecar that proxies outbound traffic (e.g. to DB, API); can add retry, auth, routing. Use when you cannot change client; proxy handles cross-cutting. Kubernetes pattern.

### 125. What is the Adapter pattern in Node.js?
**Answer:** Wrap external library or API with your interface. Example: wrap different DB clients with same repository interface. Use for swapping implementations and testing.

### 126. Explain the Middleware pattern in Express.
**Answer:** Chain of functions (req, res, next); each can modify req/res or call next(). Use for auth, logging, body parsing. Same idea as pipeline or chain of responsibility.

### 127. What is the Factory in Node.js (e.g. creating services)?
**Answer:** Function or class that creates and configures instances (e.g. createUserService(db)). Use for DI and testing (inject mock). Encapsulates creation and dependencies.

### 128. Explain the Singleton in Node.js modules.
**Answer:** Node caches required modules; module.exports is single instance. So require('./db') returns same instance everywhere. Natural singleton; no need for class-based singleton in Node.

### 129. What is the Observer in Node.js (EventEmitter)?
**Answer:** EventEmitter is observer: emit events, listeners (observers) react. Use for decoupled, event-driven logic. Same as pub/sub within process.

### 130. Explain the Strategy pattern in Node.js.
**Answer:** Inject different implementations (e.g. payment strategies: stripe, paypal). Same interface; swap by config or env. Use for pluggable algorithms or integrations.

### 131. What is the difference between GoF patterns and enterprise patterns?
**Answer:** GoF (Gang of Four): 23 classic OO patterns (Creational, Structural, Behavioral). Enterprise (e.g. Fowler): patterns for larger systems (Repository, UoW, CQRS). Both are design patterns; different scope.

### 132. Explain the Pattern Languages of Program Design.
**Answer:** Christopher Alexander inspired; pattern has context, problem, solution, forces. PLoP conferences and books extend pattern idea. Design patterns in software follow similar format.

### 133. What is the difference between pattern and framework?
**Answer:** Pattern is abstract solution; you implement. Framework is concrete code; you extend or plug in. Framework may use patterns; pattern is idea, framework is artifact.

### 134. Explain when not to use design patterns.
**Answer:** When problem is simple; when pattern adds unnecessary complexity; when team does not know pattern; when pattern does not fit (force fit). Prefer clarity over pattern for its own sake.

### 135. What is over-engineering with patterns?
**Answer:** Using many patterns for simple problem; abstraction layers that do not pay off. Signs: hard to follow, unnecessary indirection. Use patterns when they solve real problem.

### 136. Explain the relationship between patterns and refactoring to patterns.
**Answer:** Refactoring to patterns: evolve code toward pattern when you see the problem (e.g. replace conditionals with Strategy). Pattern is target; refactoring is gradual path. Book by Kerievsky.

### 137. What is the difference between pattern and algorithm?
**Answer:** Algorithm is step-by-step procedure (e.g. sort, search); has correctness and complexity. Pattern is structural (how to organize code); no single "output." Algorithm is computation; pattern is design.

### 138. Explain the role of patterns in agile/iterative development.
**Answer:** Patterns emerge from refactoring; do not force upfront. Add pattern when duplication or complexity appears. YAGNI; introduce pattern when it pays off. Evolve design with code.

### 139. What is the pattern density anti-pattern?
**Answer:** Too many patterns in small area; code is hard to read. Use patterns where they help; avoid pattern for every class. Balance clarity and structure.

### 140. How do you document design patterns in codebase?
**Answer:** Name classes/roles (e.g. XxxRepository, XxxFactory); add short comment or link to doc. Use consistent naming so team recognizes pattern. ADR or doc for architectural patterns.
