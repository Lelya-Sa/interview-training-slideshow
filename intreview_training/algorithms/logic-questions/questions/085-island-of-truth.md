# Island of Truth and Lies

## Problem
You're on an island with two tribes: Truth-tellers (always tell truth) and Liars (always lie). You meet two people. One says "We are both truth-tellers" and the other says "We are both liars." What are they?

## Approach
Analyze the statements logically. If someone says "We are both truth-tellers," can that be true?

## Solution
**Analysis:**

**Case 1: First person is truth-teller**
- Says "We are both truth-tellers"
- If true, second must also be truth-teller
- But second says "We are both liars" - contradiction!
- Impossible

**Case 2: First person is liar**
- Says "We are both truth-tellers" (a lie)
- So they're NOT both truth-tellers
- Since first is liar, second must be truth-teller
- Second (truth-teller) says "We are both liars"
- But second is truth-teller, so this is false - contradiction!
- Impossible

**Wait - let's reconsider:**

**If first is truth-teller:**
- Says "We are both truth-tellers" → Both must be truth-tellers
- Second says "We are both liars" → But second is truth-teller, so this is false
- Contradiction: Second can't be truth-teller and say false statement

**If first is liar:**
- Says "We are both truth-tellers" (lie) → They're not both truth-tellers
- Since first is liar, second must be truth-teller
- Second (truth-teller) says "We are both liars" → False (second is truth-teller)
- Contradiction: Truth-teller can't say false statement

**Answer:** This is impossible! The statements are contradictory. No valid assignment exists.

## Complexity
- **Time**: O(1) - Logical analysis of statements
- **Space**: O(1) - No data structures needed
- **Note**: This is a satisfiability problem. For N people with M statements, becomes SAT problem: O(2^N) worst case to check all assignments.

## Follow-up
- What if second says "At least one of us is a liar"?
- What if there are 3 people?
- How to solve with N people and M statements?

