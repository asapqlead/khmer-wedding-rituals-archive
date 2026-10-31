// components/ReviewQueueClient.js
"use client";
import { useState } from "react";
import Link from "next/link";
import ReviewEntryCard from "./ReviewEntryCard.js";

const EMPTY_MESSAGE =
  "The review queue is empty. No ceremonies are waiting for review. / គ្មានពិធីដែលត្រូវពិនិត្យទេ។ បញ្ជីពិនិត្យគឺទទេ។";

export default function ReviewQueueClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReviewSuccess = (reviewedId) => {
    setEntries((prev) => prev.filter((item) => item.id !== reviewedId));
    setErrorMessage("");
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Link
          href="/"
          style={{ color: "rgba(255, 255, 255, 0.7)", textDecoration: "none", fontSize: "14px" }}
        >
          ← Back to Archive / ត្រឡប់ទៅបណ្ណសារ
        </Link>
        <span style={{ fontSize: "13px", color: "var(--accent-gold)" }}>
          {entries.length} pending
        </span>
      </div>

      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", color: "#ffffff", margin: "0 0 6px", fontWeight: 600 }}>
          Review Queue / បញ្ជីពិនិត្យ
        </h1>
        <p style={{ margin: 0, fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
          Publish entries to make them public or return them to contributors for edits.
        </p>
      </header>

      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            borderRadius: "10px",
            fontSize: "13px",
            marginBottom: "20px",
            lineHeight: 1.5,
          }}
        >
          {errorMessage}
        </div>
      )}

      {entries.length === 0 ? (
        <div
          style={{
            padding: "48px 20px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>✓</span>
          {EMPTY_MESSAGE}
        </div>
      ) : (
        <div>
          {entries.map((entry) => (
            <ReviewEntryCard
              key={entry.id}
              entry={entry}
              onReviewSuccess={handleReviewSuccess}
              onError={setErrorMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
