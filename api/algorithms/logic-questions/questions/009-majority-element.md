# Majority Element

## Problem
Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

## Examples
```
Input: nums = [3, 2, 3]
Output: 3

Input: nums = [2, 2, 1, 1, 1, 2, 2]
Output: 2
```

## Approach
1. **HashMap**: Count frequency, return element with count > n/2
2. **Boyer-Moore Voting**: Track candidate and count, increment/decrement
3. **Sorting**: Sort array, middle element is majority

## Solution

### JavaScript
```javascript
// Boyer-Moore Voting Algorithm (O(1) space)
function majorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    // Find candidate
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    return candidate;
}

// HashMap approach
function majorityElementHashMap(nums) {
    const map = new Map();
    const threshold = Math.floor(nums.length / 2);
    
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
        if (map.get(num) > threshold) {
            return num;
        }
    }
}
```

### Python
```python
def majority_element(nums):
    candidate = None
    count = 0
    
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    
    return candidate

def majority_element_hashmap(nums):
    from collections import Counter
    counts = Counter(nums)
    return counts.most_common(1)[0][0]
```

## Complexity
- **Time**: O(n)
- **Space**: O(1) for Boyer-Moore, O(n) for HashMap

## Follow-up
- What if majority element doesn't exist?
- Find all elements appearing more than n/3 times?
- Majority element in stream of numbers?

