import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/setup", label: "Start Interview" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/history", label: "History" },
];

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <nav
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}
      >
        <NavLink to="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          AI Interview Simulator
        </NavLink>
        <div style={{ display: "flex", gap: 20 }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "var(--text)" : "var(--muted)",
                fontWeight: isActive ? 600 : 500,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
