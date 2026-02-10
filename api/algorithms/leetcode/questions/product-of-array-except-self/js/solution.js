/**
 * Product of Array Except Self - LeetCode 238
 * 
 * Return array where each element is product of all other elements.
 */

/**
 * Two-pass solution
 * Time: O(n)
 * Space: O(1) excluding output array
 */
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);
  
  // First pass: left products
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }
  
  // Second pass: right products
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }
  
  return result;
}

// Usage Examples
console.log('Product except self [1,2,3,4]:', productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
console.log('Product except self [-1,1,0,-3,3]:', productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]

module.exports = productExceptSelf;

