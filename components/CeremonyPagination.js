// components/CeremonyPagination.js
// Prev / Next arrows at the bottom of a ceremony view to navigate between rituals

export default function CeremonyPagination({ ceremonies, activeId, onSelectCeremony, langMode }) {
  const currentIndex = ceremonies.findIndex((c) => c.id === activeId);
  const prev = currentIndex > 0 ? ceremonies[currentIndex - 1] : null;
  const next = currentIndex < ceremonies.length - 1 ? ceremonies[currentIndex + 1] : null;

  const handleNav = (ceremony) => {
    onSelectCeremony(ceremony.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Ceremony pagination"
      style={{
        display: "flex",
        justifyContent: prev && next ? "space-between" : prev ? "flex-start" : "flex-end",
        alignItems: "stretch",
        gap: 16,
        marginTop: 40,
      }}
    >
      {prev && (
        <button
          onClick={() => handleNav(prev)}
          className="modern-card"
          style={{
            flex: 1,
            maxWidth: next ? "50%" : 320,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 20px",
            textAlign: "left",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--accent-red)",
              fontSize: 18,
              flexShrink: 0,
              transition: "background-color 200ms ease, color 200ms ease",
            }}
          >
            ←
          </span>
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: "var(--text-tertiary)",
                marginBottom: 2,
              }}
            >
              {langMode === "km" ? "មុន" : "Previous"}
            </span>
            <span
              className="khmer-title"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {langMode === "km"
                ? prev.titleKhmer.split("(")[0]
                : prev.titleEn.split("—")[0]}
            </span>
          </div>
        </button>
      )}

      {next && (
        <button
          onClick={() => handleNav(next)}
          className="modern-card"
          style={{
            flex: 1,
            maxWidth: prev ? "50%" : 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 14,
            padding: "18px 20px",
            textAlign: "right",
            backgroundColor: "var(--bg-secondary)",
            marginLeft: prev ? undefined : "auto",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: "var(--text-tertiary)",
                marginBottom: 2,
              }}
            >
              {langMode === "km" ? "បន្ទាប់" : "Next"}
            </span>
            <span
              className="khmer-title"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {langMode === "km"
                ? next.titleKhmer.split("(")[0]
                : next.titleEn.split("—")[0]}
            </span>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--accent-red)",
              fontSize: 18,
              flexShrink: 0,
              transition: "background-color 200ms ease, color 200ms ease",
            }}
          >
            →
          </span>
        </button>
      )}
    </nav>
  );
}
