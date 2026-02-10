# Ages of Children

## Problem
A man says "I have 3 children. The product of their ages is 36. The sum of their ages equals the number of my house." A visitor says "I need more information." The man says "The oldest plays piano." What are the ages?

## Approach
List all factor triples of 36, check sums, find which needs the "oldest" clue.

## Solution
**Factor triples of 36 (ages):**

1. 1, 1, 36 → sum = 38
2. 1, 2, 18 → sum = 21
3. 1, 3, 12 → sum = 16
4. 1, 4, 9 → sum = 14
5. 1, 6, 6 → sum = 13
6. 2, 2, 9 → sum = 13
7. 2, 3, 6 → sum = 11
8. 3, 3, 4 → sum = 10

**Why visitor needs more info:**
- Two triples have sum 13: (1,6,6) and (2,2,9)
- Visitor can't determine which

**"Oldest plays piano" clue:**
- (1,6,6): No single "oldest" (twins)
- (2,2,9): Has an oldest (9 years old) ✅

**Answer:** Ages are 2, 2, and 9 years old.

## Complexity
- **Time**: O(d(n)) where d(n) is number of divisors - need to find all factor triples of product
- **Space**: O(d(n)) - Storing all factor combinations
- **Note**: For product P, need to find all ways to factor into 3 numbers. Number of divisors determines complexity.

## Follow-up
- What if product is 72?
- What if there are 4 children?
- How to solve generally?

