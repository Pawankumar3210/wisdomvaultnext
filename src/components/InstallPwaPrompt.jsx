import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function InstallPwaPrompt() {
  const { isLight } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (already installed)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return; // Already installed, do not show
    }

    // Check if user dismissed previously within last 7 days
    const dismissedAt = localStorage.getItem("wv_pwa_dismissed");
    if (dismissedAt) {
      const daysPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysPassed < 7) {
        return;
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait a moment so the user sees the page first
      setTimeout(() => setShowPrompt(true), 2500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS users who visit regularly, offer the iOS install guide
    if (isIosDevice) {
      const iosShown = sessionStorage.getItem("wv_ios_pwa_hint");
      if (!iosShown) {
        setTimeout(() => {
          setShowPrompt(true);
          sessionStorage.setItem("wv_ios_pwa_hint", "true");
        }, 3000);
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("[PWA] User response to install prompt:", outcome);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    localStorage.setItem("wv_pwa_dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "calc(100% - 32px)",
        maxWidth: 420,
        background: isLight
          ? "rgba(253, 251, 247, 0.98)"
          : "rgba(10, 14, 30, 0.96)",
        backdropFilter: "blur(20px)",
        border: isLight
          ? "1px solid rgba(2, 132, 199, 0.3)"
          : "1px solid rgba(0, 240, 255, 0.3)",
        borderRadius: 16,
        padding: "16px 18px",
        boxShadow: isLight
          ? "0 10px 30px rgba(0, 0, 0, 0.12), 0 0 15px rgba(2, 132, 199, 0.15)"
          : "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.2)",
        animation: "slideUpPwa 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img
          src="/icon-192.png"
          alt="Wisdom Vault"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            objectFit: "cover",
            flexShrink: 0,
            border: isLight
              ? "1px solid rgba(2, 132, 199, 0.3)"
              : "1px solid rgba(0, 240, 255, 0.4)",
            boxShadow: isLight
              ? "0 2px 8px rgba(2, 132, 199, 0.2)"
              : "0 0 10px rgba(0, 240, 255, 0.3)",
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: isLight ? "#0284c7" : "#00f0ff",
              letterSpacing: 0.5,
              marginBottom: 3,
            }}
          >
            Install Wisdom Vault
          </div>
          <div
            style={{
              fontSize: 12,
              color: isLight ? "#475569" : "rgba(224, 240, 255, 0.75)",
              lineHeight: 1.35,
            }}
          >
            {showIOSGuide
              ? "Tap Share (⎋) below then 'Add to Home Screen' (+)"
              : "Access notes & question banks offline anytime with 1-tap"}
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Close"
          style={{
            background: "transparent",
            border: "none",
            color: isLight ? "#94a3b8" : "rgba(255, 255, 255, 0.4)",
            fontSize: 18,
            cursor: "pointer",
            padding: 4,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>

      {!showIOSGuide && (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 14,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={handleDismiss}
            style={{
              padding: "7px 14px",
              background: "transparent",
              border: isLight
                ? "1px solid rgba(203, 213, 225, 0.8)"
                : "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 8,
              color: isLight ? "#64748b" : "rgba(255, 255, 255, 0.6)",
              fontSize: 12,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 0.5,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            NOT NOW
          </button>
          <button
            onClick={handleInstallClick}
            style={{
              padding: "7px 18px",
              background: isLight
                ? "linear-gradient(135deg, #0284c7, #0369a1)"
                : "linear-gradient(135deg, #00f0ff, #0088cc)",
              border: "none",
              borderRadius: 8,
              color: isLight ? "#ffffff" : "#080818",
              fontSize: 12,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              letterSpacing: 1,
              cursor: "pointer",
              boxShadow: isLight
                ? "0 4px 12px rgba(2, 132, 199, 0.35)"
                : "0 0 15px rgba(0, 240, 255, 0.4)",
              transition: "all 0.2s ease",
            }}
          >
            INSTALL APP
          </button>
        </div>
      )}

      {showIOSGuide && (
        <div
          style={{
            marginTop: 10,
            padding: "8px 12px",
            background: isLight ? "rgba(2, 132, 199, 0.08)" : "rgba(0, 240, 255, 0.08)",
            borderRadius: 8,
            fontSize: 11.5,
            color: isLight ? "#0284c7" : "#00f0ff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>📱</span>
          <span>In Safari, tap <strong>Share</strong> icon then scroll and tap <strong>'Add to Home Screen'</strong>.</span>
        </div>
      )}

      <style>{`
        @keyframes slideUpPwa {
          from {
            transform: translate(-50%, 40px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
