# Fizz Buzz

## Problem
Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5
- answer[i] == "Fizz" if i is divisible by 3
- answer[i] == "Buzz" if i is divisible by 5
- answer[i] == i (as a string) if none of the above conditions are true

## Examples
```
Input: n = 3
Output: ["1","2","Fizz"]

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

## Approach
1. **Modulo Checks**: Check divisibility by 3, 5, and both
2. **String Concatenation**: Build string by concatenating Fizz/Buzz
3. **HashMap**: Store divisors and words for extensibility

## Solution

### JavaScript
```javascript
function fizzBuzz(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }
    
    return result;
}

// String concatenation approach
function fizzBuzzConcat(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let str = "";
        if (i % 3 === 0) str += "Fizz";
        if (i % 5 === 0) str += "Buzz";
        result.push(str || i.toString());
    }
    
    return result;
}

// Extensible with HashMap
function fizzBuzzExtensible(n, map = {3: "Fizz", 5: "Buzz"}) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let str = "";
        for (const [divisor, word] of Object.entries(map)) {
            if (i % divisor === 0) {
                str += word;
            }
        }
        result.push(str || i.toString());
    }
    
    return result;
}
```

### Python
```python
def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

def fizz_buzz_concat(n):
    result = []
    for i in range(1, n + 1):
        s = ""
        if i % 3 == 0:
            s += "Fizz"
        if i % 5 == 0:
            s += "Buzz"
        result.append(s if s else str(i))
    return result
```

## Complexity
- **Time**: O(n)
- **Space**: O(n)

## Follow-up
- FizzBuzz with custom divisors?
- FizzBuzz without modulo operator?
- FizzBuzz in functional style?

