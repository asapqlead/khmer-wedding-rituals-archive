// components/HeaderAuth.js
"use client";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client.js";
import Link from "next/link";

export default function HeaderAuth({ langMode, isMobile }) {
  const [user, setUser] = useState(null);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      {user ? (
        <>
          <span className="lang-text" style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "13px", fontFamily: "var(--font-sans)", padding: "4px 8px" }}>
            {user.email}
          </span>
          <button 
            type="button" 
            onClick={handleLogout} 
            className="dropdown-item lang-text"
            style={{ textAlign: "left", width: "100%" }}
          >
            {langMode === "km" ? "ចាកចេញ" : "Logout"}
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="dropdown-item lang-text" style={{ textAlign: "left", width: "100%", textDecoration: "none" }}>
            {langMode === "km" ? "ចូលគណនី" : "Login"}
          </Link>
          <Link href="/signup" className="dropdown-item lang-text" style={{ textAlign: "left", width: "100%", textDecoration: "none" }}>
            {langMode === "km" ? "ចុះឈ្មោះ" : "Sign Up"}
          </Link>
        </>
      )}
    </div>
  );
}
