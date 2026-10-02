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

  const handleDelete = async () => {
    const isKm = langMode === "km";
    const confirmMsg = isKm
      ? "តើអ្នកពិតជាចង់លុបពិធីនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។"
      : "Are you sure you want to delete this ritual entry? This action cannot be undone.";

    if (!window.confirm(confirmMsg)) return;

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
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error("Unexpected error during delete:", err);
      setDeleteError("That change wasn't saved.");
      setDeleting(false);
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
          onClick={handleDelete}
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
          {deleting ? (langMode === "km" ? "កំពុងលុប..." : "Deleting...") : (langMode === "km" ? "លុបពិធី" : "Delete Entry")}
        </button>
      </div>
    </div>
  );
}
