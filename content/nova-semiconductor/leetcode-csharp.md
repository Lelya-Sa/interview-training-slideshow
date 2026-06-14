### 1) Two Sum with Dictionary
**Theory:** The fastest approach stores visited values in a hash map so each lookup is O(1) average time.
**Answer:** Iterate once, compute `target - nums[i]`, and check whether that complement is already in the dictionary.
**Explanation:** This avoids nested loops and gives O(n) time with O(n) extra space.
```csharp
public int[] TwoSum(int[] nums, int target) {
    var seen = new Dictionary<int,int>();
    for (int i = 0; i < nums.Length; i++) { int need = target - nums[i]; if (seen.ContainsKey(need)) return new[] { seen[need], i }; seen[nums[i]] = i; }
    return Array.Empty<int>();
}
```

### 2) Valid Parentheses via Stack
**Theory:** Balanced bracket problems map directly to stack behavior: push openings, pop on matching closing.
**Answer:** Push `(`, `[`, `{`; for each closing symbol, pop and verify expected pair.
**Explanation:** Any mismatch, empty-stack pop, or leftover stack content means invalid input.
```csharp
public bool IsValid(string s) {
    var st = new Stack<char>(); var map = new Dictionary<char,char>{{')','('},{']','['},{'}','{'}};
    foreach (var c in s) { if (map.ContainsValue(c)) st.Push(c); else if (!map.ContainsKey(c) || st.Count == 0 || st.Pop() != map[c]) return false; }
    return st.Count == 0;
}
```

### 3) Reverse Linked List Iteratively
**Theory:** Pointer re-linking can reverse a singly linked list in one pass.
**Answer:** Track `prev`, `curr`, and `next`; reverse each `curr.next` to `prev`.
**Explanation:** The technique is O(n) time and O(1) space because no extra list is built.
```csharp
public ListNode ReverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) { var next = curr.next; curr.next = prev; prev = curr; curr = next; }
    return prev;
}
```

### 4) Merge Two Sorted Lists
**Theory:** Two-pointer merge is identical to merge-step from merge sort.
**Answer:** Use a dummy head and always attach the smaller current node.
**Explanation:** Since each node is processed once, complexity is O(m+n).
```csharp
public ListNode MergeTwoLists(ListNode a, ListNode b) {
    var d = new ListNode(0); var t = d;
    while (a != null && b != null) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }
    t.next = a ?? b; return d.next;
}
```

### 5) Binary Search on Sorted Array
**Theory:** Divide-and-conquer on sorted data halves search space each step.
**Answer:** Compare target with middle value and adjust low/high bounds accordingly.
**Explanation:** Runtime is O(log n), making it ideal for large sorted arrays.
```csharp
public int Search(int[] nums, int target) {
    int l = 0, r = nums.Length - 1;
    while (l <= r) { int m = l + (r - l) / 2; if (nums[m] == target) return m; if (nums[m] < target) l = m + 1; else r = m - 1; }
    return -1;
}
```

### 6) Maximum Subarray (Kadane)
**Theory:** Dynamic programming tracks best subarray ending at each index.
**Answer:** At each element, either start new subarray or extend previous best-ending sum.
**Explanation:** Kadane's algorithm runs in O(n) time with O(1) space.
```csharp
public int MaxSubArray(int[] nums) {
    int curr = nums[0], best = nums[0];
    for (int i = 1; i < nums.Length; i++) { curr = Math.Max(nums[i], curr + nums[i]); best = Math.Max(best, curr); }
    return best;
}
```

### 7) Contains Duplicate
**Theory:** Duplicates can be detected by checking repeated insertion into a hash set.
**Answer:** Add each number to a `HashSet<int>`; if `Add` returns false, duplicate exists.
**Explanation:** This provides O(n) average time and O(n) space.
```csharp
public bool ContainsDuplicate(int[] nums) {
    var set = new HashSet<int>();
    foreach (var n in nums) if (!set.Add(n)) return true;
    return false;
}
```

### 8) Best Time to Buy and Sell Stock
**Theory:** Greedy approach keeps the minimum seen price and max possible profit.
**Answer:** Scan once, update min price, and compute candidate profit at each day.
**Explanation:** One pass is enough because each sell day only needs the best prior buy day.
```csharp
public int MaxProfit(int[] prices) {
    int min = int.MaxValue, ans = 0;
    foreach (var p in prices) { min = Math.Min(min, p); ans = Math.Max(ans, p - min); }
    return ans;
}
```

### 9) Valid Anagram
**Theory:** Anagrams have identical character frequency counts.
**Answer:** Count each letter from first string and decrement using second string.
**Explanation:** If all counts end at zero, the strings are anagrams.
```csharp
public bool IsAnagram(string s, string t) {
    if (s.Length != t.Length) return false; var count = new int[26];
    foreach (var c in s) count[c - 'a']++;
    foreach (var c in t) if (--count[c - 'a'] < 0) return false;
    return true;
}
```

### 10) Group Anagrams
**Theory:** Canonical keying lets all equivalent anagrams map to same bucket.
**Answer:** Sort each word's characters to build key and group in dictionary.
**Explanation:** Grouping by normalized form is simpler than pairwise comparison.
```csharp
public IList<IList<string>> GroupAnagrams(string[] strs) {
    var map = new Dictionary<string,List<string>>();
    foreach (var s in strs) { var a = s.ToCharArray(); Array.Sort(a); var k = new string(a); if (!map.ContainsKey(k)) map[k] = new List<string>(); map[k].Add(s); }
    return map.Values.Select(v => (IList<string>)v).ToList();
}
```

### 11) Product of Array Except Self
**Theory:** Prefix and suffix products avoid division and handle zeros safely.
**Answer:** Build left products in output, then multiply with running right product.
**Explanation:** This is O(n) time and O(1) extra space if output array is excluded.
```csharp
public int[] ProductExceptSelf(int[] nums) {
    int n = nums.Length; var res = new int[n]; res[0] = 1;
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1; for (int i = n - 1; i >= 0; i--) { res[i] *= right; right *= nums[i]; }
    return res;
}
```

### 12) Move Zeroes In-Place
**Theory:** Stable compaction keeps non-zero order while moving zeros to the end.
**Answer:** Write non-zero values forward, then fill remaining positions with zero.
**Explanation:** Two-pointer write index gives O(n) time and O(1) space.
```csharp
public void MoveZeroes(int[] nums) {
    int w = 0; for (int i = 0; i < nums.Length; i++) if (nums[i] != 0) nums[w++] = nums[i];
    while (w < nums.Length) nums[w++] = 0;
}
```

### 13) Climbing Stairs DP
**Theory:** Number of ways to reach step `n` equals ways to `n-1` plus `n-2`.
**Answer:** Use iterative Fibonacci-style state transition.
**Explanation:** This turns exponential recursion into linear time and constant space.
```csharp
public int ClimbStairs(int n) {
    if (n <= 2) return n; int a = 1, b = 2;
    for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}
```

### 14) House Robber Linear DP
**Theory:** At each house choose between robbing current plus `i-2`, or skipping and keeping `i-1`.
**Answer:** Track two rolling values: best until previous and best until two previous.
**Explanation:** DP captures non-adjacent constraint in O(n) time and O(1) space.
```csharp
public int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (var n in nums) { int cur = Math.Max(prev1, prev2 + n); prev2 = prev1; prev1 = cur; }
    return prev1;
}
```

### 15) Detect Cycle in Linked List
**Theory:** Floyd's tortoise-hare uses different speeds to detect loops without extra memory.
**Answer:** Advance slow by one and fast by two; if they meet, cycle exists.
**Explanation:** If fast reaches null, the list is acyclic.
```csharp
public bool HasCycle(ListNode head) {
    var slow = head; var fast = head;
    while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; if (slow == fast) return true; }
    return false;
}
```

### 16) Invert Binary Tree
**Theory:** Tree inversion swaps left and right subtrees recursively or iteratively.
**Answer:** Swap child pointers at each node and recurse.
**Explanation:** Every node is visited once, so complexity is O(n).
```csharp
public TreeNode InvertTree(TreeNode root) {
    if (root == null) return null;
    var tmp = root.left; root.left = InvertTree(root.right); root.right = InvertTree(tmp);
    return root;
}
```

### 17) Binary Tree Level Order Traversal
**Theory:** Breadth-first traversal processes nodes by depth using a queue.
**Answer:** For each level, dequeue fixed count and enqueue children.
**Explanation:** This naturally returns grouped levels in interview-friendly form.
```csharp
public IList<IList<int>> LevelOrder(TreeNode root) {
    var ans = new List<IList<int>>(); if (root == null) return ans; var q = new Queue<TreeNode>(); q.Enqueue(root);
    while (q.Count > 0) { int sz = q.Count; var lvl = new List<int>(); for (int i = 0; i < sz; i++) { var n = q.Dequeue(); lvl.Add(n.val); if (n.left != null) q.Enqueue(n.left); if (n.right != null) q.Enqueue(n.right); } ans.Add(lvl); }
    return ans;
}
```

### 18) Validate Binary Search Tree
**Theory:** BST validation requires strict value bounds, not only local parent checks.
**Answer:** DFS each node with `(min, max)` range and verify `min < val < max`.
**Explanation:** Bound propagation catches deep subtree violations correctly.
```csharp
public bool IsValidBST(TreeNode root) => Dfs(root, long.MinValue, long.MaxValue);
private bool Dfs(TreeNode n, long lo, long hi) {
    if (n == null) return true; if (n.val <= lo || n.val >= hi) return false;
    return Dfs(n.left, lo, n.val) && Dfs(n.right, n.val, hi);
}
```

### 19) Kth Largest Element with Heap
**Theory:** Keep a min-heap of size `k` so heap top is kth largest seen.
**Answer:** Push all values and pop when size exceeds `k`.
**Explanation:** This avoids full sorting and gives O(n log k).
```csharp
public int FindKthLargest(int[] nums, int k) {
    var pq = new PriorityQueue<int,int>();
    foreach (var n in nums) { pq.Enqueue(n, n); if (pq.Count > k) pq.Dequeue(); }
    return pq.Peek();
}
```

### 20) Top K Frequent Elements
**Theory:** Frequency map plus min-heap keeps only top-k counts efficiently.
**Answer:** Count occurrences, push `(num,count)` into heap keyed by count.
**Explanation:** Heap size bounded by `k` makes this scalable for big arrays.
```csharp
public int[] TopKFrequent(int[] nums, int k) {
    var freq = new Dictionary<int,int>(); foreach (var n in nums) freq[n] = freq.GetValueOrDefault(n) + 1;
    var pq = new PriorityQueue<int,int>(); foreach (var kv in freq) { pq.Enqueue(kv.Key, kv.Value); if (pq.Count > k) pq.Dequeue(); }
    var res = new int[k]; for (int i = k - 1; i >= 0; i--) res[i] = pq.Dequeue(); return res;
}
```

### 21) LRU Cache Design Concept
**Theory:** True LRU requires O(1) get/put by combining hash map and doubly linked list.
**Answer:** Dictionary maps key to list node; accesses move node to list head as most recent.
**Explanation:** Tail node is least recently used and evicted when capacity is exceeded.
```csharp
// Core idea: Dictionary<int, LinkedListNode<(int key,int val)>> + LinkedList<(int key,int val)>
// Get: if found, move node to front and return value.
// Put: update existing node or add new front node; evict list.Last when count > capacity.
```

### 22) Merge Intervals After Sorting
**Theory:** Overlap merging depends on sorted starts so neighboring intervals can be combined greedily.
**Answer:** Sort by start, then either extend last merged end or append new interval.
**Explanation:** Sorting dominates complexity at O(n log n), merge pass is O(n).
```csharp
public int[][] Merge(int[][] intervals) {
    Array.Sort(intervals, (a,b) => a[0].CompareTo(b[0])); var res = new List<int[]>();
    foreach (var cur in intervals) { if (res.Count == 0 || res[^1][1] < cur[0]) res.Add(new[] { cur[0], cur[1] }); else res[^1][1] = Math.Max(res[^1][1], cur[1]); }
    return res.ToArray();
}
```
