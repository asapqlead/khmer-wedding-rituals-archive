// components/FullscreenCeremonyView.js
"use client";
import { useEffect, useState, useRef } from "react";
import CeremonyInfoContent from "./CeremonyInfoContent.js";
import useIsMobile from "./useIsMobile.js";

export default function FullscreenCeremonyView({ ceremonies, currentIndex, onSelectIndex, initialRect, onClose, onOpenDetails, langMode, isInfoOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useIsMobile();

  const [dir, setDir] = useState(1);
  const [isRevealingFromBlack, setIsRevealingFromBlack] = useState(false);
  const [curtainOpacity, setCurtainOpacity] = useState(0);
  const isNav = useRef(false);
  const isClosing = useRef(false);
  const isInfoOpenRef = useRef(isInfoOpen);
  const prevInfoOpen = useRef(isInfoOpen);
  const latestProps = useRef({ currentIndex, ceremonies, onSelectIndex, onClose });

  useEffect(() => {
    latestProps.current = { currentIndex, ceremonies, onSelectIndex, onClose };
  });

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
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
        if (e.deltaX > 30) handleNav(1);
        else if (e.deltaX < -30) handleNav(-1);
        return;
      }

      const scrollable = e.target.closest(".custom-scrollbar");
      if (scrollable) {
        if (e.deltaY > 0) return; // Never close on scroll down
        if (e.deltaY < 0 && scrollable.scrollTop > 0) return;
      }

      if (e.deltaY < -20) {
        handleScrollClose();
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!canScrollClose || isInfoOpenRef.current) return;
      
      const deltaX = touchStartX - e.touches[0].clientX;
      const deltaY = touchStartY - e.touches[0].clientY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
        if (deltaX > 40) handleNav(1);
        else if (deltaX < -40) handleNav(-1);
        return;
      }

      const scrollable = e.target.closest(".custom-scrollbar");
      
      if (scrollable) {
        if (deltaY > 0) return; // Never close on swipe up
        if (deltaY < 0 && scrollable.scrollTop > 0) return;
      }

      if (deltaY < -50) {
        handleScrollClose();
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
    const { currentIndex: cIdx, ceremonies: cList, onSelectIndex: onSelect } = latestProps.current;
    const nextIdx = cIdx + direction;
    if (nextIdx < 0 || nextIdx >= cList.length) return;
    
    isNav.current = true;
    setDir(direction);
    onSelect(nextIdx);
    setTimeout(() => { isNav.current = false; }, 500);
  };

  const handleScrollClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;
    setIsExpanded(false);
    setTimeout(() => latestProps.current.onClose({ fade: false }), 720);
  };

  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;
    latestProps.current.onClose({ fade: true });
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(14, 14, 14, 0.95) 70%, rgba(14, 14, 14, 0.99) 100%)"
            : "linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(10, 10, 10, 0.65) 45%, rgba(14, 14, 14, 0.92) 80%, rgba(14, 14, 14, 0.98) 100%)",
          transition: `opacity 600ms ${easing}`,
          opacity: isExpanded ? 1 : 0,
          pointerEvents: "none",
        }}
      />

      <button
        type="button"
        onClick={() => handleNav(-1)}
        aria-label="Previous ritual"
        style={{
          position: "fixed",
          left: isMobile ? "clamp(16px, 3vw, 24px)" : "clamp(28px, 4vw, 56px)",
          bottom: isMobile ? "clamp(16px, 3vh, 28px)" : "clamp(24px, 4vh, 48px)",
          color: "#FFFFFF",
          fontSize: isMobile ? 22 : 26,
          opacity: isExpanded && currentIndex > 0 ? 0.9 : 0,
          pointerEvents: currentIndex > 0 ? "auto" : "none",
          transition: "opacity 500ms ease, transform 200ms ease",
          zIndex: 50,
          minWidth: 44,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => handleNav(1)}
        aria-label="Next ritual"
        style={{
          position: "fixed",
          right: isMobile ? "clamp(16px, 3vw, 24px)" : "clamp(28px, 4vw, 56px)",
          bottom: isMobile ? "clamp(16px, 3vh, 28px)" : "clamp(24px, 4vh, 48px)",
          color: "#FFFFFF",
          fontSize: isMobile ? 22 : 26,
          opacity: isExpanded && currentIndex < ceremonies.length - 1 ? 0.9 : 0,
          pointerEvents: currentIndex < ceremonies.length - 1 ? "auto" : "none",
          transition: "opacity 500ms ease, transform 200ms ease",
          zIndex: 50,
          minWidth: 44,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        →
      </button>

      <div
        className="custom-scrollbar"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          alignItems: "flex-start",
          overflowY: "auto",
          overflowX: "hidden",
          padding: isMobile
            ? "clamp(70px, 10vh, 100px) clamp(16px, 4vw, 28px) clamp(40px, 6vh, 60px)"
            : "clamp(80px, 12vh, 120px) clamp(28px, 5vw, 72px) clamp(60px, 8vh, 90px)",
        }}
      >
        <CeremonyInfoContent
          key={ceremonies[currentIndex].id}
          ceremony={ceremonies[currentIndex]}
          langMode={langMode}
          isVisible={isExpanded}
          isMobile={isMobile}
        />
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

