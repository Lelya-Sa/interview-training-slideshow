/**
 * Subarray Sum Equals K - LeetCode 560
 * 
 * Given an array of integers nums and an integer k, 
 * return the total number of subarrays whose sum equals to k.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1); // Initialize with sum 0 having count 1
  let sum = 0;
  let count = 0;
  
  for (let num of nums) {
    sum += num;
    
    // Check if (sum - k) exists, meaning we found a subarray
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
    
    // Update map with current sum
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  
  return count;
}

// Test cases
console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(subarraySum([1, 2, 3], 3)); // 2
console.log(subarraySum([1, -1, 0], 0)); // 3
