# Trailing Zeros in Factorial

## Problem
How many trailing zeros are in 100! (100 factorial)?

## Approach
Trailing zeros come from factors of 10 = 2 × 5. Since there are more 2s than 5s, count the number of 5s in the prime factorization.

## Solution
**Key Insight:** Count multiples of 5, 25, 125, etc.

**Calculation:**
- Multiples of 5: 100/5 = 20
- Multiples of 25: 100/25 = 4 (each contributes extra 5)
- Multiples of 125: 100/125 = 0

**Answer:** 20 + 4 = 24 trailing zeros

**General Formula:** floor(n/5) + floor(n/25) + floor(n/125) + ...

## Complexity
- **Time**: O(log₅ n) - Number of terms in the series (powers of 5)
- **Space**: O(1) - Only using a counter variable
- **Note**: Much more efficient than calculating n! which would be O(n) time and potentially huge space

## Follow-up
- Trailing zeros in n! for any n?
- Last non-zero digit in factorial?
- Count zeros in middle of number?

