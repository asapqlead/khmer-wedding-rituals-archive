// components/Preloader.js
"use client";
import { useState, useEffect } from "react";
import collection from "../collection.config.js";

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete?.();
      setIsDone(true);
      return;
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsWiping(true), 150);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 700);
          return 100;
        }
        const step = Math.max(2, Math.floor((100 - prev) * 0.18));
        return Math.min(100, prev + step);
      });
    }, 32);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <aside
      aria-label="Loading archive"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#141414",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "clip-path 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
        clipPath: isWiping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        pointerEvents: isWiping ? "none" : "auto",
      }}
    >
      <div style={{ textAlign: "center", opacity: isWiping ? 0 : 1, transition: "opacity 200ms ease" }}>
        <p className="font-mono-tag" style={{ color: "var(--accent-gold)", marginBottom: 12 }}>
          {collection.curator} • ARCHIVE 2026
        </p>
        <h2 className="khmer-serif" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "#F2F2F0", marginBottom: 24 }}>
          {collection.name}
        </h2>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 500, color: "var(--text-primary)" }}>
            {percent < 10 ? `0${percent}` : percent}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text-muted)" }}>%</span>
        </div>
      </div>
    </aside>
  );
}
