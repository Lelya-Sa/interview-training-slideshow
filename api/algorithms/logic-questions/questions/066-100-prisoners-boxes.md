# 100 Prisoners and 100 Boxes

## Problem
100 prisoners are given a chance to be freed. There are 100 boxes, each containing a unique number from 1 to 100 (randomly placed). Each prisoner can open 50 boxes. If all prisoners find their own number, all go free. If any prisoner fails, all are executed. What strategy gives the best chance of success?

## Approach
Use a cycle-following strategy. Each prisoner starts with their own number's box and follows the chain.

## Solution
**Strategy: Follow the Cycle**

Each prisoner:
1. Opens the box with their own number (e.g., Prisoner 5 opens Box 5)
2. Finds the number inside (e.g., finds 23)
3. Opens Box 23
4. Finds the number inside (e.g., finds 7)
5. Opens Box 7
6. Continues following the chain
7. If they find their own number within 50 boxes, they succeed

**Why it works:**
- Numbers form cycles (e.g., 5 → 23 → 7 → 5)
- If cycle length ≤ 50, prisoner finds their number
- Probability that all cycles are ≤ 50 is about 31%

**Random Strategy:**
- Each prisoner randomly opens 50 boxes
- Probability of success: (1/2)^100 ≈ 0

**Cycle Strategy:**
- Probability of success: ~31%
- Much better than random!

**Answer:** Follow the cycle starting from your number. Success probability ~31% vs ~0% for random.

## Complexity
- **Time**: O(k) per prisoner where k is cycle length (max 50 boxes opened)
- **Space**: O(1) per prisoner - only tracking current box number
- **Note**: For N prisoners, each opens at most N/2 boxes. Total operations: O(N²) worst case, but strategy dramatically improves success probability.

## Follow-up
- What if prisoners can communicate?
- What if each can open 51 boxes?
- How to calculate exact probability?

