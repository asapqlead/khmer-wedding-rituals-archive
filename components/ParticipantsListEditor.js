// components/ParticipantsListEditor.js
"use client";

export default function ParticipantsListEditor({ items, onChange, error }) {
  const handleItemChange = (index, field, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...items, { role: "", roleEn: "", roleKhmer: "" }]);
  };

  const handleRemove = (index) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255, 255, 255, 0.9)" }}>
        Participants <span style={{ color: "var(--accent-gold)" }}>*</span>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Role in English (e.g. Achar)"
              value={item.roleEn || item.role || ""}
              onChange={(e) => {
                const val = e.target.value;
                handleItemChange(idx, "role", val);
                handleItemChange(idx, "roleEn", val);
              }}
              className="glass-input"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Role in Khmer (e.g. លោកអាចារ្យ)"
              value={item.roleKhmer || ""}
              onChange={(e) => handleItemChange(idx, "roleKhmer", e.target.value)}
              className="glass-input"
              style={{ flex: 1 }}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{ background: "transparent", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 18, padding: "4px 8px" }}
                aria-label="Remove participant"
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
        + Add Participant
      </button>
      {error && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
