import React from 'react';

interface ResultsProps {
  prompt: string;
  generatedCode: string;
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  return (
    <>
      <p>Manimflow results</p>
      <p>{props.prompt}</p>
      <p>{props.generatedCode}</p>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;