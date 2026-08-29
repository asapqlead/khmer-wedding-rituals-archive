// components/GlossaryModal.js
"use client";
import { useEffect, useState } from "react";
import { glossaryTerms } from "../data/glossary.js";
import WheelText from "./WheelText.js";

export default function GlossaryModal({ onClose, langMode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const categories = ["All", "Sacred Objects", "People & Roles", "Rituals", "Attire", "Music & Art"];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 420);
  };

  const filtered = activeCategory === "All" ? glossaryTerms : glossaryTerms.filter((t) => t.category === activeCategory);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(18, 18, 18, 0.98)",
        backdropFilter: "blur(24px)",
        zIndex: 450,
        overflowY: "auto",
        padding: "120px 24px 60px",
        transition: "opacity 500ms ease",
        opacity: isClosing ? 0 : 1,
      }}
    >
      <div className={`page-view ${isVisible && !isClosing ? "is-visible" : "is-exiting"}`} style={{ maxWidth: 840, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
          <div>
            <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>CULTURAL TERMINOLOGY</span>
            <div style={{ marginTop: 4 }}>
              <WheelText
                text={langMode === "km" ? "សទ្ទានុក្រមពិធីការ" : "Glossary of Khmer Rites"}
                direction={1}
                className={langMode === "km" ? "khmer-serif" : ""}
                style={{ fontSize: 32, color: "#FFFFFF" }}
                as="h2"
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className="font-mono-tag"
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                fontSize: 10,
                border: "1px solid",
                borderColor: activeCategory === c ? "var(--accent-gold)" : "var(--border-subtle)",
                backgroundColor: activeCategory === c ? "var(--accent-gold)" : "transparent",
                color: activeCategory === c ? "#121212" : "var(--text-muted)",
                transition: "all 200ms ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
          {filtered.map((t) => (
            <div key={t.khmer} style={{ backgroundColor: "#181818", border: "1px solid var(--border-subtle)", padding: "20px", borderRadius: 2 }}>
              <span className="font-mono-tag" style={{ fontSize: 9, color: "var(--accent-gold)" }}>{t.category}</span>
              <h3 className="khmer-serif" style={{ fontSize: 18, color: "#FFFFFF", margin: "6px 0" }}>{t.khmer}</h3>
              <p className="font-mono-tag" style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>{t.romanized}</p>
              <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {langMode === "km" ? t.definitionKhmer : t.definitionEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
