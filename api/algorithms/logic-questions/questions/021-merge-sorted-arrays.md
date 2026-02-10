# Merge Sorted Arrays

## Problem
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums2 into nums1 as one sorted array. nums1 has a size of m + n.

## Examples
```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
```

## Approach
1. **Two Pointers (Backward)**: Start from end, place larger element
2. **Two Pointers (Forward)**: Use extra space, merge normally
3. **Sort**: Combine and sort (not optimal)

## Solution

### JavaScript
```javascript
function merge(nums1, m, nums2, n) {
    let i = m - 1;      // Last element in nums1
    let j = n - 1;      // Last element in nums2
    let k = m + n - 1;  // Last position in merged array
    
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    
    // Copy remaining elements from nums2
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}
```

### Python
```python
def merge(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    
    # Copy remaining from nums2
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1
```

## Complexity
- **Time**: O(m + n)
- **Space**: O(1)

## Follow-up
- Merge k sorted arrays?
- Merge sorted linked lists?
- Merge with duplicates removed?

