
      import React, { useState} from 'react';
      import S3 from 'react-aws-s3';
      import "../styles/Submission.css"
      import { FiUpload } from 'react-icons/fi';
      import { incrementUploadCounter } from './Counter';
      import { Link } from 'react-router-dom'; 
     


      // installed using npm install buffer --save
      window.Buffer = window.Buffer || require("buffer").Buffer;
      
    
      const Upload = () => {
      
          const [selectedFile, setSelectedFile] = useState(null);
        
      
          const config = {
              bucketName: "lola-store",
              region: "us-east-2",
              accessKeyId: "AKIA45RXRSKRFVCGB4T5",
              secretAccessKey: "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",
          }
      
          const handleFileInput = (e) => {
              setSelectedFile(e.target.files[0]);
          }
      
          const uploadFile = async (file) => {
              const ReactS3Client = new S3(config);
              // the name of the file uploaded is used to upload it to S3
              ReactS3Client
              .uploadFile(file, file.name)   
              .then(data => console.log(data.location))
              .catch(err => console.error(err))
           
              incrementUploadCounter();
          }
          return <> 
        
        <div>
           <h1 className="h1">Upload your Submission</h1>
       </div> 
       <div className="submission_sub_container">
       <div className="upload_box"> 
       <div>
      <FiUpload className="upload_icon"/>
       </div>
   
        <input className="file"
           style={{
            marginTop: "15px",
            marginBottom: "15px",
            
          } }
          type="file" onChange={handleFileInput}/>
        <br></br>
        <Link to="/Loading">
        <button onClick={() => uploadFile(selectedFile)}  > Upload to Storage</button>
       </Link>
        </div>
        </div>
   
    </>
}

      
      export default Upload;
