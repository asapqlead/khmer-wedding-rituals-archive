// components/GalleryHeader.js
"use client";
import { useState, useEffect, useRef } from "react";
import collection from "../collection.config.js";
import useIsMobile from "./useIsMobile.js";
import HeaderAuth from "./HeaderAuth.js";
import { createClient } from "../utils/supabase/client.js";

export default function GalleryHeader({ currentView, setCurrentView, isFullscreen, onCloseFullscreen, langMode, setLangMode, isHidden, isScrolled }) {
  const { isMobile } = useIsMobile();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);
  const [supabase] = useState(() => createClient());
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase.rpc("is_reviewer").then(({ data }) => setIsReviewer(data === true));
      } else {
        setIsReviewer(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user || null;
      if (currentUser) {
        supabase.rpc("is_reviewer").then(({ data }) => setIsReviewer(data === true));
      } else {
        setIsReviewer(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleCeremony = () => {
    if (isFullscreen) onCloseFullscreen?.();
    setCurrentView("work");
    setSettingsOpen(false);
  };

  const handleAbout = () => {
    if (isFullscreen) onCloseFullscreen?.();
    setCurrentView("about");
    setSettingsOpen(false);
  };

  const handleGlossary = () => {
    if (isFullscreen) onCloseFullscreen?.();
    setCurrentView("glossary");
    setSettingsOpen(false);
  };

  const navItems = [
    { view: "work", labelEn: "Ceremony", labelKm: "កម្រងពិធីការ", onClick: handleCeremony },
    { view: "about", labelEn: "About", labelKm: "អំពីបណ្ណសារ", onClick: handleAbout },
    { view: "glossary", labelEn: "Glossary", labelKm: "សទ្ទានុក្រម", onClick: handleGlossary },
  ];

  return (
    <>
      <style>{`
        .minimal-nav-btn {
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          font-size: 15px;
          cursor: pointer;
          transition: color 150ms ease-out, transform 150ms ease-out;
          color: #a1a1aa;
        }
        .minimal-nav-btn:hover {
          color: #d4d4d8;
        }
        .minimal-nav-btn:active {
          transform: scale(0.97);
        }
        .minimal-nav-btn.active {
          color: #ffffff;
          font-weight: 500;
        }
        .minimal-lang-btn {
          font-size: 13px;
          color: #a1a1aa;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 150ms ease-out, transform 150ms ease-out;
        }
        .minimal-lang-btn:hover {
          color: #ffffff;
        }
        .minimal-lang-btn:active {
          transform: scale(0.97);
        }
        .dropdown-item {
          background: transparent;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          color: #e4e4e7;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 150ms ease, color 150ms ease;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        }
        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-item {
            display: none !important;
          }
        }
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 600,
          padding: isMobile ? "20px 24px" : "32px 48px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          transform: (isHidden || isScrolled) ? "translateY(-100%)" : "translateY(0%)",
          opacity: isFullscreen ? 0 : 1,
          pointerEvents: isFullscreen ? "none" : "auto",
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
          background: "transparent",
        }}
      >
        <div style={{ flex: 1 }} />

        {!isMobile && (
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32, flex: 0, justifyContent: "center" }}>
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={item.onClick}
                className={`minimal-nav-btn lang-text ${currentView === item.view ? "active" : ""}`}
                style={{ fontFamily: langMode === "km" ? "var(--font-khmer-serif)" : "var(--font-sans)", whiteSpace: "nowrap" }}
              >
                {langMode === "km" ? item.labelKm : item.labelEn}
              </button>
            ))}
          </nav>
        )}

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", position: "relative" }} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="minimal-lang-btn"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></svg>
          </button>

          {/* Glassmorphism Dropdown */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              width: "200px",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
              backgroundColor: "rgba(18, 18, 18, 0.75)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0,0,0,0.1)",
              opacity: settingsOpen ? 1 : 0,
              transform: settingsOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-8px)",
              transformOrigin: "top right",
              transition: "opacity 250ms ease, transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: settingsOpen ? "auto" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}
          >
            {/* Mobile Navigation Links: Ceremony, About, Glossary */}
            <div className="mobile-menu-item" style={{ display: isMobile ? "flex" : "none", flexDirection: "column", gap: "4px" }}>
              {navItems.map((item) => (
                <button
                  key={item.view}
                  type="button"
                  onClick={item.onClick}
                  className={`dropdown-item lang-text ${currentView === item.view ? "active" : ""}`}
                  style={{
                    fontFamily: langMode === "km" ? "var(--font-khmer-serif)" : "var(--font-sans)",
                    color: currentView === item.view ? "var(--accent-gold, #C5A059)" : "#e4e4e7",
                    fontWeight: currentView === item.view ? 600 : 400,
                  }}
                >
                  {langMode === "km" ? item.labelKm : item.labelEn}
                </button>
              ))}
              <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)", margin: "4px 0" }} />
            </div>

            <HeaderAuth langMode={langMode} isReviewer={isReviewer} />
            
            <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)", margin: "4px 0" }} />
            
            <button
              type="button"
              onClick={() => { setLangMode("km"); setSettingsOpen(false); }}
              className="dropdown-item lang-text"
              style={{ color: langMode === "km" ? "#ffffff" : "#a1a1aa", fontWeight: langMode === "km" ? 600 : 400 }}
            >
              ភាសាខ្មែរ
            </button>
            <button
              type="button"
              onClick={() => { setLangMode("en"); setSettingsOpen(false); }}
              className="dropdown-item lang-text"
              style={{ color: langMode === "en" ? "#ffffff" : "#a1a1aa", fontWeight: langMode === "en" ? 600 : 400 }}
            >
              English
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
