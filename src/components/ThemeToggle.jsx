import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "", style = {} }) {
  const { toggleTheme, isLight } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    toggleTheme();
    setTimeout(() => setIsRotating(false), 400);
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={handleClick}
      className={`wv-theme-toggle ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 38,
        height: 38,
        borderRadius: "50%",
        cursor: "pointer",
        padding: 0,
        border: isLight
          ? "1.5px solid rgba(2, 132, 199, 0.35)"
          : "1.5px solid rgba(0, 240, 255, 0.35)",
        background: isLight
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(246, 242, 235, 0.95))"
          : "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(8, 20, 45, 0.9))",
        boxShadow: isLight
          ? "0 2px 10px rgba(2, 132, 199, 0.15), 0 0 10px rgba(217, 119, 6, 0.12)"
          : "0 0 14px rgba(0, 240, 255, 0.3), inset 0 0 8px rgba(0, 240, 255, 0.1)",
        outline: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        userSelect: "none",
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isRotating ? "rotate(360deg) scale(1.15)" : "rotate(0deg) scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1), color 0.3s ease",
          color: isLight ? "#d97706" : "#00f0ff",
        }}
      >
        {isLight ? (
          /* Radiant Sun Icon for Light/Cream Mode */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 4px rgba(217, 119, 6, 0.4))",
            }}
          >
            <circle cx="12" cy="12" r="5" fill="#f59e0b" stroke="#d97706" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          /* Futuristic Crescent Moon Icon for Dark Mode */
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))",
            }}
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="rgba(0, 240, 255, 0.3)"
              stroke="#00f0ff"
            />
            {/* Sparkle star */}
            <circle cx="17" cy="6" r="1.2" fill="#00f0ff" stroke="none" />
            <circle cx="20" cy="10" r="0.8" fill="#00f0ff" stroke="none" />
          </svg>
        )}
      </span>
    </button>
  );
}
