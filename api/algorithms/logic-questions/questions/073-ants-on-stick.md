# Ants on a Stick

## Problem
Three ants are placed on a 1-meter stick at positions 0.25m, 0.5m, and 0.75m. They start walking: left ant goes right, middle goes left, right goes right. All walk at 1 m/s. When two ants meet, they reverse direction. How long until all ants fall off the stick?

## Approach
Key insight: When ants meet and reverse, it's equivalent to them passing through each other. Calculate time for each ant to reach an end.

## Solution
**Key Insight: Ants Passing Through**

When two ants meet and reverse direction, it's mathematically equivalent to them passing through each other (because they're identical). So we can ignore collisions!

**Calculate:**
- Left ant (at 0.25m, going right): Falls off at 1m → Time = (1 - 0.25) / 1 = 0.75s
- Middle ant (at 0.5m, going left): Falls off at 0m → Time = (0.5 - 0) / 1 = 0.5s
- Right ant (at 0.75m, going right): Falls off at 1m → Time = (1 - 0.75) / 1 = 0.25s

**Answer:** 0.75 seconds (longest time for any ant to fall off)

**Why this works:** The collisions don't change the outcome - each ant still reaches the end in the same time as if they passed through.

## Complexity
- **Time**: O(1) - Calculate max time for any ant to reach end: max(distance_to_end / speed)
- **Space**: O(1) - Only tracking ant positions
- **Note**: Key insight makes this O(1). Without insight, would need to simulate collisions: O(n²) where n is number of collisions

## Follow-up
- What if ants have different speeds?
- What if stick is circular?
- How to solve with N ants?

