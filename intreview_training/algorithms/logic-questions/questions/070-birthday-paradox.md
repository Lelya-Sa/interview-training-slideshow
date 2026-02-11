# Birthday Paradox

## Problem
How many people do you need in a room for there to be a 50% chance that at least two people share the same birthday? (Assume 365 days, ignore leap years)

## Approach
Calculate probability of NO matches, then subtract from 1. Use complementary probability.

## Solution
**Probability that all have different birthdays:**

For n people:
- Person 1: Can have any birthday (365/365)
- Person 2: Must be different (364/365)
- Person 3: Must be different from both (363/365)
- ...
- Person n: Must be different from all previous (365-n+1)/365

**Probability of no match:**
P(no match) = (365/365) × (364/365) × (363/365) × ... × ((365-n+1)/365)

**Probability of at least one match:**
P(match) = 1 - P(no match)

**Calculation:**
- n = 23: P(match) ≈ 50.7%
- n = 50: P(match) ≈ 97%
- n = 70: P(match) ≈ 99.9%

**Answer:** Only 23 people needed for 50% chance! This seems counterintuitive but is mathematically correct.

## Complexity
- **Time**: O(1) - Direct calculation using probability formula
- **Space**: O(1) - No data structures needed
- **Note**: This demonstrates the counterintuitive nature of probability. Relates to hash collision probability: P(collision) ≈ 1 - e^(-n²/(2×365)) for n people

## Follow-up
- How many for 99% probability?
- What if we consider leap years?
- How does this relate to hash collisions?

