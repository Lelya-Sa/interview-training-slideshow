# Adapter Pattern

## Definition
The Adapter pattern allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by wrapping an object and providing a compatible interface.

## Problem It Solves
- Need to use existing class with incompatible interface
- Want to integrate third-party libraries
- Need to make old code work with new code
- Want to convert data formats

## Use Cases
- **API Integration**: Adapting third-party APIs to your interface
- **Legacy Code**: Making old code work with new systems
- **Data Format Conversion**: JSON to XML, CSV to JSON
- **Database Adapters**: Different database interfaces
- **Payment Gateways**: Different payment provider interfaces
- **Media Players**: Different file format support

## Structure
```
Client
└── Target (Interface)
    └── Adapter
        └── Adaptee (Incompatible)
```

## Types of Adapters

### 1. Object Adapter
- Uses composition
- Wraps adaptee object
- More flexible

### 2. Class Adapter
- Uses inheritance
- Extends adaptee class
- Less flexible (single inheritance)

## Pros
✅ Allows incompatible interfaces to work together  
✅ Reuses existing code  
✅ Single Responsibility Principle  
✅ Open/Closed Principle  

## Cons
❌ Can add complexity  
❌ Can make code harder to understand  
❌ May require multiple adapters  

## When to Use
- When you need to use existing class with incompatible interface
- When integrating third-party libraries
- When you want to reuse legacy code
- When you need to convert between formats

## When NOT to Use
- When you can modify the incompatible interface
- When the adaptation is too complex
- When it would be simpler to refactor

## Real-World Examples
- **Power Adapters**: Convert plug types
- **jQuery**: Adapts DOM API
- **Axios**: Adapts XMLHttpRequest
- **Database Drivers**: Adapt different DB interfaces

## Complexity
- **Time Complexity**: O(1) - Simple delegation
- **Space Complexity**: O(1) - Wrapper object

## Related Patterns
- **Bridge**: Separates abstraction from implementation
- **Decorator**: Adds behavior without changing interface
- **Facade**: Simplifies interface to subsystem
