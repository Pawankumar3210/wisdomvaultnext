import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubjectCard({ subject, contents }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

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
    { label: "Notes", count: notes.length, color: "#00f0ff" },
    { label: "Q-Banks", count: qbs.length, color: "#a855f7" },
    { label: "Papers", count: papers.length, color: "#f59e0b" },
  ];

  return (
    <div 
      style={{
        background: "rgba(0,240,255,0.03)",
        border: "1px solid rgba(0,240,255,0.15)",
        borderRadius: 16,
        padding: expanded ? 24 : 20,
        backdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: expanded ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={!expanded ? handleCardClick : undefined}
      onMouseEnter={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = "rgba(0,240,255,0.5)";
          e.currentTarget.style.boxShadow = "0 0 30px rgba(0,240,255,0.2)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={e => {
        if (!expanded) {
          e.currentTarget.style.borderColor = "rgba(0,240,255,0.15)";
          e.currentTarget.style.boxShadow = "none";
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
            background: "rgba(0,240,255,0.1)",
            border: "1px solid rgba(0,240,255,0.4)",
            color: "#67e8f9",
            padding: "8px 18px",
            borderRadius: 50,
            fontSize: 12.5,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          ← CLOSE SUBJECT 
        </button>
      )}

      {/* Subject Header */}
      <div style={{ marginBottom: expanded ? 20 : 16, paddingTop: expanded ? 50 : 0 }}>
        <div style={{
          fontSize: 11, color: "rgba(0,240,255,0.6)",
          fontFamily: "'Orbitron', sans-serif", letterSpacing: 2.5, marginBottom: 6
        }}>
          {subject.code}
        </div>
        <div style={{
          fontSize: expanded ? 20 : 17,
          fontWeight: 700,
          color: "#e0f0ff",
          letterSpacing: 0.5,
          lineHeight: 1.3,
        }}>
          {subject.name}
        </div>
      </div>

      {/* ✅ STATS SECTION - REDUCED SIZE */}
      <div style={{ display: "flex", gap: 6, marginBottom: expanded ? 20 : 14 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, textAlign: "center", padding: "8px 6px",
            background: `${s.color}10`, border: `1px solid ${s.color}25`, borderRadius: 8,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div>
          {[
            { label: "Notes", items: notes, color: "#00f0ff" },
            { label: "Question Banks", items: qbs, color: "#a855f7" },
            { label: "Previous Papers", items: papers, color: "#f59e0b" },
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
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    marginBottom: 10,
                  }}>
                    <div style={{ fontSize: 15, color: "#e0f0ff", marginBottom: 12 }}>
                      {item.title}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => navigate(`/pdf/${item.id}`)}
                        style={{
                          flex: 1, padding: "10px", background: `${section.color}15`,
                          border: `1px solid ${section.color}40`, borderRadius: 8,
                          color: section.color, fontSize: 12.5, fontFamily: "'Orbitron', sans-serif"
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
                          flex: 1, padding: "10px", background: `${section.color}15`,
                          border: `1px solid ${section.color}40`, borderRadius: 8,
                          color: section.color, fontSize: 12.5, fontFamily: "'Orbitron', sans-serif"
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
          textAlign: "center", marginTop: 12, color: "#67e8f9",
          fontSize: 12.5, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1.5
        }}>
          CLICK TO EXPAND SUBJECT →
        </div>
      )}
    </div>
  );
}