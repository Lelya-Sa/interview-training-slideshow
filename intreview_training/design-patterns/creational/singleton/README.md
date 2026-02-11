# Singleton Pattern

## Definition
The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance.

## Problem It Solves
- Need for exactly one instance of a class
- Global access point to that instance
- Controlled access to shared resource

## Use Cases
- **Database Connections**: Single connection pool
- **Loggers**: Single logging instance
- **Configuration Managers**: Single source of configuration
- **Cache Managers**: Single cache instance
- **Thread Pools**: Single thread pool manager

## Structure
```
Singleton
├── instance (private static)
├── getInstance() (public static)
└── constructor (private)
```

## Implementation Approaches

### 1. Eager Initialization
- Instance created at class loading
- Simple but may waste resources
- Thread-safe by default

### 2. Lazy Initialization
- Instance created on first access
- Saves resources
- Not thread-safe (needs synchronization)

### 3. Thread-Safe Lazy Initialization
- Uses synchronization
- Thread-safe but slower
- Synchronized on every access

### 4. Double-Checked Locking
- Checks twice before locking
- More efficient than synchronized
- Complex implementation

### 5. Bill Pugh Solution (Static Inner Class)
- Uses static inner class
- Lazy initialization
- Thread-safe without synchronization
- Best approach for Java

### 6. Enum Singleton
- Uses enum
- Simplest and safest
- Best for Java (serialization-safe)

## Pros
✅ Controlled access to single instance  
✅ Lazy initialization possible  
✅ Global access point  
✅ Memory efficient (only one instance)  

## Cons
❌ Difficult to test (global state)  
❌ Violates Single Responsibility Principle  
❌ Can hide dependencies  
❌ Thread-safety concerns  
❌ Can lead to tight coupling  
❌ Hard to mock in unit tests  

## When to Use
- When exactly one instance is needed
- When you need global access point
- When instance creation is expensive
- When you need to control access to shared resource

## When NOT to Use
- When you need multiple instances
- When testing is critical (hard to mock)
- When you need inheritance
- When global state causes problems

## Real-World Examples
- **Node.js**: `require()` cache (modules are singletons)
- **Express.js**: Application instance
- **Database**: Connection pool
- **Logger**: Winston, Pino instances

## Complexity
- **Time Complexity**: O(1) - Constant time access
- **Space Complexity**: O(1) - Single instance stored

## Related Patterns
- **Factory**: Can use Singleton for factory instance
- **Abstract Factory**: Factory can be Singleton
- **Builder**: Builder can be Singleton
- **Prototype**: Prototype registry can be Singleton
