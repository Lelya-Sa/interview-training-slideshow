# Clock Angles

## Problem
At what time (to the nearest second) are the hour and minute hands of a clock exactly 90 degrees apart?

## Approach
Calculate the angle of each hand, set their difference to 90° (or 270°), solve for time.

## Solution
**Angles:**
- Minute hand: 6° per minute (360° / 60 minutes)
- Hour hand: 0.5° per minute (30° per hour = 0.5° per minute)

**At time t minutes past 12:**
- Minute hand angle: 6t degrees
- Hour hand angle: 0.5t degrees

**Difference:**
- |6t - 0.5t| = 90° or 270°
- |5.5t| = 90° or 270°
- 5.5t = 90 → t = 90/5.5 ≈ 16.36 minutes = 16 min 22 sec
- 5.5t = 270 → t = 270/5.5 ≈ 49.09 minutes = 49 min 5 sec

**Answer:** Approximately 12:16:22 and 12:49:05 (and similar times every hour)

**Note:** They're 90° apart twice per hour.

## Complexity
- **Time**: O(1) - Direct calculation using angle formulas
- **Space**: O(1) - No data structures needed
- **Note**: Mathematical problem. Formula: |6m - 0.5(60h + m)| = angle, solve for m (minutes) and h (hours).

## Follow-up
- When are they exactly opposite (180°)?
- When do they overlap?
- How many times per day are they at right angles?

