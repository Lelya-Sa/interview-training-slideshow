# Factory Pattern

## Definition
The Factory pattern provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic and lets subclasses decide which class to instantiate.

## Problem It Solves
- Need to create objects without knowing exact class
- Want to decouple object creation from usage
- Need to centralize creation logic
- Want to support multiple types of objects

## Use Cases
- **Database Connections**: Create MySQL, PostgreSQL, MongoDB connections
- **UI Components**: Create buttons, dialogs for different platforms
- **Payment Processors**: Create CreditCard, PayPal, Bitcoin processors
- **File Parsers**: Create JSON, XML, CSV parsers
- **Notification Systems**: Create Email, SMS, Push notifications

## Structure
```
Factory
├── createProduct() - Factory method
└── Product - Interface/Abstract class
    ├── ConcreteProductA
    └── ConcreteProductB
```

## Types of Factory Patterns

### 1. Simple Factory
- Single factory class creates different types
- Not a true design pattern, but commonly used
- Simple and straightforward

### 2. Factory Method
- Abstract factory method in base class
- Subclasses implement factory method
- More flexible, follows Open/Closed Principle

### 3. Abstract Factory
- Creates families of related objects
- Multiple factory methods
- More complex, for related product families

## Pros
✅ Decouples object creation from usage  
✅ Centralizes creation logic  
✅ Easy to add new product types  
✅ Follows Open/Closed Principle  
✅ Makes code more maintainable  

## Cons
❌ Can add complexity for simple cases  
❌ Requires creating many classes  
❌ May be overkill for simple object creation  

## When to Use
- When you don't know exact type at compile time
- When object creation is complex
- When you want to centralize creation logic
- When you need to support multiple product types
- When you want to decouple creation from usage

## When NOT to Use
- When object creation is simple
- When you always know exact type
- When over-engineering would be wasteful

## Real-World Examples
- **React**: `React.createElement()` creates different component types
- **jQuery**: `$()` factory creates different jQuery objects
- **Node.js**: `fs.createReadStream()` vs `fs.createWriteStream()`
- **Database**: Connection factories for different databases

## Complexity
- **Time Complexity**: O(1) - Constant time object creation
- **Space Complexity**: O(1) - Single object created

## Related Patterns
- **Abstract Factory**: Creates families of related objects
- **Builder**: For complex object construction
- **Prototype**: For cloning objects
- **Singleton**: Factory can be Singleton
