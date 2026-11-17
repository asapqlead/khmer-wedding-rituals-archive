// app/about/page.js
import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/?view=about");
}
