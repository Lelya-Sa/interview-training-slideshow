/**
 * Longest Substring Without Repeating Characters - LeetCode 3
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 */

/**
 * Sliding Window Approach
 * Time: O(n)
 * Space: O(min(m, n)) where m is charset size
 */
function lengthOfLongestSubstring(s) {
  if (!s || s.length === 0) return 0;

  const charMap = new Map(); // character -> index
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character exists in current window, move left pointer
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    // Update character's latest index
    charMap.set(char, right);

    // Update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Alternative: Using Set
function lengthOfLongestSubstringSet(s) {
  if (!s || s.length === 0) return 0;

  const charSet = new Set();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window until no duplicate
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: "abcabcbb"');
console.log('Output:', lengthOfLongestSubstring("abcabcbb")); // 3
console.log('Expected: 3\n');

console.log('Input: "bbbbb"');
console.log('Output:', lengthOfLongestSubstring("bbbbb")); // 1
console.log('Expected: 1\n');

console.log('Input: "pwwkew"');
console.log('Output:', lengthOfLongestSubstring("pwwkew")); // 3
console.log('Expected: 3\n');

console.log('Input: ""');
console.log('Output:', lengthOfLongestSubstring("")); // 0
console.log('Expected: 0\n');

console.log('Input: "dvdf"');
console.log('Output:', lengthOfLongestSubstring("dvdf")); // 3
console.log('Expected: 3\n');

module.exports = { lengthOfLongestSubstring, lengthOfLongestSubstringSet };

