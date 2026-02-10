# Fibonacci Number

## Problem
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Calculate the nth Fibonacci number.

## Examples
```
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
```

## Approach
1. **Iterative**: Build from bottom up
2. **Memoization**: Recursive with cache
3. **Matrix Exponentiation**: O(log n) solution
4. **Binet's Formula**: Mathematical formula (approximation)

## Solution

### JavaScript
```javascript
// Iterative (O(n) time, O(1) space)
function fib(n) {
    if (n <= 1) return n;
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Memoization
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    return memo[n];
}

// Matrix exponentiation (O(log n))
function fibMatrix(n) {
    if (n <= 1) return n;
    
    function multiply(A, B) {
        return [
            [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
            [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
        ];
    }
    
    function power(matrix, n) {
        if (n === 1) return matrix;
        const half = power(matrix, Math.floor(n/2));
        const squared = multiply(half, half);
        return n % 2 === 0 ? squared : multiply(squared, matrix);
    }
    
    const base = [[1, 1], [1, 0]];
    return power(base, n)[0][1];
}
```

### Python
```python
def fib(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    for i in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1

def fib_memo(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

## Complexity
- **Time**: O(n) for iterative, O(log n) for matrix
- **Space**: O(1) for iterative, O(n) for memoization

## Follow-up
- Print Fibonacci sequence up to n?
- Check if number is Fibonacci?
- Fibonacci with different starting numbers?

