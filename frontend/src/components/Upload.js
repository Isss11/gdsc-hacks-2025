import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { useEffect, useRef } from 'react';

const Upload = () => {
    

    const url = `http://localhost:8000/image`;

    
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
        console.log(data)
  
    
    };

    return (
        <>
       <FileUpload name="demo[]" customUpload={true} uploadHandler={uploadHandler} url={'/image'} multiple accept="image/*" maxFileSize={100000000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
       
        </>
    );
};

export default Upload;
