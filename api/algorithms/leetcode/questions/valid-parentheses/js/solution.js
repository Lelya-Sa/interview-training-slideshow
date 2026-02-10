/**
 * Valid Parentheses - LeetCode 20
 * 
 * Check if parentheses are valid.
 */

/**
 * Solution using Stack
 * Time: O(n)
 * Space: O(n)
 */
function isValid(s) {
  const stack = [];
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let char of s) {
    if (pairs[char]) {
      // Opening bracket
      stack.push(char);
    } else {
      // Closing bracket
      if (stack.length === 0) {
        return false;
      }
      const last = stack.pop();
      if (pairs[last] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Usage Examples
console.log('Valid "()":', isValid('()')); // true
console.log('Valid "()[]{}":', isValid('()[]{}')); // true
console.log('Valid "(]":', isValid('(]')); // false
console.log('Valid "([)]":', isValid('([)]')); // false

module.exports = isValid;

