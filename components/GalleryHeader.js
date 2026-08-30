// components/GalleryHeader.js
"use client";
import collection from "../collection.config.js";

export default function GalleryHeader({ currentView, setCurrentView, isFullscreen, onCloseFullscreen, langMode, setLangMode, isHidden }) {
  const handleCeremonyClick = () => {
    if (isFullscreen) onCloseFullscreen?.();
    setCurrentView("work");
  };

  const khmerTitle = "ពិធីមង្គលការខ្មែរបុរាណ";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 600,
        padding: "25px 36px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        pointerEvents: isHidden ? "none" : "auto",
        transform: isHidden ? "translateY(-100%)" : "translateY(0%)",
        opacity: isHidden ? 0 : 1,
        transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease",
        willChange: "transform, opacity",
      }}
    >
      {/* Top Left: Navigation Bar */}
      <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          type="button"
          onClick={handleCeremonyClick}
          className={`nav-item ${currentView === "work" ? "is-active" : ""}`}
        >
          {langMode === "km" ? "កម្រងពិធីការ" : "Ceremony"}
        </button>
        <button
          type="button"
          onClick={() => setCurrentView("about")}
          className={`nav-item ${currentView === "about" ? "is-active" : ""}`}
        >
          {langMode === "km" ? "អំពីបណ្ណសារ" : "About"}
        </button>
        <button
          type="button"
          onClick={() => setCurrentView("glossary")}
          className={`nav-item ${currentView === "glossary" ? "is-active" : ""}`}
        >
          {langMode === "km" ? "សទ្ទានុក្រម" : "Glossary"}
        </button>
      </nav>

      {/* Middle: Bilingual Website Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span
          className={langMode === "km" ? "khmer-sans" : ""}
          style={{
            color: "var(--text-primary)",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          {langMode === "km" ? khmerTitle : collection.name}
        </span>
      </div>

      {/* Top Right: Language Toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={() => setLangMode(langMode === "en" ? "km" : "en")}
          className="font-mono-tag"
          style={{
            fontSize: 11,
            color: "#C8C8C8",
            border: "1px solid var(--border-subtle)",
            padding: "4px 10px",
            borderRadius: 2,
            transition: "color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#C8C8C8"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
        >
          {langMode === "en" ? "KM" : "EN"}
        </button>
      </div>
    </header>
  );
}
