import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import FuturisticLoader from "../components/FuturisticLoader";

export default function PDFViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLight } = useTheme();

  useEffect(() => {
    fetchContent();
  }, [id]); // eslint-disable-line

  const fetchContent = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("content")
      .select("*, subjects(name)")
      .eq("id", id)
      .single();
    if (fetchError) {
      setError("Content not found");
    } else {
      setContent(data);
    }
    setLoading(false);
  };

  const getTypeColor = (type) => {
    if (isLight) {
      if (type === "note") return "#0284c7";
      if (type === "qb") return "#7c3aed";
      if (type === "paper") return "#d97706";
      return "#0284c7";
    }
    if (type === "note") return "#00f0ff";
    if (type === "qb") return "#a855f7";
    if (type === "paper") return "#f59e0b";
    return "#00f0ff";
  };

  const getTypeLabel = (type) => {
    if (type === "note") return "NOTE";
    if (type === "qb") return "QUESTION BANK";
    if (type === "paper") return "PREVIOUS PAPER";
    return type ? type.toUpperCase() : "";
  };

  if (loading) return <FuturisticLoader text="LOADING DOCUMENT" />;

  if (error) return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 16, padding: 20,
    }}>
      <div style={{ fontSize: 48, color: isLight ? "#dc2626" : "#ff6060" }}>!</div>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        color: isLight ? "#dc2626" : "#ff6060",
        fontSize: 16, letterSpacing: 2,
      }}>
        {error}
      </div>
      <button onClick={() => navigate("/")} style={{
        padding: "10px 24px",
        background: isLight ? "rgba(2,132,199,0.08)" : "rgba(0,240,255,0.08)",
        border: isLight ? "1px solid rgba(2,132,199,0.35)" : "1px solid rgba(0,240,255,0.3)",
        borderRadius: 8,
        color: isLight ? "#0284c7" : "#00f0ff",
        cursor: "pointer", fontSize: 13,
        fontFamily: "'Orbitron', sans-serif",
      }}>
        BACK TO HOME
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* TOP BAR */}
      <div style={{
        background: isLight ? "rgba(253, 251, 247, 0.95)" : "rgba(8,8,24,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: isLight ? "1px solid rgba(2, 132, 199, 0.18)" : "1px solid rgba(0,240,255,0.15)",
        boxShadow: isLight ? "0 2px 10px rgba(0,0,0,0.04)" : "none",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky", top: 0, zIndex: 10,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}>
        <button onClick={() => navigate(-1)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px",
          background: isLight ? "rgba(2,132,199,0.08)" : "rgba(0,240,255,0.06)",
          border: isLight ? "1px solid rgba(2,132,199,0.3)" : "1px solid rgba(0,240,255,0.2)",
          borderRadius: 8,
          color: isLight ? "#0284c7" : "#00f0ff",
          cursor: "pointer", fontSize: 12,
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: 1, flexShrink: 0,
          transition: "all 0.2s ease",
        }}>
          BACK
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 600,
            color: isLight ? "#0f172a" : "#e0f0ff",
            overflow: "hidden", textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {content?.title}
          </div>
          <div style={{
            fontSize: 11,
            color: isLight ? "#64748b" : "rgba(255,255,255,0.4)",
            marginTop: 2,
          }}>
            {content?.subjects?.name}
          </div>
        </div>

        {/* TOP BAR THEME TOGGLE */}
        <div style={{ flexShrink: 0 }}>
          <ThemeToggle />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{
            fontSize: 9, fontWeight: 700,
            padding: "3px 8px", borderRadius: 4,
            color: getTypeColor(content?.type),
            background: `${getTypeColor(content?.type)}18`,
            border: `1px solid ${getTypeColor(content?.type)}40`,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 1,
          }}>
            {getTypeLabel(content?.type)}
          </span>

          <a
            href={content?.pdf_url}
            onClick={async (e) => {
              e.preventDefault();
              const response = await fetch(content?.pdf_url);
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${content?.title}.pdf`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px",
              background: isLight ? "rgba(2,132,199,0.1)" : "rgba(0,240,255,0.1)",
              border: isLight ? "1px solid rgba(2,132,199,0.35)" : "1px solid rgba(0,240,255,0.3)",
              borderRadius: 8,
              color: isLight ? "#0284c7" : "#00f0ff",
              textDecoration: "none", fontSize: 12,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 1,
              transition: "all 0.2s ease",
            }}
          >
            DOWNLOAD
          </a>
        </div>
      </div>

      {/* PDF VIEWER */}
      <div style={{
        width: "100%",
        height: "calc(100vh - 70px)",
        background: isLight ? "#F3EFEA" : "#1a1a2e",
        transition: "background 0.3s ease",
      }}>
        <iframe
          src={content?.pdf_url ? `${content.pdf_url}#toolbar=1&navpanes=0` : ""}
          title={content?.title || "PDF Viewer"}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}