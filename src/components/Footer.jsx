import { useState } from "react";

const TEAM = [
  {
    name: "Pawan Kumar G",
    role: "Chief Architect",
    emoji: "⚙️",
    linkedin: "https://www.linkedin.com/in/pawan-kumar-g-54530134b",
    color: "#00f0ff",
  },
  {
    name: "Keerthana D",
    role: "Director of Vault Operations",
    emoji: "🛡️",
    linkedin: "https://www.linkedin.com/in/keerthana-d-653313398",
    color: "#a855f7",
  },
  {
    name: "Poorvi V Bharadwaj",
    role: "Head of Vault UX",
    emoji: "🎨",
    linkedin: "https://www.linkedin.com/in/poorvi-v-bharadwaj-603837391",
    color: "#f59e0b",
  },
  {
    name: "Poorvika MJ",
    role: "Vault Ambassador",
    emoji: "🚀",
    linkedin: "https://www.linkedin.com/in/poorvika-mj-aba066392",
    color: "#10b981",
  },
];

function LinkedInButtonContent({ color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={`${color}20`}
          stroke={color}
          strokeWidth="2"
        />
        <path d="M7 10v7" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="7" r="1" fill={color} />
        <path
          d="M11 17v-3.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontSize: "9px",
          fontWeight: "700",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "0.5px",
          color: color,
        }}
      >
        LinkedIn
      </span>
    </div>
  );
}

export default function Footer() {
  const [showTeam, setShowTeam] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

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
            background: "rgba(0,0,10,0.85)",
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
              maxWidth: 400, // REDUCED from 520px
              background: "linear-gradient(135deg, rgba(8,8,30,0.98), rgba(4,4,20,0.98))",
              border: "1px solid rgba(0,240,255,0.25)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(0,240,255,0.12), 0 0 120px rgba(0,240,255,0.05)",
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
                padding: "20px 20px 16px", // REDUCED padding
                borderBottom: "1px solid rgba(0,240,255,0.08)",
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
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid red",
                  borderRadius: 8,
                  color: "red",
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
                  width: 72, // REDUCED from 96px
                  height: 72,
                  borderRadius: 24,
                  overflow: "hidden",
                  marginBottom: 12,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 0 22px rgba(0,240,255,0.22), 0 0 45px rgba(168,85,247,0.16), 0 0 70px rgba(245,158,11,0.12)",
                  background: "rgba(255,255,255,0.03)",
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
                  fontSize: 16, // REDUCED from 18px
                  fontWeight: 700,
                  color: "#00f0ff",
                  letterSpacing: 3,
                  textShadow: "0 0 20px rgba(0,240,255,0.5)",
                  marginBottom: 4,
                }}
              >
                TEAM UDBHAV
              </div>

              <div
                style={{
                  fontSize: 10, // REDUCED from 11px
                  color: "rgba(168,85,247,0.75)",
                  textShadow: "0 0 10px rgba(168,85,247,0.35)",
                  letterSpacing: 2,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                THE ARCHITECTS OF WISDOM VAULT
              </div>
            </div>

            {/* TEAM MEMBERS */}
            <div style={{ padding: "12px 16px 18px" }}> {/* REDUCED padding */}
              {TEAM.map((member, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredMember(i)}
                  onMouseLeave={() => setHoveredMember(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10, // REDUCED gap
                    padding: "10px 12px", // REDUCED padding
                    borderRadius: 12,
                    marginBottom: 6, // REDUCED margin
                    background: `${member.color}08`,
                    border: `1px solid ${member.color}30`,
                    transition: "all 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      width: 32, // REDUCED from 42px
                      height: 32,
                      borderRadius: 12,
                      background: `${member.color}15`,
                      border: `1px solid ${member.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16, // REDUCED from 20px
                      flexShrink: 0,
                      boxShadow: `0 0 15px ${member.color}30`,
                    }}
                  >
                    {member.emoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12, // REDUCED from 14px
                        fontWeight: 600,
                        color: member.color,
                        marginBottom: 2,
                        textShadow: `0 0 12px ${member.color}60`,
                      }}
                    >
                      {member.name}
                    </div>
                    <div
                      style={{
                        fontSize: 9, // REDUCED from 10px
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "'Orbitron', sans-serif",
                        letterSpacing: 1.5,
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
                      height: 28, // REDUCED from 36px
                      borderRadius: 9,
                      background: `${member.color}18`,
                      border: `1px solid ${member.color}55`,
                      transition: "all 0.25s",
                      flexShrink: 0,
                      textDecoration: "none",
                      boxShadow: `0 0 10px ${member.color}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.background = `${member.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.background = `${member.color}18`;
                    }}
                  >
                    <LinkedInButtonContent color={member.color} />
                  </a>
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "10px 16px 16px", // REDUCED padding
                borderTop: "1px solid rgba(0,240,255,0.06)",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12, // REDUCED from 14px
                color: "#00f0ff",
                letterSpacing: 3,
              }}
            >
              Per Aspera Ad Astra ✨
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(0,240,255,0.08)",
          background: "rgba(4,4,16,0.9)",
          backdropFilter: "blur(20px)",
          padding: "16px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            flexWrap: "wrap",
            fontSize: 20,
          }}
        >
          <span
            style={{
              color: "#00f0ff",
              fontStyle: "italic",
              textShadow: "0 0 10px rgba(0,240,255,0.7), 0 0 20px rgba(0,240,255,0.4)",
              fontWeight: 500,
            }}
          >
            Built with Purpose, Preserved for Excellence
          </span>

          <span style={{ color: "rgba(255,255,255,0.35)" }}>
            {" "}
            | Built, Tested and Optimized by{" "}
          </span>

          <button
            onClick={() => setShowTeam(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ff8c00",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textShadow: "0 0 14px rgba(255,140,0,1), 0 0 32px rgba(255,140,0,0.9), 0 0 60px rgba(255,140,0,0.7)",
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