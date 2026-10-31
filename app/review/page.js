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
  maxWidth: "800px",
  backgroundColor: "rgba(18, 18, 18, 0.65)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "40px 32px",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
};

export default async function ReviewPage() {
  const supabase = await createClient();

  // Server-side reviewer check before loading any entries
  const { data: isReviewer, error: reviewerError } = await supabase.rpc("is_reviewer");

  if (reviewerError || isReviewer !== true) {
    return (
      <main style={pageStyle}>
        <div style={{ ...cardStyle, maxWidth: "480px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "16px" }}>🔒</div>
          <p style={{ margin: "0 0 20px", fontSize: "15px", lineHeight: 1.6, color: "#fca5a5" }}>
            {UNAUTHORIZED_MESSAGE}
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Back to Archive / ត្រឡប់ទៅបណ្ណសារ
          </Link>
        </div>
      </main>
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
    <main style={pageStyle}>
      <div style={cardStyle}>
        <ReviewQueueClient initialEntries={pendingEntries || []} />
      </div>
    </main>
  );
}
