# Creational Design Patterns

## Purpose

Creational patterns deal with **how objects are created**. They hide construction details from the code that uses the objects, so callers depend on **interfaces or abstractions** instead of concrete classes.

Use this category when:

- Object creation is **complex** (many parameters, optional steps, or platform-specific types).
- You want **one place** to change which concrete type gets built.
- You need to enforce **controlled instantiation** (single instance, pooled instances, or cloned copies).
- Construction logic would otherwise be **scattered** across the codebase (`new` everywhere).

**Interview one-liner:** Creational patterns answer *“Who creates this object, and how do we keep that decision flexible?”*

---

## Pros

- **Decouples** business logic from concrete classes — easier to swap implementations (e.g. MySQL vs PostgreSQL factory).
- **Centralizes** creation rules — validation, defaults, and wiring live in one place.
- **Supports Open/Closed Principle** — add new product types without rewriting every caller (especially Factory Method / Abstract Factory).
- **Hides complexity** — Builder and Abstract Factory tame large constructor parameter lists and product families.
- **Improves testability** — inject factories or builders with test doubles instead of hard-coded `new`.
- **Controls lifecycle** — Singleton, Object Pool, and Prototype manage *how many* instances exist and *when* they are created.

## Cons

- **Extra indirection** — more classes and interfaces; simple `new Foo()` is clearer for trivial cases.
- **Over-engineering risk** — a three-line constructor does not need Abstract Factory.
- **Singleton abuse** — global state, hidden dependencies, and hard-to-test code.
- **Factory proliferation** — too many small factory classes without clear boundaries confuse teams.
- **Runtime vs compile-time safety** — string-based or config-driven factories can fail late if misconfigured.
- **Learning curve** — juniors may not recognize which creational pattern fits without practice.

## Best practices

1. **Start with the simplest option** — constructor or static factory method (`CreateFromJson`) before full Abstract Factory.
2. **Prefer dependency injection** over hand-rolled Singleton for shared services in modern apps (.NET `AddSingleton`, Spring beans).
3. **Program to an interface** — factories should return `IConnection`, `INotifier`, not concrete types at call sites.
4. **Keep factories focused** — one factory (or one factory method family) per variation axis (DB type, payment provider), not one god-factory.
5. **Make invalid states unbuildable** — Builder validates before `Build()`; fail fast with clear errors.
6. **Avoid Singleton for testability** — if you need one instance, let the **container** manage lifetime; inject `ILogger`, don’t call `Logger.Instance`.
7. **Document when to extend** — team should know whether to add a new subclass (Factory Method) or a new factory (Abstract Factory).
8. **Name intent clearly** — `ConnectionFactory`, `EmailNotificationBuilder`, not vague `Manager` / `Helper`.

---

## Patterns in this category (GoF + commonly used)

| Pattern | One-line purpose | Typical use |
|--------|-------------------|-------------|
| **Singleton** | Exactly one instance + global access | Legacy config/logger; prefer DI in new code |
| **Factory Method** | Subclass decides which concrete product to create | Framework hooks, document exporters |
| **Abstract Factory** | Create **families** of related products (UI kit, DB + repo + cache) | Cross-platform UI, multi-vendor integrations |
| **Builder** | Step-by-step construction of complex objects | HTTP requests, SQL queries, config objects |
| **Prototype** | Clone existing instance instead of rebuilding | Expensive object copy, game entities, deep clone |
| **Simple Factory** | One class with a method that returns types by parameter | Quick decoupling; not GoF but very common |
| **Object Pool** | Reuse pre-created instances (connections, threads) | DB pools, `ArrayPool<T>`, game bullet pools |
| **Dependency Injection** | Container creates and wires dependencies | ASP.NET Core, Spring — default in modern backends |
| **Service Locator** | Central registry resolves services by name | Legacy; generally prefer constructor injection |
| **Multiton** | One instance **per key** (e.g. per tenant) | Multi-tenant config caches |
| **Lazy Initialization** | Defer creation until first use | Heavy resources, on-demand caches |
| **Static Factory Method** | Named constructors on the type itself | `DateTime.FromUnixTime`, `Task.FromResult` |

### Patterns covered in this repo

| Pattern | Study path |
|---------|------------|
| Singleton | [`singleton/README.md`](./singleton/README.md) · [`singleton/questions.md`](./singleton/questions.md) |
| Factory | [`factory/README.md`](./factory/README.md) · [`factory/questions.md`](./factory/questions.md) |

### Related patterns worth knowing (not yet a dedicated folder)

- **Abstract Factory** — extends Factory; interview favorite for “Windows vs Mac UI components.”
- **Builder** — pairs well with Factory when objects have many optional fields.
- **Prototype** — `ICloneable` / copy constructors; watch shallow vs deep copy.
- **Object Pool** — .NET `Microsoft.Extensions.ObjectPool`, JDBC connection pools.

---

## When to choose which

| Situation | Prefer |
|-----------|--------|
| One shared instance, container-managed | **DI singleton scope**, not static Singleton |
| Caller shouldn’t know concrete class | **Factory Method** or **Simple Factory** |
| Whole product **family** must match | **Abstract Factory** |
| Many optional parameters / validation steps | **Builder** |
| Copy is cheaper than rebuild | **Prototype** |
| Creation cost high, reuse safe | **Object Pool** |

---

## Common interview mistakes

- Calling everything a “Factory” when it’s just a switch on a string.
- Using Singleton for database connections instead of **pooling** + DI.
- Abstract Factory for a single optional field — use Builder or optional parameters.
- Forgetting **thread safety** when lazy Singleton is used in multi-threaded apps.

---

## Quick comparison

```
Simple Factory     → one place, one method, returns products
Factory Method     → subclass overrides creation hook
Abstract Factory   → factory of factories (related products)
Builder            → same product, many construction steps
Prototype          → clone existing product
Singleton          → one instance (use sparingly)
```
