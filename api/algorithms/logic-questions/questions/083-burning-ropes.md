# Burning Ropes

## Problem
You have two ropes. Each rope takes exactly 60 minutes to burn from one end to the other, but they don't burn at a constant rate (some parts burn faster). You have matches. How do you measure exactly 45 minutes?

## Approach
Light one rope from both ends simultaneously. When it finishes, light the other rope from both ends.

## Solution
**Strategy:**

1. **Light Rope 1 from BOTH ends** at time 0
   - Rope burns in 30 minutes (both ends burning toward middle)

2. **When Rope 1 finishes (30 minutes):**
   - **Light Rope 2 from BOTH ends**
   - Rope 2 burns in 15 minutes (both ends)

3. **Total time:** 30 + 15 = 45 minutes ✅

**Why it works:**
- Lighting from both ends halves the burn time
- Rope 1: 60 min → 30 min (both ends)
- Rope 2: 60 min → 30 min, but we only need 15 min of it

**Answer:** Light first rope from both ends. When it finishes (30 min), light second rope from both ends. When second finishes (15 min later), total = 45 minutes.

## Complexity
- **Time**: O(1) - Fixed 2-step process
- **Space**: O(1) - Only tracking time
- **Note**: Key insight: lighting from both ends halves burn time. Can measure any time ≤ 60 minutes with 2 ropes.

## Follow-up
- How to measure 30 minutes?
- How to measure 15 minutes?
- What if you have 3 ropes?

