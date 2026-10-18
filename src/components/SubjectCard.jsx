import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function SubjectCard({ subject, contents }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { isLight } = useTheme();

  const notes = contents?.filter(c => c.type === "note") || [];
  const qbs = contents?.filter(c => c.type === "qb") || [];
  const papers = contents?.filter(c => c.type === "paper") || [];

  const handleCardClick = () => {
    if (!expanded) setExpanded(true);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setExpanded(false);
  };

  const stats = [
    { label: "Notes", count: notes.length, color: isLight ? "#0284c7" : "#00f0ff" },
    { label: "Q-Banks", count: qbs.length, color: isLight ? "#7c3aed" : "#a855f7" },
    { label: "Papers", count: papers.length, color: isLight ? "#d97706" : "#f59e0b" },
  ];

  const defaultBorder = isLight ? "rgba(2, 132, 199, 0.22)" : "rgba(0,240,255,0.15)";
  const defaultShadow = isLight ? "0 4px 20px rgba(2, 132, 199, 0.06)" : "none";
  const hoverBorder = isLight ? "rgba(2, 132, 199, 0.55)" : "rgba(0,240,255,0.5)";
  const hoverShadow = isLight ? "0 8px 30px rgba(2, 132, 199, 0.16)" : "0 0 30px rgba(0,240,255,0.2)";

  return (
    <div 
      style={{
        background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(0,240,255,0.03)",
        border: `1px solid ${defaultBorder}`,
        borderRadius: 16,
        padding: expanded ? 24 : 20,
        backdropFilter: "blur(12px)",
        boxShadow: defaultShadow,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: expanded ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={!expanded ? handleCardClick : undefined}
      onMouseEnter={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = hoverBorder;
          e.currentTarget.style.boxShadow = hoverShadow;
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = defaultBorder;
          e.currentTarget.style.boxShadow = defaultShadow;
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Back Button */}
      {expanded && (
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            top: 16,
            left: 20,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: isLight ? "rgba(2, 132, 199, 0.1)" : "rgba(0,240,255,0.1)",
            border: isLight ? "1px solid rgba(2, 132, 199, 0.4)" : "1px solid rgba(0,240,255,0.4)",
            color: isLight ? "#0284c7" : "#67e8f9",
            padding: "8px 18px",
            borderRadius: 50,
            fontSize: 12.5,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ← CLOSE SUBJECT 
        </button>
      )}

      {/* Subject Header */}
      <div style={{ marginBottom: expanded ? 20 : 16, paddingTop: expanded ? 50 : 0 }}>
        <div style={{
          fontSize: 11,
          color: isLight ? "#0284c7" : "rgba(0,240,255,0.6)",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: 2.5,
          marginBottom: 6,
          fontWeight: 600,
        }}>
          {subject.code}
        </div>
        <div style={{
          fontSize: expanded ? 20 : 17,
          fontWeight: 700,
          color: isLight ? "#1e293b" : "#e0f0ff",
          letterSpacing: 0.5,
          lineHeight: 1.3,
        }}>
          {subject.name}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: expanded ? 24 : 16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            textAlign: "center",
            padding: "11px 8px",
            background: isLight ? `${s.color}12` : `${s.color}10`,
            border: isLight ? `1px solid ${s.color}35` : `1px solid ${s.color}30`,
            borderRadius: 10,
            boxShadow: isLight ? "0 2px 6px rgba(0,0,0,0.03)" : "none",
          }}>
            <div style={{ fontSize: 21, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{
              fontSize: 10,
              fontWeight: isLight ? 600 : 400,
              color: isLight ? "#64748b" : "rgba(255,255,255,0.5)",
              marginTop: 3,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div>
          {[
            { label: "Notes", items: notes, color: isLight ? "#0284c7" : "#00f0ff" },
            { label: "Question Banks", items: qbs, color: isLight ? "#7c3aed" : "#a855f7" },
            { label: "Previous Papers", items: papers, color: isLight ? "#d97706" : "#f59e0b" },
          ].map((section, si) => (
            section.items.length > 0 && (
              <div key={si} style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: section.color,
                  letterSpacing: 2, fontFamily: "'Orbitron', sans-serif",
                  marginBottom: 10, display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: section.color }} />
                  {section.label.toUpperCase()}
                </div>

                {section.items.map((item) => (
                  <div key={item.id} style={{
                    padding: "16px 18px",
                    background: isLight ? "rgba(247, 244, 238, 0.9)" : "rgba(255,255,255,0.03)",
                    border: isLight ? "1px solid rgba(2, 132, 199, 0.15)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    marginBottom: 10,
                    boxShadow: isLight ? "0 2px 6px rgba(0,0,0,0.03)" : "none",
                  }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: isLight ? "#1e293b" : "#e0f0ff",
                      marginBottom: 12,
                    }}>
                      {item.title}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => navigate(`/pdf/${item.id}`)}
                        style={{
                          flex: 1, padding: "10px",
                          background: isLight ? `${section.color}15` : `${section.color}15`,
                          border: isLight ? `1px solid ${section.color}50` : `1px solid ${section.color}40`,
                          borderRadius: 8,
                          color: section.color, fontSize: 12.5, fontFamily: "'Orbitron', sans-serif",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        👁️ VIEW
                      </button>
                      <button
                        onClick={async () => {
                          const res = await fetch(item.pdf_url);
                          const blob = await res.blob();
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${item.title}.pdf`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        style={{
                          flex: 1, padding: "10px",
                          background: isLight ? `${section.color}15` : `${section.color}15`,
                          border: isLight ? `1px solid ${section.color}50` : `1px solid ${section.color}40`,
                          borderRadius: 8,
                          color: section.color, fontSize: 12.5, fontFamily: "'Orbitron', sans-serif",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        ⬇️ DOWNLOAD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      )}

      {!expanded && (
        <div style={{
          textAlign: "center", marginTop: 12,
          color: isLight ? "#0284c7" : "#67e8f9",
          fontSize: 12.5, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5,
          fontWeight: 600,
        }}>
          CLICK TO EXPAND SUBJECT →
        </div>
      )}
    </div>
  );
}