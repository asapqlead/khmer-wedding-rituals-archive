// app/my-entries/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client.js";

const STATUS_LABELS = {
  pending:   { en: "Pending Review",  km: "រង់ចាំការពិនិត្យ" },
  published: { en: "Published",       km: "បានផ្សព្វផ្សាយ" },
  returned:  { en: "Returned",        km: "បានបញ្ជូនត្រឡប់" },
};

const STATUS_COLORS = {
  pending:   { bg: "rgba(250, 204, 21, 0.12)", border: "rgba(250, 204, 21, 0.3)", text: "#facc15" },
  published: { bg: "rgba(74, 222, 128, 0.12)", border: "rgba(74, 222, 128, 0.3)", text: "#4ade80" },
  returned:  { bg: "rgba(251, 146, 60, 0.12)", border: "rgba(251, 146, 60, 0.3)", text: "#fb923c" },
};

/* ── glass styles (same system as login / signup / contribute) ── */
const glassStyles = `
  .link-text {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 150ms ease;
  }
  .link-text:hover {
    color: #ffffff;
  }
`;

const pageStyle = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/login-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  color: "#ededed",
  fontFamily: "var(--font-sans)",
  padding: "60px 20px 40px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "720px",
  backgroundColor: "rgba(18, 18, 18, 0.55)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderTop: "1px solid rgba(255, 255, 255, 0.16)",
  borderRadius: "20px",
  padding: "40px 32px",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.2)",
};

const narrowCardStyle = {
  ...cardStyle,
  maxWidth: "440px",
  textAlign: "center",
};

function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const labels = STATUS_LABELS[status] || { en: status, km: status };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 500,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        lineHeight: 1.6,
        whiteSpace: "nowrap",
      }}
    >
      {labels.km} / {labels.en}
    </span>
  );
}

function EntryRow({ entry }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ color: "#ffffff", fontSize: 15, fontWeight: 500 }}>
          {entry.title}
        </span>
        {entry.title_khmer && (
          <span style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 2 }}>
            {entry.title_khmer}
          </span>
        )}
      </div>
      <StatusBadge status={entry.status} />
    </div>
  );
}

export default function MyEntriesPage() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from("entries")
          .select("id, title, title_khmer, status, sequence_order")
          .eq("owner", currentUser.id)
          .order("sequence_order", { ascending: true });

        if (error) {
          console.error("Failed to load my entries:", error.message);
        }
        setEntries(data || []);
      }

      setLoading(false);
    }

    init();
  }, [supabase]);

  /* ── Loading ── */
  if (loading) {
    return (
      <>
        <style>{glassStyles}</style>
        <main style={pageStyle}>
          <div style={narrowCardStyle}>
            <span
              className="font-mono-tag"
              style={{ color: "var(--accent-gold)", fontSize: 13, letterSpacing: "0.12em" }}
            >
              កំពុងដំណើរការ… / Loading…
            </span>
          </div>
        </main>
      </>
    );
  }

  /* ── Not logged in ── */
  if (!user) {
    return (
      <>
        <style>{glassStyles}</style>
        <main style={pageStyle}>
          <div style={narrowCardStyle}>
            <div style={{ marginBottom: 28 }}>
              <h1
                style={{
                  fontSize: 22,
                  margin: "0 0 10px 0",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.35,
                }}
              >
                ទាមទារសិទ្ធិចូលប្រើ
                <span style={{ display: "block", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                  Login Required
                </span>
              </h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6 }}>
                អ្នកត្រូវតែចូលគណនីដើម្បីមើលការបញ្ចូលរបស់អ្នក។
                <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                  You must be logged in to view your entries.
                </span>
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  padding: "12px 28px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                ចូលគណនី / Log In
              </Link>
              <Link
                href="/"
                className="link-text"
                style={{ padding: "12px 20px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center" }}
              >
                ← ត្រឡប់ទៅបណ្ណសារ / Back to Archive
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* ── Logged in: show entries ── */
  return (
    <>
      <style>{glassStyles}</style>
      <main style={pageStyle}>
        <div style={cardStyle}>
          <Link
            href="/"
            className="link-text"
            style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, fontWeight: 500 }}
          >
            ← ត្រឡប់ទៅបណ្ណសារ / Back to Archive
          </Link>

          <h1
            style={{
              fontSize: "clamp(22px, 3.5vw, 26px)",
              fontWeight: 600,
              color: "#FFFFFF",
              margin: "0 0 4px 0",
              lineHeight: 1.35,
            }}
          >
            ការបញ្ចូលរបស់ខ្ញុំ
            <span style={{ display: "block", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              My Entries
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 24px 0" }}>
            {user.email}
          </p>

          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 8 }} />

          {entries.length === 0 ? (
            <div style={{ padding: "32px 0", textAlign: "center" }}>
              <span style={{ fontSize: 28 }}>📜</span>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 12 }}>
                អ្នកមិនទាន់មានការបញ្ចូលទេ។
                <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                  You have no entries yet.
                </span>
              </p>
              <Link
                href="/contribute"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  padding: "10px 24px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                + បញ្ចូលពិធីការ / Contribute
              </Link>
            </div>
          ) : (
            <div>
              {entries.map((entry) => (
                <EntryRow key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
