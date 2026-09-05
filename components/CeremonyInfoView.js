// components/CeremonyInfoView.js
"use client";
import { useEffect, useState, useRef } from "react";
import CeremonyInfoContent from "./CeremonyInfoContent.js";
import ScrollProgress from "./ScrollProgress.js";

export default function CeremonyInfoView({ ceremony, onClose, onNext, langMode }) {
  const [isSlidUp, setIsSlidUp] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsSlidUp(true));
    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 850);

    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") handleBack();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(textTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleBack = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
    }, 480);
  };

  if (!ceremony) return null;
  const imageSrc = ceremony.mediaPlaceholder?.image || `/images/${ceremony.id}/ceremony.jpg`;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className="custom-scrollbar"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#0d0d0d",
        transform: isSlidUp ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      <ScrollProgress containerRef={containerRef} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(10, 10, 10, 0.65) 45%, rgba(14, 14, 14, 0.92) 80%, rgba(14, 14, 14, 0.98) 100%)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="lang-text"
        style={{
          position: "fixed",
          top: "clamp(24px, 4vh, 48px)",
          left: "clamp(28px, 4vw, 56px)",
          zIndex: 50,
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: 400,
          fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "var(--font-sans)",
          opacity: isTextVisible && !isFadingOut ? 0.85 : 0,
          pointerEvents: isTextVisible && !isFadingOut ? "auto" : "none",
          letterSpacing: "0.02em",
          transition: "opacity 700ms ease, transform 200ms ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        {langMode === "km" ? "ត្រឡប់ក្រោយ" : "Back"}
      </button>

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="lang-text"
          style={{
            position: "fixed",
            bottom: "clamp(24px, 4vh, 48px)",
            right: "clamp(28px, 4vw, 56px)",
            zIndex: 50,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 400,
            fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "var(--font-sans)",
            opacity: isTextVisible && !isFadingOut ? 0.85 : 0,
            pointerEvents: isTextVisible && !isFadingOut ? "auto" : "none",
            letterSpacing: "0.02em",
            transition: "opacity 700ms ease, transform 200ms ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(3px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          {langMode === "km" ? "បន្ទាប់" : "Next"}
        </button>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "flex-end",
          minHeight: "100vh",
          padding: "clamp(80px, 12vh, 120px) clamp(28px, 5vw, 72px) clamp(60px, 8vh, 90px)",
        }}
      >
        <CeremonyInfoContent ceremony={ceremony} langMode={langMode} isVisible={isTextVisible && !isFadingOut} />
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 100,
          pointerEvents: "none",
          opacity: isFadingOut ? 1 : 0,
          transition: "opacity 480ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
    </div>
  );
}
