# 3 Light Switches Problem

## Problem
You're in a room with 3 light switches. Each switch controls one of 3 light bulbs in another room. You can only go to the other room once. How do you determine which switch controls which bulb?

## Approach
Use the fact that bulbs generate heat. Turn on one switch, wait, then turn it off and turn on another.

## Solution
**Strategy:**

1. **Turn on Switch 1** and leave it on for a few minutes
2. **Turn off Switch 1**, then **turn on Switch 2**
3. **Go to the other room**

**Observations:**
- **Bulb that's ON and WARM:** Controlled by Switch 2 (just turned on)
- **Bulb that's OFF and WARM:** Controlled by Switch 1 (was on, then turned off)
- **Bulb that's OFF and COLD:** Controlled by Switch 3 (never turned on)

**Answer:** Use heat! Turn on switch 1, wait, turn it off, turn on switch 2, then check which bulb is on (switch 2), which is off but warm (switch 1), and which is off and cold (switch 3).

## Complexity
- **Time**: O(1) - Fixed 3-step process
- **Space**: O(1) - Only tracking switch states
- **Note**: Uses physical property (heat) to encode information. Without heat, would need multiple trips or different strategy.

## Follow-up
- What if bulbs are LED (don't heat up)?
- What if you can only flip switches once?
- How to solve with 4 switches and 4 bulbs?

