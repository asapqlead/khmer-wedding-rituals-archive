// components/AboutView.js
"use client";
import { useEffect, useState, useRef } from "react";
import collection from "../collection.config.js";
import WheelText from "./WheelText.js";
import ScrollProgress from "./ScrollProgress.js";

export default function AboutView({ onClose, langMode, onScrollTopChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);

    const el = containerRef.current;
    const handleScroll = () => {
      if (!el) return;
      onScrollTopChange?.(el.scrollTop > 20);
    };

    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      if (el) el.removeEventListener("scroll", handleScroll);
      onScrollTopChange?.(false);
    };
  }, [onScrollTopChange]);

  const handleClose = () => {
    onScrollTopChange?.(false);
    setIsClosing(true);
    setTimeout(() => onClose(), 480);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className="custom-scrollbar"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(18, 18, 18, 0.98)",
        backdropFilter: "blur(24px)",
        zIndex: 450,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 60px",
        overflowY: "auto",
      }}
    >
      <ScrollProgress containerRef={containerRef} />
      <div className={`page-view ${isVisible && !isClosing ? "is-visible" : "is-exiting"}`} style={{ maxWidth: 680, textAlign: "center", margin: "auto" }}>
        <span className="font-mono-tag" style={{ color: "var(--accent-gold)", marginBottom: 16, display: "inline-block" }}>
          ARCHIVAL PROVENANCE & ORAL TRANSMISSION
        </span>

        <div style={{ marginBottom: 24 }}>
          <WheelText
            text={langMode === "km" ? "ការចងក្រងនូវកម្រងពិធីការអាពាហ៍ពិពាហ៍ប្រពៃណីខ្មែរ" : collection.description}
            direction={1}
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#FFFFFF", lineHeight: 1.35 }}
            as="h2"
          />
        </div>

        <blockquote style={{ borderLeft: "2px solid var(--accent-gold)", paddingLeft: 20, textAlign: "left", margin: "24px 0" }}>
          <p className={langMode === "km" ? "khmer-sans" : ""} style={{ fontSize: 16, fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.7 }}>
            &ldquo;{collection.source}&rdquo;
          </p>
        </blockquote>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 24, alignItems: "center" }}>
          <span className="font-mono-tag" style={{ color: "var(--text-muted)" }}>CURATED BY {collection.curator.toUpperCase()}</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent-gold)" }} />
          <span className="font-mono-tag" style={{ color: "var(--text-muted)" }}>AUPP ICT 340</span>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 100,
          pointerEvents: "none",
          opacity: isClosing ? 1 : 0,
          transition: "opacity 480ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
    </div>
  );
}
