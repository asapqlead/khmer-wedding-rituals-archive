// components/GalleryHero.js
"use client";

export default function GalleryHero({ langMode }) {
  const isKhmer = langMode === "km";

  return (
    <div
      className="gallery-hero"
      style={{
        width: isKhmer ? "clamp(340px, 38vw, 520px)" : "clamp(300px, 32vw, 440px)",
        height: "clamp(420px, 62vh, 680px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(16px, 2.5vw, 36px) 0 0",
        userSelect: "none",
        transition: "width 300ms ease",
      }}
    >
      <h1
        className={isKhmer ? "khmer-serif" : ""}
        style={{
          fontFamily: isKhmer ? "var(--font-khmer-serif)" : "var(--font-display)",
          fontSize: isKhmer ? "clamp(26px, 3.2vw, 42px)" : "clamp(32px, 3.8vw, 50px)",
          fontWeight: 400,
          lineHeight: isKhmer ? 1.5 : 1.18,
          color: "#FFFFFF",
          letterSpacing: isKhmer ? "0" : "-0.02em",
          marginBottom: isKhmer ? 20 : 18,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {isKhmer ? (
          <>
            ពិធី<span style={{ color: "var(--accent-gold)" }}>មង្គលការ</span>ខ្មែរ
            <br />
            តាមលំដាប់លំដោយ
          </>
        ) : (
          <>
            Khmer <span style={{ color: "var(--accent-gold)" }}>wedding</span> rituals in chronological order
          </>
        )}
      </h1>

      <p
        className={isKhmer ? "khmer-sans" : ""}
        style={{
          fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-sans)",
          fontSize: isKhmer ? "clamp(14px, 1.1vw, 16px)" : "clamp(13px, 1.05vw, 15px)",
          lineHeight: isKhmer ? 1.85 : 1.65,
          color: "var(--text-muted)",
          maxWidth: isKhmer ? 440 : 380,
          wordBreak: "break-word",
        }}
      >
        {isKhmer
          ? "ការចងក្រងនូវលំដាប់លំដោយនៃពិធីការបុរាណប្រពៃណីខ្មែរ តាំងពីក្បួនហែជំនូនពេលព្រឹក រហូតដល់ពិធីសំពះផ្ទឹមចងដៃ។"
          : "An ancestral sequence of sacred rites, from the morning procession to the union blessing."}
      </p>
    </div>
  );
}
