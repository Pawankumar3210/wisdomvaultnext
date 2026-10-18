import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function TypewriterText({ text, style }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const { isLight } = useTheme();

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  const cursorColor = isLight ? "#0284c7" : "#00f0ff";

  return (
    <div
      style={{
        ...style,
        position: "relative",
      }}
    >
      {displayed}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: cursorColor,
            marginLeft: 2,
            verticalAlign: "text-bottom",
            animation: "cursorBlink 0.7s ease-in-out infinite",
            boxShadow: `0 0 8px ${cursorColor}`,
          }}
        />
      )}
      <style>{`
        @keyframes cursorBlink {
          0%,100%{opacity:1} 50%{opacity:0}
        }
      `}</style>
    </div>
  );
}