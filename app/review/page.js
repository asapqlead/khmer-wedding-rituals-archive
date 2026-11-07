// app/review/page.js
import Link from "next/link";
import { createClient } from "../../utils/supabase/server.js";
import ReviewQueueClient from "../../components/ReviewQueueClient.js";

export const metadata = {
  title: "Review Queue | Traditional Khmer Wedding Rituals",
  description: "Review pending submissions for the Khmer Wedding Rituals archive.",
};

const UNAUTHORIZED_MESSAGE =
  "Access restricted. You do not have reviewer permissions to view this page. / អ្នកមិនមានសិទ្ធិចូលមើលទំព័រពិនិត្យនេះទេ។";

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
  maxWidth: "420px",
  textAlign: "center",
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Server-side reviewer check before loading any entries
  const { data: isReviewer, error: reviewerError } = await supabase.rpc("is_reviewer");

  if (reviewerError || isReviewer !== true) {
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
                ការចូលប្រើត្រូវបានបដិសេធ
                <span style={{ display: "block", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                  Access Restricted
                </span>
              </h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>
                {UNAUTHORIZED_MESSAGE}
              </p>
            </div>
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "10px 24px",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              ត្រឡប់ទៅបណ្ណសារ / Back to Archive
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Reviewers only: fetch pending entries ordered oldest first (created_at ASC)
  const { data: pendingEntries, error: entriesError } = await supabase
    .from("entries")
    .select(
      "id, title, title_khmer, sequence_order, summary, summary_khmer, meaning, photo_url, sacred_items, participants, source, created_at, status"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (entriesError) {
    console.error("Failed to load pending review entries:", entriesError.message);
  }

  return (
    <>
      <style>{glassStyles}</style>
      <main style={pageStyle}>
        <div style={cardStyle}>
          <ReviewQueueClient initialEntries={pendingEntries || []} />
        </div>
      </main>
    </>
  );
}
