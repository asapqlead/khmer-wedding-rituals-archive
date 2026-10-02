// app/contribute/page.js
"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client.js";
import ContributeForm from "../../components/ContributeForm.js";

function ContributeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editEntry, setEditEntry] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser && editId) {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("id", editId)
          .single();

        if (error || !data) {
          console.error("Failed to load entry for editing:", error);
        } else if (data.owner && data.owner !== currentUser.id) {
          setUnauthorized(true);
        } else {
          setEditEntry(data);
        }
      }

      setLoading(false);
    }

    init();
  }, [supabase, editId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <span className="font-mono-tag" style={{ color: "var(--accent-gold)", fontSize: 13, letterSpacing: "0.12em" }}>
          CHECKING ACCESS…
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          padding: "40px 32px",
          backgroundColor: "rgba(18, 18, 18, 0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
          textAlign: "center",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}
      >
        <span style={{ fontSize: 40 }}>🔒</span>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: "16px 0 8px" }}>
          Contributor Access Required
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          You must be logged in to contribute ceremony entries to the Khmer Wedding Rituals Archive.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/login"
            className="glass-btn"
            style={{ textDecoration: "none", padding: "10px 24px", width: "auto" }}
          >
            Log In
          </Link>
          <Link
            href="/"
            style={{ padding: "10px 20px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, display: "flex", alignItems: "center" }}
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div style={{ maxWidth: 500, margin: "80px auto", padding: 32, textAlign: "center", color: "#FFFFFF" }}>
        <h2 style={{ color: "#ff6b6b" }}>Access Denied</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 12 }}>
          You do not have permission to edit this entry. You can only edit your own entries.
        </p>
        <Link href="/" style={{ color: "var(--accent-gold-light)", display: "inline-block", marginTop: 20 }}>
          ← Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Link
            href="/"
            style={{ color: "var(--accent-gold-light)", textDecoration: "none", fontSize: 14, display: "inline-block", marginBottom: 12 }}
          >
            ← Back to Archive
          </Link>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
            {editEntry ? "Edit Ritual Ceremony" : "Contribute New Ritual"}
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 14, marginTop: 6 }}>
            {editEntry ? "Update your archival entry details below." : "Document a traditional Khmer wedding ceremony step for the living archive."}
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgba(22, 22, 22, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 20,
          padding: "36px 32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <ContributeForm initialData={editEntry} isEdit={Boolean(editEntry)} />
      </div>
    </div>
  );
}

export default function ContributePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#EDEDED",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--accent-gold)" }}>Loading...</div>}>
        <ContributeContent />
      </Suspense>
    </main>
  );
}
