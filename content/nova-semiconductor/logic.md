### 23) Classic FizzBuzz with Rules
**Theory:** Rule-ordering and modulo checks are a basic control-flow sanity test.
**Answer:** Check divisibility by both 3 and 5 first, then individual cases.
**Explanation:** Prioritizing combined condition avoids incorrect output for multiples of 15.
```csharp
public string FizzBuzzValue(int n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return n.ToString();
}
```

### 24) FizzBuzz Without Modulo
**Theory:** Counters can replace modulo when arithmetic cost or constraints matter.
**Answer:** Increment two counters and reset when each threshold is reached.
**Explanation:** This demonstrates state-machine thinking beyond direct operators.
```csharp
public IEnumerable<string> FizzBuzzNoMod(int n) {
    int c3 = 0, c5 = 0;
    for (int i = 1; i <= n; i++) { c3++; c5++; bool f = c3 == 3, b = c5 == 5; if (f) c3 = 0; if (b) c5 = 0; yield return f && b ? "FizzBuzz" : f ? "Fizz" : b ? "Buzz" : i.ToString(); }
}
```

### 25) Missing Number via XOR
**Theory:** XOR cancels equal values, leaving only the unmatched number.
**Answer:** XOR all indices and all elements in the array.
**Explanation:** This avoids extra memory and handles unsorted input cleanly.
```csharp
public int MissingNumber(int[] nums) {
    int x = nums.Length;
    for (int i = 0; i < nums.Length; i++) x ^= i ^ nums[i];
    return x;
}
```

### 26) Single Number in Duplicates
**Theory:** Pair-duplicated values disappear under XOR, exposing the unique value.
**Answer:** XOR every element and return accumulator.
**Explanation:** Time is O(n), space O(1), with no sorting needed.
```csharp
public int SingleNumber(int[] nums) {
    int x = 0; foreach (var n in nums) x ^= n; return x;
}
```

### 27) Hamming Weight (Set Bits Count)
**Theory:** Bit manipulation can count 1-bits efficiently using `n & (n-1)`.
**Answer:** Repeatedly clear the lowest set bit and increment count.
**Explanation:** Loop runs only as many times as there are set bits.
```csharp
public int HammingWeight(uint n) {
    int c = 0; while (n != 0) { n &= (n - 1); c++; } return c;
}
```

### 28) Hamming Distance Between Integers
**Theory:** XOR marks differing bit positions as 1.
**Answer:** Compute `x ^ y` and count set bits.
**Explanation:** This directly models "number of differing bits."
```csharp
public int HammingDistance(int x, int y) {
    uint z = (uint)(x ^ y); int c = 0; while (z != 0) { z &= z - 1; c++; } return c;
}
```

### 29) Prime Check Optimization
**Theory:** Non-primes have a factor at most `sqrt(n)`.
**Answer:** Handle small cases, reject even numbers, test odd divisors up to square root.
**Explanation:** This reduces unnecessary checks and is interview-acceptable.
```csharp
public bool IsPrime(int n) {
    if (n < 2) return false; if (n == 2) return true; if (n % 2 == 0) return false;
    for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;
    return true;
}
```

### 30) Sieve for Prime Generation
**Theory:** Sieve of Eratosthenes marks multiples to generate all primes up to N.
**Answer:** Initialize boolean array and strike out multiples from each prime candidate.
**Explanation:** Total complexity is roughly O(n log log n), very efficient for ranges.
```csharp
public List<int> Sieve(int n) {
    var prime = Enumerable.Repeat(true, n + 1).ToArray(); var res = new List<int>();
    for (int p = 2; p <= n; p++) if (prime[p]) { res.Add(p); if ((long)p * p <= n) for (int m = p * p; m <= n; m += p) prime[m] = false; }
    return res;
}
```

### 31) Euclidean GCD
**Theory:** `gcd(a,b) = gcd(b, a mod b)` until remainder becomes zero.
**Answer:** Iteratively swap and mod until `b` is zero.
**Explanation:** Fast and foundational for fraction simplification and number theory.
```csharp
public int Gcd(int a, int b) {
    a = Math.Abs(a); b = Math.Abs(b);
    while (b != 0) { int t = a % b; a = b; b = t; }
    return a;
}
```

### 32) Palindrome Number Check
**Theory:** Numeric palindrome can be validated without string conversion.
**Answer:** Reverse the second half of digits and compare with first half.
**Explanation:** This avoids overflow and keeps space constant.
```csharp
public bool IsPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false; int rev = 0;
    while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
    return x == rev || x == rev / 10;
}
```

### 33) Fibonacci Iterative DP
**Theory:** Fibonacci recursion has overlapping subproblems, so iterative DP is preferred.
**Answer:** Maintain previous two values and iterate up to n.
**Explanation:** This yields O(n) time and O(1) memory.
```csharp
public int Fib(int n) {
    if (n <= 1) return n; int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}
```

### 34) Find Duplicate in Range Array
**Theory:** If values are bounded, a seen-set catches first repeated element quickly.
**Answer:** Traverse array and return first number that cannot be added to set.
**Explanation:** This is a practical trade-off: O(n) time, O(n) space.
```csharp
public int FirstDuplicate(int[] nums) {
    var seen = new HashSet<int>();
    foreach (var n in nums) if (!seen.Add(n)) return n;
    return -1;
}
```

### 35) Majority Element (Boyer-Moore)
**Theory:** Pair cancellation leaves majority candidate if one exists (> n/2).
**Answer:** Track candidate and counter, reset candidate when count hits zero.
**Explanation:** O(n) time and O(1) space beats hash counting for strict-majority case.
```csharp
public int MajorityElement(int[] nums) {
    int cand = 0, cnt = 0;
    foreach (var n in nums) { if (cnt == 0) cand = n; cnt += (n == cand) ? 1 : -1; }
    return cand;
}
```

### 36) Rotate Array by K Steps
**Theory:** Reversal algorithm rotates in-place using three segment reversals.
**Answer:** Reverse entire array, then reverse first k and remaining segment.
**Explanation:** Avoids extra array while preserving O(n) complexity.
```csharp
public void Rotate(int[] nums, int k) {
    int n = nums.Length; k %= n; Array.Reverse(nums); Array.Reverse(nums, 0, k); Array.Reverse(nums, k, n - k);
}
```

### 37) Unique Paths in Grid
**Theory:** Each cell paths = top paths + left paths.
**Answer:** Fill DP table from top-left with base row/column as 1.
**Explanation:** This is a classic combinatorial DP interview problem.
```csharp
public int UniquePaths(int m, int n) {
    var dp = new int[m,n];
    for (int i = 0; i < m; i++) dp[i,0] = 1; for (int j = 0; j < n; j++) dp[0,j] = 1;
    for (int i = 1; i < m; i++) for (int j = 1; j < n; j++) dp[i,j] = dp[i-1,j] + dp[i,j-1];
    return dp[m-1,n-1];
}
```

### 38) Sliding Window Rate Limiter Logic
**Theory:** Sliding windows smooth bursts better than fixed windows for API protection.
**Answer:** Keep recent request timestamps per key and drop those outside window.
**Explanation:** Accept request only when remaining count is below limit.
```csharp
public bool Allow(List<long> timestamps, long nowMs, int limit, long windowMs) {
    timestamps.RemoveAll(t => nowMs - t >= windowMs);
    if (timestamps.Count >= limit) return false;
    timestamps.Add(nowMs); return true;
}
```

### 39) Token Bucket Rate Limiter Logic
**Theory:** Token bucket allows short bursts while enforcing long-term throughput.
**Answer:** Refill tokens over time and consume one token per request.
**Explanation:** If tokens are unavailable, reject or queue the request.
```csharp
public bool Consume(ref double tokens, double capacity, double refillPerSec, ref long lastMs, long nowMs) {
    tokens = Math.Min(capacity, tokens + (nowMs - lastMs) / 1000.0 * refillPerSec); lastMs = nowMs;
    if (tokens < 1) return false; tokens -= 1; return true;
}
```

### 40) Producer-Consumer with BlockingCollection
**Theory:** Safe producer-consumer pipelines need synchronized queue and completion signaling.
**Answer:** Use `BlockingCollection<T>` so consumer blocks when queue is empty.
**Explanation:** Built-in coordination simplifies threading code and avoids busy waiting.
```csharp
var q = new BlockingCollection<int>(boundedCapacity: 100);
Task.Run(() => { for (int i = 0; i < 1000; i++) q.Add(i); q.CompleteAdding(); });
Task.Run(() => { foreach (var item in q.GetConsumingEnumerable()) Process(item); });
```

### 41) Deadlock Necessary Conditions
**Theory:** Deadlock requires mutual exclusion, hold-and-wait, no preemption, and circular wait.
**Answer:** Break at least one condition to prevent deadlock.
**Explanation:** Typical prevention is consistent lock ordering across threads.
```csharp
// Avoid deadlock by locking resources in a global order:
lock(firstResource) {
    lock(secondResource) {
        // critical section
    }
}
```

### 42) Fast Exponentiation (Binary Power)
**Theory:** Exponentiation by squaring reduces multiplications from O(n) to O(log n).
**Answer:** Square base each step and multiply result when current exponent bit is 1.
**Explanation:** Works for large powers efficiently and is easy to explain in interviews.
```csharp
public long Pow(long a, int n) {
    long res = 1, b = a; int e = n;
    while (e > 0) { if ((e & 1) == 1) res *= b; b *= b; e >>= 1; }
    return res;
}
```

### 43) Two Pointers for Pair Sum in Sorted Array
**Theory:** Opposite-direction pointers exploit sorted order to find target sum.
**Answer:** Move left pointer up if sum too small, right pointer down if too large.
**Explanation:** This runs in O(n) versus O(n^2) brute force.
```csharp
public int[] TwoSumSorted(int[] a, int target) {
    int l = 0, r = a.Length - 1;
    while (l < r) { int s = a[l] + a[r]; if (s == target) return new[] { l, r }; if (s < target) l++; else r--; }
    return Array.Empty<int>();
}
```

### 44) Balanced Parentheses Count Logic
**Theory:** Balance counter can validate one bracket type without stack.
**Answer:** Increment for `(` and decrement for `)`; count must never go negative.
**Explanation:** Final count must be zero for a balanced string.
```csharp
public bool IsBalancedRound(string s) {
    int bal = 0;
    foreach (var c in s) { if (c == '(') bal++; else if (c == ')') bal--; if (bal < 0) return false; }
    return bal == 0;
}
```
