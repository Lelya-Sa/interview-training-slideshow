# Kth Largest Element

## Problem
Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

## Examples
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

## Approach
1. **Min-Heap**: Maintain heap of size k, root is kth largest
2. **Quick Select**: Partition-based selection algorithm
3. **Sorting**: Sort array, return nums[n-k]

## Solution

### JavaScript
```javascript
// Min-Heap approach
function findKthLargest(nums, k) {
    const minHeap = [];
    
    for (const num of nums) {
        if (minHeap.length < k) {
            minHeap.push(num);
            bubbleUp(minHeap, minHeap.length - 1);
        } else if (num > minHeap[0]) {
            minHeap[0] = num;
            bubbleDown(minHeap, 0);
        }
    }
    
    return minHeap[0];
}

function bubbleUp(heap, index) {
    while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (heap[parent] <= heap[index]) break;
        [heap[parent], heap[index]] = [heap[index], heap[parent]];
        index = parent;
    }
}

function bubbleDown(heap, index) {
    while (true) {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        
        if (left < heap.length && heap[left] < heap[smallest]) {
            smallest = left;
        }
        if (right < heap.length && heap[right] < heap[smallest]) {
            smallest = right;
        }
        
        if (smallest === index) break;
        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        index = smallest;
    }
}

// Quick Select approach
function findKthLargestQuickSelect(nums, k) {
    const n = nums.length;
    return quickSelect(nums, 0, n - 1, n - k);
}

function quickSelect(nums, left, right, k) {
    if (left === right) return nums[left];
    
    const pivotIndex = partition(nums, left, right);
    
    if (pivotIndex === k) {
        return nums[k];
    } else if (pivotIndex < k) {
        return quickSelect(nums, pivotIndex + 1, right, k);
    } else {
        return quickSelect(nums, left, pivotIndex - 1, k);
    }
}

function partition(nums, left, right) {
    const pivot = nums[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
        if (nums[j] < pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}
```

### Python
```python
import heapq

def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]

def find_kth_largest_heap(nums, k):
    min_heap = []
    for num in nums:
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        elif num > min_heap[0]:
            heapq.heapreplace(min_heap, num)
    return min_heap[0]
```

## Complexity
- **Time**: O(n log k) for heap, O(n) average for quick select
- **Space**: O(k) for heap, O(1) for quick select

## Follow-up
- Find kth smallest element?
- Find top k elements?
- Kth largest in stream of numbers?

