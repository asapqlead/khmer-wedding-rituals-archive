// components/MobileMenuOverlay.js
"use client";
import Link from "next/link";

export default function MobileMenuOverlay({ isOpen, onClose, navItems, currentView, langMode, user, onLogout }) {
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
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {langMode === "km" ? item.labelKm : item.labelEn}
          </button>
        ))}

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", margin: "8px 0" }} />
        
        {user ? (
          <>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "6px 0" }}>
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => { onLogout(); onClose(); }}
              style={{
                textAlign: "left",
                fontSize: 17,
                padding: "6px 0",
                color: "#FFFFFF",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {langMode === "km" ? "ចាកចេញ" : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                textAlign: "left",
                fontSize: 17,
                padding: "6px 0",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
              onClick={onClose}
            >
              {langMode === "km" ? "ចូលគណនី" : "Login"}
            </Link>
            <Link
              href="/signup"
              style={{
                textAlign: "left",
                fontSize: 17,
                padding: "6px 0",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
              onClick={onClose}
            >
              {langMode === "km" ? "ចុះឈ្មោះ" : "Sign Up"}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
