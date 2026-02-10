# Poisoned Wine Problem

## Problem
You have 1000 bottles of wine. One is poisoned. You have 10 test strips that can detect poison. Each strip can be used multiple times, but takes 7 days to show results. How do you identify the poisoned bottle in the minimum time?

## Approach
Use binary encoding. Each test strip represents a bit. Mix samples from bottles whose binary representation has a 1 in that bit position.

## Solution
**Binary Encoding Strategy:**

Number bottles 0-999. Each bottle has a 10-bit binary representation.

**For each test strip (bit position 0-9):**
- Mix wine from all bottles where that bit is 1
- Apply to test strip

**After 7 days:**
- Read results: Strips that test positive indicate which bits are 1
- Convert binary number to decimal → That's the poisoned bottle!

**Example:**
- If strips 0, 3, 7 are positive
- Binary: 10001001 (bits 0, 3, 7 are 1)
- Decimal: 137
- Bottle 137 is poisoned ✅

**Answer:** Use binary encoding. Each strip tests one bit position. After 7 days, the pattern tells you exactly which bottle is poisoned.

## Complexity
- **Time**: O(1) - Single round of testing (7 days), O(log n) to identify bottle where n is number of bottles
- **Space**: O(1) - Only need to store 10 test results (bits)
- **Note**: With k test strips, can identify 2^k bottles. Binary encoding maximizes information per test.

## Follow-up
- What if you have 8 test strips?
- What if you need to test in 1 day?
- How to solve for N bottles with M strips?

