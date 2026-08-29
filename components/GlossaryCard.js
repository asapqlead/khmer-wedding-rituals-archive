// components/GlossaryCard.js
export default function GlossaryCard({ term, langMode }) {
  return (
    <article
      data-cursor="explore"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 4,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "border-color 250ms ease, transform 250ms ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-gold)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)", fontSize: 10 }}>{term.category}</span>
          <span className="font-mono-tag" style={{ color: "var(--text-muted)", fontSize: 10 }}>{term.romanized}</span>
        </div>
        <h3 className="khmer-serif" style={{ fontSize: 22, color: "var(--text-primary)", marginBottom: 10 }}>
          {term.khmer}
        </h3>
        <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {langMode === "km" ? term.definitionKhmer : term.definitionEn}
        </p>
      </div>
    </article>
  );
}
