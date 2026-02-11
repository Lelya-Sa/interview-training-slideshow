# Happy Number

## Problem
Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

## Examples
```
Input: n = 19
Output: true
19 → 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1

Input: n = 2
Output: false (enters cycle: 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4)
```

## Approach
1. **HashSet**: Track seen numbers to detect cycles
2. **Floyd's Cycle Detection**: Use slow and fast pointers
3. **Mathematical**: All unhappy numbers eventually reach 4

## Solution

### JavaScript
```javascript
function isHappy(n) {
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getNext(n);
    }
    
    return n === 1;
}

function getNext(n) {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}

// Floyd's cycle detection
function isHappyFloyd(n) {
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}
```

### Python
```python
def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(digit) ** 2 for digit in str(n))
    return n == 1

def get_next(n):
    total = 0
    while n > 0:
        n, digit = divmod(n, 10)
        total += digit ** 2
    return total

def is_happy_floyd(n):
    slow = fast = n
    while fast != 1:
        slow = get_next(slow)
        fast = get_next(get_next(fast))
        if slow == fast:
            return False
    return True
```

## Complexity
- **Time**: O(log n) - number of digits
- **Space**: O(log n) for HashSet, O(1) for Floyd's

## Follow-up
- Find all happy numbers in range?
- Count steps to reach 1?
- Happy number with different base?

