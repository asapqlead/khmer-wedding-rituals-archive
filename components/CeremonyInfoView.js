// components/CeremonyInfoView.js
"use client";
import { useEffect, useState, useRef } from "react";
import CeremonyInfoContent from "./CeremonyInfoContent.js";
import ScrollProgress from "./ScrollProgress.js";
import useIsMobile from "./useIsMobile.js";

export default function CeremonyInfoView({ ceremony, onClose, onNext, langMode }) {
  const [isSlidUp, setIsSlidUp] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef(null);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    let canScrollClose = false;
    const cooldown = setTimeout(() => { canScrollClose = true; }, 300);
    const raf = requestAnimationFrame(() => setIsSlidUp(true));
    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 850);

    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") handleBack();
    };

    const onWheel = (e) => {
      if (!canScrollClose) return;
      if (e.deltaY > 20) handleBack();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      clearTimeout(cooldown);
      clearTimeout(textTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
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
      onWheel={(e) => {
        if (e.deltaY > 20) handleBack();
      }}
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
            background: isMobile
              ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(14, 14, 14, 0.95) 70%, rgba(14, 14, 14, 0.99) 100%)"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(10, 10, 10, 0.65) 45%, rgba(14, 14, 14, 0.92) 80%, rgba(14, 14, 14, 0.98) 100%)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="lang-text"
        style={{
          position: "fixed",
          top: isMobile ? "clamp(16px, 3vh, 32px)" : "clamp(24px, 4vh, 48px)",
          left: isMobile ? "clamp(16px, 3vw, 28px)" : "clamp(28px, 4vw, 56px)",
          zIndex: 50,
          color: "#FFFFFF",
          fontSize: isMobile ? 13.5 : 15,
          fontWeight: 400,
          fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "var(--font-sans)",
          opacity: isTextVisible && !isFadingOut ? 0.95 : 0,
          pointerEvents: isTextVisible && !isFadingOut ? "auto" : "none",
          letterSpacing: "0.02em",
          transition: "opacity 700ms ease, transform 200ms ease",
          cursor: "pointer",
          minWidth: 44,
          minHeight: 44,
          padding: isMobile ? "6px 14px" : "0",
          backgroundColor: isMobile ? "rgba(18, 18, 18, 0.75)" : "transparent",
          borderRadius: 999,
          border: isMobile ? "1px solid rgba(255, 255, 255, 0.18)" : "none",
          backdropFilter: isMobile ? "blur(12px)" : "none",
          WebkitBackdropFilter: isMobile ? "blur(12px)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.95"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        {langMode === "km" ? "← ត្រឡប់ក្រោយ" : "← Back"}
      </button>

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="lang-text"
          style={{
            position: "fixed",
            bottom: isMobile ? "clamp(16px, 3vh, 32px)" : "clamp(24px, 4vh, 48px)",
            right: isMobile ? "clamp(16px, 3vw, 28px)" : "clamp(28px, 4vw, 56px)",
            zIndex: 50,
            color: "#FFFFFF",
            fontSize: isMobile ? 13.5 : 15,
            fontWeight: 400,
            fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "var(--font-sans)",
            opacity: isTextVisible && !isFadingOut ? 0.95 : 0,
            pointerEvents: isTextVisible && !isFadingOut ? "auto" : "none",
            letterSpacing: "0.02em",
            transition: "opacity 700ms ease, transform 200ms ease",
            cursor: "pointer",
            minWidth: 44,
            minHeight: 44,
            padding: isMobile ? "6px 14px" : "0",
            backgroundColor: isMobile ? "rgba(18, 18, 18, 0.75)" : "transparent",
            borderRadius: 999,
            border: isMobile ? "1px solid rgba(255, 255, 255, 0.18)" : "none",
            backdropFilter: isMobile ? "blur(12px)" : "none",
            WebkitBackdropFilter: isMobile ? "blur(12px)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(3px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.95"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          {langMode === "km" ? "បន្ទាប់ →" : "Next →"}
        </button>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          minHeight: "100vh",
          padding: isMobile
            ? "clamp(70px, 10vh, 100px) clamp(16px, 4vw, 28px) clamp(40px, 6vh, 60px)"
            : "clamp(80px, 12vh, 120px) clamp(28px, 5vw, 72px) clamp(60px, 8vh, 90px)",
        }}
      >
        <CeremonyInfoContent key={ceremony.id} ceremony={ceremony} langMode={langMode} isVisible={isTextVisible && !isFadingOut} isMobile={isMobile} />
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
