// components/CeremonyOwnerActions.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";

export default function CeremonyOwnerActions({ ceremony, langMode }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [supabase] = useState(() => createClient());
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isClosingConfirm, setIsClosingConfirm] = useState(false);
  const isKm = langMode === "km";

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, [supabase]);

  if (!user || !ceremony?.owner || user.id !== ceremony.owner) {
    return null;
  }

  const handleEdit = () => {
    router.push(`/contribute?edit=${ceremony.id}`);
  };

  const handleDeleteClick = () => {
    setIsClosingConfirm(false);
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setIsClosingConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
      setIsClosingConfirm(false);
    }, 150); // fast exit (150ms)
  };

  const confirmDelete = async () => {
    setDeleting(true);
    setDeleteError("");

    try {
      const { data, error } = await supabase
        .from("entries")
        .delete()
        .eq("id", ceremony.id)
        .select();

      // Check that a row actually came back (Part 2 requirement)
      if (error || !data || data.length === 0) {
        console.error("Delete operation rejected by policy or failed:", error || "No row returned");
        setDeleteError(isKm ? "ការផ្លាស់ប្តូរមិនត្រូវបានរក្សាទុកទេ" : "That change wasn't saved.");
        setDeleting(false);
        setShowConfirm(false);
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error("Unexpected error during delete:", err);
      setDeleteError("That change wasn't saved.");
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14 }}>
      {deleteError && <span style={{ color: "#ff6b6b", fontSize: 12 }}>{deleteError}</span>}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          onClick={handleEdit}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          {langMode === "km" ? "កែសម្រួល" : "Edit Entry"}
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={deleting}
          style={{
            background: "rgba(255, 107, 107, 0.15)",
            border: "1px solid rgba(255, 107, 107, 0.3)",
            color: "#ff8787",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 13,
            cursor: deleting ? "not-allowed" : "pointer",
            fontWeight: 500,
          }}
        >
          {deleting ? (isKm ? "កំពុងលុប..." : "Deleting...") : (isKm ? "លុបពិធី" : "Delete Entry")}
        </button>
      </div>

      {showConfirm && (
        <div 
          className={`modal-overlay ${isClosingConfirm ? 'closing' : ''}`}
          onClick={closeConfirm}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.85)", // Darkened background
            backdropFilter: "blur(4px)",
            padding: 20
          }}
        >
          <style>{`
            .confirm-btn {
              padding: 8px 16px;
              min-height: 36px; /* Adjusted for desktop-first minimal design */
              border-radius: 6px;
              font-weight: 500;
              font-size: 14px;
              transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease, box-shadow 160ms ease;
            }
            .confirm-btn:active:not(:disabled) {
              transform: scale(0.97);
            }
            .confirm-btn:focus-visible {
              outline: none;
              box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
            }
            
            .confirm-btn-cancel {
              background-color: transparent;
              color: #ffffff;
              border: 1px solid rgba(255, 255, 255, 0.15);
            }
            .confirm-btn-cancel:hover:not(:disabled) {
              background-color: rgba(255, 255, 255, 0.05);
            }

            .confirm-btn-delete {
              background-color: #ef4444; /* matching screenshot red */
              color: #ffffff;
              border: none;
            }
            .confirm-btn-delete:hover:not(:disabled) {
              background-color: #dc2626;
            }
            .confirm-btn-delete:focus-visible {
              box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
            }

            .modal-overlay {
              opacity: 1;
              transition: opacity 250ms cubic-bezier(0.32, 0.72, 0, 1);
            }
            .modal-overlay.closing {
              opacity: 0;
              transition-duration: 150ms;
              transition-timing-function: ease;
            }

            .modal-content {
              opacity: 1;
              transform: scale(1);
              transition: opacity 250ms cubic-bezier(0.32, 0.72, 0, 1), transform 250ms cubic-bezier(0.32, 0.72, 0, 1);
            }
            .modal-content.closing {
              opacity: 0;
              transform: scale(0.97);
              transition: opacity 150ms ease, transform 150ms ease;
            }

            @starting-style {
              .modal-overlay { opacity: 0; }
              .modal-content { opacity: 0; transform: scale(0.97); }
            }
          `}</style>
          <div 
            className={`modal-content ${isClosingConfirm ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              backgroundColor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              fontFamily: isKm ? "var(--font-khmer-sans)" : "var(--font-sans)"
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2 style={{ fontSize: "18px", margin: "0 0 8px 0", fontWeight: "600", color: "#ffffff" }}>
                {isKm ? "លុបពិធីនេះ?" : "Delete this entry?"}
              </h2>
              <p style={{ margin: 0, color: "#888888", fontSize: "14px", lineHeight: 1.5 }}>
                {isKm
                  ? "តើអ្នកពិតជាចង់លុបពិធីនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។"
                  : "Are you sure you want to delete this ritual entry? This action cannot be undone."}
              </p>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
              <button
                type="button"
                className="confirm-btn confirm-btn-cancel"
                onClick={closeConfirm}
                disabled={deleting}
                style={{ cursor: deleting ? "not-allowed" : "pointer" }}
              >
                {isKm ? "បោះបង់" : "Cancel"}
              </button>
              <button
                type="button"
                className="confirm-btn confirm-btn-delete"
                onClick={confirmDelete}
                disabled={deleting}
                style={{
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? (isKm ? "កំពុងលុប..." : "Deleting...") : (isKm ? "លុប" : "Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
