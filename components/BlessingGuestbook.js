// components/BlessingGuestbook.js
// Displays visitor-tied blessing wishes in the living archive guestbook

export default function BlessingGuestbook({ blessings, langMode }) {
  if (!blessings || blessings.length === 0) return null;

  return (
    <div style={{ marginTop: 24, borderTop: "1px solid var(--border-cream)", paddingTop: 18 }}>
      <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 12, letterSpacing: 0.5 }}>
        {langMode === "km" ? "ពរជ័យដែលបានចងក្នុងបណ្ណសារ (" : "Blessings Tied into Archive ("}
        {blessings.length})
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {blessings.map((b, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 12px",
              backgroundColor: "var(--cream-100)",
              borderRadius: 6,
              border: "1px solid var(--border-gold)",
              fontSize: 13,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sacred-red)", fontWeight: 600, fontSize: 12 }}>
              <span>{b.intentionKhmer}</span>
              <span style={{ color: "var(--gold-600)" }}>✦</span>
            </div>
            <p style={{ margin: "4px 0", color: "var(--ink-800)", fontStyle: "italic" }}>"{b.wishText}"</p>
            <span style={{ fontSize: 11, color: "var(--ink-500)" }}>— {b.author || "An Elder Friend"} ({b.time})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
