// components/CeremonyNav.js
// Chronological sequence selector across wedding ceremonies from dawn to evening

export default function CeremonyNav({ ceremonies, activeId, onSelectCeremony, langMode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          {langMode === "km" ? "លំដាប់កាលវេលានៃពិធីការ (Dawn → Sunset)" : "Chronological Order of Ceremonies"}
        </p>
        <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 500 }}>
          {ceremonies.length} {langMode === "km" ? "ពិធីពេញលេញ" : "Key Rituals"}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {ceremonies.map((c) => {
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              className="modern-card"
              onClick={() => onSelectCeremony(c.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px",
                textAlign: "left",
                backgroundColor: isActive ? "var(--accent-red-light)" : "var(--bg-secondary)",
                borderColor: isActive ? "var(--accent-red)" : "var(--border-light)",
                boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)",
                minHeight: 80,
                transform: isActive ? "translateY(-2px)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", marginBottom: 8 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: isActive ? "var(--accent-red)" : "var(--bg-tertiary)",
                    color: isActive ? "var(--bg-secondary)" : "var(--text-secondary)",
                  }}
                >
                  {c.order}
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: isActive ? "var(--accent-red-hover)" : "var(--text-tertiary)" }}>
                  {c.timeOfDay.split("•")[1] || c.timeOfDay}
                </span>
              </div>
              <span
                className="khmer-title"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: isActive ? "var(--accent-red-hover)" : "var(--text-primary)",
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
