# Hat Colors Problem

## Problem
Three people are standing in a line. Each can see the hats of people in front, but not their own or behind. There are 2 black hats and 2 white hats total. They're told at least one person is wearing a black hat. Starting from the back, each person must guess their hat color. How do they guarantee at least one correct guess?

## Approach
Use logic and what others can see. The person in back uses the silence of others as information.

## Solution
**Strategy:**

**Person 3 (back, sees Person 1 and 2):**
- If sees 2 white hats: Knows they have black hat (since at least one black exists)
- If sees 2 black hats: Knows they have white hat
- If sees 1 black, 1 white: Can't be sure, stays silent

**Person 2 (middle, sees Person 1):**
- If Person 3 was silent: Person 3 saw mixed colors (1 black, 1 white)
- If Person 2 sees white on Person 1: Person 2 must have black
- If Person 2 sees black on Person 1: Person 2 must have white

**Person 1 (front):**
- Uses information from Person 2's guess or silence

**Example:**
- Hats: Person 1 = Black, Person 2 = White, Person 3 = Black
- Person 3 sees: White (P1) and Black (P2) → Stays silent (mixed)
- Person 2 sees: Black (P1), knows P3 saw mixed → Person 2 must have White ✅

**Answer:** Person 2 can always deduce correctly based on Person 3's silence and what they see.

## Complexity
- **Time**: O(1) - Fixed solution for 3 people (sequential logic deduction)
- **Space**: O(1) - Only tracking what each person sees
- **Note**: For N people, this becomes more complex. Each person uses information from all previous guesses/silence.

## Follow-up
- What if there are 4 people?
- What if hats are red, blue, green?
- How to guarantee all guess correctly?

