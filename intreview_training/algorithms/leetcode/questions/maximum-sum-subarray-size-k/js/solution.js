/**
 * Maximum Sum Subarray of Size K - Sliding Window
 * 
 * Given an array of integers nums and an integer k, 
 * find the maximum sum of any contiguous subarray of size k.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxSumSubarray(nums, k) {
  if (nums.length < k) return 0;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  
  let maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Test cases
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2)); // 7
