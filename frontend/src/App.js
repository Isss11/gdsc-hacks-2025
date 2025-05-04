import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe"
import Header from "./components/Header";
import { useState, createContext, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

export const RecipesContext = createContext([]);
export const OptionsContext = createContext([]);

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientsText, setIngredientsText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDownloadPDF, setRecipeDownloadPDF] = useState(null)
  const [details, setDetails] = useState(null)
  const toast = useRef(null);

  const showUploadSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const toastError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${error}`,
      life: 3000,
    });
  };

  const isPDF = window.location.toString().includes("download-recipe-pdf")

  useEffect(() => {
      const details = JSON.parse(localStorage.getItem("details"));
      if (details) {
        setDetails(details);
      }
  }, []);


  
  return (
    <>
      {isPDF ? (details ? <Recipe details={details} /> : "Nothing to show") :
      <div>
      {isLoading && <ProgressSpinner id="spinner" />}
      <Toast ref={toast} />
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <OptionsContext.Provider
          value={{
            ingredientsText,
            setIngredientsText,
            showUploadSuccess,
            toastError,
            setIsLoading,
            recipeDownloadPDF, 
            setRecipeDownloadPDF
          }}
        >
          <PrimeReactProvider>
            <Header />
            <RecipeGenerationForm />
            <Recipes />
          </PrimeReactProvider>
        </OptionsContext.Provider>
      </RecipesContext.Provider>
    </div>}
    </>
    
  );
};

export default App;
