// components/CommunityCard.js
// Individual card displaying a community-submitted ritual variation

export default function CommunityCard({ item, langMode }) {
  return (
    <div
      style={{
        backgroundColor: "var(--cream-50)",
        border: "1px solid var(--border-cream)",
        borderRadius: 8,
        padding: "16px 18px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--oxblood-800)", backgroundColor: "var(--cream-200)", padding: "2px 8px", borderRadius: 4 }}>
            📍 {item.province}
          </span>
          <span style={{ fontSize: 11, color: "var(--sacred-red)", fontWeight: 600 }}>
            {item.ritualName}
          </span>
        </div>

        <h4 className="khmer-title" style={{ fontSize: 16, color: "var(--oxblood-900)", margin: "4px 0 6px" }}>
          {item.title}
        </h4>

        <p style={{ fontSize: 13.5, color: "var(--ink-800)", lineHeight: 1.5, margin: 0 }}>
          {langMode === "km" ? item.storyKhmer || item.storyEn : item.storyEn}
        </p>
      </div>

      <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px solid var(--border-cream)", fontSize: 11, color: "var(--ink-500)", display: "flex", justifyContent: "space-between" }}>
        <span>Contributed by: <strong>{item.contributorName}</strong></span>
        <span>{item.dateAdded}</span>
      </div>
    </div>
  );
}
