// components/CeremonyInfoContent.js
"use client";

export default function CeremonyInfoContent({ ceremony, langMode, isVisible, isMobile }) {
  const isKhmer = langMode === "km";
  const rise = (delay) => `baseline-rise ${delay} ${isVisible ? "is-visible" : ""}`;
  const titleSize = isMobile ? (isKhmer ? "clamp(24px, 6vw, 34px)" : "clamp(26px, 7vw, 38px)") : (isKhmer ? "clamp(30px, 3.6vw, 44px)" : "clamp(34px, 4.2vw, 54px)");

  return (
    <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 540, display: "flex", flexDirection: "column", gap: "clamp(24px, 3.5vh, 36px)", opacity: isVisible ? 1 : 0, transition: "opacity 300ms ease" }}>
      {/* Main Editorial Title & Subtitle */}
      <div>
        <h1
          className={`${isKhmer ? "khmer-serif " : ""}${rise("delay-1")}`}
          style={{ fontFamily: isKhmer ? "var(--font-khmer-serif)" : "var(--font-sans)", fontSize: titleSize, fontWeight: 500, lineHeight: isKhmer ? 1.35 : 1.12, color: "#FFFFFF", letterSpacing: isKhmer ? "0" : "-0.02em" }}
        >
          {isKhmer ? ceremony.titleKhmer : ceremony.titleEn}
        </h1>
        {ceremony.translationEn && (
          <p className={rise("delay-2")} style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "clamp(13px, 3.5vw, 16px)" : "clamp(15px, 1.4vw, 18px)", color: "var(--accent-gold-light)", fontStyle: "italic", fontWeight: 400, marginTop: 10, lineHeight: 1.4, letterSpacing: "0.01em" }}>
            {ceremony.translationEn}
          </p>
        )}
      </div>

      {/* Liturgical Purpose Block */}
      <div className={rise("delay-3")}>
        <h2 className={isKhmer ? "khmer-sans" : "font-mono-tag"} style={{ fontSize: 12, color: "var(--accent-gold)", letterSpacing: isKhmer ? "0" : "0.12em", marginBottom: 8, textTransform: "uppercase" }}>
          {isKhmer ? "ខ្លឹមសារ និងអត្ថន័យនៃពិធី" : "Liturgical Purpose"}
        </h2>
        <p className={isKhmer ? "khmer-sans" : ""} style={{ fontSize: isMobile ? (isKhmer ? 14 : 13.5) : (isKhmer ? 15 : 14.5), color: "#D6D6D4", lineHeight: isKhmer ? 1.8 : 1.68 }}>
          {isKhmer ? ceremony.summaryKhmer : ceremony.summaryEn}
        </p>
      </div>

      {/* Participants & Sacred Items Block */}
      <div className={rise("delay-4")}>
        <h2 className={isKhmer ? "khmer-sans" : "font-mono-tag"} style={{ fontSize: 12, color: "var(--accent-gold)", letterSpacing: isKhmer ? "0" : "0.12em", marginBottom: 8, textTransform: "uppercase" }}>
          {isKhmer ? "អ្នកចូលរួម និងគ្រឿងសក្ការៈ" : "Participants & Sacred Items"}
        </h2>
        <p className={isKhmer ? "khmer-sans" : ""} style={{ fontSize: isMobile ? (isKhmer ? 13 : 12.5) : (isKhmer ? 14 : 13.5), color: "var(--text-muted)", lineHeight: isKhmer ? 1.75 : 1.6 }}>
          {ceremony.participants?.map((p) => (isKhmer ? p.roleKhmer : p.roleEn)).join(" • ") || ""}
        </p>
        <p className={isKhmer ? "khmer-sans" : ""} style={{ fontSize: isMobile ? (isKhmer ? 12 : 11.5) : (isKhmer ? 13 : 12.5), color: "#9E9E9E", lineHeight: isKhmer ? 1.7 : 1.55, marginTop: 8 }}>
          {ceremony.sacredItems?.map((i) => (isKhmer ? i.nameKhmer : i.nameEn)).join("  |  ") || ""}
        </p>
      </div>

      {/* Oral Provenance Block */}
      {ceremony.regionalNotesEn && (
        <div className={rise("delay-5")} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 16 }}>
          <h2 className={isKhmer ? "khmer-sans" : "font-mono-tag"} style={{ fontSize: 11, color: "var(--accent-gold)", letterSpacing: isKhmer ? "0" : "0.12em", marginBottom: 6, textTransform: "uppercase" }}>
            {isKhmer ? "ការចងចាំផ្ទាល់មាត់" : "Oral Provenance"}
          </h2>
          <p className={isKhmer ? "khmer-sans" : ""} style={{ fontSize: isMobile ? (isKhmer ? 12.5 : 12) : (isKhmer ? 13.5 : 13), fontStyle: "italic", color: "#A8A8A8", lineHeight: isKhmer ? 1.75 : 1.6 }}>
            &ldquo;{isKhmer ? ceremony.regionalNotesKhmer : ceremony.regionalNotesEn}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
