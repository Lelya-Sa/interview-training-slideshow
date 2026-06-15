# Structural Design Patterns

## Purpose

Structural patterns deal with **how classes and objects are composed** into larger structures. They help you build systems from parts while keeping those parts **flexible, reusable, and easier to reason about**.

Use this category when:

- Two components have **incompatible interfaces** but must work together.
- You want to add behavior **without subclass explosion** or rewriting core types.
- A subsystem is **complex** and callers need a simpler entry point.
- You need to **control access** (lazy load, security, caching, remote proxy).
- Many objects share **repeated state** and memory matters.

**Interview one-liner:** Structural patterns answer *“How do we assemble objects and interfaces so the system stays clean and extensible?”*

---

## Pros

- **Integration without rewrites** — Adapter wraps legacy APIs instead of forking vendor code.
- **Open/Closed at composition time** — Decorator stacks behavior; new wrappers don’t change base class.
- **Simpler client code** — Facade hides dozens of subsystem calls behind one method.
- **Performance options** — Proxy, Flyweight, and caching wrappers optimize without leaking details.
- **Clear separation** — Bridge and Composite model hierarchies (abstraction vs implementation, tree structures).
- **Better maintainability** — changes stay localized to the wrapper or composite node.

## Cons

- **Layering complexity** — many wrappers (Decorator on Decorator) make debugging and stack traces harder.
- **Indirection overhead** — extra objects and method hops; usually small but worth noting in hot paths.
- **Misapplied Adapter** — patching bad design forever instead of fixing the boundary properly.
- **Facade as god object** — one class that knows everything about the subsystem becomes a maintenance bottleneck.
- **Flyweight trade-off** — shared intrinsic state requires careful thread safety and identity semantics.
- **Over-decoration** — behavior that belongs in domain logic gets hidden in decorators.

## Best practices

1. **Adapter for boundaries, not domain** — use at integration edges (third-party SDK, old API); don’t adapter your own clean internal model.
2. **Prefer composition over inheritance** — Decorator and Composite embody this; avoid deep inheritance trees.
3. **Keep Facades thin** — orchestrate and delegate; don’t embed business rules that belong in services.
4. **One responsibility per wrapper** — one Decorator for logging, another for retry; don’t combine unrelated concerns.
5. **Document decorator order** — if order matters (auth before cache), state it explicitly.
6. **Use Proxy deliberately** — distinguish Virtual (lazy), Protection (permissions), Remote (RPC), and Caching proxies in interviews.
7. **Composite: uniform interface** — leaf and composite should share the same component interface so clients stay simple.
8. **Flyweight only when measured** — profile first; premature sharing adds bugs for marginal gain.

---

## Patterns in this category (GoF + commonly used)

| Pattern | One-line purpose | Typical use |
|--------|-------------------|-------------|
| **Adapter** | Convert one interface to another | Legacy API, third-party SDK, JSON ↔ domain model |
| **Decorator** | Add behavior dynamically around an object | Logging, retry, metrics middleware, stream wrappers |
| **Facade** | Simple API over complex subsystem | `OrderFacade.placeOrder()` vs 10 internal services |
| **Proxy** | Stand-in controlling access to real object | Lazy load, access control, remote stub, cache |
| **Bridge** | Split abstraction from implementation | Cross-platform drivers (UI ↔ OS rendering) |
| **Composite** | Tree of parts and wholes, same interface | UI components, org charts, file systems |
| **Flyweight** | Share intrinsic state across many instances | Text glyphs, game tiles, icon pools |
| **Module / Facade module** | Export curated public API from a package | `index.ts` re-exports, barrel files |
| **Wrapper / Delegation** | Forward calls to inner object | General technique; Adapter and Decorator specialize it |
| **Private Class Data** | Restrict direct field access | Immutability, controlled mutation |
| **Twin** | Simulate multiple inheritance with two linked objects | Rare; language-limit workaround |
| **Marker interface** | Tag type with no methods | `Serializable` — less common in modern typed APIs |
| **Extension object** | Attach extra behavior/data externally | Alternative to subclassing in some frameworks |

### Patterns covered in this repo

| Pattern | Study path |
|---------|------------|
| Adapter | [`adapter/README.md`](./adapter/README.md) · [`adapter/questions.md`](./adapter/questions.md) |

### Related patterns worth knowing (not yet a dedicated folder)

- **Decorator** — ASP.NET Core middleware pipeline is a chain of decorators around the request delegate.
- **Facade** — Service layer orchestrating repositories + messaging + billing.
- **Proxy** — EF Core lazy loading proxies, gRPC client stubs, `HttpClient` with Polly policies.
- **Composite** — React component trees, DOM nodes, menu hierarchies.
- **Flyweight** — string interning, shared immutable config blobs.

---

## When to choose which

| Situation | Prefer |
|-----------|--------|
| Existing class, wrong interface | **Adapter** |
| Add behavior without subclassing | **Decorator** |
| Subsystem too noisy for clients | **Facade** |
| Control access, lazy load, or remote call | **Proxy** |
| Two dimensions vary independently (UI × OS) | **Bridge** |
| Part-whole hierarchies | **Composite** |
| Huge count of similar objects | **Flyweight** |

---

## Decorator vs Proxy vs Adapter (interview classic)

| | **Adapter** | **Decorator** | **Proxy** |
|---|-------------|---------------|-----------|
| **Intent** | Make incompatible interfaces work | Add responsibilities | Control access to subject |
| **Interface** | Often different from adaptee | Same as wrapped object | Same as real subject |
| **Focus** | Translation | Enhancement (stackable) | Lifecycle / access / location |
| **Example** | Wrap Stripe SDK to your `IPaymentGateway` | Add logging around `IRepository` | Lazy-load expensive graph |

---

## Common interview mistakes

- Calling every wrapper an “Adapter” — if interfaces already match and you add behavior, it’s **Decorator**.
- Using inheritance for every new feature — leads to combinatorial subclasses (`LoggedCachingSecureRepository…`).
- Facade that becomes the only class anyone tests — split orchestration from domain rules.
- Ignoring **object identity** with Flyweight — extrinsic vs intrinsic state must be separated.

---

## Quick comparison

```
Adapter    → "I need this to look like that interface"
Decorator  → "Same object, extra behavior, stackable"
Facade     → "One door into a messy subsystem"
Proxy      → "Stand in; maybe lazy, remote, or guarded"
Bridge     → "Abstraction and implementation vary separately"
Composite  → "Treat one item and a group the same way"
Flyweight  → "Share the heavy parts, keep the light parts local"
```
