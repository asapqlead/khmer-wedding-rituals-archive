// components/FullscreenCeremonyView.js
"use client";
import { useEffect, useState, useRef } from "react";
import WheelText from "./WheelText.js";

export default function FullscreenCeremonyView({ ceremonies, currentIndex, onSelectIndex, initialRect, onClose, onOpenDetails, langMode, isInfoOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [dir, setDir] = useState(1);
  const [isRevealingFromBlack, setIsRevealingFromBlack] = useState(false);
  const [curtainOpacity, setCurtainOpacity] = useState(0);
  const isNav = useRef(false);
  const isClosing = useRef(false);
  const isInfoOpenRef = useRef(isInfoOpen);
  const prevInfoOpen = useRef(isInfoOpen);

  useEffect(() => {
    isInfoOpenRef.current = isInfoOpen;
    if (prevInfoOpen.current && !isInfoOpen) {
      setIsRevealingFromBlack(true);
      setCurtainOpacity(1);
      const fadeTimer = setTimeout(() => {
        setCurtainOpacity(0);
      }, 40);
      const cleanupTimer = setTimeout(() => {
        setIsRevealingFromBlack(false);
      }, 700);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(cleanupTimer);
      };
    }
    prevInfoOpen.current = isInfoOpen;
  }, [isInfoOpen]);

  useEffect(() => {
    let canScrollClose = false;
    const cooldown = setTimeout(() => { canScrollClose = true; }, 350);
    const raf = requestAnimationFrame(() => setIsExpanded(true));

    const onKey = (e) => {
      if (isInfoOpenRef.current) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handleNav(-1);
      if (e.key === "ArrowRight") handleNav(1);
    };

    const onWheel = (e) => {
      if (!canScrollClose || isInfoOpenRef.current) return;
      if (e.deltaY > 30) {
        handleClose();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!canScrollClose || isInfoOpenRef.current) return;
      if (touchStartY - e.touches[0].clientY > 50) {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      clearTimeout(cooldown);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const handleNav = (direction) => {
    if (isNav.current || isClosing.current) return;
    const nextIdx = currentIndex + direction;
    if (nextIdx < 0 || nextIdx >= ceremonies.length) return;
    
    isNav.current = true;
    setDir(direction);
    onSelectIndex(nextIdx);
    setTimeout(() => { isNav.current = false; }, 500);
  };

  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;
    setIsExpanded(false);
    setTimeout(() => onClose(), 750);
  };

  const r = initialRect || { top: 0, left: 0, width: "100vw", height: "100vh" };

  // Open: animate from card rect to fullscreen (700ms)
  // Close: shrink from fullscreen back to card rect (700ms, no delay)
  const easing = "cubic-bezier(0.4, 0, 0.2, 1)";
  const zoomTransition = isExpanded
    ? `top 700ms ${easing}, left 700ms ${easing}, width 700ms ${easing}, height 700ms ${easing}, border-radius 700ms ${easing}`
    : `top 700ms ${easing}, left 700ms ${easing}, width 700ms ${easing}, height 700ms ${easing}, border-radius 700ms ${easing}`;

  return (
    <div role="dialog" aria-modal="true" style={{ position: "fixed", top: isExpanded ? 0 : r.top, left: isExpanded ? 0 : r.left, width: isExpanded ? "100vw" : r.width, height: isExpanded ? "100vh" : r.height, zIndex: 400, backgroundColor: "#111111", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: isExpanded ? 0 : 0, transition: zoomTransition }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: `${ceremonies.length * 100}%`, height: "100%", display: "flex", transform: `translate3d(-${currentIndex * (100 / ceremonies.length)}%, 0, 0)`, transition: isExpanded ? "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)" : "none", willChange: "transform" }}>
        {ceremonies.map((c) => (
          <div key={c.id} style={{ width: `${100 / ceremonies.length}%`, height: "100%", position: "relative", flexShrink: 0 }}>
            <img src={c.mediaPlaceholder?.image || `/images/${c.id}/ceremony.jpg`} alt={c.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", inset: 0, backgroundColor: isExpanded ? (isInfoOpen ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.35)") : "rgba(0,0,0,0)", transition: `background-color 600ms ${easing}`, pointerEvents: "none" }} />


      <button type="button" onClick={() => handleNav(-1)} aria-label="Previous ritual" style={{ position: "absolute", left: "clamp(20px, 4vw, 48px)", top: "50%", transform: "translateY(-50%)", color: "#FFFFFF", fontSize: 28, opacity: isExpanded && !isInfoOpen && currentIndex > 0 ? 0.9 : 0, pointerEvents: !isInfoOpen && currentIndex > 0 ? "auto" : "none", transition: "opacity 500ms ease, transform 200ms ease", zIndex: 10 }}>←</button>
      <button type="button" onClick={() => handleNav(1)} aria-label="Next ritual" style={{ position: "absolute", right: "clamp(20px, 4vw, 48px)", top: "50%", transform: "translateY(-50%)", color: "#FFFFFF", fontSize: 28, opacity: isExpanded && !isInfoOpen && currentIndex < ceremonies.length - 1 ? 0.9 : 0, pointerEvents: !isInfoOpen && currentIndex < ceremonies.length - 1 ? "auto" : "none", transition: "opacity 500ms ease, transform 200ms ease", zIndex: 10 }}>→</button>

      <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "0 40px", maxWidth: 960, opacity: isExpanded && !isInfoOpen ? 1 : 0, transform: isInfoOpen ? "translateY(-30px)" : "translateY(0)", transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: isInfoOpen ? "none" : "auto" }}>
        <div
          onClick={onOpenDetails}
          role="button"
          tabIndex={0}
          aria-label="Click to view ritual details"
          style={{
            minHeight: "clamp(52px, 6vw, 76px)",
            width: "min(90vw, 840px)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <WheelText
            text={langMode === "km" ? ceremonies[currentIndex].titleKhmer : ceremonies[currentIndex].titleEn}
            direction={dir}
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, color: "#FFFFFF", letterSpacing: "-0.015em" }}
            as="h1"
          />
        </div>
      </div>

      {/* Slow and smooth black curtain revealing the full screen page */}
      {isRevealingFromBlack && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000000",
            zIndex: 40,
            pointerEvents: "none",
            opacity: curtainOpacity,
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "opacity",
          }}
        />
      )}
    </div>
  );
}

