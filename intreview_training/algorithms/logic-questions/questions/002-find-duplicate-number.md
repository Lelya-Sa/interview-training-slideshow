# Find Duplicate Number

## Problem
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, prove that at least one duplicate number must exist. Find the duplicate number.

## Examples
```
Input: [1, 3, 4, 2, 2]
Output: 2

Input: [3, 1, 3, 4, 2]
Output: 3

Input: [2, 2, 2, 2, 2]
Output: 2
```

## Approach
1. **HashSet**: Track seen numbers, return first duplicate
2. **Sorting**: Sort array, find adjacent duplicates
3. **Floyd's Cycle Detection**: Treat array as linked list, find cycle start
4. **Binary Search**: Count numbers <= mid, adjust search range

## Solution

### JavaScript
```javascript
// HashSet approach
function findDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return num;
        seen.add(num);
    }
}

// Floyd's Cycle Detection (O(1) space)
function findDuplicateFloyd(nums) {
    let slow = nums[0];
    let fast = nums[0];
    
    // Find intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Find entrance to cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}
```

### Python
```python
def find_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)

def find_duplicate_floyd(nums):
    slow = fast = nums[0]
    
    # Find intersection
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    
    # Find entrance
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow
```

## Complexity
- **Time**: O(n) for HashSet, O(n) for Floyd's
- **Space**: O(n) for HashSet, O(1) for Floyd's

## Follow-up
- Can you solve it without modifying the array?
- Can you solve it using only constant extra space?
- What if there are multiple duplicates?






