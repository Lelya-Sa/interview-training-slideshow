# Factory Pattern - Interview Questions

## Basic Questions

### 1. What is the Factory pattern?
**Answer:** A creational pattern that provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic.

### 2. Why would you use Factory pattern?
**Answer:**
- Decouple object creation from usage
- Centralize creation logic
- Support multiple product types
- Make code more maintainable
- Follow Open/Closed Principle

### 3. What problem does Factory pattern solve?
**Answer:** When you need to create objects but don't know the exact class at compile time, or when object creation logic is complex and should be centralized.

### 4. What's the difference between Factory and Constructor?
**Answer:**
- **Constructor**: Direct instantiation, must know exact class
- **Factory**: Encapsulates creation, can decide class at runtime

### 5. Give a real-world example of Factory pattern.
**Answer:** Database connection factory - creates MySQL, PostgreSQL, or MongoDB connections based on configuration without the client knowing the exact class.

## Implementation Questions

### 6. What are the types of Factory patterns?
**Answer:**
1. **Simple Factory**: Single factory class with switch/if statements
2. **Factory Method**: Abstract method in base class, subclasses implement
3. **Abstract Factory**: Creates families of related objects

### 7. What is Simple Factory?
**Answer:** A single factory class that creates different types of objects using conditional logic (switch/if statements).

**Example:**
```javascript
class Factory {
    static create(type) {
        if (type === 'A') return new ProductA();
        if (type === 'B') return new ProductB();
    }
}
```

### 8. What is Factory Method pattern?
**Answer:** An abstract factory method in a base class that subclasses override to create specific products.

**Example:**
```javascript
class Creator {
    createProduct() { // Abstract method
        throw new Error('Must implement');
    }
}
```

### 9. What is Abstract Factory?
**Answer:** Creates families of related objects. Instead of creating one product, it creates multiple related products.

**Example:** UI Factory creates Windows, Mac, or Linux buttons, dialogs, and menus together.

### 10. When would you use Factory Method vs Simple Factory?
**Answer:**
- **Simple Factory**: When you have a few product types, simple creation logic
- **Factory Method**: When you want extensibility, follow Open/Closed Principle

## Comparison Questions

### 11. What's the difference between Factory and Abstract Factory?
**Answer:**
- **Factory**: Creates one type of product
- **Abstract Factory**: Creates families of related products

**Example:**
- Factory: Create different types of buttons
- Abstract Factory: Create Windows UI (buttons, dialogs, menus) or Mac UI

### 12. Factory vs Builder pattern?
**Answer:**
- **Factory**: Creates objects (simple or complex)
- **Builder**: Constructs complex objects step by step with many optional parameters

### 13. Factory vs Singleton?
**Answer:**
- **Factory**: Creates multiple instances of different types
- **Singleton**: Ensures only one instance exists

**Note:** Factory itself can be a Singleton.

## Design Questions

### 14. What are the advantages of Factory pattern?
**Answer:**
✅ Decouples creation from usage  
✅ Centralizes creation logic  
✅ Easy to add new product types  
✅ Follows Open/Closed Principle  
✅ Makes code more maintainable  

### 15. What are the disadvantages of Factory pattern?
**Answer:**
❌ Can add complexity for simple cases  
❌ Requires creating many classes  
❌ May be overkill for simple object creation  

### 16. When should you NOT use Factory pattern?
**Answer:**
- When object creation is simple (just use `new`)
- When you always know the exact class
- When it would be over-engineering

### 17. How does Factory pattern relate to Dependency Injection?
**Answer:** Factory pattern can be used to implement Dependency Injection - factory creates and injects dependencies.

## Real-World Questions

### 18. How is Factory pattern used in React?
**Answer:** `React.createElement()` is a factory that creates different component types (div, span, custom components) based on the first argument.

### 19. How would you implement a payment processor factory?
**Answer:**
```javascript
class PaymentFactory {
    static create(type) {
        switch(type) {
            case 'creditcard': return new CreditCardProcessor();
            case 'paypal': return new PayPalProcessor();
            case 'bitcoin': return new BitcoinProcessor();
        }
    }
}
```

### 20. How would you use Factory for database connections?
**Answer:** Factory creates appropriate connection (MySQL, PostgreSQL, MongoDB) based on configuration, hiding the complexity from the client.

## Code Questions

### 21. Write a simple Factory implementation.
**Answer:** See implementations in `implementations/` folder.

### 22. How would you add a new product type to existing Factory?
**Answer:** Add new case in factory method or create new concrete creator class (depending on Factory type).

### 23. Can Factory pattern be combined with Singleton?
**Answer:** Yes, the Factory itself can be a Singleton to ensure only one factory instance exists.

### 24. How do you test Factory pattern?
**Answer:**
- Test that factory returns correct product type
- Test that products implement expected interface
- Mock factory for testing clients

### 25. What's a common mistake when implementing Factory?
**Answer:**
- Over-engineering simple object creation
- Not using interfaces/abstract classes
- Creating too many factory classes
- Not handling invalid types properly
