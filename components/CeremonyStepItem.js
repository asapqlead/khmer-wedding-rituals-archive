// components/CeremonyStepItem.js
export default function CeremonyStepItem({ step, langMode }) {
  return (
    <div
      style={{
        padding: "20px 0",
        borderBottom: "1px solid var(--border-subtle)",
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: 16,
      }}
    >
      <span className="font-mono-tag" style={{ color: "var(--accent-gold)", fontSize: 13, paddingTop: 2 }}>
        0{step.stepNumber}
      </span>
      <div>
        <h4 className={langMode === "km" ? "khmer-serif" : ""} style={{ fontSize: 16, color: "var(--text-primary)", marginBottom: 10 }}>
          {langMode === "km" ? step.titleKhmer : step.titleEn}
        </h4>

        {/* Reason & Action */}
        <div style={{ marginBottom: 10 }}>
          <span className="font-mono-tag" style={{ fontSize: 10, color: "var(--text-muted)", display: "block", marginBottom: 3 }}>
            {langMode === "km" ? "គោលបំណង និងសកម្មភាព (REASON)" : "REASON & ACTION"}
          </span>
          <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {langMode === "km" ? step.detailKhmer : step.detailEn}
          </p>
        </div>

        {/* Meaning & Symbolism */}
        <div
          style={{
            padding: "10px 14px",
            backgroundColor: "rgba(197, 160, 89, 0.06)",
            borderLeft: "2px solid var(--accent-gold)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <span className="font-mono-tag" style={{ fontSize: 10, color: "var(--accent-gold)", display: "block", marginBottom: 3 }}>
            {langMode === "km" ? "អត្ថន័យ និងទស្សនវិជ្ជា (MEANING)" : "MEANING & PHILOSOPHY"}
          </span>
          <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.55 }}>
            {langMode === "km" ? step.meaningKhmer : step.meaningEn}
          </p>
        </div>
      </div>
    </div>
  );
}
