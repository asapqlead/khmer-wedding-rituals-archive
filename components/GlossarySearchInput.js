// components/GlossarySearchInput.js
"use client";
import { useState, useRef } from "react";

export default function GlossarySearchInput({ value, onChange, onClear, langMode, resultCount }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  const isKhmer = langMode === "km";

  const placeholder = isKhmer ? "ស្វែងរក..." : "Search archive...";
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && value) {
      e.stopPropagation();
      onClear();
    }
  };

  const borderColor = isFocused ? "var(--accent-gold)" : isHovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.1)";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative", display: "flex", alignItems: "center", width: "clamp(220px, 26vw, 290px)", height: 38,
        backgroundColor: isFocused ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.025)",
        border: `1px solid ${borderColor}`, borderRadius: 100, padding: "0 10px 0 14px",
        boxShadow: isFocused ? "0 0 0 1px var(--accent-gold), 0 2px 16px rgba(197, 160, 89, 0.12)" : "none",
        transition: "border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isFocused ? "var(--accent-gold)" : "var(--text-muted)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, flexShrink: 0, transition: "stroke 200ms ease" }} aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={isKhmer ? "ស្វែងរកសទ្ទានុក្រម" : "Search glossary"}
        className={`lang-text ${isKhmer ? "khmer-sans" : ""}`}
        style={{
          flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)",
          fontSize: isKhmer ? 13 : 13.5, fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-sans)", letterSpacing: isKhmer ? "0" : "0.01em",
        }}
      />

      {value ? (
        <button
          type="button"
          onClick={() => { onClear(); inputRef.current?.focus(); }}
          aria-label="Clear search"
          style={{
            width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", color: "var(--text-primary)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, lineHeight: 1, cursor: "pointer", flexShrink: 0,
            transition: "transform 150ms ease",
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.88)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          ×
        </button>
      ) : (
        <span className="font-mono-tag lang-text" style={{ fontSize: 10, color: "var(--text-muted)", opacity: 0.7, flexShrink: 0, pointerEvents: "none" }}>
          {resultCount}
        </span>
      )}
    </div>
  );
}
