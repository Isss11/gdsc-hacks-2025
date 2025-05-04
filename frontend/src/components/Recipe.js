import { Panel } from "primereact/panel";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";

const Recipe = ({ details }) => {
  return (
    <Panel className="recipe-panel" header={details.name}>
      <div>
        <div>Cultures: {details.cultures.join(", ")}</div>
        <Ingredients ingredients={details.ingredients} />
        <Instructions steps={details.steps} />
      </div>
    </Panel>
  );
};

export default Recipe;
