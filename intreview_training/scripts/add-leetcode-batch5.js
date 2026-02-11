const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 5 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Adding: 15 questions\n`);

// 15 more LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Path Sum",
    problem: "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.",
    js: `function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  return hasPathSum(root.left, targetSum - root.val) || 
         hasPathSum(root.right, targetSum - root.val);
}
// Time: O(n), Space: O(h)`,
    python: `def has_path_sum(root, target_sum):
    """
    Recursive DFS
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return False
    if not root.left and not root.right:
        return root.val == target_sum
    return (has_path_sum(root.left, target_sum - root.val) or
            has_path_sum(root.right, target_sum - root.val))`
  },
  {
    title: "Symmetric Tree",
    problem: "Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    js: `function isSymmetric(root) {
  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return left.val === right.val &&
           isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  }
  
  return isMirror(root, root);
}
// Time: O(n), Space: O(h)`,
    python: `def is_symmetric(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    def is_mirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        return (left.val == right.val and
                is_mirror(left.left, right.right) and
                is_mirror(left.right, right.left))
    
    return is_mirror(root, root)`
  },
  {
    title: "Binary Tree Level Order Traversal",
    problem: "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    js: `function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}
// Time: O(n), Space: O(n)`,
    python: `def level_order(root):
    """
    BFS approach
    Time: O(n)
    Space: O(n)
    """
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        level = []
        size = len(queue)
        
        for _ in range(size):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result`
  },
  {
    title: "Maximum Depth of Binary Tree",
    problem: "Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    js: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(n), Space: O(h)`,
    python: `def max_depth(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`
  },
  {
    title: "Binary Tree Inorder Traversal",
    problem: "Given the `root` of a binary tree, return the inorder traversal of its nodes' values.",
    js: `function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}
// Time: O(n), Space: O(h)`,
    python: `def inorder_traversal(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    result = []
    
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    
    traverse(root)
    return result`
  },
  {
    title: "Validate Binary Search Tree",
    problem: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
    js: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}
// Time: O(n), Space: O(h)`,
    python: `def is_valid_bst(root):
    """
    Recursive with bounds
    Time: O(n)
    Space: O(h)
    """
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))`
  },
  {
    title: "Kth Smallest Element in a BST",
    problem: "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.",
    js: `function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;
  
  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    count++;
    if (count === k) return current.val;
    current = current.right;
  }
}
// Time: O(h + k), Space: O(h)`,
    python: `def kth_smallest(root, k):
    """
    Inorder traversal with early termination
    Time: O(h + k)
    Space: O(h)
    """
    stack = []
    current = root
    count = 0
    
    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        current = current.right`
  },
  {
    title: "Lowest Common Ancestor of a Binary Search Tree",
    problem: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    js: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
}
// Time: O(h), Space: O(1)`,
    python: `def lowest_common_ancestor(root, p, q):
    """
    Iterative approach
    Time: O(h)
    Space: O(1)
    """
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`
  },
  {
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    problem: "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.",
    js: `function buildTree(preorder, inorder) {
  if (preorder.length === 0) return null;
  
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const rootIndex = inorder.indexOf(rootVal);
  
  root.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  root.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  
  return root;
}
// Time: O(n²), Space: O(n)`,
    python: `def build_tree(preorder, inorder):
    """
    Recursive construction
    Time: O(n²)
    Space: O(n)
    """
    if not preorder:
        return None
    
    root_val = preorder[0]
    root = TreeNode(root_val)
    root_index = inorder.index(root_val)
    
    root.left = build_tree(
        preorder[1:root_index + 1],
        inorder[:root_index]
    )
    root.right = build_tree(
        preorder[root_index + 1:],
        inorder[root_index + 1:]
    )
    
    return root`
  },
  {
    title: "Flatten Binary Tree to Linked List",
    problem: "Given the `root` of a binary tree, flatten the tree into a 'linked list' using the same `TreeNode` class. The 'linked list' should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.",
    js: `function flatten(root) {
  if (!root) return;
  
  flatten(root.left);
  flatten(root.right);
  
  const right = root.right;
  root.right = root.left;
  root.left = null;
  
  while (root.right) {
    root = root.right;
  }
  root.right = right;
}
// Time: O(n), Space: O(h)`,
    python: `def flatten(root):
    """
    Recursive approach
    Time: O(n)
    Space: O(h)
    """
    if not root:
        return
    
    flatten(root.left)
    flatten(root.right)
    
    right = root.right
    root.right = root.left
    root.left = None
    
    while root.right:
        root = root.right
    root.right = right`
  },
  {
    title: "Diameter of Binary Tree",
    problem: "Given the `root` of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.",
    js: `function diameterOfBinaryTree(root) {
  let maxDiameter = 0;
  
  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return Math.max(left, right) + 1;
  }
  
  depth(root);
  return maxDiameter;
}
// Time: O(n), Space: O(h)`,
    python: `def diameter_of_binary_tree(root):
    """
    DFS approach
    Time: O(n)
    Space: O(h)
    """
    max_diameter = 0
    
    def depth(node):
        nonlocal max_diameter
        if not node:
            return 0
        left = depth(node.left)
        right = depth(node.right)
        max_diameter = max(max_diameter, left + right)
        return max(left, right) + 1
    
    depth(root)
    return max_diameter`
  },
  {
    title: "Binary Tree Maximum Path Sum",
    problem: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the `root` of a binary tree, return the maximum path sum of any non-empty path.",
    js: `function maxPathSum(root) {
  let maxSum = -Infinity;
  
  function gainFromSubtree(node) {
    if (!node) return 0;
    
    const leftGain = Math.max(gainFromSubtree(node.left), 0);
    const rightGain = Math.max(gainFromSubtree(node.right), 0);
    
    maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
    
    return node.val + Math.max(leftGain, rightGain);
  }
  
  gainFromSubtree(root);
  return maxSum;
}
// Time: O(n), Space: O(h)`,
    python: `def max_path_sum(root):
    """
    DFS approach
    Time: O(n)
    Space: O(h)
    """
    max_sum = float('-inf')
    
    def gain_from_subtree(node):
        nonlocal max_sum
        if not node:
            return 0
        
        left_gain = max(gain_from_subtree(node.left), 0)
        right_gain = max(gain_from_subtree(node.right), 0)
        
        max_sum = max(max_sum, node.val + left_gain + right_gain)
        
        return node.val + max(left_gain, right_gain)
    
    gain_from_subtree(root)
    return max_sum`
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    problem: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer. Design an algorithm to serialize and deserialize a binary tree.",
    js: `function serialize(root) {
  const result = [];
  
  function dfs(node) {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }
  
  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;
  
  function dfs() {
    if (values[index] === 'null') {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(values[index]));
    index++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  
  return dfs();
}
// Time: O(n), Space: O(n)`,
    python: `def serialize(root):
    """
    Preorder traversal
    Time: O(n)
    Space: O(n)
    """
    result = []
    
    def dfs(node):
        if not node:
            result.append('null')
            return
        result.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    
    dfs(root)
    return ','.join(result)

def deserialize(data):
    """
    Reconstruct from preorder
    Time: O(n)
    Space: O(n)
    """
    values = data.split(',')
    index = 0
    
    def dfs():
        nonlocal index
        if values[index] == 'null':
            index += 1
            return None
        node = TreeNode(int(values[index]))
        index += 1
        node.left = dfs()
        node.right = dfs()
        return node
    
    return dfs()`
  },
  {
    title: "Merge k Sorted Lists",
    problem: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    js: `function mergeKLists(lists) {
  if (lists.length === 0) return null;
  
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }
  
  return lists[0];
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}
// Time: O(n * log k), Space: O(1)`,
    python: `def merge_k_lists(lists):
    """
    Divide and conquer merge
    Time: O(n * log k)
    Space: O(1)
    """
    if not lists:
        return None
    
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge_two_lists(l1, l2))
        lists = merged
    
    return lists[0]

def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next`
  },
  {
    title: "Remove Nth Node From End of List",
    problem: "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
    js: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  
  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both pointers until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  second.next = second.next.next;
  return dummy.next;
}
// Time: O(L), Space: O(1)`,
    python: `def remove_nth_from_end(head, n):
    """
    Two pointers approach
    Time: O(L)
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    first = second = dummy
    
    # Move first pointer n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches end
    while first:
        first = first.next
        second = second.next
    
    second.next = second.next.next
    return dummy.next`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n\n`;
  newContent += `**Problem:**\n${q.problem}\n\n`;
  newContent += `**Answer:**\n\n`;
  newContent += `### JavaScript\n\`\`\`javascript\n${q.js}\n\`\`\`\n\n`;
  newContent += `### Python\n\`\`\`python\n${q.python}\n\`\`\`\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### \d+\./gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED - BATCH 5');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 150 questions (75 days × 2 per day)`);
console.log(`📊 Still need: ${Math.max(0, 150 - finalCount)} more questions\n`);
console.log(`✅ Batch 5 complete! Continue with batch 6 in next chat.\n`);
