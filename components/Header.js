// components/Header.js
"use client";
import { useEffect, useState } from "react";
import collection from "../collection.config.js";
import MagneticButton from "./MagneticButton.js";

export default function Header({ isMenuOpen, setIsMenuOpen, langMode, setLangMode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        padding: isScrolled ? "16px 40px" : "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "padding 300ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease, border-color 300ms ease",
        backgroundColor: isScrolled ? "rgba(20, 20, 20, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
      }}
    >
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10 }} data-cursor="top">
        <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--accent-gold)" }} />
        <span className="font-mono-tag" style={{ color: "var(--text-primary)", fontWeight: 500 }}>
          {collection.name}
        </span>
      </a>

      <nav aria-label="Main Navigation" style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          type="button"
          onClick={() => setLangMode(langMode === "en" ? "km" : "en")}
          className="font-mono-tag"
          data-cursor="lang"
          style={{
            padding: "6px 12px",
            borderRadius: 4,
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            transition: "all 200ms ease",
          }}
        >
          {langMode === "en" ? "KM ភាសាខ្មែរ" : "EN English"}
        </button>

        <MagneticButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          cursorLabel={isMenuOpen ? "close" : "menu"}
          style={{
            padding: "8px 18px",
            borderRadius: 100,
            border: "1px solid var(--border-medium)",
            backgroundColor: isMenuOpen ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.04)",
            color: isMenuOpen ? "#141414" : "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {isMenuOpen ? "CLOSE [×]" : "MENU [•]"}
        </MagneticButton>
      </nav>
    </header>
  );
}
