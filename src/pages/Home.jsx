import { useEffect, useRef, useState } from "react";
import "../styles/App.css";
//IMPORT SVGS 
import Discord  from "../assets/Discord_Slider.svg?react";
import Instagram  from "../assets/Instagram_Icon.svg?react";
import Facebook  from "../assets/Facebook_Icon.svg?react";

import Coffee from "../assets/Github_Coffee.svg?react";
import Star from "../assets/Github_Star.svg?react";
import { Link } from "react-router-dom";

import Claw from "../assets/Claw_Card.svg?react";
import Jimbo from "../assets/Jimbo_Card.svg?react";
import Spade from "../assets/Spade_Card.svg?react";
import Stoat from "../assets/Inscryption_Stoat.svg?react";
import Card from "../components/Card.jsx";
import Collapsible from "../components/Collapse.jsx";

import Writeup from "../assets/Writeups.svg?react";
import Creds from "../assets/Certs.svg?react";
import Laptop from "../assets/Laptop.svg?react";

import Down from "../assets/Open_Arrow.svg?react";
export default function Home() {
  return <>
  <div className="intro">  <h1>About Me</h1>
<h3>I'm a Cybersecurity student who competes in CTF's with bUNGus and a gamer/reader. This website is a compilation of my accomplishments and hobbies as well as funny people from my life. I have some cybersecurity CTF writeup's as well as some webnovel reviews that you can look at! I also enjoy doing some design work and all of the svg's on this site were designed by me (I do not own the rights to the characters depicted or entities). If anyone is mentioned on this website it is purely for fun and not in a serious manner, and is a sign that I respect them.</h3>
<div className = "container">
  <Link to="/writeups"><button>Writeups<Writeup className="icon"></Writeup></button></Link>
  <Link to="/certs"><button>Certifications<Creds className="icon"></Creds></button></Link>
  </div>
  </div>
  <div>  

<script src="https://asciinema.org/a/BsRtW5EJcnxFVCBBs6XiHMDye.js" id="asciicast-BsRtW5EJcnxFVCBBs6XiHMDye" async></script>
</div>
  <div className="CTF">
    <Laptop/>
    <div>

        <Collapsible title="# TODO" open={true} content={<div>
          <Collapsible title="## Pwn" size="h3" open={true} content={<div><ul><li>Pwn.College(60% to Orange Belt)</li><li>Ret2Wargames(75% Done)</li></ul></div>}></Collapsible>
          <Collapsible title="## Cryptography"size="h3" open={true} content={<ul><li>Cryptohack</li></ul>}></Collapsible>
          <Collapsible title="## Reverse Engineering" size="h3"  open={true} content={<ul><li>Coding in C</li></ul>}></Collapsible>
          <Collapsible title="## Electrical Engineering" size="h3" open={true} content={<ul><li>Building Computers</li></ul>}></Collapsible>
        </div>} size="h1"></Collapsible>
    </div>
  </div>
  
  <div className = "cardContainer">
          <h1>I'm A Card Game Fanatic</h1>
          <h3>Here are Some Favorites</h3>
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
        <a href="https://discord.com/users/347181565488529419"><Discord className="social"/></a>
        <Instagram className="social"/>
        <Facebook className="social"/>
      </div>
    </div>
  {/* <div className="coffeeContainer">
    <Coffee className="coffee"/>
    <div>
      <h1>Give me a star to help me buy coffee hehe</h1>
      <Star/>
    </div>
  </div> */}

  </>
  ;
}