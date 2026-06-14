# Nova Semiconductor — Threading & Processes (C#)

### 89) What is the difference between a **process** and a **thread**?
**Theory:** A process is an isolated OS-level program instance; threads are execution units inside a process sharing memory.
**Answer:** Processes have separate address spaces; threads in the same process share heap/static data but have private stacks.
**Explanation:** In interviews, tie this to isolation (crash in one process vs data races in shared threads).
```csharp
// Process: separate executable instance
using var p = Process.Start(new ProcessStartInfo("notepad.exe") { UseShellExecute = true });
// Thread: lightweight unit inside current process
var t = new Thread(() => Console.WriteLine(Thread.CurrentThread.ManagedThreadId));
t.Start();
```

### 90) When do you choose **`Task`** over raw **`Thread`** in .NET?
**Theory:** `Task` represents work scheduled on the thread pool with better composability (`await`, `WhenAll`).
**Answer:** Prefer `Task`/`async` for I/O and thread-pool CPU work; use explicit `Thread` rarely (long-lived dedicated workers).
**Explanation:** Raw threads are costly to create; the pool amortizes startup and integrates with modern async patterns.
```csharp
await Task.Run(() => HeavyCpuWork());
// vs dedicated thread only when you need explicit foreground/long-lived semantics
```

### 91) What is the **thread pool** and why does .NET use it?
**Theory:** A pool of reusable worker threads avoids the cost of creating/destroying threads per operation.
**Answer:** `Task.Run`, ASP.NET request handling, and `async` continuations often use pool threads.
**Explanation:** Starving the pool with blocking calls hurts throughput—mention `async` for I/O-bound work.
```csharp
ThreadPool.QueueUserWorkItem(_ => DoWork());
await Task.Run(() => DoWork()); // also uses pool
```

### 92) What does the **`lock`** statement do?
**Theory:** `lock` is syntactic sugar for `Monitor.Enter/Exit` on a reference-type sync object.
**Answer:** Only one thread enters the critical section per lock object; others block until release.
**Explanation:** Always lock on a **private readonly** object—never `lock(this)` or `lock(typeof(T))` in libraries.
```csharp
private readonly object _gate = new();
private int _count;
public void Increment() {
    lock (_gate) { _count++; }
}
```

### 93) How do **`Monitor`** and **`lock`** relate?
**Theory:** `Monitor` provides `Enter`, `Exit`, `TryEnter`, and `Wait/Pulse` for condition signaling.
**Answer:** `lock (obj) { }` compiles to `Monitor.Enter` with `finally { Monitor.Exit }`.
**Explanation:** Use `Monitor.TryEnter` with timeout to avoid indefinite deadlocks in diagnostics code.
```csharp
if (Monitor.TryEnter(_gate, TimeSpan.FromSeconds(2))) {
    try { /* critical section */ }
    finally { Monitor.Exit(_gate); }
}
```

### 94) When do you use **`SemaphoreSlim`**?
**Theory:** Semaphore limits how many threads can access a resource concurrently (counting lock).
**Answer:** Use for throttling (e.g. max 5 parallel downloads) or lightweight pool slots.
**Explanation:** Prefer `SemaphoreSlim` over `Semaphore` in-process—it is lighter and supports `WaitAsync`.
```csharp
using var sem = new SemaphoreSlim(3);
await sem.WaitAsync();
try { await DownloadAsync(url); }
finally { sem.Release(); }
```

### 95) **`Mutex`** vs **`lock`** — when is Mutex needed?
**Theory:** `Mutex` can synchronize **across processes**; `lock` is in-process only.
**Answer:** Named mutex for single-instance apps or cross-process exclusion; `lock` for normal in-app critical sections.
**Explanation:** Mutex is slower and OS-backed—don't default to it unless cross-process is required.
```csharp
using var mutex = new Mutex(false, "Global\\MyAppSingleInstance");
if (!mutex.WaitOne(0)) { Console.WriteLine("Already running"); return; }
```

### 96) What is **`ReaderWriterLockSlim`** for?
**Theory:** Many readers OR one writer—good for read-heavy caches.
**Answer:** `EnterReadLock` for concurrent reads; `EnterWriteLock` for exclusive updates.
**Explanation:** Misuse (upgrade locks, long writes) can hurt—keep write sections short.
```csharp
private readonly ReaderWriterLockSlim _rw = new();
public string Read() {
    _rw.EnterReadLock();
    try { return _cache; }
    finally { _rw.ExitReadLock(); }
}
```

### 97) What does **`volatile`** guarantee in C#?
**Theory:** Prevents certain compiler/CPU reorderings so reads/writes are not cached in registers unexpectedly.
**Answer:** Use for simple flags between threads; **not** a substitute for `lock` on compound operations.
**Explanation:** For complex state, prefer `Interlocked` or `lock`—`volatile` alone won't make `count++` atomic.
```csharp
private volatile bool _stop;
public void Stop() => _stop = true;
public void Loop() { while (!_stop) { /* work */ } }
```

### 98) How does **`Interlocked`** help?
**Theory:** Hardware-atomic operations for integers and references without full locks.
**Answer:** `Interlocked.Increment`, `CompareExchange`, `Exchange` for lock-free counters and simple updates.
**Explanation:** Great for metrics; still need careful design for multi-field invariants.
```csharp
Interlocked.Increment(ref _processed);
Interlocked.CompareExchange(ref _head, newNode, expectedTail);
```

### 99) Name **thread-safe collections** you would use in production.
**Theory:** `Concurrent*` types use fine-grained locking or lock-free techniques internally.
**Answer:** `ConcurrentDictionary`, `ConcurrentQueue`, `ConcurrentBag`, `BlockingCollection`.
**Explanation:** Still understand semantics—e.g. `ConcurrentBag` is unordered; queue for FIFO pipelines.
```csharp
var q = new ConcurrentQueue<Job>();
q.Enqueue(job);
if (q.TryDequeue(out var next)) Process(next);
```

### 100) **`BlockingCollection<T>`** — typical use case?
**Theory:** Bounded producer-consumer buffer with blocking/wait semantics.
**Answer:** Producers `Add`, consumers `Take`; supports `CompleteAdding` for graceful shutdown.
**Explanation:** Common pattern for pipeline stages without busy-wait loops.
```csharp
var buffer = new BlockingCollection<WorkItem>(boundedCapacity: 100);
Task.Run(() => { foreach (var w in buffer.GetConsumingEnumerable()) Handle(w); });
buffer.Add(new WorkItem());
buffer.CompleteAdding();
```

### 101) **`Parallel.For`** — when is it appropriate?
**Theory:** Data-parallel loop over independent iterations using the thread pool.
**Answer:** CPU-bound work with no shared mutable state (or proper synchronization); specify `MaxDegreeOfParallelism` if needed.
**Explanation:** Not for I/O-bound—use `async`/`Task` instead; watch shared accumulators (use thread-local or `Interlocked`).
```csharp
Parallel.For(0, items.Length, new ParallelOptions { MaxDegreeOfParallelism = 4 },
    i => Transform(items[i]));
```

### 102) **`Task.Run`** vs **`Task.Factory.StartNew`** — junior-safe answer?
**Theory:** `Task.Run` is the simple thread-pool scheduler with sensible defaults.
**Answer:** Prefer `Task.Run` for CPU work offload; avoid `StartNew` unless you need custom `TaskCreationOptions`.
**Explanation:** `StartNew` has footguns with `async` delegates and scheduling—interviewers want you to default to `Task.Run`.
```csharp
await Task.Run(() => CpuBoundCalculation(data));
```

### 103) How do **`CancellationToken`** and cooperative cancellation work?
**Theory:** Long-running tasks should poll `token.IsCancellationRequested` or use `ThrowIfCancellationRequested`.
**Answer:** Pass `CancellationToken` from `CancellationTokenSource`; cancel via `cts.Cancel()`.
**Explanation:** Essential for responsive shutdown in services and UI apps.
```csharp
public async Task RunAsync(CancellationToken token) {
    while (!token.IsCancellationRequested) {
        await DoUnitAsync(token);
    }
}
```

### 104) **Async/await** vs **multithreading** — how do you explain the difference?
**Theory:** `async` frees threads during I/O waits; multithreading runs work concurrently on multiple threads.
**Answer:** Async improves scalability on few threads; multithreading/parallelism targets CPU concurrency.
**Explanation:** They compose: `await` I/O, then `Parallel.For` or `Task.Run` for CPU chunks—don't block async with `.Result`.
```csharp
// I/O: async frees thread while waiting
var data = await http.GetByteArrayAsync(url);
// CPU: parallel transform
await Task.Run(() => Parse(data));
```

### 105) What causes **deadlock** and how do you prevent it?
**Theory:** Circular wait: thread A holds lock1 waits lock2; B holds lock2 waits lock1.
**Answer:** Lock ordering (always acquire A then B), timeouts (`TryEnter`), avoid sync-over-async (`.Result`, `Wait()` on async).
**Explanation:** Classic async deadlock: UI thread blocks on `.Result` while continuation needs UI thread.
```csharp
// BAD: can deadlock on UI/sync context
// var x = GetDataAsync().Result;
// GOOD:
var x = await GetDataAsync();
```

### 106) What is a **race condition**?
**Theory:** Outcome depends on interleaving when multiple threads access shared mutable state without synchronization.
**Answer:** Fix with locks, concurrent collections, or immutability; make invariants hold under all interleavings.
**Explanation:** `if (queue.Count > 0) queue.Dequeue()` is racy—use atomic `TryDequeue` or lock both check and act.
```csharp
lock (_gate) {
    if (_queue.Count > 0) return _queue.Dequeue();
}
```

### 107) What is **`ThreadLocal<T>`**?
**Theory:** Each thread gets its own copy of data—avoids sharing for per-thread state.
**Answer:** Useful for non-thread-safe buffers, random generators, or per-request scratch in thread-pool workers (careful with pooling).
**Explanation:** Don't use for logic that must cross threads—only thread-affinitized scratch.
```csharp
private static readonly ThreadLocal<StringBuilder> _sb =
    new(() => new StringBuilder(), trackAllValues: false);
```

### 108) How do you **start and monitor an external process** safely?
**Theory:** `Process` API wraps OS process creation; redirect streams carefully to avoid deadlocks.
**Answer:** Set `StartInfo`, handle `Exited`, use timeouts, dispose process handle.
**Explanation:** Semiconductor tooling often shells out to validators—mention async stream reading.
```csharp
using var proc = new Process();
proc.StartInfo = new ProcessStartInfo("tool.exe", "--check") {
    RedirectStandardOutput = true, UseShellExecute = false, CreateNoWindow = true
};
proc.Start();
string output = await proc.StandardOutput.ReadToEndAsync();
await proc.WaitForExitAsync();
```

### 109) **`WaitHandle`** — what is it used for?
**Theory:** Base type for OS synchronization: `ManualResetEvent`, `AutoResetEvent`, `Mutex`.
**Answer:** Signal/wait between threads; `WaitOne`, `Set`, `Reset`.
**Explanation:** Modern code often prefers `TaskCompletionSource` or `SemaphoreSlim`, but interviews still ask handles.
```csharp
using var evt = new ManualResetEventSlim(false);
Task.Run(() => { Work(); evt.Set(); });
evt.Wait(TimeSpan.FromSeconds(30));
```

### 110) **Producer-consumer** pattern in C# — one clean implementation?
**Theory:** Decouple production rate from consumption with a thread-safe buffer.
**Answer:** `BlockingCollection` + `GetConsumingEnumerable`, or `Channel<T>` in modern .NET for async pipelines.
**Explanation:** Mention graceful shutdown: `CompleteAdding` or channel writer completion.
```csharp
var channel = Channel.CreateBounded<Msg>(100);
var writer = channel.Writer;
var reader = channel.Reader;
_ = Task.Run(async () => { await foreach (var m in reader.ReadAllAsync()) Handle(m); });
await writer.WriteAsync(new Msg("probe"));
writer.Complete();
```
