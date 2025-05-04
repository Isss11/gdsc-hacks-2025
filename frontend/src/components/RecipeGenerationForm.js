import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { useState, useEffect, useContext } from "react";
import "./recipe-generation-form.css";
import { nationalities } from "./utils";
import { RecipesContext } from "../App";
import Upload from "./Upload";

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
      <div id="recipe-form-panel">
        <div id="recipe-form-inputs">
          <h3>Recipe Details</h3>
          <div id="leftover-food-inputs">
            <div class="labeled-inputs">
              <label>Leftover food</label>
              <InputTextarea
                placeholder="Enter food by text"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                cols={50}
              />
            </div>
            <Upload />
          </div>
          <div className="labeled-inputs">
            <label>Cultures</label>
            <MultiSelect
              filter
              options={nationalities}
              value={cultures}
              onChange={(e) => setCultures(e.value)}
              optionLabel="name"
              maxSelectedLabels={5}
              display="chip"
              placeholder="Select recipe cultures"
            />
          </div>
          <Button
            label="Generate Recipes"
            severity="success"
            onClick={generateRecipes}
          />
        </div>
      </div>
    </form>
  );
};

export default RecipeGenerationForm;
