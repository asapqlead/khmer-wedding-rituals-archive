# Lab 11: The Queue Guide — Task Breakdown

**Archive:** Traditional Khmer Wedding Rituals  
**Sprint:** Sprint 3 (Submit-Review-Publish Workflow)  
**Milestone:** Review Queue (`/review`)

---

## Overview & Architecture Rules

Before starting, remember the strict constraints:
- **No Direct Table Updates:** Never call `supabase.from('entries').update(...)` to change status. Must use `supabase.rpc('review_entry', { entry_id, decision })`.
- **Strict Success Verification:** `review_entry` returns `false` without throwing an error when unauthorized or when an entry is not pending. Success **must** be checked as `data === true`.
- **Server-Side Gate:** Call `is_reviewer()` on the server before loading entries. Non-reviewers must see only the unauthorized message—zero entries leaked into DOM/props.
- **Queue Ordering:** Oldest pending entries first (`order('created_at', { ascending: true })`).
- **Dependencies & Styling:** No new packages, no CSS libraries, no `dangerouslySetInnerHTML`. Inline styles or plain CSS matching existing design tokens.

---

## Phase 0: Pre-Flight & Sanity Checks (5 min)

- [x] **Task 0.1: Supabase Project Status**
  - Check the Supabase Dashboard. If the project is paused, click **Restore**.
- [x] **Task 0.2: Local Environment Status**
  - Verify `git status` is clean.
  - Verify `npm run dev` starts and runs without runtime errors.
- [x] **Task 0.3: Verify Pending Entry in Database**
  - Confirm at least one entry is currently in `status: 'pending'` (e.g., "waiting politely" or an entry submitted via your second contributor account).
  - If missing, log in as your second account and submit a ceremony entry through the contribution form.
- [x] **Task 0.4: Credentials Ready**
  - Ensure you have the email and password for your second account ready for the authorization tests in Part 4.
- [x] **Task 0.5: Verify Lab 10 Database Foundation**
  - Confirm `entries.status` column exists (`'pending'`, `'published'`, `'returned'`).
  - Confirm stored procedures `is_reviewer()` and `review_entry(entry_id, decision)` exist in Supabase.

---

## Phase 1: The Five Notebook Decisions (10 min)

Draft the answers to these 5 questions before generating or writing code:

- [x] **Decision 1: Pending Entry Review Details**
  - *Question:* What does a reviewer need to see about each pending ceremony entry to decide?
  - *Answer:* English Title (`title`), Khmer Title (`title_khmer`), Ceremony Sequence Order (`sequence_order`), English/Khmer Summary (`summary`, `summary_khmer`), Cultural Meaning (`meaning`), Sacred Items & Participants, Ceremony Photo (`photo_url`), Source (`source`), and Submission Timestamp (`created_at`).
  - *(Note: Submitter name is intentionally omitted; entries only hold owner UUID).*
- [x] **Decision 2: Action Button Labels**
  - *Question:* What do the two buttons say (bilingual English / Khmer)?
  - *Answer:*
    - **Publish:** `Publish / ផ្សព្វផ្សាយ`
    - **Return:** `Return / បញ្ជូនត្រឡប់`
- [x] **Decision 3: Failure Message**
  - *Question:* What does the page display if the RPC call fails or returns `false`?
  - *Answer:* `Unable to update entry. It may have already been reviewed or permission was denied. / មិនអាចធ្វើបច្ចុប្បន្នភាពបានទេ។ ទិន្នន័យនេះអាចត្រូវបានពិនិត្យរួចហើយ។`
- [x] **Decision 4: Empty Queue Message**
  - *Question:* What does the page display when there are no pending entries?
  - *Answer:* `The review queue is empty. No ceremonies are waiting for review. / គ្មានពិធីដែលត្រូវពិនិត្យទេ។ បញ្ជីពិនិត្យគឺទទេ។`
- [x] **Decision 5: Unauthorized Stranger Message**
  - *Question:* What does a non-reviewer see when opening `/review`?
  - *Answer:* `Access restricted. You do not have reviewer permissions to view this page. / អ្នកមិនមានសិទ្ធិចូលមើលទំព័រពិនិត្យនេះទេ។`

---

## Phase 2: Implementation — The Review Page (30 min)

- [x] **Task 2.1: Server-Side Access Control on `/review`**
  - Create the route at `app/review/page.js`.
  - Create an authenticated server Supabase client (`createClient` from `@/utils/supabase/server`).
  - Call `await supabase.rpc('is_reviewer')`.
  - If the response is not `true` (or user is unauthenticated), render **Decision 5** message and stop. Do not query or pass any entries.
- [x] **Task 2.2: Fetch Pending Entries (Reviewers Only)**
  - Query entries with `.from('entries').select('*').eq('status', 'pending').order('created_at', { ascending: true })`.
- [x] **Task 2.3: Build Review Queue UI**
  - Create review list/card component (`components/ReviewQueueClient.js` and `components/ReviewEntryCard.js` adhering to 80-line limit).
  - Render Decision 1 details for each pending ritual.
  - If entries list is empty, display **Decision 4** empty queue message.
- [x] **Task 2.4: Implement Action Handlers (Publish / Return)**
  - For each entry, render the two action buttons (using labels from **Decision 2**).
  - When clicked, invoke:
    ```javascript
    const { data, error } = await supabase.rpc('review_entry', {
      entry_id: entry.id,
      decision: 'published' // or 'returned'
    });
    ```
  - **Success Handling:** Only if `!error && data === true`, remove that entry from the local state list.
  - **Error Handling:** If `error || data !== true`, keep entry in the queue and show **Decision 3** failure message.
- [x] **Task 2.5: Navigation Header Integration**
  - Update `HeaderAuth.js`, `GalleryHeader.js`, and `MobileMenuOverlay.js` to check if current user is a reviewer.
  - Conditionally render link to `/review` **only** when `is_reviewer()` is `true`.

---

## Phase 3: Code Review & Diff Audit (15 min)

Audit the generated code against the four core checks before approving:

- [x] **Check 3.1: Server-Side Reviewer Gate**
  - Verify `is_reviewer()` runs on the server before fetching pending entries.
  - Confirm non-reviewers cannot receive pending entries in the initial payload.
- [x] **Check 3.2: Verification of RPC vs Direct Table Update**
  - Search code for `.from('entries').update`. Ensure it does **not** exist in review logic.
  - Verify `supabase.rpc('review_entry', ...)` is used exclusively.
- [x] **Check 3.3: Strict Success Evaluation**
  - Ensure removal from state checks `data === true`, rather than merely `!error`.
- [x] **Check 3.4: Queue Ordering & Bilingual Copy**
  - Confirm sort is `ascending: true` (oldest first).
  - Confirm bilingual Khmer/English text formatting matches the archive style.
- [x] **Task 3.5: Commit Changes**
  - Message: `sprint 3: review queue (AI-assisted)` (Committed: `c04fb9e`)

---

## Phase 4: Round-Trip & Security Stranger Testing (25 min)

*(Use two browser windows: one normal window for Reviewer account, one incognito window for Contributor account)*

- [x] **Test 4.1: Publish "Waiting Politely"**
  - Log in as Reviewer.
  - Open `/review`. Click **Publish** on "waiting politely".
  - Log out or open incognito: confirm it now appears on the home page (`/`).
- [x] **Test 4.2: Submit & Return Cycle**
  - As Contributor (second account), submit a new ritual entry.
  - As Reviewer, refresh `/review`. Verify new entry is present.
  - Click **Return**. Confirm it disappears from `/review`.
- [x] **Test 4.3: Contributor Revision Cycle**
  - As Contributor, open `/my-entries`. Confirm entry status is "Returned / បានបញ្ជូនត្រឡប់".
  - Edit and save the entry. Confirm status reverts to "Pending Review / រង់ចាំការពិនិត្យ".
  - As Reviewer, refresh `/review`. Verify entry is back in queue at its original timestamp position.
- [x] **Test 4.4: Concurrency / Double-Action Conflict Test**
  - As Reviewer, open `/review` in two side-by-side tabs.
  - In Tab 1: Click **Publish** on the entry (succeeds).
  - In Tab 2: Click **Return** on the same entry.
  - **Expected:** Tab 2 displays the **Decision 3** failure message and the entry stays on screen until page refresh.
- [x] **Test 4.5: Stranger UI Boundary Test**
  - Log in as Contributor (second account).
  - Navigate directly to `/review`.
  - **Expected:** Only **Decision 5** unauthorized message is displayed. No entries or buttons rendered.
- [x] **Test 4.6: Stranger Console Attack Simulation**
  - Open DevTools Console in Contributor window and run:
    ```javascript
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    const sb = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');
    await sb.auth.signInWithPassword({ email: 'CONTRIBUTOR_EMAIL', password: 'CONTRIBUTOR_PASSWORD' });

    // 1. Check what stranger's query returns:
    const q = await sb.from('entries').select('id, title, status').eq('status', 'pending');
    console.log('Stranger queue query:', q.data); // Should only be contributor's own entries

    // 2. Attempt unauthorized publish:
    const res = await sb.rpc('review_entry', { entry_id: 'ANY_PENDING_ENTRY_ID', decision: 'published' });
    console.log('Unauthorized review attempt result:', res.data); // MUST BE false
    ```
  - **Passing condition:** `res.data` is strictly `false`. (Verified: Attack 3 returned `false` via `attack-gate.mjs`)

---

## Phase 5: Push & Journal Documentation (5 min)

- [x] **Task 5.1: Push to Repository**
  - Run `git push origin main`.
  - Verify `/review` route on your live Vercel deployment.
- [x] **Task 5.2: Record in `JOURNAL.md`**
  - Record the prompt used in Phase 2.
  - Name the prompt technique used (e.g., *Pre-execution Planning with Negative Constraints & Security Gating*).
  - Record what the AI returned in one sentence.
  - Record the Part 3 code audit findings in one sentence.

---

## Extension / Early Finish (Optional)

If you complete the main lab early:
- [ ] **Bonus Task 1: Review Note Database Migration**
  - Run the SQL migration in Supabase SQL editor:
    - Add `review_note text` column to `entries`.
    - Update `review_entry(entry_id, decision, note)` procedure to save `note` on `'returned'`.
- [ ] **Bonus Task 2: Note Input UI**
  - Add a note input box next to the **Return** button on `/review`.
  - Pass the note value to `review_entry`.
  - Display `review_note` on `/my-entries` for returned entries.
- [ ] **Bonus Task 3: Retest Stranger Gate**
  - Rerun Test 4.6 to ensure stranger calls still return `false`.
