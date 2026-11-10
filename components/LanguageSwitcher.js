// components/LanguageSwitcher.js
// Compact, glassmorphic segmented language switcher ('EN' | 'ខ្មែរ')
"use client";

export default function LanguageSwitcher({ langMode, onChange }) {
  const isKm = langMode === "km";

  return (
    <div
      role="radiogroup"
      aria-label="Language selector / ប្តូរភាសា"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px",
        borderRadius: "9999px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <button
        type="button"
        role="radio"
        aria-checked={!isKm}
        aria-label="Switch to English"
        onClick={() => onChange("en")}
        style={{
          border: "none",
          cursor: "pointer",
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: 12,
          fontWeight: !isKm ? 600 : 400,
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.04em",
          color: !isKm ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
          background: !isKm ? "rgba(255, 255, 255, 0.16)" : "transparent",
          boxShadow: !isKm ? "0 2px 8px rgba(0, 0, 0, 0.25)" : "none",
          transition: "all 180ms cubic-bezier(0.16, 1, 0.3, 1)",
          outline: "none",
        }}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={isKm}
        aria-label="ប្តូរទៅភាសាខ្មែរ"
        onClick={() => onChange("km")}
        style={{
          border: "none",
          cursor: "pointer",
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: 12.5,
          fontWeight: isKm ? 600 : 400,
          fontFamily: "var(--font-khmer-serif), serif",
          color: isKm ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
          background: isKm ? "rgba(255, 255, 255, 0.16)" : "transparent",
          boxShadow: isKm ? "0 2px 8px rgba(0, 0, 0, 0.25)" : "none",
          transition: "all 180ms cubic-bezier(0.16, 1, 0.3, 1)",
          outline: "none",
        }}
      >
        ខ្មែរ
      </button>
    </div>
  );
}

