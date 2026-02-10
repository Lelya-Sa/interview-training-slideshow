# XOR Approach Explanation - Find Missing Number

## How XOR Works

XOR (exclusive OR) has these key properties:
1. **XOR with itself = 0**: `a ^ a = 0`
2. **XOR with 0 = itself**: `a ^ 0 = a`
3. **Commutative**: `a ^ b = b ^ a`
4. **Associative**: `(a ^ b) ^ c = a ^ (b ^ c)`

## The Problem

Given array `[3, 0, 1]` (n=3, so expected numbers are 0, 1, 2, 3)
- Expected: 0, 1, 2, 3
- Actual: 3, 0, 1
- Missing: 2

## The XOR Solution Strategy

**Key Insight:** If we XOR all expected numbers (0 to n) with all actual numbers, pairs cancel out, leaving only the missing number!

**Step-by-step:**

1. **XOR all expected numbers** (0 to n): `0 ^ 1 ^ 2 ^ 3`
2. **XOR all actual numbers**: `3 ^ 0 ^ 1`
3. **XOR both results together**: `(0^1^2^3) ^ (3^0^1)`

**Why this works:**
- Numbers that appear in both cancel out: `3^3=0`, `0^0=0`, `1^1=0`
- Only the missing number remains: `2`

## Correct Implementation

```python
def find_missing_number_xor(nums):
    n = len(nums)
    missing = n  # Start with n (the last expected number)
    
    # XOR with all indices (0 to n-1) and all array values
    for i in range(n):
        missing ^= i      # XOR with expected number i
        missing ^= nums[i] # XOR with actual number
    
    return missing
```

## Example Walkthrough

**Input:** `[3, 0, 1]` (n=3, so expected: 0,1,2,3)

```
Initial: missing = 3

i=0: missing = 3 ^ 0 ^ 3 = (3^3) ^ 0 = 0 ^ 0 = 0
i=1: missing = 0 ^ 1 ^ 0 = (0^0) ^ 1 = 0 ^ 1 = 1
i=2: missing = 1 ^ 2 ^ 1 = (1^1) ^ 2 = 0 ^ 2 = 2

Result: 2 ✅
```

## Why Your Current Code Doesn't Work

Your current code:
```python
def find_missing_number_xor_approach(nums):
    xor = 0
    for num in nums:
        xor ^= num
    return xor
```

**Problem:** This only XORs the array numbers, but doesn't XOR with the expected numbers (0 to n).

**What it actually does:**
- For `[3, 0, 1]`: `0 ^ 3 ^ 0 ^ 1 = 2` (accidentally works!)
- For `[0, 1]`: `0 ^ 0 ^ 1 = 1` (wrong! should be 2)
- For `[1, 2, 3]`: `0 ^ 1 ^ 2 ^ 3 = 0` (wrong! should be 0, but this is missing 0)

## The Fix

You need to XOR with BOTH:
1. All expected numbers (0 to n)
2. All actual numbers in array

Here's the corrected version:

```python
def find_missing_number_xor_approach(nums):
    n = len(nums)
    missing = n  # Start with n (since we expect 0 to n)
    
    for i in range(n):
        missing ^= i        # XOR with expected number i
        missing ^= nums[i]   # XOR with actual number
    
    return missing
```

## Why Start with `n`?

Since we expect numbers 0, 1, 2, ..., n (total n+1 numbers), but the array has n numbers, we need to include n in our XOR calculation. Starting with `missing = n` ensures we XOR n as well.

## Alternative: XOR Expected Range Separately

```python
def find_missing_number_xor_approach(nums):
    # XOR all expected numbers (0 to n)
    expected_xor = 0
    for i in range(len(nums) + 1):
        expected_xor ^= i
    
    # XOR all actual numbers
    actual_xor = 0
    for num in nums:
        actual_xor ^= num
    
    # Missing number is the difference
    return expected_xor ^ actual_xor
```

Both approaches work, but the first is more efficient (single pass).

