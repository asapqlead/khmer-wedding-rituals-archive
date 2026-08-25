// components/GlossarySection.js
// Searchable and filterable cultural glossary of Khmer wedding terminology
import { useState, useMemo } from "react";
import { glossaryTerms } from "../data/glossary.js";
import GlossaryCard from "./GlossaryCard.js";

export default function GlossarySection({ langMode }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Sacred Objects", "People & Roles", "Rituals", "Attire", "Music & Art", "Mythology & Meaning"];

  const filtered = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchCat = selectedCategory === "all" || term.category === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        term.khmer.includes(search) ||
        term.romanized.toLowerCase().includes(q) ||
        term.definitionEn.toLowerCase().includes(q) ||
        term.definitionKhmer.includes(search);
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  return (
    <section style={{ backgroundColor: "var(--cream-100)", border: "1px solid var(--border-gold)", borderRadius: 10, padding: "28px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 className="khmer-title" style={{ fontSize: 24, color: "var(--oxblood-900)" }}>
          {langMode === "km" ? "សទ្ទានុក្រមពាក្យពិធីមង្គលការខ្មែរ" : "Glossary of Khmer Wedding Terms"}
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink-700)", maxWidth: 500, margin: "6px auto 0" }}>
          {langMode === "km" ? "ស្វែងយល់ពីអត្ថន័យនៃឈ្មោះ វត្ថុសក្ការៈ និងតួនាទីនីមួយៗក្នុងពិធី។" : "Key cultural terms, ceremonial items, and ritual roles explained simply."}
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
        <input
          type="search"
          placeholder={langMode === "km" ? "ស្វែងរកពាក្យ... (e.g., Popil, កន្ត្រៃ, ម្លូ)" : "Search term or meaning... (e.g. Popil, thread)"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 360, padding: "8px 14px", borderRadius: 6, border: "1px solid var(--border-cream)", backgroundColor: "var(--cream-50)", fontSize: 14 }}
        />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "4px 10px",
              borderRadius: 16,
              fontSize: 12,
              fontWeight: selectedCategory === cat ? 600 : 400,
              backgroundColor: selectedCategory === cat ? "var(--oxblood-800)" : "var(--cream-50)",
              color: selectedCategory === cat ? "var(--cream-50)" : "var(--ink-700)",
              border: "1px solid var(--border-cream)",
            }}
          >
            {cat === "all" ? (langMode === "km" ? "ទាំងអស់" : "All Categories") : cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {filtered.map((term, idx) => (
          <GlossaryCard key={idx} term={term} langMode={langMode} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--ink-500)", fontStyle: "italic", padding: 24 }}>
          No glossary terms match your search.
        </p>
      )}
    </section>
  );
}
