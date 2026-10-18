import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const { isLight } = useTheme();
  const isAdmin = localStorage.getItem("wv_admin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("wv_admin");
    navigate("/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: isLight ? "rgba(253, 251, 247, 0.94)" : "rgba(8, 8, 24, 0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: isLight
          ? "1px solid rgba(2, 132, 199, 0.2)"
          : "1px solid rgba(0, 240, 255, 0.15)",
        padding: "0 12px",
        boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.04)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: 64,
          gap: 8,
        }}
      >
        {/* LOGO + NAME (Left Column) */}
        <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              minWidth: 0,
            }}
          >
            <img
              src="/wisdom-logo.png.jpeg"
              alt="Wisdom Vault"
              className="wv-header-logo-img"
              style={{
                width: 42,
                height: 42,
                objectFit: "contain",
                flexShrink: 0,
                filter: isLight
                  ? "drop-shadow(0 2px 8px rgba(2, 132, 199, 0.35))"
                  : "drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))",
                transition: "filter 0.3s ease",
              }}
            />
            <div
              className="wv-header-brand-text"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: isLight ? "#0284c7" : "#00f0ff",
                letterSpacing: 1.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textShadow: isLight
                  ? "0 0 15px rgba(2, 132, 199, 0.25)"
                  : "0 0 15px rgba(0, 240, 255, 0.5)",
                transition: "color 0.3s ease, text-shadow 0.3s ease",
              }}
            >
              WISDOM VAULT
            </div>
          </Link>
        </div>

        {/* EXACT CENTER: CIRCULAR THEME TOGGLE (Center Column) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
            flexShrink: 0,
          }}
        >
          <ThemeToggle />
        </div>

        {/* ADMIN BUTTON (Right Column) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          {isAdmin ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <Link
                to="/admin"
                className="wv-admin-btn"
                style={{
                  padding: "7px 12px",
                  background: isLight ? "rgba(2, 132, 199, 0.1)" : "rgba(0, 240, 255, 0.1)",
                  border: isLight
                    ? "1px solid rgba(2, 132, 199, 0.35)"
                    : "1px solid rgba(0, 240, 255, 0.3)",
                  borderRadius: 8,
                  color: isLight ? "#0284c7" : "#00f0ff",
                  textDecoration: "none",
                  fontSize: 12,
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                DASHBOARD
              </Link>
              <button
                onClick={handleLogout}
                className="wv-admin-btn"
                style={{
                  padding: "7px 12px",
                  background: isLight ? "rgba(239, 68, 68, 0.1)" : "rgba(255, 60, 60, 0.1)",
                  border: isLight
                    ? "1px solid rgba(239, 68, 68, 0.35)"
                    : "1px solid rgba(255, 60, 60, 0.3)",
                  borderRadius: 8,
                  color: isLight ? "#dc2626" : "#ff6060",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="wv-admin-btn"
              style={{
                padding: "8px 16px",
                background: isLight ? "rgba(2, 132, 199, 0.08)" : "rgba(0, 240, 255, 0.08)",
                border: isLight
                  ? "1px solid rgba(2, 132, 199, 0.35)"
                  : "1px solid rgba(0, 240, 255, 0.3)",
                borderRadius: 8,
                color: isLight ? "#0284c7" : "#00f0ff",
                textDecoration: "none",
                fontSize: 12,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: 1,
                whiteSpace: "nowrap",
                boxShadow: isLight
                  ? "0 2px 8px rgba(2, 132, 199, 0.1)"
                  : "0 0 10px rgba(0, 240, 255, 0.1)",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <span className="wv-admin-full">ADMIN LOGIN</span>
              <span className="wv-admin-short" style={{ display: "none" }}>LOGIN</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}