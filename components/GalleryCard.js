// components/GalleryCard.js
"use client";

export default function GalleryCard({ ceremony, isActive, onClick, langMode }) {
  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onClick(ceremony, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="gallery-card"
      style={{
        position: "relative",
        height: "clamp(420px, 62vh, 680px)",
        width: "clamp(280px, 44vh, 460px)",
        flexShrink: 0,
        backgroundColor: "#161616",
        cursor: "pointer",
        overflow: "hidden",
        opacity: isActive ? 1 : 0.85,
        transition: "opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <img
        src={imageSrc}
        alt={ceremony.titleEn}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: isActive ? "grayscale(0%)" : "grayscale(20%) contrast(105%)",
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      />

      <div className="crosshair-icon" style={{ opacity: isActive ? 0.9 : 0 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          background: "linear-gradient(to top, rgba(18,18,18,0.85), transparent)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)", fontSize: 10 }}>0{ceremony.order}</span>
          <h3 className={langMode === "km" ? "khmer-serif" : ""} style={{ fontSize: 16, color: "#F2F2F0", marginTop: 2 }}>
            {langMode === "km" ? ceremony.titleKhmer : ceremony.titleEn}
          </h3>
        </div>
      </div>
    </div>
  );
}
