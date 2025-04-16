import * as React from "react";
import AWS from "./assets/AWS.svg";
import GSEC from "./assets/GSEC.svg";
import GFACT from "./assets/GFACT.svg";
import Nav from "./Nav.jsx";
import "./styles/App.css";
export default function Home() {
  return (
    <>
      <Nav/>
      <h1 className="title">Certs</h1>
      <div className="content-body">
        <div class="c-container">
          <img src={AWS}/>
          <img src={GSEC}/>
          <img src={GFACT}/>
      </div>
      </div>
    </>
  );
}
