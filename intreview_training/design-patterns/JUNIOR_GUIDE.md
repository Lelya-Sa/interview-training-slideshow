# Design Patterns - Junior Interview Guide

## 🎯 For Junior Developers

This guide helps you prepare for design pattern questions in junior-level interviews. Focus on understanding the basics first!

## 📚 Start Here: Top 5 Patterns for Juniors

These are the **most commonly asked** patterns in junior interviews:

### 1. Singleton ⭐⭐⭐⭐⭐
**Why it's important:** Very common, easy to understand, frequently used in real projects.

**What to know:**
- ✅ What it does: Ensures only one instance exists
- ✅ When to use: Database connections, loggers
- ✅ Basic implementation in your language
- ✅ Why it can be problematic (testing, global state)

**Study time:** 1-2 hours

### 2. Factory ⭐⭐⭐⭐⭐
**Why it's important:** Very common, shows understanding of object creation.

**What to know:**
- ✅ What it does: Creates objects without knowing exact class
- ✅ When to use: Database connections, payment processors
- ✅ Simple factory implementation
- ✅ Difference from just using `new`

**Study time:** 1-2 hours

### 3. Observer ⭐⭐⭐⭐⭐
**Why it's important:** Used everywhere (React, events, state management).

**What to know:**
- ✅ What it does: Notifies multiple objects about changes
- ✅ When to use: Event handling, state management
- ✅ Basic implementation
- ✅ How it's used in React/JavaScript

**Study time:** 1-2 hours

### 4. Strategy ⭐⭐⭐⭐
**Why it's important:** Shows you can avoid if/else statements, very practical.

**What to know:**
- ✅ What it does: Different algorithms, choose at runtime
- ✅ When to use: Payment methods, sorting, validation
- ✅ Basic implementation
- ✅ How it eliminates conditional statements

**Study time:** 1-2 hours

### 5. Adapter ⭐⭐⭐⭐
**Why it's important:** Common in real projects when integrating libraries.

**What to know:**
- ✅ What it does: Makes incompatible interfaces work together
- ✅ When to use: Third-party libraries, legacy code
- ✅ Basic implementation
- ✅ Real-world example (payment gateways)

**Study time:** 1 hour

## 📖 Study Plan (1-2 Weeks)

### Week 1: Core Patterns
- **Day 1-2**: Singleton (read README, study code, answer questions)
- **Day 3-4**: Factory (read README, study code, answer questions)
- **Day 5**: Observer (read README, study code, answer questions)

### Week 2: Additional Patterns
- **Day 1-2**: Strategy (read README, study code, answer questions)
- **Day 3**: Adapter (read README, study code, answer questions)
- **Day 4-5**: Review all patterns, practice implementations

## 🎓 What Interviewers Expect from Juniors

### ✅ You Should Know:
1. **What the pattern does** (simple explanation)
2. **When to use it** (common use cases)
3. **Basic implementation** (can write simple version)
4. **Real-world example** (where you've seen it or would use it)

### ❌ You DON'T Need to Know (for junior level):
- All implementation variations
- Advanced optimizations
- All related patterns
- Complex edge cases

## 💡 Common Interview Questions for Juniors

### Question 1: "Explain Singleton pattern"
**Good Answer:**
> "Singleton ensures only one instance of a class exists. For example, a database connection - you only want one connection pool, not multiple. You make the constructor private and provide a static method to get the instance."

**What to avoid:**
- Over-complicating the explanation
- Going into thread-safety details (unless asked)
- Saying it's always good (mention testing challenges)

### Question 2: "When would you use Factory pattern?"
**Good Answer:**
> "When you need to create objects but don't know the exact type at compile time. Like creating database connections - you might need MySQL, PostgreSQL, or MongoDB based on configuration. Factory handles the creation logic so your code doesn't need to know which specific class to instantiate."

**What to avoid:**
- Saying "whenever you create objects" (too broad)
- Not giving a concrete example

### Question 3: "What's the difference between Factory and just using `new`?"
**Good Answer:**
> "With `new`, you must know the exact class. With Factory, the factory decides which class to create based on parameters. This decouples your code from specific classes and makes it easier to add new types later."

**What to avoid:**
- Saying Factory is always better (it's not)
- Not explaining the decoupling benefit

## 🛠️ Practice Exercises

### Exercise 1: Implement Singleton
**Task:** Create a Logger class that's a Singleton.

**Hints:**
- Private constructor
- Static getInstance() method
- Store instance in static variable

### Exercise 2: Implement Simple Factory
**Task:** Create a ShapeFactory that creates Circle, Square, or Rectangle based on type string.

**Hints:**
- Factory class with static create() method
- Switch/if statement to choose type
- Return appropriate shape object

### Exercise 3: Implement Observer
**Task:** Create a NewsPublisher that notifies subscribers when news is published.

**Hints:**
- Publisher maintains list of subscribers
- Subscribers have update() method
- Publisher calls update() on all subscribers

## 📝 Quick Reference

### Singleton
```javascript
class Singleton {
    static instance = null;
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### Factory
```javascript
class Factory {
    static create(type) {
        if (type === 'A') return new ProductA();
        if (type === 'B') return new ProductB();
    }
}
```

### Observer
```javascript
class Subject {
    observers = [];
    attach(observer) { this.observers.push(observer); }
    notify() { this.observers.forEach(o => o.update()); }
}
```

## 🎯 Interview Tips

1. **Start Simple**: Give a simple explanation first, then add details if asked
2. **Use Examples**: Always give a real-world example
3. **Be Honest**: If you don't know, say so, but show you understand the concept
4. **Show Understanding**: Explain WHY you'd use it, not just WHAT it is
5. **Practice Coding**: Be able to write basic implementation on whiteboard

## ❓ What If You Don't Know a Pattern?

**Good Response:**
> "I'm not familiar with that specific pattern, but based on the name, it sounds like it might be used for [your guess]. Could you explain it, or would you like me to think through how I might approach that problem?"

**What to avoid:**
- Making up an answer
- Saying "I don't know" and stopping
- Getting flustered

## 📚 Additional Resources

1. **Read the README files** - They have clear explanations
2. **Study the code** - See how patterns are implemented
3. **Answer the questions** - Test your understanding
4. **Practice coding** - Implement from memory

## ✅ Checklist Before Interview

- [ ] Can explain Singleton in 30 seconds
- [ ] Can explain Factory in 30 seconds
- [ ] Can explain Observer in 30 seconds
- [ ] Can write basic Singleton implementation
- [ ] Can write basic Factory implementation
- [ ] Know at least one real-world example for each
- [ ] Understand when NOT to use each pattern
- [ ] Can answer basic questions about each pattern

## 🚀 Next Steps After Learning Basics

Once you're comfortable with the top 5:
1. Learn Decorator pattern
2. Learn Command pattern
3. Learn Builder pattern
4. Understand pattern relationships
5. Study real-world usage in frameworks

## 💪 Remember

- **Patterns are tools**, not rules
- **Understanding > Memorization**
- **Simple solutions are often better**
- **Real experience matters more than pattern knowledge**

Good luck with your interviews! 🎉
