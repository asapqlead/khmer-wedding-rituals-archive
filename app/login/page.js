"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "320px",
          gap: "16px",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: "0 0 16px 0", fontWeight: "normal" }}>Login</h1>
        
        {error && (
          <div style={{ color: "#ff5555", fontSize: "14px", marginBottom: "8px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="email" style={{ fontSize: "14px", color: "#888888" }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{
              padding: "12px",
              backgroundColor: "#1e1e1e",
              border: "1px solid #333333",
              color: "#ffffff",
              borderRadius: "4px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="password" style={{ fontSize: "14px", color: "#888888" }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{
              padding: "12px",
              backgroundColor: "#1e1e1e",
              border: "1px solid #333333",
              color: "#ffffff",
              borderRadius: "4px",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <div style={{ marginTop: "16px", fontSize: "14px", color: "#888888", textAlign: "center" }}>
          Don't have an account? <a href="/signup" style={{ color: "#ffffff", textDecoration: "none" }}>Sign up</a>
        </div>
      </form>
    </main>
  );
}
