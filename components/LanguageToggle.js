import { useRef, useEffect, useState } from "react";

export default function LanguageToggle({ langMode, onChangeLangMode }) {
  const containerRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const options = [
    { id: "km", label: "អក្សរខ្មែរចម្បង", shortLabel: "ខ្មែរ (KM)" },
    { id: "en", label: "English Primary", shortLabel: "English (EN)" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector('[aria-checked="true"]');
    if (activeBtn) {
      setHighlightStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1
      });
    }
  }, [langMode]);

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="Language display emphasis"
      className="liquid-glass-btn"
      style={{
        position: "relative",
        display: "inline-flex",
        padding: 4,
        borderRadius: 100,
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: highlightStyle.left,
          width: highlightStyle.width,
          opacity: highlightStyle.opacity,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.6)",
          borderRadius: 100,
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}
      />
      {options.map((opt) => {
        const isActive = langMode === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChangeLangMode(opt.id)}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "6px 14px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--accent-red)" : "var(--text-secondary)",
              backgroundColor: "transparent",
            }}
          >
            {opt.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
