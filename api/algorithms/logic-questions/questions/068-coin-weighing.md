# Coin Weighing Problem

## Problem
You have 9 coins. One is counterfeit and weighs less than the others. You have a balance scale. What's the minimum number of weighings to find the counterfeit coin?

## Approach
Divide and conquer. Split into groups of 3 and compare.

## Solution
**First Weighing:**
- Weigh 3 coins vs 3 coins
- **If they balance:** Counterfeit is in the remaining 3
- **If they don't balance:** Counterfeit is in the lighter group

**Second Weighing:**
- Take the 3 coins that contain the counterfeit
- Weigh 1 vs 1
- **If they balance:** The remaining coin is counterfeit
- **If they don't balance:** The lighter one is counterfeit

**Answer:** 2 weighings minimum

## Complexity
- **Time**: O(1) - Fixed 2 weighings for 9 coins
- **Space**: O(1) - Only tracking which coins to weigh
- **Note**: For N coins, minimum weighings = ⌈log₃(N)⌉ (each weighing has 3 outcomes: left heavy, right heavy, balance)

## Follow-up
- What if you have 12 coins?
- What if you don't know if counterfeit is heavier or lighter?
- How to solve for N coins?

