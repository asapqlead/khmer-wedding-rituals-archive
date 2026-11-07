// components/ReviewActionButtons.js
"use client";
import { useState } from "react";
import { createClient } from "../utils/supabase/client.js";
import ReviewModal from "./ReviewModal.js";

const FAILURE_MESSAGE =
  "Unable to update entry. It may have already been reviewed or permission was denied. / មិនអាចធ្វើបច្ចុប្បន្នភាពបានទេ។ ទិន្នន័យនេះអាចត្រូវបានពិនិត្យរួចហើយ។";

const CONFIRM_COPY = {
  published: {
    title: "បញ្ជាក់ការផ្សព្វផ្សាយ / Confirm Publish",
    message: "តើអ្នកប្រាកដជាចង់ផ្សព្វផ្សាយពិធីការនេះទៅកាន់បណ្ណសារសាធារណៈមែនទេ? / Are you sure you want to publish this ceremony entry to the public archive?",
    label: "Publish / ផ្សព្វផ្សាយ",
    variant: "publish",
  },
  returned: {
    title: "បញ្ជាក់ការបញ្ជូនត្រឡប់ / Confirm Return",
    message: "តើអ្នកប្រាកដជាចង់បញ្ជូនពិធីការនេះត្រឡប់ទៅអ្នកចូលរួមចំណែកវិញមែនទេ? / Are you sure you want to return this ceremony entry to the contributor for edits?",
    label: "Return / បញ្ជូនត្រឡប់",
    variant: "return",
  },
};

const actionStyles = `
  .review-btn {
    padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; font-family: inherit;
    transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease;
  }
  .review-btn:active:not(:disabled) { transform: scale(0.97); }
  .review-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
`;

export default function ReviewActionButtons({ entryId, onReviewSuccess, onError }) {
  const [supabase] = useState(() => createClient());
  const [pendingAction, setPendingAction] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loadingDecision, setLoadingDecision] = useState(null);

  const handleConfirmDecision = async () => {
    const decision = pendingAction;
    setLoadingDecision(decision);
    onError?.("");
    try {
      const { data, error } = await supabase.rpc("review_entry", { entry_id: entryId, decision });
      if (!error && data === true) {
        setPendingAction(null);
        onReviewSuccess(entryId);
        return;
      }

      setPendingAction(null);
      let alertMsg = FAILURE_MESSAGE;
      const { data: eData } = await supabase.from("entries").select("status").eq("id", entryId).maybeSingle();
      if (eData?.status === "published") {
        alertMsg = "ពិធីការនេះត្រូវបានផ្សព្វផ្សាយរួចរាល់ហើយ។ / This entry has already been published.";
      } else if (eData?.status === "returned") {
        alertMsg = "ពិធីការនេះត្រូវបានបញ្ជូនត្រឡប់រួចរាល់ហើយ។ / This entry has already been returned.";
      }
      setAlertMessage(alertMsg);
      onError?.(FAILURE_MESSAGE);
    } catch {
      setPendingAction(null);
      setAlertMessage(FAILURE_MESSAGE);
      onError?.(FAILURE_MESSAGE);
    } finally {
      setLoadingDecision(null);
    }
  };

  const confirmInfo = CONFIRM_COPY[pendingAction];

  return (
    <>
      <style>{actionStyles}</style>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button type="button" onClick={() => setPendingAction("published")} className="review-btn" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
          Publish / ផ្សព្វផ្សាយ
        </button>
        <button type="button" onClick={() => setPendingAction("returned")} className="review-btn" style={{ backgroundColor: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
          Return / បញ្ជូនត្រឡប់
        </button>
      </div>

      {confirmInfo && (
        <ReviewModal
          isOpen={true}
          title={confirmInfo.title}
          message={confirmInfo.message}
          confirmLabel={confirmInfo.label}
          confirmVariant={confirmInfo.variant}
          isLoading={!!loadingDecision}
          onConfirm={handleConfirmDecision}
          onClose={() => setPendingAction(null)}
        />
      )}

      <ReviewModal
        isOpen={!!alertMessage}
        title="ពិធីការត្រូវបានពិនិត្យរួចហើយ / Entry Already Reviewed"
        message={alertMessage}
        onClose={() => setAlertMessage(null)}
      />
    </>
  );
}
