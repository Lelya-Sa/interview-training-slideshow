# Object-Oriented Programming (OOP) - Interview Material

## Definition
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which contain data (attributes/properties) and code (methods/functions). OOP focuses on organizing code around objects rather than functions and procedures.

## Core Concepts

### The Four Pillars of OOP

1. **Encapsulation**
   - Bundling data and methods that operate on that data within a single unit (class)
   - Hiding internal implementation details from outside access
   - Achieved through access modifiers (private, protected, public)
   - **Benefit**: Data protection, easier maintenance, clear interface

#### Encapsulation Explained in Detail:

**What is Encapsulation?**
Encapsulation is the bundling of data (attributes/properties) and methods (functions) that operate on that data into a single unit called a class. It restricts direct access to some of the object's components, which helps prevent accidental modification of data.

**Key Concepts:**

1. **Data Bundling**: Combining related data and methods together
   - Related data and functions are grouped in one place
   - Example: `BankAccount` class contains `balance` (data) and `deposit()`, `withdraw()` (methods)

2. **Data Hiding**: Hiding internal implementation details
   - Internal data is not directly accessible from outside
   - Access is controlled through public methods
   - Example: `balance` is private, but you can access it via `getBalance()`

3. **Access Control**: Using access modifiers to control visibility
   - **Private**: Only accessible within the class (most restricted)
   - **Protected**: Accessible within class and derived classes
   - **Public**: Accessible from anywhere (least restricted)

**Example - Without Encapsulation (Bad):**
```javascript
// No encapsulation - data is exposed
class BankAccount {
  constructor() {
    this.balance = 0; // Public - anyone can modify!
  }
}

const account = new BankAccount();
account.balance = 1000000; // Can directly modify - no protection! ❌
account.balance = -500; // Can set negative - violates rules! ❌
```

**Example - With Encapsulation (Good):**
```javascript
// With encapsulation - data is protected
class BankAccount {
  #balance = 0; // Private field (encapsulated)
  
  // Public methods provide controlled access
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    } else {
      throw new Error("Amount must be positive");
    }
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
    } else {
      throw new Error("Invalid amount or insufficient funds");
    }
  }
  
  getBalance() {
    return this.#balance; // Controlled read access
  }
}

const account = new BankAccount();
account.deposit(1000); // ✅ Valid operation
account.withdraw(500); // ✅ Valid operation
// account.#balance = 1000000; // ❌ Error - cannot access private field
console.log(account.getBalance()); // ✅ Controlled access
```

**How Encapsulation Works:**

1. **Data is Private**: Internal data (`#balance`) is hidden
2. **Public Interface**: Methods (`deposit()`, `withdraw()`, `getBalance()`) provide controlled access
3. **Validation**: Methods can validate before modifying data
4. **Consistency**: Internal state remains consistent (e.g., balance can't be negative)

**Benefits of Encapsulation:**

1. **Data Protection**: Prevents unauthorized or invalid access/modification
   - Example: Can't set balance to negative directly

2. **Easier Maintenance**: Changes to internal implementation don't affect external code
   - Example: Can change how balance is stored without breaking code that uses the class

3. **Clear Interface**: Users only need to know public methods, not internal details
   - Example: Users know `deposit()` and `withdraw()`, don't need to know how balance is stored

4. **Flexibility**: Can change implementation without breaking code
   - Example: Can add logging, validation, or change storage without affecting users

**Real-World Analogy:**
Think of a car's engine:
- **Without Encapsulation**: You can directly modify engine parts (dangerous!)
- **With Encapsulation**: You use pedals, steering wheel (public interface) while engine details are hidden

**Java Example:**
```java
class BankAccount {
    private double balance; // Private - encapsulated
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
    
    public double getBalance() {
        return balance; // Controlled access
    }
}
```

**Python Example:**
```python
class BankAccount:
    def __init__(self):
        self._balance = 0  # Protected (convention)
        self.__balance = 0  # Name mangling (private)
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def get_balance(self):
        return self.__balance
```

**Understanding Python's Underscore Conventions - Privacy Declaration:**

**Important Note:** Python doesn't have true private/protected access modifiers like Java or C++. The underscores are **conventions** (hints to developers), not enforced restrictions. However, Python does use "name mangling" for double underscores.

**Python Underscore Conventions:**

1. **Single Underscore (`_` prefix) - Protected (Convention)**
   - **Purpose**: Indicates "protected" - should not be accessed from outside the class
   - **Behavior**: **NOT enforced** by Python - it's just a convention/hint
   - **Usage**: Signals to other developers: "this is internal, don't use it directly"
   - **Access**: Still accessible from outside, but convention says "don't"

   **Example:**
   ```python
   class BankAccount:
       def __init__(self):
           self._balance = 0  # Protected (convention only)
   
   account = BankAccount()
   print(account._balance)  # ⚠️ Works, but violates convention
   # Should use: account.get_balance() instead
   ```

2. **Double Underscore (`__` prefix) - Private (Name Mangling)**
   - **Purpose**: Indicates "private" - should not be accessed from outside
   - **Behavior**: **Python performs name mangling** - changes the name internally
   - **How it works**: `__balance` becomes `_BankAccount__balance` internally
   - **Access**: Still possible, but requires mangled name (more difficult)

   **Example:**
   ```python
   class BankAccount:
       def __init__(self):
           self.__balance = 0  # Private (name mangling)
   
   account = BankAccount()
   # account.__balance  # ❌ AttributeError: 'BankAccount' has no attribute '__balance'
   print(account._BankAccount__balance)  # ⚠️ Works with mangled name (not recommended!)
   print(account.get_balance())  # ✅ Correct way
   ```

3. **No Underscore - Public**
   - **Purpose**: Public attribute - intended for external access
   - **Behavior**: Normal attribute access
   - **Usage**: Safe to use from outside the class

**Comparison:**

| Prefix | Name | Purpose | Enforced? | Access from Outside |
|--------|------|---------|-----------|---------------------|
| None | `balance` | Public | No | ✅ Yes (normal access) |
| Single `_` | `_balance` | Protected | No (convention) | ⚠️ Yes (but convention says no) |
| Double `__` | `__balance` | Private | Yes (name mangling) | ⚠️ Yes (with mangled name) |

**Complete Example:**

```python
class BankAccount:
    def __init__(self):
        self.balance = 0           # Public - OK to access
        self._balance = 0          # Protected - convention: don't access
        self.__balance = 0         # Private - name mangling
    
    def deposit(self, amount):
        self.__balance += amount
    
    def get_balance(self):
        return self.__balance      # Access within class (normal)

# Usage
account = BankAccount()

# Public - OK
print(account.balance)  # ✅ 0

# Protected - works but violates convention
print(account._balance)  # ⚠️ 0 (works, but shouldn't do this)

# Private - requires mangled name
# print(account.__balance)  # ❌ AttributeError
print(account._BankAccount__balance)  # ⚠️ 0 (works with mangled name, but don't!)

# Correct way - use public methods
print(account.get_balance())  # ✅ 0 (recommended)
```

**Key Points:**

- **`_` (single underscore)**: Convention only - signals "protected" but not enforced
- **`__` (double underscore)**: Name mangling - Python changes the name internally (`__balance` → `_ClassName__balance`)
- **Both are accessible**: Python doesn't prevent access, just makes it harder/more obvious
- **Best Practice**: Respect the convention - use public methods instead of accessing private/protected attributes directly

**Python Philosophy:**
> "We are all consenting adults here" - Python trusts developers to follow conventions rather than enforcing strict access control.

**How to Enforce Privacy in Python (Practical Approaches):**

While Python doesn't enforce privacy like Java/C++, here are practical ways to enforce or strongly encourage proper access:

**1. Using Property Decorators (Recommended):**

```python
class BankAccount:
    def __init__(self):
        self.__balance = 0  # Private with name mangling
    
    @property
    def balance(self):
        """Getter - controlled read access"""
        return self.__balance
    
    @balance.setter
    def balance(self, value):
        """Setter - controlled write access with validation"""
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            raise ValueError("Amount must be positive")

# Usage
account = BankAccount()
account.deposit(1000)
print(account.balance)  # ✅ 1000 (uses getter)
# account.balance = -500  # ❌ ValueError: Balance cannot be negative
# account.__balance = 1000000  # ❌ Would create a new attribute (not the same)
```

**2. Using Property with Only Getter (Read-Only):**

```python
class BankAccount:
    def __init__(self):
        self.__balance = 0
    
    @property
    def balance(self):
        """Read-only property"""
        return self.__balance
    
    # No setter = read-only!
    # @balance.setter  # Commented out = cannot set balance directly
    
    def deposit(self, amount):
        self.__balance += amount

account = BankAccount()
account.deposit(1000)
print(account.balance)  # ✅ 1000
# account.balance = 2000  # ❌ AttributeError: can't set attribute
```

**3. Using __getattr__ and __setattr__ for Strict Control:**

```python
class BankAccount:
    def __init__(self):
        object.__setattr__(self, '_BankAccount__balance', 0)
    
    def __getattr__(self, name):
        if name == '__balance':
            return object.__getattribute__(self, '_BankAccount__balance')
        raise AttributeError(f"'{type(self).__name__}' has no attribute '{name}'")
    
    def __setattr__(self, name, value):
        if name == '__balance':
            raise AttributeError("Cannot set __balance directly. Use deposit() method.")
        object.__setattr__(self, name, value)
    
    def deposit(self, amount):
        object.__setattr__(self, '_BankAccount__balance', 
                          object.__getattribute__(self, '_BankAccount__balance') + amount)
    
    @property
    def balance(self):
        return object.__getattribute__(self, '_BankAccount__balance')

account = BankAccount()
account.deposit(1000)
print(account.balance)  # ✅ 1000
# account.__balance = 500  # ❌ AttributeError: Cannot set __balance directly
```

**4. Using Descriptors (Advanced):**

```python
class PrivateAttribute:
    """Descriptor for private attributes"""
    def __init__(self, name):
        self.name = name
        self.private_name = f'_{name}'
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)
    
    def __set__(self, obj, value):
        raise AttributeError(f"Cannot set private attribute '{self.name}' directly")
    
    def __delete__(self, obj):
        raise AttributeError(f"Cannot delete private attribute '{self.name}'")

class BankAccount:
    balance = PrivateAttribute('balance')  # Descriptor
    
    def __init__(self):
        self._balance = 0  # Internal storage
    
    def deposit(self, amount):
        self._balance += amount
    
    def get_balance(self):
        return self._balance

account = BankAccount()
account.deposit(1000)
print(account.get_balance())  # ✅ 1000
# account.balance = 500  # ❌ AttributeError: Cannot set private attribute 'balance'
# del account.balance  # ❌ AttributeError: Cannot delete private attribute 'balance'
```

**5. Simple Approach - No Direct Access Pattern:**

```python
class BankAccount:
    def __init__(self):
        self.__balance = 0  # Private (name mangling)
        # Don't provide direct access - only methods
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            raise ValueError("Amount must be positive")
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
        else:
            raise ValueError("Invalid amount")
    
    def get_balance(self):
        """Only way to read balance"""
        return self.__balance
    # No property, no direct access - must use get_balance()

account = BankAccount()
account.deposit(1000)
print(account.get_balance())  # ✅ 1000
# print(account.__balance)  # ❌ AttributeError (name mangling)
# print(account._BankAccount__balance)  # ⚠️ Works but requires knowing internal details
```

**Best Practices for Enforcing Privacy in Python:**

1. **Use Property Decorators** (Most Common)
   - Provides controlled access
   - Allows validation
   - Maintains Pythonic style

2. **Use Name Mangling (`__`)** 
   - Makes accidental access harder
   - Requires knowing class name to access

3. **Don't Provide Direct Access**
   - Only expose methods, not attributes
   - Users must use getter methods

4. **Document Your Intent**
   - Use docstrings to explain private attributes
   - Clear naming conventions

5. **Code Reviews and Linting**
   - Tools like `pylint` can warn about accessing private attributes
   - Code reviews enforce conventions

**Summary - Enforcement Levels:**

| Approach | Enforcement Level | Complexity | Recommendation |
|----------|------------------|------------|----------------|
| Conventions (`_`) | Low (convention only) | Low | Good for team projects |
| Name Mangling (`__`) | Medium (name changed) | Low | Good default choice |
| Properties | High (controlled access) | Medium | **Best for most cases** |
| Descriptors | Very High (strict control) | High | Advanced use cases |
| `__getattr__/__setattr__` | Very High (full control) | Very High | Overkill for most cases |

**Most Practical Approach:**
```python
class BankAccount:
    def __init__(self):
        self.__balance = 0  # Private with name mangling
    
    @property
    def balance(self):
        """Read-only balance"""
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
```

This provides:
- ✅ Name mangling (harder to access)
- ✅ Property decorator (controlled access)
- ✅ Validation in methods
- ✅ Clean, Pythonic code

2. **Inheritance**
   - Mechanism where a new class (child/derived) inherits properties and methods from an existing class (parent/base)
   - Promotes code reusability and establishes "is-a" relationships
   - **Types**: Single, Multiple, Multilevel, Hierarchical, Hybrid
   - **Benefit**: Code reuse, polymorphism, hierarchical organization

3. **Polymorphism**
   - Ability of objects of different types to be accessed through the same interface
   - "One interface, many implementations"
   - **Types**: 
     - **Compile-time (Static)**: Method overloading, operator overloading
     - **Runtime (Dynamic)**: Method overriding, virtual functions
   - **Benefit**: Flexibility, extensibility, code simplification

4. **Abstraction**
   - Hiding complex implementation details and showing only essential features
   - Focus on "what" rather than "how"
   - Achieved through abstract classes and interfaces
   - **Benefit**: Simplifies complexity, reduces coupling, easier maintenance

## Key Terminology

### Class vs Object
- **Class**: Blueprint/template for creating objects (defines structure and behavior)
- **Object**: Instance of a class (concrete entity with actual data)

### Constructor
- Special method called when an object is created
- Initializes object's initial state
- Same name as the class
- Can be overloaded (multiple constructors with different parameters)

### Access Modifiers
- **Public**: Accessible from anywhere
- **Private**: Accessible only within the class
- **Protected**: Accessible within class and derived classes
- **Default/Internal**: Accessible within the same package/assembly

### Method Overloading vs Overriding
- **Overloading**: Same method name, different parameters (compile-time polymorphism)
- **Overriding**: Child class redefines parent class method (runtime polymorphism)

### Composition vs Inheritance
- **Inheritance**: "is-a" relationship (Car is a Vehicle)
- **Composition**: "has-a" relationship (Car has an Engine)
- **Prefer composition over inheritance** for flexibility

### Abstract Class vs Interface
- **Abstract Class**: Can have both abstract and concrete methods, can have instance variables
- **Interface**: Only method signatures (contract), no implementation (usually)
- **Use Abstract Class**: When you have shared code among related classes
- **Use Interface**: When you need to define a contract for unrelated classes

## Design Principles

### SOLID Principles

1. **S - Single Responsibility Principle (SRP)**
   - A class should have only one reason to change
   - One class = one responsibility

2. **O - Open/Closed Principle (OCP)**
   - Open for extension, closed for modification
   - Add new functionality through inheritance/extension, not by changing existing code

3. **L - Liskov Substitution Principle (LSP)**
   - Objects of superclass should be replaceable with objects of subclass
   - Subclass must not break expectations of superclass

4. **I - Interface Segregation Principle (ISP)**
   - Clients should not be forced to depend on interfaces they don't use
   - Prefer many specific interfaces over one general interface

5. **D - Dependency Inversion Principle (DIP)**
   - High-level modules should not depend on low-level modules
   - Both should depend on abstractions (interfaces/abstract classes)

### Cohesion and Coupling

- **Cohesion**: How closely related the responsibilities within a module/class are
  - **High Cohesion**: Good - class has focused, related responsibilities
  - **Low Cohesion**: Bad - class has unrelated responsibilities

- **Coupling**: How dependent one module/class is on another
  - **Low Coupling**: Good - classes are independent, changes don't cascade
  - **High Coupling**: Bad - classes are tightly dependent, changes affect multiple classes

## Common Patterns and Concepts

### Virtual Functions
- Functions that can be overridden in derived classes
- Enables runtime polymorphism
- Resolved at runtime based on actual object type

### Copy Constructor
- Constructor that creates an object by copying another object of the same class
- Used for deep copying objects

### Shallow Copy vs Deep Copy
- **Shallow Copy**: Copies object references, not the actual objects
- **Deep Copy**: Creates new copies of all nested objects

### Object Slicing
- Occurs when a derived class object is assigned to a base class object
- Derived class specific members are "sliced off"
- Only base class members are copied

### Diamond Problem
- Issue in multiple inheritance where a class inherits from two classes that both inherit from the same base class
- Creates ambiguity about which base class method to use
- **Solution**: Virtual inheritance (C++), interfaces (Java)

## OOP vs OOD

- **OOP (Object-Oriented Programming)**: Implementation of OO concepts in code
- **OOD (Object-Oriented Design)**: Design phase before coding, planning classes and relationships

## Benefits of OOP

- **Modularity**: Code organized into logical units
- **Reusability**: Code can be reused through inheritance
- **Maintainability**: Easier to modify and extend
- **Scalability**: Easier to add new features
- **Testability**: Components can be tested independently

## Common Pitfalls

- Violating Single Responsibility Principle (God classes)
- Overusing inheritance (prefer composition)
- Tight coupling between classes
- Not using proper access modifiers
- Ignoring the Liskov Substitution Principle
- Creating unnecessary abstractions
