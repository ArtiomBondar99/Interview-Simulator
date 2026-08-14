import { Link } from "react-router-dom";

const ROLES = ["Backend", "Full Stack", "Frontend", "DevOps", "Software Engineer"];

const STEPS = [
  { title: "Choose your interview", description: "Pick a role, experience level, and how many questions you want." },
  { title: "Answer realistic questions", description: "Respond in your own words -- no multiple choice." },
  { title: "Receive AI feedback", description: "Get a detailed, professional evaluation of every answer." },
  { title: "Track your improvement", description: "See your score trend across interviews over time." },
];

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <section style={{ textAlign: "center", padding: "48px 0" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 8 }}>
          Practice smarter.
          <br />
          Interview better.
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto 32px" }}>
          Prepare for real technical interviews with personalized AI feedback.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Link to="/setup" className="button button-primary">
            Start Interview
          </Link>
          <Link to="/dashboard" className="button button-secondary">
            View Dashboard
          </Link>
        </div>
      </section>

      <section>
        <h2 style={{ textAlign: "center" }}>Supported roles</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {ROLES.map((role) => (
            <span key={role} className="panel" style={{ padding: "10px 20px" }}>
              {role}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ textAlign: "center" }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {STEPS.map((step, index) => (
            <div key={step.title} className="panel">
              <div style={{ color: "var(--blue)", fontWeight: 700, marginBottom: 8 }}>{index + 1}</div>
              <h3 style={{ margin: "0 0 8px" }}>{step.title}</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
