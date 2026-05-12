import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParticleBackground from "./components/ParticleBackground";
import Header from "./components/Header";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PDFViewer from "./pages/PDFViewer";

function ProtectedRoute({ children }) {
  return localStorage.getItem("wv_admin") === "true"
    ? children
    : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: "100vh",
        background: "#080818",
        color: "#e0f0ff",
        fontFamily: "'Inter', sans-serif",
      }}>
        <ParticleBackground />
        <Routes>
          <Route path="/pdf/:id" element={<PDFViewer />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <>
              <Header />
              <Home />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}