import { useEffect, useState } from "react";

export default function TopLoadingBar({ loading }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (loading) {
      setVisible(true);
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) { clearInterval(interval); return 85; }
          return prev + Math.random() * 12;
        });
      }, 180);
    } else {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 3, zIndex: 9999,
      background: "rgba(0,240,255,0.05)",
    }}>
      {/* MAIN BAR */}
      <div style={{
        height: "100%",
        width: `${Math.min(progress, 100)}%`,
        background: "linear-gradient(90deg, #0050ff, #00f0ff, #a855f7)",
        boxShadow: "0 0 12px #00f0ff, 0 0 25px rgba(0,240,255,0.6), 0 0 40px rgba(0,240,255,0.3)",
        transition: "width 0.25s ease",
        borderRadius: "0 3px 3px 0",
        position: "relative",
        overflow: "visible",
      }}>
        {/* GLOWING TIP */}
        <div style={{
          position: "absolute",
          right: -6, top: "50%",
          transform: "translateY(-50%)",
          width: 12, height: 12,
          borderRadius: "50%",
          background: "#00f0ff",
          boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 35px rgba(0,240,255,0.8)",
          animation: "tipPulse 0.8s ease-in-out infinite",
        }} />
      </div>

      {/* SHIMMER EFFECT */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        animation: "shimmer 1.2s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes tipPulse {
          0%,100%{box-shadow:0 0 10px #00f0ff,0 0 20px #00f0ff,0 0 35px rgba(0,240,255,0.8)}
          50%{box-shadow:0 0 15px #00f0ff,0 0 30px #00f0ff,0 0 50px rgba(0,240,255,1)}
        }
        @keyframes shimmer {
          0%{transform:translateX(-100%)}
          100%{transform:translateX(100%)}
        }
      `}</style>
    </div>
  );
}