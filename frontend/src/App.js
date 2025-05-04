import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import { useState, createContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

export const RecipesContext = createContext([]);
export const OptionsContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientsText, setIngredientsText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);

  const showUploadSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Image upload succeeded.",
      life: 3000,
    });
  };

  const showUploadError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${error}`,
      life: 3000,
    });
  };

  return (
    <div>
      {isLoading && <ProgressSpinner id="spinner" />}
      <Toast ref={toast} />
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <OptionsContext.Provider
          value={{
            ingredientsText,
            setIngredientsText,
            showUploadSuccess,
            showUploadError,
            setIsLoading,
          }}
        >
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
