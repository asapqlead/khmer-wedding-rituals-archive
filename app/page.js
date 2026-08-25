// app/page.js
"use client";

import { useState } from "react";
import Header from "../components/Header.js";
import CeremonyNav from "../components/CeremonyNav.js";
import CeremonyView from "../components/CeremonyView.js";
import InteractiveBlessing from "../components/InteractiveBlessing.js";
import AboutSource from "../components/AboutSource.js";
import GlossarySection from "../components/GlossarySection.js";
import CommunityContributions from "../components/CommunityContributions.js";
import Footer from "../components/Footer.js";
import { ceremonies } from "../data/ceremonies.js";
import { initialContributions } from "../data/defaultContributions.js";

export default function Home() {
  const [activeTab, setActiveTab] = useState("rituals");
  const [selectedCeremonyId, setSelectedCeremonyId] = useState(ceremonies[0].id);
  const [langMode, setLangMode] = useState("dual"); // "km" | "en" | "dual"
  const [contributions, setContributions] = useState(initialContributions);

  const activeCeremony = ceremonies.find((c) => c.id === selectedCeremonyId) || ceremonies[0];

  const handleAddContribution = (newEntry) => {
    setContributions((prev) => [newEntry, ...prev]);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        langMode={langMode}
        setLangMode={setLangMode}
      />

      <main className="container" style={{ flex: 1, padding: "32px 20px" }}>
        {activeTab === "rituals" && (
          <div>
            <CeremonyNav
              ceremonies={ceremonies}
              activeId={selectedCeremonyId}
              onSelectCeremony={setSelectedCeremonyId}
              langMode={langMode}
            />
            <CeremonyView
              ceremony={activeCeremony}
              langMode={langMode}
            />
          </div>
        )}

        {activeTab === "blessing" && (
          <InteractiveBlessing langMode={langMode} />
        )}

        {activeTab === "about" && (
          <AboutSource langMode={langMode} />
        )}

        {activeTab === "glossary" && (
          <GlossarySection langMode={langMode} />
        )}

        {activeTab === "contribute" && (
          <CommunityContributions
            contributions={contributions}
            onAddContribution={handleAddContribution}
            langMode={langMode}
          />
        )}
      </main>

      <Footer langMode={langMode} />
    </div>
  );
}
