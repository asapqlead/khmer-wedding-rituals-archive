// components/LanguageToggle.js
// Bilingual emphasis switcher: Khmer Primary, English Primary, or Dual View

export default function LanguageToggle({ langMode, onChangeLangMode }) {
  const options = [
    { id: "km", label: "អក្សរខ្មែរចម្បង", shortLabel: "ខ្មែរ (KM)" },
    { id: "en", label: "English Primary", shortLabel: "English (EN)" },
    { id: "dual", label: "ទ្វេភាសា (Dual)", shortLabel: "ទ្វេភាសា (Dual)" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Language display emphasis"
      style={{
        display: "inline-flex",
        background: "var(--cream-200)",
        padding: 4,
        borderRadius: 24,
        border: "1px solid var(--border-gold)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {options.map((opt) => {
        const isActive = langMode === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChangeLangMode(opt.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--cream-50)" : "var(--ink-700)",
              backgroundColor: isActive ? "var(--oxblood-800)" : "transparent",
              boxShadow: isActive ? "0 2px 8px rgba(62,11,18,0.25)" : "none",
              transition: "all 180ms ease-out",
            }}
          >
            {opt.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
