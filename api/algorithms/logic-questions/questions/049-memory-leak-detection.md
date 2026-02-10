# Memory Leak Detection

## Problem
Your Node.js application's memory usage keeps growing over time. How do you identify and fix memory leaks?

## Approach
Systematically check: closures, event listeners, timers, circular references, and use profiling tools.

## Solution
**Common Causes:**

1. **Closures Holding References**
   ```javascript
   // Leak: closure holds large object
   function createHandler() {
       const largeData = new Array(1000000).fill(0);
       return function() {
           console.log('Handler'); // largeData never released
       };
   }
   ```

2. **Event Listeners Not Removed**
   ```javascript
   // Leak: listener never removed
   eventEmitter.on('event', handler);
   // Should: eventEmitter.off('event', handler);
   ```

3. **Timers Not Cleared**
   ```javascript
   // Leak: interval never cleared
   setInterval(() => {}, 1000);
   ```

4. **Circular References**
   - Objects referencing each other
   - May prevent garbage collection

**Detection Methods:**

1. **Heap Snapshots**
   - Take snapshots at different times
   - Compare to find growing objects
   - Use Chrome DevTools or `heapdump` module

2. **Memory Profiling**
   ```javascript
   // Node.js
   node --inspect app.js
   // Chrome DevTools -> Memory -> Take Heap Snapshot
   ```

3. **Monitor Memory Usage**
   ```javascript
   setInterval(() => {
       const usage = process.memoryUsage();
       console.log(usage.heapUsed / 1024 / 1024, 'MB');
   }, 5000);
   ```

4. **Use Tools**
   - `clinic.js` for Node.js profiling
   - `memwatch-next` for leak detection
   - APM tools (New Relic, DataDog)

**Fixes:**
- Remove event listeners
- Clear timers/intervals
- Avoid closures holding large objects
- Use WeakMap/WeakSet for caches
- Limit cache sizes

## Complexity
- **Time**: 
  - Heap snapshot: O(n) where n is number of objects in heap
  - Memory profiling: Continuous monitoring, O(1) per sample
  - Leak detection: O(n) to analyze heap differences
- **Space**: O(n) for heap snapshots, can be large (GBs for big applications)
- **Note**: Profiling tools add overhead. Use in development/staging, not production.

## Follow-up
- How to prevent memory leaks?
- What about memory leaks in browser?
- How to monitor in production?

