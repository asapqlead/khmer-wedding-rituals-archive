// components/AmbientCanvas.js
"use client";
import { useEffect, useRef } from "react";

export default function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, w = (canvas.width = window.innerWidth), h = (canvas.height = window.innerHeight);
    let m = { x: w * 0.5, y: h * 0.5, tx: w * 0.5, ty: h * 0.5 }, t = 0;

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const onMove = (e) => { m.tx = e.clientX; m.ty = e.clientY; };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    const render = () => {
      t += 0.008;
      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;
      ctx.clearRect(0, 0, w, h);

      const g1X = m.x * 0.4 + w * 0.3 + Math.sin(t) * 40;
      const g1Y = m.y * 0.4 + h * 0.3 + Math.cos(t * 0.8) * 30;
      const rad1 = ctx.createRadialGradient(g1X, g1Y, 10, g1X, g1Y, w * 0.45);
      rad1.addColorStop(0, "rgba(197, 160, 89, 0.065)");
      rad1.addColorStop(1, "rgba(20, 20, 20, 0)");
      ctx.fillStyle = rad1;
      ctx.fillRect(0, 0, w, h);

      const g2X = w * 0.7 - m.x * 0.2 + Math.cos(t * 0.6) * 50;
      const g2Y = h * 0.6 - m.y * 0.2 + Math.sin(t * 0.7) * 40;
      const rad2 = ctx.createRadialGradient(g2X, g2Y, 10, g2X, g2Y, w * 0.5);
      rad2.addColorStop(0, "rgba(45, 42, 38, 0.12)");
      rad2.addColorStop(1, "rgba(20, 20, 20, 0)");
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
