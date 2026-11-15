# Traditional Khmer Wedding Rituals — Living Archive

## 1. What this is

This is a living archive of traditional Khmer wedding rituals, built by Chhom Alead for ICT 340 at AUPP. The knowledge comes from the curator's mother, who has been through and helped organize traditional Khmer wedding ceremonies. [collection.config.js] Anyone can browse the published rituals and a glossary of 18 sacred terms without logging in. Contributors can sign up, submit new ceremony entries with photos, and manage their own entries. A reviewer checks pending submissions and either publishes them to the archive or returns them for edits.

## 2. Who it's for

People in Cambodia who care about preserving wedding traditions. Here is what the code actually does for them:

- **Khmer first.** The root `<html>` tag is set to `lang="km"`. [app/layout.js, line 30] Two Khmer fonts are loaded: Kantumruy Pro (sans) and Noto Serif Khmer (serif). [app/globals.css, line 2] Every page that a visitor or contributor uses has a language switcher (EN / ខ្មែរ) that persists the choice to localStorage and synchronizes across tabs. [components/LanguageSwitcher.js, hooks/useLanguage.js] All form labels, validation errors, status badges, confirmation modals, empty states, and access-denied messages are bilingual English/Khmer. [components/ContributeForm.js, utils/validation.js, app/my-entries/page.js, components/ReviewQueueClient.js, components/ReviewUnauthorizedView.js]
- **Phones first.** The layout uses `<meta name="viewport" content="width=device-width, initial-scale=1">`. [app/layout.js, lines 5–8] A `useIsMobile` hook switches between a horizontal desktop gallery and a vertical mobile view at 768px. [components/useIsMobile.js, app/page.js] CSS breakpoints at 1024px, 768px, and 480px adjust the gallery track padding and font sizes. [app/globals.css, lines 468–500] The mobile hamburger menu and overlay are touch-friendly with 44×44px tap targets. [components/MobileMenuOverlay.js, components/GalleryHeader.js]
- **Slow connections.** The app shows a "LOADING ARCHIVE…" state while entries load from Supabase, so nothing looks broken on a slow network. [app/page.js, lines 142–146] Photos are validated to be under 5 MB before upload. [utils/validation.js, line 29] The contribute form auto-saves drafts to localStorage every 600ms so work is not lost on a refresh or bad connection. [hooks/useDraftProtection.js]
- **Sources are named and credited.** Each entry has an optional `source` field. [components/ContributeForm.js, lines 557–570] The contributor's name is displayed on every ceremony detail view. [components/CeremonyContributorBadge.js] The archive-wide source credit ("my mother, who have been through and helped organize traditional Khmer wedding ceremonies") is shown on the About page. [components/AboutView.js, line 81, reading from collection.config.js]

## 3. How it works

**Stack:** Next.js 15 (App Router) on Vercel, Supabase for authentication, database, and photo storage. Five dependencies total: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`. [package.json]

**Tables** (based on code queries and the attack-gate script):

- **`entries`** — stores ceremony data. Columns used in code: `id` (uuid), `created_at`, `owner` (uuid, references `auth.users`), `title`, `title_khmer`, `sequence_order`, `translation_en`, `summary`, `meaning`, `summary_khmer`, `participants` (jsonb), `sacred_items` (jsonb), `regional_notes_en`, `regional_notes_khmer`, `source`, `photo_url`, `status`. [components/useEntries.js, components/ContributeForm.js, scripts/attack-gate.mjs]
- **`reviewers`** — stores user IDs of users who have review permissions. The only column referenced in code is `user_id`. [scripts/attack-gate.mjs, attack 4]

**Three entry statuses:** `pending`, `published`, `returned`. [app/my-entries/page.js, lines 10–14] New entries default to `pending` in the database (the form never sends a status field on insert). [components/ContributeForm.js, line 193] The home page only shows entries where `status = 'published'`. [components/useEntries.js, line 51]

**Database functions** (called via `supabase.rpc()`):

- **`review_entry(entry_id, decision)`** — called by reviewers to publish or return a pending entry. Returns `true` on success, `false` if the caller is not a reviewer or the entry is not pending. [components/ReviewActionButtons.js, line 33] The code never calls `.from('entries').update()` to change status in the review flow. [LAB11_TASKS.md, components/ReviewActionButtons.js]
- **`is_reviewer()`** — returns `true` if the current user is in the `reviewers` table, `false` otherwise. Called server-side on `/review` before any entries are fetched. [app/review/page.js, line 65] Also called client-side to conditionally show the "Review Queue" link in the header. [components/GalleryHeader.js, line 33]

**RLS policies** (based on the audit report findings and attack-gate test results; no SQL migration files exist in the repository):

- **SELECT on `entries`:** Anonymous users can read only `published` entries. Logged-in users can additionally read their own entries regardless of status. [Verified by attack-gate.mjs attack 5: signing out and querying `status != 'published'` returns `[]`. Verified by app/my-entries/page.js querying `.eq('owner', currentUser.id)` which returns all statuses for the owner.]
- **INSERT on `entries`:** Authenticated users can insert rows only where `owner = auth.uid()`. The `WITH CHECK` clause rejects inserts where the owner column does not match the caller's JWT. Inserting with `status: 'published'` is blocked. [scripts/attack-gate.mjs, attacks 1 and 3; AUDIT_REPORT.md, section 2.1]
- **UPDATE on `entries`:** Users can update only rows where `owner = auth.uid()`. Users cannot set `status` to `published` via direct update. [scripts/attack-gate.mjs, attack 2; AUDIT_REPORT.md, section 2.2]
- **DELETE on `entries`:** Users can delete only rows where `owner = auth.uid()`. [AUDIT_REPORT.md, section 2.2; components/CeremonyOwnerActions.js uses `.delete().eq('id', ceremony.id).select()` and checks `data.length`]
- **INSERT on `reviewers`:** Blocked for all users via RLS. A regular user cannot add themselves to the reviewers table. [scripts/attack-gate.mjs, attack 4]
- **Storage (`photos` bucket):** Contributors can upload only into their own folder (`<user_id>/...`) and delete only their own photos. The bucket is public for reading (photos are served via public URLs). [AUDIT_REPORT.md, section 1.4]

> **Note:** There are no SQL migration files tracked in this repository. The policies above were verified through live testing (the attack-gate script and audit report), not from SQL source files. I cannot point to the exact SQL text of each policy. [AUDIT_REPORT.md, section 2.1]

## 4. Security decisions

### What `review_entry` does and why it lives in the database

`review_entry(entry_id, decision)` is a Postgres function called via `supabase.rpc()`. It checks that the caller is in the `reviewers` table and that the target entry currently has `status = 'pending'` before updating the status to `published` or `returned`. It returns `true` on success and `false` on any failure (not a reviewer, entry not pending, entry does not exist). [components/ReviewActionButtons.js, line 33; scripts/attack-gate.mjs, attack 3]

It lives in the database because status changes to `published` must never come from a client-side `.update()` call. If publishing were a regular `UPDATE`, any authenticated user could open the browser console and set their own entry to `published`, bypassing the review queue entirely. By putting the logic in a database function, the check "is this user actually a reviewer?" happens inside Postgres where it cannot be tampered with. The client code never calls `.from('entries').update({ status: ... })` in the review flow — only `supabase.rpc('review_entry', ...)`. [LAB11_TASKS.md, phase 1; components/ReviewActionButtons.js]

### What a hidden Publish button does and does not protect

The Publish button on `/review` is only shown to users where `is_reviewer()` returns `true`. The server-side page check in `app/review/page.js` calls `is_reviewer()` before fetching any pending entries, so a non-reviewer never receives pending entry data in the page props. [app/review/page.js, lines 64–76]

**What this protects:** A regular contributor never sees the review queue UI or pending entries that are not their own. The Publish button is not rendered in the DOM, so there is nothing to click.

**What this does not protect:** Hiding the UI is not security. A determined user could open the browser console and call `supabase.rpc('review_entry', { entry_id: '...', decision: 'published' })` directly. The actual protection comes from the database function `review_entry`, which checks the `reviewers` table. The attack-gate script proves this: a non-reviewer calling the RPC gets `data: false`. [scripts/attack-gate.mjs, attack 3]

### (a) What a returned entry says

When a reviewer returns an entry, its status changes to `returned`. The contributor sees "Returned / បានបញ្ជូនត្រឡប់" as an orange badge on `/my-entries`. [app/my-entries/page.js, lines 11–19] The contributor can then edit and resubmit the entry, which sets the status back to `pending` so it re-enters the review queue. [components/ContributeForm.js, lines 162–168] UNSURE whether a reviewer can attach a note explaining why the entry was returned — the code does not currently send or display a `review_note` field (this is listed as an optional bonus in LAB11_TASKS.md, lines 173–181, and was not implemented).

### (b) Whether reviewers can take down published entries

The review queue page only fetches entries where `status = 'pending'`. [app/review/page.js, line 84] Once an entry is published, it no longer appears in the review queue. The `review_entry` function returns `false` if the entry's status is not `pending`. [scripts/attack-gate.mjs, attack 3 — the function checks current status] So a reviewer cannot use the review queue to un-publish an already-published entry. UNSURE whether a reviewer could take down a published entry through some other mechanism outside this codebase (e.g., the Supabase dashboard or a direct SQL query with elevated privileges).

### (c) What search shows a contributor about their own pending entries

The home page gallery uses `useEntries.js`, which queries `.eq('status', 'published')`. [components/useEntries.js, line 51] This means a contributor's pending or returned entries never appear on the home page, even to the contributor themselves. Contributors can see all their own entries (pending, published, returned) only on the `/my-entries` page, which filters by `owner = currentUser.id`. [app/my-entries/page.js, lines 207–211] The glossary is a static local data file and does not show entries at all. [data/glossary.js]

## 5. AI use

| Model | Task | What I kept or rewrote | How I checked |
| :--- | :--- | :--- | :--- |
| Gemini 3.8 Flash | Supabase client setup with `@supabase/ssr` cookies and environment variables | Kept browser and server client architecture; rejected hardcoded fallback placeholder keys to ensure secrets stayed in `.env.local` | Verified `npm run dev` started cleanly without hardcoded strings and tested auth state |
| Gemini 3.8 Flash | Build `/signup` and `/login` authentication pages with dark theme styles | Kept the form layouts and Supabase auth calls; fixed missing `NEXT_PUBLIC_` env prefix and rejected user-enumeration error messages | Tested signing up and logging in with test accounts and checked error messages on bad passwords |
| Gemini 3.8 Flash | Integrate circular ritual index counter and polish auth cards | Kept counter prop mapping to ceremony entries; rejected an auto-generated Google OAuth button and adjusted positioning to prevent mobile clipping | Tested layout at desktop, tablet, and 375px mobile screen widths in DevTools |
| Gemini 3.8 Flash | Generate Postgres schema and RLS policies for `entries` table | Kept UUID primary keys and `owner references auth.users`; stopped model from writing client-side mock handlers and kept raw DDL | Executed SQL in Supabase SQL editor and verified table columns and RLS enablement |
| Gemini 3.8 Flash | Build `ContributeForm.js` with photo upload and validation | Kept storage upload path (`<user_id>/<uuid>.<ext>`) and layout; fixed contradictory character counter helper text to match actual validation bounds | Tested boundary limits (word counts, Khmer script checks, >5MB images) and confirmed upload in Supabase Storage |
| Gemini 3.8 Flash | Fix detail modal scroll physics and double-scroll overflow | Kept touch-aware exit threshold and isolated scroll container; rejected an opaque modal background to preserve frosted glass translucency | Tested mouse wheel scrolling on desktop and touch gestures on mobile emulation |
| Gemini 3.8 Flash | Add Apollo 11 style honest code comment | Rejected generic suggestions; accepted comment `// SEE IF HE'S LYING` on photo validation logic in `utils/validation.js` | Code review to confirm it satisfied Apollo 11 constraints (ALL CAPS, one line, true) |
| Gemini 3.8 Flash | Pre-submission code and security audit for Sprint 2 | Kept audit findings on missing contributor attribution and empty seed sources; stopped raw chat output and directed it into `AUDIT_REPORT.md` | Verified line numbers, commit hashes, and database curl test outputs against code |
| Gemini 3.8 Flash | Add contributor attribution badge and bilingual auth form labels | Kept bilingual labels; rejected a bulky pill badge and rewrote it as an italicized contributor line in `CeremonyContributorBadge.js` | Switched between English and Khmer modes on login/signup and checked ceremony detail view |
| Gemini 3.8 Flash | Status filtering (`.eq('status', 'published')`) and `/my-entries` management page | Kept status filtering logic and five-file plan; filled in proper bilingual status labels and added navigation links to `MobileMenuOverlay.js` | Tested logged-out visitor view (only published entries visible) and contributor view on `/my-entries` |
| Gemini 3.8 Flash | Build `/review` queue with server-side `is_reviewer()` check and `review_entry` RPC | Kept server-side gate and sub-80-line component split; ensured state removal strictly evaluated `data === true` and verified no direct table updates were used | Tested with non-reviewer account (0 entries leaked) and reviewer account; verified RPC called instead of direct update |
| Gemini 3.8 Flash | Add decision confirmation modals and fix returned entries resubmission | Kept `ReviewModal.js` portal; lowered backdrop blur to `blur(6px)`, removed redundant inline error banner, and fixed `ContributeForm.js` so returned entries revert to `pending` upon edit | Conducted round-trip test: published entry, returned entry, resubmitted from contributor account, and verified it reappeared in queue |
| Gemini 3.8 Flash | Implement Google Forms-style automatic draft autosave and restore | Rejected intrusive warning dialogs and restore popups; implemented silent 600ms debounced localStorage autosave with status indicator and photo reminder | Tested typing into form, refreshing page to confirm draft restored silently, and verified draft cleared on submit |

## 6. Sources and credits

### Primary Source of Knowledge

Chhom Alead's mother, who has been through many traditional Khmer wedding ceremonies as well as helped organize them for family and friends.

### Ritual Photography

Source: Pinterest

## 7. Running it locally

```bash
git clone https://github.com/asapqlead/khmer-wedding-rituals-archive.git
cd khmer-wedding-rituals-archive
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`. [package.json: `"dev": "next dev"`]

**Environment variables** (create a `.env.local` file with these names):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

These two variables are read by the Supabase client utilities. [utils/supabase/client.js, lines 5–6; utils/supabase/server.js, lines 8–9]

The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the Supabase **publishable** (anon) key. It is public by design — it is meant to be exposed in client-side code. It does not grant admin access; all data access is controlled by Row Level Security policies in the database. The service role key is never used in this project.

**Other scripts:**

- `npm run build` — production build
- `npm start` — serve the production build

## 8. Submission checklist

- Live URL loads logged out and shows published entries only: CHECKED, https://khmer-wedding-rituals-archive.vercel.app/
- A stranger cannot publish their own entry through the page or the console: CHECKED, tested on 11/15/2026
- Logged out, the API returns nothing pending or returned: CHECKED, tested on 11/15/2026
- Contributors can edit and delete only their own entries: CHECKED
- No secrets anywhere in the repo history: CHECKED, checked manually
- At least eight real entries, each with a credited source: CHECKED, (8 including the glossary)
- Khmer renders on every screen a user meets, including the queue: CHECKED
- Works at phone width: CHECKED, tested on 440 x 956
- No test entries, lorem ipsum or TODO comments in shipped pages: CHECKED
- No console errors on the main pages: CHECKED
- jesseorndorff is a collaborator on this repo: CHECKED
- Supabase project restored and awake on (date): CHECKED
- Demo video link opens in a private window: TODO, (link)
- Reflection pasted in the Canvas submission: TODO
- Posted in the Show Your Archive discussion: CHECKED
- Q&A slot booked for (date and time): TODO

---

## Open items

### UNSURE items

1. **UNSURE (Section 4a):** Whether a reviewer can attach a note explaining why an entry was returned. The `review_note` feature is listed as an optional bonus in LAB11_TASKS.md but was not implemented in the codebase.
2. **UNSURE (Section 4b):** Whether a reviewer could take down a published entry through the Supabase dashboard or elevated SQL access outside this codebase.

### TODO items

- **Section 6 (Sources and credits):** Needs real source names, people, and photo credits.
- **Section 8 (Submission checklist):** Every line needs to be completed with actual dates, URLs, and verification details.

### Potential security gaps found in the code

1. **No SQL migration files in the repo.** The exact RLS policy text cannot be verified from code. The policies were tested via the attack-gate script and audit, but the SQL is only in the Supabase dashboard. If someone changes the policies in the dashboard, there is no version-controlled record. [AUDIT_REPORT.md, section 2.1]
2. **Orphaned storage photos on entry deletion.** When a contributor deletes an entry, `CeremonyOwnerActions.js` (line 55–59) deletes the database row but does not delete the photo from the `photos` storage bucket. The file stays in storage indefinitely. [AUDIT_REPORT.md, section 5, question 3]
3. **The `status` column UPDATE restriction relies on RLS, but the exact policy text is not in the repo.** The attack-gate script confirms a user cannot set `status: 'published'` via `.update()` (attack 2 passes). However, it is UNSURE whether the UPDATE RLS policy uses a `WITH CHECK` clause that explicitly prevents writing to the `status` column, or whether the INSERT policy has a `WITH CHECK` that restricts the `status` value on insert. The attack-gate test only proves the end result works, not the exact mechanism. [scripts/attack-gate.mjs, attacks 1–2]
4. **The `ContributeForm.js` edit flow sets `payload.status = 'pending'` on the client side** when resubmitting a returned entry (line 168). This goes through as a regular `.update()` call. The RLS policy allows this because the owner matches. But this means the contributor is technically setting their own entry's `status` via an update — the policy apparently allows writing `pending` but blocks writing `published`. If the RLS policy only checks `auth.uid() = owner` on UPDATE without also checking what value `status` is being set to, then the protection against self-publishing relies entirely on the `review_entry` function and the INSERT policy, not on the UPDATE policy. [components/ContributeForm.js, lines 162–175; scripts/attack-gate.mjs, attack 2]
5. **Raw auth error messages are shown on login and signup.** `app/login/page.js` (line 34) and `app/signup/page.js` (line 34) display `authError.message` directly from Supabase, which could leak information like whether an email is registered. [AUDIT_REPORT.md, section 2.4]
6. **The `.env.attack` file exists locally** and contains a Supabase URL, publishable key, a test email, and a test password. It has never been committed to git (verified via `git log --all -- .env.attack` returning empty). The `.gitignore` pattern `.env*` excludes it. Not a current leak, but the file contains a real test account password in plaintext on disk. [.env.attack, .gitignore line 4]
