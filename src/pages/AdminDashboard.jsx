import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [subjects, setSubjects] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // New states for messages
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  // Subject form
  const [subjectForm, setSubjectForm] = useState({ name: "", code: "" });
  const [editingSubject, setEditingSubject] = useState(null);

  // Content form
  const [contentForm, setContentForm] = useState({ title: "", subject_id: "", type: "note" });
  const [editingContent, setEditingContent] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("wv_admin") !== "true") {
      navigate("/admin/login");
      return;
    }
    fetchAll();

    // Hide welcome message after 4.5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // ←←← NEW: Update form type when tab changes
  useEffect(() => {
    if (["notes", "qbanks", "papers"].includes(activeTab)) {
      setContentForm(prev => ({
        ...prev,
        type: getContentType()
      }));
    }
  }, [activeTab]);

  const fetchAll = async () => {
    setLoading(true);
    const { data: subs } = await supabase.from("subjects").select("*").order("name");
    const { data: cons } = await supabase.from("content").select("*, subjects(name)").order("created_at", { ascending: false });
    setSubjects(subs || []);
    setContents(cons || []);
    setLoading(false);
  };

  const handleLogout = () => {
    setShowLogoutMsg(true);
    
    setTimeout(() => {
      localStorage.removeItem("wv_admin");
      navigate("/?logout=true");
    }, 1600);
  };

  // ── SUBJECTS ──
  const saveSubject = async () => {
    if (!subjectForm.name || !subjectForm.code) return alert("Fill all fields");
    if (editingSubject) {
      await supabase.from("subjects").update(subjectForm).eq("id", editingSubject.id);
    } else {
      await supabase.from("subjects").insert(subjectForm);
    }
    setSubjectForm({ name: "", code: "" });
    setEditingSubject(null);
    fetchAll();
  };

  const deleteSubject = async (id) => {
    await supabase.from("subjects").delete().eq("id", id);
    setConfirmDelete(null);
    fetchAll();
  };

  // ── CONTENT ──
  const saveContent = async () => {
    if (!contentForm.title || !contentForm.subject_id) return alert("Fill all fields");
    setUploading(true);
    let pdf_url = editingContent?.pdf_url || "";

    if (pdfFile) {
      const fileName = `${Date.now()}_${pdfFile.name.replace(/\s/g, "_")}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(fileName, pdfFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("pdfs").getPublicUrl(fileName);
      pdf_url = urlData.publicUrl;
    }

    if (!pdf_url) {
      alert("Please upload a PDF file");
      setUploading(false);
      return;
    }

    const finalType = getContentType();   // ← Force correct type

    if (editingContent) {
      await supabase.from("content").update({ 
        ...contentForm, 
        pdf_url,
        type: finalType 
      }).eq("id", editingContent.id);
    } else {
      await supabase.from("content").insert({ 
        ...contentForm, 
        pdf_url,
        type: finalType 
      });
    }

    // Reset form
    setContentForm({ title: "", subject_id: "", type: getContentType() });
    setEditingContent(null);
    setPdfFile(null);
    if (fileRef.current) fileRef.current.value = "";
    fetchAll();
    setUploading(false);
  };

  const deleteContent = async (id) => {
    await supabase.from("content").delete().eq("id", id);
    setConfirmDelete(null);
    fetchAll();
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    background: "rgba(0,240,255,0.05)",
    border: "1px solid rgba(0,240,255,0.2)",
    borderRadius: 8, color: "#e0f0ff",
    fontSize: 13, outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: 10,
    color: "rgba(0,240,255,0.6)",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: 2, marginBottom: 6,
  };

  const btnPrimary = {
    padding: "10px 20px",
    background: "rgba(0,240,255,0.1)",
    border: "1px solid rgba(0,240,255,0.3)",
    borderRadius: 8, color: "#00f0ff",
    cursor: "pointer", fontSize: 12,
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: 1,
  };

  const btnDanger = {
    padding: "7px 14px",
    background: "rgba(255,60,60,0.1)",
    border: "1px solid rgba(255,60,60,0.3)",
    borderRadius: 6, color: "#ff8080",
    cursor: "pointer", fontSize: 11,
    fontFamily: "'Orbitron', sans-serif",
  };

  const btnEdit = {
    padding: "7px 14px",
    background: "rgba(0,240,255,0.08)",
    border: "1px solid rgba(0,240,255,0.2)",
    borderRadius: 6, color: "#00f0ff",
    cursor: "pointer", fontSize: 11,
    fontFamily: "'Orbitron', sans-serif",
  };

  const tabs = ["overview", "subjects", "notes", "qbanks", "papers"];
  const tabLabels = { overview: "Overview", subjects: "Subjects", notes: "Notes", qbanks: "Q-Banks", papers: "Papers" };

  const getFilteredContent = () => {
    if (activeTab === "notes") return contents.filter(c => c.type === "note");
    if (activeTab === "qbanks") return contents.filter(c => c.type === "qb");
    if (activeTab === "papers") return contents.filter(c => c.type === "paper");
    return contents;
  };

  const getContentType = () => {
    if (activeTab === "notes") return "note";
    if (activeTab === "qbanks") return "qb";
    if (activeTab === "papers") return "paper";
    return "note";
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* WELCOME & LOGOUT MESSAGES + MODALS (unchanged) */}
      {showWelcome && (
        <div style={{
          position: "fixed",
          top: "85px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(20px)",
          border: "3px solid green",
          borderRadius: 16,
          padding: "20px 45px",
          color: "#00FF00",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "21px",
          fontWeight: "600",
          letterSpacing: "4px",
          textAlign: "center",
          boxShadow: "0 0 40px rgba(0, 240, 255, 0.3)",
          zIndex: 9999,
          animation: "welcomeAnim 3s forwards",
          whiteSpace: "nowrap",
        }}>
          WELCOME ADMIN!
        </div>
      )}

      {showLogoutMsg && (
        <div style={{
          position: "fixed",
          top: "85px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(30, 10, 10, 0.92)",
          backdropFilter: "blur(20px)",
          border: "3px solid rgba(255, 80, 80, 0.5)",
          borderRadius: 16,
          padding: "18px 42px",
          color: "#ff8080",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "21px",
          letterSpacing: "3px",
          textAlign: "center",
          zIndex: 9999,
          animation: "welcomeAnim 2.5s forwards",
        }}>
          GOODBYE ADMIN
        </div>
      )}

      {confirmDelete && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}>
          <div style={{
            background: "#0d0d22",
            border: "1px solid rgba(255,60,60,0.3)",
            borderRadius: 16, padding: 28,
            maxWidth: 340, width: "100%",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#ff8080", fontSize: 14,
              letterSpacing: 2, marginBottom: 8,
            }}>
              CONFIRM DELETE
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>
              Are you sure? This action cannot be undone.
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirmDelete(null)} style={btnPrimary}>
                CANCEL
              </button>
              <button
                onClick={() => confirmDelete.type === "subject"
                  ? deleteSubject(confirmDelete.id)
                  : deleteContent(confirmDelete.id)}
                style={btnDanger}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN HEADER */}
      <div style={{
        background: "rgba(8,8,24,0.95)",
        borderBottom: "1px solid rgba(0,240,255,0.15)",
        padding: "14px 20px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#00f0ff", letterSpacing: 3,
        }}>
          ADMIN DASHBOARD
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("/")} style={btnPrimary}>
            VIEW SITE
          </button>
          <button onClick={handleLogout} style={btnDanger}>
            LOGOUT
          </button>
        </div>
      </div>

      {/* TABS */}
      <div style={{
        display: "flex", gap: 4, padding: "16px 16px 0",
        maxWidth: 900, margin: "0 auto",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {tabs.map(tab => (
          <button key={tab}
            onClick={() => {
              setActiveTab(tab);
              setEditingContent(null);
              setEditingSubject(null);
              setContentForm({ title: "", subject_id: "", type: getContentType() });
              setSubjectForm({ name: "", code: "" });
              setPdfFile(null);
            }}
            style={{
              padding: "9px 16px",
              background: activeTab === tab ? "rgba(0,240,255,0.12)" : "transparent",
              border: activeTab === tab ? "1px solid rgba(0,240,255,0.4)" : "1px solid rgba(0,240,255,0.1)",
              borderRadius: 8, color: activeTab === tab ? "#00f0ff" : "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 11,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 1, whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* OVERVIEW, SUBJECTS, and CONTENT TABS remain the same as you had */}
        {/* ... (All your existing JSX for overview, subjects, and content tabs) ... */}

        {activeTab === "overview" && (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 14, marginBottom: 28,
            }}>
              {[
                { label: "Subjects", count: subjects.length, color: "#10b981" },
                { label: "Notes", count: contents.filter(c => c.type === "note").length, color: "#00f0ff" },
                { label: "Q-Banks", count: contents.filter(c => c.type === "qb").length, color: "#a855f7" },
                { label: "Papers", count: contents.filter(c => c.type === "paper").length, color: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${s.color}25`,
                  borderRadius: 12, padding: "20px 16px",
                  textAlign: "center", position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: s.color, opacity: 0.5,
                  }}/>
                  <div style={{
                    fontSize: 36, fontWeight: 700,
                    color: s.color,
                    fontFamily: "'Orbitron', sans-serif",
                  }}>
                    {s.count}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(0,240,255,0.03)",
              border: "1px solid rgba(0,240,255,0.1)",
              borderRadius: 12, padding: 20,
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, color: "#00f0ff",
                letterSpacing: 2, marginBottom: 16,
              }}>
                RECENT UPLOADS
              </div>
              {contents.slice(0, 5).map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  gap: 10, padding: "10px 0",
                  borderBottom: "1px solid rgba(0,240,255,0.06)",
                }}>
                  <div style={{
                    fontSize: 9, padding: "2px 7px",
                    borderRadius: 4, fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: 1,
                    color: c.type === "note" ? "#00f0ff" : c.type === "qb" ? "#a855f7" : "#f59e0b",
                    background: c.type === "note" ? "rgba(0,240,255,0.1)" : c.type === "qb" ? "rgba(168,85,247,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${c.type === "note" ? "rgba(0,240,255,0.3)" : c.type === "qb" ? "rgba(168,85,247,0.3)" : "rgba(245,158,11,0.3)"}`,
                    whiteSpace: "nowrap",
                  }}>
                    {c.type === "note" ? "NOTE" : c.type === "qb" ? "QB" : "PAPER"}
                  </div>
                  <span style={{ fontSize: 13, color: "#c0d8f0", flex: 1 }}>{c.title}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{c.subjects?.name}</span>
                </div>
              ))}
              {contents.length === 0 && (
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                  No content uploaded yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBJECTS TAB - Unchanged */}
        {activeTab === "subjects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* ... your existing subjects tab code ... */}
            <div style={{
              background: "rgba(0,240,255,0.03)",
              border: "1px solid rgba(0,240,255,0.15)",
              borderRadius: 14, padding: 20,
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, color: "#00f0ff",
                letterSpacing: 2, marginBottom: 16,
              }}>
                {editingSubject ? "EDIT SUBJECT" : "ADD SUBJECT"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={labelStyle}>SUBJECT NAME</label>
                  <input style={inputStyle} placeholder="e.g. Data Structures & Algorithms"
                    value={subjectForm.name}
                    onChange={e => setSubjectForm({ ...subjectForm, name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SUBJECT CODE</label>
                  <input style={inputStyle} placeholder="e.g. CS401"
                    value={subjectForm.code}
                    onChange={e => setSubjectForm({ ...subjectForm, code: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
                  />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={saveSubject} style={{ ...btnPrimary, flex: 1 }}>
                    {editingSubject ? "UPDATE SUBJECT" : "ADD SUBJECT"}
                  </button>
                  {editingSubject && (
                    <button onClick={() => { setEditingSubject(null); setSubjectForm({ name: "", code: "" }); }} style={btnDanger}>
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(0,240,255,0.03)",
              border: "1px solid rgba(0,240,255,0.15)",
              borderRadius: 14, padding: 20,
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, color: "#00f0ff",
                letterSpacing: 2, marginBottom: 16,
              }}>
                ALL SUBJECTS ({subjects.length})
              </div>
              {subjects.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                  No subjects added yet
                </div>
              ) : subjects.map(sub => (
                <div key={sub.id} style={{
                  display: "flex", alignItems: "center",
                  gap: 12, padding: "12px 0",
                  borderBottom: "1px solid rgba(0,240,255,0.06)",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e0f0ff" }}>{sub.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(0,240,255,0.5)", marginTop: 2, fontFamily: "'Orbitron', sans-serif", letterSpacing: 1 }}>{sub.code}</div>
                  </div>
                  <button onClick={() => { setEditingSubject(sub); setSubjectForm({ name: sub.name, code: sub.code }); }} style={btnEdit}>
                    EDIT
                  </button>
                  <button onClick={() => setConfirmDelete({ id: sub.id, type: "subject" })} style={btnDanger}>
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT TABS (notes, qbanks, papers) */}
        {["notes", "qbanks", "papers"].includes(activeTab) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "rgba(0,240,255,0.03)",
              border: "1px solid rgba(0,240,255,0.15)",
              borderRadius: 14, padding: 20,
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, color: "#00f0ff",
                letterSpacing: 2, marginBottom: 16,
              }}>
                {editingContent ? `EDIT ${activeTab.slice(0, -1).toUpperCase()}` : `ADD ${activeTab === "qbanks" ? "Q-BANK" : activeTab.slice(0, -1).toUpperCase()}`}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={labelStyle}>TITLE</label>
                  <input style={inputStyle}
                    placeholder={activeTab === "notes" ? "e.g. Unit 1 - Introduction" : activeTab === "qbanks" ? "e.g. Mid Sem QB 2024" : "e.g. End Sem 2023"}
                    value={contentForm.title}
                    onChange={e => setContentForm({ ...contentForm, title: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
                  />
                </div>

                <div>
                  <label style={labelStyle}>SUBJECT</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }}
                    value={contentForm.subject_id}
                    onChange={e => setContentForm({ ...contentForm, subject_id: e.target.value })}
                    onFocus={e => e.target.style.borderColor = "rgba(0,240,255,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(0,240,255,0.2)"}
                  >
                    <option value="" style={{ background: "#0d0d22" }}>Select subject...</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id} style={{ background: "#0d0d22" }}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* DRAG AND DROP - unchanged */}
                <div>
                  <label style={labelStyle}>PDF FILE</label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file && file.type === "application/pdf") setPdfFile(file);
                      else alert("Please drop a PDF file");
                    }}
                    onClick={() => fileRef.current?.click()}
                    style={{
                      border: `2px dashed ${dragOver ? "#00f0ff" : "rgba(0,240,255,0.2)"}`,
                      borderRadius: 10,
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: dragOver ? "rgba(0,240,255,0.05)" : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {pdfFile ? (
                      <div>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>📄</div>
                        <div style={{ fontSize: 13, color: "#00f0ff" }}>{pdfFile.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                          Drag & drop PDF here or click to browse
                        </div>
                        {editingContent && (
                          <div style={{ fontSize: 11, color: "rgba(0,240,255,0.4)", marginTop: 6 }}>
                            Leave empty to keep existing PDF
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={e => setPdfFile(e.target.files[0])}
                  />
                  {pdfFile && (
                    <button onClick={() => { setPdfFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                      style={{ ...btnDanger, marginTop: 8, width: "100%", textAlign: "center" }}>
                      REMOVE FILE
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={saveContent} disabled={uploading}
                    style={{ ...btnPrimary, flex: 1, opacity: uploading ? 0.6 : 1 }}>
                    {uploading ? "UPLOADING..." : editingContent ? "UPDATE" : "UPLOAD"}
                  </button>
                  {editingContent && (
                    <button onClick={() => {
                      setEditingContent(null);
                      setContentForm({ title: "", subject_id: "", type: getContentType() });
                      setPdfFile(null);
                    }} style={btnDanger}>
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* CONTENT LIST */}
            <div style={{
              background: "rgba(0,240,255,0.03)",
              border: "1px solid rgba(0,240,255,0.15)",
              borderRadius: 14, padding: 20,
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, color: "#00f0ff",
                letterSpacing: 2, marginBottom: 16,
              }}>
                ALL {activeTab.toUpperCase()} ({getFilteredContent().length})
              </div>

              {getFilteredContent().length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                  No {activeTab} uploaded yet
                </div>
              ) : getFilteredContent().map(item => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center",
                  gap: 12, padding: "12px 0",
                  borderBottom: "1px solid rgba(0,240,255,0.06)",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e0f0ff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(0,240,255,0.4)", marginTop: 2 }}>
                      {item.subjects?.name}
                    </div>
                  </div>
                  <a href={item.pdf_url} target="_blank" rel="noreferrer" style={{
                    fontSize: 11, color: "#00f0ff",
                    textDecoration: "none", padding: "5px 10px",
                    border: "1px solid rgba(0,240,255,0.2)",
                    borderRadius: 5, whiteSpace: "nowrap",
                  }}>
                    VIEW
                  </a>
                  <button onClick={() => {
                    setEditingContent(item);
                    setContentForm({ 
                      title: item.title, 
                      subject_id: item.subject_id, 
                      type: item.type 
                    });
                    setPdfFile(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }} style={btnEdit}>
                    EDIT
                  </button>
                  <button onClick={() => setConfirmDelete({ id: item.id, type: "content" })} style={btnDanger}>
                    DEL
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        select option { background: #0d0d22; color: #e0f0ff; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,240,255,0.2); border-radius: 2px; }
        
        @keyframes welcomeAnim {
          0%   { opacity: 0; transform: translate(-50%, -30px); }
          15%  { opacity: 1; transform: translate(-50%, 0); }
          75%  { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -30px); }
        }
      `}</style>
    </div>
  );
}