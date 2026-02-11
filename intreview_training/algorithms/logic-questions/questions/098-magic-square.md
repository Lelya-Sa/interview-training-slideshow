# Magic Square

## Problem
Fill a 3×3 grid with numbers 1-9 so that each row, column, and diagonal sums to the same number. What is that sum?

## Approach
Sum of 1-9 = 45. With 3 rows, each row sums to 15. Arrange numbers so rows, columns, diagonals all sum to 15.

## Solution
**Sum calculation:**
- Numbers 1-9 sum to 45
- 3 rows → each row sums to 45/3 = 15

**One solution:**
```
8  1  6
3  5  7
4  9  2
```

**Verification:**
- Rows: 8+1+6=15, 3+5+7=15, 4+9+2=15 ✅
- Columns: 8+3+4=15, 1+5+9=15, 6+7+2=15 ✅
- Diagonals: 8+5+2=15, 6+5+4=15 ✅

**Key insight:**
- Middle number is often 5 (average of 1-9)
- Corner numbers are often even
- Edge numbers are often odd

**Answer:** The magic constant is 15. There are 8 possible arrangements (rotations and reflections).

## Complexity
- **Time**: O(1) for 3×3 - can be constructed directly, O(n!) for brute force search
- **Space**: O(n²) to store the square
- **Note**: For 3×3, magic constant = n(n²+1)/2 = 15. For larger squares, construction becomes more complex.

## Follow-up
- How to create 4×4 magic square?
- What about 5×5?
- How many solutions exist for 3×3?

