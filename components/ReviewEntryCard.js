// components/ReviewEntryCard.js
"use client";
import ReviewActionButtons from "./ReviewActionButtons.js";

export default function ReviewEntryCard({ entry, onReviewSuccess, onError }) {
  const formattedDate = entry.created_at
    ? new Date(entry.created_at).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
      })
    : "";

  return (
    <article
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <span style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--accent-gold)", textTransform: "uppercase" }}>
            Step #{entry.sequence_order ?? 1} • {formattedDate}
          </span>
          <h2 style={{ fontSize: "19px", color: "#ffffff", margin: "4px 0 2px", fontWeight: 600 }}>
            {entry.title}
          </h2>
          {entry.title_khmer && (
            <div style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.7)" }}>
              {entry.title_khmer}
            </div>
          )}
        </div>
      </div>

      {entry.photo_url && (
        <div style={{ width: "100%", maxHeight: "240px", overflow: "hidden", borderRadius: "8px" }}>
          <img
            src={entry.photo_url}
            alt={entry.title}
            style={{ width: "100%", height: "240px", objectFit: "cover" }}
          />
        </div>
      )}

      {(entry.summary || entry.summary_khmer) && (
        <div style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.85)" }}>
          {entry.summary && <p style={{ margin: "0 0 4px" }}>{entry.summary}</p>}
          {entry.summary_khmer && <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.65)" }}>{entry.summary_khmer}</p>}
        </div>
      )}

      {entry.meaning && (
        <div style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(255, 255, 255, 0.7)", background: "rgba(0,0,0,0.25)", padding: "10px 12px", borderRadius: "8px" }}>
          <strong style={{ color: "var(--accent-gold-light)" }}>Meaning / អត្ថន័យ: </strong>
          {entry.meaning}
        </div>
      )}

      {entry.source && (
        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", fontStyle: "italic" }}>
          Source: {entry.source}
        </div>
      )}

      <ReviewActionButtons
        entryId={entry.id}
        onReviewSuccess={onReviewSuccess}
        onError={onError}
      />
    </article>
  );
}
