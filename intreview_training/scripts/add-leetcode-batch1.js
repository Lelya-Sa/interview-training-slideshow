const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const questionsFile = path.join(projectRoot, 'algorithms', 'leetcode', 'questions.md');

console.log('='.repeat(80));
console.log('➕ ADDING LEETCODE QUESTIONS - BATCH 1 (15 questions)');
console.log('='.repeat(80));

// Read current file
let content = fs.readFileSync(questionsFile, 'utf8');
const currentCount = (content.match(/^### \d+\./gm) || []).length;
console.log(`\n📊 Current questions: ${currentCount}`);
console.log(`📊 Adding: 15 questions\n`);

// 15 new LeetCode questions with both JS and Python
const newQuestions = [
  {
    title: "Binary Search",
    problem: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.",
    js: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
// Time: O(log n), Space: O(1)`,
    python: `def search(nums, target):
    """
    Binary Search
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`
  },
  {
    title: "Find First and Last Position of Element in Sorted Array",
    problem: "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If `target` is not found in the array, return `[-1, -1]`.",
    js: `function searchRange(nums, target) {
  function findFirst(nums, target) {
    let left = 0, right = nums.length - 1;
    let first = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        first = mid;
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return first;
  }
  
  function findLast(nums, target) {
    let left = 0, right = nums.length - 1;
    let last = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        last = mid;
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return last;
  }
  
  return [findFirst(nums, target), findLast(nums, target)];
}
// Time: O(log n), Space: O(1)`,
    python: `def search_range(nums, target):
    """
    Binary Search for first and last position
    Time: O(log n)
    Space: O(1)
    """
    def find_first(nums, target):
        left, right = 0, len(nums) - 1
        first = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                first = mid
                right = mid - 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return first
    
    def find_last(nums, target):
        left, right = 0, len(nums) - 1
        last = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                last = mid
                left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return last
    
    return [find_first(nums, target), find_last(nums, target)]`
  },
  {
    title: "Search in Rotated Sorted Array",
    problem: "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index. Given the array `nums` after the rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.",
    js: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}
// Time: O(log n), Space: O(1)`,
    python: `def search(nums, target):
    """
    Binary Search in Rotated Array
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1`
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    problem: "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.",
    js: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}
// Time: O(log n), Space: O(1)`,
    python: `def find_min(nums):
    """
    Binary Search for minimum
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    
    return nums[left]`
  },
  {
    title: "Search Insert Position",
    problem: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
    js: `function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
// Time: O(log n), Space: O(1)`,
    python: `def search_insert(nums, target):
    """
    Binary Search for insert position
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left`
  },
  {
    title: "Find Peak Element",
    problem: "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.",
    js: `function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
// Time: O(log n), Space: O(1)`,
    python: `def find_peak_element(nums):
    """
    Binary Search for peak
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    
    return left`
  },
  {
    title: "Rotate Array",
    problem: "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.",
    js: `function rotate(nums, k) {
  k = k % nums.length;
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
// Time: O(n), Space: O(1)`,
    python: `def rotate(nums, k):
    """
    Reverse approach
    Time: O(n)
    Space: O(1)
    """
    k = k % len(nums)
    
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    reverse(0, len(nums) - 1)
    reverse(0, k - 1)
    reverse(k, len(nums) - 1)`
  },
  {
    title: "Remove Duplicates from Sorted Array",
    problem: "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in `nums`.",
    js: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let writeIndex = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  return writeIndex;
}
// Time: O(n), Space: O(1)`,
    python: `def remove_duplicates(nums):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    
    write_index = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[write_index] = nums[i]
            write_index += 1
    
    return write_index`
  },
  {
    title: "Remove Element",
    problem: "Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.",
    js: `function removeElement(nums, val) {
  let writeIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  return writeIndex;
}
// Time: O(n), Space: O(1)`,
    python: `def remove_element(nums, val):
    """
    Two pointers approach
    Time: O(n)
    Space: O(1)
    """
    write_index = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[write_index] = nums[i]
            write_index += 1
    
    return write_index`
  },
  {
    title: "Plus One",
    problem: "You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zeros. Increment the large integer by one and return the resulting array of digits.",
    js: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}
// Time: O(n), Space: O(1)`,
    python: `def plus_one(digits):
    """
    Increment from right to left
    Time: O(n)
    Space: O(1)
    """
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    
    return [1] + digits`
  },
  {
    title: "Single Number",
    problem: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    js: `function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}
// Time: O(n), Space: O(1)`,
    python: `def single_number(nums):
    """
    XOR approach
    Time: O(n)
    Space: O(1)
    """
    result = 0
    for num in nums:
        result ^= num
    return result`
  },
  {
    title: "Majority Element",
    problem: "Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.",
    js: `function majorityElement(nums) {
  let candidate = null;
  let count = 0;
  
  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}
// Time: O(n), Space: O(1) - Boyer-Moore Voting Algorithm`,
    python: `def majority_element(nums):
    """
    Boyer-Moore Voting Algorithm
    Time: O(n)
    Space: O(1)
    """
    candidate = None
    count = 0
    
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    
    return candidate`
  },
  {
    title: "Missing Number",
    problem: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    js: `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// Time: O(n), Space: O(1)`,
    python: `def missing_number(nums):
    """
    Sum formula approach
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`
  },
  {
    title: "Find All Numbers Disappeared in an Array",
    problem: "Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all the integers in the range `[1, n]` that do not appear in `nums`.",
    js: `function findDisappearedNumbers(nums) {
  // Mark numbers as negative
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }
  
  // Find positive indices
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }
  return result;
}
// Time: O(n), Space: O(1)`,
    python: `def find_disappeared_numbers(nums):
    """
    Mark indices as negative
    Time: O(n)
    Space: O(1)
    """
    # Mark numbers as negative
    for i in range(len(nums)):
        index = abs(nums[i]) - 1
        if nums[index] > 0:
            nums[index] = -nums[index]
    
    # Find positive indices
    result = []
    for i in range(len(nums)):
        if nums[i] > 0:
            result.append(i + 1)
    
    return result`
  },
  {
    title: "Intersection of Two Arrays",
    problem: "Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.",
    js: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const result = [];
  
  for (let num of set1) {
    if (set2.has(num)) {
      result.push(num);
    }
  }
  return result;
}
// Time: O(n + m), Space: O(n + m)`,
    python: `def intersection(nums1, nums2):
    """
    Set intersection
    Time: O(n + m)
    Space: O(n + m)
    """
    set1 = set(nums1)
    set2 = set(nums2)
    return list(set1 & set2)`
  }
];

// Append to file
let newContent = '\n';
newQuestions.forEach((q, idx) => {
  const questionNum = currentCount + idx + 1;
  newContent += `### ${questionNum}. ${q.title}\n\n`;
  newContent += `**Problem:**\n${q.problem}\n\n`;
  newContent += `**Answer:**\n\n`;
  newContent += `### JavaScript\n\`\`\`javascript\n${q.js}\n\`\`\`\n\n`;
  newContent += `### Python\n\`\`\`python\n${q.python}\n\`\`\`\n\n`;
  newContent += `---\n\n`;
});

fs.appendFileSync(questionsFile, newContent, 'utf8');

const finalCount = (fs.readFileSync(questionsFile, 'utf8').match(/^### \d+\./gm) || []).length;

console.log('='.repeat(80));
console.log('✅ QUESTIONS ADDED - BATCH 1');
console.log('='.repeat(80));
console.log(`\n📊 Questions added: ${newQuestions.length}`);
console.log(`📊 Total questions now: ${finalCount}`);
console.log(`📊 Target: 75 questions (minimum)`);
console.log(`📊 Still need: ${Math.max(0, 75 - finalCount)} more questions\n`);
console.log(`✅ Batch 1 complete! Continue with batch 2 in next chat.\n`);
