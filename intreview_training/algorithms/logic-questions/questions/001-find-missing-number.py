# # Find Missing Number in Array

# ## Problem
# Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

# ## Examples
# ```
# Input: [3, 0, 1]
# Output: 2

# Input: [9, 6, 4, 2, 3, 5, 7, 0, 1]
# Output: 8

# Input: [0, 1]
# Output: 2
# ```



# ## Solution

def find_missing_number_sorted_approach(nums):
    """
    Time Complexity: O(n log n) - due to sorting
    Space Complexity: O(n) - sorted() creates a new list
    """
    sorted_nums = sorted(nums)
    counter = 0
    for num in sorted_nums:

        if num != counter:
            return counter
        counter += 1

    return counter

def find_missing_number_sum_approach(nums):
    """
    Time Complexity: O(n) - single pass to sum array, O(1) for formula calculation
    Space Complexity: O(1) - only using constant extra space
    """
    sum_of_numbers = sum(nums)
    num_len= len(nums)
    expected_sum = num_len * (num_len + 1) // 2
    # print("------------- in sum approach: ")
    # print("expected_sum: ",expected_sum)
    # print("sum_of_numbers: ",sum_of_numbers)
    # print('------------- end sum approach')
    return expected_sum - sum_of_numbers

def find_missing_number_xor_approach(nums):
    """
    XOR Approach: XOR all expected numbers (0 to n) with all actual numbers.
    Pairs cancel out, leaving only the missing number.
    
    Key insight: a ^ a = 0, so numbers that appear in both cancel out.
    
    Time Complexity: O(n) - single pass through array
    Space Complexity: O(1) - only using constant extra space (one variable)
    """
    n = len(nums)
    missing = n  # Start with n (since we expect numbers 0, 1, 2, ..., n)
    
    # XOR with all indices (expected numbers) and array values (actual numbers)
    for i in range(n):
        missing ^= i        # XOR with expected number i
        missing ^= nums[i]  # XOR with actual number from array
    
    return missing

# Example walkthrough for [3, 0, 1]:
# Initial: missing = 3
# i=0: missing = 3 ^ 0 ^ 3 = 0
# i=1: missing = 0 ^ 1 ^ 0 = 1  
# i=2: missing = 1 ^ 2 ^ 1 = 2
# Result: 2 ✅


input_array_example_1 = [3, 0, 1]
print("exaxple 1: ",input_array_example_1)
print("sum approach: ",find_missing_number_sum_approach(input_array_example_1))
print("xor approach: ",find_missing_number_xor_approach(input_array_example_1))
print("sorted approach: ",find_missing_number_sorted_approach(input_array_example_1))


print("--------------------------------")
input_array_example_2 = [9, 6, 4, 2, 3, 5, 7, 1, 8]
print("exaxple 2: ",input_array_example_2)
print("sum approach: ",find_missing_number_sum_approach(input_array_example_2))
print("xor approach: ",find_missing_number_xor_approach(input_array_example_2))
print("sorted approach: ",find_missing_number_sorted_approach(input_array_example_2))


print("--------------------------------")
input_array_example_3 = [0, 1]  
print("exaxple 3: ",input_array_example_3)
print("sum approach: ",find_missing_number_sum_approach(input_array_example_3))
print("xor approach: ",find_missing_number_xor_approach(input_array_example_3))
print("sorted approach: ",find_missing_number_sorted_approach(input_array_example_3))
