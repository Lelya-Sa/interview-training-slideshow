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

## API & Fullstack Frontend Integration (Q181-Q200)

### 181) What is REST and what does “stateless” mean for APIs?
**Theory:** Most junior roles integrate with REST-style HTTP APIs.
**Answer:** REST uses HTTP resources and standard verbs; stateless means each request carries what the server needs (tokens, IDs)—the server does not rely on prior in-memory session for that call.
**Explanation:** Interviewers check you know why scaling and caching relate to statelessness.
```js
// Stateless: auth in header each request
fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
```

### 182) When do you use GET vs POST vs PUT vs PATCH vs DELETE?
**Theory:** Correct verb choice shows HTTP literacy.
**Answer:** GET: read safe, POST: create/non-idempotent actions, PUT: replace resource, PATCH: partial update, DELETE: remove.
**Explanation:** Wrong verbs break caches, proxies, and expectations.
```js
await fetch("/api/users/1", { method: "PATCH", body: JSON.stringify({ name: "Ann" }), headers: { "Content-Type": "application/json" } });
```

### 183) How do you interpret common HTTP status codes in an interview?
**Theory:** You must map codes to user-facing behavior.
**Answer:** 2xx success, 400 bad input, 401 not authenticated, 403 forbidden, 404 missing, 409 conflict, 429 rate limited, 5xx server error.
**Explanation:** Example: 401 often means refresh/login; 403 means logged in but not allowed.
```js
if (res.status === 401) router.navigate(["/login"]);
if (res.status === 403) showToast("You cannot do this.");
```

### 184) What is CORS and why does the browser block your request sometimes?
**Theory:** Security model for cross-origin fetches.
**Answer:** CORS is browser enforcement: a page on origin A cannot read responses from origin B unless B sends allowed headers and origin checks pass.
**Explanation:** Fix is server CORS policy or same-origin proxy—`no-cors` is not a real read fix for JSON.
```txt
Browser blocks when API response lacks Access-Control-Allow-Origin for your frontend origin.
```

### 185) What is an HTTP preflight (OPTIONS) request?
**Theory:** “Simple” vs non-simple requests trigger extra checks.
**Answer:** For some methods/headers/content-types the browser sends OPTIONS first; server must respond allowing method and headers.
**Explanation:** Interviews mention it when debugging “works in Postman, fails in browser”.
```txt
Custom headers like Authorization can trigger preflight.
```

### 186) Where should you store JWTs for a web app, and what are the trade-offs?
**Theory:** Auth storage is a frequent junior+ question.
**Answer:** `httpOnly` cookies reduce XSS token theft vs `localStorage`, but cookies need CSRF protections on state-changing routes; `localStorage` is easier but more XSS-sensitive.
**Explanation:** Say you follow team/security guidance rather than inventing crypto.
```js
// localStorage (common in tutorials; know XSS risk)
localStorage.setItem("token", token);
```

### 187) How do you avoid sending secrets in URLs?
**Theory:** URLs leak via logs, referrers, browser history.
**Answer:** Put tokens in `Authorization` header or secure cookie, never as query string.
**Explanation:** Basic security hygiene question.
```js
fetch("/api/data", { headers: { Authorization: `Bearer ${token}` } });
```

### 188) What is idempotency and which HTTP operations are usually idempotent?
**Theory:** Retries and safe replays depend on it.
**Answer:** Repeating the request has the same effect as once. GET/PUT/DELETE are typically idempotent; POST often is not unless designed (idempotency keys).
**Explanation:** Explains why POST retries can duplicate records.
```txt
PUT /users/1 with same body twice should still represent one replaced state.
```

### 189) How do you handle race conditions when the user triggers fast repeated searches?
**Theory:** Out-of-order responses overwrite newer results with old data.
**Answer:** Cancel prior requests (AbortController), use `switchMap` in RxJS, or ignore stale responses via request sequence id.
**Explanation:** Very common in React/Angular data fetching interviews.
```ts
// RxJS: latest search wins
this.term$.pipe(switchMap(t => this.http.get(`/api/search?q=${t}`))).subscribe();
```

### 190) How do you centralize API calls and error mapping for the UI?
**Theory:** Duplicated fetch logic scatters error handling bugs.
**Answer:** One client layer: base URL, JSON parsing, map HTTP errors to user-friendly messages, optional logging.
**Explanation:** Pairs with interceptors in Angular or a `apiClient` in React.
```js
async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, opts);
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, body?.message);
  return body;
}
```

### 191) Why validate or normalize API responses before rendering?
**Theory:** Backend fields may be null, renamed, or inconsistent.
**Answer:** Parse to a small UI model, default missing fields, and guard renders—prevents white screen crashes.
**Explanation:** Shows production mindset.
```js
function toUser(raw) {
  return { id: raw.id, name: raw.name ?? "Unknown", email: raw.email ?? "" };
}
```

### 192) What is optimistic UI and when is it risky?
**Theory:** Perceived speed vs consistency.
**Answer:** Update UI before server confirms; on failure roll back or show error.
**Explanation:** Risky for payments or strict ordering; good for likes toggles with undo.
```js
setLiked(true); postLike(id).catch(() => setLiked(false));
```

### 193) Polling vs WebSocket: how would you choose (junior-level)?
**Theory:** Real-time requirements vs simplicity.
**Answer:** Polling is simple repeated HTTP; WebSocket/SSE suits push/high-frequency updates.
**Explanation:** Many teams start with polling; upgrade when needed.
```js
const id = setInterval(() => refresh(), 5000);
```

### 194) How do environment-specific API base URLs work in deployment?
**Theory:** Dev/stage/prod hosts differ.
**Answer:** Use env vars (`VITE_*`, `NEXT_PUBLIC_*`, Angular `environment.ts`) injected at build or runtime—never hardcode prod URLs in source for all environments.
**Explanation:** Standard deploy question.
```ts
export const environment = { apiUrl: "https://api.example.com" };
```

### 195) What is API pagination and how do offset vs cursor differ?
**Theory:** Large lists cannot load at once.
**Answer:** Offset/limit (`?page=&size=`) is simple but unstable if data shifts; cursor (`?after=id`) is better for live feeds.
**Explanation:** Interview wants you to mention “duplicate/missing rows” with naive offset.
```js
fetch(`/api/items?limit=20&cursor=${encodeURIComponent(cursor)}`);
```

### 196) How do you handle HTTP 429 Too Many Requests?
**Theory:** Client must cooperate with rate limits.
**Answer:** Back off, respect `Retry-After`, avoid tight loops, debounce user-triggered calls.
**Explanation:** Shows reliability thinking.
```js
if (res.status === 429) await sleep(Number(res.headers.get("Retry-After") || 1) * 1000);
```

### 197) compare `fetch` vs Axios in interviews: what do you say?
**Theory:** Teams standardize on one HTTP stack.
**Answer:** `fetch` is built-in, minimal; Axios adds interceptors, defaults, transform, older browser polyfill story depending on version.
**Explanation:** Angular uses `HttpClient`; React projects often use either.
```js
// fetch: manual JSON and status checks
const res = await fetch("/api/x"); if (!res.ok) throw new Error(String(res.status));
```

### 198) What is a refresh-token flow at a high level?
**Theory:** Short-lived access tokens reduce exposure.
**Answer:** Access token for API calls; when expired, call refresh endpoint with refresh token/cookie to get new access token—without re-login UX.
**Explanation:** Junior answer stays high-level; don’t invent crypto details.
```txt
Access token short TTL; refresh rotates or extends session carefully.
```

### 199) What headers matter for JSON APIs?
**Theory:** Serialization contract.
**Answer:** `Content-Type: application/json` on requests with body; server responds with JSON—client parses safely.
**Explanation:** Missing content-type breaks some servers.
```js
fetch("/api", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: 1 }) });
```

### 200) How do you explain API versioning to an interviewer?
**Theory:** Breaking changes happen.
**Answer:** Common patterns: path `/v1/users`, header `Accept: application/vnd...+version`, or query—goal is stable clients while backend evolves.
**Explanation:** Mention deprecation and communication with backend team.
```txt
Prefer explicit version in URL for clarity in many orgs.
```

---

## Frontend Testing (Q225-Q248)

### 225) What is the core idea behind React Testing Library (RTL)?
**Theory:** UI tests should resemble how users interact with the app.
**Answer:** Query the rendered DOM by roles/labels/text and assert visible outcomes—not implementation details like component state or private methods.
**Explanation:** Interviewers want confidence that you test behavior and accessibility, not brittle internals.
```tsx
// Good direction: assert what the user sees
expect(screen.getByRole("button", { name: /save/i })).toBeEnabled();
```

### 226) How do `render`, `screen`, and `getByRole` fit together?
**Theory:** RTL renders into a test DOM and exposes queries globally via `screen`.
**Answer:** `render(<App />)` mounts the tree; `screen.getByRole("heading", { level: 1 })` finds an element the way assistive tech would.
**Explanation:** Prefer roles (and accessible names) over test IDs unless there is no better option.
```tsx
import { render, screen } from "@testing-library/react";
render(<Page title="Dashboard" />);
expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
```

### 227) When do you prefer `userEvent` over `fireEvent`?
**Theory:** `userEvent` simulates realistic browser interaction sequences.
**Answer:** Use `@testing-library/user-event` for clicks, typing, tab focus—closer to real users; `fireEvent` is a lower-level escape hatch.
**Explanation:** Shows you know modern RTL best practices from the docs.
```tsx
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: /submit/i }));
```

### 228) What is the difference between `getBy*`, `queryBy*`, and `findBy*`?
**Theory:** Synchronous vs asynchronous presence matters for stable tests.
**Answer:** `getBy*` throws if missing (assert existence); `queryBy*` returns null (assert absence); `findBy*` waits/rejects (async updates).
**Explanation:** This triplet is a common junior interview filter question.
```tsx
expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
await screen.findByText(/welcome/i);
```

### 229) How do you test a component that fetches data on mount?
**Theory:** Async UI updates must be awaited in assertions.
**Answer:** Use `findBy*` or `waitFor` after rendering; mock the network layer (or MSW) so the test is deterministic.
**Explanation:** Mention avoiding arbitrary `setTimeout` sleeps.
```tsx
render(<Profile userId="u1" />);
expect(await screen.findByText(/alice/i)).toBeInTheDocument();
```

### 230) How do you mock `fetch` or a module in Jest-style tests?
**Theory:** Tests need stable inputs and no real network.
**Answer:** `global.fetch = jest.fn(async () => ({ json: async () => ({ ok: true }) }))` or `jest.mock("./api", () => ({ getUser: () => Promise.resolve({ name: "A" }) }))`.
**Explanation:** Emphasize restoring mocks between tests (`beforeEach`/`afterEach`).
```js
beforeEach(() => { jest.resetAllMocks(); });
```

### 231) When are snapshot tests helpful vs harmful?
**Theory:** Snapshots catch unintended output churn but hide intent.
**Answer:** Useful for stable serializer-like output; harmful for large evolving components where reviewers blindly update snapshots.
**Explanation:** Junior answer: prefer explicit assertions on user-visible text and roles.
```txt
Prefer targeted assertions; use snapshots sparingly for stable fixtures.
```

### 232) What should you assert in a component unit test?
**Theory:** Tests should encode requirements, not implementation.
**Answer:** Visible text, button disabled/enabled states, ARIA roles, error messages, and calls-to-action—not internal hook call order unless truly critical.
**Explanation:** Tie answers to user stories (“given empty email, show validation”).
```tsx
await user.type(screen.getByLabelText(/email/i), "a@b.com");
expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
```

### 233) Why are accessible names important in RTL queries?
**Theory:** Accessible names are how users (and AT) identify controls.
**Answer:** `getByRole("button", { name: /sign in/i })` matches the visible label/ARIA labeling algorithm—good tests double as a11y checks.
**Explanation:** Mention `getByLabelText` for form controls tied to `<label>`.
```tsx
expect(screen.getByRole("textbox", { name: /password/i })).toBeRequired();
```

### 234) How do you test that a callback prop was invoked?
**Theory:** Props are the public contract of presentational components.
**Answer:** Pass `jest.fn()` (or vi.fn) as a prop, perform the interaction, then `expect(onSave).toHaveBeenCalledWith(...)`.
**Explanation:** Shows isolation and fast feedback without mounting parents.
```tsx
const onSave = jest.fn();
render(<Form onSave={onSave} />);
await user.click(screen.getByRole("button", { name: /save/i }));
expect(onSave).toHaveBeenCalledTimes(1);
```

### 235) How do people test custom React hooks?
**Theory:** Hooks are not components; they need a harness.
**Answer:** Use `renderHook` from `@testing-library/react` (or a tiny test component wrapper) and assert return values/side effects with `act` when needed.
**Explanation:** Note that hook tests still benefit from realistic state transitions.
```tsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";
const { result } = renderHook(() => useCounter());
act(() => { result.current.inc(); });
expect(result.current.value).toBe(1);
```

### 236) What problem does Mock Service Worker (MSW) solve in React tests?
**Theory:** Full fetch stacks are hard to stub consistently.
**Answer:** MSW intercepts network requests at a low level so tests exercise real `fetch`/XHR code paths with deterministic fixtures.
**Explanation:** Mention it for integration-ish tests without spinning a real backend.
```txt
MSW = consistent API mocking across browser + node test environments.
```

### 237) What does `TestBed.configureTestingModule` do in Angular?
**Theory:** Angular tests mirror the runtime DI graph in miniature.
**Answer:** It declares/imports the component under test and provides mocks so `TestBed.createComponent` can instantiate it with dependencies.
**Explanation:** Interviewers expect you to mention `declarations`, `imports`, and `providers` at a high level.
```ts
TestBed.configureTestingModule({
  declarations: [GreeterComponent],
  providers: [{ provide: NameService, useValue: { get: () => "Ada" } }]
});
```

### 238) What is `ComponentFixture` and when do you call `detectChanges`?
**Theory:** Angular change detection is explicit in tests.
**Answer:** `fixture = TestBed.createComponent(MyCmp);` gives `fixture.componentInstance` and `fixture.nativeElement`; call `fixture.detectChanges()` after changing inputs/inputs-bound fields to render updates.
**Explanation:** Missing `detectChanges` is a classic “my test DOM is empty” bug in interviews.
```ts
const fixture = TestBed.createComponent(GreeterComponent);
fixture.componentInstance.name = "Bob";
fixture.detectChanges();
expect(fixture.nativeElement.textContent).toContain("Bob");
```

### 239) How do you get a service instance in an Angular unit test?
**Theory:** DI is central to Angular; tests should resolve services the same way.
**Answer:** `TestBed.inject(MyService)` (or `fixture.debugElement.injector.get(...)` for localized providers).
**Explanation:** Prefer `TestBed.inject` for clarity in modern Angular.
```ts
const svc = TestBed.inject(CartService);
expect(svc.total()).toBe(0);
```

### 240) What are `fakeAsync` and `tick` used for?
**Theory:** Time-based async can make tests flaky without control.
**Answer:** `fakeAsync` wraps a test so `tick(ms)` advances the virtual timer and flushes microtasks in a deterministic way (useful for `setTimeout`, debounce, etc.).
**Explanation:** Contrast with `waitForAsync` + `fixture.whenStable()` as another pattern.
```ts
it("debounces", fakeAsync(() => {
  fixture.detectChanges();
  tick(300);
  fixture.detectChanges();
  expect(...).toBe(...);
}));
```

### 241) Why use `HttpClientTestingModule` for service tests?
**Theory:** Real HTTP would be slow and nondeterministic.
**Answer:** It swaps the backend with a test harness that records expectations on outgoing requests.
**Explanation:** Sets up the companion `HttpTestingController`.
```ts
TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],
  providers: [UserApiService]
});
```

### 242) How does `HttpTestingController.expectOne` work?
**Theory:** You assert both the request shape and the mocked response.
**Answer:** After the service method runs, `httpMock.expectOne("/api/user")` grabs the request; call `req.flush({ id: 1 })` to complete it; then `httpMock.verify()` ensures no stray requests.
**Explanation:** Forgetting `verify()` hides accidental extra calls.
```ts
const req = httpMock.expectOne(r => r.url.includes("/api/user"));
req.flush({ name: "Ada" });
httpMock.verify();
```

### 243) How do you test an Angular `@Input()` binding?
**Theory:** Inputs are just component properties before CD runs.
**Answer:** Set `fixture.componentInstance.userId = "u1"` (or use a host test component template), then `detectChanges`, then assert DOM.
**Explanation:** Shows you understand property bindings vs attributes in tests.
```ts
fixture.componentInstance.label = "Save";
fixture.detectChanges();
expect(fixture.nativeElement.querySelector("button")?.textContent).toContain("Save");
```

### 244) When would you use `fixture.debugElement.query`?
**Theory:** `debugElement` wraps Angular elements with test helpers.
**Answer:** Use `By.css(".err")` or `By.directive(MyDir)` when you need DI-aware queries instead of raw `querySelector`.
**Explanation:** Junior tip: start simple with `nativeElement`, upgrade when DI/directives matter.
```ts
const err = fixture.debugElement.query(By.css(".error"));
expect(err.nativeElement.textContent).toContain("required");
```

### 245) How do you spy on a service method in Angular tests?
**Theory:** Spies verify collaboration without real work.
**Answer:** `spyOn(service, "save").and.callThrough()` or return resolved promises; assert the spy was called after UI interaction.
**Explanation:** Same idea as `jest.fn` in React tests, different syntax.
```ts
const api = TestBed.inject(ApiService);
spyOn(api, "load").and.returnValue(Promise.resolve([]));
```

### 246) What is the difference between an isolated component test and a more integrated module test?
**Theory:** Tests trade speed vs confidence.
**Answer:** Isolated tests stub child components/services; integrated tests import real child modules to catch wiring issues—slower but closer to the app.
**Explanation:** Give a pragmatic rule: default isolated, add integration for routing/forms trouble spots.
```txt
Isolated = fast + focused; integrated = catches real template/DI mistakes.
```

### 247) When do you reach for E2E instead of unit/component tests?
**Theory:** Different layers catch different bugs.
**Answer:** E2E (Playwright/Cypress) validates full flows across routing, auth, and real backends; unit tests validate logic and small UI states cheaply.
**Explanation:** Mention flakiness/time cost of E2E as a trade-off.
```txt
Unit: cheap signal; E2E: user journey confidence, slower and flakier.
```

### 248) What does running tests in CI typically require?
**Theory:** CI environments are non-interactive.
**Answer:** Use non-watch mode (`CI=true` on many React setups), fail builds on test failures, cache dependencies, and shard suites if slow.
**Explanation:** Shows operational maturity beyond writing a single test file.
```yaml
# concept only
- run: npm test -- --watch=false
```

---

## Frontend architecture & clean code (Day 10 interview set, Q358-Q385)

Topics align with common 2025–2026 junior–mid frontend interviews: feature-first layout, colocation, clear boundaries, fetch/state libraries, and measurable quality (a11y, bundles, CI)—see e.g. [frontend system design axes](https://frontendinterviews.dev/frontend-system-design-interview-questions), [feature/colocation guidance](https://feature-sliced.design/blog/frontend-folder-structure), and popular “interviews in 2026” digests on Dev.to/Coursera.

### 358) Feature-first vs type-first folder structure—what do you say in an interview?
**Theory:** Folder structure is how teams scale changes without merge conflicts and fear.
**Answer:** **Feature-first** groups by product area (`checkout/`, `profile/`) with UI, state, and API helpers together; **type-first** splits `components/`, `hooks/`, `services/` globally—fine for tiny apps, painful when features cross-cut.
**Explanation:** Tie choice to team size and rate of change—interviewers want trade-offs, not dogma.
```txt
Feature-first: checkout/{components,api,model}; Type-first: components/, hooks/
```

### 359) What is colocation in frontend projects?
**Theory:** Related code should live where it is easiest to change together.
**Answer:** Keep component-specific styles, tests, and hooks next to the component; promote to `shared/` only when a second feature truly reuses it.
**Explanation:** Reduces “jumping around the repo” and signals you understand maintainability.
```txt
CheckoutForm.tsx next to CheckoutForm.test.tsx and checkoutSchema.ts
```

### 360) What does “screaming architecture” mean on the front end?
**Theory:** The project tree should shout *what the app does*, not *which framework won*.
**Answer:** Top-level folders reflect domains/features (billing, auth) rather than only technical layers—Angular/React both benefit.
**Explanation:** Mentally map interviewer’s product to folders you would create on day one.
```txt
insurance-quote/ vs generic views/ + utils/
```

### 361) What is the presentational vs container (smart/dumb) split?
**Theory:** Separates rendering from orchestration for readability and tests.
**Answer:** **Presentational** receives data via props and emits events; **container** loads data, wires routing, and composes children.
**Explanation:** Modern hooks blur lines—still a strong vocabulary for discussing where side effects live.
```tsx
<UserCard user={user} onEdit={onEdit} /> // presentational
const UserPage = () => { const { data } = useQuery(...); return <UserCard user={data} />; }; // container-ish
```

### 362) How do you decide if a component is “too big”?
**Theory:** Interviewers probe Maintainability and SRP.
**Answer:** Split when file mixes unrelated concerns (data loading + complex form + routing), when JSX branches are hard to follow, or when tests need huge setup—extract subcomponents and hooks with clear names.
**Explanation:** Mention cohesion: things that change together stay together.
```txt
>200 lines is a smell, not a law; cohesion matters more
```

### 363) Where should HTTP calls live: components vs service layer?
**Theory:** Clear boundaries make mocking and reuse easier.
**Answer:** Prefer a thin **API module** (functions or client class) per domain; components call those functions or hooks that wrap them—not raw URLs scattered in JSX.
**Explanation:** Angular services or React hooks both can sit above fetch/HttpClient.
```ts
export async function fetchUser(id: string) { return api.get<User>(`/users/${id}`); }
```

### 364) When is “DRY” harmful?
**Theory:** Premature abstraction creates rigid code.
**Answer:** Duplication is cheaper than the wrong abstraction—wait for the **third** similar use case or clear domain pattern before extracting.
**Explanation:** Classic senior-junior quote to show judgment: “reuse real patterns, not accidental similarity.”
```txt
Rule of three / avoid parametrized mega-components
```

### 365) Why favor composition over class inheritance in modern UI code?
**Theory:** React/functional style rewards composition; Angular uses DI composition heavily.
**Answer:** Build behavior by combining small pieces (hooks, directives, components) instead of deep inheritance trees that hide behavior.
**Explanation:** Mention higher-order patterns briefly: render props, custom hooks, Angular feature modules.
```tsx
const Layout = ({ nav, main }) => <><Nav>{nav}</Nav><Main>{main}</Main></>;
```

### 366) What are barrel files (`index.ts`) good and bad for?
**Theory:** Convenience vs build tool costs.
**Answer:** Barrels simplify imports for a folder; they can hurt **tree-shaking** or slow IDE if everything re-exports everything—keep barrels shallow and explicit.
**Explanation:** Mention team lint rules (`eslint-plugin-barrel-files`) if interviewer expects tooling awareness.
```ts
// checkout/index.ts — export { CheckoutPage } from "./CheckoutPage";
```

### 367) What are design tokens and why do teams use them?
**Theory:** Consistent visual language across app and design handoff.
**Answer:** Tokens name colors, spacing, typography as data—fed into CSS variables, Tailwind theme, or Material theming—so rebrand updates centralize.
**Explanation:** Junior ties to “single source of truth,” not full design-system deep dive.
```css
:root { --color-primary: #2563eb; }
```

### 368) How do loading / empty / error states relate to architecture?
**Theory:** Resilience is part of UX architecture, not an afterthought.
**Answer:** Model async states explicitly (`idle|loading|success|error`) or use query libraries’ built-in flags; avoid blank screens that confuse users and observability.
**Explanation:** Connects to interview “system design” axes: reliability and clarity.
```tsx
if (isLoading) return <Skeleton />;
if (isError) return <ErrorBanner retry={refetch} />;
```

### 369) Where should translation strings live in a scalable app?
**Theory:** i18n touches many layers—pick one workflow early.
**Answer:** Namespace per feature (`checkout.json`), keys stable and descriptive; avoid hard-coded UI strings in business logic files.
**Explanation:** Mention ICU/plural rules only if interviewer goes deeper.
```json
{ "checkout.title": "Checkout" }
```

### 370) How do you handle public config and secrets on the frontend?
**Theory:** Browsers expose bundled values—never ship private secrets.
**Answer:** Use build-time env vars (`VITE_*`, `NEXT_PUBLIC_*`, Angular `environment.ts`) for **non-secret** flags and public API URLs; real secrets stay on backend.
**Explanation:** Classic pitfall story wins interviews.
```txt
API_BASE_URL ok; DATABASE_PASSWORD never
```

### 371) How do feature flags change how you structure code?
**Theory:** Release risk management without long-lived branches.
**Answer:** Isolate flag checks in one place (provider or hook) and keep flagged code paths testable; avoid sprinkling `if (flag)` everywhere without cleanup plan.
**Explanation:** Mention removing dead flag code after rollout.
```ts
const { on } = useFlags(); return on("newCheckout") ? <CheckoutV2 /> : <CheckoutV1 />;
```

### 372) How do circular dependencies bite SPA codebases?
**Theory:** Module graphs should be acyclic for predictable bundling.
**Answer:** Cycles often come from `A` importing `B` importing `A` via barrel files or shared helpers—fix by extracting a third `shared/types` or inverting dependency direction.
**Explanation:** Mention `madge`/`dependency-cruiser` if tools come up.
```txt
Extract interfaces to shared module or push logic down the dependency tree
```

### 373) What minimal observability can a junior add on the client?
**Theory:** Production issues need signals—not only `console.log`.
**Answer:** Structured error reporting (Sentry/OpenTelemetry hooks), correlation IDs from API responses in logs, user action breadcrumbs for critical flows.
**Explanation:** Links to “resilience & observability” themes in modern frontend system-design prep.
```ts
reportError({ flow: "checkout", step: "pay", err });
```

### 374) Why is accessibility part of architecture, not a polish step?
**Theory:** Retrofitting a11y is expensive; legal and UX requirements matter.
**Answer:** Semantic HTML, focus management, labels, and keyboard paths should be designed with components—lint with eslint-plugin-jsx-a11y / Angular equivalents.
**Explanation:** Shows maturity beyond visuals-only thinking.
```html
<button type="button" aria-expanded={open}>Menu</button>
```

### 375) What do you look for in a teammate’s PR (junior list)?
**Theory:** Code review is where culture scales.
**Answer:** Correctness, readability, tests for tricky logic, no secrets, performance smells (N+1 fetches), a11y basics, and clear commit/PR description.
**Explanation:** Mention requesting screenshots for UI changes when relevant.
```txt
Naming, edge cases, tests, security, bundle impact
```

### 376) How do naming conventions help architecture at scale?
**Theory:** Predictability beats cleverness.
**Answer:** Consistent file suffixes (`.component`, `.hook`, `.service`), consistent event handler names (`onSubmit` vs `handleSubmit` team pick one), and domain vocabulary in module names reduce cognitive load.
**Explanation:** Interview: “align with existing codebase rather than inventing styles.”
```txt
UserCard.tsx, useUserQuery.ts, userApi.ts
```

### 377) What basic bundle strategies should juniors mention?
**Theory:** Users pay network cost for unused code.
**Answer:** Route-level code splitting, lazy imports, analyzing bundles (source-map-explorer / Vite rollup visualizer), avoid importing whole libraries when a sub-import exists.
**Explanation:** Tie action to LCP/TTI improvements when asked “why.”
```ts
const Admin = lazy(() => import("./Admin"));
```

### 378) What role does TanStack Query (React Query) play in architecture?
**Theory:** In 2025–2026 interviews, “server state vs client state” is a frequent theme.
**Answer:** It caches server data, dedupes requests, standardizes loading/error/retry, and separates **remote state** from local UI state—often replacing ad hoc `useEffect` fetches.
**Explanation:** Angular analogue: `HttpClient` + custom cache or data services with similar concerns.
```ts
const q = useQuery({ queryKey: ["user", id], queryFn: () => fetchUser(id) });
```

### 379) What is a “facade” in Angular (or similar) feature design?
**Theory:** One narrow API surface per feature reduces coupling.
**Answer:** Components call a single injectable facade that coordinates services, stores, and HTTP—rather than injecting five services into templates.
**Explanation:** Mirrors React “hooks that compose domain calls” pattern.
```ts
@Injectable() export class CheckoutFacade { submit() { /* orchestrate */ } }
```

### 380) How do design systems interface with application architecture?
**Theory:** Shared UI kits reduce drift between products.
**Answer:** Consume tokens/components from a package (or Storybook catalog); app code avoids one-off duplicates of primitives—extend with local composition components.
**Explanation:** Mention versioning and breaking changes briefly.
```txt
@company/ui Button; local CheckoutSummary composes Button + layout
```

### 381) How does testability help drive architecture decisions?
**Theory:** Hard-to-test code often signals tangled dependencies.
**Answer:** Prefer pure functions, injectable API clients, smaller components, and hooks/services you can mock once—testing pyramid still matters (mostly unit, some integration, few E2E).
**Explanation:** Pure logic tests stay cheap; over-relying on E2E slows teams—architecture should make the fast tests meaningful.
```ts
export function pricingTotal(items: Item[]) { return items.reduce(...); }
```

### 382) When might a company choose a monorepo for frontends?
**Theory:** Coordination vs tooling complexity.
**Answer:** Shared design system, unified CI, atomic cross-package changes—tools like Nx/Turborepo help; cost is build graph complexity and discipline.
**Explanation:** Junior answer high-level—no need to preach one true layout.
```txt
Shared UI lib + aligned releases vs heavier tooling setup
```

### 383) What is a fair junior-level answer about React Server Components?
**Theory:** Interviews still touch “server vs client component boundaries” in React 18/19-era stacks.
**Answer:** Some components can render on the server, reduce client JS, and stream HTML—**client** components stay for hooks and browser-only APIs; boundaries are a design choice not automatic magic.
**Explanation:** Avoid overclaiming; show you know it shifts data-fetch and bundle trade-offs.
```txt
Server: data-heavy read views; Client: interactivity + hooks
```

### 384) What is a micro-frontend (one-sentence junior answer)?
**Theory:** Large orgs split delivery; juniors should know the term.
**Answer:** Independent deployable frontends composed in browser or gateway—benefit team autonomy; cost runtime integration, shared deps, and consistent UX.
**Explanation:** Contrast with modular monolith SPA split by routes.
```txt
Multiple apps on one page vs single SPA with feature folders
```

### 385) What is a lightweight “ADR” and why might the team use it?
**Theory:** Architecture decisions need memory beyond Slack threads.
**Answer:** Short markdown record: **context**, **decision**, **consequences**—stored in repo (`docs/adr/0001-react-query.md`) so newcomers know why the stack looks that way.
**Explanation:** Signals you can work in mature engineering culture.
```md
# ADR 3: TanStack Query for server cache — status: accepted — see trade-offs…
```

---

## Performance & web security (Day 11 interview set, Q386-Q421)

Grounded in common 2025–2026 junior interview expectations: **Core Web Vitals** (LCP, INP, CLS), rendering cost, **CSP** + **Trusted Types**, and **OWASP-style** browser risks (XSS, CSRF, cookies)—see [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security), [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API), [web.dev Vitals](https://web.dev/articles/vitals), and practitioner guides (e.g. [FrontendTools security essentials](https://www.frontendtools.tech/blog/frontend-security-essentials-guide-2025)).

### 386) What is the difference between reflow and repaint?
**Theory:** Browser work is not free; layout and paint differ.
**Answer:** **Reflow** (layout) recomputes geometry/positions when structure/size changes; **repaint** redraws pixels when look changes without full layout (sometimes both chain).
**Explanation:** Interview: “batch DOM reads/writes” to reduce thrashing.
```txt
Reflow: widths/heights positions; repaint: colors shadows without layout
```

### 387) What is layout thrashing?
**Theory:** Interleaved read/write DOM APIs force synchronous layout.
**Answer:** Alternating `offsetHeight`-style reads with style writes in a loop forces the browser to flush layout repeatedly—very slow.
**Explanation:** Fix by batching writes then reads or using `requestAnimationFrame`.
```js
// bad pattern: read write read write in tight loop
```

### 388) When do you choose debouncing vs throttling for UI events?
**Theory:** Both reduce work; semantics differ (Day 8 RxJS parallels).
**Answer:** **Debounce** fires after quiet period—search input. **Throttle** enforces max rate—scroll/resize handlers.
**Explanation:** Mention leading vs trailing edge if interviewer wants depth.
```txt
Debounce: “after user pauses”; throttle: “at most every N ms”
```

### 389) Why use `requestAnimationFrame` for visual updates?
**Theory:** Sync with display refresh ~60Hz (or VRR).
**Answer:** Schedules work before next paint for smoother animation and avoids running more frames than needed.
**Explanation:** Contrast `setInterval` for game loops without paint sync.
```js
function tick() { update(); requestAnimationFrame(tick); }
```

### 390) What are Core Web Vitals at a high level?
**Theory:** Google uses user-centric metrics to reflect perceived performance.
**Answer:** **LCP** (largest content paint—load), **INP** (interaction to next paint—responsiveness; replaced FID as primary interaction metric), **CLS** (cumulative layout shift—visual stability).
**Explanation:** Junior ties improvements to real measurements in Lighthouse/Field data.
```txt
LCP load, INP input lag, CLS jank
```

### 391) What does INP measure compared to old First Input Delay?
**Theory:** FID only captured first interaction; modern UX needs sustained responsiveness.
**Answer:** **INP** looks at latency of **all** interactions throughout the page session (worst percentiles), not just the first click.
**Explanation:** Name the shift honestly: “FID was a first-impression metric.”
```txt
INP holistic; FID first input only
```

### 392) How does native `loading="lazy"` help LCP strategy?
**Theory:** Not every image is above-the-fold.
**Answer:** Lazy images defer offscreen decode/network until needed—improves initial contention; **do not** lazy-load the hero LCP image incorrectly.
**Explanation:** Interview trap: “lazy everything” can hurt LCP if misapplied.
```html
<img src="hero.jpg" alt="Hero" fetchpriority="high" />
<img src="below.jpg" alt="" loading="lazy" />
```

### 393) What is the difference between `preload` and `prefetch`?
**Theory:** Resource hints prioritize timing.
**Answer:** `preload` is high-priority **this** navigation (fonts/critical chunks); `prefetch` is lower priority **future** navigation hints.
**Explanation:** Misuse can steal bandwidth from LCP resources.
```html
<link rel="preload" href="/font.woff2" as="font" crossorigin />
<link rel="prefetch" href="/next-route-chunk.js" />
```

### 394) What is a “long task” and why does it hurt INP?
**Theory:** Main thread busy cannot respond quickly.
**Answer:** JS blocks >50ms (rule-of-thumb) monopolizes the thread—clicks feel late; break work into chunks or move to worker.
**Explanation:** Mention `scheduler.postTask`/`MessageChannel` only if comfortable.
```txt
Heavy sync work on main thread delays paint after input
```

### 395) How does route-level code splitting improve initial load?
**Theory:** Users rarely need all features in first second.
**Answer:** Split bundles per route/feature so first paint downloads less JS—better TTI/LCP trade-offs on large SPAs.
**Explanation:** Pair with HTTP caching and HTTP/2 multiplexing at high level.
```js
const Admin = lazy(() => import("./Admin"));
```

### 396) Name two common **frontend** memory leak sources.
**Theory:** Long-lived references prevent GC.
**Answer:** Forgotten `addEventListener`, `setInterval`, or RxJS subscriptions; holding DOM nodes in global caches.
**Explanation:** Fix with cleanup on unmount, `AbortController`, `takeUntilDestroyed`, etc.
```js
window.addEventListener("scroll", onScroll);
// must remove on teardown
```

### 397) What is XSS (Cross-Site Scripting)?
**Theory:** Attacker injects executable script into your origin’s context.
**Answer:** Browser runs attacker HTML/JS as if from your app—steals cookies, defaces UI, exfiltrates tokens from DOM.
**Explanation:** Three families: stored, reflected, DOM-based—junior names at least one scenario.
```txt
Untrusted data becomes executable in user browser
```

### 398) How does DOM-based XSS differ from reflected XSS?
**Theory:** Sink location matters for defenses.
**Answer:** **Reflected/stored** often involves server echoing unsafe HTML; **DOM-based** happens when client JS writes URL hash/query or storage into `innerHTML` without sanitization.
**Explanation:** Client-only apps still XSS themselves.
```js
document.body.innerHTML = location.hash.slice(1); // dangerous pattern
```

### 399) What are practical XSS mitigations for SPAs?
**Theory:** Defense in depth.
**Answer:** Escape output by default, avoid `innerHTML` for untrusted strings, sanitize when rich HTML required (**DOMPurify**), enforce **CSP**, use frameworks’ safe bindings, HTTP-only cookies for session where possible.
**Explanation:** Mention `textContent` vs `innerHTML` decisions.
```txt
CSP + escape + sanitize + avoid dangerous sinks
```

### 400) Why is `dangerouslySetInnerHTML` “dangerous”?
**Theory:** React escapes text by default—this API opts out.
**Answer:** It bypasses escaping; passing unsanitized server/user HTML enables XSS.
**Explanation:** Partner with sanitizer or strict server policy.
```jsx
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

### 401) Why is `bypassSecurityTrust...` in Angular risky?
**Theory:** Explicit trust APIs disable framework guards.
**Answer:** Tells Angular a string is “safe HTML/style/script/url”—if attacker-controlled, XSS follows.
**Explanation:** Only for tightly validated server HTML or impossible-to-XSS sources.
```ts
this.sanitizer.bypassSecurityTrustHtml(userHtml); // only if truly safe
```

### 402) What is CSRF (Cross-Site Request Forgery)?
**Theory:** Browser automatically attaches cookies; attacker forges requests as user.
**Answer:** Malicious site triggers state-changing request to your API while user is logged in via cookies.
**Explanation:** Does not read response cross-origin in browser model—still harmful for mutations.
```html
<img src="https://bank.example/transfer?to=attacker" />
```

### 403) How do `SameSite` cookies reduce CSRF?
**Theory:** Cross-site request contexts vary cookie sending.
**Answer:** `SameSite=Lax` or `Strict` limits cookies on cross-site POST/navigation patterns—major modern mitigation with HTTPS.
**Explanation:** `None` requires `Secure` and careful CORS/CSRF token pairing.
```http
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/
```

### 404) What is a classic CSRF token pattern?
**Theory:** Attacker cannot read your page cross-origin to steal token in many setups.
**Answer:** Embed unpredictable token in form/header; server verifies on mutation; works with cookie sessions.
**Explanation:** Contrast with double-submit cookie variant.
```txt
Hidden form field or custom header X-CSRF-Token
```

### 405) What do `HttpOnly` and `Secure` cookie flags mean?
**Theory:** Cookie scope controls XSS and transport risk.
**Answer:** `HttpOnly` hides cookie from `document.cookie` JS (reduces token theft via XSS); `Secure` sends only over HTTPS.
**Explanation:** Not silver bullet—XSS still bad due to actions-as-user, but token exfil harder.
```http
Set-Cookie: id=...; HttpOnly; Secure; SameSite=Lax
```

### 406) Why do interviewers caution against storing tokens in `localStorage`?
**Theory:** Any XSS becomes full account compromise.
**Answer:** JavaScript-readable storage is exfiltratable—prefer **HTTP-only** cookies (+ CSRF defenses) or short-lived memory patterns per product threat model.
**Explanation:** SPAs with pure Bearer headers trade CSRF complexity vs XSS—be honest about trade-offs.
```txt
XSS can read localStorage; HttpOnly cookies cannot from JS
```

### 407) What triggers a CORS **preflight** request?
**Theory:** Browser protects user data cross-origin.
**Answer:** “Non-simple” requests (custom headers, methods beyond GET/POST-certain, exotic content-types) send `OPTIONS` first; server must allow origin/method/headers.
**Explanation:** Junior symptom: POST works in curl but not browser—often CORS/preflight.
```txt
OPTIONS first for non-simple cross-origin requests
```

### 408) How do you reduce clickjacking risk?
**Theory:** Embed your app in attacker `<iframe>` and trick clicks.
**Answer:** `Content-Security-Policy: frame-ancestors 'none'` or legacy `X-Frame-Options: DENY/SAMEORIGIN`.
**Explanation:** Mention UI redress is real for auth flows.
```http
Content-Security-Policy: frame-ancestors 'self'
```

### 409) What is mixed content and why block it?
**Theory:** HTTPS page loading HTTP subresources weakens security.
**Answer:** Passive mixed content leaks integrity; active (JS) is blocked/modern browsers upgrade block—causes broken sites if assets hardcode `http:`.
**Explanation:** Fix with `https://` URLs or protocol-relative avoidance.
```txt
HTTPS page + http:// script = bad
```

### 410) What is Subresource Integrity (SRI)?
**Theory:** CDN compromise should not auto-own your users.
**Answer:** `<script integrity="sha384-..." crossorigin="anonymous">` verifies file hash matches expected—browser rejects tampered scripts.
**Explanation:** Pair `crossorigin` correctly for CORS/CDN.
```html
<script src="https://cdn/vendor.js" integrity="sha384-..." crossorigin="anonymous"></script>
```

### 411) What is a minimal “supply chain” hygiene step for npm dependencies?
**Theory:** Dependencies run build/runtime with your privileges.
**Answer:** Lockfiles, `npm audit`/SCA, pin versions, review installs, avoid copy-paste install scripts blindly; segregate CI permissions.
**Explanation:** Junior honesty: “I’d follow team policy and escalate suspicious packages.”
```txt
Lockfile + audit + review major upgrades
```

### 412) What does a Content-Security-Policy (CSP) header do?
**Theory:** Browsers enforce allow-lists for where scripts/styles/load can come from—first-class in 2025–2026 security interviews.
**Answer:** CSP restricts sources of executable content (`script-src`, `default-src`, etc.), blocks inline script unless nonce/hash, and can report violations—reduces XSS blast radius.
**Explanation:** Start-then-tighten mode (`Report-Only`) is common in mature rollouts; mention `frame-ancestors` ties to earlier clickjacking answers.
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'
```

### 413) What are Trusted Types and why do they matter for DOM XSS?
**Theory:** “Safe by default” sinks—aligned with CSP `require-trusted-types-for` (see [MDN Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)).
**Answer:** APIs like `innerHTML` accept only **TrustedHTML** from registered policies that sanitize/transform—raw strings from user data are blocked at runtime.
**Explanation:** Pairs with DOMPurify inside `createHTML`; React `dangerouslySetInnerHTML` must feed policy output when CSP enforces Trusted Types.
```js
// policy.createHTML(sanitized) — not raw user string
```

### 414) How do **nonces** or **hashes** work in `script-src` CSP?
**Theory:** Inline scripts break `script-src 'self'` unless explicitly trusted.
**Answer:** Server issues per-response **nonce** (`script-src 'nonce-abc'`) on each `<script>` tag, or lists allowed inline **hash** of script body—enabling tight CSP without `unsafe-inline`.
**Explanation:** Frameworks/metas often document nonce middleware; junior knows *why*, not every framework wiring detail.
```http
Content-Security-Policy: script-src 'self' 'nonce-rAnd0m'
```

### 415) What is HTTP Strict-Transport-Security (HSTS)?
**Theory:** First connection downgrade risk—HSTS tells browser “only HTTPS for this host.”
**Answer:** `Strict-Transport-Security` with `max-age` (and optionally `includeSubDomains`, `preload`) forces HTTPS on future visits.
**Explanation:** Complements cookie `Secure` flag; does not replace XSS defenses.
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 416) What is the **Permissions-Policy** header?
**Theory:** Limits powerful browser features per frame—common in security checklists next to CSP.
**Answer:** Declares which features (`geolocation`, `camera`, `payment`, etc.) may run in the page and embedded iframes—reduces abuse surface.
**Explanation:** Formerly “Feature-Policy”; interview: “deny-by-default for sensors we don’t use.”
```http
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

### 417) What does `Cross-Origin-Opener-Policy` (COOP) help prevent?
**Theory:** Cross-origin window references enable some XS-Leak / Spectre-class attacks and `window.opener` quirks.
**Answer:** `COOP: same-origin` isolates browsing context so other documents lose `window.opener` coupling where policy applies—pairs with CORP/COEP in advanced hardening.
**Explanation:** Junior depth: “isolates opener relationship; part of hardening stack with CSP.”
```http
Cross-Origin-Opener-Policy: same-origin
```

### 418) What is an **open redirect** and why is it dangerous?
**Theory:** Abuse for phishing and OAuth token theft.
**Answer:** App redirects to URL from untrusted query params without allow-list—attacker sends victim to fake login while URL bar still looks trusted briefly or confuses OAuth `redirect_uri`.
**Explanation:** Fix: server-side allow-list of redirect paths, signed redirect tokens, never `location = req.query.next` blindly.
```txt
/redirect?to=https://evil.com — block unvalidated external URLs
```

### 419) Why is **client-side validation not sufficient** for security?
**Theory:** Attackers bypass the browser.
**Answer:** Users and bots can call APIs directly—every privilege and data rule must be enforced server-side; client validation is UX and fast feedback only.
**Explanation:** Pair with rate limiting and authz on API as interview closer.
```txt
Never trust the client for auth, pricing, or inventory rules
```

### 420) What is **prototype pollution** in a JS interview context?
**Theory:** Unsafe merge of JSON/objects can mutate `Object.prototype`.
**Answer:** Attacker-controlled deep merge/`JSON.parse` + `__proto__` tricks may inject properties seen by all objects—mitigate with safe parsers, schema validation, frozen prototypes in libs, or `structuredClone` discipline.
**Explanation:** Often cited with `lodash.merge`-style bugs—junior names risk + “validate and freeze shapes.”
```txt
Never deep-merge untrusted objects into app config without guards
```

### 421) Why prefer `wss://` and HTTPS for WebSocket APIs?
**Theory:** Cookies and tokens ride the session—plaintext WS is observable and tamperable.
**Answer:** Secure WebSocket (`wss`) encrypts like HTTPS; mixed pages and `ws://` on public networks leak traffic.
**Explanation:** Same-origin and cookie rules still apply—mention CORS is not WebSocket’s primary model (Upgrade handshake).
```txt
wss + auth on server after handshake; never secrets in query strings ideally
```

---

## Fullstack & API integration (Day 12 interview set, Q422-Q457)

Aligned with **Day 12 – Fullstack Frontend Integration** in `COGNYTE_14_DAY_PREP_PLAN.md`: contracts before code (**OpenAPI**), HTTP semantics juniors actually ship—**ETag** / **304**, **Cache-Control**, **Idempotency-Key**, **Problem Details** (RFC 7807-style), **BFF**, **GraphQL vs REST**, **webhooks** + verification, uploads and pagination, **429** / **Retry-After**, **SSE** / streams, **`AbortController`**, env safety, tracing, and a minimal **CI smoke** story. Pair with logic set **Q121–Q130** in the app.

### 422) What is **contract-first** API design (OpenAPI) in a junior interview?
**Theory:** You agree on shapes and status codes before UI ships—fewer surprise `undefined` fields.
**Answer:** Teams publish an **OpenAPI** (Swagger) spec describing paths, schemas, errors, and auth; clients may generate types or mock servers from it; changes go through review like any contract.
**Explanation:** Contrast “UI first, `/api/data` grows organically”—contract-first helps parallel frontend + backend work and catches breaking changes early.
```txt
OpenAPI as single source of truth; breaking change = version bump or coordination
```

### 423) What is an **ETag** and when does **`304 Not Modified`** help?
**Theory:** ETag is an opaque fingerprint of a representation; conditional requests save bandwidth.
**Answer:** Client sends `If-None-Match: "<etag>"` on repeat GET; if unchanged, server returns **304** with no body—great for polling dashboards or cached reads.
**Explanation:** Pair with `Cache-Control`—ETags also support optimistic locking (`If-Match`) on writes.
```txt
304 = "your cache is still valid"; must revalidate with server headers, not guess
```

### 424) How does **`Cache-Control`** differ for **JSON APIs** vs **static assets**?
**Theory:** CDNs and browsers cache aggressively by default unless told otherwise.
**Answer:** Immutable hashed assets (`max-age=31536000, immutable`) vs **private, no-store** for sensitive JSON or short-lived lists; `stale-while-revalidate` can fit semi-static reads.
**Explanation:** Wrong caching on authenticated JSON leaks data across users—use `private` and respect cookie sessions.
```txt
Rule of thumb: User-specific JSON → private/no-store unless you really know intermediaries
```

### 425) What is an **`Idempotency-Key`** header and why use it?
**Theory:** Networks retry—your API must not double-charge or double-create.
**Answer:** Client sends a unique key per logical operation (UUID); server stores result for that key and replays the same response on duplicate submits within a TTL.
**Explanation:** Essential for **POST** payments or creates where HTTP idempotency is not assumed.
```txt
Same key + same body → same outcome; document TTL and scope (per user)
```

### 426) What are **Problem Details** style errors (e.g. **RFC 7807**)?
**Theory:** `{ "title", "status", "detail", "type" }` gives machines and humans a consistent shape.
**Answer:** Instead of bare strings, return structured JSON (often `application/problem+json`) so the UI maps to toasts, field errors, or i18n keys.
**Explanation:** Juniors should tie this to **logging**: include a `traceId` / instance URI, never stack traces to browsers in prod.
```txt
Consistent error type URLs help support; never leak secrets in `detail`
```

### 427) What is a **BFF (Backend for Frontend)**?
**Theory:** One generic API rarely fits web, mobile, and admin UX at once.
**Answer:** A **server owned by the frontend team** shapes endpoints for a specific client: aggregates calls, trims payloads, handles auth/session cookies close to the UI.
**Explanation:** Junior contrast: not mandatory for tiny apps—helps when microservices sprawl and web needs stable screens.
```txt
BFF = tailor API to one client; still not a place to skip authz rules
```

### 428) When would you pick **GraphQL** vs **REST** (fair junior answer)?
**Theory:** REST = resources + verbs; GraphQL = single endpoint + client-selected fields.
**Answer:** GraphQL fits flexible UIs, nested graphs, and mobile bandwidth savings; REST fits caching/CDN-friendly reads, file uploads, simple CRUD, and teams that want fewer moving parts.
**Explanation:** Mention N+1 problem in GraphQL (DataLoader) vs over-fetching in REST—no dogma.
```txt
Junior line: "Choose based on client variance, caching needs, and team maturity."
```

### 429) What is a **webhook** and how do you **verify** it?
**Theory:** Server-to-server push when events happen—no polling.
**Answer:** Provider POSTs signed payload to your URL; you verify **HMAC** with a shared secret/timestamp, reject replays, and respond `2xx` fast; heavy work goes async queue.
**Explanation:** Must use **HTTPS**, rotate secrets, and log verification failures (possible spoofing).
```txt
Verify signature + timestamp; idempotent handler for duplicate deliveries
```

### 430) **`multipart/form-data`** vs **JSON** for uploads—what do you say?
**Theory:** Browsers and servers stream parts; JSON holds base64 but bloats bytes.
**Answer:** Use **multipart** (or presigned URL to blob storage) for files; JSON for metadata-only APIs; `FormData` in `fetch` for mixed fields + file.
**Explanation:** Large JSON uploads hurt memory—prefer direct-to-S3 patterns when interview expects scale.
```txt
multipart = files + fields; pair progress events and size limits
```

### 431) What is **content negotiation** with **`Accept`** and **`Accept-Language`**?
**Theory:** Client announces what representations it can handle.
**Answer:** Server may return `406` if it cannot satisfy `Accept: application/json`; i18n sometimes uses `Accept-Language` or explicit `?locale=`—pick one product convention.
**Explanation:** juniors link to **API versioning**: major format breaks may need `Accept` header versioning.
```txt
Negotiation fail → 406; document supported media types in OpenAPI
```

### 432) **API versioning**: URL path vs header—trade-offs?
**Theory:** Visibility vs cache purity.
**Answer:** `/v2/users` is obvious in logs and curl; header versioning keeps URLs stable but is easier to misconfigure in clients/CDNs—both work if documented.
**Explanation:** Deprecate old versions with sunset headers and monitoring before removal.
```txt
Breaking change needs coordinated rollout—migrations not "silent edits"
```

### 433) **Breaking change** vs **additive** change?
**Theory:** Additive = safe for old clients; breaking = old clients misbehave.
**Answer:** Removing fields, renaming, tightening validation, or changing status semantics = **breaking**; adding optional fields or new endpoints = additive.
**Explanation:** Schema registries and consumer tests catch accidental breaks—junior ties to semver for public APIs.
```txt
Prefer additive evolution; deprecate then remove with telemetry
```

### 434) What is a **correlation ID** / **trace ID** across UI → API?
**Theory:** Distributed tracing helps debug "which request failed for user X".
**Answer:** Generate/propagate a UUID (`X-Request-Id`) from first client hop; log it in browser (devtools), BFF, and services; surface masked id in Problem Details for support.
**Explanation:** Not a substitute for **PII** logging rules—hash user ids when required.
```txt
One ID per user action; pass through outbound calls
```

### 435) **Client timeouts** and **retries** — how do you avoid thundering herds?
**Theory:** Unbounded waits freeze UI; blind retries amplify outages.
**Answer:** Set `fetch`/axios timeouts, exponential backoff + jitter on **safe** retries (`GET`, idempotent `PUT`), cap attempts, surface circuit-breaker UX ("try later").
**Explanation:** Never silently retry non-idempotent POST without idempotency keys.
```txt
Timeout + bounded retries + user-visible degraded mode
```

### 436) How do you **cancel** an in-flight request (`AbortController`)?
**Theory:** Leaving requests running wastes bandwidth and can apply stale responses.
**Answer:** Create `AbortController`, pass `signal` to `fetch`; on route change/unmount or new search, `abort()`; handle `DOMException` name `AbortError` quietly.
**Explanation:** Axios uses `CancelToken` legacy—modern fetch + `AbortController` is standard.
```txt
Abort on dependency change—pair with `switchMap` pattern in RxJS
```

### 437) **Double-clicks** and duplicate creates — what stops them in the UI + API?
**Theory:** Users mash buttons; networks duplicate packets.
**Answer:** Disable button while pending, debounce entry once, plus server **idempotency** and UI dedupe keys; optimistic UI needs rollback on failure.
**Explanation:** Interview ties together **loading state**, **mutation keys** (TanStack Query), and backend keys.
```txt
UX guard is not enough—server must enforce single effect
```

### 438) **`HEAD`** vs **`GET`**—when mention `HEAD`?
**Theory:** HEAD returns headers only—same metadata as GET without body cost.
**Answer:** Check existence/size/`Last-Modified` before download; crawlers and caches use it; not all servers implement it correctly—verify.
**Explanation:** Junior: avoid inventing APIs that rely on `HEAD` unless backend guarantees parity.
```txt
HEAD for metadata probes; beware inconsistent server implementations
```

### 439) **`400` vs `422` vs `409`**—junior framing?
**Theory:** 400 malformed, 422 semantically invalid (validation), 409 state conflict.
**Answer:** Malformed JSON → **400**; field-level schema errors → often **422 Unprocessable Entity** (style varies); duplicate email or version clash → **409 Conflict**.
**Explanation:** Teams argue 400 vs 422—consistency inside one API matters more than dogma.
```txt
Map to form errors + global banner; log exact code server-side
```

### 440) **Cursor** vs **offset** pagination—when cursor wins?
**Theory:** Offset `LIMIT/OFFSET` skips rows—expensive and unstable if rows shift while paging.
**Answer:** **Cursor** (after last seen stable key) fits live feeds and large tables; offset ok for admin tables with fixed sort and modest size.
**Explanation:** Document opaque cursor encoding; beware leaky sort keys.
```txt
Never expose raw SQL offsets in public APIs without stability story
```

### 441) How do you use **`429 Too Many Requests`** and **`Retry-After`**?
**Theory:** Back-pressure signal—clients must slow down.
**Answer:** Server returns 429 with **`Retry-After`** seconds or HTTP-date; client honors backoff; UI shows rate-limit message; differentiate per-user vs global limits.
**Explanation:** Pair with **idempotency**—retries after 429 still need keys for writes.
```txt
Respect Retry-After; add jitter when many tabs share token bucket
```

### 442) What is **optimistic concurrency** with **`If-Match`** / ETag on **PATCH**?
**Theory:** Two editors overwrite each other—ETag detects lost updates.
**Answer:** Client sends `If-Match: "<etag>"`; server rejects with **412 Precondition Failed** if resource changed—UI prompts refresh/merge.
**Explanation:** Junior alternative: version integer field—same idea, clearer for some teams.
```txt
412 = someone else moved first—refresh and retry
```

### 443) When do **streaming** or **chunked** responses matter?
**Theory:** Memory-friendly for large downloads or incremental JSON (NDJSON).
**Answer:** Use when TTFB must be low (LLM tokens, CSV export) or memory on server is tight; HTTP/1.1 chunked encoding; know proxy timeouts may kill long streams.
**Explanation:** Contrast with **Server-Sent Events** for one-way push to browser.
```txt
Streams need flush discipline and timeout budgets in gateways
```

### 444) Why return a **structured error envelope** (`code`, `message`, `fieldErrors`)?
**Theory:** Strings alone break localization and machine handling.
**Answer:** Stable **`code`** (`USER_EMAIL_TAKEN`) maps to UI + analytics; `fieldErrors` aligns with form controls; message is human fallback.
**Explanation:** Align with Problem Details—pick one house style per API surface.
```txt
Never expose internal exception class names to browsers
```

### 445) **Public env vars** in Vite/Next—what is actually secret?
**Theory:** Anything bundled to the browser is visible—`process.env.NEXT_PUBLIC_*` / `VITE_*`.
**Answer:** **API URLs and feature flags** are often public; **API keys with spend/data power** must stay server-side or use short-lived tokens via BFF; rotate keys leaked in repos.
**Explanation:** Junior ties to **CORS**—secrets in browser enable abuse.
```txt
If it’s in the bundle, assume attackers have it
```

### 446) What are **consumer-driven contract tests** (e.g. Pact) in one sentence?
**Theory:** Client publishes expected interactions; provider verifies without full E2E flakiness.
**Answer:** **Contract tests** encode "when I call `/users` I need fields `{ id, name }`"; CI fails if provider breaks that shape—complements not replaces integration tests.
**Explanation:** Useful when many SPAs hit one API—reduces integration thrash.
```txt
Contracts catch breaking JSON before deploy—not a replacement for authz tests
```

### 447) **Feature flags** that call the backend—safe pattern?
**Theory:** Flag state should not become a secret security gate alone.
**Answer:** Fetch flag config from a **controlled endpoint**; cache with ETag; default safe/off on failure; still enforce permissions **server-side**.
**Explanation:** Mention **boot flicker**—avoid layout shift; respect GDPR for flag targeting if PII involved.
```txt
Flags toggle UX paths—not authorization by themselves
```

### 448) What is an **API gateway** (junior one-liner)?
**Theory:** Edge layer before many microservices.
**Answer:** Central TLS termination, authn/authz, rate limits, routing, request logging, sometimes WAF—frontends often hit one gateway host.
**Explanation:** Junior: not same as BFF—gateway is cross-cutting infra; BFF is app-specific.
```txt
Gateway = shared edge concerns; BFF = client-shaped responses
```

### 449) **gRPC** vs **REST**—what might a junior say fairly?
**Theory:** gRPC = HTTP/2 + protobuf contracts, strong typing, great service-to-service; browsers lack native gRPC-web without tooling.
**Answer:** Common pattern: **browser → REST/GraphQL/BFF → internal gRPC microservices**; choose gRPC when latency and typed streaming matter internally.
**Explanation:** Don't claim "gRPC replaces REST for SPAs" without grpc-web story.
```txt
Public web still HTTP JSON usually; gRPC shines service mesh to service mesh
```

### 450) **`EventSource` (SSE)** vs **long polling** vs **WebSocket**—integration recap?
**Theory:** Directionality and infra differ.
**Answer:** SSE = server→browser one-way over HTTP, simple auto-reconnect; long polling = periodic GET wait; WebSocket = full duplex, stateful—pick by need + proxies.
**Explanation:** SSE blocked by some strict corporate proxies—have fallback polling story.
```txt
SSE for live notifications; WebSocket for chat/gaming bidirectional
```

### 451) **File downloads** — what is **`Content-Disposition: attachment`**?
**Theory:** Tells browser "save as file" vs inline render.
**Answer:** Pair with correct **`Content-Type`**, **`filename*`** (UTF-8), length if known; for huge exports use presigned URLs or async job + link.
**Explanation:** Remember **CORS** does not apply same as XHR for direct navigation downloads—auth may use cookie or signed token.
```txt
Correct headers + virus scan story for user uploads in serious systems
```

### 452) Why **validate API responses** with **Zod**/JSON Schema after `fetch`?
**Theory:** Runtime is not TypeScript—backend drifts, proxies mutate, outages return HTML.
**Answer:** Parse + schema at boundary; narrow types; throw mapped errors to UI empty/error states; log schema mismatch with correlation id.
**Explanation:** Aligns with **contract-first**—generated types from OpenAPI optional but runtime guard still helps juniors sleep.
```txt
Trust boundary at the wire—validate once per response
```

### 453) What is **eventual consistency** and how does the UI react?
**Theory:** Reads may lag writes across replicas/queues.
**Answer:** Show **pending/optimistic** state, refresh after mutation, use **poll** or **SSE** for status; never assume immediate read-your-writes globally without API guarantee.
**Explanation:** E-commerce inventory and search indexes are classic examples.
```txt
Design for stale reads—surface timestamps or "syncing…" honestly
```

### 454) What is the **outbox pattern** (very high level)?
**Theory:** DB commit and message dispatch must be atomic-ish.
**Answer:** Write business row + outbox event in one transaction; background worker publishes to queue—avoids "saved order but forgot to emit" split brain.
**Explanation:** Junior ties to **webhook retries** and idempotent consumers.
```txt
Outbox = reliable side effects after DB success
```

### 455) **`Accept-Language`** vs explicit **locale query**—API i18n?
**Theory:** Header is standard; explicit param is easier to cache/CDN.
**Answer:** Pick one style; document it; never mix silently; return translated strings or message keys—client chooses rendering policy.
**Explanation:** GDPR/locale detection cautions—user profile locale may override browser default.
```txt
Stable contract: either keys (`error.codes.*`) or translated strings—be consistent
```

### 456) **Time zones** — how should APIs store and return time?
**Theory:** Local wall clocks are ambiguous—DST edges break reporting.
**Answer:** Store **UTC** (`Instant`), return **ISO-8601 with offset** or Z; let UI format local; never silently drop offset.
**Explanation:** Juniors mention `Temporal`/`date-fns-tz` on client; server owns canonical instant.
```txt
UTC storage + explicit offsets in wire format—no locale-only timestamps in APIs
```

### 457) **Smoke-test** an API in CI—what is the junior-level goal?
**Theory:** Fast confidence that deploy wired env and routes—slower than unit tests, faster than full E2E.
**Answer:** After deploy to staging, hit `/health`, one authenticated happy-path, and critical read—fail pipeline on non-2xx; keep secrets in CI vault.
**Explanation:** Not a substitute for load tests—catches "forgot env var" classes of bugs.
```txt
Thin happy-path probes + synthetic checks; alert on burn rate not single blip
```

---

## Mock interview #2 & interview meta-skills (Day 13, Q458–Q493)

Aligned with **Day 13 – Mock Interview #2 (Full Loop)** in `COGNYTE_14_DAY_PREP_PLAN.md` (60m technical, 40m live coding, 20m behavioral, compare to mock #1, 48-hour fix list). Topics reflect common **2025–2026** practice: collaborative live coding, thinking aloud, remote setup, AI-assisted workflows **outside** the interview room, and concise technical/behavioral framing—see e.g. [Practical Tips for Live Coding Interviews](https://blog.imocha.io/practical-tips-for-live-coding-interviews) and current hiring discussions on structured behavioral answers (STAR). Pair with logic set **Q131–Q140** in the app.

### 458) How do you **structure a 60-minute technical** deep-dive as a candidate?
**Theory:** Interviewers want signal on depth, communication, and honest trade-offs—not a monologue.
**Answer:** Open with **agenda check** (“Happy to go deep on X—where should we start?”); spend blocks on **2–3 themes** (e.g. React data flow, one perf story, one testing story); end with **summary + what you’d improve**; ask clarifying questions when scope is vague.
**Explanation:** Mirrors real senior conversations; shows you don’t ramble—critical for “full loop” mock #2.
```txt
2–3 deep stories > 10 shallow buzzwords; end with recap + learnings
```

### 459) What is a sensible **time split** for **~40 minutes of live coding**?
**Theory:** Timeboxed interviews reward visible progress and explicit trade-offs.
**Answer:** Rough guide: **5–8 min** clarifications + examples, **20–25 min** core solution (happy path first), **8–12 min** tests + edge cases + refactor, **2–5 min** recap; adjust if interviewer steers.
**Explanation:** Juniors who skip clarification often build the wrong API; those who never test leave bugs on the board.
```txt
Clarify → small working slice → harden → summarize; say “I’ll defer X unless you want it now”
```

### 460) How do you use **STAR** in behavioral answers as a frontend engineer?
**Theory:** **S**ituation, **T**ask, **A**ction, **R**esult—structured without sounding robotic.
**Answer:** Pick one real incident (production bug, conflict, deadline); **Situation** in one sentence; **Task** = your responsibility; **Action** = what *you* did (code, review, comms); **Result** = metric or team outcome, plus **what you’d do differently**.
**Explanation:** Interviewers score for ownership and reflection—avoid “we we we” with no individual actions.
```txt
One story, your verbs, measurable or qualitative outcome, one lesson learned
```

### 461) After **Mock #2**, what should you **compare** against **Mock #1**?
**Theory:** Improvement needs concrete dimensions, not vibes.
**Answer:** Track **clarity** (did you state assumptions?), **speed to first working code**, **bug count**, **communication** (think-aloud), **depth** on follow-ups); note where anxiety spiked; compare **same question types** if possible.
**Explanation:** Feeds your **48-hour fix list** and Day 14 polish priorities.
```txt
Written rubric beats “felt better”; same categories for both mocks
```

### 462) What belongs on a **48-hour fix list** before a real interview?
**Theory:** Short horizon forces prioritization—fix what moves the needle.
**Answer:** Top **3–5 gaps**: e.g. one **algorithm pattern**, one **system explanation** (caching/auth), one **debugging narrative**, one **a11y/perf** sound bite; each item has a **drill** (30–60 min) and **success criterion**.
**Explanation:** Ties directly to the roadmap’s “final fix list” after mock #2.
```txt
Specific drills, not “study React more”
```

### 463) Why do interviewers ask you to **think aloud** during coding?
**Theory:** They evaluate problem-solving process, not just the final snippet.
**Answer:** Narrate **assumptions**, **options considered**, **why you picked one**, and **when you’re stuck** (what you’d try next); it simulates collaboration and reduces silent mis-builds.
**Explanation:** Aligns with modern live-coding guidance emphasizing communication alongside code.
```txt
Process visibility = trust; silence = unknown risk
```

### 464) When should you **ask clarifying questions** before you type?
**Theory:** Ambiguous specs are intentional—clarification is a positive signal.
**Answer:** Ask about **inputs/outputs**, **constraints** (size, offline, a11y), **API shape**, **error handling**, and **what “done” means**; timebox questions so you start coding within ~5–8 minutes unless told otherwise.
**Explanation:** Junior strength is catching bad assumptions early—shows professional habits.
```txt
“Can I assume sorted input?” beats guessing wrong for 20 minutes
```

### 465) How do you answer **“I don’t know”** without sinking the interview?
**Theory:** Honesty + recovery path beats bluffing—especially in 2025+ stacks that change fast.
**Answer:** **Acknowledge** the gap, **say what you do know** adjacent, **propose how you’d learn** (docs, experiment, ask mentor)—offer to implement a **small related piece** if time allows.
**Explanation:** Interviewers often reward intellectual honesty and learning velocity.
```txt
“I haven’t used X in prod—here’s how I’d validate it in 15 minutes…”
```

### 466) **Remote interview setup**: what should you verify **15 minutes before**?
**Theory:** Friction kills focus—treat the call like production.
**Answer:** **Stable network** (wired if possible), **camera/mic** test, **quiet space**, **IDE font size** for screen share, **second monitor** plan if allowed, **browser tab** cleanup, **phone on silent**; have **backup hotspot** if possible.
**Explanation:** Reduces “sorry, can you repeat?” loops that eat coding time.
```txt
Rehearse share-screen + IDE once the day before
```

### 467) **Take-home** vs **live coding**: what is a fair **junior-level trade-off** to mention?
**Theory:** Both formats have bias and cost—show you understand the industry.
**Answer:** Take-homes can show **realistic** quality but take **candidate time**; live coding tests **communication under pressure** but may feel **artificial**; some companies blend **timeboxed take-home** or **pairing**—fair answer is non-dogmatic.
**Explanation:** Signals maturity without complaining about the process in the interview itself.
```txt
“Each measures different things—I prepare for the format they use.”
```

### 468) What is **“frontend system design lite”** in a junior interview?
**Theory:** Not a full distributed systems exam—bounded scope.
**Answer:** Sketch **users**, **client modules**, **data flow**, **API contract**, **caching**, **auth**, **error states**, **basic perf** (bundle splits), **a11y** touchpoints—often on a **whiteboard or Excalidraw** in 20–35 minutes.
**Explanation:** Clarity and trade-offs beat fancy diagrams—name bottlenecks you’d measure.
```txt
Who uses it → what calls what → what breaks → how you’d observe it
```

### 469) How do you use **~20 minutes of behavioral** time effectively?
**Theory:** Short behavioral slots reward **prepared stories**, not improvisation.
**Answer:** Have **4–6 STAR stories** (conflict, failure, leadership, tight deadline, bug, learning); listen for **which competency** they probe; **answer then stop**—don’t fill time with fluff.
**Explanation:** Practice 90-second versions—long rambles get cut off.
```txt
Story bank + listen for the cue word (ownership, conflict, impact)
```

### 470) How do you handle **long silences** or a **stressed interviewer**?
**Theory:** Stay calm; don’t assume hostility—sometimes they’re thinking or multitasking.
**Answer:** **Pause** politely, **offer a checkpoint** (“I’ll implement the happy path next unless you want a different approach”), **ask if they want more detail** on a specific area; keep your tone steady.
**Explanation:** Emotional regulation is a soft skill companies screen for in full-loop rounds.
```txt
Narrate next step; don’t fill silence with panic refactors
```

### 471) **Whiteboard** vs **shared IDE**: how does your **approach** change?
**Theory:** Whiteboard = no compiler; IDE = syntax help but time pressure to run tests.
**Answer:** On whiteboard, **pseudo-code + interfaces first**, verbalize edge cases; in IDE, **small steps, run often**, use **debugger** if allowed—always **state** when you’re skipping details for time.
**Explanation:** Adapting to the medium is senior-adjacent behavior even for juniors.
```txt
Match fidelity to environment—don’t fake runnable code on a whiteboard
```

### 472) How much **automated testing** should you write in a **timed** interview?
**Theory:** Signal > coverage—one meaningful test beats ten boilerplate tests.
**Answer:** If tests are expected, add **1–2 key cases** (happy path + one edge); **mention** what else you’d add; if time is tight, **describe** test matrix verbally and implement one.
**Explanation:** Shows you value quality without getting stuck in Jest config.
```txt
One good test + verbal list of edge cases often wins
```

### 473) Name **three accessibility checks** you can mention in **any** UI interview.
**Theory:** A11y is table stakes in mature front-end hiring.
**Answer:** **Keyboard** path and focus order, **labels** for inputs, **contrast** (and zoom); optionally **semantic HTML** and **live regions** for dynamic updates.
**Explanation:** Pair with “I’d run axe or Lighthouse in a real PR” for credibility.
```txt
Keyboard, labels, contrast—quick wins interviewers recognize
```

### 474) How do you structure a **performance** answer without **premature optimization**?
**Theory:** Measure-first narratives are standard in modern web interviews.
**Answer:** **Clarify** user pain (LCP/INP/CLS), **profile** (Lighthouse, DevTools), **hypothesis**, **change**, **verify**—mention **when** you’d cache vs fix render churn; cite **Core Web Vitals** at high level.
**Explanation:** Ties to [web.dev Vitals](https://web.dev/articles/vitals) expectations without claiming expert SRE skills.
```txt
Measure → change one variable → verify; don’t guess in the dark
```

### 475) How do you give a **concise security** answer (**XSS/CSRF**) under time pressure?
**Theory:** Interviewers want correct primitives, not PhD crypto.
**Answer:** **XSS**: untrusted input → context; **sanitize/escape**, **CSP**, avoid `dangerouslySetInnerHTML`; **CSRF**: **SameSite cookies**, **anti-forgery tokens** for cookie sessions; always **HTTPS** in prod.
**Explanation:** 60–90 seconds—then invite deeper follow-up if they want.
```txt
Two threats, two mitigations each, stop unless they probe deeper
```

### 476) **TypeScript** in interviews: what do **`unknown`** and **narrowing** signal to an interviewer?
**Theory:** Soundness beats `any` in 2025–2026 TS-heavy teams.
**Answer:** **`unknown`** forces you to **narrow** before use; narrowing shows **discriminated unions**, **typeof/instanceof**, and **type guards**—safer boundaries at API edges.
**Explanation:** Shows you align TS with runtime validation (Zod) when relevant.
```txt
unknown at boundaries; narrow before use—no any escape hatch by default
```

### 477) **React 18/19**: what **Concurrent** features are fair to **mention in passing**?
**Theory:** Don’t overclaim—show awareness of scheduling and rendering models.
**Answer:** **Transitions** (`useTransition`) for non-urgent updates, **Suspense** for async UI, **streaming server components** in some stacks—tie to “keeping UI responsive under load.”
**Explanation:** Depth optional; honesty about what you’ve shipped matters more.
```txt
“Concurrent features help prioritize urgent vs deferrable updates”
```

### 478) **Angular**: **standalone APIs** and **signals**—one **sentence** each for interviews?
**Theory:** Hiring teams on Angular 15+ expect vocabulary recognition.
**Answer:** **Standalone**: components/bootstrap **without NgModules** for leaner imports; **Signals**: fine-grained **reactive state** with explicit reads/writes—often paired with change detection strategy.
**Explanation:** If you haven’t shipped them, say so and contrast with what you used (modules, RxJS).
```txt
Standalone = less boilerplate modules; Signals = explicit reactive primitives
```

### 479) Are **AI coding assistants** allowed in interviews—how do you handle this in **2025–2026**?
**Theory:** Policies vary; integrity matters more than tooling hot takes.
**Answer:** **Ask the recruiter** or read instructions; **assume closed-book** unless told otherwise; if allowed, **narrate** what you’re generating vs understanding; **never** use hidden assistance in ethical interviews—it’s fraud and reputational risk.
**Explanation:** Many companies treat interview AI like exam proctoring—when in doubt, clarify.
```txt
Default: no AI unless explicit; transparency if pair-programming with tools allowed
```

### 480) How is **using AI to practice** different from **using AI during** a live interview?
**Theory:** Prep is ethical; substituting judgment in a closed interview is not.
**Answer:** Practice: **drill explanations**, **generate edge cases**, **review your answers**; live: **your reasoning** must be authentic unless rules allow tools—**misrepresenting** ability fails on the job.
**Explanation:** Frame AI as **flashcards and feedback**, not a hidden co-pilot.
```txt
Practice = accelerate learning; cheating = hidden dependency in assessment
```

### 481) When is it appropriate to discuss **compensation** in the process?
**Theory:** Stage and culture matter—avoid derailing technical rounds.
**Answer:** Often **recruiter/HR screen** or **after** mutual interest; **not** in the middle of a technical deep-dive unless they open it; **ranges** can be exchanged early to avoid waste.
**Explanation:** Junior-safe: “Happy to discuss with recruiting—excited about the role fit first.”
```txt
Technical round = technical signal; comp with recruiter or late stage
```

### 482) What **good questions** do you ask **the interviewer** at the end?
**Theory:** Shows curiosity and filters bad fits—prepare **3–5**.
**Answer:** **Team workflow** (PRs, design reviews), **on-call expectations**, **quality bar** (testing, a11y), **growth** (mentorship), **stack roadmap**—avoid questions answered on the website.
**Explanation:** Signals you think like a future teammate, not a desperate applicant.
```txt
Specific > generic; one question about how they help juniors grow
```

### 483) **Production bug** story: how do you frame it with **STAR** for frontend?
**Theory:** They want debugging discipline and customer impact awareness.
**Answer:** **Situation**: outage/symptom; **Task**: your role; **Action**: **repro**, **bisect**, **fix**, **communication**; **Result**: metrics restored, **postmortem**, **guardrail** (test, monitor, feature flag).
**Explanation:** Blameless tone—focus on systems, not pointing fingers.
```txt
Repro → isolate → fix → prevent recurrence; show telemetry
```

### 484) How do you answer **conflict** or **disagreeing with a senior**?
**Theory:** Maturity = disagree and commit with respect.
**Answer:** **Assume good intent**; **share data** (user impact, perf numbers); **propose experiment** or small POC; **escalate** with manager if stuck; **document** decision for the team.
**Explanation:** Avoid “they were wrong” energy—show collaborative resolution.
```txt
Data + small experiment + respectful escalation path
```

### 485) How do you answer **“Tell me about a failure”** constructively?
**Theory:** They want **resilience**, not drama.
**Answer:** Pick a **real** miss; **own** your part; describe **detection**, **response**, **user communication**, and **what you changed** (process, tests, monitoring); end with **humility + growth**.
**Explanation:** Failure without learning reads as excuse-making.
```txt
Failure + ownership + concrete prevention + lesson
```

### 486) **Pair programming** interview: what behaviors do reviewers **reward**?
**Theory:** Collaboration mirrors real work—talk, don’t dominate.
**Answer:** **Ask** for preferences, **explain** small steps, **invite** navigation when stuck, **accept hints** gracefully, **summarize** state often; **clean up** before time ends.
**Explanation:** Same signals as good async PR collaboration—sync edition.
```txt
Two-way radio, not monologue; incorporate feedback quickly
```

### 487) How do you **refactor under time pressure** without freezing?
**Theory:** Safe refactors are incremental—extract, rename, test, repeat.
**Answer:** **Make green** first; then **extract function/component**, **rename for clarity**, **delete duplication**; **avoid big-bang** rewrites; say “I’d split this next if we had more time.”
**Explanation:** Shows judgment—interviewers fear reckless rewrites.
```txt
Green → small extractions → verbalize next steps you’re deferring
```

### 488) **Unfamiliar codebase** exercise: what is your **first 5-minute plan**?
**Theory:** Navigation skill is a hire signal for legacy codebases.
**Answer:** Read **README**, **package.json**, **entrypoint**, **routing**, **one vertical slice**; **search** for feature name; **note** test folders; **don’t** read every file—**map** then **deep dive**.
**Explanation:** Mirrors how seniors onboard—breadth first.
```txt
Map the terrain before spelunking random files
```

### 489) **Estimation**: how do you break down **“How long would this feature take?”**
**Theory:** They want **structured thinking**, not a magic number.
**Answer:** Clarify **scope** and **definition of done**; split into **unknowns** vs **known** work; give **range** with **assumptions**; mention **dependencies** (design, API, QA); offer **milestones**.
**Explanation:** Juniors who give ranges + assumptions beat false precision.
```txt
Range + assumptions + unknowns; invite collaboration on scope
```

### 490) **Git** in interviews: what is a safe **one-liner** about **rebase vs merge**?
**Theory:** Many teams prefer linear history—know the team norm.
**Answer:** **Merge** preserves branch topology; **rebase** replays commits for **linear history**—can rewrite if you haven’t pushed shared branches; **never force-push** shared main.
**Explanation:** Don’t debate religion—show you know **collaboration hazards**.
```txt
Rebase for clean history; avoid rewriting shared branches; ask team convention
```

### 491) **CI/CD** for frontends: what is one **quality gate** you are proud to mention?
**Theory:** “Shift left” quality is a standard talking point.
**Answer:** Examples: **lint + typecheck + unit tests** on PR, **Lighthouse** budget or bundle size check, **preview deploys** for review, **a11y** checks in pipeline—pick **one** you’ve actually touched.
**Explanation:** Specificity beats listing every possible tool.
```txt
One gate you’ve seen fail and fix a real bug
```

### 492) **Post-interview**: what is appropriate **follow-up** (and what is noisy)?
**Theory:** Professional courtesy—brief and grateful.
**Answer:** **Thank-you email** within 24–48h: **one specific** topic you enjoyed, **reiterate interest**, **no** pressure for decision; avoid **multiple** pings or **novel-length** essays.
**Explanation:** Some companies ignore; still doesn’t hurt to be polite.
```txt
Short, specific, gracious—no stalking
```

### 493) **Mock Interview #2 checklist**: what **three signals** mean you are ready for **Day 14** polish?
**Theory:** Day 13 is the gate before final rehearsal—tie to the roadmap.
**Answer:** (1) You can **complete** a timed loop without panic shutdown; (2) you have a **written** gap list with drills; (3) **behavioral** stories feel **fluent** at 90 seconds; bonus: **mock #2** beats **mock #1** on at least one rubric dimension.
**Explanation:** Sets up the **Final Verification** bullets in the 14-day plan (two mocks, improvement, readiness).
```txt
Calm execution + documented gaps + fluent stories = Day 14 ready
```

---

## Final polish & readiness (Day 14, Q494–Q529)

Aligned with **Day 14 – Final Polish + Readiness Test** in `COGNYTE_14_DAY_PREP_PLAN.md`: targeted React/Angular revision, **4 tasks in 90 minutes**, **project storytelling** (challenge → action → result), behavioral final pass, **one-page interview cheat sheet**, sleep, anxiety, interview-day logistics, and **Final Verification** (two mocks, logic volume, ~80% core recall, one end-to-end project story, timed coding). Pair with logic set **Q141–Q150** in the app.

### 494) On the **last prep day**, how do you **prioritize weak topics** without drowning?
**Theory:** Pareto applies—few topics dominate interview signal.
**Answer:** List **top 5–8 gaps** from mocks; **rank** by frequency and impact; **2–3 deep** reviews + **spaced** flashcards for the rest; **stop** adding new frameworks—consolidate what you can explain cleanly.
**Explanation:** Final polish is **confidence consolidation**, not breadth expansion.
```txt
High-frequency gaps first; one deep story beats ten shallow tabs
```

### 495) **Cramming vs sleep**—what is the evidence-based trade-off the night before?
**Theory:** Sleep consolidates memory; all-nighters hurt performance under pressure.
**Answer:** Prefer **sleep** over a 3am new topic; **light** review of cheat sheet + one timed problem max; **trust** prior weeks—interview cognition needs rest.
**Explanation:** Honest junior answer: “I’d rather arrive sharp than exhausted with one more fact.”
```txt
Sleep > marginal new content; rehearse wake-up time
```

### 496) How do you **structure a 90-minute block** with **4 coding tasks**?
**Theory:** Mimics final verification: sustained focus under fatigue.
**Answer:** **~20 min/task** with **2 min buffer**; **hard stop** per task; **5 min** recap between tasks; **note** pattern failures (not just bugs)—same rubric as mock interviews.
**Explanation:** Builds stamina for “2 easy + 1 medium under pressure” readiness.
```txt
Timer discipline + short debrief after each task
```

### 497) **Project storytelling**: how does **challenge → action → result** differ from pure STAR?
**Theory:** Portfolio stories emphasize **system impact** and **technical choices**, not only interpersonal conflict.
**Answer:** **Challenge** = business/user constraint; **Action** = what you built/changed (stack, tests, trade-offs); **Result** = metric, reliability, or learning—**metrics optional** but honest.
**Explanation:** Use for “walk me through a project” and “hardest technical problem.”
```txt
Tie business pain to your code decisions and measurable outcome
```

### 498) How do you script **“Tell me about yourself”** in **60–90 seconds**?
**Theory:** First impression sets tone—concise arc beats biography.
**Answer:** **Present** role + stack → **1–2 shipped outcomes** → **what you want next** (role/team fit); **no** life story; **practice** aloud with timer.
**Explanation:** Interviewers want trajectory and relevance, not every job since 2015.
```txt
Role + proof + direction; end with curiosity about their team
```

### 499) How do you **close an interview** strongly in the last 5 minutes?
**Theory:** Recency bias—finish with clarity and enthusiasm.
**Answer:** **Summarize** mutual fit in one sentence, **thank** for specifics, **ask** one sharp question you saved, **confirm** next steps—**no** new controversial topics.
**Explanation:** Avoid awkward silence or desperate pleading—professional warmth.
```txt
Gratitude + one smart question + clear next-step curiosity
```

### 500) What belongs on a **one-page interview cheat sheet**?
**Theory:** Retrieval cues, not a second brain—must fit in quick glances.
**Answer:** **Your stories** (titles only), **Big O** patterns you use, **HTTP/TS/React/Angular** one-liners, **questions for them**, **salary range** (if negotiated), **company mission** line—**large font**, **white space**.
**Explanation:** If it needs paragraphs, it won’t help under stress.
```txt
Triggers, not essays; test-glance readability in 10 seconds
```

### 501) What should you **not** put on a cheat sheet?
**Theory:** Noise increases panic; illegal/unethical content is disqualifying.
**Answer:** **No** full code dumps you’ll read robotically, **no** passwords/tokens, **no** confidential ex-employer secrets, **no** lies—**no** 6pt font wall of text.
**Explanation:** Cheat sheet supports memory—doesn’t replace it.
```txt
Cues you trust; nothing you’d be ashamed to show if asked
```

### 502) **Rapid React revision**: what **five hooks** are highest ROI to rehearse?
**Theory:** Most interviews still orbit state and effects.
**Answer:** **`useState`**, **`useEffect`** (deps discipline), **`useMemo`/`useCallback`** (when/when not), **`useRef`**, **`useContext`** or **`useReducer`**—pick **one** data-fetching pattern (e.g. TanStack Query) if you use it.
**Explanation:** Depth on fewer hooks beats shallow list of every API.
```txt
Five hooks + one sentence each on failure modes
```

### 503) **Rapid Angular revision**: what three pillars get **30 minutes** well spent?
**Theory:** Angular interviews reward **module mental model** and **RxJS**.
**Answer:** **DI** + lifecycle (**`ngOnInit`/`OnDestroy`**), **routing/guards/lazy** basics, **RxJS** operators you actually use (**`switchMap`**, **`takeUntil`**, error handling)—**standalone/signals** if on your version.
**Explanation:** Match revision to **your** CV—don’t fake expert RxJS marble diagrams.
```txt
DI + routing + RxJS slice you shipped; honesty > buzzwords
```

### 504) **Behavioral final pass**: how many **stories** should feel **fluent** cold?
**Theory:** Coverage without memorizing a novel.
**Answer:** **6–10** STAR/CAR stories with **labels** (conflict, failure, leadership, deadline, bug, learning); each **90 seconds** spoken; **2–3** “deep” for follow-ups.
**Explanation:** Final Verification includes behavioral readiness—fluency beats count.
```txt
90-second versions + optional 30-second deep dive on prompt
```

### 505) Practical techniques for **interview anxiety** (same week)?
**Theory:** Skills-based anxiety management—no magic, but evidence for basics.
**Answer:** **Simulation** (timed mocks), **exposure** (practice aloud), **box breathing** or **4-7-8** for 60s, **avoid** catastrophic rehearsal—**plan B** if you freeze (“I’ll write examples first”).
**Explanation:** Normalize nerves—signal is preparation, not pathology.
```txt
Breathing + simulation + written plan if mind blanks
```

### 506) **Day-of** food and hydration—junior-safe guidance?
**Theory:** Avoid glucose crash and dehydration during long loops.
**Answer:** **Eat** familiar foods, **light** if nervous; **water**; **limit** excessive caffeine if it spikes anxiety; **schedule** bio breaks before calls.
**Explanation:** Not medical advice—practical comfort for cognitive performance.
```txt
Familiar meals; steady hydration; no experimental spicy lunch
```

### 507) **Timing**: how early should you be “ready” for a remote interview?
**Theory:** Friction tax is real—pay it upfront.
**Answer:** **15–20 min** early: link works, IDE clean, **notifications off**, water, **test audio** once; **5 min** breathing—not new content.
**Explanation:** Rushing in is how people lose the first question.
```txt
Ready early; last 5 min calm, not cramming
```

### 508) If you **blank** on a technical question, what is the **recovery script**?
**Theory:** Recovery is a skill—interviewers notice resilience.
**Answer:** **Pause**, **restate** what you understood, **offer** partial knowledge + **how you’d find out** (“I’d check MDN/docs, experiment in 5 min”), **ask** one clarifying question—**don’t** ramble to fill silence.
**Explanation:** Maps to honest “I don’t know” from Day 13—now under time pressure.
```txt
Pause → clarify → partial answer → learning plan
```

### 509) **Portfolio / GitHub** review: what should you verify **the day before**?
**Theory:** Interviewers click links—broken READMEs hurt.
**Answer:** **README** runs, **demo** if any, **pin** best repos, **remove** dead projects or mark WIP honestly, **fix** obvious typos; **match** CV links.
**Explanation:** Consistency signals professionalism on final polish day.
```txt
Click every link you’ll mention; pin repos that tell your story
```

### 510) How do you answer **“What’s your biggest weakness?”** on Day 14 polish?
**Theory:** Mature answer: real weakness + mitigation—avoid humble-brag clichés only.
**Answer:** Pick **one** **real** skill gap you’re improving, **show** concrete steps (courses, drills, PR feedback), **avoid** “I’m a perfectionist” unless you make it credible.
**Explanation:** Final pass should sound **rehearsed but human**, not robotic.
```txt
Real gap + active mitigation + measurable progress
```

### 511) **“Why this company?”** without sounding **generic**?
**Theory:** Specificity signals research—copy-paste hurts.
**Answer:** Tie **product** you used, **engineering blog** talk, **tech stack** alignment, **values** with evidence—**one** sentence each; **avoid** flattery without substance.
**Explanation:** Day 14 is polish—this answer should be **custom per company** if possible.
```txt
Product + tech + values + one concrete detail only they have
```

### 512) **Questions** you should **not** ask at the end?
**Theory:** Signals matter—some questions imply misalignment.
**Answer:** Avoid **only** vacation/perks if zero technical curiosity; avoid **“did I get the job?”** pressure; avoid **bad-mouthing** previous employers; **don’t** ask things clearly on website **without** acknowledging you read it.
**Explanation:** Polish includes **social awareness**—not just technical.
```txt
Balance human questions with team/engineering substance
```

### 513) **Notifications** and **focus**: what setup reduces derailment?
**Theory:** Context switches kill interview performance.
**Answer:** **Do Not Disturb**, **close** Slack/email tabs, **second monitor** plan, **phone** in another room; **tell** household/roommates you’re unavailable.
**Explanation:** Final rehearsal should practice **same environment** as interview day.
```txt
Same DND ritual in mock #2 and real day
```

### 514) **Backup plan** if **video** or **IDE share** fails mid-round?
**Theory:** Calm troubleshooting impresses—panic does not.
**Answer:** **Ask** for phone/audio fallback, **offer** to paste code in doc, **rejoin** link once—**communicate** rather than silent panic; **know** recruiter contact if provided.
**Explanation:** Operational resilience is a soft skill signal.
```txt
Narrate what you’re trying; offer alternate channel calmly
```

### 515) **Remote** interview **dress and camera**—safe defaults?
**Theory:** Reduce cognitive load for interviewer—professional frame.
**Answer:** **Plain** top, **neutral** background or blur, **face** lit from front, **camera** at eye level; **match** company norm (many are casual—still avoid pajamas on camera).
**Explanation:** Polish includes **visual clarity**—not fashion show.
```txt
Clean frame, face visible, align with researched company norm
```

### 516) How do you project **confidence without arrogance**?
**Theory:** Interviewers hire teachable collaborators.
**Answer:** **Own** contributions with **data**, **credit** teammates, **invite** feedback—**avoid** interrupting, **avoid** “I know everything” tone; **curiosity** reads as strength.
**Explanation:** Final polish includes **tone** rehearsal—not only facts.
```txt
Facts + humility + curiosity about their constraints
```

### 517) **Last-minute bug** in a take-home—do you disclose before interview?
**Theory:** Integrity and communication beat hiding defects.
**Answer:** If you **noticed** post-submit, **email** brief note with **fix** or **impact assessment**—if interview references it, **open** with honest scope; **don’t** fabricate completeness.
**Explanation:** Teams value **honesty** on shipped artifacts.
```txt
Disclose with fix path; don’t hope they won’t notice
```

### 518) **Big O** last-minute: which **patterns** are highest yield?
**Theory:** Junior interviews repeat the same families.
**Answer:** **Hash map** `O(n)`, **two pointers** `O(n)`, **binary search** `O(log n)`, **BFS/DFS** basics, **sorting** costs—**one** sentence each **when** you’d pick them.
**Explanation:** Cheat sheet triggers—**not** proving mastery of proofs.
```txt
Five patterns + “when I reach for it” one-liner each
```

### 519) A **30-second reset** between hard interview rounds—what works?
**Theory:** Autonomic reset—simple, repeatable.
**Answer:** **Box breathing** (4-4-4-4), **shoulders down**, **sip water**, **one** line self-talk (“next question, fresh start”), **avoid** spiraling review of mistakes.
**Explanation:** Day 14 rehearsal should **practice** the reset—don’t improvise only on game day.
```txt
Breath + water + forward-looking cue; no rumination loop
```

### 520) **End-of-day reflection** after prep: what do you write in **5 minutes**?
**Theory:** Close the loop—spaced improvement without rumination.
**Answer:** **3 bullets**: what went well, **one** gap, **one** tomorrow micro-drill; **avoid** harsh self-attack—**actionable** next step only.
**Explanation:** Supports Final Verification without burnout narrative.
```txt
Win + gap + one next action; keep it kind and specific
```

### 521) **Onsite** interview day: what is on a **simple packing list**?
**Theory:** Reduce forgotten-ID stress—logistics are part of polish.
**Answer:** **ID**, **water**, **notebook** (if allowed), **pen**, **charger**, **layers** for cold rooms, **printed** resume optional—**confirm** what’s allowed (some ban phones).
**Explanation:** If you never go onsite, still answer credibly for hybrid companies.
```txt
ID + power + comfort + confirm device rules
```

### 522) **Global** interviews: what **time zone** habit prevents mistakes?
**Theory:** DST and calendar bugs cause no-shows—final polish includes logistics.
**Answer:** Store **one** canonical calendar in **UTC** or **local** with **offset** label; **triple-check** **daylight saving** transitions; **arrive** to link **2 min** after verifying **timezone** in invite.
**Explanation:** Junior credibility includes **operational reliability**.
```txt
Convert once, label offset, alarm in local wake time
```

### 523) Walk through **Final Verification** from the 14-day plan—what does **“measurable improvement”** on mocks mean?
**Theory:** Concrete rubric—same as Day 13 comparison.
**Answer:** **Pick** 3–5 dimensions (clarity, bugs, speed, depth); **score** mock #1 vs #2; **improvement** = higher on **≥1** dimension + **no regression** on **must-haves** (honesty, communication).
**Explanation:** Makes “ready” falsifiable—not vibes-only.
```txt
Written scores; improvement on at least one tracked axis
```

### 524) **45–55 logic tasks** cumulative: how do you **track** without obsession?
**Theory:** Volume target is directional—avoid anxiety if you’re close.
**Answer:** **Spreadsheet** or **checklist** of solved IDs; **count** **easy+medium** you can explain; **if** short, **prioritize** patterns over raw count—**quality** gates readiness.
**Explanation:** Final Verification is **holistic**—logic count is one signal.
```txt
Track honestly; adjust if mocks show strong pattern mastery
```

### 525) **“Why frontend?”** or **“Why engineering?”**—short polish answer?
**Theory:** Motivation questions reward authentic narrative.
**Answer:** **One** personal spark (problem you liked solving), **one** proof (project, job), **one** forward goal (user impact, craft)—**60 seconds** max.
**Explanation:** Tie to **user-facing** outcomes if true—avoid cliché only if you substitute **specifics**.
```txt
Spark + proof + direction; specifics beat slogans
```

### 526) **Interview opening** anxiety: first **30 seconds** on the call?
**Theory:** Set tone—warmth and competence.
**Answer:** **Greet** by name, **confirm** audio, **thank** for time, **small** human line (timezone/weather) **optional**—**then** listen for their agenda.
**Explanation:** Polish includes **rapport**—not jumping into technical defense.
```txt
Name + audio check + gratitude; match their energy
```

### 527) When do you **stop studying** on Day 14?
**Theory:** Closure ritual prevents infinite prep anxiety.
**Answer:** **Set** a hard **cutoff** (e.g. evening before); **after** cutoff: **cheat sheet** only, **sleep** priority; **trust** the plan—**no** new topics.
**Explanation:** Readiness includes **rest** as a deliberate choice.
```txt
Hard stop + trust the backlog you already built
```

### 528) **One-page** “interview day” **schedule**—what’s on it?
**Theory:** Reduce decision fatigue hour-by-hour.
**Answer:** **Wake**, **meal**, **review** time (short), **link** time, **buffer**, **post-interview** note slot; **include** **recruiter** name and **timezone**—**not** minute-by-minute cram.
**Explanation:** Logistics sheet complements technical cheat sheet.
```txt
Times + links + buffers + who to email after
```

### 529) **Day 14 complete**: what **three checks** mean you’re **ready** for real interviews?
**Theory:** Aligns with **Final Verification** in `COGNYTE_14_DAY_PREP_PLAN.md`.
**Answer:** (1) **Mock** improvement documented; (2) **~80%** of your **core** question list **explainable** without notes; (3) **One** project story **end-to-end** with **technical decisions** + **one** **90m** coding block completed—**bonus**: cheat sheet fits **one page** and **you’ve slept**.
**Explanation:** Gate before job search—**holistic**, not perfectionism.
```txt
Mocks + core recall + project narrative + stamina = go
```

---

## Self-Verification for Phase 4

- [ ] Solve 20/35 logic questions from memory (without reading answer first).
- [ ] Re-code at least 10 solutions from scratch in <= 35 minutes.
- [ ] For mixed questions, explain both implementation and trade-offs out loud.
- [ ] Mark weak patterns and repeat them next day first (spaced repetition).
- [ ] For **Day 13** (Q458–Q493): deliver at least two **90-second STAR** stories out loud and one **timed** live-coding walkthrough with think-aloud.
- [ ] For **Day 14** (Q494–Q529): build a **one-page cheat sheet** + run **one 90-minute / 4-task** coding block; rehearse **one project story** (challenge → action → result) in ≤ 3 minutes.
