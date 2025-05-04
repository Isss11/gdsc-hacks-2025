import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import { useState, createContext } from "react";

export const RecipesContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <PrimeReactProvider>
          <Header />
          <RecipeGenerationForm />
          <Recipes />
        </PrimeReactProvider>
      </RecipesContext.Provider>
    </div>
  );
};

export default App;
