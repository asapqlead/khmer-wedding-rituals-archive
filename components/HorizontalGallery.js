// components/HorizontalGallery.js
"use client";
import { useRef, useEffect } from "react";
import GalleryHero from "./GalleryHero.js";
import GalleryCard from "./GalleryCard.js";
import useIsMobile from "./useIsMobile.js";

export default function HorizontalGallery({ ceremonies, activeIndex, onIndexChange, onSelectCeremony, langMode, isInteractive }) {
  const elRef = useRef(null);
  const interactiveRef = useRef(isInteractive);
  const { isMobile } = useIsMobile();
  const isMobileRef = useRef(isMobile);

  useEffect(() => { interactiveRef.current = isInteractive; }, [isInteractive]);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let target = el.scrollLeft, current = el.scrollLeft, velocity = 0;
    let animId = null, isDragging = false, lastX = 0;
    let dragDistance = 0, wasDragging = false;
    let lastReportedIndex = -1;
    let moveHistory = [];
    let isTouchInteraction = false;

    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const updateIndex = (pos) => {
      const cards = el.querySelectorAll(".gallery-card");
      const center = pos + el.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(center - (c.offsetLeft + c.clientWidth / 2));
        if (d < minDist) { minDist = d; closest = i; }
      });
      if (closest !== lastReportedIndex) {
        lastReportedIndex = closest;
        onIndexChange(closest);
      }
    };

    const loop = () => {
      if (!isDragging) {
        const isMobileOrTouch = isMobileRef.current || isTouchInteraction;

        if (isMobileOrTouch) {
          // Mobile & touch: low friction (0.955) and direct velocity integration (no lag/resistance)
          current += velocity;
          velocity *= 0.955;
          if (Math.abs(velocity) < 0.01) velocity = 0;

          const max = maxScroll();
          if (current < 0) {
            current = 0;
            velocity = 0;
          } else if (current > max) {
            current = max;
            velocity = 0;
          }
          target = current;
          el.scrollLeft = current;
          updateIndex(current);
        } else {
          // Desktop mouse wheel: smooth exponential lerp
          target += velocity;
          velocity *= 0.88;
          if (Math.abs(velocity) < 0.01) velocity = 0;
          target = Math.max(0, Math.min(maxScroll(), target));
          current += (target - current) * 0.04;
          if (Math.abs(target - current) < 0.05) current = target;
          el.scrollLeft = current;
          updateIndex(current);
        }
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    const onWheel = (e) => {
      e.preventDefault();
      if (!interactiveRef.current) return;
      isTouchInteraction = false;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocity += delta * 0.22;
    };

    let startX = 0, startY = 0, pointerCaptured = false;

    const onDown = (e) => {
      if (!interactiveRef.current) return;
      if (e.button !== undefined && e.button !== 0) return;
      isDragging = true;
      wasDragging = false;
      pointerCaptured = false;
      isTouchInteraction = e.pointerType === "touch" || isMobileRef.current;
      dragDistance = 0;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      const now = performance.now();
      moveHistory = [{ x: e.clientX, time: now }];
      velocity = 0;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX;
      const dx = lastX - x;
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (!wasDragging && dist > 6) {
        wasDragging = true;
        try {
          el.setPointerCapture(e.pointerId);
          pointerCaptured = true;
        } catch {}
      }

      if (wasDragging) {
        target = Math.max(0, Math.min(maxScroll(), el.scrollLeft + dx));
        current = target;
        el.scrollLeft = current;
        lastX = x;

        const now = performance.now();
        moveHistory.push({ x, time: now });
        const cutoff = now - 90;
        while (moveHistory.length > 1 && moveHistory[0].time < cutoff) {
          moveHistory.shift();
        }

        updateIndex(current);
      }
    };

    const onUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      if (pointerCaptured) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {}
        pointerCaptured = false;
      }

      if (wasDragging) {
        const now = performance.now();
        const recent = moveHistory.filter((p) => now - p.time <= 80);
        if (recent.length >= 2) {
          const oldest = recent[0];
          const latest = recent[recent.length - 1];
          const dt = Math.max(10, latest.time - oldest.time);
          const dx = oldest.x - latest.x;
          const rawV = (dx / dt) * 16.6;
          const maxV = isMobileRef.current || isTouchInteraction ? 70 : 30;
          velocity = Math.max(-maxV, Math.min(maxV, rawV));
        } else {
          velocity = 0;
        }
      }
      moveHistory = [];
    };

    const onClickCapture = (e) => {
      if (wasDragging) {
        e.stopPropagation();
        e.preventDefault();
        wasDragging = false;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [onIndexChange]);

  return (
    <div ref={elRef} className="no-scrollbar" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", overflowX: "auto", overflowY: "hidden", touchAction: "none", cursor: "grab" }}>
      <div className="gallery-track">
        <GalleryHero langMode={langMode} />
        {ceremonies.map((ceremony, idx) => (
          <GalleryCard key={ceremony.id} ceremony={ceremony} isActive={activeIndex === idx} onClick={onSelectCeremony} langMode={langMode} />
        ))}
      </div>
    </div>
  );
}
