// components/SacredItemsListEditor.js
"use client";

export default function SacredItemsListEditor({ items, onChange, error }) {
  const handleItemChange = (index, field, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...items, { name: "", nameEn: "", nameKhmer: "" }]);
  };

  const handleRemove = (index) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255, 255, 255, 0.9)" }}>
        Sacred Items <span style={{ color: "var(--accent-gold)" }}>*</span>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Item in English (e.g. Popil Candle)"
              value={item.nameEn || item.name || ""}
              onChange={(e) => {
                const val = e.target.value;
                handleItemChange(idx, "name", val);
                handleItemChange(idx, "nameEn", val);
              }}
              className="glass-input"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Item in Khmer (e.g. ពពិលប្រាក់)"
              value={item.nameKhmer || ""}
              onChange={(e) => handleItemChange(idx, "nameKhmer", e.target.value)}
              className="glass-input"
              style={{ flex: 1 }}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{ background: "transparent", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 18, padding: "4px 8px" }}
                aria-label="Remove sacred item"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        style={{ alignSelf: "flex-start", background: "transparent", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 8, color: "var(--accent-gold-light)", padding: "6px 14px", fontSize: 13, cursor: "pointer", marginTop: 4 }}
      >
        + Add Sacred Item
      </button>
      {error && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
