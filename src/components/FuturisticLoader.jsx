export default function FuturisticLoader({ text = "LOADING" }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#0a0a1f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100000,
    }}>

      <div style={{ position: "relative", width: 180, height: 180, marginBottom: 50 }}>

        {/* Outer Energy Field */}
        <div style={{
          position: "absolute",
          inset: -25,
          border: "2px solid rgba(0, 240, 255, 0.2)",
          borderRadius: "50%",
          animation: "rotateSlow 20s linear infinite",
        }} />

        {/* Wave Rings */}
        <div style={{
          position: "absolute",
          inset: 20,
          border: "3px solid rgba(0, 240, 255, 0.3)",
          borderRadius: "50%",
          animation: "wavePulse 3.5s ease-in-out infinite",
        }} />

        <div style={{
          position: "absolute",
          inset: 45,
          border: "3px solid rgba(0, 240, 255, 0.4)",
          borderRadius: "50%",
          animation: "wavePulse 3.5s ease-in-out infinite 0.6s",
        }} />

        {/* Main Glowing Core */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 110,
          height: 110,
          background: "radial-gradient(circle at 40% 40%, #ffffff, #00e0ff, #0088cc)",
          borderRadius: "50%",
          boxShadow: "0 0 80px #00f0ff, 0 0 150px rgba(0, 240, 255, 0.7)",
          animation: "coreBreath 2.8s ease-in-out infinite",
        }} />

        {/* Bright Center Dot */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 28,
          height: 28,
          background: "#ffffff",
          borderRadius: "50%",
          boxShadow: "0 0 30px #ffffff, 0 0 50px #00f0ff",
          animation: "centerPulse 2s ease-in-out infinite",
        }} />
      </div>

      {/* Loading Text */}
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "7px",
        color: "#00f0ff",
        textShadow: "0 0 30px #00f0ff, 0 0 60px rgba(0,240,255,0.6)",
        animation: "textGlow 2s ease-in-out infinite alternate",
      }}>
        {text}
      </div>

      <style>{`
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wavePulse {
          0%, 100% { transform: scale(0.85); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }

        @keyframes coreBreath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.12); }
        }

        @keyframes centerPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }

        @keyframes textGlow {
          from { text-shadow: 0 0 20px #00f0ff; }
          to { text-shadow: 0 0 40px #00f0ff, 0 0 70px #00f0ff; }
        }
      `}</style>
    </div>
  );
}