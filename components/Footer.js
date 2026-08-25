// components/Footer.js
// Academic citation formats, licensing, and repository credits
import collection from "../collection.config.js";
import KnotMotif from "./KnotMotif.js";

export default function Footer({ langMode }) {
  return (
    <footer style={{ marginTop: 60, borderTop: "1px solid var(--border-cream)", backgroundColor: "var(--cream-100)", padding: "36px 0 44px" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <KnotMotif width={140} />
        
        <h4 style={{ fontSize: 14, textTransform: "uppercase", color: "var(--oxblood-800)", letterSpacing: 0.5, marginBottom: 8 }}>
          {langMode === "km" ? "ការដកស្រង់ និងសិទ្ធិប្រើប្រាស់" : "Academic Citation & Licensing"}
        </h4>

        <div style={{ backgroundColor: "var(--cream-50)", border: "1px solid var(--border-cream)", padding: "12px 16px", borderRadius: 6, fontSize: 12, color: "var(--ink-700)", textAlign: "left", marginBottom: 16, fontFamily: "monospace" }}>
          <strong>APA Citation:</strong> {collection.curator}. (2026). <em>{collection.name}</em>. Khmer Living Archive, American University of Phnom Penh (AUPP). ICT 340 Vibe Coding.
        </div>

        <p style={{ fontSize: 12.5, color: "var(--ink-600)", lineHeight: 1.6, margin: "0 0 12px" }}>
          Content gathered from living oral history under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0).
        </p>

        <p style={{ fontSize: 12, color: "var(--ink-500)", margin: 0 }}>
          Curated by <strong>{collection.curator}</strong> • Built in ICT 340 — American University of Phnom Penh (AUPP)
        </p>
      </div>
    </footer>
  );
}
