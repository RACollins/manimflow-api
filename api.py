from typing import Union
from fastapi import FastAPI
from generate_code_openai import get_response_stream, extract_code

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World!"}


@app.get("/prompt_to_code")
async def prompt_to_code_api(prompt: str):
    stream = get_response_stream(prompt=prompt)
    code = extract_code(stream)
    return {"code": code}
