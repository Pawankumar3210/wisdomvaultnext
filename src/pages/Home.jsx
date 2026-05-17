import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SearchBar from "../components/SearchBar";
import SubjectCard from "../components/SubjectCard";
import FuturisticLoader from "../components/FuturisticLoader";
import TopLoadingBar from "../components/TopLoadingBar";
import AnimatedCounter from "../components/AnimatedCounter";
import TypewriterText from "../components/TypewriterText";
import Footer from "../components/Footer"; // IMPORTED FOOTER

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filterSubject = searchParams.get("subject");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: subData } = await supabase
      .from("subjects")
      .select("*")
      .order("name");
    const { data: conData } = await supabase
      .from("content")
      .select("*, subjects(name)")
      .order("created_at", { ascending: false });
    setSubjects(subData || []);
    setContents(conData || []);
    setLoading(false);
  };

  const filteredSubjects = filterSubject
    ? subjects.filter(s => s.id === filterSubject)
    : subjects;

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column"
    }}>
      <TopLoadingBar loading={loading} />

      {/* WRAPPER FOR MAIN CONTENT TO PUSH FOOTER DOWN */}
      <div style={{ flex: 1 }}> 
        {/* HERO SECTION */}
        <div style={{
          textAlign: "center",
          padding: "48px 20px 40px",
          maxWidth: 700,
          margin: "0 auto",
        }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "rgba(0,240,255,0.08)",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: 20,
            fontSize: 11,
            color: "#00f0ff",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: 2,
            marginBottom: 20,
          }}>
            CSE 4TH SEMESTER
          </div>

          <TypewriterText
            text={`"Knowledge is the only treasure that grows when shared."`}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(18px, 3.2vw, 26px)",
              fontWeight: 500,
              color: "#00f0ff",
              marginBottom: 28,
              letterSpacing: 1,
              lineHeight: 1.8,
              fontStyle: "italic",
              maxWidth: 600,
              margin: "0 auto 36px",
              textShadow: "0 0 20px rgba(0,240,255,0.6), 0 0 40px rgba(0,240,255,0.3)",
              textAlign: "center",
            }}
          />
            
          <SearchBar />
        </div>

        {/* STATS BAR - FLEX LAYOUT RESTORED (NO MORE GRID) */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 6, // Reduced from 12px
          padding: "0 20px 32px",
          flexWrap: "wrap",
        }}>
          <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
            <AnimatedCounter target={contents.filter(c => c.type === "note").length} color="#00f0ff" label="Notes" />
          </div>
          <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
            <AnimatedCounter target={contents.filter(c => c.type === "qb").length} color="#a855f7" label="Question Banks" />
          </div>
          <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
            <AnimatedCounter target={contents.filter(c => c.type === "paper").length} color="#f59e0b" label="Question Papers" />
          </div>
          <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
            <AnimatedCounter target={subjects.length} color="#10b981" label="Subjects" />
          </div>
        </div>

        {/* SUBJECTS SECTION */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px" }}>
          {filterSubject && (
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 13, color: "rgba(0,240,255,0.6)" }}>
                Filtered by subject
              </div>
              <a href="/" style={{
                fontSize: 12, color: "#00f0ff",
                textDecoration: "none",
                padding: "5px 12px",
                border: "1px solid rgba(0,240,255,0.3)",
                borderRadius: 6,
              }}>
                ← Show All
              </a>
            </div>
          )}

          {loading ? (
            <FuturisticLoader text="LOADING VAULT" />
          ) : filteredSubjects.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "80px 20px",
              color: "rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
              <div style={{ fontSize: 16, fontFamily: "'Orbitron', sans-serif", letterSpacing: 2 }}>
                NO SUBJECTS YET
              </div>
              <div style={{ fontSize: 13, marginTop: 8 }}>
                Admin needs to add subjects and upload content
              </div>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}>
              {filteredSubjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  contents={contents.filter(c => c.subject_id === subject.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER PLACEMENT */}
      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}