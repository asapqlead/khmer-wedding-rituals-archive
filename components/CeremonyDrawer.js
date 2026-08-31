// components/CeremonyDrawer.js
"use client";
import { useEffect, useState, useRef } from "react";
import CeremonyStepItem from "./CeremonyStepItem.js";
import ScrollProgress from "./ScrollProgress.js";

export default function CeremonyDrawer({ ceremony, onClose, langMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); document.body.style.overflow = "auto"; };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400);
  };

  if (!ceremony) return null;
  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className="custom-scrollbar"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 10, 10, 0.94)",
        backdropFilter: "blur(20px)",
        zIndex: 950,
        overflowY: "auto",
        padding: "60px 24px",
        transition: "opacity 450ms ease",
        opacity: isClosing ? 0 : 1,
      }}
    >
      <ScrollProgress containerRef={containerRef} />
      <div className={`page-view ${isVisible && !isClosing ? "is-visible" : "is-exiting"}`} style={{ maxWidth: 840, margin: "0 auto", backgroundColor: "#181818", border: "1px solid var(--border-subtle)", borderRadius: 6, padding: "clamp(24px, 4vw, 44px)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>0{ceremony.order} • {ceremony.timeOfDay}</span>
            <h2 className={langMode === "km" ? "khmer-serif" : ""} style={{ fontSize: "clamp(22px, 3.2vw, 34px)", color: "var(--text-primary)", marginTop: 4 }}>
              {langMode === "km" ? ceremony.titleKhmer : ceremony.titleEn}
            </h2>
            {ceremony.translationEn && (
              <p style={{ fontSize: 15, color: "var(--accent-gold-light)", fontStyle: "italic", marginTop: 4 }}>
                {ceremony.translationEn}
              </p>
            )}
            <p className="font-mono-tag" style={{ color: "var(--text-muted)", marginTop: 4 }}>{ceremony.phonetic}</p>
          </div>
          <button type="button" onClick={handleClose} className="font-mono-tag" style={{ padding: "8px 16px", borderRadius: 100, border: "1px solid var(--border-subtle)", color: "var(--text-primary)", fontSize: 11 }}>
            CLOSE [ESC]
          </button>
        </div>

        <div style={{ width: "100%", height: 320, overflow: "hidden", borderRadius: 4, marginBottom: 24, backgroundColor: "#0e0e0e" }}>
          <img src={imageSrc} alt={ceremony.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Brief Definition */}
        <div style={{ marginBottom: 28, padding: "16px 18px", backgroundColor: "#131313", borderRadius: 4, borderLeft: "2px solid var(--accent-gold)" }}>
          <span className="font-mono-tag" style={{ fontSize: 10, color: "var(--accent-gold)", display: "block", marginBottom: 4 }}>
            {langMode === "km" ? "និយមន័យសង្ខេប (BRIEF DEFINITION)" : "BRIEF DEFINITION"}
          </span>
          <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.65 }}>
            {langMode === "km" ? ceremony.summaryKhmer : ceremony.summaryEn}
          </p>
        </div>

        {/* Steps with Reason & Meaning */}
        <div>
          <h3 className="font-mono-tag" style={{ color: "var(--accent-gold)", marginBottom: 8, fontSize: 11 }}>
            {langMode === "km" ? "ដំណាក់កាលនៃពិធី (STEPS, REASON & MEANING)" : "RITUAL STEPS • REASON & MEANING"}
          </h3>
          <div>
            {ceremony.steps.map((step) => (
              <CeremonyStepItem key={step.stepNumber} step={step} langMode={langMode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
