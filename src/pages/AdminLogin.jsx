import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLight } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: rpcError } = await supabase.rpc("verify_admin", {
      input_user: username,
      input_pass: password,
    });

    if (rpcError || !data) {
      setError("Invalid credentials. Access denied.");
    } else {
      localStorage.setItem("wv_admin", "true");
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      position: "relative",
      zIndex: 1,
    }}>
      {/* TOP BAR / NAVIGATION */}
      <div style={{
        position: "absolute",
        top: 24,
        left: 20,
        right: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 900,
        margin: "0 auto",
        zIndex: 10,
      }}>
        <button 
          onClick={() => navigate("/")} 
          style={{
            display: "flex", 
            alignItems: "center", 
            gap: 8,
            background: isLight ? "rgba(239,68,68,0.08)" : "rgba(0,240,255,0.05)",
            border: isLight ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(0,240,255,0.2)",
            borderRadius: "10px",
            padding: "8px 16px",
            color: isLight ? "#dc2626" : "#ff6060",
            cursor: "pointer", 
            fontSize: "13px",
            fontWeight: "bold",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1.5,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isLight ? "rgba(239,68,68,0.15)" : "rgba(0,240,255,0.15)";
            e.currentTarget.style.border = isLight ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(0,240,255,0.6)";
            e.currentTarget.style.boxShadow = isLight ? "0 2px 12px rgba(239,68,68,0.2)" : "0 0 20px rgba(0,240,255,0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isLight ? "rgba(239,68,68,0.08)" : "rgba(0,240,255,0.05)";
            e.currentTarget.style.border = isLight ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(0,240,255,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ← HOME
        </button>

        <ThemeToggle />
      </div>

      <div style={{
        width: "100%",
        maxWidth: 400,
        marginTop: "40px",
        background: isLight ? "rgba(253, 251, 247, 0.95)" : "rgba(0,240,255,0.03)",
        border: isLight ? "1px solid rgba(2, 132, 199, 0.25)" : "1px solid rgba(0,240,255,0.2)",
        borderRadius: 20,
        padding: 36,
        backdropFilter: "blur(20px)",
        boxShadow: isLight
          ? "0 10px 40px rgba(0,0,0,0.08), 0 0 20px rgba(2,132,199,0.1)"
          : "0 0 40px rgba(0,240,255,0.08)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}>
        {/* TOP GLOW LINE */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1,
          background: isLight
            ? "linear-gradient(90deg, transparent, #0284c7, transparent)"
            : "linear-gradient(90deg, transparent, #00f0ff, transparent)",
        }}/>

        {/* ICON */}
        <div style={{
          width: 60, height: 60,
          background: isLight ? "rgba(2,132,199,0.08)" : "rgba(0,240,255,0.08)",
          border: isLight ? "1px solid rgba(2,132,199,0.3)" : "1px solid rgba(0,240,255,0.3)",
          borderRadius: 16,
          display: "flex", alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: isLight ? "0 4px 15px rgba(2,132,199,0.15)" : "0 0 20px rgba(0,240,255,0.15)",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2"
              stroke={isLight ? "#0284c7" : "#00f0ff"} strokeWidth="1.5"
              fill={isLight ? "rgba(2,132,199,0.1)" : "rgba(0,240,255,0.1)"}/>
            <path d="M7 11V7a5 5 0 0110 0v4"
              stroke={isLight ? "#0284c7" : "#00f0ff"} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1.5" fill={isLight ? "#0284c7" : "#00f0ff"}/>
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 18, fontWeight: 700,
          color: isLight ? "#0284c7" : "#00f0ff",
          textAlign: "center",
          letterSpacing: 3, marginBottom: 6,
          textShadow: isLight ? "0 0 10px rgba(2,132,199,0.2)" : "0 0 15px rgba(0,240,255,0.4)",
        }}>
          ADMIN ACCESS
        </h2>
        <p style={{
          textAlign: "center", fontSize: 12,
          color: isLight ? "#64748b" : "rgba(255,255,255,0.3)",
          marginBottom: 28, letterSpacing: 0.5,
          fontWeight: isLight ? 500 : 400,
        }}>
          Authorized personnel only
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 10,
              color: isLight ? "#0284c7" : "rgba(0,240,255,0.6)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2, marginBottom: 8,
              fontWeight: 600,
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
                background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(0,240,255,0.05)",
                border: isLight ? "1px solid rgba(2, 132, 199, 0.3)" : "1px solid rgba(0,240,255,0.2)",
                borderRadius: 10,
                color: isLight ? "#1e293b" : "#e0f0ff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={e => {
                e.target.style.borderColor = isLight ? "rgba(2,132,199,0.7)" : "rgba(0,240,255,0.6)";
                e.target.style.boxShadow = isLight ? "0 0 10px rgba(2,132,199,0.15)" : "none";
              }}
              onBlur={e => {
                e.target.style.borderColor = isLight ? "rgba(2,132,199,0.3)" : "rgba(0,240,255,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 10,
              color: isLight ? "#0284c7" : "rgba(0,240,255,0.6)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2, marginBottom: 8,
              fontWeight: 600,
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
                background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(0,240,255,0.05)",
                border: isLight ? "1px solid rgba(2, 132, 199, 0.3)" : "1px solid rgba(0,240,255,0.2)",
                borderRadius: 10,
                color: isLight ? "#1e293b" : "#e0f0ff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={e => {
                e.target.style.borderColor = isLight ? "rgba(2,132,199,0.7)" : "rgba(0,240,255,0.6)";
                e.target.style.boxShadow = isLight ? "0 0 10px rgba(2,132,199,0.15)" : "none";
              }}
              onBlur={e => {
                e.target.style.borderColor = isLight ? "rgba(2,132,199,0.3)" : "rgba(0,240,255,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: "10px 14px",
              background: isLight ? "rgba(239,68,68,0.1)" : "rgba(255,60,60,0.1)",
              border: isLight ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,60,60,0.3)",
              borderRadius: 8,
              color: isLight ? "#dc2626" : "#ff8080",
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
                ? (isLight ? "rgba(2,132,199,0.05)" : "rgba(0,240,255,0.05)")
                : isLight
                  ? "linear-gradient(135deg, #0284c7, #0369a1)"
                  : "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,240,255,0.05))",
              border: isLight ? "none" : "1px solid rgba(0,240,255,0.4)",
              borderRadius: 10,
              color: isLight ? "#ffffff" : "#00f0ff",
              fontSize: 13,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: (!username || !password) ? 0.5 : 1,
              boxShadow: isLight && !loading && username && password ? "0 4px 14px rgba(2, 132, 199, 0.3)" : "none",
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 14, height: 14,
                  border: isLight ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(0,240,255,0.3)",
                  borderTop: isLight ? "2px solid #ffffff" : "2px solid #00f0ff",
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
          input::placeholder { color: ${isLight ? "rgba(100,116,139,0.6)" : "rgba(255,255,255,0.2)"}; }
        `}</style>
      </div>
    </div>
  );
}