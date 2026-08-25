// components/CeremonyOverview.js
// Header, timing, participants, and sacred objects overview for a ceremony

export default function CeremonyOverview({ ceremony, langMode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ backgroundColor: "var(--oxblood-800)", color: "var(--cream-50)", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 4 }}>
          STAGE {ceremony.order} OF 6
        </span>
        <span style={{ backgroundColor: "var(--cream-200)", color: "var(--oxblood-700)", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 4 }}>
          {ceremony.timeOfDay}
        </span>
      </div>

      <h2 className="khmer-title" style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: "var(--oxblood-900)", margin: "4px 0 6px" }}>
        {ceremony.titleKhmer}
      </h2>
      <p style={{ fontSize: "1.1rem", fontFamily: "var(--font-serif-en)", color: "var(--gold-700)", fontStyle: "italic", marginBottom: 12 }}>
        {ceremony.titleEn}
      </p>

      <p style={{ fontSize: 15, color: "var(--ink-800)", lineHeight: 1.6, backgroundColor: "var(--cream-100)", padding: 14, borderRadius: 6, borderLeft: "3px solid var(--gold-500)", marginBottom: 20 }}>
        {langMode === "km" ? ceremony.summaryKhmer : ceremony.summaryEn}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        <div style={{ backgroundColor: "var(--cream-100)", padding: 14, borderRadius: 6, border: "1px solid var(--border-cream)" }}>
          <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 8, letterSpacing: 0.5 }}>
            {langMode === "km" ? "អ្នកចូលរួមសំខាន់" : "Key Participants"}
          </h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--ink-700)" }}>
            {ceremony.participants.map((p, idx) => (
              <li key={idx} style={{ marginBottom: 4, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ color: "var(--sacred-red)" }}>•</span>
                <span>{langMode === "km" ? p.roleKhmer : `${p.roleEn} (${p.roleKhmer})`}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: "var(--cream-100)", padding: 14, borderRadius: 6, border: "1px solid var(--border-cream)" }}>
          <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 8, letterSpacing: 0.5 }}>
            {langMode === "km" ? "គ្រឿងសក្ការៈ និងវត្ថុប្រើប្រាស់" : "Sacred Objects & Offerings"}
          </h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--ink-700)" }}>
            {ceremony.sacredItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 4, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ color: "var(--gold-600)" }}>✦</span>
                <span>{langMode === "km" ? item.nameKhmer : `${item.nameEn} (${item.nameKhmer})`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
