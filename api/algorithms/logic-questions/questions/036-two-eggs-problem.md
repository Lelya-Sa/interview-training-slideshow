# Two Eggs Problem

## Problem
You have two identical eggs and access to a 100-story building. You need to determine the highest floor from which an egg can be dropped without breaking. What is the minimum number of drops needed to guarantee you find the answer?

## Approach
Use a strategy that minimizes worst-case drops. Start from floor X, then if it breaks, test floors 1 to X-1 linearly. If it doesn't break, go up by X-1 floors, then X-2, etc.

## Solution
**Strategy:**
1. Start at floor 14 (if breaks, test 1-13 linearly = 14 drops max)
2. If doesn't break, go to floor 27 (14+13)
3. If breaks, test 15-26 linearly
4. Continue pattern: 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99

**Formula:** n + (n-1) + (n-2) + ... + 1 ≥ 100
n(n+1)/2 ≥ 100 → n ≈ 14

**Answer:** 14 drops minimum

## Complexity
- **Time**: O(√n) where n is number of floors - optimal strategy requires ~√(2n) drops
- **Space**: O(1) - only storing current floor and drop count
- **Note**: This is a mathematical optimization problem, not a traditional algorithm

## Follow-up
- What if you have 3 eggs?
- What if building has N floors?
- Optimal strategy for k eggs?

