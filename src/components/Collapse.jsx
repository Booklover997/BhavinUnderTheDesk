import "../styles/App.css";
import { useState, useEffect } from "react";
import Down from "../assets/Open_Arrow.svg?react";
import Right from "../assets/Closed_Arrow.svg?react";
export default function Collapse(props) {
    const [isOpen, setIsOpen] = useState(props.open);
    const [title, setTitle] = useState(props.title + (props.open ? "" : " ..."));
const toggle = () => {
    if (isOpen) {
        setTitle(props.title + " ...");

    }
    else {
        setTitle(props.title);

    }
    setIsOpen(!isOpen);

};
    return (
        <div className="collapseContainer">
            <div className="collapseHeader" onClick={toggle}>
                <div className="collapseIcons">
                    {isOpen && <Down className="icon"/>}   
                    {!isOpen && <Right className="icon"/>}
                </div>
                {props.size=="h1"&& <h1>{title}</h1>}
                {props.size=="h3"&& <h3>{title}</h3>}
            </div>
            <div className ="collapseContent" style={{ display: isOpen ? 'block' : 'none' }}>
                {props.content}
            </div>
        </div>
    
  );
}

