// app/glossary/page.js
import { redirect } from "next/navigation";

export default function GlossaryPage() {
  redirect("/?view=glossary");
}
