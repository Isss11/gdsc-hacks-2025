import { useContext } from "react";
import { RecipesContext } from "../App";
import Recipe from "./Recipe";
import "./recipes.css";

const Recipes = () => {
  const { recipes } = useContext(RecipesContext);

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div id="recipes-list">
      <h3 id="recipes-list-header">Recipes for you</h3>
      {recipes.map((recipe, index) => (
        <Recipe key={index} details={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
