// app/page.js
"use client";
import { useState, useRef } from "react";
import GalleryHeader from "../components/GalleryHeader.js";
import HorizontalGallery from "../components/HorizontalGallery.js";
import GalleryCounter from "../components/GalleryCounter.js";
import FullscreenCeremonyView from "../components/FullscreenCeremonyView.js";
import CeremonyInfoView from "../components/CeremonyInfoView.js";
import AboutView from "../components/AboutView.js";
import GlossaryModal from "../components/GlossaryModal.js";
import NoiseOverlay from "../components/NoiseOverlay.js";
import ScrollProgress from "../components/ScrollProgress.js";
import { entries as ceremonies } from "../data/entries.js";

export default function Home() {
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

  const selectedCeremony = selectedIdx !== null ? ceremonies[selectedIdx] : null;
  const activeCeremony = ceremonies[activeIndex] || ceremonies[0];
  const isGalleryInteractive = currentView === "work" && selectedIdx === null;

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
  };

  const handleViewChange = (view) => {
    if (isTransitioning.current || view === currentView) return;
    setIsScrolledInModal(false);

    // Fade to black, swap views behind curtain, fade back in
    isTransitioning.current = true;
    setPageCurtain(true);
    setTimeout(() => {
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
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#121212" }}
    >
      <NoiseOverlay />
      <ScrollProgress />
      <GalleryHeader
        currentView={currentView}
        setCurrentView={handleViewChange}
        isFullscreen={selectedCeremony !== null}
        onCloseFullscreen={() => setSelectedIdx(null)}
        langMode={langMode}
        setLangMode={handleToggleLang}
        isHidden={showDetails}
        isScrolled={currentView !== "work" && isScrolledInModal}
      />
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
      />
      {selectedCeremony && (
        <FullscreenCeremonyView
          ceremonies={ceremonies}
          currentIndex={selectedIdx}
          onSelectIndex={(idx) => setSelectedIdx(idx)}
          initialRect={selectedRect}
          onClose={() => setSelectedIdx(null)}
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
          onNext={() => setSelectedIdx((prev) => (prev + 1) % ceremonies.length)}
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
