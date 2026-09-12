// components/useIsMobile.js
"use client";
import { useState, useEffect } from "react";

/**
 * Shared responsive breakpoint hook.
 * Returns { isMobile, isTablet, canHover } based on live matchMedia listeners.
 *
 *   isMobile  — viewport ≤ 768px
 *   isTablet  — viewport 769–1024px
 *   canHover  — device has a fine pointer with hover (i.e. not a touch-only device)
 */
export default function useIsMobile() {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    canHover: true,
  });

  useEffect(() => {
    const mobileQ = window.matchMedia("(max-width: 768px)");
    const tabletQ = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");
    const hoverQ = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setState({
        isMobile: mobileQ.matches,
        isTablet: tabletQ.matches,
        canHover: hoverQ.matches,
      });
    };

    update();

    mobileQ.addEventListener("change", update);
    tabletQ.addEventListener("change", update);
    hoverQ.addEventListener("change", update);

    return () => {
      mobileQ.removeEventListener("change", update);
      tabletQ.removeEventListener("change", update);
      hoverQ.removeEventListener("change", update);
    };
  }, []);

  return state;
}
