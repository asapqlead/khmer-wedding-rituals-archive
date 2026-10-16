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
  if (!file) return "A photo is required / តម្រូវឱ្យមានរូបថតមួយសន្លឹក";
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Photo must be a JPG, PNG, or WebP image / រូបថតត្រូវតែជារូបភាព JPG, PNG ឬ WebP";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "Photo must be under 5 MB / រូបថតត្រូវតែមានទំហំក្រោម 5 MB";
  }
  return null;
}

// SEE IF HE'S LYING
export function validateEntry(values, { isEdit = false } = {}) {
  const errors = {};

  // Title (English only, 1-120 chars)
  const title = normalize(values.title);
  if (!title) {
    errors.title = "Title is required / តម្រូវឱ្យមានចំណងជើងជាភាសាអង់គ្លេស";
  } else if (title.length > 120) {
    errors.title = "Title cannot exceed 120 characters / ចំណងជើងមិនអាចលើសពី ១២០ តួអក្សរឡើយ";
  } else if (hasKhmer(title)) {
    errors.title = "Title must be in English (no Khmer script) / ចំណងជើងត្រូវតែជាភាសាអង់គ្លេស";
  }

  // Khmer Title (must contain Khmer script)
  const titleKhmer = normalize(values.title_khmer);
  if (!titleKhmer) {
    errors.title_khmer = "Khmer title is required / តម្រូវឱ្យមានចំណងជើងជាភាសាខ្មែរ";
  } else if (!hasKhmer(titleKhmer)) {
    errors.title_khmer = "Khmer title must contain Khmer script / ចំណងជើងខ្មែរត្រូវតែមានតួអក្សរខ្មែរ";
  }

  // Sequence Order (positive integer >= 1)
  const seq = Number(values.sequence_order);
  if (!values.sequence_order && values.sequence_order !== 0) {
    errors.sequence_order = "Sequence order is required / តម្រូវឱ្យមានលំដាប់លំដោយពិធី";
  } else if (!Number.isInteger(seq) || seq < 1) {
    errors.sequence_order = "Sequence order must be a whole number of 1 or higher / លំដាប់លំដោយពិធីត្រូវតែជាលេខគត់ចាប់ពី ១ ឡើងទៅ";
  }

  // Translation (English only)
  const translationEn = normalize(values.translation_en);
  if (!translationEn) {
    errors.translation_en = "English translation subtitle is required / តម្រូវឱ្យមានចំណងជើងរងបកប្រែជាភាសាអង់គ្លេស";
  } else if (hasKhmer(translationEn)) {
    errors.translation_en = "Translation must be in English (no Khmer script) / ចំណងជើងរងបកប្រែត្រូវតែជាភាសាអង់គ្លេស";
  }

  // Summary (English, 10-500 words)
  const summary = normalize(values.summary);
  const summaryWords = countWords(summary);
  if (!summary) {
    errors.summary = "Summary is required / តម្រូវឱ្យមានសេចក្តីសង្ខេបជាភាសាអង់គ្លេស";
  } else if (hasKhmer(summary)) {
    errors.summary = "Summary must be in English (no Khmer script) / សេចក្តីសង្ខេបត្រូវតែជាភាសាអង់គ្លេស";
  } else if (summaryWords < MIN_WORDS || summaryWords > MAX_WORDS) {
    errors.summary = `Summary must be ${MIN_WORDS}-${MAX_WORDS} words (currently ${summaryWords}) / សេចក្តីសង្ខេបត្រូវតែមាន ${MIN_WORDS}-${MAX_WORDS} ពាក្យ`;
  }

  // Meaning (English, 10-500 words, must differ from summary)
  const meaning = normalize(values.meaning);
  const meaningWords = countWords(meaning);
  if (!meaning) {
    errors.meaning = "Meaning is required / តម្រូវឱ្យមានអត្ថន័យជាភាសាអង់គ្លេស";
  } else if (hasKhmer(meaning)) {
    errors.meaning = "Meaning must be in English (no Khmer script) / អត្ថន័យត្រូវតែជាភាសាអង់គ្លេស";
  } else if (meaningWords < MIN_WORDS || meaningWords > MAX_WORDS) {
    errors.meaning = `Meaning must be ${MIN_WORDS}-${MAX_WORDS} words (currently ${meaningWords}) / អត្ថន័យត្រូវតែមាន ${MIN_WORDS}-${MAX_WORDS} ពាក្យ`;
  } else if (meaning === summary) {
    errors.meaning = "Meaning must not repeat the summary / អត្ថន័យមិនត្រូវដូចគ្នានឹងសេចក្តីសង្ខេបឡើយ";
  }

  // Khmer Summary (10-2000 chars, Khmer script)
  const summaryKhmer = normalize(values.summary_khmer);
  if (!summaryKhmer) {
    errors.summary_khmer = "Khmer summary is required / តម្រូវឱ្យមានសេចក្តីសង្ខេបជាភាសាខ្មែរ";
  } else if (!hasKhmer(summaryKhmer)) {
    errors.summary_khmer = "Khmer summary must contain Khmer script / សេចក្តីសង្ខេបខ្មែរត្រូវតែមានតួអក្សរខ្មែរ";
  } else if (summaryKhmer.length < KHMER_MIN_CHARS || summaryKhmer.length > KHMER_MAX_CHARS) {
    errors.summary_khmer = `Khmer summary must be ${KHMER_MIN_CHARS}-${KHMER_MAX_CHARS} characters (currently ${summaryKhmer.length}) / សេចក្តីសង្ខេបខ្មែរត្រូវតែមាន ${KHMER_MIN_CHARS}-${KHMER_MAX_CHARS} តួអក្សរ`;
  }

  // Participants (array of objects with at least role)
  const participants = Array.isArray(values.participants) ? values.participants : [];
  if (participants.length === 0) {
    errors.participants = "Add at least one participant / សូមបន្ថែមអ្នកចូលរួមយ៉ាងហោចណាស់ម្នាក់";
  } else {
    const missing = participants.some((p) => !normalize(p.role || p.roleEn));
    if (missing) {
      errors.participants = "Every participant must have an English role name / អ្នកចូលរួមគ្រប់រូបត្រូវតែមានឈ្មោះតួនាទីជាភាសាអង់គ្លេស";
    }
  }

  // Sacred Items (array of objects with at least name)
  const sacredItems = Array.isArray(values.sacred_items) ? values.sacred_items : [];
  if (sacredItems.length === 0) {
    errors.sacred_items = "Add at least one sacred item / សូមបន្ថែមគ្រឿងសក្ការៈយ៉ាងហោចណាស់មួយ";
  } else {
    const missing = sacredItems.some((i) => !normalize(i.name || i.nameEn));
    if (missing) {
      errors.sacred_items = "Every sacred item must have an English item name / គ្រឿងសក្ការៈគ្រប់មុខត្រូវតែមានឈ្មោះជាភាសាអង់គ្លេស";
    }
  }

  // Regional Notes
  const regionalEn = normalize(values.regional_notes_en);
  const regionalKm = normalize(values.regional_notes_khmer);

  if (!regionalEn) {
    errors.regional_notes_en = "Regional note is required / តម្រូវឱ្យមានកំណត់សម្គាល់តំបន់ជាភាសាអង់គ្លេស";
  } else if (regionalEn !== NO_REGIONAL_EN && hasKhmer(regionalEn)) {
    errors.regional_notes_en = "Regional note must be in English / កំណត់សម្គាល់តំបន់ត្រូវតែជាភាសាអង់គ្លេស";
  }

  if (!regionalKm) {
    errors.regional_notes_khmer = "Khmer regional note is required / តម្រូវឱ្យមានកំណត់សម្គាល់តំបន់ជាភាសាខ្មែរ";
  } else if (regionalKm !== NO_REGIONAL_KHMER && !hasKhmer(regionalKm)) {
    errors.regional_notes_khmer = "Khmer regional note must contain Khmer script / កំណត់សម្គាល់តំបន់ខ្មែរត្រូវតែមានតួអក្សរខ្មែរ";
  }

  const isEnFixed = regionalEn === NO_REGIONAL_EN;
  const isKmFixed = regionalKm === NO_REGIONAL_KHMER;
  if (regionalEn && regionalKm && isEnFixed !== isKmFixed) {
    errors.regional_notes = "Use the fixed 'no regional variation' text in both languages, or write custom notes in both / សូមប្រើអត្ថបទថេរ 'គ្មានភាពខុសគ្នាតាមតំបន់' ទាំងពីរភាសា ឬសរសេរកំណត់សម្គាល់ជាក់លាក់ទាំងពីរភាសា";
  }

  // Source (optional, if provided >= 3 chars)
  const source = normalize(values.source);
  if (source && source.length < 3) {
    errors.source = "Source must be at least 3 characters if provided / ប្រភពត្រូវតែមានយ៉ាងហោចណាស់ ៣ តួអក្សរប្រសិនបើបានផ្តល់";
  }

  // Photo requirement on create
  if (!isEdit && !values.photoFile) {
    errors.photo = "A photo is required / តម្រូវឱ្យមានរូបថតមួយសន្លឹក";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
