# Marbles in a Jar

## Problem
A jar contains red and blue marbles. You draw 2 marbles at random. The probability both are red is 1/2. The probability both are blue is 1/6. How many marbles are in the jar?

## Approach
Set up equations. Let r = red marbles, b = blue marbles, n = r + b total.

## Solution
**Setup:**

Total marbles: n = r + b

**Probability both red:**
P(RR) = (r/n) × ((r-1)/(n-1)) = 1/2

**Probability both blue:**
P(BB) = (b/n) × ((b-1)/(n-1)) = 1/6

**From P(RR):**
r(r-1) / (n(n-1)) = 1/2
2r(r-1) = n(n-1)  ... (1)

**From P(BB):**
b(b-1) / (n(n-1)) = 1/6
6b(b-1) = n(n-1)  ... (2)

**From (1) and (2):**
2r(r-1) = 6b(b-1)
r(r-1) = 3b(b-1)

**Try values:**
- If r=3, b=1: 3×2 = 6, 3×1×0 = 0 (no)
- If r=4, b=2: 4×3 = 12, 3×2×1 = 6 (no)
- If r=3, b=2: 3×2 = 6, 3×2×1 = 6 ✅

Check: n = 3 + 2 = 5
P(RR) = (3/5) × (2/4) = 6/20 = 3/10 (not 1/2)

**Try r=4, b=1:**
4×3 = 12, 3×1×0 = 0 (no)

**Try r=6, b=3:**
6×5 = 30, 3×3×2 = 18 (no)

**Better approach - solve system:**
From (1): n(n-1) = 2r(r-1)
From (2): n(n-1) = 6b(b-1)
So: 2r(r-1) = 6b(b-1)
r(r-1) = 3b(b-1)

Try r=4, b=2: 4×3 = 12, 3×2×1 = 6 (no)
Try r=6, b=3: 6×5 = 30, 3×3×2 = 18 (no)
Try r=3, b=1: 3×2 = 6, 3×1×0 = 0 (no)

**Actually, let's solve properly:**
r(r-1) = 3b(b-1)
r² - r = 3b² - 3b
r² - r - 3b² + 3b = 0

Try r=4, b=1: 16-4-3+3 = 12 (no)
Try r=3, b=1: 9-3-3+3 = 6 (no)

**Answer:** This problem may have no integer solution, or requires different approach. Let me recalculate...

Actually: r=4, b=2 gives n=6
P(RR) = (4/6)×(3/5) = 12/30 = 2/5 (not 1/2)
P(BB) = (2/6)×(1/5) = 2/30 = 1/15 (not 1/6)

**Correct solution:** r=3, b=1, n=4
P(RR) = (3/4)×(2/3) = 6/12 = 1/2 ✅
P(BB) = (1/4)×(0/3) = 0 (not 1/6)

**Revised:** This problem as stated may not have a solution, or the probabilities are inconsistent.

## Complexity
- **Time**: O(n²) worst case to try all combinations, but can be solved with system of equations: O(1)
- **Space**: O(1) - Only storing variables for r, b, n
- **Note**: This is a system of equations problem. May require checking if integer solutions exist for given probabilities.

## Follow-up
- What if probabilities are different?
- How to solve generally?
- What if jar has 3 colors?

