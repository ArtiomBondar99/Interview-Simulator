export default function EmptyState({ title, description }) {
  return (
    <div className="panel" style={{ textAlign: "center", padding: 48 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {description && <p style={{ color: "var(--muted)" }}>{description}</p>}
    </div>
  );
}
