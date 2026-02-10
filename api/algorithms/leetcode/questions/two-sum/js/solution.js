/**
 * Two Sum - LeetCode 1
 * 
 * Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 */

/**
 * Solution using HashMap
 * Time: O(n)
 * Space: O(n)
 */
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

/**
 * Brute Force Solution
 * Time: O(n²)
 * Space: O(1)
 */
function twoSumBruteForce(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Usage Examples
console.log('Two Sum [2,7,11,15], target=9:', twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log('Two Sum [3,2,4], target=6:', twoSum([3, 2, 4], 6)); // [1, 2]
console.log('Two Sum [3,3], target=6:', twoSum([3, 3], 6)); // [0, 1]

module.exports = { twoSum, twoSumBruteForce };

