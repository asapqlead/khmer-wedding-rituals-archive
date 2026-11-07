// components/ReviewModal.js
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalStyles = `
  .modal-action-btn {
    padding: 9px 20px;
    min-width: 120px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1),
                background-color 150ms ease,
                color 150ms ease,
                border-color 150ms ease,
                opacity 150ms ease;
  }
  .modal-action-btn:active:not(:disabled) {
    transform: scale(0.97);
  }
  .modal-action-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
  .modal-action-btn.cancel {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .modal-action-btn.cancel:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }
  .modal-action-btn.danger {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.35);
  }
  .modal-action-btn.danger:hover:not(:disabled) {
    background-color: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.5);
    color: #ffffff;
  }
  .modal-action-btn.return {
    background-color: rgba(251, 146, 60, 0.15);
    color: #fb923c;
    border: 1px solid rgba(251, 146, 60, 0.3);
  }
  .modal-action-btn.return:hover:not(:disabled) {
    background-color: rgba(251, 146, 60, 0.25);
    border-color: rgba(251, 146, 60, 0.5);
  }
  .modal-action-btn.default {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid transparent;
  }
  .modal-action-btn.default:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
`;

export default function ReviewModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = "បោះបង់ / Cancel",
  onConfirm,
  onClose,
  isLoading = false,
  confirmVariant = "publish",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !mounted) return null;

  const variantClass =
    confirmVariant === "delete"
      ? "danger"
      : confirmVariant === "return"
      ? "return"
      : "default";

  return createPortal(
    <>
      <style>{modalStyles}</style>
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isLoading) onClose();
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            backgroundColor: "rgba(22, 22, 22, 0.96)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 16,
            padding: "28px 24px 24px",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
            color: "#ededed",
            fontFamily: "var(--font-sans)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 600, color: "#ffffff" }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgba(255, 255, 255, 0.65)" }}>
            {message}
          </p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {onConfirm && (
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="modal-action-btn cancel"
              >
                {cancelLabel}
              </button>
            )}

            <button
              type="button"
              disabled={isLoading}
              onClick={onConfirm || onClose}
              className={`modal-action-btn ${variantClass}`}
            >
              {isLoading ? "Processing…" : confirmLabel || "យល់ព្រម / OK"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
