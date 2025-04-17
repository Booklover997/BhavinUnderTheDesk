import * as React from "react";
import Bhavin from "./assets/Bhavin.png"
export default function Nav() {

  return (
    <>
      <div className="navbar">
        <img src={Bhavin}/>
          <ul className="elements">
            <li>Home</li>
            <li>Certs</li>
            <li>Writeups</li>
            <li>Bhavin</li>
            <li>Enemies</li>
          </ul>
      </div>
    </>  
  );
}
