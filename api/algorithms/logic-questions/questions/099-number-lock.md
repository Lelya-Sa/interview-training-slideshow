# Number Lock Problem

## Problem
A combination lock has 3 dials, each showing digits 0-9. You don't know the combination. What's the minimum number of attempts needed to guarantee opening it?

## Approach
In worst case, you try every combination. There are 10×10×10 = 1000 combinations.

## Solution
**Total combinations:**
- 3 dials, 10 digits each
- Total: 10³ = 1000 combinations

**Worst case:**
- Try 999 wrong combinations
- 1000th attempt is correct ✅

**Answer:** 1000 attempts maximum (999 in worst case, 1 on average if random)

**But if lock gives feedback:**
- If dial shows "close" for correct digit in wrong position
- Can solve in fewer attempts using strategy

**Without feedback:**
- Must try all 1000 combinations in worst case
- Average: 500 attempts (if combination is random)

## Complexity
- **Time**: O(10^d) where d is number of dials - must try all combinations in worst case
- **Space**: O(1) - Only tracking current attempt
- **Note**: With d dials and n digits each: 10^d combinations. With feedback, can use strategy to reduce attempts.

## Follow-up
- What if lock has 4 dials?
- What if digits are 0-9 but no repeats allowed?
- How to optimize with feedback?

