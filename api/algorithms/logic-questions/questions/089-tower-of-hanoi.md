# Tower of Hanoi

## Problem
You have 3 rods and n disks of different sizes. Start with all disks on rod A, smallest on top. Move all disks to rod C, following rules:
1. Move one disk at a time
2. Only move top disk from a stack
3. Never place larger disk on smaller disk

What's the minimum number of moves for n disks?

## Approach
Use recursion. To move n disks from A to C: move n-1 to B, move largest to C, move n-1 from B to C.

## Solution
**Recursive Strategy:**

To move n disks from A to C:
1. Move n-1 disks from A to B (using C as auxiliary)
2. Move largest disk from A to C
3. Move n-1 disks from B to C (using A as auxiliary)

**Recurrence Relation:**
T(n) = 2T(n-1) + 1
T(1) = 1

**Solving:**
T(n) = 2T(n-1) + 1
     = 2(2T(n-2) + 1) + 1 = 4T(n-2) + 3
     = 2ⁿ⁻¹T(1) + (2ⁿ⁻¹ - 1)
     = 2ⁿ - 1

**Examples:**
- 1 disk: 1 move
- 2 disks: 3 moves
- 3 disks: 7 moves
- 4 disks: 15 moves
- n disks: 2ⁿ - 1 moves

**Answer:** Minimum moves = 2ⁿ - 1

## Complexity
- **Time**: O(2ⁿ) - Must make 2ⁿ - 1 moves, each move is O(1)
- **Space**: O(n) - Recursion stack depth is n
- **Note**: Exponential time complexity. For n=64 (legendary problem), would take 2⁶⁴ - 1 moves (impossible to complete).

## Follow-up
- What if there are 4 rods?
- How to solve iteratively?
- What's the time complexity?

