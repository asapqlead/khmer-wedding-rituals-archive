// components/ReviewQueueClient.js
"use client";
import { useState } from "react";
import Link from "next/link";
import ReviewEntryCard from "./ReviewEntryCard.js";

const EMPTY_MESSAGE =
  "The review queue is empty. No ceremonies are waiting for review. / គ្មានពិធីដែលត្រូវពិនិត្យទេ។ បញ្ជីពិនិត្យគឺទទេ។";

export default function ReviewQueueClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);

  const handleReviewSuccess = (reviewedId) => {
    setEntries((prev) => prev.filter((item) => item.id !== reviewedId));
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Back link */}
      <Link
        href="/"
        className="link-text"
        style={{
          fontSize: 13,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        ← ត្រឡប់ទៅបណ្ណសារ / Back to Archive
      </Link>

      {/* Header — one clean line */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: "clamp(20px, 3vw, 24px)",
            color: "#ffffff",
            margin: 0,
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          បញ្ជីពិនិត្យ <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/ Review Queue</span>
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
          {entries.length} pending
        </p>
      </div>

      {entries.length === 0 ? (
        <div
          style={{
            padding: "56px 20px",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <span style={{ fontSize: 28, display: "block", marginBottom: 12, opacity: 0.6 }}>✓</span>
          {EMPTY_MESSAGE}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((entry) => (
            <ReviewEntryCard
              key={entry.id}
              entry={entry}
              onReviewSuccess={handleReviewSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
