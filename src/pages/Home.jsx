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
import Card from "../components/Card.jsx";
export default function Home() {
  return <>
  <h1 className="intro">I'm a Cybersecurity student who competes in CTF's with 0xf1sh and a gamer/reader. This website is a compilation of my accomplishments and hobbies as well as funny people from my life. If anyone is mentioned on this website it is purely for fun and not in a serious manner, and is a sign that I respect them.</h1>
  <div className = "cardContainer">
          <h1>I Enjoy  Card Games</h1>
    <div className="cards">
        <Card svg={Claw} />
        <Card svg={Jimbo} />
        <Card svg={Spade} />
        <Card svg={Stoat} />
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