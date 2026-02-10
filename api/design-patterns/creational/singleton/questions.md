# Singleton Pattern - Interview Questions

## Basic Questions

### 1. What is the Singleton pattern?
**Answer:** Ensures a class has only one instance and provides global access to it.

### 2. Why would you use Singleton?
**Answer:**
- Control access to shared resource (database, logger)
- Ensure only one instance exists
- Provide global access point
- Lazy initialization of expensive resources

### 3. How do you implement Singleton in JavaScript?
**Answer:** Use module pattern or class with private constructor and static getInstance method.

### 4. How do you implement Singleton in Python?
**Answer:** Use `__new__` method to control instance creation, or use module-level variable.

### 5. How do you implement Singleton in Java?
**Answer:** Private constructor, static instance variable, public static getInstance() method.

## Implementation Questions

### 6. What are the different ways to implement Singleton?
**Answer:**
1. Eager initialization
2. Lazy initialization
3. Thread-safe with synchronized
4. Double-checked locking
5. Bill Pugh solution (static inner class)
6. Enum singleton (Java)

### 7. What is eager initialization?
**Answer:** Instance is created when class is loaded, before it's needed.

**Pros:** Simple, thread-safe
**Cons:** May waste resources if never used

### 8. What is lazy initialization?
**Answer:** Instance is created only when first accessed.

**Pros:** Saves resources
**Cons:** Not thread-safe, needs synchronization

### 9. What is double-checked locking?
**Answer:** Check if instance exists twice - once before locking, once after locking.

**Purpose:** Avoid unnecessary synchronization overhead.

### 10. What is the Bill Pugh solution?
**Answer:** Uses static inner class to hold singleton instance. Inner class is loaded only when getInstance() is called.

**Benefits:** Lazy initialization + thread-safe without synchronization

## Thread Safety Questions

### 11. Is Singleton thread-safe by default?
**Answer:** No, depends on implementation. Eager initialization is thread-safe, lazy initialization needs synchronization.

### 12. How do you make Singleton thread-safe in Java?
**Answer:**
- Use `synchronized` keyword
- Use double-checked locking
- Use static inner class (Bill Pugh)
- Use enum

### 13. How do you make Singleton thread-safe in JavaScript?
**Answer:** JavaScript is single-threaded, but in Node.js with worker threads, use proper synchronization or ensure module-level singleton.

### 14. What are the performance implications of synchronized Singleton?
**Answer:** Synchronized method is slower because every access requires locking. Double-checked locking or static inner class is more efficient.

## Testing Questions

### 15. How do you test Singleton pattern?
**Answer:**
- Use dependency injection instead of direct Singleton access
- Create test-friendly version with reset method
- Use factory method for instance creation
- Mock the Singleton instance

### 16. Why is Singleton difficult to test?
**Answer:**
- Global state makes tests interdependent
- Hard to mock or replace
- Cannot easily reset state between tests
- Violates dependency inversion principle

## Design Questions

### 17. What are the disadvantages of Singleton?
**Answer:**
- Difficult to test
- Violates Single Responsibility Principle
- Can hide dependencies
- Global state can cause problems
- Thread-safety concerns
- Can lead to tight coupling

### 18. When should you avoid Singleton?
**Answer:**
- When you need multiple instances
- When testing is important
- When you need inheritance
- When global state causes problems
- In multi-threaded environments without proper synchronization

### 19. How does Singleton relate to dependency injection?
**Answer:** Dependency injection is often preferred over Singleton because it:
- Makes testing easier
- Reduces coupling
- Makes dependencies explicit
- Allows for better control

### 20. What's the difference between Singleton and static class?
**Answer:**
- **Singleton**: Can implement interfaces, can be passed as parameter, supports inheritance, can be lazy-loaded
- **Static Class**: Cannot implement interfaces, cannot be instantiated, no inheritance, loaded at class loading

## Real-World Questions

### 21. Give a real-world example of Singleton.
**Answer:** Database connection pool - only one pool manager instance needed to manage all connections.

### 22. How is Singleton used in Node.js?
**Answer:** Node.js modules are singletons by default - `require()` caches modules, so same instance is returned.

### 23. How would you implement a logger using Singleton?
**Answer:** Create single logger instance with methods like `log()`, `error()`, `warn()`. All parts of application use same instance.

### 24. Is Singleton an anti-pattern?
**Answer:** It can be considered an anti-pattern when:
- Overused unnecessarily
- Makes testing difficult
- Creates hidden dependencies
- Causes tight coupling

However, it's still useful for specific cases like connection pools, loggers.

### 25. How would you refactor code that uses Singleton?
**Answer:**
- Use dependency injection
- Pass instance as parameter
- Use factory pattern
- Use service locator pattern
- Make it testable by allowing instance replacement
