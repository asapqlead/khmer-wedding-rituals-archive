// app/page.js
"use client";
import { useState, useRef, useEffect } from "react";
import GalleryHeader from "../components/GalleryHeader.js";
import HorizontalGallery from "../components/HorizontalGallery.js";
import GalleryCounter from "../components/GalleryCounter.js";
import FullscreenCeremonyView from "../components/FullscreenCeremonyView.js";
import CeremonyInfoView from "../components/CeremonyInfoView.js";
import AboutView from "../components/AboutView.js";
import GlossaryModal from "../components/GlossaryModal.js";
import NoiseOverlay from "../components/NoiseOverlay.js";
import ScrollProgress from "../components/ScrollProgress.js";
import useIsMobile from "../components/useIsMobile.js";
import MobileMainView from "../components/MobileMainView.js";
import useEntries from "../components/useEntries.js";
import { toSlug, findCeremonyIndex } from "../utils/slug.js";

export default function Home() {
  const { ceremonies, isLoading } = useEntries();
  const [currentView, setCurrentView] = useState("work");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedRect, setSelectedRect] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [langMode, setLangMode] = useState("en");
  const [langPhase, setLangPhase] = useState("idle");
  const isLangChanging = useRef(false);
  const [isScrolledInModal, setIsScrolledInModal] = useState(false);
  const [pageCurtain, setPageCurtain] = useState(false);
  const isTransitioning = useRef(false);
  const { isMobile } = useIsMobile();

  const selectedCeremony = selectedIdx !== null ? ceremonies[selectedIdx] : null;
  const activeCeremony = ceremonies[activeIndex] || ceremonies[0];
  const isGalleryInteractive = currentView === "work" && selectedIdx === null;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("archive_lang_mode");
      if (saved === "km" || saved === "en") {
        setLangMode(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Synchronize initial URL query parameters on mount or when ceremonies load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    const ritualParam = params.get("ritual");

    if (viewParam === "about" || viewParam === "glossary") {
      setCurrentView(viewParam);
    }

    if (ritualParam && ceremonies.length > 0) {
      const idx = findCeremonyIndex(ceremonies, ritualParam);
      if (idx !== -1) {
        setSelectedIdx(idx);
        setActiveIndex(idx);
      }
    }
  }, [ceremonies]);

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      const ritualParam = params.get("ritual");

      if (viewParam === "about" || viewParam === "glossary") {
        setCurrentView(viewParam);
        setSelectedIdx(null);
        setShowDetails(false);
      } else if (ritualParam && ceremonies.length > 0) {
        const idx = findCeremonyIndex(ceremonies, ritualParam);
        if (idx !== -1) {
          setCurrentView("work");
          setSelectedIdx(idx);
          setShowDetails(false);
        }
      } else {
        setCurrentView("work");
        setSelectedIdx(null);
        setShowDetails(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [ceremonies]);

  const handleToggleLang = (nextVal) => {
    if (isLangChanging.current) return;
    const target =
      typeof nextVal === "function"
        ? nextVal(langMode)
        : typeof nextVal === "string"
        ? nextVal
        : langMode === "en"
        ? "km"
        : "en";
    if (target === langMode) return;

    isLangChanging.current = true;
    setLangPhase("out");

    setTimeout(() => {
      setLangMode(target);
      try {
        localStorage.setItem("archive_lang_mode", target);
        window.dispatchEvent(new Event("languagechange"));
      } catch {
        /* ignore */
      }
      setLangPhase("in");

      setTimeout(() => {
        setLangPhase("idle");
        isLangChanging.current = false;
      }, 320);
    }, 170);
  };

  const handleSelect = (ceremony, rect) => {
    const idx = ceremonies.findIndex((c) => c.id === ceremony.id);
    setSelectedRect(rect || null);
    setSelectedIdx(idx !== -1 ? idx : 0);
    setShowDetails(false);
    if (typeof window !== "undefined") {
      const slug = toSlug(ceremony.titleEn);
      window.history.pushState({ ritual: slug }, "", `/?ritual=${slug}`);
    }
  };

  const handleSelectIndex = (nextIdx) => {
    setSelectedIdx(nextIdx);
    if (typeof window !== "undefined" && ceremonies[nextIdx]) {
      const slug = toSlug(ceremonies[nextIdx].titleEn);
      window.history.replaceState({ ritual: slug }, "", `/?ritual=${slug}`);
    }
  };

  const handleCloseFullscreen = (options = {}) => {
    if (typeof window !== "undefined" && window.location.search.includes("ritual")) {
      window.history.pushState({}, "", "/");
    }
    if (options?.fade === false) {
      setSelectedIdx(null);
      setSelectedRect(null);
      setShowDetails(false);
      return;
    }
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPageCurtain(true);
    setTimeout(() => {
      setSelectedIdx(null);
      setSelectedRect(null);
      setShowDetails(false);
      setTimeout(() => {
        setPageCurtain(false);
        isTransitioning.current = false;
      }, 80);
    }, 380);
  };

  const handleViewChange = (view) => {
    if (isTransitioning.current || (view === currentView && selectedIdx === null)) return;
    setIsScrolledInModal(false);

    if (typeof window !== "undefined") {
      const nextUrl = view === "work" ? "/" : `/?view=${view}`;
      window.history.pushState({ view }, "", nextUrl);
    }

    isTransitioning.current = true;
    setPageCurtain(true);
    setTimeout(() => {
      setSelectedIdx(null);
      setSelectedRect(null);
      setShowDetails(false);
      setCurrentView(view);
      setTimeout(() => {
        setPageCurtain(false);
        isTransitioning.current = false;
      }, 80);
    }, 380);
  };

  return (
    <main
      data-lang-phase={langPhase}
      style={{
        position: "relative",
        width: isMobile ? "100%" : "100vw",
        height: isMobile ? "auto" : "100vh",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
        backgroundColor: "#121212",
      }}
    >
      <NoiseOverlay />
      <ScrollProgress />

      {/* Loading state */}
      {isLoading && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <span
            className="font-mono-tag"
            style={{
              color: "var(--accent-gold)",
              fontSize: 13,
              letterSpacing: "0.12em",
              opacity: 0.8,
              animation: "pulse 1.6s ease-in-out infinite",
              fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "inherit",
            }}
          >
            {langMode === "km" ? "កំពុងដំណើរការ…" : "LOADING ARCHIVE…"}
          </span>
        </div>
      )}

      {/* Empty state — loaded but no entries */}
      {!isLoading && ceremonies.length === 0 && currentView === "work" && (
        <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, zIndex: 100, padding: 24, textAlign: "center" }}>
          <span style={{ fontSize: 32 }}>📜</span>
          <span
            className="font-mono-tag"
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              letterSpacing: "0.1em",
              fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "inherit",
            }}
          >
            {langMode === "km" ? "មិនទាន់មានការបញ្ចូលនៅឡើយទេ" : "NO ENTRIES YET"}
          </span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: 14,
              fontFamily: langMode === "km" ? "var(--font-khmer-sans)" : "var(--font-sans)",
              maxWidth: 360,
              lineHeight: 1.6,
            }}
          >
            {langMode === "km"
              ? "ពិធីការនឹងបង្ហាញនៅទីនេះនៅពេលដែលត្រូវបានផ្សព្វផ្សាយទៅកាន់បណ្ណសារ។"
              : "Entries will appear here once they are published to the archive."}
          </span>
        </div>
      )}
      <GalleryHeader
        currentView={currentView}
        setCurrentView={handleViewChange}
        isFullscreen={selectedCeremony !== null}
        onCloseFullscreen={handleCloseFullscreen}
        langMode={langMode}
        setLangMode={handleToggleLang}
        isHidden={showDetails}
        isScrolled={currentView !== "work" && isScrolledInModal}
      />

      {isMobile ? (
        currentView === "work" && (
          <MobileMainView
            ceremonies={ceremonies}
            onSelectCeremony={handleSelect}
            langMode={langMode}
          />
        )
      ) : (
        <>
          <HorizontalGallery
            ceremonies={ceremonies}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
            onSelectCeremony={handleSelect}
            langMode={langMode}
            isInteractive={isGalleryInteractive}
          />
          <GalleryCounter
            current={(selectedCeremony !== null ? selectedIdx : activeIndex) + 1}
            total={ceremonies.length}
            isHidden={currentView !== "work" || showDetails}
            langMode={langMode}
            activeCeremony={ceremonies[selectedCeremony !== null ? selectedIdx : activeIndex]}
          />
        </>
      )}

      {selectedCeremony && (
        <FullscreenCeremonyView
          ceremonies={ceremonies}
          currentIndex={selectedIdx}
          onSelectIndex={handleSelectIndex}
          initialRect={selectedRect}
          onClose={handleCloseFullscreen}
          onOpenDetails={() => setShowDetails(true)}
          langMode={langMode}
          isInfoOpen={showDetails}
        />
      )}
      {showDetails && selectedCeremony && (
        <CeremonyInfoView
          ceremony={selectedCeremony}
          onClose={() => setShowDetails(false)}
          langMode={langMode}
          onNext={() => handleSelectIndex((selectedIdx + 1) % ceremonies.length)}
          onPrev={() => handleSelectIndex((selectedIdx - 1 + ceremonies.length) % ceremonies.length)}
        />
      )}
      {currentView === "about" && (
        <AboutView
          onClose={() => handleViewChange("work")}
          langMode={langMode}
          onScrollTopChange={setIsScrolledInModal}
        />
      )}
      {currentView === "glossary" && (
        <GlossaryModal
          onClose={() => handleViewChange("work")}
          langMode={langMode}
          onScrollTopChange={setIsScrolledInModal}
        />
      )}

      {/* Page transition curtain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 550,
          pointerEvents: pageCurtain ? "auto" : "none",
          opacity: pageCurtain ? 1 : 0,
          transition: pageCurtain
            ? "opacity 350ms cubic-bezier(0.4, 0, 1, 1)"
            : "opacity 450ms cubic-bezier(0, 0, 0.2, 1)",
        }}
      />
    </main>
  );
}
