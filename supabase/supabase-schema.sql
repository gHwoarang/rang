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
where is_published is null;

create table if not exists public.blog_feedback (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  email varchar(254) not null,
  feedback varchar(4000) not null,
  created_at timestamptz not null default now(),
  constraint blog_feedback_name_not_empty check (char_length(btrim(name)) > 0),
  constraint blog_feedback_email_not_empty check (char_length(btrim(email)) > 0),
  constraint blog_feedback_message_not_empty check (char_length(btrim(feedback)) > 0)
);

alter table public.blog_posts enable row level security;
alter table public.blog_feedback enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert on public.blog_feedback to anon, authenticated;

create policy "Anyone can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

create policy "Visitors can submit feedback"
  on public.blog_feedback for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 120
    and char_length(btrim(email)) between 1 and 254
    and char_length(btrim(feedback)) between 1 and 4000
  );