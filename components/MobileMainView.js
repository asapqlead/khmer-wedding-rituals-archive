// components/MobileMainView.js
"use client";
import MobileHeroIntro from "./MobileHeroIntro.js";
import MobileRitualCarousel from "./MobileRitualCarousel.js";

export default function MobileMainView({ ceremonies, onSelectCeremony, langMode }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        paddingTop: 82,
        paddingBottom: 48,
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <MobileHeroIntro langMode={langMode} />
      <MobileRitualCarousel
        ceremonies={ceremonies}
        onSelectCeremony={onSelectCeremony}
        langMode={langMode}
      />
    </div>
  );
}
