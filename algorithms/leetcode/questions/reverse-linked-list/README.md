# Reverse Linked List - LeetCode 206

## Problem Description

Given the head of a singly linked list, reverse the list, and return the reversed list.

## Example

```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head = [1,2]
Output: [2,1]

Input: head = []
Output: []
```

## Approach

### Iterative Approach:
1. Initialize three pointers: `prev = null`, `current = head`, `next = null`
2. While current is not null:
   - Store next node: `next = current.next`
   - Reverse link: `current.next = prev`
   - Move pointers: `prev = current`, `current = next`
3. Return `prev` as new head

### Recursive Approach:
1. Base case: if head is null or head.next is null, return head
2. Recursively reverse rest of list
3. Reverse current node's link
4. Return new head

## Time Complexity
- O(n) where n is number of nodes

## Space Complexity
- **Iterative**: O(1)
- **Recursive**: O(n) due to recursion stack

## How to Use

### JavaScript
```bash
node js/solution.js
```

### Python
```bash
python python/solution.py
```

### Java
```bash
javac java/Solution.java
java Solution
```

