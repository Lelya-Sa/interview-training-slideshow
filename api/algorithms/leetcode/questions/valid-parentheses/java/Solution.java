/**
 * Valid Parentheses - LeetCode 20
 * 
 * Check if parentheses are valid.
 */
import java.util.*;

public class Solution {
    /**
     * Solution using Stack
     * Time: O(n)
     * Space: O(n)
     */
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put('(', ')');
        pairs.put('{', '}');
        pairs.put('[', ']');
        
        for (char c : s.toCharArray()) {
            if (pairs.containsKey(c)) {
                // Opening bracket
                stack.push(c);
            } else {
                // Closing bracket
                if (stack.isEmpty()) {
                    return false;
                }
                char last = stack.pop();
                if (pairs.get(last) != c) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }

    // Usage Example
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println("Valid '()': " + solution.isValid("()")); // true
        System.out.println("Valid '()[]{}': " + solution.isValid("()[]{}")); // true
        System.out.println("Valid '(]': " + solution.isValid("(]")); // false
    }
}

