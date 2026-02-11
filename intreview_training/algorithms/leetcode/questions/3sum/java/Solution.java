import java.util.*;

/**
 * 3Sum - LeetCode 15
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 */
public class Solution {
    /**
     * Two Pointers Approach
     * Time: O(n²)
     * Space: O(1) excluding output
     */
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums); // Sort array

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicates for first number
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                    // Skip duplicates for left pointer
                    while (left < right && nums[left] == nums[left + 1]) {
                        left++;
                    }
                    // Skip duplicates for right pointer
                    while (left < right && nums[right] == nums[right - 1]) {
                        right--;
                    }

                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println("=== Test Cases ===");
        System.out.println("Input: [-1,0,1,2,-1,-4]");
        int[] input1 = {-1, 0, 1, 2, -1, -4};
        System.out.println("Output: " + solution.threeSum(input1));
        System.out.println("Expected: [[-1, -1, 2], [-1, 0, 1]]\n");

        System.out.println("Input: [0,1,1]");
        int[] input2 = {0, 1, 1};
        System.out.println("Output: " + solution.threeSum(input2));
        System.out.println("Expected: []\n");

        System.out.println("Input: [0,0,0]");
        int[] input3 = {0, 0, 0};
        System.out.println("Output: " + solution.threeSum(input3));
        System.out.println("Expected: [[0, 0, 0]]\n");
    }
}

