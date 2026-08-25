// components/StepAccordionItem.js
// Individual expandable ritual step showing sequence detail and cultural meaning

export default function StepAccordionItem({ step, isOpen, onToggle, langMode }) {
  return (
    <div
      style={{
        border: "1px solid var(--border-cream)",
        borderRadius: 8,
        backgroundColor: isOpen ? "var(--cream-50)" : "var(--cream-100)",
        marginBottom: 10,
        overflow: "hidden",
        transition: "all 180ms ease-out",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          textAlign: "left",
          backgroundColor: isOpen ? "rgba(92, 19, 29, 0.04)" : "transparent",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: isOpen ? "var(--oxblood-800)" : "var(--cream-300)",
              color: isOpen ? "var(--cream-50)" : "var(--ink-800)",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {step.stepNumber}
          </span>
          <div>
            <h4
              className="khmer-title"
              style={{
                fontSize: 15,
                color: isOpen ? "var(--oxblood-900)" : "var(--ink-900)",
                fontWeight: 600,
              }}
            >
              {langMode === "en" ? step.titleEn : step.titleKhmer}
            </h4>
            {langMode === "dual" && (
              <p style={{ fontSize: 12, color: "var(--ink-500)", margin: "2px 0 0" }}>
                {step.titleEn}
              </p>
            )}
          </div>
        </div>
        <span style={{ fontSize: 18, color: "var(--gold-600)", fontWeight: 700, paddingLeft: 8 }}>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: "14px 18px 18px", borderTop: "1px solid var(--border-cream)" }}>
          <p style={{ fontSize: 14, color: "var(--ink-800)", lineHeight: 1.6, marginBottom: 12 }}>
            {langMode === "km" ? step.detailKhmer : step.detailEn}
          </p>

          <div
            style={{
              backgroundColor: "var(--sacred-red-subtle)",
              borderLeft: "3px solid var(--sacred-red)",
              padding: "10px 14px",
              borderRadius: "0 6px 6px 0",
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oxblood-800)", textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 }}>
              {langMode === "km" ? "អត្ថន័យជ្រាលជ្រៅ និងជំនឿ" : "Cultural Meaning & Symbolism"}
            </p>
            <p style={{ fontSize: 13.5, color: "var(--ink-800)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
              "{langMode === "km" ? step.meaningKhmer : step.meaningEn}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
