// components/ArchivalPlaceholder.js
// Archival media frame — shows the real image when available, falls back to placeholder

export default function ArchivalPlaceholder({ placeholder, ceremonyId }) {
  if (!placeholder) return null;

  const hasImage = !!placeholder.image;

  return (
    <div
      style={{
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 10,
        overflow: "hidden",
        border: hasImage
          ? "1px solid var(--border-light)"
          : "1.5px dashed var(--border-gold)",
        backgroundColor: hasImage ? "var(--bg-secondary)" : "var(--cream-100)",
        boxShadow: hasImage ? "var(--shadow-md)" : "none",
      }}
      role="region"
      aria-label={placeholder.titleEn}
    >
      {/* Image display */}
      {hasImage && (
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <img
            src={placeholder.image}
            alt={placeholder.descriptionEn}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: 420,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Gradient overlay at bottom for caption readability */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(transparent, rgba(0,0,0,0.45))",
              pointerEvents: "none",
            }}
          />
          {/* Media type badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 6,
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.5,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--accent-gold)",
              }}
            />
            ARCHIVAL {placeholder.type.toUpperCase()}
          </div>
        </div>
      )}

      {/* Caption / metadata bar */}
      <div
        style={{
          padding: hasImage ? "14px 18px" : "24px 20px",
          textAlign: hasImage ? "left" : "center",
          color: "var(--ink-700)",
        }}
      >
        {/* Show the old badge only when there's no image */}
        {!hasImage && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 4,
              backgroundColor: "var(--cream-200)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.5,
              color: "var(--oxblood-800)",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--gold-600)",
              }}
            />
            ARCHIVAL MEDIA SLOT • {placeholder.type.toUpperCase()}
          </div>
        )}

        <h4
          style={{
            fontSize: hasImage ? 14 : 16,
            color: hasImage ? "var(--text-primary)" : "var(--oxblood-900)",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          {placeholder.titleEn}
        </h4>

        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            maxWidth: hasImage ? "none" : 540,
            margin: hasImage ? "0" : "0 auto 12px",
            lineHeight: 1.5,
          }}
        >
          {placeholder.descriptionEn}
        </p>

        {!hasImage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              fontSize: 11,
              color: "var(--ink-500)",
              fontStyle: "italic",
              marginTop: 12,
            }}
          >
            <span>Target Aspect Ratio: {placeholder.recommendedRatio}</span>
            <span>•</span>
            <span>Archive ID: {ceremonyId}-media-01</span>
          </div>
        )}
      </div>
    </div>
  );
}
