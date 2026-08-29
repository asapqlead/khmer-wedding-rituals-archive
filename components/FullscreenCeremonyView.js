// components/FullscreenCeremonyView.js
"use client";
import { useEffect, useState, useRef } from "react";
import WheelText from "./WheelText.js";

export default function FullscreenCeremonyView({ ceremonies, currentIndex, onSelectIndex, initialRect, onClose, onOpenDetails, langMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dir, setDir] = useState(1);
  const isNav = useRef(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsExpanded(true));
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handleNav(-1);
      if (e.key === "ArrowRight") handleNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  const handleNav = (direction) => {
    if (isNav.current) return;
    const nextIdx = currentIndex + direction;
    if (nextIdx < 0 || nextIdx >= ceremonies.length) return;
    
    isNav.current = true;
    setDir(direction);
    onSelectIndex(nextIdx);
    setTimeout(() => { isNav.current = false; }, 500);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => onClose(), 900);
  };

  const r = initialRect || { top: 0, left: 0, width: "100vw", height: "100vh" };
  const zoomTransition = isExpanded
    ? "top 700ms cubic-bezier(0.16, 1, 0.3, 1), left 700ms cubic-bezier(0.16, 1, 0.3, 1), width 700ms cubic-bezier(0.16, 1, 0.3, 1), height 700ms cubic-bezier(0.16, 1, 0.3, 1)"
    : "top 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, left 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, width 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, height 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms";

  return (
    <div role="dialog" aria-modal="true" style={{ position: "fixed", top: isExpanded ? 0 : r.top, left: isExpanded ? 0 : r.left, width: isExpanded ? "100vw" : r.width, height: isExpanded ? "100vh" : r.height, zIndex: 400, backgroundColor: "#111111", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", transition: zoomTransition }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", width: `${ceremonies.length * 100}vw`, height: "100%", transform: `translate3d(-${currentIndex * 100}vw, 0, 0)`, transition: isExpanded ? "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)" : "none", willChange: "transform" }}>
        {ceremonies.map((c) => (
          <div key={c.id} style={{ width: "100vw", height: "100%", position: "relative", flexShrink: 0 }}>
            <img src={c.mediaPlaceholder?.image || `/images/${c.id}/ceremony.jpg`} alt={c.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", inset: 0, backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.35)" : "rgba(0,0,0,0)", transition: isExpanded ? "background-color 700ms ease" : "background-color 700ms ease 200ms", pointerEvents: "none" }} />

      <button type="button" onClick={() => handleNav(-1)} aria-label="Previous ritual" style={{ position: "absolute", left: "clamp(20px, 4vw, 48px)", top: "50%", transform: "translateY(-50%)", color: "#FFFFFF", fontSize: 28, opacity: isExpanded && currentIndex > 0 ? 0.9 : 0, pointerEvents: currentIndex > 0 ? "auto" : "none", transition: isExpanded ? "opacity 500ms ease 200ms, transform 200ms ease" : "opacity 200ms ease, transform 200ms ease", zIndex: 10 }}>←</button>
      <button type="button" onClick={() => handleNav(1)} aria-label="Next ritual" style={{ position: "absolute", right: "clamp(20px, 4vw, 48px)", top: "50%", transform: "translateY(-50%)", color: "#FFFFFF", fontSize: 28, opacity: isExpanded && currentIndex < ceremonies.length - 1 ? 0.9 : 0, pointerEvents: currentIndex < ceremonies.length - 1 ? "auto" : "none", transition: isExpanded ? "opacity 500ms ease 200ms, transform 200ms ease" : "opacity 200ms ease, transform 200ms ease", zIndex: 10 }}>→</button>

      <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "0 40px", maxWidth: 960, opacity: isExpanded ? 1 : 0, transition: isExpanded ? "opacity 500ms ease 200ms" : "opacity 200ms ease" }}>
        <div style={{ minHeight: "clamp(52px, 6vw, 76px)", width: "min(90vw, 840px)", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <WheelText
            text={langMode === "km" ? ceremonies[currentIndex].titleKhmer : ceremonies[currentIndex].titleEn}
            direction={dir}
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, color: "#FFFFFF", letterSpacing: "-0.015em" }}
            as="h1"
          />
        </div>

        <div>
          <button type="button" onClick={onOpenDetails} className="font-mono-tag" style={{ fontSize: 11, color: "#F2F2F0", backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(12px)", padding: "10px 24px", borderRadius: 100, border: "1px solid rgba(255, 255, 255, 0.25)", transition: "transform 200ms ease, border-color 200ms ease" }}>
            {langMode === "km" ? "មើលព័ត៌មានលម្អិតនៃពិធី ↓" : "VIEW RITUAL DETAILS ↓"}
          </button>
        </div>
      </div>
    </div>
  );
}
