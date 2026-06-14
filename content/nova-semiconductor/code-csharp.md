### 53) async and await Fundamentals
**Theory:** `async/await` composes asynchronous operations without blocking threads.
**Answer:** Mark method `async`, await I/O-bound tasks, and return `Task`/`Task<T>`.
**Explanation:** Await yields control until completion, improving scalability under load.
```csharp
public async Task<string> LoadAsync(HttpClient client, string url) {
    var json = await client.GetStringAsync(url);
    return json;
}
```

### 54) IDisposable and using Pattern
**Theory:** Managed objects may wrap unmanaged resources that need deterministic cleanup.
**Answer:** Implement `IDisposable` and dispose via `using` / `await using`.
**Explanation:** This prevents handle leaks for streams, connections, and similar resources.
```csharp
using var stream = File.OpenRead("input.txt");
using var reader = new StreamReader(stream);
string text = reader.ReadToEnd();
```

### 55) IEnumerable vs IQueryable
**Theory:** `IEnumerable` executes in memory; `IQueryable` builds remote query expressions.
**Answer:** Use `IQueryable` for database-side filtering before materialization.
**Explanation:** Premature `ToList()` can pull too much data and hurt performance.
```csharp
IQueryable<User> q = db.Users.Where(u => u.IsActive);
List<User> top = await q.Take(100).ToListAsync();
```

### 56) LINQ Deferred Execution
**Theory:** Most LINQ operators are lazily evaluated until enumeration.
**Answer:** Query definition does not run until `foreach`, `ToList`, `Count`, etc.
**Explanation:** Deferred execution enables composition but can repeat expensive operations.
```csharp
var query = numbers.Where(n => n % 2 == 0); // not executed yet
var list = query.ToList();                   // executes now
```

### 57) StringBuilder vs String Concatenation
**Theory:** Strings are immutable; repeated concatenation creates many temporary allocations.
**Answer:** Use `StringBuilder` for loops or heavy incremental text creation.
**Explanation:** This reduces GC pressure and improves performance.
```csharp
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++) sb.Append(i).Append(',');
string result = sb.ToString();
```

### 58) ref vs out Parameters
**Theory:** Both pass by reference, but `out` requires assignment before method returns.
**Answer:** Use `ref` for read/write existing value, `out` for extra return values.
**Explanation:** API intent is clearer when `out` communicates "must be produced."
```csharp
public void Update(ref int x, out int doubled) { x += 1; doubled = x * 2; }
```

### 59) Generics for Type Safety
**Theory:** Generics enable reusable code while preserving compile-time type checking.
**Answer:** Define type parameters on classes and methods to avoid casting.
**Explanation:** Generic code is safer and often faster than object-based alternatives.
```csharp
public class Repository<T> where T : class {
    public T? FindById(int id) => default;
}
```

### 60) virtual and override Behavior
**Theory:** Polymorphism in C# uses virtual dispatch through `virtual` and `override`.
**Answer:** Base methods marked virtual can be specialized in derived classes.
**Explanation:** Runtime chooses override implementation based on actual object type.
```csharp
public class Animal { public virtual string Speak() => "sound"; }
public class Dog : Animal { public override string Speak() => "woof"; }
```

### 61) Interface vs Abstract Class
**Theory:** Interfaces define contracts; abstract classes can provide shared state and default logic.
**Answer:** Prefer interfaces for capabilities, abstract classes for common base behavior.
**Explanation:** Choosing correctly keeps architecture flexible and testable.
```csharp
public interface INotifier { Task SendAsync(string msg); }
public abstract class NotifierBase : INotifier { public abstract Task SendAsync(string msg); }
```

### 62) Dependency Injection Basics
**Theory:** DI decouples object creation from usage, enabling easier testing and modularity.
**Answer:** Register services in container and request them through constructor injection.
**Explanation:** Replacing implementations becomes configuration instead of code change.
```csharp
services.AddScoped<IOrderService, OrderService>();
public class OrdersController(IOrderService service) { /* use service */ }
```

### 63) Exception Handling Best Practices
**Theory:** Exceptions should signal exceptional failures, not normal control flow.
**Answer:** Catch specific exceptions, add context, and rethrow preserving stack when needed.
**Explanation:** Overly broad catches hide defects and complicate debugging.
```csharp
try { Save(data); }
catch (IOException ex) { throw new InvalidOperationException("Failed to persist order", ex); }
```

### 64) Nullable Reference Types
**Theory:** NRT adds compile-time nullability annotations to reduce null-reference bugs.
**Answer:** Enable nullable context and annotate optional values with `?`.
**Explanation:** Compiler warnings guide safer APIs and null checks.
```csharp
#nullable enable
public string FormatName(User? user) => user?.Name ?? "Unknown";
```

### 65) Record Types for Value Semantics
**Theory:** Records provide concise immutable data models with value-based equality.
**Answer:** Use `record` for DTO-like types and non-destructive updates with `with`.
**Explanation:** This reduces boilerplate and accidental mutation.
```csharp
public record Device(string Id, string Status);
var updated = oldDevice with { Status = "Ready" };
```

### 66) struct vs class Trade-Offs
**Theory:** `struct` is value type (copied by value), `class` is reference type (heap object).
**Answer:** Use small immutable structs for hot-path value data; classes for rich mutable entities.
**Explanation:** Wrong choice can cause copying overhead or excessive allocations.
```csharp
public readonly struct Point(int X, int Y);
public class Order { public int Id { get; set; } }
```

### 67) Pattern Matching in switch
**Theory:** Modern C# pattern matching improves readability over nested type checks.
**Answer:** Use `switch` expressions with type and property patterns.
**Explanation:** This keeps branching declarative and safer.
```csharp
string Describe(object o) => o switch {
    int n when n > 0 => "positive int",
    string s => $"text:{s}",
    _ => "unknown"
};
```

### 68) Extension Methods Usage
**Theory:** Extension methods add fluent APIs without modifying original types.
**Answer:** Define static method in static class with `this` on first parameter.
**Explanation:** Useful for reusable helper behavior across projects.
```csharp
public static class StringExt {
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
```

### 69) Delegates and Events
**Theory:** Delegates represent function references; events provide publish-subscribe encapsulation.
**Answer:** Expose event in publisher and subscribe handlers in consumers.
**Explanation:** Events decouple components for notifications.
```csharp
public class Sensor {
    public event EventHandler<int>? ValueChanged;
    public void Update(int value) => ValueChanged?.Invoke(this, value);
}
```

### 70) Task.WhenAll for Concurrency
**Theory:** Independent async operations should run concurrently rather than sequentially.
**Answer:** Start tasks first, then await `Task.WhenAll`.
**Explanation:** End-to-end latency becomes roughly max(single task) instead of sum.
```csharp
var t1 = api.GetAAsync();
var t2 = api.GetBAsync();
await Task.WhenAll(t1, t2);
```

### 71) ConfigureAwait Usage Guidance
**Theory:** `ConfigureAwait(false)` avoids resuming on captured context.
**Answer:** In library/backend code, prefer `false`; in UI code, resume context when needed.
**Explanation:** This can reduce deadlock risk and context-switch overhead.
```csharp
public async Task<string> FetchAsync(HttpClient c, string u) =>
    await c.GetStringAsync(u).ConfigureAwait(false);
```

### 72) Span Basics for Performance
**Theory:** `Span<T>` enables slicing contiguous memory without allocations.
**Answer:** Use spans for parsing/manipulating arrays and strings in hot paths.
**Explanation:** Spans are stack-only (`ref struct`) and cannot escape scope.
```csharp
ReadOnlySpan<char> s = "A,B,C".AsSpan();
int comma = s.IndexOf(',');
ReadOnlySpan<char> first = s[..comma];
```

### 73) xUnit Unit Test Structure
**Theory:** Reliable tests should isolate behavior and assert one clear outcome.
**Answer:** Use `[Fact]` for single scenario and expressive assertions.
**Explanation:** Deterministic tests support CI and safer refactoring.
```csharp
public class MathTests {
    [Fact] public void Add_ReturnsSum() => Assert.Equal(5, 2 + 3);
}
```

### 74) ILogger and IOptions in ASP.NET Core
**Theory:** `ILogger<T>` standardizes observability; `IOptions<T>` centralizes typed config.
**Answer:** Inject both via constructor and validate options at startup.
**Explanation:** This keeps configuration explicit and logs structured for operations.
```csharp
public class Worker(ILogger<Worker> log, IOptions<AppSettings> opt) {
    public void Run() => log.LogInformation("Region: {Region}", opt.Value.Region);
}
```
