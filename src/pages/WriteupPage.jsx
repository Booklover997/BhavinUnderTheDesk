import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function WriteupPage() {
  const { name } = useParams(); // e.g., "richochet"
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
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
