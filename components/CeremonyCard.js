// components/CeremonyCard.js
"use client";
import { useEffect, useRef, useState } from "react";

export default function CeremonyCard({ ceremony, langMode, onSelect, index }) {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(ceremony)}
      data-cursor="view"
      data-cursor-gold="true"
      className={`clip-reveal ${isInView ? "is-in-view" : ""}`}
      style={{
        transitionDelay: `${(index % 2) * 120}ms`,
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: 320, overflow: "hidden", backgroundColor: "#0c0c0c" }}>
        <img
          src={imageSrc}
          alt={ceremony.titleEn}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 600ms var(--ease-out-expo), filter 600ms ease",
            filter: "grayscale(25%) contrast(105%)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.filter = "grayscale(0%)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(25%) contrast(105%)"; }}
        />
        <div style={{ position: "absolute", top: 16, left: 16, padding: "4px 10px", backgroundColor: "rgba(20,20,20,0.85)", border: "1px solid var(--border-subtle)", borderRadius: 2 }}>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>0{ceremony.order} • {ceremony.timeOfDay}</span>
        </div>
      </div>

      <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <h3 className={langMode === "km" ? "khmer-serif" : ""} style={{ fontSize: 22, color: "var(--text-primary)", marginBottom: 6 }}>
            {langMode === "km" ? ceremony.titleKhmer : ceremony.titleEn}
          </h3>
          <p className="font-mono-tag" style={{ color: "var(--accent-gold-light)", marginBottom: 14 }}>{ceremony.phonetic}</p>
          <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
            {langMode === "km" ? ceremony.summaryKhmer : ceremony.summaryEn}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
          <span className="font-mono-tag" style={{ color: "var(--text-muted)", fontSize: 10 }}>{ceremony.steps.length} LITURGICAL STEPS</span>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)", fontSize: 10 }}>EXPLORE RITUAL →</span>
        </div>
      </div>
    </article>
  );
}
