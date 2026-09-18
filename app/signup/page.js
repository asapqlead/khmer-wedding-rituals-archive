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

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/");
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
          height: "100vh",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ededed",
          fontFamily: "var(--font-sans)",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(18, 18, 18, 0.55)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderTop: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <h1 style={{ fontSize: "28px", margin: "0 0 8px 0", fontWeight: "600", color: "#ffffff", letterSpacing: "-0.03em" }}>
              Join us
            </h1>
            <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.7)", fontSize: "15px", letterSpacing: "0.01em" }}>
              Create an account to get started.
            </p>
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
              <div style={{ color: "#ff6b6b", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="email" style={{ fontSize: "14px", fontWeight: "500", color: "rgba(255, 255, 255, 0.9)" }}>
                Email
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
              <label htmlFor="password" style={{ fontSize: "14px", fontWeight: "500", color: "rgba(255, 255, 255, 0.9)" }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="glass-input"
              />
              <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.5)", marginTop: "-4px" }}>
                Must be at least 8 characters.
              </span>
            </div>

            <button type="submit" disabled={loading} className="glass-btn">
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div style={{ marginTop: "28px", fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}>
            Already have an account? <Link href="/login" className="link-text" style={{ fontWeight: "600", color: "#ffffff" }}>Log in</Link>
          </div>
        </div>
      </main>
    </>
  );
}
