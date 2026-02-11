# Observer Pattern - Interview Questions

## Basic Questions

### 1. What is the Observer pattern?
**Answer:** A behavioral pattern that defines a one-to-many dependency between objects. When one object (subject) changes state, all dependent objects (observers) are notified automatically.

### 2. Why would you use Observer pattern?
**Answer:**
- Need to notify multiple objects about state changes
- Want loose coupling between subject and observers
- Need dynamic subscription/unsubscription
- Want event-driven architecture

### 3. What problem does Observer pattern solve?
**Answer:** When you need multiple objects to react to changes in another object without tight coupling.

### 4. Give a real-world example of Observer pattern.
**Answer:**
- **React**: Components re-render when state changes
- **Event Listeners**: DOM events notify multiple handlers
- **Stock Market**: Price changes notify multiple displays
- **News Publisher**: New articles notify all subscribers

### 5. What are the main components of Observer pattern?
**Answer:**
- **Subject**: Object being observed, maintains list of observers
- **Observer**: Objects that need to be notified
- **attach/detach**: Methods to subscribe/unsubscribe
- **notify**: Method to notify all observers

## Implementation Questions

### 6. How do you implement Observer pattern?
**Answer:**
1. Create Subject class with observers list
2. Create Observer interface/class
3. Subject has attach/detach methods
4. Subject has notify method that calls observer.update()
5. Observers subscribe to subject

### 7. What is the difference between Observer and Pub/Sub?
**Answer:**
- **Observer**: Direct communication, subject knows observers
- **Pub/Sub**: Indirect communication through message broker, completely decoupled

**Observer**: Subject → Observer (direct)  
**Pub/Sub**: Publisher → Broker → Subscriber (indirect)

### 8. How is Observer pattern used in React?
**Answer:** React's state management - when state changes, React notifies all components (observers) that depend on that state, causing re-renders.

### 9. How is Observer pattern used in Node.js?
**Answer:** `EventEmitter` class implements Observer pattern. Objects emit events, and listeners (observers) are notified.

### 10. What is the EventEmitter pattern?
**Answer:** Node.js's implementation of Observer pattern where objects can emit events and listeners subscribe to those events.

## Design Questions

### 11. What are the advantages of Observer pattern?
**Answer:**
✅ Loose coupling between subject and observers  
✅ Dynamic subscription/unsubscription  
✅ Follows Open/Closed Principle  
✅ Supports broadcast communication  
✅ Easy to add/remove observers  

### 12. What are the disadvantages of Observer pattern?
**Answer:**
❌ Can cause memory leaks if observers not removed  
❌ Order of notification not guaranteed  
❌ Can be inefficient with many observers  
❌ Circular dependencies possible  

### 13. How do you prevent memory leaks with Observer?
**Answer:**
- Always detach observers when done
- Use WeakMap/WeakSet for observer storage
- Implement cleanup methods
- Use event emitters with automatic cleanup

### 14. When should you use Observer pattern?
**Answer:**
- When change to one object requires changing others
- When number of observers is unknown
- When you want loose coupling
- When you need event-driven architecture

### 15. When should you NOT use Observer pattern?
**Answer:**
- When performance is critical (many observers)
- When order of updates matters
- When you need guaranteed delivery
- When simple callback would suffice

## Comparison Questions

### 16. Observer vs Callback?
**Answer:**
- **Observer**: One-to-many, multiple observers
- **Callback**: One-to-one, single callback function

### 17. Observer vs Mediator?
**Answer:**
- **Observer**: Subject notifies observers directly
- **Mediator**: Central object coordinates communication

### 18. Observer vs Chain of Responsibility?
**Answer:**
- **Observer**: All observers notified
- **Chain**: Request passes through chain until handled

## Real-World Questions

### 19. How would you implement a news publisher using Observer?
**Answer:**
- Publisher (Subject) maintains list of subscribers
- Subscribers (Observers) subscribe to publisher
- When news published, all subscribers notified
- Subscribers can unsubscribe

### 20. How would you implement stock price updates using Observer?
**Answer:**
- StockMarket (Subject) maintains price and observers
- Displays (Observers) subscribe to StockMarket
- When price changes, all displays updated

### 21. How is Observer used in MVC architecture?
**Answer:** Model (Subject) notifies Views (Observers) when data changes, causing Views to update automatically.

## Code Questions

### 22. Write a simple Observer implementation.
**Answer:** See implementations in `implementations/` folder.

### 23. How do you handle errors in Observer pattern?
**Answer:**
- Try-catch in notify method
- Error handling in observer.update()
- Error event for observers
- Log errors without breaking notification

### 24. How do you test Observer pattern?
**Answer:**
- Create mock observers
- Verify observers are notified
- Test attach/detach functionality
- Test notification order (if needed)

### 25. What's a common mistake when implementing Observer?
**Answer:**
- Forgetting to detach observers (memory leaks)
- Notifying observers during iteration (modification during iteration)
- Not handling errors in observers
- Tight coupling between subject and observers
