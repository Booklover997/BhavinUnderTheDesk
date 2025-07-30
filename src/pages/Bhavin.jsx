import { useEffect, useRef, useState } from "react";
import Enemy from "./Enemy.jsx"
import "../styles/App.css";
import posts from "../posts/posts.js";
export default function Enemies() {
  return (
    <>
      <div className="enemiesContainer">
          <h1>My Enemies List</h1>
          <Enemy name="Squid Proxy Lovers" reason="Capitalist merger goons who won't answer me on instagram" />
          <Enemy name="C-bass" reason="Part of SPL and sends me terrible instagram reels" />
          <Enemy name="Bones Author" reason="Wrote the worst webtoon I have ever read" />
      </div>
    </>
  );
}