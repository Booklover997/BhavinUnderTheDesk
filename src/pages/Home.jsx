import { useEffect, useRef, useState } from "react";
import "../styles/App.css";
//IMPORT SVGS 
import Discord  from "../assets/Discord_Slider.svg?react";
import Instagram  from "../assets/Instagram_Icon.svg?react";
import Facebook  from "../assets/Facebook_Icon.svg?react";

export default function Home() {
  return <>
  <div className="followContainer">
      <h1>Drop A Follow!</h1>
      <div className="socialsContainer">
        <Discord className="social"/>
        <Instagram className="social"/>
        <Facebook className="social"/>
      </div>
    </div>

  </>
  ;
}