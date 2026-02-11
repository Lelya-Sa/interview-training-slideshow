# Handshakes Problem

## Problem
At a party, everyone shakes hands with everyone else exactly once. If there were 66 handshakes total, how many people were at the party?

## Approach
Use combinations. Each handshake is a pair of people. n people = n choose 2 handshakes.

## Solution
**Formula:**
- n people
- Each person shakes hands with (n-1) others
- But this counts each handshake twice (A shakes B, B shakes A)
- Total handshakes = n × (n-1) / 2

**Solve:**
n(n-1)/2 = 66
n² - n = 132
n² - n - 132 = 0

**Quadratic formula:**
n = (1 + √(1 + 528)) / 2
n = (1 + 23) / 2 = 12

**Answer:** 12 people

**Verification:**
12 × 11 / 2 = 132 / 2 = 66 ✅

## Complexity
- **Time**: O(1) - Solve quadratic equation: n = (1 + √(1 + 8h)) / 2 where h is handshakes
- **Space**: O(1) - No data structures needed
- **Note**: Uses combinatorics formula: C(n,2) = n(n-1)/2. For h handshakes, solve for n.

## Follow-up
- What if some people don't shake hands?
- How many handshakes for N people?
- What if handshakes are directional (A shakes B ≠ B shakes A)?

