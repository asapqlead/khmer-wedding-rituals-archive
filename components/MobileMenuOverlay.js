// components/MobileMenuOverlay.js
"use client";

export default function MobileMenuOverlay({ isOpen, onClose, navItems, currentView, langMode }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 650,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#161616",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "70px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 660,
          boxShadow: "0 16px 36px rgba(0,0,0,0.6)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.view}
            type="button"
            onClick={item.onClick}
            className={`nav-item ${currentView === item.view ? "is-active" : ""}`}
            style={{
              textAlign: "left",
              fontSize: 17,
              padding: "6px 0",
              color: currentView === item.view ? "var(--accent-gold)" : "#FFFFFF",
            }}
          >
            {langMode === "km" ? item.labelKm : item.labelEn}
          </button>
        ))}
      </div>
    </>
  );
}
