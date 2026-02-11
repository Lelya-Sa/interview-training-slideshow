import math


def is_primary_num(num: int) -> bool:
    if num <= 1 or num - math.floor(num) != 0:
        return False

    for divisor in range(2, math.floor(math.sqrt(num)) + 1):
        if num % divisor == 0:  # the number is divided without remainder
            return False

    return True


print(is_primary_num(7))