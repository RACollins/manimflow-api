'use client'
import React from "react";

const Main: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  
  const onSubmit = () => {
    console.log("Submitting " + prompt);
  }

  return (
    <div>
      <h1>Manim Flow</h1>
      <p>
        Generate maths videos with the Manim Python library by prompting an AI.
      </p>
      <input
        type="text"
        placeholder="Enter prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
      ></input>
      <button onClick={onSubmit}>Generate</button>
    </div>
  )
};

export default Main;