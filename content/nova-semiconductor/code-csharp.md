# Nova Semiconductor — C# Language & .NET (Code)

Covers: **async/await**, **IDisposable**, **LINQ & deferred execution**, **generics & OOP**, **DI**, **exceptions**, **nullable types**, **records & structs**, **pattern matching**, **delegates/events**, **Task composition**, **Span**, **testing**, and **ASP.NET Core** idioms — interview-depth Theory / Answer / Explanation / code.

### 53) **async and await** fundamentals
**Theory:** `async`/`await` is **cooperative multitasking** for I/O-bound work: the thread is released while waiting, so one thread can serve many requests. It does **not** create a new OS thread per `await`.
**Answer:** Mark the method `async`; return `Task` or `Task<T>` (or `ValueTask<T>` for hot paths). `await` the asynchronous operation; compiler rewrites the method into a state machine. Use `async` all the way up the call stack for I/O (HTTP, DB, file).
**Explanation:** **Never** block with `.Result` or `.Wait()` on async code—classic deadlock on UI/ASP.NET sync context. CPU-bound work: `await Task.Run(() => ...)` or `Parallel` (see Threading pack). Follow-up: cancellation via `CancellationToken`, `IAsyncEnumerable<T>` for streaming.
```csharp
public async Task<string> LoadDeviceConfigAsync(
    HttpClient client, string url, CancellationToken ct = default) {
    using var response = await client.GetAsync(url, ct);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync(ct);
}
```

### 54) **IDisposable** and the `using` pattern
**Theory:** Managed wrappers (files, sockets, DB connections) hold **unmanaged** or scarce resources. GC is non-deterministic—`Dispose` releases promptly.
**Answer:** Implement `IDisposable.Dispose()` to release handles. Call via `using` declaration (`using var x = ...`) or `using (...) { }`. For async I/O, implement `IAsyncDisposable` and `await using`. In DI, register `IDisposable`/`IAsyncDisposable` services so the container disposes on scope end.
**Explanation:** Finalizers are a last resort—prefer explicit dispose. **Do not** dispose objects you do not own unless documented. Double-dispose should be safe (`_disposed` flag). Follow-up: `HttpClient` lifetime—prefer `IHttpClientFactory`, not `new HttpClient()` per request.
```csharp
public sealed class LogReader : IDisposable {
    private readonly StreamReader _reader;
    private bool _disposed;

    public LogReader(string path) =>
        _reader = new StreamReader(File.OpenRead(path));

    public string? ReadLine() => _disposed ? throw new ObjectDisposedException(nameof(LogReader)) : _reader.ReadLine();

    public void Dispose() {
        if (_disposed) return;
        _reader.Dispose();
        _disposed = true;
    }
}

// usage
using var log = new LogReader("equipment.log");
while (log.ReadLine() is { } line) Console.WriteLine(line);
```

### 55) **IEnumerable** vs **IQueryable**
**Theory:** `IEnumerable<T>` runs **in memory** (LINQ to Objects). `IQueryable<T>` builds an **expression tree** executed by a provider (e.g. EF Core → SQL on the server).
**Answer:** Use `IQueryable` for database queries so `Where`, `Select`, `Take` translate to SQL. Use `IEnumerable` after materialization or for in-memory collections. **Premature** `ToList()`/`AsEnumerable()` pulls data client-side and kills performance.
**Explanation:** Interview trap: `IQueryable` still defers until enumeration—but the provider may differ from in-memory LINQ semantics (null handling, client eval warnings). Follow-up: `IAsyncEnumerable<T>` for streaming DB rows; `AsNoTracking()` for read-only queries.
```csharp
// Good: filter and page in SQL
IQueryable<Lot> query = db.Lots.Where(l => l.Yield < 95.0);
List<Lot> page = await query.OrderBy(l => l.Id).Take(100).ToListAsync();

// Bad: loads entire table then filters in memory
List<Lot> bad = db.Lots.ToList().Where(l => l.Yield < 95.0).ToList();
```

### 56) **LINQ deferred execution** and the multiple-enumeration trap
**Theory:** Most LINQ operators (`Where`, `Select`, `OrderBy`) return **lazy** sequences—the query runs only when you **enumerate** (`foreach`, `ToList`, `Count`, `First`).
**Answer:** Defining `var q = items.Where(...)` does not execute. Each full enumeration re-runs the pipeline unless materialized with `ToList()`/`ToArray()`. Side effects in lambdas may run multiple times if you enumerate twice.
**Explanation:** `Count()` on `IQueryable` may translate to `SELECT COUNT(*)`; on deferred `IEnumerable` it walks the sequence. **yield return** in custom iterators is the same lazy model. Follow-up: `AsEnumerable()` forces LINQ-to-Objects after an `IQueryable` step.
```csharp
var numbers = new[] { 1, 2, 3, 4, 5 };
var evens = numbers.Where(n => { Console.Write(n); return n % 2 == 0; });
// nothing printed yet
var list = evens.ToList();   // prints 12345 once
var count = evens.Count();   // prints 12345 AGAIN — surprise allocation/work
// fix: var materialized = evens.ToList(); then reuse materialized
```

### 57) **`string` vs `StringBuilder`**
**Theory:** `string` is **immutable**—each `+` or interpolation in a loop creates a new object on the heap.
**Answer:** Use `StringBuilder` for repeated concatenation in loops or large incremental builds. For few parts, `$"{a}{b}{c}"` or `string.Join` is fine and readable.
**Explanation:** `StringBuilder` amortizes buffer growth; still call `ToString()` once at the end. In modern .NET, `string.Create` and `Span<char>` help hot paths. Wrong: `sb += x` in a loop on a string. Follow-up: culture/invariant formatting for logs and exports.
```csharp
var sb = new StringBuilder(capacity: 4096);
for (int i = 0; i < readings.Length; i++) {
    if (i > 0) sb.Append(',');
    sb.Append(readings[i].ToString("F2", CultureInfo.InvariantCulture));
}
string csv = sb.ToString();
```

### 58) **`ref`**, **`out`**, and **`in`** parameters
**Theory:** Value types are copied by default. `ref`/`out`/`in` pass **by reference** (aliases to the caller's storage).
**Answer:** **`ref`**: must be assigned before call; read/write inside method. **`out`**: caller need not initialize; callee **must** assign before return—signals extra outputs. **`in`**: read-only ref for large structs (avoid copy, prevent mutation).
**Explanation:** `out` improves `TryParse` patterns: `bool TryRead(out int value)`. `in` for `ReadOnlySpan`-like big structs. Cannot use `ref`/`out` on properties without special support. Follow-up: `ref return` for slicing into arrays when safe.
```csharp
public bool TryDivide(int a, int b, out int quotient, out int remainder) {
    if (b == 0) { quotient = remainder = 0; return false; }
    quotient = a / b;
    remainder = a % b;
    return true;
}

public void Bump(ref int counter) => counter++;

public static double Distance(in Point3D a, in Point3D b) =>
    Math.Sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
```

### 59) **Generics** and constraints
**Theory:** Generics provide **type-safe** reusable code without boxing value types or casting from `object`.
**Answer:** Declare type parameters on classes/methods: `Repository<T> where T : class, IEntity, new()`. Constraints: `class`, `struct`, `unmanaged`, `notnull`, base class, interface, `new()`.
**Explanation:** `List<int>` avoids boxing vs `ArrayList`. Generic variance: `IEnumerable<out T>`, `Action<in T>`. Wrong: generic exceptions or generic enums (not allowed). Follow-up: `default(T)` behavior for structs vs classes.
```csharp
public interface IRepository<T> where T : class, IAuditable {
    Task<T?> FindAsync(int id, CancellationToken ct = default);
    Task AddAsync(T entity, CancellationToken ct = default);
}

public class EfRepository<T> : IRepository<T> where T : class, IAuditable {
    private readonly DbContext _db;
    public EfRepository(DbContext db) => _db = db;
    public Task<T?> FindAsync(int id, CancellationToken ct = default) =>
        _db.Set<T>().FirstOrDefaultAsync(e => e.Id == id, ct);
    public async Task AddAsync(T entity, CancellationToken ct = default) {
        _db.Set<T>().Add(entity);
        await _db.SaveChangesAsync(ct);
    }
}
```

### 60) **`virtual`**, **`override`**, and **`sealed`**
**Theory:** Polymorphism: runtime dispatches to the **actual** type's `override`. Without `virtual`, calls are static (compile-time) on the reference type.
**Answer:** Base marks method `virtual`; derived uses `override`. `sealed override` stops further overriding. `new` **hides** base member without polymorphism—avoid unless intentional.
**Explanation:** Default in C# is non-virtual (unlike Java)—design for override explicitly. Abstract methods in abstract classes force derived implementation. Follow-up: performance—virtual calls have tiny indirection cost; JIT may devirtualize sealed types.
```csharp
public abstract class EquipmentBase {
    public virtual string StatusDescription() => "Unknown";
    public abstract void Calibrate();
}

public sealed class ProbeStation : EquipmentBase {
    public override string StatusDescription() => "Probe station ready";
    public override void Calibrate() { /* send SCPI commands */ }
}

EquipmentBase eq = new ProbeStation();
Console.WriteLine(eq.StatusDescription()); // "Probe station ready" — virtual dispatch
```

### 61) **Interface** vs **abstract class**
**Theory:** Both enable polymorphism. **Interface** = capability contract (no state by default). **Abstract class** = shared base with optional default implementation and protected helpers.
**Answer:** Prefer **interfaces** for DI and multiple capabilities (`IDisposable`, `ILogger`). Use **abstract class** when subclasses share fields, protected template methods, or non-public helpers. C# allows **default interface methods** (use sparingly).
**Explanation:** "Program to an interface, not an implementation." Abstract class locks single inheritance; interfaces allow multiple. Follow-up: interface segregation—small focused interfaces beat `IGodService`.
```csharp
public interface IYieldExporter {
    Task ExportAsync(string lotId, CancellationToken ct = default);
}

public abstract class ExporterBase : IYieldExporter {
    protected readonly ILogger Logger;
    protected ExporterBase(ILogger logger) => Logger = logger;
    public async Task ExportAsync(string lotId, CancellationToken ct = default) {
        Logger.LogInformation("Exporting lot {LotId}", lotId);
        await WriteAsync(lotId, ct);
    }
    protected abstract Task WriteAsync(string lotId, CancellationToken ct);
}
```

### 62) **Dependency Injection** and service lifetimes
**Theory:** DI inverts control: objects receive dependencies via constructor instead of `new`-ing concrete types—enables testing and swapping implementations.
**Answer:** Register in `Program.cs` / `Startup`: `AddSingleton`, `AddScoped`, `AddTransient`. **Singleton**—one instance per app. **Scoped**—one per HTTP request/scope. **Transient**—new each resolve. Inject via primary constructor or explicit ctor parameters.
**Explanation:** Captive dependency bug: singleton holding scoped service. `HttpClient` → `IHttpClientFactory`. Test with `WebApplicationFactory` or manual `ServiceCollection`. Follow-up: keyed services (.NET 8), `IOptions<T>` for config.
```csharp
// Registration
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<IClock, SystemClock>();

// Consumer — primary constructor (C# 12)
public sealed class OrdersController(IOrderService orders, ILogger<OrdersController> log) : ControllerBase {
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> Get(int id, CancellationToken ct) {
        var order = await orders.GetAsync(id, ct);
        return order is null ? NotFound() : Ok(order);
    }
}
```

### 63) **Exception handling** best practices
**Theory:** Exceptions signal **exceptional** failure—not normal control flow. They are expensive (stack walk); use return codes/`Try*` for expected cases.
**Answer:** Catch **specific** types (`IOException`, `DbUpdateException`). Add context and rethrow: `throw;` preserves stack; `throw ex` resets stack (avoid). Global middleware/`IExceptionHandler` maps to HTTP 500 + correlation ID. Log once at boundary.
**Explanation:** Empty `catch { }` hides bugs. `finally` or `await using` for cleanup. `AggregateException` when awaiting multiple tasks—inspect `.InnerExceptions`. Follow-up: custom exceptions only when callers need to branch; include inner exception.
```csharp
public async Task SaveLotAsync(Lot lot, CancellationToken ct) {
    try {
        await _db.Lots.AddAsync(lot, ct);
        await _db.SaveChangesAsync(ct);
    }
    catch (DbUpdateException ex) {
        _log.LogError(ex, "Failed to persist lot {LotId}", lot.Id);
        throw new InvalidOperationException($"Could not save lot {lot.Id}", ex);
    }
}

// ASP.NET Core — map to ProblemDetails
app.UseExceptionHandler(err => err.Run(async ctx => {
    ctx.Response.StatusCode = 500;
    await ctx.Response.WriteAsJsonAsync(new { error = "Internal server error" });
}));
```

### 64) **Nullable reference types** (NRT)
**Theory:** NRT adds compile-time flow analysis: reference types are **non-null by default** in `#nullable enable` projects; `?` marks optional.
**Answer:** Annotate APIs: `string` vs `string?`. Compiler warns on possible null dereference. Use null-forgiving `!` only when you have proven non-null. Enable in `.csproj`: `<Nullable>enable</Nullable>`.
**Explanation:** Legacy code may need `?` on parameters gradually. `ArgumentNullException.ThrowIfNull(arg)` (.NET 6+) for guards. `??` and `?.` for safe access. Follow-up: `NotNullIfNotNull`, `MemberNotNull` attributes for smarter analysis.
```csharp
#nullable enable

public string FormatOperator(User? user) {
    ArgumentNullException.ThrowIfNull(user); // if you require non-null
    return user.DisplayName ?? "Unknown";
}

public string? TryGetSerial(Device device) =>
    device.IsConnected ? device.Serial : null;
```

### 65) **`record`** types and value semantics
**Theory:** `record` is concise syntax for **immutable** data carriers with value-based equality (`Equals` by members, not reference).
**Answer:** `record Person(string Name, int Id);` generates ctor, equality, `ToString`, `with` for non-destructive copy. `record class` vs `record struct` for heap vs stack. Use for DTOs, events, API models—not entity graphs with EF tracking quirks.
**Explanation:** `with { Status = "Pass" }` clones and overrides one property. Records can be sealed or inherit. Follow-up: `init` accessors on classes achieve similar immutability; positional records deconstruct cleanly.
```csharp
public record WaferMap(string LotId, int DieCount, string Status);

WaferMap incoming = new("L-1001", 500, "Processing");
WaferMap passed = incoming with { Status = "Pass" };

Console.WriteLine(incoming == passed); // false — Status differs
Console.WriteLine(passed);           // WaferMap { LotId = L-1001, DieCount = 500, Status = Pass }
```

### 66) **`struct` vs `class`** trade-offs
**Theory:** **struct** = value type (copied on assignment; stack or inline in object). **class** = reference type (heap, shared reference).
**Answer:** Small **immutable** value bundles (`Point`, `DateRange`) → `readonly struct` or `record struct`. Identity, mutation, large size, inheritance → **class**. Avoid mutable structs (confusing copy semantics).
**Explanation:** Boxing when struct passed as `object`/`interface`. `in`/`ref` mitigate copy cost. Follow-up: `struct` cannot inherit (except interfaces); default ctor in C# 10+ sets fields to zero.
```csharp
public readonly record struct DieCoord(int Row, int Col);

public sealed class Lot {
    public int Id { get; set; }
    public List<DieCoord> FailingDies { get; } = new();
}

DieCoord a = new(1, 2);
DieCoord b = a; // copy — changing b does not change a
```

### 67) **Pattern matching** in `switch` and `is`
**Theory:** Declarative branching on type, shape, and conditions—clearer than `if (x is Foo f)`.
**Answer:** **Type pattern**: `obj is string s`. **Property pattern**: `person is { Age: >= 18, Name: var n }`. **Switch expression**: `status switch { 0 => "Idle", 1 => "Run", _ => "?" }`. **Relational/list patterns** in modern C#.
**Explanation:** Compiler can enforce exhaustiveness with enums when all cases covered. Prefer over long `if/else` chains. Follow-up: `switch` on `Span<char>` not allowed—switch on string works.
```csharp
public static string DescribeReading(object reading) => reading switch {
    null => "no data",
    int n when n < 0 => "invalid negative",
    int n => $"count:{n}",
    double d => $"measurement:{d:F3}",
    string { Length: 0 } => "empty label",
    string s => $"label:{s}",
    _ => "unsupported"
};
```

### 68) **Extension methods**
**Theory:** Static methods in a static class with `this` on the first parameter appear as instance methods on the extended type—without modifying the original type.
**Answer:** Define `public static class XExtensions { public static bool IsBlank(this string? s) => ... }`. In scope when namespace imported. Used heavily in LINQ (`Where`, `Select` are extensions on `IEnumerable`).
**Explanation:** Cannot override instance methods; null `this` is allowed—check inside. Use for cross-cutting helpers, not domain logic on entities (prefer instance methods). Follow-up: extending interfaces enables fluent APIs.
```csharp
public static class StringExtensions {
    public static bool IsBlank(this string? value) =>
        string.IsNullOrWhiteSpace(value);

    public static string Truncate(this string value, int max) =>
        value.Length <= max ? value : value[..max] + "…";
}

if (input.IsBlank()) return;
var shortLabel = label.Truncate(40);
```

### 69) **Delegates**, **Func/Action**, and **events**
**Theory:** A **delegate** is a type-safe function pointer. **Events** wrap delegates with publish-subscribe semantics (only publisher invokes).
**Answer:** `Func<T,TResult>`, `Action<T>`, custom `delegate void Handler(...)`. Events: `public event EventHandler<T>? ReadingReceived;` raise with `?.Invoke`. Lambdas and method groups convert to delegates.
**Explanation:** Multicast delegates—`+=`/`-=`; handler exceptions can affect others. Events prevent subscribers from firing from outside. Follow-up: `async void` event handlers are fire-and-forget—prefer `async Task` with care. `CancellationToken.Register` uses delegate.
```csharp
public sealed class SensorHub {
    public event EventHandler<double>? TemperatureChanged;

    public void Publish(double celsius) =>
        TemperatureChanged?.Invoke(this, celsius);
}

// subscription
hub.TemperatureChanged += (_, temp) => Console.WriteLine($"Temp: {temp:F1}C");

Func<int, int, int> add = (a, b) => a + b;
int sum = add(2, 3);
```

### 70) **`Task.WhenAll`** and concurrent async work
**Theory:** Independent I/O operations should **overlap**—total latency ≈ max(individual), not sum.
**Answer:** Start tasks without awaiting immediately; then `await Task.WhenAll(t1, t2, ...)`. For results: `var results = await Task.WhenAll(items.Select(i => FetchAsync(i)))`.
**Explanation:** If one task fails, `WhenAll` throws first `AggregateException`/`Exception`—others may still complete. Use `Task.WhenAll` + try/catch per task if partial success matters. Do not `WhenAll` CPU-bound work without `Task.Run` if it blocks. Follow-up: `Task.WhenAny` for timeouts/racing.
```csharp
public async Task<(WeatherDto? a, WeatherDto? b)> LoadBothAsync(
    IWeatherClient api, CancellationToken ct) {
    Task<WeatherDto> t1 = api.GetAsync("fab-a", ct);
    Task<WeatherDto> t2 = api.GetAsync("fab-b", ct);
    await Task.WhenAll(t1, t2);
    return (await t1, await t2); // already completed — no extra wait
}
```

### 71) **`ConfigureAwait(false)`** — when and why
**Theory:** By default, `await` tries to resume on the **captured synchronization context** (UI dispatcher, ASP.NET legacy context). Library code often should not need that context.
**Answer:** In **library**/domain layers: `await work.ConfigureAwait(false);` avoids unnecessary context posts and reduces deadlock risk when sync-over-async happens upstream. In **UI** code (WPF/WinForms), omit `false` when you must touch controls on the UI thread.
**Explanation:** ASP.NET Core has no `SynchronizationContext`—`ConfigureAwait` matters less but is still fine in libraries. Deadlock pattern: UI thread `.Result` on async that tries to resume UI thread. Follow-up: `ValueTask` + pooling—still use same guidance.
```csharp
public async Task<string> FetchTextAsync(HttpClient client, string url) {
    using var response = await client.GetAsync(url).ConfigureAwait(false);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync().ConfigureAwait(false);
}
```

### 72) **`Span<T>`** and **`Memory<T>`** basics
**Theory:** `Span<T>` is a **stack-only** (`ref struct`) view over contiguous memory—array, stackalloc, or native—**without allocating** substrings/slices.
**Answer:** Slice with `span[start..end]`; pass `ReadOnlySpan<char>` for parsing. `Memory<T>` is heap-friendly stored form; get `.Span` when needed. `stackalloc` for small buffers avoids heap.
**Explanation:** Cannot use `Span` in `async` methods or as class fields (ref struct restrictions). `string.AsSpan()` for zero-allocation parsing. Follow-up: `ArrayPool<T>.Shared` for larger reusable buffers.
```csharp
ReadOnlySpan<char> line = "lotId=42,yield=98.5".AsSpan();
int eq = line.IndexOf('=');
ReadOnlySpan<char> key = line[..eq];
ReadOnlySpan<char> value = line[(eq + 1)..];

Span<int> buffer = stackalloc int[16];
FillReadings(buffer);
```

### 73) **xUnit** unit test structure and isolation
**Theory:** Unit tests prove behavior in **isolation**—fast, deterministic, no real DB/network unless integration test.
**Answer:** `[Fact]` for parameterless test; `[Theory]` + `[InlineData]` for multiple inputs. Arrange–Act–Assert. Use **mocks** (Moq/NSubstitute) for interfaces; `Assert.Throws<T>` for expected failures. Name tests: `Method_Scenario_Expected`.
**Explanation:** One logical assertion per test when possible. Avoid test order dependence. Integration tests: `WebApplicationFactory<Program>`. Follow-up: `IClassFixture`, `Collection`, test containers for SQL.
```csharp
public class YieldCalculatorTests {
    [Theory]
    [InlineData(100, 95, 95.0)]
    [InlineData(0, 0, 0.0)]
    public void ComputePercent_GivenInputs_ReturnsExpected(int pass, int total, double expected) {
        var sut = new YieldCalculator();
        double result = sut.ComputePercent(pass, total);
        Assert.Equal(expected, result, precision: 2);
    }

    [Fact]
    public void ComputePercent_WhenTotalZero_Throws() {
        var sut = new YieldCalculator();
        Assert.Throws<ArgumentOutOfRangeException>(() => sut.ComputePercent(1, 0));
    }
}
```

### 74) **`ILogger<T>`**, **`IOptions<T>`**, and startup validation
**Theory:** ASP.NET Core standardizes **structured logging** and **typed configuration**—both injected, both testable.
**Answer:** `ILogger<T>`: use log levels (`LogInformation`, `LogWarning`, `LogError`); **message templates** with named placeholders (`{LotId}`)—not string interpolation for structured logs. `IOptions<T>` / `IOptionsSnapshot<T>` / `IOptionsMonitor<T>` bind `appsettings.json` sections. Validate with `services.AddOptions<T>().Bind(...).ValidateDataAnnotations().ValidateOnStart()`.
**Explanation:** `IOptions` singleton at startup; `Snapshot` per request in scoped apps; `Monitor` for reload. Never log secrets/PII. Follow-up: OpenTelemetry, `ActivitySource` for distributed tracing in production.
```csharp
public sealed class AppSettings {
    public string Region { get; init; } = "";
    public int MaxParallelExports { get; init; } = 4;
}

public sealed class ExportWorker(
    ILogger<ExportWorker> log,
    IOptions<AppSettings> options) {
    public void Run(string lotId) {
        AppSettings cfg = options.Value;
        log.LogInformation(
            "Exporting lot {LotId} in region {Region} (max parallel {Max})",
            lotId, cfg.Region, cfg.MaxParallelExports);
    }
}

// Program.cs
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("App"));
builder.Services.AddOptions<AppSettings>()
    .BindConfiguration("App")
  .ValidateDataAnnotations()
    .ValidateOnStart();
```
