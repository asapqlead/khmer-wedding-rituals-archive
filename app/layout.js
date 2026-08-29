// app/layout.js
import collection from "../collection.config.js";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: `${collection.name} — Living Archival Collection`,
  description: `${collection.description} Curated by ${collection.curator}. Source: ${collection.source}`,
  keywords: [
    "Khmer Wedding Rituals",
    "Cambodian Traditions",
    "Living Archive",
    "Hai Goer",
    "Gaat Sah",
    "Sompeas Ptem",
    "Bongvel Popil",
    "Chang Dai",
    "Phat Phka Sla",
    "Preah Thong Neang Neak"
  ],
  authors: [{ name: collection.curator }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body style={{ backgroundColor: "#141414", color: "#F2F2F0" }}>
        {children}
      </body>
    </html>
  );
}
