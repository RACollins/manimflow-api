### Function to find roots of quadratic equation given coefficients a, b, c

from typing import Tuple


def find_roots(a: float, b: float, c: float) -> Tuple[float, float]:
    """
    Find the roots of a quadratic equation given the coefficients a, b, and c.

    Args:
        a (float): The coefficient of x^2.
        b (float): The coefficient of x.
        c (float): The constant term.

    Returns:
        Tuple[float, float]: A tuple containing the roots of the quadratic equation.
    """
    discriminant = b ** 2 - 4 * a * c
    root1 = (-b + discriminant ** 0.5) / (2 * a)
    root2 = (-b - discriminant ** 0.5) / (2 * a)
    return root1, root2

# Test the function with some example coefficients
a = 1
b = -3
c = 2

root1, root2 = find_roots(a, b, c)
print(f"Root 1: {root1}, Root 2: {root2}")
