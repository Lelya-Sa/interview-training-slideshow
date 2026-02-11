/**
 * Minimum Size Subarray Sum - LeetCode 209
 * 
 * Given an array of positive integers nums and a positive integer target, 
 * return the minimal length of a contiguous subarray whose sum is greater 
 * than or equal to target. If there is no such subarray, return 0.
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target, nums) {
  let minLen = Infinity;
  let windowSum = 0;
  let left = 0;
  
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    
    // Shrink window while sum >= target
    while (windowSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      windowSum -= nums[left];
      left++;
    }
  }
  
  return minLen === Infinity ? 0 : minLen;
}

// Test cases
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
console.log(minSubArrayLen(4, [1, 4, 4])); // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); // 0
