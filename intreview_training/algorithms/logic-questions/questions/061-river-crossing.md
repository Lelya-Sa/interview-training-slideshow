# River Crossing Problem

## Problem
A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat can only carry the farmer and one other item. If left alone together, the wolf will eat the goat, and the goat will eat the cabbage. How does the farmer get everyone across safely?

## Approach
Work backwards and track what can't be left alone. The goat is the key - it can't be left with either the wolf or the cabbage.

## Solution
**Step-by-step:**

1. **Farmer takes goat across** (wolf and cabbage safe together)
   - Left: Wolf, Cabbage | Right: Goat

2. **Farmer returns alone**
   - Left: Wolf, Cabbage | Right: Goat

3. **Farmer takes wolf across**
   - Left: Cabbage | Right: Goat, Wolf
   - **Problem:** Can't leave goat and wolf alone!

4. **Farmer brings goat back**
   - Left: Goat, Cabbage | Right: Wolf

5. **Farmer takes cabbage across**
   - Left: Goat | Right: Wolf, Cabbage

6. **Farmer returns alone**
   - Left: Goat | Right: Wolf, Cabbage

7. **Farmer takes goat across**
   - Left: (empty) | Right: Wolf, Goat, Cabbage ✅

**Answer:** 7 trips total. The key is bringing the goat back after taking the wolf.

## Complexity
- **Time**: O(1) - Fixed solution for 3 items (7 steps)
- **Space**: O(1) - Only tracking current state
- **Note**: For N items, this becomes a state space search problem: O(b^d) where b is branching factor, d is depth

## Follow-up
- What if boat can carry 2 items?
- What if there are 4 items?
- How to solve programmatically?

