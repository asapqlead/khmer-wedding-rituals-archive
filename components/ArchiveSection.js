// components/ArchiveSection.js
"use client";
import CeremonyCard from "./CeremonyCard.js";
import GlossarySection from "./GlossarySection.js";

export default function ArchiveSection({
  ceremonies,
  activeTab,
  setActiveTab,
  langMode,
  onSelectCeremony,
}) {
  return (
    <section id="rituals" style={{ padding: "80px 0 100px", position: "relative", zIndex: 10 }}>
      <div className="container-editorial">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 24 }}>
          <div>
            <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>01 • CURATED ARCHIVE</span>
            <h2 className={langMode === "km" ? "khmer-serif" : ""} style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "var(--text-primary)", marginTop: 6 }}>
              {langMode === "km" ? "កម្រងពិធីការ និងសទ្ទានុក្រម" : "The Ritual Sequence"}
            </h2>
          </div>

          <div style={{ display: "flex", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.04)", padding: 4, borderRadius: 100, border: "1px solid var(--border-subtle)" }}>
            <button
              type="button"
              onClick={() => setActiveTab("rituals")}
              data-cursor="view"
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                fontWeight: activeTab === "rituals" ? 600 : 400,
                backgroundColor: activeTab === "rituals" ? "var(--accent-gold)" : "transparent",
                color: activeTab === "rituals" ? "#141414" : "var(--text-secondary)",
                transition: "all 200ms ease",
              }}
            >
              {langMode === "km" ? "លំដាប់ពិធីការ (៦)" : "CEREMONIES (06)"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("glossary")}
              data-cursor="view"
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                fontWeight: activeTab === "glossary" ? 600 : 400,
                backgroundColor: activeTab === "glossary" ? "var(--accent-gold)" : "transparent",
                color: activeTab === "glossary" ? "#141414" : "var(--text-secondary)",
                transition: "all 200ms ease",
              }}
            >
              {langMode === "km" ? "សទ្ទានុក្រម (១២)" : "GLOSSARY (12)"}
            </button>
          </div>
        </div>

        {activeTab === "rituals" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 32 }}>
            {ceremonies.map((ceremony, idx) => (
              <CeremonyCard
                key={ceremony.id}
                ceremony={ceremony}
                langMode={langMode}
                onSelect={onSelectCeremony}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <GlossarySection langMode={langMode} />
        )}
      </div>
    </section>
  );
}
