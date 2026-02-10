# 12 Balls Weighing Problem

## Problem
You have 12 identical-looking balls. One ball is either heavier or lighter than the others (you don't know which). You have a balance scale. What is the minimum number of weighings needed to identify the different ball and determine if it's heavier or lighter?

## Approach
Divide into groups and use the balance strategically. Each weighing gives you information to narrow down possibilities.

## Solution
**First Weighing:**
- Weigh 4 balls vs 4 balls
- **Case 1:** They balance → Different ball is in the remaining 4
- **Case 2:** They don't balance → Different ball is in the heavier or lighter group

**If they balance (Case 1):**
- Second weighing: Take 3 of the remaining 4, weigh 1 vs 1
  - If balance: The 4th ball is different (weigh it against any ball to see if heavier/lighter)
  - If don't balance: The heavier/lighter one is the different ball

**If they don't balance (Case 2):**
- Second weighing: Take 3 from heavier side + 1 from lighter side vs 3 normal balls + 1 from heavier side
  - If left heavier: One of the 3 from heavier side is heavy
  - If right heavier: The 1 from lighter side is light, or the 1 from heavier side is heavy
  - If balance: One of the 2 from lighter side is light
- Third weighing: Narrow down to identify the ball

**Answer:** 3 weighings minimum

## Complexity
- **Time**: O(1) - Fixed 3 weighings for 12 balls
- **Space**: O(1) - Only tracking which balls to weigh
- **Note**: For N balls, minimum weighings = ⌈log₃(2N+3)⌉ (each weighing has 3 outcomes: left heavy, right heavy, balance)

## Follow-up
- What if you have 13 balls?
- What if you know the ball is heavier (not lighter)?
- How to solve for N balls?

