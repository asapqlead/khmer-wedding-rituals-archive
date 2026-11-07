// hooks/useDraftProtection.js
// Automatically saves form data to localStorage as a draft (debounced),
// restores it silently on mount, and provides draft status indicators
// like Google Forms without interruptive warning popups.
"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const DRAFT_PREFIX = "draft-";
const DEBOUNCE_MS = 600;

export default function useDraftProtection(entryId, formData, setFormData, hasPhoto, initialBlank) {
  const draftKey = DRAFT_PREFIX + (entryId || "new");
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saving" | "saved"
  const [hasDraft, setHasDraft] = useState(false);
  const [showPhotoReminder, setShowPhotoReminder] = useState(false);

  const isRestored = useRef(false);
  const prevDataString = useRef("");

  // ── On mount: automatically restore saved draft if present ─────
  useEffect(() => {
    if (isRestored.current) return;
    isRestored.current = true;

    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft && typeof draft === "object") {
          setFormData((prev) => ({ ...prev, ...draft }));
          setHasDraft(true);
          setSaveStatus("saved");
          if (draft._hadPhoto) {
            setShowPhotoReminder(true);
          }
          prevDataString.current = JSON.stringify(draft);
          return;
        }
      }
    } catch {
      /* ignore storage error */
    }

    prevDataString.current = JSON.stringify(formData);
  }, [draftKey, setFormData]);

  // ── Debounced autosave ─────────────────────────────────────────
  const timerRef = useRef(null);

  useEffect(() => {
    // Skip saving until the initial mount/restore pass is complete
    if (!isRestored.current) return;

    const currentString = JSON.stringify(formData);
    // Don't re-save if identical to what's already saved
    if (currentString === prevDataString.current) return;

    setSaveStatus("saving");
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        const toSave = { ...formData, _hadPhoto: Boolean(hasPhoto) };
        localStorage.setItem(draftKey, JSON.stringify(toSave));
        prevDataString.current = currentString;
        setSaveStatus("saved");
        setHasDraft(true);
      } catch {
        /* storage full / private mode */
        setSaveStatus("idle");
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerRef.current);
  }, [formData, hasPhoto, draftKey]);

  // ── Clear draft (e.g. on submit or user discard) ───────────────
  const clearDraft = useCallback((resetForm = false) => {
    clearTimeout(timerRef.current);
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
    setHasDraft(false);
    setSaveStatus("idle");
    setShowPhotoReminder(false);
    if (resetForm && initialBlank) {
      setFormData(initialBlank);
      prevDataString.current = JSON.stringify(initialBlank);
    }
  }, [draftKey, initialBlank, setFormData]);

  return {
    saveStatus,
    hasDraft,
    showPhotoReminder,
    setShowPhotoReminder,
    clearDraft,
  };
}
