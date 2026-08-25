// components/ArchivalPlaceholder.js
// Archival media placeholder frame for real family field recordings and photos

export default function ArchivalPlaceholder({ placeholder, ceremonyId }) {
  if (!placeholder) return null;

  return (
    <div
      style={{
        marginTop: 24,
        padding: "24px 20px",
        backgroundColor: "var(--cream-100)",
        border: "1.5px dashed var(--border-gold)",
        borderRadius: 8,
        textAlign: "center",
        color: "var(--ink-700)",
      }}
      role="region"
      aria-label="Archival Media Placeholder"
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, backgroundColor: "var(--cream-200)", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: "var(--oxblood-800)", marginBottom: 12 }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--gold-600)" }} />
        ARCHIVAL MEDIA SLOT • {placeholder.type.toUpperCase()}
      </div>

      <h4 style={{ fontSize: 16, color: "var(--oxblood-900)", marginBottom: 6 }}>
        {placeholder.titleEn}
      </h4>

      <p style={{ fontSize: 13, color: "var(--ink-600)", maxWidth: 540, margin: "0 auto 12px", lineHeight: 1.5 }}>
        {placeholder.descriptionEn}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 11, color: "var(--ink-500)", fontStyle: "italic" }}>
        <span>Target Aspect Ratio: {placeholder.recommendedRatio}</span>
        <span>•</span>
        <span>Archive ID: {ceremonyId}-media-01</span>
      </div>
    </div>
  );
}
