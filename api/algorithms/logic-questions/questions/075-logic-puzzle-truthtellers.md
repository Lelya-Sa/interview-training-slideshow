# Truth-Tellers and Liars

## Problem
You meet two people at a fork in the road. One always tells the truth, one always lies. One path leads to safety, one to danger. You can ask ONE question to ONE person to determine the safe path. What question do you ask?

## Approach
Ask a question that works regardless of whether you ask the truth-teller or liar. Use a question that references what the other person would say.

## Solution
**The Question:**
"Which path would the OTHER person say leads to safety?"

**How it works:**

**If you ask the truth-teller:**
- Truth-teller knows liar would point to wrong path
- Truth-teller tells you the wrong path (what liar would say)
- You take the opposite path → Safety ✅

**If you ask the liar:**
- Liar knows truth-teller would point to correct path
- Liar lies and points to wrong path
- You take the opposite path → Safety ✅

**Answer:** Ask either person: "Which path would the other person say leads to safety?" Then take the opposite path.

## Complexity
- **Time**: O(1) - Single question, single decision
- **Space**: O(1) - No data structures needed
- **Note**: This is a logic puzzle demonstrating self-referential questions. For N people, becomes more complex.

## Follow-up
- What if there are 3 people (1 truth-teller, 2 liars)?
- What if you can ask 2 questions?
- How to solve with N people?

