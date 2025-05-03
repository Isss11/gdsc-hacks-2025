import { PrimeReactProvider } from "primereact/api";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import "primereact/resources/themes/viva-light/theme.css";

const App = () => {
  return (
    <div className="App">
      <PrimeReactProvider>
        <RecipeGenerationForm />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
