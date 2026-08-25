// components/AboutSource.js
// Oral history provenance, methodology, and regional variation guide
import collection from "../collection.config.js";
import KnotMotif from "./KnotMotif.js";

export default function AboutSource({ langMode }) {
  return (
    <section style={{ backgroundColor: "var(--cream-50)", border: "1px solid var(--border-gold)", borderRadius: 10, padding: "clamp(20px, 4vw, 36px)", boxShadow: "var(--shadow-subtle)" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--oxblood-700)", letterSpacing: 1, textTransform: "uppercase" }}>
          {langMode === "km" ? "ប្រភពដើម និងវិធីសាស្ត្រស្រាវជ្រាវ" : "Oral History Provenance & Methodology"}
        </span>
        <h2 className="khmer-title" style={{ fontSize: 26, color: "var(--oxblood-900)", marginTop: 4 }}>
          {langMode === "km" ? "អំពីបណ្ណសារ និងប្រភពចំណេះដឹង" : "About the Archive & Oral Source"}
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 24 }}>
        <div style={{ backgroundColor: "var(--cream-100)", padding: 18, borderRadius: 8, borderLeft: "4px solid var(--oxblood-800)" }}>
          <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 6 }}>
            {langMode === "km" ? "អ្នកចងក្រង និងប្រភពផ្ទាល់មាត់" : "Oral Source & Family Lineage"}
          </h4>
          <p style={{ fontSize: 14, color: "var(--ink-800)", lineHeight: 1.6, margin: 0 }}>
            {collection.source}
          </p>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-500)" }}>
            Curator: <strong>{collection.curator}</strong> • ICT 340 Living Archive Project
          </div>
        </div>

        <div style={{ backgroundColor: "var(--cream-100)", padding: 18, borderRadius: 8, borderLeft: "4px solid var(--gold-600)" }}>
          <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 6 }}>
            {langMode === "km" ? "វិធីសាស្ត្រនៃការកត់ត្រា" : "Methodology: Memory to Archive"}
          </h4>
          <p style={{ fontSize: 14, color: "var(--ink-800)", lineHeight: 1.6, margin: 0 }}>
            {langMode === "km"
              ? "ការប្រមូលទិន្នន័យធ្វើឡើងតាមរយៈកិច្ចសម្ភាសន៍ផ្ទាល់មាត់ កំណត់ត្រាដៃ និងការផ្ទៀងផ្ទាត់ជាមួយអាចារ្យចាស់ទុំ ដើម្បីរក្សានូវអត្ថន័យពិតនៃពិធីនីមួយៗ។"
              : "Gathered through deep one-on-one interviews, voice memos, handwritten notes, and physical observation of family ceremonies over years."}
          </p>
        </div>
      </div>

      <KnotMotif width={120} />

      <div style={{ backgroundColor: "var(--cream-100)", padding: 18, borderRadius: 8, border: "1px solid var(--border-cream)", marginTop: 16 }}>
        <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--oxblood-800)", marginBottom: 6 }}>
          {langMode === "km" ? "ការទទួលស្គាល់ភាពខុសគ្នាតាមតំបន់" : "Honesty on Regional & Generational Customs"}
        </h4>
        <p style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.6, margin: 0 }}>
          {langMode === "km"
            ? "ទំនៀមទម្លាប់ខ្មែរតែងមានភាពខុសគ្នាបន្តិចបន្តួចទៅតាមភូមិស្រុក (ដូចជាតាកែវ បាត់ដំបង សៀមរាប ឬខ្មែរនៅក្រៅប្រទេស)។ បណ្ណសារនេះមិនមែនជាការបង្ខំឱ្យធ្វើតាមតែមួយបែបនោះទេ ប៉ុន្តែជាការថែរក្សាការចងចាំពិតរបស់គ្រួសារមួយ។"
            : "Traditional Khmer wedding rituals are living practices that vary naturally between provinces (such as Takeo, Battambang, Siem Reap) and across generations. This archive does not claim to present the only 'correct' way, but rather honors a specific, verified family oral lineage."}
        </p>
      </div>
    </section>
  );
}
