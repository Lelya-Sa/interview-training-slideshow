# Nova Semiconductor — Logic & Reasoning (C#)

Covers: **control flow**, **bit tricks**, **number theory**, **two pointers**, **binary search**, **prefix sums**, **stack**, **simulation/DP**, **rate limiting**, **greedy**, **string logic**, and **edge-case reasoning** — all with interview-depth explanations.

### 23) **FizzBuzz** — why does rule order matter?
**Theory:** FizzBuzz tests whether you handle **compound conditions** before simpler ones—a common control-flow mistake in interviews and in production rule engines.
**Answer:** For each `n`, check **divisible by 15 first** (both 3 and 5), then by 3, then by 5, else print `n`. Wrong order (`3` before `15`) prints `"Fizz"` for 15 instead of `"FizzBuzz"`.
**Explanation:** State the **invariant**: at most one branch applies. Complexity O(n) for printing 1..n. Edge cases: `n <= 0` (clarify spec), large n (use `StringBuilder` if concatenating output).
```csharp
public static string FizzBuzzValue(int n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return n.ToString();
}
```

### 24) **FizzBuzz without modulo** — what pattern is this?
**Theory:** Some embedded or performance-sensitive contexts avoid `%`; interviewers want **state-machine** thinking.
**Answer:** Maintain counters for “ticks until Fizz” and “ticks until Buzz”; increment each step, reset counter when it fires, combine flags for FizzBuzz.
**Explanation:** Same output as modulo version if counters reset correctly. Shows you can model rules as **finite state** rather than only arithmetic tricks.
```csharp
public static IEnumerable<string> FizzBuzzNoMod(int n) {
    int c3 = 0, c5 = 0;
    for (int i = 1; i <= n; i++) {
        c3++; c5++;
        bool f = c3 == 3, b = c5 == 5;
        if (f) c3 = 0;
        if (b) c5 = 0;
        yield return f && b ? "FizzBuzz" : f ? "Fizz" : b ? "Buzz" : i.ToString();
    }
}
```

### 25) **Missing number** in `0..n` — XOR approach
**Theory:** XOR is associative and `x ^ x = 0`, so paired values cancel—useful for “find the one missing element” without extra memory.
**Answer:** XOR index `i` with `nums[i]` for all `i`, and XOR with `n` (length). Result is the missing value. Works because full set would XOR to 0.
**Explanation:** O(n) time, O(1) space. Alternative: sum formula `n*(n+1)/2 - sum(nums)`—watch **integer overflow** for large n (use `long`). XOR avoids sum overflow issues.
```csharp
public static int MissingNumber(int[] nums) {
    int x = nums.Length;
    for (int i = 0; i < nums.Length; i++)
        x ^= i ^ nums[i];
    return x;
}
```

### 26) **Single number** when every other appears twice
**Theory:** Same XOR cancellation idea—duplicate pairs zero out; the unique value remains.
**Answer:** XOR all elements into accumulator `x`; return `x`.
**Explanation:** O(n) time, O(1) space vs O(n) hash set. Follow-up: “every element appears **three** times except one” needs bit counting per bit position—not XOR alone.
```csharp
public static int SingleNumber(int[] nums) {
    int x = 0;
    foreach (var n in nums) x ^= n;
    return x;
}
```

### 27) **Count set bits** (Hamming weight) — Brian Kernighan trick
**Theory:** `n & (n-1)` clears the lowest set bit—loop once per set bit instead of all 32 bits.
**Answer:** While `n != 0`, do `n &= n - 1` and increment count.
**Explanation:** Useful in embedded, flags, and parity checks. For 32-bit ints worst-case still O(32); average faster when sparse. C# also has `BitOperations.PopCount` on modern .NET.
```csharp
public static int HammingWeight(uint n) {
    int count = 0;
    while (n != 0) { n &= n - 1; count++; }
    return count;
}
```

### 28) **Hamming distance** between two integers
**Theory:** Hamming distance = number of bit positions where bits differ = popcount of `x ^ y`.
**Answer:** Compute `z = (uint)(x ^ y)` and count set bits in `z` (Kernighan or PopCount).
**Explanation:** Appears in error detection and similarity metrics. Say complexity O(number of differing bits) with Kernighan.
```csharp
public static int HammingDistance(int x, int y) {
    uint z = (uint)(x ^ y);
    int c = 0;
    while (z != 0) { z &= z - 1; c++; }
    return c;
}
```

### 29) **Is n prime?** — optimized trial division
**Theory:** If `n` is composite, it has a factor ≤ √n—only test divisors up to square root.
**Answer:** Reject `n < 2`. Handle `2` separately. Reject even `n > 2`. Test odd divisors `d` from 3 while `d * d <= n`.
**Explanation:** O(√n). Edge cases: `0`, `1`, negative (not prime by definition). For many queries up to N, use **sieve** (next question).
```csharp
public static bool IsPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int d = 3; d * d <= n; d += 2)
        if (n % d == 0) return false;
    return true;
}
```

### 30) **Sieve of Eratosthenes** — generate all primes ≤ N
**Theory:** Mark multiples of each prime starting from p²; unmarked numbers are prime.
**Answer:** Boolean array `isPrime[0..n]`, iterate p from 2 to n; if still prime, add to result and strike multiples `p*p, p*p+p, ...`.
**Explanation:** O(n log log n) time—much faster than √n per query for dense ranges. Memory O(n). Use `long` for `p * p` when n is large to avoid overflow in inner loop.
```csharp
public static List<int> SievePrimes(int n) {
    var isPrime = Enumerable.Repeat(true, n + 1).ToArray();
    var result = new List<int>();
    for (int p = 2; p <= n; p++) {
        if (!isPrime[p]) continue;
        result.Add(p);
        if ((long)p * p <= n)
            for (int m = p * p; m <= n; m += p) isPrime[m] = false;
    }
    return result;
}
```

### 31) **GCD** and **LCM** — Euclidean algorithm
**Theory:** `gcd(a,b)` divides both; `lcm(a,b) = |a*b| / gcd(a,b)` for scheduling/repeating cycles together.
**Answer:** GCD: while `b != 0`, `(a,b) = (b, a % b)`. LCM: `Math.Abs((long)a / Gcd(a,b) * b)` (divide first to reduce overflow).
**Explanation:** Foundation for fraction reduction, cycle alignment (“both events coincide every lcm days”). Handle negatives with `Math.Abs`.
```csharp
public static int Gcd(int a, int b) {
    a = Math.Abs(a); b = Math.Abs(b);
    while (b != 0) { int t = a % b; a = b; b = t; }
    return a;
}
public static long Lcm(int a, int b) =>
    Math.Abs((long)a / Gcd(a, b) * b);
```

### 32) **Palindrome number** without string conversion
**Theory:** Reverse the **second half** of digits and compare to the first half—avoids string allocation and handles half-way stop.
**Answer:** Reject negatives and numbers ending in 0 (unless value is 0). While `x > reversed`, `reversed = reversed*10 + x%10`, `x /= 10`. Palindrome if `x == reversed` or `x == reversed/10` (odd length).
**Explanation:** O(log₁₀ n) digits. Overflow: use `long` for `reversed` if interviewer allows huge inputs.
```csharp
public static bool IsPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    int rev = 0;
    while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
    return x == rev || x == rev / 10;
}
```

### 33) **Fibonacci** — why iterative beats naive recursion?
**Theory:** Naive `fib(n)` recalculates subproblems exponentially; iterative DP is O(n) time, O(1) space.
**Answer:** Base: `n<=1` return n. Keep `prev` and `curr`, loop from 2 to n updating sum.
**Explanation:** Mention matrix exponentiation O(log n) only if asked. Watch **int overflow**—use `long` for n > 45. Clarify 0-index vs 1-index definition with interviewer.
```csharp
public static int Fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}
```

### 34) **First duplicate** in array — hash set vs sorting
**Theory:** “Find first repeated value” is a **membership** problem—hash set gives O(n) expected time.
**Answer:** Traverse; if `Add(n)` returns false, `n` was seen before—return it. Return sentinel (e.g. -1) if none.
**Explanation:** Sorting + scan is O(n log n) but O(1) extra space if in-place allowed. For **first duplicate in range 1..n** with O(1) space, use **cycle detection** (Floyd)—advanced follow-up.
```csharp
public static int FirstDuplicate(int[] nums) {
    var seen = new HashSet<int>();
    foreach (var n in nums)
        if (!seen.Add(n)) return n;
    return -1;
}
```

### 35) **Majority element** (> n/2) — Boyer-Moore vote
**Theory:** Pair different elements and “cancel”; majority survives if it exists.
**Answer:** Track `candidate` and `count`. For each `n`: if `count==0`, candidate=n; count += (n==candidate) ? 1 : -1. **Second pass** verifies count > n/2 (required for correctness if majority not guaranteed).
**Explanation:** O(n) time, O(1) space vs hash map O(n) space. Interview: always mention verification pass unless problem guarantees majority.
```csharp
public static int MajorityElement(int[] nums) {
    int cand = 0, cnt = 0;
    foreach (var n in nums) {
        if (cnt == 0) cand = n;
        cnt += n == cand ? 1 : -1;
    }
    return cand; // verify in second pass if needed
}
```

### 36) **Rotate array** right by k — reversal trick
**Theory:** Rotating is three reversals: reverse all, reverse first k, reverse rest—O(n) in-place.
**Answer:** `k %= n` (handle k > n). `Reverse(0,n-1)`, `Reverse(0,k-1)`, `Reverse(k,n-1)`.
**Explanation:** Avoid O(n*k) one-step rotates. Edge: `n==0`, `k==0`, `k==n` (no-op after mod). Two-pointer swap logic is same family as palindrome checks.
```csharp
public static void Rotate(int[] nums, int k) {
    int n = nums.Length;
    if (n == 0) return;
    k %= n;
    Array.Reverse(nums);
    Array.Reverse(nums, 0, k);
    Array.Reverse(nums, k, n - k);
}
```

### 37) **Unique paths** in m×n grid (only right/down)
**Theory:** Classic **2D DP**: paths to cell = paths from above + paths from left. Base row/column = 1.
**Answer:** Fill `dp[i,j]` for `i in 1..m-1`, `j in 1..n-1`. Answer `dp[m-1,n-1]`. Can optimize to 1D array O(n) space.
**Explanation:** Combinatorics alternative: C(m+n-2, m-1) if no obstacles. Follow-up with obstacles → DP with blocked cells = 0. O(m*n) time.
```csharp
public static int UniquePaths(int m, int n) {
    var dp = new int[m, n];
    for (int i = 0; i < m; i++) dp[i, 0] = 1;
    for (int j = 0; j < n; j++) dp[0, j] = 1;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i, j] = dp[i - 1, j] + dp[i, j - 1];
    return dp[m - 1, n - 1];
}
```

### 38) **Prefix sum** — range sum queries in O(1)
**Theory:** Precompute cumulative sums so `sum(i..j) = prefix[j+1] - prefix[i]`—foundation for subarray problems.
**Answer:** Build `prefix[0]=0`, `prefix[i+1]=prefix[i]+nums[i]`. Range sum `[l,r]` = `prefix[r+1]-prefix[l]`.
**Explanation:** O(n) preprocess, O(1) per query. Enables “subarray sum equals k” with hash map of prefix frequencies—common follow-up. Watch index off-by-one in interviews.
```csharp
public sealed class PrefixSum {
    private readonly long[] _p;
    public PrefixSum(int[] nums) {
        _p = new long[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++) _p[i + 1] = _p[i] + nums[i];
    }
    public long RangeSum(int l, int r) => _p[r + 1] - _p[l];
}
```

### 39) **Binary search** — find target in sorted array
**Theory:** Halve search space each step using monotonic order—O(log n) vs O(n) linear scan.
**Answer:** `lo=0`, `hi=n-1`. While `lo<=hi`, `mid=(lo+hi)/2` (or `lo+(hi-lo)/2` to avoid overflow). If `a[mid]==target` return mid; if `a[mid]<target` search right else left. Return -1 if not found.
**Explanation:** Also used on **answer space** (min capacity, speed) when monotonic predicate exists. Common bug: infinite loop when `lo=hi-1`—use `lo<=hi` or careful `lo=mid+1`.
```csharp
public static int BinarySearch(int[] a, int target) {
    int lo = 0, hi = a.Length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

### 40) **Two pointers** — pair with sum in **sorted** array
**Theory:** Opposite pointers exploit sorted order—each step eliminates many candidates.
**Answer:** `l=0`, `r=n-1`. If `a[l]+a[r]==target` done; if sum too small `l++`, else `r--`. O(n) after sort; O(n log n) if you must sort first.
**Explanation:** Unsorted two-sum uses **hash map** O(n). Clarify whether return indices or values, and duplicate handling.
```csharp
public static int[] TwoSumSorted(int[] a, int target) {
    int l = 0, r = a.Length - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) return new[] { l, r };
        if (s < target) l++;
        else r--;
    }
    return Array.Empty<int>();
}
```

### 41) **Merge two sorted arrays** — two-pointer merge
**Theory:** Same merge step as merge sort—compare fronts, take smaller, advance pointer.
**Answer:** Indices `i,j` on `a` and `b`; append smaller to result until one exhausted; append remainder.
**Explanation:** O(n+m) time, O(n+m) space for new array. In-place merge into `a` with extra space at end of `a` is common follow-up (LeetCode). Foundation for external merge in data pipelines.
```csharp
public static int[] MergeSorted(int[] a, int[] b) {
    var res = new List<int>(a.Length + b.Length);
    int i = 0, j = 0;
    while (i < a.Length && j < b.Length)
        res.Add(a[i] <= b[j] ? a[i++] : b[j++]);
    while (i < a.Length) res.Add(a[i++]);
    while (j < b.Length) res.Add(b[j++]);
    return res.ToArray();
}
```

### 42) **Valid parentheses** — stack for multiple bracket types
**Theory:** Nesting requires **LIFO**—stack matches last opened bracket. Single-type `()` can use counter; `()[]{}` needs stack.
**Answer:** Push opening brackets; on closing, pop and verify matching pair. If stack empty before pop or wrong type → false. End with empty stack.
**Explanation:** O(n) time, O(n) space. Map closers to openers. Edge: empty string → true; string starting with `)` → false.
```csharp
public static bool IsValidBrackets(string s) {
    var stack = new Stack<char>();
    var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };
    foreach (var c in s) {
        if (c is '(' or '[' or '{') stack.Push(c);
        else if (pairs.TryGetValue(c, out var open)) {
            if (stack.Count == 0 || stack.Pop() != open) return false;
        }
    }
    return stack.Count == 0;
}
```

### 43) **Sliding window** rate limiter — logic only
**Theory:** Limit requests per time window by evicting timestamps older than `windowMs`—smoother than fixed bucket for bursty traffic.
**Answer:** Per client key, maintain timestamp list; on request, remove stale entries, reject if count ≥ limit, else append `now` and allow.
**Explanation:** O(k) per request where k is requests in window—use **queue** or count index for amortized cleanup. Contrast **token bucket** (next question) for burst tolerance.
```csharp
public static bool AllowSlidingWindow(List<long> timestamps, long nowMs, int limit, long windowMs) {
    timestamps.RemoveAll(t => nowMs - t >= windowMs);
    if (timestamps.Count >= limit) return false;
    timestamps.Add(nowMs);
    return true;
}
```

### 44) **Token bucket** rate limiter — allow bursts with average cap
**Theory:** Tokens refill at steady rate up to **capacity**—allows short bursts while limiting long-run throughput (common in APIs).
**Answer:** On each request: add `(now-last)*refillRate` tokens capped at capacity; if tokens ≥ 1, consume one and allow; else reject. Update `last`.
**Explanation:** Parameters: capacity (burst), refill rate (sustained RPS). Used in networking and fab tool APIs protecting downstream systems. Thread-safety needs lock around shared bucket state.
```csharp
public static bool TryConsumeToken(ref double tokens, double capacity, double refillPerSec, ref long lastMs, long nowMs) {
    tokens = Math.Min(capacity, tokens + (nowMs - lastMs) / 1000.0 * refillPerSec);
    lastMs = nowMs;
    if (tokens < 1) return false;
    tokens -= 1;
    return true;
}
```

### 45) **Maximum subarray sum** — Kadane's algorithm
**Theory:** Find the contiguous subarray with largest sum—classic **greedy/DP** hybrid asked in logic and coding screens.
**Answer:** Track `currentMax` (best ending here) and `globalMax`. For each `n`: `currentMax = Max(n, currentMax + n)`; update `globalMax`.
**Explanation:** O(n) time, O(1) space. All-negative array: Kadane still works (`globalMax` becomes max element). Follow-up: return indices, or count of such subarrays.
```csharp
public static int MaxSubArray(int[] nums) {
    int cur = nums[0], best = nums[0];
    for (int i = 1; i < nums.Length; i++) {
        cur = Math.Max(nums[i], cur + nums[i]);
        best = Math.Max(best, cur);
    }
    return best;
}
```

### 46) **Power of two** — O(1) bit trick
**Theory:** Powers of two have exactly one set bit; `n & (n-1)` clears lowest set bit.
**Answer:** `n > 0 && (n & (n - 1)) == 0` means power of two. Alternative: `n > 0 && (n & -n) == n`.
**Explanation:** Also used for sizing buffers (align to power of 2). Edge: `n=0` is false, `n=1` is true.
```csharp
public static bool IsPowerOfTwo(int n) => n > 0 && (n & (n - 1)) == 0;
```

### 47) **Reverse integer** with overflow safety
**Theory:** Build reversed digits digit-by-digit; must detect **32-bit overflow** before it happens.
**Answer:** While `x != 0`, `pop = x % 10`, `x /= 10`. If `rev > int.MaxValue/10` or `(rev == Max/10 && pop > 7)` overflow → return 0. Else `rev = rev*10 + pop`.
**Explanation:** Negative `x` handled by sign. Interviewers want explicit overflow check, not try/catch.
```csharp
public static int Reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10; x /= 10;
        if (rev > int.MaxValue / 10 || (rev == int.MaxValue / 10 && pop > 7)) return 0;
        rev = rev * 10 + pop;
    }
    return rev;
}
```

### 48) **Anagram check** — frequency counting
**Theory:** Two strings are anagrams if character counts match—**string logic** without sorting.
**Answer:** If lengths differ → false. Count chars in first string; decrement using second; any negative count → false.
**Explanation:** O(n) time, O(1) space for ASCII (26 or 128 array). Unicode: use `Dictionary<char,int>`. Follow-up: grouped anagrams uses hash of count key.
```csharp
public static bool IsAnagram(string s, string t) {
    if (s.Length != t.Length) return false;
    var count = new int[26];
    for (int i = 0; i < s.Length; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    return count.All(c => c == 0);
}
```

### 49) **Longest substring without repeating** characters — sliding window
**Theory:** Expand window right; on duplicate, shrink left until duplicate removed—track max length.
**Answer:** `Dictionary<char,int> lastIndex`, `start` of window. For each `i`, if char seen and index >= start, move `start`. Update max and store index.
**Explanation:** O(n) time typical. Classic **sliding window on strings**—distinct from numeric sliding window rate limiter.
```csharp
public static int LengthOfLongestSubstring(string s) {
    var last = new Dictionary<char, int>();
    int start = 0, best = 0;
    for (int i = 0; i < s.Length; i++) {
        if (last.TryGetValue(s[i], out int prev) && prev >= start) start = prev + 1;
        last[s[i]] = i;
        best = Math.Max(best, i - start + 1);
    }
    return best;
}
```

### 50) **Jump game** — greedy reachability
**Theory:** Can you reach last index if `nums[i]` is max jump from `i`? Greedy tracks farthest reachable index.
**Answer:** `reach = 0`. For `i` from 0 to n-1: if `i > reach` return false; `reach = Max(reach, i + nums[i])`. Return true if `reach >= n-1`.
**Explanation:** O(n) time, O(1) space. Different from DP path counting—this is **feasibility greedy**. Minimum jumps is DP/BFS follow-up.
```csharp
public static bool CanJump(int[] nums) {
    int reach = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > reach) return false;
        reach = Math.Max(reach, i + nums[i]);
    }
    return true;
}
```

### 51) **Find peak element** — binary search on unsorted array
**Theory:** Peak where `nums[i] > nums[i±1]` must exist (ends treated as -∞). Binary search on **which half must contain a peak**.
**Answer:** `lo`, `hi`. `mid = lo + (hi-lo)/2`. If `nums[mid] < nums[mid+1]`, peak is right (`lo=mid+1`); else peak is left including mid (`hi=mid`).
**Explanation:** O(log n)—interviewers test binary search beyond sorted arrays. Clarify boundary conditions for `mid == n-1`.
```csharp
public static int FindPeakElement(int[] nums) {
    int lo = 0, hi = nums.Length - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < nums[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

### 52) **Balance scale puzzle** — find one heavy coin among eight
**Theory:** Classic **logic puzzle**: 8 coins, one heavier; 2 weighings on balance scale—divide and conquer.
**Answer:** Weigh 3 vs 3. Equal → heavy is in remaining 2 (weigh them). Unequal → heavy in heavier trio; weigh 1 vs 1 from that trio (third is heavy if equal).
**Explanation:** Generalizes to 12 coins / 3 weighings. Interview tests structured reasoning, not code speed—state invariants after each weighing.
```txt
Weigh A: coin1-3 vs coin4-6
  balanced -> heavy in {7,8} -> second weigh 7 vs 8
  left heavy -> heavy in {1,2,3} -> weigh 1 vs 2 (3 if equal)
```
