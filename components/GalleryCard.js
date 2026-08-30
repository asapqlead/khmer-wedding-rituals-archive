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
    </div>
  );
}
