# 8 Queens Problem

## Problem
Place 8 queens on an 8×8 chessboard so that no two queens attack each other (no two queens share same row, column, or diagonal). How many solutions exist?

## Approach
Use backtracking. Place queens one row at a time, checking if position is safe.

## Solution
**Strategy (Backtracking):**

1. Place queen in first row
2. Place queen in second row (avoiding conflicts)
3. Continue row by row
4. If no valid position in a row, backtrack to previous row
5. Try next position in previous row

**Key Constraints:**
- No two queens in same row
- No two queens in same column
- No two queens on same diagonal

**One Solution:**
```
Q . . . . . . .
. . . . Q . . .
. . . . . . . Q
. . . . . Q . .
. . Q . . . . .
. . . . . . Q .
. Q . . . . . .
. . . Q . . . .
```

**Total Solutions:** 92 distinct solutions (12 fundamental solutions with rotations/reflections)

**Answer:** 92 distinct solutions exist. Use backtracking algorithm to find them.

## Complexity
- **Time**: O(N!) worst case with naive backtracking, but pruning reduces this significantly. For 8 queens: explores ~15,720 states vs 8! = 40,320
- **Space**: O(N) for recursion stack, O(N²) if storing board state
- **Note**: With optimizations (column/diagonal tracking): O(N!) worst case, but much better average case due to early pruning

## Follow-up
- How to solve for N queens?
- What's the time complexity?
- How to optimize the solution?

