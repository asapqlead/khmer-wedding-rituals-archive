// components/StepAccordionItem.js
// Individual expandable ritual step showing sequence detail and cultural meaning

export default function StepAccordionItem({ step, isOpen, onToggle, langMode }) {
  return (
    <div
      style={{
        border: "1px solid var(--border-light)",
        borderRadius: 12,
        backgroundColor: isOpen ? "var(--bg-secondary)" : "var(--bg-primary)",
        marginBottom: 12,
        overflow: "hidden",
        transition: "all 200ms ease-out",
        boxShadow: isOpen ? "var(--shadow-md)" : "none",
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
          padding: "16px 20px",
          textAlign: "left",
          backgroundColor: "transparent",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: isOpen ? "var(--accent-red)" : "var(--bg-tertiary)",
              color: isOpen ? "var(--bg-secondary)" : "var(--text-secondary)",
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
              transition: "all 200ms ease",
            }}
          >
            {step.stepNumber}
          </span>
          <div>
            <h4
              className="khmer-title"
              style={{
                fontSize: 16,
                color: isOpen ? "var(--accent-red-hover)" : "var(--text-primary)",
                fontWeight: 600,
                transition: "color 200ms ease",
              }}
            >
              {langMode === "en" ? step.titleEn : step.titleKhmer}
            </h4>
          </div>
        </div>
        <span style={{ fontSize: 20, color: "var(--text-tertiary)", fontWeight: 400, paddingLeft: 8, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}>
          +
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid transparent" }}>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16, marginTop: 8 }}>
            {langMode === "km" ? step.detailKhmer : step.detailEn}
          </p>

          <div
            style={{
              backgroundColor: "var(--accent-red-light)",
              borderLeft: "3px solid var(--accent-red)",
              padding: "12px 16px",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-red-hover)", textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 }}>
              {langMode === "km" ? "អត្ថន័យជ្រាលជ្រៅ និងជំនឿ" : "Cultural Meaning & Symbolism"}
            </p>
            <p style={{ fontSize: 14, color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
              "{langMode === "km" ? step.meaningKhmer : step.meaningEn}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
