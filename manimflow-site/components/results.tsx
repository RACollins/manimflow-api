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
      <div className="mt-2">
        <Editor
          height="30vh"
          defaultLanguage="python"
          options={{
            fontSize: 14,
            wordWrap: "on",
          }}
          theme="vs-dark"
          defaultValue={props.generatedCode}
        />
      </div>

      <button className="generic-btn" onClick={props.onBack}>
        Back
      </button>
    </>
  );
};

export default Results;
