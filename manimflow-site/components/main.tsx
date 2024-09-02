'use client'
import React from "react";
import styles from "../styles/Home.module.css";

const Main: React.FC = () => {
  const ENDPOINT: string =
    "http://127.0.0.1:8000/prompt_to_code";
  const [prompt, setPrompt] = React.useState("");

  const onSubmit = () => {
    console.log("Submitting " + prompt);
    fetch(`${ENDPOINT}?prompt=${prompt}&llm=openai`)
    .then((res) => res.json())
    .then(console.log);
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
    </div>
  )
};

export default Main;