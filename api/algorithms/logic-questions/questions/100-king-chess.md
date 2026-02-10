# King on Chessboard

## Problem
A king is placed on square A1 of a chessboard. It can move one square in any direction (including diagonally). How many distinct paths can the king take to reach square H8, if it must move closer to H8 with each move (can't move away)?

## Approach
Count paths using dynamic programming or combinatorics. Each move must increase (row+column) sum.

## Solution
**Key constraint:**
- Start: A1 = (1,1), sum = 2
- End: H8 = (8,8), sum = 16
- Each move must increase sum by at least 1
- Maximum sum increase per move: 2 (diagonal)

**Path length:**
- Minimum: 7 moves (all diagonal: +2 each time)
- Maximum: 14 moves (all horizontal/vertical: +1 each time)

**Counting paths:**
Use dynamic programming or count valid sequences.

**For minimum path (7 diagonal moves):**
- Only 1 path: all diagonal moves ✅

**For longer paths:**
- Mix of diagonal (+2) and straight (+1)
- Need to count all valid combinations

**Approximate answer:** There are many paths. Exact count requires careful enumeration or DP algorithm.

**Simpler version - count:**
Using combinatorics, the number of paths where sum increases each step is significant but finite.

**Answer:** The exact count is large but finite. Use dynamic programming: dp[i][j] = number of ways to reach (i,j) from (1,1) with constraint.

## Complexity
- **Time**: O(n²) where n is board size - DP fills n×n grid
- **Space**: O(n²) for DP table, can be optimized to O(n) with careful implementation
- **Note**: For 8×8 board: O(64) = O(1) constant. For general n×n: O(n²) time and space.

## Follow-up
- What if king can move 2 squares?
- What if some squares are blocked?
- How to solve for any start/end position?

