// src/components/Nav.tsx

import * as React from "react";
import { Link } from "react-router-dom";
import Bhavin from "../assets/Bhavin.png";
import "../styles/Nav.css";

export default function Nav() {
  return (
    <div className="navbar">
      <img src={Bhavin} className="pfp" alt="Profile" />
      <ul className="elements">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/certs">Certs</Link></li>
        <li><Link to="/writeups">Writeups</Link></li>
        <li><Link to="/bhavin">Bhavin</Link></li>
        <li><Link to="/enemies">Enemies</Link></li>
      </ul>
    </div>
  );
}
