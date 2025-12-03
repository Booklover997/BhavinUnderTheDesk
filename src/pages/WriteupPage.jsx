import { useParams } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import ReactMarkdown from "react-markdown";
import remarkToc from "remark-toc";
import React from 'react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeCallouts from 'rehype-callouts';
import 'rehype-callouts/theme/vitepress'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import posts from "../posts/posts.js";
import Calendar from "../assets/Calendar.svg?react";
import Person from "../assets/Person.svg?react";


export default function WriteupPage() {
  const scrolledRef = useRef(false);
  const { hash } = useLocation();
  
const tocRef = useRef([]);
  function appendToc(text, id, level) {
    tocRef.current = [...tocRef.current, { text, id, level }];
    console.log(tocRef.current);

  }
  const generateSlug = (string) => {
   let str = string.replace(/^\s+|\s+$/g, "");
   str = str.toLowerCase();
   str = str
     .replace(/[^a-z0-9 -]/g, "")
     .replace(/\s+/g, "-")
     .replace(/-+/g, "-"); 
   return str;
 };
 
  const { name } = useParams();  //expected : richochet.md
  const { index } = useParams(); //expected : 0
  const [toc, setToc] = useState([]);

  console.log(name);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/writeups_public/${name}`) 
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((text) => { setContent(text);} )
      .catch((err) => setError(err.message));
  }, [name]);
useEffect(() => {
  if (hash && !scrolledRef.current) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        scrolledRef.current = true;
      }
    } 
  }, [toc]);

function appendToc(text, id, level) {
  tocRef.current.push({ text, id, level });
}


// After content finishes loading, commit the TOC to state
useEffect(() => {
  console.log("skibidi");
  console.log(tocRef.current);
  setToc([...tocRef.current]);
  console.log(toc);
}, [content]);
  if (error) return <div>{error}</div>;
  return (
    <>
  
    <div className="writeup" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>

    <div className="toc">
      <h2>Contents</h2>
      {toc.map((item, index) => (
        <div 
          key={index}
          className={`toc-item level-${item.level}`}
        >
          <a href={`#${item.id}`}>{item.text}</a>
        </div>
      ))}
    </div>
      <div className="tags">
                  {posts[index].tags.map((tag, tagIndex) => (
              <div className={tag + " tag"} key={tagIndex}>{tag}</div>
            ))}
      </div>
    <h1 className="title">{posts[index].title}</h1>
    <h3>{posts[index].subtitle}</h3>
    <div className="stats">
        <div className="author"><Person className="icon"/> Doctor Jang</div>
        <div className="date"><Calendar className="icon" /> {posts[index].date.toLocaleDateString()}</div>
      </div>
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeCallouts]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter style={atomDark} PreTag="div" language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },           h1: ({ node, ...props }) => {
          appendToc(props.children, generateSlug(props.children), 1);
          return (
             <h1 id={generateSlug(props.children)} {...props}></h1>
           )}
      }}
    >
      {content}
    </Markdown>
    </div>
    </>
  );
}
