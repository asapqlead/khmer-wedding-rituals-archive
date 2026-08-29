// components/GlossarySection.js
"use client";
import { useState } from "react";
import { glossaryTerms } from "../data/glossary.js";
import GlossaryCard from "./GlossaryCard.js";

const categories = ["All", "Sacred Objects", "People & Roles", "Rituals", "Attire", "Music & Art", "Mythology & Meaning"];

export default function GlossarySection({ langMode }) {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = selectedCat === "All"
    ? glossaryTerms
    : glossaryTerms.filter((item) => item.category === selectedCat);

  return (
    <div id="glossary" style={{ width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {categories.map((cat) => {
          const isActive = selectedCat === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className="font-mono-tag"
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: isActive ? "var(--accent-gold)" : "var(--border-subtle)",
                backgroundColor: isActive ? "var(--accent-gold)" : "transparent",
                color: isActive ? "#141414" : "var(--text-secondary)",
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                transition: "all 200ms ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {filtered.map((term) => (
          <GlossaryCard key={term.khmer} term={term} langMode={langMode} />
        ))}
      </div>
    </div>
  );
}
