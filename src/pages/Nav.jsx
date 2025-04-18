import * as React from "react";
import Bhavin from "../assets/Bhavin.png"
import "../styles/Nav.css"
export default function Nav() {

  return (
    <>
      <div className="navbar">
        <img src={Bhavin} className="pfp"/>
          <ul className="elements">
            <a>Home</a>
            <a>Certs</a>
            <a>Writeups</a>
            <a>Bhavin</a>
            <a>Enemies</a>
          </ul>
      </div>
    </>  
  );
}
