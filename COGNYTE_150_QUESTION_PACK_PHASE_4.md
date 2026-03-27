# Cognyte Interview Question Pack - Phase 4 (Q101-Q150)

Scope for this phase:
- Logic / LeetCode-style junior interview questions
- Mixed frontend interview scenarios (React + Angular + JS)
- Each question includes theory, answer, explanation, and real code

---

## Logic / LeetCode Patterns (Q101-Q135)

### 101) Two Sum - how do you solve it in O(n)?
**Theory:** Hash maps trade memory for speed.
**Answer:** Scan once and store seen values; for each number, check if complement exists.
**Explanation:** Avoid nested loops (`O(n^2)`).
```js
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
```

### 102) Valid Parentheses - best approach?
**Theory:** Stack is natural for nested structures.
**Answer:** Push opening brackets, pop and validate closing brackets.
**Explanation:** Any mismatch or leftover open bracket means invalid.
```js
function isValid(s) {
  const map = { ")": "(", "]": "[", "}": "{" };
  const st = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") st.push(ch);
    else if (st.pop() !== map[ch]) return false;
  }
  return st.length === 0;
}
```

### 103) Reverse a string in-place?
**Theory:** Two-pointer pattern is optimal.
**Answer:** Swap characters from both ends moving inward.
**Explanation:** Time `O(n)`, space `O(1)` for mutable array.
```js
function reverseChars(arr) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
  return arr;
}
```

### 104) Check if a string is palindrome (alphanumeric only)?
**Theory:** Normalize + two pointers.
**Answer:** Skip non-alphanumeric and compare lowercase chars from both ends.
**Explanation:** Avoid creating large extra strings if possible.
```js
function isPalindrome(s) {
  const ok = c => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !ok(s[l])) l++;
    while (l < r && !ok(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}
```

### 105) Best Time to Buy and Sell Stock (one transaction)?
**Theory:** Track running minimum.
**Answer:** Keep smallest seen price and max profit.
**Explanation:** Single pass.
```js
function maxProfit(prices) {
  let min = Infinity, best = 0;
  for (const p of prices) {
    min = Math.min(min, p);
    best = Math.max(best, p - min);
  }
  return best;
}
```

### 106) Contains Duplicate?
**Theory:** Set gives uniqueness check quickly.
**Answer:** If set size is smaller than array length, duplicates exist.
**Explanation:** Straight `O(n)`.
```js
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
```

### 107) Find missing number in 0..n?
**Theory:** Arithmetic sum formula.
**Answer:** Expected sum minus actual sum gives missing number.
**Explanation:** Efficient and simple.
```js
function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  return expected - actual;
}
```

### 108) Move zeroes to end preserving order?
**Theory:** Two-pointer write index.
**Answer:** Write non-zero values first, fill rest with zero.
**Explanation:** In-place, `O(n)`.
```js
function moveZeroes(nums) {
  let write = 0;
  for (let i = 0; i < nums.length; i++) if (nums[i] !== 0) nums[write++] = nums[i];
  while (write < nums.length) nums[write++] = 0;
  return nums;
}
```

### 109) Merge two sorted arrays?
**Theory:** Classic merge step.
**Answer:** Compare heads and append smaller.
**Explanation:** Linear over combined sizes.
```js
function mergeSorted(a, b) {
  let i = 0, j = 0, out = [];
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
```

### 110) Binary search template?
**Theory:** Works on sorted arrays.
**Answer:** Narrow search space using mid compare.
**Explanation:** Time `O(log n)`.
```js
function binarySearch(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}
```

### 111) Maximum subarray (Kadane)?
**Theory:** Dynamic local best and global best.
**Answer:** At each index choose extend or restart.
**Explanation:** `O(n)`.
```js
function maxSubArray(nums) {
  let curr = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}
```

### 112) Climbing stairs DP?
**Theory:** Fibonacci relation.
**Answer:** ways(n) = ways(n-1) + ways(n-2).
**Explanation:** Iterative DP avoids recursion overhead.
```js
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

### 113) Fibonacci with memoization?
**Theory:** Cache repeated subproblems.
**Answer:** Store computed values in map/object.
**Explanation:** Converts exponential recursion to linear.
```js
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] != null) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```

### 114) Sliding window for longest unique substring?
**Theory:** Window expands/contracts with constraints.
**Answer:** Track last seen index and move left boundary.
**Explanation:** `O(n)` with map.
```js
function lengthOfLongestSubstring(s) {
  let left = 0, best = 0;
  const last = new Map();
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch)) left = Math.max(left, last.get(ch) + 1);
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### 115) Group anagrams?
**Theory:** Canonical key groups equivalent strings.
**Answer:** Sort each word letters and use as key.
**Explanation:** Same key means same anagram group.
```js
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}
```

### 116) Find first non-repeating character index?
**Theory:** Frequency counting.
**Answer:** Count chars, then first index with count 1.
**Explanation:** Two passes.
```js
function firstUniqChar(s) {
  const f = {};
  for (const ch of s) f[ch] = (f[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) if (f[s[i]] === 1) return i;
  return -1;
}
```

### 117) Intersection of two arrays?
**Theory:** Set membership check.
**Answer:** Put one array in set and filter unique matches.
**Explanation:** Efficient lookups.
```js
function intersection(a, b) {
  const s = new Set(a);
  return [...new Set(b.filter(x => s.has(x)))];
}
```

### 118) Rotate array by k?
**Theory:** Normalize k and rebuild order.
**Answer:** Use slicing from end/start.
**Explanation:** For in-place variant, use reverse trick.
```js
function rotate(nums, k) {
  const n = nums.length;
  k %= n;
  return nums.slice(n - k).concat(nums.slice(0, n - k));
}
```

### 119) Min stack design?
**Theory:** Track min at each push.
**Answer:** Maintain stack and minStack in parallel.
**Explanation:** `getMin` becomes `O(1)`.
```js
class MinStack {
  constructor() { this.s = []; this.m = []; }
  push(x) { this.s.push(x); this.m.push(this.m.length ? Math.min(x, this.m[this.m.length - 1]) : x); }
  pop() { this.m.pop(); return this.s.pop(); }
  top() { return this.s[this.s.length - 1]; }
  getMin() { return this.m[this.m.length - 1]; }
}
```

### 120) Queue using two stacks?
**Theory:** Reverse order via second stack.
**Answer:** Push into input stack; pop from output stack, refill when empty.
**Explanation:** Amortized `O(1)`.
```js
class MyQueue {
  constructor() { this.in = []; this.out = []; }
  push(x) { this.in.push(x); }
  shiftStacks() { if (!this.out.length) while (this.in.length) this.out.push(this.in.pop()); }
  pop() { this.shiftStacks(); return this.out.pop(); }
  peek() { this.shiftStacks(); return this.out[this.out.length - 1]; }
  empty() { return this.in.length === 0 && this.out.length === 0; }
}
```

### 121) Linked list reverse iterative?
**Theory:** Rewire pointers one by one.
**Answer:** Track `prev`, `curr`, `next`.
**Explanation:** Linear time, constant space.
```js
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

### 122) Detect cycle in linked list?
**Theory:** Fast/slow pointers.
**Answer:** If fast meets slow, cycle exists.
**Explanation:** Floyd algorithm.
```js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

### 123) Depth-first search (binary tree)?
**Theory:** DFS explores depth before siblings.
**Answer:** Recursive preorder/inorder/postorder patterns.
**Explanation:** Useful for tree processing.
```js
function preorder(root, out = []) {
  if (!root) return out;
  out.push(root.val);
  preorder(root.left, out);
  preorder(root.right, out);
  return out;
}
```

### 124) Breadth-first search (binary tree)?
**Theory:** BFS explores level by level.
**Answer:** Use queue.
**Explanation:** Great for shortest path in unweighted graphs/levels in tree.
```js
function levelOrder(root) {
  if (!root) return [];
  const q = [root], out = [];
  while (q.length) {
    const node = q.shift();
    out.push(node.val);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
  return out;
}
```

### 125) Maximum depth of binary tree?
**Theory:** Depth = 1 + max(leftDepth, rightDepth).
**Answer:** Recursive DFS.
**Explanation:** Base case null depth 0.
```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

### 126) Count frequencies efficiently?
**Theory:** Frequency map pattern appears often.
**Answer:** Use object or Map and increment counts.
**Explanation:** `O(n)` counting.
```js
function freq(arr) {
  const m = new Map();
  for (const x of arr) m.set(x, (m.get(x) || 0) + 1);
  return m;
}
```

### 127) Top K frequent elements?
**Theory:** Frequency map + sorting/min-heap.
**Answer:** For junior level, map + sort by frequency.
**Explanation:** Easy to reason in interviews.
```js
function topKFrequent(nums, k) {
  const m = {};
  for (const n of nums) m[n] = (m[n] || 0) + 1;
  return Object.entries(m)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([n]) => Number(n));
}
```

### 128) Isomorphic strings?
**Theory:** One-to-one char mapping both directions.
**Answer:** Map chars from s->t and t->s while iterating.
**Explanation:** Prevents conflicting mappings.
```js
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const st = {}, ts = {};
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if ((st[a] && st[a] !== b) || (ts[b] && ts[b] !== a)) return false;
    st[a] = b; ts[b] = a;
  }
  return true;
}
```

### 129) Longest common prefix?
**Theory:** Compare chars position-wise.
**Answer:** Start with first string as prefix and shrink.
**Explanation:** Stop when all strings share prefix.
```js
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let p = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(p)) p = p.slice(0, -1);
    if (!p) return "";
  }
  return p;
}
```

### 130) Product of array except self (no division)?
**Theory:** Prefix and suffix products.
**Answer:** First pass builds left product, second multiplies right product.
**Explanation:** `O(n)` time, no division.
```js
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) { out[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
  return out;
}
```

### 131) Can you solve coin change with DP?
**Theory:** Build minimum coins for each amount bottom-up.
**Answer:** `dp[a] = min(dp[a], dp[a-coin]+1)` for all coins.
**Explanation:** Standard unbounded knapsack variant.
```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1);
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### 132) How to debounce search input?
**Theory:** Avoid API call on every keystroke.
**Answer:** Delay handler execution until typing pauses.
**Explanation:** Reduces server load and UI jitter.
```js
function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
```

### 133) How to throttle scroll handler?
**Theory:** High-frequency events can hurt performance.
**Answer:** Execute at most once per interval.
**Explanation:** Good for scroll/resize.
```js
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}
```

### 134) What is backtracking (permutations example)?
**Theory:** Build candidates incrementally, undo (backtrack).
**Answer:** Recursive choose/explore/unchoose pattern.
**Explanation:** Useful for combinations/permutations.
```js
function permute(nums) {
  const out = [], used = new Array(nums.length).fill(false);
  function dfs(path) {
    if (path.length === nums.length) { out.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      dfs(path);
      path.pop(); used[i] = false;
    }
  }
  dfs([]);
  return out;
}
```

### 135) How do you reason about edge cases in coding interviews?
**Theory:** Correctness includes boundaries, not only main path.
**Answer:** Explicitly test empty input, single element, duplicates, negative/zero, max constraints.
**Explanation:** Mentioning edge cases shows maturity.
```js
function safeAverage(nums) {
  if (!Array.isArray(nums) || nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
```

---

## Mixed Interview Scenarios (Q136-Q150)

### 136) React: How to fetch data with loading and error states?
**Theory:** Reliable UX needs explicit async states.
**Answer:** Track `loading`, `error`, and `data` in state; render conditionally.
**Explanation:** Prevents blank screen and improves debugging.
```jsx
function Users() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### 137) React: How to avoid stale state updates?
**Theory:** Closures can capture old values.
**Answer:** Use functional setter when next state depends on previous.
**Explanation:** Ensures latest state in concurrent updates.
```jsx
const [count, setCount] = React.useState(0);
function incrementTwice() {
  setCount(c => c + 1);
  setCount(c => c + 1);
}
```

### 138) React: How to memoize expensive filtering?
**Theory:** Heavy computations can rerun unnecessarily.
**Answer:** Use `useMemo` with correct dependencies.
**Explanation:** Compute only when inputs change.
```jsx
const visible = React.useMemo(
  () => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
  [products, query]
);
```

### 139) Angular: How to call API and unsubscribe safely?
**Theory:** Subscriptions may leak on destroy.
**Answer:** Use `takeUntil` with `Subject` and complete in `ngOnDestroy`.
**Explanation:** Prevents lingering subscriptions.
```ts
private destroy$ = new Subject<void>();

ngOnInit() {
  this.http.get('/api/users')
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => this.users = res as any[]);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### 140) Angular: How to guard routes by auth?
**Theory:** Route-level access control.
**Answer:** Implement `CanActivate` and redirect unauthenticated users.
**Explanation:** Security + UX consistency.
```ts
canActivate(): boolean | UrlTree {
  return this.auth.isLoggedIn()
    ? true
    : this.router.parseUrl('/login');
}
```

### 141) JS: How to implement retry with exponential backoff?
**Theory:** Transient failures can succeed on retry.
**Answer:** Retry async function with increasing delay between attempts.
**Explanation:** Common in resilient frontend API clients.
```js
async function retry(fn, attempts = 3, baseMs = 200) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) {
      lastErr = e;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, baseMs * 2 ** i));
    }
  }
  throw lastErr;
}
```

### 142) JS: How to deep clone safely in modern runtime?
**Theory:** Spread is shallow for nested objects.
**Answer:** Use `structuredClone` where available.
**Explanation:** Preserves nested structure better than naive JSON in many cases.
```js
const original = { user: { name: "A" } };
const copy = structuredClone(original);
copy.user.name = "B"; // original unchanged
```

### 143) Frontend: How to centralize API errors?
**Theory:** Repeated try/catch logic creates inconsistency.
**Answer:** Create one API wrapper that normalizes responses/errors.
**Explanation:** UI can rely on predictable shape.
```js
async function apiGet(url) {
  const res = await fetch(url);
  let body = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) throw new Error(body?.message || `HTTP ${res.status}`);
  return body;
}
```

### 144) React: Controlled form with validation?
**Theory:** Controlled inputs simplify validation and UX.
**Answer:** Keep value/errors in state and validate on submit/change.
**Explanation:** Predictable form behavior.
```jsx
function EmailForm() {
  const [email, setEmail] = React.useState("");
  const [err, setErr] = React.useState("");
  const submit = (e) => {
    e.preventDefault();
    setErr(/^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email");
  };
  return <form onSubmit={submit}>
    <input value={email} onChange={e => setEmail(e.target.value)} />
    {err && <p>{err}</p>}
    <button>Send</button>
  </form>;
}
```

### 145) Angular: Reactive form validation example?
**Theory:** Reactive forms scale well in enterprise apps.
**Answer:** Use `FormGroup`, `FormControl`, and validators.
**Explanation:** Centralizes form logic in component class.
```ts
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email])
});

get emailInvalid() {
  const c = this.form.controls.email;
  return c.touched && c.invalid;
}
```

### 146) How to explain component communication in Angular?
**Theory:** Parent-child communication patterns are interview staple.
**Answer:** Use `@Input` for data down and `@Output` EventEmitter for events up.
**Explanation:** Keeps one-way data flow.
```ts
@Input() item!: string;
@Output() removed = new EventEmitter<string>();

remove() { this.removed.emit(this.item); }
```

### 147) React: Parent-child communication equivalent?
**Theory:** Same concept with props and callback props.
**Answer:** Parent passes data + callback; child invokes callback on events.
**Explanation:** Core of React one-way data flow.
```jsx
function Child({ item, onRemove }) {
  return <button onClick={() => onRemove(item.id)}>Remove {item.name}</button>;
}
```

### 148) How to test a utility function quickly (Jest style)?
**Theory:** Unit tests prove correctness and prevent regressions.
**Answer:** Arrange input, call function, assert expected output.
**Explanation:** Keep tests focused and deterministic.
```js
function sum(a, b) { return a + b; }

test("sum adds numbers", () => {
  expect(sum(2, 3)).toBe(5);
});
```

### 149) How to discuss performance optimization in interview?
**Theory:** Interviewers want measured optimization, not random tricks.
**Answer:** Baseline -> identify bottleneck -> optimize -> measure again.
**Explanation:** Talk with metrics and trade-offs.
```js
console.time("filter");
const out = data.filter(x => x.active);
console.timeEnd("filter");
```

### 150) How to solve live coding under pressure?
**Theory:** Process and communication matter as much as final code.
**Answer:** Clarify requirements, state approach, code incrementally, test examples, discuss complexity.
**Explanation:** Structured approach reduces mistakes.
```js
function solve(nums) {
  // 1) Handle edge cases
  if (!Array.isArray(nums) || nums.length === 0) return 0;
  // 2) Main logic (example)
  return nums.reduce((a, b) => a + b, 0);
}
```

---

## Self-Verification for Phase 4

- [ ] Solve 20/35 logic questions from memory (without reading answer first).
- [ ] Re-code at least 10 solutions from scratch in <= 35 minutes.
- [ ] For mixed questions, explain both implementation and trade-offs out loud.
- [ ] Mark weak patterns and repeat them next day first (spaced repetition).
