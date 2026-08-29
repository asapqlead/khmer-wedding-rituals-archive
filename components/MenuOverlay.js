// components/MenuOverlay.js
"use client";
import { useEffect } from "react";
import collection from "../collection.config.js";

const menuItems = [
  { id: "rituals", num: "01", labelEn: "Ceremonies Sequence", labelKm: "លំដាប់កិច្ចពិធីការ" },
  { id: "glossary", num: "02", labelEn: "Cultural Glossary", labelKm: "សទ្ទានុក្រមវប្បធម៌" },
  { id: "about", num: "03", labelEn: "Oral Lineage & Source", labelKm: "ប្រភពចំណេះដឹងដូនតា" },
  { id: "contact", num: "04", labelEn: "Curator & Archive Notes", labelKm: "អំពីអ្នកចងក្រង" },
];

export default function MenuOverlay({ isOpen, onClose, langMode, activeSection, onSelectSection }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(20, 20, 20, 0.98)",
        backdropFilter: "blur(24px)",
        zIndex: 850,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "100px 48px 48px",
      }}
    >
      <div className="container-editorial" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "clamp(16px, 3vh, 32px)" }}>
          {menuItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="mask-wrap">
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    onSelectSection?.(item.id);
                    onClose();
                  }}
                  data-cursor="explore"
                  className={`mask-line is-revealed stagger-${idx + 1}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 20,
                    fontSize: "clamp(32px, 5vw, 64px)",
                    fontFamily: "var(--font-display)",
                    color: isActive ? "var(--accent-gold)" : "var(--text-primary)",
                    transition: "color 200ms ease, transform 200ms ease",
                  }}
                >
                  <span className="font-mono-tag" style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.num}</span>
                  <span>{langMode === "km" ? item.labelKm : item.labelEn}</span>
                  {isActive && <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--accent-gold)" }} />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-editorial" style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: 24 }}>
        <p className="font-mono-tag" style={{ color: "var(--text-muted)" }}>CURATED BY {collection.curator}</p>
        <p className="font-mono-tag" style={{ color: "var(--text-muted)" }}>AUPP ICT 340 • LIVING ARCHIVE</p>
      </div>
    </div>
  );
}
