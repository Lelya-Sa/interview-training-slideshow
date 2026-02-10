/**
 * Container With Most Water - LeetCode 11
 *
 * Find two lines that together with the x-axis form a container,
 * such that the container contains the most water.
 */

/**
 * Two Pointers Approach
 * Time: O(n)
 * Space: O(1)
 */
function maxArea(height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;
    maxWater = Math.max(maxWater, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: [1,8,6,2,5,4,8,3,7]');
console.log('Output:', maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log('Expected: 49\n');

console.log('Input: [1,1]');
console.log('Output:', maxArea([1, 1]));
console.log('Expected: 1\n');

console.log('Input: [1,2,1]');
console.log('Output:', maxArea([1, 2, 1]));
console.log('Expected: 2\n');

module.exports = { maxArea };

