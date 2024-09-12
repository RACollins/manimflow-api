import styles from "../styles/Home.module.css";

interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptvalid = props.prompt.length < props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = "text-slate-400";
  let statusText = null;
  if (!isPromptvalid) {
    statusColor = "text-red-500";
    statusText = `Input must be less than ${props.characterLimit} characters.`;
  }

  return (
    <>
      <div className="mb-6 text-slate-300">
        <p>
          Generate maths videos with the Manim Python library by prompting an
          AI.
        </p>
      </div>

      <input
        className="p-2 w-full rounded-md focus:outline-teal-400 text-slate-700"
        type="text"
        placeholder="Write prompt here..."
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.characterLimit}
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-teal-400 
        to-teal-50 disabled:opacity-50 w-full p-2 
        rounded-md text-lg text-slate-500"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptvalid}
      >
        Generate
      </button>
    </>
  );
};

export default Form;
