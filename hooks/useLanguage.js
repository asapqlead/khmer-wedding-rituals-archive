// hooks/useLanguage.js
// Provides persistent language state ('en' | 'km') across all archive pages
// backed by localStorage and synchronized via window events.
"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "archive_lang_mode";

export default function useLanguage() {
  const [langMode, setLangModeState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "km" || saved === "en") {
        setLangModeState(saved);
      }
    } catch {
      /* ignore storage access restriction */
    }

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === "km" || e.newValue === "en")) {
        setLangModeState(e.newValue);
      }
    };

    const onLanguageChange = () => {
      try {
        const val = localStorage.getItem(STORAGE_KEY);
        if (val === "km" || val === "en") {
          setLangModeState(val);
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("languagechange", onLanguageChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("languagechange", onLanguageChange);
    };
  }, []);

  const setLangMode = useCallback((next) => {
    setLangModeState((current) => {
      const target = typeof next === "function" ? next(current) : next;
      if (target === "km" || target === "en") {
        try {
          localStorage.setItem(STORAGE_KEY, target);
          window.dispatchEvent(new Event("languagechange"));
        } catch {
          /* ignore */
        }
        return target;
      }
      return current;
    });
  }, []);

  return [langMode, setLangMode];
}

