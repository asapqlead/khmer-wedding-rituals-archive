// components/ReviewQueueClient.js
"use client";
import { useState } from "react";
import Link from "next/link";
import ReviewEntryCard from "./ReviewEntryCard.js";
import LanguageSwitcher from "./LanguageSwitcher.js";
import useLanguage from "../hooks/useLanguage.js";

export default function ReviewQueueClient({ initialEntries = [] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [langMode, setLangMode] = useLanguage();
  const isKm = langMode === "km";

  const handleReviewSuccess = (reviewedId) => {
    setEntries((prev) => prev.filter((item) => item.id !== reviewedId));
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Top action row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Link
          href="/"
          className="link-text"
          style={{
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 500,
            fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit",
          }}
        >
          {isKm ? "← ត្រឡប់ទៅបណ្ណសារ" : "← Back to Archive"}
        </Link>
        <LanguageSwitcher langMode={langMode} onChange={setLangMode} />
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: "clamp(20px, 3vw, 24px)",
            color: "#ffffff",
            margin: 0,
            fontWeight: 600,
            lineHeight: 1.4,
            fontFamily: isKm ? "var(--font-khmer-serif)" : "inherit",
          }}
        >
          {isKm ? "បញ្ជីពិនិត្យ" : "Review Queue"}
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit" }}>
          {isKm ? `${entries.length} កំពុងរង់ចាំ` : `${entries.length} pending`}
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
            fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit",
          }}
        >
          <span style={{ fontSize: 28, display: "block", marginBottom: 12, opacity: 0.6 }}>✓</span>
          {isKm
            ? "គ្មានពិធីដែលត្រូវពិនិត្យទេ។ បញ្ជីពិនិត្យគឺទទេ។"
            : "The review queue is empty. No ceremonies are waiting for review."}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((entry) => (
            <ReviewEntryCard
              key={entry.id}
              entry={entry}
              langMode={langMode}
              onReviewSuccess={handleReviewSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
