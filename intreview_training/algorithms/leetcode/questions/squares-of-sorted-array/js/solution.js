/**
 * Squares of a Sorted Array - LeetCode 977
 * 
 * Given an integer array nums sorted in non-decreasing order, 
 * return an array of the squares of each number sorted in non-decreasing order.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let idx = nums.length - 1;
  
  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    
    if (leftSquare > rightSquare) {
      result[idx--] = leftSquare;
      left++;
    } else {
      result[idx--] = rightSquare;
      right--;
    }
  }
  
  return result;
}

// Test cases
console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0, 1, 9, 16, 100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); // [4, 9, 9, 49, 121]
