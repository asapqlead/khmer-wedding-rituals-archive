// components/MobileRitualCard.js
"use client";

const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";

export default function MobileRitualCard({ ceremony, index, onClick, langMode }) {
  const isKhmer = langMode === "km";
  const numStr = String(index + 1).padStart(2, "0");
  const displayNum = isKhmer ? numStr.replace(/\d/g, (d) => KHMER_DIGITS[d]) : numStr;
  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;
  const title = isKhmer ? ceremony.titleKhmer : ceremony.titleEn;
  const summary = isKhmer ? ceremony.summaryKhmer : ceremony.summaryEn;

  return (
    <article
      onClick={(e) => onClick(ceremony, e.currentTarget.getBoundingClientRect())}
      style={{
        width: "84vw", maxWidth: 380, height: "clamp(400px, 58vh, 520px)",
        scrollSnapAlign: "start", flexShrink: 0, position: "relative",
        borderRadius: 2, overflow: "hidden", backgroundColor: "#161616", cursor: "pointer",
      }}
    >
      <img
        src={imageSrc} alt={title} loading="lazy" draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(14,14,14,0.96) 0%, rgba(14,14,14,0.62) 40%, transparent 72%)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "22px 20px",
        }}
      >
        <span style={{ fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-mono)", fontSize: 12, color: "var(--accent-gold)", letterSpacing: "0.15em", marginBottom: 6 }}>
          {displayNum}
        </span>
        <h2
          className={isKhmer ? "khmer-serif" : ""}
          style={{
            fontFamily: isKhmer ? "var(--font-khmer-serif)" : "var(--font-display)",
            fontSize: isKhmer ? 20 : 23, fontWeight: 400, color: "#FFFFFF", lineHeight: 1.25, marginBottom: 8,
          }}
        >
          {title}
        </h2>
        <p
          className={isKhmer ? "khmer-sans" : ""}
          style={{
            fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-sans)",
            fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {summary}
        </p>
      </div>
    </article>
  );
}
