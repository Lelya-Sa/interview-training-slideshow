# Container With Most Water - LeetCode 11

## Problem Description

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

## Example

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
In this case, the max area of water (blue section) the container can contain is 49.

Input: height = [1,1]
Output: 1
```

## Approach

### Two Pointers Technique:
1. Start with two pointers at both ends (left = 0, right = n-1)
2. Calculate area: `min(height[left], height[right]) * (right - left)`
3. Move pointer with smaller height inward
4. Track maximum area

### Key Insight:
- Area = width × min(height[left], height[right])
- Moving the pointer with larger height won't increase area (width decreases, height limited by smaller)
- Always move the smaller pointer to potentially find larger area

## Time Complexity
- O(n) - single pass with two pointers

## Space Complexity
- O(1)

## How to Use

### JavaScript
```bash
node js/solution.js
```

### Python
```bash
python python/solution.py
```

### Java
```bash
javac java/Solution.java
java Solution
```

