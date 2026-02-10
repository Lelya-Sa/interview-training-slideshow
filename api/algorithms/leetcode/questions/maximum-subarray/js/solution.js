/**
 * Maximum Subarray (Kadane's Algorithm) - LeetCode 53
 * 
 * Find contiguous subarray with largest sum.
 */

/**
 * Kadane's Algorithm
 * Time: O(n)
 * Space: O(1)
 */
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

// Usage Examples
console.log('Max subarray [-2,1,-3,4,-1,2,1,-5,4]:', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log('Max subarray [1]:', maxSubArray([1])); // 1
console.log('Max subarray [5,4,-1,7,8]:', maxSubArray([5, 4, -1, 7, 8])); // 23

module.exports = maxSubArray;

