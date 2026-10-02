// app/contribute/page.js
"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client.js";
import ContributeForm from "../../components/ContributeForm.js";

/* ── shared glass styles (same system as login/signup) ── */
const glassStyles = `
  .glass-input {
    padding: 12px 16px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
    width: 100%;
  }
  .glass-input:focus {
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(255, 255, 255, 0.08);
  }
  .glass-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  .glass-btn {
    padding: 12px 16px;
    background-color: #ffffff;
    color: #000000;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease, opacity 150ms ease;
    width: 100%;
    margin-top: 8px;
  }
  .glass-btn:hover {
    background-color: #f0f0f0;
  }
  .glass-btn:active {
    transform: scale(0.97);
  }
  .glass-btn:disabled {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
  }
  .link-text {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 150ms ease;
  }
  .link-text:hover {
    color: #ffffff;
  }
`;

/* ── full-viewport wrapper style (matches login/signup) ── */
const pageStyle = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/login-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ededed",
  fontFamily: "var(--font-sans)",
  padding: "40px 20px",
};

/* ── shared glass card wrapper ── */
const cardStyle = {
  width: "100%",
  maxWidth: "780px",
  backgroundColor: "rgba(18, 18, 18, 0.55)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderTop: "1px solid rgba(255, 255, 255, 0.16)",
  borderRadius: "20px",
  padding: "40px 32px",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.2)",
};

/* ── narrow card for status messages ── */
const narrowCardStyle = {
  ...cardStyle,
  maxWidth: "440px",
  textAlign: "center",
};

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

  /* ── Loading state ── */
  if (loading) {
    return (
      <div style={narrowCardStyle}>
        <span
          className="font-mono-tag"
          style={{ color: "var(--accent-gold)", fontSize: 13, letterSpacing: "0.12em" }}
        >
          CHECKING ACCESS…
        </span>
      </div>
    );
  }

  /* ── Not logged in state ── */
  if (!user) {
    return (
      <div style={narrowCardStyle}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "28px",
              margin: "0 0 8px 0",
              fontWeight: "600",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Contributor Access Required
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "15px",
              letterSpacing: "0.01em",
              lineHeight: 1.6,
            }}
          >
            You must be logged in to contribute ceremony entries to the Khmer
            Wedding Rituals Archive.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/login"
            className="glass-btn"
            style={{
              textDecoration: "none",
              padding: "12px 28px",
              width: "auto",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Log In
          </Link>
          <Link
            href="/"
            className="link-text"
            style={{
              padding: "12px 20px",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  /* ── Unauthorized state ── */
  if (unauthorized) {
    return (
      <div style={narrowCardStyle}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "28px",
              margin: "0 0 8px 0",
              fontWeight: "600",
              color: "#ff6b6b",
              letterSpacing: "-0.03em",
            }}
          >
            Access Denied
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "15px",
              lineHeight: 1.6,
            }}
          >
            You do not have permission to edit this entry. You can only edit your
            own entries.
          </p>
        </div>
        <Link
          href="/"
          className="link-text"
          style={{ fontWeight: 600, color: "#ffffff", fontSize: 14 }}
        >
          ← Return to Archive
        </Link>
      </div>
    );
  }

  /* ── Authenticated: show the contribute form ── */
  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Link
          href="/"
          className="link-text"
          style={{
            fontSize: 13,
            display: "inline-block",
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          ← Back to Archive
        </Link>
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 28px)",
            fontWeight: 600,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {editEntry ? "Edit Ritual Ceremony" : "Contribute New Ritual"}
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 15,
            marginTop: 6,
            letterSpacing: "0.01em",
          }}
        >
          {editEntry
            ? "Update your archival entry details below."
            : "Document a traditional Khmer wedding ceremony step for the living archive."}
        </p>
      </div>

      {/* Thin divider matching the login card's border language */}
      <div
        style={{
          height: 1,
          background: "rgba(255, 255, 255, 0.08)",
          marginBottom: 28,
        }}
      />

      <ContributeForm initialData={editEntry} isEdit={Boolean(editEntry)} />
    </div>
  );
}

export default function ContributePage() {
  return (
    <>
      <style>{glassStyles}</style>
      <main style={pageStyle}>
        <Suspense
          fallback={
            <div style={narrowCardStyle}>
              <span
                className="font-mono-tag"
                style={{ color: "var(--accent-gold)", fontSize: 13, letterSpacing: "0.12em" }}
              >
                Loading…
              </span>
            </div>
          }
        >
          <ContributeContent />
        </Suspense>
      </main>
    </>
  );
}
