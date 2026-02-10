# Light Bulb Switches

## Problem
You have 100 light bulbs in a room, all initially off. You make 100 passes:
- Pass 1: Toggle every bulb (all on)
- Pass 2: Toggle every 2nd bulb (2, 4, 6, ...)
- Pass 3: Toggle every 3rd bulb (3, 6, 9, ...)
- ...
- Pass 100: Toggle bulb 100

After 100 passes, which bulbs are on?

## Approach
A bulb is toggled once for each of its divisors. A bulb is on if it has an odd number of divisors. Only perfect squares have an odd number of divisors.

## Solution
**Key Insight:** Perfect squares have odd number of divisors.

**Example:** Bulb 12 has divisors: 1, 2, 3, 4, 6, 12 (6 divisors, even) → OFF
Bulb 16 has divisors: 1, 2, 4, 8, 16 (5 divisors, odd) → ON

**Answer:** Bulbs 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are ON (all perfect squares ≤ 100)

## Complexity
- **Time**: O(1) - Direct mathematical solution: count perfect squares ≤ n = ⌊√n⌋
- **Space**: O(1) - No additional space needed
- **Note**: If simulating all passes: O(n²) time, O(n) space. But mathematical insight gives O(1) solution.

## Follow-up
- What if you start with all bulbs on?
- How many bulbs are on after N passes?
- What if you toggle every kth bulb starting from position p?

