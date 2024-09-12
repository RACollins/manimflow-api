"use client";
import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/manimflowlogo.svg";

const Main: React.FC = () => {
  const CHARACTER_LIMIT = 128;
  const ENDPOINT: string =
    process.env.NEXT_PUBLIC_PROMPT_TO_CODE_API_ENDPOINT || "";
  const [prompt, setPrompt] = React.useState("");
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}&llm=openai`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response");
        }
        return response.json();
      })
      .then(onResult)
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const onResult = (data: any) => {
    setGeneratedCode(data.code);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results prompt={prompt} generatedCode={generatedCode} onBack={onReset} />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-50 font-light w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-700 p-6 rounded-lg text-white">
          <div className="text-center mb-6">
            <Image src={logo} alt="Manimflow logo" />
            <h1 className={gradientTextStyle + " text-3xl"}>
              AI Animation Assistant
            </h1>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Main;
