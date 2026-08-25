// app/layout.js
import collection from "../collection.config.js";
import "./globals.css";

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: `${collection.description} Curated by ${collection.curator}.`,
  keywords: ["Khmer wedding", "Cambodian traditions", "Pithei Chang Dai", "Hai Goer", "Gaat Sah", "Bongvel Popil", "Khmer Living Archive"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body>
        {children}
      </body>
    </html>
  );
}
