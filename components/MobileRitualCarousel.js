// components/MobileRitualCarousel.js
"use client";
import { useRef, useState, useEffect } from "react";
import MobileRitualCard from "./MobileRitualCard.js";
import MobileProgressIndicator from "./MobileProgressIndicator.js";

export default function MobileRitualCarousel({ ceremonies, onSelectCeremony, langMode }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cards = el.querySelectorAll("article");
          const containerLeft = el.getBoundingClientRect().left;
          let closestIdx = 0;
          let minDistance = Infinity;

          cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs(rect.left - containerLeft - 22);
            if (distance < minDistance) {
              minDistance = distance;
              closestIdx = idx;
            }
          });

          setActiveIndex(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        ref={containerRef}
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: 22,
          padding: "0 22px",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {ceremonies.map((ceremony, idx) => (
          <MobileRitualCard
            key={ceremony.id}
            ceremony={ceremony}
            index={idx}
            onClick={onSelectCeremony}
            langMode={langMode}
          />
        ))}
      </div>
      <MobileProgressIndicator
        current={activeIndex + 1}
        total={ceremonies.length}
        langMode={langMode}
      />
    </div>
  );
}
