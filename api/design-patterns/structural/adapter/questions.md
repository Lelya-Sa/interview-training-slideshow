# Adapter Pattern - Interview Questions

## Basic Questions

### 1. What is the Adapter pattern?
**Answer:** A structural pattern that allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces.

### 2. Why would you use Adapter pattern?
**Answer:**
- Need to use existing class with incompatible interface
- Want to integrate third-party libraries
- Need to make old code work with new code
- Want to convert data formats

### 3. What problem does Adapter pattern solve?
**Answer:** When you have a class that does what you need, but its interface doesn't match what your code expects.

### 4. Give a real-world example of Adapter pattern.
**Answer:**
- **Power Adapter**: Converts one plug type to another
- **API Adapter**: Adapts third-party API to your interface
- **Database Adapter**: Different database interfaces (MySQL, PostgreSQL)
- **Payment Gateway**: Adapts Stripe, PayPal to common interface

### 5. What are the main components of Adapter pattern?
**Answer:**
- **Target**: Interface client expects
- **Adaptee**: Existing class with incompatible interface
- **Adapter**: Wraps adaptee to match target interface

## Implementation Questions

### 6. What are the types of Adapter pattern?
**Answer:**
1. **Object Adapter**: Uses composition, wraps adaptee object
2. **Class Adapter**: Uses inheritance, extends adaptee class (less common, requires multiple inheritance)

### 7. How do you implement Object Adapter?
**Answer:**
1. Create Target interface (what client expects)
2. Identify Adaptee (incompatible class)
3. Create Adapter class implementing Target
4. Adapter wraps Adaptee instance
5. Adapter translates calls from Target to Adaptee

### 8. How do you implement Class Adapter?
**Answer:** Adapter extends Adaptee class and implements Target interface (requires multiple inheritance, not possible in Java, limited in other languages).

### 9. What's the difference between Object and Class Adapter?
**Answer:**
- **Object Adapter**: Uses composition, more flexible, can adapt multiple adaptees
- **Class Adapter**: Uses inheritance, less flexible, single adaptee

### 10. Which Adapter type is more common?
**Answer:** Object Adapter is more common because it's more flexible and doesn't require multiple inheritance.

## Comparison Questions

### 11. What's the difference between Adapter and Decorator?
**Answer:**
- **Adapter**: Changes interface to make incompatible classes work together
- **Decorator**: Adds new behavior without changing interface

**Key difference:**
- Adapter = "I need this to work with that" (interface change)
- Decorator = "I want to add features to this" (behavior addition)

### 12. Adapter vs Bridge pattern?
**Answer:**
- **Adapter**: Makes incompatible interfaces work together (retrofit existing code)
- **Bridge**: Separates abstraction from implementation (design-time decision)

### 13. Adapter vs Facade?
**Answer:**
- **Adapter**: Makes one interface work with another
- **Facade**: Simplifies complex subsystem interface

### 14. Adapter vs Proxy?
**Answer:**
- **Adapter**: Changes interface
- **Proxy**: Same interface, controls access

## Design Questions

### 15. What are the advantages of Adapter pattern?
**Answer:**
✅ Allows incompatible interfaces to work together  
✅ Reuses existing code  
✅ Single Responsibility Principle  
✅ Open/Closed Principle  

### 16. What are the disadvantages of Adapter pattern?
**Answer:**
❌ Can add complexity  
❌ Can make code harder to understand  
❌ May require multiple adapters  

### 17. When should you use Adapter pattern?
**Answer:**
- When you need to use existing class with incompatible interface
- When integrating third-party libraries
- When you want to reuse legacy code
- When you need to convert between formats

### 18. When should you NOT use Adapter pattern?
**Answer:**
- When you can modify the incompatible interface
- When the adaptation is too complex
- When it would be simpler to refactor

## Real-World Questions

### 19. How would you adapt Stripe API to your payment interface?
**Answer:**
- Create PaymentProcessor interface (Target)
- StripeAPI is Adaptee with different interface
- Create StripeAdapter implementing PaymentProcessor
- Adapter wraps StripeAPI and translates calls

### 20. How would you adapt XML data to JSON format?
**Answer:**
- Create JSONData interface (Target)
- XMLData is Adaptee
- Create XMLToJSONAdapter
- Adapter parses XML and converts to JSON

### 21. How is Adapter used in database drivers?
**Answer:** Database drivers adapt different database APIs (MySQL, PostgreSQL) to a common interface (JDBC, ODBC).

## Code Questions

### 22. Write a simple Adapter implementation.
**Answer:** See implementations in `implementations/` folder.

### 23. How do you handle method name differences in Adapter?
**Answer:** Adapter translates method calls - when client calls Target method, Adapter calls corresponding Adaptee method with different name.

### 24. Can Adapter modify data format?
**Answer:** Yes, Adapter can transform data between formats (e.g., XML to JSON, different date formats).

### 25. What's a common mistake when implementing Adapter?
**Answer:**
- Creating adapter when refactoring would be better
- Making adapter too complex
- Not properly translating between interfaces
- Forgetting to handle edge cases in translation
