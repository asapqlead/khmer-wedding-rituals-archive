// components/HorizontalGallery.js
"use client";
import { useRef, useEffect } from "react";
import GalleryHero from "./GalleryHero.js";
import GalleryCard from "./GalleryCard.js";

export default function HorizontalGallery({ ceremonies, activeIndex, onIndexChange, onSelectCeremony, langMode, isInteractive }) {
  const elRef = useRef(null);
  const interactiveRef = useRef(isInteractive);

  useEffect(() => { interactiveRef.current = isInteractive; }, [isInteractive]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let target = el.scrollLeft, current = el.scrollLeft, velocity = 0;
    let animId = null, isDragging = false, lastX = 0, lastTime = 0;
    let dragDistance = 0, wasDragging = false;
    let lastReportedIndex = -1;

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
        target += velocity;
        velocity *= 0.88;
        if (Math.abs(velocity) < 0.01) velocity = 0;
        target = Math.max(0, Math.min(maxScroll(), target));
        current += (target - current) * 0.035;
        if (Math.abs(target - current) < 0.05) current = target;
        el.scrollLeft = current;
        updateIndex(current);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    const onWheel = (e) => {
      e.preventDefault();
      if (!interactiveRef.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocity += delta * 0.22;
    };

    const onDown = (e) => {
      if (!interactiveRef.current) return;
      isDragging = true;
      dragDistance = 0;
      lastX = e.clientX;
      lastTime = Date.now();
      velocity = 0;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX;
      const dx = lastX - x;
      dragDistance += Math.abs(dx);
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      const rawV = (dx / dt) * 6.0;
      velocity = Math.max(-28, Math.min(28, rawV));
      target = Math.max(0, Math.min(maxScroll(), el.scrollLeft + dx));
      current = target;
      el.scrollLeft = current;
      lastX = x;
      lastTime = now;
      updateIndex(current);
    };

    const onUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (dragDistance > 5) wasDragging = true;
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
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
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
