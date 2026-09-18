// components/GalleryCard.js
"use client";
import useIsMobile from "./useIsMobile.js";

export default function GalleryCard({ ceremony, isActive, onClick, langMode }) {
  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;
  const { isMobile, canHover } = useIsMobile();

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
      role="button"
      tabIndex={0}
      aria-label={ceremony.titleEn}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
      className="gallery-card"
      style={{
        position: "relative",
        height: isMobile ? "clamp(300px, 55vh, 460px)" : "clamp(420px, 62vh, 680px)",
        width: isMobile ? "clamp(200px, 60vw, 300px)" : "clamp(280px, 44vh, 460px)",
        flexShrink: 0,
        backgroundColor: "#161616",
        cursor: "pointer",
        overflow: "visible",
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? "scale(1)" : "scale(0.95)",
        filter: isActive ? "blur(0px)" : "blur(1.5px)",
        transition: "opacity 500ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <img
          src={imageSrc}
          alt={ceremony.titleEn}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            filter: isActive ? "grayscale(0%)" : "grayscale(20%) contrast(105%)",
            transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease",
          }}
          onMouseEnter={canHover ? (e) => { e.currentTarget.style.transform = "scale(1.04)"; } : undefined}
          onMouseLeave={canHover ? (e) => { e.currentTarget.style.transform = "scale(1)"; } : undefined}
        />
      </div>
    </div>
  );
}
