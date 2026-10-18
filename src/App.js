import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ParticleBackground from "./components/ParticleBackground";
import Header from "./components/Header";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PDFViewer from "./pages/PDFViewer";
import InstallPwaPrompt from "./components/InstallPwaPrompt";

function ProtectedRoute({ children }) {
  return localStorage.getItem("wv_admin") === "true"
    ? children
    : <Navigate to="/admin/login" />;
}

function MainLayout() {
  const { isLight } = useTheme();
  const location = useLocation();

  // Force dark theme inside admin dashboard
  const isAdminDashboard =
    location.pathname === "/admin" ||
    (location.pathname.startsWith("/admin") && location.pathname !== "/admin/login");
  const activeIsLight = !isAdminDashboard && isLight;

  useEffect(() => {
    if (isAdminDashboard) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      if (isLight) {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }
  }, [isAdminDashboard, isLight]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: activeIsLight ? "#FDFBF7" : "#080818",
        color: activeIsLight ? "#1e293b" : "#e0f0ff",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <ParticleBackground />
      <InstallPwaPrompt />
      <Routes>
        <Route path="/pdf/:id" element={<PDFViewer />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}