// components/GalleryCounter.js
"use client";

export default function GalleryCounter({ current, total, isHidden }) {
  const isComplete = current === total;

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "24px 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 50,
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 350ms ease, transform 350ms ease",
      }}
    >
      <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <span
          style={{
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            color: isComplete ? "var(--accent-gold)" : "var(--text-primary)",
            textShadow: isComplete ? "0 0 12px rgba(197, 160, 89, 0.45)" : "none",
            fontWeight: 500,
            letterSpacing: "0.1em",
            transition: "color 300ms ease, text-shadow 300ms ease",
          }}
        >
          {current} — {total}
        </span>
      </div>
    </footer>
  );
}
