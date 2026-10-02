// utils/validation.js
// Pure JavaScript validation rules matching archive database constraints.
// Complies with AGENTS.md rules: no external packages used.

export const NO_REGIONAL_EN = "No regional variation";
export const NO_REGIONAL_KHMER = "គ្មានភាពខុសគ្នាតាមតំបន់";

const KHMER_REGEX = /[\u1780-\u17FF]/;
const MIN_WORDS = 10;
const MAX_WORDS = 500;
const KHMER_MIN_CHARS = 10;
const KHMER_MAX_CHARS = 2000;

export const countWords = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
};

export const hasKhmer = (str) => {
  return KHMER_REGEX.test(str || "");
};

export const normalize = (str) => {
  if (typeof str !== "string") return "";
  return str.normalize("NFC").trim();
};

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

export async function validatePhotoFile(file) {
  if (!file) return "A photo is required";
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Photo must be a JPG, PNG, or WebP image";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "Photo must be under 5 MB";
  }
  return null;
}

export function validateEntry(values, { isEdit = false } = {}) {
  const errors = {};

  // Title (English only, 1-120 chars)
  const title = normalize(values.title);
  if (!title) {
    errors.title = "Title is required";
  } else if (title.length > 120) {
    errors.title = "Title cannot exceed 120 characters";
  } else if (hasKhmer(title)) {
    errors.title = "Title must be in English (no Khmer script)";
  }

  // Khmer Title (must contain Khmer script)
  const titleKhmer = normalize(values.title_khmer);
  if (!titleKhmer) {
    errors.title_khmer = "Khmer title is required";
  } else if (!hasKhmer(titleKhmer)) {
    errors.title_khmer = "Khmer title must contain Khmer script";
  }

  // Sequence Order (positive integer >= 1)
  const seq = Number(values.sequence_order);
  if (!values.sequence_order && values.sequence_order !== 0) {
    errors.sequence_order = "Sequence order is required";
  } else if (!Number.isInteger(seq) || seq < 1) {
    errors.sequence_order = "Sequence order must be a whole number of 1 or higher";
  }

  // Translation (English only)
  const translationEn = normalize(values.translation_en);
  if (!translationEn) {
    errors.translation_en = "English translation subtitle is required";
  } else if (hasKhmer(translationEn)) {
    errors.translation_en = "Translation must be in English (no Khmer script)";
  }

  // Summary (English, 100-200 words)
  const summary = normalize(values.summary);
  const summaryWords = countWords(summary);
  if (!summary) {
    errors.summary = "Summary is required";
  } else if (hasKhmer(summary)) {
    errors.summary = "Summary must be in English (no Khmer script)";
  } else if (summaryWords < MIN_WORDS || summaryWords > MAX_WORDS) {
    errors.summary = `Summary must be ${MIN_WORDS}-${MAX_WORDS} words (currently ${summaryWords} words)`;
  }

  // Meaning (English, 100-200 words, must differ from summary)
  const meaning = normalize(values.meaning);
  const meaningWords = countWords(meaning);
  if (!meaning) {
    errors.meaning = "Meaning is required";
  } else if (hasKhmer(meaning)) {
    errors.meaning = "Meaning must be in English (no Khmer script)";
  } else if (meaningWords < MIN_WORDS || meaningWords > MAX_WORDS) {
    errors.meaning = `Meaning must be ${MIN_WORDS}-${MAX_WORDS} words (currently ${meaningWords} words)`;
  } else if (meaning === summary) {
    errors.meaning = "Meaning must not repeat the summary";
  }

  // Khmer Summary (300-2000 chars, Khmer script)
  const summaryKhmer = normalize(values.summary_khmer);
  if (!summaryKhmer) {
    errors.summary_khmer = "Khmer summary is required";
  } else if (!hasKhmer(summaryKhmer)) {
    errors.summary_khmer = "Khmer summary must contain Khmer script";
  } else if (summaryKhmer.length < KHMER_MIN_CHARS || summaryKhmer.length > KHMER_MAX_CHARS) {
    errors.summary_khmer = `Khmer summary must be ${KHMER_MIN_CHARS}-${KHMER_MAX_CHARS} characters (currently ${summaryKhmer.length})`;
  }

  // Participants (array of objects with at least role)
  const participants = Array.isArray(values.participants) ? values.participants : [];
  if (participants.length === 0) {
    errors.participants = "Add at least one participant";
  } else {
    const missing = participants.some((p) => !normalize(p.role || p.roleEn));
    if (missing) {
      errors.participants = "Every participant must have an English role name";
    }
  }

  // Sacred Items (array of objects with at least name)
  const sacredItems = Array.isArray(values.sacred_items) ? values.sacred_items : [];
  if (sacredItems.length === 0) {
    errors.sacred_items = "Add at least one sacred item";
  } else {
    const missing = sacredItems.some((i) => !normalize(i.name || i.nameEn));
    if (missing) {
      errors.sacred_items = "Every sacred item must have an English item name";
    }
  }

  // Regional Notes
  const regionalEn = normalize(values.regional_notes_en);
  const regionalKm = normalize(values.regional_notes_khmer);

  if (!regionalEn) {
    errors.regional_notes_en = "Regional note is required";
  } else if (regionalEn !== NO_REGIONAL_EN && hasKhmer(regionalEn)) {
    errors.regional_notes_en = "Regional note must be in English";
  }

  if (!regionalKm) {
    errors.regional_notes_khmer = "Khmer regional note is required";
  } else if (regionalKm !== NO_REGIONAL_KHMER && !hasKhmer(regionalKm)) {
    errors.regional_notes_khmer = "Khmer regional note must contain Khmer script";
  }

  const isEnFixed = regionalEn === NO_REGIONAL_EN;
  const isKmFixed = regionalKm === NO_REGIONAL_KHMER;
  if (regionalEn && regionalKm && isEnFixed !== isKmFixed) {
    errors.regional_notes = "Use the fixed 'no regional variation' text in both languages, or write custom notes in both";
  }

  // Source (optional, if provided >= 3 chars)
  const source = normalize(values.source);
  if (source && source.length < 3) {
    errors.source = "Source must be at least 3 characters if provided";
  }

  // Photo requirement on create
  if (!isEdit && !values.photoFile) {
    errors.photo = "A photo is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
