import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import "./recipe-generation-form.css";

const RecipeGenerationForm = () => {
  const [culturesText, setCulturesText] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [cultures, setCultures] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const generateRecipes = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8000/recipe`;
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, settings);
      const data = await response.json();

      console.log(response, data);
    } catch (error) {
      console.log(
        `An error occurred while trying to generate the recipes: ${error}`
      );
    }
  };

  useEffect(() => {
    try {
      setCultures(culturesText.split(","));
    } catch (e) {
      console.log("Did not update cultures.");
    }
  }, [culturesText]);

  useEffect(() => {
    try {
      setIngredients(ingredientsText.split(","));
    } catch (e) {
      console.log("Did not update ingredients.");
    }
  }, [ingredientsText]);

  return (
    <form id="recipe-form">
      <InputText
        placeholder="Korean, Chinese, etc."
        value={culturesText}
        onChange={(e) => setCulturesText(e.target.value)}
      />
      <InputText
        placeholder="apple, roast chicken, pizza, etc."
        value={ingredientsText}
        onChange={(e) => setIngredientsText(e.target.value)}
      />
      <Button
        label="Generate Recipes"
        severity="Primary"
        onClick={generateRecipes}
      />
    </form>
  );
};

export default RecipeGenerationForm;
