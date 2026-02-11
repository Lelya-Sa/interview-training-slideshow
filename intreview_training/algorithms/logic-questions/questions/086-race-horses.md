# Race Horses Problem

## Problem
You have 25 horses. You can race 5 horses at a time. You don't have a timer. What's the minimum number of races needed to find the 3 fastest horses?

## Approach
Race in groups, then race the winners. Need to find top 3, so race top 5 from first round plus some others.

## Solution
**Step-by-step:**

**Round 1: Race all 25 horses in 5 races (5 races)**
- Race 1: Horses 1-5 → Winner A1
- Race 2: Horses 6-10 → Winner A2
- Race 3: Horses 11-15 → Winner A3
- Race 4: Horses 16-20 → Winner A4
- Race 5: Horses 21-25 → Winner A5

**Round 2: Race the 5 winners (1 race)**
- Race A1, A2, A3, A4, A5
- Assume order: A1 > A2 > A3 > A4 > A5
- A1 is definitely fastest ✅

**Elimination:**
- A5 and its group are eliminated (A5 is 5th, can't be in top 3)
- A4 and its group are eliminated (A4 is 4th, can't be in top 3)
- A3 might be 3rd, but we need to check A2's group

**Round 3: Race for 2nd and 3rd (1 race)**
- Race: A2, A3, B2 (2nd from A2's group), B3 (2nd from A3's group), C2 (2nd from A1's group)
- Top 2 from this race are 2nd and 3rd fastest ✅

**Total: 5 + 1 + 1 = 7 races**

**Answer:** 7 races minimum

## Complexity
- **Time**: O(1) - Fixed 7 races for 25 horses, 5 per race
- **Space**: O(1) - Only tracking winners and positions
- **Note**: For N horses racing k at a time, finding top m: O(N/k + log_k(N)) races. Strategy minimizes races needed.

## Follow-up
- How many races to find fastest horse only?
- How many races to find top 5?
- What if you can race 6 horses at a time?

