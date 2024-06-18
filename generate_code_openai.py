import os
from openai import OpenAI
import argparse
from pprint import pprint

###################
### Definitions ###
###################

MAX_INPUT_LENGTH = 128
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
GENERAL_SYSTEM_PROMPT = """
You are an AI assistant that writes Python code using the Manim library.
Manim is a mathematical animation engine that is used to create videos programmatically.
The following is an example of Manim code:

---
from manim import *
from math import *

class GenScene(Scene):
def construct(self):
    c = Circle(color=BLUE)
    self.play(Create(c))
---

# Rules
1. Always use GenScene as the class name.
2. Always use self.play() to play the animation.
4. Do not explain the code.
    """

#################
### Functions ###
#################


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_code(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": f"{GENERAL_SYSTEM_PROMPT}",
            },
            {
                "role": "user",
                "content": f"Write Manim code which satisfies the following requirements: {prompt}",
            },
        ],
        temperature=0.2,
    )
    return response


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")

    if validate_length(user_input):
        response = generate_code(prompt=user_input)
        pprint(response)
        code = response.choices[0].message.content
        pprint(code)

        """f = open("temporary.txt","w+")
        f.write(code)
        f.close()"""
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}"
        )


if __name__ == "__main__":
    main()
