import { FileUpload } from "primereact/fileupload";

import { Button } from 'primereact/button';

import { useContext} from 'react';
import {OptionsContext } from "../App";
const Upload = () => {
  const url = `http://localhost:8000/image`;


    const { ingredientsText, setIngredientsText} = useContext(OptionsContext);

    
    const uploadHandler = ({files}) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadImage(e.target.result);
        };
        fileReader.readAsDataURL(file);
    }

    const uploadImage = async (imageFiles) => {
        const body = {
            image: imageFiles
        }
        const settings = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          };
        const response = await fetch (url, settings);
        const data = await response.json();
        const food = Object.keys(data);
        let foodStr = ingredientsText && ingredientsText.length > 0 ? ", " : ""
        food.map((val, i) => {
            foodStr += val + (i != food.length - 1? ", ": "")  
        })
        setIngredientsText(ingredientsText + foodStr)
        console.log(data)
  };

  return (
    <FileUpload
      mode="basic"
      name="demo[]"
      customUpload={true}
      uploadHandler={uploadHandler}
      url={"/image"}
      multiple
      auto
      accept="image/*"
      maxFileSize={100000000000}
      chooseLabel="Enter food by image"
    />
  );
};

export default Upload;
