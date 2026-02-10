# Prisoner Hats Problem

## Problem
100 prisoners are lined up. Each can see all hats in front but not their own or behind. There are 50 red hats and 50 blue hats (randomly distributed). Starting from the back, each prisoner must guess their hat color. They can hear previous guesses. What strategy guarantees at least 50 correct guesses?

## Approach
Use parity. The last prisoner counts red hats they see and uses that to signal the total parity.

## Solution
**Strategy:**

**Last prisoner (P100):**
- Counts red hats they see (say, R = 45)
- If R is even, guesses "RED"
- If R is odd, guesses "BLUE"
- This signals the parity of red hats to others

**Other prisoners:**
- Count red hats they see
- Count how many "RED" guesses they've heard
- Calculate: If (red hats seen + red guesses heard) is even, their hat is BLUE
- If odd, their hat is RED

**Why it works:**
- P100's guess encodes total red hat parity
- Each prisoner can calculate their hat color from:
  - Red hats they see
  - Red guesses they've heard (including P100's signal)
  - Their own hat completes the parity

**Example:**
- P100 sees 45 red → odd → guesses "BLUE" (signals odd total)
- P99 sees 44 red, heard 0 "RED" → 44 is even → Their hat must be RED (to make total odd)
- P98 sees 43 red, heard 1 "RED" → 44 is even → Their hat is RED
- And so on...

**Answer:** Last prisoner signals parity of red hats. Others calculate their color from seen hats + heard guesses. Guarantees at least 50 correct (last one might be wrong, but others are correct).

## Complexity
- **Time**: O(N) where N is number of prisoners - each prisoner makes one guess
- **Space**: O(1) per prisoner - only tracking count of red hats seen and guesses heard
- **Note**: Parity strategy guarantees N-1 correct guesses. For N prisoners, success rate is (N-1)/N.

## Follow-up
- What if there are 3 colors?
- What if prisoners can't hear previous guesses?
- How to guarantee all 100 correct?

