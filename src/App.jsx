import { useEffect, useRef, useState } from "react";
import AWS from "./assets/AWS.svg";
import GSEC from "./assets/GSEC.svg";
import GFACT from "./assets/GFACT.svg";
import Nav from "./Nav.jsx";
import Bhavin from "./assets/Bhavin.svg";
import "./styles/App.css";

export default function Home() {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [borgumHeight, setBorgumHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight);
      }
    };

    const calculateWidth = () => {
      const images = [AWS, GSEC, GFACT, Bhavin];
      const totalWidth = images.reduce((acc, img) => {
        const imgElement = new Image();
        imgElement.src = img;
        return acc + imgElement.width; // Add the width of each image
      }, 0);
      setBorgumHeight(totalWidth); // Set borgum height based on total width
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-50%) rotate(31.33deg) translateX(calc(-${scrollTop}px))`;
      }
    };

    updateHeight();
    calculateWidth();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Nav /> */}
      <div className="content-body">
        <div className="c-container" ref={containerRef}>
          <img className="cert" src={AWS} alt="AWS Certificate" />
          <img className="cert" src={GSEC} alt="GSEC Certificate" />
          <img className="cert" src={GFACT} alt="GFACT Certificate" />
          <img className="etc" src={Bhavin} alt="Bhavin" />
        </div>
        <div className="borgum" style={{ height: `${borgumHeight}px` }}></div>
      </div>
    </>
  );
}