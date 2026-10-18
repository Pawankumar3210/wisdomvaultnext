// SpaceBackground.jsx - Futuristic Space Themed with Dark & Light Mode Support
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const { isLight } = useTheme();
  const location = useLocation();

  // If inside admin dashboard, force dark mode
  const isAdminDashboard = location.pathname === "/admin" || (location.pathname.startsWith("/admin") && location.pathname !== "/admin/login");
  const activeIsLight = !isAdminDashboard && isLight;

  const isLightRef = useRef(activeIsLight);

  useEffect(() => {
    isLightRef.current = activeIsLight;
  }, [activeIsLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    // --- Initialization ---
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Star Layers (Parallax depth) ---
    const stars = [];
    const layerCount = 3;
    const starCountPerLayer = 110;

    for (let layer = 0; layer < layerCount; layer++) {
      for (let i = 0; i < starCountPerLayer; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5 + (layer * 0.3),
          speed: (layer + 1) * 0.3 + 0.1,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
          layer: layer,
        });
      }
    }

    // --- Shooting Stars ---
    let shootingStars = [];

    // --- Nebula Glow ---
    const nebula = {
      x: 0,
      y: 0,
      radius: 0,
      angle: 0,
      colorDark: `rgba(0, 240, 255, 0.03)`,
      colorLight: `rgba(2, 132, 199, 0.03)`,
    };

    const resetNebula = () => {
      nebula.x = Math.random() * canvas.width;
      nebula.y = Math.random() * canvas.height;
      nebula.radius = Math.random() * 400 + 300;
      nebula.colorDark = `rgba(0, 240, 255, ${Math.random() * 0.04 + 0.02})`;
      nebula.colorLight = `rgba(2, 132, 199, ${Math.random() * 0.03 + 0.015})`;
    };
    resetNebula();

    // --- Animation Loop ---
    const draw = () => {
      const light = isLightRef.current;

      // Background clear
      ctx.fillStyle = light ? "#FDFBF7" : "#05080f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Nebula (drifts slowly)
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.radius
      );
      if (light) {
        gradient.addColorStop(0, nebula.colorLight);
        gradient.addColorStop(0.5, "rgba(245, 240, 230, 0.04)");
        gradient.addColorStop(1, "rgba(253, 251, 247, 0)");
      } else {
        gradient.addColorStop(0, nebula.colorDark);
        gradient.addColorStop(0.4, "rgba(0, 240, 255, 0.01)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Slowly move the nebula
      nebula.angle += 0.001;
      nebula.x += Math.sin(nebula.angle * 0.5) * 0.3;
      nebula.y += Math.cos(nebula.angle * 0.7) * 0.2;

      if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
      if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
      if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
      if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;

      // 2. Draw Stars
      stars.forEach((star) => {
        star.y += star.speed * 0.3;
        star.x += Math.sin(star.y * 0.001 + star.x * 0.001) * 0.1;

        if (star.y > canvas.height + 20) {
          star.y = -20;
          star.x = Math.random() * canvas.width;
        }
        if (star.x > canvas.width + 20) star.x = -20;
        if (star.x < -20) star.x = canvas.width + 20;

        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        if (star.alpha > 0.9 || star.alpha < 0.1) {
          star.twinkleDirection *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (light) {
          const color = star.layer === 0
            ? `rgba(99, 102, 241, ${star.alpha * 0.4})`
            : `rgba(2, 132, 199, ${star.alpha * 0.5})`;
          ctx.fillStyle = color;
          ctx.shadowColor = "rgba(2, 132, 199, 0.2)";
          ctx.shadowBlur = star.radius * 2;
          ctx.fill();
        } else {
          const color = star.layer === 0
            ? `rgba(120, 200, 255, ${star.alpha * 0.8})`
            : `rgba(0, 240, 255, ${star.alpha})`;
          ctx.fillStyle = color;
          ctx.shadowColor = "rgba(0, 240, 255, 0.1)";
          ctx.shadowBlur = star.radius * 2;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      });

      // 3. Draw Shooting Stars
      if (Math.random() < 0.002) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          len: Math.random() * 120 + 60,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          alpha: 1,
        });
      }

      shootingStars = shootingStars.filter((ss) => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.01;

        if (ss.alpha <= 0) return false;
        if (ss.x > canvas.width || ss.y > canvas.height) return false;

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );

        if (light) {
          ctx.strokeStyle = `rgba(2, 132, 199, ${ss.alpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "rgba(2, 132, 199, 0.4)";
          ctx.shadowBlur = 8;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - Math.cos(ss.angle) * ss.len * 0.5,
            ss.y - Math.sin(ss.angle) * ss.len * 0.5
          );
          ctx.strokeStyle = `rgba(99, 102, 241, ${ss.alpha * 0.3})`;
          ctx.lineWidth = 3.5;
          ctx.stroke();
        } else {
          ctx.strokeStyle = `rgba(200, 240, 255, ${ss.alpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "rgba(0, 240, 255, 0.5)";
          ctx.shadowBlur = 10;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - Math.cos(ss.angle) * ss.len * 0.5,
            ss.y - Math.sin(ss.angle) * ss.len * 0.5
          );
          ctx.strokeStyle = `rgba(0, 240, 255, ${ss.alpha * 0.2})`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: activeIsLight ? "#FDFBF7" : "#05080f",
        transition: "background 0.3s ease",
      }}
    />
  );
}