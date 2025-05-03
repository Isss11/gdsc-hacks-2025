const Instructions = ({ steps }) => {
  return (
    <ol>
      <strong>Instructions</strong>
      {steps.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  );
};

export default Instructions;
