import { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedCounter({ target, color, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const prevTarget = useRef(target);
  const { isLight } = useTheme();

  // Handle target changes
  useEffect(() => {
    if (target !== prevTarget.current) {
      if (target > prevTarget.current) {
        if (started.current) {
          started.current = false;
        }
      } else if (target < prevTarget.current) {
        setCount(target);
        started.current = false;
      }
      prevTarget.current = target;
    }
  }, [target]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        
        const duration = 1200;
        let startVal = count;
        const endVal = target;
        
        if (endVal <= startVal) return;
        
        const steps = endVal - startVal;
        const intervalTime = duration / steps;
        
        const timer = setInterval(() => {
          startVal++;
          if (startVal >= endVal) {
            setCount(endVal);
            clearInterval(timer);
          } else {
            setCount(startVal);
          }
        }, intervalTime);
        
        return () => clearInterval(timer);
      }
    });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, count]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.03)",
        border: isLight ? `1px solid ${color}40` : `1px solid ${color}25`,
        borderRadius: 10,
        backdropFilter: "blur(10px)",
        boxShadow: isLight ? "0 2px 10px rgba(0, 0, 0, 0.04)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: color,
          fontFamily: "'Orbitron', sans-serif",
          minWidth: 24,
        }}
      >
        {count}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: isLight ? 600 : 400,
          color: isLight ? "#475569" : "rgba(255,255,255,0.4)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
}