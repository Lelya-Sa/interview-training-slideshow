/**
 * Contains Duplicate - LeetCode 217
 * 
 * Check if array contains duplicates.
 */

/**
 * Solution using Set
 * Time: O(n)
 * Space: O(n)
 */
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

/**
 * Solution using HashMap
 * Time: O(n)
 * Space: O(n)
 */
function containsDuplicateMap(nums) {
  const seen = new Set();
  
  for (let num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
}

// Usage Examples
console.log('Contains duplicate [1,2,3,1]:', containsDuplicate([1, 2, 3, 1])); // true
console.log('Contains duplicate [1,2,3,4]:', containsDuplicate([1, 2, 3, 4])); // false

module.exports = { containsDuplicate, containsDuplicateMap };

