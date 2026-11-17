// utils/slug.js
// URL slug helper for deep-linking ceremony entries.

export function toSlug(title) {
  return (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findCeremonyIndex(items, param) {
  if (!param || !items?.length) return -1;
  const decoded = decodeURIComponent(param).toLowerCase().trim();
  const bySlug = items.findIndex((c) => toSlug(c.titleEn) === decoded);
  if (bySlug !== -1) return bySlug;
  const byOrder = items.findIndex((c) => String(c.order) === decoded);
  if (byOrder !== -1) return byOrder;
  return items.findIndex((c) => String(c.id).toLowerCase() === decoded);
}
