# Count Primes

## Problem
Given an integer n, return the number of prime numbers that are strictly less than n.

## Examples
```
Input: n = 10
Output: 4 (primes: 2, 3, 5, 7)

Input: n = 0
Output: 0

Input: n = 1
Output: 0
```

## Approach
1. **Sieve of Eratosthenes**: Mark multiples of primes as composite
2. **Trial Division**: Check each number individually (slow)
3. **Optimized Sieve**: Skip even numbers, start from i²

## Solution

### JavaScript
```javascript
function countPrimes(n) {
    if (n <= 2) return 0;
    
    const isPrime = new Array(n).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    
    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            // Mark multiples of i as composite
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    return isPrime.filter(p => p).length;
}

// Optimized (skip even numbers)
function countPrimesOptimized(n) {
    if (n <= 2) return 0;
    
    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    // Handle 2 separately
    let count = 1;
    for (let i = 3; i < n; i += 2) {
        if (isPrime[i]) {
            count++;
            for (let j = i * i; j < n; j += 2 * i) {
                isPrime[j] = false;
            }
        }
    }
    
    return count;
}
```

### Python
```python
def count_primes(n):
    if n <= 2:
        return 0
    
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n, i):
                is_prime[j] = False
    
    return sum(is_prime)
```

## Complexity
- **Time**: O(n log log n) for Sieve
- **Space**: O(n)

## Follow-up
- List all primes less than n?
- Check if specific number is prime?
- Count primes in range [a, b]?

