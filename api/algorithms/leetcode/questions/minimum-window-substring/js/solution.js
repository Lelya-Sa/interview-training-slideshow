/**
 * Minimum Window Substring - LeetCode 76
 *
 * Given two strings s and t, return the minimum window substring of s
 * such that every character in t (including duplicates) is included in the window.
 */

/**
 * Sliding Window Approach
 * Time: O(|s| + |t|)
 * Space: O(|s| + |t|)
 */
function minWindow(s, t) {
  if (s.length < t.length) return '';

  // Count characters in t
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const needCount = need.size; // Number of unique characters needed
  let haveCount = 0; // Number of unique characters we have in current window

  const window = new Map(); // Current window character counts
  let minLen = Infinity;
  let minStart = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Add character to window
    window.set(char, (window.get(char) || 0) + 1);

    // Check if we have enough of this character
    if (need.has(char) && window.get(char) === need.get(char)) {
      haveCount++;
    }

    // Try to shrink window from left
    while (haveCount === needCount) {
      // Update minimum window
      const currentLen = right - left + 1;
      if (currentLen < minLen) {
        minLen = currentLen;
        minStart = left;
      }

      // Remove left character from window
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);

      // Check if we lost a required character
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        haveCount--;
      }

      left++;
    }
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: s = "ADOBECODEBANC", t = "ABC"');
console.log('Output:', minWindow("ADOBECODEBANC", "ABC"));
console.log('Expected: "BANC"\n');

console.log('Input: s = "a", t = "a"');
console.log('Output:', minWindow("a", "a"));
console.log('Expected: "a"\n');

console.log('Input: s = "a", t = "aa"');
console.log('Output:', minWindow("a", "aa"));
console.log('Expected: ""\n');

module.exports = { minWindow };

