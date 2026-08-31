// components/ScrollProgress.js
"use client";
import { useEffect, useState, useRef, useCallback } from "react";

export default function ScrollProgress({ containerRef, side = "right" }) {
  const [scrollState, setScrollState] = useState({
    thumbHeight: 48,
    thumbTop: 0,
    isScrollable: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null);
  const dragStartRef = useRef({
    pointerY: 0,
    startThumbTop: 0,
    maxTravel: 0,
    maxScroll: 0,
  });
  const rAFRef = useRef(null);

  const getTarget = useCallback(() => {
    if (containerRef && containerRef.current) {
      return containerRef.current;
    }
    if (typeof window !== "undefined") {
      return document.scrollingElement || document.documentElement || document.body;
    }
    return null;
  }, [containerRef]);

  const updateThumb = useCallback(() => {
    const el = getTarget();
    const track = trackRef.current;
    if (!el || !track) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 5 || clientHeight <= 0) {
      setScrollState((prev) => (prev.isScrollable ? { ...prev, isScrollable: false } : prev));
      return;
    }

    const trackHeight = track.clientHeight;
    const rawThumbHeight = (clientHeight / scrollHeight) * trackHeight;
    const thumbHeight = Math.max(36, Math.min(trackHeight * 0.75, rawThumbHeight));
    const maxTravel = trackHeight - thumbHeight;

    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
    const thumbTop = progress * maxTravel;

    setScrollState({
      thumbHeight,
      thumbTop,
      isScrollable: true,
    });
  }, [getTarget]);

  useEffect(() => {
    const el = getTarget();
    if (!el) return;

    updateThumb();

    const onScroll = () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      rAFRef.current = requestAnimationFrame(updateThumb);
    };

    const targetEl = containerRef?.current ? el : window;
    targetEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let observer = null;
    if (typeof ResizeObserver !== "undefined" && el) {
      observer = new ResizeObserver(() => {
        updateThumb();
      });
      observer.observe(el);
    }

    const timer = setTimeout(updateThumb, 250);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      clearTimeout(timer);
      targetEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (observer) observer.disconnect();
    };
  }, [containerRef, getTarget, updateThumb]);

  const handlePointerDown = (e) => {
    const el = getTarget();
    const track = trackRef.current;
    if (!el || !track) return;

    e.preventDefault();
    e.stopPropagation();

    const trackRect = track.getBoundingClientRect();
    const trackHeight = trackRect.height;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    const rawThumbHeight = (clientHeight / scrollHeight) * trackHeight;
    const thumbHeight = Math.max(36, Math.min(trackHeight * 0.75, rawThumbHeight));
    const maxTravel = trackHeight - thumbHeight;

    if (maxTravel <= 0) return;

    const clickYInTrack = e.clientY - trackRect.top;
    const currentThumbTop = scrollState.thumbTop;

    const isInsideThumb = clickYInTrack >= currentThumbTop && clickYInTrack <= currentThumbTop + thumbHeight;

    let startThumbTop = currentThumbTop;

    if (!isInsideThumb) {
      startThumbTop = Math.max(0, Math.min(maxTravel, clickYInTrack - thumbHeight / 2));
      const ratio = startThumbTop / maxTravel;
      el.scrollTop = ratio * maxScroll;
      setScrollState((prev) => ({ ...prev, thumbTop: startThumbTop }));
    }

    dragStartRef.current = {
      pointerY: e.clientY,
      startThumbTop: startThumbTop,
      maxTravel,
      maxScroll,
    };

    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const el = getTarget();
    if (!el) return;

    e.preventDefault();
    e.stopPropagation();

    const { pointerY, startThumbTop, maxTravel, maxScroll } = dragStartRef.current;
    if (maxTravel <= 0) return;

    const deltaY = e.clientY - pointerY;
    const nextThumbTop = Math.max(0, Math.min(maxTravel, startThumbTop + deltaY));
    const ratio = nextThumbTop / maxTravel;

    el.scrollTop = ratio * maxScroll;
    setScrollState((prev) => ({ ...prev, thumbTop: nextThumbTop }));
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // safe fallback
      }
    }
  };

  if (!scrollState.isScrollable) return null;

  const isLeft = side === "left";
  const active = isHovered || isDragging;

  return (
    <div
      role="scrollbar"
      aria-orientation="vertical"
      aria-valuenow={Math.round((scrollState.thumbTop / (trackRef.current?.clientHeight || 1)) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        [isLeft ? "left" : "right"]: 0,
        width: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        cursor: isDragging ? "grabbing" : "pointer",
        userSelect: "none",
        touchAction: "none",
        padding: isLeft ? "0 0 0 6px" : "0 6px 0 0",
      }}
    >
      {/* Background Track */}
      <div
        ref={trackRef}
        style={{
          position: "relative",
          width: active ? 4 : 2.5,
          height: "calc(100vh - 40px)",
          backgroundColor: active ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)",
          borderRadius: 999,
          transition: "width 200ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease",
        }}
      >
        {/* Floating White Thumb (Capsule) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${scrollState.thumbHeight}px`,
            transform: `translate3d(0, ${scrollState.thumbTop}px, 0)`,
            backgroundColor: "#FFFFFF",
            borderRadius: 999,
            boxShadow: active
              ? "0 0 14px rgba(255, 255, 255, 0.95), 0 0 4px rgba(255, 255, 255, 1)"
              : "0 0 8px rgba(255, 255, 255, 0.55)",
            opacity: active ? 1 : 0.85,
            transition: isDragging ? "none" : "width 200ms ease, opacity 200ms ease, box-shadow 200ms ease",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
