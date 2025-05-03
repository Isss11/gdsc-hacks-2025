import { useContext } from "react";
import { RecipesContext } from "../App";
import Recipe from "./Recipe";

const Recipes = () => {
  const { recipes } = useContext(RecipesContext);

  return (
    <div>
      {recipes.map((recipe, index) => (
        <Recipe key={index} details={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
