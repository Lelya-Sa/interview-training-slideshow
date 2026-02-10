# Pirate Gold Problem

## Problem
5 pirates find 100 gold coins. They must decide how to split them. The rules:
1. Oldest pirate proposes a split
2. All vote (including proposer)
3. If ≥50% vote yes, split happens
4. If <50% vote yes, proposer is thrown overboard, next oldest proposes
5. Pirates are perfectly logical and want to maximize their gold

How should the oldest pirate split the coins?

## Approach
Work backwards from the end case. If only 2 pirates remain, what happens? Then 3, then 4, then 5.

## Solution
**Work Backwards:**

**If only 2 pirates remain (P4, P5):**
- P4 proposes: (100, 0) - P4 votes yes, P5 votes no → 50% yes → Passes
- P4 gets 100, P5 gets 0

**If 3 pirates remain (P3, P4, P5):**
- P3 needs 1 vote besides himself
- P5 will vote yes for any amount > 0 (otherwise gets 0)
- P3 proposes: (99, 0, 1) - P3 and P5 vote yes → Passes

**If 4 pirates remain (P2, P3, P4, P5):**
- P2 needs 2 votes besides himself
- P4 will vote yes for any amount > 0 (otherwise gets 0)
- P5 will vote yes for any amount > 0 (otherwise gets 0)
- P2 proposes: (98, 0, 1, 1) - P2, P4, P5 vote yes → Passes

**If 5 pirates remain (P1, P2, P3, P4, P5):**
- P1 needs 2 votes besides himself
- P3 will vote yes for any amount > 0 (otherwise gets 0)
- P4 or P5 will vote yes for any amount > 0 (otherwise gets 0)
- P1 proposes: (98, 0, 1, 0, 1) or (98, 0, 1, 1, 0)

**Answer:** Oldest pirate proposes (98, 0, 1, 0, 1) - giving 1 coin each to 3rd and 5th pirates, keeping 98.

## Complexity
- **Time**: O(n) where n is number of pirates - work backwards from n=2 to n=pirates
- **Space**: O(1) - Only tracking current proposal
- **Note**: This is a game theory problem using backward induction. For N pirates, need to solve for 2, 3, ..., N.

## Follow-up
- What if there are 6 pirates?
- What if majority is >50%?
- How does this relate to game theory?

