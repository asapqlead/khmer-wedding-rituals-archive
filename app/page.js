// app/page.js
"use client";
import { useState } from "react";
import GalleryHeader from "../components/GalleryHeader.js";
import HorizontalGallery from "../components/HorizontalGallery.js";
import GalleryCounter from "../components/GalleryCounter.js";
import FullscreenCeremonyView from "../components/FullscreenCeremonyView.js";
import CeremonyInfoView from "../components/CeremonyInfoView.js";
import AboutView from "../components/AboutView.js";
import GlossaryModal from "../components/GlossaryModal.js";
import NoiseOverlay from "../components/NoiseOverlay.js";
import ScrollProgress from "../components/ScrollProgress.js";
import { ceremonies } from "../data/ceremonies.js";

export default function Home() {
  const [currentView, setCurrentView] = useState("work");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedRect, setSelectedRect] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [langMode, setLangMode] = useState("en");
  const [isScrolledInModal, setIsScrolledInModal] = useState(false);

  const selectedCeremony = selectedIdx !== null ? ceremonies[selectedIdx] : null;
  const activeCeremony = ceremonies[activeIndex] || ceremonies[0];

  const handleSelect = (ceremony, rect) => {
    const idx = ceremonies.findIndex((c) => c.id === ceremony.id);
    setSelectedRect(rect || null);
    setSelectedIdx(idx !== -1 ? idx : 0);
    setShowDetails(false);
  };

  const handleViewChange = (view) => {
    setIsScrolledInModal(false);
    setCurrentView(view);
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#121212" }}>
      <NoiseOverlay />
      <ScrollProgress />
      <GalleryHeader
        currentView={currentView}
        setCurrentView={handleViewChange}
        isFullscreen={selectedCeremony !== null}
        onCloseFullscreen={() => setSelectedIdx(null)}
        langMode={langMode}
        setLangMode={setLangMode}
        isHidden={showDetails}
        isScrolled={currentView !== "work" && isScrolledInModal}
      />
      <HorizontalGallery
        ceremonies={ceremonies}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
        onSelectCeremony={handleSelect}
        langMode={langMode}
      />
      <GalleryCounter
        current={(selectedCeremony !== null ? selectedIdx : activeIndex) + 1}
        total={ceremonies.length}
        isHidden={currentView !== "work" || showDetails}
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
    </main>
  );
}
