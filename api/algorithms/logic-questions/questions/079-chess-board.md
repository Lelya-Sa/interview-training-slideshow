# Chess Board Problem

## Problem
A chess board has 2 opposite corners removed (so 62 squares remain). You have 31 dominoes, each covering exactly 2 squares. Can you cover the entire board with these dominoes?

## Approach
Color the board like a chessboard. Each domino covers one black and one white square. Check if removed corners are the same color.

## Solution
**Key Insight: Chessboard Coloring**

A standard chessboard has:
- 32 black squares
- 32 white squares
- Adjacent squares are different colors

**Removed Corners:**
- Opposite corners on a chessboard are the SAME color
- If we remove 2 black corners: 30 black, 32 white remain
- If we remove 2 white corners: 32 black, 30 white remain

**Domino Coverage:**
- Each domino covers 1 black + 1 white square
- To cover 62 squares, need 31 dominoes
- But if corners removed are same color, we have unequal black/white squares
- 31 dominoes need 31 black + 31 white squares
- But we have 30 of one color, 32 of the other

**Answer:** No, it's impossible! The removed corners are the same color, leaving unequal numbers of black and white squares. Each domino needs one of each color.

## Complexity
- **Time**: O(1) - Check if removed squares are same color
- **Space**: O(1) - No data structures needed
- **Note**: This is a parity/invariants problem. The color difference is an invariant that prevents tiling.

## Follow-up
- What if we remove 2 squares of different colors?
- What about a 7×7 board with one square removed?
- How to prove this mathematically?

