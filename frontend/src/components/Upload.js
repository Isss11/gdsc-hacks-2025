import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { useEffect, useRef } from 'react';

const Upload = () => {
    const fileUploadRef = useRef(null)

    // const onUpload = (e) => {
    //     e.preventDefault();
    //     console.log("Upload button clicked")
    // }

    useEffect(() => {
        console.log(fileUploadRef.current)
     
    })

    const getFiles = () => {
        console.log(fileUploadRef.current.getUploadedFiles())
    }
    return (
        <>
       <FileUpload ref={fileUploadRef} name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        <Button onClick={getFiles}>Click me</Button>
        </>
    );
};

export default Upload;
