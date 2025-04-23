import "../styles/App.css";

export default function Enemy({ name, reason }) {
  return (
    <div className="enemy">
      <h2>{name}</h2>
      <p>Reason: {reason}</p>
    </div>
  );
}
