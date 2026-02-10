/**
 * 3Sum - LeetCode 15
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 */

/**
 * Two Pointers Approach
 * Time: O(n²)
 * Space: O(1) excluding output
 */
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b); // Sort array

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left pointer
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // Skip duplicates for right pointer
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: [-1,0,1,2,-1,-4]');
console.log('Output:', JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])));
console.log('Expected: [[-1,-1,2],[-1,0,1]]\n');

console.log('Input: [0,1,1]');
console.log('Output:', JSON.stringify(threeSum([0, 1, 1])));
console.log('Expected: []\n');

console.log('Input: [0,0,0]');
console.log('Output:', JSON.stringify(threeSum([0, 0, 0])));
console.log('Expected: [[0,0,0]]\n');

module.exports = { threeSum };

