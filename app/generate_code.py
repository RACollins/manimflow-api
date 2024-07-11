import os
import re
import argparse
import uuid
from typing import Any


from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.output_parsers import StrOutputParser

###################
### Definitions ###
###################

MAX_INPUT_LENGTH = 128
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


def get_llm(llm_type: str) -> Any:
    if llm_type == "openai":
        return ChatOpenAI(model="gpt-3.5-turbo", temperature=0.2)
    elif llm_type == "anthropic":
        return ChatAnthropic(model="claude-3-5-sonnet-20240620", temperature=0.2)
    else:
        raise ValueError(f"Unsupported LLM type: {llm_type}")


def get_response(llm: Any, user_prompt: str) -> str:
    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", GENERAL_SYSTEM_PROMPT),
            (
                "user",
                "Write Manim code which satisfies the following requirements: {user_prompt}",
            ),
        ]
    )
    parser = StrOutputParser()
    chain = prompt_template | llm | parser
    return chain.invoke({"user_prompt": user_prompt})


def extract_code(response: str) -> str:
    pattern = r"```python(.*?)```"
    code = re.findall(pattern, response, re.DOTALL)[0].strip()
    return code


def write_code_to_file(code: str) -> str:
    filename = f"manimflow_{uuid.uuid4().hex}"
    with open(f"{filename}.py", "w+") as file:
        file.write(code)
    return filename


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    parser.add_argument(
        "--llm", type=str, default="openai", choices=["openai", "anthropic"]
    )
    args = parser.parse_args()
    user_prompt = args.input
    llm_type = args.llm
    print(f"User prompt: {user_prompt}")
    print(f"Using LLM: {llm_type}")

    if validate_length(user_prompt):
        llm = get_llm(llm_type)
        response = get_response(llm=llm, user_prompt=user_prompt)
        code = extract_code(response)
        filename = write_code_to_file(code)
        print(f"Code written to {filename}.py")
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_prompt}"
        )


if __name__ == "__main__":
    main()
