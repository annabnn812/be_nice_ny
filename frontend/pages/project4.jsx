
import React from 'react';
import { Link } from 'react-router-dom'; 
import  '../styles/Card.css';





export default function FourthProject() {
   
  return (
    <>
    <div className="container">
        <div className="wrapper">
          <div className="banner4"></div>
          <h1>Some sponsor</h1>
          <p>
          You have to do something good to get it <br /> 
            
            
          </p>
        </div>
        <div className="button_wrapper">
          {/* Use Link component for navigation */}
          <Link href="/">
          
              <button className="btn_outline">DETAILS</button>
        
         
          <button className="btn_fill">Get it for 20 points</button>
          </Link>
        </div>
      </div>

      &nbsp;
      &nbsp;
  </>
   );
}