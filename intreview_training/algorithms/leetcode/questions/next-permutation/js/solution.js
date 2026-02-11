/**
 * Next Permutation - LeetCode 31
 * 
 * Implement next permutation, which rearranges numbers into the 
 * lexicographically next greater permutation of numbers.
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  // Step 1: Find the largest index i where nums[i] < nums[i+1]
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  
  // Step 2: If such index exists, find the largest index j where j > i and nums[j] > nums[i]
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Swap nums[i] and nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  
  // Step 3: Reverse the suffix starting at i+1
  reverse(nums, i + 1);
}

function reverse(nums, start) {
  let end = nums.length - 1;
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

// Test cases
let nums1 = [1, 2, 3];
nextPermutation(nums1);
console.log(nums1); // [1, 3, 2]

let nums2 = [3, 2, 1];
nextPermutation(nums2);
console.log(nums2); // [1, 2, 3]

let nums3 = [1, 1, 5];
nextPermutation(nums3);
console.log(nums3); // [1, 5, 1]
