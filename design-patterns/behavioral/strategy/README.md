# Strategy Pattern

## Definition
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Problem It Solves
- Need multiple ways to perform a task
- Want to avoid conditional statements
- Need to switch algorithms at runtime
- Want to isolate algorithm implementation

## Use Cases
- **Sorting Algorithms**: QuickSort, MergeSort, BubbleSort
- **Payment Methods**: CreditCard, PayPal, Bitcoin
- **Compression**: ZIP, RAR, 7Z
- **Validation**: Email, Phone, CreditCard validation
- **Discount Calculation**: Regular, Premium, VIP discounts
- **Navigation**: Driving, Walking, Public Transport

## Structure
```
Context
├── strategy: Strategy
└── executeStrategy()

Strategy (Interface)
├── ConcreteStrategyA
├── ConcreteStrategyB
└── ConcreteStrategyC
```

## Pros
✅ Eliminates conditional statements  
✅ Easy to add new strategies  
✅ Each strategy can be tested independently  
✅ Follows Open/Closed Principle  
✅ Runtime algorithm selection  

## Cons
❌ Clients must know about strategies  
❌ Can increase number of classes  
❌ Communication overhead between context and strategy  

## When to Use
- When you have multiple ways to perform a task
- When you want to avoid if/else or switch statements
- When algorithms should be interchangeable
- When you want to isolate algorithm implementation

## When NOT to Use
- When algorithms are not interchangeable
- When only one algorithm is needed
- When strategy selection is simple

## Real-World Examples
- **Collections.sort()**: Different comparators
- **Payment Processing**: Multiple payment methods
- **Image Processing**: Different filters
- **Game AI**: Different AI strategies

## Complexity
- **Time Complexity**: Depends on strategy algorithm
- **Space Complexity**: O(1) - Single strategy instance

## Related Patterns
- **State**: Changes behavior based on internal state
- **Template Method**: Defines algorithm skeleton
- **Command**: Encapsulates requests
