// components/GlossaryCategoryTabs.js
"use client";

export default function GlossaryCategoryTabs({ categories, activeCategory, onSelectCategory, isMobile }) {
  return (
    <div
      className={isMobile ? "no-scrollbar" : ""}
      style={{
        display: "flex",
        gap: 8,
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        marginBottom: 32,
        paddingBottom: isMobile ? 4 : 0,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {categories.map((c) => {
        const isActive = activeCategory === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelectCategory(c)}
            className="font-mono-tag"
            style={{
              padding: isMobile ? "8px 16px" : "6px 14px",
              borderRadius: 100,
              fontSize: 10,
              border: "1px solid",
              borderColor: isActive ? "var(--accent-gold)" : "var(--border-subtle)",
              backgroundColor: isActive ? "var(--accent-gold)" : "transparent",
              color: isActive ? "#121212" : "var(--text-muted)",
              transition: "all 200ms ease",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
              minHeight: isMobile ? 44 : "auto",
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
