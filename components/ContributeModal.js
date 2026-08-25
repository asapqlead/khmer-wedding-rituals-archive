// components/ContributeModal.js
// Modal dialog allowing visitors to contribute their family's ritual variations
import { useState } from "react";

export default function ContributeModal({ isOpen, onClose, onAddContribution, langMode }) {
  const [name, setName] = useState("");
  const [province, setProvince] = useState("Takeo");
  const [ritual, setRitual] = useState("Pithei Chang Dai (Wrist Tying)");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !story) return;
    onAddContribution({
      id: `custom-${Date.now()}`,
      contributorName: name,
      province: `${province} Province`,
      ritualName: ritual,
      dateAdded: "Live Archive Entry",
      title: title,
      storyEn: story,
      storyKhmer: story,
    });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(38, 5, 9, 0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div style={{ backgroundColor: "var(--cream-50)", border: "2px solid var(--gold-500)", borderRadius: 10, maxWidth: 480, width: "100%", padding: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 className="khmer-title" style={{ fontSize: 18, color: "var(--oxblood-900)", margin: 0 }}>
            {langMode === "km" ? "ចែករំលែកទំនៀមទម្លាប់គ្រួសារ" : "Contribute a Family Variation"}
          </h3>
          <button onClick={onClose} style={{ fontSize: 20, color: "var(--ink-500)", fontWeight: 700 }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input required type="text" placeholder="Your Name or Family Elder's Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border-cream)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input required type="text" placeholder="Province/City (e.g. Takeo, Battambang)" value={province} onChange={e => setProvince(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border-cream)" }} />
            <select value={ritual} onChange={e => setRitual(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border-cream)" }}>
              <option>Hai Goer (Procession)</option>
              <option>Gaat Sah (Hair Cutting)</option>
              <option>Sompeas Ptem (Pair Union)</option>
              <option>Bongvel Popil (Candle Smoke)</option>
              <option>Pithei Chang Dai (Wrist Tying)</option>
              <option>Phat Phka Sla (Areca Blossom)</option>
            </select>
          </div>
          <input required type="text" placeholder="Title of Tradition or Memory" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border-cream)" }} />
          <textarea required rows={4} placeholder="Describe the specific custom, object, or elder's saying..." value={story} onChange={e => setStory(e.target.value)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border-cream)", resize: "vertical" }} />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 14px", borderRadius: 6, color: "var(--ink-700)" }}>Cancel</button>
            <button type="submit" style={{ padding: "8px 16px", borderRadius: 6, backgroundColor: "var(--oxblood-800)", color: "var(--cream-50)", fontWeight: 600 }}>Save to Archive</button>
          </div>
        </form>
      </div>
    </div>
  );
}
