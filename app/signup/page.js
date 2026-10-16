"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function SignupPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .glass-input {
          padding: 12px 16px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-radius: 10px;
          font-size: 15px;
          font-family: var(--font-khmer-sans), var(--font-sans);
          outline: none;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
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
          font-family: var(--font-khmer-sans), var(--font-sans);
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
      `}</style>
      <main
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ededed",
          fontFamily: "var(--font-khmer-sans), var(--font-sans)",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "rgba(18, 18, 18, 0.65)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderTop: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Link
              href="/"
              className="link-text"
              style={{
                fontSize: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                lineHeight: 1,
              }}
              aria-label="Back to Archive"
            >
              ←
            </Link>
          </div>

          <div style={{ marginBottom: "28px", textAlign: "center" }}>
            <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600", color: "#ffffff", lineHeight: 1.35 }}>
              ចុះឈ្មោះចូលរួមចំណែក
              <span style={{ display: "block", fontSize: "16px", fontWeight: "400", color: "rgba(255, 255, 255, 0.7)", marginTop: 4 }}>
                Join the Archive
              </span>
            </h1>
          </div>

          <form
            onSubmit={handleSignup}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {error && (
              <div style={{ color: "#ff6b6b", fontSize: "13px", fontWeight: "500", textAlign: "center", lineHeight: 1.5, backgroundColor: "rgba(255, 107, 107, 0.1)", padding: "8px 12px", borderRadius: 8 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="email" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.9)" }}>
                អ៊ីមែល / Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="glass-input"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="password" style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.9)" }}>
                ពាក្យសម្ងាត់ / Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="glass-input"
              />
              <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", marginTop: "-2px" }}>
                យ៉ាងហោចណាស់ ៨ តួអក្សរ / Must be at least 8 characters.
              </span>
            </div>

            <button type="submit" disabled={loading} className="glass-btn">
              {loading ? "កំពុងចុះឈ្មោះ... / Signing up..." : "ចុះឈ្មោះ / Sign Up"}
            </button>
          </form>

          <div style={{ marginTop: "24px", fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", textAlign: "center", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
            <span>មានគណនីរួចហើយមែនទេ? / Already have an account?</span>
            <Link href="/login" className="link-text" style={{ fontWeight: "600", color: "#ffffff", textDecoration: "underline" }}>
              ចូលគណនី / Log In
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
