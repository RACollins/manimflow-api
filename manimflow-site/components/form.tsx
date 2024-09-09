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

  return (
    <>
      <p>
        Generate maths videos with the Manim Python library by prompting an AI.
      </p>
      <input
        type="text"
        placeholder="Write prompt here..."
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
        className={styles.inputtext} // Added CSS class to change text color to black
      ></input>
      <div>{props.prompt.length}/{props.characterLimit}</div>
      <button onClick={props.onSubmit} disabled={props.isLoading || !isPromptvalid}>
        Generate
      </button>
    </>
  );
};

export default Form;