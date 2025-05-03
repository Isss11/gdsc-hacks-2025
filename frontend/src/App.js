import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/viva-light/theme.css";
import RecipeGenerationForm from "./components/RecipeGenerationForm";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <PrimeReactProvider>
        <Header />
        <RecipeGenerationForm />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
