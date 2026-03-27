# Design Patterns - Interview Training

## Overview
Design patterns are reusable solutions to common problems in software design. They provide proven approaches to solving recurring design problems and improve code maintainability, readability, and scalability.

## Categories

### 1. Creational Patterns
Focus on object creation mechanisms, trying to create objects in a manner suitable to the situation.

- **Singleton** - Ensure only one instance of a class exists
- **Factory** - Create objects without specifying exact class
- **Abstract Factory** - Create families of related objects
- **Builder** - Construct complex objects step by step
- **Prototype** - Create objects by cloning existing instances

### 2. Structural Patterns
Focus on how classes and objects are composed to form larger structures.

- **Adapter** - Allow incompatible interfaces to work together
- **Decorator** - Add behavior to objects dynamically
- **Facade** - Provide simplified interface to complex subsystem
- **Proxy** - Provide placeholder for another object
- **Bridge** - Separate abstraction from implementation
- **Composite** - Compose objects into tree structures
- **Flyweight** - Share objects to support large numbers efficiently

### 3. Behavioral Patterns
Focus on communication between objects and responsibility assignment.

- **Observer** - Notify multiple objects about state changes
- **Strategy** - Define family of algorithms, make them interchangeable
- **Command** - Encapsulate request as object
- **State** - Allow object to alter behavior when internal state changes
- **Chain of Responsibility** - Pass requests along chain of handlers
- **Iterator** - Provide way to access elements of aggregate sequentially
- **Mediator** - Define how objects interact with each other
- **Memento** - Capture and restore object's internal state
- **Template Method** - Define skeleton of algorithm in base class
- **Visitor** - Separate algorithm from object structure

## Common Patterns in Fullstack Development

### Web Development Patterns
- **MVC (Model-View-Controller)** - Separation of concerns
- **Repository** - Abstraction for data access
- **Dependency Injection** - Invert control of dependencies
- **Middleware** - Chain of responsibility for request processing
- **Service Layer** - Business logic abstraction

### Frontend Patterns
- **Component Pattern** - Reusable UI components
- **HOC (Higher-Order Component)** - Component composition
- **Render Props** - Share code between components
- **Provider Pattern** - Context-based state sharing
- **Custom Hooks** - Reusable stateful logic

### Backend Patterns
- **DAO (Data Access Object)** - Data access abstraction
- **Service Locator** - Centralized service access
- **Unit of Work** - Transaction management
- **CQRS (Command Query Responsibility Segregation)** - Separate read/write
- **Event Sourcing** - Store state changes as events

## How to Use This Repository

### For Junior Developers
**👉 Start here:** Read [`JUNIOR_GUIDE.md`](./JUNIOR_GUIDE.md) first! It focuses on the 5 most important patterns for junior interviews.

### For All Levels
1. **Start with Definitions**: Read the README.md in each pattern folder
2. **Study Implementations**: Review code in `js/`, `python/`, and `java/` folders
3. **Practice Questions**: Answer interview questions in `questions.md`
4. **Implement Yourself**: Try implementing patterns from scratch

## Pattern Structure

Each pattern folder contains:
- `README.md` - Definition, use cases, pros/cons, examples
- `questions.md` - Interview questions and answers
- `implementations/` - Code examples
  - `js/` - JavaScript implementations
  - `python/` - Python implementations
  - `java/` - Java implementations

## Interview Tips

1. **Know When to Use**: Understand the problem each pattern solves
2. **Recognize Trade-offs**: Know pros and cons of each pattern
3. **Code Implementation**: Be able to implement from memory
4. **Real-world Examples**: Connect patterns to actual use cases
5. **Anti-patterns**: Know when NOT to use a pattern

## Complexity Analysis

For each pattern implementation, consider:
- **Time Complexity**: Operations performed
- **Space Complexity**: Memory usage
- **Maintainability**: Code clarity and extensibility
- **Testability**: How easy it is to test

## Resources

- **Gang of Four (GoF)**: Original design patterns book
- **Refactoring Guru**: Excellent visual explanations
- **Source Making**: Detailed pattern descriptions
