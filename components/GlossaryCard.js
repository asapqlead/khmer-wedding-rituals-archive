// components/GlossaryCard.js
// Individual term definition card in the cultural glossary

export default function GlossaryCard({ term, langMode }) {
  return (
    <div
      style={{
        backgroundColor: "var(--cream-50)",
        border: "1px solid var(--border-cream)",
        borderRadius: 8,
        padding: "16px 18px",
        transition: "transform 140ms ease, box-shadow 140ms ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--oxblood-700)", backgroundColor: "var(--cream-200)", padding: "2px 8px", borderRadius: 4 }}>
            {term.category}
          </span>
          <span style={{ fontSize: 12, color: "var(--gold-700)", fontStyle: "italic", fontFamily: "var(--font-serif-en)" }}>
            /{term.romanized}/
          </span>
        </div>

        <h4 className="khmer-title" style={{ fontSize: 18, color: "var(--oxblood-900)", margin: "4px 0" }}>
          {term.khmer}
        </h4>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", marginBottom: 8 }}>
          {term.romanized}
        </p>

        <p style={{ fontSize: 13.5, color: "var(--ink-800)", lineHeight: 1.5, margin: 0 }}>
          {langMode === "km" ? term.definitionKhmer : term.definitionEn}
        </p>
      </div>

      {langMode === "dual" && (
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed var(--border-cream)" }}>
          <p style={{ fontSize: 12, color: "var(--ink-600)", margin: 0, fontStyle: "italic" }}>
            {term.definitionKhmer}
          </p>
        </div>
      )}
    </div>
  );
}
