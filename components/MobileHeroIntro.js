// components/MobileHeroIntro.js
"use client";

export default function MobileHeroIntro({ langMode }) {
  const isKhmer = langMode === "km";

  return (
    <section
      style={{
        padding: "0 22px",
        marginBottom: 28,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <h1
        className={isKhmer ? "khmer-serif" : ""}
        style={{
          fontFamily: isKhmer ? "var(--font-khmer-serif)" : "var(--font-display)",
          fontSize: isKhmer ? "clamp(30px, 8.5vw, 38px)" : "clamp(38px, 10.5vw, 46px)",
          fontWeight: 400,
          lineHeight: isKhmer ? 1.4 : 1.12,
          color: "#FFFFFF",
          letterSpacing: isKhmer ? "0" : "-0.02em",
          marginBottom: 18,
        }}
      >
        {isKhmer ? (
          <>
            ពិធី<span style={{ color: "var(--accent-gold)" }}>មង្គលការ</span>
            <br />
            ខ្មែរបុរាណ
            <br />
            តាមលំដាប់លំដោយ
          </>
        ) : (
          <>
            Khmer <span style={{ color: "var(--accent-gold)" }}>wedding</span>
            <br />
            rituals in
            <br />
            chronological
            <br />
            order
          </>
        )}
      </h1>

      <p
        className={isKhmer ? "khmer-sans" : ""}
        style={{
          fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-sans)",
          fontSize: isKhmer ? 13.5 : 13,
          lineHeight: isKhmer ? 1.75 : 1.6,
          color: "var(--text-muted)",
          maxWidth: 340,
        }}
      >
        {isKhmer
          ? "ការចងក្រងនូវលំដាប់លំដោយនៃពិធីការបុរាណប្រពៃណីខ្មែរ តាំងពីក្បួនហែជំនូនពេលព្រឹក រហូតដល់ពិធីសំពះផ្ទឹមចងដៃ។"
          : "An ancestral sequence of sacred rites, from the morning procession to the union blessing."}
      </p>
    </section>
  );
}
