const Ingredients = ({ ingredients }) => {
  return (
    <ul>
      <strong>Ingredients</strong>
      {ingredients.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ul>
  );
};

export default Ingredients;
