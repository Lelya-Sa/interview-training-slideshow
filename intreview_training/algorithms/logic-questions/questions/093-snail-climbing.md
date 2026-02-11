# Snail Climbing Well

## Problem
A snail is at the bottom of a 30-foot well. Each day, it climbs up 3 feet. Each night, it slides back 2 feet. How many days does it take to get out?

## Approach
Calculate net progress per day. On the last day, it doesn't slide back.

## Solution
**Net progress per day:**
- Day: +3 feet
- Night: -2 feet
- Net: +1 foot per day

**But on the last day:**
- Snail reaches top during the day
- Doesn't slide back at night

**Calculation:**
- After 27 days: 27 feet up
- Day 28: Climbs 3 feet → reaches 30 feet ✅
- Gets out, no sliding back

**Answer:** 28 days

**General formula for well of height H, climb C, slide S:**
Days = ⌈(H - C) / (C - S)⌉ + 1
     = ⌈(30 - 3) / (3 - 2)⌉ + 1
     = ⌈27 / 1⌉ + 1
     = 27 + 1 = 28

## Complexity
- **Time**: O(1) - Direct formula calculation
- **Space**: O(1) - No data structures needed
- **Note**: Mathematical problem. Key insight: last day doesn't slide back, so formula accounts for that.

## Follow-up
- What if snail climbs 4 feet, slides 1?
- What if well is 100 feet?
- How to solve for any H, C, S?

