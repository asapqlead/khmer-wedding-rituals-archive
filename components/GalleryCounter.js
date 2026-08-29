// components/GalleryCounter.js
"use client";

export default function GalleryCounter({ current, total }) {
  return (
    <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "24px 36px", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", zIndex: 500 }}>
      <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 500, letterSpacing: "0.1em" }}>
          {current} — {total}
        </span>
      </div>
    </footer>
  );
}
