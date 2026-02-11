# Logic Questions - Interview Questions

This file contains 100 logic questions for interview preparation.

## Questions

### Find Missing Number in Array

**Problem:**
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

**Answer:**
**Approach:**
1. **Sum Formula**: Calculate expected sum (n*(n+1)/2) and subtract actual sum
2. **XOR Method**: XOR all numbers from 0 to n with all array elements
3. **HashSet**: Store all numbers in set, iterate 0 to n to find missing

**Solution:**
### JavaScript
```javascript
// Sum approach
function findMissingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
// XOR approach
function findMissingNumberXOR(nums) {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
}
```
### Python
```python
def find_missing_number(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
def find_missing_number_xor(nums):
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing
```

---
### Find Duplicate Number

**Problem:**
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, prove that at least one duplicate number must exist. Find the duplicate number.

**Answer:**
**Approach:**
1. **HashSet**: Track seen numbers, return first duplicate
2. **Sorting**: Sort array, find adjacent duplicates
3. **Floyd's Cycle Detection**: Treat array as linked list, find cycle start
4. **Binary Search**: Count numbers <= mid, adjust search range

**Solution:**
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

---
### Two Sum

**Problem:**
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.

**Answer:**
**Approach:**
1. **Brute Force**: Check all pairs - O(n²)
2. **HashMap**: Store complement (target - num) as we iterate - O(n)
3. **Two Pointers**: Sort array, use two pointers (if indices not needed)

**Solution:**
### JavaScript
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
```
### Python
```python
def two_sum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i
```

---
### Reverse Integer

**Problem:**
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

**Answer:**
**Approach:**
1. Extract last digit using modulo 10
2. Add to result (multiply result by 10 first)
3. Divide number by 10
4. Check for overflow before adding next digit

**Solution:**
### JavaScript
```javascript
function reverse(x) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    let reversed = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);
        // Check overflow before multiplying
        if (reversed > INT_MAX / 10 || 
            (reversed === Math.floor(INT_MAX / 10) && digit > 7)) {
            return 0;
        }
        if (reversed < INT_MIN / 10 || 
            (reversed === Math.ceil(INT_MIN / 10) && digit < -8)) {
            return 0;
        }
        reversed = reversed * 10 + digit;
    }
    return reversed;
}
```
### Python
```python
def reverse(x):
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    reversed_num = 0
    sign = 1 if x >= 0 else -1
    x = abs(x)
    while x != 0:
        digit = x % 10
        x //= 10
        # Check overflow
        if reversed_num > INT_MAX // 10:
            return 0
        reversed_num = reversed_num * 10 + digit
    return sign * reversed_num
```

---
### Palindrome Number

**Problem:**
Given an integer x, return true if x is a palindrome integer. An integer is a palindrome when it reads the same backward as forward.

**Answer:**
**Approach:**
1. **String Conversion**: Convert to string, compare with reverse
2. **Reverse Number**: Reverse half the number, compare with other half
3. **Extract Digits**: Compare digits from both ends

**Solution:**
### JavaScript
```javascript
// Without converting to string
function isPalindrome(x) {
    if (x < 0 || (x !== 0 && x % 10 === 0)) {
        return false;
    }
    let reversed = 0;
    let original = x;
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    // For even digits: x === reversed
    // For odd digits: x === Math.floor(reversed / 10)
    return x === reversed || x === Math.floor(reversed / 10);
}
```
### Python
```python
def is_palindrome(x):
    if x < 0 or (x != 0 and x % 10 == 0):
        return False
    reversed_num = 0
    original = x
    while x > reversed_num:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    return x == reversed_num or x == reversed_num // 10
```

---
### Power of Two

**Problem:**
Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists an integer x such that n == 2ˣ.

**Answer:**
**Approach:**
1. **Bit Manipulation**: n & (n-1) == 0 (power of 2 has only one bit set)
2. **Division**: Keep dividing by 2 until 1 or odd number
3. **Logarithm**: Check if log₂(n) is integer

**Solution:**
### JavaScript
```javascript
function isPowerOfTwo(n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
}
// Alternative: Division approach
function isPowerOfTwoDivision(n) {
    if (n <= 0) return false;
    while (n % 2 === 0) {
        n /= 2;
    }
    return n === 1;
}
```
### Python
```python
def is_power_of_two(n):
    if n <= 0:
        return False
    return (n & (n - 1)) == 0
def is_power_of_two_division(n):
    if n <= 0:
        return False
    while n % 2 == 0:
        n //= 2
    return n == 1
```

---
### Count Set Bits (Hamming Weight)

**Problem:**
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Answer:**
**Approach:**
1. **n & (n-1)**: Removes rightmost set bit, count until n becomes 0
2. **Right Shift**: Check each bit by right shifting
3. **Built-in**: Use language's built-in popcount function

**Solution:**
### JavaScript
```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1); // Remove rightmost set bit
        count++;
    }
    return count;
}
// Alternative: Right shift approach
function hammingWeightShift(n) {
    let count = 0;
    while (n !== 0) {
        if (n & 1) count++;
        n = n >>> 1; // Unsigned right shift
    }
    return count;
}
```
### Python
```python
def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1  # Remove rightmost set bit
        count += 1
    return count
def hamming_weight_builtin(n):
    return bin(n).count('1')
```

---
### Python tuple swap

**Problem:**
Swap two numbers without using a temporary variable.

**Answer:**
**Approach:**
1. **Arithmetic**: a = a + b; b = a - b; a = a - b
2. **XOR**: a = a ^ b; b = a ^ b; a = a ^ b
3. **Multiplication/Division**: a = a * b; b = a / b; a = a / b (risky with overflow/zero)

**Solution:**
### JavaScript
```javascript
// Arithmetic method
function swapArithmetic(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b];
}
// XOR method (works with integers)
function swapXOR(a, b) {
    a = a ^ b;
    b = a ^ b; // b = (a ^ b) ^ b = a
    a = a ^ b; // a = (a ^ b) ^ a = b
    return [a, b];
}
// ES6 destructuring (uses temp internally)
function swapDestructure(a, b) {
    [a, b] = [b, a];
    return [a, b];
}
```
### Python
```python
def swap_arithmetic(a, b):
    a = a + b
    b = a - b
    a = a - b
    return a, b
def swap_xor(a, b):
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b
def swap_python(a, b):
    a, b = b, a
    return a, b
```

---
### Majority Element

**Problem:**
Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

**Answer:**
**Approach:**
1. **HashMap**: Count frequency, return element with count > n/2
2. **Boyer-Moore Voting**: Track candidate and count, increment/decrement
3. **Sorting**: Sort array, middle element is majority

**Solution:**
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

---
### Rotate Array

**Problem:**
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

**Answer:**
**Approach:**
1. **Reverse Method**: Reverse entire array, reverse first k, reverse rest
2. **Extra Array**: Copy to new array with shifted indices
3. **Cyclic Replacements**: Move elements in cycles

**Solution:**
### JavaScript
```javascript
// Reverse method (O(1) space)
function rotate(nums, k) {
    k = k % nums.length; // Handle k > array length
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}
function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}
// Extra array approach
function rotateExtraArray(nums, k) {
    const n = nums.length;
    k = k % n;
    const rotated = new Array(n);
    for (let i = 0; i < n; i++) {
        rotated[(i + k) % n] = nums[i];
    }
    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}
```
### Python
```python
def rotate(nums, k):
    k = k % len(nums)
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    reverse(0, len(nums) - 1)
    reverse(0, k - 1)
    reverse(k, len(nums) - 1)
```

---
### Contains Duplicate

**Problem:**
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Answer:**
**Approach:**
1. **HashSet**: Add to set, check if already exists
2. **Sorting**: Sort array, check adjacent elements
3. **Set Size**: Compare set size with array length

**Solution:**
### JavaScript
```javascript
function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}
// Alternative: Compare sizes
function containsDuplicateSize(nums) {
    return new Set(nums).size !== nums.length;
}
// Sorting approach
function containsDuplicateSort(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return true;
        }
    }
    return false;
}
```
### Python
```python
def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
def contains_duplicate_size(nums):
    return len(set(nums)) != len(nums)
```

---
### Maximum Product of Two Numbers

**Problem:**
Given an integer array nums, find the maximum product of two distinct numbers in the array.

**Answer:**
**Approach:**
1. **Sort**: Sort array, compare product of two largest vs two smallest
2. **Single Pass**: Track two largest and two smallest numbers
3. **Brute Force**: Check all pairs

**Solution:**
### JavaScript
```javascript
function maxProduct(nums) {
    // Find two largest and two smallest
    let max1 = -Infinity, max2 = -Infinity;
    let min1 = Infinity, min2 = Infinity;
    for (const num of nums) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }
    }
    return Math.max(max1 * max2, min1 * min2);
}
// Sorting approach
function maxProductSort(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    return Math.max(
        nums[0] * nums[1],      // Two smallest (if negative)
        nums[n-1] * nums[n-2]   // Two largest
    );
}
```
### Python
```python
def max_product(nums):
    max1 = max2 = float('-inf')
    min1 = min2 = float('inf')
    for num in nums:
        if num > max1:
            max2, max1 = max1, num
        elif num > max2:
            max2 = num
        if num < min1:
            min2, min1 = min1, num
        elif num < min2:
            min2 = num
    return max(max1 * max2, min1 * min2)
```

---
### Valid Palindrome

**Problem:**
Given a string s, return true if it is a palindrome, or false otherwise. A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

**Answer:**
**Approach:**
1. **Two Pointers**: Compare characters from both ends
2. **Reverse and Compare**: Clean string, reverse, compare
3. **Stack**: Push first half, pop and compare with second half

**Solution:**
### JavaScript
```javascript
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Skip non-alphanumeric from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}
// Alternative: Clean and reverse
function isPalindromeClean(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
```
### Python
```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
```

---
### Intersection of Two Arrays

**Problem:**
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

**Answer:**
**Approach:**
1. **HashSet**: Store one array in set, check second array
2. **Two Sets**: Convert both to sets, find intersection
3. **Sorting + Two Pointers**: Sort both, use two pointers

**Solution:**
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

---
### Implement Stack Using Queues

**Problem:**
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

**Answer:**
**Approach:**
1. **Two Queues (Push O(1), Pop O(n))**: Use q1 for storage, q2 for temporary
2. **Two Queues (Push O(n), Pop O(1))**: Keep queue in stack order, reverse on push
3. **Single Queue**: Rotate queue to maintain stack order

**Solution:**
### JavaScript
```javascript
class MyStack {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }
    // Push O(1), Pop O(n) approach
    push(x) {
        this.queue1.push(x);
    }
    pop() {
        // Move all but last from q1 to q2
        while (this.queue1.length > 1) {
            this.queue2.push(this.queue1.shift());
        }
        const top = this.queue1.shift();
        // Swap queues
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
        return top;
    }
    top() {
        const top = this.pop();
        this.push(top);
        return top;
    }
    empty() {
        return this.queue1.length === 0;
    }
}
// Single queue approach
class MyStackSingleQueue {
    constructor() {
        this.queue = [];
    }
    push(x) {
        this.queue.push(x);
        // Rotate to maintain stack order
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    pop() {
        return this.queue.shift();
    }
    top() {
        return this.queue[0];
    }
    empty() {
        return this.queue.length === 0;
    }
}
```
### Python
```python
from collections import deque
class MyStack:
    def __init__(self):
        self.queue1 = deque()
        self.queue2 = deque()
    def push(self, x):
        self.queue1.append(x)
    def pop(self):
        while len(self.queue1) > 1:
            self.queue2.append(self.queue1.popleft())
        top = self.queue1.popleft()
        self.queue1, self.queue2 = self.queue2, self.queue1
        return top
    def top(self):
        top = self.pop()
        self.push(top)
        return top
    def empty(self):
        return len(self.queue1) == 0
```

---
### Kth Largest Element

**Problem:**
Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

**Answer:**
**Approach:**
1. **Min-Heap**: Maintain heap of size k, root is kth largest
2. **Quick Select**: Partition-based selection algorithm
3. **Sorting**: Sort array, return nums[n-k]

**Solution:**
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

---
### Valid Anagram

**Problem:**
Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Answer:**
**Approach:**
1. **Sorting**: Sort both strings, compare
2. **HashMap**: Count character frequencies
3. **Array Counter**: Use array of size 26 for lowercase letters

**Solution:**
### JavaScript
```javascript
// Sorting approach
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}
// HashMap approach
function isAnagramHashMap(s, t) {
    if (s.length !== t.length) return false;
    const map = new Map();
    // Count characters in s
    for (const char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    // Decrement for characters in t
    for (const char of t) {
        if (!map.has(char) || map.get(char) === 0) {
            return false;
        }
        map.set(char, map.get(char) - 1);
    }
    return true;
}
// Array counter (for lowercase only)
function isAnagramArray(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
}
```
### Python
```python
from collections import Counter
def is_anagram(s, t):
    return sorted(s) == sorted(t)
def is_anagram_counter(s, t):
    return Counter(s) == Counter(t)
def is_anagram_array(s, t):
    if len(s) != len(t):
        return False
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    return all(c == 0 for c in count)
```

---
### First Unique Character in String

**Problem:**
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

**Answer:**
**Approach:**
1. **Two Passes**: First pass count frequencies, second pass find first with count 1
2. **HashMap + Set**: Track seen and repeated characters
3. **Array Counter**: Use array for lowercase letters

**Solution:**
### JavaScript
```javascript
function firstUniqChar(s) {
    const count = new Map();
    // Count frequencies
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    // Find first unique
    for (let i = 0; i < s.length; i++) {
        if (count.get(s[i]) === 1) {
            return i;
        }
    }
    return -1;
}
// Array approach (lowercase only)
function firstUniqCharArray(s) {
    const count = new Array(26).fill(0);
    for (const char of s) {
        count[char.charCodeAt(0) - 97]++;
    }
    for (let i = 0; i < s.length; i++) {
        if (count[s[i].charCodeAt(0) - 97] === 1) {
            return i;
        }
    }
    return -1;
}
```
### Python
```python
from collections import Counter
def first_uniq_char(s):
    count = Counter(s)
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1
def first_uniq_char_dict(s):
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1
```

---
### Reverse String

**Problem:**
Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.

**Answer:**
**Approach:**
1. **Two Pointers**: Swap characters from both ends
2. **Recursion**: Recursively swap first and last
3. **Built-in**: Use language's reverse function (if allowed)

**Solution:**
### JavaScript
```javascript
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}
// Recursive approach
function reverseStringRecursive(s, left = 0, right = s.length - 1) {
    if (left >= right) return;
    [s[left], s[right]] = [s[right], s[left]];
    reverseStringRecursive(s, left + 1, right - 1);
}
```
### Python
```python
def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
def reverse_string_recursive(s, left=0, right=None):
    if right is None:
        right = len(s) - 1
    if left >= right:
        return
    s[left], s[right] = s[right], s[left]
    reverse_string_recursive(s, left + 1, right - 1)
```

---
### Valid Parentheses

**Problem:**
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Answer:**
**Approach:**
1. **Stack**: Push opening brackets, pop when matching closing bracket
2. **Counter**: Count each type (only works for single type)
3. **Replace**: Repeatedly remove valid pairs (less efficient)

**Solution:**
### JavaScript
```javascript
function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    for (const char of s) {
        if (char in map) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    return stack.length === 0;
}
```
### Python
```python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0
```

---
### Merge Sorted Arrays

**Problem:**
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums2 into nums1 as one sorted array. nums1 has a size of m + n.

**Answer:**
**Approach:**
1. **Two Pointers (Backward)**: Start from end, place larger element
2. **Two Pointers (Forward)**: Use extra space, merge normally
3. **Sort**: Combine and sort (not optimal)

**Solution:**
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

---
### Best Time to Buy and Sell Stock

**Problem:**
You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Answer:**
**Approach:**
1. **One Pass**: Track minimum price seen, calculate max profit
2. **Kadane's Algorithm**: Track maximum profit ending at each day
3. **Brute Force**: Check all pairs (O(n²))

**Solution:**
### JavaScript
```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
// Kadane's algorithm approach
function maxProfitKadane(prices) {
    let maxCur = 0;
    let maxSoFar = 0;
    for (let i = 1; i < prices.length; i++) {
        maxCur = Math.max(0, maxCur + prices[i] - prices[i-1]);
        maxSoFar = Math.max(maxSoFar, maxCur);
    }
    return maxSoFar;
}
```
### Python
```python
def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit
```

---
### Climbing Stairs

**Problem:**
You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Answer:**
**Approach:**
1. **Dynamic Programming**: dp[i] = dp[i-1] + dp[i-2] (Fibonacci)
2. **Memoization**: Recursive with memo
3. **Space Optimized**: Use two variables instead of array

**Solution:**
### JavaScript
```javascript
// DP approach
function climbStairs(n) {
    if (n <= 2) return n;
    const dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
// Space optimized
function climbStairsOptimized(n) {
    if (n <= 2) return n;
    let first = 1;
    let second = 2;
    for (let i = 3; i <= n; i++) {
        const third = first + second;
        first = second;
        second = third;
    }
    return second;
}
// Memoization
function climbStairsMemo(n, memo = {}) {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    memo[n] = climbStairsMemo(n-1, memo) + climbStairsMemo(n-2, memo);
    return memo[n];
}
```
### Python
```python
def climb_stairs(n):
    if n <= 2:
        return n
    first, second = 1, 2
    for i in range(3, n + 1):
        third = first + second
        first, second = second, third
    return second
def climb_stairs_dp(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

---
### Maximum Subarray (Kadane's Algorithm)

**Problem:**
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Answer:**
**Approach:**
1. **Kadane's Algorithm**: Track maximum sum ending at current position
2. **Divide and Conquer**: Split array, find max in left, right, and crossing
3. **Dynamic Programming**: dp[i] = max(nums[i], dp[i-1] + nums[i])

**Solution:**
### JavaScript
```javascript
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
// Return subarray indices
function maxSubArrayWithIndices(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0, end = 0, tempStart = 0;
    for (let i = 1; i < nums.length; i++) {
        if (maxEndingHere < 0) {
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            maxEndingHere += nums[i];
        }
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    return { sum: maxSoFar, start, end };
}
```
### Python
```python
def max_sub_array(nums):
    max_so_far = max_ending_here = nums[0]
    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far
```

---
### House Robber

**Problem:**
You are a robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Answer:**
**Approach:**
1. **Dynamic Programming**: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
2. **Space Optimized**: Use two variables instead of array
3. **Memoization**: Recursive with memo

**Solution:**
### JavaScript
```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    return dp[nums.length - 1];
}
// Space optimized
function robOptimized(nums) {
    let prev2 = 0;  // dp[i-2]
    let prev1 = 0;  // dp[i-1]
    for (const num of nums) {
        const temp = prev1;
        prev1 = Math.max(prev1, prev2 + num);
        prev2 = temp;
    }
    return prev1;
}
```
### Python
```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
    return prev1
```

---
### Fibonacci Number

**Problem:**
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Calculate the nth Fibonacci number.

**Answer:**
**Approach:**
1. **Iterative**: Build from bottom up
2. **Memoization**: Recursive with cache
3. **Matrix Exponentiation**: O(log n) solution
4. **Binet's Formula**: Mathematical formula (approximation)

**Solution:**
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

---
### Power of Three

**Problem:**
Given an integer n, return true if it is a power of three. Otherwise, return false. An integer n is a power of three if there exists an integer x such that n == 3ˣ.

**Answer:**
**Approach:**
1. **Division**: Keep dividing by 3 until 1 or not divisible
2. **Logarithm**: Check if log₃(n) is integer
3. **Modulo**: For 32-bit integers, check if 3¹⁹ % n == 0
4. **Recursion**: Recursively divide by 3

**Solution:**
### JavaScript
```javascript
function isPowerOfThree(n) {
    if (n <= 0) return false;
    while (n % 3 === 0) {
        n /= 3;
    }
    return n === 1;
}
// Logarithm approach
function isPowerOfThreeLog(n) {
    if (n <= 0) return false;
    const log = Math.log(n) / Math.log(3);
    return Math.abs(log - Math.round(log)) < 1e-10;
}
// Modulo approach (for 32-bit integers)
function isPowerOfThreeMod(n) {
    return n > 0 && Math.pow(3, 19) % n === 0;
}
```
### Python
```python
def is_power_of_three(n):
    if n <= 0:
        return False
    while n % 3 == 0:
        n //= 3
    return n == 1
def is_power_of_three_log(n):
    if n <= 0:
        return False
    import math
    log = math.log(n, 3)
    return abs(log - round(log)) < 1e-10
```

---
### Count Primes

**Problem:**
Given an integer n, return the number of prime numbers that are strictly less than n.

**Answer:**
**Approach:**
1. **Sieve of Eratosthenes**: Mark multiples of primes as composite
2. **Trial Division**: Check each number individually (slow)
3. **Optimized Sieve**: Skip even numbers, start from i²

**Solution:**
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

---
### Fizz Buzz

**Problem:**
Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5
- answer[i] == "Fizz" if i is divisible by 3
- answer[i] == "Buzz" if i is divisible by 5
- answer[i] == i (as a string) if none of the above conditions are true

**Answer:**
**Approach:**
1. **Modulo Checks**: Check divisibility by 3, 5, and both
2. **String Concatenation**: Build string by concatenating Fizz/Buzz
3. **HashMap**: Store divisors and words for extensibility

**Solution:**
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

---
### Reverse Bits

**Problem:**
Reverse bits of a given 32 bits unsigned integer.

**Answer:**
**Approach:**
1. **Bit Manipulation**: Extract bits one by one, build reversed
2. **Divide and Conquer**: Swap halves recursively
3. **Lookup Table**: Precompute reversed bytes

**Solution:**
### JavaScript
```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        // Extract bit from right
        const bit = (n >> i) & 1;
        // Place bit at reversed position
        result |= (bit << (31 - i));
    }
    return result >>> 0; // Convert to unsigned 32-bit
}
// Alternative: Build from left
function reverseBitsAlt(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result |= n & 1;
        n >>= 1;
    }
    return result >>> 0;
}
```
### Python
```python
def reverse_bits(n):
    result = 0
    for i in range(32):
        bit = (n >> i) & 1
        result |= (bit << (31 - i))
    return result
def reverse_bits_alt(n):
    result = 0
    for i in range(32):
        result <<= 1
        result |= n & 1
        n >>= 1
    return result
```

---
### Number of 1 Bits

**Problem:**
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Answer:**
**Approach:**
1. **n & (n-1)**: Removes rightmost set bit
2. **Right Shift**: Check each bit
3. **Built-in**: Use language's popcount

**Solution:**
### JavaScript
```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1); // Remove rightmost set bit
        count++;
    }
    return count;
}
// Right shift approach
function hammingWeightShift(n) {
    let count = 0;
    while (n !== 0) {
        if (n & 1) count++;
        n = n >>> 1; // Unsigned right shift
    }
    return count;
}
```
### Python
```python
def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
def hamming_weight_builtin(n):
    return bin(n).count('1')
```

---
### Missing Number in Range

**Problem:**
Given an array containing n distinct numbers in the range [0, n], find the one number that is missing from the array.

**Answer:**
**Approach:**
1. **Sum Formula**: Expected sum - actual sum
2. **XOR**: XOR all numbers 0 to n with array elements
3. **Sorting**: Sort and find gap
4. **HashSet**: Store in set, find missing

**Solution:**
### JavaScript
```javascript
// Sum approach
function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
// XOR approach
function missingNumberXOR(nums) {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
}
```
### Python
```python
def missing_number(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
def missing_number_xor(nums):
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing
```

---
### Single Number

**Problem:**
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

**Answer:**
**Approach:**
1. **XOR**: XOR all numbers, duplicates cancel out
2. **HashMap**: Count frequencies
3. **Math**: 2 * (sum of unique) - sum of all

**Solution:**
### JavaScript
```javascript
// XOR approach (O(1) space)
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}
// HashMap approach
function singleNumberHashMap(nums) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    for (const [num, count] of map) {
        if (count === 1) return num;
    }
}
```
### Python
```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

---
### Happy Number

**Problem:**
Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

**Answer:**
**Approach:**
1. **HashSet**: Track seen numbers to detect cycles
2. **Floyd's Cycle Detection**: Use slow and fast pointers
3. **Mathematical**: All unhappy numbers eventually reach 4

**Solution:**
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

---
### Counting Bits

**Problem:**
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

**Answer:**
**Approach:**
1. **DP with Last Set Bit**: ans[i] = ans[i & (i-1)] + 1
2. **DP with Right Shift**: ans[i] = ans[i >> 1] + (i & 1)
3. **Brute Force**: Count bits for each number individually

**Solution:**
### JavaScript
```javascript
// DP approach
function countBits(n) {
    const ans = [0];
    for (let i = 1; i <= n; i++) {
        // Remove rightmost set bit, add 1
        ans[i] = ans[i & (i - 1)] + 1;
    }
    return ans;
}
// Alternative: Right shift
function countBitsShift(n) {
    const ans = [0];
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}
```
### Python
```python
def count_bits(n):
    ans = [0]
    for i in range(1, n + 1):
        ans.append(ans[i & (i - 1)] + 1)
    return ans
def count_bits_shift(n):
    ans = [0]
    for i in range(1, n + 1):
        ans.append(ans[i >> 1] + (i & 1))
    return ans
```

---
### Two Eggs Problem

**Problem:**
You have two identical eggs and access to a 100-story building. You need to determine the highest floor from which an egg can be dropped without breaking. What is the minimum number of drops needed to guarantee you find the answer?

**Answer:**
**Approach:**
Use a strategy that minimizes worst-case drops. Start from floor X, then if it breaks, test floors 1 to X-1 linearly. If it doesn't break, go up by X-1 floors, then X-2, etc.

**Solution:**
**Strategy:**
1. Start at floor 14 (if breaks, test 1-13 linearly = 14 drops max)
2. If doesn't break, go to floor 27 (14+13)
3. If breaks, test 15-26 linearly
4. Continue pattern: 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99
**Formula:** n + (n-1) + (n-2) + ... + 1 ≥ 100
n(n+1)/2 ≥ 100 → n ≈ 14
**Answer:** 14 drops minimum

---
### Light Bulb Switches

**Problem:**
You have 100 light bulbs in a room, all initially off. You make 100 passes:
- Pass 1: Toggle every bulb (all on)
- Pass 2: Toggle every 2nd bulb (2, 4, 6, ...)
- Pass 3: Toggle every 3rd bulb (3, 6, 9, ...)
- ...
- Pass 100: Toggle bulb 100
After 100 passes, which bulbs are on?

**Answer:**
**Approach:**
A bulb is toggled once for each of its divisors. A bulb is on if it has an odd number of divisors. Only perfect squares have an odd number of divisors.

**Solution:**
**Key Insight:** Perfect squares have odd number of divisors.
**Example:** Bulb 12 has divisors: 1, 2, 3, 4, 6, 12 (6 divisors, even) → OFF
Bulb 16 has divisors: 1, 2, 4, 8, 16 (5 divisors, odd) → ON
**Answer:** Bulbs 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are ON (all perfect squares ≤ 100)

---
### Why Are Manhole Covers Round?

**Problem:**
Why are manhole covers typically round instead of square or other shapes?

**Answer:**
**Approach:**
Think about geometric properties: can the cover fall through the hole?

**Solution:**
**Key Reasons:**
1. **Cannot fall through:** A round cover cannot fall through its hole regardless of orientation. A square cover can be rotated diagonally and fall through.
2. **Easier to move:** Round covers can be rolled to move them.
3. **Equal strength:** Circular shape distributes stress evenly in all directions.
4. **No orientation needed:** Can be placed in any rotation.
**Answer:** Round covers cannot fall through their holes, unlike square/rectangular covers which can be rotated diagonally to fit through.

---
### Trailing Zeros in Factorial

**Problem:**
How many trailing zeros are in 100! (100 factorial)?

**Answer:**
**Approach:**
Trailing zeros come from factors of 10 = 2 × 5. Since there are more 2s than 5s, count the number of 5s in the prime factorization.

**Solution:**
**Key Insight:** Count multiples of 5, 25, 125, etc.
**Calculation:**
- Multiples of 5: 100/5 = 20
- Multiples of 25: 100/25 = 4 (each contributes extra 5)
- Multiples of 125: 100/125 = 0
**Answer:** 20 + 4 = 24 trailing zeros
**General Formula:** floor(n/5) + floor(n/25) + floor(n/125) + ...

---
### Consistent Hashing Problem

**Problem:**
You have a distributed cache with 3 servers. When you add or remove a server, how do you minimize the number of keys that need to be moved? Explain consistent hashing.

**Answer:**
**Approach:**
Traditional hashing causes all keys to remap when servers change. Consistent hashing minimizes remapping.

**Solution:**
**Problem with Traditional Hashing:**
- hash(key) % num_servers
- Adding/removing server remaps ALL keys (100% remapping)
**Consistent Hashing:**
1. Map servers and keys to a circle (hash ring)
2. Each key maps to next server clockwise
3. Adding server: only keys between previous and new server remap
4. Removing server: only keys on that server remap
**Example:**
```
Hash Ring: 0 ---> 100 ---> 200 ---> 300 ---> 0
Servers:   S1(100), S2(200), S3(300)
Keys:      K1(50) -> S1, K2(150) -> S2, K3(250) -> S3
Add S4(150): Only K2 remaps to S4 (33% remapping)
Remove S2: Only K2 remaps to S3 (33% remapping)
```
**Virtual Nodes:**
- Each physical server has multiple virtual nodes on ring
- Improves load distribution
- Reduces impact of server addition/removal
**Answer:** Consistent hashing minimizes key remapping to ~1/n (where n = number of servers) instead of 100%.

---
### Memory Leak Detection

**Problem:**
Your Node.js application's memory usage keeps growing over time. How do you identify and fix memory leaks?

**Answer:**
**Approach:**
Systematically check: closures, event listeners, timers, circular references, and use profiling tools.

**Solution:**
**Common Causes:**
1. **Closures Holding References**
   ```javascript
   // Leak: closure holds large object
   function createHandler() {
       const largeData = new Array(1000000).fill(0);
       return function() {
           console.log('Handler'); // largeData never released
       };
   }
   ```
2. **Event Listeners Not Removed**
   ```javascript
   // Leak: listener never removed
   eventEmitter.on('event', handler);
   // Should: eventEmitter.off('event', handler);
   ```
3. **Timers Not Cleared**
   ```javascript
   // Leak: interval never cleared
   setInterval(() => {}, 1000);
   ```
4. **Circular References**
   - Objects referencing each other
   - May prevent garbage collection
**Detection Methods:**
1. **Heap Snapshots**
   - Take snapshots at different times
   - Compare to find growing objects
   - Use Chrome DevTools or `heapdump` module
2. **Memory Profiling**
   ```javascript
   // Node.js
   node --inspect app.js
   // Chrome DevTools -> Memory -> Take Heap Snapshot
   ```
3. **Monitor Memory Usage**
   ```javascript
   setInterval(() => {
       const usage = process.memoryUsage();
       console.log(usage.heapUsed / 1024 / 1024, 'MB');
   }, 5000);
   ```
4. **Use Tools**
   - `clinic.js` for Node.js profiling
   - `memwatch-next` for leak detection
   - APM tools (New Relic, DataDog)
**Fixes:**
- Remove event listeners
- Clear timers/intervals
- Avoid closures holding large objects
- Use WeakMap/WeakSet for caches
- Limit cache sizes

---
### River Crossing Problem

**Problem:**
A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat can only carry the farmer and one other item. If left alone together, the wolf will eat the goat, and the goat will eat the cabbage. How does the farmer get everyone across safely?

**Answer:**
**Approach:**
Work backwards and track what can't be left alone. The goat is the key - it can't be left with either the wolf or the cabbage.

**Solution:**
**Step-by-step:**
1. **Farmer takes goat across** (wolf and cabbage safe together)
   - Left: Wolf, Cabbage | Right: Goat
2. **Farmer returns alone**
   - Left: Wolf, Cabbage | Right: Goat
3. **Farmer takes wolf across**
   - Left: Cabbage | Right: Goat, Wolf
   - **Problem:** Can't leave goat and wolf alone!
4. **Farmer brings goat back**
   - Left: Goat, Cabbage | Right: Wolf
5. **Farmer takes cabbage across**
   - Left: Goat | Right: Wolf, Cabbage
6. **Farmer returns alone**
   - Left: Goat | Right: Wolf, Cabbage
7. **Farmer takes goat across**
   - Left: (empty) | Right: Wolf, Goat, Cabbage ✅
**Answer:** 7 trips total. The key is bringing the goat back after taking the wolf.

---
### 12 Balls Weighing Problem

**Problem:**
You have 12 identical-looking balls. One ball is either heavier or lighter than the others (you don't know which). You have a balance scale. What is the minimum number of weighings needed to identify the different ball and determine if it's heavier or lighter?

**Answer:**
**Approach:**
Divide into groups and use the balance strategically. Each weighing gives you information to narrow down possibilities.

**Solution:**
**First Weighing:**
- Weigh 4 balls vs 4 balls
- **Case 1:** They balance → Different ball is in the remaining 4
- **Case 2:** They don't balance → Different ball is in the heavier or lighter group
**If they balance (Case 1):**
- Second weighing: Take 3 of the remaining 4, weigh 1 vs 1
  - If balance: The 4th ball is different (weigh it against any ball to see if heavier/lighter)
  - If don't balance: The heavier/lighter one is the different ball
**If they don't balance (Case 2):**
- Second weighing: Take 3 from heavier side + 1 from lighter side vs 3 normal balls + 1 from heavier side
  - If left heavier: One of the 3 from heavier side is heavy
  - If right heavier: The 1 from lighter side is light, or the 1 from heavier side is heavy
  - If balance: One of the 2 from lighter side is light
- Third weighing: Narrow down to identify the ball
**Answer:** 3 weighings minimum

---
### Prisoners and Light Bulb

**Problem:**
100 prisoners are in separate cells. They can't communicate except through a light bulb in a common room. Each day, one prisoner (chosen randomly) can visit the room and turn the light on or off. Once a prisoner declares that all 100 have visited the room, if correct, all go free. If wrong, all are executed. How do they guarantee success?

**Answer:**
**Approach:**
Designate one prisoner as the "counter". Others turn the light on only once (their first visit). Counter counts how many times they've seen the light on.

**Solution:**
**Strategy:**
1. **Designate one prisoner as "Counter"** (e.g., Prisoner #1)
2. **Counter's job:**
   - Turn light OFF every time they visit
   - Count how many times they turn it off (after it was on)
   - When count reaches 99, declare all have visited
3. **Other prisoners' job:**
   - If light is OFF and you haven't turned it on before, turn it ON
   - Otherwise, don't touch the light
**How it works:**
- Each non-counter prisoner turns light on exactly once (their first visit when it's off)
- Counter sees light on, turns it off, increments count
- When counter has seen 99 "on" signals, all others have visited at least once
- Counter has also visited (to count), so all 100 have visited
**Answer:** Counter counts 99 "on" signals. Each prisoner turns light on once. When count = 99, all have visited.

---
### Bridge Crossing Problem

**Problem:**
Four people need to cross a bridge at night. They have one flashlight. The bridge can only hold 2 people at a time. The people cross at different speeds: 1 min, 2 min, 5 min, and 10 min. When two people cross together, they move at the slower person's pace. What's the minimum time to get everyone across?

**Answer:**
**Approach:**
Minimize time by having the fastest people make return trips. The key is minimizing the time spent on return trips.

**Solution:**
**Strategy:**
1. **Fastest two cross together** (1 min and 2 min) → 2 minutes
   - Left: 5 min, 10 min | Right: 1 min, 2 min
2. **Fastest returns** (1 min) → 1 minute
   - Left: 1 min, 5 min, 10 min | Right: 2 min
3. **Slowest two cross** (5 min and 10 min) → 10 minutes
   - Left: 1 min | Right: 2 min, 5 min, 10 min
4. **Second fastest returns** (2 min) → 2 minutes
   - Left: 1 min, 2 min | Right: 5 min, 10 min
5. **Fastest two cross again** (1 min and 2 min) → 2 minutes
   - Left: (empty) | Right: 1 min, 2 min, 5 min, 10 min ✅
**Total: 2 + 1 + 10 + 2 + 2 = 17 minutes**
**Answer:** 17 minutes minimum

---
### Monty Hall Problem

**Problem:**
You're on a game show with 3 doors. Behind one door is a car, behind the other two are goats. You pick a door (say Door 1). The host, who knows what's behind each door, opens another door (say Door 3) revealing a goat. He then asks: "Do you want to switch to Door 2?" Should you switch? What's the probability of winning if you switch vs stay?

**Answer:**
**Approach:**
Calculate probabilities: initial probability vs conditional probability after host reveals a goat.

**Solution:**
**Initial Probabilities:**
- Car behind Door 1: 1/3
- Car behind Door 2: 1/3
- Car behind Door 3: 1/3
**After you pick Door 1:**
**If car is behind Door 1 (1/3 probability):**
- Host opens Door 2 or 3 (goat)
- If you switch: You lose
- If you stay: You win
**If car is behind Door 2 (1/3 probability):**
- Host must open Door 3 (goat)
- If you switch: You win
- If you stay: You lose
**If car is behind Door 3 (1/3 probability):**
- Host must open Door 2 (goat)
- If you switch: You win
- If you stay: You lose
**Probabilities:**
- **Stay:** Win 1/3 of the time
- **Switch:** Win 2/3 of the time
**Answer:** Yes, switch! You have 2/3 probability of winning if you switch, only 1/3 if you stay.

---
### 100 Prisoners and 100 Boxes

**Problem:**
100 prisoners are given a chance to be freed. There are 100 boxes, each containing a unique number from 1 to 100 (randomly placed). Each prisoner can open 50 boxes. If all prisoners find their own number, all go free. If any prisoner fails, all are executed. What strategy gives the best chance of success?

**Answer:**
**Approach:**
Use a cycle-following strategy. Each prisoner starts with their own number's box and follows the chain.

**Solution:**
**Strategy: Follow the Cycle**
Each prisoner:
1. Opens the box with their own number (e.g., Prisoner 5 opens Box 5)
2. Finds the number inside (e.g., finds 23)
3. Opens Box 23
4. Finds the number inside (e.g., finds 7)
5. Opens Box 7
6. Continues following the chain
7. If they find their own number within 50 boxes, they succeed
**Why it works:**
- Numbers form cycles (e.g., 5 → 23 → 7 → 5)
- If cycle length ≤ 50, prisoner finds their number
- Probability that all cycles are ≤ 50 is about 31%
**Random Strategy:**
- Each prisoner randomly opens 50 boxes
- Probability of success: (1/2)^100 ≈ 0
**Cycle Strategy:**
- Probability of success: ~31%
- Much better than random!
**Answer:** Follow the cycle starting from your number. Success probability ~31% vs ~0% for random.

---
### Water Jug Problem

**Problem:**
You have a 3-liter jug and a 5-liter jug. Neither has markings. You have unlimited water supply. How do you measure exactly 4 liters?

**Answer:**
**Approach:**
Use the difference between jugs. Fill the larger, pour into smaller, empty smaller, repeat.

**Solution:**
**Steps:**
1. **Fill 5-liter jug** → (0, 5)
   - 3L jug: 0 | 5L jug: 5
2. **Pour from 5L to 3L** → (3, 2)
   - 3L jug: 3 | 5L jug: 2
3. **Empty 3L jug** → (0, 2)
   - 3L jug: 0 | 5L jug: 2
4. **Pour from 5L to 3L** → (2, 0)
   - 3L jug: 2 | 5L jug: 0
5. **Fill 5L jug** → (2, 5)
   - 3L jug: 2 | 5L jug: 5
6. **Pour from 5L to 3L** → (3, 4)
   - 3L jug: 3 (full) | 5L jug: 4 ✅
**Answer:** After step 6, the 5-liter jug contains exactly 4 liters.

---
### Coin Weighing Problem

**Problem:**
You have 9 coins. One is counterfeit and weighs less than the others. You have a balance scale. What's the minimum number of weighings to find the counterfeit coin?

**Answer:**
**Approach:**
Divide and conquer. Split into groups of 3 and compare.

**Solution:**
**First Weighing:**
- Weigh 3 coins vs 3 coins
- **If they balance:** Counterfeit is in the remaining 3
- **If they don't balance:** Counterfeit is in the lighter group
**Second Weighing:**
- Take the 3 coins that contain the counterfeit
- Weigh 1 vs 1
- **If they balance:** The remaining coin is counterfeit
- **If they don't balance:** The lighter one is counterfeit
**Answer:** 2 weighings minimum

---
### Hat Colors Problem

**Problem:**
Three people are standing in a line. Each can see the hats of people in front, but not their own or behind. There are 2 black hats and 2 white hats total. They're told at least one person is wearing a black hat. Starting from the back, each person must guess their hat color. How do they guarantee at least one correct guess?

**Answer:**
**Approach:**
Use logic and what others can see. The person in back uses the silence of others as information.

**Solution:**
**Strategy:**
**Person 3 (back, sees Person 1 and 2):**
- If sees 2 white hats: Knows they have black hat (since at least one black exists)
- If sees 2 black hats: Knows they have white hat
- If sees 1 black, 1 white: Can't be sure, stays silent
**Person 2 (middle, sees Person 1):**
- If Person 3 was silent: Person 3 saw mixed colors (1 black, 1 white)
- If Person 2 sees white on Person 1: Person 2 must have black
- If Person 2 sees black on Person 1: Person 2 must have white
**Person 1 (front):**
- Uses information from Person 2's guess or silence
**Example:**
- Hats: Person 1 = Black, Person 2 = White, Person 3 = Black
- Person 3 sees: White (P1) and Black (P2) → Stays silent (mixed)
- Person 2 sees: Black (P1), knows P3 saw mixed → Person 2 must have White ✅
**Answer:** Person 2 can always deduce correctly based on Person 3's silence and what they see.

---
### Birthday Paradox

**Problem:**
How many people do you need in a room for there to be a 50% chance that at least two people share the same birthday? (Assume 365 days, ignore leap years)

**Answer:**
**Approach:**
Calculate probability of NO matches, then subtract from 1. Use complementary probability.

**Solution:**
**Probability that all have different birthdays:**
For n people:
- Person 1: Can have any birthday (365/365)
- Person 2: Must be different (364/365)
- Person 3: Must be different from both (363/365)
- ...
- Person n: Must be different from all previous (365-n+1)/365
**Probability of no match:**
P(no match) = (365/365) × (364/365) × (363/365) × ... × ((365-n+1)/365)
**Probability of at least one match:**
P(match) = 1 - P(no match)
**Calculation:**
- n = 23: P(match) ≈ 50.7%
- n = 50: P(match) ≈ 97%
- n = 70: P(match) ≈ 99.9%
**Answer:** Only 23 people needed for 50% chance! This seems counterintuitive but is mathematically correct.

---
### Two Trains Problem

**Problem:**
Two trains are 100 miles apart, moving toward each other. Train A travels at 60 mph, Train B at 40 mph. A bird starts at Train A and flies back and forth between the trains at 80 mph. How far does the bird travel before the trains collide?

**Answer:**
**Approach:**
Calculate when trains meet, then calculate bird's distance. Or use the fact that bird flies for the entire time until collision.

**Solution:**
**Method 1: Calculate Time to Collision**
Trains approach each other at: 60 + 40 = 100 mph
Time to collision: 100 miles / 100 mph = 1 hour
Bird flies at 80 mph for 1 hour:
Distance = 80 mph × 1 hour = 80 miles
**Method 2: Sum Infinite Series**
- First trip: Bird flies from A to B
- Second trip: Bird flies from B to A
- Continue until trains meet
- Sum converges to same answer
**Answer:** 80 miles
**Key Insight:** Don't calculate each trip - just find total time and multiply by bird's speed!

---
### Chocolate Bar Problem

**Problem:**
You have a chocolate bar that's a grid of m×n squares. You can break it along the lines. What's the minimum number of breaks needed to separate it into individual 1×1 pieces?

**Answer:**
**Approach:**
Each break increases the number of pieces by 1. Start with 1 piece, need m×n pieces.

**Solution:**
**Key Insight:**
- Start with: 1 piece (whole bar)
- End with: m × n pieces (individual squares)
- Each break creates 1 additional piece
- Need: (m × n) - 1 breaks
**Example:**
- 2×2 bar (4 squares)
- Break 1: 2 pieces
- Break 2: 3 pieces  
- Break 3: 4 pieces ✅
- Total: 3 breaks = 4 - 1
**Answer:** (m × n) - 1 breaks minimum

---
### Ants on a Stick

**Problem:**
Three ants are placed on a 1-meter stick at positions 0.25m, 0.5m, and 0.75m. They start walking: left ant goes right, middle goes left, right goes right. All walk at 1 m/s. When two ants meet, they reverse direction. How long until all ants fall off the stick?

**Answer:**
**Approach:**
Key insight: When ants meet and reverse, it's equivalent to them passing through each other. Calculate time for each ant to reach an end.

**Solution:**
**Key Insight: Ants Passing Through**
When two ants meet and reverse direction, it's mathematically equivalent to them passing through each other (because they're identical). So we can ignore collisions!
**Calculate:**
- Left ant (at 0.25m, going right): Falls off at 1m → Time = (1 - 0.25) / 1 = 0.75s
- Middle ant (at 0.5m, going left): Falls off at 0m → Time = (0.5 - 0) / 1 = 0.5s
- Right ant (at 0.75m, going right): Falls off at 1m → Time = (1 - 0.75) / 1 = 0.25s
**Answer:** 0.75 seconds (longest time for any ant to fall off)
**Why this works:** The collisions don't change the outcome - each ant still reaches the end in the same time as if they passed through.

---
### Pirate Gold Problem

**Problem:**
5 pirates find 100 gold coins. They must decide how to split them. The rules:
1. Oldest pirate proposes a split
2. All vote (including proposer)
3. If ≥50% vote yes, split happens
4. If <50% vote yes, proposer is thrown overboard, next oldest proposes
5. Pirates are perfectly logical and want to maximize their gold
How should the oldest pirate split the coins?

**Answer:**
**Approach:**
Work backwards from the end case. If only 2 pirates remain, what happens? Then 3, then 4, then 5.

**Solution:**
**Work Backwards:**
**If only 2 pirates remain (P4, P5):**
- P4 proposes: (100, 0) - P4 votes yes, P5 votes no → 50% yes → Passes
- P4 gets 100, P5 gets 0
**If 3 pirates remain (P3, P4, P5):**
- P3 needs 1 vote besides himself
- P5 will vote yes for any amount > 0 (otherwise gets 0)
- P3 proposes: (99, 0, 1) - P3 and P5 vote yes → Passes
**If 4 pirates remain (P2, P3, P4, P5):**
- P2 needs 2 votes besides himself
- P4 will vote yes for any amount > 0 (otherwise gets 0)
- P5 will vote yes for any amount > 0 (otherwise gets 0)
- P2 proposes: (98, 0, 1, 1) - P2, P4, P5 vote yes → Passes
**If 5 pirates remain (P1, P2, P3, P4, P5):**
- P1 needs 2 votes besides himself
- P3 will vote yes for any amount > 0 (otherwise gets 0)
- P4 or P5 will vote yes for any amount > 0 (otherwise gets 0)
- P1 proposes: (98, 0, 1, 0, 1) or (98, 0, 1, 1, 0)
**Answer:** Oldest pirate proposes (98, 0, 1, 0, 1) - giving 1 coin each to 3rd and 5th pirates, keeping 98.

---
### Truth-Tellers and Liars

**Problem:**
You meet two people at a fork in the road. One always tells the truth, one always lies. One path leads to safety, one to danger. You can ask ONE question to ONE person to determine the safe path. What question do you ask?

**Answer:**
**Approach:**
Ask a question that works regardless of whether you ask the truth-teller or liar. Use a question that references what the other person would say.

**Solution:**
**The Question:**
"Which path would the OTHER person say leads to safety?"
**How it works:**
**If you ask the truth-teller:**
- Truth-teller knows liar would point to wrong path
- Truth-teller tells you the wrong path (what liar would say)
- You take the opposite path → Safety ✅
**If you ask the liar:**
- Liar knows truth-teller would point to correct path
- Liar lies and points to wrong path
- You take the opposite path → Safety ✅
**Answer:** Ask either person: "Which path would the other person say leads to safety?" Then take the opposite path.

---
### Cannibals and Missionaries

**Problem:**
Three missionaries and three cannibals need to cross a river using a boat that holds 2 people. If cannibals ever outnumber missionaries on either side, the missionaries get eaten. How do they all cross safely?

**Answer:**
**Approach:**
Track the count on each side. The key is bringing a cannibal back after taking missionaries across.

**Solution:**
**Step-by-step:**
1. **Take 2 cannibals across** (Left: 3M, 1C | Right: 2C)
   - Safe: 3M > 1C on left, 0M < 2C on right
2. **Bring 1 cannibal back** (Left: 3M, 2C | Right: 1C)
   - Safe: 3M > 2C on left
3. **Take 2 cannibals across** (Left: 3M | Right: 3C)
   - Safe: 3M > 0C on left, 0M < 3C on right
4. **Bring 1 cannibal back** (Left: 3M, 1C | Right: 2C)
   - Safe: 3M > 1C on left
5. **Take 2 missionaries across** (Left: 1M, 1C | Right: 2M, 2C)
   - Safe: 1M = 1C on left, 2M = 2C on right
6. **Bring 1 missionary and 1 cannibal back** (Left: 2M, 2C | Right: 1M, 1C)
   - Safe: 2M = 2C on left, 1M = 1C on right
7. **Take 2 missionaries across** (Left: 0M, 2C | Right: 3M, 1C)
   - Safe: 0M < 2C on left (no missionaries to eat), 3M > 1C on right
8. **Bring 1 cannibal back** (Left: 0M, 3C | Right: 3M, 0C)
   - Safe: No missionaries on left
9. **Take 2 cannibals across** (Left: 0M, 1C | Right: 3M, 2C)
   - Safe: 3M > 2C on right
10. **Bring 1 cannibal back** (Left: 0M, 2C | Right: 3M, 1C)
    - Safe: 3M > 1C on right
11. **Take 2 cannibals across** ✅
    - All safely across!
**Answer:** 11 trips total. Key is maintaining safe ratios and bringing cannibals back strategically.

---
### Socks in Drawer

**Problem:**
A drawer contains 10 red socks and 10 blue socks. They're all mixed together. You're in a dark room and can't see the colors. How many socks must you take out to guarantee you have a matching pair?

**Answer:**
**Approach:**
Use the pigeonhole principle. Worst case: take one of each color, then the next one must match.

**Solution:**
**Worst Case Scenario:**
- Take 1 red sock
- Take 1 blue sock
- Still no pair
**Next sock:**
- Must be either red or blue
- Either way, you now have a pair ✅
**Answer:** 3 socks minimum
**General Formula:** For n colors, you need n + 1 socks to guarantee a pair.

---
### Clock Angles

**Problem:**
At what time (to the nearest second) are the hour and minute hands of a clock exactly 90 degrees apart?

**Answer:**
**Approach:**
Calculate the angle of each hand, set their difference to 90° (or 270°), solve for time.

**Solution:**
**Angles:**
- Minute hand: 6° per minute (360° / 60 minutes)
- Hour hand: 0.5° per minute (30° per hour = 0.5° per minute)
**At time t minutes past 12:**
- Minute hand angle: 6t degrees
- Hour hand angle: 0.5t degrees
**Difference:**
- |6t - 0.5t| = 90° or 270°
- |5.5t| = 90° or 270°
- 5.5t = 90 → t = 90/5.5 ≈ 16.36 minutes = 16 min 22 sec
- 5.5t = 270 → t = 270/5.5 ≈ 49.09 minutes = 49 min 5 sec
**Answer:** Approximately 12:16:22 and 12:49:05 (and similar times every hour)
**Note:** They're 90° apart twice per hour.

---
### Chess Board Problem

**Problem:**
A chess board has 2 opposite corners removed (so 62 squares remain). You have 31 dominoes, each covering exactly 2 squares. Can you cover the entire board with these dominoes?

**Answer:**
**Approach:**
Color the board like a chessboard. Each domino covers one black and one white square. Check if removed corners are the same color.

**Solution:**
**Key Insight: Chessboard Coloring**
A standard chessboard has:
- 32 black squares
- 32 white squares
- Adjacent squares are different colors
**Removed Corners:**
- Opposite corners on a chessboard are the SAME color
- If we remove 2 black corners: 30 black, 32 white remain
- If we remove 2 white corners: 32 black, 30 white remain
**Domino Coverage:**
- Each domino covers 1 black + 1 white square
- To cover 62 squares, need 31 dominoes
- But if corners removed are same color, we have unequal black/white squares
- 31 dominoes need 31 black + 31 white squares
- But we have 30 of one color, 32 of the other
**Answer:** No, it's impossible! The removed corners are the same color, leaving unequal numbers of black and white squares. Each domino needs one of each color.

---
### 100 Doors Problem

**Problem:**
There are 100 closed doors in a hallway. You make 100 passes:
- Pass 1: Toggle every door (all open)
- Pass 2: Toggle every 2nd door (2, 4, 6, ...)
- Pass 3: Toggle every 3rd door (3, 6, 9, ...)
- ...
- Pass 100: Toggle door 100
Which doors are open after 100 passes?

**Answer:**
**Approach:**
A door is toggled once for each of its divisors. A door is open if it has an odd number of divisors. Only perfect squares have an odd number of divisors.

**Solution:**
**Key Insight:** Perfect squares have odd number of divisors.
**Why:**
- Door n is toggled on passes that are divisors of n
- Door is open if toggled odd number of times
- Only perfect squares have odd number of divisors
**Example:**
- Door 12: Divisors 1, 2, 3, 4, 6, 12 (6 divisors, even) → Closed
- Door 16: Divisors 1, 2, 4, 8, 16 (5 divisors, odd) → Open
**Perfect squares ≤ 100:**
1, 4, 9, 16, 25, 36, 49, 64, 81, 100
**Answer:** Doors 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are open (all perfect squares).

---
### 3 Light Switches Problem

**Problem:**
You're in a room with 3 light switches. Each switch controls one of 3 light bulbs in another room. You can only go to the other room once. How do you determine which switch controls which bulb?

**Answer:**
**Approach:**
Use the fact that bulbs generate heat. Turn on one switch, wait, then turn it off and turn on another.

**Solution:**
**Strategy:**
1. **Turn on Switch 1** and leave it on for a few minutes
2. **Turn off Switch 1**, then **turn on Switch 2**
3. **Go to the other room**
**Observations:**
- **Bulb that's ON and WARM:** Controlled by Switch 2 (just turned on)
- **Bulb that's OFF and WARM:** Controlled by Switch 1 (was on, then turned off)
- **Bulb that's OFF and COLD:** Controlled by Switch 3 (never turned on)
**Answer:** Use heat! Turn on switch 1, wait, turn it off, turn on switch 2, then check which bulb is on (switch 2), which is off but warm (switch 1), and which is off and cold (switch 3).

---
### Poisoned Wine Problem

**Problem:**
You have 1000 bottles of wine. One is poisoned. You have 10 test strips that can detect poison. Each strip can be used multiple times, but takes 7 days to show results. How do you identify the poisoned bottle in the minimum time?

**Answer:**
**Approach:**
Use binary encoding. Each test strip represents a bit. Mix samples from bottles whose binary representation has a 1 in that bit position.

**Solution:**
**Binary Encoding Strategy:**
Number bottles 0-999. Each bottle has a 10-bit binary representation.
**For each test strip (bit position 0-9):**
- Mix wine from all bottles where that bit is 1
- Apply to test strip
**After 7 days:**
- Read results: Strips that test positive indicate which bits are 1
- Convert binary number to decimal → That's the poisoned bottle!
**Example:**
- If strips 0, 3, 7 are positive
- Binary: 10001001 (bits 0, 3, 7 are 1)
- Decimal: 137
- Bottle 137 is poisoned ✅
**Answer:** Use binary encoding. Each strip tests one bit position. After 7 days, the pattern tells you exactly which bottle is poisoned.

---
### Burning Ropes

**Problem:**
You have two ropes. Each rope takes exactly 60 minutes to burn from one end to the other, but they don't burn at a constant rate (some parts burn faster). You have matches. How do you measure exactly 45 minutes?

**Answer:**
**Approach:**
Light one rope from both ends simultaneously. When it finishes, light the other rope from both ends.

**Solution:**
**Strategy:**
1. **Light Rope 1 from BOTH ends** at time 0
   - Rope burns in 30 minutes (both ends burning toward middle)
2. **When Rope 1 finishes (30 minutes):**
   - **Light Rope 2 from BOTH ends**
   - Rope 2 burns in 15 minutes (both ends)
3. **Total time:** 30 + 15 = 45 minutes ✅
**Why it works:**
- Lighting from both ends halves the burn time
- Rope 1: 60 min → 30 min (both ends)
- Rope 2: 60 min → 30 min, but we only need 15 min of it
**Answer:** Light first rope from both ends. When it finishes (30 min), light second rope from both ends. When second finishes (15 min later), total = 45 minutes.

---
### Handshakes Problem

**Problem:**
At a party, everyone shakes hands with everyone else exactly once. If there were 66 handshakes total, how many people were at the party?

**Answer:**
**Approach:**
Use combinations. Each handshake is a pair of people. n people = n choose 2 handshakes.

**Solution:**
**Formula:**
- n people
- Each person shakes hands with (n-1) others
- But this counts each handshake twice (A shakes B, B shakes A)
- Total handshakes = n × (n-1) / 2
**Solve:**
n(n-1)/2 = 66
n² - n = 132
n² - n - 132 = 0
**Quadratic formula:**
n = (1 + √(1 + 528)) / 2
n = (1 + 23) / 2 = 12
**Answer:** 12 people
**Verification:**
12 × 11 / 2 = 132 / 2 = 66 ✅

---
### Island of Truth and Lies

**Problem:**
You're on an island with two tribes: Truth-tellers (always tell truth) and Liars (always lie). You meet two people. One says "We are both truth-tellers" and the other says "We are both liars." What are they?

**Answer:**
**Approach:**
Analyze the statements logically. If someone says "We are both truth-tellers," can that be true?

**Solution:**
**Analysis:**
**Case 1: First person is truth-teller**
- Says "We are both truth-tellers"
- If true, second must also be truth-teller
- But second says "We are both liars" - contradiction!
- Impossible
**Case 2: First person is liar**
- Says "We are both truth-tellers" (a lie)
- So they're NOT both truth-tellers
- Since first is liar, second must be truth-teller
- Second (truth-teller) says "We are both liars"
- But second is truth-teller, so this is false - contradiction!
- Impossible
**Wait - let's reconsider:**
**If first is truth-teller:**
- Says "We are both truth-tellers" → Both must be truth-tellers
- Second says "We are both liars" → But second is truth-teller, so this is false
- Contradiction: Second can't be truth-teller and say false statement
**If first is liar:**
- Says "We are both truth-tellers" (lie) → They're not both truth-tellers
- Since first is liar, second must be truth-teller
- Second (truth-teller) says "We are both liars" → False (second is truth-teller)
- Contradiction: Truth-teller can't say false statement
**Answer:** This is impossible! The statements are contradictory. No valid assignment exists.

---
### Race Horses Problem

**Problem:**
You have 25 horses. You can race 5 horses at a time. You don't have a timer. What's the minimum number of races needed to find the 3 fastest horses?

**Answer:**
**Approach:**
Race in groups, then race the winners. Need to find top 3, so race top 5 from first round plus some others.

**Solution:**
**Step-by-step:**
**Round 1: Race all 25 horses in 5 races (5 races)**
- Race 1: Horses 1-5 → Winner A1
- Race 2: Horses 6-10 → Winner A2
- Race 3: Horses 11-15 → Winner A3
- Race 4: Horses 16-20 → Winner A4
- Race 5: Horses 21-25 → Winner A5
**Round 2: Race the 5 winners (1 race)**
- Race A1, A2, A3, A4, A5
- Assume order: A1 > A2 > A3 > A4 > A5
- A1 is definitely fastest ✅
**Elimination:**
- A5 and its group are eliminated (A5 is 5th, can't be in top 3)
- A4 and its group are eliminated (A4 is 4th, can't be in top 3)
- A3 might be 3rd, but we need to check A2's group
**Round 3: Race for 2nd and 3rd (1 race)**
- Race: A2, A3, B2 (2nd from A2's group), B3 (2nd from A3's group), C2 (2nd from A1's group)
- Top 2 from this race are 2nd and 3rd fastest ✅
**Total: 5 + 1 + 1 = 7 races**
**Answer:** 7 races minimum

---
### Prisoner Hats Problem

**Problem:**
100 prisoners are lined up. Each can see all hats in front but not their own or behind. There are 50 red hats and 50 blue hats (randomly distributed). Starting from the back, each prisoner must guess their hat color. They can hear previous guesses. What strategy guarantees at least 50 correct guesses?

**Answer:**
**Approach:**
Use parity. The last prisoner counts red hats they see and uses that to signal the total parity.

**Solution:**
**Strategy:**
**Last prisoner (P100):**
- Counts red hats they see (say, R = 45)
- If R is even, guesses "RED"
- If R is odd, guesses "BLUE"
- This signals the parity of red hats to others
**Other prisoners:**
- Count red hats they see
- Count how many "RED" guesses they've heard
- Calculate: If (red hats seen + red guesses heard) is even, their hat is BLUE
- If odd, their hat is RED
**Why it works:**
- P100's guess encodes total red hat parity
- Each prisoner can calculate their hat color from:
  - Red hats they see
  - Red guesses they've heard (including P100's signal)
  - Their own hat completes the parity
**Example:**
- P100 sees 45 red → odd → guesses "BLUE" (signals odd total)
- P99 sees 44 red, heard 0 "RED" → 44 is even → Their hat must be RED (to make total odd)
- P98 sees 43 red, heard 1 "RED" → 44 is even → Their hat is RED
- And so on...
**Answer:** Last prisoner signals parity of red hats. Others calculate their color from seen hats + heard guesses. Guarantees at least 50 correct (last one might be wrong, but others are correct).

---
### 8 Queens Problem

**Problem:**
Place 8 queens on an 8×8 chessboard so that no two queens attack each other (no two queens share same row, column, or diagonal). How many solutions exist?

**Answer:**
**Approach:**
Use backtracking. Place queens one row at a time, checking if position is safe.

**Solution:**
**Strategy (Backtracking):**
1. Place queen in first row
2. Place queen in second row (avoiding conflicts)
3. Continue row by row
4. If no valid position in a row, backtrack to previous row
5. Try next position in previous row
**Key Constraints:**
- No two queens in same row
- No two queens in same column
- No two queens on same diagonal
**One Solution:**
```
Q . . . . . . .
. . . . Q . . .
. . . . . . . Q
. . . . . Q . .
. . Q . . . . .
. . . . . . Q .
. Q . . . . . .
. . . Q . . . .
```
**Total Solutions:** 92 distinct solutions (12 fundamental solutions with rotations/reflections)
**Answer:** 92 distinct solutions exist. Use backtracking algorithm to find them.

---
### Tower of Hanoi

**Problem:**
You have 3 rods and n disks of different sizes. Start with all disks on rod A, smallest on top. Move all disks to rod C, following rules:
1. Move one disk at a time
2. Only move top disk from a stack
3. Never place larger disk on smaller disk
What's the minimum number of moves for n disks?

**Answer:**
**Approach:**
Use recursion. To move n disks from A to C: move n-1 to B, move largest to C, move n-1 from B to C.

**Solution:**
**Recursive Strategy:**
To move n disks from A to C:
1. Move n-1 disks from A to B (using C as auxiliary)
2. Move largest disk from A to C
3. Move n-1 disks from B to C (using A as auxiliary)
**Recurrence Relation:**
T(n) = 2T(n-1) + 1
T(1) = 1
**Solving:**
T(n) = 2T(n-1) + 1
     = 2(2T(n-2) + 1) + 1 = 4T(n-2) + 3
     = 2ⁿ⁻¹T(1) + (2ⁿ⁻¹ - 1)
     = 2ⁿ - 1
**Examples:**
- 1 disk: 1 move
- 2 disks: 3 moves
- 3 disks: 7 moves
- 4 disks: 15 moves
- n disks: 2ⁿ - 1 moves
**Answer:** Minimum moves = 2ⁿ - 1

---
### Josephus Problem

**Problem:**
n people stand in a circle. They count off, and every kth person is eliminated. Starting from person 1, who is the last person remaining?

**Answer:**
**Approach:**
Use recursion or mathematical formula. The position shifts by k each elimination.

**Solution:**
**Recursive Formula:**
J(n, k) = (J(n-1, k) + k) mod n
J(1, k) = 0 (0-indexed) or 1 (1-indexed)
**Example: n=7, k=3**
**Step-by-step (1-indexed):**
1. Start: [1,2,3,4,5,6,7], count from 1
2. Eliminate 3: [1,2,4,5,6,7], count from 4
3. Eliminate 6: [1,2,4,5,7], count from 7
4. Eliminate 2: [1,4,5,7], count from 4
5. Eliminate 7: [1,4,5], count from 1
6. Eliminate 5: [1,4], count from 1
7. Eliminate 1: [4] ✅
**Answer:** Person 4 survives
**For k=2 (special case):**
- Write n in binary, move first digit to end
- Example: n=7 = 111₂ → 111₂ → 7 (but actually 4 in 1-indexed)
- Formula: 2l + 1, where l = n - 2^floor(log₂(n))
**General Solution:**
Use recursion: J(n,k) = (J(n-1,k) + k) % n + 1 (1-indexed)

---
### Coin Flip Game

**Problem:**
Two players take turns flipping a fair coin. Player A wins if heads appears, Player B wins if tails appears. What's the probability that Player A wins?

**Answer:**
**Approach:**
Since coin is fair, each flip is independent with 50% chance. But who goes first matters.

**Solution:**
**Analysis:**
**If Player A goes first:**
- P(A wins on 1st flip) = 1/2
- P(A wins on 3rd flip) = P(tails, tails, heads) = (1/2)³
- P(A wins on 5th flip) = (1/2)⁵
- ...
**Geometric Series:**
P(A wins) = 1/2 + (1/2)³ + (1/2)⁵ + ...
          = 1/2 × (1 + 1/4 + 1/16 + ...)
          = 1/2 × (1 / (1 - 1/4))
          = 1/2 × 4/3
          = 2/3
**Alternative:**
Let p = P(A wins)
- A wins immediately: 1/2
- If A doesn't win (tails), it's B's turn, but then it's like A goes second
- p = 1/2 + 1/2 × (1 - p)
- p = 1/2 + 1/2 - p/2
- 3p/2 = 1
- p = 2/3
**Answer:** Player A has 2/3 probability of winning (if A goes first)

---
### Marbles in a Jar

**Problem:**
A jar contains red and blue marbles. You draw 2 marbles at random. The probability both are red is 1/2. The probability both are blue is 1/6. How many marbles are in the jar?

**Answer:**
**Approach:**
Set up equations. Let r = red marbles, b = blue marbles, n = r + b total.

**Solution:**
**Setup:**
Total marbles: n = r + b
**Probability both red:**
P(RR) = (r/n) × ((r-1)/(n-1)) = 1/2
**Probability both blue:**
P(BB) = (b/n) × ((b-1)/(n-1)) = 1/6
**From P(RR):**
r(r-1) / (n(n-1)) = 1/2
2r(r-1) = n(n-1)  ... (1)
**From P(BB):**
b(b-1) / (n(n-1)) = 1/6
6b(b-1) = n(n-1)  ... (2)
**From (1) and (2):**
2r(r-1) = 6b(b-1)
r(r-1) = 3b(b-1)
**Try values:**
- If r=3, b=1: 3×2 = 6, 3×1×0 = 0 (no)
- If r=4, b=2: 4×3 = 12, 3×2×1 = 6 (no)
- If r=3, b=2: 3×2 = 6, 3×2×1 = 6 ✅
Check: n = 3 + 2 = 5
P(RR) = (3/5) × (2/4) = 6/20 = 3/10 (not 1/2)
**Try r=4, b=1:**
4×3 = 12, 3×1×0 = 0 (no)
**Try r=6, b=3:**
6×5 = 30, 3×3×2 = 18 (no)
**Better approach - solve system:**
From (1): n(n-1) = 2r(r-1)
From (2): n(n-1) = 6b(b-1)
So: 2r(r-1) = 6b(b-1)
r(r-1) = 3b(b-1)
Try r=4, b=2: 4×3 = 12, 3×2×1 = 6 (no)
Try r=6, b=3: 6×5 = 30, 3×3×2 = 18 (no)
Try r=3, b=1: 3×2 = 6, 3×1×0 = 0 (no)
**Actually, let's solve properly:**
r(r-1) = 3b(b-1)
r² - r = 3b² - 3b
r² - r - 3b² + 3b = 0
Try r=4, b=1: 16-4-3+3 = 12 (no)
Try r=3, b=1: 9-3-3+3 = 6 (no)
**Answer:** This problem may have no integer solution, or requires different approach. Let me recalculate...
Actually: r=4, b=2 gives n=6
P(RR) = (4/6)×(3/5) = 12/30 = 2/5 (not 1/2)
P(BB) = (2/6)×(1/5) = 2/30 = 1/15 (not 1/6)
**Correct solution:** r=3, b=1, n=4
P(RR) = (3/4)×(2/3) = 6/12 = 1/2 ✅
P(BB) = (1/4)×(0/3) = 0 (not 1/6)
**Revised:** This problem as stated may not have a solution, or the probabilities are inconsistent.

---
### Snail Climbing Well

**Problem:**
A snail is at the bottom of a 30-foot well. Each day, it climbs up 3 feet. Each night, it slides back 2 feet. How many days does it take to get out?

**Answer:**
**Approach:**
Calculate net progress per day. On the last day, it doesn't slide back.

**Solution:**
**Net progress per day:**
- Day: +3 feet
- Night: -2 feet
- Net: +1 foot per day
**But on the last day:**
- Snail reaches top during the day
- Doesn't slide back at night
**Calculation:**
- After 27 days: 27 feet up
- Day 28: Climbs 3 feet → reaches 30 feet ✅
- Gets out, no sliding back
**Answer:** 28 days
**General formula for well of height H, climb C, slide S:**
Days = ⌈(H - C) / (C - S)⌉ + 1
     = ⌈(30 - 3) / (3 - 2)⌉ + 1
     = ⌈27 / 1⌉ + 1
     = 27 + 1 = 28

---
### Ages of Children

**Problem:**
A man says "I have 3 children. The product of their ages is 36. The sum of their ages equals the number of my house." A visitor says "I need more information." The man says "The oldest plays piano." What are the ages?

**Answer:**
**Approach:**
List all factor triples of 36, check sums, find which needs the "oldest" clue.

**Solution:**
**Factor triples of 36 (ages):**
1. 1, 1, 36 → sum = 38
2. 1, 2, 18 → sum = 21
3. 1, 3, 12 → sum = 16
4. 1, 4, 9 → sum = 14
5. 1, 6, 6 → sum = 13
6. 2, 2, 9 → sum = 13
7. 2, 3, 6 → sum = 11
8. 3, 3, 4 → sum = 10
**Why visitor needs more info:**
- Two triples have sum 13: (1,6,6) and (2,2,9)
- Visitor can't determine which
**"Oldest plays piano" clue:**
- (1,6,6): No single "oldest" (twins)
- (2,2,9): Has an oldest (9 years old) ✅
**Answer:** Ages are 2, 2, and 9 years old.

---
### 100 Chickens and Eggs

**Problem:**
A farmer has chickens. If he sells 75 chickens, his feed lasts 20 more days. If he buys 100 chickens, his feed lasts 15 fewer days. How many chickens does he have?

**Answer:**
**Approach:**
Set up equations. Let c = current chickens, d = days feed lasts, f = total feed.

**Solution:**
**Setup:**
Let:
- c = current number of chickens
- d = days feed lasts currently
- f = total feed (constant)
**Feed consumption rate:**
- f = c × d (chickens × days)
**Case 1: Sell 75 chickens**
- New chickens: c - 75
- New days: d + 20
- f = (c - 75)(d + 20)  ... (1)
**Case 2: Buy 100 chickens**
- New chickens: c + 100
- New days: d - 15
- f = (c + 100)(d - 15)  ... (2)
**Also:** f = c × d  ... (3)
**From (1) and (3):**
c × d = (c - 75)(d + 20)
cd = cd + 20c - 75d - 1500
0 = 20c - 75d - 1500
75d = 20c - 1500
d = (20c - 1500) / 75  ... (4)
**From (2) and (3):**
c × d = (c + 100)(d - 15)
cd = cd - 15c + 100d - 1500
0 = -15c + 100d - 1500
15c = 100d - 1500
c = (100d - 1500) / 15  ... (5)
**Substitute (4) into (5):**
c = (100 × (20c - 1500)/75 - 1500) / 15
c = ((2000c - 150000)/75 - 1500) / 15
c = (2000c - 150000 - 112500) / 1125
1125c = 2000c - 262500
875c = 262500
c = 300
**Answer:** 300 chickens

---
### Splitting Money

**Problem:**
Three friends split a restaurant bill. They decide to leave a 20% tip. After calculating, they realize if they had known the tip percentage beforehand, they would have paid different amounts. The bill was $X. How much did each actually pay vs how much they should have paid?

**Answer:**
**Approach:**
This is a classic puzzle about percentage calculations and rounding. The key is that tips are usually calculated on the pre-tax amount.

**Solution:**
**Classic Version:**
Actually, this problem is usually stated differently. Let me present a clearer version:
**Problem:** Three people split a $30 bill. They decide to pay $10 each. The waiter realizes the bill should be $25, gives $5 back. They tip $2, keep $1 each. So each paid $9, total $27, plus $2 tip = $29. Where's the missing dollar?
**The Trick:**
- The $27 already includes the $2 tip!
- They should have: $25 (bill) + $2 (tip) = $27
- Plus $3 returned = $30 ✅
- The "missing" dollar is an accounting error in the problem statement
**Correct accounting:**
- Bill: $25
- Tip: $2
- Returned: $3
- Total: $30 ✅
**Answer:** There's no missing dollar - it's a misdirection in how the problem is stated. The $27 includes the tip.

---
### Cards Arrangement

**Problem:**
You have a deck of 52 cards. You deal them face down in a row. A friend picks a number 1-52. You flip cards one by one, counting. When count matches the number, that card is set aside. Process repeats with remaining cards. What's the final card?

**Answer:**
**Approach:**
This is related to the Josephus problem. Use recursion or work backwards.

**Solution:**
**This is a variant of Josephus problem with k=1 (but counting resets).**
Actually, let me clarify: This is like "eliminate every kth person" but the counting method is different.
**Simpler version:**
Deal cards, count to N, remove that card, continue from next card.
**For N=1:** Remove every 1st card → Last card is the 52nd card
**For N=2:** Remove every 2nd card → Similar to Josephus with k=2
**General solution:**
Use Josephus problem formula: J(52, N)
**For N=7 (example):**
- Cards 1-52
- Count to 7, remove card 7
- Continue from card 8, count to 7, remove card 14
- And so on...
**Answer:** Depends on the number N chosen. Use Josephus problem formula J(52, N) to find the final card position.

---
### Magic Square

**Problem:**
Fill a 3×3 grid with numbers 1-9 so that each row, column, and diagonal sums to the same number. What is that sum?

**Answer:**
**Approach:**
Sum of 1-9 = 45. With 3 rows, each row sums to 15. Arrange numbers so rows, columns, diagonals all sum to 15.

**Solution:**
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

---
### Number Lock Problem

**Problem:**
A combination lock has 3 dials, each showing digits 0-9. You don't know the combination. What's the minimum number of attempts needed to guarantee opening it?

**Answer:**
**Approach:**
In worst case, you try every combination. There are 10×10×10 = 1000 combinations.

**Solution:**
**Total combinations:**
- 3 dials, 10 digits each
- Total: 10³ = 1000 combinations
**Worst case:**
- Try 999 wrong combinations
- 1000th attempt is correct ✅
**Answer:** 1000 attempts maximum (999 in worst case, 1 on average if random)
**But if lock gives feedback:**
- If dial shows "close" for correct digit in wrong position
- Can solve in fewer attempts using strategy
**Without feedback:**
- Must try all 1000 combinations in worst case
- Average: 500 attempts (if combination is random)

---
### King on Chessboard

**Problem:**
A king is placed on square A1 of a chessboard. It can move one square in any direction (including diagonally). How many distinct paths can the king take to reach square H8, if it must move closer to H8 with each move (can't move away)?

**Answer:**
**Approach:**
Count paths using dynamic programming or combinatorics. Each move must increase (row+column) sum.

**Solution:**
**Key constraint:**
- Start: A1 = (1,1), sum = 2
- End: H8 = (8,8), sum = 16
- Each move must increase sum by at least 1
- Maximum sum increase per move: 2 (diagonal)
**Path length:**
- Minimum: 7 moves (all diagonal: +2 each time)
- Maximum: 14 moves (all horizontal/vertical: +1 each time)
**Counting paths:**
Use dynamic programming or count valid sequences.
**For minimum path (7 diagonal moves):**
- Only 1 path: all diagonal moves ✅
**For longer paths:**
- Mix of diagonal (+2) and straight (+1)
- Need to count all valid combinations
**Approximate answer:** There are many paths. Exact count requires careful enumeration or DP algorithm.
**Simpler version - count:**
Using combinatorics, the number of paths where sum increases each step is significant but finite.
**Answer:** The exact count is large but finite. Use dynamic programming: dp[i][j] = number of ways to reach (i,j) from (1,1) with constraint.

---
### Three Light Switches Problem

**Problem:**
You are in a room with three light switches. One controls a light bulb in another room. You can only enter that room once. How do you determine which switch controls the light?

**Answer:**
**Approach:**
Turn on the first switch and leave it on for a few minutes, then turn it off. Turn on the second switch and leave it on. Enter the room.

**Solution:**
- If the light is on: second switch controls it
- If the light is off but warm: first switch controls it
- If the light is off and cold: third switch controls it

This uses the heat from the bulb to identify which switch was used.

---
### 100 Prisoners and Light Bulb

**Problem:**
100 prisoners are in separate cells. There's a light bulb in a central room. Each day, one prisoner (chosen randomly) can enter the room and flip the switch. How can they coordinate to know when everyone has been in the room at least once?

**Answer:**
**Approach:**
Designate one prisoner as the counter. Others turn the light on only once (if it's off). The counter turns it off and counts.

**Solution:**
1. Designate one prisoner as the counter
2. All other prisoners: if light is OFF and you haven't turned it on before, turn it ON
3. Counter: if light is ON, turn it OFF and increment count
4. When counter reaches 99, everyone has been in the room

**Complexity:**
- Expected time: O(n²) days
- Worst case: O(n²) days

---
### Poisoned Wine Problem

**Problem:**
You have 1000 bottles of wine, one is poisoned. You have 10 test strips that can detect poison. Each test strip can be used once and takes 7 days to show results. How do you identify the poisoned bottle in the minimum time?

**Answer:**
**Approach:**
Use binary representation. Each bottle number can be represented in binary (10 bits for 1000 bottles). Each test strip represents one bit position.

**Solution:**
1. Number bottles 0-999
2. For each bottle, add a drop to test strips corresponding to 1-bits in its binary representation
3. After 7 days, read the results: strips that turn positive indicate which bits are 1
4. Convert binary result to decimal to get the poisoned bottle number

**Example:**
Bottle 42 = 0010101010 (binary)
Add drops to strips 1, 3, 5, 7
If those strips turn positive, bottle 42 is poisoned

**Time:** 7 days (one test cycle)

---
### Burning Ropes Problem

**Problem:**
You have two ropes, each takes exactly 60 minutes to burn from end to end. The ropes burn at non-uniform rates (different parts burn at different speeds). How do you measure exactly 45 minutes?

**Answer:**
**Approach:**
Light both ends of one rope and one end of the other rope simultaneously.

**Solution:**
1. Light both ends of rope A and one end of rope B at time 0
2. When rope A finishes burning (30 minutes), light the other end of rope B
3. Rope B will finish burning 15 minutes later (45 minutes total)

**Why it works:**
- Rope A burns from both ends → takes 30 minutes
- Rope B burns from one end for 30 minutes, then from both ends for remaining 15 minutes
- Total: 30 + 15 = 45 minutes

---
### 4 People Handshakes

**Problem:**
Four people meet. Some shake hands, some don't. No one shakes hands with themselves, and no pair shakes hands more than once. After all handshakes, how many hands were shaken in total?

**Answer:**
**Approach:**
This is a graph theory problem. Each person is a vertex, each handshake is an edge.

**Solution:**
Maximum handshakes = C(4,2) = 4!/(2!×2!) = 6

**Explanation:**
- Person A can shake with B, C, D (3 possibilities)
- Person B can shake with C, D (2 possibilities, already counted A)
- Person C can shake with D (1 possibility, already counted A, B)
- Total: 3 + 2 + 1 = 6

**General formula:**
For n people: n(n-1)/2 handshakes maximum

---
### Island of Truth and Lies

**Problem:**
You meet two people on an island. One always tells the truth, one always lies. You can ask one question to determine which is which. What question do you ask?

**Answer:**
**Approach:**
Ask a question that forces both to give the same answer regardless of who is the truth-teller.

**Solution:**
Ask either person: "If I asked the other person which path leads to safety, what would they say?"

Then take the opposite path.

**Why it works:**
- Truth-teller knows liar will point to wrong path, so truth-teller says wrong path
- Liar knows truth-teller will point to right path, so liar says wrong path
- Both point to wrong path, so you take the opposite

**Alternative question:**
"What would the other person say if I asked if you are the truth-teller?"
- Both will say "no", so the other one is the truth-teller

---
### Prisoner Hats Problem

**Problem:**
100 prisoners are lined up. Each can see all hats in front but not their own or behind. Hats are either black or white, assigned randomly. Starting from the back, each prisoner must guess their hat color. They can coordinate a strategy beforehand. What strategy guarantees at least 99 correct guesses?

**Answer:**
**Approach:**
Use parity (even/odd count) to encode information.

**Solution:**
1. Last prisoner counts black hats in front
2. If count is even, says "black"; if odd, says "white"
3. This encodes the parity for others
4. Each subsequent prisoner:
   - Counts black hats they can see
   - Compares with expected parity from previous guesses
   - Determines their own hat color

**Why it works:**
- Last prisoner's guess may be wrong, but it encodes the parity
- All others can deduce their hat color from the parity information
- Result: 99 correct, 1 may be wrong (the last one)

---
### Race Horses Problem

**Problem:**
You have 25 horses. You can race 5 horses at a time. What is the minimum number of races needed to find the 3 fastest horses?

**Answer:**
**Approach:**
Race in groups, then race the winners.

**Solution:**
1. Race 1-5: Get top 3 (A1, A2, A3)
2. Race 6-10: Get top 3 (B1, B2, B3)
3. Race 11-15: Get top 3 (C1, C2, C3)
4. Race 16-20: Get top 3 (D1, D2, D3)
5. Race 21-25: Get top 3 (E1, E2, E3)
6. Race winners: A1, B1, C1, D1, E1 → Get top 3 overall (say A1, B1, C1)
7. Race A2, A3, B1, B2, C1 → Get 2nd and 3rd fastest

**Total: 7 races**

**Why:**
- A1 is definitely fastest
- 2nd could be A2, B1, or C1
- 3rd could be A2, A3, B1, B2, or C1
- Need one more race to determine

---
### Snail Climbing Problem

**Problem:**
A snail climbs up a 10-foot wall. During the day, it climbs 3 feet. At night, it slides back 2 feet. How many days does it take to reach the top?

**Answer:**
**Approach:**
Calculate net progress per day, but account for the final day when it reaches the top before sliding.

**Solution:**
- Net progress per day: 3 feet up - 2 feet down = 1 foot
- But on the last day, it reaches 10 feet before sliding back
- So it needs to climb 7 feet (10 - 3) at 1 foot/day = 7 days
- On day 8, it climbs 3 feet from 7 to 10 feet and reaches the top

**Answer: 8 days**

**Verification:**
Day 1: 0→3→1, Day 2: 1→4→2, Day 3: 2→5→3, Day 4: 3→6→4, Day 5: 4→7→5, Day 6: 5→8→6, Day 7: 6→9→7, Day 8: 7→10 (reached!)

---
### Marbles in a Jar

**Problem:**
You have a jar with red and blue marbles. You randomly pick two marbles. If both are red, you add a red marble. If both are blue, you add a blue marble. If one of each, you add a blue marble. What happens to the ratio of red to blue marbles over time?

**Answer:**
**Approach:**
Analyze how the process changes the marble counts.

**Solution:**
The ratio of red marbles decreases over time.

**Why:**
- RR → +R: Red count increases
- BB → +B: Blue count increases
- RB/BR → +B: Blue count increases (red decreases relatively)

**Mathematical analysis:**
Let r = red count, b = blue count
- Expected change in red: P(RR) × (+1) + P(RB) × (-1)
- P(RR) = r/(r+b) × (r-1)/(r+b-1)
- P(RB) = 2 × r/(r+b) × b/(r+b-1)
- Net: Red decreases when b > 0

**Result:** Eventually, all marbles become blue (or very few red remain)

---
### Coin Flip Game

**Problem:**
You flip a fair coin repeatedly. You win if you get two heads in a row before getting two tails in a row. What is the probability of winning?

**Answer:**
**Approach:**
Use state-based probability calculation.

**Solution:**
Let P = probability of winning from start
Let P_H = probability of winning after one head
Let P_T = probability of winning after one tail

**Equations:**
- P = 0.5 × P_H + 0.5 × P_T (first flip: H or T)
- P_H = 0.5 × 1 + 0.5 × P_T (if H: win if next H, else go to P_T)
- P_T = 0.5 × 0 + 0.5 × P_H (if T: lose if next T, else go to P_H)

**Solving:**
P_T = 0.5 × P_H
P_H = 0.5 + 0.5 × P_T = 0.5 + 0.25 × P_H
0.75 × P_H = 0.5
P_H = 2/3
P_T = 1/3
P = 0.5 × (2/3) + 0.5 × (1/3) = 1/2

**Answer: 1/2 (50%)**

---
### Josephus Problem

**Problem:**
n people stand in a circle. They count off, and every k-th person is eliminated. What is the position of the last remaining person?

**Answer:**
**Approach:**
Use recurrence relation or mathematical formula.

**Solution for k=2:**
J(n) = 2 × (n - 2^⌊log₂(n)⌋) + 1

**Recursive formula:**
J(n, k) = (J(n-1, k) + k) mod n + 1

**Example (n=7, k=2):**
Elimination order: 2, 4, 6, 1, 5, 3
Last remaining: Position 7

**General approach:**
1. For small n, simulate the elimination
2. For large n, use the recurrence or closed form
3. For k=2, use the formula involving powers of 2

**Time complexity:** O(n) for simulation, O(log n) for formula

---
### Tower of Hanoi

**Problem:**
You have three rods and n disks of different sizes. Move all disks from the first rod to the third rod, following rules: (1) Move one disk at a time, (2) Only move the top disk, (3) Never place a larger disk on a smaller one. What is the minimum number of moves?

**Answer:**
**Approach:**
Use recursion: to move n disks, move n-1 disks to middle, move largest to destination, move n-1 disks to destination.

**Solution:**
T(n) = 2^n - 1 moves

**Recurrence relation:**
T(n) = 2 × T(n-1) + 1
T(1) = 1

**Proof:**
- To move n disks: move n-1 to middle (T(n-1)), move largest (1), move n-1 to destination (T(n-1))
- T(n) = 2T(n-1) + 1
- Solving: T(n) = 2^n - 1

**Example:**
- 3 disks: 2³ - 1 = 7 moves
- 5 disks: 2⁵ - 1 = 31 moves

**Time complexity:** O(2^n)

---
### 8 Queens Problem

**Problem:**
Place 8 queens on an 8×8 chessboard such that no two queens attack each other. How many solutions exist?

**Answer:**
**Approach:**
Use backtracking to find all valid placements.

**Solution:**
There are 92 distinct solutions (12 fundamental solutions, each can be rotated/reflected).

**Algorithm:**
1. Place queens row by row
2. For each row, try each column
3. Check if position is safe (no conflict with previous queens)
4. If safe, recurse to next row
5. If all rows filled, record solution
6. Backtrack and try next column

**Optimization:**
- Track occupied columns, diagonals
- Use bit manipulation for faster checking

**Time complexity:** O(n!) worst case, but pruning makes it much faster
**Space complexity:** O(n) for recursion stack

---
### King on Chessboard

**Problem:**
A king starts at one corner of an 8×8 chessboard and wants to reach the opposite corner. It can move one square in any direction (including diagonally). How many distinct paths of minimum length exist?

**Answer:**
**Approach:**
The king needs to move 7 steps right and 7 steps up (or any combination). Minimum path length is 7 moves.

**Solution:**
For an n×n board, minimum path length is n-1 moves.
Number of paths = C(2(n-1), n-1)

**For 8×8 board:**
- Minimum moves: 7
- Paths: C(14, 7) = 14!/(7!×7!) = 3,432

**Why:**
- Need 7 right moves and 7 up moves (or diagonal equivalents)
- Total 14 moves, choose 7 positions for right moves
- Remaining 7 are up moves

**General formula:**
For m×n board: C(m+n-2, m-1) minimum-length paths

---
### Magic Square

**Problem:**
Create a 3×3 magic square using numbers 1-9, where each row, column, and diagonal sums to the same number.

**Answer:**
**Approach:**
The magic constant for 1-9 is 15 (sum 1+2+...+9 = 45, divided by 3 rows = 15).

**Solution:**
One solution:
```
8 1 6
3 5 7
4 9 2
```

**Properties:**
- Magic constant: 15
- Center is always 5
- Corners are even numbers
- Middle edges are odd numbers

**Algorithm to generate:**
1. Place 5 in center
2. Place 1 in top-middle
3. Move diagonally up-right, wrapping around
4. If cell occupied, move down instead

**Number of solutions:** 8 (rotations and reflections of the same pattern)

---
### Cards Arrangement

**Problem:**
You have a deck of 52 cards. You shuffle and deal them face down. What is the probability that no card is in its original position?

**Answer:**
**Approach:**
This is the derangement problem.

**Solution:**
Probability ≈ 1/e ≈ 0.3679 (36.79%)

**Derangement formula:**
D(n) = n! × Σ(-1)^k / k! for k=0 to n

**For large n:**
D(n) ≈ n! / e
Probability = D(n) / n! ≈ 1/e

**For 52 cards:**
- Exact calculation is complex
- Approximation: 1/e ≈ 0.367879
- So about 36.8% chance no card is in original position

**Interesting fact:**
As n increases, probability approaches 1/e, regardless of deck size!

---
### Splitting Money Problem

**Problem:**
Two people want to split $100 fairly. They take turns making offers. If an offer is rejected, the total decreases by $10. What is the optimal strategy?

**Answer:**
**Approach:**
Use backward induction from the end game.

**Solution:**
**Optimal strategy (first mover):**
- Offer: $60 to yourself, $40 to other
- If rejected, next round offers $50/$50 (or $60/$40 if you're second)
- Accept any offer ≥ $40

**Why:**
- Last round: $10 left, first mover gets all
- Second-to-last: $20, second mover offers $10/$10 (both accept)
- Third-to-last: $30, first mover offers $20/$10
- And so on...

**General formula:**
For amount A decreasing by D each round:
- First mover advantage increases with more rounds
- Optimal split depends on number of rounds remaining

---
### 100 Chickens and Eggs

**Problem:**
A farmer has 100 chickens. Each chicken lays eggs at a different rate. You can only check one chicken's nest per day. How do you find which chicken lays the most eggs in the minimum time?

**Answer:**
**Approach:**
This is similar to finding the maximum in an array, but with the constraint of checking one per day.

**Solution:**
**Strategy:**
1. Check each chicken's nest once (100 days)
2. Identify the top candidates (say top 10)
3. Monitor those candidates over additional days
4. Compare total eggs laid

**Optimization:**
- If you can check multiple nests per day: O(n) time
- If one nest per day: Need at least n days to check all
- Best approach: Check all once, then focus on top performers

**Alternative (if you can mark nests):**
- Mark nests as you check them
- Track running maximum
- Time: 100 days minimum (must check each at least once)

---
### Ages of Children

**Problem:**
A census taker asks a mathematician: 'How many children do you have, and what are their ages?' Mathematician: 'I have three children. The product of their ages is 36, and the sum is equal to the house number next door.' Census taker: 'I need more information.' Mathematician: 'The oldest child plays piano.' Census taker: 'Now I know the ages.' What are the ages?

**Answer:**
**Approach:**
List all factor combinations of 36 with 3 factors, find which has ambiguous sum.

**Solution:**
**Factor combinations (a, b, c where a×b×c=36):**
1, 1, 36 → sum = 38
1, 2, 18 → sum = 21
1, 3, 12 → sum = 16
1, 4, 9 → sum = 14
1, 6, 6 → sum = 13
2, 2, 9 → sum = 13
2, 3, 6 → sum = 11
3, 3, 4 → sum = 10

**Why census taker needed more info:**
Two combinations have sum 13: (1,6,6) and (2,2,9)

**Why 'oldest plays piano' helps:**
- (1,6,6): two oldest are same age (6)
- (2,2,9): has a unique oldest (9)

**Answer: Ages are 2, 2, and 9**

---
### Number Lock Combination

**Problem:**
A safe has a 3-digit combination lock. You know that: (1) 682 - one digit is correct and in the right position, (2) 614 - one digit is correct but in the wrong position, (3) 206 - two digits are correct but both in wrong positions, (4) 738 - no digits are correct, (5) 870 - one digit is correct but in the wrong position. What is the combination?

**Answer:**
**Approach:**
Use process of elimination based on the clues.

**Solution:**
**Step-by-step deduction:**
1. From (4): 7, 3, 8 are not in the combination
2. From (1): One of 6, 8, 2 is correct and in right position
   - Since 8 is wrong (from step 1), either 6 is 1st digit OR 2 is 3rd digit
3. From (2): One of 6, 1, 4 is correct but wrong position
   - If 6 is correct, it's not in 1st position (contradicts step 2 if 6 is 1st)
   - So either 1 or 4 is correct
4. From (3): Two of 2, 0, 6 are correct but wrong positions
   - 2 could be correct (not in 3rd position)
   - 0 could be correct (not in 2nd position)
   - 6 could be correct (not in 1st position)
5. From (5): One of 8, 7, 0 is correct but wrong position
   - 8 and 7 are wrong (from step 1), so 0 is correct
   - 0 is not in 2nd position

**Final deduction:**
- 0 is in 1st or 3rd position (from step 5)
- From (3), if 0 is correct, it's not in 2nd position ✓
- From (1), if 2 is in 3rd position, then 6 is not in 1st
- From (2), if 6 is not in 1st, then 1 or 4 is correct
- From (3), 2 and 6 are both correct
- Combination: 0 _ 2 or 2 _ 0
- Testing: 042 doesn't work with (2)
- Answer: **042** (0 in 1st, 4 in 2nd, 2 in 3rd)

Wait, let me reconsider...

Actually: **042**
- (1) 682: 2 is correct, 3rd position ✓
- (2) 614: 4 is correct, wrong position (should be 2nd) ✓
- (3) 206: 0 and 2 are correct, wrong positions ✓
- (4) 738: none correct ✓
- (5) 870: 0 is correct, wrong position ✓

**Answer: 042**

---
### Water Jug Measurement

**Problem:**
You have a 3-gallon jug and a 5-gallon jug. How do you measure exactly 4 gallons?

**Answer:**
**Solution:**
1. Fill 5-gallon jug
2. Pour from 5 to 3 (leaves 2 in 5-gallon)
3. Empty 3-gallon jug
4. Pour remaining 2 from 5 to 3
5. Fill 5-gallon jug
6. Pour from 5 to 3 until 3 is full (pours 1, leaves 4 in 5-gallon)

**Result: 4 gallons in 5-gallon jug**

---
### Clock Hands Overlap

**Problem:**
How many times do the hour and minute hands of a clock overlap in 12 hours?

**Answer:**
**Solution:**
The hands overlap 11 times in 12 hours.

**Why:**
- They overlap at 12:00, then approximately every 65.45 minutes
- In 12 hours (720 minutes): 720 / 65.45 ≈ 11 times
- Exact times: 12:00, 1:05.45, 2:10.91, ..., 10:54.55, 11:59.99 (which is essentially 12:00)

**Formula:**
Overlap occurs when: (hour × 30 + minute × 0.5) = minute × 6
Solving: minute = (hour × 30) / 5.5

---
### Trailing Zeros in Factorial

**Problem:**
How many trailing zeros does 100! have?

**Answer:**
**Approach:**
Trailing zeros come from factors of 10 = 2 × 5. Count pairs of 2s and 5s.

**Solution:**
Count multiples of 5:
- 5, 10, 15, ..., 100: 20 numbers
- Multiples of 25: 25, 50, 75, 100: 4 additional 5s
- Multiples of 125: 0 (none ≤ 100)

Total 5s: 20 + 4 = 24
There are more 2s than 5s, so answer is 24.

**Answer: 24 trailing zeros**

**General formula:**
Trailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...

---
### Why Manhole Covers Are Round

**Problem:**
Why are manhole covers typically round instead of square?

**Answer:**
**Solution:**
**Primary reason: Safety**
A round cover cannot fall through its hole, regardless of orientation. A square cover can be rotated diagonally and fall through.

**Other advantages:**
1. **No orientation needed** - can be placed in any rotation
2. **Easier to roll** - round objects are easier to move
3. **Equal stress distribution** - circular shape distributes weight evenly
4. **Manufacturing** - easier to make perfectly round than perfectly square
5. **Strength** - circular shape is inherently strong

**Mathematical proof:**
- Square diagonal = side × √2 > side
- So square can fall through if rotated 45°
- Circle diameter is constant in all directions

---
### Counting Set Bits

**Problem:**
Count the number of 1-bits in the binary representation of a number. Optimize for speed.

**Answer:**
**Approach:**
Use bit manipulation tricks.

**Solution 1: Brian Kernighan's Algorithm**
```
count = 0
while n > 0:
    n = n & (n - 1)  // Removes rightmost 1-bit
    count++
return count
```
Time: O(number of 1-bits)

**Solution 2: Lookup Table**
Precompute counts for 0-255, then check each byte.
Time: O(1) for 32-bit numbers (4 lookups)

**Solution 3: Parallel Count**
Use bit manipulation to count in parallel:
```
n = (n & 0x55555555) + ((n >> 1) & 0x55555555)
n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
n = (n & 0x0F0F0F0F) + ((n >> 4) & 0x0F0F0F0F)
n = (n & 0x00FF00FF) + ((n >> 8) & 0x00FF00FF)
n = (n & 0x0000FFFF) + ((n >> 16) & 0x0000FFFF)
return n
```
Time: O(log w) where w is word size

---
### Happy Number

**Problem:**
A happy number is a number that eventually reaches 1 when replaced by the sum of squares of its digits repeatedly. Determine if a number is happy.

**Answer:**
**Approach:**
Use cycle detection (Floyd's algorithm or hash set).

**Solution:**
```
function isHappy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sumOfSquares(n)
    return n == 1

function sumOfSquares(n):
    total = 0
    while n > 0:
        digit = n % 10
        total += digit * digit
        n = n / 10
    return total
```

**Optimization (Floyd's cycle detection):**
Use slow and fast pointers to detect cycles without extra space.

**Time:** O(log n)
**Space:** O(1) with cycle detection, O(log n) with hash set

---
### Single Number in Array

**Problem:**
Given an array where every element appears twice except one, find that single element. Optimize for O(n) time and O(1) space.

**Answer:**
**Approach:**
Use XOR property: a ^ a = 0, a ^ 0 = a

**Solution:**
```
function singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

**Why it works:**
- Pairs cancel out: a ^ a = 0
- Only the single number remains

**Example:**
[2, 1, 4, 2, 1]
0 ^ 2 ^ 1 ^ 4 ^ 2 ^ 1
= (2^2) ^ (1^1) ^ 4
= 0 ^ 0 ^ 4
= 4

**Time:** O(n)
**Space:** O(1)

---
### Missing Number in Range

**Problem:**
Given an array of n distinct numbers in range [0, n], find the missing number.

**Answer:**
**Approach:**
Use sum formula or XOR.

**Solution 1: Sum Formula**
```
function findMissing(nums):
    n = nums.length
    expectedSum = n * (n + 1) / 2
    actualSum = sum(nums)
    return expectedSum - actualSum
```

**Solution 2: XOR**
```
function findMissing(nums):
    missing = nums.length
    for i in range(len(nums)):
        missing ^= i ^ nums[i]
    return missing
```

**Time:** O(n)
**Space:** O(1)

---
### Number of 1 Bits

**Problem:**
Count the number of 1-bits in a 32-bit unsigned integer.

**Answer:**
**Solution:**
Use Brian Kernighan's algorithm:
```
function hammingWeight(n):
    count = 0
    while n != 0:
        n = n & (n - 1)  // Removes rightmost 1
        count++
    return count
```

**Time:** O(number of 1-bits)
**Space:** O(1)

**Alternative:** Use built-in popcount instruction if available.

---
### Reverse Bits

**Problem:**
Reverse the bits of a 32-bit unsigned integer.

**Answer:**
**Solution:**
```
function reverseBits(n):
    result = 0
    for i in range(32):
        result = (result << 1) | (n & 1)
        n = n >> 1
    return result
```

**Optimization:**
Use lookup table for byte reversal, then reverse byte order.

**Time:** O(1) with lookup table, O(32) with bit manipulation
**Space:** O(1)

---
### Two Trains Collision

**Problem:**
Two trains are 100 miles apart, moving toward each other. One travels at 60 mph, the other at 40 mph. A bird flies back and forth between them at 80 mph. How far does the bird travel before the trains collide?

**Answer:**
**Solution:**
Trains collide in: 100 / (60 + 40) = 1 hour
Bird travels: 80 mph × 1 hour = **80 miles**

**Key insight:** Don't calculate each trip - just find collision time and multiply by bird's speed.

---
### Chocolate Bar Breaking

**Problem:**
You have a chocolate bar with m×n pieces. You can break it along grid lines. What is the minimum number of breaks needed to separate all pieces?

**Answer:**
**Solution:**
Minimum breaks = m×n - 1

**Why:**
- Start with 1 piece
- Each break increases piece count by 1
- Need m×n pieces total
- So need m×n - 1 breaks

**Example:**
3×4 bar = 12 pieces
Breaks needed: 12 - 1 = 11 breaks

---
### Ants on a Stick

**Problem:**
Three ants are on a 1-meter stick. They move at 1 cm/s. When two ants meet, they reverse direction. When an ant reaches an end, it falls off. How long until all ants fall off?

**Answer:**
**Solution:**
Maximum time = 100 seconds (1 meter = 100 cm)

**Key insight:** Ants passing each other is equivalent to ants passing through each other (they're identical). So just calculate time for farthest ant to reach an end.

**Worst case:** Ant at one end, others moving away. Farthest ant travels 100 cm at 1 cm/s = 100 seconds.

---
### Pirate Gold Distribution

**Problem:**
5 pirates find 100 gold coins. They vote on distribution. If majority approves, coins are distributed. Otherwise, proposer is thrown overboard and next pirate proposes. Pirates are rational and prioritize: (1) survival, (2) maximizing gold, (3) killing others. What distribution does the first pirate propose?

**Answer:**
**Solution:**
Work backwards from last pirate.

**Pirate 5 alone:** Gets all 100 (needs 1 vote = himself)
**Pirate 4:** Needs 2 votes. Pirate 5 will reject (wants all). So pirate 4 gets 0, dies.
**Pirate 3:** Needs 2 votes. Offers 0 to 4, 1 to 5. Gets: 99 coins
**Pirate 2:** Needs 3 votes. Offers 0 to 3, 1 to 4, 0 to 5. Gets: 99 coins
**Pirate 1:** Needs 3 votes. Offers 0 to 2, 1 to 3, 0 to 4, 1 to 5. Gets: **98 coins**

**Answer: Pirate 1 proposes [98, 0, 1, 0, 1]**

---
### Truth-Tellers and Liars

**Problem:**
On an island, some always tell truth, some always lie. You meet two people. One says 'At least one of us is a liar.' What are they?

**Answer:**
**Solution:**
**Case 1: Speaker is truth-teller**
- Statement is true: at least one is liar
- Since speaker is truth-teller, other must be liar ✓

**Case 2: Speaker is liar**
- Statement is false: neither is liar (both truth-tellers)
- But speaker claims to be liar, contradiction ✗

**Answer: Speaker is truth-teller, other is liar**

---
### Cannibals and Missionaries

**Problem:**
Three missionaries and three cannibals must cross a river using a boat that holds two people. If cannibals ever outnumber missionaries on either side, missionaries get eaten. How do they all cross safely?

**Answer:**
**Solution:**
1. Two cannibals cross (C C | M M M C)
2. One cannibal returns (C C C | M M M)
3. Two cannibals cross (C | M M M C C)
4. One cannibal returns (C C | M M M C)
5. Two missionaries cross (C C M M | M C)
6. One missionary and one cannibal return (C C C M | M M)
7. Two missionaries cross (C C C | M M M)
8. One cannibal returns (C C C C | M M M)
9. Two cannibals cross (C C | M M M C C)
10. One cannibal returns (C C C | M M M C)
11. Two cannibals cross (C | M M M C C C)
12. One cannibal returns (C C | M M M C C)
13. Two cannibals cross (| M M M C C C C)

**Total: 13 trips**

---
### Socks in Drawer

**Problem:**
A drawer contains red and blue socks. You randomly pick two socks. What is the minimum number of socks needed to guarantee a matching pair?

**Answer:**
**Solution:**
**Answer: 3 socks**

**Why:**
- Worst case: Pick 1 red, 1 blue (2 socks, no pair)
- Next sock must be red or blue, creating a pair

**General formula:**
For n colors: n + 1 socks guarantee a pair

---
### Birthday Paradox Probability

**Problem:**
How many people are needed in a room for there to be a 50% chance that at least two share a birthday?

**Answer:**
**Solution:**
**Answer: 23 people**

**Calculation:**
P(no shared birthday) = 365/365 × 364/365 × ... × (365-n+1)/365
P(at least one shared) = 1 - P(no shared)

For n=23:
P(no shared) ≈ 0.4927
P(at least one shared) ≈ 0.5073 ≈ 50%

**Key insight:** Counterintuitively low number due to many possible pairs (C(23,2) = 253 pairs)

---
### Memory Leak Detection

**Problem:**
Your application's memory usage keeps growing. How do you find and fix memory leaks?

**Answer:**
**Solution:**
**Detection:**
1. **Monitor:** Track memory usage over time
2. **Heap dumps:** Capture and analyze heap snapshots
3. **Profiling:** Use memory profilers (Valgrind, VisualVM)
4. **GC logs:** Analyze garbage collection patterns

**Common causes:**
- Unclosed resources (files, connections)
- Event listeners not removed
- Circular references
- Caches without size limits
- Static collections growing

**Fixes:**
- Use weak references
- Set cache size limits
- Close resources in finally blocks
- Remove event listeners
- Use memory-efficient data structures

---