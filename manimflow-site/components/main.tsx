'use client'
import React from "react";
import Form from "./form";
import Results from "./results";

const Main: React.FC = () => {
  const ENDPOINT: string =
    "http://localhost:3000";
  const [prompt, setPrompt] = React.useState("");
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting " + prompt);
    fetch(`${ENDPOINT}?prompt=${prompt}&llm=openai`)
      .then((response) => response.json())
      .then(onResult)
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  const onResult = (data: any) => {
    setGeneratedCode(data.code);
    setHasResult(true);
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
        isLoading={false}
        characterLimit={100} />
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