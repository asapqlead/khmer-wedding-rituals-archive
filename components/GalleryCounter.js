// components/GalleryCounter.js
"use client";
import useIsMobile from "./useIsMobile.js";

const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";
const toKhmerNum = (n) => String(n).replace(/\d/g, (d) => KHMER_DIGITS[d]);

export default function GalleryCounter({ current, total, isHidden, langMode }) {
  const isComplete = current === total;
  const isKhmer = langMode === "km";
  const displayCurrent = isKhmer ? toKhmerNum(current) : current;
  const displayTotal = isKhmer ? toKhmerNum(total) : total;
  const { isMobile } = useIsMobile();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: isMobile ? "16px 20px" : "24px 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 50,
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 350ms ease, transform 350ms ease",
      }}
    >
      <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <span
          className={`${isKhmer ? "khmer-sans" : ""} lang-text`.trim()}
          style={{
            fontSize: isMobile ? 12 : 13,
            fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-mono)",
            color: isComplete ? "var(--accent-gold)" : "var(--text-primary)",
            textShadow: isComplete ? "0 0 12px rgba(197, 160, 89, 0.45)" : "none",
            fontWeight: 500,
            letterSpacing: isKhmer ? "0.05em" : "0.1em",
            transition: "color 300ms ease, text-shadow 300ms ease",
          }}
        >
          {displayCurrent} — {displayTotal}
        </span>
      </div>
    </footer>
  );
}
