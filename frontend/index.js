
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Wallet } from './near-wallet';
import Awards from './pages/awards';
import Loading from './pages/loading';




const CONTRACT_ADDRESS = process.env.CONTRACT_NAME

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  ReactDOM.render(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />} />
        <Route path="/loading" element={isSignedIn ? <Loading /> : <Navigate to="/" />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/loading" element={<Loading />} />
       
      
      
       
      </Routes>
    </BrowserRouter>,
    
   
    document.getElementById('root')
  );
}