import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("wv_admin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("wv_admin");
    navigate("/");
  };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(8, 8, 24, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0, 240, 255, 0.15)",
      padding: "0 20px",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}>
        {/* LOGO + NAME */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/wisdom-logo.png.jpeg"
            alt="Wisdom Vault"
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(0,240,255,0.6))",
            }}
          />
          <div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 24, fontWeight: 700,
              color: "#00f0ff",
              letterSpacing: 2,
              textShadow: "0 0 15px rgba(0,240,255,0.5)",
            }}>
              WISDOM VAULT
            </div>
          </div>
        </Link>

        {/* ADMIN BUTTON */}
        {isAdmin ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link to="/admin" style={{
              padding: "8px 16px",
              background: "rgba(0,240,255,0.1)",
              border: "1px solid rgba(0,240,255,0.3)",
              borderRadius: 8, color: "#00f0ff",
              textDecoration: "none", fontSize: 13,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 1,
            }}>
              DASHBOARD
            </Link>
            <button onClick={handleLogout} style={{
              padding: "8px 16px",
              background: "rgba(255,60,60,0.1)",
              border: "1px solid rgba(255,60,60,0.3)",
              borderRadius: 8, color: "#ff6060",
              cursor: "pointer", fontSize: 13,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 1,
            }}>
              LOGOUT
            </button>
          </div>
        ) : (
          <Link to="/admin/login" style={{
            padding: "8px 20px",
            background: "rgba(0,240,255,0.08)",
            border: "1px solid rgba(0,240,255,0.3)",
            borderRadius: 8, color: "#00f0ff",
            textDecoration: "none", fontSize: 13,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1,
            boxShadow: "0 0 10px rgba(0,240,255,0.1)",
            transition: "all 0.2s",
          }}>
            ADMIN LOGIN
          </Link>
        )}
      </div>
    </header>
  );
}