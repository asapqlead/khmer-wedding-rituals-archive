// components/MobileProgressIndicator.js
"use client";

const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";
const toKhmerNum = (n) => String(n).replace(/\d/g, (d) => KHMER_DIGITS[d]);

export default function MobileProgressIndicator({ current, total, langMode }) {
  const isKhmer = langMode === "km";
  const displayCurrent = isKhmer ? toKhmerNum(current) : current;
  const displayTotal = isKhmer ? toKhmerNum(total) : total;
  const isComplete = current === total;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "16px 22px 0",
      }}
    >
      <span
        style={{
          fontFamily: isKhmer ? "var(--font-khmer-sans)" : "var(--font-mono)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: isComplete ? "var(--accent-gold)" : "var(--text-muted)",
          transition: "color 300ms ease",
        }}
      >
        {displayCurrent} — {displayTotal}
      </span>
    </div>
  );
}
