import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import Upload from "./components/Upload"
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import { useState, createContext } from "react";

export const RecipesContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="App">
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <PrimeReactProvider>
          <Header />
          <RecipeGenerationForm />
          <Recipes />
          <Upload />
        </PrimeReactProvider>
      </RecipesContext.Provider>
    </div>
  );
};

export default App;
