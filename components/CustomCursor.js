// components/CustomCursor.js
"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState({ label: "", isHover: false, isGold: false });
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target.closest("[data-cursor], a, button");
      if (target) {
        const label = target.getAttribute("data-cursor") || "";
        const isGold = target.getAttribute("data-cursor-gold") === "true";
        setCursorState({ label, isHover: true, isGold });
      } else {
        setCursorState({ label: "", isHover: false, isGold: false });
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    const loop = () => {
      // Spring/lerp interpolation (0.16 factor for fluid liquid lag)
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={followerRef}
        className={`cursor-follower ${cursorState.isHover ? "is-hovering" : ""} ${cursorState.isGold ? "is-gold" : ""}`}
      >
        {cursorState.label}
      </div>
    </>
  );
}
