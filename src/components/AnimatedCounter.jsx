import { useEffect, useState, useRef } from "react";

export default function AnimatedCounter({ target, color, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const prevTarget = useRef(target);

  // Handle target changes
  useEffect(() => {
    if (target !== prevTarget.current) {
      if (target > prevTarget.current) {
        // Increased — reset animation to count up from current count
        if (started.current) {
          started.current = false;
        }
      } else if (target < prevTarget.current) {
        // Decreased — instantly update to exact target without animation
        setCount(target);
        // If currently animating, stop it
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
        
        // Only animate if we need to count UP (endVal > startVal)
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
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 20px",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${color}25`,
      borderRadius: 10,
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }} />
      <span style={{
        fontSize: 22, fontWeight: 700,
        color: color,
        fontFamily: "'Orbitron', sans-serif",
        minWidth: 24,
      }}>
        {count}
      </span>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{label}</span>
    </div>
  );
}