from fastapi import FastAPI, HTTPException
from app.generate_code import get_llm, get_response, extract_code
from mangum import Mangum

###################
### Definitions ###
###################

MAX_INPUT_LENGTH = 128
this_app = FastAPI()
handler = Mangum(this_app)

#################
### Functions ###
#################

# latest change 2024-08-29 00:07:00


def validate_input_length(prompt: str):
    """
    Validates the length of the input prompt.

    Args:
        prompt (str): The input prompt to be validated.

    Raises:
        HTTPException: If the length of the prompt exceeds the maximum input length.

    Returns:
        None
    """
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )


##################
### End Points ###
##################


@this_app.get("/")
def read_root():
    return {"Hello": "World!"}


@this_app.get("/prompt_to_code")
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
    validate_input_length(prompt)
    llm = get_llm(llm_type=llm)
    response = get_response(llm=llm, user_prompt=prompt)
    code = extract_code(response)
    return {"code": code}
