// components/ContributeForm.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";
import { validateEntry, validatePhotoFile, NO_REGIONAL_EN, NO_REGIONAL_KHMER, normalize, countWords } from "../utils/validation.js";
import ParticipantsListEditor from "./ParticipantsListEditor.js";
import SacredItemsListEditor from "./SacredItemsListEditor.js";

export default function ContributeForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [formData, setFormData] = useState({
    title: initialData?.title || initialData?.titleEn || "",
    title_khmer: initialData?.title_khmer || initialData?.titleKhmer || "",
    sequence_order: initialData?.sequence_order ?? initialData?.order ?? 1,
    translation_en: initialData?.translation_en || initialData?.translationEn || "",
    summary: initialData?.rawSummary || initialData?.summary || "",
    meaning: initialData?.rawMeaning || initialData?.meaning || "",
    summary_khmer: initialData?.summary_khmer || initialData?.summaryKhmer || "",
    participants: initialData?.participants || [{ role: "", roleEn: "", roleKhmer: "" }],
    sacred_items: initialData?.sacredItems || initialData?.sacred_items || [{ name: "", nameEn: "", nameKhmer: "" }],
    regional_notes_en: initialData?.regionalNotesEn || initialData?.regional_notes_en || NO_REGIONAL_EN,
    regional_notes_khmer: initialData?.regionalNotesKhmer || initialData?.regional_notes_khmer || NO_REGIONAL_KHMER,
    source: initialData?.source || "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(initialData?.photo_url || initialData?.mediaPlaceholder?.image || null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileErr = await validatePhotoFile(file);
    if (fileErr) {
      setErrors((prev) => ({ ...prev, photo: fileErr }));
      return;
    }
    setErrors((prev) => ({ ...prev, photo: null }));
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSetNoVariation = () => {
    setFormData((prev) => ({
      ...prev,
      regional_notes_en: NO_REGIONAL_EN,
      regional_notes_khmer: NO_REGIONAL_KHMER,
    }));
    setErrors((prev) => ({ ...prev, regional_notes_en: null, regional_notes_khmer: null, regional_notes: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const validation = validateEntry({ ...formData, photoFile }, { isEdit });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setGeneralError("You must be logged in to contribute. Please log in first.");
        setSubmitting(false);
        return;
      }

      let photoUrl = initialData?.photo_url || initialData?.mediaPlaceholder?.image || "";

      // Upload photo if a new file was chosen
      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const randomName = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
        const uploadPath = `${user.id}/${randomName}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(uploadPath, photoFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Storage upload failed:", uploadError);
          setGeneralError("Could not upload photo. Please ensure it is under 5 MB.");
          setSubmitting(false);
          return;
        }

        const { data: publicData } = supabase.storage.from("photos").getPublicUrl(uploadPath);
        photoUrl = publicData.publicUrl;
      }

      const payload = {
        title: normalize(formData.title),
        title_khmer: normalize(formData.title_khmer),
        sequence_order: parseInt(formData.sequence_order, 10),
        translation_en: normalize(formData.translation_en),
        summary: normalize(formData.summary),
        meaning: normalize(formData.meaning),
        summary_khmer: normalize(formData.summary_khmer),
        participants: formData.participants.map((p) => ({
          role: normalize(p.role || p.roleEn),
          roleEn: normalize(p.roleEn || p.role),
          roleKhmer: normalize(p.roleKhmer || ""),
        })),
        sacred_items: formData.sacred_items.map((i) => ({
          name: normalize(i.name || i.nameEn),
          nameEn: normalize(i.nameEn || i.name),
          nameKhmer: normalize(i.nameKhmer || ""),
        })),
        regional_notes_en: normalize(formData.regional_notes_en),
        regional_notes_khmer: normalize(formData.regional_notes_khmer),
        source: normalize(formData.source) || null,
        photo_url: photoUrl,
        owner: user.id,
      };

      if (isEdit && initialData?.id) {
        const { data, error } = await supabase
          .from("entries")
          .update(payload)
          .eq("id", initialData.id)
          .select();

        if (error || !data || data.length === 0) {
          console.error("Database update error:", error);
          setGeneralError("That change wasn't saved. You may only edit your own entries.");
          setSubmitting(false);
          return;
        }
      } else {
        const { data, error } = await supabase
          .from("entries")
          .insert(payload)
          .select();

        if (error || !data || data.length === 0) {
          console.error("Database insert error:", error);
          setGeneralError("Could not save entry. Please check the requirements and try again.");
          setSubmitting(false);
          return;
        }
      }

      router.push("/#" + (initialData?.id || data[0]?.id || ""));
      router.refresh();
    } catch (err) {
      console.error("Form submission exception:", err);
      setGeneralError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  const summaryCount = countWords(formData.summary);
  const meaningCount = countWords(formData.meaning);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {generalError && (
        <div style={{ padding: "12px 16px", backgroundColor: "rgba(255, 107, 107, 0.15)", border: "1px solid #ff6b6b", borderRadius: 10, color: "#ff8787", fontSize: 14 }}>
          {generalError}
        </div>
      )}

      {/* Row 1: English Title & Khmer Title */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Title (English) <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Hae Chomnoon"
            className="glass-input"
            maxLength={120}
          />
          {errors.title && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.title}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Title (Khmer) <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <input
            type="text"
            value={formData.title_khmer}
            onChange={(e) => handleChange("title_khmer", e.target.value)}
            placeholder="e.g. ពិធីហែជំនូន"
            className="glass-input"
          />
          {errors.title_khmer && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.title_khmer}</span>}
        </div>
      </div>

      {/* Row 2: Sequence Order & Translation */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Sequence Order <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.sequence_order}
            onChange={(e) => handleChange("sequence_order", e.target.value)}
            className="glass-input"
          />
          {errors.sequence_order && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.sequence_order}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            English Translation Subtitle <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <input
            type="text"
            value={formData.translation_en}
            onChange={(e) => handleChange("translation_en", e.target.value)}
            placeholder="e.g. Groom's Procession & Fruit Offerings"
            className="glass-input"
          />
          {errors.translation_en && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.translation_en}</span>}
        </div>
      </div>

      {/* Summary (English) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Summary (English, 10–500 words) <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <span style={{ fontSize: 12, color: summaryCount >= 10 && summaryCount <= 500 ? "var(--accent-gold-light)" : "rgba(255,255,255,0.4)" }}>
            {summaryCount} words
          </span>
        </div>
        <textarea
          rows={4}
          value={formData.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Describe the ceremony procedure in English (10–500 words)..."
          className="glass-input"
          style={{ resize: "vertical" }}
        />
        {errors.summary && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.summary}</span>}
      </div>

      {/* Meaning (English) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Spiritual Meaning (English, 10–500 words) <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <span style={{ fontSize: 12, color: meaningCount >= 10 && meaningCount <= 500 ? "var(--accent-gold-light)" : "rgba(255,255,255,0.4)" }}>
            {meaningCount} words
          </span>
        </div>
        <textarea
          rows={4}
          value={formData.meaning}
          onChange={(e) => handleChange("meaning", e.target.value)}
          placeholder="Explain cultural and spiritual significance in English (10–500 words, distinct from summary)..."
          className="glass-input"
          style={{ resize: "vertical" }}
        />
        {errors.meaning && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.meaning}</span>}
      </div>

      {/* Summary (Khmer) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Summary in Khmer (10–2000 characters) <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <span style={{ fontSize: 12, color: formData.summary_khmer.length >= 10 && formData.summary_khmer.length <= 2000 ? "var(--accent-gold-light)" : "rgba(255,255,255,0.4)" }}>
            {formData.summary_khmer.length} chars
          </span>
        </div>
        <textarea
          rows={4}
          value={formData.summary_khmer}
          onChange={(e) => handleChange("summary_khmer", e.target.value)}
          placeholder="សង្ខេបខ្លឹមសារពិធីជាភាសាខ្មែរ (១០ ដល់ ២០០០ តួអក្សរ)..."
          className="glass-input"
          style={{ resize: "vertical" }}
        />
        {errors.summary_khmer && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.summary_khmer}</span>}
      </div>

      {/* Dynamic Participants List */}
      <ParticipantsListEditor
        items={formData.participants}
        onChange={(items) => handleChange("participants", items)}
        error={errors.participants}
      />

      {/* Dynamic Sacred Items List */}
      <SacredItemsListEditor
        items={formData.sacred_items}
        onChange={(items) => handleChange("sacred_items", items)}
        error={errors.sacred_items}
      />

      {/* Regional Notes with Quick Toggle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            Regional Notes / Oral Provenance <span style={{ color: "var(--accent-gold)" }}>*</span>
          </label>
          <button
            type="button"
            onClick={handleSetNoVariation}
            style={{ background: "transparent", border: "none", color: "var(--accent-gold-light)", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
          >
            Set No Regional Variation
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              type="text"
              value={formData.regional_notes_en}
              onChange={(e) => handleChange("regional_notes_en", e.target.value)}
              placeholder="English regional note"
              className="glass-input"
            />
            {errors.regional_notes_en && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.regional_notes_en}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              type="text"
              value={formData.regional_notes_khmer}
              onChange={(e) => handleChange("regional_notes_khmer", e.target.value)}
              placeholder="កំណត់សម្គាល់តំបន់ជាភាសាខ្មែរ"
              className="glass-input"
            />
            {errors.regional_notes_khmer && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.regional_notes_khmer}</span>}
          </div>
        </div>
        {errors.regional_notes && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.regional_notes}</span>}
      </div>

      {/* Photo Upload & Preview */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
          Ceremony Photo {!isEdit && <span style={{ color: "var(--accent-gold)" }}>*</span>} (JPEG, PNG, WebP &lt; 5MB, landscape)
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
          style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}
        />
        {photoPreview && (
          <div style={{ marginTop: 8, width: "100%", maxHeight: 200, overflow: "hidden", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={photoPreview} alt="Preview" style={{ width: "100%", height: 200, objectFit: "cover" }} />
          </div>
        )}
        {errors.photo && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.photo}</span>}
      </div>

      {/* Source (Optional) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
          Source / Knowledge Credit (Optional)
        </label>
        <input
          type="text"
          value={formData.source}
          onChange={(e) => handleChange("source", e.target.value)}
          placeholder="e.g. Oral interview with family elders"
          className="glass-input"
        />
        {errors.source && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{errors.source}</span>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="glass-btn"
        style={{ marginTop: 12 }}
      >
        {submitting ? "Saving Entry..." : isEdit ? "Update Ceremony Entry" : "Publish Ceremony Entry"}
      </button>
    </form>
  );
}
