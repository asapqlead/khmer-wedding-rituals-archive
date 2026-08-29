// components/HeroSection.js
"use client";
import { useEffect, useState } from "react";
import collection from "../collection.config.js";

export default function HeroSection({ isReady, langMode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setRevealed(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "160px 0 60px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-editorial">
        <div className="mask-wrap" style={{ marginBottom: 16 }}>
          <p className={`font-mono-tag mask-line ${revealed ? "is-revealed stagger-1" : ""}`} style={{ color: "var(--accent-gold)" }}>
            [ KHMER LIVING ARCHIVE • ICT 340 • CURATED BY {collection.curator.toUpperCase()} ]
          </p>
        </div>

        <div className="mask-wrap">
          <h1
            className={`mask-line ${revealed ? "is-revealed stagger-2" : ""} ${langMode === "km" ? "khmer-serif" : ""}`}
            style={{ fontSize: "clamp(36px, 6.8vw, 92px)", color: "var(--text-primary)", letterSpacing: "-0.025em", maxWidth: 1150 }}
          >
            {langMode === "km" ? "បណ្ណសារពិធីមង្គលការបុរាណខ្មែរ" : "Traditional Khmer Wedding Rituals"}
          </h1>
        </div>

        <div className="mask-wrap" style={{ marginTop: 12 }}>
          <h2
            className={`mask-line ${revealed ? "is-revealed stagger-3" : ""} ${langMode === "km" ? "khmer-sans" : ""}`}
            style={{ fontSize: "clamp(18px, 2.2vw, 32px)", color: "var(--accent-gold-light)", fontStyle: "italic", fontWeight: 400 }}
          >
            {langMode === "km" ? "កម្រងប្រពៃណីមង្គល ចំណងនិស្ស័យ និងកតញ្ញូតាធម៌" : "A Living Compendium of Sacred Union & Ancestral Lineage"}
          </h2>
        </div>

        <div className="mask-wrap" style={{ marginTop: 36, maxWidth: 680 }}>
          <p className={`mask-line ${revealed ? "is-revealed stagger-4" : ""} ${langMode === "km" ? "khmer-sans" : ""}`} style={{ color: "var(--text-secondary)", fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: 1.75 }}>
            {langMode === "km" ? "ការចងក្រងកិច្ចពិធីការតាមលំដាប់លំដោយ ពីព្រឹកព្រលឹមរហូតដល់ថ្ងៃលិច ផ្អែកលើការចងចាំ និងបទពិសោធន៍ផ្ទាល់របស់មាតា។" : collection.description}
          </p>
        </div>
      </div>

      <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: 24, marginTop: 48 }}>
        <span className="font-mono-tag" style={{ color: "var(--text-muted)" }}>06 CHRONOLOGICAL CEREMONIES</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="font-mono-tag" style={{ color: "var(--text-muted)" }}>SCROLL TO EXPLORE</span>
          <span style={{ width: 40, height: 1, backgroundColor: "var(--accent-gold)" }} />
        </div>
      </div>
    </section>
  );
}
