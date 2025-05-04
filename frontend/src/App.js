import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import { useState, createContext, useRef } from "react";
import { Toast } from "primereact/toast";

export const RecipesContext = createContext([]);
export const OptionsContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientsText, setIngredientsText] = useState([]);
  const toast = useRef(null);

  const showUploadSuccess = () => {
    console.log("SHOWING");

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
      <Toast ref={toast} />
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <OptionsContext.Provider
          value={{
            ingredientsText,
            setIngredientsText,
            showUploadSuccess,
            showUploadError,
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
