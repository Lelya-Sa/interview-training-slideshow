# Prisoners and Light Bulb

## Problem
100 prisoners are in separate cells. They can't communicate except through a light bulb in a common room. Each day, one prisoner (chosen randomly) can visit the room and turn the light on or off. Once a prisoner declares that all 100 have visited the room, if correct, all go free. If wrong, all are executed. How do they guarantee success?

## Approach
Designate one prisoner as the "counter". Others turn the light on only once (their first visit). Counter counts how many times they've seen the light on.

## Solution
**Strategy:**

1. **Designate one prisoner as "Counter"** (e.g., Prisoner #1)
2. **Counter's job:**
   - Turn light OFF every time they visit
   - Count how many times they turn it off (after it was on)
   - When count reaches 99, declare all have visited

3. **Other prisoners' job:**
   - If light is OFF and you haven't turned it on before, turn it ON
   - Otherwise, don't touch the light

**How it works:**
- Each non-counter prisoner turns light on exactly once (their first visit when it's off)
- Counter sees light on, turns it off, increments count
- When counter has seen 99 "on" signals, all others have visited at least once
- Counter has also visited (to count), so all 100 have visited

**Answer:** Counter counts 99 "on" signals. Each prisoner turns light on once. When count = 99, all have visited.

## Complexity
- **Time**: O(N) expected visits where N is number of prisoners - each non-counter visits once, counter visits multiple times
- **Space**: O(1) - Only tracking counter's count and light state
- **Note**: Expected time is high (could be many days) but guarantees correctness. Worst case: counter visits many times before others

## Follow-up
- What if prisoners can't remember if they've turned it on?
- What if light starts in random state?
- How to minimize expected time?

