// components/InteractiveBlessing.js
// Interactive Wrist-Tying (Pithei Chang Dai) ceremony simulation
import { useState } from "react";
import BlessingGuestbook from "./BlessingGuestbook.js";
import KnotMotif from "./KnotMotif.js";

export default function InteractiveBlessing({ langMode }) {
  const [selectedWish, setSelectedWish] = useState("sokh");
  const [isTied, setIsTied] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [blessings, setBlessings] = useState([
    { intentionKhmer: "សុខ សេចក្តីសុខ", wishText: "May your home always be filled with patience and laughter.", author: "Aunty Navy", time: "Takeo" },
    { intentionKhmer: "ចម្រើន មានបាន", wishText: "May abundance find you both wherever you walk.", author: "Uncle Sarin", time: "Phnom Penh" }
  ]);

  const wishes = [
    { id: "sokh", khmer: "សេចក្តីសុខ និងសន្តិភាព", en: "Peace & Harmony", chant: "សូមឱ្យត្រជាក់ត្រជុំដូចទឹកអង្គែត្រសុំ", chantEn: "May your home be as cool and serene as sacred river waters." },
    { id: "chamroeun", khmer: "ចម្រើន មានបាន", en: "Prosperity & Abundance", chant: "រកស៊ីមានបាន ទ្រព្យសម្បត្តិហូរហៀរ", chantEn: "May your fortune grow steadily through mutual effort." },
    { id: "ayu", khmer: "អាយុយឺនយូរ", en: "Longevity & Health", chant: "អាយុយឺនយូរ គ្មានរោគាព្យាធិ", chantEn: "May you live long in strong health, holding hands until old age." },
  ];

  const handleTie = () => {
    setIsTied(true);
    const active = wishes.find(w => w.id === selectedWish);
    setBlessings(prev => [{ intentionKhmer: active.khmer, wishText: active.chantEn, author: visitorName || "Honored Visitor", time: "Just now" }, ...prev]);
  };

  const active = wishes.find(w => w.id === selectedWish);

  return (
    <div style={{ backgroundColor: "var(--cream-50)", border: "1px solid var(--border-gold)", borderRadius: 10, padding: "28px 24px", boxShadow: "var(--shadow-ceremonial)" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sacred-red)", letterSpacing: 1, textTransform: "uppercase" }}>
          {langMode === "km" ? "ការពិសោធន៍ផ្ទាល់ • ពិធីចងដៃ" : "Living Experience • Pithei Chang Dai"}
        </span>
        <h2 className="khmer-title" style={{ fontSize: 24, color: "var(--oxblood-900)", marginTop: 4 }}>
          {langMode === "km" ? "ចងអំបោះក្រហមប្រសិទ្ធពរជ័យ" : "Tie the Sacred Red Thread of Blessing"}
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink-700)", maxWidth: 500, margin: "6px auto 0" }}>
          {langMode === "km" ? "ជ្រើសរើសពរជ័យ ចងចំណងអំបោះក្រហម និងប្រោះទឹកមន្តលើកដៃកូនកំលោះកូនក្រមុំ។" : "Choose a blessing intention, tie the sacred red cotton knot, and sprinkle perfumed water."}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {wishes.map((w) => (
          <button key={w.id} onClick={() => { setSelectedWish(w.id); setIsTied(false); }} style={{ padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: selectedWish === w.id ? 600 : 400, backgroundColor: selectedWish === w.id ? "var(--oxblood-800)" : "var(--cream-100)", color: selectedWish === w.id ? "var(--cream-50)" : "var(--oxblood-900)", border: "1px solid var(--border-gold)" }}>
            {langMode === "km" ? w.khmer : `${w.en} (${w.khmer.split(" ")[0]})`}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: "var(--cream-100)", border: "2px solid var(--gold-500)", borderRadius: 12, padding: "24px 16px", textAlign: "center", maxWidth: 440, margin: "0 auto", position: "relative" }}>
        <div style={{ width: 140, height: 44, margin: "0 auto 12px", backgroundColor: "#C59B27", borderRadius: "16px 16px 8px 8px", boxShadow: "0 6px 14px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E6CA65" }}>
          <span style={{ fontSize: 11, color: "var(--oxblood-900)", fontWeight: 700, letterSpacing: 0.5 }}>GOLDEN CUSHION</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, minHeight: 60 }}>
          {isTied ? (
            <div style={{ animation: "fadeIn 200ms ease-out", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 28 }}>🪢</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sacred-red)", marginTop: 4 }}>
                {langMode === "km" ? "អំបោះក្រហមបានចងភ្ជាប់រួចរាល់" : "Sacred Red Thread Tied"}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 13, color: "var(--ink-500)", fontStyle: "italic" }}>
              {langMode === "km" ? "ចុចប៊ូតុងខាងក្រោមដើម្បីចងចំណង" : "Ready for the blessing thread..."}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
          <button onClick={handleTie} style={{ padding: "10px 18px", backgroundColor: isTied ? "var(--cream-300)" : "var(--sacred-red)", color: isTied ? "var(--ink-800)" : "#fff", borderRadius: 6, fontWeight: 600, fontSize: 13, boxShadow: isTied ? "none" : "0 3px 10px rgba(184,29,36,0.3)" }}>
            {isTied ? "✓ Thread Tied (ចងរួច)" : "🪢 Tie Red Thread (ចងអំបោះ)"}
          </button>
          <button onClick={() => setHasWater(true)} disabled={!isTied} style={{ padding: "10px 18px", backgroundColor: hasWater ? "var(--cream-300)" : "var(--oxblood-800)", color: "#fff", borderRadius: 6, fontWeight: 600, fontSize: 13, opacity: isTied ? 1 : 0.5 }}>
            {hasWater ? "✓ Water Sprinkled" : "💧 Sprinkle Jasmine Water"}
          </button>
        </div>

        {isTied && (
          <div style={{ marginTop: 16, backgroundColor: "var(--cream-50)", padding: 12, borderRadius: 6, border: "1px solid var(--border-gold)" }}>
            <p className="khmer-title" style={{ fontSize: 15, color: "var(--oxblood-800)", fontWeight: 700, margin: 0 }}>"{active.chant}"</p>
            <p style={{ fontSize: 12.5, color: "var(--ink-600)", fontStyle: "italic", margin: "4px 0 0" }}>"{active.chantEn}"</p>
          </div>
        )}
      </div>

      <BlessingGuestbook blessings={blessings} langMode={langMode} />
    </div>
  );
}
