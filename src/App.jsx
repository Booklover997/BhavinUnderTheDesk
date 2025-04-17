import { useEffect, useRef } from "react";
import AWS from "./assets/AWS.svg";
import GSEC from "./assets/GSEC.svg";
import GFACT from "./assets/GFACT.svg";
import Nav from "./Nav.jsx";
import Bhavin from "./assets/Bhavin.svg";
import "./styles/App.css";

export default function Home() {
  const containerRef = useRef(null);
  const threshold = 100;

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset * 1;

      if (containerRef.current) {
        // Using TranslateY creates
        containerRef.current.style.transform = `rotate(31.33deg) translateX(calc(-${scrollTop}px))`;
      }

      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set the position

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Nav/> */}
      <div className="content-body">
        <div className="c-container" ref={containerRef}>
          <img className="cert" src={AWS} />
          <img className="cert" src={GSEC} />
          <img className="cert" src={GFACT} />
          <img className="etc" src={Bhavin} />
        </div>
        <div class="borgum"></div>
      </div>
    </>
  );
}