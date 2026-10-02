// components/useEntries.js
// Fetches entries from Supabase and reshapes them to match
// the object shape every component already expects.
"use client";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client.js";

// Maps a flat Supabase row → the nested shape used by GalleryCard,
// CeremonyInfoContent, MobileRitualCard, FullscreenCeremonyView, etc.
function toLocalShape(row) {
  return {
    id: row.id,
    order: row.sequence_order,
    titleEn: row.title,
    titleKhmer: row.title_khmer,
    translationEn: row.translation_en || undefined,
    phonetic: row.phonetic || undefined,
    // Combine summary + meaning into one flowing paragraph so the
    // spiritual significance is always visible alongside the description.
    summaryEn: row.meaning
      ? `${row.summary} ${row.meaning}`
      : row.summary,
    summaryKhmer: row.summary_khmer || undefined,
    // JSONB columns arrive already parsed by the Supabase client
    participants: row.participants || undefined,
    sacredItems: row.sacred_items || undefined,
    regionalNotesEn: row.regional_notes_en || undefined,
    regionalNotesKhmer: row.regional_notes_khmer || undefined,
    // Reconstruct the nested object GalleryCard / FullscreenCeremonyView read
    mediaPlaceholder: row.photo_url ? { image: row.photo_url } : undefined,
    // Optional per-entry source credit
    source: row.source || undefined,
    // Preserved fields for ownership, edit & delete checks
    owner: row.owner,
    rawSummary: row.summary,
    rawMeaning: row.meaning,
    photo_url: row.photo_url,
  };
}

export default function useEntries() {
  const [ceremonies, setCeremonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("entries")
      .select("*")
      .order("sequence_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load entries:", error.message);
        }
        setCeremonies((data || []).map(toLocalShape));
        setIsLoading(false);
      });
  }, []);

  return { ceremonies, isLoading };
}
