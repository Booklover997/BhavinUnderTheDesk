import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import React from 'react';
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
  const { name } = useParams();  //expected : richochet.md
  const { index } = useParams(); //expected : 0

  console.log(name);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/writeups_public/${name}`) 
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((text) => setContent(text))
      .catch((err) => setError(err.message));
  }, [name]);

  if (error) return <div>{error}</div>;

  return (
    <>
    <div className="writeup" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
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
        },
      }}
    >
      {content}
    </Markdown>
    </div>
    </>
  );
}
