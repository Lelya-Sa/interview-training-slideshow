# 100 Chickens and Eggs

## Problem
A farmer has chickens. If he sells 75 chickens, his feed lasts 20 more days. If he buys 100 chickens, his feed lasts 15 fewer days. How many chickens does he have?

## Approach
Set up equations. Let c = current chickens, d = days feed lasts, f = total feed.

## Solution
**Setup:**

Let:
- c = current number of chickens
- d = days feed lasts currently
- f = total feed (constant)

**Feed consumption rate:**
- f = c × d (chickens × days)

**Case 1: Sell 75 chickens**
- New chickens: c - 75
- New days: d + 20
- f = (c - 75)(d + 20)  ... (1)

**Case 2: Buy 100 chickens**
- New chickens: c + 100
- New days: d - 15
- f = (c + 100)(d - 15)  ... (2)

**Also:** f = c × d  ... (3)

**From (1) and (3):**
c × d = (c - 75)(d + 20)
cd = cd + 20c - 75d - 1500
0 = 20c - 75d - 1500
75d = 20c - 1500
d = (20c - 1500) / 75  ... (4)

**From (2) and (3):**
c × d = (c + 100)(d - 15)
cd = cd - 15c + 100d - 1500
0 = -15c + 100d - 1500
15c = 100d - 1500
c = (100d - 1500) / 15  ... (5)

**Substitute (4) into (5):**
c = (100 × (20c - 1500)/75 - 1500) / 15
c = ((2000c - 150000)/75 - 1500) / 15
c = (2000c - 150000 - 112500) / 1125
1125c = 2000c - 262500
875c = 262500
c = 300

**Answer:** 300 chickens

## Complexity
- **Time**: O(1) - Solve system of 2 linear equations
- **Space**: O(1) - Only storing variables c, d, f
- **Note**: System of equations: 2 equations, 2 unknowns. Can be solved algebraically in O(1) time.

## Follow-up
- What if numbers are different?
- How to verify the answer?
- What's the feed amount?

