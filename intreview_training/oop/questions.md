# OOP - Interview Questions

## Core OOP Concepts (1-10)

### 1. What are the four pillars of OOP?
**Answer:** 
1. **Encapsulation**: Bundling data and methods together, hiding implementation details
2. **Inheritance**: Child classes inherit properties and methods from parent classes
3. **Polymorphism**: Same interface, different implementations (one name, many forms)
4. **Abstraction**: Hiding complex details, showing only essential features

**Example:**
```javascript
// Encapsulation
class BankAccount {
  #balance = 0; // Private field
  
  deposit(amount) {
    this.#balance += amount;
  }
  
  getBalance() {
    return this.#balance;
  }
}

// Inheritance
class SavingsAccount extends BankAccount {
  calculateInterest() {
    // Inherits deposit and getBalance
  }
}

// Polymorphism
class Shape {
  area() { throw new Error("Must implement"); }
}
class Circle extends Shape {
  area() { return Math.PI * this.radius ** 2; }
}
class Rectangle extends Shape {
  area() { return this.width * this.height; }
}

// Abstraction
class Database {
  connect() { throw new Error("Must implement"); }
  query(sql) { throw new Error("Must implement"); }
}
```

### 2. Explain the concept of inheritance.
**Answer:** Inheritance allows a class (child/derived) to inherit properties and methods from another class (parent/base). It promotes code reusability and establishes "is-a" relationships. The child class can override methods and add new functionality.

**Example:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
  
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak()); // "Buddy barks"
console.log(dog.fetch()); // "Buddy fetches the ball"
```

### 3. What is the difference between composition and inheritance?
**Answer:** 
- **Inheritance**: "is-a" relationship (Car is a Vehicle) - child class extends parent
- **Composition**: "has-a" relationship (Car has an Engine) - class contains another class as member

**When to use:**
- **Inheritance**: When there's a clear hierarchical relationship, shared behavior
- **Composition**: When you need flexibility, want to avoid tight coupling, prefer "has-a" over "is-a"

**Example:**
```javascript
// Inheritance (is-a)
class Car extends Vehicle {
  // Car IS A Vehicle
}

// Composition (has-a)
class Car {
  constructor() {
    this.engine = new Engine(); // Car HAS AN Engine
    this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }
}
```

### 4. What is encapsulation? Why is it important?
**Answer:** Encapsulation is bundling data and methods that operate on that data within a single unit (class), while hiding internal implementation details. It's achieved through access modifiers (private, protected, public).

**Why important:**
- **Data Protection**: Prevents unauthorized access/modification
- **Maintainability**: Changes to implementation don't affect external code
- **Clear Interface**: Users only need to know public methods, not internal details
- **Flexibility**: Can change implementation without breaking code

**Example:**
```javascript
class BankAccount {
  #balance = 0; // Private field (encapsulated)
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
    }
  }
  
  getBalance() {
    return this.#balance; // Controlled access
  }
}
```

### 5. What is polymorphism? Explain with examples.
**Answer:** Polymorphism means "many forms" - the ability of objects of different types to be accessed through the same interface. Same method name, different implementations.

**Types:**
1. **Compile-time (Static)**: Method overloading
2. **Runtime (Dynamic)**: Method overriding

**Example:**
```javascript
// Runtime Polymorphism (Method Overriding)
class Animal {
  makeSound() {
    return "Some sound";
  }
}

class Dog extends Animal {
  makeSound() {
    return "Woof!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Meow!";
  }
}

// Same interface, different implementations
const animals = [new Dog(), new Cat()];
animals.forEach(animal => console.log(animal.makeSound()));
// Output: "Woof!" "Meow!"

// Compile-time Polymorphism (Method Overloading - not directly in JS, but concept)
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  add(a, b, c) {
    return a + b + c;
  }
}
```

### 6. What is abstraction? How is it different from encapsulation?
**Answer:** 
- **Abstraction**: Hiding complex implementation details, showing only essential features. Focus on "what" rather than "how". Achieved through abstract classes/interfaces.
- **Encapsulation**: Bundling data and methods together, controlling access. Focus on data hiding and access control.

**Difference:**
- **Abstraction**: Design level concept - what to show/hide
- **Encapsulation**: Implementation level concept - how to hide

**Example:**
```javascript
// Abstraction - showing only essential interface
class Database {
  connect() {
    throw new Error("Must implement connect");
  }
  
  query(sql) {
    throw new Error("Must implement query");
  }
}

class MySQLDatabase extends Database {
  connect() {
    // Complex connection logic hidden
    console.log("Connecting to MySQL...");
  }
  
  query(sql) {
    // Complex query execution hidden
    return "Query results";
  }
}

// Encapsulation - hiding internal data
class User {
  #password; // Hidden from outside
  
  constructor(username, password) {
    this.username = username;
    this.#password = password; // Encapsulated
  }
  
  validatePassword(input) {
    return input === this.#password; // Controlled access
  }
}
```

### 7. What is method overloading vs method overriding?
**Answer:**
- **Method Overloading**: Same method name, different parameters (number/type). Resolved at compile-time. Not directly supported in JavaScript, but concept exists in Java/C++.
- **Method Overriding**: Child class redefines parent class method with same signature. Resolved at runtime. Supported in JavaScript.

**Example:**
```javascript
// Method Overriding (JavaScript)
class Animal {
  speak() {
    return "Animal speaks";
  }
}

class Dog extends Animal {
  speak() {
    return "Dog barks"; // Overriding parent method
  }
}

// Method Overloading (Concept - JavaScript doesn't support directly)
// In Java/C++:
class Calculator {
  int add(int a, int b) { return a + b; }
  int add(int a, int b, int c) { return a + b + c; } // Overloading
  double add(double a, double b) { return a + b; } // Overloading
}
```

### 8. Can you override a static method in Java/C++?
**Answer:** No, static methods cannot be overridden. They can be hidden/redefined in child class, but it's method hiding, not overriding. Static methods are resolved at compile-time based on reference type, not runtime object type.

**Why:**
- Static methods belong to the class, not instances
- Overriding requires runtime polymorphism (virtual functions)
- Static methods are resolved at compile-time

**Example (Java):**
```java
class Parent {
    static void method() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    static void method() {
        System.out.println("Child"); // Hiding, not overriding
    }
}

Parent obj = new Child();
obj.method(); // Prints "Parent" (compile-time resolution)
```

### 9. What is dynamic vs static polymorphism?
**Answer:**
- **Static Polymorphism (Compile-time)**: Method resolution happens at compile-time. Examples: Method overloading, operator overloading, templates (C++).
- **Dynamic Polymorphism (Runtime)**: Method resolution happens at runtime based on actual object type. Examples: Method overriding, virtual functions.

**Example:**
```javascript
// Dynamic Polymorphism (Runtime)
class Shape {
  area() {
    throw new Error("Must implement");
  }
}

class Circle extends Shape {
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  area() {
    return this.width * this.height;
  }
}

// Resolved at runtime
const shapes = [new Circle(), new Rectangle()];
shapes.forEach(shape => shape.area()); // Different implementations

// Static Polymorphism (Compile-time - concept)
// Method overloading resolved at compile-time
function add(a, b) { return a + b; }
function add(a, b, c) { return a + b + c; } // Compiler chooses based on arguments
```

### 10. How does the 'this' keyword work in OOP languages?
**Answer:** `this` refers to the current object instance. It allows access to instance variables and methods within the object.

**Behavior:**
- **In methods**: `this` refers to the object calling the method
- **In constructors**: `this` refers to the object being created
- **Arrow functions (JS)**: `this` is lexically bound (inherits from enclosing scope)
- **Regular functions (JS)**: `this` is dynamically bound (depends on how function is called)

**Example:**
```javascript
class Person {
  constructor(name) {
    this.name = name; // 'this' refers to the instance being created
  }
  
  greet() {
    return `Hello, I'm ${this.name}`; // 'this' refers to the instance
  }
  
  greetWithDelay() {
    setTimeout(function() {
      console.log(this.name); // 'this' is undefined (lost context)
    }, 1000);
    
    setTimeout(() => {
      console.log(this.name); // 'this' correctly refers to Person instance
    }, 1000);
  }
}

const person = new Person("John");
person.greet(); // "Hello, I'm John"
```

## Class & Object-Level Questions (11-15)

### 11. What is the difference between a class and an object?
**Answer:**
- **Class**: Blueprint/template for creating objects. Defines structure (properties) and behavior (methods). Doesn't exist in memory at runtime (in some languages).
- **Object**: Instance of a class. Concrete entity with actual data. Exists in memory. Created using `new` keyword.

**Analogy**: Class is like a cookie cutter, object is the actual cookie.

**Example:**
```javascript
// Class (blueprint)
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  drive() {
    return `${this.brand} ${this.model} is driving`;
  }
}

// Objects (instances)
const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "Civic");

console.log(car1.drive()); // "Toyota Camry is driving"
console.log(car2.drive()); // "Honda Civic is driving"
```

### 12. What are constructors? Can constructors be inherited?
**Answer:** Constructors are special methods called when an object is created. They initialize the object's initial state. Same name as the class, no return type.

**Inheritance:**
- **Not directly inherited**: Child class doesn't inherit parent constructor
- **Must call parent constructor**: Child constructor must call `super()` to initialize parent part
- **Chain of calls**: Constructor calls chain from child to parent

**Example:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Must call parent constructor
    this.breed = breed;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
```

### 13. What is a copy constructor?
**Answer:** A constructor that creates an object by copying another object of the same class. Used to create a copy of an existing object.

**Types:**
- **Shallow Copy**: Copies object references
- **Deep Copy**: Creates new copies of nested objects

**Example (Concept - JavaScript doesn't have explicit copy constructors):**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Copy constructor pattern
  static from(other) {
    return new Person(other.name, other.age);
  }
  
  // Or instance method
  clone() {
    return new Person(this.name, this.age);
  }
}

const person1 = new Person("John", 30);
const person2 = Person.from(person1); // Copy
const person3 = person1.clone(); // Copy
```

### 14. What is object slicing?
**Answer:** Object slicing occurs when a derived class object is assigned to a base class object. The derived class specific members are "sliced off" - only base class members are copied.

**Problem:**
- Derived class specific data is lost
- Virtual functions may not work correctly
- Object becomes "incomplete"

**Example (C++ concept, shown in JavaScript pattern):**
```javascript
// Concept demonstration
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return "Animal sound";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed; // Derived class specific
  }
  
  speak() {
    return "Woof!";
  }
}

// Object slicing concept (in C++ this would lose 'breed')
// In JavaScript, this doesn't happen the same way, but concept:
const dog = new Dog("Buddy", "Golden");
const animal = dog; // In C++, this would "slice" and lose breed
// In JS, animal still has breed, but type is Animal
```

### 15. What is the difference between shallow copy and deep copy?
**Answer:**
- **Shallow Copy**: Copies object references, not the actual objects. Nested objects are shared. Changes to nested objects affect both copies.
- **Deep Copy**: Creates new copies of all nested objects. Completely independent copies. Changes don't affect each other.

**Example:**
```javascript
// Shallow Copy
const original = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001"
  }
};

const shallow = Object.assign({}, original);
// or: const shallow = { ...original };

shallow.address.city = "Boston"; // Affects original too!
console.log(original.address.city); // "Boston" (changed!)

// Deep Copy
const deep = JSON.parse(JSON.stringify(original));
// or use structuredClone() in modern JS
deep.address.city = "Boston";
console.log(original.address.city); // "New York" (unchanged)

// Manual Deep Copy
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}
```

## Inheritance-Related Questions (16-20)

### 16. What are different types of inheritance (single, multiple, multilevel)?
**Answer:**
1. **Single Inheritance**: Child class inherits from one parent class
2. **Multiple Inheritance**: Child class inherits from multiple parent classes (C++ supports, Java doesn't)
3. **Multilevel Inheritance**: Chain of inheritance (A → B → C)
4. **Hierarchical Inheritance**: Multiple children from one parent
5. **Hybrid Inheritance**: Combination of multiple types

**Example:**
```javascript
// Single Inheritance
class Animal {}
class Dog extends Animal {}

// Multilevel Inheritance
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}

// Hierarchical Inheritance
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

// Multiple Inheritance (not directly in JS/Java, but via mixins)
class Flyable {
  fly() { return "Flying"; }
}

class Swimmable {
  swim() { return "Swimming"; }
}

class Duck {
  constructor() {
    Object.assign(this, new Flyable(), new Swimmable());
  }
}
```

### 17. How is multiple inheritance handled in languages like C++ and Java?
**Answer:**
- **C++**: Supports multiple inheritance directly. Can inherit from multiple classes. Risk of diamond problem.
- **Java**: Doesn't support multiple inheritance for classes. Uses interfaces instead. A class can implement multiple interfaces.

**Why Java doesn't support:**
- Avoids diamond problem complexity
- Interfaces provide needed flexibility
- Simpler language design

**Example:**
```java
// C++ - Multiple Inheritance
class A { };
class B { };
class C : public A, public B { }; // Multiple inheritance

// Java - Multiple Interfaces
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    public void fly() { }
    public void swim() { }
}
```

### 18. What is the diamond problem in multiple inheritance? How is it solved?
**Answer:** Diamond problem occurs when a class inherits from two classes that both inherit from the same base class, creating ambiguity about which base class method to use.

**Problem:**
```
    A
   / \
  B   C
   \ /
    D
```

**Solutions:**
1. **Virtual Inheritance (C++)**: Use `virtual` keyword to ensure only one instance of base class
2. **Interfaces (Java)**: Use interfaces instead of multiple inheritance
3. **Method Resolution Order (Python)**: MRO algorithm determines method lookup order

**Example (C++ concept):**
```cpp
class A {
public:
    void method() { }
};

class B : virtual public A { }; // Virtual inheritance
class C : virtual public A { }; // Virtual inheritance
class D : public B, public C { }; // No ambiguity
```

### 19. Can a class implement multiple interfaces?
**Answer:** Yes, in languages like Java, C#, a class can implement multiple interfaces. This is how multiple inheritance-like behavior is achieved without the diamond problem.

**Benefits:**
- Provides multiple "contracts"
- No ambiguity (interfaces have no implementation)
- Flexible design

**Example:**
```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

interface Runnable {
    void run();
}

class Duck implements Flyable, Swimmable, Runnable {
    public void fly() { System.out.println("Flying"); }
    public void swim() { System.out.println("Swimming"); }
    public void run() { System.out.println("Running"); }
}
```

### 20. Why is interface preferred over multiple inheritance?
**Answer:**
1. **Avoids Diamond Problem**: No ambiguity about which method to use
2. **Simplicity**: Easier to understand and maintain
3. **Flexibility**: Classes can implement multiple interfaces without conflicts
4. **Loose Coupling**: Interfaces define contracts, not implementations
5. **Testability**: Easier to mock interfaces for testing
6. **Design Clarity**: Clear separation of "what" (interface) vs "how" (implementation)

**Example:**
```java
// Interface approach (preferred)
interface Drawable {
    void draw();
}

interface Resizable {
    void resize();
}

class Circle implements Drawable, Resizable {
    public void draw() { }
    public void resize() { }
}

// vs Multiple Inheritance (complex, error-prone)
// class Circle extends Shape, Resizable { } // Not in Java
```

## Design & Practical Implementation (21-25)

### 21. What is SOLID in OOP? Explain each principle.
**Answer:** SOLID is an acronym for five object-oriented design principles:

1. **S - Single Responsibility Principle (SRP)**
   - A class should have only one reason to change
   - One class = one responsibility
   - **Example**: Separate `User` class from `EmailService` class

2. **O - Open/Closed Principle (OCP)**
   - Open for extension, closed for modification
   - Add new functionality through inheritance/extension, not by changing existing code
   - **Example**: Use interfaces/abstract classes for extensibility

3. **L - Liskov Substitution Principle (LSP)**
   - Objects of superclass should be replaceable with objects of subclass
   - Subclass must not break expectations of superclass
   - **Example**: `Rectangle` and `Square` - Square shouldn't extend Rectangle if it violates LSP

4. **I - Interface Segregation Principle (ISP)**
   - Clients should not be forced to depend on interfaces they don't use
   - Prefer many specific interfaces over one general interface
   - **Example**: Separate `Flyable` and `Swimmable` interfaces instead of one `AnimalActions`

5. **D - Dependency Inversion Principle (DIP)**
   - High-level modules should not depend on low-level modules
   - Both should depend on abstractions (interfaces/abstract classes)
   - **Example**: Depend on `Database` interface, not `MySQLDatabase` class

### 22. What is the difference between an abstract class and an interface?
**Answer:**

| Feature | Abstract Class | Interface |
|---------|---------------|----------|
| **Methods** | Can have both abstract and concrete methods | Only method signatures (usually) |
| **Variables** | Can have instance variables | Only constants (usually) |
| **Constructor** | Can have constructor | Cannot have constructor |
| **Inheritance** | Single inheritance | Multiple implementation |
| **Access Modifiers** | Can have any access modifier | Usually public |
| **When to use** | Shared code among related classes | Contract for unrelated classes |

**Example:**
```java
// Abstract Class
abstract class Animal {
    protected String name; // Can have instance variables
    
    Animal(String name) { // Can have constructor
        this.name = name;
    }
    
    abstract void makeSound(); // Abstract method
    
    void sleep() { // Concrete method
        System.out.println("Sleeping");
    }
}

// Interface
interface Flyable {
    void fly(); // Only method signature
    
    // Can have default methods (Java 8+)
    default void takeOff() {
        System.out.println("Taking off");
    }
}
```

### 23. When would you use an abstract class vs an interface?
**Answer:**

**Use Abstract Class when:**
- You have shared code among related classes
- You need instance variables
- You need a constructor
- Classes share common state/behavior
- You want to provide a base implementation

**Use Interface when:**
- You need to define a contract for unrelated classes
- You want multiple inheritance-like behavior
- You only need method signatures
- You want loose coupling
- Classes don't share common implementation

**Example:**
```java
// Abstract Class - shared implementation
abstract class Vehicle {
    protected int speed; // Shared state
    
    Vehicle() {
        this.speed = 0;
    }
    
    void start() { // Shared behavior
        System.out.println("Starting vehicle");
    }
    
    abstract void accelerate();
}

// Interface - contract
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    public void fly() { }
    public void swim() { }
}
```

### 24. What is dependency injection? How is it related to OOP?
**Answer:** Dependency Injection (DI) is a design pattern where objects receive their dependencies from outside rather than creating them internally. It's a way to implement Dependency Inversion Principle.

**Benefits:**
- **Loose Coupling**: Classes don't create their dependencies
- **Testability**: Easy to inject mocks for testing
- **Flexibility**: Can swap implementations easily
- **Maintainability**: Changes to dependencies don't require changes to dependent classes

**Types:**
1. **Constructor Injection**: Dependencies passed via constructor
2. **Setter Injection**: Dependencies set via setter methods
3. **Interface Injection**: Dependencies injected via interface

**Example:**
```javascript
// Without DI (tight coupling)
class UserService {
  constructor() {
    this.database = new MySQLDatabase(); // Tight coupling
  }
}

// With DI (loose coupling)
class UserService {
  constructor(database) {
    this.database = database; // Dependency injected
  }
}

// Usage
const db = new MySQLDatabase();
const userService = new UserService(db); // Inject dependency

// Easy to test with mock
const mockDb = new MockDatabase();
const userService = new UserService(mockDb);
```

### 25. What are access modifiers? How do they affect encapsulation?
**Answer:** Access modifiers control the visibility and accessibility of class members (variables, methods, constructors).

**Types:**
- **Public**: Accessible from anywhere
- **Private**: Accessible only within the class
- **Protected**: Accessible within class and derived classes
- **Default/Internal**: Accessible within the same package/assembly

**How they affect encapsulation:**
- **Data Hiding**: Private members hide implementation details
- **Controlled Access**: Public methods provide controlled interface
- **Inheritance Control**: Protected allows inheritance while maintaining some privacy
- **Interface Design**: Public methods define the class's public contract

**Example:**
```javascript
class BankAccount {
  #balance = 0; // Private (encapsulated)
  
  deposit(amount) { // Public interface
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  getBalance() { // Public interface
    return this.#balance; // Controlled access
  }
  
  // Private helper method
  #validateAmount(amount) {
    return amount > 0;
  }
}
```

## Advanced & Common Pitfalls (26-30)

### 26. What is cohesion and coupling? Why do they matter in OOP design?
**Answer:**

**Cohesion**: How closely related the responsibilities within a module/class are.
- **High Cohesion**: Good - class has focused, related responsibilities
- **Low Cohesion**: Bad - class has unrelated responsibilities (God class)

**Coupling**: How dependent one module/class is on another.
- **Low Coupling**: Good - classes are independent, changes don't cascade
- **High Coupling**: Bad - classes are tightly dependent, changes affect multiple classes

**Why they matter:**
- **Maintainability**: High cohesion, low coupling = easier to maintain
- **Testability**: Low coupling = easier to test in isolation
- **Reusability**: High cohesion = focused, reusable components
- **Flexibility**: Low coupling = easier to change without breaking code

**Example:**
```javascript
// Low Cohesion, High Coupling (Bad)
class GodClass {
  calculateTax() { }
  sendEmail() { }
  processPayment() { }
  generateReport() { }
  // Unrelated responsibilities
}

// High Cohesion, Low Coupling (Good)
class TaxCalculator {
  calculateTax(amount) { }
  // Focused responsibility
}

class EmailService {
  sendEmail(to, message) { }
  // Focused responsibility
}

class PaymentProcessor {
  constructor(taxCalculator) { // Dependency injection
    this.taxCalculator = taxCalculator; // Low coupling
  }
  processPayment(amount) {
    const tax = this.taxCalculator.calculateTax(amount);
    // Process payment
  }
}
```

### 27. What is object-oriented design? How is it different from object-oriented programming?
**Answer:**

**Object-Oriented Design (OOD)**:
- Design phase before coding
- Planning classes, relationships, interactions
- Creating class diagrams, UML
- Focus on "what" and "how to structure"
- High-level architecture

**Object-Oriented Programming (OOP)**:
- Implementation phase
- Writing actual code using OOP concepts
- Creating classes, objects, methods
- Focus on "how to implement"
- Low-level coding

**Difference:**
- **OOD**: Design/planning phase
- **OOP**: Implementation/coding phase
- OOD comes before OOP
- OOD is about structure, OOP is about code

**Example:**
```
OOD Phase:
- Design: User class, Order class, PaymentProcessor class
- Relationships: User has Orders, Order uses PaymentProcessor
- UML diagrams, class structure

OOP Phase:
- Implement: class User { }
- Implement: class Order { }
- Write actual code
```

### 28. How would you refactor a large class violating SRP (Single Responsibility Principle)?
**Answer:** Break down the large class into smaller, focused classes, each with a single responsibility.

**Steps:**
1. **Identify Responsibilities**: List all things the class does
2. **Group Related Functionality**: Find related responsibilities
3. **Extract Classes**: Create new classes for each responsibility
4. **Use Composition**: Compose the original class from new classes
5. **Update Dependencies**: Update code that uses the class

**Example:**
```javascript
// Before: Violates SRP
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() {
    // Database logic
  }
  
  sendEmail() {
    // Email logic
  }
  
  validate() {
    // Validation logic
  }
  
  format() {
    // Formatting logic
  }
}

// After: Follows SRP
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // Database logic
  }
}

class EmailService {
  sendEmail(user, message) {
    // Email logic
  }
}

class UserValidator {
  validate(user) {
    // Validation logic
  }
}

class UserFormatter {
  format(user) {
    // Formatting logic
  }
}
```

### 29. What is a virtual function?
**Answer:** A virtual function is a function that can be overridden in derived classes. It enables runtime polymorphism - the function to call is determined at runtime based on the actual object type, not the reference type.

**Characteristics:**
- Resolved at runtime (dynamic binding)
- Enables method overriding
- Base class defines virtual function, derived class overrides it
- Key to polymorphism

**Example (C++ concept, shown in JavaScript pattern):**
```cpp
// C++ Example
class Animal {
public:
    virtual void speak() { // Virtual function
        cout << "Animal sound";
    }
};

class Dog : public Animal {
public:
    void speak() override { // Overrides virtual function
        cout << "Woof!";
    }
};

Animal* animal = new Dog();
animal->speak(); // "Woof!" (runtime resolution)
```

**JavaScript equivalent:**
```javascript
class Animal {
  speak() { // Can be overridden
    return "Animal sound";
  }
}

class Dog extends Animal {
  speak() { // Overrides parent method
    return "Woof!";
  }
}

const animal = new Dog();
animal.speak(); // "Woof!" (runtime resolution)
```

### 30. What is the Liskov Substitution Principle?
**Answer:** Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subclass must not break expectations of superclass.

**Rules:**
- Subclass must accept same input parameters as superclass
- Subclass must not throw exceptions superclass doesn't throw
- Subclass return values must be compatible with superclass
- Subclass must maintain superclass invariants

**Violation Example:**
```javascript
// Violates LSP
class Rectangle {
  setWidth(width) {
    this.width = width;
  }
  
  setHeight(height) {
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width; // Breaks expectation!
  }
  
  setHeight(height) {
    this.width = height;
    this.height = height; // Breaks expectation!
  }
}

// This breaks LSP - Square doesn't behave like Rectangle
function testRectangle(rect) {
  rect.setWidth(5);
  rect.setHeight(4);
  console.log(rect.getArea()); // Expects 20, but Square gives 16
}
```

**Correct Design:**
```javascript
// Follows LSP
class Shape {
  getArea() {
    throw new Error("Must implement");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  
  getArea() {
    return this.side * this.side;
  }
}

// Both can be used interchangeably as Shape
function printArea(shape) {
  console.log(shape.getArea()); // Works for both
}
```
