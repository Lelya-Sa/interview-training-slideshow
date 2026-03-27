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

## Performance & web security (Day 11 interview set, Q386-Q411)

Grounded in common 2025–2026 junior interview expectations: **Core Web Vitals** (LCP, INP, CLS), rendering cost, and **OWASP-style** browser risks (XSS, CSRF, cookies, CSP)—see e.g. [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security), [web.dev Vitals](https://web.dev/articles/vitals), and summaries like [FrontendTools security essentials](https://www.frontendtools.tech/blog/frontend-security-essentials-guide-2025).

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

---

## Self-Verification for Phase 4

- [ ] Solve 20/35 logic questions from memory (without reading answer first).
- [ ] Re-code at least 10 solutions from scratch in <= 35 minutes.
- [ ] For mixed questions, explain both implementation and trade-offs out loud.
- [ ] Mark weak patterns and repeat them next day first (spaced repetition).
