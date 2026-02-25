# Strategy Pattern - Interview Questions

## Basic Questions

### 1. What is the Strategy pattern?
**Answer:** A behavioral pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients.

### 2. Why would you use Strategy pattern?
**Answer:**
- Need multiple ways to perform a task
- Want to avoid conditional statements (if/else, switch)
- Need to switch algorithms at runtime
- Want to isolate algorithm implementation

### 3. What problem does Strategy pattern solve?
**Answer:** When you have multiple algorithms for the same task and want to select one at runtime without using conditional statements.

### 4. Give a real-world example of Strategy pattern.
**Answer:**
- **Sorting**: QuickSort, MergeSort, BubbleSort strategies
- **Payment**: CreditCard, PayPal, Bitcoin payment strategies
- **Validation**: Email, Phone, CreditCard validation strategies
- **Discount**: Regular, Premium, VIP discount strategies

### 5. What are the main components of Strategy pattern?
**Answer:**
- **Context**: Uses strategy, has reference to strategy object
- **Strategy**: Interface/abstract class defining algorithm
- **Concrete Strategies**: Different algorithm implementations

## Implementation Questions

### 6. How do you implement Strategy pattern?
**Answer:**
1. Create Strategy interface/abstract class
2. Create concrete strategy classes implementing interface
3. Create Context class that uses strategy
4. Context has method to set/change strategy
5. Context delegates to strategy for algorithm execution

### 7. What's the difference between Strategy and if/else?
**Answer:**
- **if/else**: Conditional logic in one place, hard to extend
- **Strategy**: Each algorithm in separate class, easy to add new strategies

**Example:**
```javascript
// if/else (bad)
if (type === 'A') algorithmA();
else if (type === 'B') algorithmB();

// Strategy (good)
strategy.execute();
```

### 8. How do you select strategy at runtime?
**Answer:** Context has method to set strategy, allowing strategy to be changed dynamically based on conditions or user input.

### 9. Can you have multiple strategies?
**Answer:** Yes, context can use different strategies for different operations, or combine multiple strategies.

### 10. How is Strategy pattern used in Collections.sort()?
**Answer:** `Collections.sort()` takes a Comparator (strategy) that defines the sorting algorithm, allowing different sorting strategies.

## Comparison Questions

### 11. What's the difference between Strategy and State pattern?
**Answer:**
- **Strategy**: Algorithm chosen by client, behavior changes based on external choice
- **State**: Behavior changes based on internal state, state transitions are automatic

**Example:**
- Strategy: User chooses payment method
- State: Vending machine automatically transitions between states

### 12. Strategy vs Template Method?
**Answer:**
- **Strategy**: Different algorithms, client chooses
- **Template Method**: Same algorithm structure, subclasses override steps

### 13. Strategy vs Command?
**Answer:**
- **Strategy**: Algorithm selection, stateless
- **Command**: Request encapsulation, can have state, supports undo

## Design Questions

### 14. What are the advantages of Strategy pattern?
**Answer:**
✅ Eliminates conditional statements  
✅ Easy to add new strategies  
✅ Each strategy can be tested independently  
✅ Follows Open/Closed Principle  
✅ Runtime algorithm selection  

### 15. What are the disadvantages of Strategy pattern?
**Answer:**
❌ Clients must know about strategies  
❌ Can increase number of classes  
❌ Communication overhead between context and strategy  

### 16. When should you use Strategy pattern?
**Answer:**
- When you have multiple ways to perform a task
- When you want to avoid if/else or switch statements
- When algorithms should be interchangeable
- When you want to isolate algorithm implementation

### 17. When should you NOT use Strategy pattern?
**Answer:**
- When algorithms are not interchangeable
- When only one algorithm is needed
- When strategy selection is simple (if/else is fine)

## Real-World Questions

### 18. How would you implement payment processing with Strategy?
**Answer:**
- Create PaymentStrategy interface
- Implement CreditCardStrategy, PayPalStrategy, BitcoinStrategy
- PaymentProcessor uses strategy
- User selects payment method, processor uses corresponding strategy

### 19. How would you implement sorting with Strategy?
**Answer:**
- Create SortStrategy interface
- Implement QuickSortStrategy, MergeSortStrategy, BubbleSortStrategy
- Sorter class uses strategy
- Can switch sorting algorithm at runtime

### 20. How would you implement validation with Strategy?
**Answer:**
- Create ValidationStrategy interface
- Implement EmailValidation, PhoneValidation, CreditCardValidation
- Validator uses strategy
- Different validation rules for different fields

## Code Questions

### 21. Write a simple Strategy implementation.
**Answer:** See implementations in `implementations/` folder.

### 22. How do you add a new strategy?
**Answer:** Create new class implementing Strategy interface, then use it in context.

### 23. Can Strategy pattern be combined with Factory?
**Answer:** Yes, Factory can create appropriate strategy based on conditions.

### 24. How do you test Strategy pattern?
**Answer:**
- Test each strategy independently
- Test context with different strategies
- Mock strategies for testing context
- Test strategy switching

### 25. What's a common mistake when implementing Strategy?
**Answer:**
- Using Strategy for simple cases (over-engineering)
- Not using interfaces/abstract classes
- Tight coupling between context and strategies
- Not handling strategy selection properly
