// components/HorizontalGallery.js
"use client";
import { useRef, useEffect } from "react";
import GalleryHero from "./GalleryHero.js";
import GalleryCard from "./GalleryCard.js";

export default function HorizontalGallery({ ceremonies, activeIndex, onIndexChange, onSelectCeremony, langMode }) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let target = el.scrollLeft, current = el.scrollLeft, velocity = 0;
    let animId = null, isDragging = false, lastX = 0, lastTime = 0;

    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const updateIndex = (pos) => {
      const cards = el.querySelectorAll(".gallery-card");
      const center = pos + el.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(center - (c.offsetLeft + c.clientWidth / 2));
        if (d < minDist) { minDist = d; closest = i; }
      });
      onIndexChange(closest);
    };

    const loop = () => {
      if (!isDragging) {
        target += velocity;
        velocity *= 0.90;
        target = Math.max(0, Math.min(maxScroll(), target));
        current += (target - current) * 0.09;
        el.scrollLeft = current;
        updateIndex(current);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    const onWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocity += delta * 0.75;
    };

    const onDown = (e) => {
      isDragging = true;
      lastX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      lastTime = Date.now();
      velocity = 0;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const dx = lastX - x;
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      velocity = (dx / dt) * 14;
      target = Math.max(0, Math.min(maxScroll(), el.scrollLeft + dx));
      current = target;
      el.scrollLeft = current;
      lastX = x;
      lastTime = now;
      updateIndex(current);
    };

    const onUp = () => { isDragging = false; };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
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
