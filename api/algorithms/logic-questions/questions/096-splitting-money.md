# Splitting Money

## Problem
Three friends split a restaurant bill. They decide to leave a 20% tip. After calculating, they realize if they had known the tip percentage beforehand, they would have paid different amounts. The bill was $X. How much did each actually pay vs how much they should have paid?

## Approach
This is a classic puzzle about percentage calculations and rounding. The key is that tips are usually calculated on the pre-tax amount.

## Solution
**Classic Version:**

Actually, this problem is usually stated differently. Let me present a clearer version:

**Problem:** Three people split a $30 bill. They decide to pay $10 each. The waiter realizes the bill should be $25, gives $5 back. They tip $2, keep $1 each. So each paid $9, total $27, plus $2 tip = $29. Where's the missing dollar?

**The Trick:**
- The $27 already includes the $2 tip!
- They should have: $25 (bill) + $2 (tip) = $27
- Plus $3 returned = $30 ✅
- The "missing" dollar is an accounting error in the problem statement

**Correct accounting:**
- Bill: $25
- Tip: $2
- Returned: $3
- Total: $30 ✅

**Answer:** There's no missing dollar - it's a misdirection in how the problem is stated. The $27 includes the tip.

## Complexity
- **Time**: O(1) - Simple arithmetic check
- **Space**: O(1) - No data structures needed
- **Note**: This is a logic puzzle demonstrating how misdirection in problem statements can confuse. The "missing" dollar is an accounting error, not a mathematical one.

## Follow-up
- What if bill is different amount?
- What if tip percentage is different?
- How to avoid this confusion?

