# Observer Pattern

## Definition
The Observer pattern defines a one-to-many dependency between objects so that when one object (subject) changes state, all its dependents (observers) are notified and updated automatically.

## Problem It Solves
- Need to notify multiple objects about state changes
- Want to decouple subject from observers
- Need dynamic subscription/unsubscription
- Want to avoid tight coupling

## Use Cases
- **Event Handling**: DOM events, button clicks
- **MVC Architecture**: Model notifies Views
- **Pub/Sub Systems**: Message brokers, event buses
- **State Management**: React, Redux, Vue
- **Notification Systems**: Email, SMS notifications
- **Stock Market**: Price updates to multiple displays

## Structure
```
Subject
├── observers: List<Observer>
├── attach(observer)
├── detach(observer)
└── notify()

Observer
└── update()
```

## Pros
✅ Loose coupling between subject and observers  
✅ Dynamic subscription/unsubscription  
✅ Follows Open/Closed Principle  
✅ Supports broadcast communication  
✅ Easy to add/remove observers  

## Cons
❌ Can cause memory leaks if observers not removed  
❌ Order of notification not guaranteed  
❌ Can be inefficient with many observers  
❌ Circular dependencies possible  

## When to Use
- When change to one object requires changing others
- When number of observers is unknown
- When you want loose coupling
- When you need event-driven architecture

## When NOT to Use
- When performance is critical (many observers)
- When order of updates matters
- When you need guaranteed delivery

## Real-World Examples
- **React**: Component re-rendering on state change
- **Node.js**: EventEmitter class
- **Redux**: Store subscribers
- **DOM Events**: addEventListener
- **RxJS**: Observables

## Complexity
- **Time Complexity**: O(n) - Notify all n observers
- **Space Complexity**: O(n) - Store n observers

## Related Patterns
- **Mediator**: Centralizes communication
- **Pub/Sub**: More decoupled than Observer
- **Chain of Responsibility**: Passes requests along chain
