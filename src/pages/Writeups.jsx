import { useEffect, useRef, useState } from "react";
import AWS from "../assets/AWS.svg";
import GSEC from "../assets/GSEC.svg";
import GFACT from "../assets/GFACT.svg";
import Bhavin from "../assets/Bhavin.svg";
import "../styles/App.css";
import posts from "../posts/posts.js";
import { Link } from "react-router";

export default function Writeups() {
  return (
    <>
    <div className="writeupContainer">

      {/* <input type="text" className="searchBar"></input> */}

      {posts.map((post, i) => (

        <Link to={post.slug} className="post" key={i}>
          <h1>{post.title}</h1>
          <div className="tags">
            {post.tags.map((tag, tagIndex) => (
              <div className={tag + " tag"} key={tagIndex}>{tag}</div>
            ))}
            <div className="date">{post.date.toLocaleDateString()}</div>
          </div>
          <p className="description">{post.description}</p>
        </Link>
      ))}
      </div>
    </>
  )
}