

import "../styles/globals.css";
import logo from '../assets/b54.jpg'
import layer from "../assets/LayerZero.jpg"



export default function Awards() {
 
 
  

  return (
    <>
    
    <div>
      <h1>Choose your awards</h1>
        &nbsp;
      <a href="https://layerzero.network/" target={"_blank"}>
      <img
        id="badge-button"
        style={{ width: "180px", height: "75px" }}
        src={logo}
        alt="Layer zero"
      />
    </a>
    &nbsp;
      <a href="https://layerzero.network/" target={"_blank"}>
      <img
        id="badge-button"
        style={{ width: "180px", height: "75px" }}
        src={layer}
        alt="Layer zero"
      />
    </a>
    &nbsp;
      <a href="https://layerzero.network/" target={"_blank"}>
      <img
        id="badge-button"
        style={{ width: "180px", height: "75px" }}
        src={logo}
        alt="Layer zero"
      />
    </a>
    &nbsp;
      <a href="https://layerzero.network/" target={"_blank"}>
      <img
        id="badge-button"
        style={{ width: "180px", height: "75px" }}
        src={layer}
        alt="Layer zero"
      />
    </a>
        </div>
  
    </>
  );
}
