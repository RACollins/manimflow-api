'use client'
import React from "react";
import Form from "./form";
import Results from "./results";

const Main: React.FC = () => {
  const CHARACTER_LIMIT = 128;
  const ENDPOINT: string = process.env.NEXT_PUBLIC_PROMPT_TO_CODE_API_ENDPOINT || "";
  const [prompt, setPrompt] = React.useState("");
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}&llm=anthropic`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(onResult)
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }

  const onResult = (data: any) => {
    setGeneratedCode(data.code);
    setHasResult(true);
    setIsLoading(false);
  }

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results
        prompt={prompt}
        generatedCode={generatedCode}
        onBack={onReset} />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT} />
    );
  }

  return (
    <div>
      <h1>Manimflow</h1>
      {displayedElement}
    </div>
  )
};

export default Main;