import { Panel } from "primereact/panel";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useState } from "react";
import { OptionsContext } from "../App";

const Recipe = ({ details }) => {
  const { setIsLoading, showUploadSuccess, toastError } =
    useContext(OptionsContext);
  const [recipient, setRecipient] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8000/recipe-email`;
    const body = {
      recipient: recipient,
      recipe: details,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, settings);
      await response.json();

      setIsEmailMode(false);
      showUploadSuccess(`Sent recipe to ${body["recipient"]} sucessfully.`);
    } catch (error) {
      toastError(error);
    }

    setIsLoading(false);
  };

  return (
    <Panel className="recipe-panel" header={details.name}>
      <div>
        <div>Cultures: {details.cultures.join(", ")}</div>
        <Ingredients ingredients={details.ingredients} />
        <Instructions steps={details.steps} />
      </div>
      <div className="recipe-share-row">
        {!isEmailMode && (
          <Button label="Email" onClick={() => setIsEmailMode(true)} />
        )}
        {isEmailMode}
        {isEmailMode && (
          <span>
            <InputText
              placeholder="qwerty@gmail.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />

            <Button label="Send" onClick={sendEmail} />
          </span>
        )}
      </div>
    </Panel>
  );
};

export default Recipe;
