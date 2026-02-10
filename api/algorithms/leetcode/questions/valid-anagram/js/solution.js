/**
 * Valid Anagram - LeetCode 242
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */

/**
 * Method 1: Character Frequency Count
 * Time: O(n)
 * Space: O(1) - fixed size for 26 letters
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCount = new Array(26).fill(0);

  // Count characters in s
  for (let i = 0; i < s.length; i++) {
    charCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  // Decrement for characters in t
  for (let i = 0; i < t.length; i++) {
    const index = t.charCodeAt(i) - 'a'.charCodeAt(0);
    charCount[index]--;
    if (charCount[index] < 0) return false;
  }

  return true;
}

/**
 * Method 2: Using HashMap (works for Unicode)
 * Time: O(n)
 * Space: O(k) where k is unique characters
 */
function isAnagramHashMap(s, t) {
  if (s.length !== t.length) return false;

  const charMap = new Map();

  // Count characters in s
  for (const char of s) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  // Decrement for characters in t
  for (const char of t) {
    if (!charMap.has(char) || charMap.get(char) === 0) {
      return false;
    }
    charMap.set(char, charMap.get(char) - 1);
  }

  return true;
}

/**
 * Method 3: Sorting
 * Time: O(n log n)
 * Space: O(1) or O(n) depending on sorting implementation
 */
function isAnagramSort(s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}

// Test cases
console.log('=== Test Cases ===');
console.log('Input: s = "anagram", t = "nagaram"');
console.log('Output:', isAnagram("anagram", "nagaram")); // true
console.log('Expected: true\n');

console.log('Input: s = "rat", t = "car"');
console.log('Output:', isAnagram("rat", "car")); // false
console.log('Expected: false\n');

console.log('Input: s = "listen", t = "silent"');
console.log('Output:', isAnagram("listen", "silent")); // true
console.log('Expected: true\n');

module.exports = { isAnagram, isAnagramHashMap, isAnagramSort };

