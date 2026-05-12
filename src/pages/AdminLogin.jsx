import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USER = "wisdomadminman01";
const ADMIN_PASS = "per$everance@001";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("wv_admin", "true");
        navigate("/admin");
      } else {
        setError("Invalid credentials. Access denied.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",    // Stack items vertically
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      position: "relative",
      zIndex: 1,
    }}>
      {/* ✅ BACK BUTTON - NOW PERFECTLY CENTERED AT THE TOP */}
      <button 
        onClick={() => navigate("/")} 
        style={{
          position: "absolute",
          top: "30px",                    // Sits cleanly at the top
          left: "50%",
          transform: "translateX(-50%)",  // Centers horizontally
          display: "flex", 
          alignItems: "center", 
          gap: 8,
          background: "rgba(0,240,255,0.05)",
          border: "1px solid rgba(0,240,255,0.2)",
          borderRadius: "10px",
          padding: "10px 18px",
          color: "#00f0ff",
          cursor: "pointer", 
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: 1.5,
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(0,240,255,0.15)";
          e.currentTarget.style.border = "1px solid rgba(0,240,255,0.6)";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0,240,255,0.2)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(0,240,255,0.05)";
          e.currentTarget.style.border = "1px solid rgba(0,240,255,0.2)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        ← BACK TO HOME
      </button>

      <div style={{
        width: "100%",
        maxWidth: 400,
        marginTop: "60px",                // Prevents overlap with the button
        background: "rgba(0,240,255,0.03)",
        border: "1px solid rgba(0,240,255,0.2)",
        borderRadius: 20,
        padding: 36,
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 40px rgba(0,240,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* TOP GLOW LINE */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
        }}/>

        {/* ICON */}
        <div style={{
          width: 60, height: 60,
          background: "rgba(0,240,255,0.08)",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: 16,
          display: "flex", alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 0 20px rgba(0,240,255,0.15)",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2"
              stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.1)"/>
            <path d="M7 11V7a5 5 0 0110 0v4"
              stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1.5" fill="#00f0ff"/>
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 18, fontWeight: 700,
          color: "#00f0ff", textAlign: "center",
          letterSpacing: 3, marginBottom: 6,
          textShadow: "0 0 15px rgba(0,240,255,0.4)",
        }}>
          ADMIN ACCESS
        </h2>
        <p style={{
          textAlign: "center", fontSize: 12,
          color: "rgba(255,255,255,0.3)",
          marginBottom: 28, letterSpacing: 0.5,
        }}>
          Authorized personnel only
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 10,
              color: "rgba(0,240,255,0.6)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2, marginBottom: 8,
            }}>
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="off"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(0,240,255,0.05)",
                border: "1px solid rgba(0,240,255,0.2)",
                borderRadius: 10,
                color: "#e0f0ff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 10,
              color: "rgba(0,240,255,0.6)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2, marginBottom: 8,
            }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(0,240,255,0.05)",
                border: "1px solid rgba(0,240,255,0.2)",
                borderRadius: 10,
                color: "#e0f0ff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.6)"}
              onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
            />
          </div>

          {error && (
            <div style={{
              padding: "10px 14px",
              background: "rgba(255,60,60,0.1)",
              border: "1px solid rgba(255,60,60,0.3)",
              borderRadius: 8,
              color: "#ff8080",
              fontSize: 13,
              marginBottom: 16,
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "rgba(0,240,255,0.05)"
                : "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,240,255,0.05))",
              border: "1px solid rgba(0,240,255,0.4)",
              borderRadius: 10,
              color: "#00f0ff",
              fontSize: 13,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: (!username || !password) ? 0.5 : 1,
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 14, height: 14,
                  border: "2px solid rgba(0,240,255,0.3)",
                  borderTop: "2px solid #00f0ff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}/>
                VERIFYING...
              </>
            ) : "ENTER VAULT"}
          </button>
        </form>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input::placeholder { color: rgba(255,255,255,0.2); }
        `}</style>
      </div>
    </div>
  );
}