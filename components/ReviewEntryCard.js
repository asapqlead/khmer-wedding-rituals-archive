// components/ReviewEntryCard.js
"use client";
import ReviewActionButtons from "./ReviewActionButtons.js";

export default function ReviewEntryCard({ entry, langMode, onReviewSuccess, onError }) {
  const isKm = langMode === "km";
  const displayTitle = isKm ? (entry.title_khmer || entry.title) : entry.title;
  const displaySummary = isKm ? (entry.summary_khmer || entry.summary) : (entry.summary || entry.summary_khmer);

  const formattedDate = entry.created_at
    ? new Date(entry.created_at).toLocaleDateString(isKm ? "km-KH" : "en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "";

  return (
    <article
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 14,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Title row */}
      <div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
          #{entry.sequence_order ?? 1} · {formattedDate}
        </span>
        <h2
          style={{
            fontSize: 17,
            color: "#ffffff",
            margin: "4px 0 0",
            fontWeight: 600,
            lineHeight: 1.35,
            fontFamily: isKm ? "var(--font-khmer-serif)" : "inherit",
          }}
        >
          {displayTitle}
        </h2>
      </div>

      {/* Photo */}
      {entry.photo_url && (
        <div style={{ overflow: "hidden", borderRadius: 10 }}>
          <img
            src={entry.photo_url}
            alt={displayTitle}
            style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {/* Summary */}
      {displaySummary && (
        <div style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.7)", fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit" }}>
          <p style={{ margin: 0 }}>{displaySummary}</p>
        </div>
      )}

      {/* Meaning */}
      {entry.meaning && (
        <div style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.55)", padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 4, fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit" }}>
            {isKm ? "អត្ថន័យ" : "Spiritual Meaning"}
          </span>
          {entry.meaning}
        </div>
      )}

      {/* Source */}
      {entry.source && (
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
          {isKm ? `ប្រភព៖ ${entry.source}` : `Source: ${entry.source}`}
        </div>
      )}

      <ReviewActionButtons
        entryId={entry.id}
        langMode={langMode}
        onReviewSuccess={onReviewSuccess}
        onError={onError}
      />
    </article>
  );
}
