from typing import Union
from fastapi import FastAPI
from generate_code import get_llm, get_response, extract_code

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World!"}


@app.get("/prompt_to_code")
async def prompt_to_code_api(prompt: str, llm: str) -> dict:
    """
    Generate code based on a given prompt.

    This function takes a prompt as input, generates a response stream using
    an AI model, and extracts the code from the response.

    Parameters:
    - prompt (str): The input prompt describing the desired code.
    - llm (str): The name of the LLM used to generate the code.

    Returns:
    - dict: A dictionary containing the generated code under the key 'code'.

    Example:
    {
        "code": "def example_function():\n    print('Hello, World!')"
    }
    """
    llm = get_llm(llm_type=llm)
    response = get_response(llm=llm, user_prompt=prompt)
    code = extract_code(response)
    return {"code": code}
