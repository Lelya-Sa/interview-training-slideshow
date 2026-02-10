# Intersection of Two Arrays

## Problem
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

## Examples
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9] or [9,4]
```

## Approach
1. **HashSet**: Store one array in set, check second array
2. **Two Sets**: Convert both to sets, find intersection
3. **Sorting + Two Pointers**: Sort both, use two pointers

## Solution

### JavaScript
```javascript
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const result = new Set();
    
    for (const num of nums2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }
    
    return Array.from(result);
}

// Using built-in Set intersection
function intersectionSet(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    return Array.from(new Set([...set1].filter(x => set2.has(x))));
}

// Sorting approach
function intersectionSort(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    
    const result = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
                result.push(nums1[i]);
            }
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}
```

### Python
```python
def intersection(nums1, nums2):
    set1 = set(nums1)
    result = set()
    
    for num in nums2:
        if num in set1:
            result.add(num)
    
    return list(result)

def intersection_builtin(nums1, nums2):
    return list(set(nums1) & set(nums2))
```

## Complexity
- **Time**: O(n + m) for HashSet, O(n log n + m log m) for sorting
- **Space**: O(min(n, m))

## Follow-up
- Intersection with duplicates allowed?
- Intersection of multiple arrays?
- Union of two arrays?

