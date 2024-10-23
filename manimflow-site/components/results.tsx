import React, { useRef, useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { FaRegCopy } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface ResultsProps {
  prompt: string;
  generatedCode: string;
  onBack: () => void;
}

interface VideoResponse {
  url: string;
}

const Results: React.FC<ResultsProps> = (props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
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

  const generateVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Sending request with code:", props.generatedCode);
      const response = await fetch(
        "https://api.animo.video/v1/video/rendering",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: props.generatedCode,
            file_class: "GenScene",
            project_name: uuidv4(),
          }),
        }
      );

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response body:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to generate video: ${response.status} ${response.statusText}\n${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Invalid response format from server");
      }

      if (data.video_url) {
        console.log("Video URL:", data.video_url);
        setVideoUrl(data.video_url);
      } else {
        console.error("Unexpected response structure:", data);
        throw new Error("No video URL returned in the response");
      }
    } catch (err) {
      console.error("Error details:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`An error occurred while generating the video: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateVideo();
  }, [props.generatedCode]);

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
          title="Copy code to clipboard"
        >
          <FaRegCopy size={14} />
        </button>
      </div>

      <div className="mt-4">
        {loading && <p>Generating video...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {videoUrl && (
          <video controls className="w-full mt-2">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <button className="generic-btn mt-4" onClick={props.onBack}>
        Back
      </button>
    </div>
  );
};

export default Results;
