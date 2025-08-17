import { useEffect, useRef, useState } from "react";
import AWS from "../assets/AWS.svg";
import GSEC from "../assets/GSEC.svg";
import GFACT from "../assets/GFACT.svg";
import GPEN from "../assets/GPEN.svg";
import Bhavin from "../assets/Bhavin.svg";
import "../styles/App.css";

export default function Home() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [height, setHeight] = useState(0);
  const [borgumHeight, setBorgumHeight] = useState(0);

  const addImageRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight);
      }
    };

    const calculateWidth = () => {
      const angle = Math.sin(0.54681165);
      const totalWidth = imageRefs.current.reduce((acc, img) => {
        return acc + img.naturalWidth * angle * 1.2;
      }, 0);
      setBorgumHeight(totalWidth);
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-40%) rotate(31.33deg) translateX(calc(-${scrollTop}px))`;
      }
    };

    // Wait until all images have loaded
    const handleLoad = () => {
      updateHeight();
      calculateWidth();
    };

    // Attach load events to all images
    imageRefs.current.forEach((img) => {
      if (img.complete) {
        handleLoad(); // already loaded
      } else {
        img.addEventListener("load", handleLoad);
      }
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      imageRefs.current.forEach((img) => img.removeEventListener("load", handleLoad));
    };
  }, []);

  return (
    <div className="content-body">
      <div className="c-container" ref={containerRef}>
        <img ref={addImageRef} className="cert" src={AWS} alt="AWS Certificate" />
        <img ref={addImageRef} className="cert" src={GPEN} alt="GPEN Certificate" />
        <img ref={addImageRef} className="cert" src={GSEC} alt="GSEC Certificate" />
        <img ref={addImageRef} className="cert" src={GFACT} alt="GFACT Certificate" />
        <img ref={addImageRef} className="etc" src={Bhavin} alt="Bhavin" />
      </div>
      <div className="borgum" style={{ height: `${borgumHeight}px` }}></div>
    </div>
  );
}
