import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { FaRegCopy } from "react-icons/fa";
import { editor } from "monaco-editor";

interface ResultsProps {
  prompt: string;
  generatedCode: string;
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCopy = () => {
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      navigator.clipboard
        .writeText(content)
        .then(() => {
          alert("Code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="relative">
      <p>Prompt</p>
      <div className="bg-white p-2 w-full rounded-md text-slate-700 my-3">
        {props.prompt}
      </div>
      <div className="mt-2 relative">
        <Editor
          height="30vh"
          defaultLanguage="python"
          options={{
            fontSize: 14,
            wordWrap: "on",
          }}
          theme="vs-dark"
          defaultValue={props.generatedCode}
          onMount={handleEditorDidMount}
        />
        <button
          className="absolute bottom-2 right-5 z-10 bg-opacity-0 text-slate-300 p-1 rounded-md hover:bg-teal-100 hover:text-slate-600 transition-colors"
          onClick={handleCopy}
          title="Copy code"
        >
          <FaRegCopy size={14} />
        </button>
      </div>

      <button className="generic-btn" onClick={props.onBack}>
        Back
      </button>
    </div>
  );
};

export default Results;
