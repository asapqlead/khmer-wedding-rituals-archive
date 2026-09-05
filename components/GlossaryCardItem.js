// components/GlossaryCardItem.js
"use client";
import { useState } from "react";

export default function GlossaryCardItem({ term, langMode }) {
  const [isHovered, setIsHovered] = useState(false);
  const isKhmer = langMode === "km";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#181818",
        border: `1px solid ${isHovered ? "rgba(197, 160, 89, 0.4)" : "var(--border-subtle)"}`,
        padding: 20,
        borderRadius: 2,
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered ? "0 8px 24px rgba(0, 0, 0, 0.45)" : "none",
        transition: "border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease",
      }}
    >
      <span className="font-mono-tag" style={{ fontSize: 9, color: "var(--accent-gold)" }}>
        {term.category}
      </span>
      <h3 className="khmer-serif" style={{ fontSize: 18, color: "#FFFFFF", margin: "6px 0" }}>
        {term.khmer}
      </h3>
      <p className="font-mono-tag" style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>
        {term.romanized}
      </p>
      <p
        className={`lang-text ${isKhmer ? "khmer-sans" : ""}`}
        style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}
      >
        {isKhmer ? term.definitionKhmer : term.definitionEn}
      </p>
    </div>
  );
}
