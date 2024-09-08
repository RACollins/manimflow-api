import styles from "../styles/Home.module.css";

interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <p>
        Generate maths videos with the Manim Python library by prompting an AI.
      </p>
      <input
        type="text"
        placeholder="Write prompt here..."
        value={props.prompt}
        onChange={(e) => props.setPrompt(e.currentTarget.value)}
        className={styles.inputtext} // Added CSS class to change text color to black
      ></input>
      <button onClick={props.onSubmit}>Generate</button>
    </>
  );
};

export default Form;