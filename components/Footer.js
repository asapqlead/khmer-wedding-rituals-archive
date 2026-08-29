// components/Footer.js
// Academic citation formats, licensing, and repository credits
import collection from "../collection.config.js";

export default function Footer({ langMode }) {
  return (
    <footer style={{ marginTop: 60, borderTop: "1px solid var(--border-light)", backgroundColor: "var(--bg-tertiary)", padding: "48px 0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        
        <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: 1, marginBottom: 16 }}>
          {langMode === "km" ? "ការដកស្រង់ និងសិទ្ធិប្រើប្រាស់" : "Academic Citation & Licensing"}
        </h4>

        <div style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-light)", padding: "16px 20px", borderRadius: 8, fontSize: 13, color: "var(--text-primary)", textAlign: "left", marginBottom: 24, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", boxShadow: "var(--shadow-sm)" }}>
          <strong style={{ color: "var(--text-secondary)" }}>APA Citation:</strong> {collection.curator}. (2026). <em>{collection.name}</em>. Khmer Living Archive, American University of Phnom Penh (AUPP). ICT 340 Vibe Coding.
        </div>

        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 12px" }}>
          Content gathered from living oral history under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0).
        </p>

        <p style={{ fontSize: 13, color: "var(--text-tertiary)", margin: 0 }}>
          Curated by <strong style={{ color: "var(--text-secondary)" }}>{collection.curator}</strong> • Built in ICT 340 — American University of Phnom Penh (AUPP)
        </p>
      </div>
    </footer>
  );
}
