/**
 * Group Anagrams - LeetCode 49
 *
 * Given an array of strings strs, group the anagrams together.
 */

/**
 * Method 1: Sorting as Key
 * Time: O(n * k log k) where n is number of strings, k is average length
 * Space: O(n * k)
 */
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sort string to get canonical form
    const sorted = str.split('').sort().join('');
    
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }

  return Array.from(map.values());
}

/**
 * Method 2: Character Count as Key (more efficient for longer strings)
 * Time: O(n * k)
 * Space: O(n * k)
 */
function groupAnagramsCount(strs) {
  const map = new Map();

  for (const str of strs) {
    // Create character count array
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    // Use count array as key (convert to string)
    const key = count.join(',');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: ["eat","tea","tan","ate","nat","bat"]');
console.log('Output:', JSON.stringify(groupAnagrams(["eat","tea","tan","ate","nat","bat"])));
console.log('Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]\n');

console.log('Input: [""]');
console.log('Output:', JSON.stringify(groupAnagrams([""])));
console.log('Expected: [[""]]\n');

console.log('Input: ["a"]');
console.log('Output:', JSON.stringify(groupAnagrams(["a"])));
console.log('Expected: [["a"]]\n');

module.exports = { groupAnagrams, groupAnagramsCount };

