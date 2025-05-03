import { Button } from "primereact/button";

const RecipeGenerationForm = () => {
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

  return (
    <form>
      <Button
        label="Generate Recipes"
        severity="Primary"
        onClick={generateRecipes}
      />
    </form>
  );
};

export default RecipeGenerationForm;
