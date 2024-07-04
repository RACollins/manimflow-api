import os
import re


def multiply_three_numbers(a, b, c):
    result = a * b * c
    return result


def main():
    a = 1
    b = 2
    c = 3
    d = multiply_three_numbers(a, b, c)
    print(d)


if __name__ == "__main__":
    main()
