# Bridge Crossing Problem

## Problem
Four people need to cross a bridge at night. They have one flashlight. The bridge can only hold 2 people at a time. The people cross at different speeds: 1 min, 2 min, 5 min, and 10 min. When two people cross together, they move at the slower person's pace. What's the minimum time to get everyone across?

## Approach
Minimize time by having the fastest people make return trips. The key is minimizing the time spent on return trips.

## Solution
**Strategy:**
1. **Fastest two cross together** (1 min and 2 min) → 2 minutes
   - Left: 5 min, 10 min | Right: 1 min, 2 min

2. **Fastest returns** (1 min) → 1 minute
   - Left: 1 min, 5 min, 10 min | Right: 2 min

3. **Slowest two cross** (5 min and 10 min) → 10 minutes
   - Left: 1 min | Right: 2 min, 5 min, 10 min

4. **Second fastest returns** (2 min) → 2 minutes
   - Left: 1 min, 2 min | Right: 5 min, 10 min

5. **Fastest two cross again** (1 min and 2 min) → 2 minutes
   - Left: (empty) | Right: 1 min, 2 min, 5 min, 10 min ✅

**Total: 2 + 1 + 10 + 2 + 2 = 17 minutes**

**Answer:** 17 minutes minimum

## Complexity
- **Time**: O(1) - Fixed solution for 4 people (5 steps)
- **Space**: O(1) - Only tracking current state
- **Note**: For N people, this becomes an optimization problem. Can be solved with dynamic programming or greedy approach: O(N log N) to sort speeds, then O(N) to compute optimal crossing

## Follow-up
- What if there are 5 people?
- What if bridge can hold 3 people?
- How to solve for N people?

