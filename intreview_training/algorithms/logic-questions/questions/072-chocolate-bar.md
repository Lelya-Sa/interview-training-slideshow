# Chocolate Bar Problem

## Problem
You have a chocolate bar that's a grid of m×n squares. You can break it along the lines. What's the minimum number of breaks needed to separate it into individual 1×1 pieces?

## Approach
Each break increases the number of pieces by 1. Start with 1 piece, need m×n pieces.

## Solution
**Key Insight:**
- Start with: 1 piece (whole bar)
- End with: m × n pieces (individual squares)
- Each break creates 1 additional piece
- Need: (m × n) - 1 breaks

**Example:**
- 2×2 bar (4 squares)
- Break 1: 2 pieces
- Break 2: 3 pieces  
- Break 3: 4 pieces ✅
- Total: 3 breaks = 4 - 1

**Answer:** (m × n) - 1 breaks minimum

## Complexity
- **Time**: O(1) - Direct formula: (m × n) - 1
- **Space**: O(1) - No additional space needed
- **Note**: This is a mathematical insight problem. Each break increases piece count by 1, so need (target - start) breaks.

## Follow-up
- What if you can only break along one direction at a time?
- What if bar is 3D (m×n×p)?
- How to prove this is optimal?

