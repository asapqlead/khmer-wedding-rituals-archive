// components/GalleryHeader.js
"use client";
import { useState } from "react";
import collection from "../collection.config.js";
import useIsMobile from "./useIsMobile.js";
import MobileMenuOverlay from "./MobileMenuOverlay.js";

export default function GalleryHeader({ currentView, setCurrentView, isFullscreen, onCloseFullscreen, langMode, setLangMode, isHidden, isScrolled }) {
  const { isMobile } = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCeremony = () => {
    if (isFullscreen) onCloseFullscreen?.();
    setCurrentView("work");
    setMenuOpen(false);
  };

  const navItems = [
    { view: "work", labelEn: "Ceremony", labelKm: "កម្រងពិធីការ", onClick: handleCeremony },
    { view: "about", labelEn: "About", labelKm: "អំពីបណ្ណសារ", onClick: () => { setCurrentView("about"); setMenuOpen(false); } },
    { view: "glossary", labelEn: "Glossary", labelKm: "សទ្ទានុក្រម", onClick: () => { setCurrentView("glossary"); setMenuOpen(false); } },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 600,
          padding: isMobile ? "14px 22px" : "25px 36px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          backgroundColor: isMobile ? "rgba(18, 18, 18, 0.92)" : "transparent",
          backdropFilter: isMobile ? "blur(20px)" : "none",
          borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
          transform: (isHidden || isScrolled) ? "translateY(-100%)" : "translateY(0%)",
          transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {isMobile ? (
          <button type="button" onClick={() => setMenuOpen((p) => !p)} aria-label="Menu" style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 44, minHeight: 44, color: "var(--text-primary)", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
          </button>
        ) : (
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {navItems.map((item) => (
              <button key={item.view} type="button" onClick={item.onClick} className={`nav-item ${currentView === item.view ? "is-active" : ""}`}>
                {langMode === "km" ? item.labelKm : item.labelEn}
              </button>
            ))}
          </nav>
        )}

        {!isMobile && (
          <span
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              color: "var(--text-primary)", fontSize: langMode === "km" ? 17 : 18,
              fontWeight: 500, letterSpacing: langMode === "km" ? "0" : "0.02em",
              pointerEvents: "none", whiteSpace: "nowrap",
              fontFamily: langMode === "km" ? "var(--font-khmer-serif)" : "var(--font-sans)",
            }}
          >{langMode === "km" ? "ពិធីមង្គលការខ្មែរបុរាណ" : collection.name}</span>
        )}

        <button type="button" onClick={() => setLangMode(langMode === "en" ? "km" : "en")} className="font-mono-tag" style={{ fontSize: 11, color: "#C8C8C8", border: "1px solid var(--border-subtle)", padding: isMobile ? "5px 10px" : "4px 10px", borderRadius: 2 }}>
          {langMode === "en" ? "KM" : "EN"}
        </button>
      </header>

      {isMobile && <MobileMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} currentView={currentView} langMode={langMode} />}
    </>
  );
}
