// components/AboutSection.js
"use client";
import { useEffect, useRef, useState } from "react";
import collection from "../collection.config.js";

export default function AboutSection({ langMode }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "120px 0",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-editorial" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "start" }}>
        <div>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>02 • ORAL LINEAGE & PROVENANCE</span>
          <h2
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{ fontSize: "clamp(24px, 3.2vw, 42px)", color: "var(--text-primary)", marginTop: 12, lineHeight: 1.35 }}
          >
            {langMode === "km" ? "ការចងចាំ និងចំណេះដឹងដែលផ្ទេរតាមរយៈពាក្យសំដី" : "Living Knowledge Transmitted Through Generations"}
          </h2>
        </div>

        <div className={`clip-reveal ${isInView ? "is-in-view" : ""}`}>
          <blockquote style={{ borderLeft: "2px solid var(--accent-gold)", paddingLeft: 24, marginBottom: 28 }}>
            <p
              className={langMode === "km" ? "khmer-sans" : ""}
              style={{ fontSize: "clamp(16px, 1.3vw, 20px)", color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.7 }}
            >
              &ldquo;{collection.source}&rdquo;
            </p>
          </blockquote>

          <p
            className={langMode === "km" ? "khmer-sans" : ""}
            style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}
          >
            {langMode === "km"
              ? "បណ្ណសារនេះមិនមែនជាការកត់ត្រាត្រឹមតែទ្រឹស្តីនោះទេ ប៉ុន្តែជាការថែរក្សានូវដង្ហើមនៃវប្បធម៌ និងការគោរពដឹងគុណចំពោះចាស់ទុំដែលបានរក្សាទំនៀមទម្លាប់នេះរាប់រយឆ្នាំមកហើយ។"
              : "This archive serves as a living bridge between oral family history and modern cultural preservation. Each rite captures the essence of filial devotion, community harmony, and mythic symbolism."}
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 36, height: 1, backgroundColor: "var(--accent-gold)" }} />
            <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>CURATOR: {collection.curator}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
