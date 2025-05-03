import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState, useEffect, useContext } from "react";
import "./recipe-generation-form.css";
import { nationalities } from "./utils";
import { RecipesContext } from "../App";

const RecipeGenerationForm = () => {
  const [ingredientsText, setIngredientsText] = useState("");
  const [cultures, setCultures] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const { setRecipes } = useContext(RecipesContext);

  const generateRecipes = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8000/recipe`;
    const body = {
      cultures: cultures.map((culture) => culture.name),
      ingredients: ingredients,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, settings);
      const data = await response.json();

      setRecipes(data["recipes"]);
    } catch (error) {
      console.log(
        `An error occurred while trying to generate the recipes: ${error}`
      );
    }
  };

  useEffect(() => {
    try {
      setIngredients(ingredientsText.split(","));
    } catch (e) {
      console.log("Did not update ingredients.");
    }
  }, [ingredientsText]);

  return (
    <form id="recipe-form">
      <MultiSelect
        filter
        options={nationalities}
        value={cultures}
        onChange={(e) => setCultures(e.value)}
        optionLabel="name"
        maxSelectedLabels={5}
        display="chip"
      />
      <InputText
        placeholder="Apple, Roast chicken, Pizza, etc."
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
