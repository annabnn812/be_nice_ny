import 'regenerator-runtime/runtime';
import React from 'react';
import {SignInPrompt, SignOutButton } from './ui-components';
//import Header  from './pages/header';
import Upload from "./pages/upload"
import axios from 'axios'
import { useEffect, useState } from 'react';
import './styles/Submission.css';
import FirstProject from "./pages/project1"
import SecondProject from "./pages/project2"
import ThirdProject from "./pages/project3"
import FourthProject from "./pages/project4"
import FifthProject from "./pages/project5"
import SixthProject from "./pages/project6"
import { getUploadCounter } from './pages/Counter';
import NY from './assets/ny2.gif'
import selfie from './assets/selfie.jpg'
import { FiUpload } from 'react-icons/fi';


export default function App({ isSignedIn, contractId, wallet }) {

  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
    }
  , []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return (<>
       
     
    <SignInPrompt onClick={() => wallet.signIn()}/>
    <div className="landing">
    <div className="landing_sub_container2">
        <img
        id="badge-button"
        style={{ width: "720px", height: "470px" }}
        src={NY}
        alt="NY"></img>
        </div>

        <div  className="landing_sub_container1">
          <div>
          <h1 className="h1"><span className="span">Be</span>Nice</h1>
          <h1 className="h1"><span className="span">New Yorker</span></h1>
          </div>
        
          <div>
            <h2 className="h2">How many good things have you done today?</h2>
          </div>
          <h2 className="h2">To submit your proof:</h2>
            <p >1. Sign in with NEAR Wallet </p>
            <p >2. Click on "Submit" a new proof here below</p>
            <p >3. Earn points</p>
        </div>
       
        

      </div>
      <div  className="landing_sub_container1">
        
          <div>
            <h2 className="h2">First time here?</h2>
            <p >1. Signup / Sign in with NEAR Wallet </p>
            <p >2. Add your selfie from different angles </p>
            <p >Minimum 5 pictures </p>
          </div>
          <img
        id="badge-button"
        style={{ width: "350px", height: "350px" }}
        src={selfie}
        alt="Selfie"></img>
      
           
      <div>
      <FiUpload className="upload_icon"/>
       </div>
   
        <input className="file"
           style={{
            marginTop: "15px",
            marginBottom: "15px"
          } }
          type="file" />
        <br></br>
     
        <button > Save </button>
        </div>
      
            </>)
  }

  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;
    
    // use the wallet to send the greeting to the contract
    wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
      .then(async () => {return getGreeting();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function getGreeting(){
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({ method: 'get_greeting', contractId })
  }
  
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadCount, setUploadCount] = useState(getUploadCounter());

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadCount(getUploadCounter());
    }, 1000); // You can adjust the refresh interval as needed
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };
  

  const handleUpload = async () => {
    if (!fileToUpload) {
      // Handle the case where no file is selected
      return;
    }
      

  // Create a FormData object to send the video file
  const formData = new FormData();
  formData.append('video', fileToUpload);

  try {
    // Make a POST request to the server's /api/upload-video endpoint
    const response = await axios.post('/api/upload-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for FormData
      },
    });

    // Handle the response from the server (e.g., display a success message)
    console.log(response.data);
  } catch (error) {
    // Handle errors (e.g., display an error message)
    console.error('Error uploading video:', error);
  }
};
  // Function to handle the submit button click
  const handleSubmitClick = () => {
    //TODO:
    // Do we need any logic here?
     router.push('/Loading');
  };


  return (
    <>
 
          
            
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      
            
      <main className={uiPleaseWait ? 'please-wait' : ''}>

      <div className="subumission_main_container">
    
              <h3> <li className="li"> Your Socre: { uploadCount } </li> </h3>
          
   
        <Upload />
   
    <>
    <h1 className="h1">
       Choose your award
    </h1>
  <div className="box_card_prj"> 
    <FirstProject />
    <SecondProject />
    <ThirdProject />
    <FourthProject />
    <FifthProject />
    <SixthProject />
    </div>
  </>
    
        <h1>
          The contract says: <span className="greeting">{valueFromBlockchain}</span>
        </h1>
        <form onSubmit={changeGreeting} className="change">
          <label>Change greeting:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button>
              <span>Save</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>
        </div>
      </main>
    </>
  );
}