// components/CeremonyNav.js
// Chronological sequence selector across wedding ceremonies from dawn to evening

export default function CeremonyNav({ ceremonies, activeId, onSelectCeremony, langMode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5, color: "var(--oxblood-700)", textTransform: "uppercase" }}>
          {langMode === "km" ? "លំដាប់កាលវេលានៃពិធីការ (Dawn → Sunset)" : "Chronological Order of Ceremonies"}
        </p>
        <span style={{ fontSize: 12, color: "var(--ink-500)", fontStyle: "italic" }}>
          {ceremonies.length} {langMode === "km" ? "ពិធីពេញលេញ" : "Key Rituals"}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 8,
          backgroundColor: "var(--cream-100)",
          padding: 8,
          borderRadius: 8,
          border: "1px solid var(--border-cream)",
        }}
      >
        {ceremonies.map((c) => {
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCeremony(c.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 12px",
                borderRadius: 6,
                textAlign: "left",
                backgroundColor: isActive ? "var(--oxblood-800)" : "transparent",
                color: isActive ? "var(--cream-50)" : "var(--ink-900)",
                border: isActive ? "1px solid var(--gold-500)" : "1px solid transparent",
                boxShadow: isActive ? "0 4px 12px rgba(62,11,18,0.18)" : "none",
                minHeight: 64,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", marginBottom: 4 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: isActive ? "var(--gold-500)" : "var(--cream-300)",
                    color: isActive ? "var(--oxblood-900)" : "var(--ink-800)",
                  }}
                >
                  {c.order}
                </span>
                <span style={{ fontSize: 11, color: isActive ? "var(--gold-300)" : "var(--ink-500)" }}>
                  {c.timeOfDay.split("•")[1] || c.timeOfDay}
                </span>
              </div>
              <span
                className="khmer-title"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: isActive ? "var(--cream-50)" : "var(--oxblood-800)",
                }}
              >
                {langMode === "en" ? c.titleEn.split("—")[0] : c.titleKhmer.split("(")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
