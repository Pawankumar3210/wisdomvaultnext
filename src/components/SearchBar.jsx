import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => fetchSuggestions(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchSuggestions = async (q) => {
    setLoading(true);

    const searchTerms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);

    // Build OR conditions for better fuzzy search
    let queryBuilder = supabase
      .from("content")
      .select("id, title, type, subject_id, subjects(name)");

    // Apply multiple filters for each word
    searchTerms.forEach(term => {
      queryBuilder = queryBuilder.ilike("title", `%${term}%`);
    });

    const { data: contentData } = await queryBuilder.limit(6);

    const { data: subjectData } = await supabase
      .from("subjects")
      .select("id, name, code")
      .or(
        searchTerms.map(term => 
          `name.ilike.%${term}%,code.ilike.%${term}%`
        ).join(',')
      )
      .limit(3);

    const results = [];

    if (contentData) {
      contentData.forEach(item => {
        results.push({
          id: item.id,
          label: item.title,
          sublabel: item.subjects?.name || "",
          type: item.type,
          kind: "content",
        });
      });
    }

    if (subjectData) {
      subjectData.forEach(item => {
        results.push({
          id: item.id,
          label: item.name,
          sublabel: item.code,
          type: "subject",
          kind: "subject",
        });
      });
    }

    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setLoading(false);
  };

  const getTypeColor = (type) => {
    if (type === "note") return "#00f0ff";
    if (type === "qb") return "#a855f7";
    if (type === "paper") return "#f59e0b";
    return "#00f0ff";
  };

  const getTypeLabel = (type) => {
    if (type === "note") return "NOTE";
    if (type === "qb") return "QB";
    if (type === "paper") return "PAPER";
    if (type === "subject") return "SUBJECT";
    return type?.toUpperCase();
  };

  const handleSelect = (item) => {
    setShowSuggestions(false);
    setQuery("");
    if (item.kind === "content") {
      navigate(`/pdf/${item.id}`);
    } else {
      navigate(`/?subject=${item.id}`);
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ position: "relative" }}>
        <svg style={{
          position: "absolute", left: 16, top: "50%",
          transform: "translateY(-50%)",
          width: 20, height: 20, opacity: 0.5,
        }} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#00f0ff" strokeWidth="2"/>
          <path d="M21 21l-4-4" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search notes, question banks, papers..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          style={{
            width: "100%",
            padding: "16px 16px 16px 48px",
            background: "rgba(0,240,255,0.05)",
            border: "1px solid rgba(0,240,255,0.3)",
            borderRadius: 12,
            color: "#e0f0ff",
            fontSize: 15,
            outline: "none",
            boxShadow: query ? "0 0 20px rgba(0,240,255,0.15)" : "none",
            transition: "all 0.3s",
            boxSizing: "border-box",
          }}
        />
        {loading && (
          <div style={{
            position: "absolute", right: 16, top: "50%",
            transform: "translateY(-50%)",
            width: 16, height: 16,
            border: "2px solid rgba(0,240,255,0.3)",
            borderTop: "2px solid #00f0ff",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}/>
        )}
      </div>

      {showSuggestions && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)",
          left: 0, right: 0, zIndex: 1000,
          background: "rgba(8,8,30,0.97)",
          border: "1px solid rgba(0,240,255,0.25)",
          borderRadius: 12,
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          {suggestions.map((item, i) => (
            <div key={i}
              onClick={() => handleSelect(item)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? "1px solid rgba(0,240,255,0.08)" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,240,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                fontSize: 9, fontWeight: 700,
                padding: "2px 7px", borderRadius: 4,
                color: getTypeColor(item.type),
                background: `${getTypeColor(item.type)}18`,
                border: `1px solid ${getTypeColor(item.type)}40`,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: 1,
                whiteSpace: "nowrap",
              }}>
                {getTypeLabel(item.type)}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: "#e0f0ff", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.label}
                </div>
                {item.sublabel && (
                  <div style={{ fontSize: 11, color: "rgba(0,240,255,0.5)", marginTop: 2 }}>
                    {item.sublabel}
                  </div>
                )}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}