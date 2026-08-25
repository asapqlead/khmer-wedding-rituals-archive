// components/CommunityContributions.js
// Portal for viewing and contributing family and regional wedding variations
import { useState } from "react";
import CommunityCard from "./CommunityCard.js";
import ContributeModal from "./ContributeModal.js";

export default function CommunityContributions({ contributions, onAddContribution, langMode }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section style={{ backgroundColor: "var(--cream-100)", border: "1px solid var(--border-gold)", borderRadius: 10, padding: "28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="khmer-title" style={{ fontSize: 24, color: "var(--oxblood-900)", margin: "0 0 4px" }}>
            {langMode === "km" ? "ទំនៀមទម្លាប់ និងការចងចាំតាមគ្រួសារ" : "Family Variations & Living Memories"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--ink-700)", margin: 0 }}>
            {langMode === "km" ? "ទំនៀមទម្លាប់ប្រែប្រួលតាមតំបន់។ ចូលរួមចែករំលែកការចងចាំគ្រួសារលោកអ្នក។" : "Traditions live through families. Explore variations or contribute your family's customs."}
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: "10px 18px",
            backgroundColor: "var(--oxblood-800)",
            color: "var(--cream-50)",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 13,
            boxShadow: "0 2px 8px rgba(62,11,18,0.25)",
          }}
        >
          {langMode === "km" ? "+ បន្ថែមទំនៀមគ្រួសារអ្នក" : "+ Add Your Family's Variation"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {contributions.map((item) => (
          <CommunityCard key={item.id} item={item} langMode={langMode} />
        ))}
      </div>

      <ContributeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddContribution={onAddContribution}
        langMode={langMode}
      />
    </section>
  );
}
