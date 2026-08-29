// components/CeremonyOverview.js
// Header, timing, participants, and sacred objects overview for a ceremony

export default function CeremonyOverview({ ceremony, langMode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ backgroundColor: "var(--accent-red)", color: "var(--bg-secondary)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100 }}>
          STAGE {ceremony.order} OF 6
        </span>
        <span style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border-light)" }}>
          {ceremony.timeOfDay}
        </span>
      </div>

      <h2 className="khmer-title" style={{ fontSize: "clamp(24px, 4vw, 34px)", color: "var(--text-primary)", margin: "0 0 4px" }}>
        {ceremony.titleKhmer}
      </h2>
      <p style={{ fontSize: "1.15rem", fontFamily: "var(--font-serif-en)", color: "var(--accent-gold)", fontStyle: "italic", marginBottom: 20 }}>
        {ceremony.titleEn}
      </p>

      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, backgroundColor: "var(--bg-tertiary)", padding: "16px 20px", borderRadius: 8, borderLeft: "4px solid var(--accent-gold)", marginBottom: 24 }}>
        {langMode === "km" ? ceremony.summaryKhmer : ceremony.summaryEn}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <div className="modern-card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: 12, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 12, letterSpacing: 0.5 }}>
            {langMode === "km" ? "អ្នកចូលរួមសំខាន់" : "Key Participants"}
          </h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: 14, color: "var(--text-primary)" }}>
            {ceremony.participants.map((p, idx) => (
              <li key={idx} style={{ marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--accent-red)", marginTop: 2 }}>•</span>
                <span style={{ lineHeight: 1.4 }}>{langMode === "km" ? p.roleKhmer : `${p.roleEn} (${p.roleKhmer})`}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="modern-card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: 12, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 12, letterSpacing: 0.5 }}>
            {langMode === "km" ? "គ្រឿងសក្ការៈ និងវត្ថុប្រើប្រាស់" : "Sacred Objects & Offerings"}
          </h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: 14, color: "var(--text-primary)" }}>
            {ceremony.sacredItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "var(--accent-gold)", marginTop: 2 }}>✦</span>
                <span style={{ lineHeight: 1.4 }}>{langMode === "km" ? item.nameKhmer : `${item.nameEn} (${item.nameKhmer})`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
