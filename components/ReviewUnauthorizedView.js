// components/ReviewUnauthorizedView.js
// Access restriction card for the review queue with language switching
"use client";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher.js";
import useLanguage from "../hooks/useLanguage.js";

export default function ReviewUnauthorizedView({ cardStyle }) {
  const [langMode, setLangMode] = useLanguage();
  const isKm = langMode === "km";

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <LanguageSwitcher langMode={langMode} onChange={setLangMode} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            margin: "0 0 10px 0",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.35,
            fontFamily: isKm ? "var(--font-khmer-serif)" : "inherit",
          }}
        >
          {isKm ? "ការចូលប្រើត្រូវបានបដិសេធ" : "Access Restricted"}
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit",
          }}
        >
          {isKm
            ? "អ្នកមិនមានសិទ្ធិចូលមើលទំព័រពិនិត្យនេះទេ។"
            : "Access restricted. You do not have reviewer permissions to view this page."}
        </p>
      </div>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "10px 24px",
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 14,
          textDecoration: "none",
          fontFamily: isKm ? "var(--font-khmer-sans)" : "inherit",
        }}
      >
        {isKm ? "← ត្រឡប់ទៅបណ្ណសារ" : "← Back to Archive"}
      </Link>
    </div>
  );
}

