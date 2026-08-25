// components/CeremonyView.js
// Complete ritual view showing overview, step sequence, regional variance, and media placeholder
import CeremonyOverview from "./CeremonyOverview.js";
import StepAccordion from "./StepAccordion.js";
import ArchivalPlaceholder from "./ArchivalPlaceholder.js";

export default function CeremonyView({ ceremony, langMode }) {
  if (!ceremony) return null;

  return (
    <article
      style={{
        backgroundColor: "var(--cream-50)",
        border: "1px solid var(--border-gold)",
        borderRadius: 10,
        padding: "clamp(18px, 4vw, 32px)",
        boxShadow: "var(--shadow-subtle)",
        position: "relative",
      }}
    >
      <CeremonyOverview ceremony={ceremony} langMode={langMode} />
      
      <StepAccordion steps={ceremony.steps} langMode={langMode} />

      <div
        style={{
          marginTop: 28,
          padding: 16,
          backgroundColor: "var(--cream-100)",
          borderRadius: 6,
          border: "1px solid var(--border-cream)",
        }}
      >
        <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 6, letterSpacing: 0.5 }}>
          {langMode === "km" ? "ការប្រែប្រួលតាមតំបន់ និងជំនាន់" : "Regional & Generational Variation"}
        </h4>
        <p style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.5, margin: 0 }}>
          {langMode === "km" ? ceremony.regionalNotesKhmer : ceremony.regionalNotesEn}
        </p>
      </div>

      <ArchivalPlaceholder placeholder={ceremony.mediaPlaceholder} ceremonyId={ceremony.id} />
    </article>
  );
}
