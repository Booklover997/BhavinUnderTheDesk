import {useEffect,useRef} from "react";
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
    const handleScroll = () => {
      var scrollTop = window.pageYOffset * 0.85;


      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(calc(-50% + ${window.pageYOffset}px)) rotate(31.33deg) translateX(calc(-${scrollTop}px))`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Nav/> */}
      <div className="content-body">
        <div className="c-container" ref={containerRef}>
          <img className="cert" src={AWS}/>
          <img className="cert" src={GSEC}/>
          <img className="cert"src={GFACT}/>
          <img className="etc"src={Bhavin}/>
      </div>
      </div>
    </>
  );
}
