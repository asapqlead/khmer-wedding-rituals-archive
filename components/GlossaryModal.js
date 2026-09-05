// components/GlossaryModal.js
"use client";
import { useEffect, useState, useRef } from "react";
import { glossaryTerms } from "../data/glossary.js";
import WheelText from "./WheelText.js";
import ScrollProgress from "./ScrollProgress.js";
import GlossarySearchInput from "./GlossarySearchInput.js";
import GlossaryCategoryTabs from "./GlossaryCategoryTabs.js";
import GlossaryCardItem from "./GlossaryCardItem.js";

const CATEGORIES = ["All", "Sacred Objects", "People & Roles", "Rituals", "Attire", "Music & Art"];

export default function GlossaryModal({ onClose, langMode, onScrollTopChange }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null);
  const isKhmer = langMode === "km";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);

    const el = containerRef.current;
    const handleScroll = () => { if (el) onScrollTopChange?.(el.scrollTop > 20); };
    if (el) el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      if (el) el.removeEventListener("scroll", handleScroll);
      onScrollTopChange?.(false);
    };
  }, [onScrollTopChange]);

  const handleClose = () => {
    onScrollTopChange?.(false);
    setIsClosing(true);
    setTimeout(() => onClose(), 480);
  };

  const q = searchQuery.trim().toLowerCase();
  const filtered = glossaryTerms.filter((t) => {
    if (activeCategory !== "All" && t.category !== activeCategory) return false;
    if (!q) return true;
    return (
      t.khmer.toLowerCase().includes(q) ||
      t.romanized.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.definitionEn.toLowerCase().includes(q) ||
      t.definitionKhmer.toLowerCase().includes(q)
    );
  });

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className="custom-scrollbar"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(18, 18, 18, 0.98)",
        backdropFilter: "blur(24px)",
        zIndex: 450,
        overflowY: "auto",
        padding: "120px 24px 60px",
      }}
    >
      <ScrollProgress containerRef={containerRef} />
      <div className={`page-view ${isVisible && !isClosing ? "is-visible" : "is-exiting"}`} style={{ maxWidth: 840, margin: "0 auto" }}>
        {/* Header Section: Eyebrow + Same Grid Row for Title & Search */}
        <div style={{ marginBottom: 28 }}>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)", display: "block", marginBottom: 8 }}>
            CULTURAL TERMINOLOGY
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 20,
            }}
          >
            <WheelText
              text={isKhmer ? "សទ្ទានុក្រមពិធីការ" : "Glossary of Khmer Rites"}
              direction={1}
              className={isKhmer ? "khmer-serif" : ""}
              style={{ fontSize: "clamp(24px, 3.5vw, 32px)", color: "#FFFFFF" }}
              as="h2"
            />
            <GlossarySearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              langMode={langMode}
              resultCount={filtered.length}
            />
          </div>
        </div>

        <GlossaryCategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {filtered.map((t) => (
              <GlossaryCardItem key={t.khmer} term={t} langMode={langMode} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "72px 20px 48px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(197, 160, 89, 0.08)", border: "1px solid rgba(197, 160, 89, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className={`lang-text ${isKhmer ? "khmer-serif" : ""}`} style={{ fontSize: 18, color: "#FFFFFF", marginBottom: 8, fontWeight: 400 }}>
              {isKhmer ? "រកមិនឃើញពាក្យដែលត្រូវគ្នា" : "No matching terminology"}
            </p>
            <p className={`lang-text ${isKhmer ? "khmer-sans" : ""}`} style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24, maxWidth: 380, margin: "0 auto 24px", lineHeight: 1.6 }}>
              {isKhmer
                ? `គ្មានពាក្យដែលត្រូវគ្នានឹង «${searchQuery}» ទេ។ សូមសាកល្បងពាក្យគន្លឹះផ្សេង។`
                : `No sacred terms match "${searchQuery}". Try a different spelling or clear search.`}
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="font-mono-tag"
              style={{
                fontSize: 10,
                color: "var(--accent-gold)",
                border: "1px solid rgba(197, 160, 89, 0.5)",
                borderRadius: 100,
                padding: "8px 20px",
                letterSpacing: "0.1em",
                transition: "all 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(197, 160, 89, 0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {isKhmer ? "សម្អាតការស្វែងរក" : "CLEAR SEARCH"}
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 100,
          pointerEvents: "none",
          opacity: isClosing ? 1 : 0,
          transition: "opacity 480ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
    </div>
  );
}
