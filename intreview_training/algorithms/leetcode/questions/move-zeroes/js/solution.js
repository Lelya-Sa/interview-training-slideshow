/**
 * Move Zeroes - LeetCode 283
 * 
 * Given an integer array nums, move all 0's to the end of it 
 * while maintaining the relative order of the non-zero elements.
 * 
 * Note: You must do this in-place without making a copy of the array.
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
  let insertPos = 0;
  
  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }
  
  // Fill remaining positions with zeros
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
}

// Test cases
const nums1 = [0, 1, 0, 3, 12];
moveZeroes(nums1);
console.log(nums1); // [1, 3, 12, 0, 0]

const nums2 = [0];
moveZeroes(nums2);
console.log(nums2); // [0]

const nums3 = [0, 0, 1];
moveZeroes(nums3);
console.log(nums3); // [1, 0, 0]
