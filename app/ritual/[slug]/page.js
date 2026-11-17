// app/ritual/[slug]/page.js
import { redirect } from "next/navigation";

export default async function RitualPage({ params }) {
  const { slug } = await params;
  redirect(`/?ritual=${encodeURIComponent(slug || "")}`);
}
