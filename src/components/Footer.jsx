import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const TEAM = [
  {
    name: "Pawan Kumar G",
    role: "Chief Architect",
    emoji: "⚙️",
    linkedin: "https://www.linkedin.com/in/pawan-kumar-g-54530134b",
    color: "#0284c7",
    colorDark: "#00f0ff",
  },
  {
    name: "Keerthana D",
    role: "Director of Vault Operations",
    emoji: "🛡️",
    linkedin: "https://www.linkedin.com/in/keerthana-d-653313398",
    color: "#7c3aed",
    colorDark: "#a855f7",
  },
  {
    name: "Poorvi V Bharadwaj",
    role: "Head of Vault UX",
    emoji: "🎨",
    linkedin: "https://www.linkedin.com/in/poorvi-v-bharadwaj-603837391",
    color: "#d97706",
    colorDark: "#f59e0b",
  },
  {
    name: "Poorvika MJ",
    role: "Vault Ambassador",
    emoji: "🚀",
    linkedin: "https://www.linkedin.com/in/poorvika-mj-aba066392",
    color: "#059669",
    colorDark: "#10b981",
  },
];

const CONTRIBUTORS = [
  {
    name: "Aaditya Chaurasiya",
    linkedin: "https://www.linkedin.com/in/aaditya-chaurasiya-bb85b3315?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    color: "#2563eb",
    colorDark: "#60a5fa",
  },
  {
    name: "Shreya V",
    linkedin: "https://www.linkedin.com/in/shreya-v-4344403b7/",
    color: "#db2777",
    colorDark: "#f472b6",
  },
  {
    name: "Ullas N",
    linkedin: "https://www.linkedin.com/in/ullas-n-3b655040a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    color: "#059669",
    colorDark: "#34d399",
  },
  {
    name: "Vijay Bhadra",
    linkedin: "https://www.linkedin.com/in/vijay-bhadra-m-b19b71292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    color: "#ea580c",
    colorDark: "#fb923c",
  },
];

function LinkedInButtonContent({ color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={`${color}20`} stroke={color} strokeWidth="2" />
        <path d="M7 10v7" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="7" r="1" fill={color} />
        <path d="M11 17v-3.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: "9px", fontWeight: "700", fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.5px", color: color }}>
        LinkedIn
      </span>
    </div>
  );
}

export default function Footer() {
  const [showTeam, setShowTeam] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const { isLight } = useTheme();

  return (
    <>
      {/* TEAM MODAL */}
      {showTeam && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowTeam(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: isLight ? "rgba(15, 23, 42, 0.45)" : "rgba(0,0,10,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            animation: "modalFadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              background: isLight
                ? "linear-gradient(135deg, rgba(253, 251, 247, 0.98), rgba(246, 242, 235, 0.98))"
                : "linear-gradient(135deg, rgba(8,8,30,0.98), rgba(4,4,20,0.98))",
              border: isLight ? "1px solid rgba(2, 132, 199, 0.3)" : "1px solid rgba(0,240,255,0.25)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: isLight
                ? "0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(2,132,199,0.1)"
                : "0 0 60px rgba(0,240,255,0.12), 0 0 120px rgba(0,240,255,0.05)",
              animation: "modalSlideUp 0.35s ease",
              position: "relative",
            }}
          >
            {/* FULL GRADIENT BORDER */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "2px",
                borderRadius: 20,
                background: "linear-gradient(135deg, #00f0ff, #a855f7, #f59e0b, #10b981, #00f0ff)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              }}
            />

            {/* HEADER */}
            <div
              style={{
                padding: "20px 20px 16px",
                borderBottom: isLight ? "1px solid rgba(2, 132, 199, 0.12)" : "1px solid rgba(0,240,255,0.08)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setShowTeam(false)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 28,
                  height: 28,
                  background: isLight ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)",
                  border: isLight ? "1px solid rgba(239,68,68,0.4)" : "1px solid red",
                  borderRadius: 8,
                  color: isLight ? "#dc2626" : "red",
                  cursor: "pointer",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>

              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 24,
                  overflow: "hidden",
                  marginBottom: 12,
                  border: isLight ? "1px solid rgba(2, 132, 199, 0.2)" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isLight
                    ? "0 4px 20px rgba(2, 132, 199, 0.15)"
                    : "0 0 22px rgba(0,240,255,0.22), 0 0 45px rgba(168,85,247,0.16)",
                  background: isLight ? "#FDFBF7" : "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/team-udbhav-logo.png.jpeg"
                  alt="Team Udbhav"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: isLight ? "#0284c7" : "#00f0ff",
                  letterSpacing: 3,
                  textShadow: isLight ? "0 0 15px rgba(2, 132, 199, 0.25)" : "0 0 20px rgba(0,240,255,0.5)",
                  marginBottom: 4,
                }}
              >
                TEAM UDBHAV
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: isLight ? "#7c3aed" : "rgba(168,85,247,0.75)",
                  textShadow: isLight ? "none" : "0 0 10px rgba(168,85,247,0.35)",
                  letterSpacing: 2,
                  fontWeight: 600,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                THE ARCHITECTS OF WISDOM VAULT
              </div>
            </div>

            {/* TEAM MEMBERS */}
            <div style={{ padding: "12px 16px 18px" }}>
              {TEAM.map((member, i) => {
                const memberColor = isLight ? member.color : member.colorDark;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 12,
                      marginBottom: 6,
                      background: isLight ? `${memberColor}10` : `${memberColor}08`,
                      border: isLight ? `1px solid ${memberColor}40` : `1px solid ${memberColor}30`,
                      boxShadow: isLight ? "0 2px 6px rgba(0,0,0,0.02)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 12,
                        background: `${memberColor}15`,
                        border: `1px solid ${memberColor}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                        boxShadow: `0 0 12px ${memberColor}25`,
                      }}
                    >
                      {member.emoji}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: memberColor,
                          marginBottom: 2,
                        }}
                      >
                        {member.name}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: isLight ? "#64748b" : "rgba(255,255,255,0.35)",
                          fontFamily: "'Orbitron', sans-serif",
                          letterSpacing: 1.5,
                          fontWeight: isLight ? 600 : 400,
                        }}
                      >
                        {member.role}
                      </div>
                    </div>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        height: 28,
                        borderRadius: 9,
                        background: `${memberColor}18`,
                        border: `1px solid ${memberColor}55`,
                        transition: "all 0.25s",
                        flexShrink: 0,
                        textDecoration: "none",
                        boxShadow: isLight ? `0 2px 6px ${memberColor}25` : `0 0 10px ${memberColor}40`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.background = `${memberColor}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = `${memberColor}18`;
                      }}
                    >
                      <LinkedInButtonContent color={memberColor} />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* CONTENT CONTRIBUTORS LINK */}
            <div style={{ padding: "0 16px 10px", textAlign: "center" }}>
              <span
                onClick={() => setShowContributors(true)}
                style={{
                  cursor: "pointer",
                  color: isLight ? "#d97706" : "#fbbf24",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                  textShadow: isLight
                    ? "0 0 10px rgba(217, 119, 6, 0.25)"
                    : "0 0 10px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.3)",
                  transition: "all 0.2s",
                }}
              >
                ✨ Content Contributors
              </span>
            </div>

            {/* SEPARATOR LINE */}
            <div
              style={{
                margin: "0 16px 12px",
                borderTop: isLight ? "1px solid rgba(2, 132, 199, 0.12)" : "1px solid rgba(0,240,255,0.06)",
              }}
            />

            {/* FOOTER TEXT */}
            <div
              style={{
                textAlign: "center",
                padding: "0 16px 16px",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: isLight ? "#0284c7" : "#00f0ff",
                letterSpacing: 3,
              }}
            >
              Per Aspera Ad Astra ✨
            </div>
          </div>
        </div>
      )}

      {/* CONTENT CONTRIBUTORS OVERLAY */}
      {showContributors && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowContributors(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1001,
            background: isLight ? "rgba(15, 23, 42, 0.35)" : "rgba(0,0,10,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            animation: "modalFadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 320,
              background: isLight
                ? "linear-gradient(135deg, rgba(253, 251, 247, 0.98), rgba(246, 242, 235, 0.98))"
                : "linear-gradient(135deg, rgba(8,8,30,0.98), rgba(4,4,20,0.98))",
              border: isLight ? "1px solid rgba(217, 119, 6, 0.35)" : "1px solid rgba(251, 191, 36, 0.3)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: isLight
                ? "0 20px 60px rgba(0,0,0,0.15), 0 0 30px rgba(217, 119, 6, 0.1)"
                : "0 0 60px rgba(251, 191, 36, 0.15), 0 0 120px rgba(251, 191, 36, 0.05)",
              animation: "modalSlideUp 0.35s ease",
              position: "relative",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: "28px 16px 12px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setShowContributors(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 28,
                  height: 28,
                  background: isLight ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)",
                  border: isLight ? "1px solid rgba(239,68,68,0.4)" : "1px solid red",
                  borderRadius: 8,
                  color: isLight ? "#dc2626" : "red",
                  cursor: "pointer",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>

              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: isLight ? "#d97706" : "#fbbf24",
                  letterSpacing: 2,
                  textShadow: isLight ? "none" : "0 0 20px rgba(251, 191, 36, 0.5)",
                  marginBottom: 8,
                  marginTop: 4,
                }}
              >
                🌟 CONTENT CONTRIBUTORS
              </div>

              <div
                style={{
                  fontSize: 10,
                  fontWeight: isLight ? 600 : 400,
                  color: isLight ? "#0284c7" : "#00f0ff",
                  textShadow: isLight ? "none" : "0 0 10px rgba(0, 240, 255, 0.5)",
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: 1,
                }}
              >
                Thank you for helping us to expand to all CSE departments!
              </div>
            </div>

            {/* CONTRIBUTORS LIST */}
            <div style={{ padding: "8px 12px 16px" }}>
              {CONTRIBUTORS.map((contributor, i) => {
                const contribColor = isLight ? contributor.color : contributor.colorDark;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 10,
                      marginBottom: 4,
                      background: isLight ? `${contribColor}10` : `${contribColor}08`,
                      border: isLight ? `1px solid ${contribColor}35` : `1px solid ${contribColor}30`,
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: contribColor,
                        }}
                      >
                        {contributor.name}
                      </div>
                    </div>

                    <a
                      href={contributor.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        height: 26,
                        borderRadius: 9,
                        background: `${contribColor}18`,
                        border: `1px solid ${contribColor}55`,
                        transition: "all 0.25s",
                        flexShrink: 0,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.background = `${contribColor}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = `${contribColor}18`;
                      }}
                    >
                      <LinkedInButtonContent color={contribColor} />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}
            <div
              style={{
                textAlign: "center",
                padding: "0 16px 16px",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color: isLight ? "#0284c7" : "#00f0ff",
                letterSpacing: 2,
              }}
            >
              Your contribution matters ✨
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          borderTop: isLight ? "1px solid rgba(2, 132, 199, 0.18)" : "1px solid rgba(0,240,255,0.08)",
          background: isLight ? "rgba(253, 251, 247, 0.95)" : "rgba(4,4,16,0.9)",
          backdropFilter: "blur(20px)",
          padding: "16px 20px",
          textAlign: "center",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            flexWrap: "wrap",
            fontSize: "clamp(15px, 2.5vw, 19px)",
          }}
        >
          <span
            style={{
              color: isLight ? "#0284c7" : "#00f0ff",
              fontStyle: "italic",
              textShadow: isLight
                ? "0 0 10px rgba(2, 132, 199, 0.25)"
                : "0 0 10px rgba(0,240,255,0.7), 0 0 20px rgba(0,240,255,0.4)",
              fontWeight: 600,
            }}
          >
            Built with Purpose, Preserved for Excellence
          </span>

          <span style={{ color: isLight ? "#64748b" : "rgba(255,255,255,0.35)", fontWeight: isLight ? 500 : 400 }}>
            {" "}
            | Built, Tested and Optimized by{" "}
          </span>

          <button
            onClick={() => setShowTeam(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isLight ? "#ea580c" : "#ff8c00",
              fontSize: "inherit",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textShadow: isLight
                ? "0 0 12px rgba(234, 88, 12, 0.35)"
                : "0 0 14px rgba(255,140,0,1), 0 0 32px rgba(255,140,0,0.9), 0 0 60px rgba(255,140,0,0.7)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 1,
              padding: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Team Udbhav
          </button>
        </div>

        <style>{`
          @keyframes modalFadeIn { from{opacity:0} to{opacity:1} }
          @keyframes modalSlideUp {
            from{ opacity:0; transform:translateY(30px) scale(0.96) }
            to{ opacity:1; transform:translateY(0) scale(1) }
          }
        `}</style>
      </footer>
    </>
  );
}