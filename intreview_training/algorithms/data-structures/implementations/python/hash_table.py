"""
Hash Table Implementation in Python
Key-value pairs with hash function
Time Complexity: O(1) average, O(n) worst
"""

class HashTable:
    def __init__(self, initial_capacity=16, load_factor=0.75):
        self.buckets = [None] * initial_capacity
        self.capacity = initial_capacity
        self.size = 0
        self.load_factor = load_factor

    def _hash(self, key):
        """Hash function - converts key to index"""
        hash_value = 0
        key_string = str(key)
        
        for char in key_string:
            hash_value = ((hash_value << 5) - hash_value) + ord(char)
            hash_value = hash_value & 0xFFFFFFFF  # Convert to 32-bit integer
        
        return abs(hash_value % self.capacity)

    def set(self, key, value):
        """Insert key-value pair - O(1) average"""
        index = self._hash(key)
        
        if self.buckets[index] is None:
            self.buckets[index] = []

        # Check if key already exists
        bucket = self.buckets[index]
        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket[i][1] = value  # Update existing
                return self

        # Add new key-value pair
        bucket.append([key, value])
        self.size += 1

        # Resize if load factor exceeded
        if self.size / self.capacity > self.load_factor:
            self._resize()

        return self

    def get(self, key):
        """Get value by key - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]

        if bucket is None:
            return None

        for item in bucket:
            if item[0] == key:
                return item[1]

        return None

    def delete(self, key):
        """Delete key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]

        if bucket is None:
            return False

        for i in range(len(bucket)):
            if bucket[i][0] == key:
                bucket.pop(i)
                self.size -= 1
                
                if len(bucket) == 0:
                    self.buckets[index] = None
                
                return True

        return False

    def has(self, key):
        """Check if key exists - O(1) average"""
        return self.get(key) is not None

    def keys(self):
        """Get all keys - O(n)"""
        keys_list = []
        for bucket in self.buckets:
            if bucket:
                for item in bucket:
                    keys_list.append(item[0])
        return keys_list

    def values(self):
        """Get all values - O(n)"""
        values_list = []
        for bucket in self.buckets:
            if bucket:
                for item in bucket:
                    values_list.append(item[1])
        return values_list

    def entries(self):
        """Get all entries - O(n)"""
        entries_list = []
        for bucket in self.buckets:
            if bucket:
                for item in bucket:
                    entries_list.append((item[0], item[1]))
        return entries_list

    def clear(self):
        """Clear hash table - O(n)"""
        self.buckets = [None] * self.capacity
        self.size = 0

    def _resize(self):
        """Resize hash table when load factor exceeded"""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0

        # Rehash all entries
        for bucket in old_buckets:
            if bucket:
                for item in bucket:
                    self.set(item[0], item[1])

    def get_size(self):
        """Get size - O(1)"""
        return self.size

    def is_empty(self):
        """Check if empty - O(1)"""
        return self.size == 0


# Usage Example
if __name__ == "__main__":
    hash_table = HashTable()

    hash_table.set('name', 'John')
    hash_table.set('age', 30)
    hash_table.set('city', 'New York')
    hash_table.set('email', 'john@example.com')

    print('Get name:', hash_table.get('name'))  # 'John'
    print('Has age:', hash_table.has('age'))  # True
    print('Keys:', hash_table.keys())
    print('Values:', hash_table.values())

    hash_table.delete('age')
    print('After delete age:', hash_table.has('age'))  # False
    print('Size:', hash_table.get_size())  # 3

