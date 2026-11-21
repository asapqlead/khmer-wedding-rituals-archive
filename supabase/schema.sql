-- ============================================================
-- Traditional Khmer Wedding Rituals — Living Archive
-- Database Schema, Storage Policies, and Row-Level Security (RLS)
-- Course: ICT 340 (Software Engineering Studio, AUPP)
-- Curator: Chhom Alead
-- ============================================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. TABLES
-- ============================================================

-- Ceremony Entries Table
create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  owner uuid not null references auth.users(id) on delete cascade,
  title text not null,
  title_khmer text not null,
  sequence_order integer not null,
  translation_en text,
  summary text not null,
  meaning text not null,
  summary_khmer text not null,
  participants jsonb not null default '[]'::jsonb,
  sacred_items jsonb not null default '[]'::jsonb,
  regional_notes_en text,
  regional_notes_khmer text,
  source text,
  photo_url text,
  status text not null default 'pending' check (status in ('pending', 'published', 'returned'))
);

-- Reviewers Table
create table if not exists public.reviewers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. ROW-LEVEL SECURITY (RLS) FOR ENTRIES
-- ============================================================

alter table public.entries enable row level security;

-- SELECT 1: Anyone (including anonymous visitors) can read published entries
create policy "Anyone can read published entries"
  on public.entries for select
  using (status = 'published');

-- SELECT 2: Authenticated contributors can read their own entries (all statuses)
create policy "Contributors can read own entries"
  on public.entries for select
  to authenticated
  using (auth.uid() = owner);

-- INSERT: Contributors can insert rows only for themselves, defaulting to pending
-- Directly setting status = 'published' on insert is blocked by WITH CHECK
create policy "Contributors insert own pending entries"
  on public.entries for insert
  to authenticated
  with check (
    auth.uid() = owner
    and (status = 'pending' or status is null)
  );

-- UPDATE: Contributors can update only their own entries
-- Directly setting status = 'published' via update is blocked by WITH CHECK
create policy "Contributors update own entries"
  on public.entries for update
  to authenticated
  using (auth.uid() = owner)
  with check (
    auth.uid() = owner
    and status != 'published'
  );

-- DELETE: Contributors can delete only their own entries
create policy "Contributors delete own entries"
  on public.entries for delete
  to authenticated
  using (auth.uid() = owner);

-- ============================================================
-- 3. ROW-LEVEL SECURITY (RLS) FOR REVIEWERS
-- ============================================================

alter table public.reviewers enable row level security;

-- Reviewers list is readable by authenticated users for verification
create policy "Authenticated users can verify reviewers"
  on public.reviewers for select
  to authenticated
  using (true);

-- No public INSERT, UPDATE, or DELETE policies exist for reviewers table.
-- Elevated reviewers can only be designated directly in the Supabase Dashboard.

-- ============================================================
-- 4. STORED PROCEDURES / DATABASE FUNCTIONS
-- ============================================================

-- Function 1: Check if the calling user is an authorized reviewer
create or replace function public.is_reviewer()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.reviewers
    where user_id = auth.uid()
  );
$$;

-- Function 2: Review an entry (publish or return)
-- Enforces:
--   1. Caller must be in reviewers table
--   2. Decision must be 'published' or 'returned'
--   3. Target entry must currently have status = 'pending'
create or replace function public.review_entry(entry_id uuid, decision text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_is_reviewer boolean;
  current_status text;
begin
  -- 1. Verify caller authorization
  select public.is_reviewer() into caller_is_reviewer;
  if not caller_is_reviewer then
    return false;
  end if;

  -- 2. Validate decision argument
  if decision not in ('published', 'returned') then
    return false;
  end if;

  -- 3. Verify target entry exists and is currently 'pending'
  select status into current_status
  from public.entries
  where id = entry_id;

  if current_status is null or current_status != 'pending' then
    return false;
  end if;

  -- 4. Execute atomic status transition
  update public.entries
  set status = decision
  where id = entry_id;

  return true;
end;
$$;

-- ============================================================
-- 5. STORAGE BUCKET & POLICIES (photos)
-- ============================================================

-- Insert public bucket for ceremony entry photos (5 MB limit, image types only)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

-- Storage INSERT: Authenticated contributors can upload only into their own folder (<auth.uid()>/...)
create policy "contributors upload into their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

-- Storage DELETE: Authenticated contributors can delete only photos in their own folder
create policy "contributors delete their own photos"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );
