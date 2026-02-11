# Python - Interview Questions

## Core Python Concepts (1-15)

### 1. What's the difference between list, tuple, set, and dictionary?
**Answer:**
- **List**: Ordered, mutable, allows duplicates. `[1, 2, 3]`
- **Tuple**: Ordered, immutable, allows duplicates. `(1, 2, 3)`
- **Set**: Unordered, mutable, no duplicates. `{1, 2, 3}`
- **Dictionary**: Unordered, mutable, key-value pairs, no duplicate keys. `{1: 'a', 2: 'b'}`

**Use Cases:**
- **List**: When you need ordered collection that can be modified
- **Tuple**: When you need immutable ordered collection (keys in dict, return values)
- **Set**: When you need unique elements, fast membership testing
- **Dictionary**: When you need key-value mapping, fast lookups

**Example:**
```python
# List
my_list = [1, 2, 3]
my_list.append(4)  # [1, 2, 3, 4]

# Tuple
my_tuple = (1, 2, 3)
# my_tuple.append(4)  # Error: tuples are immutable

# Set
my_set = {1, 2, 3}
my_set.add(4)  # {1, 2, 3, 4}

# Dictionary
my_dict = {'a': 1, 'b': 2}
my_dict['c'] = 3  # {'a': 1, 'b': 2, 'c': 3}
```

### 2. What are mutable vs immutable types?
**Answer:**
- **Mutable**: Can be changed after creation (list, dict, set, custom classes)
- **Immutable**: Cannot be changed after creation (int, float, str, tuple, frozenset, bool)

**Why it matters:**
- Immutable types can be used as dictionary keys
- Immutable types are thread-safe
- Immutable types are hashable (can be used in sets)

**Example:**
```python
# Mutable - list
my_list = [1, 2, 3]
my_list[0] = 10  # [10, 2, 3] - Changed!

# Immutable - tuple
my_tuple = (1, 2, 3)
# my_tuple[0] = 10  # Error: 'tuple' object does not support item assignment

# Immutable - string
my_str = "hello"
# my_str[0] = 'H'  # Error: strings are immutable
my_str = "Hello"  # Creates new string object
```

### 3. What is `__init__` in Python classes?
**Answer:** `__init__` is a special method (constructor) that is automatically called when an object is instantiated. It initializes the object's attributes.

**Key Points:**
- Called automatically when object is created
- `self` refers to the instance being created
- Can take parameters to initialize attributes
- Not the same as constructor (that's `__new__`)

**Example:**
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("John", 30)  # __init__ called automatically
print(person.name)  # "John"
print(person.age)  # 30
```

### 4. What are decorators and when do you use them?
**Answer:** Decorators are functions that modify or extend the behavior of other functions without permanently modifying them. They use the `@decorator` syntax.

**Common Uses:**
- Logging
- Timing execution
- Authentication/Authorization
- Caching
- Input validation

**Example:**
```python
# Simple decorator
def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Output:
# Before function call
# Hello!
# After function call

# Decorator with parameters
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

slow_function()  # Prints: slow_function took 1.0 seconds
```

### 5. Explain shallow copy vs deep copy.
**Answer:**
- **Shallow Copy**: Creates new object but references same nested objects
- **Deep Copy**: Creates new object and recursively copies all nested objects

**Example:**
```python
import copy

original = [[1, 2, 3], [4, 5, 6]]

# Shallow copy
shallow = copy.copy(original)
shallow[0][0] = 999
print(original)  # [[999, 2, 3], [4, 5, 6]] - Changed!

# Deep copy
deep = copy.deepcopy(original)
deep[0][0] = 111
print(original)  # [[999, 2, 3], [4, 5, 6]] - Unchanged!
print(deep)  # [[111, 2, 3], [4, 5, 6]]
```

### 6. What is list comprehension?
**Answer:** List comprehension is a concise way to create lists. It's more readable and often faster than using loops.

**Syntax:** `[expression for item in iterable if condition]`

**Example:**
```python
# Traditional way
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]
```

### 7. What is PEP 8 and why does it matter?
**Answer:** PEP 8 is Python's official style guide. It provides conventions for writing readable, consistent code.

**Key Rules:**
- Use 4 spaces for indentation
- Maximum line length: 79 characters
- Use snake_case for function/variable names
- Use PascalCase for class names
- Use UPPERCASE for constants
- Import statements at top, separated by blank lines

**Why it matters:**
- Improves code readability
- Makes code consistent across projects
- Easier collaboration
- Industry standard

**Example:**
```python
# Good PEP 8 style
def calculate_total(items):
    """Calculate total price of items."""
    total = sum(item.price for item in items)
    return total

class ShoppingCart:
    MAX_ITEMS = 100  # Constant
    
    def __init__(self):
        self.items = []
```

### 8. Difference between `append()` and `extend()`?
**Answer:**
- **`append()`**: Adds single element to end of list
- **`extend()`**: Adds all elements from iterable to end of list

**Example:**
```python
my_list = [1, 2, 3]

# append() - adds entire element
my_list.append([4, 5])
print(my_list)  # [1, 2, 3, [4, 5]]

# extend() - adds individual elements
my_list = [1, 2, 3]
my_list.extend([4, 5])
print(my_list)  # [1, 2, 3, 4, 5]
```

### 9. How does Python handle memory management?
**Answer:** Python uses automatic memory management through reference counting and cyclic garbage collection.

**How it works:**
1. **Reference Counting**: Each object has a count of references. When count reaches 0, object is deleted.
2. **Garbage Collection**: Collects objects with circular references that reference counting can't handle.
3. **Memory Pool**: Uses memory pools for small objects to reduce allocation overhead.

**Example:**
```python
import sys

a = [1, 2, 3]
print(sys.getrefcount(a))  # Number of references

del a  # Reference count decreases, object may be deleted
```

### 10. What is `__str__` vs `__repr__`?
**Answer:**
- **`__str__`**: User-friendly string representation (for end users)
- **`__repr__`**: Unambiguous string representation (for developers, should be valid Python code)

**Key Points:**
- `str()` calls `__str__`, `repr()` calls `__repr__`
- If `__str__` not defined, falls back to `__repr__`
- `__repr__` should ideally return valid Python code that recreates the object

**Example:**
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"{self.name}, {self.age} years old"
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

person = Person("John", 30)
print(str(person))   # John, 30 years old
print(repr(person))  # Person('John', 30)
```

## Python Internals & Performance (16-25)

### 16. What is GIL (Global Interpreter Lock)?
**Answer:** GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously.

**Impact:**
- Only one thread executes Python code at a time
- Limits true parallelism for CPU-bound tasks
- I/O-bound tasks can still benefit from threading (due to GIL release during I/O)

**When to use:**
- **Threading**: For I/O-bound tasks (network requests, file I/O)
- **Multiprocessing**: For CPU-bound tasks (computation)

**Example:**
```python
# CPU-bound: Use multiprocessing
from multiprocessing import Process

def cpu_intensive():
    total = sum(range(10000000))

# I/O-bound: Use threading
from threading import Thread
import requests

def fetch_url(url):
    response = requests.get(url)
    return response.text
```

### 17. What's the difference between CPython vs PyPy?
**Answer:**
- **CPython**: Default, most common implementation. Written in C. More compatible.
- **PyPy**: Alternative implementation with JIT compiler. Faster for long-running programs.

**Comparison:**
- **Speed**: PyPy faster for CPU-intensive tasks
- **Compatibility**: CPython has better library support
- **Memory**: PyPy uses more memory
- **Startup**: CPython starts faster

**Use Cases:**
- **CPython**: Most cases, better compatibility
- **PyPy**: Long-running CPU-intensive applications

### 18. When to use generator vs list?
**Answer:**
- **Generator**: Use for large datasets, memory efficiency, lazy evaluation
- **List**: Use when you need random access, multiple iterations, small datasets

**Benefits of Generators:**
- Memory efficient (generates values on-the-fly)
- Faster for large datasets
- Lazy evaluation (computes only when needed)

**Example:**
```python
# List - stores all values in memory
squares_list = [x**2 for x in range(1000000)]  # Uses lots of memory

# Generator - generates on-demand
squares_gen = (x**2 for x in range(1000000))  # Memory efficient

# Generator function
def squares(n):
    for i in range(n):
        yield i**2
```

### 19. How do `yield` and generators work?
**Answer:** `yield` pauses function execution and returns a value. When function is called again, it resumes where it left off.

**Key Points:**
- Functions with `yield` are generators
- Generators return generator objects
- Values are generated lazily (on-demand)
- State is preserved between calls

**Example:**
```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

gen = fibonacci(10)
for num in gen:
    print(num)  # Prints: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

### 20. What is MRO (Method Resolution Order)?
**Answer:** MRO determines the order in which base classes are searched when executing a method. Uses C3 linearization algorithm.

**Example:**
```python
class A:
    def method(self):
        print("A")

class B(A):
    def method(self):
        print("B")

class C(A):
    def method(self):
        print("C")

class D(B, C):
    pass

print(D.__mro__)  # (<class '__main__.D'>, <class '__main__.B'>, 
                   #  <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

d = D()
d.method()  # "B" (searches in MRO order)
```

### 21. What is garbage collection in Python?
**Answer:** Python's garbage collector removes objects that are no longer referenced. Uses reference counting and cyclic garbage collection.

**How it works:**
1. **Reference Counting**: Deletes objects when reference count reaches 0
2. **Cyclic GC**: Handles circular references that reference counting can't handle
3. **Generational GC**: Groups objects by age, collects older generations less frequently

**Example:**
```python
import gc

# Circular reference
class Node:
    def __init__(self, value):
        self.value = value
        self.ref = None

a = Node(1)
b = Node(2)
a.ref = b
b.ref = a  # Circular reference

del a, b  # Objects still exist due to circular reference
gc.collect()  # Manually trigger garbage collection
```

### 22. How does Python manage threads vs processes?
**Answer:**
- **Threads**: Share same memory space, lightweight, GIL limits parallelism
- **Processes**: Separate memory spaces, heavier, true parallelism

**When to use:**
- **Threads**: I/O-bound tasks, shared data
- **Processes**: CPU-bound tasks, isolation needed

**Example:**
```python
# Threading
from threading import Thread

def task():
    print("Thread running")

thread = Thread(target=task)
thread.start()
thread.join()

# Multiprocessing
from multiprocessing import Process

def task():
    print("Process running")

process = Process(target=task)
process.start()
process.join()
```

### 23. What is recursion? Pros & cons?
**Answer:** Recursion is when a function calls itself.

**Pros:**
- Elegant for recursive problems (trees, graphs)
- Cleaner code for some problems
- Natural fit for divide-and-conquer

**Cons:**
- Can cause stack overflow
- More memory usage
- Can be slower than iteration
- Harder to debug

**Example:**
```python
# Recursive
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Iterative (often better)
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

## Python OOP / Advanced Concepts (26-30)

### 26. Difference between `classmethod`, `staticmethod`, and `instancemethod`?
**Answer:**
- **Instance Method**: Takes `self`, operates on instance
- **Class Method**: Takes `cls`, operates on class, can access class attributes
- **Static Method**: Takes neither, utility function, no access to instance or class

**Example:**
```python
class MyClass:
    class_var = 0
    
    def instance_method(self):
        return f"Instance: {self}"
    
    @classmethod
    def class_method(cls):
        return f"Class: {cls}, class_var: {cls.class_var}"
    
    @staticmethod
    def static_method(x, y):
        return x + y

obj = MyClass()
obj.instance_method()  # Needs instance
MyClass.class_method()  # Can call on class
MyClass.static_method(1, 2)  # Just a function
```

### 27. What are magic methods (dunder methods)?
**Answer:** Magic methods (special methods) have double underscores at start and end. They define how objects behave with built-in operations.

**Common Magic Methods:**
- `__init__`: Constructor
- `__str__`: String representation
- `__repr__`: Developer representation
- `__len__`: Length
- `__add__`: Addition (+)
- `__eq__`: Equality (==)
- `__getitem__`: Indexing ([])

**Example:**
```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Uses __add__
print(v3)  # Vector(4, 6) - uses __str__
```

### 28. What is dataclass and where do you use it?
**Answer:** `@dataclass` decorator automatically generates common methods for classes that mainly store data.

**What it generates:**
- `__init__`
- `__repr__`
- `__eq__`
- And more (with parameters)

**When to use:**
- Classes that mainly store data
- Reduce boilerplate code
- Quick data containers

**Example:**
```python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int
    
    # Automatically generates:
    # def __init__(self, x, y): ...
    # def __repr__(self): ...
    # def __eq__(self, other): ...

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)  # True (automatic __eq__)
```

## Async / Web (31-35)

### 31. What is `async` and `await`?
**Answer:** `async`/`await` syntax for asynchronous programming in Python. Allows writing asynchronous code that looks like synchronous code.

**Key Concepts:**
- `async def`: Defines coroutine function
- `await`: Pauses execution until awaitable completes
- `asyncio`: Library for async programming

**Example:**
```python
import asyncio

async def fetch_data():
    await asyncio.sleep(1)  # Simulate I/O
    return "data"

async def main():
    result = await fetch_data()
    print(result)

asyncio.run(main())
```

### 32. Difference between thread, coroutine, and process?
**Answer:**
- **Thread**: OS-level, preemptive multitasking, shares memory, GIL limits parallelism
- **Coroutine**: User-level, cooperative multitasking, shares memory, no GIL issue, lighter than threads
- **Process**: OS-level, separate memory, true parallelism, heavier

**When to use:**
- **Threads**: I/O-bound, simple parallel tasks
- **Coroutines**: I/O-bound, many concurrent operations
- **Processes**: CPU-bound, true parallelism needed

### 33. FastAPI vs Django — when to use which?
**Answer:**
- **FastAPI**: Modern, fast, async, API-first, automatic OpenAPI docs, type hints
- **Django**: Full-featured, mature, batteries-included, admin panel, ORM

**Use FastAPI when:**
- Building APIs (REST/GraphQL)
- Need high performance
- Want async support
- Prefer modern Python features

**Use Django when:**
- Building full web apps
- Need admin panel
- Want many built-in features
- Large, established project

### 34. What is request-response lifecycle in Django or FastAPI?
**Answer:**
- **Request received** → **Middleware** → **URL Routing** → **View/Endpoint** → **Response** → **Middleware** → **Client**

**Django:**
1. Request received
2. Middleware processing
3. URL resolver finds view
4. View processes request
5. Template rendering (if needed)
6. Response sent

**FastAPI:**
1. Request received
2. Route matching
3. Dependency injection
4. Endpoint execution
5. Response serialization
6. Response sent

## Real-World Python (36-40)

### 36. Why do we use virtual environments?
**Answer:** Virtual environments isolate project dependencies, preventing conflicts between projects.

**Benefits:**
- Isolate dependencies per project
- Avoid version conflicts
- Reproducible environments
- Clean installation

**Example:**
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install packages
pip install package_name

# Deactivate
deactivate
```
