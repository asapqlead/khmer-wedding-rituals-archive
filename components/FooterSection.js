// components/FooterSection.js
"use client";
import collection from "../collection.config.js";
import MagneticButton from "./MagneticButton.js";

export default function FooterSection({ langMode }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="contact"
      style={{
        padding: "100px 0 60px",
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "#0F0F0F",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-editorial">
        <div style={{ marginBottom: 60 }}>
          <span className="font-mono-tag" style={{ color: "var(--accent-gold)" }}>03 • CLOSING STATEMENT</span>
          <h2
            className={langMode === "km" ? "khmer-serif" : ""}
            style={{ fontSize: "clamp(32px, 5.5vw, 76px)", color: "var(--text-primary)", marginTop: 12, marginBottom: 24, maxWidth: 900 }}
          >
            {langMode === "km" ? "ថែរក្សាកេរដំណែល និងដង្ហើមនៃវប្បធម៌ខ្មែរ" : "Preserve the Sacred Memory & Living Culture."}
          </h2>
          <p className="font-mono-tag" style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
            ARCHIVE INQUIRIES & ACADEMIC COLLABORATION • ICT 340
          </p>

          <MagneticButton
            onClick={scrollToTop}
            cursorLabel="top"
            cursorGold="true"
            style={{
              padding: "14px 32px",
              borderRadius: 100,
              backgroundColor: "var(--accent-gold)",
              color: "#141414",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ↑ RETURN TO TOP
          </MagneticButton>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: "1px solid var(--border-subtle)", paddingTop: 32 }}>
          <p className="font-mono-tag" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} {collection.name} • CURATED BY {collection.curator.toUpperCase()}
          </p>
          <p className="font-mono-tag" style={{ color: "var(--text-muted)" }}>
            AUPP KHMER LIVING ARCHIVE
          </p>
        </div>
      </div>
    </footer>
  );
}
