import os
import re
import json
from openai import OpenAI
import argparse
from pprint import pprint
import uuid

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


def get_response_stream(prompt: str) -> str:
    stream = client.chat.completions.create(
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
    return stream


def extract_code(stream: str) -> str:
    ### Regular expression pattern to find code blocks surrounded by triple backticks
    pattern = r"```python(.*?)```"
    code_raw = stream.choices[0].message.content
    ### Using re.DOTALL to make the dot match newlines as well
    code = re.findall(pattern, code_raw, re.DOTALL)[0].strip()
    return code


def write_code_to_file(code: str) -> str:
    filename = f"manimflow_{uuid.uuid4().hex[:8]}"
    with open(f"{filename}.py", "w+") as file:
        file.write(code)
    return filename


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")

    if validate_length(user_input):
        stream = get_response_stream(prompt=user_input)
        code = extract_code(stream)
        filename = write_code_to_file(code)
        print(f"Code written to {filename}.py")
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}"
        )


if __name__ == "__main__":
    main()
