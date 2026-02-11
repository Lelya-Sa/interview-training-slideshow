# Design Patterns Index

This document provides an overview of all design patterns in this repository, their implementations, and interview relevance.

## Pattern Categories

### Creational Patterns
Focus on object creation mechanisms.

| Pattern | Status | Languages | Interview Frequency |
|---------|--------|-----------|---------------------|
| **Singleton** | ✅ Complete | JS, Python, Java | ⭐⭐⭐⭐⭐ Very High |
| **Factory** | ✅ Complete | JS, Python, Java | ⭐⭐⭐⭐⭐ Very High |
| **Abstract Factory** | 📝 Planned | - | ⭐⭐⭐⭐ High |
| **Builder** | 📝 Planned | - | ⭐⭐⭐⭐ High |
| **Prototype** | 📝 Planned | - | ⭐⭐⭐ Medium |

### Structural Patterns
Focus on object composition and relationships.

| Pattern | Status | Languages | Interview Frequency |
|---------|--------|-----------|---------------------|
| **Adapter** | ✅ Complete | JS | ⭐⭐⭐⭐⭐ Very High |
| **Decorator** | 📝 Planned | - | ⭐⭐⭐⭐ High |
| **Facade** | 📝 Planned | - | ⭐⭐⭐ Medium |
| **Proxy** | 📝 Planned | - | ⭐⭐⭐ Medium |
| **Bridge** | 📝 Planned | - | ⭐⭐ Low |
| **Composite** | 📝 Planned | - | ⭐⭐ Low |
| **Flyweight** | 📝 Planned | - | ⭐ Low |

### Behavioral Patterns
Focus on communication and responsibility assignment.

| Pattern | Status | Languages | Interview Frequency |
|---------|--------|-----------|---------------------|
| **Observer** | ✅ Complete | JS | ⭐⭐⭐⭐⭐ Very High |
| **Strategy** | ✅ Complete | JS | ⭐⭐⭐⭐⭐ Very High |
| **Command** | 📝 Planned | - | ⭐⭐⭐⭐ High |
| **State** | 📝 Planned | - | ⭐⭐⭐ Medium |
| **Chain of Responsibility** | 📝 Planned | - | ⭐⭐⭐ Medium |
| **Iterator** | 📝 Planned | - | ⭐⭐⭐ Medium |
| **Mediator** | 📝 Planned | - | ⭐⭐ Low |
| **Memento** | 📝 Planned | - | ⭐⭐ Low |
| **Template Method** | 📝 Planned | - | ⭐⭐ Low |
| **Visitor** | 📝 Planned | - | ⭐ Low |

## Implementation Status

### ✅ Fully Implemented Patterns

#### 1. Singleton Pattern
- **Location**: `creational/singleton/`
- **Files**: README.md, questions.md, implementations/
- **Languages**: JavaScript, Python, Java
- **Examples**: Database connection, Logger
- **Interview Tips**: Know thread-safety, testing challenges, when to avoid

#### 2. Factory Pattern
- **Location**: `creational/factory/`
- **Files**: README.md, implementations/
- **Languages**: JavaScript, Python, Java
- **Examples**: Database connections, Payment processors, Notifications
- **Interview Tips**: Difference between Factory and Abstract Factory

#### 3. Observer Pattern
- **Location**: `behavioral/observer/`
- **Files**: README.md, implementations/
- **Languages**: JavaScript
- **Examples**: EventEmitter, Stock market, News publisher, State management
- **Interview Tips**: Difference from Pub/Sub, React's usage

#### 4. Strategy Pattern
- **Location**: `behavioral/strategy/`
- **Files**: README.md, implementations/
- **Languages**: JavaScript
- **Examples**: Sorting algorithms, Payment methods, Validation, Discounts
- **Interview Tips**: Difference from State pattern, when to use

#### 5. Adapter Pattern
- **Location**: `structural/adapter/`
- **Files**: README.md, implementations/
- **Languages**: JavaScript
- **Examples**: Payment gateways, Data format conversion, Legacy code
- **Interview Tips**: Difference from Decorator and Bridge

## Most Commonly Asked Patterns (Top 10)

1. **Singleton** ⭐⭐⭐⭐⭐
   - Database connections, Loggers
   - Thread-safety concerns
   - Testing challenges

2. **Factory** ⭐⭐⭐⭐⭐
   - Object creation
   - Database connections
   - Payment processors

3. **Observer** ⭐⭐⭐⭐⭐
   - Event handling
   - React state management
   - MVC architecture

4. **Strategy** ⭐⭐⭐⭐⭐
   - Algorithm selection
   - Payment methods
   - Validation strategies

5. **Adapter** ⭐⭐⭐⭐⭐
   - Third-party integration
   - Legacy code integration
   - API compatibility

6. **Decorator** ⭐⭐⭐⭐
   - Adding features dynamically
   - Middleware patterns
   - Component composition

7. **Command** ⭐⭐⭐⭐
   - Undo/redo functionality
   - Request queuing
   - Transaction management

8. **Builder** ⭐⭐⭐⭐
   - Complex object construction
   - Fluent interfaces
   - Immutable objects

9. **Facade** ⭐⭐⭐
   - Simplifying complex APIs
   - System integration
   - Library wrappers

10. **State** ⭐⭐⭐
    - State machines
    - Game development
    - Workflow management

## Study Guide

### For Beginners
Start with these patterns in order:
1. Singleton
2. Factory
3. Observer
4. Strategy
5. Adapter

### For Intermediate
Add these patterns:
6. Decorator
7. Command
8. Builder
9. Facade
10. State

### For Advanced
Study remaining patterns:
- Abstract Factory
- Proxy
- Chain of Responsibility
- Iterator
- Mediator
- Template Method
- Visitor
- Bridge
- Composite
- Flyweight
- Prototype
- Memento

## Interview Preparation

### Pattern Recognition
Learn to identify when to use each pattern:
- **Singleton**: "Only one instance needed"
- **Factory**: "Create objects without knowing exact type"
- **Observer**: "Notify multiple objects about changes"
- **Strategy**: "Multiple ways to do something"
- **Adapter**: "Make incompatible interfaces work together"

### Common Questions
1. "Explain [Pattern] pattern"
2. "When would you use [Pattern]?"
3. "What are the pros and cons?"
4. "How would you implement it?"
5. "What's the difference between [Pattern A] and [Pattern B]?"

### Implementation Practice
For each pattern, be able to:
- ✅ Explain the concept
- ✅ Identify use cases
- ✅ Implement from memory
- ✅ Discuss trade-offs
- ✅ Compare with similar patterns

## File Structure

```
design-patterns/
├── README.md                    # Main overview
├── questions.md                  # General questions
├── PATTERNS_INDEX.md            # This file
├── creational/
│   ├── singleton/
│   │   ├── README.md
│   │   ├── questions.md
│   │   └── implementations/
│   │       ├── js/
│   │       ├── python/
│   │       └── java/
│   └── factory/
│       ├── README.md
│       └── implementations/
│           ├── js/
│           ├── python/
│           └── java/
├── structural/
│   └── adapter/
│       ├── README.md
│       └── implementations/
│           └── js/
└── behavioral/
    ├── observer/
    │   ├── README.md
    │   └── implementations/
    │       └── js/
    └── strategy/
        ├── README.md
        └── implementations/
            └── js/
```

## Next Steps

1. **Study Implemented Patterns**: Review all code examples
2. **Practice Implementation**: Try implementing from scratch
3. **Answer Questions**: Go through questions.md files
4. **Real-World Application**: Identify patterns in codebases
5. **Request More Patterns**: Ask for additional patterns as needed

## Contributing

To add a new pattern:
1. Create pattern folder in appropriate category
2. Add README.md with definition and use cases
3. Add questions.md with interview questions
4. Add implementations in js/, python/, java/ folders
5. Update this index file

## Resources

- **Gang of Four (GoF)**: Original design patterns book
- **Refactoring Guru**: Visual pattern explanations
- **Source Making**: Detailed pattern descriptions
- **Patterns.dev**: Modern JavaScript patterns
