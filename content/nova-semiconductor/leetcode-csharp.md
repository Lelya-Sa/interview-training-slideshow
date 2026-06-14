# Nova Semiconductor — LeetCode Patterns (C#)

Covers: **hash map**, **stack**, **linked list**, **binary search**, **two pointers**, **sliding window**, **greedy**, **1D DP**, **heap**, **trees (DFS/BFS)**, **backtracking**, **graphs**, **intervals** — interview-depth Theory / Answer / Explanation / code.

```csharp
// Shared LeetCode node types (declare once in interview if needed)
public class ListNode { public int val; public ListNode next; public ListNode(int v = 0, ListNode n = null) { val = v; next = n; } }
public class TreeNode { public int val; public TreeNode left, right; public TreeNode(int v = 0, TreeNode l = null, TreeNode r = null) { val = v; left = l; right = r; } }
```

### 1) **Two Sum** — hash map complement
**Theory:** Classic **hash map** pattern: trade O(n) memory for O(n) time instead of O(n²) nested loops.
**Answer:** One pass: for each `nums[i]`, check if `target - nums[i]` is already in `Dictionary<value, index>`. If yes, return both indices. Else store current value and index.
**Explanation:** O(n) time, O(n) space. Clarify: unique solution? can you use same element twice? duplicates handled because you check before insert. Follow-up: sorted array → two pointers (Q7).
```csharp
public static int[] TwoSum(int[] nums, int target) {
    var seen = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
        int need = target - nums[i];
        if (seen.TryGetValue(need, out int j)) return new[] { j, i };
        seen[nums[i]] = i;
    }
    return Array.Empty<int>();
}
```

### 2) **Valid Parentheses** — stack
**Theory:** Nested structure + LIFO matching → **stack**. Maps directly to parsing and compiler-style problems.
**Answer:** Push opening brackets `()[]{}`. On closing, pop and verify matching pair. Empty stack before pop → invalid. End with empty stack.
**Explanation:** O(n) time, O(n) space. Map closers to openers. Edge: empty string → true; `"(]"` → false.
```csharp
public static bool IsValid(string s) {
    var stack = new Stack<char>();
    var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };
    foreach (char c in s) {
        if (c is '(' or '[' or '{') stack.Push(c);
        else if (pairs.TryGetValue(c, out char open)) {
            if (stack.Count == 0 || stack.Pop() != open) return false;
        }
    }
    return stack.Count == 0;
}
```

### 3) **Reverse Linked List** — iterative pointers
**Theory:** Singly linked list reversal is a **pointer rewire** in one pass—foundational for many list problems.
**Answer:** `prev = null`, `curr = head`. While `curr != null`: save `next`, set `curr.next = prev`, advance `prev` and `curr`. Return `prev` as new head.
**Explanation:** O(n) time, O(1) space. Recursive version is O(n) stack space—prefer iterative in interviews unless asked.
```csharp
public static ListNode ReverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        var next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

### 4) **Merge Two Sorted Lists** — linked-list two pointers
**Theory:** Same merge step as merge sort—exploit **sorted order** with two pointers.
**Answer:** Dummy head node; while both lists non-null, attach smaller node and advance; attach remainder; return `dummy.next`.
**Explanation:** O(m+n) time, O(1) extra space (ignoring output). Watch null tails and equal values (`<=` vs `<`).
```csharp
public static ListNode MergeTwoLists(ListNode a, ListNode b) {
    var dummy = new ListNode();
    var tail = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { tail.next = a; a = a.next; }
        else { tail.next = b; b = b.next; }
        tail = tail.next;
    }
    tail.next = a ?? b;
    return dummy.next;
}
```

### 5) **Binary Search** on sorted array
**Theory:** Monotonic sorted array → halve search space each step: **O(log n)**.
**Answer:** `lo=0`, `hi=n-1`. While `lo<=hi`: `mid = lo + (hi-lo)/2`. Compare `nums[mid]` to target; shrink left or right. Return -1 if missing.
**Explanation:** Use `lo + (hi-lo)/2` to avoid overflow. Follow-up: first/last occurrence, rotated array, search insert position.
```csharp
public static int Search(int[] nums, int target) {
    int lo = 0, hi = nums.Length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

### 6) **Maximum Subarray** — Kadane (DP / greedy)
**Theory:** Best contiguous subarray sum—**Kadane**: at each index, extend previous subarray or start fresh.
**Answer:** `cur = max(nums[i], cur + nums[i])`, `best = max(best, cur)`.
**Explanation:** O(n) time, O(1) space. All-negative: `best` becomes max element. Follow-up: return indices, circular array variant.
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

### 7) **Two Sum II** — two pointers on sorted array
**Theory:** With **sorted** input, opposite pointers eliminate candidates without a hash map—classic **two pointers** pattern.
**Answer:** `l=0`, `r=n-1`. If `nums[l]+nums[r]==target` return 1-based indices; if sum too small `l++`, else `r--`.
**Explanation:** O(n) time, O(1) space after sort (input already sorted in problem). Contrast unsorted Two Sum (hash map).
```csharp
public static int[] TwoSumSorted(int[] nums, int target) {
    int l = 0, r = nums.Length - 1;
    while (l < r) {
        int sum = nums[l] + nums[r];
        if (sum == target) return new[] { l + 1, r + 1 };
        if (sum < target) l++;
        else r--;
    }
    return Array.Empty<int>();
}
```

### 8) **Best Time to Buy and Sell Stock** — one-pass greedy
**Theory:** Single transaction max profit = max over days of `price[i] - minPriceSoFar`.
**Answer:** Track `minPrice` and `maxProfit` in one scan.
**Explanation:** O(n) time, O(1) space. Follow-up: unlimited transactions, cooldown, fee—state-machine DP.
```csharp
public static int MaxProfit(int[] prices) {
    int min = int.MaxValue, profit = 0;
    foreach (int p in prices) {
        min = Math.Min(min, p);
        profit = Math.Max(profit, p - min);
    }
    return profit;
}
```

### 9) **Subsets** — backtracking
**Theory:** Generate all subsets = **backtracking** with include/exclude choice at each index—foundation for permutations/combinations.
**Answer:** DFS `index`: at each step, push current path to result; for `i` from `index` to end, add `nums[i]`, recurse `i+1`, remove (backtrack).
**Explanation:** O(n·2^n) output size. Sort input first if you need duplicate handling (duplicate subset problem). Say “choose / not choose” or “start index” template aloud.
```csharp
public static IList<IList<int>> Subsets(int[] nums) {
    var res = new List<IList<int>>();
    var path = new List<int>();
    void Dfs(int start) {
        res.Add(new List<int>(path));
        for (int i = start; i < nums.Length; i++) {
            path.Add(nums[i]);
            Dfs(i + 1);
            path.RemoveAt(path.Count - 1);
        }
    }
    Dfs(0);
    return res;
}
```

### 10) **Group Anagrams** — hash map with canonical key
**Theory:** Anagrams share the same **frequency signature** or sorted character key—bucket in hash map.
**Answer:** For each string, key = sorted chars (or 26-count array as string). Append to `Dictionary<key, List<string>>`.
**Explanation:** O(n · k log k) with sort per word; O(n · k) with count key. Interview: prefer count key for long strings.
```csharp
public static IList<IList<string>> GroupAnagrams(string[] strs) {
    var map = new Dictionary<string, List<string>>();
    foreach (var s in strs) {
        var a = s.ToCharArray();
        Array.Sort(a);
        var key = new string(a);
        if (!map.ContainsKey(key)) map[key] = new List<string>();
        map[key].Add(s);
    }
    return map.Values.Select(v => (IList<string>)v).ToList();
}
```

### 11) **Product of Array Except Self** — prefix / suffix
**Theory:** Output[i] = product of all except `nums[i]` without division—**prefix** left products, then multiply **suffix** walking right.
**Answer:** First pass fill `res[i]` with product of left side; second pass multiply by running right product.
**Explanation:** O(n) time, O(1) extra if output array excluded. Handles zeros naturally (one zero → many zeros in output).
```csharp
public static int[] ProductExceptSelf(int[] nums) {
    int n = nums.Length;
    var res = new int[n];
    res[0] = 1;
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}
```

### 12) **Longest Substring Without Repeating Characters** — sliding window
**Theory:** **Sliding window** on strings: expand right, shrink left when duplicate—track max window size.
**Answer:** `Dictionary<char,lastIndex>`, window `[start, i]`. If char seen inside window, move `start`. Update max length.
**Explanation:** O(n) time typical. Distinct from numeric two pointers—window size varies. Follow-up: minimum window substring (harder).
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

### 13) **Climbing Stairs** — 1D DP (Fibonacci)
**Theory:** Ways to reach step `n` = ways to `n-1` + ways to `n-2` — linear **DP** recurrence.
**Answer:** Iterative: `a=1, b=2` for `n>=2`, update like Fibonacci.
**Explanation:** O(n) time, O(1) space. Naive recursion is exponential without memo. `n=1` → 1 way.
```csharp
public static int ClimbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

### 14) **House Robber** — 1D DP with constraint
**Theory:** Cannot rob adjacent houses—**DP**: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
**Answer:** Rolling variables `prev2`, `prev1` updated each house.
**Explanation:** O(n) time, O(1) space. Circular street / tree variants are follow-ups.
```csharp
public static int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (int n in nums) {
        int cur = Math.Max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

### 15) **Linked List Cycle** — Floyd tortoise & hare
**Theory:** Cycle detection without extra memory—**fast** moves 2, **slow** moves 1; meeting implies cycle.
**Answer:** If `fast` or `fast.next` null → no cycle. Else if `slow == fast` → cycle.
**Explanation:** O(n) time, O(1) space. Follow-up: find cycle start node (reset slow to head).
```csharp
public static bool HasCycle(ListNode head) {
    var slow = head;
    var fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}
```

### 16) **Maximum Depth of Binary Tree** — tree DFS
**Theory:** Tree height = 1 + max(left depth, right depth)—simple **DFS** recursion.
**Answer:** Base: null → 0. Else `1 + Max(MaxDepth(left), MaxDepth(right))`.
**Explanation:** O(n) nodes visited. BFS level count (Q17) is alternative. Follow-up: balanced check, diameter.
```csharp
public static int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}
```

### 17) **Binary Tree Level Order Traversal** — BFS with queue
**Theory:** Process tree **level by level** using queue—breadth-first search (BFS).
**Answer:** Enqueue root. While queue not empty: snapshot `size`, dequeue `size` nodes, collect values, enqueue children.
**Explanation:** O(n) time, O(n) queue space. Variants: zigzag level order, right-side view (last per level).
```csharp
public static IList<IList<int>> LevelOrder(TreeNode root) {
    var ans = new List<IList<int>>();
    if (root == null) return ans;
    var q = new Queue<TreeNode>();
    q.Enqueue(root);
    while (q.Count > 0) {
        int sz = q.Count;
        var level = new List<int>();
        for (int i = 0; i < sz; i++) {
            var node = q.Dequeue();
            level.Add(node.val);
            if (node.left != null) q.Enqueue(node.left);
            if (node.right != null) q.Enqueue(node.right);
        }
        ans.Add(level);
    }
    return ans;
}
```

### 18) **Validate Binary Search Tree** — DFS with bounds
**Theory:** BST property is **global** (all left < node < all right), not just parent-child local check.
**Answer:** DFS `(node, min, max)`: value must be in `(min, max)` exclusive; recurse left with `(min, node.val)`, right with `(node.val, max)`.
**Explanation:** Use `long` bounds to avoid `int` edge overflow on `MinValue`/`MaxValue`. O(n) time.
```csharp
public static bool IsValidBST(TreeNode root) =>
    Dfs(root, long.MinValue, long.MaxValue);

private static bool Dfs(TreeNode n, long lo, long hi) {
    if (n == null) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return Dfs(n.left, lo, n.val) && Dfs(n.right, n.val, hi);
}
```

### 19) **Kth Largest Element** — min-heap of size k
**Theory:** Maintain **min-heap** of k elements—smallest of the k is the kth largest overall.
**Answer:** Push each num; if heap size > k, pop min. Return heap peek.
**Explanation:** O(n log k) vs O(n log n) full sort. Follow-up: Quickselect O(n) average. `PriorityQueue` in .NET 6+.
```csharp
public static int FindKthLargest(int[] nums, int k) {
    var heap = new PriorityQueue<int, int>();
    foreach (int n in nums) {
        heap.Enqueue(n, n);
        if (heap.Count > k) heap.Dequeue();
    }
    return heap.Peek();
}
```

### 20) **Top K Frequent Elements** — hash map + heap
**Theory:** Count frequencies, then keep **top k** by frequency using heap or bucket sort.
**Answer:** `Dictionary` count → min-heap of size k keyed by frequency → extract.
**Explanation:** O(n log k). Bucket sort O(n) if frequencies bounded. Tie-breaking usually any order.
```csharp
public static int[] TopKFrequent(int[] nums, int k) {
    var freq = new Dictionary<int, int>();
    foreach (int n in nums) freq[n] = freq.GetValueOrDefault(n) + 1;
    var heap = new PriorityQueue<int, int>();
    foreach (var (num, count) in freq) {
        heap.Enqueue(num, count);
        if (heap.Count > k) heap.Dequeue();
    }
    var res = new int[k];
    for (int i = k - 1; i >= 0; i--) res[i] = heap.Dequeue();
    return res;
}
```

### 21) **Number of Islands** — grid DFS / BFS
**Theory:** Connected components on 2D grid—**graph traversal** (DFS or BFS) for each unvisited `'1'`.
**Answer:** Loop cells; on land, increment count and flood-fill (mark visited `'#'` or `visited` set), exploring 4 directions.
**Explanation:** O(m·n) time. BFS with queue works identically. Follow-up: distinct islands shape, diagonal connection.
```csharp
public static int NumIslands(char[][] grid) {
    if (grid.Length == 0) return 0;
    int rows = grid.Length, cols = grid[0].Length, count = 0;
    void Dfs(int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '0';
        Dfs(r + 1, c); Dfs(r - 1, c); Dfs(r, c + 1); Dfs(r, c - 1);
    }
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == '1') { count++; Dfs(r, c); }
    return count;
}
```

### 22) **Merge Intervals** — sort + greedy
**Theory:** After sorting by start, overlapping intervals are adjacent—**greedy merge** in one pass.
**Answer:** Sort by `start`. For each interval: if no overlap with last merged (`cur.start > last.end`), append; else extend `last.end = Max(last.end, cur.end)`.
**Explanation:** O(n log n) sort + O(n) merge. Clarify inclusive/exclusive bounds. Related: insert interval, meeting rooms.
```csharp
public static int[][] Merge(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
    var res = new List<int[]>();
    foreach (var cur in intervals) {
        if (res.Count == 0 || res[^1][1] < cur[0])
            res.Add(new[] { cur[0], cur[1] });
        else
            res[^1][1] = Math.Max(res[^1][1], cur[1]);
    }
    return res.ToArray();
}
```
