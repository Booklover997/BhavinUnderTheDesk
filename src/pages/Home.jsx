import { useEffect, useRef, useState } from "react";
import "../styles/App.css";
//IMPORT SVGS 
import Discord  from "../assets/Discord_Slider.svg?react";
import Instagram  from "../assets/Instagram_Icon.svg?react";
import Facebook  from "../assets/Facebook_Icon.svg?react";

import Coffee from "../assets/Github_Coffee.svg?react";
import Star from "../assets/Github_Star.svg?react";

import Claw from "../assets/Claw_Card.svg?react";
import Jimbo from "../assets/Jimbo_Card.svg?react";
import Spade from "../assets/Spade_Card.svg?react";
import Stoat from "../assets/Inscryption_Stoat.svg?react";

export default function Home() {
  return <>
  <div className = "cardContainer">
    <div className="cards">
      <Claw className="card"/>
      <Jimbo className="card"/>
      <Spade className="card"/>
      <Stoat className="card"/>
    </div>
  </div>
  <div className="followContainer">
      <h1>Drop A Follow!</h1>
      <div className="socialsContainer">
        <Discord className="social"/>
        <Instagram className="social"/>
        <Facebook className="social"/>
      </div>
    </div>
  <div className="coffeeContainer">
    <Coffee className="coffee"/>
    <div>
      <h1>Give me a star to help me buy coffee hehe</h1>
      <Star/>
    </div>
  </div>

  </>
  ;
}