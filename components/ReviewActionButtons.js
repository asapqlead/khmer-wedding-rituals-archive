// components/ReviewActionButtons.js
"use client";
import { useState } from "react";
import { createClient } from "../utils/supabase/client.js";

const FAILURE_MESSAGE =
  "Unable to update entry. It may have already been reviewed or permission was denied. / មិនអាចធ្វើបច្ចុប្បន្នភាពបានទេ។ ទិន្នន័យនេះអាចត្រូវបានពិនិត្យរួចហើយ។";

export default function ReviewActionButtons({ entryId, onReviewSuccess, onError }) {
  const [supabase] = useState(() => createClient());
  const [loadingDecision, setLoadingDecision] = useState(null);

  const handleDecision = async (decision) => {
    setLoadingDecision(decision);
    onError("");

    try {
      // Call RPC review_entry — do NOT update entries table directly
      const { data, error } = await supabase.rpc("review_entry", {
        entry_id: entryId,
        decision: decision,
      });

      // review_entry returns boolean: success requires data === true
      if (!error && data === true) {
        onReviewSuccess(entryId);
      } else {
        onError(FAILURE_MESSAGE);
      }
    } catch (err) {
      console.error("review_entry failed:", err);
      onError(FAILURE_MESSAGE);
    } finally {
      setLoadingDecision(null);
    }
  };

  const btnStyle = {
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: loadingDecision ? "not-allowed" : "pointer",
    border: "none",
    transition: "opacity 150ms ease, transform 150ms ease",
    opacity: loadingDecision ? 0.6 : 1,
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
      <button
        type="button"
        disabled={!!loadingDecision}
        onClick={() => handleDecision("published")}
        style={{
          ...btnStyle,
          backgroundColor: "#22c55e",
          color: "#0a2612",
        }}
      >
        {loadingDecision === "published" ? "កំពុងដំណើរការ… / Processing…" : "Publish / ផ្សព្វផ្សាយ"}
      </button>

      <button
        type="button"
        disabled={!!loadingDecision}
        onClick={() => handleDecision("returned")}
        style={{
          ...btnStyle,
          backgroundColor: "#f97316",
          color: "#270d03",
        }}
      >
        {loadingDecision === "returned" ? "កំពុងដំណើរការ… / Processing…" : "Return / បញ្ជូនត្រឡប់"}
      </button>
    </div>
  );
}
