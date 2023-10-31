import React, { useEffect, useState } from 'react';
import '../styles/Loading.css';
import '../styles/Submission.css';
import loaderGif from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [qrUrl, setqrUrl] = useState('');
  const [showH1, setShowH1] = useState(false);
 
  const navigate = useNavigate();

  
  const loadingDuration = 4000; // 4 seconds for the loading spin

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (qrUrl) {
      window.open(qrUrl);
    }
  }, [qrUrl]);

  useEffect(() => {
    // Set a timeout to update the showH1 state after 15 seconds
    const timeoutId = setTimeout(() => {
      setShowH1(true);
    }, 10000); // 10000 milliseconds = 15 seconds

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="loading_main_container">
      <div className="load" style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
        <div className="content">
          <div>
            <h3 className="h1">Hang tight while we verify your proof.</h3>
          </div>
          <div>
            <img src={loaderGif} alt="Loading" width={150} height={150} />
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="sucess_content">
          <h2 className="h1">Analysis started</h2>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
          </div>

          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>

          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>

          <a class="dribbble" href="https://dribbble.com/shots/5878367-Loaders" target="_blank">
            <img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt="" />
          </a>
          <p className="p">This may take a few minutes</p>
          <div>
            <div className="line_box"> <h3 className="h3">recognizing your face :</h3> <div className="diva"> </div> % corresponds </div>
            <div className="line_box"> <h3 className="h3">defining your actions :</h3> <div className="diva2"> </div> % corresponds </div>
            {showH1 && <h1 style={{
           color: "#eaecf3"
            
          } }>Succssfully !</h1>}
            <button className="button" onClick={() => navigate('/')}>
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
