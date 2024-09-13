import React from "react";
import Editor from "@monaco-editor/react";

interface ResultsProps {
  prompt: string;
  generatedCode: string;
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  return (
    <>
      <p>Prompt</p>
      <div className="bg-white p-2 w-full rounded-md text-slate-700 my-3">
        {props.prompt}
      </div>
      <Editor
        height="20vh"
        defaultLanguage="python"
        defaultValue={props.generatedCode}
      />
      <button className="generic-btn" onClick={props.onBack}>
        Back
      </button>
    </>
  );
};

export default Results;
