import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";

const Upload = () => {
  const fileUploadRef = useRef(null);
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };

  return (
    <FileUpload
      ref={fileUploadRef}
      name="demo[]"
      url={"/api/upload"}
      multiple
      mode="basic"
      auto
      chooseLabel="Enter food by image"
      chooseOptions={uploadOptions}
      accept="image/*"
      maxFileSize={10000000}
      emptyTemplate={
        <p className="m-0">Drag and drop images of your pantry here!</p>
      }
    />
  );
};

export default Upload;
