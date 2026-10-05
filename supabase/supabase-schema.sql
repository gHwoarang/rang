create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  topic text not null default 'General',
  published_at timestamptz not null default now(),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.blog_posts
  alter column is_published set default true;

update public.blog_posts
set is_published = true
where is_published is distinct from true;

create table if not exists public.blog_feedback (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  email varchar(254) not null,
  feedback varchar(4000) not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  constraint blog_feedback_name_not_empty check (char_length(btrim(name)) > 0),
  constraint blog_feedback_email_not_empty check (char_length(btrim(email)) > 0),
  constraint blog_feedback_message_not_empty check (char_length(btrim(feedback)) > 0)
);

alter table public.blog_feedback
  add column if not exists is_published boolean not null default false;

alter table public.blog_posts enable row level security;
alter table public.blog_feedback enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert on public.blog_feedback to anon, authenticated;
revoke select on public.blog_feedback from anon, authenticated;
grant select (id, name, feedback, created_at, is_published) on public.blog_feedback to anon, authenticated;

drop policy if exists "Anyone can read published blog posts" on public.blog_posts;
create policy "Anyone can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Visitors can submit feedback" on public.blog_feedback;
create policy "Visitors can submit feedback"
  on public.blog_feedback for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 120
    and char_length(btrim(email)) between 1 and 254
    and char_length(btrim(feedback)) between 1 and 4000
  );

drop policy if exists "Anyone can read approved feedback" on public.blog_feedback;
create policy "Anyone can read approved feedback"
  on public.blog_feedback for select
  to anon, authenticated
  using (is_published = true);

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'blog_feedback'
    ) then
    alter publication supabase_realtime add table public.blog_feedback;
  end if;
end
$$;