// components/Header.js
// Top ceremonial header with collection identity and primary section navigation
import collection from "../collection.config.js";
import LanguageToggle from "./LanguageToggle.js";
import KnotMotif from "./KnotMotif.js";

export default function Header({ activeTab, setActiveTab, langMode, setLangMode }) {
  const navItems = [
    { id: "rituals", labelEn: "Ceremonies Sequence", labelKhmer: "លំដាប់ពិធីការ" },
    { id: "blessing", labelEn: "Tie the Thread (Interactive)", labelKhmer: "ពិធីចងដៃ (ពិសោធន៍)" },
    { id: "about", labelEn: "Oral History & Source", labelKhmer: "ប្រភពប្រវត្តិផ្ទាល់មាត់" },
    { id: "glossary", labelEn: "Khmer Glossary", labelKhmer: "សទ្ទានុក្រមពិធី" },
    { id: "contribute", labelEn: "Family Variations", labelKhmer: "ទំនៀមតាមតំបន់" },
  ];

  return (
    <header style={{ borderBottom: "1px solid var(--border-cream)", backgroundColor: "var(--cream-100)", paddingTop: 28, paddingBottom: 16 }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--oxblood-700)", fontWeight: 600, letterSpacing: 0.5 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--sacred-red)" }} />
            <span>KHMER LIVING ARCHIVE</span>
            <span style={{ color: "var(--ink-400)" }}>•</span>
            <span style={{ color: "var(--ink-600)", fontWeight: 400 }}>Curator: <strong>{collection.curator}</strong></span>
          </div>
          <LanguageToggle langMode={langMode} onChangeLangMode={setLangMode} />
        </div>

        <h1 className="khmer-title" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "var(--oxblood-800)", margin: "4px 0 6px" }}>
          {langMode === "en" ? collection.name : "បណ្ណសារពិធីមង្គលការបុរាណខ្មែរ"}
        </h1>
        {langMode === "dual" && (
          <p style={{ fontFamily: "var(--font-serif-en)", fontSize: "1.1rem", color: "var(--gold-700)", margin: 0, fontStyle: "italic" }}>
            {collection.name}
          </p>
        )}
        <p style={{ maxWidth: 640, color: "var(--ink-700)", fontSize: "0.98rem", marginTop: 8 }}>
          {langMode === "km" ? "ការចងក្រងនូវកម្រងពិធីការអាពាហ៍ពិពាហ៍ប្រពៃណីខ្មែរ និងអត្ថន័យជ្រាលជ្រៅតាមការចងចាំរបស់ដូនតា។" : collection.description}
        </p>

        <KnotMotif width={180} />

        <nav aria-label="Archive sections" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? "var(--oxblood-800)" : "transparent",
                  color: isActive ? "var(--cream-50)" : "var(--oxblood-800)",
                  border: isActive ? "1px solid var(--oxblood-900)" : "1px solid var(--border-cream)",
                  boxShadow: isActive ? "0 2px 6px rgba(62,11,18,0.2)" : "none",
                }}
              >
                {langMode === "km" ? item.labelKhmer : langMode === "en" ? item.labelEn : `${item.labelKhmer} (${item.labelEn})`}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
