'use client'
import React from "react";
import styles from "../styles/Home.module.css";

const Main: React.FC = () => {
  const ENDPOINT: string =
    "http://localhost:3000";
  const [prompt, setPrompt] = React.useState("");
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting " + prompt);
    fetch(`${ENDPOINT}?prompt=${prompt}&llm=openai`)
      .then((res) => res.json())
      .then(onResult);
  }

  const onResult = (data: any) => {
    setGeneratedCode(data.code);
    setHasResult(true);
  }

  let resultsElement = null;

  if (hasResult) {
    resultsElement = (
      <div>
        {generatedCode}
      </div>
    );
  }

  return (
    <div>
      <h1>Manim Flow</h1>
      <p>
        Generate maths videos with the Manim Python library by prompting an AI.
      </p>
      <input
        type="text"
        placeholder="Write prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        className={styles.inputtext} // Added CSS class to change text color to black
      ></input>
      <button onClick={onSubmit}>Generate</button>
      {resultsElement}
    </div>
  )
};

export default Main;