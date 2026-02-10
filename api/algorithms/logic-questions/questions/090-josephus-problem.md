# Josephus Problem

## Problem
n people stand in a circle. They count off, and every kth person is eliminated. Starting from person 1, who is the last person remaining?

## Approach
Use recursion or mathematical formula. The position shifts by k each elimination.

## Solution
**Recursive Formula:**

J(n, k) = (J(n-1, k) + k) mod n
J(1, k) = 0 (0-indexed) or 1 (1-indexed)

**Example: n=7, k=3**

**Step-by-step (1-indexed):**
1. Start: [1,2,3,4,5,6,7], count from 1
2. Eliminate 3: [1,2,4,5,6,7], count from 4
3. Eliminate 6: [1,2,4,5,7], count from 7
4. Eliminate 2: [1,4,5,7], count from 4
5. Eliminate 7: [1,4,5], count from 1
6. Eliminate 5: [1,4], count from 1
7. Eliminate 1: [4] ✅

**Answer:** Person 4 survives

**For k=2 (special case):**
- Write n in binary, move first digit to end
- Example: n=7 = 111₂ → 111₂ → 7 (but actually 4 in 1-indexed)
- Formula: 2l + 1, where l = n - 2^floor(log₂(n))

**General Solution:**
Use recursion: J(n,k) = (J(n-1,k) + k) % n + 1 (1-indexed)

## Complexity
- **Time**: O(n) with recursion, O(n) with iterative approach
- **Space**: O(n) with recursion (call stack), O(1) with iterative
- **Note**: For k=2, can be solved in O(log n) using binary representation trick. General case requires O(n).

## Follow-up
- What if k=2 (simpler case)?
- How to solve for large n?
- What's the time complexity?

