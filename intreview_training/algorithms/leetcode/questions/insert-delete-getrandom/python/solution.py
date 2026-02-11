"""
Insert Delete GetRandom O(1) - LeetCode 380

Design a data structure that supports all following operations in average O(1) time.
- insert(val): Inserts an item val to the set if not already present.
- remove(val): Removes an item val from the set if present.
- getRandom(): Returns a random element from current set of elements.
"""

import random

class RandomizedSet:
    def __init__(self):
        self.map = {}      # value -> index
        self.array = []    # actual values

    def insert(self, val):
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        Time: O(1) average
        """
        if val in self.map:
            return False

        # Add to array and store index in map
        self.array.append(val)
        self.map[val] = len(self.array) - 1
        return True

    def remove(self, val):
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        Time: O(1) average
        """
        if val not in self.map:
            return False

        index_to_remove = self.map[val]
        last_element = self.array[-1]

        # Swap element to remove with last element
        self.array[index_to_remove] = last_element
        self.map[last_element] = index_to_remove

        # Remove last element (which is now the element we wanted to remove)
        self.array.pop()
        del self.map[val]

        return True

    def getRandom(self):
        """
        Get a random element from the set.
        Time: O(1)
        """
        return random.choice(self.array)

    def size(self):
        """Get size of set"""
        return len(self.array)


# Usage Example
if __name__ == "__main__":
    random_set = RandomizedSet()

    print('Insert 1:', random_set.insert(1))  # True
    print('Insert 2:', random_set.insert(2))  # True
    print('Insert 3:', random_set.insert(3))  # True
    print('Size:', random_set.size())  # 3

    print('Remove 2:', random_set.remove(2))  # True
    print('Size after remove:', random_set.size())  # 2

    print('Get random (multiple times):')
    for i in range(5):
        print(f'  Random {i + 1}:', random_set.getRandom())

    print('Insert 2 again:', random_set.insert(2))  # True
    print('Remove 1:', random_set.remove(1))  # True
    print('Get random:', random_set.getRandom())  # Should be 2 or 3

