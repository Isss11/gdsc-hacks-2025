import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import { useState, createContext } from "react";

export const RecipesContext = createContext([]);
export const OptionsContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientsText, setIngredientsText] = useState([]);

  return (
    <div>
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <OptionsContext.Provider value={{ingredientsText, setIngredientsText}}>
        <PrimeReactProvider>
          <Header />
          <RecipeGenerationForm />
          <Recipes />
        </PrimeReactProvider>
        </OptionsContext.Provider>
      </RecipesContext.Provider>
    </div>
  );
};

export default App;
